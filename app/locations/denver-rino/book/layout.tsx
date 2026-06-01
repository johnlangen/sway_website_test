import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Book a Sway Remedy Lounge session at RiNo | Sway Wellness Spa",
  description:
    "Book a recovery session at Sway Wellness Spa RiNo (formerly Upswell Studio) at 3636 Blake St, Denver. Sauna, cold plunge, infrared, and compression therapy in 75-minute Sway Remedy Lounge sessions.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-rino/book/",
  },
  // Bridge-period booking page (Mariana Tek widget). Kept out of the index
  // until the Mindbody booking experience replaces it this summer.
  robots: { index: false, follow: true },
};

export default function RinoBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
