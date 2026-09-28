import Image from "next/image";
import Link from "next/link";
import { SwayCurve } from "../components/SwayCurve";

// Clubs-only. See layout.tsx: Larimer has a traditional sauna, not infrared,
// so it never appears on this page.

const CLUBS = [
  {
    name: "Sway RiNo",
    area: "RiNo Art District, Denver",
    address: "3636 Blake St, Denver, CO 80205",
    cabins: "3 infrared cabins",
    extras: "Traditional sauna, cold plunge, PEMF mats, compression therapy",
    hours: "Weekdays 6:30 to 10 AM and 4 to 8 PM (Mon evenings only). Weekends 11 AM to 5 PM.",
    image: "/assets/rino2.jpeg",
    imageAlt: "Sauna at Sway Wellness Spa RiNo",
    href: "/locations/denver-rino/",
    bookHref: "/locations/denver-rino/book-remedy-lounge",
    offer: "First visit $25, locals only (code FTVORL at check-in).",
  },
  {
    name: "Sway Central Park",
    area: "Aurora, next to Denver's Central Park",
    address: "2271 Clinton St, Aurora, CO 80010",
    cabins: "4 infrared cabins",
    extras: "Traditional sauna, cold plunges, PEMF mats, compression therapy",
    hours: "Mon 4 to 8 PM. Tue to Thu 8 to 11 AM and 4 to 8 PM. Fri and Sat 8 AM to 2 PM. Sun 8 AM to 6 PM.",
    image: "/assets/centralpark2.jpg",
    imageAlt: "Recovery suite at Sway Wellness Spa Central Park",
    href: "/locations/denver-central-park/",
    bookHref: "/locations/denver-central-park/book-remedy-lounge",
    // FTVORL-CP-PAUSE: no first-visit offer line while the CP plunge is down.
    offer: null as string | null,
  },
];

const STEPS = [
  {
    title: "Book a 75-minute session",
    body: "Pick a time online. Add up to two 25-minute sauna windows, infrared or traditional. Your cabin is held for your window.",
  },
  {
    title: "Heat, then cold",
    body: "Warm up in an infrared cabin, step out to the cold plunge, go back in. Most people do two or three rounds.",
  },
  {
    title: "Come down slowly",
    body: "Finish on a PEMF mat or in compression boots, then take a few minutes in the lounge before you head out.",
  },
];

const COMPARE = [
  {
    label: "How it heats",
    infrared: "Infrared panels warm your body more directly",
    traditional: "Heats the air around you",
  },
  {
    label: "How it feels",
    infrared: "Gentler air temperature, a deep slow sweat",
    traditional: "Hotter and more intense, faster sweat",
  },
  {
    label: "Good for",
    infrared: "Longer, easier sits and first-timers",
    traditional: "Classic sauna rounds between cold plunges",
  },
];

const FAQS = [
  {
    q: "How much is an infrared sauna session?",
    a: "A 75-minute Remedy Lounge session is $49 as a drop-in and includes the infrared cabins, traditional sauna, cold plunge, PEMF mats, and compression therapy. Unlimited membership is $129 a month.",
  },
  {
    q: "Do I have to book the infrared cabin separately?",
    a: "When you book online you can reserve up to two 25-minute sauna windows, infrared or traditional. You can step out to cold plunge and come back during your window. The cold plunge, compression, and lounge are open the whole session.",
  },
  {
    q: "Is it private?",
    a: "The infrared cabins are reserved per window, so the cabin is yours for that time. The traditional sauna, cold plunge, and lounge are shared spaces.",
  },
  {
    q: "What should I bring?",
    a: "A swimsuit or comfortable clothes you can sweat in, and a water bottle. Arrive at your booked start time, since everyone in a session starts together.",
  },
  {
    q: "Who should skip the sauna?",
    a: "If you are pregnant, have a heart condition, low or high blood pressure, or any medical condition, check with your doctor before using a sauna or cold plunge. Hydrate before and after, and leave the heat any time you feel dizzy or unwell.",
  },
];

const cardShadow =
  "shadow-[0_10px_30px_-18px_rgba(17,61,51,0.18)] hover:shadow-[0_22px_45px_-18px_rgba(17,61,51,0.3)] transition-shadow duration-300";

export default function InfraredSaunaPage() {
  return (
    <div className="bg-[#F7F4E9] text-[#113D33] font-vance">
      {/* HERO */}
      <section className="px-6 pt-28 sm:pt-32 md:pt-36 pb-14 md:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-[#4A776D] mb-4">
            RiNo · Central Park
          </div>
          <SwayCurve width={150} strokeWidth={2.2} animate className="text-[#4A776D]/85 mx-auto block mb-6" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1]">
            Infrared Sauna in Denver
          </h1>
          <p className="mt-5 text-lg sm:text-xl max-w-2xl mx-auto opacity-90 leading-relaxed">
            Private infrared cabins at our two Denver clubs, with a traditional
            sauna, cold plunge, PEMF mats, and compression therapy in the same
            75-minute session. $49 drop-in.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/locations/denver-rino/book-remedy-lounge"
              className="bg-[#113D33] text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[#0c2a23] transition"
            >
              Book at RiNo
            </Link>
            <Link
              href="/locations/denver-central-park/book-remedy-lounge"
              className="border-2 border-[#113D33] px-7 py-3 rounded-full text-sm font-semibold hover:bg-[#113D33] hover:text-white transition"
            >
              Book at Central Park
            </Link>
          </div>
        </div>
      </section>

      {/* HOW A SESSION WORKS */}
      <section className="px-6 py-14 md:py-20 bg-[#EBE4D1]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-10">
            How a session works
          </h2>
          <ol className="grid md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <li key={s.title} className={`bg-white rounded-2xl p-7 ${cardShadow}`}>
                <div className="text-xs uppercase tracking-[0.3em] text-[#4A776D] mb-3">
                  Step {i + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed opacity-80">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* INFRARED VS TRADITIONAL */}
      <section className="px-6 py-14 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-4">
            Infrared vs. traditional sauna
          </h2>
          <p className="text-center opacity-80 max-w-2xl mx-auto mb-10">
            Both clubs have both, so you can try each in one visit and decide
            which you like.
          </p>
          <div className={`bg-white rounded-2xl overflow-hidden ${cardShadow}`}>
            <table className="w-full text-sm">
              <thead className="bg-[#113D33] text-white">
                <tr>
                  <th scope="col" className="text-left p-4 font-semibold"><span className="sr-only">Comparison</span></th>
                  <th scope="col" className="text-left p-4 font-semibold">Infrared</th>
                  <th scope="col" className="text-left p-4 font-semibold">Traditional</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row.label} className="border-t border-black/5 align-top">
                    <th scope="row" className="text-left p-4 font-semibold">{row.label}</th>
                    <td className="p-4 opacity-85">{row.infrared}</td>
                    <td className="p-4 opacity-85">{row.traditional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="px-6 py-14 md:py-20 bg-[#EBE4D1]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-10">
            Two places to sweat
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {CLUBS.map((c) => (
              <article key={c.name} className={`bg-white rounded-3xl overflow-hidden ${cardShadow}`}>
                <Image
                  src={c.image}
                  alt={c.imageAlt}
                  width={1093}
                  height={1438}
                  className="w-full h-56 sm:h-64 object-cover"
                />
                <div className="p-7">
                  <div className="text-xs uppercase tracking-[0.3em] text-[#4A776D] mb-2">{c.area}</div>
                  <h3 className="text-2xl font-semibold mb-3">
                    <Link href={c.href} className="hover:underline">{c.name}</Link>
                  </h3>
                  <ul className="text-sm space-y-1.5 opacity-85 mb-4">
                    <li><strong>{c.cabins}</strong></li>
                    <li>{c.extras}</li>
                    <li>{c.address}</li>
                    <li>{c.hours}</li>
                  </ul>
                  {c.offer && (
                    <p className="text-sm font-medium mb-4">{c.offer}</p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={c.bookHref}
                      className="bg-[#113D33] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#0c2a23] transition"
                    >
                      Book a session
                    </Link>
                    <Link
                      href={c.href}
                      className="px-6 py-3 rounded-full text-sm font-semibold underline underline-offset-4"
                    >
                      About {c.name}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="text-center text-sm opacity-70 mt-8">
            Downtown? Our Larimer Square spa has a traditional sauna in its{" "}
            <Link href="/sauna/" className="underline">Remedy Room</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8">
            Infrared sauna FAQ
          </h2>
          {FAQS.map((f) => (
            <details key={f.q} className="border-b border-black/10 py-4">
              <summary className="cursor-pointer font-medium">{f.q}</summary>
              <p className="mt-3 text-sm opacity-80 leading-relaxed">{f.a}</p>
            </details>
          ))}
          <p className="mt-8 text-sm opacity-80">
            More reading:{" "}
            <Link href="/blog/cold-plunge-denver-guide/" className="underline font-semibold">
              the best cold plunges in Denver
            </Link>{" "}
            and{" "}
            <Link href="/blog/infrared-pemf-mat/" className="underline font-semibold">
              what PEMF mats do
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
