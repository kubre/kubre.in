/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.astro", "./src/**/*.md"],
    theme: {
        extend: {
            fontFamily: {
                mono: ["Departure\ Neon", "IBM\ Plex\\ Mono", "Source\\ Code\\ Pro", "Consolas", "Menlo", "monospace"],
                sans: ["ui-sans-serif", "system-ui", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
                inter: ["Inter"],
            },
            colors: {
                'enamel': '#eeeeee',
                'enamel-dark': '#cccccc',
                'carbon': '#222222',
                'carbon-light': '#444444',
                'carbon-lighter': '#666666',
                'carbon-lightest': '#999999',
                'foam': '#bccabb',
                'beige': '#d9c9b6'
            }
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
    ],
};
