"use client";

/**
 * The founding page's offer once a launch site is selling (lib/launchSites.ts salesOpen, and
 * /api/membership/founding/ has not said the checkout is closed).
 *
 * Built to sell, not just list (John 11/23/2026: "the value proposition is not here, doesnt even
 * say the discount, no urgency or scarcity. no beautiful images to sell, it should lean on time").
 * Each tier leads with a photo and its time on the table (50, up to 70, up to 90 minutes, every
 * month), then the price ladder that makes the founding rate obvious (single visit, regular
 * membership, founding rate), then what a member chooses from each month, then the Join button
 * into the website checkout (/locations/<slug>/founding-membership/join/?tier=…). The header
 * carries the saving and the cap.
 *
 * The founding price, start date and billing line come from the live Mindbody contracts when they
 * have loaded (the page passes config prices until then), so the page can't show a founding price
 * the checkout won't charge. A tier Mindbody no longer matches shows a Reserve button instead.
 * Regular and single-visit prices are the spa's own Mindbody prices (lib/launchSites.ts).
 *
 * Tracking: founding-tier-<tier> on each Join link (shown = the founding page view, clicked = the
 * link; the checkout itself reports "from-founding"), founding-tier-reserve on the interest link.
 */

import Image from "next/image";
import Link from "next/link";
import ArrowMark from "./ArrowMark";
import { SwayCurve } from "./SwayCurve";
import { FOUNDING_TIER_CONTENT } from "@/lib/foundingTiers";

export type LiveFoundingPlan = {
  tier: "essential" | "premier" | "ultimate";
  price: number;
  available: boolean;
  startLabel: string | null;
  fixedStart: boolean;
  nextChargeLabel: string | null;
};

export type FoundingAnchorPrices = Record<LiveFoundingPlan["tier"], { regular?: number; visit?: number }>;

// The photo grows with the time: the tiers step up left to right on desktop.
const PHOTO: Record<LiveFoundingPlan["tier"], string> = {
  essential: "md:h-44",
  premier: "md:h-56",
  ultimate: "md:h-[17rem]",
};

export default function FoundingLiveTiers({
  base,
  shortName,
  cap,
  plans,
  anchors,
  onReserve,
}: {
  base: string;
  shortName: string;
  cap: number;
  plans: LiveFoundingPlan[];
  anchors: FoundingAnchorPrices;
  onReserve: () => void;
}) {
  const first = plans.find((p) => p.available && p.startLabel);
  const lead = plans.find((p) => p.tier === "essential") ?? plans[0];
  const leadVisit = lead ? anchors[lead.tier]?.visit : undefined;
  const saving = lead && leadVisit ? leadVisit - lead.price : null;

  return (
    <section id="founding-rates" className="club-founding scroll-mt-20 bg-[#113D33] px-5 py-16 text-[#F7F4E9] md:px-6 md:py-24" aria-labelledby="founding-rates-title">
      <div className="mx-auto max-w-6xl">
        <div className="md:flex md:items-end md:justify-between md:gap-12">
          <div>
            <p className="sway-eyebrow text-[#B6CFBF]">Founding membership · {shortName}</p>
            <SwayCurve width={120} strokeWidth={2} className="my-4 block text-[#B6CFBF]" />
            <h2 id="founding-rates-title" className="cf-title max-w-3xl text-[40px] leading-[1.02] md:text-7xl">
              Time that&apos;s yours, every month.
            </h2>
            <p className="mt-4 max-w-xl text-base text-[#F7F4E9]/90 md:text-lg">
              {saving !== null && lead && leadVisit
                ? `One massage or facial every month. A $${leadVisit} visit is $${lead.price} at the founding rate, and every tier is $${saving} less than a single visit.`
                : "One massage or facial every month, at the founding rate."}{" "}
              Join online in about two minutes.
            </p>
          </div>
          {/* Scarcity, stated once and plainly */}
          <p className="mt-8 shrink-0 border-l-2 border-[#B6CFBF] pl-5 md:mt-0 md:max-w-[250px]">
            <span className="cf-num block text-5xl text-[#B6CFBF] md:text-6xl">{cap}</span>
            <span className="mt-1 block text-sm text-[#F7F4E9]/90">founding memberships. When they&apos;re gone, the founding rate is gone.</span>
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:mt-14 md:grid-cols-3 md:items-end">
          {plans.map((p) => {
            const t = FOUNDING_TIER_CONTENT[p.tier];
            const a = anchors[p.tier] ?? {};
            return (
              <li key={p.tier} className="flex">
                <article className="flex w-full flex-col overflow-hidden rounded-[4px] bg-[#F7F4E9] text-[#113D33]">
                  <div className={`relative aspect-[16/9] md:aspect-auto ${PHOTO[p.tier]}`}>
                    <Image src={t.image} alt={t.alt} fill sizes="(min-width: 768px) 380px, 100vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A23]/90 via-[#0B2A23]/25 to-transparent" aria-hidden="true" />
                    <p className="absolute inset-x-5 bottom-4 text-[#F7F4E9]">
                      {t.upTo && <span className="block text-[11px] uppercase tracking-[0.18em] text-[#F7F4E9]/90">Up to</span>}
                      <span className="flex items-baseline gap-2">
                        <span className="cf-num text-6xl md:text-7xl">{t.minutes}</span>
                        <span className="text-sm">minutes, every month</span>
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <h3 className="sr-only">Founding {t.name}</h3>
                    <p className="sway-eyebrow text-[#4A776D]" aria-hidden="true">Founding {t.name}</p>
                    <p className="mt-2 text-[15px] leading-snug text-[#113D33]/90">{t.line}</p>

                    {/* The price ladder: what the same treatment costs three ways */}
                    <dl className="mt-5 space-y-1.5 border-y border-[#113D33]/15 py-4 text-sm">
                      {a.visit !== undefined && (
                        <div className="flex items-baseline justify-between gap-3">
                          <dt className="text-[#113D33]/80">Single visit</dt>
                          <dd className="text-[#113D33]/80 line-through decoration-[#113D33]/50">${a.visit}</dd>
                        </div>
                      )}
                      {a.regular !== undefined && (
                        <div className="flex items-baseline justify-between gap-3">
                          <dt className="text-[#113D33]/80">Regular membership</dt>
                          <dd className="text-[#113D33]/80 line-through decoration-[#113D33]/50">${a.regular} a month</dd>
                        </div>
                      )}
                      <div className="flex items-baseline justify-between gap-3 pt-1">
                        <dt className="font-semibold">Founding rate</dt>
                        <dd>
                          <span className="cf-num text-5xl">${p.price}</span>
                          <span className="text-xs text-[#113D33]/80"> a month</span>
                        </dd>
                      </div>
                    </dl>

                    <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-[#4A776D]">Choose each month</p>
                    <ul className="mt-2 flex-1 space-y-1.5 text-sm leading-snug">
                      {t.choose.map((c) => (
                        <li key={c} className="flex gap-2.5">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#4A776D]" aria-hidden="true" />
                          {c}
                        </li>
                      ))}
                    </ul>

                    {p.available ? (
                      <Link href={`${base}/founding-membership/join/?tier=${p.tier}`} data-track={`founding-tier-${p.tier}`} className="sway-button mt-6 w-full">
                        Become a founder<span className="sr-only">, {t.name}</span> <span aria-hidden="true"><ArrowMark /></span>
                      </Link>
                    ) : (
                      <button type="button" onClick={onReserve} data-track={`founding-tier-${p.tier}-unavailable`} className="sway-button mt-6 w-full !bg-transparent !text-[#113D33]">
                        Reserve this tier <span aria-hidden="true"><ArrowMark direction="down" /></span>
                      </button>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 max-w-2xl text-sm text-[#F7F4E9]/90 md:text-[15px]">
          {first
            ? first.fixedStart
              ? `Your first month is charged when you join. Your membership starts ${first.startLabel}, and your next charge is ${first.nextChargeLabel}.`
              : "Your first month is charged when you join, then monthly on the same day."
            : "Your first month is charged when you join."}{" "}
          Unused treatments roll over for 12 months while you stay active, and you can share your treatment with one family member or partner.
        </p>
        <button type="button" onClick={onReserve} data-track="founding-tier-reserve" className="mt-4 text-sm underline underline-offset-4 hover:no-underline">
          Not ready today? Leave your name and we&apos;ll keep you posted.
        </button>
      </div>
    </section>
  );
}
