import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Book a Sway Remedy Lounge session at Central Park | Sway Wellness Spa",
  description:
    "Book a recovery session at Sway Wellness Spa Central Park (formerly Upswell Studio) at 2271 Clinton St, Aurora. Sauna, cold plunge, infrared, and compression therapy in 75-minute Sway Remedy Lounge sessions.",
  alternates: {
    canonical:
      "https://swaywellnessspa.com/locations/denver-central-park/book/",
  },
  // Bridge-period booking page (Mariana Tek widget). Kept out of the index
  // until the Mindbody booking experience replaces it this summer.
  robots: { index: false, follow: true },
};

export default function CentralParkBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
