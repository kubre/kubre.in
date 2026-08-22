import { SITE } from "./seo";

export type JsonLdObject = Record<string, unknown>;

/**
 * Identity JSON-LD for the site owner (a personal site, so Person is the right type).
 * Includes contactPoint and sameAs so AI systems can verify identity and answer
 * contact queries programmatically.
 */
export function buildPersonJsonLd(): JsonLdObject {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Vaibhav Kubre",
        url: SITE.url,
        description:
            "Senior software engineer building reliable systems and keyboard-first tools across TypeScript, Swift, and the web platform.",
        jobTitle: "Senior Software Engineer",
        email: "mailto:v@kubre.in",
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "v@kubre.in",
            availableLanguage: ["en"],
        },
        sameAs: [
            "https://linkedin.com/in/kubre",
            "https://github.com/kubre",
            "https://x.com/kubre_in",
            "https://www.youtube.com/@kubre_in",
            "https://www.instagram.com/kubre.in",
        ],
        knowsAbout: [
            "Software engineering",
            "TypeScript",
            "Swift",
            "macOS development",
            "Web performance",
        ],
    };
}

/** WebSite JSON-LD linking the site to its canonical home and feed. */
export function buildWebSiteJsonLd(): JsonLdObject {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE.name,
        alternateName: SITE.title,
        url: SITE.url,
        description: SITE.description,
        author: { "@type": "Person", name: "Vaibhav Kubre", url: SITE.url },
    };
}

export function renderJsonLd(objects: JsonLdObject[]): string {
    return JSON.stringify(objects.length === 1 ? objects[0] : objects);
}
