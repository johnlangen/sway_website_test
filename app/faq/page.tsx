"use client";

import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FAQIndexPage() {
  return (
    <main className="bg-white text-[#113D33] min-h-screen font-vance px-6 pt-32 md:pt-40 pb-20">
      <Head>
        <title>FAQ | Sway Wellness Spa</title>
        <meta
          name="description"
          content="Explore FAQs for each Sway Wellness Spa location. Learn about booking, policies, parking, and what makes Sway unique."
        />
        <link rel="canonical" href="https://swaywellnessspa.com/faq" />
      </Head>

      <div className="max-w-3xl mx-auto space-y-12">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-bold text-center"
        >
          The Sway Way – FAQ
        </motion.h1>

        <p className="text-lg text-center opacity-80">
          Choose your location below to view FAQs about booking, parking, and wellness policies.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mt-10">
          <Link
            href="/faq/larimer"
            className="rounded-2xl bg-[#113D33] text-white py-10 px-6 text-center shadow hover:opacity-90 transition"
          >
            Sway Larimer
          </Link>
          <div className="rounded-2xl bg-gray-200 text-gray-500 py-10 px-6 text-center shadow opacity-70">
            Dallas (Coming Soon)
          </div>
          <div className="rounded-2xl bg-gray-200 text-gray-500 py-10 px-6 text-center shadow opacity-70">
            Georgetown (Coming Soon)
          </div>
        </div>
      </div>
    </main>
  );
}
