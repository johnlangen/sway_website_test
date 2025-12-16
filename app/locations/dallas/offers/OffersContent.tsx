"use client";

import { motion } from "framer-motion";

export default function OffersContent() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
          { "@type": "ListItem", position: 2, name: "Locations", item: "https://swaywellnessspa.com/locations" },
          { "@type": "ListItem", position: 3, name: "Dallas", item: "https://swaywellnessspa.com/locations/dallas" },
          { "@type": "ListItem", position: 4, name: "Offers", item: "https://swaywellnessspa.com/locations/dallas/offers" },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Dallas Spa Offers - Coming Soon",
        url: "https://swaywellnessspa.com/locations/dallas/offers",
        description: "Founding Member offers and launch specials will be shared here prior to opening.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "When will Sway Dallas open?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sway Dallas is preparing to open soon. Founding Member offers and launch specials will be announced prior to the grand opening.",
            },
          },
          {
            "@type": "Question",
            name: "Will there be Founding Member offers in Dallas?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes! Our Dallas location will feature exclusive Founding Member perks and opening offers. Details will be shared on this page.",
            },
          },
          {
            "@type": "Question",
            name: "How can I stay updated about Sway Dallas offers?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Check back here regularly and follow Sway Wellness Spa on social media for updates about Dallas offers and opening events.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#F8F5F3] min-h-screen flex flex-col items-center px-4 pt-32 md:pt-40 pb-20 text-black">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-vance font-bold text-center mb-8"
      >
        OFFERS — COMING SOON
      </motion.h1>

      {/* Coming Soon Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="bg-white rounded-2xl shadow-md p-8 md:p-12 max-w-xl w-full text-center"
      >
        <h2 className="text-lg md:text-xl font-vance font-bold mb-3 text-[#113D33]">
          Founding Member Offers Coming Soon
        </h2>
        <p className="text-sm md:text-base font-vance text-gray-800 mb-6">
          Our <strong>Dallas, TX</strong> location is preparing to open. Exclusive{" "}
          <strong>Founding Member perks</strong> and launch specials will be shared
          here as we get closer to welcoming our first guests.
        </p>

        <a
          href="/treatments"
          className="inline-block bg-[#4A776D] hover:bg-[#3a5f56] text-white text-sm md:text-base px-6 py-3 rounded-full font-vance font-semibold transition"
        >
          Explore Treatments
        </a>
      </motion.div>
    </div>
  );
}
