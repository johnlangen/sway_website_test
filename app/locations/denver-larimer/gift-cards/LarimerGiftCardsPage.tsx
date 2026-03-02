"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import GoogleReviews, { ReviewBadge, ClassPassBadge } from "../../../components/GoogleReviews";

export default function LarimerGiftCardsPage() {
  const giftCardUrl =
    "https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=42";

  const disclaimer = `*Your Sway\u00AE Gift Card cannot be redeemed for cash unless required by law AND THEN ONLY TO THE EXTENT REQUIRED BY LAW. Gift cards are valid only at Sway\u00AE or Spavia branded spas in the United States. Gift Cards cannot be purchased and redeemed on the same day due to a 24-hour hold on all gift card activations. During this time, we will verify the transaction made with the credit card provided. The gift card will be activated once the transaction is successfully verified. Failure to verify the transaction within this period may result in the cancellation of the gift card purchase. The value of this Gift Card will not be replaced if this card is damaged, lost or stolen. This Gift Card has no dormancy fee and does not expire. Treat this Gift Card like cash. Acceptance of this Gift Card constitutes acceptance of these terms.`;

  // Breadcrumb schema
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
          { "@type": "ListItem", position: 2, name: "Locations", item: "https://swaywellnessspa.com/locations" },
          { "@type": "ListItem", position: 3, name: "Denver Larimer", item: "https://swaywellnessspa.com/locations/denver-larimer" },
          { "@type": "ListItem", position: 4, name: "Gift Cards", item: "https://swaywellnessspa.com/locations/denver-larimer/gift-cards" },
        ],
      },
      {
        "@type": "Product",
        name: "Sway Larimer Spa Gift Card",
        description: "Give the gift of wellness in Denver's Larimer Square — redeemable for facials, massages, and Remedy Room experiences.",
        image: "/assets/OG/og-gift-cards.jpg",
        brand: { "@type": "Brand", name: "Sway Wellness Spa" },
        offers: {
          "@type": "Offer",
          url: "https://swaywellnessspa.com/locations/denver-larimer/gift-cards",
          priceCurrency: "USD",
          eligibleRegion: { "@type": "Place", name: "Denver, CO" },
          availability: "https://schema.org/InStock",
        },
      },
    ],
  };

  const reasons = [
    {
      title: "Massages & Facials",
      description: "50-minute sessions with expert therapists",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
    },
    {
      title: "Remedy Room",
      description: "Sauna, cold plunge & recovery circuit",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 6.51 6.51 0 003 11.5a6.5 6.5 0 0013 0c0-1.33-.472-2.55-1.228-3.586z" />
        </svg>
      ),
    },
    {
      title: "Aescape Robot",
      description: "AI-powered precision massage",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
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
    <div className="min-h-screen font-vance bg-gradient-to-b from-[#0e2b24] via-[#113D33] to-[#0b1f1a] text-white">
      {/* JSON-LD schema */}
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
          Give the Gift of Wellness
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-base md:text-lg text-gray-300 max-w-xl mx-auto"
        >
          Treat someone special to the Sway experience. Redeemable for massages,
          facials, and Remedy Room recovery right in Larimer Square.
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
          Sway Wellness Spa Larimer gift cards: available in any dollar amount
          with instant digital delivery via email. Redeemable for all services
          including 6 massage types, 6 facial treatments, Remedy Room recovery
          circuit (sauna, cold plunge, Normatec compression, LED light
          therapy), Aescape AI-powered robot massage, boost add-ons, and retail
          products. Gift cards never expire and have no dormancy fees. Valid at
          any Sway or Spavia branded spa in the United States. Physical gift
          cards available in-spa at 1428 Larimer St. on Larimer Square in
          Denver, CO 80202. Voted #4 Best Day Spa in America by USA Today
          10Best. Call (303) 476-6150 for questions.
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
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-white/10">
            <Image
              src="/assets/giftcard.jpg"
              alt="Sway Wellness Spa Gift Card"
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
              className="inline-block w-full max-w-sm px-8 py-4 bg-white text-[#113D33] font-bold rounded-full text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Purchase a Gift Card
            </a>
            <p className="text-sm text-white/50 mt-3">
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
            className="text-center text-2xl md:text-3xl font-bold mb-10"
          >
            Redeemable For
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 text-center"
              >
                <div className="flex justify-center mb-3 text-[#9ABFB3]">
                  {r.icon}
                </div>
                <h3 className="font-semibold text-sm mb-1">{r.title}</h3>
                <p className="text-xs text-white/50">{r.description}</p>
              </motion.div>
            ))}
          </div>
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
          alt="Sway Wellness Spa"
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
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="max-w-2xl text-base md:text-lg text-gray-200 mb-6"
          >
            Whether it&apos;s a birthday, anniversary, or just because — give them
            something they&apos;ll actually use.
          </motion.p>
          <motion.a
            href={giftCardUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="px-8 py-4 bg-[#D7E5DD] text-[#113D33] font-bold rounded-full uppercase hover:bg-white transition"
          >
            Buy a Gift Card
          </motion.a>
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
        <div className="flex flex-wrap justify-center gap-4 mb-10">
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
            href="/locations/denver-larimer/offers"
            className="text-sm underline underline-offset-4 text-gray-300 hover:text-white transition"
          >
            View Offers
          </Link>
        </div>

        <p className="text-[9px] text-white/20 leading-relaxed max-w-xl mx-auto">
          {disclaimer}
        </p>
      </section>
    </div>
  );
}
