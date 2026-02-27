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
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Technology</span>
          <span className="text-gray-500">March 2025</span>
        </div>

        <p>
          Massage therapy is already a powerful tool for stress relief and
          recovery. But at Sway, we&apos;re taking your experience to the next level
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

        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#what-is-infrared-pemf-mat" className="hover:underline">What Is an Infrared PEMF Mat?</a></li>
            <li><a href="#why-combine-with-massage" className="hover:underline">Why Combine It with Massage?</a></li>
            <li><a href="#how-to-try-it" className="hover:underline">How to Try It at Sway</a></li>
            <li><a href="#higherdose-pemf-mat-features" className="hover:underline">The HigherDose PEMF Mat: Features</a></li>
            <li><a href="#start-your-pemf-journey" className="hover:underline">Start Your PEMF Journey</a></li>
          </ol>
        </nav>

        <h2 id="what-is-infrared-pemf-mat" className="text-2xl font-bold scroll-mt-24">What Is an Infrared PEMF Mat?</h2>
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
          <Link
            href="https://www.pemfadvisor.com/research/"
            target="_blank"
            className="underline text-[#113D33] font-semibold"
          >
            PEMF Advisor
          </Link>
          , studies show PEMF therapy can relieve joint and muscle pain, reduce
          inflammation, and improve sleep quality.
        </p>

        <h2 id="why-combine-with-massage" className="text-2xl font-bold scroll-mt-24">Why Combine It with Massage?</h2>
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

        <h2 id="how-to-try-it" className="text-2xl font-bold scroll-mt-24">How to Try It at Sway</h2>
        <p>
          During your massage, you&apos;ll lie on the PEMF Mat while your therapist
          works. You can customize the heat, frequency, and intensity to match
          your needs.
        </p>

        <p>
          <span className="font-semibold">Special Member Offer:</span> Members
          get <span className="underline">50% off all boosts</span>, including
          the PEMF Mat! It&apos;s the easiest way to enhance your recovery and feel
          the difference.
        </p>

        <p className="italic">
          &ldquo;Integrating the Infrared PEMF Mat into my massage treatments at Sway
          has transformed my recovery process. I feel rejuvenated and notice a
          significant reduction in muscle soreness.&rdquo; – Alex P., Guest
        </p>

        <h2 id="higherdose-pemf-mat-features" className="text-2xl font-bold scroll-mt-24">The HigherDose PEMF Mat: Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>PEMF Frequencies: 3Hz–23Hz</li>
          <li>Infrared-powered deep heat</li>
          <li>Negative-ion-generating crystals</li>
          <li>Portable options for wellness on the go</li>
        </ul>

        <p>
          Bonus fact: Astronauts use PEMF therapy to recover from
          space-induced physical stress. If it&apos;s good enough for them, imagine
          what it can do for post-workout soreness or everyday tension.
        </p>

        <h2 id="start-your-pemf-journey" className="text-2xl font-bold scroll-mt-24">Start Your PEMF Journey</h2>
        <p>
          Whether you&apos;re managing chronic pain, reducing inflammation, or simply
          seeking deeper relaxation, this science-backed boost is a powerful
          addition to any treatment. Ready to upgrade your massage?
        </p>

        <div className="pt-4">
          <Link href="/massages" className="underline text-[#113D33] font-semibold">
            Learn more about our Massage Treatments
          </Link>
        </div>

        {/* Related Articles */}
        <div className="pt-12 border-t border-[#d7e2dc]">
          <h3 className="text-xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/blog/80-minute-massage" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog25.jpg" alt="80-Minute Massage" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Take Time for You: Why an 80-Minute Massage Is the Ultimate Reset</p></div>
            </Link>
            <Link href="/blog/himalayan-salt-stone-massage" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog5.jpg" alt="Himalayan Salt Stone Massage" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Himalayan Salt Stone Massage: Ultimate Relaxation at Sway Spa</p></div>
            </Link>
            <Link href="/blog/tech-and-wellness" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog10.jpg" alt="Tech and Wellness" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">How Technological Innovation is Transforming Spa Treatments</p></div>
            </Link>
          </div>
        </div>

        {/* Permalink */}
        <div className="text-sm text-gray-400 pt-4">
          Permalink: <Link href="/blog/infrared-pemf-mat" className="underline hover:text-[#113D33]">/blog/infrared-pemf-mat</Link>
        </div>
      </div>
    </div>
  );
}
