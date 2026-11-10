import type { Metadata } from "next";
import { groupHubFaqs } from "@/lib/clubEvents";

export const metadata: Metadata = {
  title: { absolute: "Group Events & Spa Parties in Denver | Sway Wellness Spa" },
  description:
    "Bachelorette parties, birthdays, corporate events and group spa days at three Denver locations: Sway Larimer on Larimer Square, Sway RiNo and Sway Central Park.",
  alternates: {
    canonical: "https://swaywellnessspa.com/group-events/",
  },
  openGraph: {
    title: "Group Events & Spa Parties | Sway Wellness Spa",
    description:
      "Bachelorette parties, birthdays, corporate events and group spa days at Sway in Larimer Square, RiNo and Central Park.",
    url: "https://swaywellnessspa.com/group-events/",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "/assets/homepage_photo_outside.jpg",
        width: 1200,
        height: 630,
        alt: "Group spa event at Sway Wellness Spa in Denver",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Group Events & Spa Parties | Sway Wellness Spa",
    description:
      "Bachelorette parties, birthdays, corporate events and group spa days at three Denver locations.",
    images: ["/assets/homepage_photo_outside.jpg"],
  },
  robots: { index: true, follow: true },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: groupHubFaqs().map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
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
      name: "Group Events",
      item: "https://swaywellnessspa.com/group-events/",
    },
  ],
};

export default function GroupEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
