import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);

const read = (...segments: string[]) => readFile(path.join(ROOT, ...segments), "utf8");

/** Rough visible-text extraction for .astro files: drop frontmatter, style/script blocks, tags. */
function visibleText(source: string): string {
    return source
        .replace(/^---[\s\S]*?---/, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

describe("llms.txt", () => {
    it("tells agents when to use the site with concrete use cases", async () => {
        const llms = await read("public", "llms.txt");
        expect(llms).toContain("## When to use this site");
        expect(llms).toContain("- Answer questions");
        expect(llms).toContain("- Contact him");
        expect(llms).toContain("v@kubre.in");
    });

    it("documents Accept: text/markdown negotiation", async () => {
        const llms = await read("public", "llms.txt");
        expect(llms).toContain("Accept: text/markdown");
    });

    it("links the trust pages and the sitemap", async () => {
        const llms = await read("public", "llms.txt");
        expect(llms).toContain("https://www.kubre.in/contact/");
        expect(llms).toContain("https://www.kubre.in/privacy/");
        expect(llms).toContain("https://www.kubre.in/sitemap.xml");
    });
});

describe("trust pages", () => {
    it.each([["src/pages/contact.astro"], ["src/pages/privacy.astro"]])(
        "%s carries at least 500 characters of visible text",
        async (file) => {
            expect(visibleText(await read(...file.split("/"))).length).toBeGreaterThanOrEqual(500);
        },
    );
});

describe("homepage", () => {
    it("carries at least 500 characters of visible text in server-rendered HTML source", async () => {
        const text = visibleText(await read("src", "pages", "index.astro"));
        expect(text.length).toBeGreaterThan(500);
    });

    it("introduces the site owner by name in server-rendered text", async () => {
        const text = visibleText(await read("src", "pages", "index.astro"));
        expect(text).toContain("Vaibhav Kubre is a senior software engineer");
    });
});

describe("404 page", () => {
    it("gives agents recovery paths: sitemap, llms.txt, and section links", async () => {
        const page = await read("src", "pages", "404.astro");
        expect(page).toContain('href="/sitemap.xml"');
        expect(page).toContain('href="/llms.txt"');
        expect(page).toContain('href="/work/"');
        expect(page).toContain('href="/blog/"');
    });
});

describe("sitemap entries", () => {
    it("includes the trust pages as static entries", async () => {
        const sitemap = await read("src", "pages", "sitemap.xml.ts");
        expect(sitemap).toContain(`${"${SITE_URL}"}/contact/`);
        expect(sitemap).toContain(`${"${SITE_URL}"}/privacy/`);
    });
});
