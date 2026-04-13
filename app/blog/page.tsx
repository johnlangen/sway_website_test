import { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "The Sway Edit | Denver Wellness Blog by Sway Spa",
  description:
    "Explore The Sway Edit — 28 articles on massage therapy, skincare science, recovery tech, and Denver lifestyle from Sway Wellness Spa, voted #4 Best Day Spa in America.",
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/",
  },
  openGraph: {
    title: "The Sway Edit | Denver Wellness Blog by Sway Spa",
    description:
      "28 expert articles on massage, skincare, recovery, and wellness from Sway Wellness Spa in Denver. Tips from the team at the #4 Best Day Spa in America.",
    url: "https://swaywellnessspa.com/blog",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/homepage_photo_outside.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Wellness Spa Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function BlogPage() {
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
        name: "Blog",
        item: "https://swaywellnessspa.com/blog",
      },
    ],
  };

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "The Sway Edit",
    description:
      "Expert wellness advice, skincare science, recovery tips, and Denver lifestyle from the team at Sway Wellness Spa — voted #4 Best Day Spa in America by USA Today 10Best.",
    url: "https://swaywellnessspa.com/blog",
    publisher: {
      "@type": "Organization",
      name: "Sway Wellness Spa",
      url: "https://swaywellnessspa.com",
    },
    blogPost: [
      {
        "@type": "BlogPosting",
        headline: "Introducing Sway's New Membership Tiers: Essential, Premier & Ultimate",
        url: "https://swaywellnessspa.com/blog/sway-membership-tiers",
        datePublished: "2026-04-07",
        author: {
          "@type": "Organization",
          name: "Sway Wellness Team",
        },
      },
      {
        "@type": "BlogPosting",
        headline: "#4 Best Day Spa in America: Sway's First Year",
        url: "https://swaywellnessspa.com/blog/best-day-spa-in-america",
        datePublished: "2025-01-01",
        author: {
          "@type": "Organization",
          name: "Sway Wellness Team",
        },
      },
      {
        "@type": "BlogPosting",
        headline:
          "AI Meets Recovery: Reset with Aescape",
        url: "https://swaywellnessspa.com/blog/aescape",
        datePublished: "2025-01-01",
        author: {
          "@type": "Organization",
          name: "Sway Wellness Team",
        },
      },
      {
        "@type": "BlogPosting",
        headline:
          "Cold Outside? Cold Plunge: Why Cold Plunges Are a Hot Trend in Wellness",
        url: "https://swaywellnessspa.com/blog/cold-plunge",
        datePublished: "2025-01-01",
        author: {
          "@type": "Organization",
          name: "Sway Wellness Team",
        },
      },
      {
        "@type": "BlogPosting",
        headline:
          "Science of Relaxation: How Spa Treatments Ease Stress & Anxiety",
        url: "https://swaywellnessspa.com/blog/science-of-relaxation",
        datePublished: "2025-01-01",
        author: {
          "@type": "Organization",
          name: "Sway Wellness Team",
        },
      },
      {
        "@type": "BlogPosting",
        headline: "Best Things to Do in Denver at Night",
        url: "https://swaywellnessspa.com/blog/things-to-do-in-denver-at-night",
        datePublished: "2025-01-01",
        author: {
          "@type": "Organization",
          name: "Sway Wellness Team",
        },
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is The Sway Edit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Sway Edit is the wellness blog by Sway Wellness Spa in Denver, CO. It features expert articles on massage therapy, skincare science, recovery technology, seasonal self-care, and Denver lifestyle — written by the Sway Wellness Team.",
        },
      },
      {
        "@type": "Question",
        name: "What topics does The Sway Edit cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Sway Edit covers massage therapy, skincare and facials, recovery science (cold plunge, sauna, Normatec compression), wellness technology (Aescape AI robot massage, LED therapy, microcurrent), Denver lifestyle, bridal and bachelorette spa planning, and seasonal wellness guides.",
        },
      },
      {
        "@type": "Question",
        name: "Who writes The Sway Edit blog?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All articles on The Sway Edit are written by the Sway Wellness Team — the spa professionals, licensed estheticians, and massage therapists at Sway Wellness Spa on Larimer Square in Denver, CO.",
        },
      },
      {
        "@type": "Question",
        name: "Does Sway Wellness Spa have a blog about skincare and massage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Sway Edit features 28 articles including expert guides on skincare, facials using Eminence Organics and Dr. Dennis Gross products, massage benefits, recovery technology, and wellness trends. New articles are published regularly.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <BlogContent />
    </>
  );
}
