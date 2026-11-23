// app/membership/layout.tsx
import { Metadata } from "next";
import { MEMBERSHIP_FAQ } from "./faq";

export const metadata: Metadata = {
  title: { absolute: "Wellness Club Memberships | Sway from $99/month" },
  description:
    "Find your Sway membership by location: Sway Larimer from $99 a month, unlimited Remedy Lounge at RiNo and Central Park, Union Market DC founding memberships.",
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
          "Sway memberships by location. At Sway Larimer in Denver: Essential ($99), Premier ($129) and Ultimate ($159) massage and facial memberships, plus Aescape and Remedy Room memberships. At Sway RiNo and Central Park: the unlimited Remedy Lounge membership ($129) and founding memberships from $89. Founding memberships are open at Sway Union Market in Washington, DC.",
      },
      {
        "@type": "FAQPage",
        // The same questions and answers the page shows (./faq.ts): FAQ markup must match visible text.
        mainEntity: MEMBERSHIP_FAQ.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
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
