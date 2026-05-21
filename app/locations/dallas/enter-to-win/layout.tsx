import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Win a 12-Month Sway Dallas Membership | Enter to Win",
  description:
    "Enter to win a free 12-month membership to Sway Dallas. Monthly massage or facial, plus member pricing on everything else. $1,548 value. Free entry. Knox/Henderson, Dallas, TX.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/dallas/enter-to-win/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/dallas/enter-to-win/",
    title: "Win a 12-Month Sway Dallas Membership",
    description:
      "Free entry. $1,548 value. A full year of Sway Dallas membership. Bonus entry for following @swaywellnessclub on Instagram.",
    images: [
      {
        url: "/assets/SWAY.jpg",
        width: 1200,
        height: 630,
        alt: "Win a 12-Month Sway Dallas Membership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Win a 12-Month Sway Dallas Membership",
    description:
      "Free entry. $1,548 value. A free year of Sway Dallas membership in Knox/Henderson.",
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
      name: "Dallas",
      item: "https://swaywellnessspa.com/locations/dallas/",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Enter to Win",
      item: "https://swaywellnessspa.com/locations/dallas/enter-to-win/",
    },
  ],
};

// Event schema makes the giveaway more discoverable in Google's rich
// results (giveaways often surface under Event-style cards).
const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Win a 12-Month Sway Dallas Membership",
  description:
    "Enter for a chance to win a free 12-month membership to Sway Dallas in Knox/Henderson. Monthly facial or massage included plus member pricing. Free entry, bonus entry for Instagram followers.",
  startDate: "2026-05-20",
  // Sister to confirm — placeholder = Dallas opening window
  endDate: "2026-09-30",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "VirtualLocation",
    url: "https://swaywellnessspa.com/locations/dallas/enter-to-win/",
  },
  image: "https://swaywellnessspa.com/assets/SWAY.jpg",
  organizer: {
    "@type": "Organization",
    name: "Sway Wellness Spa",
    url: "https://swaywellnessspa.com",
  },
  offers: {
    "@type": "Offer",
    url: "https://swaywellnessspa.com/locations/dallas/enter-to-win/",
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
