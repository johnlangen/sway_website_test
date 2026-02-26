import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Normatec Compression Therapy in Denver | Sway Wellness Spa",
  description:
    "Normatec compression therapy at Sway, a modern wellness club in Denver. Part of the Remedy Room recovery circuit with infrared sauna, cold plunge, and LED light therapy. Member $25, Drop-In $49.",
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

export default function CompressionTherapyLayout({ children }: { children: React.ReactNode }) {
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
