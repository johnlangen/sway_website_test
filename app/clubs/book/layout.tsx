import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Sway Remedy Lounge session | Sway Wellness Club",
  description:
    "Choose your Denver Sway Wellness Club location (RiNo or Central Park, formerly Upswell Studio) to book a recovery session. Sauna, cold plunge, infrared, and compression therapy.",
  alternates: {
    canonical: "https://swaywellnessspa.com/clubs/book/",
  },
  // Bridge-period club chooser (routes to the Mariana Tek widget pages).
  // Kept out of the index until the Mindbody booking experience replaces it
  // this summer. Mirrors the per-location /book layouts.
  robots: { index: false, follow: true },
};

export default function ClubsBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
