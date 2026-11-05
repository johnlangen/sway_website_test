"use client";

import "leaflet/dist/leaflet.css";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import ArrowMark from "@/app/components/ArrowMark";
import { CLUB_FOUNDING } from "@/lib/clubFounding";
import { CLUB_PAGES, getClubStatus } from "@/lib/clubLocationPages";
import type { ClubLocationKey } from "@/lib/clubLocations";
import { getOpenStatus } from "@/lib/larimerHours";
import { LOCATION_NAMES } from "@/lib/locationNames";

/**
 * Find your Sway. The real question here is which Sway has what you want, so "What are you looking for?"
 * filters the list and flies the map to match. Rows show live open or closed status, and distance once
 * a guest shares their location. Rows are real links, which is also what search engines crawl.
 */

// Leaflet needs the browser, so the map loads client-only
const LocationsMap = dynamic(() => import("./LocationsMap"), { ssr: false });

export type Location = {
  slug: string;
  name: string;
  city: string;
  state: string;
  status: "open" | "coming-soon";
  coords: [number, number];
  address?: string;
  phone?: string;
  hours?: string[];
  mindbody?: { siteId?: string };
  imageUrl?: string;
};

const LOCATIONS: Location[] = [
  {
    slug: "denver-larimer",
    name: LOCATION_NAMES["denver-larimer"],
    city: "Denver",
    state: "CO",
    status: "open",
    coords: [39.74794, -104.99844],
    address: "1428 Larimer St, Denver, CO 80202",
    phone: "+1 303-476-6150",
    hours: [
      "Mon–Fri: 10:00 AM – 8:00 PM",
      "Sat: 9:00 AM – 6:00 PM",
      "Sun: 11:00 AM – 6:00 PM",
    ],
    mindbody: { siteId: "DENVER_SITE_ID" },
    imageUrl: "/assets/homepage_photo_outside.jpg",
  },
  {
    slug: "denver-rino",
    name: LOCATION_NAMES["denver-rino"],
    city: "Denver",
    state: "CO",
    status: "open",
    coords: [39.7665, -104.9839],
    address: "3636 Blake St, Denver, CO 80205",
    phone: "+1 303-225-0480",
    imageUrl: "/assets/rino-card.jpg",
  },
  {
    slug: "denver-central-park",
    name: LOCATION_NAMES["denver-central-park"],
    city: "Aurora",
    state: "CO",
    status: "open",
    coords: [39.7494, -104.8688],
    address: "2271 Clinton St, Aurora, CO 80010",
    phone: "+1 303-293-5501",
    imageUrl: "/assets/centralpark-card.jpg",
  },
  {
    slug: "knox-henderson",
    name: LOCATION_NAMES["knox-henderson"],
    city: "Dallas",
    state: "TX",
    status: "coming-soon",
    coords: [32.8008, -96.7847],
    address: "2323 Henderson Ave, Dallas, TX",
    imageUrl: "/assets/SWAY.jpg",
  },
  {
    slug: "union-market",
    name: LOCATION_NAMES["union-market"],
    city: "Washington",
    state: "DC",
    status: "coming-soon",
    coords: [38.9072, -77.0723],
    imageUrl: "/assets/SWAY.jpg",
  },
];

type Service = "all" | "massage" | "facials" | "recovery" | "aescape";

const SERVICES: { id: Service; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "massage", label: "Massage" },
  { id: "facials", label: "Facials" },
  { id: "recovery", label: "Sauna + cold plunge" },
  { id: "aescape", label: "Aescape" },
];

const isClub = (slug: string): slug is ClubLocationKey => slug === "denver-rino" || slug === "denver-central-park";

/** What a location has for this service, or null if it doesn't offer it. */
function offering(slug: string, service: Service): { note: string; action: string; href: string } | null {
  const base = `/locations/${slug}`;
  if (isClub(slug)) {
    const { opensLabel } = CLUB_FOUNDING[slug];
    const recovery = CLUB_PAGES[slug].hasWarmSoak
      ? "Saunas, cold plunges, a warm soak, compression and PEMF"
      : "Saunas, cold plunge, compression and PEMF";
    switch (service) {
      case "all":
        return { note: `Remedy Lounge. Massage and facials start ${opensLabel}.`, action: "Book", href: `${base}/book` };
      case "massage":
        return { note: `Massage starts ${opensLabel}.`, action: "Founding rates", href: `${base}/founding-membership` };
      case "facials":
        return { note: `Facials start ${opensLabel}.`, action: "Founding rates", href: `${base}/founding-membership` };
      case "recovery":
        return { note: `Remedy Lounge. ${recovery}.`, action: "Book", href: `${base}/book-remedy-lounge` };
      default:
        return null;
    }
  }
  switch (service) {
    case "all":
      return { note: "Massage, facials, Remedy Room and Aescape.", action: "Book", href: `${base}/book` };
    case "massage":
      return { note: "Massage, 50 to 90 minutes.", action: "Book", href: `${base}/book/?category=massage` };
    case "facials":
      return { note: "Facials, 50 to 60 minutes.", action: "Book", href: `${base}/book/?category=facial` };
    case "recovery":
      return { note: "Remedy Room. Sauna, cold plunge, compression and LED.", action: "Book", href: `${base}/book-remedy-room` };
    case "aescape":
      return { note: "Aescape robot massage, 15 to 60 minutes.", action: "Book", href: `${base}/book-aescape` };
  }
}

// --- Filter helper ---
function filterLocations(q: string, list: Location[]) {
  const s = q.trim().toLowerCase();
  if (!s) return list;
  return list.filter((l) =>
    [l.name, l.city, l.state, l.address]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(s)
  );
}

// --- Distance helper ---
function distanceKm(a: [number, number], b: [number, number]) {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const aa =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
  return R * c;
}

function saveLocation(loc: Location) {
  try {
    localStorage.setItem("sway_selected_location", JSON.stringify(loc));
    document.cookie = `sway_loc=${loc.slug}; path=/; max-age=${60 * 60 * 24 * 365}`;
  } catch (e) {
    console.error("Error saving location to storage", e);
  }
}

export default function LocationsContent() {
  const [query, setQuery] = useState("");
  const [service, setService] = useState<Service>("all");
  const [userCenter, setUserCenter] = useState<[number, number] | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState(false);
  // The row being hovered or focused: its pin stands out on the map
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, { open: boolean; label: string }>>({});

  useEffect(() => {
    setStatuses({
      "denver-larimer": getOpenStatus(),
      "denver-rino": getClubStatus(CLUB_PAGES["denver-rino"].week),
      "denver-central-park": getClubStatus(CLUB_PAGES["denver-central-park"].week),
    });
  }, []);

  const searched = useMemo(() => filterLocations(query, LOCATIONS), [query]);

  const openLocs = useMemo(() => {
    const list = searched.filter((l) => l.status === "open" && offering(l.slug, service));
    if (!userCenter) return list;
    return [...list].sort((a, b) => distanceKm(userCenter, a.coords) - distanceKm(userCenter, b.coords));
  }, [searched, service, userCenter]);

  const comingSoon = useMemo(() => searched.filter((l) => l.status === "coming-soon"), [searched]);

  // Picking a service narrows the map to what's open for it
  const mapLocations = useMemo(
    () => (service === "all" ? [...openLocs, ...comingSoon] : openLocs),
    [service, openLocs, comingSoon],
  );

  // Used by the map's popups
  const goToLocation = (loc: Location) => {
    setSelectedSlug(loc.slug);
    saveLocation(loc);
    window.location.href = `/locations/${loc.slug}`;
  };

  const useMyLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setLocationError(true);
      return;
    }
    setLocating(true);
    setLocationError(false);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const me: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserCenter(me);
        let best = LOCATIONS[0];
        let bestD = Infinity;
        for (const loc of LOCATIONS) {
          const d = distanceKm(me, loc.coords);
          if (d < bestD) {
            best = loc;
            bestD = d;
          }
        }
        setSelectedSlug(best.slug);
        setLocating(false);
      },
      () => {
        setLocating(false);
        setLocationError(true);
      },
    );
  };

  const resultCount = openLocs.length;

  return (
    <div className="club-founding min-h-screen bg-[#F7F4E9] text-[#113D33]">
      <div className="grid md:grid-cols-[minmax(0,1fr)_min(46vw,920px)] md:grid-rows-[auto_1fr]">
        {/* Heading and the finder */}
        <header className="sway-page-hero px-6 pb-4 pt-24 md:col-start-1 md:row-start-1 md:pb-7 md:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] md:pr-12 md:pt-32">
          <div className="hero-rise">
            <p className="sway-eyebrow text-[#4A776D]">A little closer to feeling good</p>
            <h1 className="mt-3 md:mt-5">Find your Sway.</h1>
            <p className="mt-3 max-w-xl text-[15px] leading-snug text-[#113D33]/85 md:text-base md:leading-normal">
              Explore Sway Wellness Spa locations across the U.S., with three Denver locations open now in Larimer Square, RiNo, and Central Park, and more cities coming soon.
            </p>
            <div className="mt-5 flex gap-2 md:mt-7">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by city or ZIP"
                aria-label="Search locations by city or ZIP"
                className="min-h-[52px] w-full min-w-0 rounded-[2px] border border-[#113D33]/30 bg-white px-4 text-base placeholder:text-[#113D33]/70 focus:border-[#113D33] focus:outline-none"
              />
              <button type="button" onClick={useMyLocation} className="sway-button shrink-0 !gap-0 whitespace-nowrap !px-4 md:!px-6">
                {locating ? "Finding you..." : "Near me"}
              </button>
            </div>
            {locationError && (
              <p role="alert" className="mt-2 text-sm">We couldn&apos;t get your location. Try searching by city instead.</p>
            )}

            <fieldset className="mt-5 md:mt-7">
              <legend className="cf-label text-base md:text-lg">What are you looking for?</legend>
              {/* One swipeable row on phones, so the map stays close to the top */}
              <div className="-mx-6 mt-2 flex gap-1.5 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:gap-2 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={service === s.id}
                    onClick={() => setService(s.id)}
                    className={`min-h-11 shrink-0 whitespace-nowrap rounded-[3px] border px-3 py-2 text-sm transition md:px-4 md:text-[15px] ${
                      service === s.id ? "border-[#113D33] bg-[#113D33] font-semibold text-white" : "border-[#113D33]/35 hover:border-[#113D33]"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        </header>

        {/* The map stays with you while the list scrolls */}
        <div className="location-map relative h-[300px] sm:h-[360px] md:sticky md:top-[72px] md:col-start-2 md:row-span-2 md:row-start-1 md:mt-[72px] md:h-[calc(100vh-72px)]">
          <LocationsMap
            locations={mapLocations}
            activeSlug={activeSlug}
            userCenter={userCenter}
            nearest={LOCATIONS.find((l) => l.slug === selectedSlug) ?? null}
            onOpen={goToLocation}
          />
        </div>

        {/* Open now */}
        <section className="px-6 pb-12 pt-5 md:col-start-1 md:row-start-2 md:pb-20 md:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] md:pr-12 md:pt-2">
          <h2 className="sway-eyebrow !font-normal text-[#4A776D]">Open now</h2>
          <p className="sr-only" aria-live="polite">
            {resultCount} {resultCount === 1 ? "location" : "locations"} shown
          </p>
          <ul className="mt-3">
            {openLocs.map((loc) => {
              const offer = offering(loc.slug, service);
              if (!offer) return null;
              const status = statuses[loc.slug];
              const miles = userCenter ? Math.round(distanceKm(userCenter, loc.coords) * 0.621371) : null;
              const isClosest = selectedSlug === loc.slug && !!userCenter;
              return (
                <li
                  key={loc.slug}
                  onMouseEnter={() => setActiveSlug(loc.slug)}
                  onMouseLeave={() => setActiveSlug(null)}
                  onFocus={() => setActiveSlug(loc.slug)}
                  onBlur={() => setActiveSlug(null)}
                  className="group relative grid grid-cols-[88px_minmax(0,1fr)] gap-x-4 border-t border-[#113D33]/20 py-4 last:border-b sm:grid-cols-[136px_minmax(0,1fr)] md:gap-x-6 md:py-5"
                >
                  <div className="relative h-[88px] overflow-hidden rounded-[2px] sm:h-[120px]">
                    {loc.imageUrl && (
                      <Image
                        src={loc.imageUrl}
                        alt=""
                        fill
                        sizes="136px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="cf-title text-[26px] leading-[1.1] md:text-[34px]">
                      <a
                        href={`/locations/${loc.slug}`}
                        onClick={() => saveLocation(loc)}
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {loc.name}
                      </a>
                    </h3>
                    <p className="mt-1 flex min-h-5 flex-wrap items-center gap-x-2 text-[13px] md:text-sm">
                      {status && (
                        <>
                          <span
                            aria-hidden="true"
                            className={`inline-block h-2 w-2 rounded-full ${status.open ? "bg-[#D9822B] shadow-[0_0_8px_2px_rgba(217,130,43,0.55)]" : "bg-[#113D33]/35"}`}
                          />
                          <span>{status.label}</span>
                        </>
                      )}
                      {miles !== null && (
                        <span className="font-semibold">
                          {status && <span aria-hidden="true">· </span>}
                          {miles.toLocaleString()} mi{isClosest ? ", closest to you" : ""}
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-[15px] leading-snug text-[#113D33]/85">{offer.note}</p>
                    <p className="mt-0.5 text-[13px] text-[#113D33]/80 md:text-sm">{loc.address}</p>
                    <a
                      href={offer.href}
                      onClick={() => saveLocation(loc)}
                      className="relative z-10 mt-2 inline-flex min-h-11 items-center rounded-[3px] border border-[#113D33]/35 bg-[#F7F4E9] px-4 text-sm font-semibold transition hover:border-[#113D33] md:min-h-10"
                    >
                      {offer.action}
                      <span className="sr-only"> at {loc.name}</span>
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
          {openLocs.length === 0 && (
            <p className="mt-3 text-[15px]">
              {query.trim() ? "No open locations match your search." : "No locations match that yet."}
            </p>
          )}
        </section>
      </div>

      {/* Coming next: the page closes on what's ahead */}
      {comingSoon.length > 0 && (
        <section className="bg-[#113D33] py-12 text-white md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <p className="sway-eyebrow text-[#D7E5DD]">Coming soon</p>
            <h2 className="mt-3 text-[38px] leading-[1.05] md:mt-4 md:text-7xl">Sway is on the way.</h2>
            <ul className="mt-6 md:mt-12">
              {comingSoon.map((loc) => (
                <li key={loc.slug} className="border-t border-white/25 last:border-b">
                  <a
                    href={`/locations/${loc.slug}`}
                    onClick={() => saveLocation(loc)}
                    className="group flex min-h-[84px] items-center justify-between gap-4 py-4 md:min-h-[120px]"
                  >
                    <span className="min-w-0">
                      <span className="cf-title block text-[30px] leading-[1.05] md:text-6xl">
                        {loc.name}
                      </span>
                      <span className="mt-1 block text-sm text-white/85 md:mt-2 md:text-base">
                        {loc.state === "DC" ? "Washington, D.C." : `${loc.city}, ${loc.state}`}
                      </span>
                    </span>
                    <span aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-1.5 motion-reduce:transition-none"><ArrowMark /></span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[15px] text-white/85 md:mt-8 md:text-base">
              Want a Sway in your city?{" "}
              <a href="/own" className="underline underline-offset-4">Own a Sway</a>
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
