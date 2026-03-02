"use client";

import Image from "next/image";
import Link from "next/link";

export default function BacheloretteSpaDayBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          The Ultimate Bachelorette Spa Day: Relax, Celebrate, Repeat!
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Bridal</span>
          <span className="text-gray-500">March 2025 · By Sway Wellness Team</span>
        </div>

        <p>
          Planning the perfect bachelorette party? Go beyond the usual plans and
          treat your bridal crew to something unforgettable. At Sway Wellness
          Spa, we offer a luxurious, serene escape that&apos;s tailor-made for bridal
          bliss. Think: soothing massages, radiant facials, glowing skin, and
          quality time with your closest friends.
        </p>

        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#why-choose-sway" className="hover:underline">Why Choose Sway?</a></li>
            <li><a href="#customizable-treatments" className="hover:underline">Customizable Treatments</a></li>
            <li><a href="#group-booking-options" className="hover:underline">Group Booking Options</a></li>
            <li><a href="#wellness-add-ons" className="hover:underline">Wellness Add-Ons</a></li>
            <li><a href="#a-day-to-remember" className="hover:underline">A Day to Remember</a></li>
            <li><a href="#plan-your-bachelorette" className="hover:underline">Plan Your Bachelorette Wellness Day</a></li>
            <li><a href="#glow-into-your-big-day" className="hover:underline">Glow into Your Big Day</a></li>
          </ol>
        </nav>

        <h2 id="why-choose-sway" className="text-2xl font-bold scroll-mt-24">Why Choose Sway?</h2>
        <p>
          Sway is more than just a spa—it&apos;s a haven for brides-to-be and their
          favorite people. With custom spa packages, wellness-focused add-ons,
          and the option to book out the entire space, we&apos;re ready to turn your
          celebration into a full-on retreat.
        </p>

        <h2 id="customizable-treatments" className="text-2xl font-bold scroll-mt-24">Customizable Treatments</h2>
        <p>
          Every bachelorette party at Sway is unique. Whether you want
          rejuvenating facials, muscle-melting massages, or a mix of both, our
          treatments are fully customizable. Each guest can choose exactly what
          they need to unwind, prep their skin, and feel radiant heading into
          the big day.
        </p>

        <h2 id="group-booking-options" className="text-2xl font-bold scroll-mt-24">Group Booking Options</h2>
        <p>
          Planning for a group is simple with Sway&apos;s seamless booking. Want
          something extra special? Book the entire spa for a private event just
          for your crew. You&apos;ll enjoy exclusive use of our space, personalized
          services, and a relaxing, memorable environment tailored to your
          celebration.
        </p>

        <h2 id="wellness-add-ons" className="text-2xl font-bold scroll-mt-24">Wellness Add-Ons</h2>
        <p>
          Take your spa day to the next level with wellness experiences like
          sauna sessions, cold plunge therapy, body scrubs, or hydrating
          treatments. They&apos;re the perfect blend of pampering and detoxing—ideal
          for brides and bridesmaids alike.
        </p>

        <h2 id="a-day-to-remember" className="text-2xl font-bold scroll-mt-24">A Day to Remember</h2>
        <p>
          Imagine arriving with your bridal crew to a calming ambiance, soft
          robes, herbal tea, and a menu of indulgent treatments. You&apos;ll laugh,
          relax, and enjoy quality time before the big day—without the pressure
          of a packed party itinerary.
        </p>

        <p className="italic">
          &ldquo;Our bachelorette spa day at Sway was the perfect mix of relaxation
          and celebration! We left feeling refreshed and glowing.&rdquo; – Bride-to-Be
        </p>

        <h2 id="plan-your-bachelorette" className="text-2xl font-bold scroll-mt-24">Plan Your Bachelorette Wellness Day</h2>
        <p>
          Ready to make your bachelorette party unforgettable? Sway makes it
          easy to plan a private, elevated spa celebration that your whole group
          will love. Whether you&apos;re interested in a half-day of pampering or a
          full spa takeover, we&apos;ve got you covered.
        </p>

        <p className="font-semibold">
          Email us now at{" "}
          <Link
            href="mailto:contact@swaywellnessspa.com"
            className="underline text-[#113D33] font-semibold"
          >
            contact@swaywellnessspa.com
          </Link>{" "}
          to start planning!
        </p>
        <p className="text-sm italic pt-2">
          Pro tip: Book early to secure your date and ensure every detail is
          tailored to your vision.
        </p>

        <h2 id="glow-into-your-big-day" className="text-2xl font-bold scroll-mt-24">Glow into Your Big Day</h2>
        <p>
          At Sway, we believe your bachelorette experience should be just as
          special as the wedding itself. With luxury spa treatments,
          unforgettable bonding time, and expert service, we&apos;ll help you and
          your bridal crew feel pampered, confident, and connected.
        </p>

        <div className="pt-6">
          <Link href="/book" className="underline text-[#113D33] font-semibold">
            Book Your Spa Day
          </Link>
        </div>

        {/* Related Articles */}
        <div className="pt-12 border-t border-[#d7e2dc]">
          <h3 className="text-xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/blog/bridal-skincare" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog3.jpg" alt="Bridal Skincare" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Bridal Skincare: Get Wedding-Ready Skin with Sway Facials</p></div>
            </Link>
            <Link href="/blog/mothers-day-gift-guide" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog16.jpg" alt="Mother's Day Gift Guide" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Moms Deserve Sway More: A Mother&apos;s Day Spa Day Gift Guide</p></div>
            </Link>
            <Link href="/blog/valentines-day-wellness" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog6.jpg" alt="Valentine's Day Wellness" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Celebrate Valentine&apos;s Day Through Wellness</p></div>
            </Link>
          </div>
        </div>

        {/* Permalink */}
        <div className="text-sm text-gray-400 pt-4">
          Permalink: <Link href="/blog/bachelorette-spa-day" className="underline hover:text-[#113D33]">/blog/bachelorette-spa-day</Link>
        </div>
      </div>
    </div>
  );
}
