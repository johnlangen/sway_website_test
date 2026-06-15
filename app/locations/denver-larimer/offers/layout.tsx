// app/locations/denver-larimer/offers/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Denver Spa Offers & Deals | Sway Wellness Spa Larimer",
  description:
    "First-visit offer FTVO40: $40 off your first massage, facial, or 60-min Aescape (Mon-Fri, locals only). First Remedy Room visit $25 (FTVORR, any day, locals only). Membership from $99/mo. Sway on Larimer Square, Denver.",
  alternates: {
    canonical: "/locations/denver-larimer/offers/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-larimer/offers/",
    title: "Denver Spa Offers & Deals | Sway Wellness Spa Larimer",
    description:
      "$40 off any first visit (Mon-Fri, locals only), $25 first Remedy Room visit (locals only), memberships from $99/mo. Sway on Larimer Square.",
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
      "$40 off first visit (Mon-Fri, locals only), $25 first Remedy Room visit (locals only), memberships from $99/mo. Sway on Larimer Square.",
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
    numberOfItems: 4,
    itemListElement: [
      {
        "@type": "Offer",
        name: "First Visit Offer (FTVO40)",
        description:
          "$40 off your first massage, facial, or 60-minute Aescape robot massage at any tier (Essential, Premier, or Ultimate). Brings first-time guests to member pricing. Locals only. Valid Monday through Friday. Use code FTVO40 at booking.",
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
        name: "First Remedy Room Visit (FTVORR)",
        description:
          "$25 for your first 40-minute Remedy Room recovery circuit (sauna, cold plunge, compression therapy, LED light therapy). Regularly $49. Locals only. Valid any day for first-time guests. Use code FTVORR at booking.",
        price: "25.00",
        priceCurrency: "USD",
        eligibleCustomerType: "http://schema.org/NewCustomer",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-larimer/book-remedy-room/",
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
          "Unlimited massages and facials at member pricing, 50% off boosts and Remedy Room ($25/session), private member lounge, and more.",
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
          "A guided 40-minute recovery session combining sauna, cold plunge, compression therapy, and LED light therapy. $49 drop-in, $25 for members or local first-time guests (code FTVORR, locals only).",
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
