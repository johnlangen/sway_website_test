import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facial Treatments | Anti-Aging, Hydration & Acne | Sway Wellness Spa",
  description:
    "Explore Sway’s advanced facial treatments including anti-aging, hydration, acne, sensitive skin, and Vitamin C facials. Personalized skincare with real results.",
  alternates: {
    canonical: "https://swaywellnessspa.com/facials",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/facials",
    title: "Facial Treatments | Sway Wellness Spa",
    description:
      "Science-backed facials using cutting-edge skincare and technology. Anti-aging, hydration, acne, and Vitamin C treatments.",
    images: [
      {
        url: "/assets/OG/og-facials.jpg",
        width: 1200,
        height: 630,
        alt: "Facial Treatments at Sway Wellness Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Facial Treatments | Sway Wellness Spa",
    description:
      "Explore advanced facials at Sway — anti-aging, hydration, acne, sensitive skin, and Vitamin C treatments.",
    images: ["/assets/OG/og-facials.jpg"],
  },
  robots: { index: true, follow: true },
};

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
