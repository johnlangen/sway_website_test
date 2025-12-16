import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memberships | Sway Larimer (Denver, CO)",
  description:
    "Explore Sway Larimer's $99/month memberships: Spa Club, Remedy Room, and Aescape Robot Massage. Enjoy exclusive pricing, rollover benefits, and member-only perks in Denver.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-larimer/membership",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-larimer/membership",
    title: "Memberships | Sway Larimer (Denver, CO)",
    description:
      "Explore Sway Larimer memberships: Spa Club, Remedy Room, and Aescape Robot Massage. Unlock exclusive perks, rollover benefits, and founding member pricing in Denver.",
    images: [
      {
        url: "/assets/OG/og-join-the-club.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Larimer Denver Memberships",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Memberships | Sway Larimer (Denver, CO)",
    description:
      "Discover Sway Larimer’s Spa Club, Remedy Room, and Aescape Robot Massage memberships. $99/month with perks, rollovers, and exclusive events in Denver.",
    images: ["/assets/OG/og-join-the-club.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
