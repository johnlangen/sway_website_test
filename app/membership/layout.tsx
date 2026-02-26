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
