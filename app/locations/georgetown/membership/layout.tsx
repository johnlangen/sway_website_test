import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memberships | Sway Georgetown (Coming Soon)",
  description:
    "Sway Georgetown memberships are coming soon. Stay tuned for exclusive Spa Club, Remedy Room, and Aescape Robot Massage memberships in Washington, DC.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/georgetown/membership",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/georgetown/membership",
    title: "Memberships | Sway Georgetown (Coming Soon)",
    description:
      "Sway Georgetown memberships are coming soon. Founding Member Spa Club, Remedy Room, and Aescape Robot Massage perks will be available in Washington, DC.",
    images: [
      {
        url: "/assets/OG/og-join-the-club.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Georgetown Memberships Coming Soon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Memberships | Sway Georgetown (Coming Soon)",
    description:
      "Sway Georgetown memberships are coming soon. Stay tuned for exclusive Spa Club, Remedy Room, and Aescape Robot Massage memberships in Washington, DC.",
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
