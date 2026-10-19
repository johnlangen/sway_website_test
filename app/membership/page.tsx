// app/membership/page.tsx
"use client";
import ArrowMark from "@/app/components/ArrowMark";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

const locations = [
  {
    slug: "denver-larimer",
    name: "Sway Larimer",
    city: "Denver",
    state: "CO",
    address: "1428 Larimer St",
    status: "open" as const,
    image: "/assets/homepage_photo_outside.jpg",
    href: "/locations/denver-larimer/membership",
  },
  {
    slug: "denver-rino",
    name: "Sway RiNo",
    city: "Denver",
    state: "CO",
    address: "3636 Blake St",
    status: "open" as const,
    image: "/assets/rino1.jpeg",
    href: "/locations/denver-rino/membership",
  },
  {
    slug: "denver-central-park",
    name: "Sway Central Park",
    city: "Aurora",
    state: "CO",
    address: "2271 Clinton St",
    status: "open" as const,
    image: "/assets/centralpark1.jpg",
    href: "/locations/denver-central-park/membership",
  },
  {
    slug: "knox-henderson",
    name: "Sway Knox/Henderson",
    city: "Dallas",
    state: "TX",
    status: "coming-soon" as const,
    image: "/assets/SWAY.jpg",
    href: "/locations/knox-henderson/founding-membership",
  },
  {
    slug: "union-market",
    name: "Sway Union Market",
    city: "Washington",
    state: "DC",
    status: "coming-soon" as const,
    image: "/assets/SWAY.jpg",
    href: "/locations/union-market",
  },
];

function saveLocation(slug: string, name: string) {
  try {
    localStorage.setItem(
      "sway_selected_location",
      JSON.stringify({ slug, name }),
    );
    document.cookie = `sway_loc=${slug}; path=/; max-age=${60 * 60 * 24 * 365}`;
  } catch {}
}

export default function MembershipHubPage() {
  useEffect(() => {
    try {
      // ?choose (from the in-page "Change location" links) shows the picker
      // instead of bouncing straight back to the saved location.
      const choosing = new URLSearchParams(window.location.search).has(
        "choose",
      );
      const ls = localStorage.getItem("sway_selected_location");
      if (ls) {
        const loc = JSON.parse(ls);
        // Backfill the cookie so middleware.ts redirects server-side next
        // time (no picker flash) for visitors who only have localStorage.
        if (loc?.slug) document.cookie = `sway_loc=${loc.slug}; path=/; max-age=${60 * 60 * 24 * 365}`;
        const match = locations.find(
          (l) => l.slug === loc?.slug && l.status === "open",
        );
        if (match && !choosing) {
          window.location.replace(match.href);
          return;
        }
      }
    } catch {}
  }, []);

  return (
    <div className="sway-offers-page">
      <section className="sway-campaign-intro">
        <div>
          <p className="sway-eyebrow">Sway memberships</p>
          <h1>
            Good for you.
            <br />
            More often.
          </h1>
          <p>
            A monthly treatment to look forward to, or recovery woven into your
            week. Find the membership that fits your ritual.
          </p>
          <a href="#membership-options" className="sway-text-link">
            Compare the experiences
          </a>
        </div>
        <div className="sway-campaign-photo">
          <Image
            src="/assets/membership_background_logo.jpg"
            alt="A quiet place to unwind in Sway’s member lounge"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 45vw"
            className="object-cover"
          />
        </div>
      </section>
      <section className="sway-offers-section" id="membership-options">
        <div className="sway-membership-option">
          <div className="sway-membership-option-image">
            <Image
              src="/assets/homepage-massage.jpg"
              alt="Massage at Sway Larimer"
              fill
              sizes="(max-width: 760px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="sway-membership-option-copy">
            <p className="sway-eyebrow">Larimer Square · The spa ritual</p>
            <h2>
              Your monthly
              <br />
              moment of care.
            </h2>
            <p className="sway-membership-price">
              From $99 <span>/ month</span>
            </p>
            <p>
              Massage and facial memberships include one treatment each month,
              plus member pricing on additional visits. Choose Essential,
              Premier, or Ultimate to match your preferred treatments.
            </p>
            <ul>
              <li>One monthly massage or facial from your tier</li>
              <li>50% off boosts and $25 Remedy Room visits</li>
              <li>Rollover credits and private member lounge access</li>
            </ul>
            <p>
              Prefer technology or recovery? Larimer also offers dedicated
              Aescape and Remedy Room memberships.
            </p>
            <Link
              href="/locations/denver-larimer/membership"
              onClick={() => saveLocation("denver-larimer", "Sway Larimer")}
              className="sway-button"
            >
              Explore Larimer memberships{" "}
              <span aria-hidden="true">
                <ArrowMark />
              </span>
            </Link>
          </div>
        </div>
        <div className="sway-membership-option sway-membership-option-reverse">
          <div className="sway-membership-option-image">
            <Image
              src="/assets/rino1.jpeg"
              alt="Cold plunge and recovery space at Sway RiNo"
              fill
              sizes="(max-width: 760px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="sway-membership-option-copy">
            <p className="sway-eyebrow">
              RiNo & Central Park · The recovery ritual
            </p>
            <h2>
              A reset you can
              <br />
              return to daily.
            </h2>
            <p className="sway-membership-price">
              $129 <span>/ month</span>
            </p>
            <p>
              Make the Remedy Lounge part of your routine. Traditional and
              infrared saunas, cold plunge, compression therapy, and space to
              slow down.
            </p>
            <ul>
              <li>Unlimited visits, one 75-minute session per day</li>
              <li>Month-to-month with no enrollment fee</li>
              <li>Freeze up to 3 months per calendar year</li>
            </ul>
            <p>
              Massage and facial services are coming soon at the clubs.
            </p>
            <div className="sway-membership-location-links">
              {locations
                .filter(
                  (l) =>
                    l.slug === "denver-rino" ||
                    l.slug === "denver-central-park",
                )
                .map((loc) => (
                  <Link
                    key={loc.slug}
                    href={loc.href}
                    onClick={() => saveLocation(loc.slug, loc.name)}
                    className="sway-button"
                  >
                    Explore {loc.name.replace("Sway ", "")}{" "}
                    <span aria-hidden="true">
                      <ArrowMark />
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
      <section className="sway-offer-close">
        <p className="sway-eyebrow">A new Sway is on the way</p>
        <h2>Find your future ritual.</h2>
        <div>
          {locations
            .filter((l) => l.status === "coming-soon")
            .map((loc) => (
              <Link
                key={loc.slug}
                href={loc.href}
                onClick={() => saveLocation(loc.slug, loc.name)}
                className="sway-text-link"
              >
                {loc.name} <ArrowMark />
              </Link>
            ))}
        </div>
        <p className="mt-8 text-sm">
          Prefer to try a session first?{" "}
          <Link href="/offers?choose=1" className="underline">
            Explore first-visit offers.
          </Link>
        </p>
      </section>
    </div>
  );
}
