import { Metadata } from "next";
import CareersContent from "./CareersContent";
import { openJobs } from "@/lib/careers";

// Open roles are read from Sway's Discovered hiring site, refreshed hourly (lib/careers.ts)
export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Careers at Sway Wellness Spa | Spa Jobs in Denver, CO" },
  description:
    "Build a career in wellness at Sway: Larimer Square, RiNo and Central Park in the Denver area, with Washington, DC and Dallas coming soon. Massage therapists, estheticians, wellness coordinators and managers.",
  alternates: {
    canonical: "https://swaywellnessspa.com/careers/",
  },
  openGraph: {
    title: "Careers at Sway Wellness Spa | Spa Jobs in Denver, CO",
    description: "Join the team at Sway's Denver-area locations: massage therapists, estheticians, wellness coordinators and managers.",
    url: "https://swaywellnessspa.com/careers/",
    siteName: "Sway Wellness Spa",
    type: "website",
  },
};

export default async function Page() {
  const jobs = await openJobs();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is Sway Wellness Spa hiring?",
        acceptedAnswer: {
          "@type": "Answer",
          text: jobs?.length
            ? `Yes. Sway is hiring at Sway Larimer in Denver, CO: ${jobs.map((j) => j.title).join(", ")}. See every opening and apply at swaywellnessspa.com/careers/.`
            : "See current openings at Sway's Larimer, RiNo and Central Park locations at swaywellnessspa.com/careers/.",
        },
      },
      {
        "@type": "Question",
        name: "What's it like working at Sway?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sway has three Denver-area locations: a day spa in Larimer Square with massages, facials, the Remedy Room recovery circuit and Aescape, and wellness clubs in RiNo and Central Park. Team members get competitive pay with gratuity and bonuses, paid in-house training, flexible schedules and a supportive, family culture.",
        },
      },
      {
        "@type": "Question",
        name: "How do I apply for a job at Sway Wellness Spa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Choose a role at swaywellnessspa.com/careers/ and apply online. Questions? Email contact@swaywellnessspa.com.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <CareersContent jobs={jobs} />
    </>
  );
}
