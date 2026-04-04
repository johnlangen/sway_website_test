"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Image from "next/image";
import { useRouter } from "next/navigation";

/* ----------------------------------------------------------------
   LOCATION DATA
---------------------------------------------------------------- */

const LOCATIONS = [
  {
    slug: "denver-larimer",
    name: "Sway Larimer",
    city: "Denver, CO",
    address: "1428 Larimer St.",
    image: "/assets/background_image.jpg",
    bookable: true,
    href: "/locations/denver-larimer/book",
  },
  {
    slug: "dallas",
    name: "Sway Dallas",
    city: "Dallas, TX",
    address: "Coming Soon",
    image: "/assets/background.jpg",
    bookable: false,
    href: "/locations/dallas",
  },
  {
    slug: "georgetown",
    name: "Sway Georgetown",
    city: "Washington, DC",
    address: "Coming Soon",
    image: "/assets/background.jpg",
    bookable: false,
    href: "/locations/georgetown",
  },
] as const;

/* ----------------------------------------------------------------
   HELPERS
---------------------------------------------------------------- */

function saveLocation(slug: string) {
  try {
    localStorage.setItem("sway_selected_location", JSON.stringify({ slug }));
    document.cookie = `sway_loc=${slug}; path=/; max-age=${60 * 60 * 24 * 365}`;
  } catch {}
}

/* ----------------------------------------------------------------
   PAGE
---------------------------------------------------------------- */

export default function BookHubPage() {
  const [showHub, setShowHub] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect if location already saved
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

  const handleSelect = (loc: (typeof LOCATIONS)[number]) => {
    saveLocation(loc.slug);
    router.push(loc.href);
  };

  return (
    <main className="min-h-screen bg-[#F7F4E9] text-[#113D33] font-vance">
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
        <div className="px-4 pt-28 md:pt-36 pb-20">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.2em] text-[#4A776D] mb-3 font-medium">
                Sway Wellness Spa
              </p>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Choose Your Location
              </h1>
              <p className="text-[#113D33]/60 max-w-md mx-auto">
                Select a Sway location to start booking. We&apos;ll remember your choice for next time.
              </p>
            </div>

            {/* Location cards */}
            <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.slug}
                  type="button"
                  onClick={() => handleSelect(loc)}
                  className={`group text-left rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                    loc.bookable
                      ? "border-[#113D33]/15 hover:border-[#113D33]/40 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                      : "border-[#113D33]/8 cursor-pointer hover:border-[#113D33]/20"
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <Image
                      src={loc.image}
                      alt={`${loc.name} — ${loc.city}`}
                      fill
                      className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
                        !loc.bookable ? "opacity-60" : ""
                      }`}
                    />
                    {!loc.bookable && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <span className="bg-white/90 backdrop-blur-sm text-[#113D33] text-xs font-semibold px-3 py-1.5 rounded-full">
                          Coming Soon
                        </span>
                      </div>
                    )}
                    {loc.bookable && (
                      <div className="absolute bottom-3 right-3 bg-[#113D33] text-white text-xs font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Book Now →
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h2 className="font-bold text-lg text-[#113D33]">
                      {loc.name}
                    </h2>
                    <p className="text-sm text-[#113D33]/60 mt-0.5">
                      {loc.city}
                    </p>
                    <p className="text-xs text-[#113D33]/40 mt-1">
                      {loc.address}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Phone CTA */}
            <div className="text-center mt-10">
              <p className="text-sm text-[#113D33]/50">
                Prefer to book by phone?{" "}
                <a
                  href="tel:+13034766150"
                  className="underline underline-offset-4 hover:text-[#113D33]/80 transition"
                >
                  Call (303) 476-6150
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
