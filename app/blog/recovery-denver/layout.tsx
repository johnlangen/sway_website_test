"use client";

import Image from "next/image";
import Link from "next/link";

export default function RecoveryDenverBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center max-w-4xl">
          Recovery in Denver: Sauna, Cold Plunge, Compression &amp; Robot Massage
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        {/* Back + Date + Tag */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">
            &larr; Back to Blog
          </Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
            Recovery
          </span>
          <span className="text-gray-500">June 2026 · By Sway Wellness Team</span>
        </div>

        {/* Hero Image */}
        <Image
          src="/assets/remedy-room.jpg"
          alt="The Remedy Room recovery circuit at Sway Wellness Spa in Denver"
          width={900}
          height={500}
          className="rounded-xl w-full object-cover max-h-[500px]"
          priority
        />

        {/* Intro */}
        <p>
          Recovery has become its own reason to visit a spa. In Denver, more
          people are building a regular routine around sauna, cold plunge, and
          compression than ever before, not as a one-off treat but as a way to
          sleep better, train harder, and feel sharper day to day. This is a
          complete guide to science-backed recovery in Denver, including how to
          combine the modalities and where to experience all of them under one
          roof at{" "}
          <Link href="/locations/denver-larimer" className="underline text-[#113D33] font-semibold">
            Sway Wellness Spa on Larimer Square
          </Link>
          .
        </p>

        {/* Table of Contents */}
        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Guide</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#remedy-room" className="hover:underline">The Remedy Room: Denver&apos;s Recovery Circuit</a></li>
            <li><a href="#sauna" className="hover:underline">Traditional Sauna</a></li>
            <li><a href="#cold-plunge" className="hover:underline">Cold Plunge</a></li>
            <li><a href="#compression" className="hover:underline">Compression &amp; LED Light Therapy</a></li>
            <li><a href="#aescape" className="hover:underline">Aescape: AI-Powered Robot Massage</a></li>
            <li><a href="#routine" className="hover:underline">How to Build a Recovery Routine</a></li>
            <li><a href="#visit" className="hover:underline">Where to Recover in Denver</a></li>
          </ol>
        </nav>

        {/* ============== Section 1: Remedy Room ============== */}
        <h2 id="remedy-room" className="text-2xl font-bold scroll-mt-24">
          The Remedy Room: Denver&apos;s Recovery Circuit
        </h2>

        <div className="bg-white rounded-xl border border-[#d7e2dc] overflow-hidden">
          <Image
            src="/assets/recover_room.jpg"
            alt="The Remedy Room at Sway Wellness Spa in Denver"
            width={900}
            height={400}
            className="w-full h-64 object-cover"
          />
          <div className="p-6 space-y-4">
            <p>
              The{" "}
              <Link href="/remedy-tech" className="underline text-[#113D33] font-semibold">
                Remedy Room
              </Link>{" "}
              at Sway is a guided 40-minute recovery circuit that brings four
              modalities together in one space: traditional sauna, cold plunge,
              compression therapy, and LED light therapy. Rather than booking
              each tool separately around the city, you move through the full
              contrast cycle in a single visit.
            </p>
            <p className="text-[15px] text-[#113D33]/60">
              Member access is $25 per session and drop-in is $49, which makes
              consistent recovery realistic instead of a once-in-a-while splurge.
            </p>
            <Link
              href="/locations/denver-larimer/book-remedy-room"
              className="inline-block bg-[#113D33] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0e322b] transition"
            >
              Book the Remedy Room
            </Link>
          </div>
        </div>

        {/* ============== Section 2: Sauna ============== */}
        <h2 id="sauna" className="text-2xl font-bold scroll-mt-24">
          Traditional Sauna
        </h2>

        <div className="bg-white rounded-xl border border-[#d7e2dc] overflow-hidden md:flex">
          <div className="md:w-2/5 h-56 md:h-auto overflow-hidden">
            <Image
              src="/assets/insidesauna.jpg"
              alt="Inside the traditional sauna at Sway Wellness Spa"
              width={500}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 space-y-4 md:w-3/5">
            <p>
              Sway uses a{" "}
              <Link href="/sauna" className="underline text-[#113D33] font-semibold">
                traditional sauna
              </Link>
              , the dry, high-heat style that warms the air around you. Heat
              exposure relaxes muscles, supports circulation, and triggers the
              deep sweat associated with stress relief and post-workout recovery.
            </p>
            <ul className="space-y-2 text-[15px]">
              <li className="flex gap-2"><span className="text-[#9CB7A9]">&#9679;</span><span><strong>Eases muscle tension</strong> through sustained, even heat.</span></li>
              <li className="flex gap-2"><span className="text-[#9CB7A9]">&#9679;</span><span><strong>Improves circulation</strong> as heat dilates blood vessels.</span></li>
              <li className="flex gap-2"><span className="text-[#9CB7A9]">&#9679;</span><span><strong>Lowers stress</strong> by giving the nervous system a chance to settle.</span></li>
            </ul>
          </div>
        </div>

        {/* ============== Section 3: Cold Plunge ============== */}
        <h2 id="cold-plunge" className="text-2xl font-bold scroll-mt-24">
          Cold Plunge
        </h2>

        <div className="bg-white rounded-xl border border-[#d7e2dc] overflow-hidden md:flex md:flex-row-reverse">
          <div className="md:w-2/5 h-56 md:h-auto overflow-hidden">
            <Image
              src="/assets/cold_plunge.jpg"
              alt="Cold plunge at Sway Wellness Spa in Denver"
              width={500}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 space-y-4 md:w-3/5">
            <p>
              A{" "}
              <Link href="/cold-plunge" className="underline text-[#113D33] font-semibold">
                cold plunge
              </Link>{" "}
              immerses the body in water held around 50 to 59&deg;F. Cold exposure
              constricts blood vessels to help reduce post-workout soreness and
              inflammation, and many people find the short, sharp cold leaves them
              noticeably more alert and clear-headed.
            </p>
            <ul className="space-y-2 text-[15px]">
              <li className="flex gap-2"><span className="text-[#9CB7A9]">&#9679;</span><span><strong>Reduces soreness</strong> and supports faster recovery after training.</span></li>
              <li className="flex gap-2"><span className="text-[#9CB7A9]">&#9679;</span><span><strong>Boosts alertness</strong> and mood through the cold-water response.</span></li>
              <li className="flex gap-2"><span className="text-[#9CB7A9]">&#9679;</span><span><strong>Pairs with sauna</strong> for a complete hot-cold contrast cycle.</span></li>
            </ul>
          </div>
        </div>

        {/* Mid CTA: contrast cycle */}
        <div className="bg-[#113D33] text-white rounded-xl p-8 text-center space-y-4">
          <p className="text-xl font-bold">The Heart of Every Recovery Session</p>
          <p className="text-sm opacity-90">
            Alternating sauna and cold plunge, the classic contrast cycle, is the
            core of a good recovery routine. At Sway you get both in one guided
            visit.
          </p>
          <Link
            href="/locations/denver-larimer/book-remedy-room"
            className="inline-block bg-white text-[#113D33] font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Book the Remedy Room
          </Link>
        </div>

        {/* ============== Section 4: Compression + LED ============== */}
        <h2 id="compression" className="text-2xl font-bold scroll-mt-24">
          Compression &amp; LED Light Therapy
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-md transition">
            <div className="h-44 overflow-hidden">
              <Image
                src="/assets/compression_therapy.jpg"
                alt="Compression therapy boots at Sway Wellness Spa"
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 space-y-2">
              <h3 className="text-lg font-bold">Compression Therapy</h3>
              <p className="text-[15px]">
                Sequential compression boots gently squeeze the legs in rhythm,
                encouraging circulation and supporting lymphatic drainage. It is
                the same category of recovery tool athletes use to flush tired
                legs, and it feels deeply relaxing.
              </p>
            </div>
          </div>

          <div id="led" className="bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-md transition scroll-mt-24">
            <div className="h-44 overflow-hidden">
              <Image
                src="/assets/boost-led.jpg"
                alt="LED light therapy at Sway Wellness Spa"
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 space-y-2">
              <h3 className="text-lg font-bold">LED Light Therapy</h3>
              <p className="text-[15px]">
                <Link href="/led-light-therapy" className="underline text-[#113D33] font-semibold">
                  LED light therapy
                </Link>{" "}
                uses targeted wavelengths of light to calm inflammation, support
                skin repair, and round out the circuit with a skin-focused
                benefit. It is non-invasive and a natural complement to the heat
                and cold.
              </p>
            </div>
          </div>
        </div>

        {/* Visual break */}
        <Image
          src="/assets/remedy-room2.jpg"
          alt="Recovery space at Sway Wellness Spa in Denver"
          width={900}
          height={300}
          className="rounded-xl w-full object-cover max-h-[280px]"
        />

        {/* ============== Section 5: Aescape ============== */}
        <h2 id="aescape" className="text-2xl font-bold scroll-mt-24">
          Aescape: AI-Powered Robot Massage
        </h2>

        <div className="bg-white rounded-xl border border-[#d7e2dc] overflow-hidden">
          <Image
            src="/assets/aescape-treatment.jpg"
            alt="Aescape AI-powered robot massage at Sway Wellness Spa in Denver"
            width={900}
            height={400}
            className="w-full h-64 object-cover"
          />
          <div className="p-6 space-y-4">
            <p>
              Sway is one of the first wellness clubs in the country, and the
              first in Denver, to offer{" "}
              <Link href="/aescape" className="underline text-[#113D33] font-semibold">
                Aescape
              </Link>
              , a fully autonomous AI-powered robot massage. Aescape maps your
              body with more than a million data points and delivers consistent,
              customizable pressure, with sessions available in 15, 30, 45, or
              60-minute lengths.
            </p>
            <p className="text-[15px] text-[#113D33]/60">
              Precise, repeatable recovery on your schedule, and a genuinely
              one-of-a-kind experience in the city.
            </p>
            <Link
              href="/locations/denver-larimer/book-aescape"
              className="inline-block bg-[#113D33] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0e322b] transition"
            >
              Book an Aescape Session
            </Link>
          </div>
        </div>

        {/* Pull quote */}
        <div className="border-l-4 border-[#9CB7A9] pl-6 py-2">
          <p className="text-xl text-[#113D33] italic">
            The biggest gains come from consistency, not intensity. The members
            who feel the difference most are the ones who fold recovery into
            their week.
          </p>
        </div>

        {/* ============== Section 6: Routine ============== */}
        <h2 id="routine" className="text-2xl font-bold scroll-mt-24">
          How to Build a Recovery Routine
        </h2>

        <div className="space-y-4">
          <div className="bg-white border border-[#d7e2dc] rounded-xl p-6 flex items-start gap-4">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#113D33] text-white text-sm font-bold">1</span>
            <div>
              <p className="font-bold text-lg">Warm first</p>
              <p className="text-[15px] mt-1">Start in the traditional sauna to loosen up and raise your core temperature.</p>
            </div>
          </div>
          <div className="bg-white border border-[#d7e2dc] rounded-xl p-6 flex items-start gap-4">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#113D33] text-white text-sm font-bold">2</span>
            <div>
              <p className="font-bold text-lg">Contrast</p>
              <p className="text-[15px] mt-1">Alternate sauna and cold plunge for a few rounds. This is the core of the session.</p>
            </div>
          </div>
          <div className="bg-white border border-[#d7e2dc] rounded-xl p-6 flex items-start gap-4">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#113D33] text-white text-sm font-bold">3</span>
            <div>
              <p className="font-bold text-lg">Flush</p>
              <p className="text-[15px] mt-1">Finish with compression therapy and LED light therapy to support circulation and skin.</p>
            </div>
          </div>
          <div className="bg-white border border-[#d7e2dc] rounded-xl p-6 flex items-start gap-4">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#113D33] text-white text-sm font-bold">4</span>
            <div>
              <p className="font-bold text-lg">Layer in massage</p>
              <p className="text-[15px] mt-1">
                On training days, add an{" "}
                <Link href="/aescape" className="underline text-[#113D33] font-semibold">Aescape</Link>{" "}
                session or a{" "}
                <Link href="/massages" className="underline text-[#113D33] font-semibold">therapeutic massage</Link>.
              </p>
            </div>
          </div>
        </div>

        {/* ============== Section 7: Visit / Final CTA ============== */}
        <h2 id="visit" className="text-2xl font-bold scroll-mt-24">
          Where to Recover in Denver
        </h2>

        <p>
          You will find all of this at Sway Wellness Spa, 1428 Larimer St. on
          Larimer Square in downtown Denver. Sway was voted #4 Best Day Spa in
          America by USA Today 10Best. Please plan to arrive 15 minutes early so
          you can settle in and get the most from your session.
        </p>

        <div className="bg-[#113D33] text-white rounded-xl p-8 text-center space-y-4">
          <p className="text-xl font-bold">Ready to Recover?</p>
          <p className="text-sm opacity-90">
            Book the Remedy Room, an Aescape session, or a massage at Denver&apos;s
            award-winning wellness club.{" "}
            <Link href="/membership" className="underline font-semibold">Members</Link>{" "}
            get member pricing on every session.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/locations/denver-larimer/book-remedy-room"
              className="inline-block bg-white text-[#113D33] font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition"
            >
              Book the Remedy Room
            </Link>
            <Link
              href="/membership"
              className="inline-block border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition"
            >
              View Memberships
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
            <p className="font-bold">Where can I do sauna and cold plunge in Denver?</p>
            <p className="text-gray-700 mt-2 text-[15px]">
              Sway Wellness Spa on Larimer Square in downtown Denver offers a
              traditional sauna and cold plunge together as part of the Remedy
              Room, a guided 40-minute recovery circuit that also includes
              compression therapy and LED light therapy. Member access is $25 per
              session and drop-in is $49.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
            <p className="font-bold">What is the Remedy Room at Sway?</p>
            <p className="text-gray-700 mt-2 text-[15px]">
              The Remedy Room is Sway&apos;s guided 40-minute recovery circuit in
              Denver. It combines four modalities in one space: traditional sauna,
              cold plunge, compression therapy, and LED light therapy, designed to
              deliver a complete hot-cold contrast cycle in a single visit.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
            <p className="font-bold">Does Denver have a robot massage?</p>
            <p className="text-gray-700 mt-2 text-[15px]">
              Yes. Sway Wellness Spa was the first in Denver to offer Aescape, a
              fully autonomous AI-powered robot massage. Aescape maps the body
              with more than a million data points and delivers customizable
              pressure, with sessions available in 15, 30, 45, or 60-minute
              lengths.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
            <p className="font-bold">What is the best order for a recovery session?</p>
            <p className="text-gray-700 mt-2 text-[15px]">
              A simple, effective routine is to warm up in the traditional sauna,
              alternate sauna and cold plunge for a few contrast rounds, then
              finish with compression therapy and LED light therapy. On training
              days, add an Aescape robot massage or a therapeutic massage.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        <div className="pt-10 space-y-6">
          <h2 className="text-2xl font-bold">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              href="/blog/aescape"
              className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-36 overflow-hidden">
                <Image
                  src="/assets/aescapeblog3.jpg"
                  alt="Aescape AI massage at Sway"
                  width={400}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">
                  AI Meets Recovery: Reset with Aescape
                </p>
              </div>
            </Link>
            <Link
              href="/blog/80-minute-massage"
              className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-36 overflow-hidden">
                <Image
                  src="/assets/blog25.jpg"
                  alt="Why an 80-minute massage is the ultimate reset"
                  width={400}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">
                  Why an 80-Minute Massage Is the Ultimate Reset
                </p>
              </div>
            </Link>
            <Link
              href="/blog/salt-stone-vs-hot-stone-massage"
              className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-36 overflow-hidden">
                <Image
                  src="/assets/saltstoneblog.jpg"
                  alt="Salt stone vs hot stone massage"
                  width={400}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">
                  Salt Stone vs Hot Stone Massage
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Permalink */}
        <p className="text-xs text-gray-400 pt-4 border-t border-[#d7e2dc]">
          Permalink: swaywellnessspa.com/blog/recovery-denver
        </p>
      </div>
    </div>
  );
}
