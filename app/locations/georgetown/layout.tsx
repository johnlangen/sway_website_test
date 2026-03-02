import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sway Georgetown – Coming Soon | Wellness Club in Washington, DC",
  description:
    "Sway Wellness Spa is opening soon in Georgetown, Washington, DC. Targeted facials, deeply effective massage, and the Remedy Room recovery lounge coming soon.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/georgetown",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/georgetown",
    title: "Sway Georgetown – Coming Soon | Wellness Club in Washington, DC",
    description:
      "Monthly facials, massage, and Remedy Room recovery are on their way to Georgetown, Washington, DC. Sway Wellness Spa opening soon.",
    images: [
      {
        url: "/assets/SWAY.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Georgetown Coming Soon – Wellness Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sway Georgetown – Coming Soon | Wellness Club in Washington, DC",
    description:
      "Sway Wellness Spa is opening soon in Georgetown. Explore facials, massage, and Remedy Room recovery coming to DC.",
    images: ["/assets/SWAY.jpg"],
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
      name: "Locations",
      item: "https://swaywellnessspa.com/locations",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Georgetown",
      item: "https://swaywellnessspa.com/locations/georgetown",
    },
  ],
};

export default function GeorgetownLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
