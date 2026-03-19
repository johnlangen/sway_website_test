"use client";

import Image from "next/image";
import Link from "next/link";

export default function DateNightDenverLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center max-w-4xl">
          Best Date Night Ideas in Denver
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
            Denver
          </span>
          <span className="text-gray-500">March 2026 · By Sway Wellness Team</span>
        </div>

        {/* Hero Image */}
        <Image
          src="/assets/blog40.jpg"
          alt="Spa day rubber duck in warm water, date night vibes"
          width={900}
          height={500}
          className="rounded-xl w-full object-cover object-[center_25%] max-h-[500px]"
          priority
        />

        {/* Intro */}
        <p>
          Denver has earned its reputation as one of the best cities in the country for
          date nights. Between the walkable downtown neighborhoods, mountain views at
          sunset, and a restaurant scene that keeps getting better, there is no shortage
          of ways to spend an evening with someone you love. And with{" "}
          <Link
            href="/locations/denver-larimer"
            className="underline text-[#113D33] font-semibold"
          >
            Sway Wellness Spa on Larimer Square
          </Link>
          , you can start your night with side-by-side massages before walking to dinner.
          Here are our favorite date night ideas in Denver.
        </p>

        {/* Table of Contents */}
        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#start-at-sway" className="hover:underline">Start Your Date at Sway</a></li>
            <li><a href="#larimer-dining" className="hover:underline">Dinner on Larimer Square</a></li>
            <li><a href="#beyond-larimer" className="hover:underline">More Great Dinner Spots</a></li>
            <li><a href="#entertainment" className="hover:underline">Entertainment and Experiences</a></li>
            <li><a href="#outdoor" className="hover:underline">Outdoor and Seasonal Ideas</a></li>
            <li><a href="#date-plans" className="hover:underline">Three Date Night Plans Worth Trying</a></li>
          </ol>
        </nav>

        {/* ============== Section 1: Sway ============== */}
        <h2 id="start-at-sway" className="text-2xl font-bold scroll-mt-24">
          Start Your Date at Sway
        </h2>

        {/* Sway feature card */}
        <div className="bg-white rounded-xl border border-[#d7e2dc] overflow-hidden">
          <Image
            src="/assets/homepage_photo_outside.jpg"
            alt="Sway Wellness Spa exterior on Larimer Square at night"
            width={900}
            height={400}
            className="w-full h-64 object-cover"
          />
          <div className="p-6 space-y-4">
            <p>
              The best date nights in Denver don&apos;t start with a reservation. They
              start with slowing down. At{" "}
              <Link
                href="/locations/denver-larimer"
                className="underline text-[#113D33] font-semibold"
              >
                Sway Wellness Spa
              </Link>
              , right on Larimer Square, you and your partner can book side-by-side{" "}
              <Link href="/massages" className="underline text-[#113D33] font-semibold">massages</Link>
              {" "}or{" "}
              <Link href="/facials" className="underline text-[#113D33] font-semibold">facials</Link>
              {" "}before heading to dinner. It is the kind of thing that turns a regular
              Tuesday into something you actually talk about afterward.
            </p>
            <p className="text-[15px] text-[#113D33]/60">
              Open until 8 PM on weekdays. Voted{" "}
              <Link href="/blog/best-day-spa-in-america" className="underline font-semibold text-[#113D33]">
                #4 Best Day Spa in America
              </Link>{" "}
              by USA Today 10Best.{" "}
              <Link href="/membership" className="underline font-semibold text-[#113D33]">
                Members
              </Link>{" "}
              get monthly treatments and member pricing.
            </p>
            <Link
              href="/locations/denver-larimer/book"
              className="inline-block bg-[#113D33] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0e322b] transition"
            >
              Book a Treatment
            </Link>
          </div>
        </div>

        {/* ============== Section 2: Larimer Dining ============== */}
        <h2 id="larimer-dining" className="text-2xl font-bold scroll-mt-24">
          Dinner on Larimer Square
        </h2>

        <p>
          The best part about starting at Sway? You are already on the best dining
          block in Denver. Here are a few favorites within a two-minute walk.
        </p>

        {/* Restaurant cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2 hover:shadow-md transition">
            <div className="flex items-center gap-2">
              <span className="text-[#9CB7A9] text-lg">&#9679;</span>
              <h3 className="text-lg font-bold">Rioja</h3>
            </div>
            <p className="text-[15px]">
              Mediterranean-inspired dishes with seasonal Colorado ingredients. The
              handmade pastas are consistently excellent and the wine list is one of
              the deepest in the city. This is the Larimer Square staple for a reason.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2 hover:shadow-md transition">
            <div className="flex items-center gap-2">
              <span className="text-[#9CB7A9] text-lg">&#9679;</span>
              <h3 className="text-lg font-bold">Ocean Prime</h3>
            </div>
            <p className="text-[15px]">
              Seafood and steaks in a polished, dimly lit dining room. Ocean Prime is
              where you go when you want the evening to feel like an event. Great
              cocktails, great service, great people-watching from the patio.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2 hover:shadow-md transition">
            <div className="flex items-center gap-2">
              <span className="text-[#9CB7A9] text-lg">&#9679;</span>
              <h3 className="text-lg font-bold">Jovanina&apos;s</h3>
            </div>
            <p className="text-[15px]">
              Modern Italian with wood-fired pizzas and seasonal vegetables. The space
              is warm and inviting without being stuffy, and the outdoor seating on
              Larimer Square is hard to beat in the summer.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2 hover:shadow-md transition">
            <div className="flex items-center gap-2">
              <span className="text-[#9CB7A9] text-lg">&#9679;</span>
              <h3 className="text-lg font-bold">Corridor 44</h3>
            </div>
            <p className="text-[15px]">
              A champagne bar with small plates. Perfect if you want to keep things
              light after a spa treatment and let the bubbles do the talking.
            </p>
          </div>
        </div>

        {/* Mid CTA */}
        <div className="bg-[#113D33] text-white rounded-xl p-8 text-center space-y-4">
          <p className="text-xl font-bold">
            The Easiest Date Night in Denver
          </p>
          <p className="text-sm opacity-90">
            Book a{" "}
            <Link href="/massages" className="underline font-semibold">massage</Link>
            {" "}at Sway, then walk to dinner on Larimer Square. No driving, no planning, no stress.
          </p>
          <Link
            href="/locations/denver-larimer/book"
            className="inline-block bg-white text-[#113D33] font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Book Now
          </Link>
        </div>

        {/* ============== Section 3: Beyond Larimer ============== */}
        <h2 id="beyond-larimer" className="text-2xl font-bold scroll-mt-24">
          More Great Dinner Spots
        </h2>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Williams &amp; Graham</h3>
              <span className="text-xs font-semibold text-[#113D33]/40 tracking-wide">LoHi</span>
            </div>
            <p className="text-[15px]">
              A speakeasy hidden behind a bookshelf on Platte Street. The cocktails
              are consistently on national best-of lists and the dim, intimate space
              was basically designed for date night. No reservations, just show up and
              put your name in.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Safta</h3>
              <span className="text-xs font-semibold text-[#113D33]/40 tracking-wide">RiNo</span>
            </div>
            <p className="text-[15px]">
              Israeli-inspired cuisine from James Beard Award winner Alon Shaya.
              The hummus alone is worth the trip. Located in the Source Hotel in River
              North, it is one of the most exciting restaurants in Denver right now.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Mercantile Dining &amp; Provision</h3>
              <span className="text-xs font-semibold text-[#113D33]/40 tracking-wide">Union Station</span>
            </div>
            <p className="text-[15px]">
              Farm-to-table fine dining inside Union Station with a beautiful bar and
              market attached. The setting is stunning and the food lives up to it.
              Walk over after dinner for a drink in the Great Hall.
            </p>
          </div>
        </div>

        {/* Visual break */}
        <Image
          src="/assets/blog39.jpg"
          alt="Lush tropical greenery"
          width={900}
          height={300}
          className="rounded-xl w-full object-cover max-h-[280px]"
        />

        {/* ============== Section 4: Entertainment ============== */}
        <h2 id="entertainment" className="text-2xl font-bold scroll-mt-24">
          Entertainment and Experiences
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2 hover:shadow-md transition">
            <h3 className="text-lg font-bold">Meow Wolf</h3>
            <p className="text-xs font-semibold text-[#113D33]/40 tracking-wide mb-1">Sun Valley</p>
            <p className="text-[15px]">
              Four stories of immersive, interactive art that you walk through together.
              Open late on weekends with a full bar inside. Plan for two to three hours
              and wear comfortable shoes.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2 hover:shadow-md transition">
            <h3 className="text-lg font-bold">Denver Center for the Performing Arts</h3>
            <p className="text-xs font-semibold text-[#113D33]/40 tracking-wide mb-1">Downtown</p>
            <p className="text-[15px]">
              The largest performing arts complex under one roof in the country. Broadway
              tours, ballet, comedy, and concerts rotate through all year. Check the
              calendar and surprise your partner with tickets.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2 hover:shadow-md transition">
            <h3 className="text-lg font-bold">Nocturne</h3>
            <p className="text-xs font-semibold text-[#113D33]/40 tracking-wide mb-1">RiNo</p>
            <p className="text-[15px]">
              Live jazz in an intimate listening room with craft cocktails and small
              plates. This is the kind of place that makes a regular Thursday feel
              like something special. Reservations recommended.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2 hover:shadow-md transition">
            <h3 className="text-lg font-bold">Comedy Works</h3>
            <p className="text-xs font-semibold text-[#113D33]/40 tracking-wide mb-1">Downtown</p>
            <p className="text-[15px]">
              One of the top comedy clubs in the country, with national headliners
              performing regularly. The downtown location is a short walk from
              Larimer Square, making it an easy add to any date night.
            </p>
          </div>
        </div>

        {/* ============== Section 5: Outdoor ============== */}
        <h2 id="outdoor" className="text-2xl font-bold scroll-mt-24">
          Outdoor and Seasonal Ideas
        </h2>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2 hover:shadow-md transition">
            <h3 className="text-lg font-bold">Denver Botanic Gardens</h3>
            <p className="text-[15px]">
              During warmer months, the gardens host evening events with live music
              and food trucks. In winter, the Blossoms of Light holiday display turns
              the grounds into something magical. Either way, it is a change of pace
              from the typical dinner-and-drinks formula.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2 hover:shadow-md transition">
            <h3 className="text-lg font-bold">54thirty Rooftop</h3>
            <p className="text-xs font-semibold text-[#113D33]/40 tracking-wide mb-1">Downtown · Seasonal (Apr-Oct)</p>
            <p className="text-[15px]">
              The highest rooftop bar in Denver, perched on top of the Le Meridien
              hotel. Mountain views at sunset with craft cocktails.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2 hover:shadow-md transition">
            <h3 className="text-lg font-bold">Lookout Mountain</h3>
            <p className="text-xs font-semibold text-[#113D33]/40 tracking-wide mb-1">Golden · 30 min drive</p>
            <p className="text-[15px]">
              One of the best sunset views along the Front Range. Pack a blanket and
              something to drink, or stop at one of the breweries in Golden on the way back.
            </p>
          </div>
        </div>

        {/* Pull quote */}
        <div className="border-l-4 border-[#9CB7A9] pl-6 py-2">
          <p className="text-xl text-[#113D33] italic">
            The best date nights don&apos;t need a complicated plan. They just need
            a good starting point.
          </p>
        </div>

        {/* ============== Section 6: Itineraries ============== */}
        <h2 id="date-plans" className="text-2xl font-bold scroll-mt-24">
          Three Date Night Plans Worth Trying
        </h2>

        <div className="space-y-4">
          <div className="bg-white border border-[#d7e2dc] rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#113D33] text-white text-sm font-bold">1</span>
              <p className="font-bold text-lg">The Larimer Square Classic</p>
            </div>
            <ol className="list-decimal list-inside space-y-2 pl-11">
              <li>
                Book a{" "}
                <Link href="/locations/denver-larimer/book-service" className="underline text-[#113D33] font-semibold">
                  side-by-side massages at Sway
                </Link>{" "}(50 or 80 minutes)
              </li>
              <li>Walk next door to Rioja or Jovanina&apos;s for dinner</li>
              <li>Nightcap at Corridor 44 or The Cooper Lounge at Union Station</li>
            </ol>
          </div>

          <div className="bg-white border border-[#d7e2dc] rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#113D33] text-white text-sm font-bold">2</span>
              <p className="font-bold text-lg">The Culture Night</p>
            </div>
            <ol className="list-decimal list-inside space-y-2 pl-11">
              <li>
                Start with a{" "}
                <Link href="/facials" className="underline text-[#113D33] font-semibold">
                  facial at Sway
                </Link>{" "}(you will both be glowing)
              </li>
              <li>Dinner at Mercantile in Union Station</li>
              <li>Catch a show at Denver Center for the Performing Arts</li>
            </ol>
          </div>

          <div className="bg-white border border-[#d7e2dc] rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#113D33] text-white text-sm font-bold">3</span>
              <p className="font-bold text-lg">The Weekend Adventure</p>
            </div>
            <ol className="list-decimal list-inside space-y-2 pl-11">
              <li>Sunset drive to Lookout Mountain</li>
              <li>Dinner at Safta in RiNo</li>
              <li>Live jazz at Nocturne, then book a{" "}
                <Link href="/locations/denver-larimer/book-service" className="underline text-[#113D33] font-semibold">
                  recovery massage
                </Link>{" "}at Sway the next morning
              </li>
            </ol>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-[#113D33] text-white rounded-xl p-8 text-center space-y-4">
          <p className="text-xl font-bold">
            Denver&apos;s Best Date Nights Start with Self-Care
          </p>
          <p className="text-sm opacity-90">
            Sway is open daily on Larimer Square. Weekdays until 8 PM, Saturday
            9 AM to 6 PM, Sunday 11 AM to 6 PM.{" "}
            <Link href="/membership" className="underline font-semibold">Members</Link>
            {" "}get monthly treatments and member pricing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/locations/denver-larimer/book"
              className="inline-block bg-white text-[#113D33] font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition"
            >
              Book a Treatment
            </Link>
            <Link
              href="/gift-cards"
              className="inline-block border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition"
            >
              Gift a Date Night
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
            <p className="font-bold">What are the best date night ideas in Denver?</p>
            <p className="text-gray-700 mt-2 text-[15px]">
              Some of the best date night ideas in Denver include side-by-side massages
              at Sway Wellness Spa on Larimer Square followed by dinner, live jazz
              at Nocturne, rooftop drinks at 54thirty, exploring Meow Wolf, or catching
              a show at the Denver Center for the Performing Arts.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
            <p className="font-bold">Where should I go for a romantic dinner in Denver?</p>
            <p className="text-gray-700 mt-2 text-[15px]">
              Larimer Square is the top spot for romantic dinners in Denver. Rioja,
              Ocean Prime, and Jovanina&apos;s are all excellent choices. Williams and
              Graham in LoHi, Safta in RiNo, and Mercantile in Union Station are
              also worth the trip.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
            <p className="font-bold">Can you book side-by-side massages in Denver?</p>
            <p className="text-gray-700 mt-2 text-[15px]">
              Yes. Sway Wellness Spa on Larimer Square offers side-by-side massages
              in 50 and 80 minute sessions. Book an after-work treatment
              and walk to dinner on the same block. Sway is open weekdays until 8 PM.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
            <p className="font-bold">What are fun things to do in Denver for couples?</p>
            <p className="text-gray-700 mt-2 text-[15px]">
              Denver has something for every kind of couple. Start with a spa
              treatment at Sway on Larimer Square, explore Meow Wolf, hike to
              Lookout Mountain for sunset views, visit the Denver Botanic Gardens,
              or plan a full evening with dinner and live music in RiNo.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        <div className="pt-10 space-y-6">
          <h2 className="text-2xl font-bold">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              href="/blog/things-to-do-in-denver-at-night"
              className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-36 overflow-hidden">
                <Image
                  src="/assets/background.png"
                  alt="Best things to do in Denver at night"
                  width={400}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">
                  Best Things to Do in Denver at Night
                </p>
              </div>
            </Link>
            <Link
              href="/blog/bachelorette-spa-day"
              className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-36 overflow-hidden">
                <Image
                  src="/assets/blog14.jpg"
                  alt="Bachelorette spa day at Sway"
                  width={400}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">
                  The Ultimate Bachelorette Spa Day
                </p>
              </div>
            </Link>
            <Link
              href="/blog/valentines-day-wellness"
              className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-36 overflow-hidden">
                <Image
                  src="/assets/blog6.jpg"
                  alt="Valentine's Day wellness at Sway"
                  width={400}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">
                  Celebrate Valentine&apos;s Day Through Wellness
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
                  name: "What are the best date night ideas in Denver?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Some of the best date night ideas in Denver include side-by-side massages at Sway Wellness Spa on Larimer Square followed by dinner, live jazz at Nocturne in RiNo, rooftop drinks at 54thirty, exploring Meow Wolf's Convergence Station, or catching a show at the Denver Center for the Performing Arts.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Where should I go for a romantic dinner in Denver?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Larimer Square is the top spot for romantic dinners in Denver with restaurants like Rioja, Ocean Prime, and Jovanina's all on the same block. Williams & Graham in LoHi, Safta in RiNo, and Mercantile Dining & Provision in Union Station are also excellent date night restaurants.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can you book side-by-side massages in Denver?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Sway Wellness Spa on Larimer Square offers side-by-side massages in 50-minute and 80-minute sessions, plus facials, the Remedy Room recovery circuit, and Aescape AI-powered robot massage. Open weekdays until 8 PM, making it perfect before dinner.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are fun things to do in Denver for couples?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Denver offers couples spa treatments at Sway Wellness Spa, sunset views from Lookout Mountain, Meow Wolf's immersive art experience, Denver Botanic Gardens events, live jazz at Nocturne, rooftop bars like 54thirty, and walkable dining neighborhoods like Larimer Square, RiNo, and LoHi.",
                  },
                },
              ],
            }),
          }}
        />

        {/* Permalink */}
        <p className="text-xs text-gray-400 pt-4 border-t border-[#d7e2dc]">
          Permalink: swaywellnessspa.com/blog/best-date-night-ideas-denver
        </p>
      </div>
    </div>
  );
}
