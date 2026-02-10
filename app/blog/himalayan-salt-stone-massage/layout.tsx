"use client";

import Image from "next/image";

export default function HimalayanSaltStoneMassageLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Himalayan Salt Stone Massage: Ultimate Relaxation at Sway Spa
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <p>
          The weight of daily stressors can take a toll on both your mind and body,
          leaving you feeling depleted and in need of true relaxation. That&apos;s why
          Sway Wellness Spa is proud to offer the Himalayan Salt Stone Treatment – a
          luxurious and therapeutic experience designed to melt away tension, promote
          deep relaxation, and deliver a wealth of holistic wellness benefits.
        </p>

        <h2 className="text-2xl font-bold">What is the Himalayan Salt Stone Treatment?</h2>
        <p>
          Our Himalayan Salt Stone Treatment elevates the traditional massage by
          incorporating smooth, warmed stones made from pure Himalayan salt...
        </p>

        <Image
          src="/assets/blog5.jpg"
          alt="Himalayan Salt Stone Massage"
          width={600}
          height={400}
          className="rounded-lg"
        />

        <h2 className="text-2xl font-bold">The Benefits of Himalayan Salt Stones</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Deep Relaxation:</strong> Gentle warmth eases tension more effectively than traditional massage.</li>
          <li><strong>Detoxification:</strong> Natural salt draws out toxins and supports internal balance.</li>
          <li><strong>Improved Circulation:</strong> Minerals support healthy blood flow and vitality.</li>
          <li><strong>Skin Nourishment:</strong> Leaves skin smooth, hydrated, and glowing.</li>
          <li><strong>Balancing Energy:</strong> Believed to emit negative ions that promote emotional well-being.</li>
        </ul>

        <h2 className="text-2xl font-bold">What to Expect During Your Treatment at Sway</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Warm Himalayan Salt Stones:</strong> Used in soothing strokes to release muscle tension.</li>
          <li><strong>Personalized Pressure:</strong> Light, medium, or firm – tailored to your needs.</li>
          <li><strong>A Re-Awakening Environment:</strong> A serene and immersive space to fully unwind.</li>
        </ul>

        <h2 className="text-2xl font-bold">Why Choose Sway for Your Salt Stone Treatment?</h2>
        <p>
          At Sway, we combine expert massage techniques with the finest wellness tools
          to provide treatments that go far beyond ordinary relaxation...
        </p>

        <h2 className="text-2xl font-bold">The Perfect Winter Wellness Boost</h2>
        <p>
          Cold weather can often lead to stiff muscles, increased stress, and fatigue.
          This winter, let the warmth and healing properties of Himalayan salt stones
          restore your body and refresh your mind...
        </p>

        <h2 className="text-2xl font-bold">The Science of Massage</h2>
        <p>
          "Massage therapy has shown promising results in pain management...
          <em>Massage therapy for fibromyalgia: a systematic review and meta-analysis
          of randomized controlled trials. PLoS One. 2014;9(2):e89304.</em>
        </p>

        <div className="pt-4">
          <a
            href="https://swaywellnessspa.com/massages"
            target="_blank"
            className="underline text-blue-600"
          >
            Schedule Your Himalayan Salt Stone Massage Now!
          </a>
        </div>
      </div>
    </div>
  );
}
