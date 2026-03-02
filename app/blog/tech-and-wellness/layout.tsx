"use client";

import Image from "next/image";
import Link from "next/link";

export default function TechAndWellnessBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          How Technological Innovation is Transforming Spa Treatments
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Innovation</span>
          <span className="text-gray-500">January 2025 · By Sway Wellness Team</span>
        </div>

        <p>
          Innovation and relaxation might not seem like a perfect match, but technology 
          is redefining the spa experience in truly remarkable ways. From cutting-edge 
          robotics to advanced therapeutic treatments, spas are harnessing the power 
          of technology to elevate wellness, enhance personalized care, and deliver 
          unprecedented results.
        </p>
        <p>
          Imagine massage robots that mimic the precision of human hands, infrared saunas 
          that optimize detoxification, or virtual reality experiences that transport 
          you to a serene escape—all designed to make relaxation more effective and accessible.
        </p>
        <p>
          Whether you're a spa owner, wellness professional, or just a curious tech lover, 
          the future of self-care is here—and it’s powered by innovation.
        </p>

        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#tech-forward-experiences" className="hover:underline">Tech-Forward Spa Experiences You Need to Know</a></li>
            <li><a href="#why-innovations-matter" className="hover:underline">Why Innovations Like These Matter to Spas and Wellness Experts</a></li>
            <li><a href="#experience-future" className="hover:underline">Experience the Future of Spa Treatments</a></li>
          </ol>
        </nav>

        <h2 id="tech-forward-experiences" className="text-2xl font-bold scroll-mt-24">Tech-Forward Spa Experiences You Need to Know</h2>

        <h3 className="text-xl font-semibold">1. Aescape Robotic Massage—An AI-Powered Hands-Free Experience</h3>
        <p>
          Gone are the days of relying solely on human hands. Enter the Aescape Robotic Massage: 
          a fully automated, AI-powered system with dual robotic arms that deliver precision 
          and consistency. It remembers your preferences—from pressure to music—and gives 
          you an on-demand massage experience like no other.
        </p>
        <p>
          Skip the scheduling and relax instantly. Aescape's user-focused design makes it 
          easy to customize your massage, recover from workouts, or unwind anytime.
        </p>
        <p className="italic">“I got a robot massage, and it was actually kind of great.”</p>

        <Image
          src="/assets/blog10.jpg"
          alt="Robotic massage"
          width={600}
          height={400}
          className="w-[600px] h-auto rounded-lg"
        />

        <p>
          <strong>Exclusive Offer:</strong> With the Sway Aescape Membership, enjoy 
          2 Aescape Robot treatments for just $99/month. Contact{" "}
          <Link href="mailto:contact@swaywellnessspa.com" className="underline text-[#113D33] font-semibold">
            contact@swaywellnessspa.com
          </Link>{" "}
          to join.
        </p>

        <h3 className="text-xl font-semibold pt-4">2. Microcurrent Therapy by 7E Wellness—Non-Invasive Facial Rejuvenation</h3>
        <p>
          This technology uses low-level electrical currents to lift facial contours, 
          stimulate collagen, and improve skin tone—all without needles or downtime. 
          It re-educates facial muscles and boosts circulation for visible, long-lasting results.
        </p>
        <p>
          According to the NCBI, microcurrent therapy also stimulates ATP production—fueling 
          cellular energy and collagen formation. The result? Firmer, smoother, more radiant skin.
        </p>

        <h3 className="text-xl font-semibold pt-4">3. LED Light Therapy by LightStim—Glow from the Inside Out</h3>
        <p>
          Using multi-wavelength light, this non-invasive treatment stimulates skin regeneration, 
          reduces inflammation, and boosts collagen. It's safe, soothing, and ideal for concerns 
          like acne, redness, and dullness.
        </p>
        <p>
          LightStim sessions help you achieve radiant, healthy skin over time—with no pain 
          or downtime required.
        </p>

        <h2 id="why-innovations-matter" className="text-2xl font-bold scroll-mt-24">Why Innovations Like These Matter to Spas and Wellness Experts</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Customization:</strong> Tailor treatments to each client for better results and stronger loyalty.</li>
          <li><strong>Consistency:</strong> High-tech tools deliver precise results every time.</li>
          <li><strong>Time Efficiency:</strong> Serve more clients without sacrificing quality.</li>
          <li><strong>Cutting-Edge Appeal:</strong> Attract tech-savvy customers and stand out in a crowded wellness market.</li>
        </ul>

        <h2 id="experience-future" className="text-2xl font-bold scroll-mt-24">Experience the Future of Spa Treatments</h2>
        <p>
          Whether you're expanding your spa menu or upgrading your self-care game, 
          innovations like Aescape, microcurrent therapy, and LED light therapy 
          are leading the next wave in wellness.
        </p>

        <div className="pt-4">
          <Link href="/aescape" className="underline text-[#113D33] font-semibold">
            Learn more about Aescape and our tech-forward treatments
          </Link>
        </div>

        {/* Related Articles */}
        <div className="pt-10 border-t border-[#d7e2dc]">
          <h3 className="text-xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/blog/denver-wellness-club" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/homepage_photo_outside.jpg" alt="Denver Wellness Club" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Denver Wellness Club</p></div>
            </Link>
            <Link href="/blog/infrared-pemf-mat" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog12.jpg" alt="Infrared PEMF Mat" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Infrared PEMF Mat</p></div>
            </Link>
            <Link href="/blog/train-like-an-athlete" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog20.jpg" alt="Train Like an Athlete" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Train Like an Athlete</p></div>
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
                  name: "How is technology changing spa treatments?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Technology is transforming spa treatments through AI-powered robotic massage (like Aescape), microcurrent facial therapy for non-invasive skin rejuvenation, LED light therapy for cellular regeneration, and infrared saunas for optimized detoxification. These innovations deliver greater precision, consistency, and personalization. Sway Wellness Spa in Denver integrates several of these technologies including Aescape robot massage, LED light therapy by LightStim, and microcurrent therapy by 7E Wellness.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is Aescape robotic massage at Sway?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Aescape is a fully automated, AI-powered robotic massage system with dual robotic arms that deliver precision pressure and remember your preferences from session to session. It offers on-demand massage experiences with customizable pressure, music, and focus areas. Sway Wellness Spa in Denver is the first location in Colorado to offer Aescape, with sessions starting at $69 for 30 minutes.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is LED light therapy and how does it work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "LED light therapy uses multi-wavelength light to stimulate skin regeneration, reduce inflammation, and boost collagen production. It is a non-invasive, painless treatment with no downtime that helps address concerns like acne, redness, and dullness. Sway Wellness Spa offers LED light therapy by LightStim as a boost add-on to facials and as part of the Remedy Room recovery circuit.",
                  },
                },
              ],
            }),
          }}
        />

        <div className="text-sm text-gray-400 pt-6">
          <Link href="/blog/tech-and-wellness" className="hover:underline">swaywellnessspa.com/blog/tech-and-wellness</Link>
        </div>
      </div>
    </div>
  );
}
