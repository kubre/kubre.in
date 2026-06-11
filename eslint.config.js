import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default [
    ...tseslint.configs.recommended,
    ...eslintPluginAstro.configs.recommended,
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
        files: ["**/*.d.ts"],
        rules: {
            "@typescript-eslint/triple-slash-reference": "off",
        },
    },
    {
        ignores: ["dist/**", ".astro/**", "node_modules/**"],
    },
];
