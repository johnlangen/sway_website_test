"use client";

import Image from "next/image";
import Link from "next/link";

export default function SaunaComparisonBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Infrared Sauna vs. Traditional Sauna: The Boom of Saunas in the U.S.
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Wellness</span>
          <span className="text-gray-500">March 2025 · By Sway Wellness Team</span>
        </div>

        <p>
          Saunas have long been a pillar of European wellness culture, offering
          physical and mental benefits passed down through generations. Today,
          that tradition is booming in the U.S., with both traditional and
          infrared saunas making waves in wellness communities. At Sway Wellness
          Spa, we proudly offer an authentic traditional sauna experience inside
          our Remedy Room – a time-tested wellness practice that delivers
          powerful results.
        </p>

        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#what-makes-traditional-sauna-special" className="hover:underline">What Makes a Traditional Sauna Special?</a></li>
            <li><a href="#benefits-of-traditional-saunas" className="hover:underline">Benefits of Traditional Saunas</a></li>
            <li><a href="#what-about-infrared-saunas" className="hover:underline">What About Infrared Saunas?</a></li>
            <li><a href="#perceived-benefits-of-infrared" className="hover:underline">Perceived Benefits of Infrared Saunas</a></li>
            <li><a href="#why-traditional-saunas-still-lead" className="hover:underline">Why Traditional Saunas Still Lead the Way</a></li>
            <li><a href="#why-choose-traditional" className="hover:underline">Why Choose Traditional?</a></li>
            <li><a href="#sauna-boom-in-us" className="hover:underline">The Sauna Boom in the U.S.</a></li>
            <li><a href="#experience-the-best-at-sway" className="hover:underline">Experience the Best at Sway</a></li>
          </ol>
        </nav>

        <h2 id="what-makes-traditional-sauna-special" className="text-2xl font-bold scroll-mt-24">What Makes a Traditional Sauna Special?</h2>
        <p>
          Traditional saunas heat the air using hot stones or a stove, creating
          a dry or steamy environment with temperatures reaching 190&deg;F+. When
          water is added to the stones, humidity increases, intensifying the
          cleansing experience. This method has been used for centuries to
          encourage deep relaxation and detoxification.
        </p>

        <h2 id="benefits-of-traditional-saunas" className="text-2xl font-bold scroll-mt-24">Benefits of Traditional Saunas</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Stress Relief:</strong> Reduces cortisol levels and relaxes
            tight muscles, promoting calm and balance.
          </li>
          <li>
            <strong>Improved Circulation:</strong> Heat dilates blood vessels,
            enhancing oxygen and nutrient flow throughout the body.
          </li>
          <li>
            <strong>Muscle Recovery:</strong> Eases soreness and speeds recovery
            after workouts through deep muscle relaxation.
          </li>
        </ul>

        <Image
          src="/assets/blog8.jpg"
          alt="Traditional Sauna at Sway Wellness Spa"
          width={600}
          height={400}
          className="rounded-lg"
        />

        <h2 id="what-about-infrared-saunas" className="text-2xl font-bold scroll-mt-24">What About Infrared Saunas?</h2>
        <p>
          Infrared saunas are a modern innovation. Instead of heating the air,
          they use infrared light to directly warm your body at lower
          temperatures (120–150&deg;F). Though still emerging in research, they&apos;re
          praised for their gentler heat and potential detoxification benefits.
        </p>

        <h2 id="perceived-benefits-of-infrared" className="text-2xl font-bold scroll-mt-24">Perceived Benefits of Infrared Saunas</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Gentler Heat:</strong> Great for those who find traditional
            saunas too intense.
          </li>
          <li>
            <strong>Potential Detoxification:</strong> May help release toxins
            at a cellular level.
          </li>
          <li>
            <strong>Modern Appeal:</strong> Popular among tech-savvy users
            exploring new wellness tools.
          </li>
        </ul>

        <h2 id="why-traditional-saunas-still-lead" className="text-2xl font-bold scroll-mt-24">Why Traditional Saunas Still Lead the Way</h2>
        <p>
          Traditional saunas offer a rich, ritualistic experience with
          time-proven results. Their high heat and customizable humidity levels
          provide deeper detox and a more immersive wellness experience. Backed
          by generations of cultural use and science, they remain the go-to for
          serious wellness seekers.
        </p>

        <h2 id="why-choose-traditional" className="text-2xl font-bold scroll-mt-24">Why Choose Traditional?</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Time-Tested:</strong> Trusted for centuries across cultures
            for physical and mental restoration.
          </li>
          <li>
            <strong>Intense Detox:</strong> Deep, purifying sweat not easily
            matched by infrared alternatives.
          </li>
          <li>
            <strong>Mind-Body Connection:</strong> Supports holistic wellness by
            harmonizing the physical and mental.
          </li>
        </ul>

        <h2 id="sauna-boom-in-us" className="text-2xl font-bold scroll-mt-24">The Sauna Boom in the U.S.</h2>
        <p>
          As awareness of sauna benefits spreads, more Americans are turning to
          this ancient practice. Whether at boutique spas, gyms, or even at
          home, saunas are becoming a staple in wellness routines focused on
          stress relief, circulation, and recovery.
        </p>

        <h2 id="experience-the-best-at-sway" className="text-2xl font-bold scroll-mt-24">Experience the Best at Sway</h2>
        <p>
          At Sway, our traditional sauna offers a space to deeply relax, detox,
          and recharge. Whether you&apos;re a seasoned sauna enthusiast or trying it
          for the first time, this timeless experience is the perfect way to
          invest in your holistic health.
        </p>

        <div className="pt-4">
          <Link href="/sauna" className="underline text-[#113D33] font-semibold">
            Book Your Sauna Experience at Sway Today
          </Link>
        </div>

        {/* Related Articles */}
        <div className="pt-12 border-t border-[#d7e2dc]">
          <h3 className="text-xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/blog/cold-plunge" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog7.jpg" alt="Cold Plunge" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Cold Outside? Cold Plunge: Why Cold Plunges Are a Hot Trend in Wellness</p></div>
            </Link>
            <Link href="/blog/science-of-relaxation" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog11.jpg" alt="Science of Relaxation" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Science of Relaxation: How Spa Treatments Ease Stress &amp; Anxiety</p></div>
            </Link>
            <Link href="/blog/train-like-an-athlete" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog20.jpg" alt="Train Like an Athlete" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Train Like an Athlete, Recover Like an Athlete</p></div>
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
                  name: "What is the difference between infrared and traditional saunas?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Traditional saunas heat the air using hot stones or a stove, reaching temperatures of 190 degrees Fahrenheit or higher, creating an intense dry or steamy environment. Infrared saunas use infrared light to directly warm the body at lower temperatures (120-150 degrees Fahrenheit). Traditional saunas provide deeper detoxification and a more immersive experience backed by centuries of use, while infrared saunas offer a gentler heat. Sway Wellness Spa features a traditional sauna in its Remedy Room.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are the benefits of using a sauna?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sauna use provides stress relief by reducing cortisol levels and relaxing muscles, improved circulation through heat-induced blood vessel dilation, faster muscle recovery after workouts, and detoxification through deep sweating. At Sway Wellness Spa in Denver, the traditional sauna is part of the Remedy Room recovery circuit alongside cold plunge, Normatec compression, and LED light therapy.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Where can I use a sauna in Denver?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sway Wellness Spa on Larimer Square in downtown Denver offers a traditional sauna experience as part of its Remedy Room — a guided 40-minute recovery circuit. Whether you are a seasoned sauna enthusiast or trying it for the first time, Sway provides an expert-guided environment for deep relaxation and recovery.",
                  },
                },
              ],
            }),
          }}
        />

        {/* Permalink */}
        <div className="text-sm text-gray-400 pt-4">
          Permalink: <Link href="/blog/infrared-vs-traditional-sauna" className="underline hover:text-[#113D33]">/blog/infrared-vs-traditional-sauna</Link>
        </div>
      </div>
    </div>
  );
}
