"use client";

import { motion } from "framer-motion";

export default function OffersPage() {
  return (
    <div className="bg-[#F8F5F3] min-h-screen flex flex-col items-center px-4 pt-32 md:pt-40 pb-20 text-black">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-vance font-bold text-center mb-12"
      >
        OFFERS
      </motion.h1>

      {/* Offer Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-md p-6 md:p-10 max-w-md w-full text-center"
      >
        <h2 className="text-lg md:text-xl font-vance font-bold mb-2">
          FIRST VISIT OFFER
        </h2>
        <h3 className="text-3xl md:text-4xl font-vance font-bold text-[#113D33] mb-4">
          $40 OFF
        </h3>

        <p className="text-sm md:text-base font-vance text-gray-800 mb-4">
          Relax with a 50-minute Facial or Massage for only <strong>$89</strong>
        </p>

        <p className="text-sm md:text-base font-vance text-gray-700 mb-4">
          Valid only for first-time guests. Redeemed at Sway during checkout.
        </p>

        <p className="text-sm md:text-base font-vance text-gray-700 mb-6">
          💡 Use the code <strong>FTVO40</strong> online or in person<br />
          for $40 off your first Facial or Massage.
        </p>

        <p className="text-xs font-vance text-gray-500 mb-6">
          Offer Ends 3.31.25
        </p>

        <a
          href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=-9"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#4A776D] hover:bg-[#3a5f56] text-white text-sm md:text-base px-6 py-3 rounded-full font-vance font-semibold transition"
        >
          BOOK YOUR FIRST VISIT
        </a>
      </motion.div>
    </div>
  );
}
