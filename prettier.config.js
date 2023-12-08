const styleguide = require("@vercel/style-guide/prettier");

/** @type {import('prettier').Config} */
module.exports = {
  ...styleguide,
  singleQuote: false,
  plugins: [...styleguide.plugins, "prettier-plugin-tailwindcss"],
};
