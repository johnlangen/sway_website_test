"use client";

import Image from "next/image";

export default function Massage80MinBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Take Time for You: Why an 80-Minute Massage Is the Ultimate Reset
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <p>
          Sometimes, your mind and body send clear signals that it’s time for a
          break. Maybe it’s the tension building in your shoulders after sitting
          at your desk all day, the persistent lower back pain that just won’t
          go away, or the mental fog that makes even simple tasks feel
          overwhelming. Whatever the signs, they’re telling you something
          important: it’s time to prioritize yourself. Enter the ultimate
          self-care solution: an 80-minute massage at Sway Wellness Spa.
        </p>

        <p>
          This isn’t just any massage—it’s a transformative experience designed
          to reset both your body and mind. With extended treatments,
          customizable techniques tailored to your unique needs, and expert
          therapists who know exactly how to work on problem areas, these 80
          minutes offer more than just relaxation. They provide a deep sense of
          rejuvenation that lasts beyond the treatment. You’ll feel tension melt
          away, stress levels drop, and energy begin to flow freely again.
        </p>

        <p>
          Why settle for a quick fix when you can gift yourself an extended
          reset? With extra time, your therapist can focus on stubborn knots,
          target multiple areas of concern, and ensure every muscle gets the
          care it deserves. It’s not just a massage—it’s an investment in your
          well-being. Make the choice to upgrade to an 80-minute massage and
          give yourself the attention and care you truly deserve. You’ll leave
          feeling lighter, calmer, and ready to take on whatever comes your way.
        </p>

        <Image
          src="/assets/blog25.png"
          alt="80-Minute Massage at Sway Wellness Spa"
          width={700}
          height={400}
          className="rounded-lg"
        />

        <h2 className="text-2xl font-bold">
          The Benefits of an 80-Minute Massage at Sway
        </h2>
        <p>
          80 minutes isn’t just about extra time on the massage table; it’s
          about unlocking the fullest potential of your self-care routine.
          Here’s what makes it worth every second:
        </p>

        <h3 className="text-xl font-semibold">1. More Time for Problem Areas</h3>
        <p>
          With an 80-minute treatment, our therapists have the time to truly
          focus on specific problem areas, providing targeted relief without
          rushing. This extended treatment allows for deep work on trouble spots
          plus a full-body massage.
        </p>
        <blockquote>
          "The 80-minute massage gave me exactly what I needed with real time to
          work on my shoulders and lower back without feeling rushed." – James
          L., Sway Guest
        </blockquote>

        <h3 className="text-xl font-semibold">2. Specialty Techniques, No Extra Charges</h3>
        <p>
          At Sway, specialty techniques are included—Deep Tissue, CBD Massage,
          Sports Recovery, and Salt Stone Therapy—no upcharges.
        </p>

        <h3 className="text-xl font-semibold">3. Unparalleled Mind-Body Reconnection</h3>
        <p>
          80 minutes provides the space to truly sink into a deeper state of
          relaxation. You’ll walk away with a clearer mind, looser muscles, and
          reduced stress levels.
        </p>

        <h2 className="text-2xl font-bold">Why Choose Sway?</h2>
        <p>
          At Sway Wellness Spa, self-care isn’t a luxury—it’s a necessity. From
          transparent pricing to expert therapists and holistic services, we
          make sure your wellness journey is simple and restorative.
        </p>

        <h2 className="text-2xl font-bold">How to Book</h2>
        <p>
          Booking is quick and easy—{" "}
          <a href="/book" className="underline text-blue-600">
            👉 Book Now →
          </a>
        </p>
      </div>
    </div>
  );
}
