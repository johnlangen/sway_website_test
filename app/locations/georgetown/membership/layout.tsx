import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spa Memberships Georgetown DC | Sway Wellness Club",
  description:
    "Sway Georgetown spa memberships: Essential, Premier, and Ultimate tiers with massage, facials, sauna, cold plunge, and recovery. Washington, DC location coming soon. Join the waitlist for founding member pricing.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/georgetown/membership/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/georgetown/membership",
    title: "Spa Memberships Georgetown DC | Sway Wellness Club",
    description:
      "Three membership tiers — Essential, Premier, and Ultimate — at Sway Georgetown in Washington, DC. Join the waitlist for founding member pricing.",
    images: [
      {
        url: "/assets/OG/og-join-the-club.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Georgetown Spa Memberships",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spa Memberships Georgetown DC | Sway Wellness Club",
    description:
      "Three membership tiers at Sway Georgetown. Essential, Premier, and Ultimate. Washington, DC location coming soon.",
    images: ["/assets/OG/og-join-the-club.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function GeorgetownMembershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
