/**
 * Text formatting utilities
 */

/**
 * Convert kebab-case filename to Sentence case caption
 * e.g., "ajanta-caves.jpg" → "Ajanta caves"
 */
export function toSentenceCase(filename: string): string {
    const name = filename.replace(/\.[^.]+$/, ""); // remove extension
    return name
        .split("-")
        .map((word, i) =>
            i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word,
        )
        .join(" ");
}

/**
 * Calculate read time in minutes based on word count
 * @param content - Text content to analyze
 * @param wpm - Words per minute (default: 200)
 */
export function calculateReadTime(content: string, wpm = 200): number {
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wpm);
}

/**
 * Generate a URL-friendly slug from a string
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
