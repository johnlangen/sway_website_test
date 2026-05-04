// app/locations/denver-larimer/offers/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Denver Spa Offers & Deals | Sway Wellness Spa Larimer",
  description:
    "First-visit offer: $40 off your first massage or facial ($99). Membership from $99/mo. Remedy Room recovery circuit $49 ($25 members). Sway on Larimer Square, Denver.",
  alternates: {
    canonical: "/locations/denver-larimer/offers/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-larimer/offers/",
    title: "Denver Spa Offers & Deals | Sway Wellness Spa Larimer",
    description:
      "First-visit offer: $40 off your first massage or facial. Memberships from $99/mo. Remedy Room from $25. Sway on Larimer Square.",
    images: [
      {
        url: "/assets/OG/og-offers.jpg",
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
      "First-visit offer: $40 off your first massage or facial. Memberships from $99/mo. Sway on Larimer Square.",
    images: ["/assets/OG/og-offers.jpg"],
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
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
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
  };

  const offersJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Sway Wellness Spa – Denver Larimer Offers",
    url: "https://swaywellnessspa.com/locations/denver-larimer/offers/",
    description:
      "Current spa offers, introductory pricing, and membership deals at Sway Wellness Spa on Larimer Square in Denver, CO.",
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "Offer",
        name: "First Visit Offer",
        description:
          "Enjoy a 50-minute Essential Signature Massage or Facial for just $99 (regularly $139). $40 off for first-time Denver-area guests.",
        price: "99.00",
        priceCurrency: "USD",
        eligibleCustomerType: "http://schema.org/NewCustomer",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-larimer/book/",
        seller: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa – Larimer Square",
          url: "https://swaywellnessspa.com/locations/denver-larimer/",
        },
      },
      {
        "@type": "Offer",
        name: "Sway Membership",
        description:
          "Unlimited massages and facials at $99 each, 50% off boosts and Remedy Room ($25/session), private member lounge, and more.",
        price: "99.00",
        priceCurrency: "USD",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-larimer/membership/",
        seller: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa – Larimer Square",
          url: "https://swaywellnessspa.com/locations/denver-larimer/",
        },
      },
      {
        "@type": "Offer",
        name: "Remedy Room Recovery Circuit",
        description:
          "A guided 40-minute recovery session combining sauna, cold plunge, Normatec compression therapy, and LED light therapy. $49 drop-in, $25 for members.",
        price: "49.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-larimer/book-remedy-room/",
        seller: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa – Larimer Square",
          url: "https://swaywellnessspa.com/locations/denver-larimer/",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offersJsonLd) }}
      />
      {children}
    </>
  );
}
