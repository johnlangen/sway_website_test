import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cold Plunge Therapy | Boost Recovery at Sway Wellness Spa",
  description:
    "Boost energy, reduce inflammation, and speed recovery with cold plunge therapy at Sway Wellness Spa. Book a revitalizing session today.",
  alternates: {
    canonical: "https://swaywellnessspa.com/cold-plunge",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/cold-plunge",
    title: "Cold Plunge Therapy | Boost Recovery at Sway Wellness Spa",
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
    title: "Cold Plunge Therapy | Boost Recovery at Sway Wellness Spa",
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
