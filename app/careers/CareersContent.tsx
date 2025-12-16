"use client";

import Link from "next/link";

export default function CareersContent() {
  const applyUrl =
    "https://oc.spaviajobs.com/v2/#/a/job/a2Vlb?source=SwayWebsite";

  return (
    <div className="bg-[#F7F4E9] text-black font-vance flex flex-col items-center min-h-screen">
      {/* Top Banner */}
      <div className="w-full bg-[#113D33] text-white py-24 flex justify-center items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          Massage Therapist Job – Denver, CO
        </h1>
      </div>

      {/* Page content */}
      <div className="w-full max-w-5xl px-6 py-16">
        {/* SWAY LARIMER Title */}
        <h2 className="text-4xl font-bold mb-6">SWAY LARIMER</h2>

        {/* Apply Button (Top) */}
        <div className="mb-10">
          <Link
            href={applyUrl}
            target="_blank"
            className="bg-[#113D33] text-white px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition"
          >
            APPLY NOW
          </Link>
        </div>

        <h3 className="text-xl font-bold mb-2">WHY YOU'LL LOVE THIS JOB</h3>
        <p className="mb-6 leading-relaxed">
          Sway by Spavia is seeking full-time and part-time massage therapists at all
          levels of experience, to join our team! We are an independently owned and
          operated luxury day spa located in Denver, Colorado.
        </p>
        <p className="mb-6 leading-relaxed">
          Sway by Spavia provides a family culture with respect, compassion, and
          work/life balance where both our guests and team can relax, escape, and
          thrive.
        </p>
        <p className="mb-10 leading-relaxed">
          Massage Therapists earn competitive wages per treatment with increased pay
          for advanced modalities, gratuity, and eligibility for bonuses and sale
          commissions.
        </p>

        <p className="mb-10 leading-relaxed">
            Sway offers a full variety of spa treatments for our massage therapists to
            provide both relaxation and therapeutic services. Our award-winning massages
            include signature, deep tissue, hot stone, sports, and maternity massage. At
            select locations, we also offer enhancements such as cupping, PEMF mat, and
            more to elevate the guest experience and results. In-house training is
            provided for your benefit. Guests can also enjoy a full line of skincare
            treatments, body scrubs, body wraps, and more!
         </p>


        

        <h3 className="text-xl font-bold mt-10 mb-4">
          Benefits for Massage Therapists
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-10">
          <li>
            Earn higher compensation when performing longer and more strenuous
            treatments including deep tissue, hot stone, and sports massage
          </li>
          <li>W2 employee</li>
          <li>Liability insurance</li>
          <li>Paid in-house training, continuing education opportunities</li>
          <li>
            Discount on products and treatments, along with friends and family
            discounts
          </li>
          <li>Flexible schedules with 10-minute turn-overs between guests</li>
          <li>Additional bonuses: commissions and membership earnings</li>
        </ul>

        <h3 className="text-xl font-bold mb-4">
          Why join the Sway by Spavia family?
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-10">
          <li>
            Gratuities are higher — guests love a real spa experience (member lounge,
            showers, lockers, robes, spa sandals, and more)
          </li>
          <li>Family culture with compassion, integrity, and team approach</li>
          <li>Our teammates are fun and our biggest asset</li>
          <li>
            Membership creates relationships and provides rewarding guest experiences
          </li>
          <li>
            Advancement opportunities with a growing spa — multiple avenues for bonus
            potential
          </li>
          <li>
            Guests and members love us — the atmosphere and affordability bring them
            back again and again
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-4">
          Massage Therapist Requirements:
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-12">
          <li>Actively State Licensed Massage Therapists</li>
          <li>Reliable, punctual, passionate, and goal-driven</li>
          <li>Professional and drug/alcohol-free</li>
          <li>A passion for working with people</li>
          <li>High-energy, can-do attitude</li>
          <li>A team player with a passion for guest service and wellness</li>
        </ul>

        {/* Apply Button (Bottom) */}
        <div className="mb-12">
          <Link
            href={applyUrl}
            target="_blank"
            className="bg-[#113D33] text-white px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition"
          >
            APPLY NOW
          </Link>
        </div>

      </div>
    </div>
  );
}
