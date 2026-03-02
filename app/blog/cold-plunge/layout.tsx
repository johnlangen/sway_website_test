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
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Therapy</span>
          <span className="text-gray-500">February 2025 · By Sway Wellness Team</span>
        </div>

        <p>
          When winter temperatures dramatically drop, the idea of immersing
          yourself in freezing cold water might sound counterintuitive. But cold
          plunges are a red-hot trend in wellness for good reason. These
          invigorating treatments are known to powerfully boost both physical
          and mental health, making them a top-tier self-care ritual for
          resilience and recovery.
        </p>

        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#what-is-cold-plunge" className="hover:underline">What Is a Cold Plunge?</a></li>
            <li><a href="#benefits-of-cold-plunges" className="hover:underline">The Benefits of Cold Plunges</a></li>
            <li><a href="#perfect-winter-wellness" className="hover:underline">Why Cold Plunges Are the Perfect Winter Wellness Practice</a></li>
            <li><a href="#experience-remedy-room" className="hover:underline">Experience the Remedy Room at Sway</a></li>
          </ol>
        </nav>

        <h2 id="what-is-cold-plunge" className="text-2xl font-bold scroll-mt-24">What Is a Cold Plunge?</h2>
        <p>
          A cold plunge involves immersing your body in water maintained between
          50–59°F. At Sway Wellness Spa, our cold plunge therapy is part of the
          Remedy Room—an advanced recovery space featuring science-backed
          modalities. Under expert guidance, you can experience the rejuvenating
          power of cold immersion safely and effectively.
        </p>

        <h2 id="benefits-of-cold-plunges" className="text-2xl font-bold scroll-mt-24">The Benefits of Cold Plunges</h2>
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
          src="/assets/blog7.jpg"
          alt="Cold Plunge Remedy Room"
          width={600}
          height={400}
          className="rounded-lg"
        />

        <h2 id="perfect-winter-wellness" className="text-2xl font-bold scroll-mt-24">
          Why Cold Plunges Are the Perfect Winter Wellness Practice
        </h2>
        <p>
          With reduced sunlight and energy in winter, cold plunges are a natural
          way to counter seasonal fatigue. They deliver an energizing,
          mood-lifting, and immune-boosting effect just when you need it
          most—plus the empowering thrill of conquering discomfort makes them
          mentally strengthening as well.
        </p>

        <h2 id="experience-remedy-room" className="text-2xl font-bold scroll-mt-24">Experience the Remedy Room at Sway</h2>
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
          in modern wellness. Cold plunges are more than just a trend &mdash; they&apos;re a
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

        {/* Related Articles */}
        <div className="pt-10 space-y-6">
          <h2 className="text-2xl font-bold">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/blog/infrared-vs-traditional-sauna" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog8.jpg" alt="Infrared Sauna vs. Traditional Sauna" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Infrared Sauna vs. Traditional Sauna</p></div>
            </Link>
            <Link href="/blog/train-like-an-athlete" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog20.jpg" alt="Train Like an Athlete, Recover Like an Athlete" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Train Like an Athlete, Recover Like an Athlete</p></div>
            </Link>
            <Link href="/blog/science-of-relaxation" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog11.jpg" alt="Science of Relaxation: Spa &amp; Stress" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Science of Relaxation: Spa &amp; Stress</p></div>
            </Link>
          </div>
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
                  name: "What are the benefits of cold plunge therapy?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Cold plunge therapy reduces inflammation and muscle soreness, boosts circulation by alternating blood vessel constriction and dilation, triggers endorphin and norepinephrine release for improved mood and mental clarity, may support immune function, and helps reduce stress through dopamine and serotonin stimulation. At Sway Wellness Spa, cold plunge is part of the Remedy Room recovery circuit.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What temperature is a cold plunge?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A cold plunge typically involves immersion in water maintained between 50-59 degrees Fahrenheit. At Sway Wellness Spa in Denver, the cold plunge is part of the Remedy Room, where trained staff guide you through the experience safely and effectively.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Where can I try cold plunge therapy in Denver?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sway Wellness Spa on Larimer Square in downtown Denver offers cold plunge therapy as part of its Remedy Room — a 40-minute guided recovery circuit that also includes sauna, Normatec compression boots, and LED light therapy. Drop-in sessions are available, and members receive a reduced rate.",
                  },
                },
              ],
            }),
          }}
        />

        <p className="text-xs text-gray-400 pt-4 border-t border-[#d7e2dc]">Permalink: swaywellnessspa.com/blog/cold-plunge</p>
      </div>
    </div>
  );
}
