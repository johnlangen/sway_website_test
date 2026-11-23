"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReviewBadge } from "@/app/components/GoogleReviews";
import GoogleReviews from "@/app/components/GoogleReviews";
import WaitlistForm from "@/app/components/WaitlistForm";
import GiveawayBanner from "@/app/components/GiveawayBanner";
import { LAUNCH_SITES, type LaunchTierKey } from "@/lib/launchSites";
import { RemedyRoomBox } from "@/app/components/LaunchRemedyOffer";
import { FOUNDING_TIER_CONTENT } from "@/lib/foundingTiers";

// Founding memberships are on sale on the site (lib/launchSites.ts salesOpen). While true, this
// page leads with joining and the waitlist becomes the quiet second option. With it false, every
// line below reads as it did before 11/23/2026.
const FOUNDING = LAUNCH_SITES["union-market"].founding;
// The Remedy Room membership sold before opening: a regular membership, not founding, so it sits in
// its own cream box under the founding card (John 11/23/2026).
const REMEDY = LAUNCH_SITES["union-market"].remedyRoom ?? null;
const REMEDY_HREF = "/locations/union-market/founding-membership/join/?tier=remedy&from=membership";
const ON_SALE = FOUNDING.salesOpen;
const FOUNDING_HREF = "/locations/union-market/founding-membership/";
const JOIN_HREF = (tier: LaunchTierKey) => `/locations/union-market/founding-membership/join/?tier=${tier}`;
const LEAD = FOUNDING.tiers.essential;
const LEAD_SAVING = LEAD.visit !== undefined ? LEAD.visit - LEAD.price : null;
const TIER_CARDS: { key: LaunchTierKey | "remedy"; name: string; desc: string }[] = [
  { key: "essential", name: "Essential", desc: "Signature treatments · the perfect entry to Sway." },
  { key: "premier", name: "Premier", desc: "Enhanced treatments and extended durations." },
  { key: "ultimate", name: "Ultimate", desc: "Technology-infused treatments and extended durations." },
  { key: "remedy", name: "The Remedy Room", desc: "Recovery circuit access · sauna, cold plunge, LED, and compression." },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function SwayGeorgetownComingSoonPage() {
  return (
    <div className="bg-[#F7F4E9] text-[#113D33] min-h-screen font-vance">
      {/* ====== ENTER TO WIN BANNER ====== */}
      <GiveawayBanner location="union-market" />

      {/* ====== HERO ====== */}
      {/* Reduced top padding: the banner above now clears the fixed nav. */}
      <section className="sway-page-hero sway-location-hero px-6 pt-10 md:pt-14 pb-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <motion.div {...fadeUp}>
            <h1 className="text-3xl md:text-5xl font-bold">Sway Union Market</h1>
            <div className="mt-3 text-lg">
              <div>Washington, DC</div>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span
                  className="inline-block rounded-full px-3 py-1 text-sm shadow"
                  style={{ backgroundColor: "#113D33", color: "#b6cfbf" }}
                >
                  Coming Soon
                </span>
                {ON_SALE && (
                  <span
                    className="inline-block rounded-full px-3 py-1 text-sm shadow"
                    style={{ backgroundColor: "#b6cfbf", color: "#113D33" }}
                  >
                    Founding memberships open
                  </span>
                )}
                <ReviewBadge attribution="Sway Larimer in Denver" />
              </div>

              <p className="mt-4 max-w-xl leading-relaxed">
                <strong>Sway Union Market</strong> is bringing our award-winning wellness experience to
                Washington, DC. Expect targeted facials, deeply effective massage, and the{" "}
                <strong>Remedy Room</strong> recovery circuit with sauna, cold plunge,
                LED light therapy, and lymphatic drainage compression boots.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/locations/union-market/founding-membership"
                data-track={ON_SALE ? "um-hero-founding" : "um-hero-memberships"}
                className="inline-block bg-[#113D33] text-white px-5 py-3 rounded-full hover:opacity-90 transition"
              >
                {ON_SALE ? "Become a Founding Member" : "Explore Memberships"}
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
            {ON_SALE ? (
              <>
              <div className="bg-[#113D33] text-white rounded-2xl p-6 md:p-8">
                <p className="text-xs uppercase tracking-widest text-[#b6cfbf]">
                  Founding membership · First {FOUNDING.cap} members
                </p>
                <h2 className="text-xl md:text-2xl font-bold mt-2">Founding memberships are open</h2>
                <p className="text-sm opacity-90 mt-2">
                  {LEAD_SAVING !== null
                    ? `One massage or facial every month. A $${LEAD.visit} visit is $${LEAD.price} at the founding rate, and every tier is $${LEAD_SAVING} less than a single visit.`
                    : "One massage or facial every month at the founding rate."}
                </p>
                <ul className="mt-4 divide-y divide-white/15">
                  {TIER_CARDS.filter((c) => c.key !== "remedy").map((c) => {
                    const key = c.key as LaunchTierKey;
                    const tier = FOUNDING.tiers[key];
                    return (
                      <li key={c.key}>
                        <Link
                          href={JOIN_HREF(key)}
                          data-track={`um-hero-tier-${c.key}`}
                          className="flex items-center justify-between gap-4 py-3.5 hover:opacity-80 transition"
                        >
                          <span>
                            <span className="block font-bold">{c.name}</span>
                            <span className="block text-xs opacity-80">{FOUNDING_TIER_CONTENT[key].short}, every month</span>
                          </span>
                          <span className="flex items-center gap-3 whitespace-nowrap text-right">
                            <span>
                              <span className="text-xl font-bold">${tier.price}</span>
                              <span className="text-xs opacity-80"> a month</span>
                              {tier.visit !== undefined && (
                                <span className="block text-xs opacity-80">
                                  <s>${tier.visit}</s> single visit
                                </span>
                              )}
                            </span>
                            <span aria-hidden="true">&rarr;</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <p className="text-xs opacity-80 mt-3">
                  For the first {FOUNDING.cap} members. Your first month is charged when you join.{" "}
                  <a href="#waitlist" data-track="um-hero-waitlist" className="underline underline-offset-2">
                    Not ready? Join the waitlist.
                  </a>
                </p>
              </div>
              {REMEDY && <RemedyRoomBox base="/locations/union-market" offer={REMEDY} />}
              </>
            ) : (
              <WaitlistForm location="union-market" source="location-page" variant="compact" />
            )}
          </motion.div>
        </div>
      </section>

      {/* ====== SERVICES PREVIEW ====== */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 {...fadeUp} className="text-2xl md:text-3xl font-bold text-center mb-10">
            What&apos;s Coming to Sway Union Market
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Massage Therapy",
                desc: "Signature, Deep Tissue, Sports, Salt Stone, and Lymphatic Drainage massage. 50, 70, or 90-minute treatments, from light-to-medium Signature to firm Deep Tissue, with add-on boosts like CBD, cupping, and PEMF.",
                href: "/massages",
              },
              {
                title: "Targeted Facials",
                desc: "Result-driven facials including Pore Perfection, Forever Young anti-aging, Glow Getter, and Vitamin C brightening treatments. Expert estheticians with professional-grade products.",
                href: "/facials",
              },
              {
                title: "The Remedy Room",
                desc: "Our signature recovery circuit: sauna, cold plunge, LED light therapy, and lymphatic drainage compression boots. Experience the physical and mental benefits. Restore your body and refresh your mind.",
                href: "/remedy-tech",
              },
            ].map((svc) => (
              <motion.div
                key={svc.title}
                {...fadeUp}
                className="bg-[#F7F4E9] rounded-2xl p-6 border border-[#113D33]/10"
              >
                <h3 className="text-lg font-bold mb-2">{svc.title}</h3>
                <p className="text-sm leading-relaxed opacity-80 mb-3">{svc.desc}</p>
                <div className="flex items-center justify-end">
                  <Link
                    href={svc.href}
                    className="text-sm text-[#4A776D] font-semibold hover:underline"
                  >
                    Learn more<span className="sr-only"> about {svc.title}</span> &rarr;
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p {...fadeUp} className="text-center text-sm opacity-80 mt-6">
            Member pricing available. Explore memberships for founding member rates.
          </motion.p>
        </div>
      </section>

      {/* ====== MEMBERSHIP PREVIEW ====== */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="bg-white rounded-2xl p-8 md:p-10 shadow text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {ON_SALE ? "Founding Memberships Are Open" : "Membership Tiers Coming Soon"}
            </h2>
            <p className="text-lg mb-2">
              Three tiers · <strong>Essential</strong>, <strong>Premier</strong>, and <strong>Ultimate</strong>, plus a <strong>Remedy Room</strong> membership
            </p>
            <p className="text-sm opacity-80 mb-6 max-w-xl mx-auto">
              {ON_SALE
                ? `One massage or facial every month${LEAD_SAVING !== null ? `, for $${LEAD_SAVING} less than a single visit` : " at the founding rate"}. For the first ${FOUNDING.cap} members only.${REMEDY ? ` The Remedy Room membership is open too: ${REMEDY.visits} recovery visits a month for $${REMEDY.price}, at the regular rate.` : " Remedy Room membership pricing will be announced closer to opening."}`
                : "Founding members will receive exclusive pricing and priority booking before Sway Union Market opens. Join the waitlist to be notified when founding memberships go live."}
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-left max-w-3xl mx-auto">
              {TIER_CARDS.map((c) => {
                const price = ON_SALE && c.key !== "remedy" ? FOUNDING.tiers[c.key].price : null;
                const visit = ON_SALE && c.key !== "remedy" ? FOUNDING.tiers[c.key].visit : undefined;
                const inner = (
                  <>
                    <h3 className="font-bold text-sm mb-1">{c.name}</h3>
                    <p className="text-xs opacity-80">
                      {ON_SALE && c.key !== "remedy" ? `${FOUNDING_TIER_CONTENT[c.key].short}, every month.` : c.desc}
                    </p>
                    {price !== null && (
                      <p className="mt-3 text-sm font-bold">
                        ${price} a month <span aria-hidden="true">&rarr;</span>
                        {visit !== undefined && (
                          <span className="block text-xs font-normal opacity-80">
                            <s>${visit}</s> single visit
                          </span>
                        )}
                      </p>
                    )}
                    {ON_SALE && c.key === "remedy" &&
                      (REMEDY ? (
                        <p className="mt-3 text-sm font-bold">
                          ${REMEDY.price} a month <span aria-hidden="true">&rarr;</span>
                          <span className="block text-xs font-normal opacity-80">
                            {REMEDY.visits} visits a month · not a founding rate
                          </span>
                        </p>
                      ) : (
                        <p className="mt-3 text-xs opacity-80">Pricing announced closer to opening.</p>
                      ))}
                  </>
                );
                if (ON_SALE && c.key === "remedy" && REMEDY)
                  return (
                    <Link
                      key={c.key}
                      href={REMEDY_HREF}
                      data-track="um-membership-remedy"
                      className="block rounded-xl border border-[#D8CDB0] bg-[#F7F4E9] p-4 transition hover:bg-[#EBE4D1]"
                    >
                      {inner}
                    </Link>
                  );
                return price !== null && c.key !== "remedy" ? (
                  <Link
                    key={c.key}
                    href={JOIN_HREF(c.key)}
                    data-track={`um-membership-tier-${c.key}`}
                    className="block bg-[#F7F4E9] rounded-xl p-4 hover:bg-[#EBE4D1] transition"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div key={c.key} className="bg-[#F7F4E9] rounded-xl p-4">
                    {inner}
                  </div>
                );
              })}
            </div>

            <Link
              href="/locations/union-market/founding-membership"
              data-track={ON_SALE ? "um-membership-founding" : "um-membership-waitlist"}
              className="inline-block bg-[#113D33] text-white px-6 py-3 rounded-full hover:opacity-90 transition font-semibold"
            >
              {ON_SALE ? "Become a Founding Member" : "Join the Waitlist"}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ====== DENVER SOCIAL PROOF ====== */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.p {...fadeUp} className="text-center text-sm opacity-80 mb-2">
            From our Denver flagship
          </motion.p>
          <GoogleReviews attribution="Sway Larimer in Denver" />
        </div>
      </section>

      {/* ====== NEIGHBORHOOD ====== */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Union Market: DC&apos;s Wellness Destination</h2>
            <p className="leading-relaxed mb-4">
              Sway Union Market will call one of Washington, DC&apos;s fastest-growing neighborhoods home.
              Known for its food halls, converted warehouses, and a vibrant mix of makers, restaurants,
              and fitness studios, Union Market is the ideal setting for a modern wellness club. Whether
              you live in Union Market, NoMa, Ivy City, Capitol Hill, or the greater DC metro area,
              Sway will be a short trip from wherever you are.
            </p>
            <p className="leading-relaxed">
              We chose Union Market because it mirrors the Sway philosophy: a neighborhood that values
              quality experiences, community, and balance. From post-workout recovery sessions to
              monthly facial memberships, Sway Union Market will be the wellness ritual the nation&apos;s
              capital has been waiting for.
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
                q: "When is Sway Union Market opening?",
                a: ON_SALE
                  ? "Sway Union Market is coming soon to Washington, DC. The exact opening date will be announced here. Founding memberships are open now, and founding members will be the first to know the date."
                  : "Sway Union Market is coming soon to Washington, DC. The exact opening date will be announced here. Sign up as a Founding Member to get notified first and receive exclusive opening-day perks.",
              },
              {
                q: "Where in DC will Sway Union Market be located?",
                a: "Sway Union Market will be located in the Union Market district of Washington, DC. The exact address will be announced closer to opening. The location will be easily accessible from NoMa, Ivy City, Capitol Hill, and the broader DC metro area.",
              },
              {
                q: "What treatments will Sway Union Market offer?",
                a: "Sway Union Market will offer the full Sway experience: massage therapy (Signature, Deep Tissue, Sports, Salt Stone, Lymphatic Drainage), targeted facials (Pore Perfection, Forever Young, Glow Getter, Vitamin C), and the Remedy Room recovery circuit (sauna, cold plunge, LED light therapy, and lymphatic drainage compression boots).",
              },
              {
                q: "Does Sway Union Market have a sauna and cold plunge?",
                a: "Yes. The Remedy Room at Sway Union Market will feature a sauna, cold plunge, LED light therapy, and lymphatic drainage compression boots. You can book individual sessions or join the Remedy Room membership for four visits a month.",
              },
              {
                q: "How much are Sway Union Market memberships?",
                a: ON_SALE
                  ? `Founding memberships are $${FOUNDING.tiers.essential.price} a month for Essential (signature treatments), $${FOUNDING.tiers.premier.price} for Premier (enhanced treatments and extended durations) and $${FOUNDING.tiers.ultimate.price} for Ultimate (technology-infused treatments and extended durations). Each includes one massage or facial a month${LEAD_SAVING !== null ? `, and each is $${LEAD_SAVING} less than a single visit at that tier` : ""}. Your first month is charged when you join.${REMEDY ? ` The Remedy Room membership is open now too: ${REMEDY.visits} visits a month for $${REMEDY.price}, at the regular rate (it is not a founding membership).` : " Remedy Room membership pricing will be announced closer to opening."}`
                  : "Three membership tiers will be available: Essential (signature treatments), Premier (enhanced treatments and extended durations), and Ultimate (technology-infused treatments and extended durations), plus a Remedy Room membership for recovery circuit access. Founding member pricing will be announced before we open. Join the waitlist to be notified.",
              },
              ON_SALE
                ? {
                    q: "Can I become a founding member now?",
                    a: `Yes. Founding memberships are open to the first ${FOUNDING.cap} members, and you can join online on our Founding Membership page in about two minutes. Not ready yet? Join the waitlist and we'll keep you posted.`,
                  }
                : {
                    q: "Can I join the waitlist now?",
                    a: "Yes. Visit our Founding Membership page to join the waitlist. You'll be the first to know when founding memberships go live and will get priority booking and VIP perks on opening day.",
                  },
              {
                q: "Are Sway gift cards valid at the Union Market location?",
                a: "Yes. Sway gift cards are valid at all participating Sway locations. Gift cards purchased now can be redeemed at Sway Union Market once we open in DC.",
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
          <p className="text-sm opacity-80 mb-3">Explore other Sway locations</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/locations/denver-larimer"
              className="text-sm text-[#4A776D] font-semibold hover:underline"
            >
              Denver Larimer (Now Open) &rarr;
            </Link>
            <Link
              href="/locations/knox-henderson"
              className="text-sm text-[#4A776D] font-semibold hover:underline"
            >
              Dallas, TX (Coming Soon) &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ====== WAITLIST (on sale: the second option, for guests not ready to join) ====== */}
      {ON_SALE && (
        <section id="waitlist" className="px-6 pb-16 scroll-mt-28">
          <div className="max-w-md mx-auto">
            <WaitlistForm
              location="union-market"
              source="location-page"
              variant="compact"
              blurb="Not ready to join yet? Leave your name and we'll keep you posted on opening news."
            />
          </div>
        </section>
      )}

      {/* ====== FINAL CTA ====== */}
      <section className="px-6 py-16 bg-[#113D33] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <motion.h2 {...fadeUp} className="text-2xl md:text-3xl font-bold mb-4">
            Be First in DC
          </motion.h2>
          <motion.p {...fadeUp} className="mb-6 opacity-80">
            {ON_SALE
              ? `Founding memberships are open for the first ${FOUNDING.cap} members, from $${FOUNDING.tiers.essential.price} a month, before Sway Union Market opens in Washington, DC.`
              : "Join the waitlist for exclusive founding member pricing and VIP access when Sway Union Market opens in Washington, DC."}
          </motion.p>
          <motion.div {...fadeUp}>
            <Link
              href="/locations/union-market/founding-membership"
              data-track={ON_SALE ? "um-final-founding" : "um-final-waitlist"}
              className="inline-block bg-white text-[#113D33] px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              {ON_SALE ? "Become a Founding Member" : "Join the Waitlist"}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
