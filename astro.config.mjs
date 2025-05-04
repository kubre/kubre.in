import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind()],
    output: "static",
    adapter: cloudflare({
        imageService: 'cloudflare'
    }),
    site: "https://www.kubre.in",
    markdown: {
        shikiConfig: {
            // Choose from Shiki's built-in themes (or add your own)
            // https://github.com/shikijs/shiki/blob/main/docs/themes.md
            theme: "github-light",
            // Add custom languages
            // Note: Shiki has countless langs built-in, including .astro!
            // https://github.com/shikijs/shiki/blob/main/docs/languages.md
            langs: ["typescript", "tsx", "javascript", "bash", "php"],
            // Enable word wrap to prevent horizontal scrolling
            wrap: true,
        },
    },
});
