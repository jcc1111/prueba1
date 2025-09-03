module.exports = {
  root: true,
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["dist", "node_modules", "*.js"],
  rules: {
    "@typescript-eslint/no-unused-vars": ["error"],
    "import/prefer-default-export": "off",
    "no-console": "warn"
  }
};
