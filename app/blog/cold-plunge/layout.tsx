"use client";

import Link from "next/link";
import Image from "next/image";

export default function ColdPlungeBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Cold Outside? Cold Plunge: Why Cold Plunges Are a Hot Trend in Wellness
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <p>
          When winter temperatures dramatically drop, the idea of immersing
          yourself in freezing cold water might sound counterintuitive. But cold
          plunges are a red-hot trend in wellness for good reason. These
          invigorating treatments are known to powerfully boost both physical
          and mental health, making them a top-tier self-care ritual for
          resilience and recovery.
        </p>

        <h2 className="text-2xl font-bold">What Is a Cold Plunge?</h2>
        <p>
          A cold plunge involves immersing your body in water maintained between
          50–59°F. At Sway Wellness Spa, our cold plunge therapy is part of the
          Remedy Room—an advanced recovery space featuring science-backed
          modalities. Under expert guidance, you can experience the rejuvenating
          power of cold immersion safely and effectively.
        </p>

        <h2 className="text-2xl font-bold">The Benefits of Cold Plunges</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Reduces Inflammation:</strong> Used by athletes to reduce
            soreness and swelling after workouts. Cold water constricts blood
            vessels, reducing DOMS and accelerating recovery.
          </li>
          <li>
            <strong>Better Sleep:</strong> Cold plunges may support improved
            sleep through thermoregulation and relaxation effects.
          </li>
          <li>
            <strong>Boosts Circulation:</strong> Alternating constriction and
            dilation of blood vessels enhances oxygen delivery and improves
            blood flow.
          </li>
          <li>
            <strong>Mental Clarity:</strong> Cold plunges trigger endorphin and
            norepinephrine release, improving mood and resilience.
          </li>
          <li>
            <strong>Supports Immunity:</strong> Cold exposure may stimulate an
            increase in white blood cell count, helping the body fight off
            illness.
          </li>
          <li>
            <strong>Reduces Stress:</strong> Cold immersion stimulates dopamine
            and serotonin, improving emotional well-being.
          </li>
        </ul>

        <Image
          src="/assets/blog7.png"
          alt="Cold Plunge Remedy Room"
          width={600}
          height={400}
          className="rounded-lg"
        />

        <h2 className="text-2xl font-bold">
          Why Cold Plunges Are the Perfect Winter Wellness Practice
        </h2>
        <p>
          With reduced sunlight and energy in winter, cold plunges are a natural
          way to counter seasonal fatigue. They deliver an energizing,
          mood-lifting, and immune-boosting effect just when you need it
          most—plus the empowering thrill of conquering discomfort makes them
          mentally strengthening as well.
        </p>

        <h2 className="text-2xl font-bold">Experience the Remedy Room at Sway</h2>
        <p>Our Remedy Room is a high-tech wellness hub offering:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Cold Plunge Therapy</strong> – Safe, guided immersion for
            optimal benefits
          </li>
          <li>
            <strong>Traditional Sauna</strong> – Detoxify and relax with heat
          </li>
          <li>
            <strong>LED Light Therapy</strong> – Boost cellular regeneration and
            skin health
          </li>
          <li>
            <strong>Normatec Compression Boots</strong> – Support muscle
            recovery and circulation
          </li>
        </ul>

        <p>
          This February, embrace the cold and try one of the most powerful tools
          in modern wellness. Cold plunges are more than just a trend—they’re a
          gateway to better health and higher energy.
        </p>

        <div className="pt-4">
          <Link
            href="/cold-plunge"
            className="inline-block bg-[#113D33] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0e322b] transition"
          >
            Schedule Your Cold Plunge Experience Today
          </Link>
        </div>
      </div>
    </div>
  );
}
