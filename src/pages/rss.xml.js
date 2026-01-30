// @ts-check
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

/** @type {import('astro').APIRoute} */
export async function GET(context) {
    const blog = await getCollection("blog", ({ data }) => {
        // Filter out drafts from RSS feed
        return !data.draft;
    });

    const site = context.site?.toString() ?? "https://kubre.in";

    return rss({
        title: "Vaibhav Kubre's Blog",
        description: "Vaibhav's blog about stuff he rambles about",
        site: site,
        items: blog.map((post) => ({
            title: post.data.title,
            pubDate: post.data.publishedAt,
            description: post.data.description,
            content: sanitizeHtml(parser.render(post.body)),
            canonical_url: `${site}/blog/${post.slug}/`,
            tags: post.data.tags,
            link: `/blog/${post.slug}/`,
        })),
    });
}
