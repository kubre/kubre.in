import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
  const blog = await getCollection('blog');

  return rss({
    title: "Vaibhav Kubre's Blog",
    description: "Vaibhav's blog about stuff he rambles about stuff",
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.description,
      content: sanitizeHtml(parser.render(post.body)),
      cannonical_url: `${context.site}/blog/${post.slug}/`,
      tags: post.data.tags,
      link: `/blog/${post.slug}/`,
    })),
  });
}

