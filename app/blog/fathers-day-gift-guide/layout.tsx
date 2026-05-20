"use client";

import Image from "next/image";
import Link from "next/link";

export default function FathersDayGiftGuideLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center max-w-3xl">
          A Father&apos;s Day in Denver Your Dad Will Actually Remember
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8 text-[17px] leading-relaxed">
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

        <Image
          src="/assets/cold_plunge.jpg"
          alt="Cold plunge at Sway Wellness Spa Denver, the most-gifted Father's Day experience"
          width={1600}
          height={600}
          className="rounded-lg w-full h-[280px] md:h-[420px] object-cover"
        />

        {/* ─────────────────────────────────────────── */}
        <h2 className="text-2xl md:text-3xl font-bold pt-4">
          For the Dad Who&hellip;
        </h2>
        <p className="text-[#113D33]/70">
          Pick the one that sounds like him. Click. Done.
        </p>

        {/* Persona card */}
        <div className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
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
            . 40 minutes, private suite, cold plunge plus traditional sauna,
            relaxation room in between. $49, or $25 if he is already a member.
          </p>
        </div>

        <div className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg">&hellip; says &ldquo;my back is killing me&rdquo; every Sunday.</p>
          <p>
            The dad with a desk job and a 9-year-old who wants to be picked
            up nonstop. He needs a proper{" "}
            <Link
              href="/locations/denver-larimer/book-service?category=massage"
              className="font-semibold text-[#113D33] underline underline-offset-2"
            >
              deep tissue or sports massage
            </Link>
            . 80 minutes if you love him. Add the CBD CauseMedic finisher
            for the knot under his right shoulder blade he has been talking
            about for three years.
          </p>
        </div>

        <div className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg">&hellip; pre-orders every new gadget.</p>
          <p>
            The tech dad who already knows what Aescape is, or the one who
            does not but will not stop talking about it after he tries it.{" "}
            <Link
              href="/locations/denver-larimer/book-aescape"
              className="font-semibold text-[#113D33] underline underline-offset-2"
            >
              Aescape AI massage
            </Link>{" "}
            is a robot-driven, no-oil, fully-clothed (compression apparel
            provided at check-in) full-body massage that maps his body in
            3D. Sessions start at 15 minutes for $49.
          </p>
        </div>

        <div className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg">&hellip; has everything and wants nothing.</p>
          <p>
            The dad who tells you not to get him anything every single year
            and means it. Give him a{" "}
            <Link
              href="/gift-cards"
              className="font-semibold text-[#113D33] underline underline-offset-2"
            >
              Sway gift card
            </Link>
            . Any amount. Never expires. Works on every service, every add-on,
            and in the retail shop. He picks the experience, you get the
            credit.
          </p>
        </div>

        <div className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
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
            pricing on everything else, and turns recovery from a once-a-year
            event into a routine. This is the big one. It is also the gift
            that keeps showing up after June 21.
          </p>
        </div>

        {/* ─────────────────────────────────────────── */}
        <h2 className="text-2xl md:text-3xl font-bold pt-8">
          The Itinerary: A Sway-Anchored Father&apos;s Day in Denver
        </h2>
        <p>
          For the planner. Drop him off, hand him a coffee, do not let him
          carry anything. Here is the day, in the order it should happen.
        </p>

        <div className="bg-white rounded-xl p-6 space-y-5 border border-[#d7e2dc]">
          <div>
            <p className="font-bold text-[#113D33]">10:15 AM &middot; Arrive at Sway</p>
            <p>
              1428 Larimer Street. We tell guests to arrive 15 minutes early
              for a reason. The lounge is the warm-up.
            </p>
          </div>
          <div>
            <p className="font-bold text-[#113D33]">10:30 AM &middot; The Remedy Room</p>
            <p>
              40 minutes, contrast therapy, private. He will come out
              talking about it.
            </p>
          </div>
          <div>
            <p className="font-bold text-[#113D33]">11:15 AM &middot; 80-minute massage</p>
            <p>
              Deep tissue or sports. By now his nervous system has caught
              up. This is when the actual work happens.
            </p>
          </div>
          <div>
            <p className="font-bold text-[#113D33]">12:45 PM &middot; Lounge</p>
            <p>
              Water, tea, no phone, no obligations. Build this into the day
              on purpose.
            </p>
          </div>
          <div>
            <p className="font-bold text-[#113D33]">1:30 PM &middot; Walk to lunch</p>
            <p>
              You are on Larimer Square. Walk to any of the restaurants on
              the block. He has earned the steak.
            </p>
          </div>
        </div>

        {/* ─────────────────────────────────────────── */}
        <h2 className="text-2xl md:text-3xl font-bold pt-8">
          The Receipt
        </h2>
        <p>
          No surprise math. These are the actual prices, today, in May 2026.
        </p>
        <div className="bg-white rounded-xl p-6 border border-[#d7e2dc] space-y-2">
          <p>
            <span className="font-semibold">Aescape AI massage</span> &middot;{" "}
            from $49 (15 min) to $139 (60 min)
          </p>
          <p>
            <span className="font-semibold">Remedy Room</span> &middot; $49,
            or $25 for members (40 min)
          </p>
          <p>
            <span className="font-semibold">50-minute massage</span> &middot;{" "}
            from $129 drop-in, $89 for Essential members
          </p>
          <p>
            <span className="font-semibold">Make it 80 minutes</span> &middot;{" "}
            add $50
          </p>
          <p>
            <span className="font-semibold">Sway gift card</span> &middot; any
            amount, never expires
          </p>
        </div>

        {/* ─────────────────────────────────────────── */}
        <h2 className="text-2xl md:text-3xl font-bold pt-8">
          Two Pro Tips
        </h2>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-[#113D33] font-bold shrink-0">1.</span>
            <span>
              <strong>Book it for him.</strong> The whole point is that he
              does not have to plan. If you hand him a gift card and tell
              him to schedule it himself, he will not. Pick the slot, lock
              it in, send him the time and address.
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
              Book a Service
            </Link>
            <Link
              href="/gift-cards"
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
              href="/blog/cold-plunge"
              className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-36 overflow-hidden">
                <Image
                  src="/assets/cold_plunge.jpg"
                  alt="The cold plunge benefits explained"
                  width={400}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">
                  The Cold Plunge, Honestly
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
              href="/blog/train-like-an-athlete"
              className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-36 overflow-hidden">
                <Image
                  src="/assets/massage5.jpg"
                  alt="Recover like an athlete"
                  width={400}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">
                  Train and Recover Like an Athlete
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
                  text: "The most-requested Father's Day gifts at Sway Wellness Spa in downtown Denver are The Remedy Room (40-minute private cold plunge plus traditional sauna for $49), an 80-minute deep tissue or sports massage, and Aescape AI robotic massage. For the dad who wants to pick his own experience, a Sway gift card works on every service and never expires.",
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
                  text: "Yes. Contrast therapy with cold plunge and traditional sauna is one of the most-requested experiences for men at Sway. Cold plunge is associated with reduced inflammation and improved mood, and regular sauna use has been linked to better cardiovascular health and sleep. Sway's Remedy Room is a private 40-minute suite that includes both, with a relaxation room in between.",
                },
              },
              {
                "@type": "Question",
                name: "How much does a Father's Day spa gift cost at Sway?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sway has options at every price point. Aescape AI massage starts at $49 for a 15-minute express session. The Remedy Room is $49 for a 40-minute private contrast suite, or $25 for members. A 50-minute massage starts at $129 drop-in, or $89 with an Essential membership. Sway gift cards are available in any amount and never expire.",
                },
              },
              {
                "@type": "Question",
                name: "Where is Sway Wellness Spa located?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sway Wellness Spa is at 1428 Larimer Street in downtown Denver, Colorado, on Larimer Square. We recommend arriving 15 minutes early to settle in at the lounge.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
