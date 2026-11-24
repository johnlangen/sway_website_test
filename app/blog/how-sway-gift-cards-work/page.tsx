import { Metadata } from "next";
import HowSwayGiftCardsWork from "./Article";
import { giftFaqJsonLd, giftFaqs } from "@/lib/giftCards/faq";

const URL = "https://swaywellnessspa.com/blog/how-sway-gift-cards-work/";
const TITLE = "How Sway Gift Cards Work: A Quick Guide Before the Holidays";
const IMAGE = "https://swaywellnessspa.com/gift-cards/art/emily-merry-christmas-storefront-image-ffe0edaf30ca2213.jpg";

export const metadata: Metadata = {
  // absolute: the root layout template would otherwise append a second "| Sway Wellness Spa"
  title: { absolute: TITLE },
  description:
    "How Sway gift cards work: any amount, emailed in minutes or scheduled for a date like Christmas morning, printable, good at every Sway. Plus how late you can buy one.",
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: "Any amount, emailed in minutes or on the day you choose, printable, good at every Sway. How late you can leave it, and how much to give.",
    url: URL,
    siteName: "Sway Wellness Spa",
    images: [{ url: IMAGE, width: 1200, height: 1200, alt: "A Sway gift card design showing the Sway Larimer storefront dressed for Christmas" }],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "Any amount, emailed in minutes or on the day you choose, printable, good at every Sway.",
    images: [IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  // The same questions the page shows (no holiday offer here: it has dates, and this post is kept year-round)
  const faqs = giftFaqs();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: TITLE,
    description:
      "How Sway gift cards work: amounts, designs, email delivery now or on a chosen date, printing, the 24-hour activation, where they can be used, and holiday timing.",
    image: IMAGE,
    author: { "@type": "Organization", name: "Sway Wellness Spa", url: "https://swaywellnessspa.com", logo: "https://swaywellnessspa.com/assets/swaylogo3.png" },
    publisher: { "@type": "Organization", name: "Sway Wellness Spa", logo: { "@type": "ImageObject", url: "https://swaywellnessspa.com/assets/swaylogo3.png" } },
    datePublished: "2026-11-24",
    dateModified: "2026-11-24",
    mainEntityOfPage: { "@type": "WebPage", "@id": URL },
  };
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(giftFaqJsonLd(faqs)) }} />
      <HowSwayGiftCardsWork faqs={faqs} />
    </div>
  );
}
