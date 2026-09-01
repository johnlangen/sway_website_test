"use client";

import Image from "next/image";
import Link from "next/link";

export default function ColdPlungeDenverLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex flex-col justify-center items-center px-4 gap-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center max-w-4xl">
          Cold Plunge in Denver: Where to Go
        </h1>
        <p className="text-white/70 text-center max-w-2xl">
          Every great way to get cold in the Mile High City
        </p>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        {/* Back + Date + Tag */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link
            href="/blog"
            className="text-[#113D33] font-semibold hover:underline"
          >
            &larr; Back to Blog
          </Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
            Recovery
          </span>
          <span className="text-gray-500">September 2026 · By Sway Wellness Team</span>
        </div>

        {/* Hero Image */}
        <Image
          src="/assets/rino1.jpeg"
          alt="The cold plunge pool at Sway Wellness Club RiNo in Denver"
          width={957}
          height={500}
          className="rounded-xl w-full object-cover object-[center_72%] max-h-[460px]"
          priority
        />

        {/* Intro */}
        <p>
          Denver might be the best cold plunge city in the country. We train
          hard, we live a mile closer to the sun, and half the city is already
          dunking in a creek by June. Here is where to get in, whether you want
          a guided first plunge, a pool big enough to share with friends, or
          snowmelt in the foothills.
        </p>

        {/* The Short Version */}
        <div className="bg-[#113D33] text-white rounded-xl p-8 space-y-4">
          <p className="text-xl font-bold">The Short Version</p>
          <ul className="space-y-3 text-[15px]">
            <li className="flex gap-3">
              <span className="text-[#9CB7A9] pt-0.5">&#9679;</span>
              <span>
                <strong>Best first plunge:</strong> the guided{" "}
                <Link href="/locations/denver-larimer/book-remedy-room" className="underline font-semibold">
                  Remedy Room circuit
                </Link>{" "}
                at Sway Larimer. $49 drop-in, $25 for members.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#9CB7A9] pt-0.5">&#9679;</span>
              <span>
                <strong>Best with friends:</strong> the big plunge pool at{" "}
                <Link href="/locations/denver-rino" className="underline font-semibold">
                  Sway RiNo
                </Link>
                . Open daily, drop-ins welcome.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#9CB7A9] pt-0.5">&#9679;</span>
              <span>
                <strong>Best contrast rounds:</strong> three cold cabins plus a
                hot soak at{" "}
                <Link href="/locations/denver-central-park" className="underline font-semibold">
                  Sway Central Park
                </Link>
                .
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#9CB7A9] pt-0.5">&#9679;</span>
              <span>
                <strong>Best free option:</strong> Clear Creek in Golden,
                snowmelt cold well into summer.
              </span>
            </li>
          </ul>
          <p className="text-sm text-white/70">
            Denver locals: your first Remedy Room session is $25 with our{" "}
            <Link href="/offers" className="underline font-semibold text-white">
              first-visit offer
            </Link>{" "}
            (locals only, first visit, select days).
          </p>
        </div>

        {/* ============== Section 1: Temperature ladder ============== */}
        <h2 id="how-cold" className="text-2xl font-bold scroll-mt-24">
          How Cold Is Cold?
        </h2>

        <p>
          Every plunge conversation starts with the same question. Here is the
          honest map, from a brisk first dip to full polar territory.
        </p>

        {/* Thermometer scale */}
        <div>
          <div
            className="h-3 rounded-full"
            style={{
              background:
                "linear-gradient(to right, #D7EDF1, #8FC1CF, #3E7A94, #12293D)",
            }}
          />
          <div className="flex justify-between text-xs font-bold text-[#113D33]/50 mt-2 px-1">
            <span>65&deg;F · brisk</span>
            <span className="hidden sm:inline">55&deg;F</span>
            <span className="hidden sm:inline">45&deg;F</span>
            <span>32&deg;F · polar</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl p-5 space-y-1 bg-[#EDF7F9] border border-[#C9E4EA]">
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-bold text-[#12293D]">The Gateway</h3>
              <span className="text-sm font-bold text-[#3E7A94]">60&ndash;65&deg;F</span>
            </div>
            <p className="text-[15px] text-[#12293D]/80">
              Brisk but friendly. Cold enough to feel it, warm enough to
              breathe through on your first try.
            </p>
          </div>

          <div className="rounded-xl p-5 space-y-2 bg-[#D8EBEF] border border-[#A9D0DA]">
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-bold text-[#12293D]">The Sweet Spot</h3>
              <span className="text-sm font-bold text-[#2F6478]">50&ndash;59&deg;F</span>
            </div>
            <p className="text-[15px] text-[#12293D]/80">
              Where most of the research lives. Full cold response,
              sustainable for two to three minutes.
            </p>
            <Link
              href="/remedy-tech"
              className="inline-block bg-[#113D33] text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-[#0e322b] transition"
            >
              Sway Larimer plunges here
            </Link>
          </div>

          <div className="rounded-xl p-5 space-y-1 bg-[#3E7A94] text-white">
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-bold">The Deep End</h3>
              <span className="text-sm font-bold text-white/70">40&ndash;49&deg;F</span>
            </div>
            <p className="text-[15px] text-white/85">
              A bigger stimulus for experienced plungers. Nobody should start
              here. Plenty of regulars end up loving it.
            </p>
          </div>

          <div className="rounded-xl p-5 space-y-1 bg-[#12293D] text-white">
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-bold">Polar Territory</h3>
              <span className="text-sm font-bold text-white/70">Below 40&deg;F</span>
            </div>
            <p className="text-[15px] text-white/85">
              Mountain runoff in May. Seconds, not minutes. Earn your way down
              the ladder first.
            </p>
          </div>
        </div>

        {/* ============== Section 2: Sway ============== */}
        <h2 id="sway" className="text-2xl font-bold scroll-mt-24">
          The Sway Plunges: Larimer, RiNo &amp; Central Park
        </h2>

        {/* Larimer feature card: the circuit as a flow */}
        <div className="bg-white rounded-xl border border-[#d7e2dc] p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">The Remedy Room at Sway Larimer</h3>
            <span className="text-xs font-semibold text-[#113D33]/40 tracking-wide">Larimer Sq</span>
          </div>
          <p className="text-[15px]">
            The easiest first plunge in Denver: one guided 40-minute circuit,
            no guesswork. Here is the loop.
          </p>

          {/* Circuit flow */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2">
            <div className="flex-1 rounded-lg bg-[#F7F4E9] border border-[#e5dfc9] p-4 text-center space-y-1">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#B85C38] text-white text-sm font-bold">1</span>
              <p className="font-bold text-[15px]">Heat</p>
              <p className="text-[13px] text-[#113D33]/60">
                <Link href="/sauna" className="underline">Traditional sauna</Link>
              </p>
            </div>
            <div className="flex items-center justify-center text-[#113D33]/30 text-xl font-bold rotate-90 sm:rotate-0">&rarr;</div>
            <div className="flex-1 rounded-lg bg-[#D8EBEF] border border-[#A9D0DA] p-4 text-center space-y-1">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#3E7A94] text-white text-sm font-bold">2</span>
              <p className="font-bold text-[15px]">Cold</p>
              <p className="text-[13px] text-[#12293D]/60">Plunge in the 50s</p>
            </div>
            <div className="flex items-center justify-center text-[#113D33]/30 text-xl font-bold rotate-90 sm:rotate-0">&rarr;</div>
            <div className="flex-1 rounded-lg bg-[#F7F4E9] border border-[#e5dfc9] p-4 text-center space-y-1">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#113D33] text-white text-sm font-bold">3</span>
              <p className="font-bold text-[15px]">Flush</p>
              <p className="text-[13px] text-[#113D33]/60">
                <Link href="/compression-therapy" className="underline">Compression therapy</Link>
              </p>
            </div>
            <div className="flex items-center justify-center text-[#113D33]/30 text-xl font-bold rotate-90 sm:rotate-0">&rarr;</div>
            <div className="flex-1 rounded-lg bg-[#F7F4E9] border border-[#e5dfc9] p-4 text-center space-y-1">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#9CB7A9] text-white text-sm font-bold">4</span>
              <p className="font-bold text-[15px]">Glow</p>
              <p className="text-[13px] text-[#113D33]/60">LED light therapy</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-[13px] text-[#113D33]/60">
              $49 drop-in · $25 members · first visit $25 for locals
            </p>
            <Link
              href="/locations/denver-larimer/book-remedy-room"
              className="inline-block bg-[#113D33] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0e322b] transition"
            >
              Book the Remedy Room
            </Link>
          </div>
        </div>

        {/* Club cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-md transition">
            <div className="h-52 overflow-hidden">
              <Image
                src="/assets/rino-card.jpg"
                alt="Sway Wellness Club RiNo"
                width={584}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Sway RiNo</h3>
                <span className="text-xs font-semibold text-[#113D33]/40 tracking-wide">RiNo</span>
              </div>
              <p className="text-[15px]">
                A 75-minute Remedy Lounge session built around the big plunge
                pool, with traditional sauna, infrared cabins, and compression.
                The social plunge. Bring a training partner.
              </p>
              <Link
                href="/locations/denver-rino"
                className="inline-block text-[#113D33] font-semibold underline text-[15px]"
              >
                Visit Sway RiNo &rarr;
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-md transition">
            <div className="h-52 overflow-hidden">
              <Image
                src="/assets/centralpark1.jpg"
                alt="Cold plunge cabins at Sway Wellness Club Central Park"
                width={584}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Sway Central Park</h3>
                <span className="text-xs font-semibold text-[#113D33]/40 tracking-wide">Central Park</span>
              </div>
              <p className="text-[15px]">
                Three cold plunge cabins plus a hot soak, so you can run true
                contrast rounds alongside the sauna, infrared cabins, and
                compression. Mornings here are the local secret.
              </p>
              <Link
                href="/locations/denver-central-park"
                className="inline-block text-[#113D33] font-semibold underline text-[15px]"
              >
                Visit Sway Central Park &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* ============== Section 3: Other studios ============== */}
        <h2 id="studios" className="text-2xl font-bold scroll-mt-24">
          More Places to Plunge Around Denver
        </h2>

        <p>
          Denver&apos;s cold water scene runs deep. Different vibes, same
          shiver.
        </p>

        <div className="bg-white rounded-xl border border-[#d7e2dc] divide-y divide-[#eef3f0]">
          <div className="p-5 sm:flex sm:items-baseline sm:gap-6">
            <div className="sm:w-56 flex-shrink-0 flex items-baseline justify-between sm:block">
              <h3 className="font-bold">Denver Sports Recovery</h3>
              <span className="text-xs font-semibold text-[#113D33]/40 tracking-wide">LoHi</span>
            </div>
            <p className="text-[15px] mt-1 sm:mt-0">
              No-frills recovery gym with cold tubs, sauna, and game-day
              energy. Your plunge with a side of foam rollers.
            </p>
          </div>
          <div className="p-5 sm:flex sm:items-baseline sm:gap-6">
            <div className="sm:w-56 flex-shrink-0 flex items-baseline justify-between sm:block">
              <h3 className="font-bold">SweatHouz (SWTHZ)</h3>
              <span className="text-xs font-semibold text-[#113D33]/40 tracking-wide">S Broadway · Tennyson</span>
            </div>
            <p className="text-[15px] mt-1 sm:mt-0">
              Private suites, each with an infrared sauna and its own plunge.
              The contrast cycle entirely to yourself.
            </p>
          </div>
          <div className="p-5 sm:flex sm:items-baseline sm:gap-6">
            <div className="sm:w-56 flex-shrink-0 flex items-baseline justify-between sm:block">
              <h3 className="font-bold">ROK SPAS</h3>
              <span className="text-xs font-semibold text-[#113D33]/40 tracking-wide">Union Station</span>
            </div>
            <p className="text-[15px] mt-1 sm:mt-0">
              Multiple plunges at stepped temperatures down toward polar
              territory. Find out where you really sit on the ladder.
            </p>
          </div>
          <div className="p-5 sm:flex sm:items-baseline sm:gap-6">
            <div className="sm:w-56 flex-shrink-0 flex items-baseline justify-between sm:block">
              <h3 className="font-bold">Perspire Sauna Studio</h3>
              <span className="text-xs font-semibold text-[#113D33]/40 tracking-wide">Cherry Hills</span>
            </div>
            <p className="text-[15px] mt-1 sm:mt-0">
              Infrared sauna studio with contrast therapy. South-side
              convenience if downtown is not your orbit.
            </p>
          </div>
          <div className="p-5 sm:flex sm:items-baseline sm:gap-6">
            <div className="sm:w-56 flex-shrink-0 flex items-baseline justify-between sm:block">
              <h3 className="font-bold">Clear Creek</h3>
              <span className="text-xs font-semibold text-[#113D33]/40 tracking-wide">Golden · free</span>
            </div>
            <p className="text-[15px] mt-1 sm:mt-0">
              Snowmelt off the Front Range, cold well into summer. Calm eddies
              only, and never plunge moving water alone.
            </p>
          </div>
          <div className="p-5 sm:flex sm:items-baseline sm:gap-6">
            <div className="sm:w-56 flex-shrink-0 flex items-baseline justify-between sm:block">
              <h3 className="font-bold">Mountain Lakes</h3>
              <span className="text-xs font-semibold text-[#113D33]/40 tracking-wide">Front Range · summer</span>
            </div>
            <p className="text-[15px] mt-1 sm:mt-0">
              Alpine water above 10,000 feet stays in plunge territory all
              summer. Earn it with a hike. The original cold plunge.
            </p>
          </div>
        </div>

        {/* Pull quote */}
        <div className="border-l-4 border-[#9CB7A9] pl-6 py-2">
          <p className="text-xl text-[#113D33] italic">
            The cold does not care where you do it. It only cares that you get
            in.
          </p>
        </div>

        {/* ============== Section 4: Protocol ============== */}
        <h2 id="protocol" className="text-2xl font-bold scroll-mt-24">
          Your First Plunge: A 5-Step Protocol
        </h2>

        <div className="bg-white rounded-xl border border-[#d7e2dc] overflow-hidden md:flex md:flex-row-reverse">
          <div className="md:w-2/5 h-56 md:h-auto overflow-hidden">
            <Image
              src="/assets/rino2.jpeg"
              alt="The traditional sauna at Sway Wellness Club RiNo"
              width={700}
              height={900}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 space-y-4 md:w-3/5">
            <div className="flex gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#113D33] text-white text-sm font-bold">1</span>
              <p className="text-[15px] pt-0.5">
                <strong>Warm up first.</strong> Ten minutes of sauna makes the
                cold dramatically friendlier. This is why contrast circuits
                work for beginners.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#113D33] text-white text-sm font-bold">2</span>
              <p className="text-[15px] pt-0.5">
                <strong>Exhale on the way in.</strong> A long, slow exhale
                keeps the gasp reflex from running the show.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#113D33] text-white text-sm font-bold">3</span>
              <p className="text-[15px] pt-0.5">
                <strong>Breathe slower than you want to.</strong> The first 30
                seconds are the loudest. It gets quiet after that.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#113D33] text-white text-sm font-bold">4</span>
              <p className="text-[15px] pt-0.5">
                <strong>Start with 30 to 60 seconds.</strong> That is a real
                plunge. Build toward two or three minutes over a few visits.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#113D33] text-white text-sm font-bold">5</span>
              <p className="text-[15px] pt-0.5">
                <strong>Warm up naturally.</strong> The after-drop buzz is the
                good part. A robe and compression boots beat sprinting back to
                the heat.
              </p>
            </div>
          </div>
        </div>

        <p className="text-[15px] text-[#113D33]/60">
          One sensible caveat: cold water is a real stressor. If you are
          pregnant or have a heart condition, check with your doctor first.
        </p>

        {/* ============== Section 5: Itineraries ============== */}
        <h2 id="plans" className="text-2xl font-bold scroll-mt-24">
          Three Cold Days Worth Planning
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-[#d7e2dc] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-bold">The Lunch-Break Reset</p>
              <span className="text-[11px] font-bold uppercase tracking-wide bg-[#F7F4E9] border border-[#e5dfc9] text-[#113D33]/60 px-2 py-1 rounded-full">Midday</span>
            </div>
            <ol className="relative border-l-2 border-[#d7e2dc] ml-1 space-y-4">
              <li className="pl-4 relative text-[15px]">
                <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#113D33]" />
                Book a midday{" "}
                <Link href="/locations/denver-larimer/book-remedy-room" className="underline text-[#113D33] font-semibold">
                  Remedy Room
                </Link>{" "}
                at Larimer
              </li>
              <li className="pl-4 relative text-[15px]">
                <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#3E7A94]" />
                Sauna, plunge, compression. 40 minutes
              </li>
              <li className="pl-4 relative text-[15px]">
                <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#9CB7A9]" />
                Back at your desk sharper than a third coffee
              </li>
            </ol>
          </div>

          <div className="bg-white border border-[#d7e2dc] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-bold">The Sunday Contrast Morning</p>
              <span className="text-[11px] font-bold uppercase tracking-wide bg-[#F7F4E9] border border-[#e5dfc9] text-[#113D33]/60 px-2 py-1 rounded-full">Sun AM</span>
            </div>
            <ol className="relative border-l-2 border-[#d7e2dc] ml-1 space-y-4">
              <li className="pl-4 relative text-[15px]">
                <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#113D33]" />
                Morning session at{" "}
                <Link href="/locations/denver-central-park" className="underline text-[#113D33] font-semibold">
                  Sway Central Park
                </Link>
              </li>
              <li className="pl-4 relative text-[15px]">
                <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#3E7A94]" />
                Rotate the hot soak and cold cabins
              </li>
              <li className="pl-4 relative text-[15px]">
                <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#9CB7A9]" />
                Go be the calmest person at brunch
              </li>
            </ol>
          </div>

          <div className="bg-white border border-[#d7e2dc] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-bold">The Mountain Double</p>
              <span className="text-[11px] font-bold uppercase tracking-wide bg-[#F7F4E9] border border-[#e5dfc9] text-[#113D33]/60 px-2 py-1 rounded-full">All day</span>
            </div>
            <ol className="relative border-l-2 border-[#d7e2dc] ml-1 space-y-4">
              <li className="pl-4 relative text-[15px]">
                <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#113D33]" />
                Hike out of Golden, careful Clear Creek dip
              </li>
              <li className="pl-4 relative text-[15px]">
                <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#3E7A94]" />
                Evening sauna and big plunge at{" "}
                <Link href="/locations/denver-rino" className="underline text-[#113D33] font-semibold">
                  Sway RiNo
                </Link>
              </li>
              <li className="pl-4 relative text-[15px]">
                <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#9CB7A9]" />
                Sore tomorrow? Book a{" "}
                <Link href="/massages" className="underline text-[#113D33] font-semibold">
                  massage
                </Link>
              </li>
            </ol>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-[#113D33] text-white rounded-xl p-8 text-center space-y-4">
          <p className="text-xl font-bold">Get In. We&apos;ll Keep It Cold.</p>
          <p className="text-sm opacity-90">
            Three plunges across Denver, all open daily. Larimer{" "}
            <Link href="/membership" className="underline font-semibold">members</Link>
            {" "}plunge for $25 a session, club memberships include unlimited
            Lounge time, and a{" "}
            <Link href="/gift-cards" className="underline font-semibold">gift card</Link>
            {" "}is the best way to trick a friend into the water.
          </p>
          <Link
            href="/locations/denver-larimer/book-remedy-room"
            className="inline-block bg-white text-[#113D33] font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Book a Plunge
          </Link>
        </div>

        {/* FAQ Section */}
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
            <p className="font-bold">Where can I cold plunge in Denver?</p>
            <p className="text-gray-700 mt-2 text-[15px]">
              Sway runs cold plunges at three Denver locations: the guided
              Remedy Room circuit at Sway Wellness Spa on Larimer Square, and
              the Remedy Lounge sessions at Sway Wellness Club in RiNo and
              Central Park. Other options around town include Denver Sports
              Recovery in LoHi, SweatHouz private suites, ROK SPAS near Union
              Station, and Clear Creek in Golden for a natural plunge.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
            <p className="font-bold">How cold is the cold plunge at Sway?</p>
            <p className="text-gray-700 mt-2 text-[15px]">
              The cold plunge in the Remedy Room at Sway Larimer is held in
              the 50 to 59 degree range, the sweet spot where most cold-water
              research is done. It is cold enough for the full effect and
              sustainable enough for a two to three minute stay.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
            <p className="font-bold">How long should a beginner stay in a cold plunge?</p>
            <p className="text-gray-700 mt-2 text-[15px]">
              Start with 30 to 60 seconds and build toward two to three
              minutes over several visits. Warming up in the sauna first and
              exhaling slowly as you enter makes the first plunge much easier.
              Get out if you are shivering hard or losing feeling.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
            <p className="font-bold">Do I need a membership to cold plunge in Denver?</p>
            <p className="text-gray-700 mt-2 text-[15px]">
              No. The Remedy Room at Sway Larimer is $49 as a drop-in, and the
              RiNo and Central Park clubs welcome drop-ins daily. Larimer
              members pay $25 per Remedy Room session, club memberships
              include unlimited Lounge access, and Denver locals can try their
              first session for $25 with the first-visit offer (locals only,
              first visit, select days).
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
            <p className="font-bold">Should I do the sauna or the cold plunge first?</p>
            <p className="text-gray-700 mt-2 text-[15px]">
              Sauna first. Heat makes the cold far more approachable and sets
              up the classic contrast cycle: heat, cold, rest, repeat. Most
              people finish on cold and let the body rewarm naturally, which
              is exactly how the guided circuit at Sway is sequenced.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        <div className="pt-10 space-y-6">
          <h2 className="text-2xl font-bold">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              href="/blog/recovery-denver"
              className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-36 overflow-hidden">
                <Image
                  src="/assets/remedy-room.jpg"
                  alt="Recovery in Denver guide"
                  width={400}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">
                  Recovery in Denver: Sauna, Cold Plunge &amp; Robot Massage
                </p>
              </div>
            </Link>
            <Link
              href="/blog/infrared-pemf-mat"
              className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-36 overflow-hidden">
                <Image
                  src="/assets/pemf.jpg"
                  alt="Infrared PEMF mat guide"
                  width={400}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">
                  What Is an Infrared PEMF Mat?
                </p>
              </div>
            </Link>
            <Link
              href="/blog/best-date-night-ideas-denver"
              className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-36 overflow-hidden">
                <Image
                  src="/assets/blog40.jpg"
                  alt="Best date night ideas in Denver"
                  width={400}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">
                  Best Date Night Ideas in Denver
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* FAQ JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Where can I cold plunge in Denver?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sway runs cold plunges at three Denver locations: the guided Remedy Room circuit at Sway Wellness Spa on Larimer Square, and the Remedy Lounge sessions at Sway Wellness Club in RiNo and Central Park. Other options include Denver Sports Recovery in LoHi, SweatHouz private suites, ROK SPAS near Union Station, and Clear Creek in Golden for a natural plunge.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How cold is the cold plunge at Sway?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The cold plunge in the Remedy Room at Sway Larimer is held in the 50 to 59 degree Fahrenheit range, cold enough for the full cold-water response and sustainable enough for a two to three minute stay.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How long should a beginner stay in a cold plunge?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Start with 30 to 60 seconds and build toward two to three minutes over several visits. Warming up in the sauna first and exhaling slowly as you enter makes the first plunge much easier.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do I need a membership to cold plunge in Denver?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. The Remedy Room at Sway Larimer is $49 as a drop-in, and the RiNo and Central Park clubs welcome drop-ins daily. Larimer members pay $25 per Remedy Room session, club memberships include unlimited Lounge access, and Denver locals can try their first session for $25 with the first-visit offer (locals only, first visit, select days).",
                  },
                },
                {
                  "@type": "Question",
                  name: "Should I do the sauna or the cold plunge first?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sauna first. Heat makes the cold more approachable and sets up the classic contrast cycle of heat, cold, rest, repeat. Most people finish on cold and let the body rewarm naturally.",
                  },
                },
              ],
            }),
          }}
        />

        {/* Permalink */}
        <p className="text-xs text-gray-600 pt-4 border-t border-[#d7e2dc]">
          Permalink: swaywellnessspa.com/blog/cold-plunge-denver-guide
        </p>
      </div>
    </div>
  );
}
