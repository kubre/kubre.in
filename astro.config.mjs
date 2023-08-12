import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind()],
    output: "hybrid",
    adapter: vercel({
        analytics: true,
        imageService: true,
    }),
    experimental: {
        assets: true,
    },
    markdown: {
        shikiConfig: {
            // Choose from Shiki's built-in themes (or add your own)
            // https://github.com/shikijs/shiki/blob/main/docs/themes.md
            theme: "poimandres",
            // Add custom languages
            // Note: Shiki has countless langs built-in, including .astro!
            // https://github.com/shikijs/shiki/blob/main/docs/languages.md
            langs: ["typescript", "javascript", "bash", "php"],
            // Enable word wrap to prevent horizontal scrolling
            wrap: true,
        },
    },
});
