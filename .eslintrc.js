module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "react-app",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "react", "prettier"],
  rules: {
    "react/prop-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "prettier/prettier": "error",
  },
};
