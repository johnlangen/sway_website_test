import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sway Larimer | Wellness Club in Larimer Square, Denver CO",
  description:
    "Sway Larimer in historic Larimer Square, Denver. Facials, massage, Aescape robot massage, and Remedy Room (cold plunge, sauna, LED). Easy access from LoDo & Union Station.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-larimer",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-larimer",
    title: "Sway Larimer | Wellness Club in Larimer Square, Denver CO",
    description:
      "Monthly rituals, member perks, and science-backed recovery in the heart of downtown Denver.",
    images: [
      // If you have a dedicated 1200x630 OG image for this page, update the URL below.
      {
        url: "/assets/homepage_photo_outside.png",
        width: 1200,
        height: 630,
        alt: "Sway Larimer on Larimer Square in Denver",
      },
    ],
    siteName: "Sway Wellness Spa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sway Larimer | Wellness Club in Larimer Square, Denver CO",
    description:
      "Facials, massage, Remedy Room & Aescape Robot Massage—right on Larimer Square.",
    images: ["/assets/homepage_photo_outside.png"],
  },
  robots: { index: true, follow: true },
};

export default function DenverLarimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
