import { Metadata } from "next";
import OffersContent from "./OffersContent";

export const metadata: Metadata = {
  title: "Dallas Spa Offers & Founding Member Deals | Sway Wellness Spa",
  description:
    "Sway Dallas is coming soon. Founding Member offers and launch specials will be announced here — check back soon!",
  alternates: {
    canonical: "/locations/dallas/offers/",
  },
  openGraph: {
    type: "website",
    url: "/locations/dallas/offers/",
    title: "Dallas Spa Offers & Founding Member Deals | Sway Wellness Spa",
    description:
      "Sway Dallas is coming soon. Founding Member offers and launch specials will be announced here — check back soon!",
    images: [
      {
        url: "/assets/og-dallas-offers.jpg",
        width: 1200,
        height: 630,
        alt: "Dallas Spa Offers - Sway Wellness Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dallas Spa Offers & Founding Member Deals | Sway Wellness Spa",
    description:
      "Sway Dallas is coming soon. Founding Member offers and launch specials will be announced here — check back soon!",
    images: ["/assets/og-dallas-offers.jpg"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function Page() {
  return <OffersContent />;
}
