"use client";

import Image from "next/image";
import Link from "next/link";

export default function SwaySpaMembershipBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">

      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Sway Spa Membership: Your 2025 Wellness Transformation
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <p>
          The start of a new year is the perfect time to commit to your well-being. 
          At Sway Wellness Spa, we're dedicated to helping you make 2025 your healthiest 
          and happiest year yet. Our unique, science-backed, and tech-forward approach 
          to wellness provides personalized experiences designed to restore your body 
          and refresh your mind. Let's make self-care your top priority this year!
        </p>

        <Image
          src="/assets/blog2.png"
          alt="Sway Membership"
          width={800}
          height={400}
          className="rounded-lg w-full h-auto"
        />

        <h2 className="text-2xl font-bold pt-4">Why Prioritize Wellness in 2025?</h2>
        <p>
          In today's fast-paced world, it's easy to feel overwhelmed and depleted. 
          That's why prioritizing wellness is no longer a luxury – it's a necessity. 
          Committing to regular self-care can significantly reduce stress, improve your 
          physical health, and boost your overall happiness. A Sway Spa membership offers 
          a seamless way to integrate monthly wellness into your routine, helping you reap 
          these benefits consistently.
        </p>
        <p>
          As noted in recent research from Spavia Day Spa, consistent self-care through spa 
          memberships can lead to significant long-term health improvements, making it a 
          worthwhile investment in your overall well-being.
        </p>

        <h2 className="text-2xl font-bold pt-4">What Does a Sway Membership Include?</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Preferred Pricing: One facial or massage per month for $99.</li>
          <li>Exclusive Member Lounge with tea & snacks.</li>
          <li>Bring a Friend: They get the same treatment for $99 (once/month).</li>
          <li>Family Share: Let family use your credits.</li>
          <li>10% off in the Sway Shop: Eminence, DedCool, Gray Malin & more.</li>
          <li>Access to member-only events & a supportive community.</li>
          <li>Rollover Benefits: Unused credits valid for a year.</li>
        </ul>

        <h2 className="text-2xl font-bold pt-4">How a Sway Membership Helps Build Consistency</h2>
        <p>
          Building new habits takes time and effort, but consistency is the key to success. 
          A Sway membership simplifies self-care by ensuring you have access to the wellness 
          treatments you need, precisely when you need them.
        </p>

        <h2 className="text-2xl font-bold pt-4">Benefits Beyond the Spa</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Increased Energy and Focus</li>
          <li>Better Quality Sleep</li>
          <li>Improved Skin Health</li>
          <li>Reduced Muscle Tension and Stress</li>
        </ul>
        <p>
          These benefits contribute to long-term health and happiness. A study published 
          in the <em>International Heart Journal</em> found that regular spa bathing 
          significantly improved cardiovascular markers, including blood pressure and 
          arterial flexibility.
        </p>

        <h2 className="text-2xl font-bold pt-4">Start Your Journey</h2>
        <p>
          Ready to make 2025 your healthiest year yet? Join the next wave of wellness at 
          Sway Wellness Spa and discover how small, consistent habits can lead to 
          transformative results.
        </p>

        <div className="pt-4">
          <Link
            href="/membership"
            className="inline-block px-6 py-3 bg-[#113D33] text-white rounded-full hover:bg-[#0f332a] transition font-semibold"
          >
            Join the Club!
          </Link>
        </div>
      </div>
    </div>
  );
}
