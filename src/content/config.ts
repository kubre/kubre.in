import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
    type: "content",
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            image: image(),
            hideHeaderImage: z.boolean().optional().default(false),
            publishedAt: z.date(),
            tags: z.array(z.string()),
            readTime: z.number().optional().default(5),
        }),
});

export const collections = {
    blog: blogCollection,
};
