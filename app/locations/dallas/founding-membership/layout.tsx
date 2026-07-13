import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founding Membership | Sway Knox/Henderson · Dallas",
  description:
    "Become a founding member at Sway Knox/Henderson. Lock in exclusive pricing, VIP perks, and priority access at our new Dallas wellness spa.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/dallas/founding-membership/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/dallas/founding-membership/",
    title: "Become a Founding Member | Sway Knox/Henderson",
    description:
      "Lock in exclusive founding member pricing and VIP perks at Sway Knox/Henderson. Limited spots available.",
    images: [
      {
        url: "/assets/OG/og-join-the-club.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Knox/Henderson Founding Membership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Become a Founding Member | Sway Knox/Henderson",
    description:
      "Lock in exclusive founding member pricing and VIP perks at Sway Knox/Henderson. Limited spots available.",
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
