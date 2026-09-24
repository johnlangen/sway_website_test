"use client";

import Image from "next/image";
import Link from "next/link";

export default function InfraredPemfMatBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center max-w-3xl">
          PEMF Mat Benefits: What It Does, Whether It Works &amp; When to Use It
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Technology</span>
          <span className="text-gray-500">Updated September 2026 · By Sway Wellness Team</span>
        </div>

        {/* Hero: image + intro, two columns so the real mat photo renders sharp */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="rounded-xl overflow-hidden border border-[#d7e2dc] bg-white">
            <Image
              src="/assets/pemf.jpg"
              alt="Infrared PEMF mat at Sway Wellness Spa in Denver"
              width={525}
              height={800}
              className="w-full h-auto object-cover"
            />
          </div>
          <p>
            A PEMF mat pairs pulsed electromagnetic field therapy with deep
            infrared heat, and the combination has become one of the most asked
            about recovery tools in wellness. Below we break down what a PEMF mat
            actually does, how it works, the benefits backed by research, and how
            you can try one as a massage boost at Sway in Denver.
          </p>
        </div>

        {/* TOC */}
        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#what-is" className="hover:underline">What Is an Infrared PEMF Mat?</a></li>
            <li><a href="#how-it-works" className="hover:underline">How Does a PEMF Mat Work?</a></li>
            <li><a href="#benefits" className="hover:underline">PEMF Mat Benefits</a></li>
            <li><a href="#does-it-work" className="hover:underline">Does a PEMF Mat Actually Work?</a></li>
            <li><a href="#when-to-use" className="hover:underline">When to Use a PEMF Mat</a></li>
            <li><a href="#vs-infrared" className="hover:underline">PEMF Mat vs. Infrared Mat</a></li>
            <li><a href="#safety" className="hover:underline">Who Should Skip It</a></li>
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
              <p className="text-[15px] text-gray-700">Many mats layer amethyst and tourmaline stones that hold the heat and spread it evenly. Bigger claims about the crystals are mostly marketing.</p>
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
            Honest answer: it depends on which benefit you mean. The heat side is
            well understood. The PEMF side has real clinical uses, but the
            evidence for everyday wellness claims is still thin. The{" "}
            <Link href="https://my.clevelandclinic.org/health/treatments/pulsed-electromagnetic-field-pemf-therapy" target="_blank" rel="noopener noreferrer" className="underline text-[#113D33] font-semibold">
              Cleveland Clinic <span className="sr-only">(opens in new tab)</span>
            </Link>{" "}
            puts it plainly: there is no definite proof yet, and some of the
            effect may be placebo. Here is how the evidence stacks up.
          </p>
          <div className="bg-white rounded-xl border border-[#d7e2dc] divide-y divide-[#e8eee9]">
            {[
              { level: 4, label: "Well supported", t: "Heat for tight, stiff muscles", d: "Warming tissue relaxes muscle and improves blood flow. This is the part of the mat you feel." },
              { level: 3, label: "Clinical use", t: "Specific medical uses", d: "The FDA first cleared PEMF devices in 1979 for fractures that would not heal, and later for post-surgery pain and swelling. Those are prescription devices, not wellness mats." },
              { level: 2, label: "Mixed", t: "Joint pain and arthritis", d: (
                <>
                  A{" "}
                  <Link href="https://www.medicaljournals.se/jrm/content/html/10.2340/16501977-2613" target="_blank" rel="noopener noreferrer" className="underline">
                    2020 review of knee osteoarthritis trials <span className="sr-only">(opens in new tab)</span>
                  </Link>{" "}
                  found better physical function, but no clear edge over placebo for pain or stiffness.
                </>
              ) },
              { level: 1, label: "Early", t: "Soreness, sleep, and inflammation", d: "Mostly small studies and user reports. Promising, but not proven." },
            ].map((row) => (
              <div key={row.t} className="p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <div className="sm:w-40 shrink-0 space-y-1.5">
                  <div className="flex gap-1" aria-hidden="true">
                    {[1, 2, 3, 4].map((n) => (
                      <span key={n} className={`h-2 flex-1 rounded-full ${n <= row.level ? "bg-[#113D33]" : "bg-[#dfe7e2]"}`} />
                    ))}
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#113D33]">
                    {row.label}<span className="sr-only">: evidence level {row.level} of 4</span>
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#113D33]">{row.t}</h3>
                  <p className="text-[15px] text-gray-700 mt-1">{row.d}</p>
                </div>
              </div>
            ))}
          </div>
          <p>
            The takeaway: treat a PEMF mat as a feel-good recovery tool that
            makes heat and massage more enjoyable, not as a treatment for a
            medical condition.
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

        {/* When to use */}
        <section id="when-to-use" className="scroll-mt-24 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">When to Use a PEMF Mat</h2>
          <p>
            The best time is whenever your muscles feel tight and you have a
            moment to lie still. These are the moments people reach for one most.
          </p>
          <ol className="relative border-l-2 border-dashed border-[#9CB7A9] ml-3 space-y-6">
            {[
              { chip: "After training", t: "Once you have cooled down", d: "Warmth helps tight, worked muscles let go after a hard session or a long day on your feet." },
              { chip: "Rest days", t: "Recovery without the effort", d: "An easy way to stay loose between workouts when you do not want to do anything strenuous." },
              { chip: "Evening", t: "Before bed", d: "The warmth is calming, which is why many people use a mat to wind down at night." },
              { chip: "At Sway", t: "During a massage", d: "The mat warms tissue while your therapist works, so the massage meets less resistance." },
            ].map((step) => (
              <li key={step.chip} className="pl-6 relative">
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#113D33] border-4 border-[#F7F4E9]" aria-hidden="true" />
                <span className="inline-block bg-[#113D33] text-white text-xs font-semibold px-3 py-1 rounded-full">{step.chip}</span>
                <h3 className="font-bold text-[#113D33] mt-2">{step.t}</h3>
                <p className="text-[15px] text-gray-700 mt-1">{step.d}</p>
              </li>
            ))}
          </ol>
          <div className="bg-white rounded-xl border-l-4 border-[#3E7A94] p-5">
            <p className="text-[15px] text-gray-700">
              <strong className="text-[#12293D]">When not to use it:</strong> on a
              fresh injury that is still swollen. Heat can make swelling worse in
              the first couple of days, so ice it first. Start short and low on
              heat, then build up as you learn how your body responds.
            </p>
          </div>
        </section>

        {/* PEMF vs infrared */}
        <section id="vs-infrared" className="scroll-mt-24 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">PEMF Mat vs. Infrared Mat</h2>
          <p>
            The names get used interchangeably, but they are different things.
            Most spa mats, including ours, combine both.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { t: "Infrared mat", what: "Heat only", feel: "Deep, even warmth", best: "Loosening tight muscles and relaxing" },
              { t: "PEMF mat", what: "Pulsed electromagnetic fields", feel: "Usually little or nothing", best: "People curious about PEMF on its own" },
              { t: "Infrared PEMF mat", what: "Both, in one surface", feel: "Warmth, with the pulses in the background", best: "Recovery sessions and massage", ours: true },
            ].map((m) => (
              <div key={m.t} className={`rounded-xl p-5 space-y-3 ${m.ours ? "bg-[#113D33] text-white" : "bg-white border border-[#d7e2dc]"}`}>
                <h3 className="font-bold text-lg">{m.t}</h3>
                {m.ours && <p className="text-xs font-semibold uppercase tracking-wide text-[#9CB7A9]">What Sway uses</p>}
                <dl className="text-[15px] space-y-2">
                  <div><dt className={`text-xs uppercase tracking-wide ${m.ours ? "text-white/60" : "text-gray-500"}`}>What it uses</dt><dd>{m.what}</dd></div>
                  <div><dt className={`text-xs uppercase tracking-wide ${m.ours ? "text-white/60" : "text-gray-500"}`}>What you feel</dt><dd>{m.feel}</dd></div>
                  <div><dt className={`text-xs uppercase tracking-wide ${m.ours ? "text-white/60" : "text-gray-500"}`}>Best for</dt><dd>{m.best}</dd></div>
                </dl>
              </div>
            ))}
          </div>
        </section>

        {/* Safety */}
        <section id="safety" className="scroll-mt-24 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">Who Should Skip a PEMF Mat</h2>
          <div className="bg-white rounded-xl border border-[#d7e2dc] p-6 space-y-3">
            <p>PEMF is safe for most people, but check with your doctor first if you:</p>
            <ul className="space-y-2">
              <li className="flex gap-3"><span className="text-[#9CB7A9]">&#9679;</span><span>Are pregnant</span></li>
              <li className="flex gap-3"><span className="text-[#9CB7A9]">&#9679;</span><span>Have a pacemaker, insulin pump, or other implanted device</span></li>
              <li className="flex gap-3"><span className="text-[#9CB7A9]">&#9679;</span><span>Use medication patches on your skin</span></li>
              <li className="flex gap-3"><span className="text-[#9CB7A9]">&#9679;</span><span>Have epilepsy</span></li>
            </ul>
            <p className="text-[15px] text-gray-700">
              At Sway, let your therapist know about any of these before your
              session and we will skip the mat.
            </p>
          </div>
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
            <Link href="/locations/denver-larimer/book" className="bg-white text-[#113D33] font-bold px-8 py-3 rounded-full hover:bg-[#f0ede2] transition">Book a Massage</Link>
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
              <p className="font-bold text-[#113D33]">Do PEMF mats really work?</p>
              <p className="text-gray-700 mt-2 text-[15px]">Partly. The infrared heat reliably relaxes tight muscles and boosts circulation. PEMF has FDA-cleared medical uses, like healing stubborn fractures, but evidence for wellness benefits such as better sleep or less soreness is still early and mixed. Think of a PEMF mat as a recovery comfort tool, not a medical treatment.</p>
            </div>
            <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
              <p className="font-bold text-[#113D33]">When should you use a PEMF mat?</p>
              <p className="text-gray-700 mt-2 text-[15px]">Use it when muscles feel tight: after a workout once you have cooled down, on rest days, in the evening to wind down, or during a massage. Skip it on a fresh, swollen injury, since heat can make swelling worse in the first couple of days.</p>
            </div>
            <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
              <p className="font-bold text-[#113D33]">Who should not use a PEMF mat?</p>
              <p className="text-gray-700 mt-2 text-[15px]">Check with a doctor first if you are pregnant, have a pacemaker, insulin pump, or other implanted device, use medication patches on your skin, or have epilepsy.</p>
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
                  name: "Do PEMF mats really work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Partly. The infrared heat reliably relaxes tight muscles and boosts circulation. PEMF has FDA-cleared medical uses, like healing stubborn fractures, but evidence for wellness benefits such as better sleep or less soreness is still early and mixed. Think of a PEMF mat as a recovery comfort tool, not a medical treatment.",
                  },
                },
                {
                  "@type": "Question",
                  name: "When should you use a PEMF mat?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Use it when muscles feel tight: after a workout once you have cooled down, on rest days, in the evening to wind down, or during a massage. Skip it on a fresh, swollen injury, since heat can make swelling worse in the first couple of days.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Who should not use a PEMF mat?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Check with a doctor first if you are pregnant, have a pacemaker, insulin pump, or other implanted device, use medication patches on your skin, or have epilepsy.",
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
        <div className="text-sm text-gray-600 pt-4">
          Permalink: <Link href="/blog/infrared-pemf-mat" className="underline hover:text-[#113D33]">/blog/infrared-pemf-mat</Link>
        </div>
      </div>
    </div>
  );
}
