import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Sway Remedy Lounge session | Sway Wellness Club",
  description:
    "Choose your Denver Sway Wellness Club location (RiNo or Central Park, formerly Upswell Studio) to book a recovery session. Sauna, cold plunge, infrared, and compression therapy.",
  alternates: {
    canonical: "https://swaywellnessspa.com/clubs/book/",
  },
  // Thin location-agnostic club chooser (routes to the two per-location /book
  // pages). Kept out of the index so it doesn't compete with those canonical
  // booking pages; the per-location /book pages carry the SEO.
  robots: { index: false, follow: true },
};

export default function ClubsBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
