"use client";

import Image from "next/image";
import Link from "next/link";

export default function BestDaySpaLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center max-w-4xl">
          #4 Best Day Spa in America: Sway&apos;s First Year
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
            Award
          </span>
          <span className="text-gray-500">February 2026 · By Sway Wellness Team</span>
        </div>

        {/* Hero Image */}
        <Image
          src="/assets/homepage_photo_outside.jpg"
          alt="Sway Wellness Spa on Larimer Square in Denver, Colorado"
          width={900}
          height={500}
          className="rounded-xl w-full object-cover"
          priority
        />

        {/* Intro */}
        <p>
          Sway Wellness Spa was voted <strong>#4 Best Day Spa in America</strong>{" "}
          by USA Today 10Best. One year in. One location on Larimer Square. A
          national ranking against spas that have been open for decades.
        </p>
        <p>
          This post covers what the award means, what we built in our first year,
          and what you&apos;ll actually find when you walk through the door.
        </p>

        {/* Table of Contents */}
        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li>
              <a href="#the-award" className="hover:underline">
                The Award
              </a>
            </li>
            <li>
              <a href="#year-one" className="hover:underline">
                Year One: What We Built
              </a>
            </li>
            <li>
              <a href="#whats-inside" className="hover:underline">
                What&apos;s Inside Sway
              </a>
            </li>
            <li>
              <a href="#membership" className="hover:underline">
                Membership
              </a>
            </li>
            <li>
              <a href="#whats-next" className="hover:underline">
                What&apos;s Next
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:underline">
                FAQ
              </a>
            </li>
          </ol>
        </nav>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#CFE6D8] rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-[#113D33]">#4</p>
            <p className="font-semibold mt-1">Best Day Spa in America</p>
            <p className="text-sm text-gray-600 mt-1">
              USA Today 10Best 2025
            </p>
          </div>
          <div className="bg-[#CFE6D8] rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-[#113D33]">4</p>
            <p className="font-semibold mt-1">Treatment Categories</p>
            <p className="text-sm text-gray-600 mt-1">
              Massage, Facials, Recovery, Aescape
            </p>
          </div>
          <div className="bg-[#CFE6D8] rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-[#113D33]">1</p>
            <p className="font-semibold mt-1">Year on Larimer Square</p>
            <p className="text-sm text-gray-600 mt-1">Denver, Colorado</p>
          </div>
        </div>

        {/* Section: The Award */}
        <h2
          id="the-award"
          className="text-2xl font-bold scroll-mt-24"
        >
          The Award
        </h2>
        <p>
          USA Today 10Best is a nationally recognized travel and lifestyle awards
          program. A panel of experts nominates the top contenders in each
          category, then readers across the country vote. For the 2025 Best Day
          Spa category, Sway was ranked fourth in the entire United States.
        </p>
        <p>
          That puts Sway alongside destinations that have been operating for 10,
          20, even 30 years. We opened our doors on Larimer Square just one year
          ago. The ranking reflects what our guests already know: this is a
          different kind of wellness experience.
        </p>

        {/* Section: Year One */}
        <h2
          id="year-one"
          className="text-2xl font-bold scroll-mt-24"
        >
          Year One: What We Built
        </h2>
        <p>
          We opened with a simple premise. Wellness should feel modern. It should
          be backed by real science. And it should be accessible enough to make
          part of your actual routine.
        </p>
        <p>
          In our first year on Larimer Square, we brought things to Denver that
          didn&apos;t exist here before. Aescape, the world&apos;s first
          autonomous AI-powered robot massage, launched at Sway as the first
          location in Colorado. The{" "}
          <Link href="/remedy-tech" className="underline text-[#113D33] font-semibold">
            Remedy Room
          </Link>{" "}
          gave Denver a proper recovery circuit: sauna, cold plunge, Normatec
          compression, and LED light therapy in a guided 40-minute session.
        </p>
        <p>
          We built a membership community around the idea that consistent
          wellness matters more than one-off treatments. We partnered with
          Eminence Organics and Dr. Dennis Gross for results-driven skincare. And
          we did it all in a design-forward space on one of Denver&apos;s most
          iconic blocks.
        </p>

        {/* Mid-Article CTA */}
        <div className="bg-[#113D33] text-white rounded-xl p-8 text-center space-y-4">
          <p className="text-xl font-bold">Ready to experience it yourself?</p>
          <p className="text-sm opacity-90">
            Book a massage, facial, recovery session, or Aescape treatment.
          </p>
          <Link
            href="/book"
            className="inline-block bg-white text-[#113D33] font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Book a Treatment
          </Link>
        </div>

        {/* Section: What's Inside */}
        <h2
          id="whats-inside"
          className="text-2xl font-bold scroll-mt-24"
        >
          What&apos;s Inside Sway
        </h2>
        <p>
          Sway is organized around four treatment categories. Each one is
          designed to work on its own or pair with the others for a complete
          wellness session.
        </p>

        <h3 className="text-xl font-semibold">
          <Link href="/massages" className="underline text-[#113D33]">
            Massage
          </Link>
        </h3>
        <p>
          Six types: Basic, Deep Tissue, Himalayan Salt Stone, CBD, Sports, and
          Lymphatic. Every session is 50 minutes with the option to extend to 80.
          Specialty techniques are included in the price. You can add boosts like
          a PEMF infrared mat, cupping, or hot stones to customize your
          treatment.
        </p>

        <h3 className="text-xl font-semibold">
          <Link href="/facials" className="underline text-[#113D33]">
            Facials
          </Link>
        </h3>
        <p>
          Six types built on Eminence Organics and Dr. Dennis Gross protocols:
          Basic, Forever Young, Glow Getter, Pore Perfection, Sensitive Silk, and
          Dr. Dennis Gross Vitamin C. Add high-tech boosts like LED light
          therapy, microcurrent, oxygen infusion, or a chemical peel for
          targeted results.
        </p>

        <h3 className="text-xl font-semibold">
          <Link href="/remedy-tech" className="underline text-[#113D33]">
            Remedy Room
          </Link>
        </h3>
        <p>
          A 40-minute guided recovery circuit combining four modalities: sauna,
          cold plunge, Normatec compression boots, and LED light therapy. Built
          for athletes, professionals, and anyone who takes recovery seriously.
          $49 drop-in, $25 for members.
        </p>

        <h3 className="text-xl font-semibold">
          <Link href="/aescape" className="underline text-[#113D33]">
            Aescape
          </Link>
        </h3>
        <p>
          The world&apos;s first fully autonomous robot massage. Aescape uses 3D
          body mapping and AI to deliver personalized pressure across your back,
          glutes, and legs. You control the session from a tablet. No tipping, no
          small talk, no inconsistency.
        </p>

        {/* Section: Membership */}
        <h2
          id="membership"
          className="text-2xl font-bold scroll-mt-24"
        >
          Membership
        </h2>
        <p>
          Sway memberships are built for people who treat wellness as a routine,
          not an occasional splurge. Members get a monthly treatment, member
          pricing on every boost and add-on, Remedy Room access at a reduced
          rate, and priority booking.
        </p>
        <p>
          No hidden fees.{" "}
          <Link
            href="/membership"
            className="underline text-[#113D33] font-semibold"
          >
            See membership details
          </Link>
          .
        </p>

        {/* Section: What's Next */}
        <h2
          id="whats-next"
          className="text-2xl font-bold scroll-mt-24"
        >
          What&apos;s Next
        </h2>
        <p>
          Year two is about going deeper. More treatments, more technology, and
          more ways to make wellness a consistent part of your life. We&apos;re
          continuing to invest in the things that earned this ranking: expert
          therapists, high-tech tools, and a space that feels genuinely different
          from anything else in Denver.
        </p>
        <p>
          If you haven&apos;t visited yet, this is a good time.{" "}
          <Link
            href="/locations/denver-larimer"
            className="underline text-[#113D33] font-semibold"
          >
            Find us on Larimer Square
          </Link>
          .
        </p>

        {/* FAQ Section */}
        <h2
          id="faq"
          className="text-2xl font-bold scroll-mt-24"
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-0 border-t border-[#d7e2dc]">
          <details className="border-b border-[#d7e2dc] group">
            <summary className="flex items-center justify-between cursor-pointer py-5 font-semibold text-[#113D33]">
              What is Sway Wellness Spa?
              <span className="text-[#9CB7A9] text-xl transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="pb-5 text-gray-700">
              Sway is a modern wellness club on Larimer Square in downtown
              Denver, Colorado. It offers massage, facials, a recovery circuit
              called the Remedy Room (sauna, cold plunge, Normatec compression,
              LED light therapy), and Aescape AI-powered robot massage. Sway was
              voted #4 Best Day Spa in America by USA Today 10Best.
            </div>
          </details>

          <details className="border-b border-[#d7e2dc] group">
            <summary className="flex items-center justify-between cursor-pointer py-5 font-semibold text-[#113D33]">
              What does #4 Best Day Spa in America mean?
              <span className="text-[#9CB7A9] text-xl transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="pb-5 text-gray-700">
              USA Today 10Best is a nationally recognized travel and lifestyle
              awards program. A panel of experts nominates the top contenders,
              then readers across the country vote. Sway was ranked #4 Best Day
              Spa in the United States for 2025.
            </div>
          </details>

          <details className="border-b border-[#d7e2dc] group">
            <summary className="flex items-center justify-between cursor-pointer py-5 font-semibold text-[#113D33]">
              What treatments does Sway offer?
              <span className="text-[#9CB7A9] text-xl transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="pb-5 text-gray-700">
              Sway offers four treatment categories: massage (Basic, Deep
              Tissue, Salt Stone, CBD, Sports, and Lymphatic), facials (Basic,
              Forever Young, Glow Getter, Pore Perfection, Sensitive Silk, and
              Dr. Dennis Gross Vitamin C), the Remedy Room recovery circuit
              (sauna, cold plunge, Normatec compression, LED light therapy), and
              Aescape autonomous AI-powered robot massage.
            </div>
          </details>

          <details className="border-b border-[#d7e2dc] group">
            <summary className="flex items-center justify-between cursor-pointer py-5 font-semibold text-[#113D33]">
              Does Sway offer memberships?
              <span className="text-[#9CB7A9] text-xl transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="pb-5 text-gray-700">
              Yes. Sway offers monthly memberships that include treatments,
              member pricing on boosts and add-ons, and Remedy Room access at a
              reduced rate. No long-term contracts. Details at{" "}
              <Link
                href="/membership"
                className="underline text-[#113D33]"
              >
                swaywellnessspa.com/membership
              </Link>
              .
            </div>
          </details>

          <details className="border-b border-[#d7e2dc] group">
            <summary className="flex items-center justify-between cursor-pointer py-5 font-semibold text-[#113D33]">
              Where is Sway located?
              <span className="text-[#9CB7A9] text-xl transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="pb-5 text-gray-700">
              Sway Wellness Spa is on Larimer Square in downtown Denver,
              Colorado. Walk-ins are welcome and booking is recommended at{" "}
              <Link href="/book" className="underline text-[#113D33]">
                swaywellnessspa.com/book
              </Link>
              .
            </div>
          </details>
        </div>

        {/* Related Articles */}
        <div className="pt-6">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/blog/denver-wellness-club"
              className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-36 overflow-hidden">
                <Image
                  src="/assets/homepage_photo_outside.jpg"
                  alt="Denver's Most Anticipated Wellness Club"
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
              href="/blog/train-like-an-athlete"
              className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-36 overflow-hidden">
                <Image
                  src="/assets/blog20.jpg"
                  alt="Train Like an Athlete, Recover Like an Athlete"
                  width={400}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">
                  Train Like an Athlete, Recover Like an Athlete
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Permalink */}
        <p className="text-xs text-gray-400 pt-4 border-t border-[#d7e2dc]">
          Permalink: swaywellnessspa.com/blog/best-day-spa-in-america
        </p>
      </div>
    </div>
  );
}
