/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.astro"],
    theme: {
        extend: {
            fontFamily: {
                serif: "Roboto\\ Serif",
                sans: "Roboto",
                mono: ["Source\\ Code\\ Pro", "Consolas", "Menlo", "monospace"],
            },
        },
    },
    plugins: [],
};
