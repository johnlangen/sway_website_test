import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founding Membership | Sway Union Market DC",
  description:
    "Become a founding member at Sway Union Market. Exclusive pricing, VIP perks, and priority access at our new Washington, DC wellness spa.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/georgetown/founding-membership/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/georgetown/founding-membership/",
    title: "Become a Founding Member | Sway Union Market DC",
    description:
      "Lock in exclusive founding member pricing and VIP perks at Sway Union Market. Limited spots available.",
    images: [
      {
        url: "/assets/OG/og-join-the-club.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Union Market Founding Membership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Become a Founding Member | Sway Union Market DC",
    description:
      "Lock in exclusive founding member pricing and VIP perks at Sway Union Market. Limited spots available.",
    images: ["/assets/OG/og-join-the-club.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function FoundingMembershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
