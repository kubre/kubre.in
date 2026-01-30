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
            draft: z.boolean().optional().default(false),
        }),
});

const workCollection = defineCollection({
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
            draft: z.boolean().optional().default(false),
        }),
});

const travelCollection = defineCollection({
    type: "content",
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            coverImage: image(),
            visitedAt: z.date(),
            visitedTill: z.date().optional(),
            coordinates: z
                .object({
                    lat: z.number(),
                    lng: z.number(),
                })
                .optional(),
            tags: z.array(z.string()),
            rating: z.number().min(1).max(5).optional(),
        }),
});

export const collections = {
    blog: blogCollection,
    work: workCollection,
    travel: travelCollection,
};
