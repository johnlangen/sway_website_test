"use client";

import Image from "next/image";

export default function SummerPrepGuideBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Summer Starts with Skin: Sway’s Pre-Summer Prep Guide
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <p>
          The countdown to pool days, beach weekends, and sun-soaked selfies has
          officially begun. Summer is just around the corner, bringing with it
          all the fun, adventure, and relaxation we’ve been waiting for. But
          before you slip into your favorite bikini, stock up on sunscreen, and
          plan your summer getaways, there’s one key thing to focus on
          first—your skin!
        </p>

        <p>
          At Sway Wellness Spa, we believe that true summer confidence comes
          from feeling good in your own skin. That means sculpted, hydrated, and
          glowing skin that’s ready to shine in the summer sun. To help you get
          there, we’ve created the ultimate pre-summer prep guide filled with
          expert tips, treatments, and skincare advice so you can look and feel
          your absolute best from head to toe.
        </p>

        <Image
          src="/assets/blog15.png"
          alt="Sway Pre-Summer Prep"
          width={700}
          height={400}
          className="rounded-lg"
        />

        <h2 className="text-2xl font-bold">Sculpt, Smooth, and Glow</h2>
        <p>
          Summer prep doesn’t have to feel overwhelming. With a few simple and
          effective treatments, you can prime your skin and body to look and
          feel your best. Whether you’re planning beach days, outdoor
          adventures, or simply want to feel confident in your summer wardrobe,
          here’s what’s on our list of must-dos to get you summer-ready:
        </p>

        <h3 className="text-xl font-bold">1. Lymphatic Drainage Massage</h3>
        <p>
          Feel lighter, leaner, and more confident with the transformative
          benefits of lymphatic drainage massage. This therapeutic treatment
          flushes out excess water retention, improves circulation, and leaves
          your body feeling sculpted and refreshed.
        </p>
        <p>
          At Sway, our licensed therapists ensure you see noticeable results.
          According to the Cleveland Clinic, lymphatic massage can boost
          circulation, reduce swelling, and improve skin radiance.
        </p>

        <h3 className="text-xl font-bold">2. The Microcurrent Super-Boost</h3>
        <p>
          Want a summer-worthy glow? Our microcurrent facial uses low-level
          currents to lift, tone, and smooth facial muscles—like a workout for
          your face. Backed by research and beloved by guests, this treatment
          delivers visible, no-downtime results in one session.
        </p>

        <h3 className="text-xl font-bold">3. Hydrate, Hydrate, Hydrate</h3>
        <p>
          Beat the heat with ultra-hydrated skin. Use hyaluronic acid serums,
          rich masks, and finish with SPF to lock in that dewy glow. Hot days
          call for a skincare routine that keeps up.
        </p>

        <h3 className="text-xl font-bold">4. Regular Massage for Total Relaxation</h3>
        <p>
          Reset your body and mind with our expert massage experiences. We
          recommend the Salt Stone Massage—warm Himalayan stones melt tension
          while 84 trace minerals nourish your skin.
        </p>

        <h2 className="text-2xl font-bold">Why Prep Now?</h2>
        <p>
          Summer may be about spontaneity, but prepping your skin now means
          confidence that lasts. Radiant skin, a refreshed appearance, and a
          sense of care—that’s the Sway difference.
        </p>

        <p>
          At Sway, our team is here to support your summer goals through expert
          services and personalized care. From your first visit to your next
          glow-up, we’re with you every step of the way.
        </p>

        <h2 className="text-2xl font-bold">Your Summer Glow Starts Here</h2>
        <p>
          Ready to sculpt, smooth, and glow? Book your pre-summer treatments
          today and feel amazing in every sun-drenched moment.
        </p>

        <div className="pt-4">
          <a href="/book" className="underline text-blue-600">
            Book Your Pre-Summer Treatment Now →
          </a>
        </div>
      </div>
    </div>
  );
}
