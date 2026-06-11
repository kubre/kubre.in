import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blogCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
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
    loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
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
    loader: glob({ pattern: "**/*.md", base: "./src/content/travel" }),
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
