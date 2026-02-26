import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LED Light Therapy in Denver | Anti-Aging & Recovery at Sway",
  description:
    "LED Light Therapy at Sway, a modern wellness club in Denver. LightStim MultiWave® with 1,400 medical-grade LEDs for anti-aging, acne, and recovery. Part of the Remedy Room circuit and available as a facial boost.",
  alternates: {
    canonical: "https://swaywellnessspa.com/led-light-therapy",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/led-light-therapy",
    title: "LED Light Therapy in Denver | Sway Wellness Spa",
    description:
      "LightStim MultiWave® LED Light Therapy at Sway, a modern wellness club on Larimer Square in Denver. Anti-aging, acne, and recovery.",
    images: [
      {
        url: "/assets/OG/og-led-light.jpg",
        width: 1200,
        height: 630,
        alt: "LED Light Therapy session at Sway Wellness Spa in Denver",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LED Light Therapy in Denver | Sway Wellness Spa",
    description:
      "Medical-grade LED Light Therapy for skin health and recovery at Sway, a modern wellness club in Denver. Part of the Remedy Room circuit.",
    images: ["/assets/OG/og-led-light.jpg"],
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
