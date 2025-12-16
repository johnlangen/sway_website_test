// app/membership/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Script from "next/script";

export default function MembershipHubPage() {
  const [showHub, setShowHub] = useState(false);

  useEffect(() => {
    const ls = localStorage.getItem("sway_selected_location");
    if (ls) {
      try {
        const loc = JSON.parse(ls);
        if (loc?.slug) {
          document.cookie = `sway_loc=${loc.slug}; path=/; max-age=${
            60 * 60 * 24 * 365
          }`;
          window.location.replace(`/locations/${loc.slug}/membership`);
          return;
        }
      } catch {}
    }
    setShowHub(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#F7F4E9] text-[#113D33] px-6 pt-28 pb-16 font-vance">
      <Script id="membership-pre-redirect" strategy="beforeInteractive">
        {`
          (function(){
            try {
              var m = document.cookie.match(/(?:^|;\\s*)sway_loc=([^;]+)/);
              var slug = m && m[1];
              if (slug) {
                window.location.replace('/locations/' + slug + '/membership');
              }
            } catch (e) {}
          })();
        `}
      </Script>

      {showHub && (
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Join the Club</h1>
          <p className="mb-6">
            Choose your Sway location to see membership options and founding-member perks.
          </p>

          <div className="space-y-3">
            <Link className="underline" href="/locations/denver-larimer/membership">
              Sway Larimer — Denver, CO
            </Link>
            <span className="block opacity-70">Sway Dallas — Dallas, TX (coming soon)</span>
            <span className="block opacity-70">Sway Georgetown — Washington, DC (coming soon)</span>
          </div>

          <div className="mt-10">
            <Link
              href="/locations"
              className="inline-block bg-[#113D33] text-white px-5 py-3 rounded-xl"
            >
              Find a location
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
