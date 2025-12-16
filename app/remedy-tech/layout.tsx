import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remedy Room | Sway’s Signature Wellness Recovery Experience",
  description:
    "Recharge in the Remedy Room at Sway Wellness Spa. Experience sauna, cold plunge, compression therapy, and LED light therapy — all in one powerful recovery session.",
  alternates: {
    canonical: "https://swaywellnessspa.com/remedy-tech",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/remedy-tech",
    title: "Remedy Room | Sway’s Signature Wellness Recovery Experience",
    description:
      "Sway’s Remedy Room combines sauna, cold plunge, compression therapy, and LED light therapy for total recovery and rejuvenation.",
    images: [
      {
        url: "/assets/OG/og-remedy-room.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Wellness Spa Remedy Room",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Remedy Room | Sway’s Signature Wellness Recovery Experience",
    description:
      "Restore body and mind in Sway’s Remedy Room with sauna, cold plunge, compression therapy, and LED light therapy.",
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
