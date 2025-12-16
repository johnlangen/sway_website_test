import { Metadata } from "next";
import MayMembershipsLayout from "./layout";

export const metadata: Metadata = {
  title: "May Memberships | $99 Monthly Wellness at Sway Spa",
  description:
    "Join Sway Wellness Spa for just $99/month. Choose from facials, massages, Remedy Room access, or Aescape robot massage—plus exclusive member perks.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/may-memberships",
  },
  openGraph: {
    title: "May Memberships | $99 Monthly Wellness at Sway Spa",
    description:
      "Discover Sway Wellness Spa’s $99/month memberships. Enjoy facials, massages, Remedy Room, or Aescape robot massage plus perks like discounts and boosts.",
    url: "https://swaywellnessspa.com/blog/may-memberships",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/blog17.png",
        width: 1200,
        height: 630,
        alt: "Sway May Memberships",
      },
    ],
    locale: "en_US",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "May Memberships at Sway Wellness Spa",
    description:
      "Sway Wellness Spa memberships start at $99/month—choose from facials, massages, Remedy Room, or Aescape robot massage with exclusive perks.",
    image: "https://swaywellnessspa.com/assets/blog17.png",
    author: {
      "@type": "Organization",
      name: "Sway Wellness Spa",
    },
    publisher: {
      "@type": "Organization",
      name: "Sway Wellness Spa",
      logo: {
        "@type": "ImageObject",
        url: "https://swaywellnessspa.com/assets/homepage_photo_outside.png",
      },
    },
    datePublished: "2025-05-01",
    dateModified: "2025-05-01",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/may-memberships",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MayMembershipsLayout />
    </main>
  );
}
