// app/locations/denver-rino/offers/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RiNo Massage, Facial, Sauna & Cold Plunge Offers | Sway RiNo",
  description:
    "$40 off your first massage or facial (code FTVO40, Mon-Fri, locals only). First Remedy Lounge visit $25 (code FTVORL, any day, locals only). Sway RiNo, 3636 Blake St, Denver.",
  alternates: {
    canonical: "/locations/denver-rino/offers/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-rino/offers/",
    title: "RiNo Massage, Facial, Sauna & Cold Plunge Offers | Sway RiNo",
    description:
      "$40 off your first massage or facial (Mon-Fri, locals only) and a $25 first Remedy Lounge visit (locals only) in Denver's RiNo Art District.",
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
    title: "RiNo Massage, Facial, Sauna & Cold Plunge Offers | Sway RiNo",
    description:
      "$40 off your first massage or facial (Mon-Fri, locals only) and a $25 first Remedy Lounge visit (locals only) in RiNo.",
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
    numberOfItems: 4,
    itemListElement: [
      {
        "@type": "Offer",
        name: "First Massage or Facial (FTVO40)",
        description:
          "$40 off your first massage or facial at any tier (Essential $99, Premier $129, Ultimate $159; regularly $139, $169, $199). Locals only. Valid Monday to Friday for first-time guests. Use code FTVO40 at check-in.",
        price: "99.00",
        priceCurrency: "USD",
        eligibleCustomerType: "http://schema.org/NewCustomer",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-rino/offers/",
        seller: {
          "@type": "DaySpa",
          "@id": "https://swaywellnessspa.com/locations/denver-rino/",
          name: "Sway Wellness Spa · RiNo",
        },
      },
      {
        "@type": "Offer",
        name: "First Remedy Lounge Visit (FTVORL)",
        description:
          "$25 for your first 75-minute Remedy Lounge session (traditional dry sauna, infrared sauna cabins, cold plunge, compression therapy). Regularly $49. Locals only. Valid any day for first-time guests. Use code FTVORL at check-in.",
        price: "25.00",
        priceCurrency: "USD",
        eligibleCustomerType: "http://schema.org/NewCustomer",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-rino/offers/",
        seller: {
          "@type": "DaySpa",
          "@id": "https://swaywellnessspa.com/locations/denver-rino/",
          name: "Sway Wellness Spa · RiNo",
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
          "@type": "DaySpa",
          "@id": "https://swaywellnessspa.com/locations/denver-rino/",
          name: "Sway Wellness Spa · RiNo",
        },
      },
      {
        "@type": "Offer",
        name: "Remedy Lounge Session",
        description:
          "A 75-minute recovery session with traditional dry sauna, infrared sauna cabins, cold plunge, and compression therapy. $49 drop-in; $25 for local first-time guests (code FTVORL, locals only). Unlimited with the $129/mo Remedy Lounge Membership.",
        price: "49.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-rino/offers/",
        seller: {
          "@type": "DaySpa",
          "@id": "https://swaywellnessspa.com/locations/denver-rino/",
          name: "Sway Wellness Spa · RiNo",
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
