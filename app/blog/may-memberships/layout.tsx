"use client";

import Image from "next/image";

export default function MayMembershipsLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          May Memberships at Sway Wellness Spa
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <p>
          Discover wellness that goes beyond luxury with Sway Wellness Spa. Our
          space is thoughtfully designed to help you unwind, recharge, and
          restore balance. With memberships starting at just{" "}
          <strong>$99/month</strong>, this is your sign to make self-care a
          habit—not just a treat.
        </p>

        <Image
          src="/assets/blog17.jpg"
          alt="Sway May Memberships"
          width={700}
          height={400}
          className="rounded-lg"
        />

        <h2 className="text-2xl font-bold">Why Commit to a Monthly Wellness Routine?</h2>
        <p>
          Consistency is key. Whether you're aiming for glowing skin or reduced
          stress, it's regular care that brings lasting results. A recent
          McKinsey report shows that wellness routines are now central to both
          appearance and mental health—two areas Sway excels in.
        </p>

        <blockquote className="border-l-4 border-[#113D33] pl-4 italic text-gray-700">
          “I just had an amazing experience at Sway Wellness in Larimer
          Square... I loved it so much that I ended up getting a membership.”
          <br />– Whitney G.
        </blockquote>

        <h2 className="text-2xl font-bold">Sway’s Membership Options</h2>

        <h3 className="text-xl font-bold mt-4">1. Spa Club – $99/month</h3>
        <p>Choose a monthly facial or massage:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Facials:</strong> Glow Getter, Pore Perfection, Forever
            Young, Vitamin C, and more
          </li>
          <li>
            <strong>Massages:</strong> Deep Tissue, Salt Stone, CBD, Sports
            Massage
          </li>
        </ul>

        <h3 className="text-xl font-bold mt-4">2. Remedy Room – $99/month</h3>
        <p>Includes 4 monthly visits with:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Cold Plunge</li>
          <li>Traditional Sauna</li>
          <li>LED Light Therapy</li>
          <li>Compression Therapy</li>
        </ul>

        <h3 className="text-xl font-bold mt-4">3. Aescape Robot Massage – $99/month</h3>
        <p>
          Four monthly 30-minute robot massages with precision targeting,
          designed for high-performance recovery and deep relaxation.
        </p>

        <h2 className="text-2xl font-bold">Exclusive Member Perks</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>50% off boosts + super boosts</li>
          <li>10% off all Sway Shop products</li>
          <li>Bring-a-friend or family sharing options</li>
          <li>Early access to insider trends + treatments</li>
        </ul>

        <h2 className="text-2xl font-bold">The Science-Backed Benefits of Consistency</h2>
        <p>
          As skincare expert Michelle Skelly notes, consistency delivers
          results. The same is true for spa therapy—routines like weekly
          detoxing, cold plunges, or robot massages create long-term benefits
          for your physical and emotional health.
        </p>

        <h2 className="text-2xl font-bold">Your Invitation to Wellness</h2>
        <p>
          Sway is more than a spa—it’s a monthly wellness ritual. Treat yourself
          to radiant skin, reduced stress, and inner balance. All for just{" "}
          <strong>$99/month</strong>.
        </p>

        <div className="pt-4">
          <a href="/memberships" className="underline text-blue-600">
            Explore Membership Options →
          </a>
        </div>
      </div>
    </div>
  );
}
