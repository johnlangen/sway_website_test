import type { MetadataRoute } from "next";

// Web app manifest — enables "Add to Home Screen" (standalone app feel on
// install) and the Android/Chrome install prompt. iOS uses the apple-touch-icon
// + appleWebApp metadata in layout.tsx; it has no programmatic install.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sway Wellness Spa",
    short_name: "Sway",
    description:
      "Book massage, facials, and recovery at Sway Wellness Spa, Denver.",
    start_url: "/?source=pwa",
    display: "standalone",
    background_color: "#F7F4E9",
    theme_color: "#113D33",
    icons: [
      { src: "/assets/swaylogo3.png", sizes: "any", type: "image/png", purpose: "any" },
    ],
  };
}
