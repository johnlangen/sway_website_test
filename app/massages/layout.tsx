import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Massage Therapy | Deep Tissue, Sports, CBD & More | Sway Wellness Spa",
  description:
    "Explore massage therapy at Sway Wellness Spa. Choose from Deep Tissue, Sports, Salt Stone, CBD, and Lymphatic Drainage massage experiences.",
  alternates: {
    canonical: "https://swaywellnessspa.com/massages",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/massages",
    title: "Massage Therapy | Sway Wellness Spa",
    description:
      "Discover expert-led massage experiences designed to relax, recover, and restore balance.",
    images: [
      {
        url: "/assets/OG/og-massages.jpg",
        width: 1200,
        height: 630,
        alt: "Massage experiences at Sway Wellness Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Massage Therapy | Sway Wellness Spa",
    description:
      "Explore massage experiences including Deep Tissue, Sports, CBD, and more at Sway Wellness Spa.",
    images: ["/assets/OG/og-massages.jpg"],
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
      name: "Massages",
      item: "https://swaywellnessspa.com/massages",
    },
  ],
};

export default function MassagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
