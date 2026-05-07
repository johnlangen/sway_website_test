"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function MothersDayGiftCardsPage() {
  const MINDBODY_GC_URL =
    "https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=42";

  return (
    <main className="min-h-screen bg-[#f4f4f1] pt-24 md:pt-28 pb-20 font-vance text-[#113D33]">
      <div className="max-w-5xl mx-auto px-4">
        {/* HERO BANNER */}
        <section className="relative rounded-2xl overflow-hidden">
          {/* Desktop */}
          <div className="hidden md:block relative h-[380px] w-full">
            <Image
              src="/assets/giftcard.jpg"
              alt="Mother's Day Spa Gift Card at Sway Wellness"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Mobile */}
          <div className="block md:hidden relative h-[360px] w-full">
            <Image
              src="/assets/giftcard.jpg"
              alt="Mother's Day Spa Gift Card at Sway Wellness"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/15" />

          {/* Text */}
          <div className="absolute inset-0 flex items-end md:items-center justify-start">
            <div className="pointer-events-auto px-6 md:px-10 pb-8 md:pb-0 md:max-w-md">
              <motion.p
                className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/85 mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                Mother's Day · May 11
              </motion.p>

              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Mother's Day Spa Gift Cards
              </motion.h1>

              <motion.p
                className="mt-4 text-lg md:text-xl text-white font-light leading-snug"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
              >
                <span className="font-semibold">Delivered instantly</span> to Mom's inbox.
                <br />
                Any amount. Any service. No shipping.
              </motion.p>

              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Link
                  href={MINDBODY_GC_URL}
                  className="inline-block bg-white text-[#113D33] px-7 py-2.5 md:px-9 md:py-3 rounded-xl text-sm md:text-base font-medium"
                >
                  Buy Mom a Gift Card
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* URGENCY NOTICE */}
        <section className="mt-8 md:mt-10">
          <div className="rounded-xl border border-[#c5d2cd] bg-white/70 px-5 py-4 text-center text-sm md:text-base text-[#4A776D]">
            <p>
              <span className="font-semibold text-[#113D33]">Order anytime — gift cards arrive in seconds by email.</span>
              {" "}Perfect for last-minute Mother's Day gifting.
            </p>
          </div>
        </section>

        {/* FEATURE STRIP */}
        <section className="mt-14 md:mt-16">
          <div className="grid gap-6 md:grid-cols-3 text-center text-[#4A776D] text-sm md:text-base">
            <div>
              <p className="font-semibold text-[#113D33] mb-1">The Gift Mom Actually Wants</p>
              <p>Real rest. No box, no wrapping, no guesswork.</p>
            </div>
            <div>
              <p className="font-semibold text-[#113D33] mb-1">Instant Digital Delivery</p>
              <p>Sent straight to her inbox in seconds.</p>
            </div>
            <div>
              <p className="font-semibold text-[#113D33] mb-1">Redeem on Any Service</p>
              <p>Massage, facials, Remedy Room, sauna, and more.</p>
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
                "I tried the Remedy Room and the Glow Getter facial — my skin felt incredibly smooth and firm. Ended up getting a membership!"
              </p>
              <p className="mt-3 text-[11px] text-[#7b9b92]">Whitney Gustafson</p>
            </div>

            <div className="rounded-2xl bg-white/70 border border-[#d4dfda] p-4 h-full flex flex-col justify-between">
              <p className="text-[#4A776D] leading-relaxed">
                "Took my son's girlfriend to Sway for her first facial — she LOVED it. Highly recommend the Remedy Room too!"
              </p>
              <p className="mt-3 text-[11px] text-[#7b9b92]">Laura Rolfe</p>
            </div>

            <div className="rounded-2xl bg-white/70 border border-[#d4dfda] p-4 h-full flex flex-col justify-between">
              <p className="text-[#4A776D] leading-relaxed">
                "Best massage I've ever had. The Remedy Room made the experience next-level. Left feeling mentally and physically rejuvenated."
              </p>
              <p className="mt-3 text-[11px] text-[#7b9b92]">Erin Schmidt</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16 md:mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-6">FAQ</h2>

          <div className="space-y-3 text-sm md:text-base text-[#4A776D]">
            <details className="group rounded-xl bg-white/70 border border-[#d4dfda] px-4 py-3">
              <summary className="cursor-pointer list-none flex justify-between items-center">
                <span className="font-semibold text-[#113D33]">How fast is delivery?</span>
                <span className="text-xs text-[#7b9b92] group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="mt-2">
                Gift cards are emailed instantly. You can purchase right up to Mother's Day morning and Mom will receive it in seconds.
              </p>
            </details>

            <details className="group rounded-xl bg-white/70 border border-[#d4dfda] px-4 py-3">
              <summary className="cursor-pointer list-none flex justify-between items-center">
                <span className="font-semibold text-[#113D33]">What amount should I get?</span>
                <span className="text-xs text-[#7b9b92] group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="mt-2">
                Choose any amount. $150 covers a signature massage or facial. $250 covers a massage plus the Remedy Room recovery suite. $400+ gives Mom a full half-day.
              </p>
            </details>

            <details className="group rounded-xl bg-white/70 border border-[#d4dfda] px-4 py-3">
              <summary className="cursor-pointer list-none flex justify-between items-center">
                <span className="font-semibold text-[#113D33]">Do gift cards expire?</span>
                <span className="text-xs text-[#7b9b92] group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="mt-2">
                No — Sway gift cards never expire.
              </p>
            </details>

            <details className="group rounded-xl bg-white/70 border border-[#d4dfda] px-4 py-3">
              <summary className="cursor-pointer list-none flex justify-between items-center">
                <span className="font-semibold text-[#113D33]">What can Mom use it for?</span>
                <span className="text-xs text-[#7b9b92] group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="mt-2">
                Any service at Sway Wellness Spa — massage, facials, Remedy Room, sauna, cold plunge, Aescape robot massage, and retail.
              </p>
            </details>

            <details className="group rounded-xl bg-white/70 border border-[#d4dfda] px-4 py-3">
              <summary className="cursor-pointer list-none flex justify-between items-center">
                <span className="font-semibold text-[#113D33]">Where is Sway located?</span>
                <span className="text-xs text-[#7b9b92] group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="mt-2">
                1428 Larimer St., Denver, CO 80202 — in the heart of downtown Denver.
              </p>
            </details>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="mt-16 md:mt-20">
          <div className="rounded-2xl bg-[#113D33] text-center py-10 px-6 text-white">
            <h2 className="text-2xl md:text-3xl font-light mb-3">
              Give Mom the gift of real rest.
            </h2>
            <p className="text-sm md:text-base text-white/85 mb-6">
              Delivered instantly. No shipping, no stress, no last-minute scramble.
            </p>
            <Link
              href={MINDBODY_GC_URL}
              className="inline-block bg-white text-[#113D33] px-8 py-3 rounded-xl text-sm md:text-base font-medium"
            >
              Buy Mom a Gift Card
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
