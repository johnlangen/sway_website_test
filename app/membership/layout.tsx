// app/membership/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spa Memberships | Join the Club at Sway Wellness Spa",
  description:
    "Explore Sway Wellness Spa memberships. Memberships vary by location — select your spa to view available plans, perks, and pricing.",
  alternates: {
    canonical: "https://swaywellnessspa.com/membership",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/membership",
    title: "Spa Memberships | Join the Club at Sway Wellness Spa",
    description:
      "Explore Sway Wellness Spa memberships. Plans, perks, and pricing vary by location.",
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
    title: "Spa Memberships | Join the Club at Sway Wellness Spa",
    description:
      "Join the Sway Wellness Spa membership club. Memberships vary by location.",
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
        name: "Spa Memberships",
        provider: {
          "@type": "Organization",
          name: "Sway Wellness Spa",
        },
        description:
          "Monthly spa memberships offering exclusive pricing and member perks. Availability varies by location.",
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
