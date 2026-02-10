import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compression Therapy | Normatec Lymphatic Boots at Sway Wellness Spa",
  description:
    "Recover faster and reduce inflammation with compression therapy at Sway Wellness Spa. Experience Normatec lymphatic drainage boots for circulation, detox, and pain relief.",
  alternates: {
    canonical: "https://swaywellnessspa.com/compression-therapy",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/compression-therapy",
    title: "Compression Therapy | Normatec Lymphatic Boots at Sway Wellness Spa",
    description:
      "Boost recovery and circulation with Normatec compression boots at Sway Wellness Spa. Enhance lymphatic drainage, reduce soreness, and accelerate healing.",
    images: [
      {
        url: "/assets/OG/og-compression-therapy.jpg",
        width: 1200,
        height: 630,
        alt: "Compression therapy session with Normatec boots at Sway Wellness Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compression Therapy | Normatec Lymphatic Boots at Sway Wellness Spa",
    description:
      "Improve circulation, reduce inflammation, and speed up recovery with compression therapy at Sway Wellness Spa.",
    images: ["/assets/OG/og-compression-therapy.jpg"],
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
