import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import TurndownService from "turndown";

const DIST = path.resolve(new URL("../dist", import.meta.url).pathname);

const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
});

turndown.remove(["style", "script", "noscript"]);

async function* walkHtmlFiles(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            yield* walkHtmlFiles(full);
        } else if (entry.isFile() && entry.name === "index.html") {
            yield full;
        }
    }
}

async function collectMarkdownFiles(dir, files = []) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await collectMarkdownFiles(full, files);
        } else if (entry.isFile() && entry.name.endsWith(".md")) {
            files.push(full);
        }
    }
    return files;
}

function pageTitle(html) {
    const match = html.match(/<title>([^<]*)<\/title>/i);
    return match ? match[1].trim() : "";
}

async function main() {
    // Remove markdown variants from the previous build so stale pages never linger.
    const stale = await collectMarkdownFiles(DIST);
    await Promise.all(stale.map((file) => rm(file)));

    let count = 0;
    for await (const htmlPath of walkHtmlFiles(DIST)) {
        const html = await readFile(htmlPath, "utf8");
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        const markdown = turndown.turndown(bodyMatch ? bodyMatch[1] : html).trim();
        const title = pageTitle(html);

        const front =
            title.length > 0
                ? `---
title: ${JSON.stringify(title)}
---\n\n`
                : "";

        const outPath = path.join(path.dirname(htmlPath), "index.md");
        await mkdir(path.dirname(outPath), { recursive: true });
        await writeFile(outPath, `${front}${markdown}\n`, "utf8");
        count++;
    }

    console.log(`generate-markdown: wrote ${count} markdown variant(s) to dist`);
}

main().catch((error) => {
    console.error("generate-markdown failed:", error);
    process.exitCode = 1;
});
