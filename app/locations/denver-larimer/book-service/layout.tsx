import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Massage or Facial | Sway Larimer (Denver, CO)",
  description:
    "Book a massage or facial at Sway Larimer in Denver. Choose your treatment, add boosts, pick your therapist, and reserve instantly online.",
  alternates: {
    canonical:
      "https://swaywellnessspa.com/locations/denver-larimer/book-service",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-larimer/book-service",
    title: "Book Massage or Facial | Sway Larimer (Denver, CO)",
    description:
      "Reserve a massage or facial at Sway Larimer in Denver's Larimer Square. Choose your treatment, customize with boosts, and book online.",
    images: [
      {
        url: "/assets/OG/og-aescape.jpg",
        width: 1200,
        height: 630,
        alt: "Massage & Facial at Sway Larimer",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function BookServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
