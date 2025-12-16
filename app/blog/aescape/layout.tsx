"use client";

import Image from "next/image";

export default function AescapeBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          AI  Meets  Recovery: Reset with Aescape
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <p>
          Long hours of coding, product sprints, and late-nights can leave even
          the most ergonomic workstation warriors with tight shoulders and
          aching lower backs. Meet your new CTO (Chief Tension Officer):{" "}
          <strong>Aescape</strong>, the world’s first AI-powered, fully
          autonomous robot massage.
          <br />
          <br />
          <strong>Exclusively at Sway Wellness Spa in downtown Denver.</strong>
        </p>

        <Image
          src="/assets/blog22.png"
          alt="Aescape Robot Massage at Sway"
          width={700}
          height={400}
          className="rounded-lg"
        />

        <h2 className="text-2xl font-bold">Why Tech Professionals Need Smarter Recovery</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Screens → Strain:</strong> Forward-head posture & repetitive clicks overload the neck, traps, and forearms.</li>
          <li><strong>Deadlines → Cortisol spikes:</strong> Persistent stress down-regulates creativity and focus.</li>
          <li><strong>Innovation → Iteration:</strong> Your codebase improves with each commit; your body should, too.</li>
        </ul>

        <h2 className="text-2xl font-bold">What Exactly Is Aescape?</h2>
        <p>
          Aescape combines two heated robotic arms with computer-vision body
          scanning that captures 1.1 million data points to map your musculature
          and tailor every stroke. It replicates seven human massage techniques
          and learns your preferences each session.
        </p>
        <p>
          As featured in{" "}
          <a
            href="https://www.wired.com/story/hands-on-aescape-automated-massage/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            WIRED
          </a>{" "}
          and{" "}
          <a
            href="https://yogalifelive.com/this-new-denver-wellness-club-is-using-robots-to-rethink-self-care/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            Yoga + Life® Magazine
          </a>.
        </p>

        <h2 className="text-2xl font-bold">How the AI Massage Works at Sway</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Gear Up in Aerwear:</strong> Slip into a compression suit.</li>
          <li><strong>3-D Body Scan:</strong> Ten-second scan personalizes pressure paths.</li>
          <li><strong>Choose Your Flow:</strong> Recovery, Deep Work, or Custom focus.</li>
          <li><strong>Real-Time Control:</strong> Adjust pressure, skip segments, or pause in real time.</li>
          <li><strong>Save Your Preferences:</strong> The more you train it, the smarter it gets.</li>
        </ul>

        <h2 className="text-2xl font-bold">Key Benefits for Coders, Engineers & Designers</h2>
        <table className="w-full border border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Dev Pain Point</th>
              <th className="p-2">Aescape Solution</th>
              <th className="p-2">Why It Matters</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">Text-neck & rounded shoulders</td>
              <td className="p-2">Cervical & thoracic mobilization</td>
              <td className="p-2">Reduces headaches, improves posture</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">Wrist & forearm fatigue</td>
              <td className="p-2">Forearm myofascial release</td>
              <td className="p-2">Eases carpal-tunnel–like symptoms</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">Stress-induced insomnia</td>
              <td className="p-2">Parasympathetic pressure patterns</td>
              <td className="p-2">Promotes sleep & recovery</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">Meeting overload</td>
              <td className="p-2">30-minute sessions</td>
              <td className="p-2">Fits between stand-ups and reviews</td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-2xl font-bold">What to Expect on Your First Session</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Stay Clothed:</strong> Perfect for midday sessions.</li>
          <li><strong>Fully Private:</strong> Let the robot do the “talking.”</li>
          <li><strong>Transparent Pricing:</strong> Sessions start at $69 for 30 minutes.</li>
        </ul>

        <h2 className="text-2xl font-bold">Book Your Robot Massage Today</h2>
        <p>
          Ready to trade bugs for back relief? Reserve your spot now. Sessions
          fill quickly, especially during Denver Startup Week.
        </p>
        <div className="pt-4">
          <a href="/book" className="underline text-blue-600">
            👉 Schedule Now →
          </a>
        </div>

        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <ul className="space-y-4">
          <li><strong>Is it safe?</strong> Yes. Emergency stop and real-time pressure controls are built in.</li>
          <li><strong>Does it replace human therapists?</strong> No. It complements traditional massage.</li>
          <li><strong>What should I wear?</strong> We provide Aerwear at check-in—just bring socks.</li>
        </ul>
      </div>
    </div>
  );
}
