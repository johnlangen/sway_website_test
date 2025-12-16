import { Metadata } from "next";
import CareersContent from "./CareersContent";

export const metadata: Metadata = {
  title: "Massage Therapist Job – Denver, CO | Sway Wellness Spa",
  description:
    "Apply for Massage Therapist positions at Sway Wellness Spa in Denver, CO. Join our modern, high-end wellness club with flexible schedules, competitive pay, and a supportive team culture.",
  alternates: {
    canonical: "https://swaywellnessspa.com/careers",
  },
  openGraph: {
    title: "Massage Therapist Job – Denver, CO | Sway Wellness Spa",
    description:
      "Join Sway Wellness Spa as a Massage Therapist. Competitive pay, flexible scheduling, advanced modalities, and a next-generation wellness environment.",
    url: "https://swaywellnessspa.com/careers",
    siteName: "Sway Wellness Spa",
    type: "website",
  },
};

export default function Page() {
  // Job posting JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Massage Therapist",
    description:
      "Sway Wellness Spa is seeking full-time and part-time Massage Therapists of all experience levels. Join a modern, technology-forward spa with a supportive team culture and competitive compensation.",
    hiringOrganization: {
      "@type": "Organization",
      name: "Sway Wellness Spa",
      sameAs: "https://swaywellnessspa.com",
      logo: "https://swaywellnessspa.com/assets/logo.png",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Larimer Square",
        addressLocality: "Denver",
        addressRegion: "CO",
        postalCode: "80202",
        addressCountry: "US",
      },
    },
    employmentType: ["FULL_TIME", "PART_TIME"],
    hiringOrganizationSameAs: "https://swaywellnessspa.com",
    applyUrl:
      "https://oc.spaviajobs.com/v2/#/a/job/a2Vlb?source=SwayWebsite",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CareersContent />
    </>
  );
}
