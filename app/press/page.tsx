import { Metadata } from "next";
import PressContent from "./PressContent";

export const metadata: Metadata = {
  title: "Press | Sway Wellness Spa in the Media",
  description:
    "Voted #4 Best Day Spa in America by USA Today 10Best. See what the press is saying about Sway — featured in USA Today, The Zoe Report, 5280, Denver Post, and more.",
  alternates: {
    canonical: "https://swaywellnessspa.com/press/",
  },
  openGraph: {
    title: "Press | Sway Wellness Spa in the Media",
    description:
      "Voted #4 Best Day Spa in America by USA Today 10Best and Best U.S. Day Spa by TZR. Featured in 11 major publications.",
    url: "https://swaywellnessspa.com/press/",
    siteName: "Sway Wellness Spa",
    type: "website",
  },
};

export default function Page() {
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
        name: "Press",
        item: "https://swaywellnessspa.com/press/",
      },
    ],
  };

  const newsArticlesJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Sway Wellness Spa Press Coverage",
    description:
      "Press features, awards, and media articles covering Sway Wellness Spa, voted #4 Best Day Spa in America.",
    mainEntity: [
      {
        "@type": "NewsArticle",
        headline:
          "#4 Best Day Spa in the U.S. — USA Today 10Best Readers' Choice Awards",
        url: "https://10best.usatoday.com/awards/sway-denver-colorado/",
        datePublished: "2025-01-01",
        publisher: {
          "@type": "Organization",
          name: "USA Today",
          url: "https://www.usatoday.com",
        },
        about: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa",
          url: "https://swaywellnessspa.com",
        },
      },
      {
        "@type": "NewsArticle",
        headline:
          "TZR 2026 Readers' Choice Awards: Best U.S. Day Spa",
        url: "https://www.thezoereport.com/living/readers-choice-awards-best-us-day-spa",
        datePublished: "2026-01-01",
        publisher: {
          "@type": "Organization",
          name: "The Zoe Report",
          url: "https://www.thezoereport.com",
        },
        about: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa",
          url: "https://swaywellnessspa.com",
        },
      },
      {
        "@type": "NewsArticle",
        headline:
          "I Got a Robot Massage. Here's Why Human Therapists Shouldn't Worry",
        url: "https://denverite.com/2026/03/17/denver-robot-massage/",
        datePublished: "2026-03-17",
        publisher: {
          "@type": "Organization",
          name: "Denverite",
          url: "https://denverite.com",
        },
        about: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa",
          url: "https://swaywellnessspa.com",
        },
      },
      {
        "@type": "NewsArticle",
        headline:
          "I Got a Massage From the State's First Aescape Robot",
        url: "https://www.cpr.org/show-segment/i-got-a-massage-from-the-states-first-aescape-robot/",
        datePublished: "2026-03-17",
        publisher: {
          "@type": "Organization",
          name: "Colorado Public Radio",
          url: "https://www.cpr.org",
        },
        about: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa",
          url: "https://swaywellnessspa.com",
        },
      },
      {
        "@type": "NewsArticle",
        headline:
          "A Demographic-Built Wellness Spa — Salon Today",
        url: "https://www.bluetoad.com/publication/?i=854210&p=8&view=issueViewer",
        datePublished: "2025-09-01",
        publisher: {
          "@type": "Organization",
          name: "Salon Today",
          url: "https://www.salontoday.com",
        },
        about: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa",
          url: "https://swaywellnessspa.com",
        },
      },
      {
        "@type": "NewsArticle",
        headline:
          "AI, Robot Massages & More at Sway Wellness Club on Larimer Square",
        url: "https://www.denverpost.com/2025/03/08/wellness-club-sway-larimer-square-ai-robot-massage/",
        datePublished: "2025-03-08",
        publisher: {
          "@type": "Organization",
          name: "The Denver Post",
          url: "https://www.denverpost.com",
        },
        about: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa",
          url: "https://swaywellnessspa.com",
        },
      },
      {
        "@type": "NewsArticle",
        headline:
          "Built by Gen Z for Gen Z: Sway Redefines the Wellness Club",
        url: "https://athletechnews.com/built-by-gen-z-for-gen-z-sway-redefines-the-wellness-club/",
        datePublished: "2025-01-15",
        publisher: {
          "@type": "Organization",
          name: "Athletech News",
          url: "https://athletechnews.com",
        },
        about: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa",
          url: "https://swaywellnessspa.com",
        },
      },
      {
        "@type": "NewsArticle",
        headline:
          "Revolutionary Wellness Club Coming to Larimer Square",
        url: "https://milehighcre.com/revolutionary-wellness-club-coming-to-larimer-square/",
        datePublished: "2024-10-01",
        publisher: {
          "@type": "Organization",
          name: "Mile High CRE",
          url: "https://milehighcre.com",
        },
        about: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa",
          url: "https://swaywellnessspa.com",
        },
      },
      {
        "@type": "NewsArticle",
        headline:
          "Sway Wellness Club Opening in Denver's Larimer Square",
        url: "https://www.bizjournals.com/denver/news/2024/11/20/wellness-club-opening-in-denvers-larimer-square.html",
        datePublished: "2024-11-20",
        publisher: {
          "@type": "Organization",
          name: "Denver Business Journal",
          url: "https://www.bizjournals.com/denver",
        },
        about: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa",
          url: "https://swaywellnessspa.com",
        },
      },
      {
        "@type": "NewsArticle",
        headline: "I Tried Colorado's First Robot Massage",
        url: "https://www.5280.com/i-tried-colorados-first-robot-massage/",
        datePublished: "2025-04-01",
        publisher: {
          "@type": "Organization",
          name: "5280 Magazine",
          url: "https://www.5280.com",
        },
        about: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa",
          url: "https://swaywellnessspa.com",
        },
      },
      {
        "@type": "NewsArticle",
        headline:
          "This New Denver Wellness Club Is Using Robots to Rethink Self-Care",
        url: "https://yogalifelive.com/this-new-denver-wellness-club-is-using-robots-to-rethink-self-care/",
        datePublished: "2025-05-01",
        publisher: {
          "@type": "Organization",
          name: "Yoga+Life",
          url: "https://yogalifelive.com",
        },
        about: {
          "@type": "DaySpa",
          name: "Sway Wellness Spa",
          url: "https://swaywellnessspa.com",
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
        name: "What awards has Sway Wellness Spa won?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sway was voted #4 Best Day Spa in America by USA Today 10Best Readers' Choice Awards (2025). Sway was also named Best U.S. Day Spa by The Zoe Report Readers' Choice Awards (2026).",
        },
      },
      {
        "@type": "Question",
        name: "Where has Sway Wellness Spa been featured in the press?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sway has been featured in 11 major publications including USA Today, The Zoe Report, Colorado Public Radio, The Denver Post, Denverite, 5280 Magazine, Athletech News, Yoga+Life, Salon Today (Modern Spa & Wellness), Denver Business Journal, and Mile High CRE.",
        },
      },
      {
        "@type": "Question",
        name: "Is Sway one of the best spas in Denver?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Sway was ranked #4 Best Day Spa in the entire United States by USA Today 10Best in just its first year. It's located on Larimer Square in downtown Denver and offers 18 massage types, 13 facial treatments across 3 tiers, the Remedy Room recovery circuit, and AI-powered Aescape robot massage.",
        },
      },
      {
        "@type": "Question",
        name: "How can I contact Sway for press inquiries?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For media requests, interviews, or press materials, contact the Sway team at contact@swaywellnessspa.com.",
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
          __html: JSON.stringify(newsArticlesJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PressContent />
    </>
  );
}
