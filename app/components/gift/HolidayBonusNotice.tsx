"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HOLIDAY_BONUS, holidayBonusOn, holidayBonusOpen } from "@/lib/holidayBonus";
import { trackStep } from "@/lib/ops/client";

/**
 * The holiday bonus, announced on the gift card pages (lib/holidayBonus.ts). Shows by date
 * (Nov 26 to Dec 25) and is gone by itself afterwards; nothing renders outside the window, or in
 * the server's HTML (the pages are built ahead of time, so the date is read in the browser).
 * `?bonuspreview=1` shows it early, marked as a preview. Counted when shown (flow gift, step
 * bonus-notice, variant = `where`).
 */
export default function HolidayBonusNotice({ where, slug, spaName, className = "" }: { where: string; slug?: string; spaName?: string; className?: string }) {
  const [state, setState] = useState<"off" | "on" | "preview">("off");
  useEffect(() => {
    const live = slug ? holidayBonusOpen(slug, "America/Denver") : holidayBonusOn();
    const preview = new URLSearchParams(window.location.search).has("bonuspreview");
    if (!live && !preview) return;
    setState(live ? "on" : "preview");
    if (live) trackStep("gift", "bonus-notice", where);
  }, [slug, where]);
  if (state === "off") return null;
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#113D33] px-5 py-5 text-left text-[#F7F4E9] shadow-[0_14px_34px_-16px_rgba(17,61,51,0.7)] sm:px-7 ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_12%,rgba(226,197,143,0.32),transparent_45%),radial-gradient(circle_at_8%_100%,rgba(226,197,143,0.16),transparent_50%)]"
      />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#E2C58F]">Holiday bonus · {HOLIDAY_BONUS.saleWindowLabel}</p>
        <p className="mt-2 text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
          Give ${HOLIDAY_BONUS.minValue}, get a free {HOLIDAY_BONUS.treatment}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#F7F4E9]/85">
          With each single gift card of ${HOLIDAY_BONUS.minValue} or more bought here online. The bonus is for {spaName ? `${spaName} only` : "the location you buy from"},{" "}
          {HOLIDAY_BONUS.windowLabel}.{" "}
          <Link href="/holiday-gift-cards/#bonus-terms" data-track="gift-bonus-terms" className="underline underline-offset-4">
            Bonus terms
          </Link>
        </p>
        {state === "preview" && <p className="mt-3 text-xs text-[#F7F4E9]/75">Preview only: this offer starts November 26.</p>}
      </div>
    </div>
  );
}
