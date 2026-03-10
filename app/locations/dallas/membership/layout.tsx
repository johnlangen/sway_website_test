import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spa Memberships Dallas | Sway Wellness Club Knox/Henderson",
  description:
    "Sway Dallas spa memberships: Essential, Premier, and Ultimate tiers with massage, facials, sauna, cold plunge, and recovery. Knox/Henderson location coming soon. Join the waitlist for founding member pricing.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/dallas/membership",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/dallas/membership",
    title: "Spa Memberships Dallas | Sway Wellness Club Knox/Henderson",
    description:
      "Three membership tiers — Essential, Premier, and Ultimate — at Sway Dallas in Knox/Henderson. Join the waitlist for founding member pricing.",
    images: [
      {
        url: "/assets/OG/og-join-the-club.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Dallas Spa Memberships",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spa Memberships Dallas | Sway Wellness Club Knox/Henderson",
    description:
      "Three membership tiers at Sway Dallas. Essential, Premier, and Ultimate. Knox/Henderson location coming soon.",
    images: ["/assets/OG/og-join-the-club.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function DallasMembershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
