"use client";

import Image from "next/image";
import Link from "next/link";

export default function ColdPlungeDenverLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center max-w-4xl">
          Cold Plunge in Denver: Where to Go
        </h1>
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
          src="/assets/coldplunge.jpg"
          alt="Wood-clad cold plunge tubs at Sway Wellness in Denver"
          width={900}
          height={500}
          className="rounded-xl w-full object-cover object-[center_60%] max-h-[500px]"
          priority
        />

        {/* Intro */}
        <p>
          Denver might be the best cold plunge city in the country. We sit a mile
          closer to the sun, we train hard, and half the city is already dunking
          in a creek by June. Whether you want a guided contrast circuit, a
          plunge pool big enough to share with friends, or a snowmelt river in
          the foothills, this guide covers every great way to get cold in
          Denver, starting with the{" "}
          <Link href="/cold-plunge" className="underline text-[#113D33] font-semibold">
            cold plunges
          </Link>{" "}
          at{" "}
          <Link href="/locations/denver-larimer" className="underline text-[#113D33] font-semibold">
            Sway Wellness Spa
          </Link>{" "}
          and the Sway Wellness Club locations in RiNo and Central Park.
        </p>

        {/* Table of Contents */}
        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Guide</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#how-cold" className="hover:underline">How Cold Is Cold? A Field Guide to the Temperatures</a></li>
            <li><a href="#sway" className="hover:underline">The Sway Plunges: Larimer, RiNo &amp; Central Park</a></li>
            <li><a href="#studios" className="hover:underline">More Places to Plunge Around Denver</a></li>
            <li><a href="#wild" className="hover:underline">Plunging in the Wild</a></li>
            <li><a href="#protocol" className="hover:underline">Your First Plunge: A 5-Step Protocol</a></li>
            <li><a href="#plans" className="hover:underline">Three Cold Days Worth Planning</a></li>
          </ol>
        </nav>

        {/* ============== Section 1: Temperature ladder ============== */}
        <h2 id="how-cold" className="text-2xl font-bold scroll-mt-24">
          How Cold Is Cold? A Field Guide to the Temperatures
        </h2>

        <p>
          Every plunge conversation starts with the same question: what
          temperature? Here is the honest map of the ranges, from a brisk
          first dip to full polar territory.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-[#d7e2dc] border-l-4 border-l-[#9CB7A9] p-5 space-y-1">
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-bold">The Gateway</h3>
              <span className="text-sm font-bold text-[#113D33]/50">60&ndash;65&deg;F</span>
            </div>
            <p className="text-[15px]">
              Brisk but friendly. Cooler than any swimming pool, warm enough to
              breathe through on your first try. A great place to learn what
              your nervous system does when the water bites.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#d7e2dc] border-l-4 border-l-[#5E8B7E] p-5 space-y-1">
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-bold">The Sweet Spot</h3>
              <span className="text-sm font-bold text-[#113D33]/50">50&ndash;59&deg;F</span>
            </div>
            <p className="text-[15px]">
              Where most of the research lives and where the{" "}
              <Link href="/remedy-tech" className="underline text-[#113D33] font-semibold">
                Remedy Room
              </Link>{" "}
              plunge at Sway Larimer is held. Cold enough to trigger the full
              response, sustainable enough to stay two or three minutes.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#d7e2dc] border-l-4 border-l-[#2F6155] p-5 space-y-1">
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-bold">The Deep End</h3>
              <span className="text-sm font-bold text-[#113D33]/50">40&ndash;49&deg;F</span>
            </div>
            <p className="text-[15px]">
              For experienced plungers chasing a bigger stimulus. Time in the
              water drops fast down here. Nobody should start in the 40s, but
              plenty of regulars end up loving them.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#d7e2dc] border-l-4 border-l-[#113D33] p-5 space-y-1">
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-bold">Polar Territory</h3>
              <span className="text-sm font-bold text-[#113D33]/50">Below 40&deg;F</span>
            </div>
            <p className="text-[15px]">
              Mountain runoff in May, or the coldest tubs in town. Seconds, not
              minutes. Bragging rights included, but earn your way down the
              ladder first.
            </p>
          </div>
        </div>

        {/* ============== Section 2: Sway ============== */}
        <h2 id="sway" className="text-2xl font-bold scroll-mt-24">
          The Sway Plunges: Larimer, RiNo &amp; Central Park
        </h2>

        <p>
          Sway runs three cold plunges across Denver, and each one is built
          around a different kind of session. Pick by neighborhood or by mood.
        </p>

        {/* Larimer feature card */}
        <div className="bg-white rounded-xl border border-[#d7e2dc] overflow-hidden">
          <Image
            src="/assets/remedy-room.jpg"
            alt="The Remedy Room contrast therapy circuit at Sway Wellness Spa on Larimer Square"
            width={900}
            height={400}
            className="w-full h-64 object-cover"
          />
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">The Remedy Room at Sway Larimer</h3>
              <span className="text-xs font-semibold text-[#113D33]/40 tracking-wide">Larimer Square</span>
            </div>
            <p>
              The{" "}
              <Link href="/remedy-tech" className="underline text-[#113D33] font-semibold">
                Remedy Room
              </Link>{" "}
              is a guided 40-minute contrast therapy circuit: a{" "}
              <Link href="/sauna" className="underline text-[#113D33] font-semibold">
                traditional sauna
              </Link>
              , a cold plunge held in the 50s, plus{" "}
              <Link href="/compression-therapy" className="underline text-[#113D33] font-semibold">
                compression therapy
              </Link>{" "}
              and LED light therapy to finish. You move through the full
              hot-cold cycle in one visit, no guesswork, right on Larimer
              Square. It is the easiest way in Denver to plunge properly on
              your first try.
            </p>
            <p className="text-[15px] text-[#113D33]/60">
              Drop-in is $49, members pay $25 per session. Denver locals can
              try their first Remedy Room session for $25 with our{" "}
              <Link href="/offers" className="underline font-semibold text-[#113D33]">
                first-visit offer
              </Link>{" "}
              (locals only, first visit, select days).
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
          <div className="bg-white rounded-xl border border-[#d7e2dc] p-6 space-y-3 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Sway Wellness Club RiNo</h3>
              <span className="text-xs font-semibold text-[#113D33]/40 tracking-wide">RiNo</span>
            </div>
            <p className="text-[15px]">
              The Remedy Lounge in RiNo is a 75-minute recovery session built
              around a big cold plunge pool, with a traditional sauna, infrared
              cabins, and compression therapy. The plunge here is the social
              one, the spot to bring a training partner and talk each other
              into one more round. Open daily, drop-ins welcome.
            </p>
            <Link
              href="/locations/denver-rino"
              className="inline-block text-[#113D33] font-semibold underline"
            >
              Visit Sway RiNo &rarr;
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-[#d7e2dc] p-6 space-y-3 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Sway Wellness Club Central Park</h3>
              <span className="text-xs font-semibold text-[#113D33]/40 tracking-wide">Central Park</span>
            </div>
            <p className="text-[15px]">
              Central Park runs three cold plunge cabins plus a hot soak, which
              means you can do true contrast rounds, hot water to cold water
              and back, alongside the traditional sauna, infrared cabins, and
              compression therapy. Morning sessions here are the local secret.
              Open daily, drop-ins welcome.
            </p>
            <Link
              href="/locations/denver-central-park"
              className="inline-block text-[#113D33] font-semibold underline"
            >
              Visit Sway Central Park &rarr;
            </Link>
          </div>
        </div>

        {/* Mid CTA */}
        <div className="bg-[#113D33] text-white rounded-xl p-8 text-center space-y-4">
          <p className="text-xl font-bold">Never Plunged Before?</p>
          <p className="text-sm opacity-90">
            The guided circuit at Sway Larimer is the friendliest first plunge
            in Denver, and locals can try it for $25 (first visit, select
            days). Members plunge for $25 every time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/locations/denver-larimer/book-remedy-room"
              className="inline-block bg-white text-[#113D33] font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition"
            >
              Book Your First Plunge
            </Link>
            <Link
              href="/membership"
              className="inline-block border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition"
            >
              See Memberships
            </Link>
          </div>
        </div>

        {/* ============== Section 3: Other studios ============== */}
        <h2 id="studios" className="text-2xl font-bold scroll-mt-24">
          More Places to Plunge Around Denver
        </h2>

        <p>
          Denver&apos;s cold water scene runs deep, and these spots are all
          worth knowing about. Different vibes, same shiver.
        </p>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Denver Sports Recovery</h3>
              <span className="text-xs font-semibold text-[#113D33]/40 tracking-wide">LoHi</span>
            </div>
            <p className="text-[15px]">
              A no-frills recovery gym popular with athletes, with cold tubs,
              sauna, and a full menu of recovery tools. If you want your plunge
              with a side of foam rollers and game-day energy, this is the one.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">SweatHouz (SWTHZ)</h3>
              <span className="text-xs font-semibold text-[#113D33]/40 tracking-wide">South Broadway &amp; Tennyson</span>
            </div>
            <p className="text-[15px]">
              Private suites with an infrared sauna and a cold plunge in each
              room. Good for people who want the contrast cycle completely to
              themselves, on their own clock.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">ROK SPAS</h3>
              <span className="text-xs font-semibold text-[#113D33]/40 tracking-wide">Union Station</span>
            </div>
            <p className="text-[15px]">
              Multiple plunges at stepped temperatures, running from the
              approachable end all the way down toward polar territory. A fun
              place to test where you actually sit on the temperature ladder.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Perspire Sauna Studio</h3>
              <span className="text-xs font-semibold text-[#113D33]/40 tracking-wide">Cherry Hills</span>
            </div>
            <p className="text-[15px]">
              An infrared sauna studio that added contrast therapy, pairing
              private infrared sessions with a cold plunge. South-side
              convenience if downtown is not your orbit.
            </p>
          </div>
        </div>

        {/* Visual break */}
        <Image
          src="/assets/cold_plunge.jpg"
          alt="Churning cold plunge water at Sway Wellness Spa"
          width={900}
          height={300}
          className="rounded-xl w-full object-cover max-h-[280px]"
        />

        {/* ============== Section 4: Wild ============== */}
        <h2 id="wild" className="text-2xl font-bold scroll-mt-24">
          Plunging in the Wild
        </h2>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Clear Creek</h3>
              <span className="text-xs font-semibold text-[#113D33]/40 tracking-wide">Golden · 25 min drive</span>
            </div>
            <p className="text-[15px]">
              Snowmelt straight off the Front Range, running cold well into
              summer. Find a calm eddy near the banks in Golden, skip the
              current, and never plunge moving water alone. Free, beautiful,
              and genuinely cold.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Mountain Lakes</h3>
              <span className="text-xs font-semibold text-[#113D33]/40 tracking-wide">Front Range · Summer</span>
            </div>
            <p className="text-[15px]">
              Alpine lakes above 10,000 feet stay in plunge territory all
              summer. Earn it with a hike, dip at the top, and pack a warm
              layer for after. The original cold plunge, no reservation
              required.
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

        {/* ============== Section 5: Protocol ============== */}
        <h2 id="protocol" className="text-2xl font-bold scroll-mt-24">
          Your First Plunge: A 5-Step Protocol
        </h2>

        <div className="bg-white border border-[#d7e2dc] rounded-xl p-6 space-y-4">
          <div className="flex gap-4">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#113D33] text-white text-sm font-bold">1</span>
            <p className="text-[15px] pt-1">
              <strong>Warm up first.</strong> Ten to fifteen minutes of sauna
              before the plunge makes the cold dramatically more approachable.
              This is why contrast circuits work so well for beginners.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#113D33] text-white text-sm font-bold">2</span>
            <p className="text-[15px] pt-1">
              <strong>Exhale on the way in.</strong> The gasp reflex is real.
              A long, slow exhale as you lower in keeps it from running the
              show.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#113D33] text-white text-sm font-bold">3</span>
            <p className="text-[15px] pt-1">
              <strong>Breathe slower than you want to.</strong> In through the
              nose, long exhale, shoulders down. The first 30 seconds are the
              loudest. It gets quiet after that.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#113D33] text-white text-sm font-bold">4</span>
            <p className="text-[15px] pt-1">
              <strong>Start with 30 to 60 seconds.</strong> That is a real
              plunge. Work toward two or three minutes over a few visits.
              Shivering hard or losing feeling means you are done.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#113D33] text-white text-sm font-bold">5</span>
            <p className="text-[15px] pt-1">
              <strong>Warm up naturally.</strong> Let your body do the
              rewarming, that after-drop buzz is the good part. Compression
              boots and a robe beat sprinting back into the sauna.
            </p>
          </div>
        </div>

        <p className="text-[15px] text-[#113D33]/60">
          One sensible caveat: cold water is a real stressor. If you are
          pregnant or have a heart condition, check with your doctor before
          plunging.
        </p>

        {/* ============== Section 6: Itineraries ============== */}
        <h2 id="plans" className="text-2xl font-bold scroll-mt-24">
          Three Cold Days Worth Planning
        </h2>

        <div className="space-y-4">
          <div className="bg-white border border-[#d7e2dc] rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#113D33] text-white text-sm font-bold">1</span>
              <p className="font-bold text-lg">The Lunch-Break Reset</p>
            </div>
            <ol className="list-decimal list-inside space-y-2 pl-11">
              <li>
                Book a midday{" "}
                <Link href="/locations/denver-larimer/book-remedy-room" className="underline text-[#113D33] font-semibold">
                  Remedy Room session
                </Link>{" "}
                at Sway Larimer (40 minutes, guided)
              </li>
              <li>Sauna, plunge, compression, done</li>
              <li>Back at your desk sharper than a third coffee could ever make you</li>
            </ol>
          </div>

          <div className="bg-white border border-[#d7e2dc] rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#113D33] text-white text-sm font-bold">2</span>
              <p className="font-bold text-lg">The Sunday Contrast Morning</p>
            </div>
            <ol className="list-decimal list-inside space-y-2 pl-11">
              <li>
                Morning Remedy Lounge session at{" "}
                <Link href="/locations/denver-central-park" className="underline text-[#113D33] font-semibold">
                  Sway Central Park
                </Link>
                , rotating hot soak and cold cabins
              </li>
              <li>Finish with compression therapy while everyone else is still in line for brunch</li>
              <li>Then go be the calmest person at that brunch</li>
            </ol>
          </div>

          <div className="bg-white border border-[#d7e2dc] rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#113D33] text-white text-sm font-bold">3</span>
              <p className="font-bold text-lg">The Mountain Double</p>
            </div>
            <ol className="list-decimal list-inside space-y-2 pl-11">
              <li>Morning hike out of Golden, quick Clear Creek dip if conditions are safe</li>
              <li>
                Evening session at{" "}
                <Link href="/locations/denver-rino" className="underline text-[#113D33] font-semibold">
                  Sway RiNo
                </Link>
                , sauna and the big plunge pool
              </li>
              <li>
                Sore from the trail? Add a{" "}
                <Link href="/massages" className="underline text-[#113D33] font-semibold">
                  massage at Sway Larimer
                </Link>{" "}
                the next day
              </li>
            </ol>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-[#113D33] text-white rounded-xl p-8 text-center space-y-4">
          <p className="text-xl font-bold">Get In. We&apos;ll Keep It Cold.</p>
          <p className="text-sm opacity-90">
            Three plunges across Denver: guided contrast at Larimer, the big
            pool in RiNo, and contrast cabins in Central Park. All open daily.{" "}
            <Link href="/membership" className="underline font-semibold">Members</Link>
            {" "}plunge from $25 a session, and a{" "}
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
              RiNo and Central Park clubs welcome drop-ins daily. Members pay
              $25 per Remedy Room session, and Denver locals can try their
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
                    text: "No. The Remedy Room at Sway Larimer is $49 as a drop-in, and the RiNo and Central Park clubs welcome drop-ins daily. Members pay $25 per Remedy Room session, and Denver locals can try their first session for $25 with the first-visit offer (locals only, first visit, select days).",
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
