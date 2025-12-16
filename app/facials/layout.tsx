import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facials in Denver | Sway Wellness Spa in Larimer Square",
  description:
    "Explore Sway’s advanced facials including anti-aging, hydration, acne, and Vitamin C treatments. Book your facial experience in downtown Denver today.",
  alternates: {
    canonical: "https://swaywellnessspa.com/facials",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/facials",
    title: "Facials in Denver | Sway Wellness Spa",
    description:
      "Science-backed facials: anti-aging, hydration, acne, and Vitamin C treatments. Exclusive in downtown Denver.",
    images: [
      {
        url: "/assets/OG/og-facials.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Wellness Spa Facials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Facials in Denver | Sway Wellness Spa",
    description:
      "Explore advanced facials at Sway — anti-aging, hydration, acne, Vitamin C. Book today in downtown Denver.",
    images: ["/assets/OG/og-facials.jpg"],
  },
  robots: { index: true, follow: true },
};

// Breadcrumb JSON-LD
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
    { "@type": "ListItem", position: 2, name: "Facials", item: "https://swaywellnessspa.com/facials" },
  ],
};

export default function FacialsLayout({ children }: { children: React.ReactNode }) {
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
