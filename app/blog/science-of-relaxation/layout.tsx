"use client";

import Image from "next/image";
import Link from "next/link";

export default function ScienceOfRelaxationBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Science of Relaxation: How Spa Treatments Ease Stress & Anxiety
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <p>
          Stress and anxiety can weigh heavily on our minds and bodies,
          impacting clarity, relationships, and health. At Sway, we use
          science-backed therapies to provide real relief—not just pampering,
          but powerful tools for nervous system regulation and long-term
          wellness.
        </p>

        <p>
          Treatments like massage, cold plunge, sauna, and mindful facials are
          proven to lower cortisol, ease tension, and restore inner balance.
          Research from{" "}
          <a
            href="https://www.mdpi.com/2079-9721/12/10/232"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            MDPI
          </a>{" "}
          confirms spa therapy’s effect on mental health and sleep quality. And{" "}
          <a
            href="https://www.thetimes.com/world/europe/article/cold-water-swimming-psychotherapy-fn72plldc?region=global"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            The Times
          </a>{" "}
          explores how cold water immersion can disrupt anxiety patterns and
          foster emotional resilience.
        </p>

        <h2 className="text-2xl font-bold">Here’s How Sway Works its Magic</h2>

        <h3 className="text-xl font-semibold">Therapeutic Massages</h3>
        <p>
          Experience a full-body reset that relieves muscle tightness, reduces
          stress, and calms the nervous system.
          <span className="block italic mt-1">
            “Our therapeutic massage treatments help release physical tension
            while calming the nervous system.” – Steven, Sway Massage Therapist
          </span>
        </p>

        <h3 className="text-xl font-semibold">Cold Plunge Therapy</h3>
        <p>
          This high-impact, quick recovery method reduces inflammation, improves
          mood, and floods the brain with endorphins. It’s a full-body and
          mental reset that helps you feel energized and clear-headed after just
          minutes of immersion.
        </p>

        <h3 className="text-xl font-semibold">Sauna Experience</h3>
        <p>
          Heat therapy enhances circulation, flushes toxins, and eases sore
          muscles. When paired with cold plunge, it creates contrast therapy—a
          dynamic combination for full-body restoration and emotional reset.
        </p>

        <h3 className="text-xl font-semibold">Facials with Tension Relief</h3>
        <p>
          Our facials not only nourish your skin, but relieve facial tension and
          promote deep calm. The result? A radiant glow paired with a soothed
          nervous system.
        </p>

        <Image
          src="/assets/blog11.png"
          alt="A flow chart to test if Sway can help reduce your stress"
          width={600}
          height={400}
          className="w-[600px] h-auto rounded-lg"
        />

        <h2 className="text-2xl font-bold">
          The Benefits of Spa Treatments Backed by Science
        </h2>

        <h3 className="text-xl font-semibold">Lower Cortisol Levels</h3>
        <p>
          High stress leads to elevated cortisol, affecting sleep, weight, and
          mood. Our therapies interrupt that cycle, promoting deep, hormonal
          balance.
        </p>

        <h3 className="text-xl font-semibold">Improved Circulation & Recovery</h3>
        <p>
          Cold plunges, massage, and hydrotherapy enhance blood flow, helping
          your body detox and recover faster—physically and emotionally.
        </p>

        <h3 className="text-xl font-semibold">Enhanced Sleep Quality</h3>
        <p>
          Spa therapy activates the parasympathetic nervous system, preparing
          your body for deep rest and better sleep.
        </p>

        <h3 className="text-xl font-semibold">
          Stress Management for Long-Term Benefits
        </h3>
        <p>
          Regular spa visits become preventative care. They build emotional
          resilience and help you stay grounded no matter what life throws at
          you.
        </p>

        <h2 className="text-2xl font-bold">Join the Sway Community</h2>
        <p>
          At Sway, self-care is a lifestyle. Our expert team and state-of-the-art
          services are designed to help you reset, recharge, and feel your
          absolute best—every single visit.
        </p>

        <div className="pt-4">
          <Link href="/membership" className="underline text-blue-600">
            Explore our Membership Options
          </Link>
        </div>
      </div>
    </div>
  );
}
