"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { trackGiftCardIntent } from "../lib/track";

export default function FathersDayGiftCardsPage() {
  const MINDBODY_GC_URL =
    "https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=42";

  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    const target = new Date("2026-06-21T00:00:00").getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setTimeLeft(days > 0 ? `${days}d ${hours}h` : `${hours}h`);
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen bg-[#f4f4f1] pt-24 md:pt-28 pb-20 font-vance text-[#113D33]">
      <div className="max-w-5xl mx-auto px-4">
        {/* HERO BANNER */}
        <section className="relative rounded-2xl overflow-hidden">
          {/* Desktop */}
          <div className="hidden md:block relative h-[380px] w-full">
            <Image
              src="/assets/aescapeblog7.jpg"
              alt="Father's Day Spa Gift Card at Sway Wellness · Aescape robot massage in Denver"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Mobile */}
          <div className="block md:hidden relative h-[360px] w-full">
            <Image
              src="/assets/aescapeMobile.jpg"
              alt="Father's Day Spa Gift Card at Sway Wellness"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/45 to-black/20" />

          {/* Sway wordmark */}
          <div className="pointer-events-none absolute top-4 right-4 md:top-6 md:right-6 z-10">
            <Image
              src="/assets/swaylogo.png"
              alt="Sway Wellness Spa"
              width={70}
              height={70}
              className="w-[52px] md:w-[64px] h-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
              priority
            />
          </div>

          {/* Text */}
          <div className="absolute inset-0 flex items-end md:items-center justify-start">
            <div className="pointer-events-auto px-6 md:px-10 pb-8 md:pb-0 md:max-w-md">
              <motion.p
                className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/85 mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                Father&apos;s Day · Sunday, June 21
              </motion.p>

              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Father&apos;s Day Spa Gift Cards
              </motion.h1>

              <motion.p
                className="mt-4 text-lg md:text-xl text-white font-light leading-snug"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
              >
                <span className="font-semibold">Delivered instantly</span> by email.
                <br />
                Any amount. Recovery, massage, or the robot Dad will tell everyone about.
              </motion.p>

              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Link
                  href={MINDBODY_GC_URL}
                  onClick={() => trackGiftCardIntent("fathers_day_hero")}
                  className="inline-block bg-white text-[#113D33] px-7 py-2.5 md:px-9 md:py-3 rounded-xl text-sm md:text-base font-medium"
                >
                  Buy Dad a Gift Card
                </Link>
                <p className="mt-3 text-[11px] md:text-xs text-white/75">
                  Secure · Instant · Never expires
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* URGENCY NOTICE */}
        <section className="mt-8 md:mt-10">
          <div className="rounded-xl border border-[#c5d2cd] bg-white/70 px-5 py-4 text-center text-sm md:text-base text-[#4A776D]">
            <p>
              <span className="font-semibold text-[#113D33]">
                {timeLeft ? `Father's Day in ${timeLeft}` : "Father's Day this Sunday"}
              </span>
              {" · Gift cards arrive in seconds by email."}
            </p>
          </div>
        </section>

        {/* FEATURE STRIP */}
        <section className="mt-14 md:mt-16">
          <div className="grid gap-6 md:grid-cols-3 text-center text-[#4A776D] text-sm md:text-base">
            <div>
              <p className="font-semibold text-[#113D33] mb-1">The Gift Dad Will Actually Use</p>
              <p>Recovery, sleep, and the robot everyone&apos;s curious about.</p>
            </div>
            <div>
              <p className="font-semibold text-[#113D33] mb-1">Instant Digital Delivery</p>
              <p>Email it, print it, or forward it. Yours in seconds.</p>
            </div>
            <div>
              <p className="font-semibold text-[#113D33] mb-1">Redeem on Any Service</p>
              <p>Aescape, Remedy Room, massage, cold plunge, sauna.</p>
            </div>
          </div>

          <p className="mt-8 text-center text-xs md:text-sm text-[#7b9b92]">
            $100 covers a 60-min Aescape robot massage · $150 adds the Remedy Room recovery circuit · $250+ a half-day reset
          </p>
        </section>

        {/* WHAT DAD CAN USE IT FOR — 5 dad-friendly services.
            Facial intentionally omitted: Atlas data shows facials are
            83% female, median age 33 — not the Father's Day audience.
            Gift card is still redeemable on any service; this section's
            job is to signal "this is for dad" to the buyer. */}
        <section className="mt-16 md:mt-20">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-8">
            What Dad Can Use It For
          </h2>

          {/* Flex-wrap with centering so the partial last row (5 tiles
              in a 3-up layout = 3+2) auto-centers instead of left-aligning.
              Fixed widths matched to old grid-cols-2/grid-cols-3 sizing. */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {[
              { href: "/aescape", label: "Aescape Robot Massage", src: "/assets/aescapeblog7.jpg" },
              { href: "/remedy-tech", label: "Remedy Room", src: "/assets/homepage-remedy.jpg" },
              { href: "/massages", label: "Massage", src: "/assets/homepage-massage.jpg" },
              { href: "/sauna", label: "Sauna", src: "/assets/sauna.jpg" },
              { href: "/cold-plunge", label: "Cold Plunge", src: "/assets/cold_plunge.jpg" },
            ].map((tile) => (
              <Link
                key={tile.href}
                href={tile.href}
                className="group relative block aspect-[4/5] overflow-hidden rounded-xl
                           w-[calc(50%-0.375rem)] md:w-[calc(33.333%-0.667rem)]"
              >
                <Image
                  src={tile.src}
                  alt={tile.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/0" />
                <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
                  <p className="text-white text-sm md:text-base font-medium tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                    {tile.label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* LARIMER SQUARE */}
        <section className="mt-16 md:mt-20">
          <div className="grid md:grid-cols-2 items-stretch rounded-2xl overflow-hidden bg-white/70 border border-[#d4dfda]">
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[340px]">
              <Image
                src="/assets/larimer-outside.jpg"
                alt="Sway Wellness Spa storefront on Larimer Square in downtown Denver"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="px-6 md:px-10 py-8 md:py-12 flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.2em] text-[#7b9b92] mb-2">
                On Larimer Square
              </p>
              <h2 className="text-2xl md:text-3xl font-light mb-3 leading-tight">
                In the heart of downtown Denver
              </h2>
              <p className="text-sm md:text-base text-[#4A776D] leading-relaxed">
                Pair Dad&apos;s gift card with a Rockies game, a steakhouse dinner, or a craft brewery
                crawl. Sway sits at 1428 Larimer St, between historic facades and the city&apos;s best
                restaurants.
              </p>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="mt-16 md:mt-20">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-8">What Guests Are Saying</h2>

          <div className="grid gap-6 md:grid-cols-3 text-sm md:text-base">
            <div className="rounded-2xl bg-white/70 border border-[#d4dfda] p-4 h-full flex flex-col justify-between">
              <p className="text-[#4A776D] leading-relaxed">
                &ldquo;Easily the best spa I&apos;ve ever been to. The deep tissue massage was both
                relaxing and therapeutic. The Remedy Room was incredible.&rdquo;
              </p>
              <p className="mt-3 text-[11px] text-[#7b9b92]">Visiting Guest</p>
            </div>

            <div className="rounded-2xl bg-white/70 border border-[#d4dfda] p-4 h-full flex flex-col justify-between">
              <p className="text-[#4A776D] leading-relaxed">
                &ldquo;The Aescape robot massage is unreal. I went in skeptical and walked out
                booking another session for next week.&rdquo;
              </p>
              <p className="mt-3 text-[11px] text-[#7b9b92]">Recent Guest</p>
            </div>

            <div className="rounded-2xl bg-white/70 border border-[#d4dfda] p-4 h-full flex flex-col justify-between">
              <p className="text-[#4A776D] leading-relaxed">
                &ldquo;Best massage I&apos;ve ever had. The Remedy Room made the experience
                next-level. Left feeling mentally and physically rejuvenated.&rdquo;
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
                Gift cards are emailed instantly to you. Purchase right up to Father&apos;s Day morning,
                then print it, forward it, or send it straight to Dad.
              </p>
            </details>

            <details className="group rounded-xl bg-white/70 border border-[#d4dfda] px-4 py-3">
              <summary className="cursor-pointer list-none flex justify-between items-center">
                <span className="font-semibold text-[#113D33]">What amount should I get?</span>
                <span className="text-xs text-[#7b9b92] group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="mt-2">
                Any amount. $100 covers a 60-minute Aescape robot massage. $150 adds the Remedy Room
                recovery circuit (sauna, cold plunge, red light, compression). $250+ gives Dad a
                full half-day.
              </p>
            </details>

            <details className="group rounded-xl bg-white/70 border border-[#d4dfda] px-4 py-3">
              <summary className="cursor-pointer list-none flex justify-between items-center">
                <span className="font-semibold text-[#113D33]">What&apos;s the Aescape robot massage?</span>
                <span className="text-xs text-[#7b9b92] group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="mt-2">
                AI-powered, fully personalized full-body massage. Dad lies face-down, the robot scans
                his back, and delivers consistent pressure for 30-60 minutes. The first one in
                Colorado. Most guests are skeptical, then immediately book a second.
              </p>
            </details>

            <details className="group rounded-xl bg-white/70 border border-[#d4dfda] px-4 py-3">
              <summary className="cursor-pointer list-none flex justify-between items-center">
                <span className="font-semibold text-[#113D33]">Do gift cards expire?</span>
                <span className="text-xs text-[#7b9b92] group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="mt-2">
                No. Sway gift cards never expire.
              </p>
            </details>

            <details className="group rounded-xl bg-white/70 border border-[#d4dfda] px-4 py-3">
              <summary className="cursor-pointer list-none flex justify-between items-center">
                <span className="font-semibold text-[#113D33]">Are gift cards refundable?</span>
                <span className="text-xs text-[#7b9b92] group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="mt-2">
                Gift card purchases are non-refundable. They never expire, so they can be used anytime.
              </p>
            </details>

            <details className="group rounded-xl bg-white/70 border border-[#d4dfda] px-4 py-3">
              <summary className="cursor-pointer list-none flex justify-between items-center">
                <span className="font-semibold text-[#113D33]">What can Dad use it for?</span>
                <span className="text-xs text-[#7b9b92] group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="mt-2">
                Any service at Sway Wellness Spa: Aescape robot massage, Remedy Room recovery
                circuit, traditional massage, facials, sauna, cold plunge, and retail.
              </p>
            </details>

            <details className="group rounded-xl bg-white/70 border border-[#d4dfda] px-4 py-3">
              <summary className="cursor-pointer list-none flex justify-between items-center">
                <span className="font-semibold text-[#113D33]">Where is Sway located?</span>
                <span className="text-xs text-[#7b9b92] group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="mt-2">
                1428 Larimer St., Denver, CO 80202. In the heart of downtown Denver.
              </p>
            </details>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="mt-16 md:mt-20">
          <div className="rounded-2xl bg-[#113D33] text-center py-10 px-6 text-white">
            <h2 className="text-2xl md:text-3xl font-light mb-3">
              Give Dad the gift he&apos;ll actually use.
            </h2>
            <p className="text-sm md:text-base text-white/85 mb-6">
              Delivered instantly. No shipping, no stress, no last-minute scramble.
            </p>
            <Link
              href={MINDBODY_GC_URL}
              onClick={() => trackGiftCardIntent("fathers_day_bottom_cta")}
              className="inline-block bg-white text-[#113D33] px-8 py-3 rounded-xl text-sm md:text-base font-medium"
            >
              Buy Dad a Gift Card
            </Link>
            <p className="mt-3 text-[11px] md:text-xs text-white/70">
              Secure · Instant · Never expires
            </p>
          </div>
        </section>

        <p className="mt-8 text-center text-[11px] text-[#7b9b92]">
          Gift card purchases are non-refundable. Gift cards never expire.
        </p>
      </div>
    </main>
  );
}
