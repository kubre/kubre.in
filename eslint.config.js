import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default [
    ...eslintPluginAstro.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            parserOptions: {
                project: true,
            },
        },
        rules: {
            // Astro-specific rules
            "astro/no-conflict-set-directives": "error",
            "astro/no-unused-define-vars-in-style": "error",
            // TypeScript rules
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_" },
            ],
        },
    },
    {
        ignores: ["dist/**", ".astro/**", "node_modules/**"],
    },
];
