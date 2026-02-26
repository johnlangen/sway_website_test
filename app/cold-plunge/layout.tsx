import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cold Plunge Therapy in Denver | Remedy Room at Sway Wellness Spa",
  description:
    "Cold plunge therapy at Sway, a modern wellness club in Denver. Part of the Remedy Room recovery circuit with infrared sauna, Normatec compression, and LED light therapy. Member $25, Drop-In $49.",
  alternates: {
    canonical: "https://swaywellnessspa.com/cold-plunge",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/cold-plunge",
    title: "Cold Plunge Therapy in Denver | Sway Wellness Spa",
    description:
      "Cold plunge therapy as part of the Remedy Room recovery circuit at Sway, a modern wellness club on Larimer Square in Denver.",
    images: [
      {
        url: "/assets/OG/og-cold-plunge.jpg",
        width: 1200,
        height: 630,
        alt: "Cold plunge pool at Sway Wellness Spa in Denver",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cold Plunge Therapy in Denver | Sway Wellness Spa",
    description:
      "Cold plunge for recovery, energy, and resilience at Sway, a modern wellness club in Denver. Part of the Remedy Room circuit.",
    images: ["/assets/OG/og-cold-plunge.jpg"],
  },
  robots: { index: true, follow: true },
};

// Breadcrumb JSON-LD
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
    { "@type": "ListItem", position: 2, name: "Cold Plunge", item: "https://swaywellnessspa.com/cold-plunge" },
  ],
};

export default function ColdPlungeLayout({ children }: { children: React.ReactNode }) {
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
