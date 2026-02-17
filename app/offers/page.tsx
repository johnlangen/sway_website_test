// app/offers/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";

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
    slug: "dallas",
    name: "Sway Dallas",
    city: "Dallas",
    state: "TX",
    status: "coming-soon" as const,
    image: "/assets/SWAY.jpg",
    href: "/locations/dallas/offers",
  },
  {
    slug: "georgetown",
    name: "Sway Georgetown",
    city: "Washington",
    state: "DC",
    status: "coming-soon" as const,
    image: "/assets/SWAY.jpg",
    href: "/locations/georgetown/offers",
  },
];

export default function OffersPage() {
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null);

  useEffect(() => {
    try {
      const ls = localStorage.getItem("sway_selected_location");
      if (ls) {
        setSelectedLocation(JSON.parse(ls));
      }
    } catch {}
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0e2b24] via-[#113D33] to-[#0b1f1a] text-white font-vance">
      {/* Hero */}
      <section className="px-6 pt-28 md:pt-36 pb-4 text-center max-w-4xl mx-auto">
        <p className="text-sm md:text-base uppercase tracking-[0.2em] text-[#9ABFB3] mb-4">
          Sway Wellness Spa
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Offers & Pricing
        </h1>
        <p className="text-base md:text-lg text-gray-300 max-w-xl mx-auto">
          Offers vary by location. Select your spa to view current promotions
          and limited-time deals.
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
                  <h3 className="text-xl font-bold mb-1">{loc.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {loc.city}, {loc.state}
                  </p>
                  {loc.address && (
                    <p className="text-xs text-gray-400 mb-4">{loc.address}</p>
                  )}

                  <div className="mt-auto flex items-center justify-center gap-2 w-full rounded-full py-3 px-5 bg-[#113D33] text-white font-semibold text-sm group-hover:bg-[#0a2b23] transition">
                    View Offers
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ) : (
              <div
                key={loc.slug}
                className="relative bg-white/60 text-[#113D33] rounded-2xl overflow-hidden shadow-md flex flex-col opacity-70"
              >
                {/* Image */}
                <div className="relative h-40 w-full">
                  <Image
                    src={loc.image}
                    alt={loc.name}
                    fill
                    className="object-cover grayscale"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block text-xs px-3 py-1 rounded-full bg-gray-200 text-gray-600 font-semibold shadow-sm">
                      Coming Soon
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-1">{loc.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {loc.city}, {loc.state}
                  </p>
                </div>
              </div>
            );
          })}
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
    </main>
  );
}
