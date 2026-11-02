"use client";

/**
 * Founding membership page for the Sway Wellness Clubs (RiNo + Central Park): the massage and facial
 * launch. Sells nothing until lib/clubFounding.ts says salesOpen; until then every button goes to the
 * first access form (the same list and endpoint as the club Notify Me form).
 *
 * Treatment names and lengths come from the club booking menu (ClubServiceFlow). Membership terms
 * come from the live Mindbody agreement on contracts 137-139.
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import ArrowMark from "./ArrowMark";
import { SwayCurve } from "./SwayCurve";
import WaitlistForm from "./WaitlistForm";
import MembershipJoinFlow, { type MembershipPlan, type MembershipSite } from "./MembershipJoinFlow";
import { CLUB_LOCATIONS, type ClubLocationKey } from "@/lib/clubLocations";
import { CLUB_FOUNDING, FOUNDING_RATES, LOUNGE_VISIT_PERK, spotsLeftLabel, type FoundingTierKey } from "@/lib/clubFounding";

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

/** The real spots-left line from Mindbody; null until enough are taken to show it. */
export function useFoundingSpots(clubKey: ClubLocationKey) {
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    fetch(`/api/founding/count/?club=${clubKey}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setLabel(spotsLeftLabel(d.claimed, d.cap)))
      .catch(() => {});
  }, [clubKey]);
  return label;
}

export default function ClubFoundingPage({ clubKey }: { clubKey: ClubLocationKey }) {
  const club = CLUB_LOCATIONS[clubKey];
  const cfg = CLUB_FOUNDING[clubKey];
  const [perk, setPerk] = useState<Perk>("rate");
  const [joining, setJoining] = useState<FoundingTierKey | null>(null);
  const spotsLeft = useFoundingSpots(clubKey);

  const visitsValue = LOUNGE_VISIT_PERK.visits * LOUNGE_VISIT_PERK.dropIn;
  const base = `/locations/${clubKey}`;
  const fromPrice = FOUNDING_RATES.essential.founding;

  const plan: MembershipPlan | null = joining
    ? {
        key: joining,
        contractId: perk === "rate" ? FOUNDING_RATES[joining].contractId : FOUNDING_RATES[joining].regularContractId,
        name: `Founding ${joining.charAt(0).toUpperCase()}${joining.slice(1)}`,
        price: perk === "rate" ? FOUNDING_RATES[joining].founding : FOUNDING_RATES[joining].regular,
        blurb: `One massage or facial a month at ${cfg.shortName}, at the founding rate.`,
        perks: EVERY_MEMBERSHIP,
      }
    : null;

  const site: MembershipSite = {
    siteId: club.siteId,
    phone: club.phone,
    locationLabel: cfg.shortName,
    analyticsKey: cfg.analyticsKey,
    bookHref: `${base}/book`,
  };

  const faqs = [
    {
      q: "When do massage and facials open?",
      a: `Massage and facial rooms open at ${cfg.shortName} ${cfg.opensLabel}. Founding members hear first and book before anyone else.`,
    },
    {
      q: "How long does the founding offer last?",
      a: `Until ${cfg.closesLabel}, or until all ${cfg.cap} founding memberships at ${cfg.shortName} are taken, whichever comes first. After that, memberships continue at the regular rate.`,
    },
    {
      q: "Can I join today?",
      a: `Yes. The front desk at ${cfg.shortName} can sign you up in person or by phone at ${club.phone}. You can also leave your name here and we'll reach out.`,
    },
    {
      q: "How does billing work?",
      a: "Your first month is charged the day you join, and it includes your first treatment. After that you are billed monthly. There is no enrollment fee. The membership renews automatically every 12 months, and we recommend at least three months to feel the difference.",
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
    if (cfg.salesOpen) setJoining(tier);
    else
      document.getElementById("first-access")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
  };

  return (
    <div className="text-[#113D33]">
      {/* ===== Hero ===== */}
      <section className="sway-page-hero relative overflow-hidden bg-[#113D33] text-white">
        <div className="absolute inset-y-0 right-0 hidden w-[52%] md:block">
          <Image src={cfg.heroImage} alt="" fill priority sizes="52vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#113D33] via-[#113D33]/35 to-transparent" />
        </div>
        <div className="relative mx-auto grid max-w-6xl px-6 pb-16 pt-32 md:grid-cols-2 md:pb-28 md:pt-40">
          <div>
            <p className={`${eyebrow} text-[#D7E5DD]`}>Founding membership · {cfg.shortName}</p>
            <h1 className="mt-6 text-6xl font-semibold leading-[0.98] tracking-tight md:text-8xl">
              Be one of the first {cfg.cap}.
            </h1>
            <SwayCurve width={120} strokeWidth={2.2} className="my-7 block text-[#9CB7A9]" />
            <p className="max-w-md text-lg leading-relaxed text-white/90">
              Massage and facials are coming to {cfg.shortName} {cfg.opensLabel}. Founding members choose a perk, $10 off every month or {LOUNGE_VISIT_PERK.visits} Remedy Lounge visits, and book before anyone else.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#tiers" className="sway-button sway-button-light">
                See founding rates <span aria-hidden="true"><ArrowMark /></span>
              </a>
              <p className="text-sm text-white/85">
                From ${fromPrice} a month. {spotsLeft ? `${spotsLeft}.` : `Only ${cfg.cap} at this club.`} Ends {cfg.closesLabel}.
              </p>
            </div>
          </div>
          {/* The founder card: the thing you are actually getting a place on */}
          <div className="mt-12 flex items-end justify-center md:mt-0 md:justify-end">
            <div className="w-full max-w-[21rem] rotate-[-2deg] rounded-3xl border border-white/25 bg-[#F7F4E9] p-7 text-[#113D33] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]">
              <div className="flex items-start justify-between gap-4">
                <p className="text-2xl font-semibold tracking-tight">{cfg.shortName}</p>
                <p className="text-right text-[11px] font-semibold uppercase leading-snug tracking-[0.2em] text-[#4A776D]">
                  Founding
                  <br />
                  member
                </p>
              </div>
              <SwayCurve width={90} strokeWidth={2} className="my-6 block text-[#4A776D]" />
              <p className="text-sm text-[#113D33]/80">Massage + facial</p>
              <p className="mt-1 text-lg">One of {cfg.cap} at this club</p>
            </div>
          </div>
        </div>
        <div className="relative h-64 md:hidden">
          <Image src={cfg.heroImage} alt="" fill sizes="100vw" className="object-cover" />
        </div>
      </section>

      {/* ===== What is opening ===== */}
      <section className="bg-[#F7F4E9] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className={`${eyebrow} text-[#4A776D]`}>What&apos;s opening</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            The club you know, with treatment rooms.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <article>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image src="/assets/massage4.jpg" alt="A guest resting with warm salt stones" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">13 massages</h3>
              <p className="mt-2 max-w-md leading-relaxed text-[#113D33]/80">
                With licensed massage therapists, in 50, 70 and 90 minutes. From our light to medium pressure Signature Massage to Deep Tissue, Sports, Salt Stone, Lymphatic Drainage and Maternity.
              </p>
            </article>
            <article className="md:mt-16">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image src="/assets/J2.jpg" alt="A serum dropper held to a guest's cheek during a facial" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">11 facials</h3>
              <p className="mt-2 max-w-md leading-relaxed text-[#113D33]/80">
                Eminence Organics facials for aging, acne, hydration and sensitive skin, a dedicated Dr. Dennis Gross Vitamin C facial, and advanced treatments like Oxygen Infusion and Microcurrent.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ===== Rates ===== */}
      <section id="tiers" className="scroll-mt-24 bg-[#EBE4D1] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className={`${eyebrow} text-[#4A776D]`}>Founding rates</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">Pick your perk, then your treatment.</h2>

          <div role="radiogroup" aria-label="Choose your founding perk" className="mt-8 grid gap-3 sm:grid-cols-2 lg:max-w-3xl">
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
                className={`flex items-start gap-3 rounded-2xl border-2 p-5 text-left transition ${
                  perk === p.id ? "border-[#113D33] bg-white" : "border-[#113D33]/20 bg-transparent hover:border-[#113D33]/50"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#113D33] ${perk === p.id ? "bg-[#113D33] text-white" : ""}`}
                >
                  {perk === p.id && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
                <span>
                  <span className="block font-semibold">{p.title}</span>
                  <span className="mt-0.5 block text-sm text-[#113D33]/80">{p.body}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {TIERS.map((t) => {
              const r = FOUNDING_RATES[t.key];
              const price = perk === "rate" ? r.founding : r.regular;
              return (
                <article
                  key={t.key}
                  className={`flex flex-col rounded-3xl bg-white p-7 shadow-[0_10px_30px_-15px_rgba(17,61,51,0.25)] ${t.popular ? "ring-2 ring-[#113D33]" : ""}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-2xl font-medium tracking-tight">{t.name}</h3>
                    {t.popular && (
                      <span className="rounded-[3px] bg-[#113D33] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">Most popular</span>
                    )}
                  </div>
                  <p className="mt-5 flex items-baseline gap-2">
                    <span className="text-5xl tracking-tight">${price}</span>
                    <span className="text-[#113D33]/80">/ month</span>
                    {perk === "rate" && (
                      <span className="ml-1 text-[#113D33]/75 line-through">
                        <span className="sr-only">Regular rate </span>${r.regular}
                      </span>
                    )}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#2F5D50]">
                    {perk === "rate" ? `$${r.dropIn - price} less than a $${r.dropIn} drop-in, every month` : `Plus ${LOUNGE_VISIT_PERK.visits} Remedy Lounge visits. Drop-in is $${r.dropIn}.`}
                  </p>
                  <p className="mt-5 leading-relaxed text-[#113D33]/85">{t.line}</p>
                  <details className="group mt-4 border-t border-[#113D33]/15 pt-4">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between font-semibold [&::-webkit-details-marker]:hidden">
                      What you can choose
                      <span aria-hidden="true" className="text-xl leading-none transition group-open:rotate-45">+</span>
                    </summary>
                    <p className={`${eyebrow} mt-3 text-[11px] text-[#4A776D]`}>Massage</p>
                    <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-[#113D33]/85">
                      {t.massages.map((m) => <li key={m}>{m}</li>)}
                    </ul>
                    <p className={`${eyebrow} mt-4 text-[11px] text-[#4A776D]`}>Facial</p>
                    <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-[#113D33]/85">
                      {t.facials.map((f) => <li key={f}>{f}</li>)}
                    </ul>
                  </details>
                  <div className="mt-auto pt-6">
                    <button
                      type="button"
                      onClick={() => openTier(t.key)}
                      className="sway-button w-full"
                    >
                      <span>
                        {cfg.salesOpen ? "Become a founder" : "Get first access"}
                        <span className="sr-only"> for {t.name}</span>
                      </span>
                      <span aria-hidden="true"><ArrowMark /></span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
            <h3 className="text-2xl font-semibold tracking-tight">Every founding membership includes</h3>
            <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {EVERY_MEMBERSHIP.map((b) => (
                <li key={b} className="flex gap-3 leading-relaxed">
                  <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#2F5D50]" strokeWidth={3} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== How it works (a real order of events) ===== */}
      <section className="bg-[#113D33] py-20 text-white md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className={`${eyebrow} text-[#D7E5DD]`}>How founding works</p>
          <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
            {[
              { t: "Claim your spot", b: `There are ${cfg.cap} founding memberships at ${cfg.shortName}. The offer ends ${cfg.closesLabel}, or sooner if they are all taken.` },
              { t: "Book before everyone else", b: "When the rooms are ready, founding members get the first appointments, before booking opens to the public." },
              { t: "Keep your membership", b: "Enjoy a massage or facial every month. Anything you don't use rolls over for 12 months while you stay active." },
            ].map((s, i) => (
              <li key={s.t} className="border-t border-white/25 pt-6">
                <p className="text-5xl tracking-tight text-[#9CB7A9]">{i + 1}</p>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight">{s.t}</h3>
                <p className="mt-3 leading-relaxed text-white/85">{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== The club is already open ===== */}
      <section className="bg-[#F7F4E9] py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image src={cfg.clubImage} alt={cfg.clubImageAlt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className={`${eyebrow} text-[#4A776D]`}>Open now</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">Come see it before the rooms open.</h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#113D33]/85">{cfg.lounge}</p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-semibold">
              <Link href={`${base}/book-remedy-lounge`} className="underline underline-offset-4">Book the Remedy Lounge</Link>
              <Link href={`${base}/membership`} className="underline underline-offset-4">Unlimited Lounge membership</Link>
            </div>
            <div className="mt-12 border-t border-[#113D33]/20 pt-6">
              <p className="text-sm text-[#113D33]/80">Sway has been featured in</p>
              <ul className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4">
                {PRESS.map((p) => (
                  <li key={p.alt}>
                    <Image src={p.src} alt={p.alt} width={96} height={36} className="h-8 w-auto object-contain" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-[#EBE4D1] py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight">Good questions</h2>
          <div>
            {faqs.map((f) => (
              <details key={f.q} className="group border-t border-[#113D33]/20 py-1 last:border-b">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="text-2xl leading-none transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pb-5 leading-relaxed text-[#113D33]/85">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== First access ===== */}
      <section id="first-access" className="scroll-mt-24 bg-[#113D33] py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:gap-20">
          <div>
            <p className={`${eyebrow} text-[#D7E5DD]`}>First access</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              {spotsLeft ? `${spotsLeft} at ${cfg.shortName}.` : `Only ${cfg.cap} at ${cfg.shortName}.`}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/85">
              Leave your name and we&apos;ll reach out to get you set up. Ready now? The front desk can sign you up today.
            </p>
            <p className="mt-6 text-sm text-white/80">
              Questions? Call{" "}
              <a className="underline underline-offset-4" href={`tel:${club.phone.replace(/[^\d+]/g, "")}`}>{club.phone}</a> or email{" "}
              <a className="underline underline-offset-4" href={`mailto:${club.contactEmail}`}>{club.contactEmail}</a>.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 text-[#113D33] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:p-8">
            <WaitlistForm location={clubKey} source="founding-membership" variant="full" submitLabel="Get First Access" />
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
          <span className="block text-sm font-semibold text-[#113D33]">From ${fromPrice} a month</span>
        </span>
        <span className="shrink-0 rounded-[3px] bg-[#113D33] px-7 py-2.5 text-sm font-semibold text-white">See rates</span>
      </a>

      <AnimatePresence>
        {plan && <MembershipJoinFlow plan={plan} site={site} onClose={() => setJoining(null)} />}
      </AnimatePresence>
    </div>
  );
}
