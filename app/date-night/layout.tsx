import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date Night in Denver | Couples Massage at Sway",
  description:
    "Plan the perfect Denver date night — start with a couples massage or facial at Sway Wellness Spa on Larimer Square, then walk to dinner. Open Mon–Fri until 8 PM.",
  alternates: {
    canonical: "https://swaywellnessspa.com/date-night/",
  },
  openGraph: {
    title: "Date Night in Denver | Sway Wellness Spa",
    description:
      "Plan the perfect Denver date night — couples massage or facial at Sway on Larimer Square, then dinner steps away.",
    url: "https://swaywellnessspa.com/date-night/",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "/assets/homepage_photo_outside.jpg",
        width: 1200,
        height: 630,
        alt: "Date night at Sway Wellness Spa on Larimer Square in Denver",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Date Night in Denver | Sway Wellness Spa",
    description:
      "Couples massage or facial at Sway on Larimer Square, then dinner steps away. The easiest date night in Denver.",
    images: ["/assets/homepage_photo_outside.jpg"],
  },
  robots: { index: true, follow: true },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best date night idea in Denver?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "One of the best date nights in Denver is a couples massage or facial at Sway Wellness Spa on Larimer Square followed by dinner at one of the restaurants on the same block. Sway is open Monday–Friday until 8 PM and weekends until 6 PM, making it easy to pair a treatment with an evening out.",
      },
    },
    {
      "@type": "Question",
      name: "Does Sway offer couples massage in Denver?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sway Wellness Spa on Larimer Square offers couples massage in side-by-side treatment rooms. Choose from 18 massage types across 3 tiers — Essential (from $99 member / $139 drop-in), Premier ($129 / $169), and Ultimate ($159 / $199). Book online at swaywellnessspa.com.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a date night at Sway cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A couples massage at Sway starts at $99 per person for members or $139 per person for drop-ins (Essential tier, 50 minutes). Premier ($129/$169) and Ultimate ($159/$199) tiers offer longer sessions up to 90 minutes. Members save on every visit with memberships starting at $99/month.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Sway Wellness Spa located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway is located at 1428 Larimer St. on Larimer Square in downtown Denver, CO 80202. It's walkable from Union Station, surrounded by restaurants, and validates parking for the first hour at the Larimer Square Parking Garage.",
      },
    },
    {
      "@type": "Question",
      name: "Can I book a date night spa package in Denver?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Book two treatments at the same time for a couples experience at Sway. You can also add boosts like LED light therapy or scalp massage. Sway gift cards are available for surprising your partner. Book at swaywellnessspa.com or call (303) 476-6150.",
      },
    },
  ],
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
      name: "Date Night",
      item: "https://swaywellnessspa.com/date-night",
    },
  ],
};

export default function DateNightLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
