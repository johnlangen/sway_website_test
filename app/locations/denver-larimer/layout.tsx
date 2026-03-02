import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sway Larimer | Modern Wellness Club on Larimer Square, Denver",
  description:
    "Visit Sway on Larimer Square in downtown Denver. A modern wellness club offering massage therapy, advanced facials, sauna, cold plunge, Normatec compression, and AI-powered Aescape robot massage. Book online today.",
  alternates: {
    canonical: "https://swaywellnessspa.com/locations/denver-larimer",
  },
  openGraph: {
    type: "website",
    url: "https://swaywellnessspa.com/locations/denver-larimer",
    title: "Sway Larimer | Modern Wellness Club on Larimer Square, Denver",
    description:
      "Massage, facials, sauna, cold plunge, Normatec compression, and Aescape robot massage at Sway on Larimer Square in downtown Denver.",
    images: [
      {
        url: "/assets/homepage_photo_outside.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Larimer wellness spa on Larimer Square in Denver",
      },
    ],
    siteName: "Sway Wellness Spa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sway Larimer | Modern Wellness Club in Denver",
    description:
      "Massage, facials, sauna, cold plunge, and Aescape robot massage at Sway on Larimer Square in downtown Denver.",
    images: ["/assets/homepage_photo_outside.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "DaySpa",
  name: "Sway Wellness Spa – Larimer Square",
  description:
    "A modern wellness club on Larimer Square in Denver offering massage therapy, advanced facials, sauna, cold plunge, Normatec compression, LED light therapy, and AI-powered Aescape robot massage.",
  image: "https://swaywellnessspa.com/assets/homepage_photo_outside.jpg",
  "@id": "https://swaywellnessspa.com/locations/denver-larimer",
  url: "https://swaywellnessspa.com/locations/denver-larimer",
  telephone: "+1-303-476-6150",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1428 Larimer St.",
    addressLocality: "Denver",
    addressRegion: "CO",
    postalCode: "80202",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.74794,
    longitude: -104.99844,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "11:00",
      closes: "18:00",
    },
  ],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "111",
    bestRating: "5",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Kristy Wingfield" },
      datePublished: "2026-03",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "I love being a member and coming to Sway. My facials with Bri have been not only absolutely amazing for my skin, but I also have fun with her getting them done. Steven\u2019s massages are awesome as well.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Reilly Moncrief" },
      datePublished: "2026-03",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "I cannot rave about this place enough! I\u2019ve been seeing Bri for facials for a few months now and cannot believe the results. I have always struggled with acne and wish I\u2019d taken photos at the start of my journey to show the progress.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Ricardo Laremont" },
      datePublished: "2026-02",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "If you\u2019re looking for the ultimate recovery spot, Sway Wellness in Larimer Square is a total game-changer. I visited right after a trail race with legs that felt like lead, and I walked out feeling like a new person!",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Evan Marx" },
      datePublished: "2026-01",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Wow. Wow. Wow. Am I happy I chose to make my first massage of my new path towards wellness at Sway. So much, in fact, that they turned a guy that never joins subscriptions into a monthly member. The value you get is unbelievable.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Lilly Sheppard" },
      datePublished: "2026-01",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Brianna is literally the best aesthetician I have received a treatment from. She was super gentle, knowledgeable, and fostered an extremely relaxing environment. 10/10 glow getter facial.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Ian Hines-Ike" },
      datePublished: "2026-01",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "World class massage by Steven. Seriously one of the best I\u2019ve ever had. Will absolutely be making his deep tissue massage a regular part of my routine.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Jessica Matthews" },
      datePublished: "2025-12",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "I came in for a facial with Bri \u2014 it was my first time trying Sway and I could not be happier with the results. Bri was so knowledgeable and took the time to explain everything and recommend simple fixes for my skin.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Avery Weiss" },
      datePublished: "2025-12",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Easily the best spa I\u2019ve ever been to. I\u2019m visiting from out of town and had a crazy 24 hour travel day and was in major need of a massage. The deep tissue massage was both relaxing and therapeutic. The Remedy Room was incredible.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Destiny Abundis" },
      datePublished: "2025-12",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "I\u2019m obsessed with this spa! Everyone here is so kind and welcoming, and the whole place feels clean, calming, and luxurious without being pretentious. My facial was incredible \u2014 I left with glowing skin and the most relaxed feeling.",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Wellness Club Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Massage Therapy",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Basic Massage",
              description:
                "A 50-minute relaxation massage focusing on full-body tension relief.",
            },
            priceSpecification: [
              {
                "@type": "UnitPriceSpecification",
                price: "89.00",
                priceCurrency: "USD",
                name: "Member",
              },
              {
                "@type": "UnitPriceSpecification",
                price: "129.00",
                priceCurrency: "USD",
                name: "Drop-In",
              },
            ],
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Deep Tissue Massage",
              description:
                "A 50-minute deep tissue massage targeting chronic tension and muscle knots.",
            },
            priceSpecification: [
              {
                "@type": "UnitPriceSpecification",
                price: "99.00",
                priceCurrency: "USD",
                name: "Member",
              },
              {
                "@type": "UnitPriceSpecification",
                price: "139.00",
                priceCurrency: "USD",
                name: "Drop-In",
              },
            ],
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Salt Stone Massage",
              description:
                "A 50-minute Himalayan salt stone massage for deep relaxation and mineral-rich detox.",
            },
            priceSpecification: [
              {
                "@type": "UnitPriceSpecification",
                price: "99.00",
                priceCurrency: "USD",
                name: "Member",
              },
              {
                "@type": "UnitPriceSpecification",
                price: "139.00",
                priceCurrency: "USD",
                name: "Drop-In",
              },
            ],
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Sports Massage",
              description:
                "A 50-minute sports massage designed for active recovery and athletic performance.",
            },
            priceSpecification: [
              {
                "@type": "UnitPriceSpecification",
                price: "99.00",
                priceCurrency: "USD",
                name: "Member",
              },
              {
                "@type": "UnitPriceSpecification",
                price: "139.00",
                priceCurrency: "USD",
                name: "Drop-In",
              },
            ],
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "CBD Massage",
              description:
                "A 50-minute massage with CBD oil for enhanced relaxation and inflammation relief.",
            },
            priceSpecification: [
              {
                "@type": "UnitPriceSpecification",
                price: "99.00",
                priceCurrency: "USD",
                name: "Member",
              },
              {
                "@type": "UnitPriceSpecification",
                price: "139.00",
                priceCurrency: "USD",
                name: "Drop-In",
              },
            ],
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Facial Treatments",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Express Facial",
              description:
                "A 30-minute express facial for a quick refresh and glow.",
            },
            priceSpecification: [
              {
                "@type": "UnitPriceSpecification",
                price: "89.00",
                priceCurrency: "USD",
                name: "Member",
              },
              {
                "@type": "UnitPriceSpecification",
                price: "129.00",
                priceCurrency: "USD",
                name: "Drop-In",
              },
            ],
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Forever Young Facial",
              description:
                "A 50-minute anti-aging facial with advanced techniques for skin rejuvenation.",
            },
            priceSpecification: [
              {
                "@type": "UnitPriceSpecification",
                price: "99.00",
                priceCurrency: "USD",
                name: "Member",
              },
              {
                "@type": "UnitPriceSpecification",
                price: "139.00",
                priceCurrency: "USD",
                name: "Drop-In",
              },
            ],
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "HydraFacial",
              description:
                "A 50-minute HydraFacial for deep cleansing, hydration, and radiant skin.",
            },
            priceSpecification: [
              {
                "@type": "UnitPriceSpecification",
                price: "99.00",
                priceCurrency: "USD",
                name: "Member",
              },
              {
                "@type": "UnitPriceSpecification",
                price: "139.00",
                priceCurrency: "USD",
                name: "Drop-In",
              },
            ],
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Aescape Robot Massage",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Aescape 15-Minute Express",
              description:
                "A 15-minute AI-powered autonomous robot massage session.",
            },
            price: "49.00",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Aescape 30-Minute Full Body",
              description:
                "A 30-minute AI-powered full-body robot massage with real-time muscle mapping.",
            },
            price: "69.00",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Aescape 60-Minute Full Body",
              description:
                "A 60-minute AI-powered full-body robot massage with personalized pressure zones.",
            },
            price: "139.00",
            priceCurrency: "USD",
          },
        ],
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Remedy Room Recovery Circuit",
          description:
            "A guided 40-minute recovery circuit combining sauna, cold plunge, Normatec compression therapy, and LED light therapy.",
        },
        priceSpecification: [
          {
            "@type": "UnitPriceSpecification",
            price: "25.00",
            priceCurrency: "USD",
            name: "Member",
          },
          {
            "@type": "UnitPriceSpecification",
            price: "49.00",
            priceCurrency: "USD",
            name: "Drop-In",
          },
        ],
      },
    ],
  },
  sameAs: [
    "https://www.instagram.com/swaywellnessclub/",
    "https://www.facebook.com/swaywellnessspa",
    "https://www.tiktok.com/@swaywellnessclub",
  ],
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://swaywellnessspa.com/locations/denver-larimer/book",
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    result: {
      "@type": "Reservation",
      name: "Sway Wellness Spa Appointment",
    },
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where should I park when visiting Sway Larimer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway Larimer is located on Larimer Square in downtown Denver. We validate parking for the 1st hour at the Larimer Square Parking Garage (1422 Market Street, Denver CO 80202). After the first hour, the rate is $2 every 10 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "What makes Sway different from a traditional spa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sway is a modern wellness club that combines expert-led massage and advanced facials with recovery technology: sauna, cold plunge, Normatec compression, and AI-powered Aescape robot massage. Everything is under one roof and designed for consistent care, not one-off visits.",
      },
    },
    {
      "@type": "Question",
      name: "How do I book a massage or facial at Sway Larimer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book online through swaywellnessspa.com, by phone at (303) 476-6150, or walk in. We recommend booking ahead during evenings and weekends.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a membership to book at Sway?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, anyone can book at Sway. Memberships start at $99/month and unlock savings on every visit, but they're completely optional.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Remedy Room at Sway?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Remedy Room is a guided 40-minute recovery circuit combining sauna, cold plunge, Normatec compression therapy, and LED light therapy. It's $49 per session ($25 for members).",
      },
    },
    {
      "@type": "Question",
      name: "Is Sway Larimer walkable from Union Station?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sway is a short walk from Union Station and centrally located in Larimer Square in downtown Denver.",
      },
    },
    {
      "@type": "Question",
      name: "When should I arrive for my appointment at Sway?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Please arrive about 15 minutes early to check in and settle into the space.",
      },
    },
  ],
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
      name: "Locations",
      item: "https://swaywellnessspa.com/locations",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Denver Larimer",
      item: "https://swaywellnessspa.com/locations/denver-larimer",
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Visit Sway Wellness Spa on Larimer Square",
  description:
    "A step-by-step guide to your visit at Sway Wellness Spa in downtown Denver — from booking to parking to your treatment and beyond.",
  totalTime: "PT90M",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "USD",
    value: "89",
  },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Book Your Appointment",
      text: "Book online at swaywellnessspa.com, by phone at (303) 476-6150, or walk in. Choose from massage, facials, Aescape robot massage, or the Remedy Room recovery circuit. Walk-ins are welcome, but booking ahead is recommended during evenings and weekends.",
      url: "https://swaywellnessspa.com/locations/denver-larimer/book",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Park at the Larimer Square Garage",
      text: "Park at the Larimer Square Parking Garage (1422 Market Street, Denver CO 80202). Sway validates your first hour of parking. After the first hour, the rate is $2 every 10 minutes.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Arrive 15 Minutes Early",
      text: "Arrive about 15 minutes before your treatment to check in and settle in. Enjoy complimentary lemon water or our signature wellness tea in the lounge. Members have a dedicated lounge with lockers, spa robes, sandals, warm aromatherapy neck pillows, and snacks.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Enjoy Your Treatment",
      text: "Your therapist or esthetician will guide your session. Massages and facials are 50 minutes. The Remedy Room is a guided 40-minute recovery circuit through sauna, cold plunge, Normatec compression, and LED light therapy. Aescape robot massage sessions range from 15 to 60 minutes.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Add a Boost (Optional)",
      text: "Enhance your treatment with a boost add-on — options include LED light therapy, microcurrent, oxygen infusion, scalp massage, and more. Members save 50% on all boosts.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Wrap Up and Explore Larimer Square",
      text: "After your treatment, browse the Sway Shop for curated skincare and wellness products. Then step outside onto Larimer Square — Denver's best dining and cocktails are steps away. Book your next visit on the way out or online anytime.",
    },
  ],
};

export default function DenverLarimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      {children}
    </>
  );
}
