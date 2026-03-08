"use client";

import Link from "next/link";
import Image from "next/image";

function Star() {
  return (
    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ReviewCard({
  quote,
  name,
}: {
  quote: string;
  name: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#d7e2dc] p-6">
      <div className="flex gap-0.5 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} />
        ))}
      </div>
      <p className="text-[15px] italic opacity-80">&ldquo;{quote}&rdquo;</p>
      <p className="mt-2 text-sm font-semibold">{name}</p>
    </div>
  );
}

export default function SaltStoneVsHotStoneLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
          Salt Stone vs Hot Stone Massage:<br className="hidden md:block" />{" "}
          Why Himalayan Salt Wins
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        {/* Back Link + Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link
            href="/blog"
            className="text-[#113D33] font-semibold hover:underline"
          >
            &larr; Back to Blog
          </Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
            Massage
          </span>
          <span className="text-gray-500">
            March 2026 &middot; By Sway Wellness Team
          </span>
        </div>

        {/* Intro */}
        <p>
          If you have ever searched for a &ldquo;hot stone massage in
          Denver,&rdquo; you have probably come across salt stone massage too.
          They sound similar. Many people assume they are the same thing. Even
          some of our own guests call it a hot stone massage when they book. But
          they are not the same treatment. The stones are different, the benefits
          are different, and the way your body responds is different. At Sway
          Wellness Spa on Larimer Square, we use Himalayan salt stones for a
          reason. Here is why.
        </p>

        {/* Table of Contents */}
        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li>
              <a href="#what-is-salt-stone" className="hover:underline">
                What Is a Salt Stone Massage?
              </a>
            </li>
            <li>
              <a href="#salt-vs-hot" className="hover:underline">
                Salt Stone vs Hot Stone: The Key Differences
              </a>
            </li>
            <li>
              <a href="#benefits" className="hover:underline">
                5 Benefits of Himalayan Salt Stone Massage
              </a>
            </li>
            <li>
              <a href="#guest-reviews" className="hover:underline">
                What Our Guests Are Saying
              </a>
            </li>
            <li>
              <a href="#what-to-expect" className="hover:underline">
                What to Expect at Sway
              </a>
            </li>
            <li>
              <a href="#who-should-try" className="hover:underline">
                Who Should Try a Salt Stone Massage?
              </a>
            </li>
          </ol>
        </nav>

        {/* Hero Image */}
        <Image
          src="/assets/saltstoneblog.jpg"
          alt="Himalayan salt stones used for massage therapy at Sway Wellness Spa in Denver"
          width={800}
          height={500}
          priority
          className="rounded-lg w-full"
        />

        {/* ---------------------------------------------------------------- */}
        <h2
          id="what-is-salt-stone"
          className="text-2xl font-bold scroll-mt-24"
        >
          What Is a Salt Stone Massage?
        </h2>
        <p>
          A salt stone massage uses smooth, hand-carved stones made from
          Himalayan salt crystals. These crystals formed over 250 million years
          ago in ancient sea beds and contain 84 naturally occurring minerals,
          including magnesium, potassium, calcium, and iron (the mineral that
          gives the stones their signature pink color).
        </p>
        <p>
          During the treatment, your massage therapist warms the salt stones and
          uses them to deliver long, flowing strokes across your body. As the
          Himalayan salt stones glide over your skin, they release trace minerals
          that absorb into the body while gently exfoliating the surface. The
          result is a massage that works on multiple levels: muscular relief,
          mineral nourishment, skin smoothing, and deep nervous system
          relaxation.
        </p>

        {/* ---------------------------------------------------------------- */}
        <h2 id="salt-vs-hot" className="text-2xl font-bold scroll-mt-24">
          Salt Stone vs Hot Stone: The Key Differences
        </h2>
        <p>
          Traditional hot stone massage uses basalt stones. Basalt is volcanic
          rock. It retains heat well and feels great on tight muscles, but it is
          essentially inert. It warms your muscles and that is about it.
          Himalayan salt stones do everything a hot stone does, plus quite a bit
          more.
        </p>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Material:</strong> Hot stone uses basalt (volcanic rock).
            Salt stone uses hand-carved Himalayan salt crystals packed with 84
            minerals.
          </li>
          <li>
            <strong>Mineral absorption:</strong> Basalt transfers zero minerals
            to your skin. Salt stones release magnesium, potassium, calcium, and
            iron as they move across your body.
          </li>
          <li>
            <strong>Exfoliation:</strong> Hot stones are completely smooth and
            polished. Salt stones have a natural crystalline texture that
            provides gentle exfoliation, leaving skin noticeably softer after
            each session.
          </li>
          <li>
            <strong>Temperature:</strong> Basalt stones are typically heated to
            130 to 145 degrees, which can feel intense for some people.
            Himalayan salt stones are warmed to a gentler temperature, just a few
            degrees above body heat. This makes the salt stone massage more
            comfortable, especially if you find traditional hot stones too much.
          </li>
          <li>
            <strong>Antimicrobial properties:</strong> Salt is naturally
            antimicrobial. Salt stones resist bacteria growth between uses,
            something basalt cannot do on its own.
          </li>
          <li>
            <strong>How it feels:</strong> Hot stone massage tends to be
            stimulating and deeply warming. Salt stone massage is grounding and
            calming. Our guests consistently describe leaving their salt stone
            sessions feeling centered and deeply relaxed, not just loosened up
            but genuinely recharged.
          </li>
        </ul>

        {/* ---------------------------------------------------------------- */}
        <h2 id="benefits" className="text-2xl font-bold scroll-mt-24">
          5 Benefits of Himalayan Salt Stone Massage
        </h2>
        <p>
          Salt stone massage is one of the most requested treatments at Sway.
          Here is what makes it stand out from other massage types.
        </p>

        <h3 className="text-xl font-bold mt-6">1. Deep Stress Relief</h3>
        <p>
          The gentle, sustained warmth of Himalayan salt stones calms your
          nervous system quickly. Combined with skilled massage technique, a salt
          stone session can reduce cortisol levels and bring your body back to a
          relaxed, balanced state. Many of our guests tell us they feel the
          stress relief for days after their appointment. One guest, Jazmine O.,
          put it simply: she left her salt stone massage &ldquo;in a
          daze&rdquo; and signed up for a membership on the spot.
        </p>

        <h3 className="text-xl font-bold mt-6">2. Natural Detoxification</h3>
        <p>
          Himalayan salt helps draw out toxins through the skin. The warmth from
          the stones opens your pores while the salt and massage work together to
          support your body&apos;s natural detox pathways. Drinking plenty of
          water before and after your session enhances this benefit. If you have
          ever wanted to feel genuinely &ldquo;cleansed&rdquo; after a massage,
          salt stone delivers that feeling in a way that traditional hot stone
          cannot.
        </p>

        <h3 className="text-xl font-bold mt-6">3. Improved Circulation</h3>
        <p>
          The minerals in Himalayan salt stones, especially magnesium and
          potassium, support healthy blood flow. Better circulation means faster
          muscle recovery, reduced inflammation, and more oxygen delivered to
          your tissues. This is particularly valuable if you are active, deal
          with soreness from training, or simply spend long hours at a desk.
        </p>

        <h3 className="text-xl font-bold mt-6">
          4. Softer, Healthier Skin
        </h3>
        <p>
          The gentle exfoliation from the salt crystal surface removes dead skin
          cells as the stones move across your body. The minerals left behind
          nourish and hydrate. Guests regularly tell us their skin feels smoother
          and looks more radiant after a salt stone massage. It is one of those
          benefits you do not expect from a massage, but it is hard to ignore
          once you notice it.
        </p>

        <h3 className="text-xl font-bold mt-6">
          5. Muscle Relief Without the Intensity
        </h3>
        <p>
          If you carry a lot of tension but find deep tissue massage too
          aggressive, salt stone massage is an excellent middle ground. The
          sustained warmth from the stones loosens tight muscles so your
          therapist can work more effectively without excess pressure. You get
          the relief without the soreness that sometimes follows a deep tissue
          session. Several of our guests have switched from deep tissue to salt
          stone for exactly this reason.
        </p>

        {/* ---------------------------------------------------------------- */}
        <h2 id="guest-reviews" className="text-2xl font-bold scroll-mt-24">
          What Our Guests Are Saying
        </h2>
        <p>
          We do not have to convince you ourselves. Here is what real Sway guests
          have said about our Himalayan salt stone massage on Google.
        </p>

        <div className="space-y-4">
          <ReviewCard
            quote="Got the hot stone massage with Steven and I left in a daze. I couldn't believe how much stress relief I got from one session. The space is very relaxing and Steven is superb. I immediately signed up for a membership."
            name="Jazmine O."
          />
          <ReviewCard
            quote="I went in for a salt stone massage with Steven and he did an amazing job! This was the perfect way to start my week. I'll definitely be coming back."
            name="Carolina C."
          />
          <ReviewCard
            quote="I had a AMAZING Salt Stone massage with Steven. Highly recommend. Great ambience."
            name="Karyn W."
          />
          <ReviewCard
            quote="Loved the stone massage."
            name="Fatma K."
          />
        </div>

        <p className="text-sm opacity-60">
          All reviews are 5 stars. Read more on{" "}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Sway+Wellness+Spa+Larimer&query_place_id=ChIJtRQkUu55bIcR91jycB7Jcns"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Google
          </a>
          .
        </p>

        {/* Mid-article CTA */}
        <div className="bg-[#113D33] text-white rounded-xl p-8 text-center space-y-4">
          <p className="text-xl font-bold">
            Ready to try the salt stone difference?
          </p>
          <p className="opacity-80 text-sm">
            50-minute session. $99 members / $139 drop-in.
          </p>
          <Link
            href="/locations/denver-larimer/book-service"
            className="inline-block bg-white text-[#113D33] font-bold px-8 py-3 rounded-full hover:bg-white/90 transition"
          >
            Book a Salt Stone Massage
          </Link>
        </div>

        {/* ---------------------------------------------------------------- */}
        <h2 id="what-to-expect" className="text-2xl font-bold scroll-mt-24">
          What to Expect at Sway
        </h2>
        <p>
          The Salt Stone massage at Sway Wellness Spa is a 50-minute treatment.
          Here is what your visit looks like from start to finish.
        </p>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Arrive and settle in.</strong> Our spa is located on Larimer
            Square in downtown Denver. Members have access to the member lounge
            before their appointment, which is the perfect place to start
            unwinding before your treatment even begins.
          </li>
          <li>
            <strong>Meet your therapist.</strong> Your massage therapist will
            discuss your areas of tension and preferred pressure level. Our salt
            stone massage can be tailored from light to firm.
          </li>
          <li>
            <strong>The treatment.</strong> Warmed Himalayan salt stones are used
            in flowing strokes along your back, shoulders, neck, legs, and arms.
            The heat is gentle and consistent. As the stones glide, they release
            minerals into your skin and provide subtle exfoliation.
          </li>
          <li>
            <strong>After your session.</strong> Drink plenty of water to support
            the detox benefits. Many guests report sleeping better the night of
            their salt stone massage and feeling noticeably less tense for
            several days after.
          </li>
        </ul>

        <h3 className="text-lg font-bold mt-4">Pricing</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Members:</strong> $99 for 50 minutes
          </li>
          <li>
            <strong>Drop-in:</strong> $139 for 50 minutes
          </li>
        </ul>

        <h3 className="text-lg font-bold mt-4">Optional Boosts</h3>
        <p>
          Want to take your session further? Add a boost to your salt stone
          massage:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>80-Minute Extension</strong> for a longer, more thorough
            session
          </li>
          <li>
            <strong>Infrared PEMF Mat</strong> for deeper cellular recovery
          </li>
          <li>
            <strong>Cupping</strong> for targeted tension release
          </li>
          <li>
            <strong>Lymphatic Drainage</strong> for enhanced detox
          </li>
        </ul>

        {/* ---------------------------------------------------------------- */}
        <h2 id="who-should-try" className="text-2xl font-bold scroll-mt-24">
          Who Should Try a Salt Stone Massage?
        </h2>
        <p>
          Salt stone massage works well for a wide range of people. Here is who
          we see benefit the most at Sway.
        </p>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Stress and anxiety:</strong> If you carry stress in your
            shoulders, neck, or jaw, the calming warmth of the salt stones helps
            release that tension without aggressive pressure. The mineral
            absorption supports nervous system balance.
          </li>
          <li>
            <strong>Active lifestyles:</strong> Runners, climbers, gym-goers, and
            weekend warriors in Denver benefit from the improved circulation and
            muscle recovery. The magnesium and potassium in the salt stones
            support the same electrolyte balance your body needs after training.
          </li>
          <li>
            <strong>Dry or dull skin:</strong> The natural exfoliation and
            mineral nourishment make salt stone massage a two-in-one treatment
            for your muscles and your skin. You will notice the difference after
            one session.
          </li>
          <li>
            <strong>People who find deep tissue too intense:</strong> If you want
            real relief but do not enjoy the soreness that sometimes comes with
            deep tissue work, salt stone is a great alternative. The heat does a
            lot of the heavy lifting, so your therapist can go deep without
            excess force.
          </li>
          <li>
            <strong>Anyone curious about hot stone massage:</strong> If you have
            been searching for a hot stone massage in Denver, try salt stone
            instead. You get everything hot stone offers plus mineral absorption,
            exfoliation, and a gentler temperature.
          </li>
        </ul>

        {/* Final CTA */}
        <div className="bg-[#CFE6D8] rounded-xl p-8 text-center space-y-4">
          <p className="text-xl font-bold text-[#113D33]">
            Book Your Salt Stone Massage
          </p>
          <p className="text-sm text-[#113D33]/80">
            Sway Wellness Spa is located on Larimer Square in downtown Denver.
            Voted #4 Best Day Spa in America by USA Today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/locations/denver-larimer/book-service"
              className="inline-block bg-[#113D33] text-white font-bold px-8 py-3 rounded-full hover:bg-[#113D33]/90 transition"
            >
              Book Now
            </Link>
            <Link
              href="/membership"
              className="inline-block border-2 border-[#113D33] text-[#113D33] font-bold px-8 py-3 rounded-full hover:bg-[#113D33]/5 transition"
            >
              Explore Membership
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        <div className="pt-10 space-y-6">
          <h2 className="text-2xl font-bold">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              href="/blog/himalayan-salt-stone-massage"
              className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-36 overflow-hidden">
                <Image
                  src="/assets/blog5.jpg"
                  alt="Himalayan Salt Stone Massage at Sway Spa"
                  width={400}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">
                  Himalayan Salt Stone Massage: Ultimate Relaxation at Sway Spa
                </p>
              </div>
            </Link>
            <Link
              href="/blog/80-minute-massage"
              className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-36 overflow-hidden">
                <Image
                  src="/assets/blog25.jpg"
                  alt="Why an 80-Minute Massage Is the Ultimate Reset"
                  width={400}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">
                  Why an 80-Minute Massage Is the Ultimate Reset
                </p>
              </div>
            </Link>
            <Link
              href="/blog/science-of-relaxation"
              className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-36 overflow-hidden">
                <Image
                  src="/assets/blog11.jpg"
                  alt="Science of Relaxation"
                  width={400}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">
                  Science of Relaxation: How Spa Treatments Ease Stress
                </p>
              </div>
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-400 pt-4 border-t border-[#d7e2dc]">
          Permalink: swaywellnessspa.com/blog/salt-stone-vs-hot-stone-massage
        </p>
      </div>
    </div>
  );
}
