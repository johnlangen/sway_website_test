import { Metadata } from "next";
import OffersContent from "./OffersContent";

export const metadata: Metadata = {
  title: "Georgetown Spa Offers & Founding Member Deals | Sway Wellness Spa",
  description:
    "Sway Georgetown is coming soon. Exclusive Founding Member offers, perks, and launch specials will be announced here — check back soon!",
  alternates: {
    canonical: "/locations/georgetown/offers/",
  },
  openGraph: {
    type: "website",
    url: "/locations/georgetown/offers/",
    title: "Georgetown Spa Offers & Founding Member Deals | Sway Wellness Spa",
    description:
      "Sway Georgetown will feature exclusive Founding Member perks and launch specials. Stay tuned for our opening!",
    images: [
      {
        url: "/assets/OG/og-offers.jpg",
        width: 1200,
        height: 630,
        alt: "Georgetown Spa Offers - Sway Wellness Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Georgetown Spa Offers & Founding Member Deals | Sway Wellness Spa",
    description:
      "Discover exclusive Founding Member perks and launch specials at Sway Georgetown, opening soon.",
    images: ["/assets/OG/og-offers.jpg"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function Page() {
  return <OffersContent />;
}
