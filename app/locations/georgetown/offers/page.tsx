import { Metadata } from "next";
import OffersContent from "./OffersContent";

export const metadata: Metadata = {
  title: "Union Market Spa Offers & Founding Member Deals | Sway Wellness Spa",
  description:
    "Sway Union Market is coming soon. Exclusive Founding Member offers, perks, and launch specials will be announced here. Check back soon!",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/georgetown/offers/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/georgetown/offers/",
    title: "Union Market Spa Offers & Founding Member Deals | Sway Wellness Spa",
    description:
      "Sway Union Market will feature exclusive Founding Member perks and launch specials. Stay tuned for our opening!",
    images: [
      {
        url: "/assets/OG/og-offers.jpg",
        width: 1200,
        height: 630,
        alt: "Union Market Spa Offers - Sway Wellness Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Union Market Spa Offers & Founding Member Deals | Sway Wellness Spa",
    description:
      "Discover exclusive Founding Member perks and launch specials at Sway Union Market, opening soon.",
    images: ["/assets/OG/og-offers.jpg"],
  },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <OffersContent />;
}
