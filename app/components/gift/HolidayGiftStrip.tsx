"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getSelectedLocation } from "@/app/components/LocationAwareHref";
import { HOLIDAY_BONUS, HOLIDAY_BONUS_LOCATIONS, holidayBonusOn } from "@/lib/holidayBonus";
import { giftDate } from "@/lib/giftCards/schedule";
import { trackStep } from "@/lib/ops/client";

/** The last week: an online gift card still arrives in time (the Spavia site's "Still time to give", Dec 18 to 25) */
const LATE = { start: "2026-12-18", end: "2026-12-25" };

/**
 * The holiday gift card band (John 11/24/2026: nothing announced until the offer is live). It shows
 * BY DATE, read in the browser, and is gone by itself on Dec 26:
 *   Nov 26 to Dec 17   the holiday bonus
 *   Dec 18 to Dec 25   "Still time to give" (an emailed gift card arrives in minutes), with the bonus
 * `only="late"`: just the last-week line, for the gift card pages (they carry the bonus notice already).
 * Not shown to a guest who has picked a location that isn't selling gift cards yet.
 * Preview before the dates: ?bonuspreview=1 (the bonus), ?giftstrip=late (the last week).
 * Counted when shown: flow gift, step strip-shown, variant = `<where>-<bonus|late>`.
 */
export default function HolidayGiftStrip({ where, only }: { where: string; only?: "late" }) {
  const [phase, setPhase] = useState<"off" | "bonus" | "late">("off");
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const day = giftDate("America/Denver");
    const late = (day >= LATE.start && day <= LATE.end) || query.get("giftstrip") === "late";
    const bonus = holidayBonusOn() || query.has("bonuspreview");
    const slug = getSelectedLocation()?.slug;
    if (slug && !HOLIDAY_BONUS_LOCATIONS.has(slug)) return;
    const next = late ? "late" : bonus && only !== "late" ? "bonus" : "off";
    if (next === "off") return;
    setPhase(next);
    if (holidayBonusOn()) trackStep("gift", "strip-shown", `${where}-${next}`);
  }, [where, only]);
  if (phase === "off") return null;
  return (
    <Link
      href="/holiday-gift-cards/"
      data-track={`gift-strip-${where}-${phase}`}
      className="group block w-full bg-[#113D33] text-[#F7F4E9] transition-colors hover:bg-[#0c2a23]"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1.5 px-6 py-3.5 text-center md:py-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E2C58F] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#113D33] md:text-xs">
          {phase === "late" ? "Still time to give" : "Holiday bonus"}
        </span>
        <span className="text-sm font-semibold md:text-base">
          {phase === "late"
            ? `An online gift card arrives by email within minutes, even on Christmas Day. $${HOLIDAY_BONUS.minValue} or more comes with a free ${HOLIDAY_BONUS.treatment}.`
            : `Purchase a $${HOLIDAY_BONUS.minValue}+ gift card, receive a free ${HOLIDAY_BONUS.treatment}. Through December 25.`}
        </span>
        <span className="whitespace-nowrap text-sm font-semibold underline underline-offset-4 group-hover:no-underline md:text-base">
          Give a gift card <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}
