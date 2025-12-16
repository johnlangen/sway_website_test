import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Appointment | Sway Dallas (Coming Soon)",
  description:
    "Sway Dallas booking is not open yet. Explore treatments and learn more about our upcoming Dallas location.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/dallas/book",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/dallas/book",
    title: "Book Your Appointment | Sway Dallas (Coming Soon)",
    description:
      "Sway Dallas booking is not open yet. Explore treatments and learn more about our upcoming Dallas location.",
    images: [
      {
        url: "/assets/OG/og-book-now.jpg",
        width: 1200,
        height: 630,
        alt: "Book Sway Dallas Coming Soon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Your Appointment | Sway Dallas (Coming Soon)",
    description:
      "Sway Dallas booking is not open yet. Explore treatments and learn more about our upcoming Dallas location.",
    images: ["/assets/OG/og-book-now.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function DallasBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
