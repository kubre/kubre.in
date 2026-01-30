/**
 * SEO utilities for generating meta tags and URLs
 */

import type { ImageMetadata } from "astro";

const SITE_URL = "https://kubre.in";

/**
 * Generate OpenGraph/Twitter image URL from image metadata
 */
export function getOgImageUrl(image: ImageMetadata | string): string {
    if (typeof image === "string") {
        // If it's already a full URL, return it
        if (image.startsWith("http")) return image;
        // Otherwise, prepend site URL
        return new URL(image, SITE_URL).href;
    }
    // ImageMetadata object from Astro
    return new URL(image.src, SITE_URL).href;
}

/**
 * Get default OG image URL
 */
export function getDefaultOgImageUrl(): string {
    return `${SITE_URL}/assets/me.jpg`;
}

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(path: string): string {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return new URL(cleanPath, SITE_URL).href;
}

/**
 * Site metadata
 */
export const SITE = {
    name: "kubre.in",
    title: "Vaibhav Kubre",
    description: "Personal portfolio and blog of Vaibhav Kubre",
    url: SITE_URL,
    twitterHandle: "@kubre_in",
} as const;
