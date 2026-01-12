// app/locations/denver-larimer/offers/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Denver Spa Offers & Deals | Sway Wellness Spa Larimer",
  description:
    "Discover exclusive spa offers in Denver at Sway Wellness Spa in Larimer Square. First-visit savings and Remedy Room specials available.",
  alternates: {
    canonical: "/locations/denver-larimer/offers/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-larimer/offers/",
    title: "Denver Spa Offers & Deals | Sway Wellness Spa Larimer",
    description:
      "Exclusive spa offers in Denver at Sway Wellness Spa in Larimer Square.",
    images: [
      {
        url: "/assets/og-offers.jpg",
        width: 1200,
        height: 630,
        alt: "Denver Spa Offers – Sway Wellness Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Denver Spa Offers & Deals | Sway Wellness Spa Larimer",
    description:
      "Exclusive spa offers in Denver at Sway Wellness Spa in Larimer Square.",
    images: ["/assets/og-offers.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LarimerOffersLayout({
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
            name: "Denver – Larimer Square",
            item: "https://swaywellnessspa.com/locations/denver-larimer/",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Offers",
            item: "https://swaywellnessspa.com/locations/denver-larimer/offers/",
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Sway Wellness Spa – Denver Offers",
        url: "https://swaywellnessspa.com/locations/denver-larimer/offers/",
        description:
          "Current spa offers and promotions at Sway Wellness Spa in Denver’s Larimer Square.",
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
