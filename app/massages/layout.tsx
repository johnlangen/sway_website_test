import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Massage Therapy | Deep Tissue, Sports, CBD & More | Sway Denver",
  description:
    "Discover expert-led massages at Sway Wellness Spa in Denver. Choose from Deep Tissue, Sports, Salt Stone, CBD, and Lymphatic Drainage — all just $99 for members.",
  alternates: {
    canonical: "https://swaywellnessspa.com/massages",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/massages",
    title: "Massage Therapy | Deep Tissue, Sports, CBD & More | Sway Denver",
    description:
      "Explore massage therapies in Denver including Deep Tissue, Sports, CBD, Salt Stone, and Lymphatic Drainage. Relax, recover, and renew at Sway Wellness Spa.",
    images: [
      {
        url: "/assets/OG/og-massages.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Wellness Spa Massage Therapy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Massage Therapy | Deep Tissue, Sports, CBD & More | Sway Denver",
    description:
      "Discover expert-led massages at Sway Wellness Spa in Denver — Deep Tissue, Sports, Salt Stone, CBD, Lymphatic Drainage, and more.",
    images: ["/assets/OG/og-massages.jpg"],
  },
  robots: { index: true, follow: true },
};

// Breadcrumb JSON-LD
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
    { "@type": "ListItem", position: 2, name: "Massages", item: "https://swaywellnessspa.com/massages" },
  ],
};

export default function MassagesLayout({ children }: { children: React.ReactNode }) {
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
