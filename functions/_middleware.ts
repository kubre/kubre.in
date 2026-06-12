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

export async function onRequest(context: PagesContext): Promise<Response> {
    const url = new URL(context.request.url);

    if (
        url.hostname === SCRCAP_HOST &&
        (url.pathname === "/" || url.pathname === "/index.html") &&
        (context.request.method === "GET" || context.request.method === "HEAD")
    ) {
        url.pathname = "/scrcap/";
        return context.env.ASSETS.fetch(new Request(url, context.request));
    }

    return context.next();
}
