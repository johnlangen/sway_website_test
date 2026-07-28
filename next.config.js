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
      // Location slug renames (2026-07-28). Dallas -> Knox/Henderson and the
      // DC site relocating from Georgetown to Union Market. Wildcards cover
      // every child route (membership, founding-membership, enter-to-win,
      // offers, gift-cards, book, dashboard). Keep these permanently: the
      // old /locations/georgetown/ URL held ~1,565 impressions/90d and
      // shared links are already in circulation.
      {
        source: "/locations/dallas/:path*",
        destination: "/locations/knox-henderson/:path*",
        permanent: true,
      },
      {
        source: "/locations/georgetown/:path*",
        destination: "/locations/union-market/:path*",
        permanent: true,
      },
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
      // Consolidated membership posts → sway-membership-tiers (2026-06)
      {
        source: "/blog/sway-spa-membership",
        destination: "/blog/sway-membership-tiers/",
        permanent: true,
      },
      {
        source: "/blog/may-memberships",
        destination: "/blog/sway-membership-tiers/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
