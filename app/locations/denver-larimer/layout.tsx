import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Massage, Facials & Sauna in Denver | Sway Larimer Wellness Club",
  description:
    "Relax at Sway Larimer in downtown Denver—massage, facials, sauna, cold plunge, LED therapy & Aescape robot massage. Book online or purchase a gift card.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-larimer",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-larimer",
    title: "Massage, Facials & Recovery Spa in Denver | Sway Larimer",
    description:
      "Massage, facials, sauna, cold plunge & Aescape robot massage in the heart of Larimer Square.",
    images: [
      {
        url: "/assets/homepage_photo_outside.png",
        width: 1200,
        height: 630,
        alt: "Sway Larimer wellness spa on Larimer Square in Denver",
      },
    ],
    siteName: "Sway Wellness Spa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Massage & Facials in Denver | Sway Larimer",
    description:
      "Luxury massage, facials, sauna & cold plunge at Sway Larimer in downtown Denver.",
    images: ["/assets/homepage_photo_outside.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DenverLarimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
