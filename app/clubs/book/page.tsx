import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";

/**
 * Sway Wellness Club booking chooser (bridge period).
 *
 * Dedicated entry point for the two former-Upswell clubs, used as the single
 * "Book Now" target on Heather's Upswell site + club social, where there is no
 * location intent at click time.
 *
 * Intentionally separate from the global /book hub: it does NOT auto-redirect
 * to a saved location and does NOT read or write the shared
 * `sway_selected_location` state, so it can never bounce an Upswell guest into
 * Larimer's Mindbody flow or pollute site-wide location-aware nav. It simply
 * routes to the two canonical per-location booking pages, which survive the
 * Mindbody cutover (widget swap, same URLs).
 */

const clubs = [
  {
    slug: "denver-rino",
    name: "Sway RiNo",
    city: "Denver",
    state: "CO",
    address: "3636 Blake St",
    image: "/assets/rino1.jpeg",
    href: "/locations/denver-rino/book/",
  },
  {
    slug: "denver-central-park",
    name: "Sway Central Park",
    city: "Aurora",
    state: "CO",
    address: "2271 Clinton St",
    image: "/assets/centralpark1.png",
    href: "/locations/denver-central-park/book/",
  },
];

export default function ClubsBookPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0e2b24] via-[#113D33] to-[#0b1f1a] text-white font-vance">
      {/* Hero */}
      <section className="px-6 pt-28 md:pt-36 pb-4 text-center max-w-4xl mx-auto">
        <p className="text-sm md:text-base uppercase tracking-[0.2em] text-[#9ABFB3] mb-4">
          Sway Wellness Club
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Book Your Recovery Session
        </h1>
        <p className="text-base md:text-lg text-gray-300 max-w-xl mx-auto">
          Choose your Denver club to get started. Sauna, cold plunge, infrared,
          and compression therapy.
        </p>
      </section>

      {/* Club cards */}
      <section className="px-4 sm:px-6 pt-10 pb-16">
        <p className="text-center text-sm uppercase tracking-[0.15em] text-[#9ABFB3] mb-6">
          Select your location
        </p>
        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {clubs.map((club) => (
            // Plain <a> (hard navigation), not next/link. The Mariana Tek widget
            // on the destination /book page only initializes on a full page load;
            // a soft client-side nav leaves the widget unrendered.
            <a
              key={club.slug}
              href={club.href}
              className="group relative bg-white text-[#113D33] rounded-2xl overflow-hidden shadow-xl transition hover:shadow-2xl hover:scale-[1.02] flex flex-col"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={club.image}
                  alt={club.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-block text-xs px-3 py-1 rounded-full font-semibold shadow-sm bg-emerald-100 text-emerald-800">
                    Now Open
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-1">{club.name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {club.city}, {club.state}
                </p>
                <p className="text-xs text-gray-400 mb-4">{club.address}</p>

                <div className="mt-auto flex items-center justify-center gap-2 w-full rounded-full py-3 px-5 text-white font-semibold text-sm transition bg-[#113D33] group-hover:bg-[#0a2b23]">
                  Book Now
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
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
    </main>
  );
}
