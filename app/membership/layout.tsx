// app/membership/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wellness Club Memberships | Join Sway from $99/month",
  description:
    "Join Sway, a modern wellness club with locations in Denver. Memberships from $99/month include massage and facial pricing at $99 (reg. $139), 50% off boosts and Remedy Room, private lounge access, and rollover credits.",
  alternates: {
    canonical: "https://swaywellnessspa.com/membership",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/membership",
    title: "Wellness Club Memberships | Join Sway from $99/month",
    description:
      "Join Sway, a modern wellness club. Memberships from $99/month with member pricing on massages, facials, and recovery.",
    images: [
      {
        url: "/assets/OG/og-join-the-club.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Wellness Spa Memberships",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wellness Club Memberships | Join Sway from $99/month",
    description:
      "Sway wellness club memberships from $99/month. Member pricing on massages, facials, and recovery sessions.",
    images: ["/assets/OG/og-join-the-club.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
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
            name: "Memberships",
            item: "https://swaywellnessspa.com/membership",
          },
        ],
      },
      {
        "@type": "Service",
        name: "Wellness Club Memberships",
        provider: {
          "@type": "Organization",
          name: "Sway Wellness Spa",
        },
        description:
          "Monthly wellness club memberships from $99/month. Includes member pricing on massages and facials ($99 vs. $139), 50% off boosts and Remedy Room sessions, private lounge access, and rollover credits.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How much is a Sway Wellness Spa membership?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sway memberships start at $99/month. Members get massages and facials at $99 each (regularly $139), 50% off all boosts and Remedy Room sessions, private lounge access, and rollover credits.",
            },
          },
          {
            "@type": "Question",
            name: "What's included in a Sway membership?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Members enjoy: massages and facials at $99 (vs. $139 drop-in), 50% off boosts and super boosts, Remedy Room sessions at $25 (vs. $49), private member lounge access, rollover credits, and a once-a-month bring-a-friend benefit at member pricing.",
            },
          },
          {
            "@type": "Question",
            name: "Do Sway membership credits roll over?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Unused monthly credits roll over so you never lose a treatment. Use them whenever works best for your schedule.",
            },
          },
          {
            "@type": "Question",
            name: "Can I use my Sway membership at any location?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Sway memberships work across all open Sway locations. Currently Sway is open on Larimer Square in Denver, with Georgetown (DC) and Dallas coming soon.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need a membership to book at Sway?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No, anyone can book at Sway. Memberships are optional but offer significant savings — members save $40 per massage or facial and 50% on recovery sessions and boosts.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
