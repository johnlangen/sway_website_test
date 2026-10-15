
// app/offers/page.tsx
"use client";
import ArrowMark from "@/app/components/ArrowMark";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import FirstVisitOffers, {
  OfferRedemption,
} from "../components/FirstVisitOffers";

const locations = [
  {
    slug: "denver-larimer",
    name: "Sway Larimer",
    city: "Denver",
    state: "CO",
    address: "1428 Larimer St",
    status: "open" as const,
    image: "/assets/homepage_photo_outside.jpg",
    href: "/locations/denver-larimer/offers",
  },
  {
    slug: "denver-rino",
    name: "Sway RiNo",
    city: "Denver",
    state: "CO",
    address: "3636 Blake St",
    status: "open" as const,
    image: "/assets/rino-card.jpg",
    href: "/locations/denver-rino/offers",
  },
  {
    slug: "denver-central-park",
    name: "Sway Central Park",
    city: "Aurora",
    state: "CO",
    address: "2271 Clinton St",
    status: "open" as const,
    image: "/assets/centralpark-card.jpg",
    href: "/locations/denver-central-park/offers",
  },
  {
    slug: "knox-henderson",
    name: "Sway Knox/Henderson",
    city: "Dallas",
    state: "TX",
    status: "coming-soon" as const,
    image: "/assets/SWAY.jpg",
    href: "/locations/knox-henderson",
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

export default function OffersPage() {
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
          <p className="sway-eyebrow">
            Denver · First-visit offers · Locals only
          </p>
          <h1>
            Meet your new
            <br />
            feel-good ritual.
          </h1>
          <p>
            Start with a massage, a facial, or a little recovery. See exactly
            what’s included, choose your location, and make some time for
            yourself.
          </p>
          <nav aria-label="Offers by location" className="sway-anchor-nav">
            <a href="#larimer-offers">
              Larimer Square <span aria-hidden="true"><ArrowMark direction="down" /></span>
            </a>
            <a href="#club-offers">
              RiNo & Central Park <span aria-hidden="true"><ArrowMark direction="down" /></span>
            </a>
          </nav>
        </div>
        <div className="sway-campaign-note">
          <span>
            First visits,
            <br />
            special prices.
          </span>
          <p>
            Recovery from $25.
            <br />
            Massage or facial from $99.
          </p>
          <small>
            Locals only · First-time guests
            <br />
            Larimer massage/facial offers: Monday–Friday
          </small>
        </div>
      </section>

      <section id="larimer-offers" className="sway-offers-section">
        <div className="sway-section-heading">
          <div>
            <p className="sway-eyebrow">The full spa experience</p>
            <h2>Find your Sway at Larimer.</h2>
          </div>
          <p>
            1428 Larimer St · Denver
            <br />
            <Link href="/locations/denver-larimer" className="sway-text-link">
              Explore the spa <span aria-hidden="true"><ArrowMark /></span>
            </Link>
          </p>
        </div>
        <FirstVisitOffers
          onChoose={() => saveLocation("denver-larimer", "Sway Larimer")}
        />
      </section>

      <section
        id="club-offers"
        className="sway-offers-section sway-club-offers"
      >
        <div className="sway-section-heading">
          <div>
            <p className="sway-eyebrow">A different pace of recovery</p>
            <h2>Meet the neighborhood clubs.</h2>
          </div>
          <p>
            Sauna, cold plunge, and room to reset.
            <br />
            75-minute Remedy Lounge sessions.
          </p>
        </div>
        <div className="sway-club-offer-grid">
          {locations
            .filter(
              (loc) =>
                loc.slug === "denver-rino" ||
                loc.slug === "denver-central-park",
            )
            .map((loc) => (
              <article key={loc.slug} className="sway-club-offer">
                <div className="sway-club-offer-image">
                  <Image
                    src={loc.image}
                    alt={loc.name}
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="sway-eyebrow">
                    {loc.address} · {loc.city}
                  </p>
                  <h3>{loc.name}</h3>
                  {loc.slug === "denver-rino" || loc.slug === "denver-central-park" ? (
                    <>
                      <p className="sway-club-price">
                        $25 <span>/ first 75-minute visit</span>
                      </p>
                      <p>
                        {loc.slug === "denver-central-park"
                          ? "Traditional and infrared saunas, cold plunges, a warm soak, and compression therapy. Regularly $49."
                          : "Traditional and infrared saunas, cold plunge, and compression therapy. Regularly $49."}
                      </p>
                      <p className="sway-offer-terms">
                        <strong>
                          Locals only · First-time guests · Any day
                        </strong>
                        <span>Mention FTVORL at check-in.</span>
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="sway-club-price">
                        $49 <span>/ drop-in session</span>
                      </p>
                      <p>
                        The first-visit offer is temporarily paused during
                        maintenance. Review the current amenity notice before
                        booking.
                      </p>
                      <p className="sway-offer-terms">
                        <strong>First-visit offer temporarily paused</strong>
                        <span>
                          Current availability is detailed on the club’s offers
                          page.
                        </span>
                      </p>
                    </>
                  )}
                  <Link
                    className="sway-button"
                    href={loc.href}
                    onClick={() => saveLocation(loc.slug, loc.name)}
                  >
                    Explore{" "}
                    {loc.slug === "denver-rino"
                      ? "RiNo’s offer"
                      : "Central Park pricing"}
                    <span aria-hidden="true"><ArrowMark /></span>
                  </Link>
                </div>
              </article>
            ))}
        </div>
      </section>
      <OfferRedemption />
      <section className="sway-offer-close">
        <p className="sway-eyebrow">Good things are growing</p>
        <h2>Your next neighborhood ritual.</h2>
        <p>Explore what’s coming to Dallas and Washington, DC.</p>
        <div>
          <Link href="/locations/knox-henderson" className="sway-text-link">
            Knox / Henderson
          </Link>
          <Link href="/locations/union-market" className="sway-text-link">
            Union Market
          </Link>
        </div>
      </section>
    </div>
  );
}
