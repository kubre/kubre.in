import { isNegotiablePath, markdownAssetPath, mergeVary, wantsMarkdown } from "./lib/negotiate";

type PagesContext = {
    request: Request;
    env: {
        ASSETS: {
            fetch(input: Request | URL | string, init?: RequestInit): Promise<Response>;
        };
    };
    next(input?: Request | string, init?: RequestInit): Promise<Response>;
};

const SCRCAP_HOST = "scrcap.kubre.in";

function withVary(response: Response, token: string): Response {
    const headers = new Headers(response.headers);
    headers.set("Vary", mergeVary(headers.get("Vary"), token));
    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
    });
}

export async function onRequest(context: PagesContext): Promise<Response> {
    const { request } = context;
    const url = new URL(request.url);

    if (
        url.hostname === SCRCAP_HOST &&
        (url.pathname === "/" || url.pathname === "/index.html") &&
        (request.method === "GET" || request.method === "HEAD")
    ) {
        url.pathname = "/scrcap/";
        return context.env.ASSETS.fetch(new Request(url, request));
    }

    const readableBody = request.method === "GET" || request.method === "HEAD";

    // Accept: text/markdown content negotiation (https://acceptmarkdown.com).
    // Markdown variants are pre-generated next to each HTML file at build time.
    if (
        readableBody &&
        isNegotiablePath(url.pathname) &&
        wantsMarkdown(request.headers.get("Accept"))
    ) {
        const assetUrl = new URL(url);
        assetUrl.pathname = markdownAssetPath(url.pathname);
        const markdown = await context.env.ASSETS.fetch(new Request(assetUrl, request));
        if (markdown.ok) {
            return withVary(
                new Response(markdown.body, {
                    status: 200,
                    statusText: "OK",
                    headers: { "Content-Type": "text/markdown; charset=utf-8" },
                }),
                "Accept",
            );
        }
    }

    const response = await context.next();

    // HTML documents can also be served as text/markdown for the same URL,
    // so caches must key on the Accept header.
    const contentType = response.headers.get("Content-Type") ?? "";
    if (readableBody && contentType.includes("text/html")) {
        return withVary(response, "Accept");
    }

    return response;
}
