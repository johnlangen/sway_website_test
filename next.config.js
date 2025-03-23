/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",              // Enable static export
  trailingSlash: true           // Fixes route issues on GitHub Pages
};

module.exports = nextConfig;
