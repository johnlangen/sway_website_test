"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * Bridge-period booking fork for the Sway Wellness Club locations.
 *
 * The clubs run on Mariana Tek through June 30, 2026 and on Mindbody (our flow)
 * from July 1. Until July 1 we ask the guest WHEN they're visiting:
 *   - June (through the 30th) -> {basePath}/book/june  (the Mariana Tek widget,
 *     on its own page via a FULL page load — the MT loader fails to render on a
 *     client-side mount, so this MUST be a hard navigation, not a router push)
 *   - July 1 or later         -> {basePath}/book-test  (our new Mindbody flow)
 *
 * On/after July 1 (Denver time) the fork collapses and sends everyone to the
 * new flow. Date is anchored to America/Denver so a non-Denver browser can't
 * flip it early/late.
 */
function denverDateISO(): string {
  try {
    return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Denver" }).format(new Date());
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

export function ClubBookingFork({
  basePath,
  clubLabel,
}: {
  basePath: string;
  mtLocationId?: number; // no longer used here; kept for call-site compatibility
  clubLabel: string;
}) {
  const router = useRouter();
  const newFlow = `${basePath}/book-test`;
  const juneFlow = `${basePath}/book/june`;
  const cutoverPassed = useMemo(() => denverDateISO() >= "2026-07-01", []);

  // After July 1: skip the fork entirely, the new flow is the only system.
  useEffect(() => {
    if (cutoverPassed) router.replace(newFlow);
  }, [cutoverPassed, newFlow, router]);

  if (cutoverPassed) {
    return (
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24 text-center text-[#113D33]">
        <p className="opacity-70">Taking you to booking…</p>
      </div>
    );
  }

  return (
    <main className="bg-[#F7F4E9] text-[#113D33] font-vance min-h-screen">
      <section className="px-6 pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs tracking-[0.2em] uppercase opacity-70 mb-2 text-center">
            Sway Wellness Club · {clubLabel}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-center">
            Book Your Visit
          </h1>
          <p className="mt-4 text-base sm:text-lg opacity-80 text-center">
            When are you planning to come in?
          </p>

          <div className="mt-10 grid gap-4">
            {/* July 1+ : new Mindbody flow (our own flow — client nav is fine) */}
            <button
              onClick={() => router.push(newFlow)}
              className="text-left rounded-2xl bg-[#113D33] text-white p-6 hover:bg-[#0d2e26] transition shadow-sm focus:outline-none focus:ring-2 focus:ring-[#113D33]/40"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold">July 1 or later</div>
                  <div className="text-sm text-white/70 mt-1">
                    Reserve your Remedy Lounge session in our new booking experience.
                  </div>
                </div>
                <svg className="w-6 h-6 shrink-0 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            {/* June : Mariana Tek — plain <a> for a FULL page load so the widget renders */}
            <a
              href={juneFlow}
              className="text-left rounded-2xl bg-white border border-[#113D33]/10 p-6 hover:border-[#113D33]/30 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-[#113D33]/30 block"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold">In June (through the 30th)</div>
                  <div className="text-sm opacity-70 mt-1">Book through our current system.</div>
                </div>
                <svg className="w-6 h-6 shrink-0 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>

          <div className="mt-10 border-t border-black/10 pt-6 text-center text-sm opacity-75">
            <Link href={basePath} className="underline underline-offset-4">
              Back to Sway {clubLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
