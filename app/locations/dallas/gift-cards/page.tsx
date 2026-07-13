import { Metadata } from "next";
import DallasGiftCardsPage from "./DallasGiftCardsPage";

export const metadata: Metadata = {
  title: "Spa Gift Cards Dallas | Coming Soon at Sway Wellness Spa",
  description:
    "Sway Knox/Henderson is opening soon. Spa gift cards for facials, massage, and Remedy Room recovery will be redeemable once we open in Dallas.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/dallas/gift-cards/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/dallas/gift-cards/",
    title: "Spa Gift Cards Dallas | Coming Soon at Sway Wellness Spa",
    description:
      "Sway Knox/Henderson is opening soon. Spa gift cards for facials, massage, and Remedy Room recovery will be redeemable once we open in Dallas.",
    images: [
      {
        url: "/assets/OG/og-gift-cards.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Knox/Henderson Gift Cards Coming Soon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spa Gift Cards Dallas | Coming Soon at Sway Wellness Spa",
    description:
      "Sway Knox/Henderson is opening soon. Spa gift cards for facials, massage, and Remedy Room recovery will be redeemable once we open in Dallas.",
    images: ["/assets/OG/og-gift-cards.jpg"],
  },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <DallasGiftCardsPage />;
}
