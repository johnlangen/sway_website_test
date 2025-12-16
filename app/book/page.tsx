"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";

export default function BookHubPage() {
  const [showHub, setShowHub] = useState(false);

  useEffect(() => {
    // If cookie wasn’t present but localStorage has it, route client-side
    const ls = localStorage.getItem("sway_selected_location");
    if (ls) {
      try {
        const loc = JSON.parse(ls);
        if (loc?.slug) {
          document.cookie = `sway_loc=${loc.slug}; path=/; max-age=${60 * 60 * 24 * 365}`;
          window.location.replace(`/locations/${loc.slug}/book`);
          return;
        }
      } catch {}
    }
    setShowHub(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#F7F4E9] text-[#113D33] px-4 pt-32 md:pt-40 pb-20 font-vance">
      {/* Pre-redirect before paint */}
      <Script id="book-pre-redirect" strategy="beforeInteractive">
        {`
          (function(){
            try {
              var m = document.cookie.match(/(?:^|;\\s*)sway_loc=([^;]+)/);
              var slug = m && m[1];
              if (slug) {
                window.location.replace('/locations/' + slug + '/book');
              }
            } catch (e) {}
          })();
        `}
      </Script>

      {showHub && (
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Book Your Appointment
          </h1>
          <p className="mb-8">
            Choose your Sway location to continue booking. We’ll remember your
            choice for next time.
          </p>

          <div className="space-y-3">
            <Link className="underline" href="/locations/denver-larimer/book">
              Sway Larimer — Denver, CO
            </Link>
            <span className="block opacity-70">
              Sway Dallas — Dallas, TX (coming soon)
            </span>
            <span className="block opacity-70">
              Sway Georgetown — Washington, DC (coming soon)
            </span>
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
