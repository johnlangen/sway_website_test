"use client";

import Image from "next/image";
import Link from "next/link";

export default function MavenHotelBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* ── HERO BANNER ── */}
      <section className="bg-[#113D33] text-white pt-32 pb-20 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl mx-auto leading-tight">
          The Maven Hotel + Sway: AI-Powered Massage Near Dairy Block
        </h1>
      </section>

      {/* ── CONTENT ── */}
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        {/* Metadata bar */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link
            href="/blog"
            className="text-[#113D33] font-semibold hover:underline"
          >
            &larr; Back to Blog
          </Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
            Partnership
          </span>
          <span className="text-gray-500">
            March 2026 · By Sway Wellness Team
          </span>
        </div>

        {/* Hero image */}
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
          <Image
            src="/assets/maven-hotel.jpg"
            alt="The Maven Hotel at Dairy Block in downtown Denver"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Table of Contents */}
        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li>
              <a href="#partnership" className="hover:underline">
                The Partnership
              </a>
            </li>
            <li>
              <a href="#aescape" className="hover:underline">
                What Is Aescape?
              </a>
            </li>
            <li>
              <a href="#getting-there" className="hover:underline">
                Getting from The Maven to Sway
              </a>
            </li>
            <li>
              <a href="#your-visit" className="hover:underline">
                What to Expect at Your Visit
              </a>
            </li>
            <li>
              <a href="#beyond-aescape" className="hover:underline">
                Beyond Aescape: More at Sway
              </a>
            </li>
            <li>
              <a href="#book" className="hover:underline">
                How to Book
              </a>
            </li>
          </ol>
        </nav>

        {/* ── SECTION: The Partnership ── */}
        <h2
          id="partnership"
          className="text-2xl font-bold scroll-mt-24 text-[#113D33]"
        >
          A New Kind of Hotel Wellness
        </h2>

        <p>
          Denver&apos;s wellness scene just got a new connection.{" "}
          <a
            href="https://www.themavenhotel.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#113D33] font-semibold hover:underline"
          >
            The Maven Hotel
          </a>{" "}
          at Dairy Block — one of LoDo&apos;s most distinctive boutique hotels —
          has partnered with{" "}
          <Link
            href="/"
            className="text-[#113D33] font-semibold hover:underline"
          >
            Sway Wellness Spa
          </Link>{" "}
          on Larimer Square to offer guests access to a 60-minute AI-powered
          Aescape robot massage.
        </p>

        <p>
          Whether you&apos;re in town for business, catching a show at Ball
          Arena, or exploring the Dairy Block market hall, this partnership makes
          it easy to work a world-class spa treatment into your Denver stay.
        </p>

        {/* ── SECTION: What Is Aescape ── */}
        <h2
          id="aescape"
          className="text-2xl font-bold scroll-mt-24 text-[#113D33]"
        >
          What Is an Aescape Robot Massage?
        </h2>

        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl">
          <Image
            src="/assets/aescapeblog7.jpg"
            alt="Aescape robot massage session at Sway Wellness Spa"
            fill
            className="object-cover"
          />
        </div>

        <p>
          <Link
            href="/aescape"
            className="text-[#113D33] font-semibold hover:underline"
          >
            Aescape
          </Link>{" "}
          is a fully autonomous, AI-powered massage system. Two heated robotic
          arms use 3D body-mapping technology — capturing over a million data
          points — to build a personalized massage profile for your body. It
          adjusts pressure in real time, learns your preferences, and delivers a
          precision full-body massage that rivals the best human therapists.
        </p>

        <p>
          Sway is one of the only spas in the country to offer Aescape. The
          60-minute session available through the Maven Hotel partnership is our
          most popular — enough time for a full-body reset without rushing.
        </p>

        <div className="bg-white border border-[#d7e2dc] rounded-xl p-6">
          <p className="font-semibold text-[#113D33] mb-2">
            60-Minute Full Body Aescape Massage
          </p>
          <ul className="space-y-1 text-sm text-[#2b2b2b]">
            <li>
              <strong>Price:</strong> $139
            </li>
            <li>
              <strong>Duration:</strong> 60 minutes
            </li>
            <li>
              <strong>What to bring:</strong> Just yourself — compression apparel
              is provided
            </li>
            <li>
              <strong>Book online:</strong> Under a minute, instant confirmation
            </li>
          </ul>
        </div>

        {/* ── SECTION: Getting There ── */}
        <h2
          id="getting-there"
          className="text-2xl font-bold scroll-mt-24 text-[#113D33]"
        >
          Getting from The Maven to Sway
        </h2>

        <p>
          The Maven Hotel sits at 1850 Wazee Street in the heart of Dairy Block.
          Sway Wellness Spa is at 1509 Larimer Street — just 0.6 miles away on
          Larimer Square. You have a few ways to get there:
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              emoji: "🚶",
              method: "Walk",
              detail: "~10 minutes down Larimer Street",
            },
            {
              emoji: "🛴",
              method: "Scooter",
              detail: "Grab a Lime or Bird — 3-4 minutes",
            },
            {
              emoji: "🚗",
              method: "Drive / Rideshare",
              detail: "~5 minutes — street parking and nearby garages",
            },
          ].map((item) => (
            <div
              key={item.method}
              className="bg-white border border-[#d7e2dc] rounded-xl p-5 text-center"
            >
              <p className="text-2xl mb-2">{item.emoji}</p>
              <p className="font-semibold text-[#113D33]">{item.method}</p>
              <p className="text-sm text-gray-600 mt-1">{item.detail}</p>
            </div>
          ))}
        </div>

        <p>
          The walk itself is a highlight — Larimer Street is one of Denver&apos;s
          most vibrant corridors, lined with restaurants, galleries, and
          independent shops. If you haven&apos;t explored{" "}
          <Link
            href="/blog/things-to-do-in-denver-at-night"
            className="text-[#113D33] font-semibold hover:underline"
          >
            Larimer Square at night
          </Link>
          , this is a great excuse.
        </p>

        {/* ── SECTION: Your Visit ── */}
        <h2
          id="your-visit"
          className="text-2xl font-bold scroll-mt-24 text-[#113D33]"
        >
          What to Expect at Your Visit
        </h2>

        <p>
          Sway was voted{" "}
          <Link
            href="/blog/best-day-spa-in-america"
            className="text-[#113D33] font-semibold hover:underline"
          >
            #4 Best Day Spa in America
          </Link>{" "}
          by USA Today 10Best — and the experience starts the moment you walk in.
          Here&apos;s how your Aescape visit works:
        </p>

        <div className="space-y-3">
          {[
            {
              step: "1",
              title: "Arrive 5 minutes early",
              desc: "Check in at the front desk at 1509 Larimer Street. Our team will get you settled.",
            },
            {
              step: "2",
              title: "Change into compression apparel",
              desc: "We provide everything you need — no need to bring workout clothes or change beforehand.",
            },
            {
              step: "3",
              title: "Get scanned & set preferences",
              desc: "Aescape maps your body in seconds and you choose your focus areas and pressure level.",
            },
            {
              step: "4",
              title: "60 minutes of AI-powered recovery",
              desc: "Lie back and relax. Adjust pressure anytime via the tablet. The system adapts to you in real time.",
            },
            {
              step: "5",
              title: "Walk out reset",
              desc: "Head back to the Maven feeling refreshed — no recovery time needed.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex gap-4 bg-white border border-[#d7e2dc] rounded-xl p-5"
            >
              <div className="w-8 h-8 rounded-full bg-[#113D33] text-white text-sm font-bold flex items-center justify-center shrink-0">
                {item.step}
              </div>
              <div>
                <p className="font-semibold text-[#113D33]">{item.title}</p>
                <p className="text-sm text-gray-600 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── SECTION: Beyond Aescape ── */}
        <h2
          id="beyond-aescape"
          className="text-2xl font-bold scroll-mt-24 text-[#113D33]"
        >
          Beyond Aescape: More at Sway
        </h2>

        <p>
          While the Maven Hotel partnership highlights our 60-minute Aescape
          massage, Sway is a full-service wellness spa with a wide range of
          treatments available to anyone:
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: "Massage Therapy",
              desc: "Salt stone, deep tissue, Swedish, sports, lymphatic drainage, and more",
              href: "/massages",
            },
            {
              title: "Facials",
              desc: "Anti-aging, hydration, acne, vitamin C, and tech-enhanced options",
              href: "/facials",
            },
            {
              title: "Sauna & Cold Plunge",
              desc: "Private sauna suite and cold water therapy for deep recovery",
              href: "/sauna",
            },
            {
              title: "Remedy Room",
              desc: "Full recovery circuit — sauna, cold plunge, compression boots, and LED therapy",
              href: "/remedy-tech",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group block bg-white border border-[#d7e2dc] rounded-xl p-5 hover:shadow-lg transition"
            >
              <p className="font-semibold text-[#113D33] group-hover:underline">
                {item.title}
              </p>
              <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>

        <p>
          Members save 50% on boosts, get access to the private member lounge,
          and can bring a friend at member pricing.{" "}
          <Link
            href="/membership"
            className="text-[#113D33] font-semibold hover:underline"
          >
            Learn about membership
          </Link>
          .
        </p>

        {/* ── SECTION: How to Book ── */}
        <h2
          id="book"
          className="text-2xl font-bold scroll-mt-24 text-[#113D33]"
        >
          How to Book
        </h2>

        <p>
          Booking your 60-minute Aescape massage is simple — pick a date and
          time, enter your details, and you&apos;re confirmed in under a minute.
          No account or app needed.
        </p>

        <div className="bg-[#113D33] text-white rounded-xl p-8 text-center space-y-4">
          <p className="text-xl font-bold">
            Ready to experience Aescape?
          </p>
          <p className="text-sm opacity-90">
            60-minute AI-powered robot massage · $139 · Book online in under a
            minute
          </p>
          <Link
            href="/themavenhotel"
            className="inline-block bg-white text-[#113D33] font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Book Your Massage
          </Link>
        </div>

        <p className="text-sm text-gray-500">
          You can also{" "}
          <Link
            href="/locations/denver-larimer/book"
            className="text-[#113D33] font-semibold hover:underline"
          >
            explore all treatments and book
          </Link>{" "}
          at our Larimer Square location, or call us at{" "}
          <a
            href="tel:+13034766150"
            className="text-[#113D33] font-semibold hover:underline"
          >
            (303) 476-6150
          </a>
          .
        </p>

        {/* ── About the Maven ── */}
        <div className="bg-white border border-[#d7e2dc] rounded-xl p-6 space-y-3">
          <h3 className="text-lg font-bold text-[#113D33]">
            About The Maven Hotel
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            The Maven Hotel is a boutique hotel in the heart of Dairy Block — a
            curated mixed-use destination at 1850 Wazee Street in Denver&apos;s
            LoDo neighborhood. With a walkable location near Coors Field,
            Larimer Square, and Union Station, The Maven is a favorite for both
            business and leisure travelers.{" "}
            <a
              href="https://www.themavenhotel.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#113D33] font-semibold hover:underline"
            >
              Visit themavenhotel.com
            </a>
          </p>
        </div>

        {/* ── Related Articles ── */}
        <div className="pt-10 space-y-6 border-t border-[#d7e2dc]">
          <h2 className="text-2xl font-bold">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/blog/aescape"
              className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-36 overflow-hidden">
                <Image
                  src="/assets/blog22.jpg"
                  alt="AI Meets Recovery: Reset with Aescape"
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
              href="/blog/things-to-do-in-denver-at-night"
              className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-36 overflow-hidden">
                <Image
                  src="/assets/background.png"
                  alt="Best Things to Do in Denver at Night"
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
              href="/blog/best-day-spa-in-america"
              className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-36 overflow-hidden">
                <Image
                  src="/assets/homepage_photo_outside.jpg"
                  alt="#4 Best Day Spa in America"
                  width={400}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">
                  #4 Best Day Spa in America: Sway&apos;s First Year
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
                  name: "Is there a spa near The Maven Hotel in Denver?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes — Sway Wellness Spa is just 0.6 miles from The Maven Hotel at Dairy Block. Located at 1509 Larimer Street on Larimer Square, Sway offers AI-powered Aescape robot massage, traditional massage therapy, facials, sauna, cold plunge, and more. The Maven Hotel has partnered with Sway to offer guests easy access to a 60-minute Aescape session for $139.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do I get from The Maven Hotel to Sway Wellness Spa?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sway is a 10-minute walk, 5-minute drive, or quick scooter ride from The Maven Hotel. Head south on Larimer Street from Dairy Block — Sway is at 1509 Larimer Street, right on Larimer Square.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is an Aescape robot massage?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Aescape is a fully autonomous AI-powered massage system that uses 3D body mapping and heated robotic arms to deliver a personalized full-body massage. It captures over a million data points to adapt pressure and technique in real time. Available at Sway Wellness Spa in Denver.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do I need to be a Maven Hotel guest to book at Sway?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No — Sway Wellness Spa is open to everyone. The Maven Hotel partnership makes it easy for hotel guests to discover and book, but all of Sway's treatments are available to anyone visiting Denver.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What other treatments does Sway offer besides Aescape?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sway offers massage therapy (salt stone, deep tissue, Swedish, sports, lymphatic drainage), facials (anti-aging, hydration, vitamin C, acne), a private sauna suite, cold plunge, LED light therapy, compression therapy, and the Remedy Room recovery circuit. Members save 50% on boosts and add-ons.",
                  },
                },
              ],
            }),
          }}
        />

        <p className="text-xs text-gray-400 pt-4 border-t border-[#d7e2dc]">
          Permalink: swaywellnessspa.com/blog/maven-hotel-denver-spa
        </p>
      </section>
    </div>
  );
}
