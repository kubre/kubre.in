/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.astro"],
    theme: {
        extend: {
            fontFamily: {
                mono: ["IBM\\ Plex\\ Mono", "Source\\ Code\\ Pro", "Consolas", "Menlo", "monospace"],
            },
        },
    },
    plugins: [],
};
