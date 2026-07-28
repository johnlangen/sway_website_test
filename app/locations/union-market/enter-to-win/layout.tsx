import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Win a Year of Wellness at Sway Union Market, Washington DC | Enter to Win",
  description:
    "Enter to win a year of wellness at Sway Union Market. Receive a monthly massage or facial for 12 months. $1,700 value. Union Market, Washington, DC.",
  alternates: {
    canonical:
      "https://swaywellnessspa.com/locations/union-market/enter-to-win/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/union-market/enter-to-win/",
    title: "Win a Year of Wellness at Sway Union Market",
    description:
      "$1,700 value. A monthly massage or facial for 12 months. Bonus entry for following @swaywellnessclub on Instagram.",
    images: [
      {
        url: "/assets/SWAY.jpg",
        width: 1200,
        height: 630,
        alt: "Win a Year of Wellness at Sway Union Market",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Win a Year of Wellness at Sway Union Market",
    description:
      "$1,700 value. A monthly massage or facial for 12 months at the new Sway Union Market in Washington, DC.",
    images: ["/assets/SWAY.jpg"],
  },
  robots: { index: true, follow: true },
};

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
      name: "Locations",
      item: "https://swaywellnessspa.com/locations/",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Union Market",
      item: "https://swaywellnessspa.com/locations/union-market/",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Enter to Win",
      item: "https://swaywellnessspa.com/locations/union-market/enter-to-win/",
    },
  ],
};

// Event schema makes the giveaway more discoverable in Google's rich
// results (giveaways often surface under Event-style cards).
const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Win a Year of Wellness at Sway Union Market",
  description:
    "Enter for a chance to win a year of wellness at Sway Union Market in Washington, DC. One monthly massage or facial for 12 months. Bonus entry for Instagram followers.",
  startDate: "2026-07-27",
  // Placeholder = DC opening window. Confirm before promoting.
  endDate: "2026-12-31",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "VirtualLocation",
    url: "https://swaywellnessspa.com/locations/union-market/enter-to-win/",
  },
  image: "https://swaywellnessspa.com/assets/SWAY.jpg",
  organizer: {
    "@type": "Organization",
    name: "Sway Wellness Spa",
    url: "https://swaywellnessspa.com",
  },
  offers: {
    "@type": "Offer",
    url: "https://swaywellnessspa.com/locations/union-market/enter-to-win/",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
};

export default function EnterToWinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      {children}
    </>
  );
}
