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
          "Enjoy a 50-minute massage or facial for just $99 (regularly $139). $40 off for first-time Denver-area guests.",
        price: "99.00",
        priceCurrency: "USD",
        eligibleCustomerType: "http://schema.org/NewCustomer",
        availability: "https://schema.org/InStock",
        url: "https://swaywellnessspa.com/locations/denver-larimer/book",
        seller: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa – Larimer Square",
          url: "https://swaywellnessspa.com/locations/denver-larimer",
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
        url: "https://swaywellnessspa.com/locations/denver-larimer/membership",
        seller: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa – Larimer Square",
          url: "https://swaywellnessspa.com/locations/denver-larimer",
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
        url: "https://swaywellnessspa.com/locations/denver-larimer/book-remedy-room",
        seller: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa – Larimer Square",
          url: "https://swaywellnessspa.com/locations/denver-larimer",
        },
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Sway's first-time visitor offer in Denver?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "New guests can get $40 off their first 50-minute massage or facial at Sway Larimer — just $99 (regularly $139). This offer is available for Denver-area locals visiting for the first time. No membership required.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a Sway membership cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sway memberships start at $99 per month. Members get unlimited massages and facials at $99 each (normally $139), 50% off all boost add-ons, Remedy Room sessions for just $25 (normally $49), and access to the private member lounge.",
        },
      },
      {
        "@type": "Question",
        name: "How much is the Remedy Room at Sway?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Remedy Room recovery circuit is $49 per session for non-members and $25 per session for Sway members. It includes a guided 40-minute circuit through sauna, cold plunge, Normatec compression therapy, and LED light therapy.",
        },
      },
      {
        "@type": "Question",
        name: "Can I try Sway without a membership?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Sway is open to everyone — no membership required. Drop-in pricing starts at $129 for massages and $139 for most services. First-time guests can use the intro offer to get a massage or facial for just $99. Memberships are optional and unlock ongoing savings.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
