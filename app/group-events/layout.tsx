import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Group Events & Spa Parties in Denver | Sway Wellness Spa",
  description:
    "Host your bachelorette party, birthday celebration, corporate wellness event, or group spa day at Sway on Larimer Square in Denver. Massage, facials, and Remedy Room recovery for groups.",
  alternates: {
    canonical: "https://swaywellnessspa.com/group-events",
  },
  openGraph: {
    title: "Group Events & Spa Parties | Sway Wellness Spa",
    description:
      "Bachelorette parties, birthdays, corporate wellness, and group spa days at Sway on Larimer Square in Denver.",
    url: "https://swaywellnessspa.com/group-events",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "/assets/homepage_photo_outside.jpg",
        width: 1200,
        height: 630,
        alt: "Group spa event at Sway Wellness Spa in Denver",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Group Events & Spa Parties | Sway Wellness Spa",
    description:
      "Bachelorette parties, birthdays, corporate wellness, and group spa days at Sway on Larimer Square.",
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
      name: "Can I host a group event at Sway Wellness Spa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sway Wellness Spa on Larimer Square in Denver hosts group events including bachelorette parties, birthday celebrations, corporate wellness outings, and private spa days. Contact the team at contact@swaywellnessspa.com or (303) 476-6150 to plan your event.",
      },
    },
    {
      "@type": "Question",
      name: "Does Sway offer bachelorette spa packages in Denver?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sway is ideal for bachelorette spa days in Denver. Groups can book massage, facials, and the Remedy Room recovery circuit (sauna, cold plunge, Normatec compression, LED light therapy). Located on Larimer Square, it's easy to continue the celebration at nearby restaurants and bars. Book online or contact the team for group coordination.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a group spa day at Sway cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Individual treatments at Sway start at $89 (member) / $129 (drop-in) for a 50-minute massage, and $25 (member) / $49 (drop-in) for the Remedy Room recovery circuit. Group pricing depends on the size of your party and treatments selected. Contact Sway at (303) 476-6150 or contact@swaywellnessspa.com for group coordination.",
      },
    },
    {
      "@type": "Question",
      name: "Can I host a corporate wellness event at Sway?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sway hosts corporate wellness events and team outings. Offerings include massage, facials, Aescape AI-powered robot massage, and the Remedy Room recovery circuit. Sway is located on Larimer Square in downtown Denver, making it easy to combine with team dinners. Contact contact@swaywellnessspa.com to plan.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Sway located for group events?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway Wellness Spa is at 1428 Larimer St. on Larimer Square in downtown Denver, CO 80202. It's walkable from Union Station, surrounded by restaurants and bars, and validates parking for the first hour at the Larimer Square Parking Garage.",
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
      name: "Group Events",
      item: "https://swaywellnessspa.com/group-events",
    },
  ],
};

export default function GroupEventsLayout({
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
