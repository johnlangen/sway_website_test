"use client";

import Image from "next/image";
import Link from "next/link";

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
        {/* Back + Date + Tag */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Massage</span>
          <span className="text-gray-500">January 2025 · By Sway Wellness Team</span>
        </div>

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
          src="/assets/blog25.jpg"
          alt="80-Minute Massage at Sway Wellness Spa"
          width={700}
          height={400}
          className="rounded-lg"
        />

        {/* Table of Contents */}
        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#benefits" className="hover:underline">The Benefits of an 80-Minute Massage at Sway</a></li>
            <li><a href="#why-sway" className="hover:underline">Why Choose Sway?</a></li>
            <li><a href="#how-to-book" className="hover:underline">How to Book</a></li>
          </ol>
        </nav>

        <h2 id="benefits" className="text-2xl font-bold scroll-mt-24">
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

        <h2 id="why-sway" className="text-2xl font-bold scroll-mt-24">Why Choose Sway?</h2>
        <p>
          At Sway Wellness Spa, self-care isn’t a luxury—it’s a necessity. From
          transparent pricing to expert therapists and holistic services, we
          make sure your wellness journey is simple and restorative.
        </p>

        <h2 id="how-to-book" className="text-2xl font-bold scroll-mt-24">How to Book</h2>
        <p>
          Booking is quick and easy—{" "}
          <Link href="/book" className="underline text-[#113D33] font-semibold">
            Book Now &rarr;
          </Link>
        </p>

        {/* Related Articles */}
        <div className="pt-6">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/blog/himalayan-salt-stone-massage" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden">
                <Image src="/assets/blog5.jpg" alt="Himalayan Salt Stone Massage" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">Himalayan Salt Stone Massage: Ultimate Relaxation</p>
              </div>
            </Link>
            <Link href="/blog/train-like-an-athlete" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden">
                <Image src="/assets/blog20.jpg" alt="Train Like an Athlete" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">Train Like an Athlete, Recover Like an Athlete</p>
              </div>
            </Link>
            <Link href="/blog/infrared-pemf-mat" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden">
                <Image src="/assets/blog12.jpg" alt="Infrared PEMF Mat" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">Supercharge Your Massage: Infrared PEMF Mats</p>
              </div>
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-400 pt-4 border-t border-[#d7e2dc]">
          Permalink: swaywellnessspa.com/blog/80-minute-massage
        </p>
      </div>
    </div>
  );
}
