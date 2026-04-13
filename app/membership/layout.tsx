// app/membership/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wellness Club Memberships | Sway from $99/month",
  description:
    "Join Sway Wellness Club. Three membership tiers — Essential ($99), Premier ($129), Ultimate ($159) — with massages, facials, 50% off boosts, Remedy Room access, and rollover credits. Denver (now open), Dallas & Georgetown DC (coming soon).",
  alternates: {
    canonical: "https://swaywellnessspa.com/membership/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/membership/",
    title: "Wellness Club Memberships | Sway from $99/month",
    description:
      "Sway Wellness Club memberships from $99/month. Essential, Premier, and Ultimate tiers with massages, facials, and recovery.",
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
    title: "Wellness Club Memberships | Sway from $99/month",
    description:
      "Sway Wellness Club memberships from $99/month. Essential, Premier, and Ultimate tiers with massages, facials, and recovery.",
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
            item: "https://swaywellnessspa.com/membership/",
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
          "Sway Wellness Club memberships from $99/month. Three tiers — Essential, Premier, and Ultimate — with massages, facials, 50% off boosts, Remedy Room access, private lounge, and rollover credits.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How much is a Sway Wellness Spa membership?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sway memberships start at $99/month with three tiers: Essential ($99), Premier ($129), and Ultimate ($159). Each tier includes monthly facials and massages, 50% off boosts, private lounge access, and rollover credits.",
            },
          },
          {
            "@type": "Question",
            name: "What's included in a Sway membership?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "All Sway members enjoy monthly facials and massages at member pricing, 50% off boosts, private member lounge access, rollover credits, and a bring-a-friend benefit. Higher tiers unlock enhanced products, extended sessions, and tech-enhanced treatments.",
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
              text: "No, anyone can book at Sway. Memberships are optional but offer significant savings on massages, facials, boosts, and recovery sessions.",
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
