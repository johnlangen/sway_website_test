import { Metadata } from "next";
import OffersContent from "./OffersContent";

export const metadata: Metadata = {
  title: "Denver Spa Offers & Deals | Sway Wellness Spa Larimer",
  description:
    "Discover exclusive spa offers in Denver. Save $40 on your first facial or massage, or try the Remedy Room for only $49. Limited-time offers at Sway Wellness Spa.",
  alternates: {
    canonical: "/locations/denver-larimer/offers/",
  },
  openGraph: {
    type: "website",
    url: "/locations/denver-larimer/offers/",
    title: "Denver Spa Offers & Deals | Sway Wellness Spa Larimer",
    description:
      "Discover exclusive spa offers in Denver. Save $40 on your first facial or massage, or try the Remedy Room for only $49.",
    images: [
      {
        url: "/assets/og-offers.jpg",
        width: 1200,
        height: 630,
        alt: "Denver Spa Offers - Sway Wellness Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Denver Spa Offers & Deals | Sway Wellness Spa Larimer",
    description:
      "Discover exclusive spa offers in Denver. Save $40 on your first facial or massage, or try the Remedy Room for only $49.",
    images: ["/assets/og-offers.jpg"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function Page() {
  return <OffersContent />;
}
