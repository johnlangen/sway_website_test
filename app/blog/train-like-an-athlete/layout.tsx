"use client";

import Image from "next/image";

export default function TrainLikeAnAthleteBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Train Like an Athlete, Recover Like an Athlete
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <p>
          Whether you're pushing your limits on the track, at the gym, or on your yoga mat, 
          optimal recovery is essential for achieving peak performance and avoiding injury. 
          Recovery isn’t just about resting—it’s about giving your body the tools it needs 
          to heal, rebuild, and come back stronger.
        </p>

        <p>
          At Sway, we’re redefining what recovery means by combining cutting-edge science 
          with spa-like relaxation to offer a holistic approach to fitness and wellness. 
          From advanced therapies designed to reduce muscle soreness and inflammation to 
          calming treatments that soothe the mind, we provide everything you need to feel your best.
        </p>

        <Image
          src="/assets/blog20.jpg"
          alt="Athlete Recovery at Sway"
          width={700}
          height={400}
          className="rounded-lg"
        />

        <h2 className="text-2xl font-bold">Why Recovery is a Game-Changer</h2>
        <p>
          Recovery isn’t just about feeling better after a workout; it’s a strategic tool 
          for enhancing performance, preventing injuries, and maintaining long-term physical 
          and mental balance. Incorporating effective recovery methods can help your body 
          adapt to training, rebuild muscles, and reduce fatigue.
        </p>

        <p>
          According to a systematic review in BMJ Open Sport & Exercise Medicine, techniques 
          like sports massage have been shown to reduce muscle soreness and improve flexibility. 
          Whether you’re a seasoned athlete or just starting out, recovery is key to achieving your goals.
        </p>

        <blockquote className="italic border-l-4 border-[#113D33] pl-4 text-gray-700">
          "The sports massage and Remedy Room combo completely changed my recovery routine. 
          I felt the difference after just one session." — Jordan K., Sway Guest
        </blockquote>

        <h2 className="text-2xl font-bold">Experience Elite Recovery at Sway</h2>

        <h3 className="text-xl font-bold">1. Sports Massage</h3>
        <p>
          Our Sports Massage targets tight muscles, improves circulation, and supports your 
          active lifestyle. It's designed for those who demand real results from their recovery routine.
        </p>
        <p><strong>Member Price:</strong> $99<br /><strong>Drop-In Rate:</strong> $139</p>

        <h3 className="text-xl font-bold">2. The Remedy Room</h3>
        <p>Your all-in-one recovery space, the Remedy Room features:</p>
        <ul className="list-disc list-inside">
          <li>Normatec Compression Boots</li>
          <li>Cold Plunge Baths</li>
          <li>Dry Sauna</li>
          <li>LED Light Therapy</li>
        </ul>
        <p>Member Access: $25 | Drop-In: $40</p>

        <blockquote className="italic border-l-4 border-[#113D33] pl-4 text-gray-700">
          "We designed our recovery treatments to deliver the same quality tools that 
          elite athletes use—but in a spa environment you’ll actually look forward to." 
          — Emily Langenderfer, Co-Founder of Sway
        </blockquote>

        <h2 className="text-2xl font-bold">The Benefits of Smart Recovery</h2>
        <ul className="list-disc list-inside">
          <li>Improved muscle flexibility and reduced stiffness</li>
          <li>Faster recovery between workouts</li>
          <li>Less soreness and inflammation</li>
          <li>A clearer, more focused mind</li>
        </ul>

        <h2 className="text-2xl font-bold">The Science Behind Our Approach</h2>
        <p>
          Research confirms recovery is more than a luxury—it’s essential. We’ve taken those 
          findings and turned them into innovative, science-backed treatments accessible to 
          everyone. Recovery is a vital part of achieving your goals.
        </p>

        <h2 className="text-2xl font-bold">Don’t Just Train Hard. Recover Smart.</h2>
        <p>
          Whether you’re relieving tension with a Sports Massage or recharging in the Remedy Room, 
          we’re here to support your wellness. Start your recovery today!
        </p>

        <div className="pt-4">
          <a
            href="https://swaywellnessspa.com/remedy-tech/"
            className="underline text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Your Recovery Treatment →
          </a>
        </div>
      </div>
    </div>
  );
}
