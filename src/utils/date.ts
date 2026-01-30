/**
 * Date formatting utilities
 */

export const DATE_FORMATTERS = {
    /** Full date: "1 January 2024" */
    full: new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }),
    /** Short date: "1 Jan 2024" */
    short: new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }),
    /** ISO date for datetime attributes */
    iso: (date: Date | string): string => {
        return new Date(date).toISOString();
    },
};

/**
 * Format a date range (start to end date)
 */
export function formatDateRange(
    start: Date | string,
    end?: Date | string,
): string {
    const startDate = new Date(start);
    if (!end) return DATE_FORMATTERS.full.format(startDate);

    const endDate = new Date(end);
    // Show single date if start and end are the same day
    if (startDate.toDateString() === endDate.toDateString()) {
        return DATE_FORMATTERS.full.format(startDate);
    }
    return `${DATE_FORMATTERS.full.format(startDate)} - ${DATE_FORMATTERS.full.format(endDate)}`;
}
