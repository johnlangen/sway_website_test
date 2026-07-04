import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remedy Lounge Membership · $129/month | Sway Central Park (Denver)",
  description:
    "Unlimited Sway Remedy Lounge access at Sway Central Park for $129/month. One 75-minute recovery session daily: traditional and infrared saunas, cold plunges, warm soak, and compression therapy. Month-to-month, no enrollment fee. Join online.",
  alternates: {
    canonical:
      "https://swaywellnessspa.com/locations/denver-central-park/membership/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-central-park/membership/",
    title: "Remedy Lounge Membership · $129/month | Sway Central Park",
    description:
      "Unlimited recovery at Sway Central Park. Traditional and infrared saunas, cold plunges, warm soak, and compression therapy, every day, for $129/month. Join online in 2 minutes.",
    images: [
      {
        url: "/assets/centralpark1.jpg",
        width: 1200,
        height: 800,
        alt: "Sway Remedy Lounge at Sway Central Park",
      },
    ],
    siteName: "Sway Wellness Spa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remedy Lounge Membership · $129/month | Sway Central Park",
    description:
      "Unlimited Remedy Lounge access near Central Park, Denver. One 75-minute recovery session every day for $129/month.",
    images: ["/assets/centralpark1.jpg"],
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
      name: "Denver Central Park",
      item: "https://swaywellnessspa.com/locations/denver-central-park/",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Membership",
      item: "https://swaywellnessspa.com/locations/denver-central-park/membership/",
    },
  ],
};

const offerJsonLd = {
  "@context": "https://schema.org",
  "@type": "Offer",
  name: "Remedy Lounge Membership",
  description:
    "Unlimited Sway Remedy Lounge access at Sway Central Park: one 75-minute recovery session per day with traditional and infrared saunas, cold plunges, warm soak, and compression therapy. Month-to-month, no enrollment fee.",
  price: "129.00",
  priceCurrency: "USD",
  availability: "https://schema.org/InStock",
  url: "https://swaywellnessspa.com/locations/denver-central-park/membership/",
  seller: {
    "@type": "DaySpa",
    name: "Sway Wellness Spa · Central Park",
    url: "https://swaywellnessspa.com/locations/denver-central-park/",
  },
};

export default function CentralParkMembershipLayout({
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
