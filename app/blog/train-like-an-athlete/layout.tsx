"use client";

import Image from "next/image";
import Link from "next/link";

export default function TrainLikeAnAthleteBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Train Like an Athlete, Recover Like an Athlete
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        {/* Back + Date + Tag */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Recovery</span>
          <span className="text-gray-500">January 2025</span>
        </div>

        <p>
          Whether you're pushing your limits on the track, at the gym, or on your yoga mat, 
          optimal recovery is essential for achieving peak performance and avoiding injury. 
          Recovery isn’t just about resting—it’s about giving your body the tools it needs 
          to heal, rebuild, and come back stronger.
        </p>

        <p>
          At Sway, we’re redefining what recovery means by combining cutting-edge science 
          with spa-like relaxation to offer a holistic approach to fitness and wellness. 
          From advanced therapies designed to reduce muscle soreness and inflammation to 
          calming treatments that soothe the mind, we provide everything you need to feel your best.
        </p>

        <Image
          src="/assets/blog20.jpg"
          alt="Athlete Recovery at Sway"
          width={700}
          height={400}
          className="rounded-lg"
        />

        {/* Table of Contents */}
        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#why-recovery" className="hover:underline">Why Recovery is a Game-Changer</a></li>
            <li><a href="#elite-recovery" className="hover:underline">Experience Elite Recovery at Sway</a></li>
            <li><a href="#benefits" className="hover:underline">The Benefits of Smart Recovery</a></li>
            <li><a href="#science" className="hover:underline">The Science Behind Our Approach</a></li>
          </ol>
        </nav>

        <h2 id="why-recovery" className="text-2xl font-bold scroll-mt-24">Why Recovery is a Game-Changer</h2>
        <p>
          Recovery isn’t just about feeling better after a workout; it’s a strategic tool 
          for enhancing performance, preventing injuries, and maintaining long-term physical 
          and mental balance. Incorporating effective recovery methods can help your body 
          adapt to training, rebuild muscles, and reduce fatigue.
        </p>

        <p>
          According to a systematic review in BMJ Open Sport & Exercise Medicine, techniques 
          like sports massage have been shown to reduce muscle soreness and improve flexibility. 
          Whether you’re a seasoned athlete or just starting out, recovery is key to achieving your goals.
        </p>

        <blockquote className="italic border-l-4 border-[#113D33] pl-4 text-gray-700">
          "The sports massage and Remedy Room combo completely changed my recovery routine. 
          I felt the difference after just one session." — Jordan K., Sway Guest
        </blockquote>

        <h2 id="elite-recovery" className="text-2xl font-bold scroll-mt-24">Experience Elite Recovery at Sway</h2>

        <h3 className="text-xl font-bold">1. Sports Massage</h3>
        <p>
          Our Sports Massage targets tight muscles, improves circulation, and supports your 
          active lifestyle. It's designed for those who demand real results from their recovery routine.
        </p>
        <p><strong>Member Price:</strong> $99<br /><strong>Drop-In Rate:</strong> $139</p>

        <h3 className="text-xl font-bold">2. The Remedy Room</h3>
        <p>Your all-in-one recovery space, the Remedy Room features:</p>
        <ul className="list-disc list-inside">
          <li>Normatec Compression Boots</li>
          <li>Cold Plunge Baths</li>
          <li>Dry Sauna</li>
          <li>LED Light Therapy</li>
        </ul>
        <p>Member Access: $25 | Drop-In: $40</p>

        <blockquote className="italic border-l-4 border-[#113D33] pl-4 text-gray-700">
          "We designed our recovery treatments to deliver the same quality tools that 
          elite athletes use—but in a spa environment you’ll actually look forward to." 
          — Emily Langenderfer, Co-Founder of Sway
        </blockquote>

        <h2 id="benefits" className="text-2xl font-bold scroll-mt-24">The Benefits of Smart Recovery</h2>
        <ul className="list-disc list-inside">
          <li>Improved muscle flexibility and reduced stiffness</li>
          <li>Faster recovery between workouts</li>
          <li>Less soreness and inflammation</li>
          <li>A clearer, more focused mind</li>
        </ul>

        <h2 id="science" className="text-2xl font-bold scroll-mt-24">The Science Behind Our Approach</h2>
        <p>
          Research confirms recovery is more than a luxury—it’s essential. We’ve taken those 
          findings and turned them into innovative, science-backed treatments accessible to 
          everyone. Recovery is a vital part of achieving your goals.
        </p>

        <h2 className="text-2xl font-bold scroll-mt-24">Don&apos;t Just Train Hard. Recover Smart.</h2>
        <p>
          Whether you’re relieving tension with a Sports Massage or recharging in the Remedy Room, 
          we’re here to support your wellness. Start your recovery today!
        </p>

        <div className="pt-4">
          <Link href="/remedy-tech" className="underline text-[#113D33] font-semibold">
            Book Your Recovery Treatment &rarr;
          </Link>
        </div>

        {/* Related Articles */}
        <div className="pt-6">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/blog/cold-plunge" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden">
                <Image src="/assets/blog7.jpg" alt="Cold Plunge" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">Cold Plunge: Why It&apos;s a Hot Trend in Wellness</p>
              </div>
            </Link>
            <Link href="/blog/80-minute-massage" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden">
                <Image src="/assets/blog25.jpg" alt="80-Minute Massage" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">Why an 80-Minute Massage Is the Ultimate Reset</p>
              </div>
            </Link>
            <Link href="/blog/infrared-pemf-mat" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden">
                <Image src="/assets/blog12.jpg" alt="Infrared PEMF Mat" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">Supercharge Your Massage: Infrared PEMF Mats</p>
              </div>
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-400 pt-4 border-t border-[#d7e2dc]">
          Permalink: swaywellnessspa.com/blog/train-like-an-athlete
        </p>
      </div>
    </div>
  );
}
