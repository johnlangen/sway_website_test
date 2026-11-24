"use client";

import { randomBytes, randomUUID } from "crypto";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { trackGiftCardIntent } from "../lib/track";

// The holiday bonus is tied to the location that sells the card, so the page sends buyers to that
// location's own checkout (11/24/2026; the buttons used to open Larimer's Mindbody store, where
// there is no bonus).
const LOCATIONS = [
  { slug: "denver-larimer", name: "Sway Larimer", where: "1428 Larimer St., Denver" },
  { slug: "denver-rino", name: "Sway RiNo", where: "3636 Blake St., Denver" },
  { slug: "denver-central-park", name: "Sway Central Park", where: "2271 Clinton St., Aurora" },
];

export default function HolidayGiftCardsPage() {
  const MINDBODY_GC_URL =
    "https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=42";

  return (
    <div className="min-h-screen bg-[#f4f4f1] pt-24 md:pt-28 pb-20 font-vance text-[#113D33]">
      <div className="max-w-5xl mx-auto px-4">
        {/* HERO BANNER */}
        <section className="sway-page-hero relative rounded-2xl overflow-hidden">
          {/* Desktop */}
          <div className="hidden md:block relative h-[380px] w-full">
            <Image
              src="/assets/holidaygcdesktop.jpg"
              alt="Sway Holiday Spa Gift Card"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Mobile */}
          <div className="block md:hidden relative h-[360px] w-full">
            <Image
              src="/assets/holidaygcmobile.jpg"
              alt="Sway Holiday Spa Gift Card"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/35 to-black/10" />

          {/* Text */}
          <div className="absolute inset-0 flex items-end md:items-center justify-start">
            <div className="pointer-events-auto px-6 md:px-10 pb-8 md:pb-0 md:max-w-md">

              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Holiday Spa Gift Cards
              </motion.h1>

              <motion.p
                className="mt-4 text-lg md:text-xl text-white font-light leading-snug"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
              >
                Give a <span className="font-semibold">$200+ Gift Card</span>
                <br />
                Get a <span className="font-semibold">FREE 30-Minute Express Facial or Massage</span>
              </motion.p>

              {/* The dates sit with the offer itself, so nobody reads it as on before Nov 26 or after Dec 25 */}
              <motion.p
                className="mt-2 text-sm md:text-base text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                November 26 through December 25, 2026
              </motion.p>

              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <a
                  href="#choose-location"
                  data-track="holiday-gc-hero"
                  onClick={() => trackGiftCardIntent("holiday_gc_hero")}
                  className="inline-block bg-white text-[#113D33] px-7 py-2.5 md:px-9 md:py-3 rounded-xl text-sm md:text-base font-medium"
                >
                  Buy Spa Gift Cards
                </a>

              </motion.div>

              {/* See Details */}
              <motion.p
                className="mt-1 text-[11px] md:text-xs text-white/70"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                <a href="#bonus-terms" className="underline">
                  Bonus terms apply. See details below.
                </a>
              </motion.p>

            </div>
          </div>
        </section>

        {/* SEASONAL NOTICE */}
        <section className="mt-8 md:mt-10">
          <div className="rounded-xl border border-[#c5d2cd] bg-white/70 px-5 py-4 text-center text-sm md:text-base text-[#4A776D]">
            <p>
              <span className="font-semibold text-[#113D33]">The holiday bonus runs November 26 through December 25, 2026.</span>
              {" "}Gift cards are available year-round.
            </p>
          </div>
        </section>

        {/* CHOOSE A LOCATION: the bonus is redeemed where the card is bought */}
        <section id="choose-location" className="mt-10 md:mt-12 scroll-mt-32">
          <h2 className="text-2xl md:text-3xl font-light text-center">Choose where to buy</h2>
          <p className="mt-3 max-w-2xl mx-auto text-center text-sm md:text-base text-[#4A776D]">
            Your gift card works at any Sway. The free bonus treatment is used at the location you buy from, January 1 to April 30, 2027.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {LOCATIONS.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}/gift-cards/checkout/`}
                data-track={`holiday-gc-${loc.slug}`}
                onClick={() => trackGiftCardIntent(`holiday_gc_${loc.slug}`)}
                className="group rounded-2xl border border-[#c5d2cd] bg-white px-5 py-5 text-center transition-colors hover:border-[#113D33]"
              >
                <span className="block text-lg font-semibold text-[#113D33]">{loc.name}</span>
                <span className="mt-1 block text-sm text-[#4A776D]">{loc.where}</span>
                <span className="mt-4 inline-block rounded-full bg-[#113D33] px-6 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-[#0c2a23]">
                  Buy a gift card
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* FEATURE STRIP */}
        <section className="mt-14 md:mt-16">
          <div className="grid gap-6 md:grid-cols-3 text-center text-[#4A776D] text-sm md:text-base">
            <div>
              <p className="font-semibold text-[#113D33] mb-1">The Perfect Holiday Gift</p>
              <p>For partners, parents, friends, and coworkers.</p>
            </div>
            <div>
              <p className="font-semibold text-[#113D33] mb-1">Emailed When You Choose</p>
              <p>Right after purchase, or on a date you pick.</p>
            </div>
            <div>
              <p className="font-semibold text-[#113D33] mb-1">Redeem on Any Service</p>
              <p>Massage, Facials, Remedy Room, and more.</p>
            </div>
          </div>
        </section>

        {/* ONE GIFT CARD, EVERY EXPERIENCE */}
        <section className="mt-16 md:mt-20">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-8">
            One Gift Card, Every Experience
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 text-sm md:text-base">
            <Link href="/massages" className="rounded-xl border border-[#c5d2cd] bg-white/70 px-4 py-3 text-center hover:bg-white hover:border-[#113D33] transition-colors">
              Massage
            </Link>
            <Link href="/facials" className="rounded-xl border border-[#c5d2cd] bg-white/70 px-4 py-3 text-center hover:bg-white hover:border-[#113D33] transition-colors">
              Facial
            </Link>
            <Link href="/sauna" className="rounded-xl border border-[#c5d2cd] bg-white/70 px-4 py-3 text-center hover:bg-white hover:border-[#113D33] transition-colors">
              Sauna
            </Link>
            <Link href="/cold-plunge" className="rounded-xl border border-[#c5d2cd] bg-white/70 px-4 py-3 text-center hover:bg-white hover:border-[#113D33] transition-colors">
              Cold Plunge
            </Link>
            <Link href="/remedy-tech" className="rounded-xl border border-[#c5d2cd] bg-white/70 px-4 py-3 text-center hover:bg-white hover:border-[#113D33] transition-colors">
              Remedy Room
            </Link>
            <Link href="/aescape" className="rounded-xl border border-[#c5d2cd] bg-white/70 px-4 py-3 text-center hover:bg-white hover:border-[#113D33] transition-colors">
              Aescape Massage
            </Link>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="mt-16 md:mt-20">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-8">What Guests Are Saying</h2>

          <div className="grid gap-6 md:grid-cols-3 text-sm md:text-base">
            <div className="rounded-2xl bg-white/70 border border-[#d4dfda] p-4 h-full flex flex-col justify-between">
              <p className="text-[#4A776D] leading-relaxed">
                “I tried the Remedy Room and the Glow Getter facial. My skin felt incredibly smooth and firm. Ended up getting a membership!”
              </p>
              <p className="mt-3 text-[11px] text-[#4A776D]">Whitney Gustafson</p>
            </div>

            <div className="rounded-2xl bg-white/70 border border-[#d4dfda] p-4 h-full flex flex-col justify-between">
              <p className="text-[#4A776D] leading-relaxed">
                “Took my son's girlfriend to Sway for her first facial. She LOVED it. Highly recommend the Remedy Room too!”
              </p>
              <p className="mt-3 text-[11px] text-[#4A776D]">Laura Rolfe</p>
            </div>

            <div className="rounded-2xl bg-white/70 border border-[#d4dfda] p-4 h-full flex flex-col justify-between">
              <p className="text-[#4A776D] leading-relaxed">
                “Best massage I’ve ever had. The Remedy Room made the experience next-level. Left feeling mentally and physically rejuvenated.”
              </p>
              <p className="mt-3 text-[11px] text-[#4A776D]">Erin Schmidt</p>
            </div>
          </div>
        </section>



        {/* FAQ BELOW TERMS */}
        <section className="mt-16 md:mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-6">FAQ</h2>

          <div className="space-y-3 text-sm md:text-base text-[#4A776D]">

            <details className="group rounded-xl bg-white/70 border border-[#d4dfda] px-4 py-3">
              <summary className="cursor-pointer list-none flex justify-between items-center">
                <span className="font-semibold text-[#113D33]">How do I get the holiday bonus?</span>
                <span className="text-xs text-[#4A776D] group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="mt-2">
                Buy a single gift card of $200 or more on this site from November 26 through December 25, 2026. The free 30-minute express facial or massage comes by email with its own bonus code. At checkout you choose whether it goes with the gift or to you.
              </p>
            </details>

            <details className="group rounded-xl bg-white/70 border border-[#d4dfda] px-4 py-3">
              <summary className="cursor-pointer list-none flex justify-between items-center">
                <span className="font-semibold text-[#113D33]">Where and when can the bonus be used?</span>
                <span className="text-xs text-[#4A776D] group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="mt-2">
                Only at the Sway location that sold the gift card, from January 1 through April 30, 2027. You choose facial or massage when you book. Gift cards themselves never expire and work at any Sway or Spavia spa.
              </p>
            </details>

            <details className="group rounded-xl bg-white/70 border border-[#d4dfda] px-4 py-3">
              <summary className="cursor-pointer list-none flex justify-between items-center">
                <span className="font-semibold text-[#113D33]">Can the gift card be emailed?</span>
                <span className="text-xs text-[#4A776D] group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="mt-2">
                Yes. Gift cards are emailed right after purchase, or on a date you pick. A gift card is ready to use 24 hours after purchase.
              </p>
            </details>

            <details className="group rounded-xl bg-white/70 border border-[#d4dfda] px-4 py-3">
              <summary className="cursor-pointer list-none flex justify-between items-center">
                <span className="font-semibold text-[#113D33]">Can it be used for the Aescape Robot Massage?</span>
                <span className="text-xs text-[#4A776D] group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="mt-2">
                Yes. Gift cards are valid for all Sway services including the Aescape robot massage.
              </p>
            </details>

            <details className="group rounded-xl bg-white/70 border border-[#d4dfda] px-4 py-3">
              <summary className="cursor-pointer list-none flex justify-between items-center">
                <span className="font-semibold text-[#113D33]">Are gift cards refundable?</span>
                <span className="text-xs text-[#4A776D] group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="mt-2">
                Gift card purchases are non-refundable. The holiday bonus has no cash value.
              </p>
            </details>

          </div>
        </section>


        {/* TERMS & CONDITIONS — UPDATED TO YOUR SCREENSHOT */}
        <section
        id="bonus-terms"
            className="mt-16 max-w-3xl mx-auto text-center text-[11px] md:text-xs text-[#4A776D] leading-relaxed scroll-mt-40"
            >
            <p className="font-medium text-[#113D33] mb-2">Bonus Terms & Conditions</p>

            <p>
                One complimentary 30-minute express facial or massage comes with each single gift card of $200 or
                more purchased on swaywellnessspa.com from November 26 through December 25, 2026, at Sway Larimer,
                Sway RiNo and Sway Central Park. The bonus is redeemable only at the location that sold the gift
                card. The gift card itself can be used at any Sway or Spavia spa in the United States. The bonus
                can be used from January 1, 2027 and must be used by April 30, 2027. The guest chooses facial or
                massage when booking; an appointment is required and is subject to availability. The bonus has no
                cash value, cannot be added to a gift card balance, and is void if the gift card purchase is
                cancelled. Two cards under $200 do not combine to qualify. The bonus treatment can&apos;t be
                combined with other offers, including first-visit offers. Gift card purchases are non-refundable.
            </p>
        </section>

        {/* BOTTOM CTA */}
        <section className="mt-16 md:mt-20">
          <div className="rounded-2xl bg-[#113D33] text-center py-10 px-6 text-white">
            <h2 className="text-2xl md:text-3xl font-light mb-3">
              Ready to give the perfect holiday gift?
            </h2>
            <p className="text-sm md:text-base text-white/85 mb-6">
              Gift Wellness This Season. Stress-Free For You. Stress-Free For Them.
            </p>
            <a
              href="#choose-location"
              data-track="holiday-gc-bottom"
              onClick={() => trackGiftCardIntent("holiday_gc_bottom_cta")}
              className="inline-block bg-white text-[#113D33] px-8 py-3 rounded-xl text-sm md:text-base font-medium"
            >
              Buy Spa Gift Cards
            </a>

          </div>
        </section>

      </div>
    </div>
  );
}



