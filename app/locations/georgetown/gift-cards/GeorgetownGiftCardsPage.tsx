"use client";

import { motion } from "framer-motion";

export default function GeorgetownGiftCardsPage() {
  // JSON-LD schema for breadcrumbs + placeholder product
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
          { "@type": "ListItem", position: 2, name: "Locations", item: "https://swaywellnessspa.com/locations" },
          { "@type": "ListItem", position: 3, name: "Georgetown", item: "https://swaywellnessspa.com/locations/georgetown" },
          { "@type": "ListItem", position: 4, name: "Gift Cards", item: "https://swaywellnessspa.com/locations/georgetown/gift-cards" },
        ],
      },
      {
        "@type": "Product",
        name: "Sway Georgetown Spa Gift Cards",
        description:
          "Wellness gift cards for Sway Georgetown. Redeemable for massage, facials, and Remedy Room sessions once the Washington, DC location opens.",
        image: "/assets/OG/og-gift-cards.jpg",
        brand: { "@type": "Brand", name: "Sway Wellness Spa" },
        offers: {
          "@type": "Offer",
          url: "https://swaywellnessspa.com/locations/georgetown/gift-cards",
          availability: "https://schema.org/PreOrder",
          priceCurrency: "USD",
        },
      },
    ],
  };

  return (
    <div className="bg-[#f4f4f1] min-h-screen flex flex-col items-center px-4 pt-32 md:pt-40 pb-20 text-black">
      {/* JSON-LD schema */}
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
        GIFT CARDS — COMING SOON
      </motion.h1>

      {/* Coming Soon Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="bg-white rounded-2xl shadow-md p-8 md:p-12 max-w-xl w-full text-center"
      >
        <h2 className="text-lg md:text-xl font-vance font-bold mb-3 text-[#113D33]">
          Wellness Gifts for Georgetown
        </h2>
        <p className="text-sm md:text-base font-vance text-gray-800 mb-6">
          Our <strong>Georgetown, DC</strong> location is preparing to open. Sway
          gift cards for massage, facials, and Remedy Room sessions will be
          redeemable here once doors open. Perfect for spa days in the heart of Washington, DC.
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
