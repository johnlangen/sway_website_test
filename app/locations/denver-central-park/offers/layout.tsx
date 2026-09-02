// app/locations/denver-central-park/offers/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Central Park Sauna & Cold Plunge Offers | Sway Wellness Club",
  // FTVORL-CP-PAUSE (Sept 2026): first-visit offer paused during cold
  // plunge maintenance. Restore the $25/FTVORL descriptions when back.
  description:
    "Remedy Lounge sessions $49 drop-in. Traditional and infrared saunas, cold plunges, compression therapy. Membership $129/mo for unlimited access. Sway Central Park, 2271 Clinton St.",
  alternates: {
    canonical: "/locations/denver-central-park/offers/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-central-park/offers/",
    title: "Central Park Sauna & Cold Plunge Offers | Sway Wellness Club",
    description:
      "Remedy Lounge sessions $49 drop-in. Saunas, cold plunges, and compression therapy near Central Park, Denver. Membership $129/mo for unlimited access.",
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
      "Remedy Lounge sessions $49 drop-in. Saunas, cold plunges, and compression therapy near Central Park. Membership $129/mo for unlimited access.",
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
    // FTVORL-CP-PAUSE: the First Remedy Lounge Visit (FTVORL) Offer item
    // ($25, NewCustomer, locals only) is removed while the offer is
    // paused for cold plunge maintenance. Restore it as item 1 when back.
    numberOfItems: 2,
    itemListElement: [
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
          "@type": "DaySpa",
          "@id": "https://swaywellnessspa.com/locations/denver-central-park/",
          name: "Sway Wellness Spa · Central Park",
        },
      },
      {
        "@type": "Offer",
        name: "Remedy Lounge Session",
        description:
          "A 75-minute recovery session with traditional dry sauna, infrared sauna cabins, cold plunges, and compression therapy. $49 drop-in. Unlimited with the $129/mo Remedy Lounge Membership.",
        price: "49.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-central-park/offers/",
        seller: {
          "@type": "DaySpa",
          "@id": "https://swaywellnessspa.com/locations/denver-central-park/",
          name: "Sway Wellness Spa · Central Park",
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
