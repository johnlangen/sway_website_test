"use client";

import Image from "next/image";
import Link from "next/link";

export default function GlowUpBeforeYouShowUpLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Glow Up Before You Show Up: Spa for Students
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        {/* Back + Date + Tag */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Wellness</span>
          <span className="text-gray-500">February 2025 · By Sway Wellness Team</span>
        </div>

        <p>
          College life is demanding, and today’s students are juggling more than ever...
        </p>

        <p>
          That’s why Sway Wellness Spa created the ultimate student reset experience...
        </p>

        <Image
          src="/assets/blog21.jpg"
          alt="Student Spa Day at Sway"
          width={700}
          height={400}
          className="rounded-lg"
        />

        {/* Table of Contents */}
        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#why-students" className="hover:underline">Why Students Need Spa Treatments</a></li>
            <li><a href="#sway-difference" className="hover:underline">The Sway Difference</a></li>
            <li><a href="#wellness-ritual" className="hover:underline">Build Your Wellness Ritual</a></li>
            <li><a href="#science" className="hover:underline">The Science Behind Spa Wellness</a></li>
            <li><a href="#offers" className="hover:underline">Special Offers for Students</a></li>
            <li><a href="#academic-success" className="hover:underline">Wellness &amp; Academic Success</a></li>
          </ol>
        </nav>

        <h2 id="why-students" className="text-2xl font-bold scroll-mt-24">Why Students Need Spa Treatments More Than Ever</h2>
        <p>
          Academic stress can seriously impact your health. Chronic stress spikes cortisol...
        </p>

        <p>
          The good news? Treatments like massage therapy have been proven to lower cortisol...
        </p>

        <h2 id="sway-difference" className="text-2xl font-bold scroll-mt-24">The Sway Difference: Wellness That Fits Your Life</h2>
        <h3 className="text-xl font-bold">Quick Relief Between Classes</h3>
        <p>
          Our 15-minute robot massage is perfect for an on-the-go reset...
        </p>

        <h3 className="text-xl font-bold">The Remedy Room Experience</h3>
        <ul className="list-disc list-inside">
          <li><strong>Cold Plunge Therapy</strong> — Reduces inflammation, boosts mood, and improves focus.</li>
          <li><strong>Sauna Experience</strong> — Eases sore muscles, improves circulation, and promotes detox.</li>
          <li><strong>LED Light Therapy</strong> — Stimulates skin repair and reduces inflammation.</li>
          <li><strong>Normatec Compression Boots</strong> — Alleviates soreness and reduces swelling.</li>
        </ul>

        <h3 className="text-xl font-bold">Customized Facials for Every Occasion</h3>
        <p>
          Whether it’s before a big event or interview, our customized facials refresh your skin...
        </p>

        <blockquote className="italic border-l-4 border-[#113D33] pl-4 text-gray-700">
          "Sway is my go-to for skincare before interviews or big events..." — Jordan, DU Grad Student
        </blockquote>

        <h3 className="text-xl font-bold">Therapeutic Massages That Actually Work</h3>
        <p>
          Our evidence-based massages relieve tension, improve circulation, and reduce anxiety...
        </p>

        <blockquote className="italic border-l-4 border-[#113D33] pl-4 text-gray-700">
          "I had no idea how much I needed this until I walked out feeling completely recharged." — Sam, DU Junior
        </blockquote>

        <h2 id="wellness-ritual" className="text-2xl font-bold scroll-mt-24">Build Your Personal Wellness Ritual</h2>
        <ul className="list-disc list-inside">
          <li><strong>The Quick Reset (15 min):</strong> Robot massage...</li>
          <li><strong>The Glow Up (60 min):</strong> Customized facial + LED...</li>
          <li><strong>The Full Recharge (90 min):</strong> Therapeutic massage + sauna + cold plunge...</li>
          <li><strong>The Study Break (40 min):</strong> Remedy Room + Normatec boots + LED therapy.</li>
        </ul>

        <h2 id="science" className="text-2xl font-bold scroll-mt-24">The Science Behind Spa Wellness</h2>
        <p>
          Science backs it up—spa treatments reduce stress, improve sleep, and enhance focus...
        </p>

        <h2 id="offers" className="text-2xl font-bold scroll-mt-24">Special Offers for Students</h2>
        <ul className="list-disc list-inside">
          <li><strong>Back-to-School Special:</strong> $40 off your first facial or massage with valid student ID...</li>
          <li><strong>Membership Deal:</strong> Join by Aug 31 to get 3 free Remedy Room visits...</li>
        </ul>

        <h2 id="academic-success" className="text-2xl font-bold scroll-mt-24">Making Wellness Part of Academic Success</h2>
        <p>
          Self-care is a strategy—not a luxury. It boosts focus, confidence, and resilience...
        </p>

        <h2 className="text-2xl font-bold scroll-mt-24">Tips for Students Incorporating Spa into Life</h2>
        <ul className="list-disc list-inside">
          <li>Schedule treatments during low-stress times.</li>
          <li>Bring friends for a group wellness experience.</li>
          <li>Book ahead of interviews or presentations.</li>
          <li>Listen to your body’s signals and act on them.</li>
        </ul>

        <h2 className="text-2xl font-bold scroll-mt-24">Your Path to Peak Performance Starts Here</h2>
        <p>
          Ready to feel your best? Book your treatment today and see why students across Denver trust Sway...
        </p>

        <div className="pt-4">
          <Link href="/book" className="underline text-[#113D33] font-semibold">
            Book Your Student Spa Experience &rarr;
          </Link>
        </div>

        {/* Related Articles */}
        <div className="pt-6">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/blog/science-of-relaxation" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden">
                <Image src="/assets/blog11.jpg" alt="Science of Relaxation" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">Science of Relaxation: Spa Treatments &amp; Stress</p>
              </div>
            </Link>
            <Link href="/blog/train-like-an-athlete" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden">
                <Image src="/assets/blog20.jpg" alt="Train Like an Athlete" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">Train Like an Athlete, Recover Like an Athlete</p>
              </div>
            </Link>
            <Link href="/blog/may-memberships" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden">
                <Image src="/assets/blog17.jpg" alt="Sway Memberships" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">May Memberships at Sway Wellness Spa</p>
              </div>
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-400 pt-4 border-t border-[#d7e2dc]">
          Permalink: swaywellnessspa.com/blog/glow-up-before-you-show-up
        </p>
      </div>
    </div>
  );
}
