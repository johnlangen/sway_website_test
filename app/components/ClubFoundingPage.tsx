"use client";

/**
 * Founding membership page for the Sway Wellness Clubs (RiNo + Central Park): the massage and facial
 * launch. Buttons join on the site while lib/clubFounding.ts says salesOpen. Otherwise, or once all the
 * spots are taken, they go to the first access form (same list and endpoint as the club Notify Me form).
 *
 * Treatment names and lengths come from the club booking menu (ClubServiceFlow). Membership terms
 * come from the live Mindbody agreement on contracts 137-139.
 */

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Check, Star } from "lucide-react";
import ArrowMark from "./ArrowMark";
import { SwayCurve } from "./SwayCurve";
import type { MembershipPlan, MembershipSite } from "./MembershipJoinFlow";
import { CLUB_LOCATIONS, type ClubLocationKey } from "@/lib/clubLocations";
import { CLUB_FOUNDING, FOUNDING_RATES, LOUNGE_VISIT_PERK, type FoundingTierKey } from "@/lib/clubFounding";
import { useFoundingSpots } from "@/lib/useFoundingSpots";

// Most guests shop on a phone: the form and the checkout load on their own, not with the page.
const WaitlistForm = dynamic(() => import("./WaitlistForm"));
const MembershipJoinFlow = dynamic(() => import("./MembershipJoinFlow"), { ssr: false });

type Perk = "rate" | "visits";

const TIERS: {
  key: FoundingTierKey;
  name: string;
  line: string;
  massages: string[];
  facials: string[];
  popular?: boolean;
}[] = [
  {
    key: "essential",
    name: "Essential",
    line: "One 50-minute signature treatment a month.",
    massages: ["Signature Massage, 50 min (light to medium pressure)", "Maternity Massage, 50 min"],
    facials: ["Signature Facial, 50 min"],
  },
  {
    key: "premier",
    name: "Premier",
    line: "One targeted treatment a month, or a longer Signature.",
    popular: true,
    massages: [
      "Signature Massage, 70 min (light to medium pressure)",
      "Maternity Massage, 70 min",
      "Deep Tissue, Sports, Salt Stone or Lymphatic Drainage, 50 min",
    ],
    facials: ["Forever Young, Pore Perfection, Sensitive Silk, Glow Getter or Dr. Dennis Gross Vitamin C, 50 min"],
  },
  {
    key: "ultimate",
    name: "Ultimate",
    line: "One of our longest or most advanced treatments a month.",
    massages: [
      "Signature Massage, 90 min (light to medium pressure)",
      "Deep Tissue, Sports, Salt Stone or Lymphatic Drainage, 70 min",
    ],
    facials: ["Advanced facials, including Oxygen Infusion, Sculpt & Lift Microcurrent and Hydraderm, 50 to 60 min"],
  },
];

// Real Google reviews from Sway Larimer (app/components/GoogleReviews.tsx), and labeled as Larimer on
// the page: the club rooms aren't open yet, so these speak to the Sway team and experience.
const REVIEWS = [
  { text: "I had one of the best massages I\u2019ve ever had! Also loved the entire vibe of Sway - super clean and relaxing.", author: "Kayla Grant" },
  { text: "Best massage I\u2019ve had in years. Very relaxing vibes too!", author: "Whitney Lunn" },
  { text: "Had an excellent facial with Bri. Friendly and relaxing spa!", author: "Melanie Maslouski" },
];

const EVERY_MEMBERSHIP = [
  "One massage or facial every month",
  "Unused treatments roll over for 12 months while you stay active",
  "Member pricing on any extra treatment",
  "50% off boosts",
  "Share your treatment with one family member or partner",
  "Suspend up to 3 months a calendar year",
];

const PRESS = [
  { src: "/assets/usa_today.png", alt: "USA Today 10Best" },
  { src: "/assets/tzr.png", alt: "The Zoe Report" },
  { src: "/assets/post.png", alt: "The Denver Post" },
  { src: "/assets/5280.jpg", alt: "5280 Magazine" },
];

const eyebrow = "sway-eyebrow";

export default function ClubFoundingPage({ clubKey }: { clubKey: ClubLocationKey }) {
  const club = CLUB_LOCATIONS[clubKey];
  const cfg = CLUB_FOUNDING[clubKey];
  const [perk, setPerk] = useState<Perk>("rate");
  const [joining, setJoining] = useState<FoundingTierKey | null>(null);
  const spotsLeft = useFoundingSpots(clubKey);
  const canJoin = cfg.salesOpen && !spotsLeft?.startsWith("All");
  const [rating, setRating] = useState(4.9);
  const [listsOpen, setListsOpen] = useState<FoundingTierKey | null>(null);
  useEffect(() => {
    // Fetch checkout quietly after the page settles, so the first tap on Become a founder opens right away
    const t = setTimeout(() => void import("./MembershipJoinFlow"), 2500);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((d) => d?.rating && setRating(d.rating))
      .catch(() => {});
  }, []);

  const visitsValue = LOUNGE_VISIT_PERK.visits * LOUNGE_VISIT_PERK.dropIn;
  const base = `/locations/${clubKey}`;
  const fromPrice = FOUNDING_RATES.essential.founding;

  const plan: MembershipPlan | null = joining
    ? {
        key: joining,
        contractId: perk === "rate" ? FOUNDING_RATES[joining].contractId : FOUNDING_RATES[joining].regularContractId,
        name: `Founding ${joining.charAt(0).toUpperCase()}${joining.slice(1)}`,
        price: perk === "rate" ? FOUNDING_RATES[joining].founding : FOUNDING_RATES[joining].regular,
        blurb:
          perk === "rate"
            ? `One massage or facial a month at ${cfg.shortName}, $10 off every month.`
            : `One massage or facial a month at ${cfg.shortName}, plus ${LOUNGE_VISIT_PERK.visits} Remedy Lounge visits.`,
        perks: EVERY_MEMBERSHIP,
        doneNote:
          perk === "rate"
            ? "We'll reach out when massage and facial booking opens. Founding members book first."
            : `We'll add your ${LOUNGE_VISIT_PERK.visits} Remedy Lounge visits to your account, and reach out when massage and facial booking opens. Founding members book first.`,
        doneCta: perk === "rate" ? `Back to ${cfg.shortName}` : "Book a Remedy Lounge visit",
      }
    : null;

  const site: MembershipSite = {
    siteId: club.siteId,
    phone: club.phone,
    locationLabel: cfg.shortName,
    analyticsKey: cfg.analyticsKey,
    bookHref: perk === "rate" ? `${base}/` : `${base}/book-remedy-lounge`,
  };

  const faqs = [
    {
      q: "When do massage and facials open?",
      a: `Soon. ${cfg.shortName} is open now, and the massage and facial rooms are the next step. We don't have a date to share yet. Founding members hear first and book before anyone else.`,
    },
    {
      q: "How long does the founding offer last?",
      a: `Until ${cfg.closesLabel}, or until all ${cfg.cap} founding memberships at ${cfg.shortName} are taken, whichever comes first. After that, memberships continue at the regular rate.`,
    },
    {
      q: "Can I join today?",
      a: `Yes. Choose your perk and tier on this page and join in about 2 minutes, or the front desk at ${cfg.shortName} can sign you up in person or by phone at ${club.phone}.`,
    },
    {
      q: "How does billing work?",
      a: "Your first month is charged the day you join, and it includes your first treatment. After that you are billed monthly on the same date, including before the rooms open. There is no enrollment fee. Unused treatments wait on your account and roll over for 12 months while you stay active, so a treatment you pay for before opening is still yours. The membership renews automatically every 12 months, and we recommend at least three months to feel the difference.",
    },
    {
      q: "How do I cancel or pause?",
      a: `Contact ${cfg.shortName} by phone or email to cancel. You can suspend your membership for up to 3 months each calendar year. Your benefits, including rollovers, cannot be used while it is suspended.`,
    },
    {
      q: "Is the Remedy Lounge included?",
      a: `The Remedy Lounge is a separate membership. Choose the ${LOUNGE_VISIT_PERK.visits} visit founding perk to try it, or join the Lounge for unlimited access at $129 a month.`,
    },
    {
      q: "I'm already a Remedy Lounge member. Does this change anything?",
      a: "Your Lounge membership and rate stay exactly as they are. A founding membership is separate and adds a monthly massage or facial.",
    },
  ];

  const openTier = (tier: FoundingTierKey) => {
    if (canJoin) setJoining(tier);
    else
      document.getElementById("first-access")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
  };

  return (
    <div className="club-founding text-[#113D33]">
      {/* ===== Hero ===== */}
      <section className="sway-page-hero relative overflow-hidden bg-[#113D33] text-white">
        <div className="relative mx-auto max-w-6xl px-6 pb-10 pt-28 md:z-10 md:pb-24 md:pt-40">
          <div className="md:w-1/2 md:pr-14">
            <p className={`${eyebrow} text-[#D7E5DD]`}>Founding membership · {cfg.shortName}</p>
            <h1 className="mt-6">Be one of the first {cfg.cap}.</h1>
            <SwayCurve width={120} strokeWidth={2} className="my-5 block text-[#9CB7A9] md:my-7" />
            <p className="max-w-md text-base text-white/90 md:text-lg">
              Massage and facials are coming to {cfg.shortName} {cfg.opensLabel}. Join now for a monthly treatment at a founding rate, with first access to every appointment.
            </p>
            <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-white/25 pt-4 md:mt-9 md:gap-4 md:pt-5">
              <div className="flex flex-col-reverse">
                <dt className="mt-1 text-xs text-white/80">a month, to start</dt>
                <dd className="cf-num text-[28px] md:text-4xl">${fromPrice}</dd>
              </div>
              <div className="flex flex-col-reverse">
                <dt className="mt-1 text-xs text-white/80">{spotsLeft && !spotsLeft.startsWith("All") ? `of ${cfg.cap} left` : "spots at this club"}</dt>
                <dd className="cf-num text-[28px] md:text-4xl">{spotsLeft && !spotsLeft.startsWith("All") ? spotsLeft.split(" of ")[0] : cfg.cap}</dd>
              </div>
              <div className="flex flex-col-reverse">
                <dt className="mt-1 text-xs text-white/80">founding ends</dt>
                <dd className="cf-num text-[28px] md:text-4xl">{cfg.closesLabel.replace("January", "Jan")}</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-1 md:mt-9">
              <a href="#tiers" className="sway-button sway-button-light w-full sm:w-auto">
                See founding rates <span aria-hidden="true"><ArrowMark /></span>
              </a>
              <a href="#why" className="sway-text-link text-white">Why join now</a>
            </div>
          </div>
        </div>
        <div className="relative h-52 sm:h-64 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-1/2">
          <Image src={cfg.heroImage} alt="" fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      </section>

      {/* ===== Why founding ===== */}
      <section id="why" className="scroll-mt-24 bg-[#F7F4E9] py-12 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className={`${eyebrow} text-[#4A776D]`}>Why founding</p>
          <h2 className="mt-3 max-w-3xl text-[32px] leading-[1.1] md:mt-4 md:text-6xl">Get in before the treatment rooms open.</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-7 md:mt-14 md:gap-x-10 md:gap-y-10 lg:grid-cols-4">
            {[
              { n: "$600", t: "less a year than drop-in", b: "With $10 off, each treatment is $50 under drop-in." },
              { n: `$${visitsValue}`, t: "in Remedy Lounge visits", b: `Or pick ${LOUNGE_VISIT_PERK.visits} free visits instead of $10 off.` },
              { n: "First", t: "pick of appointments", b: "You book before the public." },
              { n: "12", t: "months of rollover", b: "Busy month? It waits for you while you stay active." },
            ].map((v) => (
              <div key={v.t} className="border-t border-[#113D33]/25 pt-3 md:pt-5">
                <p className="cf-num text-[40px] md:text-6xl">{v.n}</p>
                <h3 className="mt-2 text-base leading-snug md:mt-3 md:text-lg">{v.t}</h3>
                <p className="mt-1 text-sm leading-snug text-[#113D33]/80 md:mt-2 md:text-base md:leading-relaxed">{v.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== What is opening ===== */}
      <section className="bg-[#F7F4E9] pb-12 md:pb-28">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2 md:gap-10">
          <article>
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-[4/5]">
              <Image src="/assets/founding-massage-stone.jpg" alt="A massage therapist working with a warm salt stone" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover object-[50%_60%]" />
            </div>
            <p className={`${eyebrow} mt-4 text-[#4A776D] md:mt-7`}>Massage</p>
            <h3 className="cf-title mt-1 text-[28px] md:mt-2 md:text-4xl">13 ways to let go</h3>
            <p className="mt-2 max-w-md text-[15px] leading-normal text-[#113D33]/80 md:mt-3 md:text-base md:leading-relaxed">
              Licensed massage therapists, in 50, 70 and 90 minutes. Signature (light to medium pressure), Deep Tissue, Sports, Salt Stone, Lymphatic Drainage and Maternity.
            </p>
          </article>
          <article className="md:mt-24">
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-[4/5]">
              <Image src="/assets/J2.jpg" alt="A serum dropper held to a guest's cheek during a facial" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
            </div>
            <p className={`${eyebrow} mt-4 text-[#4A776D] md:mt-7`}>Facials</p>
            <h3 className="cf-title mt-1 text-[28px] md:mt-2 md:text-4xl">11 ways to glow</h3>
            <p className="mt-2 max-w-md text-[15px] leading-normal text-[#113D33]/80 md:mt-3 md:text-base md:leading-relaxed">
              Eminence Organics facials for aging, acne, hydration and sensitive skin, a dedicated Dr. Dennis Gross Vitamin C facial, and advanced treatments like Oxygen Infusion and Microcurrent.
            </p>
          </article>
        </div>
      </section>

      {/* ===== Rates ===== */}
      <section id="tiers" className="scroll-mt-20 bg-[#EBE4D1] py-12 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className={`${eyebrow} text-[#4A776D]`}>Founding rates</p>
          <h2 className="mt-3 max-w-2xl text-[32px] leading-[1.1] md:mt-4 md:text-6xl">Pick your perk, then your treatment.</h2>

          <div role="radiogroup" aria-label="Choose your founding perk" className="mt-6 grid grid-cols-2 gap-2 md:mt-10 md:gap-3 lg:max-w-3xl">
            {(
              [
                { id: "rate", title: "$10 off every month", body: "A lower monthly rate." },
                { id: "visits", title: `${LOUNGE_VISIT_PERK.visits} Remedy Lounge visits`, body: `A $${visitsValue} value, at the regular monthly rate.` },
              ] as { id: Perk; title: string; body: string }[]
            ).map((p) => (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={perk === p.id}
                onClick={() => setPerk(p.id)}
                className={`flex items-start gap-2 rounded-[4px] border p-3 text-left transition md:gap-3 md:p-5 ${
                  perk === p.id ? "border-[#113D33] bg-white shadow-[inset_0_0_0_1px_#113D33]" : "border-[#113D33]/25 hover:border-[#113D33]/60"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#113D33] ${perk === p.id ? "bg-[#113D33] text-white" : ""}`}
                >
                  {perk === p.id && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
                <span>
                  <span className="cf-label block text-sm leading-snug md:text-base">{p.title}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-[#113D33]/80 md:text-sm">{p.body}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-3 md:mt-8 md:gap-4 lg:grid-cols-3">
            {TIERS.map((t) => {
              const r = FOUNDING_RATES[t.key];
              const price = perk === "rate" ? r.founding : r.regular;
              const dark = !!t.popular;
              const muted = dark ? "text-white/85" : "text-[#113D33]/80";
              return (
                <article key={t.key} className={`flex flex-col rounded-[4px] p-5 md:p-8 ${dark ? "order-first bg-[#113D33] text-white lg:order-none" : "bg-[#F7F4E9]"}`}>
                  <div className="flex min-h-7 items-center justify-between gap-3">
                    <h3 className="text-xl">{t.name}</h3>
                    {t.popular && <span className={`${eyebrow} text-[#D7E5DD]`}>Most popular</span>}
                  </div>
                  <p className="mt-3 flex flex-wrap items-baseline gap-x-2 md:mt-6">
                    <span className="cf-num text-5xl md:text-6xl">${price}</span>
                    <span className={muted}>/ month</span>
                    {perk === "rate" && (
                      <span className={`ml-1 line-through ${muted}`}>
                        <span className="sr-only">Regular rate </span>${r.regular}
                      </span>
                    )}
                  </p>
                  <p className={`mt-2 text-sm md:mt-3 ${dark ? "text-[#D7E5DD]" : "text-[#2F5D50]"}`}>
                    {perk === "rate"
                      ? `$${(r.dropIn - price) * 12} less a year than $${r.dropIn} drop-ins`
                      : `Plus ${LOUNGE_VISIT_PERK.visits} Remedy Lounge visits. Drop-in is $${r.dropIn}.`}
                  </p>
                  <p className={`mt-2 text-[15px] leading-snug md:mt-5 md:text-base md:leading-relaxed ${muted}`}>{t.line}</p>
                  {/* Phones: treatment list on tap, so all three prices are close together */}
                  <button
                    type="button"
                    aria-expanded={listsOpen === t.key}
                    onClick={() => setListsOpen(listsOpen === t.key ? null : t.key)}
                    className={`mt-3 flex min-h-11 items-center justify-between border-t text-left text-sm lg:hidden ${dark ? "border-white/25" : "border-[#113D33]/20"}`}
                  >
                    See treatments
                    <span aria-hidden="true" className={`text-xl leading-none transition ${listsOpen === t.key ? "rotate-45" : ""}`}>+</span>
                  </button>
                  <div className={`${listsOpen === t.key ? "block" : "hidden"} pb-1 lg:mt-6 lg:block lg:border-t lg:pt-5 ${dark ? "lg:border-white/25" : "lg:border-[#113D33]/20"}`}>
                    <p className={`${eyebrow} ${dark ? "text-[#D7E5DD]" : "text-[#4A776D]"}`}>Massage</p>
                    <ul className={`mt-2 space-y-1.5 text-sm leading-relaxed ${muted}`}>
                      {t.massages.map((m) => <li key={m}>{m}</li>)}
                    </ul>
                    <p className={`${eyebrow} mt-5 ${dark ? "text-[#D7E5DD]" : "text-[#4A776D]"}`}>Facial</p>
                    <ul className={`mt-2 space-y-1.5 text-sm leading-relaxed ${muted}`}>
                      {t.facials.map((f) => <li key={f}>{f}</li>)}
                    </ul>
                  </div>
                  <div className="mt-auto pt-3 md:pt-8">
                    <button type="button" onClick={() => openTier(t.key)} className={`sway-button w-full ${dark ? "sway-button-light" : ""}`}>
                      <span>
                        {canJoin ? "Become a founder" : "Get first access"}
                        <span className="sr-only"> for {t.name}</span>
                      </span>
                      <span aria-hidden="true"><ArrowMark /></span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-[#113D33]/80 md:mt-5 md:text-sm">No enrollment fee · Treatments roll over · Suspend up to 3 months a year</p>

          <div className="mt-8 grid gap-4 border-t border-[#113D33]/25 pt-6 md:mt-16 md:gap-8 md:pt-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
            <h3 className="cf-title text-2xl md:text-3xl">Every founding membership includes</h3>
            <ul className="grid gap-x-10 gap-y-2 text-[15px] md:gap-y-3 md:text-base sm:grid-cols-2">
              {EVERY_MEMBERSHIP.map((b) => (
                <li key={b} className="flex gap-2.5 leading-snug md:gap-3 md:leading-relaxed">
                  <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#2F5D50]" strokeWidth={2} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Proof ===== */}
      <section className="bg-[#113D33] py-12 text-white md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className={`${eyebrow} text-[#D7E5DD]`}>From guests at Sway Larimer</p>
          <blockquote className="mt-4 max-w-4xl md:mt-6">
            <p className="cf-title text-[26px] leading-[1.15] md:text-5xl">&ldquo;{REVIEWS[0].text}&rdquo;</p>
            <footer className="mt-3 text-sm text-white/80 md:mt-5">{REVIEWS[0].author}, Google review</footer>
          </blockquote>
          <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-white/25 pt-6 md:mt-12 md:grid-cols-4 md:gap-8 md:pt-8">
            {REVIEWS.slice(1).map((r) => (
              <blockquote key={r.author} className="col-span-2 md:col-span-1">
                <p className="leading-snug text-white/90 md:leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                <footer className="mt-1.5 text-sm text-white/80 md:mt-3">{r.author}, Google review</footer>
              </blockquote>
            ))}
            <div>
              <p className="cf-num text-4xl">#4</p>
              <p className="mt-2 text-sm leading-relaxed text-white/85">Best Day Spa in the U.S., USA Today 10Best</p>
            </div>
            <div>
              <p className="cf-num flex items-center gap-2 text-4xl">
                {rating}
                <Star aria-hidden="true" className="h-6 w-6 fill-current" strokeWidth={0} />
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/85">Google rating at Sway Larimer</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== How it works (a real order of events) ===== */}
      <section className="bg-[#F7F4E9] py-12 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className={`${eyebrow} text-[#4A776D]`}>How founding works</p>
          <ol className="mt-5 grid gap-5 md:mt-8 md:grid-cols-3 md:gap-12">
            {[
              { t: "Claim your spot", b: `Only ${cfg.cap} founding memberships at ${cfg.shortName}. The offer ends ${cfg.closesLabel}, or sooner if they are all taken.` },
              { t: "Book before everyone else", b: "When the rooms are ready, founding members get the first appointments, before booking opens to the public." },
              { t: "Enjoy it every month", b: "A massage or facial every month. Anything you don't use rolls over for 12 months while you stay active." },
            ].map((s, i) => (
              <li key={s.t} className="flex gap-4 border-t border-[#113D33]/25 pt-4 md:block md:pt-5">
                <p className="cf-num w-7 shrink-0 text-4xl text-[#4A776D] md:w-auto md:text-5xl">{i + 1}</p>
                <div>
                  <h3 className="text-lg md:mt-4 md:text-xl">{s.t}</h3>
                  <p className="mt-1 text-[15px] leading-snug text-[#113D33]/80 md:mt-2 md:text-base md:leading-relaxed">{s.b}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== The club is already open ===== */}
      <section className="bg-[#EBE4D1] py-12 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-6 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-20">
          <div className="relative aspect-[16/10] overflow-hidden md:aspect-[4/5]">
            <Image src={cfg.clubImage} alt={cfg.clubImageAlt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className={`${eyebrow} text-[#4A776D]`}>Open now</p>
            <h2 className="mt-3 text-[32px] leading-[1.1] md:mt-4 md:text-6xl">Come see it before the rooms open.</h2>
            <p className="mt-3 max-w-lg text-base leading-normal text-[#113D33]/85 md:mt-6 md:text-lg md:leading-relaxed">{cfg.lounge}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-1 md:mt-8">
              <Link href={`${base}/book-remedy-lounge`} className="sway-button w-full sm:w-auto">
                Book the Remedy Lounge <span aria-hidden="true"><ArrowMark /></span>
              </Link>
              <Link href={`${base}/membership`} className="sway-text-link">Unlimited Lounge membership</Link>
            </div>
            <div className="mt-7 border-t border-[#113D33]/25 pt-4 md:mt-12 md:pt-6">
              <p className="text-sm text-[#113D33]/80">Sway has been featured in</p>
              <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3 md:mt-4 md:gap-x-8 md:gap-y-4">
                {PRESS.map((p) => (
                  <li key={p.alt}>
                    <Image src={p.src} alt={p.alt} width={96} height={36} className="h-6 w-auto object-contain mix-blend-multiply grayscale md:h-8" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-[#F7F4E9] py-12 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 md:gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <h2 className="text-[32px] leading-[1.1] md:text-5xl">Good questions</h2>
          <div>
            {faqs.map((f) => (
              <details key={f.q} className="group border-t border-[#113D33]/25 py-1 last:border-b">
                <summary className="cf-label flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-2 text-base md:min-h-14 md:py-3 md:text-lg [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="text-2xl leading-none transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pb-4 text-[15px] leading-normal text-[#113D33]/85 md:pb-5 md:text-base md:leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Close ===== */}
      <section id="first-access" className="scroll-mt-20 bg-[#113D33] py-12 text-white md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-7 px-6 md:grid-cols-2 md:gap-20">
          <div>
            <p className={`${eyebrow} text-[#D7E5DD]`}>Founding ends {cfg.closesLabel}</p>
            <h2 className="mt-3 text-[40px] leading-[1.05] md:mt-4 md:text-7xl">
              {spotsLeft ? `${spotsLeft}.` : `Only ${cfg.cap} at ${cfg.shortName}.`}
            </h2>
            {canJoin && (
              <a href="#tiers" className="sway-button sway-button-light mt-5 w-full sm:w-auto md:mt-8">
                Choose your membership <span aria-hidden="true"><ArrowMark /></span>
              </a>
            )}
            <p className="mt-5 text-sm text-white/80 md:mt-8">
              Questions? Call{" "}
              <a className="underline underline-offset-4" href={`tel:${club.phone.replace(/[^\d+]/g, "")}`}>{club.phone}</a> or email{" "}
              <a className="underline underline-offset-4" href={`mailto:${club.contactEmail}`}>{club.contactEmail}</a>.
            </p>
          </div>
          <div className="rounded-[4px] bg-[#F7F4E9] p-5 text-[#113D33] sm:p-8">
            <h3 className="cf-title text-[28px] md:text-3xl">{canJoin ? "Not ready today?" : "Get first access"}</h3>
            <p className="mb-4 mt-1 text-[15px] leading-snug text-[#113D33]/80 md:mb-6 md:mt-2 md:text-base md:leading-relaxed">
              {canJoin
                ? "Leave your name and we'll follow up before the founding spots are gone."
                : "Leave your name and we'll reach out to get you set up."}
            </p>
            <WaitlistForm location={clubKey} source="founding-membership" variant="full" submitLabel={canJoin ? "Keep Me Posted" : "Get First Access"} />
          </div>
        </div>
      </section>

      {/* ===== Sticky mobile bar ===== */}
      <div className="h-20 md:hidden" aria-hidden="true" />
      <a
        href="#tiers"
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-[#113D33]/10 bg-[#F7F4E9] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 md:hidden"
      >
        <span className="min-w-0 leading-tight">
          <span className="block text-[10px] uppercase tracking-[0.15em] text-[#2F5D50]">Founding membership</span>
          <span className="block text-sm text-[#113D33]">From ${fromPrice} a month · {spotsLeft ?? `Only ${cfg.cap}`}</span>
        </span>
        <span className="shrink-0 rounded-[3px] bg-[#113D33] px-7 py-2.5 text-sm text-white">See rates</span>
      </a>

      {plan && <MembershipJoinFlow plan={plan} site={site} onClose={() => setJoining(null)} />}
    </div>
  );
}
