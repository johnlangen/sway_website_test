import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://swaywellnessspa.com";

  /* ------------------------------------------------------------------
     Core pages
     ------------------------------------------------------------------ */
  const corePages = [
    { url: `${base}/`, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${base}/locations/`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/membership/`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/offers/`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/gift-cards/`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/holiday-gift-cards/`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/press/`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/own/`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${base}/date-night/`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/couples-spa/`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/group-events/`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/careers/`, changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${base}/terms-and-conditions/`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${base}/themavenhotel/`, changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  /* ------------------------------------------------------------------
     Service / treatment pages
     ------------------------------------------------------------------ */
  const servicePages = [
    { url: `${base}/treatments/`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/massages/`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/facials/`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/aescape/`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/remedy-tech/`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/sauna/`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/cold-plunge/`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/led-light-therapy/`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${base}/compression-therapy/`, changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  /* ------------------------------------------------------------------
     The Sway Way + FAQ
     ------------------------------------------------------------------ */
  const infoPages = [
    { url: `${base}/swayway/`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/faq/`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/faq/larimer/`, changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  /* ------------------------------------------------------------------
     Denver Larimer location
     ------------------------------------------------------------------ */
  const larimerPages = [
    { url: `${base}/locations/denver-larimer/`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${base}/locations/denver-larimer/book/`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/locations/denver-larimer/book-service/`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/locations/denver-larimer/book-aescape/`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/locations/denver-larimer/book-remedy-room/`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/locations/denver-larimer/membership/`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/locations/denver-larimer/offers/`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${base}/locations/denver-larimer/gift-cards/`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/locations/denver-larimer/massage/`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/locations/denver-larimer/facials/`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/locations/denver-larimer/sauna/`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/locations/denver-larimer/cold-plunge/`, changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  /* ------------------------------------------------------------------
     Georgetown location
     ------------------------------------------------------------------ */
  const georgetownPages = [
    { url: `${base}/locations/georgetown/`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/locations/georgetown/membership/`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/locations/georgetown/founding-membership/`, changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  /* ------------------------------------------------------------------
     Dallas location
     ------------------------------------------------------------------ */
  const dallasPages = [
    { url: `${base}/locations/dallas/`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/locations/dallas/membership/`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/locations/dallas/founding-membership/`, changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  /* ------------------------------------------------------------------
     Blog posts
     ------------------------------------------------------------------ */
  const blogSlugs = [
    "sway-membership-tiers",
    "best-date-night-ideas-denver",
    "maven-hotel-denver-spa",
    "salt-stone-vs-hot-stone-massage",
    "things-to-do-in-denver-at-night",
    "best-day-spa-in-america",
    "spring-reset",
    "glow-up-before-you-show-up",
    "himalayan-salt-stone-massage",
    "bachelorette-spa-day",
    "vitamin-c-facial",
    "infrared-vs-traditional-sauna",
    "infrared-pemf-mat",
    "holiday-wellness-guide",
    "allergy-season-skincare",
    "bridal-skincare",
    "post-summer-skin-recovery",
    "summer-prep-guide",
    "sun-protection-post-sun-care",
    "mothers-day-gift-guide",
    "sway-shop-finds",
    "cold-plunge",
    "aescape",
    "train-like-an-athlete",
    "80-minute-massage",
    "tech-and-wellness",
    "valentines-day-wellness",
    "sway-spa-membership",
    "denver-wellness-club",
    "may-memberships",
    "give-wellness-get-wellness",
    "science-of-relaxation",
  ];

  const blogPages = [
    { url: `${base}/blog/`, changeFrequency: "weekly" as const, priority: 0.7 },
    ...blogSlugs.map((slug) => ({
      url: `${base}/blog/${slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];

  return [
    ...corePages,
    ...servicePages,
    ...infoPages,
    ...larimerPages,
    ...georgetownPages,
    ...dallasPages,
    ...blogPages,
  ];
}
