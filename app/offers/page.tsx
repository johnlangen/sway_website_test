// app/offers/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type SelectedLocation = {
  slug: string;
  name: string;
};

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
    <main className="min-h-screen bg-[#F7F4E9] text-[#113D33] font-vance px-6 pt-28 pb-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Spa Offers & Deals
        </h1>

        <p className="mb-8 text-[#0e2b24]">
          Offers vary by location. Select your spa to view current promotions and
          limited-time deals.
        </p>

        {/* Selected location shortcut */}
        {selectedLocation && (
          <div className="mb-10 rounded-2xl bg-white shadow-sm p-6">
            <p className="mb-3 text-sm text-gray-700">
              Your selected location:
            </p>
            <p className="font-semibold mb-4">
              {selectedLocation.name}
            </p>
            <Link
              href={`/locations/${selectedLocation.slug}/offers`}
              className="inline-block bg-[#113D33] text-white px-6 py-3 rounded-xl font-semibold"
            >
              View Offers
            </Link>
          </div>
        )}

        {/* Location list */}
        <div className="space-y-4">
          <Link
            href="/locations/denver-larimer/offers"
            className="block underline"
          >
            Sway Larimer — Denver, CO
          </Link>

          <span className="block opacity-60">
            Sway Dallas — Dallas, TX (coming soon)
          </span>

          <span className="block opacity-60">
            Sway Georgetown — Washington, DC (coming soon)
          </span>
        </div>

        {/* Secondary navigation */}
        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/massages"
            className="inline-block bg-[#113D33] text-white px-5 py-3 rounded-xl"
          >
            Browse Massages
          </Link>

          <Link
            href="/facials"
            className="inline-block bg-[#113D33] text-white px-5 py-3 rounded-xl"
          >
            Browse Facials
          </Link>

          <Link
            href="/book"
            className="inline-block bg-[#4A776D] hover:bg-[#3a5f56] text-white px-5 py-3 rounded-xl"
          >
            Book Now
          </Link>
        </div>
      </div>
    </main>
  );
}
