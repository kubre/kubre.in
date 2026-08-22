import { describe, expect, it } from "vitest";
import { buildPersonJsonLd, buildWebSiteJsonLd, renderJsonLd } from "../src/utils/jsonld";

describe("buildPersonJsonLd", () => {
    const person = buildPersonJsonLd();

    it("is a schema.org Person with identity fields", () => {
        expect(person["@type"]).toBe("Person");
        expect(person.name).toBe("Vaibhav Kubre");
        expect(person.url).toBe("https://www.kubre.in");
        expect(String(person.description).length).toBeGreaterThan(0);
    });

    it("includes contactPoint with an email so agents can answer contact queries", () => {
        const contactPoint = person.contactPoint as Record<string, unknown>;
        expect(contactPoint["@type"]).toBe("ContactPoint");
        expect(contactPoint.email).toBe("v@kubre.in");
        expect(contactPoint.contactType).toBeTruthy();
    });

    it("lists sameAs profiles for identity verification", () => {
        const sameAs = person.sameAs as string[];
        expect(sameAs.length).toBeGreaterThanOrEqual(3);
        for (const url of sameAs) {
            expect(url).toMatch(/^https:\/\//);
        }
    });
});

describe("buildWebSiteJsonLd", () => {
    it("describes the website with canonical URL and author", () => {
        const site = buildWebSiteJsonLd();
        expect(site["@type"]).toBe("WebSite");
        expect(site.url).toBe("https://www.kubre.in");
        expect(site.name).toBe("kubre.in");
        expect((site.author as Record<string, unknown>).name).toBe("Vaibhav Kubre");
    });
});

describe("renderJsonLd", () => {
    it("produces parseable JSON-LD", () => {
        const parsed = JSON.parse(renderJsonLd([buildPersonJsonLd(), buildWebSiteJsonLd()]));
        expect(Array.isArray(parsed)).toBe(true);
        expect(parsed).toHaveLength(2);
    });

    it("emits a single object (not a 1-element array) when given one graph node", () => {
        const parsed = JSON.parse(renderJsonLd([buildPersonJsonLd()]));
        expect(Array.isArray(parsed)).toBe(false);
        expect(parsed["@type"]).toBe("Person");
    });
});
