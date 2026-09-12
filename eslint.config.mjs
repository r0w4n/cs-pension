import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import jestPlugin from "eslint-plugin-jest";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";

const browserGlobals = {
    console: "readonly",
    document: "readonly",
    localStorage: "readonly",
    window: "readonly",
};

const jestGlobals = {
    expect: "readonly",
    test: "readonly",
};

export default [
    {
        ignores: ["build/**", "node_modules/**"],
    },
    js.configs.recommended,
    reactPlugin.configs.flat.recommended,
    jestPlugin.configs["flat/recommended"],
    prettierConfig,
    {
        files: ["**/*.{js,jsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            globals: {
                ...browserGlobals,
                ...jestGlobals,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                sourceType: "module",
            },
        },
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            "indent": ["error", 4],
            "max-len": ["error", 160],
            "prettier/prettier": "error",
            "quotes": ["error", "double"],
            "react/react-in-jsx-scope": "off",
            "space-infix-ops": ["error", { int32Hint: true }],
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
];
