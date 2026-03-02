"use client";

import Link from "next/link";
import Image from "next/image";

export default function HimalayanSaltStoneMassageLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Himalayan Salt Stone Massage: Ultimate Relaxation at Sway Spa
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Massage</span>
          <span className="text-gray-500">February 2025 · By Sway Wellness Team</span>
        </div>

        <p>
          The weight of daily stressors can take a toll on both your mind and body,
          leaving you feeling depleted and in need of true relaxation. That&apos;s why
          Sway Wellness Spa is proud to offer the Himalayan Salt Stone Treatment &ndash; a
          luxurious and therapeutic experience designed to melt away tension, promote
          deep relaxation, and deliver a wealth of holistic wellness benefits.
        </p>

        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#what-is-himalayan-salt-stone" className="hover:underline">What is the Himalayan Salt Stone Treatment?</a></li>
            <li><a href="#benefits-of-himalayan-salt-stones" className="hover:underline">The Benefits of Himalayan Salt Stones</a></li>
            <li><a href="#what-to-expect" className="hover:underline">What to Expect During Your Treatment at Sway</a></li>
            <li><a href="#why-choose-sway" className="hover:underline">Why Choose Sway for Your Salt Stone Treatment?</a></li>
            <li><a href="#perfect-winter-wellness" className="hover:underline">The Perfect Winter Wellness Boost</a></li>
            <li><a href="#science-of-massage" className="hover:underline">The Science of Massage</a></li>
          </ol>
        </nav>

        <h2 id="what-is-himalayan-salt-stone" className="text-2xl font-bold scroll-mt-24">What is the Himalayan Salt Stone Treatment?</h2>
        <p>
          Our Himalayan Salt Stone Treatment elevates the traditional massage by
          incorporating smooth, warmed stones made from pure Himalayan salt...
        </p>

        <Image
          src="/assets/blog5.jpg"
          alt="Himalayan Salt Stone Massage"
          width={600}
          height={400}
          className="rounded-lg"
        />

        <h2 id="benefits-of-himalayan-salt-stones" className="text-2xl font-bold scroll-mt-24">The Benefits of Himalayan Salt Stones</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Deep Relaxation:</strong> Gentle warmth eases tension more effectively than traditional massage.</li>
          <li><strong>Detoxification:</strong> Natural salt draws out toxins and supports internal balance.</li>
          <li><strong>Improved Circulation:</strong> Minerals support healthy blood flow and vitality.</li>
          <li><strong>Skin Nourishment:</strong> Leaves skin smooth, hydrated, and glowing.</li>
          <li><strong>Balancing Energy:</strong> Believed to emit negative ions that promote emotional well-being.</li>
        </ul>

        <h2 id="what-to-expect" className="text-2xl font-bold scroll-mt-24">What to Expect During Your Treatment at Sway</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Warm Himalayan Salt Stones:</strong> Used in soothing strokes to release muscle tension.</li>
          <li><strong>Personalized Pressure:</strong> Light, medium, or firm – tailored to your needs.</li>
          <li><strong>A Re-Awakening Environment:</strong> A serene and immersive space to fully unwind.</li>
        </ul>

        <h2 id="why-choose-sway" className="text-2xl font-bold scroll-mt-24">Why Choose Sway for Your Salt Stone Treatment?</h2>
        <p>
          At Sway, we combine expert massage techniques with the finest wellness tools
          to provide treatments that go far beyond ordinary relaxation...
        </p>

        <h2 id="perfect-winter-wellness" className="text-2xl font-bold scroll-mt-24">The Perfect Winter Wellness Boost</h2>
        <p>
          Cold weather can often lead to stiff muscles, increased stress, and fatigue.
          This winter, let the warmth and healing properties of Himalayan salt stones
          restore your body and refresh your mind...
        </p>

        <h2 id="science-of-massage" className="text-2xl font-bold scroll-mt-24">The Science of Massage</h2>
        <p>
          "Massage therapy has shown promising results in pain management...
          <em>Massage therapy for fibromyalgia: a systematic review and meta-analysis
          of randomized controlled trials. PLoS One. 2014;9(2):e89304.</em>
        </p>

        <div className="pt-4">
          <Link
            href="/massages"
            className="text-[#113D33] font-semibold hover:underline"
          >
            Schedule Your Himalayan Salt Stone Massage Now!
          </Link>
        </div>

        {/* Related Articles */}
        <div className="pt-10 space-y-6">
          <h2 className="text-2xl font-bold">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/blog/80-minute-massage" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog25.jpg" alt="Why an 80-Minute Massage Is the Ultimate Reset" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Why an 80-Minute Massage Is the Ultimate Reset</p></div>
            </Link>
            <Link href="/blog/infrared-pemf-mat" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog12.jpg" alt="Supercharge Your Massage: Infrared PEMF Mats" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Supercharge Your Massage: Infrared PEMF Mats</p></div>
            </Link>
            <Link href="/blog/cold-plunge" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog7.jpg" alt="Cold Plunge: A Hot Trend in Wellness" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Cold Plunge: A Hot Trend in Wellness</p></div>
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-400 pt-4 border-t border-[#d7e2dc]">Permalink: swaywellnessspa.com/blog/himalayan-salt-stone-massage</p>
      </div>
    </div>
  );
}
