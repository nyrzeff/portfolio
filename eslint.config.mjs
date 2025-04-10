import js from "@eslint/js";
import eslintPluginImportX from "eslint-plugin-import-x";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  {
    files: ["src/**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "off",
      "import-x/no-dynamic-require": "warn",
      "import-x/no-nodejs-modules": "warn",
    },
  },
  {
    files: ["src/**"],
    ignores: ["src/pages/**"],
    rules: {
      "import-x/no-default-export": "error",
    },
  },
];
