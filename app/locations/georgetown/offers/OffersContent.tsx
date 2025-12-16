"use client";

import { motion } from "framer-motion";

export default function OffersContent() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "When will Sway Georgetown open?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sway Georgetown is preparing to open soon. Founding Member offers and launch specials will be announced prior to the grand opening."
        }
      },
      {
        "@type": "Question",
        "name": "Will there be Founding Member offers in Georgetown?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our Georgetown location will feature exclusive Founding Member perks and opening offers. Details will be shared on this page."
        }
      },
      {
        "@type": "Question",
        "name": "How can I stay updated about Sway Georgetown offers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Check back here regularly and follow Sway Wellness Spa on social media for updates about Georgetown offers and opening events."
        }
      }
    ]
  };

  return (
    <div className="bg-[#F8F5F3] min-h-screen flex flex-col items-center px-4 pt-32 md:pt-40 pb-20 text-black">
      {/* Inject JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
          Our <strong>Georgetown, DC</strong> location is preparing to open. 
          Exclusive <strong>Founding Member perks</strong> and launch specials 
          will be posted here as we get closer to welcoming our first guests.
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
