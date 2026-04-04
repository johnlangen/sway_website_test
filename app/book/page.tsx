"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

type SelectedLocation = { slug: string; name: string };

const locations = [
  {
    slug: "denver-larimer",
    name: "Sway Larimer",
    city: "Denver",
    state: "CO",
    address: "1428 Larimer St",
    status: "open" as const,
    image: "/assets/homepage_photo_outside.jpg",
    href: "/locations/denver-larimer/book",
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

export default function BookHubPage() {
  const [showHub, setShowHub] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);

  useEffect(() => {
    const ls = localStorage.getItem("sway_selected_location");
    if (ls) {
      try {
        const loc = JSON.parse(ls);
        if (loc?.slug) {
          document.cookie = `sway_loc=${loc.slug}; path=/; max-age=${60 * 60 * 24 * 365}`;
          // Auto-redirect to their saved location's booking page
          const match = locations.find((l) => l.slug === loc.slug && l.status === "open");
          if (match) {
            window.location.replace(match.href);
            return;
          }
          setSelectedLocation(loc);
        }
      } catch {}
    }
    setShowHub(true);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0e2b24] via-[#113D33] to-[#0b1f1a] text-white font-vance">
      {/* Pre-redirect before paint */}
      <Script id="book-pre-redirect" strategy="beforeInteractive">
        {`
          (function(){
            try {
              var m = document.cookie.match(/(?:^|;\\s*)sway_loc=([^;]+)/);
              var slug = m && m[1];
              if (slug === 'denver-larimer') {
                window.location.replace('/locations/denver-larimer/book');
              }
            } catch (e) {}
          })();
        `}
      </Script>

      {showHub && (
        <>
          {/* Hero */}
          <section className="px-6 pt-28 md:pt-36 pb-4 text-center max-w-4xl mx-auto">
            <p className="text-sm md:text-base uppercase tracking-[0.2em] text-[#9ABFB3] mb-4">
              Sway Wellness Spa
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Book Your Appointment
            </h1>
            <p className="text-base md:text-lg text-gray-300 max-w-xl mx-auto">
              Select your Sway location to start booking. We&apos;ll remember your choice for next time.
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

                return (
                  <Link
                    key={loc.slug}
                    href={loc.href}
                    onClick={() => saveLocation(loc.slug, loc.name)}
                    className={`group relative ${isOpen ? "bg-white" : "bg-white/80"} text-[#113D33] rounded-2xl overflow-hidden shadow-xl transition hover:shadow-2xl hover:scale-[1.02] flex flex-col ${
                      isSelected ? "ring-2 ring-[#9ABFB3]" : ""
                    }`}
                  >
                    <div className="relative h-40 w-full">
                      <Image
                        src={loc.image}
                        alt={loc.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`inline-block text-xs px-3 py-1 rounded-full font-semibold shadow-sm ${
                          isOpen
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-gray-200 text-gray-600"
                        }`}>
                          {isOpen ? "Now Open" : "Coming Soon"}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-1">{loc.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {loc.city}, {loc.state}
                      </p>
                      {loc.address && (
                        <p className="text-xs text-gray-400 mb-4">{loc.address}</p>
                      )}

                      <div className={`mt-auto flex items-center justify-center gap-2 w-full rounded-full py-3 px-5 text-white font-semibold text-sm transition ${
                        isOpen
                          ? "bg-[#113D33] group-hover:bg-[#0a2b23]"
                          : "bg-[#113D33]/80 group-hover:bg-[#113D33]"
                      }`}>
                        {isOpen ? "Book Now" : "Learn More"}
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Phone CTA */}
          <section className="pb-16 px-6 text-center">
            <p className="text-sm text-gray-300">
              Prefer to book by phone?{" "}
              <a
                href="tel:+13034766150"
                className="underline underline-offset-4 hover:text-white transition"
              >
                Call (303) 476-6150
              </a>
            </p>
          </section>
        </>
      )}
    </main>
  );
}
