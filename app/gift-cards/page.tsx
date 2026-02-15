// app/gift-cards/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type SelectedLocation = {
  slug: string;
  name: string;
};

export default function GiftCardsHubPage() {
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
          Gift Cards
        </h1>

        <p className="mb-8 text-[#0e2b24]">
          Give the ultimate wellness gift. Purchase a Sway gift card online —
          select your location to get started.
        </p>

        {/* Gift card image */}
        <div className="mb-10">
          <Image
            src="/assets/giftcard.jpg"
            alt="Sway Wellness Spa Gift Card"
            width={500}
            height={300}
            className="rounded-lg object-cover w-full max-w-md"
          />
        </div>

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
              href={`/locations/${selectedLocation.slug}/gift-cards`}
              className="inline-block bg-[#113D33] text-white px-6 py-3 rounded-xl font-semibold"
            >
              Purchase Gift Card
            </Link>
          </div>
        )}

        {/* Location list */}
        <div className="space-y-4">
          <Link
            href="/locations/denver-larimer/gift-cards"
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
            href="/membership"
            className="inline-block bg-[#113D33] text-white px-5 py-3 rounded-xl"
          >
            Explore Membership
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
