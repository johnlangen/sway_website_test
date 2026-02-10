"use client";

import Image from "next/image";

export default function MothersDayGiftGuideLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Moms Deserve Sway More: A Mother’s Day Spa Day Gift Guide
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <p>
          Motherhood is a full-time commitment, filled with endless
          responsibilities and love, and no one deserves relaxation and wellness
          more than the moms in our lives. That’s where Sway Wellness Spa comes
          in—the perfect way to remind her how deeply she’s appreciated.
        </p>

        <p>
          This Mother’s Day, give her the gift of wellness and self-care. From
          calming massages and revitalizing facials to soothing aromatherapy,
          Sway offers a range of treatments designed to help her relax and
          recharge. Because moms do so much for everyone else—they deserve
          (S)way more.
        </p>

        <Image
          src="/assets/blog16.jpg"
          alt="Mother's Day Spa Guide"
          width={700}
          height={400}
          className="rounded-lg"
        />

        <h2 className="text-2xl font-bold">Why Self-Care Matters for Moms</h2>
        <p>
          Juggling endless responsibilities often leaves moms little time for
          themselves. But self-care is essential—according to the Mayo Clinic,
          it helps reduce stress, prevent burnout, and improve emotional
          well-being. Giving mom the space to relax means giving her the ability
          to show up fully.
        </p>

        <p>
          A Sway spa experience is more than a moment of peace—it’s a chance to
          recharge mentally and physically.
        </p>

        <h2 className="text-2xl font-bold">The Ultimate Mother’s Day Gift</h2>
        <p>
          Whether she needs a facial, massage, or moment of quiet, Sway
          delivers. She’ll be welcomed with calm, cared for by experts, and
          leave feeling deeply appreciated.
        </p>

        <h3 className="text-xl font-bold">Gift Card Specials</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Buy $150 → Get $25 Bonus</li>
          <li>Buy $300 → Get $50 Bonus</li>
        </ul>
        <p>Let her choose what speaks to her with a flexible, luxury gift card.</p>

        <h3 className="text-xl font-bold">Sway Memberships</h3>
        <p>
          <strong>Give a Membership for Only $99</strong>
          <br />
          She’ll receive monthly wellness rituals—from facials to massages—that
          nourish her all year long. It’s a gift that reminds her to prioritize
          herself.
        </p>

        <h2 className="text-2xl font-bold">Customer Love</h2>
        <blockquote className="border-l-4 border-[#113D33] pl-4 italic text-gray-700">
          "I'm so, so happy you opened in Denver—I've had the robot massage in
          NYC (we moved to CO in August), and I couldn't believe how effective
          it is! I'm asking for a monthly membership for Mother's Day."
          <br />– Kadie D., Denverite
        </blockquote>

        <h2 className="text-2xl font-bold">Add a Personal Touch</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>A handwritten note expressing gratitude</li>
          <li>Her favorite flowers to brighten her day</li>
          <li>A self-care kit with bath salts, candles, and cozy robes</li>
        </ul>

        <h2 className="text-2xl font-bold">Why Sway?</h2>
        <p>
          At Sway Wellness Spa, we’re passionate about caring for the caregivers.
          Our expert team and serene environment help restore both body and
          mind.
        </p>

        <h2 className="text-2xl font-bold">Celebrate All That She Does</h2>
        <p>
          This Mother’s Day, go beyond chocolates and flowers. Give her *time*—
          to rest, reset, and feel seen. Whether it’s a spa day, massage, or
          thoughtful membership, she deserves the best.
        </p>

        <div className="pt-4">
          <a href="/gift-cards" className="underline text-blue-600">
            Explore Gift Cards and Memberships →
          </a>
        </div>
      </div>
    </div>
  );
}
