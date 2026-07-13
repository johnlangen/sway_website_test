"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SwayCurve } from "./SwayCurve";
import { trackGiftCardIntent } from "../lib/track";
import type { ClubGiftCardsConfig } from "./clubGiftCardsConfig";

/* Shared gift-cards page for the Sway Wellness Club locations (RiNo +
   Central Park). Mirrors the Larimer gift-cards page visually, but the
   copy sticks to what the clubs offer today: Remedy Lounge sessions,
   saunas, and cold plunge. No Larimer review badges here — the clubs
   have their own Google listings. Config lives in clubGiftCardsConfig.ts
   so server pages can import it. */

export default function ClubGiftCardsPage({ club }: { club: ClubGiftCardsConfig }) {
  const giftCardUrl = `https://clients.mindbodyonline.com/classic/ws?studioid=${club.studioId}&stype=42`;

  const disclaimer = `*Your Sway® Gift Card cannot be redeemed for cash unless required by law AND THEN ONLY TO THE EXTENT REQUIRED BY LAW. Gift card purchases are non-refundable. Gift cards are valid only at Sway® or Spavia branded spas in the United States. Gift Cards cannot be purchased and redeemed on the same day due to a 24-hour hold on all gift card activations. During this time, we will verify the transaction made with the credit card provided. The gift card will be activated once the transaction is successfully verified. Failure to verify the transaction within this period may result in the cancellation of the gift card purchase. The value of this Gift Card will not be replaced if this card is damaged, lost or stolen. This Gift Card has no dormancy fee and does not expire. Treat this Gift Card like cash. Acceptance of this Gift Card constitutes acceptance of these terms.`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
          { "@type": "ListItem", position: 2, name: "Locations", item: "https://swaywellnessspa.com/locations/" },
          { "@type": "ListItem", position: 3, name: club.breadcrumbName, item: `https://swaywellnessspa.com/locations/${club.slug}/` },
          { "@type": "ListItem", position: 4, name: "Gift Cards", item: `https://swaywellnessspa.com/locations/${club.slug}/gift-cards/` },
        ],
      },
      {
        "@type": "Product",
        name: `${club.name} Gift Card`,
        description: club.productDescription,
        image: "/assets/OG/og-gift-cards.jpg",
        brand: { "@type": "Brand", name: "Sway Wellness Club" },
      },
    ],
  };

  const reasons = [
    {
      title: "Remedy Lounge",
      description: "Sauna + cold plunge recovery sessions",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
    },
    {
      title: club.saunaLabel,
      description: club.saunaDescription,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 6.51 6.51 0 003 11.5a6.5 6.5 0 0013 0c0-1.33-.472-2.55-1.228-3.586z" />
        </svg>
      ),
    },
    {
      title: club.plungeLabel,
      description: club.plungeDescription,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v9m0 0l-3-3m3 3l3-3m-9 9h12a2.25 2.25 0 002.25-2.25v-.75M3.75 18v-.75A2.25 2.25 0 016 15h.75" />
        </svg>
      ),
    },
    {
      title: "Never Expires",
      description: "No dormancy fees, no rush",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen font-vance bg-[#F7F4E9] text-[#113D33]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* HERO */}
      <section className="px-6 pt-28 md:pt-36 pb-8 text-center max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-sm md:text-base uppercase tracking-[0.2em] text-[#4A776D] mb-4"
        >
          {club.name} &middot; {club.cityState}{" "}
          &middot;{" "}
          <Link href="/locations" className="underline underline-offset-4 hover:text-[#113D33] transition normal-case tracking-normal">
            Change location
          </Link>
        </motion.p>

        <SwayCurve
          width={150}
          strokeWidth={2.2}
          animate
          className="text-[#4A776D] mx-auto block mb-6"
        />

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-semibold tracking-tight mb-4 leading-tight"
        >
          Give the Gift of Recovery
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-base md:text-lg text-[#113D33]/70 max-w-xl mx-auto"
        >
          {club.heroBlurb}
        </motion.p>

        <p className="sr-only">
          {club.name} gift cards: available in any dollar amount with instant
          digital delivery via email. Redeemable for Remedy Lounge recovery
          sessions and memberships at {club.name}. Gift cards never expire and
          have no dormancy fees. Valid at any Sway or Spavia branded spa in the
          United States. Purchase online at swaywellnessspa.com.
        </p>
      </section>

      {/* GIFT CARD IMAGE + CTA */}
      <section className="px-4 sm:px-6 pt-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-lg mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-[#113D33]/15">
            <Image
              src="/assets/giftcard.jpg"
              alt={`${club.name} Gift Card`}
              width={600}
              height={360}
              className="w-full object-cover"
            />
          </div>

          <div className="mt-8 text-center">
            <a
              href={giftCardUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGiftCardIntent(`${club.key}_gc_hero`)}
              className="group relative inline-block w-full max-w-sm px-8 py-4 bg-[#113D33] text-white font-bold rounded-full text-lg hover:bg-[#0c2a23] transition shadow-lg"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 sway-cta-flourish pointer-events-none">
                <SwayCurve width={40} strokeWidth={1.4} className="text-[#113D33]" />
              </span>
              Purchase a Gift Card <span className="sr-only">(opens in new tab)</span>
            </a>
            <p className="text-sm text-[#113D33]/60 mt-3">
              Delivered instantly via email
            </p>
          </div>
        </motion.div>
      </section>

      {/* WHAT THEY CAN USE IT FOR */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center text-2xl md:text-3xl font-bold mb-4"
          >
            Redeemable For
          </motion.h2>
          <SwayCurve
            width={140}
            strokeWidth={2.4}
            animate
            className="text-[#4A776D] mx-auto block mb-10"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="rounded-2xl bg-white shadow-[0_10px_30px_-15px_rgba(17,61,51,0.18)] p-5 text-center"
              >
                <div className="flex justify-center mb-3 text-[#4A776D]">
                  {r.icon}
                </div>
                <h3 className="font-semibold text-sm mb-1">{r.title}</h3>
                <p className="text-xs text-[#113D33]/60">{r.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE BAND */}
      <section className="relative h-[45vh] min-h-[320px]">
        <Image
          src="/assets/membership_background_logo.jpg"
          alt="Sway Wellness Club"
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
            The Perfect Gift
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
            className="max-w-2xl text-base md:text-lg text-gray-200 mb-6"
          >
            Whether it&apos;s a birthday, anniversary, or just because. Give them
            something they&apos;ll actually use.
          </motion.p>
          <motion.a
            href={giftCardUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackGiftCardIntent(`${club.key}_gc_bottom_cta`)}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="group relative px-8 py-4 bg-[#D7E5DD] text-[#113D33] font-bold rounded-full uppercase hover:bg-white transition"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 sway-cta-flourish pointer-events-none">
              <SwayCurve width={40} strokeWidth={1.4} className="text-[#113D33]" />
            </span>
            Buy a Gift Card <span className="sr-only">(opens in new tab)</span>
          </motion.a>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 px-6 text-center">
        <p className="text-[#113D33]/70 mb-6">
          Questions? Email us at{" "}
          <a href={`mailto:${club.email}`} className="underline text-[#113D33] font-semibold">
            {club.email}
          </a>
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Link
            href={`/locations/${club.slug}`}
            className="text-sm underline underline-offset-4 text-[#113D33]/70 hover:text-[#113D33] transition"
          >
            View Location
          </Link>
          <Link
            href={`/locations/${club.slug}/book`}
            className="text-sm underline underline-offset-4 text-[#113D33]/70 hover:text-[#113D33] transition"
          >
            Book Now
          </Link>
          <Link
            href={`/locations/${club.slug}/membership`}
            className="text-sm underline underline-offset-4 text-[#113D33]/70 hover:text-[#113D33] transition"
          >
            View Membership
          </Link>
        </div>

        <p className="text-[9px] text-[#113D33]/35 leading-relaxed max-w-xl mx-auto">
          {disclaimer}
        </p>
      </section>
    </div>
  );
}
