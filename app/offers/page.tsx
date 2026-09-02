// app/offers/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { ReviewBadge, ClassPassBadge } from "../components/GoogleReviews";
import { SwayCurve } from "../components/SwayCurve";

type SelectedLocation = {
  slug: string;
  name: string;
};

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
    localStorage.setItem("sway_selected_location", JSON.stringify({ slug, name }));
    document.cookie = `sway_loc=${slug}; path=/; max-age=${60 * 60 * 24 * 365}`;
  } catch {}
}

export default function OffersPage() {
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null);
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    try {
      // ?choose (from the in-page "Change location" links) shows the picker
      // instead of bouncing straight back to the saved location.
      const choosing = new URLSearchParams(window.location.search).has("choose");
      const ls = localStorage.getItem("sway_selected_location");
      if (ls) {
        const loc = JSON.parse(ls);
        setSelectedLocation(loc);
        const match = locations.find((l) => l.slug === loc?.slug && l.status === "open");
        if (match && !choosing) {
          window.location.replace(match.href);
          return;
        }
      }
    } catch {}
    setShowPage(true);
  }, []);

  if (!showPage) return <div className="min-h-screen bg-gradient-to-b from-[#0e2b24] via-[#113D33] to-[#0b1f1a]" />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0e2b24] via-[#113D33] to-[#0b1f1a] text-white font-vance">
      {/* Hero */}
      <section className="px-6 pt-28 md:pt-36 pb-4 text-center max-w-4xl mx-auto">
        <p className="text-sm md:text-base uppercase tracking-[0.2em] text-[#9ABFB3] mb-4">
          Sway Wellness Spa
        </p>

        <SwayCurve
          width={150}
          strokeWidth={2.2}
          animate
          className="text-[#A9D2C5] mx-auto block mb-6"
        />

        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Offers & Pricing
        </h1>
        <p className="text-base md:text-lg text-gray-300 max-w-xl mx-auto">
          Offers vary by location. Select your spa to view current promotions
          and limited-time deals.
        </p>

        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <ReviewBadge />
          <span className="hidden sm:block opacity-30">|</span>
          <ClassPassBadge />
        </div>

        <p className="sr-only">
          Sway Wellness Spa offers and pricing across 5 locations: Denver
          Larimer, Denver RiNo, and Central Park (now open), plus Dallas TX and
          Union Market Washington DC (coming soon). At Sway RiNo, local
          first-time guests get their first 75-minute Remedy Lounge session
          for $25 with code FTVORL (any day, locals only, regularly $49), and
          the Remedy Lounge Membership is $129/month for unlimited access at
          both clubs. The Central Park first-visit offer is temporarily
          paused during cold plunge maintenance. Denver Larimer first-visit offers (locals only): code FTVO40
          for $40 off your first massage, facial, or 60-minute Aescape robot
          massage at any tier (Monday through Friday, locals only); code FTVORR
          for $25 first Remedy Room visit (any day, locals only, regularly $49).
          Membership starts at $99/month for
          unlimited massages and facials at member pricing, 50% off boosts, and
          $25 Remedy Room sessions. Sway was voted #4 Best Day Spa in America by
          USA Today 10Best. Book at swaywellnessspa.com or call (303) 476-6150.
        </p>
      </section>

      {/* Location Cards: open locations first, coming-soon de-emphasized below */}
      <section className="px-4 sm:px-6 pt-10 pb-16">
        <p className="text-center text-sm uppercase tracking-[0.15em] text-[#9ABFB3] mb-6">
          Select your location
        </p>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {locations
            .filter((loc) => loc.status === "open")
            .map((loc) => {
              const isSelected = selectedLocation?.slug === loc.slug;

              return (
                <Link
                  key={loc.slug}
                  href={loc.href}
                  onClick={() => saveLocation(loc.slug, loc.name)}
                  className={`group relative bg-white text-[#113D33] rounded-2xl overflow-hidden shadow-xl transition hover:shadow-2xl hover:scale-[1.02] flex flex-col ${
                    isSelected ? "ring-2 ring-[#9ABFB3]" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-40 w-full">
                    <Image
                      src={loc.image}
                      alt={loc.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-block text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold shadow-sm">
                        Now Open
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold mb-1">{loc.name}</h2>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {loc.city}, {loc.state}
                    </p>
                    {loc.address && (
                      <p className="text-xs text-gray-600 mb-4">{loc.address}</p>
                    )}

                    <div className="mt-auto flex items-center justify-center gap-2 w-full rounded-full py-3 px-5 bg-[#113D33] text-white font-semibold text-sm group-hover:bg-[#0a2b23] transition">
                      View Offers
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>

        {/* Coming soon: compact text rows, not full cards */}
        <div className="max-w-4xl mx-auto mt-10">
          <p className="text-center text-xs uppercase tracking-[0.15em] text-[#9ABFB3]/70 mb-4">
            Coming soon
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            {locations
              .filter((loc) => loc.status === "coming-soon")
              .map((loc) => (
                <Link
                  key={loc.slug}
                  href={loc.href}
                  className="group flex items-center justify-between gap-4 bg-white/10 hover:bg-white/15 text-white rounded-2xl px-5 py-4 transition sm:min-w-[260px]"
                >
                  <div>
                    <span className="block font-semibold text-sm">
                      {loc.name}
                    </span>
                    <span className="text-xs text-white/60 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {loc.city}, {loc.state}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition" />
                  <span className="sr-only"> Learn more about {loc.name}</span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Secondary links */}
      <section className="pb-16 px-6 text-center">
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/massages"
            className="text-sm underline underline-offset-4 text-gray-300 hover:text-white transition"
          >
            Browse Massages
          </Link>
          <Link
            href="/facials"
            className="text-sm underline underline-offset-4 text-gray-300 hover:text-white transition"
          >
            Browse Facials
          </Link>
          <Link
            href="/book"
            className="text-sm underline underline-offset-4 text-gray-300 hover:text-white transition"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}
