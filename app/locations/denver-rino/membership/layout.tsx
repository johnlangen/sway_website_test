import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remedy Lounge Membership · $129/month | Sway RiNo (Denver)",
  description:
    "Unlimited Sway Remedy Lounge access at Sway RiNo for $129/month. One 75-minute recovery session daily: traditional and infrared saunas, cold plunge, and compression therapy. Month-to-month, no enrollment fee. Join online.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-rino/membership/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-rino/membership/",
    title: "Remedy Lounge Membership · $129/month | Sway RiNo",
    description:
      "Unlimited recovery at Sway RiNo. Traditional and infrared saunas, cold plunge, and compression therapy, every day, for $129/month. Join online in 2 minutes.",
    images: [
      {
        url: "/assets/rino1.jpeg",
        width: 959,
        height: 1640,
        alt: "Sway Remedy Lounge at Sway RiNo in Denver",
      },
    ],
    siteName: "Sway Wellness Spa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remedy Lounge Membership · $129/month | Sway RiNo",
    description:
      "Unlimited Remedy Lounge access in Denver's RiNo Art District. One 75-minute recovery session every day for $129/month.",
    images: ["/assets/rino1.jpeg"],
  },
  robots: { index: true, follow: true },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://swaywellnessspa.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Denver RiNo",
      item: "https://swaywellnessspa.com/locations/denver-rino/",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Membership",
      item: "https://swaywellnessspa.com/locations/denver-rino/membership/",
    },
  ],
};

const offerJsonLd = {
  "@context": "https://schema.org",
  "@type": "Offer",
  name: "Remedy Lounge Membership",
  description:
    "Unlimited Sway Remedy Lounge access at Sway RiNo: one 75-minute recovery session per day with traditional and infrared saunas, cold plunge, and compression therapy. Month-to-month, no enrollment fee.",
  price: "129.00",
  priceCurrency: "USD",
  availability: "https://schema.org/InStock",
  url: "https://swaywellnessspa.com/locations/denver-rino/membership/",
  seller: {
    "@type": "DaySpa",
    name: "Sway Wellness Spa · RiNo",
    url: "https://swaywellnessspa.com/locations/denver-rino/",
  },
};

export default function RinoMembershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerJsonLd) }}
      />
      {children}
    </>
  );
}
