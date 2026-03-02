"use client";

import Image from "next/image";
import Link from "next/link";

export default function BridalSkincareBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Bridal Skincare: Get Wedding-Ready Skin with Sway Facials
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
          Your wedding day is a once-in-a-lifetime event, and feeling confident
          and radiant is paramount. At Sway, we understand the importance of
          looking and feeling your best as you walk down the aisle. That's why
          our expert estheticians have developed tailored, results-driven facials
          designed to make your skin wedding-ready and boost your confidence.
        </p>

        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#why-consistent-facials-are-essential-for-brides" className="hover:underline">Why Consistent Facials Are Essential for Brides</a></li>
            <li><a href="#when-to-start-your-bridal-skincare-routine" className="hover:underline">When to Start Your Bridal Skincare Routine</a></li>
            <li><a href="#sways-facials-for-your-wedding-glow" className="hover:underline">Sway&apos;s Facials for Your Wedding Glow</a></li>
            <li><a href="#membership-perks" className="hover:underline">Membership Perks</a></li>
            <li><a href="#faqs-about-pre-wedding-skincare" className="hover:underline">FAQs About Pre-Wedding Skincare</a></li>
          </ol>
        </nav>

        <h2 id="why-consistent-facials-are-essential-for-brides" className="text-2xl font-bold scroll-mt-24">Why Consistent Facials Are Essential for Brides</h2>
        <p>
          The secret to glowing, photo-ready skin isn't a last-minute fix – it's
          a journey. Starting a consistent skincare routine months in advance
          allows your skin ample time to renew, repair, and reach its full
          potential. Here's how facials can transform your wedding prep:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Boost Your Glow:</strong> Vitamin C and hydration facials target dullness and uneven tone.</li>
          <li><strong>Address Skin Concerns:</strong> Custom facial plans for clear, balanced skin.</li>
          <li><strong>Relax and De-Stress:</strong> Treatments help calm nerves before the big day.</li>
        </ul>

        <Image
          src="/assets/blog3.jpg"
          alt="Bridal Skincare Facials at Sway"
          width={700}
          height={400}
          className="rounded-lg"
        />

        <h2 id="when-to-start-your-bridal-skincare-routine" className="text-2xl font-bold scroll-mt-24">When to Start Your Bridal Skincare Routine</h2>
        <p>
          The ideal time to begin facials is at least 6–12 months before your
          wedding. This timeline gives your skin time to adjust and reveal its
          best glow, while allowing estheticians to tailor treatments to your
          goals.
        </p>

        <h2 id="sways-facials-for-your-wedding-glow" className="text-2xl font-bold scroll-mt-24">Sway&apos;s Facials for Your Wedding Glow</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Forever Young Facial:</strong> Boosts collagen and elasticity for firmness.</li>
          <li><strong>Glow Getter Facial:</strong> Hydrates and revitalizes for a dewy glow.</li>
          <li><strong>Sensitive Silk Facial:</strong> Calms delicate, reactive skin for balance.</li>
        </ul>

        <h2 id="membership-perks" className="text-2xl font-bold scroll-mt-24">Membership Perks</h2>
        <p>
          With a Sway membership, you’ll get regular treatments at a lower rate,
          plus perks like discounted LED light therapy, microcurrent, or
          dermaflash add-ons for enhanced results.
        </p>

        <h2 id="faqs-about-pre-wedding-skincare" className="text-2xl font-bold scroll-mt-24">FAQs About Pre-Wedding Skincare</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>How often should I get facials?</strong> Monthly, starting 6–12 months before your wedding.</li>
          <li><strong>Which facial gives the best glow?</strong> The Glow Getter Facial is a bride favorite.</li>
        </ul>

        <p className="italic text-gray-700">
          “Consistent facials helped me feel so confident on my wedding day—I
          couldn’t stop smiling in photos!” – Emily, Sway Bride
        </p>

        <p>
          At Sway, we’re more than a spa—we’re your skincare partner for this
          milestone moment. Our expert estheticians will help you achieve
          radiant, wedding-ready skin that leaves you glowing down the aisle.
        </p>

        <div className="pt-4">
          <Link
            href="/membership"
            className="inline-block bg-[#113D33] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0e322b] transition"
          >
            Schedule Your Wedding Skincare Today
          </Link>
        </div>

        {/* Related Articles */}
        <div className="pt-10 space-y-6">
          <h2 className="text-2xl font-bold">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/blog/bachelorette-spa-day" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog14.jpg" alt="The Ultimate Bachelorette Spa Day" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">The Ultimate Bachelorette Spa Day</p></div>
            </Link>
            <Link href="/blog/vitamin-c-facial" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog4.jpg" alt="Brighten Your Skin with Vitamin C Facial" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Brighten Your Skin with Vitamin C Facial</p></div>
            </Link>
            <Link href="/blog/summer-prep-guide" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog15.jpg" alt="Summer Starts with Skin: Pre-Summer Prep" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Summer Starts with Skin: Pre-Summer Prep</p></div>
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-400 pt-4 border-t border-[#d7e2dc]">Permalink: swaywellnessspa.com/blog/bridal-skincare</p>
      </div>
    </div>
  );
}
