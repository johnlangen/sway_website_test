// app/gift-cards/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    href: "/locations/denver-larimer/gift-cards",
  },
  {
    slug: "denver-rino",
    name: "Sway RiNo",
    city: "Denver",
    state: "CO",
    address: "3636 Blake St",
    status: "open" as const,
    image: "/assets/rino-card.jpg",
    href: "/locations/denver-rino/gift-cards",
  },
  {
    slug: "denver-central-park",
    name: "Sway Central Park",
    city: "Aurora",
    state: "CO",
    address: "2271 Clinton St",
    status: "open" as const,
    image: "/assets/centralpark-card.jpg",
    href: "/locations/denver-central-park/gift-cards",
  },
  {
    slug: "dallas",
    name: "Sway Dallas",
    city: "Dallas",
    state: "TX",
    status: "coming-soon" as const,
    image: "/assets/SWAY.jpg",
    href: "/locations/dallas",
  },
  {
    slug: "georgetown",
    name: "Sway Georgetown",
    city: "Washington",
    state: "DC",
    status: "coming-soon" as const,
    image: "/assets/SWAY.jpg",
    href: "/locations/georgetown",
  },
];

function saveLocation(slug: string, name: string) {
  try {
    localStorage.setItem("sway_selected_location", JSON.stringify({ slug, name }));
    document.cookie = `sway_loc=${slug}; path=/; max-age=${60 * 60 * 24 * 365}`;
  } catch {}
}

export default function GiftCardsHubPage() {
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null);
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    try {
      const ls = localStorage.getItem("sway_selected_location");
      if (ls) {
        const loc = JSON.parse(ls);
        setSelectedLocation(loc);
        const match = locations.find((l) => l.slug === loc?.slug && l.status === "open");
        if (match) {
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
          Gift Cards
        </h1>
        <p className="text-base md:text-lg text-gray-300 max-w-xl mx-auto">
          Give the ultimate wellness gift. Select your location to purchase a
          Sway gift card online.
        </p>

        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <ReviewBadge />
          <span className="hidden sm:block opacity-30">|</span>
          <ClassPassBadge />
        </div>

        <p className="sr-only">
          Sway Wellness Spa gift cards are available in any dollar amount with
          instant digital delivery via email. Redeemable for all services:
          massages, facials, Remedy Room recovery circuit, Aescape AI robot
          massage, boost add-ons, and retail products. Gift cards never expire
          and have no dormancy fees. Available at 5 locations: Denver Larimer,
          Denver RiNo, and Central Park Aurora CO (all now open), plus Dallas
          TX and Georgetown Washington DC (coming soon). Sway was voted #4 Best
          Day Spa in America by USA Today 10Best. Purchase online at
          swaywellnessspa.com/gift-cards.
        </p>
      </section>

      {/* Location Cards */}
      <section className="px-4 sm:px-6 pt-10 pb-16">
        <p className="text-center text-sm uppercase tracking-[0.15em] text-[#9ABFB3] mb-6">
          Select your location
        </p>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {locations.map((loc) => {
            const isOpen = loc.status === "open";
            const isSelected = selectedLocation?.slug === loc.slug;

            return isOpen ? (
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
                    Purchase Gift Card
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ) : (
              <Link
                key={loc.slug}
                href={loc.href}
                onClick={() => saveLocation(loc.slug, loc.name)}
                className={`group relative bg-white/80 text-[#113D33] rounded-2xl overflow-hidden shadow-md transition hover:shadow-xl hover:scale-[1.02] flex flex-col ${
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
                    <span className="inline-block text-xs px-3 py-1 rounded-full bg-gray-200 text-gray-600 font-semibold shadow-sm">
                      Coming Soon
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold mb-1">{loc.name}</h2>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                    <MapPin className="w-3.5 h-3.5" />
                    {loc.city}, {loc.state}
                  </p>

                  <div className="mt-auto flex items-center justify-center gap-2 w-full rounded-full py-3 px-5 bg-[#113D33]/80 text-white font-semibold text-sm group-hover:bg-[#113D33] transition">
                    Learn More<span className="sr-only"> about {loc.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Secondary links */}
      <section className="pb-16 px-6 text-center">
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/membership"
            className="text-sm underline underline-offset-4 text-gray-300 hover:text-white transition"
          >
            Explore Membership
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
