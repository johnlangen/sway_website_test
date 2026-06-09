"use client";

import Image from "next/image";
import Link from "next/link";

export default function InfraredPemfMatBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center max-w-3xl">
          PEMF Mat Benefits: How Infrared Heat & Pulsed Energy Speed Recovery
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Technology</span>
          <span className="text-gray-500">Updated June 2026 · By Sway Wellness Team</span>
        </div>

        {/* Hero image */}
        <div className="rounded-xl overflow-hidden border border-[#d7e2dc]">
          <Image
            src="/assets/pemf.jpg"
            alt="Infrared PEMF mat at Sway Wellness Spa in Denver"
            width={1200}
            height={700}
            className="w-full h-72 md:h-96 object-cover"
          />
        </div>

        <p>
          A PEMF mat pairs pulsed electromagnetic field therapy with deep
          infrared heat, and the combination has become one of the most asked
          about recovery tools in wellness. Below we break down what a PEMF mat
          actually does, how it works, the benefits backed by research, and how
          you can try one as a massage boost at Sway in Denver.
        </p>

        {/* TOC */}
        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#what-is" className="hover:underline">What Is an Infrared PEMF Mat?</a></li>
            <li><a href="#how-it-works" className="hover:underline">How Does a PEMF Mat Work?</a></li>
            <li><a href="#benefits" className="hover:underline">PEMF Mat Benefits</a></li>
            <li><a href="#does-it-work" className="hover:underline">Does a PEMF Mat Actually Work?</a></li>
            <li><a href="#with-massage" className="hover:underline">Why Combine PEMF with Massage</a></li>
            <li><a href="#try-it" className="hover:underline">Try It at Sway in Denver</a></li>
            <li><a href="#faq" className="hover:underline">PEMF Mat FAQ</a></li>
          </ol>
        </nav>

        {/* What is */}
        <section id="what-is" className="scroll-mt-24 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">What Is an Infrared PEMF Mat?</h2>
          <p>
            An infrared PEMF mat is a recovery mat you lie on that layers three
            technologies into one surface. Each one targets a different part of
            how your body relaxes and repairs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2">
              <h3 className="font-bold text-[#113D33]">PEMF Therapy</h3>
              <p className="text-[15px] text-gray-700">Pulsed electromagnetic fields mimic the Earth&apos;s natural frequencies to support cellular repair and help calm inflammation.</p>
            </div>
            <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2">
              <h3 className="font-bold text-[#113D33]">Infrared Heat</h3>
              <p className="text-[15px] text-gray-700">Penetrating warmth reaches deeper than surface heat, boosting circulation and easing muscle tension.</p>
            </div>
            <div className="bg-white rounded-xl border border-[#d7e2dc] p-5 space-y-2">
              <h3 className="font-bold text-[#113D33]">Healing Crystals</h3>
              <p className="text-[15px] text-gray-700">Amethyst and tourmaline generate negative ions that act as natural antioxidants as the mat warms.</p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-24 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">How Does a PEMF Mat Work?</h2>
          <p>
            The short version: low-frequency electromagnetic pulses pass through
            the body while infrared heat warms tissue from within. Here is what
            that looks like in practice.
          </p>
          <div className="space-y-4">
            {[
              {
                t: "Pulsed fields reach the cellular level",
                d: "PEMF sends gentle electromagnetic pulses (commonly in the 3Hz to 23Hz range) through the body to encourage cells to recharge and repair.",
              },
              {
                t: "Infrared warms tissue from the inside",
                d: "Unlike a heating pad that warms the skin, infrared penetrates deeper to relax muscles and widen blood vessels for better circulation.",
              },
              {
                t: "Circulation carries the benefit further",
                d: "Improved blood flow means more oxygen and nutrients to tired tissue, and a faster clearing of the byproducts that make you sore.",
              },
            ].map((step, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#d7e2dc] p-5 flex gap-4 items-start">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#113D33] text-white text-sm font-bold shrink-0">{i + 1}</span>
                <div>
                  <h3 className="font-bold text-[#113D33]">{step.t}</h3>
                  <p className="text-[15px] text-gray-700 mt-1">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="scroll-mt-24 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">PEMF Mat Benefits</h2>
          <p>
            People reach for a PEMF mat for recovery, pain, and relaxation. These
            are the benefits that come up most often.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { t: "Eases joint & muscle pain", d: "PEMF is widely used to help relieve aching joints and sore, overworked muscles." },
              { t: "Calms inflammation", d: "The pulsed fields are associated with a reduction in inflammation, a key driver of pain and stiffness." },
              { t: "Speeds muscle recovery", d: "Better circulation and cellular support help tissue bounce back faster after training or a long day." },
              { t: "Improves circulation", d: "Infrared heat widens blood vessels so oxygen-rich blood moves more freely." },
              { t: "Supports better sleep", d: "Many users report deeper, more restful sleep after regular PEMF sessions." },
              { t: "Deepens relaxation", d: "The warmth and gentle pulses put the nervous system into a calmer, rest-and-recover state." },
            ].map((b, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#d7e2dc] p-5 flex gap-3 items-start">
                <span className="text-[#9CB7A9] text-xl leading-none">&#9679;</span>
                <div>
                  <h3 className="font-bold text-[#113D33]">{b.t}</h3>
                  <p className="text-[15px] text-gray-700 mt-1">{b.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Does it work */}
        <section id="does-it-work" className="scroll-mt-24 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">Does a PEMF Mat Actually Work?</h2>
          <p>
            PEMF is not new. It has been studied for decades and is even used in
            clinical settings. According to{" "}
            <Link href="https://www.pemfadvisor.com/research/" target="_blank" className="underline text-[#113D33] font-semibold">
              PEMF Advisor
            </Link>
            , research suggests PEMF therapy can help relieve joint and muscle
            pain, reduce inflammation, and improve sleep quality. As a fun aside,
            astronauts use PEMF to counter the physical stress of low gravity, so
            if it helps in space, it can certainly help with post-workout
            soreness and everyday tension.
          </p>
          <blockquote className="border-l-4 border-[#9CB7A9] pl-6 py-2">
            <p className="text-xl text-[#113D33] italic">
              &ldquo;Integrating the infrared PEMF mat into my massage at Sway has
              transformed my recovery. I feel rejuvenated and notice a real
              reduction in muscle soreness.&rdquo;
            </p>
            <footer className="text-sm text-gray-500 mt-2">Alex P., Sway Guest</footer>
          </blockquote>
        </section>

        {/* With massage */}
        <section id="with-massage" className="scroll-mt-24 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">Why Combine PEMF with Massage</h2>
          <div className="bg-white rounded-xl border border-[#d7e2dc] overflow-hidden">
            <Image src="/assets/massage2.jpg" alt="Massage therapy at Sway Wellness Spa in Denver" width={1200} height={600} className="w-full h-64 object-cover" />
            <div className="p-6 space-y-4">
              <p>
                On its own, a PEMF mat is a great recovery tool. Paired with
                hands-on massage, the two reinforce each other: the mat warms and
                loosens tissue while your therapist works, so the massage goes
                deeper with less resistance.
              </p>
              <ul className="space-y-2">
                <li className="flex gap-3"><span className="text-[#9CB7A9]">&#9679;</span><span><strong>Enhanced pain relief</strong> from increased blood flow and deeper tension release</span></li>
                <li className="flex gap-3"><span className="text-[#9CB7A9]">&#9679;</span><span><strong>Faster muscle recovery</strong> as PEMF supports cells while massage soothes tightness</span></li>
                <li className="flex gap-3"><span className="text-[#9CB7A9]">&#9679;</span><span><strong>A total-body reset</strong> that leaves you looser, calmer, and recharged</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div id="try-it" className="scroll-mt-24 bg-[#113D33] text-white rounded-xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Try the PEMF mat as a massage boost at Sway</h3>
          <p className="text-white/90 max-w-xl mx-auto">
            Add the infrared PEMF mat to any massage in Denver. Lie on the mat
            while your therapist works and customize the heat and intensity to
            match your body. Members get 50% off all boosts.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link href="/locations/denver-larimer/book-service" className="bg-white text-[#113D33] font-bold px-8 py-3 rounded-full hover:bg-[#f0ede2] transition">Book a Massage</Link>
            <Link href="/massages" className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-[#113D33] transition">Explore Massages</Link>
          </div>
        </div>

        {/* Visible FAQ */}
        <section id="faq" className="scroll-mt-24 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">PEMF Mat FAQ</h2>
          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
              <p className="font-bold text-[#113D33]">What is a PEMF infrared mat?</p>
              <p className="text-gray-700 mt-2 text-[15px]">A PEMF infrared mat combines pulsed electromagnetic field therapy with infrared heat. PEMF mimics the Earth&apos;s natural frequencies to support cellular repair and reduce inflammation, while infrared heat delivers penetrating warmth that boosts circulation and relieves tension. At Sway Wellness Spa in Denver, the infrared PEMF mat is available as a boost add-on during massage sessions.</p>
            </div>
            <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
              <p className="font-bold text-[#113D33]">What are the benefits of a PEMF mat?</p>
              <p className="text-gray-700 mt-2 text-[15px]">Reported PEMF mat benefits include relief from joint and muscle pain, reduced inflammation, faster muscle recovery, improved circulation, better sleep, and deeper relaxation. Combining PEMF with massage can enhance each of these effects.</p>
            </div>
            <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
              <p className="font-bold text-[#113D33]">How does a PEMF mat work?</p>
              <p className="text-gray-700 mt-2 text-[15px]">A PEMF mat sends low-frequency electromagnetic pulses (commonly 3Hz to 23Hz) through the body to encourage cells to recharge and repair, while infrared heat warms tissue from within to improve circulation. Together they help relax muscles and speed recovery.</p>
            </div>
            <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
              <p className="font-bold text-[#113D33]">How do I try the PEMF mat at Sway?</p>
              <p className="text-gray-700 mt-2 text-[15px]">You can add the infrared PEMF mat as a boost to any massage at Sway Wellness Spa in Denver. During your session you lie on the mat while your therapist works, and you can customize the heat and intensity. Members receive 50% off all boosts, including the PEMF mat.</p>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <div className="pt-12 border-t border-[#d7e2dc]">
          <h3 className="text-xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/blog/recovery-denver" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/remedy-room.jpg" alt="Recovery in Denver" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Recovery in Denver: Sauna, Cold Plunge & Robot Massage</p></div>
            </Link>
            <Link href="/blog/80-minute-massage" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog25.jpg" alt="80-Minute Massage" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Why an 80-Minute Massage Is the Ultimate Reset</p></div>
            </Link>
            <Link href="/blog/himalayan-salt-stone-massage" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog5.jpg" alt="Himalayan Salt Stone Massage" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Himalayan Salt Stone Massage: Ultimate Relaxation at Sway</p></div>
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
                  name: "What is a PEMF infrared mat?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A PEMF infrared mat combines pulsed electromagnetic field therapy with infrared heat. PEMF mimics the Earth's natural frequencies to support cellular repair and reduce inflammation, while infrared heat delivers penetrating warmth that boosts circulation and relieves tension. At Sway Wellness Spa in Denver, the infrared PEMF mat is available as a boost add-on during massage sessions.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are the benefits of a PEMF mat?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Reported PEMF mat benefits include relief from joint and muscle pain, reduced inflammation, faster muscle recovery, improved circulation, better sleep, and deeper relaxation. Combining PEMF therapy with massage can enhance each of these effects through increased blood flow and deeper tension release.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How does a PEMF mat work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A PEMF mat sends low-frequency electromagnetic pulses, commonly in the 3Hz to 23Hz range, through the body to encourage cells to recharge and repair, while infrared heat warms tissue from within to improve circulation. Together they help relax muscles, calm inflammation, and speed recovery.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do I try the infrared PEMF mat at Sway?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You can add the infrared PEMF mat as a boost to any massage at Sway Wellness Spa in Denver. During your session you lie on the mat while your therapist works, and you can customize the heat and intensity. Sway members receive 50% off all boosts, including the PEMF mat.",
                  },
                },
              ],
            }),
          }}
        />

        {/* Permalink */}
        <div className="text-sm text-gray-400 pt-4">
          Permalink: <Link href="/blog/infrared-pemf-mat" className="underline hover:text-[#113D33]">/blog/infrared-pemf-mat</Link>
        </div>
      </div>
    </div>
  );
}
