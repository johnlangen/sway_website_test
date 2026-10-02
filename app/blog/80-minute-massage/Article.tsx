"use client";

import Image from "next/image";
import Link from "next/link";

export default function Massage80MinBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Take Time for You: Why a Longer Massage Is the Ultimate Reset
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        {/* Back + Date + Tag */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Massage</span>
          <span className="text-gray-500">Updated October 2026 · By Sway Wellness Team</span>
        </div>

        <p>
          Sometimes, your mind and body send clear signals that it&apos;s time
          for a break. Maybe it&apos;s the tension building in your shoulders
          after sitting at your desk all day, the persistent lower back pain
          that just won&apos;t go away, or the mental fog that makes even simple
          tasks feel overwhelming. Whatever the signs, they&apos;re telling you
          something important: it&apos;s time to prioritize yourself, and to
          give yourself more than the standard 50 minutes.
        </p>

        <div className="bg-white rounded-xl border border-[#d7e2dc] p-6 space-y-2">
          <p className="font-bold text-[#113D33]">Looking for an 80-minute massage?</p>
          <p className="text-[15px] text-gray-700">
            Sway&apos;s longer massages are <strong>70 minutes</strong> and{" "}
            <strong>90 minutes</strong>. The 70-minute Premier Signature Massage
            and the 70-minute Ultimate massages (Deep Tissue, Sports, Salt
            Stone, and Lymphatic Drainage) give you real extra time, and the
            90-minute Ultimate Signature Massage is our longest session.
          </p>
        </div>

        <p>
          With extra time, your specialist can focus on stubborn knots, target
          multiple areas of concern, and still give you a thorough full-body
          massage without rushing. It&apos;s not just a longer massage,
          it&apos;s an investment in your well-being. You&apos;ll leave feeling
          lighter, calmer, and ready to take on whatever comes your way.
        </p>

        <Image
          src="/assets/blog25.jpg"
          alt="Longer massage at Sway Wellness Spa in Denver"
          width={700}
          height={400}
          className="rounded-lg"
        />

        {/* Table of Contents */}
        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#options" className="hover:underline">Your Longer Massage Options</a></li>
            <li><a href="#benefits" className="hover:underline">The Benefits of a Longer Massage</a></li>
            <li><a href="#how-to-book" className="hover:underline">How to Book</a></li>
          </ol>
        </nav>

        <h2 id="options" className="text-2xl font-bold scroll-mt-24">
          Your Longer Massage Options
        </h2>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>70-minute Premier Signature Massage</strong> (light to
            medium pressure): $129 for members, $169 drop-in. Pure relaxation
            with 20 extra minutes.
          </li>
          <li>
            <strong>70-minute Ultimate massages</strong>: Deep Tissue, Sports,
            Salt Stone, or Lymphatic Drainage. $159 for members, $199 drop-in.
            Focused work with time to cover everything.
          </li>
          <li>
            <strong>90-minute Ultimate Signature Massage</strong> (light to
            medium pressure): $159 for members, $199 drop-in. Our longest
            session.
          </li>
        </ul>
        <p>
          Want deep pressure? Choose Deep Tissue. The Signature Massage is
          always light to medium pressure.
        </p>

        <h2 id="benefits" className="text-2xl font-bold scroll-mt-24">
          The Benefits of a Longer Massage
        </h2>

        <h3 className="text-xl font-semibold">1. More Time for Problem Areas</h3>
        <p>
          A longer session gives your specialist time to truly focus on
          specific problem areas, providing targeted relief without rushing,
          plus a full-body massage.
        </p>

        <h3 className="text-xl font-semibold">2. Your Choice of Technique</h3>
        <p>
          At Sway, you choose your technique: Signature (light to medium
          pressure), Deep Tissue, Sports, Salt Stone, or Lymphatic Drainage,
          with boosts like CBD, cupping, and PEMF to add on.
        </p>

        <h3 className="text-xl font-semibold">3. A Deeper Mind-Body Reset</h3>
        <p>
          Extra time gives you the space to truly sink into a deeper state of
          relaxation. You&apos;ll walk away with a clearer mind, looser
          muscles, and lower stress.
        </p>

        <h2 id="how-to-book" className="text-2xl font-bold scroll-mt-24">How to Book</h2>
        <p>
          Choose a Premier or Ultimate massage when you book online:{" "}
          <Link href="/book" className="underline text-[#113D33] font-semibold">
            Book Now &rarr;
          </Link>
        </p>

        {/* Related Articles */}
        <div className="pt-6">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/blog/himalayan-salt-stone-massage" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden">
                <Image src="/assets/blog5.jpg" alt="Himalayan Salt Stone Massage" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">Himalayan Salt Stone Massage: Ultimate Relaxation</p>
              </div>
            </Link>
            <Link href="/blog/recovery-denver" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden">
                <Image src="/assets/blog20.jpg" alt="Recovery in Denver" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">Recovery in Denver: Sauna, Cold Plunge &amp; Robot Massage</p>
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

        <p className="text-xs text-gray-600 pt-4 border-t border-[#d7e2dc]">
          Permalink: swaywellnessspa.com/blog/80-minute-massage
        </p>
      </div>

      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Does Sway offer an 80-minute massage?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sway's longer massages are 70 and 90 minutes. Choose the 70-minute Premier Signature Massage, a 70-minute Ultimate Deep Tissue, Sports, Salt Stone, or Lymphatic Drainage massage, or the 90-minute Ultimate Signature Massage, our longest session.",
                },
              },
              {
                "@type": "Question",
                name: "Why choose a longer massage?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A longer massage gives your specialist more time to address specific problem areas without rushing, while still providing a thorough full-body treatment.",
                },
              },
              {
                "@type": "Question",
                name: "How much is a longer massage at Sway?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The 70-minute Premier Signature Massage is $129 for members and $169 drop-in. 70-minute Ultimate massages and the 90-minute Ultimate Signature Massage are $159 for members and $199 drop-in. Book online at swaywellnessspa.com.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
