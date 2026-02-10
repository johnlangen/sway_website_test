"use client";

import Image from "next/image";

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

        <h2 className="text-2xl font-bold">Wellness Unlimited</h2>
        <p>
          And the best part? There’s no limit to how many friends you can refer!
          Every referral earns you another free Boost. Whether it’s family,
          coworkers, or friends, sharing wellness brings more rewards your way.
        </p>

        <h2 className="text-2xl font-bold">What’s a Boost, Anyway?</h2>
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

        <h2 className="text-2xl font-bold">Seamless Sharing, Effortless Rewards</h2>
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

        <h2 className="text-2xl font-bold">Real Guests, Real Love</h2>
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

        <h2 className="text-2xl font-bold">A Gift That Keeps Giving</h2>
        <p>
          Refer your friends, earn free Boosts, and share the wellness
          experience that makes life better. Whether it’s a relaxing massage,
          refreshing facial, or a transformative Boost—you deserve to enjoy
          every moment with the people you love.
        </p>

        <div className="pt-4">
          <a href="/book" className="underline text-blue-600">
            Refer Now & Start Sharing Wellness →
          </a>
        </div>
      </div>
    </div>
  );
}
