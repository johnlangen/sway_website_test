// app/membership/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the Club | Spa Memberships at Sway Wellness Spa",
  description:
    "Explore Sway Wellness Spa memberships. Join the club and unlock exclusive perks, discounts, and founding member benefits at your nearest Sway location.",
  alternates: {
    canonical: "https://swaywellnessspa.com/membership",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/membership",
    title: "Join the Club | Spa Memberships at Sway Wellness Spa",
    description:
      "Exclusive spa memberships at Sway Wellness Spa. Join the club for discounts, perks, and founding member benefits at your location.",
    images: [
      {
        url: "/assets/OG/og-join-the-club.jpg",
        width: 1200,
        height: 630,
        alt: "Join the Club at Sway Wellness Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join the Club | Spa Memberships at Sway Wellness Spa",
    description:
      "Join the Sway Wellness Spa membership club. Unlock perks, exclusive offers, and founding member benefits.",
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
