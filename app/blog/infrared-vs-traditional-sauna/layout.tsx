"use client";

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
        <p>
          Saunas have long been a pillar of European wellness culture, offering
          physical and mental benefits passed down through generations. Today,
          that tradition is booming in the U.S., with both traditional and
          infrared saunas making waves in wellness communities. At Sway Wellness
          Spa, we proudly offer an authentic traditional sauna experience inside
          our Remedy Room – a time-tested wellness practice that delivers
          powerful results.
        </p>

        <h2 className="text-2xl font-bold">What Makes a Traditional Sauna Special?</h2>
        <p>
          Traditional saunas heat the air using hot stones or a stove, creating
          a dry or steamy environment with temperatures reaching 190°F+. When
          water is added to the stones, humidity increases, intensifying the
          cleansing experience. This method has been used for centuries to
          encourage deep relaxation and detoxification.
        </p>

        <h2 className="text-2xl font-bold">Benefits of Traditional Saunas</h2>
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

        <img
          src="/assets/blog8.jpg"
          alt="Traditional Sauna at Sway Wellness Spa"
          className="w-[600px] h-auto rounded-lg"
        />

        <h2 className="text-2xl font-bold">What About Infrared Saunas?</h2>
        <p>
          Infrared saunas are a modern innovation. Instead of heating the air,
          they use infrared light to directly warm your body at lower
          temperatures (120–150°F). Though still emerging in research, they're
          praised for their gentler heat and potential detoxification benefits.
        </p>

        <h2 className="text-2xl font-bold">Perceived Benefits of Infrared Saunas</h2>
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

        <h2 className="text-2xl font-bold">Why Traditional Saunas Still Lead the Way</h2>
        <p>
          Traditional saunas offer a rich, ritualistic experience with
          time-proven results. Their high heat and customizable humidity levels
          provide deeper detox and a more immersive wellness experience. Backed
          by generations of cultural use and science, they remain the go-to for
          serious wellness seekers.
        </p>

        <h2 className="text-2xl font-bold">Why Choose Traditional?</h2>
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

        <h2 className="text-2xl font-bold">The Sauna Boom in the U.S.</h2>
        <p>
          As awareness of sauna benefits spreads, more Americans are turning to
          this ancient practice. Whether at boutique spas, gyms, or even at
          home, saunas are becoming a staple in wellness routines focused on
          stress relief, circulation, and recovery.
        </p>

        <h2 className="text-2xl font-bold">Experience the Best at Sway</h2>
        <p>
          At Sway, our traditional sauna offers a space to deeply relax, detox,
          and recharge. Whether you're a seasoned sauna enthusiast or trying it
          for the first time, this timeless experience is the perfect way to
          invest in your holistic health.
        </p>

        <div className="pt-4">
          <Link href="/sauna" className="underline text-blue-600">
            Book Your Sauna Experience at Sway Today
          </Link>
        </div>
      </div>
    </div>
  );
}
