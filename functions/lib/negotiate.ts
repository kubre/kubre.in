/**
 * Pure helpers for Accept: text/markdown content negotiation
 * (see https://acceptmarkdown.com). Kept free of runtime imports so they can be unit tested.
 */

const MARKDOWN_TYPES = ["text/markdown", "text/x-markdown"] as const;

/** True when the request's Accept header explicitly allows a markdown type. */
export function wantsMarkdown(acceptHeader: string | null | undefined): boolean {
    if (!acceptHeader) return false;
    const lower = acceptHeader.toLowerCase();
    return MARKDOWN_TYPES.some((type) => lower.includes(type));
}

/** Maps an HTML page path to its pre-generated markdown sibling in the assets bundle. */
export function markdownAssetPath(pathname: string): string {
    const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
    return `${normalized}index.md`;
}

/** Only negotiate for requests that look like pages, not hashed assets or feeds. */
export function isNegotiablePath(pathname: string): boolean {
    const lastSegment = pathname.split("/").filter(Boolean).at(-1) ?? "";
    if (lastSegment.includes(".")) return false;
    return true;
}

/**
 * Merges a token into an existing Vary header without duplicates,
 * preserving any tokens already present (e.g. accept-encoding).
 */
export function mergeVary(existingVary: string | null | undefined, token: string): string {
    const tokens = (existingVary ?? "")
        .split(",")
        .map((value) => value.trim())
        .filter((value) => value.length > 0);
    if (!tokens.some((value) => value.toLowerCase() === token.toLowerCase())) {
        tokens.push(token);
    }
    return tokens.join(", ");
}
