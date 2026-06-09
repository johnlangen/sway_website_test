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
      {
        source: "/blog/fathers-day-gift-guide/om",
        destination: "/blog/fathers-day-gift-guide/",
        permanent: true,
      },
      // Consolidated recovery posts → recovery-denver hub (2026-06)
      {
        source: "/blog/cold-plunge",
        destination: "/blog/recovery-denver/",
        permanent: true,
      },
      {
        source: "/blog/infrared-vs-traditional-sauna",
        destination: "/blog/recovery-denver/",
        permanent: true,
      },
      {
        source: "/blog/train-like-an-athlete",
        destination: "/blog/recovery-denver/",
        permanent: true,
      },
      {
        source: "/blog/denver-wellness-club",
        destination: "/blog/recovery-denver/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
