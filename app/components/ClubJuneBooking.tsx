"use client";

import Link from "next/link";
import { MarianaBookingWidget } from "./MarianaBookingWidget";

/**
 * June (pre-July-1) booking for the clubs: the Mariana Tek widget on its own
 * page so it renders on a FULL page load. The MT loader silently fails to
 * render when mounted via client-side navigation/state toggle, so the fork
 * (ClubBookingFork) hard-navigates here with a plain <a>, giving the widget a
 * clean page load — same as the original /book page that worked.
 */
export function ClubJuneBooking({
  basePath,
  mtLocationId,
  clubLabel,
}: {
  basePath: string;
  mtLocationId: number;
  clubLabel: string;
}) {
  return (
    <main className="bg-[#F7F4E9] text-[#113D33] font-vance min-h-screen">
      <section className="px-6 pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs tracking-[0.2em] uppercase opacity-70 mb-2 text-center">
            Sway Wellness Club · {clubLabel}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-center">
            Book Your June Visit
          </h1>

          <div className="mt-6 rounded-2xl bg-[#113D33] text-white p-5 sm:p-6 text-sm sm:text-base leading-relaxed text-center">
            Booking a June visit. From July 1, use the new experience for July
            dates and beyond.
          </div>

          <div className="mt-4">
            <Link href={`${basePath}/book`} className="text-sm underline underline-offset-4 opacity-70 hover:opacity-100">
              ← Back
            </Link>
          </div>

          {/* MT widget — renders because this is a full page load */}
          <div className="mt-6">
            <MarianaBookingWidget locationId={mtLocationId} />
          </div>

          <div className="mt-8 border-t border-black/10 pt-6 text-center text-sm opacity-75">
            <Link href={basePath} className="underline underline-offset-4">
              Back to Sway {clubLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
