"use client";

import Image from "next/image";
import Link from "next/link";

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
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Skincare</span>
          <span className="text-gray-500">May 2025 · By Sway Wellness Team</span>
        </div>

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
          src="/assets/blog15.jpg"
          alt="Sway Pre-Summer Prep"
          width={700}
          height={400}
          className="rounded-lg"
        />

        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#sculpt" className="hover:underline">Sculpt, Smooth, and Glow</a></li>
            <li><a href="#why-now" className="hover:underline">Why Prep Now?</a></li>
            <li><a href="#start" className="hover:underline">Your Summer Glow Starts Here</a></li>
          </ol>
        </nav>

        <h2 id="sculpt" className="text-2xl font-bold scroll-mt-24">Sculpt, Smooth, and Glow</h2>
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

        <h2 id="why-now" className="text-2xl font-bold scroll-mt-24">Why Prep Now?</h2>
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

        <h2 id="start" className="text-2xl font-bold scroll-mt-24">Your Summer Glow Starts Here</h2>
        <p>
          Ready to sculpt, smooth, and glow? Book your pre-summer treatments
          today and feel amazing in every sun-drenched moment.
        </p>

        <div className="pt-4">
          <Link href="/book" className="underline text-[#113D33] font-semibold">
            Book Your Pre-Summer Treatment Now &rarr;
          </Link>
        </div>

        <div className="pt-6">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/blog/sun-protection-post-sun-care" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog18.jpg" alt="Sun Protection Guide" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">The Ultimate Guide to Sun Protection</p></div>
            </Link>
            <Link href="/blog/post-summer-skin-recovery" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog23.jpg" alt="Post-Summer Skin Recovery" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Post-Summer Skin Recovery Starts Now</p></div>
            </Link>
            <Link href="/blog/allergy-season-skincare" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/allergy.jpg" alt="Allergy Season Skincare" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Allergy Season? Soothe Sensitive Skin</p></div>
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-400 pt-4 border-t border-[#d7e2dc]">Permalink: swaywellnessspa.com/blog/summer-prep-guide</p>
      </div>
    </div>
  );
}
