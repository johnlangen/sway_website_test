"use client";

import Image from "next/image";
import Link from "next/link";

export default function GiveWellnessBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Give Wellness, Get Wellness: Your Kind of Referral Program
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Community</span>
          <span className="text-gray-500">February 2025 · By Sway Wellness Team</span>
        </div>

        <p>
          At Sway Wellness Spa, we believe wellness isn’t just a personal
          journey—it’s something meant to be shared. That’s why we’re thrilled
          to introduce our Refer-a-Friend Program, designed to help you spread
          the love of self-care with those who matter most.
        </p>

        <p>
          Here’s how it works: when you refer a friend, both of you will receive
          a complimentary Boost during your next visit. Whether it’s a sculpting
          microcurrent in your facial or a PEMF mat during your massage, this
          bonus is on us.
        </p>

        <Image
          src="/assets/blog19.jpg"
          alt="Give Wellness, Get Wellness Program at Sway"
          width={700}
          height={400}
          className="rounded-lg"
        />

        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#unlimited" className="hover:underline">Wellness Unlimited</a></li>
            <li><a href="#boosts" className="hover:underline">What&apos;s a Boost, Anyway?</a></li>
            <li><a href="#sharing" className="hover:underline">Seamless Sharing, Effortless Rewards</a></li>
            <li><a href="#love" className="hover:underline">Real Guests, Real Love</a></li>
            <li><a href="#gift" className="hover:underline">A Gift That Keeps Giving</a></li>
          </ol>
        </nav>

        <h2 id="unlimited" className="text-2xl font-bold scroll-mt-24">Wellness Unlimited</h2>
        <p>
          And the best part? There’s no limit to how many friends you can refer!
          Every referral earns you another free Boost. Whether it’s family,
          coworkers, or friends, sharing wellness brings more rewards your way.
        </p>

        <h2 id="boosts" className="text-2xl font-bold scroll-mt-24">What&apos;s a Boost, Anyway?</h2>
        <p>
          A Boost is a specialized enhancement that elevates your treatment
          experience—whether you want to rejuvenate your skin or release
          tension.
        </p>

        <h3 className="text-xl font-bold">Boosts for Facials</h3>
        <p>
          Choose from LED Light Therapy to target fine lines and inflammation,
          or Dermaflash exfoliation for a smooth, radiant glow.
        </p>

        <h3 className="text-xl font-bold">Boosts for Massages</h3>
        <p>
          PEMF Mat for recovery and relaxation, or Cupping Therapy to relieve
          muscle tension and improve circulation. Our team is here to help you
          pick the perfect one.
        </p>

        <h2 id="sharing" className="text-2xl font-bold scroll-mt-24">Seamless Sharing, Effortless Rewards</h2>
        <p>
          Our referral program is fully integrated with our booking system via
          MindBody. No paper cards. No codes. Just easy tracking through your
          unique referral link.
        </p>

        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>Join Automatically:</strong> Get your invite after your
            visit—one click and you’re in.
          </li>
          <li>
            <strong>Share Your Link:</strong> Send it via text, email, or social
            media.
          </li>
          <li>
            <strong>Reap the Rewards:</strong> Your friend visits—and you both
            earn a free Boost. Simple as that.
          </li>
        </ol>

        <h2 id="love" className="text-2xl font-bold scroll-mt-24">Real Guests, Real Love</h2>
        <p className="italic">
          “I love how easy the referral program is. I sent my link to two
          friends and got two free Boosts—no questions asked!” – Jordan R., Sway
          Guest
        </p>

        <p className="italic">
          “We’ve designed this to reward loyalty and create community. It’s
          wellness shared, and that’s what Sway is all about.” – Emily L.,
          Director & Co-Founder
        </p>

        <h2 id="gift" className="text-2xl font-bold scroll-mt-24">A Gift That Keeps Giving</h2>
        <p>
          Refer your friends, earn free Boosts, and share the wellness
          experience that makes life better. Whether it’s a relaxing massage,
          refreshing facial, or a transformative Boost—you deserve to enjoy
          every moment with the people you love.
        </p>

        <div className="pt-4">
          <Link href="/book" className="underline text-[#113D33] font-semibold">
            Refer Now &amp; Start Sharing Wellness &rarr;
          </Link>
        </div>

        <div className="pt-6">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/blog/may-memberships" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog17.jpg" alt="May Memberships" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">May Memberships at Sway Wellness Spa</p></div>
            </Link>
            <Link href="/blog/sway-spa-membership" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog2.jpg" alt="Sway Spa Membership" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Sway Spa Membership: Your Wellness Transformation</p></div>
            </Link>
            <Link href="/blog/denver-wellness-club" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/homepage_photo_outside.jpg" alt="Denver Wellness Club" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Denver&apos;s Most Anticipated Wellness Club</p></div>
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-400 pt-4 border-t border-[#d7e2dc]">Permalink: swaywellnessspa.com/blog/give-wellness-get-wellness</p>
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
                name: "How does the Sway Wellness Spa referral program work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sway Wellness Spa's Refer-a-Friend program is simple: after your visit, you receive a unique referral link that you can share via text, email, or social media. When a friend books and visits using your link, both you and your friend receive a complimentary Boost enhancement during your next treatment. There is no limit to how many friends you can refer, so every referral earns you another free Boost.",
                },
              },
              {
                "@type": "Question",
                name: "What is a Boost at Sway Wellness Spa?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A Boost is a specialized enhancement that elevates your spa treatment at Sway Wellness Spa. For facials, Boost options include LED Light Therapy to target fine lines and inflammation, or Dermaflash exfoliation for a smooth, radiant glow. For massages, you can choose a PEMF Mat for recovery and relaxation, or Cupping Therapy to relieve muscle tension and improve circulation. Boosts are normally an add-on but are provided free through the referral program.",
                },
              },
              {
                "@type": "Question",
                name: "Is there a limit to how many friends I can refer to Sway Wellness Spa?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No, there is no limit to how many friends you can refer through Sway Wellness Spa's referral program. Every successful referral earns you a complimentary Boost on your next visit. Whether you refer family, coworkers, or friends, each referral brings another free enhancement to your facial or massage treatment.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
