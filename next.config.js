/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ remove output: "export"
  output: 'export',

  trailingSlash: true,
  images: {
    unoptimized: true,
  },


  eslint: {
    ignoreDuringBuilds: true,
  },


};

module.exports = nextConfig;
