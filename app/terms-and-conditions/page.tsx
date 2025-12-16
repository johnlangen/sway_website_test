import { Metadata } from "next";
import TermsContent from "./TermsContent";

export const metadata: Metadata = {
  title: "Terms & Conditions | Sway Wellness Spa",
  description:
    "Review the Terms and Conditions for using Sway Wellness Spa’s website, services, memberships, and policies.",
  alternates: {
    canonical: "https://swaywellnessspa.com/terms-and-conditions",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Terms & Conditions | Sway Wellness Spa",
    description:
      "Review the Terms and Conditions for using Sway Wellness Spa’s website, services, memberships, and policies.",
    url: "https://swaywellnessspa.com/terms-and-conditions",
    siteName: "Sway Wellness Spa",
    type: "website",
  },
};

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms & Conditions | Sway Wellness Spa",
    description:
      "Review the Terms and Conditions for using Sway Wellness Spa’s website, services, memberships, and policies.",
    url: "https://swaywellnessspa.com/terms-and-conditions",
    mainEntity: {
      "@type": "CreativeWork",
      name: "Terms and Conditions",
      about:
        "Policies and terms for using Sway Wellness Spa’s services, memberships, and website.",
      dateModified: "2024-09-18",
      publisher: {
        "@type": "Organization",
        name: "Sway Wellness Spa",
        url: "https://swaywellnessspa.com",
        logo: {
          "@type": "ImageObject",
          url: "https://swaywellnessspa.com/assets/homepage_photo_outside.png",
        },
      },
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TermsContent />
    </main>
  );
}
