/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ remove output: "export"
  // output: "export",

  trailingSlash: true,
  images: {
    // Next.js will auto-optimize: WebP conversion, responsive sizing, lazy loading
  },


  eslint: {
    ignoreDuringBuilds: true,
  },

  async redirects() {
    return [
      {
        source: "/memberships",
        destination: "/membership/",
        permanent: true,
      },
      {
        source: "/blog/forever-young-facial",
        destination: "/facials/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
