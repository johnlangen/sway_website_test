"use client";

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
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Recovery</span>
          <span className="text-gray-500">June 2026 · By Sway Wellness Team</span>
        </div>

        <p>
          Recovery has become its own reason to visit a spa. In Denver, more
          people are building a regular routine around sauna, cold plunge, and
          compression than ever before, not as a one-off treat but as a way to
          sleep better, train harder, and feel sharper day to day. This is a
          complete guide to science-backed recovery in Denver, including how to
          combine the modalities and where to experience all of them under one
          roof at{" "}
          <Link href="/locations/denver-larimer" className="text-[#113D33] font-semibold hover:underline">
            Sway Wellness Spa on Larimer Square
          </Link>
          .
        </p>

        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Guide</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#remedy-room" className="hover:underline">The Remedy Room: Denver&apos;s Recovery Circuit</a></li>
            <li><a href="#sauna" className="hover:underline">Traditional Sauna</a></li>
            <li><a href="#cold-plunge" className="hover:underline">Cold Plunge</a></li>
            <li><a href="#compression" className="hover:underline">Compression Therapy</a></li>
            <li><a href="#led" className="hover:underline">LED Light Therapy</a></li>
            <li><a href="#aescape" className="hover:underline">Aescape: AI-Powered Robot Massage</a></li>
            <li><a href="#routine" className="hover:underline">How to Build a Recovery Routine</a></li>
            <li><a href="#visit" className="hover:underline">Where to Recover in Denver</a></li>
          </ol>
        </nav>

        <h2 id="remedy-room" className="text-2xl font-bold scroll-mt-24">The Remedy Room: Denver&apos;s Recovery Circuit</h2>
        <p>
          The{" "}
          <Link href="/remedy-tech" className="text-[#113D33] font-semibold hover:underline">
            Remedy Room
          </Link>{" "}
          at Sway is a guided 40-minute recovery circuit that brings four
          modalities together in one space: traditional sauna, cold plunge,
          compression therapy, and LED light therapy. Rather than booking each
          tool separately around the city, you move through the full contrast
          cycle in a single visit. Member access is $25 per session and drop-in
          is $49, which makes consistent recovery realistic instead of a
          once-in-a-while splurge.
        </p>

        <h2 id="sauna" className="text-2xl font-bold scroll-mt-24">Traditional Sauna</h2>
        <p>
          Sway uses a{" "}
          <Link href="/sauna" className="text-[#113D33] font-semibold hover:underline">
            traditional sauna
          </Link>
          , the dry, high-heat style that warms the air around you. Heat
          exposure relaxes muscles, supports circulation as blood vessels
          dilate, and triggers the deep sweat associated with stress relief and
          post-workout recovery. A few quiet minutes in the sauna is also one of
          the simplest ways to down-shift after a long day.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Eases muscle tension</strong> through sustained, even heat.</li>
          <li><strong>Improves circulation</strong> as heat dilates blood vessels.</li>
          <li><strong>Lowers stress</strong> by giving the nervous system a chance to settle.</li>
        </ul>

        <h2 id="cold-plunge" className="text-2xl font-bold scroll-mt-24">Cold Plunge</h2>
        <p>
          A{" "}
          <Link href="/cold-plunge" className="text-[#113D33] font-semibold hover:underline">
            cold plunge
          </Link>{" "}
          immerses the body in water held around 50 to 59°F. Cold exposure
          constricts blood vessels to help reduce post-workout soreness and
          inflammation, and many people find the short, sharp cold leaves them
          noticeably more alert and clear-headed. Alternating sauna and cold
          plunge, the classic contrast cycle, is the heart of a good recovery
          session.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Reduces soreness</strong> and supports faster recovery after training.</li>
          <li><strong>Boosts alertness</strong> and mood through the cold-water response.</li>
          <li><strong>Pairs with sauna</strong> for a complete hot-cold contrast cycle.</li>
        </ul>

        <h2 id="compression" className="text-2xl font-bold scroll-mt-24">Compression Therapy</h2>
        <p>
          Compression therapy uses sequential compression boots that gently
          squeeze the legs in rhythm, encouraging circulation and supporting
          lymphatic drainage. It is the same category of recovery tool used by
          athletes to flush tired legs, and it feels deeply relaxing, which is
          why it is one of the most popular stops in the Remedy Room.
        </p>

        <h2 id="led" className="text-2xl font-bold scroll-mt-24">LED Light Therapy</h2>
        <p>
          <Link href="/led-light-therapy" className="text-[#113D33] font-semibold hover:underline">
            LED light therapy
          </Link>{" "}
          uses targeted wavelengths of light to calm inflammation, support skin
          repair, and round out the recovery circuit with a skin-focused
          benefit. It is non-invasive, comfortable, and a natural complement to
          the heat and cold of the rest of the room.
        </p>

        <h2 id="aescape" className="text-2xl font-bold scroll-mt-24">Aescape: AI-Powered Robot Massage</h2>
        <p>
          Sway is one of the first wellness clubs in the country, and the first
          in Denver, to offer{" "}
          <Link href="/aescape" className="text-[#113D33] font-semibold hover:underline">
            Aescape
          </Link>
          , a fully autonomous AI-powered robot massage. Aescape maps your body
          with more than a million data points and delivers consistent,
          customizable pressure, with sessions available in 15, 30, 45, or
          60-minute lengths. It is precise, repeatable recovery on your
          schedule, and a genuinely one-of-a-kind experience in the city.
        </p>

        <h2 id="routine" className="text-2xl font-bold scroll-mt-24">How to Build a Recovery Routine</h2>
        <p>
          The biggest gains come from consistency, not intensity. A simple,
          repeatable structure works for most people:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Warm first:</strong> start in the traditional sauna to loosen up.</li>
          <li><strong>Contrast:</strong> alternate sauna and cold plunge a few rounds.</li>
          <li><strong>Flush:</strong> finish with compression therapy and LED light therapy.</li>
          <li><strong>Layer in massage:</strong> add an Aescape session or a therapeutic massage on training days.</li>
        </ul>
        <p>
          Members who fold the Remedy Room into their week, rather than saving
          it for a big occasion, tend to feel the difference most.
        </p>

        <h2 id="visit" className="text-2xl font-bold scroll-mt-24">Where to Recover in Denver</h2>
        <p>
          You will find all of this at Sway Wellness Spa, 1428 Larimer St. on
          Larimer Square in downtown Denver. Sway was voted #4 Best Day Spa in
          America by USA Today 10Best. Please plan to arrive 15 minutes early so
          you can settle in and get the most from your session.
        </p>

        <div className="bg-white rounded-2xl p-8 text-center shadow-[0_10px_30px_-18px_rgba(17,61,51,0.25)]">
          <h3 className="text-xl md:text-2xl font-bold">Ready to recover?</h3>
          <p className="mt-2 opacity-70">
            Book the Remedy Room, an Aescape session, or a massage at Denver&apos;s
            award-winning wellness club.
          </p>
          <Link
            href="/locations/denver-larimer"
            className="mt-5 inline-flex items-center justify-center bg-[#113D33] text-white px-8 py-3.5 text-sm font-semibold rounded-full hover:bg-[#0d2f28] transition"
          >
            Book at Sway Larimer
          </Link>
        </div>
      </div>
    </div>
  );
}
