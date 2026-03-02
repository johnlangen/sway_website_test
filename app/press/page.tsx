import { Metadata } from "next";
import PressContent from "./PressContent";

export const metadata: Metadata = {
  title: "Press | Sway Wellness Spa in the Media",
  description:
    "Voted #4 Best Day Spa in America by USA Today 10Best. See what the press is saying about Sway — featured in USA Today, The Zoe Report, 5280, Denver Post, and more.",
  alternates: {
    canonical: "https://swaywellnessspa.com/press",
  },
  openGraph: {
    title: "Press | Sway Wellness Spa in the Media",
    description:
      "Voted #4 Best Day Spa in America by USA Today 10Best. See what the press is saying about Sway — featured in USA Today, The Zoe Report, 5280, Denver Post, and more.",
    url: "https://swaywellnessspa.com/press",
    siteName: "Sway Wellness Spa",
    type: "website",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sway Wellness Spa Press Coverage",
    description:
      "Press features and media articles covering Sway Wellness Spa, Denver’s next-generation wellness club.",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        url: "https://10best.usatoday.com/awards/sway-denver-colorado/",
        name: "#4 Best Day Spa in the U.S. — USA Today 10Best Readers' Choice Awards",
      },
      {
        "@type": "ListItem",
        position: 2,
        url: "https://www.thezoereport.com/living/readers-choice-awards-best-us-day-spa",
        name: "TZR 2026 Readers' Choice Awards: Best U.S. Day Spa — The Zoe Report",
      },
      {
        "@type": "ListItem",
        position: 3,
        url: "https://www.bluetoad.com/publication/?i=854210&p=8&view=issueViewer",
        name: "A Demographic-Built Wellness Spa — Salon Today (Modern Spa & Wellness)",
      },
      {
        "@type": "ListItem",
        position: 4,
        url: "https://www.denverpost.com/2025/03/08/wellness-club-sway-larimer-square-ai-robot-massage/",
        name: "AI, Robot Massages & More at Sway — The Denver Post",
      },
      {
        "@type": "ListItem",
        position: 5,
        url: "https://athletechnews.com/built-by-gen-z-for-gen-z-sway-redefines-the-wellness-club/",
        name: "Built by Gen Z for Gen Z — Athletech",
      },
      {
        "@type": "ListItem",
        position: 6,
        url: "https://milehighcre.com/revolutionary-wellness-club-coming-to-larimer-square/",
        name: "Revolutionary Wellness Club Coming to Larimer Square — Mile High CRE",
      },
      {
        "@type": "ListItem",
        position: 7,
        url: "https://www.bizjournals.com/denver/news/2024/11/20/wellness-club-opening-in-denvers-larimer-square.html",
        name: "Sway Wellness Club Opening in Denver’s Larimer Square — Denver Business Journal",
      },
      {
        "@type": "ListItem",
        position: 8,
        url: "https://www.5280.com/i-tried-colorados-first-robot-massage/",
        name: "I Tried Colorado’s First Robot Massage — 5280 Magazine",
      },
      {
        "@type": "ListItem",
        position: 9,
        url: "https://yogalifelive.com/this-new-denver-wellness-club-is-using-robots-to-rethink-self-care/",
        name: "Robots Rethink Self-Care — Yoga+Life",
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
        name: "Where has Sway Wellness Spa been featured?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sway has been featured in USA Today, The Zoe Report, The Denver Post, 5280 Magazine, Athletech News, Yoga+Life, Salon Today, Denver Business Journal, and Mile High CRE, among others.",
        },
      },
      {
        "@type": "Question",
        name: "Is Sway one of the best spas in Denver?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Sway was ranked #4 Best Day Spa in the entire United States by USA Today 10Best in just its first year. It's located on Larimer Square in downtown Denver and offers massage, facials, recovery tech, and AI-powered robot massage.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PressContent />
    </>
  );
}
