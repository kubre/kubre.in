// @ts-check
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

/** @type {import('astro').APIRoute} */
export async function GET(context) {
    const travel = await getCollection("travel");

    const site = context.site?.toString() ?? "https://kubre.in";

    return rss({
        title: "Vaibhav Kubre's Travel",
        description: "Places I've visited and my travel experiences",
        site: site,
        items: travel.map((entry) => ({
            title: entry.data.title,
            pubDate: entry.data.visitedAt,
            description: entry.data.description,
            content: sanitizeHtml(parser.render(entry.body)),
            canonical_url: `${site}/travel/${entry.slug}/`,
            tags: entry.data.tags,
            link: `/travel/${entry.slug}/`,
        })),
    });
}
