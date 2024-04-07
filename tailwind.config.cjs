/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.astro", "./src/**/*.md"],
    theme: {
        extend: {
            fontFamily: {
                mono: ["Monaspace\ Neon", "IBM\ Plex\\ Mono", "Source\\ Code\\ Pro", "Consolas", "Menlo", "monospace"],
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
    ],
};
