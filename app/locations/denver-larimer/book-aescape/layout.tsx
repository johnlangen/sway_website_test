import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Aescape Robot Massage | Sway Larimer (Denver, CO)",
  description:
    "Book the Aescape robot massage at Sway Larimer in Denver. Choose your session length, pick a time, and reserve instantly online.",
  alternates: {
    canonical:
      "https://swaywellnessspa.com/locations/denver-larimer/book-aescape",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-larimer/book-aescape",
    title: "Book Aescape Robot Massage | Sway Larimer (Denver, CO)",
    description:
      "Reserve your Aescape robot massage at Sway Larimer in Denver’s Larimer Square. Choose your session and book online.",
    images: [
      {
        url: "/assets/OG/og-aescape.jpg",
        width: 1200,
        height: 630,
        alt: "Aescape Robot Massage at Sway Larimer",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function BookAescapeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
