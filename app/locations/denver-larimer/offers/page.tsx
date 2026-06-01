// app/locations/denver-larimer/offers/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import GoogleReviews, { ReviewBadge, ClassPassBadge } from "../../../components/GoogleReviews";
import { SwayCurve } from "../../../components/SwayCurve";

export default function LarimerOffersPage() {
  // Three first-visit offers, service-specific. Membership pitched as a
  // separate banner below. It is the upsell anchor, not an intro offer.
  // Code + redemption surfaced prominently so customers know to mention
  // at check-in (booking flow doesn't yet support promo code entry).
  const offers = [
    {
      label: "Massage or Facial",
      title: "First Visit",
      price: "$99",
      priceSuffix: " / 50 min",
      description:
        "Your first Essential Signature Massage or Facial. Or upgrade for $40 off Premier ($129) or Ultimate ($159).",
      cta: "Book Massage or Facial",
      href: "/locations/denver-larimer/book",
      code: "FTVO40",
      constraints: "Mon-Fri · First-time guests only",
      regularPrice: "Regularly $139",
      image: "/assets/homepage-massage.jpg",
      imageAlt: "Massage therapy at Sway Wellness Spa",
      highlight: false,
    },
    {
      label: "Aescape Robot Massage",
      title: "First Visit",
      price: "$99",
      priceSuffix: " / 60 min",
      description:
        "Your first 60-minute Aescape robot massage at member pricing. AI-powered, fully personalized full-body massage.",
      cta: "Book Aescape",
      href: "/locations/denver-larimer/book-aescape",
      code: "FTVO40",
      constraints: "Mon-Fri · First-time guests only",
      regularPrice: "Regularly $139",
      image: "/assets/aescapeblog7.jpg",
      imageAlt: "Aescape robot massage at Sway Wellness Spa",
      highlight: true,
      badge: "MOST POPULAR",
    },
    {
      label: "Remedy Room",
      title: "First Visit",
      price: "$25",
      priceSuffix: " / 40 min",
      description:
        "Sauna, cold plunge, red light therapy, and compression therapy. A 40-minute recovery circuit at member pricing for your first visit.",
      cta: "Book Remedy",
      href: "/locations/denver-larimer/book-remedy-room",
      code: "FTVORR",
      constraints: "Any day · First-time guests only",
      regularPrice: "Regularly $49",
      image: "/assets/homepage-remedy.jpg",
      imageAlt: "Remedy Room recovery circuit at Sway Wellness Spa",
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
          Sway Larimer &middot; Denver, CO
        </motion.p>

        <SwayCurve
          width={150}
          strokeWidth={2.2}
          animate
          className="text-[#A9D2C5] mx-auto block mb-6"
        />

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
          className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
        >
          <ReviewBadge />
          <span className="hidden sm:block opacity-30">|</span>
          <ClassPassBadge />
        </motion.div>

        <p className="sr-only">
          Sway Wellness Spa Denver Larimer offers and pricing: First Visit Offer
          (code FTVO40): $40 off your first massage, facial, or 60-minute
          Aescape robot massage at any tier (Essential, Premier, or Ultimate),
          valid Monday through Friday for first-time guests. First Remedy Room
          Visit (code FTVORR): $25 for your first 40-minute recovery circuit
          combining sauna, cold plunge, compression therapy, and LED light
          therapy (regularly $49), any day, first-time guests. Membership:
          $99/month for unlimited massages and facials at member pricing, 50%
          off all boost add-ons, $25 Remedy Room sessions (normally $49), and
          private member lounge access. Sway Wellness Spa is located at 1428
          Larimer St. on Larimer Square in Denver, CO 80202. Voted #4 Best Day
          Spa in America by USA Today 10Best. Book at swaywellnessspa.com or
          call (303) 476-6150.
        </p>
      </section>

      {/* HOW IT WORKS: single-line explainer above the cards.
          Online booking doesn't yet capture promo codes; this sets
          the expectation that the code is mentioned at check-in. */}
      <section className="px-6 pt-2 pb-2">
        <p className="max-w-3xl mx-auto text-center text-sm md:text-base text-gray-300">
          Book online · Mention your code at check-in · We apply your
          first-visit pricing at checkout.
        </p>
      </section>

      {/* OFFER CARDS */}
      <section className="px-4 sm:px-6 pt-8 pb-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {offers.map((o, i) => (
            <motion.div
              key={o.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative bg-white text-[#113D33] rounded-2xl shadow-xl flex flex-col text-center overflow-hidden border ${
                o.highlight
                  ? "ring-2 ring-[#4A776D] border-[#4A776D]/20"
                  : "border-[#113D33]/8"
              }`}
            >
              {o.badge && (
                <span className="absolute top-3 left-1/2 -translate-x-1/2 z-10 text-xs bg-[#113D33] text-white px-4 py-1 rounded-full font-semibold tracking-wide whitespace-nowrap shadow-md">
                  {o.badge}
                </span>
              )}

              {/* Image */}
              <div className="relative w-full h-44 md:h-48 bg-[#113D33]/5">
                <Image
                  src={o.image}
                  alt={o.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-7 flex flex-col flex-grow">
                <div className="mb-4">
                  {o.label && (
                    <p className="text-xs uppercase tracking-[0.15em] text-[#4A776D] mb-1">
                      {o.label}
                    </p>
                  )}
                  <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-[#113D33]">
                    {o.title}
                  </h2>
                </div>

                <div className="mb-4">
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

                {/* Redemption block: code is the anchor, instruction is
                    the action, constraints are secondary. */}
                <div className="mt-1 pt-4 border-t border-[#113D33]/10 text-left">
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#4A776D] font-semibold">
                      Use code
                    </span>
                    <span className="font-mono text-base font-bold tracking-wider text-[#113D33] bg-[#9ABFB3]/15 px-2.5 py-0.5 rounded">
                      {o.code}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1.5">
                    Mention at the front desk
                  </p>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    {o.constraints} · {o.regularPrice}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MEMBERSHIP BANNER: upsell anchor below FTV offers */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white text-[#113D33] rounded-2xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row items-center md:justify-between gap-5 md:gap-8 border border-[#113D33]/8"
          >
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-[#4A776D] mb-2">
                Love your first visit? Keep the price.
              </p>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Sway Club Membership
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-xl">
                From $99/month. Unlimited massages and facials at member pricing,
                50% off boosts and Remedy Room ($25/session), private member
                lounge, and more.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <div>
                <span className="text-4xl md:text-5xl font-bold">$99</span>
                <span className="text-sm text-gray-500 ml-1">/ month</span>
              </div>
              <Link
                href="/locations/denver-larimer/membership"
                className="inline-block rounded-full font-semibold py-3 px-7 bg-[#113D33] hover:bg-[#0a2b23] text-white transition whitespace-nowrap"
              >
                View Memberships
              </Link>
            </div>
          </motion.div>
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
          <SwayCurve
            width={150}
            strokeWidth={2.2}
            animate
            className="text-white/85 mx-auto block mb-5"
          />
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="max-w-2xl text-base md:text-lg text-gray-200"
          >
            Modern recovery technology, thoughtful design, and personalized care,
            all on Larimer Square in downtown Denver.
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
