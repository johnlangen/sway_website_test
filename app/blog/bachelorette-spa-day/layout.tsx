"use client";

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
        <p>
          Planning the perfect bachelorette party? Go beyond the usual plans and
          treat your bridal crew to something unforgettable. At Sway Wellness
          Spa, we offer a luxurious, serene escape that’s tailor-made for bridal
          bliss. Think: soothing massages, radiant facials, glowing skin, and
          quality time with your closest friends.
        </p>

        <h2 className="text-2xl font-bold">Why Choose Sway?</h2>
        <p>
          Sway is more than just a spa—it’s a haven for brides-to-be and their
          favorite people. With custom spa packages, wellness-focused add-ons,
          and the option to book out the entire space, we’re ready to turn your
          celebration into a full-on retreat.
        </p>

        <h2 className="text-2xl font-bold">Customizable Treatments</h2>
        <p>
          Every bachelorette party at Sway is unique. Whether you want
          rejuvenating facials, muscle-melting massages, or a mix of both, our
          treatments are fully customizable. Each guest can choose exactly what
          they need to unwind, prep their skin, and feel radiant heading into
          the big day.
        </p>

        <h2 className="text-2xl font-bold">Group Booking Options</h2>
        <p>
          Planning for a group is simple with Sway’s seamless booking. Want
          something extra special? Book the entire spa for a private event just
          for your crew. You’ll enjoy exclusive use of our space, personalized
          services, and a relaxing, memorable environment tailored to your
          celebration.
        </p>

        <h2 className="text-2xl font-bold">Wellness Add-Ons</h2>
        <p>
          Take your spa day to the next level with wellness experiences like
          sauna sessions, cold plunge therapy, body scrubs, or hydrating
          treatments. They’re the perfect blend of pampering and detoxing—ideal
          for brides and bridesmaids alike.
        </p>

        <h2 className="text-2xl font-bold">A Day to Remember</h2>
        <p>
          Imagine arriving with your bridal crew to a calming ambiance, soft
          robes, herbal tea, and a menu of indulgent treatments. You’ll laugh,
          relax, and enjoy quality time before the big day—without the pressure
          of a packed party itinerary.
        </p>

        <p className="italic">
          “Our bachelorette spa day at Sway was the perfect mix of relaxation
          and celebration! We left feeling refreshed and glowing.” – Bride-to-Be
        </p>

        <h2 className="text-2xl font-bold">Plan Your Bachelorette Wellness Day</h2>
        <p>
          Ready to make your bachelorette party unforgettable? Sway makes it
          easy to plan a private, elevated spa celebration that your whole group
          will love. Whether you’re interested in a half-day of pampering or a
          full spa takeover, we’ve got you covered.
        </p>

        <p className="font-semibold">
          💌 Email us now at{" "}
          <a
            href="mailto:contact@swaywellnessspa.com"
            className="underline text-blue-600"
          >
            contact@swaywellnessspa.com
          </a>{" "}
          to start planning!
        </p>
        <p className="text-sm italic pt-2">
          Pro tip: Book early to secure your date and ensure every detail is
          tailored to your vision.
        </p>

        <h2 className="text-2xl font-bold">Glow into Your Big Day</h2>
        <p>
          At Sway, we believe your bachelorette experience should be just as
          special as the wedding itself. With luxury spa treatments,
          unforgettable bonding time, and expert service, we’ll help you and
          your bridal crew feel pampered, confident, and connected.
        </p>

        <div className="pt-6">
          <Link href="/book" className="underline text-blue-600">
            👉 Book Your Spa Day →
          </Link>
        </div>
      </div>
    </div>
  );
}
