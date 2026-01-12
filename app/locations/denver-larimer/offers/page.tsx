// app/locations/denver-larimer/offers/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LarimerOffersPage() {
  return (
    <main className="bg-[#F8F5F3] text-black min-h-screen font-vance">

      {/* INTRO */}
      <section className="pt-28 pb-10 px-6 text-center max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          Exclusive Spa Offers in Denver
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-base md:text-xl text-gray-700"
        >
          Limited-time savings on massage, facials, and our Remedy Room at Sway
          Wellness Spa in Larimer Square.
        </motion.p>
      </section>

      {/* OFFERS (PRIMARY CONTENT) */}
      <section className="max-w-6xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* First Visit Offer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-md p-8 text-center"
        >
          <h2 className="text-xl font-bold mb-2">First Visit Offer</h2>
          <p className="text-4xl font-bold text-[#113D33] mb-4">$40 OFF</p>

          <p className="mb-4">
            Enjoy a 50-minute massage or facial for just{" "}
            <strong>$99</strong>
            <br />
            <span className="text-sm text-gray-600">
              (regularly $139)
            </span>
          </p>

          <p className="text-sm text-gray-600 mb-6">
            Available for first-time guests only.
          </p>

          <Link
            href="/book"
            className="inline-block bg-[#4A776D] hover:bg-[#3a5f56] text-white px-6 py-3 rounded-full font-semibold transition"
          >
            Book Your First Visit
          </Link>
        </motion.div>

        {/* Remedy Room Offer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md p-8 text-center"
        >
          <h2 className="text-xl font-bold mb-2">Remedy Room Special</h2>
          <p className="text-4xl font-bold text-[#113D33] mb-4">$49</p>

          <p className="mb-4">
            Cold plunge, infrared sauna, red light therapy, and Normatec
            compression — all in one recovery session.
          </p>

          <p className="text-sm text-gray-600 mb-6">
            Subject to availability. Limited-time experience.
          </p>

          <Link
            href="/book"
            className="inline-block bg-[#4A776D] hover:bg-[#3a5f56] text-white px-6 py-3 rounded-full font-semibold transition"
          >
            Book Remedy Room
          </Link>
        </motion.div>
      </section>

      {/* VIDEO BRAND SECTION (SECONDARY) */}
      <section className="relative h-[40vh] md:h-[55vh] flex items-center justify-center text-center px-6">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/offers_hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-3xl text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            A Different Kind of Spa Experience
          </h2>
          <p className="text-base md:text-lg">
            Modern recovery technology, thoughtful design, and personalized care
            — all in the heart of downtown Denver.
          </p>
        </div>
      </section>

      {/* LOCAL CONTEXT */}
      <section className="bg-[#113D33] text-white py-16 px-6 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">
          Why Sway Larimer Square?
        </h2>
        <p className="max-w-3xl mx-auto text-base md:text-lg">
          Located in the heart of downtown Denver, Sway Wellness Spa blends modern
          recovery technology with a calming, design-forward environment.
        </p>
      </section>

      {/* NAV */}
      <section className="py-16 px-6 text-center">
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/locations/denver-larimer" className="underline">
            View Location
          </Link>
          <Link href="/massages" className="underline">
            Explore Massages
          </Link>
          <Link href="/sauna" className="underline">
            Sauna & Recovery
          </Link>
        </div>
      </section>
    </main>
  );
}
