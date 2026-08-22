import { describe, expect, it } from "vitest";
import {
    isNegotiablePath,
    markdownAssetPath,
    mergeVary,
    wantsMarkdown,
} from "../functions/lib/negotiate";

describe("wantsMarkdown", () => {
    it("accepts an explicit text/markdown preference", () => {
        expect(wantsMarkdown("text/markdown")).toBe(true);
        expect(wantsMarkdown("text/html,text/markdown;q=0.9")).toBe(true);
        expect(wantsMarkdown("*/*")).toBe(false);
        expect(wantsMarkdown("text/html")).toBe(false);
        expect(wantsMarkdown(null)).toBe(false);
        expect(wantsMarkdown(undefined)).toBe(false);
    });

    it("is case-insensitive", () => {
        expect(wantsMarkdown("Text/Markdown")).toBe(true);
    });
});

describe("markdownAssetPath", () => {
    it.each([
        ["/", "/index.md"],
        ["/blog/", "/blog/index.md"],
        ["/blog/foo/", "/blog/foo/index.md"],
        ["/blog/foo", "/blog/foo/index.md"],
    ])("maps %s to %s", (input, expected) => {
        expect(markdownAssetPath(input)).toBe(expected);
    });
});

describe("isNegotiablePath", () => {
    it("negotiates page paths only", () => {
        expect(isNegotiablePath("/")).toBe(true);
        expect(isNegotiablePath("/blog/foo/")).toBe(true);
        expect(isNegotiablePath("/rss.xml")).toBe(false);
        expect(isNegotiablePath("/sitemap.xml")).toBe(false);
        expect(isNegotiablePath("/_astro/page.abc123.css")).toBe(false);
        expect(isNegotiablePath("/favicon.png")).toBe(false);
    });
});

describe("mergeVary", () => {
    it("adds Accept when missing", () => {
        expect(mergeVary(null, "Accept")).toBe("Accept");
        expect(mergeVary("", "Accept")).toBe("Accept");
    });

    it("preserves existing tokens and appends Accept", () => {
        expect(mergeVary("accept-encoding", "Accept")).toBe("accept-encoding, Accept");
    });

    it("does not duplicate Accept regardless of case", () => {
        expect(mergeVary("Accept", "Accept")).toBe("Accept");
        expect(mergeVary("accept", "Accept")).toBe("accept");
    });
});
