import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all crawlers, except internal + active test/dev routes
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/internal/",
          "/membership-join-preview",
          "/locations/denver-rino/book-service-test",
          "/locations/denver-rino/book-remedy-lounge",
          "/locations/denver-central-park/book-service-test",
          "/locations/denver-central-park/book-remedy-lounge",
        ],
      },
      // Explicitly allow AI search/retrieval bots
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
    ],
    sitemap: "https://swaywellnessspa.com/sitemap.xml",
  };
}
