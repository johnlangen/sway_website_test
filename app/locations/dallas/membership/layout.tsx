import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spa Memberships Dallas | Sway Wellness Club Knox/Henderson",
  description:
    "Sway Knox/Henderson spa memberships: Essential, Premier, and Ultimate tiers with massage, facials, sauna, cold plunge, and recovery. Dallas location coming soon. Join the waitlist for founding member pricing.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/dallas/membership/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/dallas/membership/",
    title: "Spa Memberships Dallas | Sway Wellness Club Knox/Henderson",
    description:
      "Three membership tiers, Essential, Premier, and Ultimate, at Sway Knox/Henderson in Dallas. Join the waitlist for founding member pricing.",
    images: [
      {
        url: "/assets/OG/og-join-the-club.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Knox/Henderson Spa Memberships",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spa Memberships Dallas | Sway Wellness Club Knox/Henderson",
    description:
      "Three membership tiers at Sway Knox/Henderson. Essential, Premier, and Ultimate. Dallas location coming soon.",
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
