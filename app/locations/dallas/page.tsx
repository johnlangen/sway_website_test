"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReviewBadge } from "@/app/components/GoogleReviews";
import GoogleReviews from "@/app/components/GoogleReviews";
import WaitlistForm from "@/app/components/WaitlistForm";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function SwayDallasComingSoonPage() {
  return (
    <main className="bg-[#F7F4E9] text-[#113D33] min-h-screen font-vance">
      {/* ====== HERO ====== */}
      <section className="px-6 pt-28 md:pt-36 pb-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <motion.div {...fadeUp}>
            <h1 className="text-3xl md:text-5xl font-bold">Sway Dallas</h1>
            <div className="mt-3 text-lg">
              <div>2323 Henderson Ave, Dallas, TX 75206</div>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span
                  className="inline-block rounded-full px-3 py-1 text-sm shadow"
                  style={{ backgroundColor: "#113D33", color: "#b6cfbf" }}
                >
                  Coming Soon
                </span>
                <ReviewBadge />
              </div>

              <p className="mt-4 max-w-xl leading-relaxed">
                <strong>Sway Dallas</strong> is bringing our award-winning wellness experience to
                the Knox/Henderson neighborhood. Expect targeted facials, deeply effective massage,
                and the <strong>Remedy Room</strong> recovery circuit with sauna, cold
                plunge, Normatec compression, and LED light therapy. Join the waitlist for
                exclusive founding member pricing before we open.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/locations/dallas/founding-membership"
                className="inline-block bg-[#113D33] text-white px-5 py-3 rounded-full hover:opacity-90 transition"
              >
                Join the Waitlist
              </Link>
              <Link
                href="/treatments"
                className="inline-block border border-[#113D33] text-[#113D33] px-5 py-3 rounded-full hover:bg-[#113D33]/5 transition"
              >
                Explore Treatments
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <WaitlistForm location="dallas" source="location-page" variant="compact" />
          </motion.div>
        </div>
      </section>

      {/* ====== SERVICES PREVIEW ====== */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 {...fadeUp} className="text-2xl md:text-3xl font-bold text-center mb-10">
            What&apos;s Coming to Sway Dallas
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Massage Therapy",
                desc: "Deep tissue, sports recovery, CBD, and Himalayan salt stone massage. 50 or 80-minute sessions with customizable pressure and add-on boosts like hot stones and cupping.",
                href: "/massages",
                price: "From $99",
              },
              {
                title: "Targeted Facials",
                desc: "Results-driven facials including Pore Perfection, Forever Young anti-aging, Glow Getter, and Vitamin C brightening treatments. Expert aestheticians with medical-grade products.",
                href: "/facials",
                price: "From $99",
              },
              {
                title: "The Remedy Room",
                desc: "Our signature recovery circuit: sauna, cold plunge, Normatec compression boots, LED light therapy, and lymphatic drainage. Perfect for athletes and anyone recovering from daily stress.",
                href: "/remedy-tech",
                price: "From $49",
              },
            ].map((svc) => (
              <motion.div
                key={svc.title}
                {...fadeUp}
                className="bg-[#F7F4E9] rounded-2xl p-6 border border-[#113D33]/10"
              >
                <h3 className="text-lg font-bold mb-2">{svc.title}</h3>
                <p className="text-sm leading-relaxed opacity-80 mb-3">{svc.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold opacity-60">{svc.price}</span>
                  <Link
                    href={svc.href}
                    className="text-sm text-[#4A776D] font-semibold hover:underline"
                  >
                    Learn more &rarr;
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p {...fadeUp} className="text-center text-sm opacity-60 mt-6">
            Member pricing available. Join the waitlist for founding member rates.
          </motion.p>
        </div>
      </section>

      {/* ====== MEMBERSHIP PREVIEW ====== */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="bg-white rounded-2xl p-8 md:p-10 shadow text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Membership Tiers Coming Soon</h2>
            <p className="text-lg mb-2">
              Three tiers — <strong>Essential</strong>, <strong>Premier</strong>, and <strong>Ultimate</strong>
            </p>
            <p className="text-sm opacity-70 mb-6 max-w-xl mx-auto">
              Founding members will receive exclusive pricing and priority booking before Sway Dallas
              opens. Join the waitlist to be notified when founding memberships go live.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6 text-left max-w-xl mx-auto">
              <div className="bg-[#F7F4E9] rounded-xl p-4">
                <h3 className="font-bold text-sm mb-1">Essential</h3>
                <p className="text-xs opacity-70">Signature 50-minute facials and massages</p>
              </div>
              <div className="bg-[#F7F4E9] rounded-xl p-4">
                <h3 className="font-bold text-sm mb-1">Premier</h3>
                <p className="text-xs opacity-70">Enhanced products, techniques, and extended durations</p>
              </div>
              <div className="bg-[#F7F4E9] rounded-xl p-4">
                <h3 className="font-bold text-sm mb-1">Ultimate</h3>
                <p className="text-xs opacity-70">Tech-enhanced LED, microcurrent, and oxygen infusion</p>
              </div>
            </div>

            <Link
              href="/locations/dallas/founding-membership"
              className="inline-block bg-[#113D33] text-white px-6 py-3 rounded-full hover:opacity-90 transition font-semibold"
            >
              Join the Waitlist
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ====== DENVER SOCIAL PROOF ====== */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.p {...fadeUp} className="text-center text-sm opacity-50 mb-2">
            From our Denver flagship
          </motion.p>
          <GoogleReviews />
        </div>
      </section>

      {/* ====== NEIGHBORHOOD ====== */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Knox/Henderson: The Perfect Fit</h2>
            <p className="leading-relaxed mb-4">
              Sway Dallas will be located at 2323 Henderson Ave in the heart of Knox/Henderson, one
              of Dallas&apos;s most walkable dining and lifestyle districts. Nestled between Highland
              Park, Uptown, and Lower Greenville, the neighborhood is known for its boutique
              shopping, locally owned restaurants, and fitness studios. Whether you&apos;re
              recovering from a workout at a nearby gym or winding down after a long week, Sway fits
              right into the Knox/Henderson lifestyle.
            </p>
            <p className="leading-relaxed">
              We chose Knox/Henderson because it reflects what Sway is all about: a community that
              values wellness, quality, and taking time to recharge. Easily accessible from Lakewood,
              Oak Lawn, Deep Ellum, and the Park Cities, Sway Dallas will be the neighborhood spa
              that Knox/Henderson deserves.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ====== EXPANDED FAQ ====== */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.h2 {...fadeUp} className="text-2xl md:text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-3">
            {[
              {
                q: "When is Sway Dallas opening?",
                a: "We're coming soon to Knox/Henderson at 2323 Henderson Ave, Dallas, TX. The exact opening date will be announced here. Sign up as a Founding Member to get notified first and receive exclusive opening-day perks.",
              },
              {
                q: "Where in Dallas will Sway be located?",
                a: "Sway Dallas will be at 2323 Henderson Ave in the Knox/Henderson neighborhood, easily accessible from Highland Park, Uptown, Lower Greenville, Lakewood, and the Park Cities.",
              },
              {
                q: "What treatments will Sway Dallas offer?",
                a: "Sway Dallas will offer the full Sway experience: massage therapy (deep tissue, sports recovery, CBD, salt stone), targeted facials (Pore Perfection, Forever Young, Glow Getter, Vitamin C), and the Remedy Room recovery circuit (sauna, cold plunge, Normatec compression, LED light therapy, lymphatic drainage).",
              },
              {
                q: "Does Sway Dallas have a sauna and cold plunge?",
                a: "Yes. The Remedy Room at Sway Dallas will feature a sauna and cold plunge pool, along with Normatec compression boots, LED light therapy panels, and a lymphatic drainage mat. You can book individual sessions or get unlimited access through a Remedy Room membership.",
              },
              {
                q: "How much are Sway Dallas memberships?",
                a: "Three membership tiers will be available: Essential (signature treatments), Premier (enhanced products and extended durations), and Remedy Room (recovery circuit access). Founding member pricing will be announced before we open — join the waitlist to be notified.",
              },
              {
                q: "Can I join the waitlist now?",
                a: "Yes. Visit our Founding Membership page to join the waitlist. You'll be the first to know when founding memberships go live and will get priority booking and VIP perks on opening day.",
              },
              {
                q: "Are Sway gift cards valid at the Dallas location?",
                a: "Yes. Sway gift cards are valid at all participating Sway locations. Gift cards purchased now can be redeemed at Sway Dallas once we open.",
              },
            ].map((faq, i) => (
              <motion.details
                key={i}
                {...fadeUp}
                className="bg-[#F7F4E9] rounded-xl p-4 group"
              >
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed opacity-80">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CROSS LINKS ====== */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm opacity-60 mb-3">Explore other Sway locations</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/locations/denver-larimer"
              className="text-sm text-[#4A776D] font-semibold hover:underline"
            >
              Denver Larimer (Now Open) &rarr;
            </Link>
            <Link
              href="/locations/georgetown"
              className="text-sm text-[#4A776D] font-semibold hover:underline"
            >
              Georgetown, DC (Coming Soon) &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ====== FINAL CTA ====== */}
      <section className="px-6 py-16 bg-[#113D33] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <motion.h2 {...fadeUp} className="text-2xl md:text-3xl font-bold mb-4">
            Be First in Dallas
          </motion.h2>
          <motion.p {...fadeUp} className="mb-6 opacity-80">
            Join the waitlist for exclusive founding member pricing and VIP access when Sway Dallas
            opens in Knox/Henderson.
          </motion.p>
          <motion.div {...fadeUp}>
            <Link
              href="/locations/dallas/founding-membership"
              className="inline-block bg-white text-[#113D33] px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              Join the Waitlist
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
