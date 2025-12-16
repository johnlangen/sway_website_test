"use client";

import { motion } from "framer-motion";

export default function GeorgetownMembershipPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
          { "@type": "ListItem", position: 2, name: "Locations", item: "https://swaywellnessspa.com/locations" },
          { "@type": "ListItem", position: 3, name: "Georgetown", item: "https://swaywellnessspa.com/locations/georgetown" },
          { "@type": "ListItem", position: 4, name: "Membership", item: "https://swaywellnessspa.com/locations/georgetown/membership" },
        ],
      },
      {
        "@type": "Product",
        name: "Sway Georgetown Spa Memberships",
        description:
          "Founding Member memberships for Sway Georgetown. Redeemable for Spa Club and Remedy Room once the DC location opens.",
        image: "/assets/OG/og-join-the-club.jpg",
        brand: { "@type": "Brand", name: "Sway Wellness Spa" },
        offers: {
          "@type": "Offer",
          url: "https://swaywellnessspa.com/locations/georgetown/membership",
          availability: "https://schema.org/PreOrder",
          priceCurrency: "USD",
        },
      },
    ],
  };

  return (
    <div className="bg-[#f4f4f1] text-[#113D33] px-4 pt-32 md:pt-40 min-h-screen font-vance">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          className="text-3xl md:text-5xl font-bold tracking-widest mb-6 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Memberships Coming Soon
        </motion.h1>

        <p className="text-xl md:text-2xl font-semibold mb-6">
          Founding Member perks will launch with Sway Georgetown.
        </p>
        <p className="text-base md:text-lg mb-12 text-gray-700 max-w-2xl mx-auto">
          Spa Club, Remedy Room, and Aescape memberships will be offered with exclusive launch pricing.
          Join our founding DC community and enjoy early perks.
        </p>

        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg max-w-xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2 className="text-xl md:text-2xl font-vance font-bold mb-4 text-[#113D33]">
            Founding Member Memberships
          </h2>
          <p className="text-sm md:text-base font-vance text-gray-700 mb-6">
            Exclusive memberships will be available for <strong>Sway Georgetown</strong>. Join early for launch perks and
            founding member pricing.
          </p>
          <a
            href="/treatments"
            className="inline-block bg-[#4A776D] hover:bg-[#3a5f56] text-white px-6 py-3 rounded-full font-vance font-semibold transition"
          >
            Explore Treatments
          </a>
        </motion.div>
      </div>
    </div>
  );
}
