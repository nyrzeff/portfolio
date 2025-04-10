import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

export default [
  ...tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
  ),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
  {
    ignores: ["dist", "node_modules", "public", ".cache"],
  },
  importPlugin.flatConfigs.recommended,
  {
    files: ["src/**"],
    ignores: ["src/pages/**"],
    rules: {
      "import/no-default-export": "error",
    },
  },
];
