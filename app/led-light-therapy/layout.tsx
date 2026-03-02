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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is LED light therapy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LED light therapy uses specific wavelengths of light to stimulate cellular repair and collagen production. Sway uses the LightStim MultiWave® system with 1,400 medical-grade LEDs that deliver multiple wavelengths simultaneously for anti-aging, acne treatment, and recovery.",
      },
    },
    {
      "@type": "Question",
      name: "Is LED light therapy safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. LED light therapy is FDA-cleared, non-invasive, and pain-free. There's no UV exposure and no downtime. It's safe for all skin types and can be combined with facials and other treatments.",
      },
    },
    {
      "@type": "Question",
      name: "How can I get LED light therapy at Sway?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LED light therapy is available two ways at Sway: as part of the Remedy Room recovery circuit ($49 drop-in, $25 members) or as an add-on boost to any facial treatment. Members save 50% on all boosts.",
      },
    },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
