import js from "@eslint/js";
import globals from 'globals'
import tseslint from 'typescript-eslint'
import tsParser from "@typescript-eslint/parser";
import eslintPluginImportX from "eslint-plugin-import-x";
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default tseslint.config(
  { ignores: ['dist'] },
  extends: [
    js.configs.recommended, 
    ...tseslint.configs.recommended, 
    eslintPluginImportX.flatConfigs.recommended,
    eslintPluginImportX.flatConfigs.typescript,
  ],
  {
    files: ["src/**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
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
);
