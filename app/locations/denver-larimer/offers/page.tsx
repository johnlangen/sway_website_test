// app/locations/denver-larimer/offers/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import GoogleReviews, { ReviewBadge } from "../../../components/GoogleReviews";

export default function LarimerOffersPage() {
  const offers = [
    {
      label: "Recovery circuit",
      title: "Remedy Room",
      price: "$49",
      priceSuffix: "/ session",
      description:
        "Sauna, cold plunge, red light therapy, and Normatec compression — all in one 40-minute session.",
      cta: "Book Remedy Room",
      href: "/locations/denver-larimer/book-remedy-room",
      footnote: "Members pay just $25/session",
      highlight: false,
    },
    {
      label: "For our Denver neighbors",
      title: "First Visit Offer",
      price: "$40 OFF",
      priceSuffix: "",
      description:
        "Enjoy a 50-minute massage or facial for just $99 (regularly $139). Massage and facial only.",
      cta: "Book Your First Visit",
      href: "/locations/denver-larimer/book",
      footnote: "For Denver-area locals. First-time guests only.",
      highlight: true,
      badge: "MOST POPULAR",
    },
    {
      label: "Best ongoing value",
      title: "Membership",
      price: "$99",
      priceSuffix: "/ month",
      description:
        "Unlimited massages & facials at $99 each, 50% off boosts & Remedy Room, private lounge, and more.",
      cta: "View Memberships",
      href: "/locations/denver-larimer/membership",
      footnote: "Membership required",
      highlight: false,
    },
  ];

  return (
    <main className="min-h-screen font-vance bg-gradient-to-b from-[#0e2b24] via-[#113D33] to-[#0b1f1a] text-white">
      {/* HERO */}
      <section className="px-6 pt-28 md:pt-36 pb-8 text-center max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-sm md:text-base uppercase tracking-[0.2em] text-[#9ABFB3] mb-4"
        >
          Sway Larimer — Denver, CO
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
        >
          Offers &amp; Pricing
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-base md:text-lg text-gray-300 max-w-xl mx-auto"
        >
          Introductory pricing, memberships, and recovery sessions at Sway
          Wellness Spa in Larimer Square.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-4 flex justify-center"
        >
          <ReviewBadge />
        </motion.div>

        <p className="sr-only">
          Sway Wellness Spa Denver Larimer offers and pricing: First Visit Offer
          — $40 off your first 50-minute massage or facial for just $99
          (regularly $139), for Denver-area first-time guests. Membership —
          $99/month for unlimited massages and facials at $99 each, 50% off all
          boost add-ons, $25 Remedy Room sessions (normally $49), and private
          member lounge access. Remedy Room — $49 per session ($25 for members),
          a guided 40-minute recovery circuit combining sauna, cold
          plunge, Normatec compression therapy, and LED light therapy. Sway
          Wellness Spa is located at 1428 Larimer St. on Larimer Square in
          Denver, CO 80202. Voted #4 Best Day Spa in America by USA Today
          10Best. Book at swaywellnessspa.com or call (303) 476-6150.
        </p>
      </section>

      {/* OFFER CARDS */}
      <section className="px-4 sm:px-6 pt-10 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {offers.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative bg-white text-[#113D33] rounded-2xl p-6 md:p-7 shadow-xl flex flex-col text-center border ${
                o.highlight
                  ? "ring-2 ring-[#4A776D] border-[#4A776D]/20"
                  : "border-[#113D33]/8"
              }`}
            >
              {o.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-[#113D33] text-white px-4 py-1 rounded-full font-semibold tracking-wide whitespace-nowrap">
                  {o.badge}
                </span>
              )}

              <div className="mb-5">
                <p className="text-xs uppercase tracking-[0.15em] text-[#4A776D] mb-1">
                  {o.label}
                </p>
                <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-[#113D33]">
                  {o.title}
                </h2>
              </div>

              <div className="mb-5">
                <span className="text-5xl font-bold text-[#113D33]">{o.price}</span>
                {o.priceSuffix && (
                  <span className="text-sm text-gray-500 ml-1">{o.priceSuffix}</span>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-6 leading-relaxed flex-grow">
                {o.description}
              </p>

              <Link
                href={o.href}
                className="block w-full rounded-full font-semibold py-3 px-6 transition mb-4 bg-[#113D33] hover:bg-[#0a2b23] text-white"
              >
                {o.cta}
              </Link>

              <p className="text-xs text-gray-400">{o.footnote}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-[#F7F4E9] px-6 py-16 md:py-20 text-[#113D33]">
        <GoogleReviews />
      </section>

      {/* IMAGE BAND */}
      <section className="relative h-[45vh] min-h-[320px]">
        <Image
          src="/assets/membership_background_logo.jpg"
          alt="Sway Wellness Spa interior"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl font-bold mb-3"
          >
            A Different Kind of Spa
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="max-w-2xl text-base md:text-lg text-gray-200"
          >
            Modern recovery technology, thoughtful design, and personalized care
            — all on Larimer Square in downtown Denver.
          </motion.p>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 px-6 text-center">
        <p className="text-gray-400 mb-6">
          Questions? Call us at{" "}
          <a href="tel:13034766150" className="underline text-white">
            (303) 476-6150
          </a>
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/locations/denver-larimer"
            className="text-sm underline underline-offset-4 text-gray-300 hover:text-white transition"
          >
            View Location
          </Link>
          <Link
            href="/locations/denver-larimer/book"
            className="text-sm underline underline-offset-4 text-gray-300 hover:text-white transition"
          >
            Book Now
          </Link>
          <Link
            href="/gift-cards"
            className="text-sm underline underline-offset-4 text-gray-300 hover:text-white transition"
          >
            Gift Cards
          </Link>
        </div>
      </section>
    </main>
  );
}
