import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

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
      link: `/blog/${post.slug}/`,
    })),
  });
}

