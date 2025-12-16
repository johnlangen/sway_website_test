import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LED Light Therapy | Anti-Aging & Skin Recovery at Sway Denver",
  description:
    "Discover LED Light Therapy at Sway Wellness Spa in Denver. Reduce wrinkles, clear acne, and accelerate muscle recovery with red, blue, and infrared light treatments.",
  alternates: {
    canonical: "https://swaywellnessspa.com/led-light-therapy",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/led-light-therapy",
    title: "LED Light Therapy | Anti-Aging & Skin Recovery at Sway Denver",
    description:
      "Sway’s LED Light Therapy uses LightStim MultiWave® technology with 1,400 medical-grade LEDs to target anti-aging, acne, and regeneration.",
    images: [
      {
        url: "/assets/OG/og-led-light-therapy.jpg",
        width: 1200,
        height: 630,
        alt: "LED Light Therapy session at Sway Wellness Spa in Denver",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LED Light Therapy | Anti-Aging & Skin Recovery at Sway Denver",
    description:
      "Restore skin health and muscle recovery with LED Light Therapy at Sway Wellness Spa. Anti-aging, acne, and regeneration benefits in one session.",
    images: ["/assets/OG/og-led-light-therapy.jpg"],
  },
  robots: { index: true, follow: true },
};

// Breadcrumb JSON-LD
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
    { "@type": "ListItem", position: 2, name: "LED Light Therapy", item: "https://swaywellnessspa.com/led-light-therapy" },
  ],
};

export default function LedLightTherapyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
