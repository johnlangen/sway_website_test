import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Sway Wellness Spa",
  description:
    "Explore FAQs for each Sway Wellness Spa location. Learn about booking, policies, parking, and what makes Sway unique.",
  alternates: {
    canonical: "https://swaywellnessspa.com/faq",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/faq",
    title: "FAQ | Sway Wellness Spa",
    description:
      "Find answers to common questions about Sway Wellness Spa — booking, cancellations, membership, parking, and more.",
    images: [
      {
        url: "/assets/OG/og-treatments.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Wellness Spa FAQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Sway Wellness Spa",
    description:
      "Answers to common questions about booking, policies, parking, and the Sway experience.",
    images: ["/assets/OG/og-treatments.jpg"],
  },
  robots: { index: true, follow: true },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
    { "@type": "ListItem", position: 2, name: "FAQ", item: "https://swaywellnessspa.com/faq" },
  ],
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
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
