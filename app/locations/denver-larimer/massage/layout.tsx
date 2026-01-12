import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Massage in Denver | Sway Wellness Spa Larimer Square",
  description:
    "Book a professional massage in Denver at Sway Wellness Spa in Larimer Square. Personalized massage therapy to relieve stress, tension, and support recovery.",
  alternates: {
    canonical: "/locations/denver-larimer/massage/",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-larimer/massage/",
    title: "Massage in Denver | Sway Wellness Spa Larimer Square",
    description:
      "Massage therapy in Denver at Sway Wellness Spa (Larimer Square). Personalized, professional care.",
    images: [
      {
        url: "/assets/OG/og-massage.jpg",
        width: 1200,
        height: 630,
        alt: "Massage therapy at Sway Wellness Spa Denver",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Massage in Denver | Sway Wellness Spa Larimer Square",
    description:
      "Massage therapy in Denver at Sway Wellness Spa (Larimer Square).",
    images: ["/assets/OG/og-massage.jpg"],
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
      name: "Denver – Larimer Square",
      item: "https://swaywellnessspa.com/locations/denver-larimer/",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Massage",
      item: "https://swaywellnessspa.com/locations/denver-larimer/massage/",
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Massage Therapy",
  provider: {
    "@type": "LocalBusiness",
    name: "Sway Wellness Spa",
    url: "https://swaywellnessspa.com",
    image: "https://swaywellnessspa.com/assets/OG/og-massage.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Larimer St",
      addressLocality: "Denver",
      addressRegion: "CO",
      addressCountry: "USA",
    },
  },
  areaServed: {
    "@type": "City",
    name: "Denver",
  },
  description:
    "Professional massage therapy in Denver at Sway Wellness Spa (Larimer Square) focused on relaxation, recovery, and stress relief.",
};

export default function LarimerMassageLayout({
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
