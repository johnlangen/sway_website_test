"use client";

import Image from "next/image";
import Link from "next/link";

export default function ThingsToDoAtNightLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center max-w-4xl">
          Best Things to Do in Denver at Night
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
          src="/assets/background.png"
          alt="Denver at night — Larimer Square lights and downtown skyline"
          width={900}
          height={500}
          className="rounded-xl w-full object-cover"
          priority
        />

        {/* Intro */}
        <p>
          Denver comes alive after dark. Whether you&apos;re planning a date night,
          catching up with friends, or looking for something to do on a Tuesday that
          doesn&apos;t involve your couch, the city has more going on than most people
          realize. From rooftop cocktails with mountain views to immersive art
          experiences to a full-body reset at a modern{" "}
          <Link
            href="/locations/denver-larimer"
            className="underline text-[#113D33] font-semibold"
          >
            wellness club on Larimer Square
          </Link>
          , here are the best things to do in Denver at night.
        </p>

        {/* Table of Contents */}
        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li>
              <a href="#unwind" className="hover:underline">
                Unwind &amp; Recharge
              </a>
            </li>
            <li>
              <a href="#food-drink" className="hover:underline">
                Food &amp; Drink Experiences
              </a>
            </li>
            <li>
              <a href="#arts-culture" className="hover:underline">
                Arts, Culture &amp; Entertainment
              </a>
            </li>
            <li>
              <a href="#active-adventures" className="hover:underline">
                Active &amp; Adventurous Nights
              </a>
            </li>
            <li>
              <a href="#rooftops-views" className="hover:underline">
                Rooftops &amp; Views
              </a>
            </li>
            <li>
              <a href="#evening-plans" className="hover:underline">
                Three Evening Plans Worth Stealing
              </a>
            </li>
          </ol>
        </nav>

        {/* ============== Section 1: Unwind ============== */}
        <h2 id="unwind" className="text-2xl font-bold scroll-mt-24">
          Unwind &amp; Recharge
        </h2>

        <h3 className="text-xl font-bold">
          1. Sway Wellness Spa — Larimer Square
        </h3>
        <p>
          If your idea of the perfect evening is walking out feeling better than
          when you walked in, start here. Sway is a modern{" "}
          <Link
            href="/treatments"
            className="underline text-[#113D33] font-semibold"
          >
            wellness club
          </Link>{" "}
          in the heart of downtown Denver offering{" "}
          <Link
            href="/massages"
            className="underline text-[#113D33] font-semibold"
          >
            massage
          </Link>
          ,{" "}
          <Link
            href="/facials"
            className="underline text-[#113D33] font-semibold"
          >
            facials
          </Link>
          , the{" "}
          <Link
            href="/remedy-tech"
            className="underline text-[#113D33] font-semibold"
          >
            Remedy Room
          </Link>{" "}
          recovery circuit (sauna, cold plunge, lymphatic drainage compression boots, LED light
          therapy), and{" "}
          <Link
            href="/aescape"
            className="underline text-[#113D33] font-semibold"
          >
            Aescape AI-powered robot massage
          </Link>
          . Open until 8 PM on weekdays (Saturday 9 AM–6 PM, Sunday 11 AM–6 PM), it&apos;s the
          perfect first stop before dinner on Larimer Square — book an
          after-work treatment, then walk next door to eat. Voted{" "}
          <Link
            href="/blog/best-day-spa-in-america"
            className="underline text-[#113D33] font-semibold"
          >
            #4 Best Day Spa in America
          </Link>{" "}
          by USA Today 10Best.
        </p>
        <div className="pt-2">
          <Link
            href="/locations/denver-larimer/book"
            className="inline-block bg-[#113D33] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0e322b] transition"
          >
            Book a Treatment
          </Link>
        </div>

        <h3 className="text-xl font-bold">
          2. Halcyon Hotel Spa — Cherry Creek
        </h3>
        <p>
          A boutique hotel spa in Cherry Creek North with late-evening availability.
          The rooftop pool and lounge make it a solid option if you&apos;re looking
          for a full evening in the neighborhood.
        </p>

        <h3 className="text-xl font-bold">
          3. SunWater Spa — Manitou Springs (Day Trip)
        </h3>
        <p>
          About an hour south of Denver, SunWater offers outdoor soaking pools fed
          by natural mineral springs. Open into the evening, it&apos;s the closest
          thing to an onsen experience in Colorado and well worth the drive on a
          clear night.
        </p>

        {/* ============== Section 2: Food & Drink ============== */}
        <h2 id="food-drink" className="text-2xl font-bold scroll-mt-24">
          Food &amp; Drink Experiences
        </h2>

        <h3 className="text-xl font-bold">
          4. Larimer Square — LoDo
        </h3>
        <p>
          Denver&apos;s original block of fine dining, cocktail bars, and string
          lights. Rioja, Corridor 44, and Tamayo are all within a block of each
          other. If you&apos;re coming from{" "}
          <Link
            href="/locations/denver-larimer"
            className="underline text-[#113D33] font-semibold"
          >
            Sway on Larimer Square
          </Link>
          , you&apos;re already there — a treatment followed by dinner is the
          easiest date night in Denver.
        </p>

        <h3 className="text-xl font-bold">
          5. Dairy Block — LoDo
        </h3>
        <p>
          A pedestrian alleyway packed with restaurants, bars, and shops. The Dairy
          Block is great for spontaneous evenings — walk in, find something that
          looks good, and stay as long as you want. Kachina Cantina, Blanchard
          Family Wines, and Deviation Distilling are standouts.
        </p>

        <h3 className="text-xl font-bold">
          6. Williams &amp; Graham — LoHi
        </h3>
        <p>
          A speakeasy hidden behind a bookshelf in a storefront on Platte Street.
          The cocktails are consistently excellent and it&apos;s been on national
          best-bar lists for years. No reservations — just show up and wait for a
          table. Worth it.
        </p>

        {/* Mid CTA */}
        <div className="bg-[#113D33] text-white rounded-xl p-8 text-center space-y-4">
          <p className="text-xl font-bold">
            Planning a date night on Larimer Square?
          </p>
          <p className="text-sm opacity-90">
            Start your evening with a{" "}
            <Link
              href="/massages"
              className="underline font-semibold"
            >
              massage
            </Link>{" "}
            or{" "}
            <Link
              href="/facials"
              className="underline font-semibold"
            >
              facial
            </Link>{" "}
            at Sway, then walk to dinner — walk-ins welcome, booking recommended.
          </p>
          <Link
            href="/locations/denver-larimer/book"
            className="inline-block bg-white text-[#113D33] font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Book Now
          </Link>
        </div>

        {/* ============== Section 3: Arts & Culture ============== */}
        <h2 id="arts-culture" className="text-2xl font-bold scroll-mt-24">
          Arts, Culture &amp; Entertainment
        </h2>

        <h3 className="text-xl font-bold">
          7. Meow Wolf Denver — Sun Valley
        </h3>
        <p>
          &ldquo;Convergence Station&rdquo; is a four-story immersive art
          experience that&apos;s unlike anything else in the city. Open late on
          weekends with a full bar inside. Plan 2–3 hours.
        </p>

        <h3 className="text-xl font-bold">
          8. Denver Center for the Performing Arts — Downtown
        </h3>
        <p>
          The largest performing arts complex under one roof in the country. Broadway
          tours, local theater, comedy, and concerts rotate through constantly.
          Check the calendar — there&apos;s almost always something playing.
        </p>

        <h3 className="text-xl font-bold">
          9. First Friday Art Walk — RiNo Arts District
        </h3>
        <p>
          On the first Friday of every month, galleries in the River North Art
          District open their doors with free exhibits, live music, and street
          vendors. It&apos;s one of the best free things to do in Denver at night
          and a great way to see the neighborhood.
        </p>

        {/* ============== Section 4: Active ============== */}
        <h2 id="active-adventures" className="text-2xl font-bold scroll-mt-24">
          Active &amp; Adventurous Nights
        </h2>

        <h3 className="text-xl font-bold">
          10. Red Rocks Amphitheatre — Morrison
        </h3>
        <p>
          No list of things to do in Denver at night is complete without Red Rocks.
          The concert schedule runs from spring through fall, and the venue itself
          is a natural wonder. Pro tip: after a show, your body will thank you for
          booking a{" "}
          <Link
            href="/locations/denver-larimer/book-service"
            className="underline text-[#113D33] font-semibold"
          >
            recovery massage
          </Link>{" "}
          the next day.
        </p>

        <h3 className="text-xl font-bold">
          11. Comedy Works — Downtown &amp; South
        </h3>
        <p>
          One of the top comedy clubs in the country with two Denver locations.
          National headliners perform regularly and the downtown location is walking
          distance from Larimer Square.
        </p>

        <h3 className="text-xl font-bold">
          12. Punch Bowl Social — various locations
        </h3>
        <p>
          Denver-born &ldquo;eatertainment&rdquo; with bowling, karaoke, arcade
          games, and a full food and drink menu. The original Baker location is the
          best.
        </p>

        {/* ============== Section 5: Rooftops ============== */}
        <h2 id="rooftops-views" className="text-2xl font-bold scroll-mt-24">
          Rooftops &amp; Views
        </h2>

        <h3 className="text-xl font-bold">
          13. 54thirty — Downtown
        </h3>
        <p>
          The highest rooftop bar in Denver, on top of the Le Méridien hotel. The
          mountain views at sunset are unmatched. Seasonal — open roughly April
          through October.
        </p>

        <h3 className="text-xl font-bold">
          14. Union Station — LoDo
        </h3>
        <p>
          Denver&apos;s beautifully restored train station has become a nightlife
          destination on its own. The Great Hall has a cocktail bar, and Terminal Bar
          is lively late. Step outside for views of the LoDo skyline.
        </p>

        {/* ============== Section 6: Itineraries ============== */}
        <h2 id="evening-plans" className="text-2xl font-bold scroll-mt-24">
          Three Evening Plans Worth Stealing
        </h2>

        <div className="bg-white border border-[#d7e2dc] rounded-xl p-6 space-y-3">
          <p className="font-bold text-lg">The Larimer Square Date Night</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Start with a{" "}
              <Link
                href="/locations/denver-larimer/book-service"
                className="underline text-[#113D33] font-semibold"
              >
                couples massage at Sway
              </Link>
            </li>
            <li>Walk to dinner at Rioja or Tamayo (same block)</li>
            <li>Cocktails at Corridor 44 or The Cooper Lounge at Union Station</li>
          </ol>
        </div>

        <div className="bg-white border border-[#d7e2dc] rounded-xl p-6 space-y-3">
          <p className="font-bold text-lg">The Active Night Out</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Red Rocks concert or Comedy Works show</li>
            <li>Late drinks at Williams &amp; Graham or Dairy Block</li>
            <li>
              Book a{" "}
              <Link
                href="/locations/denver-larimer/book-remedy-room"
                className="underline text-[#113D33] font-semibold"
              >
                Remedy Room session
              </Link>{" "}
              (sauna + cold plunge) the next day to recover
            </li>
          </ol>
        </div>

        <div className="bg-white border border-[#d7e2dc] rounded-xl p-6 space-y-3">
          <p className="font-bold text-lg">The Solo Reset</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <Link
                href="/aescape"
                className="underline text-[#113D33] font-semibold"
              >
                Aescape robot massage
              </Link>{" "}
              at Sway (no conversation required)
            </li>
            <li>
              <Link
                href="/sauna"
                className="underline text-[#113D33] font-semibold"
              >
                Sauna
              </Link>{" "}
              +{" "}
              <Link
                href="/cold-plunge"
                className="underline text-[#113D33] font-semibold"
              >
                cold plunge
              </Link>{" "}
              in the Remedy Room
            </li>
            <li>Walk to Union Station for a quiet drink in the Great Hall</li>
          </ol>
        </div>

        {/* Final CTA */}
        <div className="bg-[#113D33] text-white rounded-xl p-8 text-center space-y-4">
          <p className="text-xl font-bold">
            Denver&apos;s Best Nights Start with Self-Care
          </p>
          <p className="text-sm opacity-90">
            Sway is open daily on Larimer Square (Mon–Fri until 8 PM, weekends until 6 PM).{" "}
            <Link
              href="/membership"
              className="underline font-semibold"
            >
              Members
            </Link>{" "}
            get monthly treatments, member pricing, and Remedy Room access.
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
              Gift Cards
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <div className="space-y-6">
          <div>
            <p className="font-bold">What are the best things to do in Denver at night?</p>
            <p className="text-gray-700 mt-1">
              Denver&apos;s best nighttime experiences include Larimer Square dining,
              Red Rocks concerts, Meow Wolf, First Friday art walks in RiNo,
              rooftop bars like 54thirty, speakeasies like Williams &amp; Graham,
              and after-work self-care at modern wellness clubs like Sway Wellness Spa.
            </p>
          </div>
          <div>
            <p className="font-bold">What is there to do in downtown Denver at night?</p>
            <p className="text-gray-700 mt-1">
              Downtown Denver has Larimer Square restaurants, Union Station cocktail
              bars, the Denver Center for the Performing Arts, Comedy Works, Dairy
              Block, and Sway Wellness Spa — all walkable from each other in LoDo.
            </p>
          </div>
          <div>
            <p className="font-bold">Is Denver good for date nights?</p>
            <p className="text-gray-700 mt-1">
              Denver is excellent for date nights. Larimer Square alone offers
              fine dining, cocktail bars, and Sway Wellness Spa for a couples
              massage — all on the same block. Red Rocks concerts, rooftop bars,
              and RiNo galleries add even more options.
            </p>
          </div>
          <div>
            <p className="font-bold">What are the best nightlife neighborhoods in Denver?</p>
            <p className="text-gray-700 mt-1">
              The best nightlife neighborhoods in Denver include LoDo (Larimer
              Square, Union Station, Dairy Block), LoHi (speakeasies and
              restaurants), RiNo (breweries, art galleries, live music), and
              Baker/South Broadway (dive bars, Punch Bowl Social, local spots).
            </p>
          </div>
        </div>

        {/* Related Articles */}
        <div className="pt-10 space-y-6">
          <h2 className="text-2xl font-bold">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              href="/blog/best-day-spa-in-america"
              className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-36 overflow-hidden">
                <Image
                  src="/assets/homepage_photo_outside.jpg"
                  alt="Sway Wellness Spa on Larimer Square"
                  width={400}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">
                  #4 Best Day Spa in America
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
                  alt="Valentine's Day wellness"
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
            <Link
              href="/blog/denver-wellness-club"
              className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-36 overflow-hidden">
                <Image
                  src="/assets/homepage_photo_outside.jpg"
                  alt="Sway Denver wellness club"
                  width={400}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">
                  Denver&apos;s Most Anticipated Wellness Club
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
                  name: "What are the best things to do in Denver at night?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Denver's best nighttime experiences include Larimer Square dining, Red Rocks concerts, Meow Wolf's Convergence Station, First Friday art walks in RiNo, rooftop bars like 54thirty, speakeasies like Williams & Graham, and after-work self-care at modern wellness clubs like Sway Wellness Spa on Larimer Square (open weekdays until 8 PM).",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is there to do in downtown Denver at night?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Downtown Denver offers Larimer Square restaurants, Union Station cocktail bars, the Denver Center for the Performing Arts, Comedy Works, Dairy Block food hall and bars, and Sway Wellness Spa for after-work massage, facials, and recovery treatments (open weekdays until 8 PM) — all walkable from each other in LoDo.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is Denver good for date nights?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Denver is excellent for date nights. Larimer Square alone offers fine dining, cocktail bars, and Sway Wellness Spa for couples massage — all on the same block. Red Rocks concerts, rooftop bars with mountain views, and RiNo galleries add even more options.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are the best nightlife neighborhoods in Denver?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The best nightlife neighborhoods in Denver include LoDo (Larimer Square, Union Station, Dairy Block), LoHi (speakeasies and restaurants on Platte Street), RiNo Arts District (breweries, galleries, live music), and Baker/South Broadway (local bars and entertainment venues like Punch Bowl Social).",
                  },
                },
              ],
            }),
          }}
        />

        {/* Permalink */}
        <p className="text-xs text-gray-400 pt-4 border-t border-[#d7e2dc]">
          Permalink: swaywellnessspa.com/blog/things-to-do-in-denver-at-night
        </p>
      </div>
    </div>
  );
}
