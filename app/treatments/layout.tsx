import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treatments | Sway Wellness Spa",
  description:
    "Explore Sway's treatments: facials, massages, Remedy Room recovery, and Aescape robot massage. Designed to restore body and mind in Denver and beyond.",
  alternates: {
    canonical: "https://swaywellnessspa.com/treatments",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/treatments",
    title: "Treatments | Sway Wellness Spa",
    description:
      "Facials, massages, Remedy Room recovery, and Aescape robot massage — explore treatments designed for total wellness.",
    images: [
      {
        url: "/assets/OG/og-treatments.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Wellness Spa Treatments",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Treatments | Sway Wellness Spa",
    description:
      "Facials, massages, Remedy Room recovery, and Aescape robot massage — explore treatments designed for total wellness.",
    images: ["/assets/OG/og-treatments.jpg"],
  },
  robots: { index: true, follow: true },
};

// Optional: Breadcrumb structured data
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
    { "@type": "ListItem", position: 2, name: "Treatments", item: "https://swaywellnessspa.com/treatments" },
  ],
};

export default function TreatmentsLayout({ children }: { children: React.ReactNode }) {
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
