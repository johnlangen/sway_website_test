"use client";

import { motion } from "framer-motion";
import VideoBackground from "./components/VideoBackground";
import Image from "next/image";
import Link from "next/link";

/* ---------------------------------------------
   DATA
--------------------------------------------- */

const SERVICES = [
  {
    title: "Massage",
    tagline: "Deep Tissue, Sports, CBD & more",
    description:
      "Personalized massage therapy for recovery and relief. Every session is customized to your body — 50 minutes of targeted care.",
    price: "From $129",
    memberPrice: "From $89",
    image: "/assets/massage2.jpg",
    bookHref: "/locations/denver-larimer/book-service?category=massage",
    learnHref: "/massages",
  },
  {
    title: "Facials",
    tagline: "Forever Young, Glow Getter & more",
    description:
      "Results-driven facials with Eminence Organics and Dr. Dennis Gross — anti-aging, hydration, and deep pore care.",
    price: "From $129",
    memberPrice: "From $89",
    image: "/assets/facial5.jpg",
    bookHref: "/locations/denver-larimer/book-service?category=facial",
    learnHref: "/facials",
  },
  {
    title: "Remedy Room",
    tagline: "Sauna + cold plunge recovery",
    description:
      "Sauna, cold plunge, red light therapy, and Normatec compression — all in one 40-minute recovery session.",
    price: "$49",
    memberPrice: "$25",
    image: "/assets/remedy-room2.jpg",
    bookHref: "/locations/denver-larimer/book-remedy-room",
    learnHref: "/remedy-tech",
  },
  {
    title: "Aescape",
    tagline: "AI-powered precision massage",
    description:
      "Personalized pressure mapping and real-time muscle detection — the future of massage. Sessions from 15 to 60 minutes.",
    price: "From $49",
    memberPrice: null,
    image: "/assets/aescapeblog6.jpg",
    bookHref: "/locations/denver-larimer/book-aescape",
    learnHref: "/aescape",
  },
] as const;

const PRICING_CARDS = [
  {
    title: "Facial",
    items: ["Forever Young", "Glow Getter", "Pore Perfection", "Sensitive Silk"],
    memberPrice: "$99",
    dropInPrice: "$139",
    duration: "50 min",
    boosts: [
      { label: "Add a Boost", member: "$30", dropIn: "$60" },
      { label: "Add a Super Boost", member: "$50", dropIn: "$100" },
    ],
  },
  {
    title: "Massage",
    items: ["Deep Tissue", "Swedish", "Hot Stone", "CBD"],
    memberPrice: "$99",
    dropInPrice: "$139",
    duration: "50 min",
    boosts: [
      { label: "Add a Boost", member: "$30", dropIn: "$60" },
      { label: "Add a Super Boost", member: "$50", dropIn: "$100" },
    ],
  },
  {
    title: "Remedy Room",
    items: ["Cold Plunge", "Sauna", "Light Therapy", "Lymphatic Boots"],
    memberPrice: "$25",
    dropInPrice: "$49",
    duration: "40 min",
    boosts: [],
  },
  {
    title: "Aescape",
    items: ["AI Body Mapping", "Personalized Pressure", "Full Body", "Targeted Areas"],
    memberPrice: null,
    dropInPrice: "From $49",
    duration: "15–60 min",
    boosts: [],
  },
] as const;

const CONNECT_ITEMS = [
  {
    image: "/assets/homepage_photo11.jpg",
    label: "SWAY ON SPOTIFY",
    href: "#",
    external: true,
  },
  {
    image: "/assets/homepage_photo12.png",
    label: "IN THE PRESS",
    href: "/press",
    external: false,
  },
  {
    image: "/assets/homepage_photo13.jpg",
    label: "@SWAYWELLNESSCLUB",
    href: "https://www.instagram.com/swaywellnessclub/",
    external: true,
  },
  {
    image: "/assets/homepage_photo14.png",
    label: "ON THE APP",
    href: "#",
    external: true,
  },
] as const;

const FAQ_ITEMS = [
  {
    q: "What is the Remedy Room?",
    a: "The Remedy Room is our modern recovery experience — typically featuring sauna, cold plunge, and select recovery tech designed to help you reset.",
  },
  {
    q: "What is Aescape?",
    a: "Aescape is an AI-powered massage experience designed for modern recovery. It's a separate offering from therapist-led massage therapy.",
  },
  {
    q: "Do you offer memberships?",
    a: "Yes. Sway is built around consistent care — memberships offer preferred pricing, perks, and an easier way to make wellness a ritual.",
  },
  {
    q: "What should I book for a first visit?",
    a: "Most guests start with a 50-minute facial or massage. If you want recovery-focused benefits, the Remedy Room is a great add-on.",
  },
  {
    q: "How do I book?",
    a: "You can schedule online anytime. If you have questions, you can also call the spa and our team will help you choose the right experience.",
  },
] as const;

/* ---------------------------------------------
   COMPONENT
--------------------------------------------- */

export default function HomeContent() {
  return (
    <div className="snap-container w-full overflow-hidden max-w-screen">
      {/* ======================================================
          1. Hero Video
          ====================================================== */}
      <section className="snap-section h-screen flex items-center justify-center">
        <h1 className="sr-only">
          Sway Wellness Spa – Modern Wellness Experiences
        </h1>
        <p className="sr-only">
          Sway is a modern wellness spa and club offering massage therapy,
          facials, and recovery experiences including sauna, cold plunge, and
          AI-powered Aescape massage.
        </p>
        <VideoBackground />
      </section>

      {/* ======================================================
          2. Brand Statement
          ====================================================== */}
      <section className="snap-section h-screen flex items-center justify-center bg-[#F7F4E9] text-[#113D33] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl text-center font-vance"
        >
          <p className="text-xl md:text-3xl lg:text-4xl leading-relaxed mb-10">
            Ever feel like you need an escape from the hustle and bustle of the
            city? We created a wellness club where you can pause, breathe, and
            rediscover yourself.
          </p>

          <h2 className="text-sm md:text-base uppercase tracking-[0.15em] text-[#4A776D] mb-4">
            A Modern Wellness Spa & Club
          </h2>
          <p className="text-sm md:text-base leading-relaxed opacity-80 max-w-xl mx-auto">
            Sway blends expert-led care with modern recovery. From personalized
            massage therapy and facials to sauna and cold plunge rituals and the
            AI-powered Aescape massage experience, everything is designed to
            help you feel better — consistently.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/offers"
              className="bg-[#113D33] text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[#0c2a23] transition shadow-sm"
            >
              New Guest Offer
            </Link>
            <Link
              href="/membership"
              className="border-2 border-[#113D33] text-[#113D33] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#113D33] hover:text-white transition"
            >
              Explore Membership
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ======================================================
          3a–3d. Services Showcase
          ====================================================== */}
      {SERVICES.map((service, i) => (
        <section
          key={service.title}
          className="snap-section h-screen flex items-center justify-center bg-[#F7F4E9] text-[#113D33] px-6 md:px-10"
        >
          <div
            className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-14 items-center w-full ${
              i % 2 !== 0 ? "md:[direction:rtl]" : ""
            }`}
          >
            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={i % 2 !== 0 ? "md:[direction:ltr]" : ""}
            >
              <Link href={service.bookHref}>
                <div className="relative overflow-hidden rounded-2xl group">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={640}
                    height={420}
                    className="w-full h-[180px] sm:h-[280px] md:h-[400px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {/* Price badge */}
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[#113D33] text-xs font-semibold px-3 py-1.5 rounded-full">
                    {service.price}
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              viewport={{ once: true }}
              className={`font-vance ${i % 2 !== 0 ? "md:[direction:ltr]" : ""}`}
            >
              <div className="text-xs uppercase tracking-[0.15em] opacity-50 mb-2">
                {service.tagline}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
                {service.title}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed opacity-80 mb-4 max-w-md">
                {service.description}
              </p>

              {/* Pricing line */}
              <div className="flex items-baseline gap-3 mb-6 text-sm">
                <span className="font-semibold">{service.price}</span>
                {service.memberPrice && (
                  <>
                    <span className="opacity-40">|</span>
                    <span className="text-[#4A776D] font-semibold">
                      {service.memberPrice} for members
                    </span>
                  </>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={service.bookHref}
                  className="bg-[#113D33] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#0c2a23] transition"
                >
                  Book {service.title}
                </Link>
                <Link
                  href={service.learnHref}
                  className="text-sm font-medium underline underline-offset-4 opacity-70 hover:opacity-100 transition"
                >
                  Learn more
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* ======================================================
          4. First-Time Offer
          ====================================================== */}
      <section className="snap-section h-screen flex items-center justify-center bg-[#F7F4E9] text-[#113D33] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl"
        >
          <Link
            href="/offers"
            className="group block rounded-3xl bg-[#113D33] text-white p-8 sm:p-10 md:p-14 hover:bg-[#0c2a23] transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-white/50 mb-2">
                  First-Time Guest Offer
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-vance mb-3">
                  $40 Off Your First Massage or Facial
                </h2>
                <p className="text-white/75 text-sm sm:text-base max-w-lg">
                  Enjoy a 50-minute massage or facial for just $99 (regularly
                  $139). Use code <strong>FTVO40</strong>. No membership required.
                </p>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center gap-2 bg-white text-[#113D33] px-6 py-3 rounded-full text-sm font-semibold group-hover:gap-3 transition-all">
                  Book Now
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* ======================================================
          5. Experiences & Pricing
          ====================================================== */}
      <section className="snap-section h-screen flex items-center justify-center bg-[#F7F4E9] text-[#113D33] px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl font-vance"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-2">
            Experiences & Pricing
          </h2>
          <p className="text-center text-sm md:text-base opacity-60 mb-4 md:mb-12">
            Member pricing vs drop-in. No contracts required.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5">
            {PRICING_CARDS.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl bg-white/70 border border-[#113D33]/10 backdrop-blur-sm p-3 md:p-6 flex flex-col"
              >
                <h3 className="text-sm md:text-lg font-semibold mb-0.5">
                  {card.title}
                </h3>
                <p className="text-[9px] md:text-[10px] uppercase tracking-wider opacity-50 mb-2 md:mb-3">
                  {card.duration}
                </p>

                {/* Treatment list */}
                <ul className="text-[11px] md:text-xs opacity-70 space-y-0.5 md:space-y-1 mb-3 md:mb-4">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-1.5">
                      <span className="text-[#9ABFB3]">&#x2713;</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Pricing */}
                <div className="mt-auto space-y-1 md:space-y-1.5 pt-2 md:pt-3 border-t border-[#113D33]/10">
                  {card.memberPrice && (
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] md:text-xs opacity-60">Member</span>
                      <span className="text-sm md:text-base font-bold text-[#4A776D]">
                        {card.memberPrice}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] md:text-xs opacity-60">
                      {card.memberPrice ? "Drop-In" : "Price"}
                    </span>
                    <span className="text-sm md:text-base font-semibold">
                      {card.dropInPrice}
                    </span>
                  </div>
                </div>

                {/* Boosts — hidden on mobile to save space */}
                {card.boosts.length > 0 && (
                  <div className="hidden md:block mt-3 pt-2 border-t border-[#113D33]/10 space-y-0.5">
                    {card.boosts.map((boost) => (
                      <div
                        key={boost.label}
                        className="flex justify-between text-[10px] opacity-60"
                      >
                        <span>{boost.label}</span>
                        <span>
                          {boost.member} / {boost.dropIn}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 md:mt-8 flex justify-center">
            <Link
              href="/locations/denver-larimer/book"
              className="bg-[#113D33] text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[#0c2a23] transition shadow-sm"
            >
              Schedule Now
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ======================================================
          6. Connect / Social
          ====================================================== */}
      <section className="snap-section h-screen flex items-center justify-center bg-[#F7F4E9] text-[#113D33] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl font-vance text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
            Connect with Sway
          </h2>
          <p className="text-sm md:text-base opacity-60 mb-8 md:mb-12">
            Follow along, read the press, or find us on the app.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {CONNECT_ITEMS.map((item) => {
              const inner = (
                <div className="group block">
                  <div className="relative overflow-hidden rounded-2xl aspect-square mb-3">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition" />
                  </div>
                  <p className="text-xs md:text-sm font-semibold uppercase tracking-wider">
                    {item.label}
                  </p>
                </div>
              );

              return item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <Link key={item.label} href={item.href}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ======================================================
          7. FAQ
          ====================================================== */}
      <section className="snap-section h-screen flex items-center justify-center bg-[#F7F4E9] text-[#113D33] px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl font-vance"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-10">
            Questions, Answered
          </h2>

          <div>
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.q}
                className="border-b border-black/10 py-4 group"
              >
                <summary className="cursor-pointer font-medium flex items-center justify-between gap-4">
                  <span className="text-sm md:text-base">{item.q}</span>
                  <svg
                    className="w-4 h-4 shrink-0 opacity-40 transition-transform duration-200 group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </summary>
                <p className="mt-3 text-sm opacity-80 leading-relaxed pr-8">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ======================================================
          8. Membership CTA
          ====================================================== */}
      <section className="snap-section h-screen flex items-center justify-center bg-[#F7F4E9] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl rounded-3xl bg-[#113D33] text-white p-10 sm:p-14 text-center font-vance"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Join the Wellness Club & Start Saving Today
          </h2>
          <p className="mt-2 text-white/75 max-w-lg mx-auto mb-7 text-sm md:text-base">
            Monthly treatments, half-off boosts, and exclusive perks designed
            for real life.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=40&prodid=100"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#113D33] px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
            >
              Become a Member
            </a>
            <Link
              href="/gift-cards"
              className="border-2 border-white/40 text-white px-6 py-3 rounded-full text-sm font-semibold hover:border-white transition"
            >
              Gift Cards
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
