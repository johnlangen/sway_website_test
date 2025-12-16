import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Appointment | Sway Larimer (Denver, CO)",
  description:
    "Book Sway Larimer in Denver: targeted facials, deeply effective massage, Remedy Room, and Aescape robot massage. Reserve online or call our team.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-larimer/book",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-larimer/book",
    title: "Book Your Appointment | Sway Larimer (Denver, CO)",
    description:
      "Book facials, massages, Remedy Room, or Aescape robot massage at Sway Larimer in Denver’s historic Larimer Square. Reserve online today.",
    images: [
      {
        url: "/assets/OG/og-book-now.jpg",
        width: 1200,
        height: 630,
        alt: "Book at Sway Larimer Denver",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Your Appointment | Sway Larimer (Denver, CO)",
    description:
      "Book facials, massages, Remedy Room, or Aescape robot massage at Sway Larimer in Denver’s historic Larimer Square. Reserve online today.",
    images: ["/assets/OG/og-book-now.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
