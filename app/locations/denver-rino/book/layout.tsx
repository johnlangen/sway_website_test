import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Book a Sway Remedy Lounge session at RiNo | Sway Wellness Spa",
  description:
    "Book a recovery session at Sway Wellness Spa RiNo (formerly Upswell Studio) at 3636 Blake St, Denver. Traditional and infrared saunas, cold plunge, and compression therapy at the Sway Remedy Lounge.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-rino/book/",
  },
  robots: { index: true, follow: true },
};

export default function RinoBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
