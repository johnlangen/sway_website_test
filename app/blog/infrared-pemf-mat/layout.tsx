"use client";

import Image from "next/image";
import Link from "next/link";

export default function InfraredPemfMatBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Supercharge Your Massage: The Benefits of Infrared PEMF Mats
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <p>
          Massage therapy is already a powerful tool for stress relief and
          recovery. But at Sway, we’re taking your experience to the next level
          with the Infrared PEMF Mat by HigherDose. This technology combines
          pulsed electromagnetic fields with infrared heat for deeper healing,
          relaxation, and performance recovery.
        </p>

        <Image
          src="/assets/blog12.jpg"
          alt="Guest enjoying Infrared PEMF Mat at Sway"
          width={600}
          height={400}
          className="rounded-lg"
        />

        <h2 className="text-2xl font-bold">What Is an Infrared PEMF Mat?</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>PEMF Therapy:</strong> Mimics Earth&apos;s natural
            frequencies to stimulate cellular repair and reduce inflammation.
          </li>
          <li>
            <strong>Infrared Heat:</strong> Delivers penetrating warmth that
            boosts circulation and relieves tension.
          </li>
          <li>
            <strong>Healing Crystals:</strong> Amethyst and tourmaline generate
            negative ions that act as natural antioxidants.
          </li>
        </ul>

        <p>
          According to{" "}
          <a
            href="https://www.pemfadvisor.com/research/"
            target="_blank"
            className="underline text-blue-600"
          >
            PEMF Advisor
          </a>
          , studies show PEMF therapy can relieve joint and muscle pain, reduce
          inflammation, and improve sleep quality.
        </p>

        <h2 className="text-2xl font-bold">Why Combine It with Massage?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Enhanced Pain Relief:</strong> Increased blood flow and deep
            tension release.
          </li>
          <li>
            <strong>Improved Circulation:</strong> Infrared + massage work
            together for better oxygen delivery.
          </li>
          <li>
            <strong>Faster Muscle Recovery:</strong> PEMF regenerates cells
            while massage soothes tightness.
          </li>
          <li>
            <strong>Total-Body Reset:</strong> The natural frequencies + massage
            = unparalleled relaxation.
          </li>
        </ul>

        <h2 className="text-2xl font-bold">How to Try It at Sway</h2>
        <p>
          During your massage, you’ll lie on the PEMF Mat while your therapist
          works. You can customize the heat, frequency, and intensity to match
          your needs.
        </p>

        <p>
          <span className="font-semibold">Special Member Offer:</span> Members
          get <span className="underline">50% off all boosts</span>, including
          the PEMF Mat! It’s the easiest way to enhance your recovery and feel
          the difference.
        </p>

        <p className="italic">
          “Integrating the Infrared PEMF Mat into my massage treatments at Sway
          has transformed my recovery process. I feel rejuvenated and notice a
          significant reduction in muscle soreness.” – Alex P., Guest
        </p>

        <h2 className="text-2xl font-bold">The HigherDose PEMF Mat: Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>PEMF Frequencies: 3Hz–23Hz</li>
          <li>Infrared-powered deep heat</li>
          <li>Negative-ion-generating crystals</li>
          <li>Portable options for wellness on the go</li>
        </ul>

        <p>
          Bonus fact: Astronauts use PEMF therapy to recover from
          space-induced physical stress. If it’s good enough for them, imagine
          what it can do for post-workout soreness or everyday tension.
        </p>

        <h2 className="text-2xl font-bold">Start Your PEMF Journey</h2>
        <p>
          Whether you’re managing chronic pain, reducing inflammation, or simply
          seeking deeper relaxation, this science-backed boost is a powerful
          addition to any treatment. Ready to upgrade your massage?
        </p>

        <div className="pt-4">
          <Link href="/massages" className="underline text-blue-600">
            Learn more about our Massage Treatments
          </Link>
        </div>
      </div>
    </div>
  );
}
