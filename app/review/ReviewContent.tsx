"use client";

/**
 * /review — the QR-code landing page for Google reviews.
 *
 * One printed QR code is shared across all three corporate Sways, so the
 * code points here and the guest picks the location. Each card links
 * straight into Google's write-a-review dialog for that Place ID, so it is
 * two taps from scan to typing a review.
 *
 * NOT a review gate: every guest sees the same three buttons regardless of
 * how their visit went. Filtering by rating before showing the Google link
 * violates Google's review policies.
 *
 * ?loc=<slug> skips the picker and goes straight to Google, so per-location
 * QR codes can be printed later without needing a second landing page.
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SwayCurve } from "@/app/components/SwayCurve";
import { LOCATION_NAMES } from "@/lib/locationNames";

type ReviewLocation = {
  slug: string;
  name: string;
  address: string;
  /** Verified against the Google Places API on 2026-09-01. */
  placeId: string;
  image: string;
  aliases: string[];
};

const LOCATIONS: ReviewLocation[] = [
  {
    slug: "denver-larimer",
    name: LOCATION_NAMES["denver-larimer"],
    address: "1428 Larimer St, Denver",
    placeId: "ChIJtRQkUu55bIcR91jycB7Jcns",
    image: "/assets/larimer-outside.jpg",
    aliases: ["larimer"],
  },
  {
    slug: "denver-rino",
    name: LOCATION_NAMES["denver-rino"],
    address: "3636 Blake St, Denver",
    placeId: "ChIJSYpObGF5bIcRFVlb08RlL8I",
    image: "/assets/rino-card.jpg",
    aliases: ["rino"],
  },
  {
    slug: "denver-central-park",
    name: LOCATION_NAMES["denver-central-park"],
    address: "2271 Clinton St, Aurora",
    placeId: "ChIJw3MZ6UZ9bIcRmE9mIeK__KU",
    image: "/assets/centralpark-card.jpg",
    aliases: ["central-park", "centralpark", "cp"],
  },
];

/** Google's direct write-a-review dialog. Opens in the Maps app on mobile. */
function reviewUrl(placeId: string) {
  return `https://search.google.com/local/writereview?placeid=${placeId}`;
}

function trackClick(slug: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "review_location_click", review_location: slug });
}

export default function ReviewContent() {
  // Set only when ?loc= matched, so the picker stays visible on a plain visit.
  const [redirecting, setRedirecting] = useState<ReviewLocation | null>(null);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search)
      .get("loc")
      ?.trim()
      .toLowerCase();
    if (!param) return;

    const match = LOCATIONS.find(
      (l) => l.slug === param || l.aliases.includes(param)
    );
    if (!match) return; // unknown value falls through to the picker

    setRedirecting(match);
    trackClick(match.slug);
    window.location.replace(reviewUrl(match.placeId));
  }, []);

  return (
    // pt clears the fixed 56px NavBar (same pattern as /offers).
    <main className="min-h-screen bg-[#F7F4E9] text-[#113D33] px-5 pt-28 pb-12 sm:pt-32 sm:pb-16">
      <div className="max-w-xl mx-auto">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <Image
              src="/assets/swaylogogreen.svg"
              alt="Sway Wellness Spa"
              width={110}
              height={38}
              className="mx-auto h-auto w-[110px]"
              priority
            />
          </Link>

          <div className="flex justify-center mt-6 text-[#113D33]/40">
            <SwayCurve width={80} />
          </div>

          <h1 className="mt-5 text-3xl sm:text-4xl font-vance font-semibold tracking-tight">
            Thank you for visiting Sway
          </h1>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-[#113D33]/75">
            {redirecting
              ? `Taking you to Google for ${redirecting.name}.`
              : "Choose the location you visited and we will take you straight to Google. It takes about 30 seconds."}
          </p>
        </div>

        <div className="mt-9 space-y-4">
          {LOCATIONS.map((loc) => (
            <a
              key={loc.slug}
              href={reviewUrl(loc.placeId)}
              onClick={() => trackClick(loc.slug)}
              aria-label={`Leave a Google review for ${loc.name} at ${loc.address}`}
              className="group flex items-center gap-4 rounded-3xl bg-white p-3 pr-5 shadow-[0_2px_18px_rgba(17,61,51,0.08)] transition hover:shadow-[0_4px_24px_rgba(17,61,51,0.14)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#113D33] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F4E9]"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#113D33]/5">
                <Image
                  src={loc.image}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-vance font-semibold tracking-tight text-lg leading-tight">
                  {loc.name}
                </p>
                <p className="mt-0.5 text-sm text-[#113D33]/65 truncate">
                  {loc.address}
                </p>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#113D33]">
                  Review on Google
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    &rarr;
                  </span>
                </p>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-8 text-center text-sm leading-relaxed text-[#113D33]/55">
          Reviews open in Google and may ask you to sign in to your Google
          account. Not the right spot?{" "}
          <Link href="/locations/" className="underline hover:no-underline">
            See all Sway locations
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
