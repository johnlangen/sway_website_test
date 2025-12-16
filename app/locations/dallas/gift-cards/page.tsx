import { Metadata } from "next";
import DallasGiftCardsPage from "./DallasGiftCardsPage";

export const metadata: Metadata = {
  title: "Spa Gift Cards Dallas | Coming Soon at Sway Wellness Spa",
  description:
    "Sway Dallas is opening soon. Spa gift cards for facials, massage, and Remedy Room recovery will be redeemable once we open in Knox/Henderson.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/dallas/gift-cards",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/dallas/gift-cards",
    title: "Spa Gift Cards Dallas | Coming Soon at Sway Wellness Spa",
    description:
      "Sway Dallas is opening soon. Spa gift cards for facials, massage, and Remedy Room recovery will be redeemable once we open in Knox/Henderson.",
    images: [
      {
        url: "/assets/og-giftcard.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Dallas Gift Cards Coming Soon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spa Gift Cards Dallas | Coming Soon at Sway Wellness Spa",
    description:
      "Sway Dallas is opening soon. Spa gift cards for facials, massage, and Remedy Room recovery will be redeemable once we open in Knox/Henderson.",
    images: ["/assets/og-giftcard.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <DallasGiftCardsPage />;
}
