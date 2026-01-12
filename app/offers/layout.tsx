// app/offers/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spa Offers & Deals | Sway Wellness Spa",
  description:
    "Explore current spa offers and promotions at Sway Wellness Spa. Offers vary by location — select your spa to view available deals.",
  alternates: {
    canonical: "/offers/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/offers/",
    title: "Spa Offers & Deals | Sway Wellness Spa",
    description:
      "Explore current spa offers and promotions at Sway Wellness Spa. Offers vary by location.",
    images: [
      {
        url: "/assets/og-offers-hub.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Wellness Spa Offers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spa Offers & Deals | Sway Wellness Spa",
    description:
      "Explore current spa offers and promotions at Sway Wellness Spa. Offers vary by location.",
    images: ["/assets/og-offers-hub.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function OffersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://swaywellnessspa.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Offers",
            item: "https://swaywellnessspa.com/offers/",
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Sway Wellness Spa Offers",
        url: "https://swaywellnessspa.com/offers/",
        description:
          "Current spa offers and promotions at Sway Wellness Spa. Offers vary by location.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
