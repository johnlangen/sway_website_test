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
        <p>
          Your wedding day is a once-in-a-lifetime event, and feeling confident
          and radiant is paramount. At Sway, we understand the importance of
          looking and feeling your best as you walk down the aisle. That's why
          our expert estheticians have developed tailored, results-driven facials
          designed to make your skin wedding-ready and boost your confidence.
        </p>

        <h2 className="text-2xl font-bold">Why Consistent Facials Are Essential for Brides</h2>
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

        <h2 className="text-2xl font-bold">When to Start Your Bridal Skincare Routine</h2>
        <p>
          The ideal time to begin facials is at least 6–12 months before your
          wedding. This timeline gives your skin time to adjust and reveal its
          best glow, while allowing estheticians to tailor treatments to your
          goals.
        </p>

        <h2 className="text-2xl font-bold">Sway's Facials for Your Wedding Glow</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Forever Young Facial:</strong> Boosts collagen and elasticity for firmness.</li>
          <li><strong>Glow Getter Facial:</strong> Hydrates and revitalizes for a dewy glow.</li>
          <li><strong>Sensitive Silk Facial:</strong> Calms delicate, reactive skin for balance.</li>
        </ul>

        <h2 className="text-2xl font-bold">Membership Perks</h2>
        <p>
          With a Sway membership, you’ll get regular treatments at a lower rate,
          plus perks like discounted LED light therapy, microcurrent, or
          dermaflash add-ons for enhanced results.
        </p>

        <h2 className="text-2xl font-bold">FAQs About Pre-Wedding Skincare</h2>
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
      </div>
    </div>
  );
}
