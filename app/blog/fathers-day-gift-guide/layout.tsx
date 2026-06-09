"use client";

import Image from "next/image";
import Link from "next/link";

export default function FathersDayGiftGuideLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-24 pb-12 md:pt-32 md:pb-20 flex justify-center items-center px-4">
        <h1 className="text-[26px] leading-tight md:text-5xl font-bold text-center max-w-3xl">
          A Father&apos;s Day in Denver Your Dad Will Actually Remember
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16 space-y-6 md:space-y-8 text-[17px] leading-relaxed">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">
            &larr; Back to Blog
          </Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
            Holiday
          </span>
          <span className="text-gray-500">May 2026 · By Sway Wellness Team</span>
        </div>

        <p className="text-xl font-semibold text-[#113D33]">
          He has enough ties. He has enough mugs. He has, somewhere in a
          drawer, the grilling tools you got him in 2019.
        </p>
        <p>
          Father&apos;s Day is June 21 this year. You have about a month, and the
          good news is that the best gift for the dad in your life takes ten
          seconds to book and zero seconds to wrap. This is our actual,
          unfiltered guide to giving Dad a day he will text his friends
          about, here in downtown Denver.
        </p>

        {/* ─────────────────────────────────────────── */}
        <h2 className="text-[22px] sm:text-2xl md:text-3xl font-bold pt-4">
          For the Dad Who&hellip;
        </h2>
        <p className="text-[#113D33]/70">
          Pick the one that sounds like him. Click. Done.
        </p>

        {/* Persona cards — image left on desktop, image top on mobile */}
        <div className="bg-white border-l-4 border-[#9CB7A9] rounded-xl overflow-hidden shadow-sm">
          <div className="flex flex-col sm:flex-row sm:min-h-[14rem]">
            <div className="w-full sm:w-56 h-44 sm:h-auto shrink-0 overflow-hidden bg-[#eae7db]">
              <Image
                src="/assets/cold_plunge.jpg"
                alt="Cold plunge in The Remedy Room at Sway Wellness Spa"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 sm:p-6 space-y-2 flex-1">
              <p className="font-bold text-lg">&hellip; thinks recovery is a personality.</p>
              <p>
                The dad who listens to Huberman on the drive in, owns a foam
                roller, and would buy a cold plunge if he had the basement
                space. Get him{" "}
                <Link
                  href="/locations/denver-larimer/book-remedy-room"
                  className="font-semibold text-[#113D33] underline underline-offset-2"
                >
                  The Remedy Room
                </Link>
                . 40 minutes, cold plunge plus traditional sauna with a
                relaxation space in between. $49, or $25 if he is already
                a member.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border-l-4 border-[#9CB7A9] rounded-xl overflow-hidden shadow-sm">
          <div className="flex flex-col sm:flex-row sm:min-h-[14rem]">
            <div className="w-full sm:w-56 h-44 sm:h-auto shrink-0 overflow-hidden bg-[#eae7db]">
              <Image
                src="/assets/massage2.jpg"
                alt="Deep tissue sports massage at Sway Wellness Spa Denver"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 sm:p-6 space-y-2 flex-1">
              <p className="font-bold text-lg">&hellip; says &ldquo;my back is killing me&rdquo; every Sunday.</p>
              <p>
                The dad with a desk job and a 9-year-old who wants to be
                picked up nonstop. He needs a proper{" "}
                <Link
                  href="/locations/denver-larimer/book-service?category=massage"
                  className="font-semibold text-[#113D33] underline underline-offset-2"
                >
                  deep tissue or sports massage
                </Link>
                . 80 minutes if you love him. Add the CBD CauseMedic finisher
                for the knot under his right shoulder blade he has been
                talking about for three years.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border-l-4 border-[#9CB7A9] rounded-xl overflow-hidden shadow-sm">
          <div className="flex flex-col sm:flex-row sm:min-h-[14rem]">
            <div className="w-full sm:w-56 h-44 sm:h-auto shrink-0 overflow-hidden bg-[#eae7db]">
              <Image
                src="/assets/aescapeblog3.jpg"
                alt="Aescape AI robotic massage table at Sway Wellness Spa"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 sm:p-6 space-y-2 flex-1">
              <p className="font-bold text-lg">&hellip; pre-orders every new gadget.</p>
              <p>
                The tech dad who already knows what Aescape is, or the one
                who does not but will not stop talking about it after he
                tries it.{" "}
                <Link
                  href="/locations/denver-larimer/book-aescape"
                  className="font-semibold text-[#113D33] underline underline-offset-2"
                >
                  Aescape AI massage
                </Link>{" "}
                is a robot-driven, no-oil, fully-clothed (compression apparel
                provided at check-in) full-body massage that maps his body
                in 3D. Sessions start at 15 minutes for $49.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border-l-4 border-[#9CB7A9] rounded-xl overflow-hidden shadow-sm">
          <div className="flex flex-col sm:flex-row sm:min-h-[14rem]">
            <div className="w-full sm:w-56 h-44 sm:h-auto shrink-0 overflow-hidden bg-[#eae7db]">
              <Image
                src="/assets/giftcard.jpg"
                alt="Sway Wellness Spa gift card"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 sm:p-6 space-y-2 flex-1">
              <p className="font-bold text-lg">&hellip; has everything and wants nothing.</p>
              <p>
                The dad who tells you not to get him anything every single
                year and means it. Give him a{" "}
                <Link
                  href="/fathers-day-gift-cards"
                  className="font-semibold text-[#113D33] underline underline-offset-2"
                >
                  Sway gift card
                </Link>
                . Any amount. Never expires. Works on every service, every
                add-on, and in the Sway Shop. He picks the experience,
                you get the credit.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border-l-4 border-[#9CB7A9] rounded-xl overflow-hidden shadow-sm">
          <div className="flex flex-col sm:flex-row sm:min-h-[14rem]">
            <div className="w-full sm:w-56 h-44 sm:h-auto shrink-0 overflow-hidden bg-[#eae7db]">
              <Image
                src="/assets/homepage_photo_outside.jpg"
                alt="Sway Wellness Spa on Larimer Square in downtown Denver"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 sm:p-6 space-y-2 flex-1">
              <p className="font-bold text-lg">&hellip; needs to make this a habit, not a holiday.</p>
              <p>
                For the dad whose stress level is the thing you are actually
                worried about. A{" "}
                <Link
                  href="/locations/denver-larimer/membership"
                  className="font-semibold text-[#113D33] underline underline-offset-2"
                >
                  Sway membership
                </Link>{" "}
                puts a monthly treatment on the calendar, gives him member
                pricing on everything else, and turns recovery from a
                once-a-year event into a routine. This is the big one. It is
                also the gift that keeps showing up after June 21.
              </p>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────── */}
        <h2 className="text-[22px] sm:text-2xl md:text-3xl font-bold pt-6 md:pt-8">
          The Itinerary: A Sway-Anchored Father&apos;s Day in Denver
        </h2>
        <p>
          For the planner. Drop him off, hand him a coffee, do not let him
          carry anything. Here is the day, in the order it should happen.
        </p>

        <div className="relative">
          {/* Vertical line behind the badges */}
          <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-[#113D33]/15 z-0" />

          <div className="space-y-4 relative">
            {/* Step 1 — Arrive */}
            <div className="flex gap-4 items-start relative">
              <div className="w-10 h-10 rounded-full bg-[#113D33] text-white flex items-center justify-center shrink-0 z-10 shadow-md">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                  <path d="M9 21V9h6v12" />
                  <path d="M3 9l9-7 9 7v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                </svg>
              </div>
              <div className="flex-1 bg-white rounded-xl p-5 border border-[#d7e2dc] shadow-sm">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-xs uppercase tracking-wider text-[#113D33]/60 font-semibold">10:15 AM</span>
                  <span className="font-bold text-[#113D33]">Arrive at Sway</span>
                </div>
                <p className="text-[15px] mt-1.5">
                  1428 Larimer Street. We tell guests to arrive 15 minutes
                  early for a reason. Let him decompress before the first
                  treatment.
                </p>
              </div>
            </div>

            {/* Step 2 — Remedy Room */}
            <div className="flex gap-4 items-start relative">
              <div className="w-10 h-10 rounded-full bg-[#113D33] text-white flex items-center justify-center shrink-0 z-10 shadow-md">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                  <path d="M12 3l6 7a6 6 0 1 1-12 0l6-7z" />
                </svg>
              </div>
              <div className="flex-1 bg-white rounded-xl p-5 border border-[#d7e2dc] shadow-sm">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-xs uppercase tracking-wider text-[#113D33]/60 font-semibold">10:30 AM</span>
                  <span className="font-bold text-[#113D33]">The Remedy Room</span>
                </div>
                <p className="text-[15px] mt-1.5">
                  40 minutes of contrast therapy. Cold plunge, traditional
                  sauna, a moment to reset between. He will come out talking
                  about it.
                </p>
              </div>
            </div>

            {/* Step 3 — Massage */}
            <div className="flex gap-4 items-start relative">
              <div className="w-10 h-10 rounded-full bg-[#113D33] text-white flex items-center justify-center shrink-0 z-10 shadow-md">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                  <path d="M7 11c0-2 1-4 3-4s3 2 3 4v3a3 3 0 0 1-6 0v-3z" />
                  <path d="M13 11c0-2 1-4 3-4s3 2 3 4v3a3 3 0 0 1-6 0" />
                  <path d="M10 16v4" />
                  <path d="M16 16v4" />
                </svg>
              </div>
              <div className="flex-1 bg-white rounded-xl p-5 border border-[#d7e2dc] shadow-sm">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-xs uppercase tracking-wider text-[#113D33]/60 font-semibold">11:15 AM</span>
                  <span className="font-bold text-[#113D33]">80-minute massage</span>
                </div>
                <p className="text-[15px] mt-1.5">
                  Deep tissue or sports. By now his nervous system has caught
                  up. This is when the actual work happens.
                </p>
              </div>
            </div>

            {/* Step 4 — Sway Shop */}
            <div className="flex gap-4 items-start relative">
              <div className="w-10 h-10 rounded-full bg-[#113D33] text-white flex items-center justify-center shrink-0 z-10 shadow-md">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <div className="flex-1 bg-white rounded-xl p-5 border border-[#d7e2dc] shadow-sm">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-xs uppercase tracking-wider text-[#113D33]/60 font-semibold">12:45 PM</span>
                  <span className="font-bold text-[#113D33]">Sway Shop</span>
                </div>
                <p className="text-[15px] mt-1.5">
                  Stop by the Sway Shop on the way out. CauseMedic muscle
                  cream, recovery tea, or a small something to extend the
                  day at home.
                </p>
              </div>
            </div>

            {/* Step 5 — Lunch */}
            <div className="flex gap-4 items-start relative">
              <div className="w-10 h-10 rounded-full bg-[#113D33] text-white flex items-center justify-center shrink-0 z-10 shadow-md">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                  <path d="M7 3v18" />
                  <path d="M5 3v6a2 2 0 0 0 4 0V3" />
                  <path d="M15 3v18" />
                  <path d="M15 13c0-3 2-5 4-5v10" />
                </svg>
              </div>
              <div className="flex-1 bg-white rounded-xl p-5 border border-[#d7e2dc] shadow-sm">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-xs uppercase tracking-wider text-[#113D33]/60 font-semibold">1:30 PM</span>
                  <span className="font-bold text-[#113D33]">Walk to lunch</span>
                </div>
                <p className="text-[15px] mt-1.5">
                  You are on Larimer Square. Our top pick, no contest:
                </p>
                <div className="mt-3 rounded-xl bg-[#113D33]/5 border border-[#113D33]/15 p-4">
                  <p className="font-bold text-[#113D33]">
                    <a
                      href="https://www.nadcburger.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-[#0e3029]"
                    >
                      NADC Burger
                    </a>{" "}
                    &middot; the move
                  </p>
                  <p className="text-[15px] mt-1">
                    Great burger, great beer list, two-minute walk from Sway.
                    Dads love burgers. Trust us.
                  </p>
                </div>
                <p className="text-[15px] mt-3 opacity-80">Or if he is in a different mood:</p>
                <ul className="mt-2 space-y-1 text-[15px]">
                  <li>
                    <strong>Tamayo</strong> &middot; rooftop, modern Mexican,
                    margaritas in the sun
                  </li>
                  <li>
                    <strong>Ocean Prime</strong> &middot; full steakhouse
                    treatment if you are pulling out all the stops
                  </li>
                  <li>
                    <strong>Rioja</strong> &middot; the upscale-classic pick,
                    a Larimer Square fixture
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────── */}
        <h2 className="text-[22px] sm:text-2xl md:text-3xl font-bold pt-6 md:pt-8">
          The Receipt
        </h2>
        <p>
          No surprise math. These are the actual prices, today, in May 2026.
        </p>
        <div className="bg-white rounded-2xl border border-[#d7e2dc] overflow-hidden divide-y divide-[#d7e2dc] shadow-sm">
          {/* Aescape */}
          <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5">
            <div className="w-10 h-10 rounded-full bg-[#113D33]/8 flex items-center justify-center text-[#113D33] shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                <rect x="3" y="6" width="18" height="12" rx="2" />
                <circle cx="8" cy="12" r="1.5" />
                <circle cx="16" cy="12" r="1.5" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[#113D33]">Aescape AI massage</div>
              <div className="text-xs sm:text-sm opacity-70">15-min express up to 60-min full body</div>
            </div>
            <div className="font-semibold text-[#113D33] text-right shrink-0 text-sm sm:text-base">
              $49 &ndash; $139
            </div>
          </div>

          {/* Remedy Room */}
          <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5">
            <div className="w-10 h-10 rounded-full bg-[#113D33]/8 flex items-center justify-center text-[#113D33] shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                <path d="M12 3l6 7a6 6 0 1 1-12 0l6-7z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[#113D33]">The Remedy Room</div>
              <div className="text-xs sm:text-sm opacity-70">40-min contrast circuit</div>
            </div>
            <div className="font-semibold text-[#113D33] text-right shrink-0 text-sm sm:text-base">
              <div>$49</div>
              <div className="text-xs opacity-70 font-normal">$25 member</div>
            </div>
          </div>

          {/* Massage */}
          <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5">
            <div className="w-10 h-10 rounded-full bg-[#113D33]/8 flex items-center justify-center text-[#113D33] shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                <path d="M7 11c0-2 1-4 3-4s3 2 3 4v3a3 3 0 0 1-6 0v-3z" />
                <path d="M13 11c0-2 1-4 3-4s3 2 3 4v3a3 3 0 0 1-6 0" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[#113D33]">50-minute massage</div>
              <div className="text-xs sm:text-sm opacity-70">Deep tissue, sports, or relaxation</div>
            </div>
            <div className="font-semibold text-[#113D33] text-right shrink-0 text-sm sm:text-base">
              <div>$129</div>
              <div className="text-xs opacity-70 font-normal">$89 Essential</div>
            </div>
          </div>

          {/* Make it 80 */}
          <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5">
            <div className="w-10 h-10 rounded-full bg-[#113D33]/8 flex items-center justify-center text-[#113D33] shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[#113D33]">Make it 80 minutes</div>
              <div className="text-xs sm:text-sm opacity-70">Add 30 minutes to any massage</div>
            </div>
            <div className="font-semibold text-[#113D33] text-right shrink-0 text-sm sm:text-base">
              + $50
            </div>
          </div>

          {/* Gift card */}
          <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5">
            <div className="w-10 h-10 rounded-full bg-[#113D33]/8 flex items-center justify-center text-[#113D33] shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M3 11h18" />
                <path d="M12 7c-2-3-6-3-6 0 0 2 3 2 6 0 3 2 6 2 6 0 0-3-4-3-6 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[#113D33]">Sway gift card</div>
              <div className="text-xs sm:text-sm opacity-70">Any amount, never expires</div>
            </div>
            <div className="font-semibold text-[#113D33] text-right shrink-0 text-sm sm:text-base">
              You pick
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────── */}
        <h2 className="text-[22px] sm:text-2xl md:text-3xl font-bold pt-6 md:pt-8">
          What a Gift Card Gets Him
        </h2>
        <p>
          If you would rather let him pick, here is what each amount unlocks
          at Sway.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-white rounded-2xl border border-[#d7e2dc] p-5 shadow-sm">
            <div className="text-3xl font-bold text-[#113D33]">$50</div>
            <p className="mt-2 text-[15px] text-gray-700">
              A 15-minute Aescape express session, or a Remedy Room visit.
              A nice tasting plate before the main course.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-[#d7e2dc] p-5 shadow-sm">
            <div className="text-3xl font-bold text-[#113D33]">$100</div>
            <p className="mt-2 text-[15px] text-gray-700">
              A 30-minute Aescape Full Body, or a Remedy Room session with
              room to add a CBD muscle cream from the shop.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-[#d7e2dc] p-5 shadow-sm">
            <div className="text-3xl font-bold text-[#113D33]">$150</div>
            <p className="mt-2 text-[15px] text-gray-700">
              A full 50-minute massage with a licensed therapist. The
              sweet spot.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-[#d7e2dc] p-5 shadow-sm">
            <div className="text-3xl font-bold text-[#113D33]">$200</div>
            <p className="mt-2 text-[15px] text-gray-700">
              A 50-minute massage plus a boost (cupping, hot stones, CBD),
              or a 60-minute Aescape session.
            </p>
          </div>
          <div className="bg-[#113D33] text-white rounded-2xl p-5 shadow-md relative">
            <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider bg-white text-[#113D33] px-2 py-0.5 rounded-full font-bold">
              Most generous
            </span>
            <div className="text-3xl font-bold">$250</div>
            <p className="mt-2 text-[15px] text-white/85">
              An 80-minute massage with a boost. The &ldquo;he is going to
              text you a thank-you&rdquo; tier.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-[#d7e2dc] p-5 shadow-sm">
            <div className="text-3xl font-bold text-[#113D33]">$300+</div>
            <p className="mt-2 text-[15px] text-gray-700">
              The full day. Remedy Room, an 80-minute massage, and a boost.
              Or two visits. Or one visit plus a gift toward a membership.
            </p>
          </div>
        </div>

        {/* ─────────────────────────────────────────── */}
        <h2 className="text-[22px] sm:text-2xl md:text-3xl font-bold pt-6 md:pt-8">
          Two Pro Tips
        </h2>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-[#113D33] font-bold shrink-0">1.</span>
            <span>
              <strong>Make it effortless either way.</strong> Both paths
              work. If you want the day handled, pick the time and book it
              for him. If you want him to choose the experience, send a
              gift card with a short note so he knows it is a real
              invitation. The point is no planning friction on his end.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#113D33] font-bold shrink-0">2.</span>
            <span>
              <strong>Father&apos;s Day weekend books up.</strong> The Sunday
              of June 21 will be packed. If you want a specific time, book
              the week before. Saturdays the week before are quieter and
              dads do not actually care which day you do this.
            </span>
          </li>
        </ul>

        <div className="bg-[#113D33] text-white rounded-2xl p-8 mt-10 text-center space-y-4">
          <p className="text-2xl font-bold">Pick a time. Send him the address.</p>
          <p className="text-white/80">
            1428 Larimer St., Denver, CO 80202 &middot; Arrive 15 minutes early.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/locations/denver-larimer/book"
              className="bg-white text-[#113D33] font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
            >
              Schedule a Treatment
            </Link>
            <Link
              href="/fathers-day-gift-cards"
              className="border border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition"
            >
              Send a Gift Card
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        <div className="pt-10 space-y-6">
          <h2 className="text-2xl font-bold">Keep Reading</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              href="/blog/recovery-denver"
              className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-36 overflow-hidden">
                <Image
                  src="/assets/blog20.jpg"
                  alt="Recovery in Denver at Sway"
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
                  Aescape AI Massage: A New Way to Recover
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
                  alt="Why an 80-Minute Massage Is the Ultimate Reset"
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
          </div>
        </div>

        <p className="text-xs text-gray-400 pt-4 border-t border-[#d7e2dc]">
          Permalink: swaywellnessspa.com/blog/fathers-day-gift-guide
        </p>
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
                name: "What is a good Father's Day gift in Denver?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The most-requested Father's Day gifts at Sway Wellness Spa in downtown Denver are The Remedy Room (40-minute cold plunge plus traditional sauna for $49), an 80-minute deep tissue or sports massage, and Aescape AI robotic massage. For the dad who wants to pick his own experience, a Sway gift card works on every service and never expires.",
                },
              },
              {
                "@type": "Question",
                name: "When is Father's Day 2026?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Father's Day 2026 is Sunday, June 21. Father's Day weekend books up quickly at Sway Wellness Spa, so we recommend booking at least a week in advance. The weekend before is typically quieter and most dads do not mind which day you celebrate.",
                },
              },
              {
                "@type": "Question",
                name: "Is cold plunge a good gift for Dad?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Contrast therapy with cold plunge and traditional sauna is one of the most-requested experiences for men at Sway. Cold plunge is associated with reduced inflammation and improved mood, and regular sauna use has been linked to better cardiovascular health and sleep. Sway's Remedy Room is a 40-minute contrast circuit that includes both, with a relaxation space in between.",
                },
              },
              {
                "@type": "Question",
                name: "How much does a Father's Day spa gift cost at Sway?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sway has options at every price point. Aescape AI massage starts at $49 for a 15-minute express session. The Remedy Room is $49 for a 40-minute contrast circuit, or $25 for members. A 50-minute massage starts at $129 drop-in, or $89 with an Essential membership. Sway gift cards are available in any amount and never expire.",
                },
              },
              {
                "@type": "Question",
                name: "Where is Sway Wellness Spa located?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sway Wellness Spa is at 1428 Larimer Street in downtown Denver, Colorado, on Larimer Square. We recommend arriving 15 minutes early to settle in before your appointment.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
