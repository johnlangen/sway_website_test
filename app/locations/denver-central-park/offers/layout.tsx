// app/locations/denver-central-park/offers/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Central Park Sauna & Cold Plunge Offers | Sway Wellness Club",
  description:
    "First Remedy Lounge visit $25 (code FTVORL, any day, locals only, regularly $49). Traditional and infrared saunas, cold plunges, warm soak, compression therapy. Membership $129/mo. Sway Central Park, 2271 Clinton St.",
  alternates: {
    canonical: "/locations/denver-central-park/offers/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-central-park/offers/",
    title: "Central Park Sauna & Cold Plunge Offers | Sway Wellness Club",
    description:
      "$25 first Remedy Lounge visit (locals only, regularly $49). Saunas, cold plunges, warm soak, and compression therapy near Central Park, Denver. Membership $129/mo.",
    images: [
      {
        url: "/assets/centralpark1.jpg",
        width: 1200,
        height: 800,
        alt: "Recovery pools at Sway Central Park",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Central Park Sauna & Cold Plunge Offers | Sway Wellness Club",
    description:
      "$25 first Remedy Lounge visit (locals only, regularly $49). Saunas, cold plunges, and compression therapy near Central Park. Membership $129/mo.",
    images: ["/assets/centralpark1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CentralParkOffersLayout({
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
        name: "Denver – Central Park",
        item: "https://swaywellnessspa.com/locations/denver-central-park/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Offers",
        item: "https://swaywellnessspa.com/locations/denver-central-park/offers/",
      },
    ],
  };

  const offersJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Sway Wellness Club Central Park – Offers",
    url: "https://swaywellnessspa.com/locations/denver-central-park/offers/",
    description:
      "Current offers, introductory pricing, and membership deals at Sway Wellness Club near Central Park in Denver.",
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "Offer",
        name: "First Remedy Lounge Visit (FTVORL)",
        description:
          "$25 for your first 75-minute Remedy Lounge session (traditional dry sauna, infrared sauna cabins, cold plunges, warm soak, compression therapy). Regularly $49. Locals only. Valid any day for first-time guests. Use code FTVORL at check-in.",
        price: "25.00",
        priceCurrency: "USD",
        eligibleCustomerType: "http://schema.org/NewCustomer",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-central-park/book-remedy-lounge/",
        seller: {
          "@type": "HealthAndBeautyBusiness",
          name: "Sway Wellness Club – Central Park",
          url: "https://swaywellnessspa.com/locations/denver-central-park/",
        },
      },
      {
        "@type": "Offer",
        name: "Remedy Lounge Membership",
        description:
          "Unlimited Remedy Lounge access at Sway Central Park. One 75-minute session every day. Month-to-month, no enrollment fee, freeze up to 3 months a year.",
        price: "129.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-central-park/membership/",
        seller: {
          "@type": "HealthAndBeautyBusiness",
          name: "Sway Wellness Club – Central Park",
          url: "https://swaywellnessspa.com/locations/denver-central-park/",
        },
      },
      {
        "@type": "Offer",
        name: "Remedy Lounge Session",
        description:
          "A 75-minute recovery session with traditional dry sauna, infrared sauna cabins, cold plunges, warm soak, and compression therapy. $49 drop-in, $25 for members or local first-time guests (code FTVORL, locals only).",
        price: "49.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-central-park/book-remedy-lounge/",
        seller: {
          "@type": "HealthAndBeautyBusiness",
          name: "Sway Wellness Club – Central Park",
          url: "https://swaywellnessspa.com/locations/denver-central-park/",
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
