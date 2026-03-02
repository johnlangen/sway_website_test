import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Normatec Compression Therapy in Denver | Sway Wellness Spa",
  description:
    "Normatec compression therapy at Sway, a modern wellness club in Denver. Part of the Remedy Room recovery circuit with sauna, cold plunge, and LED light therapy. Member $25, Drop-In $49.",
  alternates: {
    canonical: "https://swaywellnessspa.com/compression-therapy",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/compression-therapy",
    title: "Normatec Compression Therapy in Denver | Sway Wellness Spa",
    description:
      "Normatec compression therapy as part of the Remedy Room at Sway, a modern wellness club on Larimer Square in Denver.",
    images: [
      {
        url: "/assets/OG/og-compression.jpg",
        width: 1200,
        height: 630,
        alt: "Compression therapy session with Normatec boots at Sway Wellness Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Normatec Compression Therapy in Denver | Sway Wellness Spa",
    description:
      "Normatec compression for recovery, circulation, and lymphatic drainage at Sway, a modern wellness club in Denver.",
    images: ["/assets/OG/og-compression.jpg"],
  },
  robots: { index: true, follow: true },
};

// Breadcrumb JSON-LD
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
    { "@type": "ListItem", position: 2, name: "Compression Therapy", item: "https://swaywellnessspa.com/compression-therapy" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Normatec compression therapy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Normatec uses dynamic air compression to massage your legs, hips, and lower body. Sequential pulse technology mimics natural muscle contractions to improve circulation, reduce soreness, and speed recovery.",
      },
    },
    {
      "@type": "Question",
      name: "Who benefits from compression therapy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Anyone. Athletes use it for post-workout recovery. Desk workers use it to reduce leg fatigue and swelling. It's also excellent for lymphatic drainage, circulation, and general relaxation.",
      },
    },
    {
      "@type": "Question",
      name: "How do I book Normatec at Sway?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Normatec compression is part of the Remedy Room, a guided 40-minute circuit that also includes sauna, cold plunge, and LED light therapy. Book the Remedy Room at swaywellnessspa.com. $49 drop-in, $25 for members.",
      },
    },
  ],
};

export default function CompressionTherapyLayout({ children }: { children: React.ReactNode }) {
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
