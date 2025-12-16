// app/offers/OffersHub.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Script from "next/script";

export default function OffersHub() {
  const [showHub, setShowHub] = useState(false);

  useEffect(() => {
    const ls = localStorage.getItem("sway_selected_location");
    if (ls) {
      try {
        const loc = JSON.parse(ls);
        if (loc?.slug) {
          document.cookie = `sway_loc=${loc.slug}; path=/; max-age=${60 * 60 * 24 * 365}`;
          window.location.replace(`/locations/${loc.slug}/offers`);
          return;
        }
      } catch {}
    }
    setShowHub(true);
  }, []);

  return (
    <>
      {/* Prevent blank flash when cookie exists */}
      <Script id="offers-pre-redirect" strategy="beforeInteractive">
        {`
          (function(){
            try {
              var m = document.cookie.match(/(?:^|;\\s*)sway_loc=([^;]+)/);
              var slug = m && m[1];
              if (slug) {
                window.location.replace('/locations/' + slug + '/offers');
              }
            } catch (e) {}
          })();
        `}
      </Script>

      {showHub && (
        <div className="max-w-3xl mx-auto px-6 pt-28 pb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Spa Offers & Deals
          </h1>

          <p className="mb-6 text-[#0e2b24]">
            Explore exclusive spa offers and membership deals at Sway Wellness Spa.
            Choose your location to see current promotions.{" "}
            <Link href="/membership" className="underline">
              Membership
            </Link>{" "}
            guests enjoy ongoing perks and savings on treatments.
          </p>

          <div className="space-y-3">
            <Link className="underline" href="/locations/denver-larimer/offers">
              Sway Larimer — Denver, CO
            </Link>
            <span className="block opacity-70">
              Sway Dallas — Dallas, TX (coming soon)
            </span>
            <span className="block opacity-70">
              Sway Georgetown — Washington, DC (coming soon)
            </span>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/facials"
              className="inline-block bg-[#113D33] text-white px-5 py-3 rounded-xl"
            >
              Browse Facials
            </Link>
            <Link
              href="/massages"
              className="inline-block bg-[#113D33] text-white px-5 py-3 rounded-xl"
            >
              Browse Massages
            </Link>
            <Link
              href="/book"
              className="inline-block bg-[#4A776D] hover:bg-[#3a5f56] text-white px-5 py-3 rounded-xl"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
