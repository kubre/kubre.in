import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const SITE_URL = "https://www.kubre.in";
const SCRCAP_URL = "https://scrcap.kubre.in/";
const SITE_LAST_MODIFIED = "2026-06-12";

type SitemapEntry = {
    url: string;
    lastModified?: Date | string;
};

const staticEntries: SitemapEntry[] = [
    { url: `${SITE_URL}/`, lastModified: SITE_LAST_MODIFIED },
    { url: `${SITE_URL}/about/`, lastModified: SITE_LAST_MODIFIED },
    { url: `${SITE_URL}/blog/`, lastModified: SITE_LAST_MODIFIED },
    { url: `${SITE_URL}/work/`, lastModified: SITE_LAST_MODIFIED },
    { url: `${SITE_URL}/travel/`, lastModified: SITE_LAST_MODIFIED },
    { url: `${SITE_URL}/guestbook/`, lastModified: SITE_LAST_MODIFIED },
    { url: SCRCAP_URL, lastModified: SITE_LAST_MODIFIED },
];

const xmlEscape = (value: string) =>
    value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");

const formatDate = (date: Date | string) => {
    if (typeof date === "string") return date;
    return date.toISOString().split("T")[0];
};

const toSitemapUrl = ({ url, lastModified }: SitemapEntry) => {
    const lastModifiedTag = lastModified
        ? `\n    <lastmod>${formatDate(lastModified)}</lastmod>`
        : "";

    return `  <url>\n    <loc>${xmlEscape(url)}</loc>${lastModifiedTag}\n  </url>`;
};

export const GET: APIRoute = async () => {
    const [blog, work, travel] = await Promise.all([
        getCollection("blog", ({ data }) => !data.draft),
        getCollection("work", ({ data }) => !data.draft),
        getCollection("travel", ({ data }) => !data.draft),
    ]);

    const entries: SitemapEntry[] = [
        ...staticEntries,
        ...blog.map((post) => ({
            url: `${SITE_URL}/blog/${post.id}/`,
            lastModified: post.data.publishedAt,
        })),
        ...work.map((project) => ({
            url: `${SITE_URL}/work/${project.id}/`,
            lastModified: project.data.publishedAt,
        })),
        ...travel.map((entry) => ({
            url: `${SITE_URL}/travel/${entry.id}/`,
            lastModified: entry.data.visitedAt,
        })),
    ];

    const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
        .map(toSitemapUrl)
        .join("\n")}\n</urlset>`;

    return new Response(body, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
        },
    });
};
