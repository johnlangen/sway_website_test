// app/offers/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spa Offers & Deals | Sway Wellness Spa",
  description:
    "Discover exclusive spa offers at Sway Wellness Spa. Select your location — Denver now open, Dallas and Georgetown coming soon.",
  alternates: {
    canonical: "/offers/",
  },
  openGraph: {
    type: "website",
    url: "/offers/",
    title: "Spa Offers & Deals | Sway Wellness Spa",
    description:
      "Discover exclusive spa offers at Sway Wellness Spa. Select your location — Denver now open, Dallas and Georgetown coming soon.",
    images: [
      {
        url: "/assets/og-offers-hub.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Offers Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spa Offers & Deals | Sway Wellness Spa",
    description:
      "Discover exclusive spa offers at Sway Wellness Spa. Select your location — Denver now open, Dallas and Georgetown coming soon.",
    images: ["/assets/og-offers-hub.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function OffersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD for hub (Breadcrumbs + OfferCatalog)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
          { "@type": "ListItem", position: 2, name: "Offers", item: "https://swaywellnessspa.com/offers/" },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Sway Wellness Spa Offers",
        url: "https://swaywellnessspa.com/offers/",
        description:
          "Exclusive spa offers and membership deals at Sway Wellness Spa. Browse offers by location: Denver open now; Dallas and Georgetown coming soon.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Server component: safe to inline JSON-LD here
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
