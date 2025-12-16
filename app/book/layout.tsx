import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Appointment | Sway Wellness Spa",
  description:
    "Book your appointment at Sway Wellness Spa. Choose your location, then reserve facials, massages, Aescape robot massage, or Remedy Room recovery sessions.",
  alternates: {
    canonical: "https://swaywellnessspa.com/book",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/book",
    title: "Book Your Appointment | Sway Wellness Spa",
    description:
      "Reserve your Sway Wellness Spa experience. Select your location to book facials, massages, Aescape, or Remedy Room sessions.",
    images: [
      {
        url: "/assets/OG/og-book-now.jpg",
        width: 1200,
        height: 630,
        alt: "Book at Sway Wellness Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Your Appointment | Sway Wellness Spa",
    description:
      "Reserve your Sway Wellness Spa appointment — facials, massages, Aescape robot massage, or Remedy Room recovery.",
    images: ["/assets/OG/og-book-now.jpg"],
  },
  robots: { index: false, follow: false }, // Hub itself is noindex
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
