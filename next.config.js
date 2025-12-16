/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ remove output: "export"
  // output: 'export',

  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // These are fine
  basePath: '',
  assetPrefix: '/',

  eslint: {
    ignoreDuringBuilds: true,
  },

  // (optional) explicitly force Node on EDGE-heavy frameworks
  experimental: {
    serverActions: { allowedOrigins: ["*"] },
  },
};

module.exports = nextConfig;
