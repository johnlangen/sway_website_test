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
          "/locations/knox-henderson/dashboard",
          "/membership-join-preview",
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
