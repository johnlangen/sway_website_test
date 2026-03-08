import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spa Memberships Dallas | Sway Wellness Club Knox/Henderson",
  description:
    "Sway Dallas spa memberships starting at $89/month. Spa Club and Remedy Room tiers with massage, facials, sauna, cold plunge, and recovery. Knox/Henderson location coming soon.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/dallas/membership",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/dallas/membership",
    title: "Spa Memberships Dallas | Sway Wellness Club Knox/Henderson",
    description:
      "Founding Member pricing from $89/month. Spa Club and Remedy Room memberships at Sway Dallas in Knox/Henderson.",
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
      "Founding Member pricing from $89/month. Spa Club and Remedy Room memberships at Sway Dallas. Knox/Henderson location coming soon.",
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
