"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReviewBadge } from "@/app/components/GoogleReviews";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function DallasMembershipPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
          { "@type": "ListItem", position: 2, name: "Locations", item: "https://swaywellnessspa.com/locations" },
          { "@type": "ListItem", position: 3, name: "Dallas", item: "https://swaywellnessspa.com/locations/dallas" },
          { "@type": "ListItem", position: 4, name: "Membership", item: "https://swaywellnessspa.com/locations/dallas/membership" },
        ],
      },
      {
        "@type": "Product",
        name: "Sway Dallas Spa Memberships",
        description:
          "Spa Club and Remedy Room memberships for Sway Dallas starting at $89/month for founding members. Knox/Henderson location coming soon.",
        image: "/assets/OG/og-join-the-club.jpg",
        brand: { "@type": "Brand", name: "Sway Wellness Spa" },
        offers: {
          "@type": "Offer",
          url: "https://swaywellnessspa.com/locations/dallas/membership",
          availability: "https://schema.org/PreOrder",
          priceCurrency: "USD",
          price: "89",
        },
      },
    ],
  };

  return (
    <div className="bg-[#f4f4f1] text-[#113D33] px-4 pt-32 md:pt-40 pb-20 min-h-screen font-vance">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-12" {...fadeUp}>
          <h1 className="text-3xl md:text-5xl font-bold tracking-widest mb-4 uppercase">
            Sway Dallas Memberships
          </h1>
          <p className="text-xl md:text-2xl font-semibold mb-3">
            Founding Member pricing starts at $89/month
          </p>
          <div className="flex justify-center mb-4">
            <ReviewBadge />
          </div>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Two membership tiers will be available at our Knox/Henderson location.
            Lock in your founding rate before Sway Dallas opens.
          </p>
        </motion.div>

        {/* Membership Tiers */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
          <motion.div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg" {...fadeUp}>
            <p className="text-xs uppercase tracking-widest text-[#4A776D] mb-1">Recovery circuit</p>
            <h2 className="text-xl md:text-2xl font-bold mb-2">Remedy Room</h2>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-sm line-through text-gray-400">$139</span>
              <span className="text-3xl font-bold">$89</span>
              <span className="text-sm text-gray-500">/ month</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-[#4A776D] mt-0.5">&#10003;</span>
                4 monthly Remedy Room visits
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4A776D] mt-0.5">&#10003;</span>
                Infrared sauna, cold plunge, compression, LED
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4A776D] mt-0.5">&#10003;</span>
                Additional visits just $20 each
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4A776D] mt-0.5">&#10003;</span>
                $89 facials and massages
              </li>
            </ul>
            <Link
              href="/locations/dallas/founding-membership"
              className="block text-center bg-[#113D33] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              Lock In Founding Rate
            </Link>
          </motion.div>

          <motion.div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg relative" {...fadeUp}>
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-[#113D33] text-white px-4 py-1 rounded-full font-semibold">
              MOST POPULAR
            </span>
            <p className="text-xs uppercase tracking-widest text-[#4A776D] mb-1">Full spa access</p>
            <h2 className="text-xl md:text-2xl font-bold mb-2">Spa Club</h2>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-sm line-through text-gray-400">$139</span>
              <span className="text-3xl font-bold">$89</span>
              <span className="text-sm text-gray-500">/ month</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-[#4A776D] mt-0.5">&#10003;</span>
                1 massage or facial per month
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4A776D] mt-0.5">&#10003;</span>
                Unlimited treatments at $89 each
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4A776D] mt-0.5">&#10003;</span>
                50% off Remedy Room and boosts
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4A776D] mt-0.5">&#10003;</span>
                Member lounge + guest pass monthly
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4A776D] mt-0.5">&#10003;</span>
                Unused credits roll over
              </li>
            </ul>
            <Link
              href="/locations/dallas/founding-membership"
              className="block text-center bg-[#113D33] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              Lock In Founding Rate
            </Link>
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div className="max-w-2xl mx-auto" {...fadeUp}>
          <h2 className="text-xl font-bold text-center mb-6">Membership FAQs</h2>
          <div className="space-y-3">
            <details className="bg-white rounded-xl p-4 group">
              <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                When do memberships start billing?
                <span className="text-lg group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed opacity-80">
                Founding memberships lock in your rate today but don&apos;t bill until Sway Dallas opens. You pay nothing until doors open.
              </p>
            </details>
            <details className="bg-white rounded-xl p-4 group">
              <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                What&apos;s the difference between Spa Club and Remedy Room?
                <span className="text-lg group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed opacity-80">
                Spa Club includes a monthly massage or facial with discounted add-ons and Remedy Room access. Remedy Room gives you 4 monthly recovery circuit visits (sauna, cold plunge, compression, LED) with deeply discounted additional visits.
              </p>
            </details>
            <details className="bg-white rounded-xl p-4 group">
              <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                Will founding rates increase?
                <span className="text-lg group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed opacity-80">
                No. Founding member rates are locked in at $89/month for the life of your membership. Standard pricing after launch will be $139/month.
              </p>
            </details>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div className="text-center mt-12" {...fadeUp}>
          <Link
            href="/locations/dallas/founding-membership"
            className="inline-block bg-[#113D33] text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition"
          >
            Become a Founding Member
          </Link>
          <p className="text-sm text-gray-500 mt-3">No charge until we open</p>
        </motion.div>
      </div>
    </div>
  );
}
