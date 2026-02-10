import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sauna, Cold Plunge & Recovery | The Remedy Room at Sway Wellness Spa",
  description:
    "Sauna, cold plunge, compression therapy, and LED light therapy in one 40-minute recovery session. Experience the Remedy Room at Sway Wellness Spa.",
  alternates: {
    canonical: "https://swaywellnessspa.com/remedy-tech",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/remedy-tech",
    title: "Sauna, Cold Plunge & Recovery | The Remedy Room at Sway Wellness Spa",
    description:
      "Sauna, cold plunge, compression therapy, and LED light therapy in one 40-minute recovery session at Sway Wellness Spa.",
    images: [
      {
        url: "/assets/OG/og-remedy-room.jpg",
        width: 1200,
        height: 630,
        alt: "Remedy Room recovery experience at Sway Wellness Spa"
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sauna, Cold Plunge & Recovery | The Remedy Room at Sway Wellness Spa",
    description:
      "Sauna, cold plunge, compression therapy, and LED light therapy in one recovery session at Sway Wellness Spa.",
    images: ["/assets/OG/og-remedy-room.jpg"],
  },
  robots: { index: true, follow: true },
};

// Breadcrumb JSON-LD
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
    { "@type": "ListItem", position: 2, name: "Remedy Room", item: "https://swaywellnessspa.com/remedy-tech" },
  ],
};

export default function RemedyRoomLayout({ children }: { children: React.ReactNode }) {
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
