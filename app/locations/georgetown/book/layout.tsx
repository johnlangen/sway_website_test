import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Appointment | Sway Georgetown (Coming Soon)",
  description:
    "Sway Georgetown booking is not open yet. Explore treatments and learn more about our upcoming Washington, DC location.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/georgetown/book",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/georgetown/book",
    title: "Book Your Appointment | Sway Georgetown (Coming Soon)",
    description:
      "Sway Georgetown booking is not open yet. Explore treatments and learn more about our upcoming Washington, DC location.",
    images: [
      {
        url: "/assets/OG/og-book-now.jpg",
        width: 1200,
        height: 630,
        alt: "Book Sway Georgetown Coming Soon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Your Appointment | Sway Georgetown (Coming Soon)",
    description:
      "Sway Georgetown booking is not open yet. Explore treatments and learn more about our upcoming Washington, DC location.",
    images: ["/assets/OG/og-book-now.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function GeorgetownBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
