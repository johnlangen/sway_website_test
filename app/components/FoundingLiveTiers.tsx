"use client";

/**
 * The founding page's price list once a launch site is selling (lib/launchSites.ts salesOpen AND
 * /api/membership/founding/ says the checkout is ready). Three tiers on one rising line, each with
 * its founding price and a link into the website checkout
 * (/locations/<slug>/founding-membership/join/?tier=…).
 *
 * Prices, the start date and the billing line come from the live Mindbody contracts, so the page
 * can't show a number the checkout won't charge. A tier Mindbody no longer matches shows as
 * unavailable instead of a Join button.
 *
 * Tracking: founding-tier-<tier> on each Join link (shown = the founding page view, clicked = the
 * link; the checkout itself reports "from-founding"), founding-tier-reserve on the interest link.
 */

import Link from "next/link";
import ArrowMark from "./ArrowMark";
import { SwayCurve } from "./SwayCurve";

export type LiveFoundingPlan = {
  tier: "essential" | "premier" | "ultimate";
  price: number;
  available: boolean;
  startLabel: string | null;
  fixedStart: boolean;
  nextChargeLabel: string | null;
};

const TIERS: Record<LiveFoundingPlan["tier"], { name: string; line: string; lift: string }> = {
  essential: { name: "Essential", line: "Our signature massage or facial, once a month.", lift: "md:mt-16" },
  premier: { name: "Premier", line: "A targeted treatment, or more time, once a month.", lift: "md:mt-8" },
  ultimate: { name: "Ultimate", line: "Our longest and most advanced treatments, once a month.", lift: "md:mt-0" },
};

export default function FoundingLiveTiers({
  base,
  shortName,
  cap,
  plans,
  onReserve,
}: {
  base: string;
  shortName: string;
  cap: number;
  plans: LiveFoundingPlan[];
  onReserve: () => void;
}) {
  const first = plans.find((p) => p.available && p.startLabel);
  return (
    <section id="founding-rates" className="club-founding bg-[#113D33] px-5 py-16 text-[#F7F4E9] md:px-6 md:py-24" aria-labelledby="founding-rates-title">
      <div className="mx-auto max-w-6xl">
        <p className="sway-eyebrow text-[#B6CFBF]">Founding membership · First {cap} members</p>
        <SwayCurve width={120} strokeWidth={2} className="my-4 block text-[#B6CFBF]" />
        <h2 id="founding-rates-title" className="cf-title max-w-3xl text-[40px] leading-[1.02] md:text-7xl">
          Founding memberships are open.
        </h2>
        <p className="mt-4 max-w-xl text-base text-[#F7F4E9]/85 md:text-lg">
          One massage or facial every month at {shortName}, at the founding rate. Join online in about two minutes.
        </p>

        {/* Three tiers stepping up, left to right */}
        <ul className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:items-stretch md:gap-5">
          {plans.map((p) => {
            const t = TIERS[p.tier];
            return (
              <li key={p.tier} className={`flex ${t.lift}`}>
                <div className="flex w-full flex-col rounded-[4px] bg-[#F7F4E9] p-6 text-[#113D33] md:p-7">
                  <p className="sway-eyebrow text-[#4A776D]">Founding {t.name}</p>
                  <p className="mt-4 flex items-baseline gap-2">
                    <span className="cf-num text-6xl md:text-7xl">${p.price}</span>
                    <span className="text-sm text-[#113D33]/75">a month</span>
                  </p>
                  <p className="mt-3 flex-1 text-[15px] leading-snug text-[#113D33]/85">{t.line}</p>
                  {p.available ? (
                    <Link href={`${base}/founding-membership/join/?tier=${p.tier}`} data-track={`founding-tier-${p.tier}`} className="sway-button mt-6 w-full">
                      Become a founder <span aria-hidden="true"><ArrowMark /></span>
                    </Link>
                  ) : (
                    <button type="button" onClick={onReserve} data-track={`founding-tier-${p.tier}-unavailable`} className="sway-button mt-6 w-full !bg-transparent !text-[#113D33]">
                      Reserve this tier <span aria-hidden="true"><ArrowMark direction="down" /></span>
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {first && (
          <p className="mt-8 max-w-2xl text-sm text-[#F7F4E9]/85 md:text-[15px]">
            {first.fixedStart
              ? `Your first month is charged when you join. Your membership starts ${first.startLabel}, and your next charge is ${first.nextChargeLabel}.`
              : "Your first month is charged when you join, then monthly on the same day."}{" "}
            Unused treatments roll over for 12 months while you stay active.
          </p>
        )}
        <button type="button" onClick={onReserve} data-track="founding-tier-reserve" className="mt-4 text-sm underline underline-offset-4 hover:no-underline">
          Not ready today? Leave your name and we&apos;ll keep you posted.
        </button>
      </div>
    </section>
  );
}
