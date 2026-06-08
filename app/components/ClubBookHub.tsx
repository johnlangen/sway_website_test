import Link from "next/link";
import { SwayCurve } from "./SwayCurve";
import { getClubLocation, type ClubLocationKey } from "@/lib/clubLocations";

/**
 * Central "Book Your Experience" hub for the Sway Wellness Club locations
 * (RiNo + Central Park). Mirrors the Larimer /book welcome screen, but offers
 * only the treatments these club sites run: Remedy Lounge, Massage, Facial.
 *
 * TEMPORARY route: lives at /locations/<club>/book-test so it does not override
 * the existing Mariana Tek /book page during the bridge period.
 */
export default function ClubBookHub({ clubKey }: { clubKey: ClubLocationKey }) {
  const club = getClubLocation(clubKey)!;
  const basePath = `/locations/${club.key}`;
  const phoneDigits = club.phone.replace(/[^\d]/g, "");

  const cards = [
    {
      href: `${basePath}/book-remedy-lounge`,
      title: "Remedy Lounge",
      blurb: "75 minutes in the recovery lounge, with optional sauna sessions.",
      price: `Members ${club.remedyLounge.memberPrice} · Drop-In ${club.remedyLounge.price}`,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      ),
    },
    {
      href: `${basePath}/book-service-test?category=massage`,
      title: "Massage",
      blurb: "Expert therapists, personalized pressure, total relaxation.",
      price: "From $139",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      ),
    },
    {
      href: `${basePath}/book-service-test?category=facial`,
      title: "Facial",
      blurb: "Clinical-grade skincare tailored to your skin.",
      price: "From $139",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
  ];

  return (
    <main className="bg-[#F7F4E9] text-[#113D33] font-vance min-h-screen">
      <section className="px-4 pt-24 md:pt-28 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm md:text-base uppercase tracking-[0.2em] text-[#4A776D] mb-4">
            Sway Wellness Club · {club.label}
          </p>
          <SwayCurve
            width={150}
            strokeWidth={2.2}
            animate
            className="text-[#4A776D]/85 mx-auto block mb-5"
          />
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#113D33] mb-3 leading-tight">
            Book Your Experience
          </h1>
          <p className="text-base md:text-lg text-[#113D33]/60 max-w-md mx-auto mb-10">
            How would you like to get started?
          </p>

          <div className="grid gap-4 max-w-lg mx-auto grid-cols-1">
            {cards.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="bg-white rounded-2xl border border-[#113D33]/10 p-6 text-left shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
              >
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#4A776D]/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-[#4A776D]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    {c.icon}
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#113D33] mb-1">
                    {c.title}
                  </h3>
                  <p className="text-sm text-[#113D33]/65">{c.blurb}</p>
                  <p className="text-xs text-[#4A776D] font-semibold mt-2">
                    {c.price}
                  </p>
                </div>
                <span className="self-center text-[#4A776D]">&rarr;</span>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-sm text-[#113D33]/60">
            Prefer to call?{" "}
            <a
              href={`tel:${phoneDigits}`}
              className="text-[#4A776D] underline underline-offset-2 font-medium"
            >
              {club.phone}
            </a>
          </p>

          <p className="mt-6">
            <Link
              href={basePath}
              className="text-sm text-[#113D33]/65 hover:text-[#113D33] underline underline-offset-4 transition-colors"
            >
              Back to Sway {club.label}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
