import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cold Plunge Therapy in Denver | Sway Wellness Spa",
  description:
    "Boost immunity, reduce inflammation, and elevate your mood with cold plunge therapy at Sway in Denver. Book a revitalizing 5-minute plunge session today.",
  alternates: {
    canonical: "https://swaywellnessspa.com/cold-plunge",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/cold-plunge",
    title: "Cold Plunge Therapy in Denver | Sway Wellness Spa",
    description:
      "Experience the life-changing benefits of cold plunge therapy at Sway: reduced inflammation, stronger immunity, better sleep, and enhanced mood.",
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
      "Recharge and recover with Sway’s cold plunge therapy — proven to boost energy, reduce pain, and improve sleep.",
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
