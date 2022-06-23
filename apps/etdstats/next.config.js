/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["ui", "openapi_client"]);

module.exports = withTM({
  reactStrictMode: true,
});