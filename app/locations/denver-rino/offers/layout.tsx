// app/locations/denver-rino/offers/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RiNo Sauna & Cold Plunge Offers | Sway Wellness Club RiNo",
  description:
    "First Remedy Lounge visit $25 (code FTVORL, any day, locals only, regularly $49). Traditional and infrared saunas, cold plunge, compression therapy. Membership $129/mo. Sway RiNo, 3636 Blake St, Denver.",
  alternates: {
    canonical: "/locations/denver-rino/offers/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-rino/offers/",
    title: "RiNo Sauna & Cold Plunge Offers | Sway Wellness Club RiNo",
    description:
      "$25 first Remedy Lounge visit (locals only, regularly $49). Sauna, cold plunge, and compression therapy in Denver's RiNo Art District. Membership $129/mo.",
    images: [
      {
        url: "/assets/rino1.jpeg",
        width: 959,
        height: 1640,
        alt: "Cold plunge and recovery pool at Sway RiNo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RiNo Sauna & Cold Plunge Offers | Sway Wellness Club RiNo",
    description:
      "$25 first Remedy Lounge visit (locals only, regularly $49). Sauna, cold plunge, and compression therapy in RiNo. Membership $129/mo.",
    images: ["/assets/rino1.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RinoOffersLayout({
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
        name: "Denver – RiNo",
        item: "https://swaywellnessspa.com/locations/denver-rino/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Offers",
        item: "https://swaywellnessspa.com/locations/denver-rino/offers/",
      },
    ],
  };

  const offersJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Sway Wellness Club RiNo – Offers",
    url: "https://swaywellnessspa.com/locations/denver-rino/offers/",
    description:
      "Current offers, introductory pricing, and membership deals at Sway Wellness Club in Denver's RiNo Art District.",
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "Offer",
        name: "First Remedy Lounge Visit (FTVORL)",
        description:
          "$25 for your first 75-minute Remedy Lounge session (traditional dry sauna, infrared sauna cabins, cold plunge, compression therapy). Regularly $49. Locals only. Valid any day for first-time guests. Use code FTVORL at check-in.",
        price: "25.00",
        priceCurrency: "USD",
        eligibleCustomerType: "http://schema.org/NewCustomer",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-rino/book-remedy-lounge/",
        seller: {
          "@type": "HealthAndBeautyBusiness",
          name: "Sway Wellness Club – RiNo",
          url: "https://swaywellnessspa.com/locations/denver-rino/",
        },
      },
      {
        "@type": "Offer",
        name: "Remedy Lounge Membership",
        description:
          "Unlimited Remedy Lounge access at Sway RiNo. One 75-minute session every day. Month-to-month, no enrollment fee, freeze up to 3 months a year.",
        price: "129.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-rino/membership/",
        seller: {
          "@type": "HealthAndBeautyBusiness",
          name: "Sway Wellness Club – RiNo",
          url: "https://swaywellnessspa.com/locations/denver-rino/",
        },
      },
      {
        "@type": "Offer",
        name: "Remedy Lounge Session",
        description:
          "A 75-minute recovery session with traditional dry sauna, infrared sauna cabins, cold plunge, and compression therapy. $49 drop-in, $25 for members or local first-time guests (code FTVORL, locals only).",
        price: "49.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-rino/book-remedy-lounge/",
        seller: {
          "@type": "HealthAndBeautyBusiness",
          name: "Sway Wellness Club – RiNo",
          url: "https://swaywellnessspa.com/locations/denver-rino/",
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
