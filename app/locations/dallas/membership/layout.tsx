import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memberships | Sway Dallas (Coming Soon)",
  description:
    "Sway Dallas is opening soon. Founding Member Spa Club and Remedy Room memberships with exclusive perks will be available in Knox/Henderson.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/dallas/membership",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/dallas/membership",
    title: "Memberships | Sway Dallas (Coming Soon)",
    description:
      "Sway Dallas is opening soon. Spa Club and Remedy Room memberships with exclusive perks will be available in Knox/Henderson.",
    images: [
      {
        url: "/assets/OG/og-join-the-club.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Dallas Memberships Coming Soon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Memberships | Sway Dallas (Coming Soon)",
    description:
      "Sway Dallas is opening soon. Founding Member Spa Club and Remedy Room memberships with exclusive perks will be available in Knox/Henderson.",
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
