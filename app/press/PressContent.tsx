"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SwayCurve } from "../components/SwayCurve";

/* ---------- DATA ---------- */

const AWARDS = [
  {
    title: "#4 Best Day Spa in America",
    publication: "USA Today 10Best",
    year: "2026",
    description:
      "Voted #4 Best Day Spa in the United States in USA Today's 2026 10Best Readers' Choice Awards, our second year running in the national top five.",
    image: "/assets/usa_today.png",
    link: "https://www.businesswire.com/news/home/20260708260179/en/Sway-Voted-Fourth-Best-Day-Spa-in-USA-Today-10Best-Readers%E2%80%99-Choice-Awards-2026",
  },
  {
    title: "#4 Best Day Spa in America",
    publication: "USA Today 10Best",
    year: "2025",
    description:
      "Voted #4 Best Day Spa in the United States in USA Today's 10Best Readers' Choice Awards, recognized alongside the nation's top spas in just our first year.",
    image: "/assets/usa_today.png",
    link: "https://10best.usatoday.com/awards/sway-denver-colorado/",
  },
  {
    title: "Best U.S. Day Spa",
    publication: "The Zoe Report",
    year: "2026",
    description:
      "Named Best U.S. Day Spa in TZR's 2026 Readers' Choice Awards, recognized for redefining what it means to unwind with next-generation wellness.",
    image: "/assets/tzr.png",
    link: "https://www.thezoereport.com/living/readers-choice-awards-best-us-day-spa",
  },
];

const PRESS = [
  {
    title: "I Got a Robot Massage. Here's Why Human Therapists Shouldn't Worry",
    publication: "Denverite",
    date: "March 2026",
    description:
      "A first-person feature on Sway's Aescape robot. Colorado Matters host Ryan Warner walks in skeptical and leaves convinced the robot complements, rather than replaces, human touch.",
    image: "/assets/denverite.png",
    link: "https://denverite.com/2026/03/17/denver-robot-massage/",
  },
  {
    title: "I Got a Massage From the State's First Aescape Robot",
    publication: "Colorado Public Radio",
    date: "March 2026",
    description:
      "Colorado Matters senior host Ryan Warner visits Sway to try the state's first robot massage in this audio segment from CPR News.",
    image: "/assets/cpr.png",
    link: "https://www.cpr.org/show-segment/i-got-a-massage-from-the-states-first-aescape-robot/",
  },
  {
    title: "A Demographic-Built Wellness Spa",
    publication: "Salon Today, Modern Spa & Wellness",
    date: "Fall 2025",
    description:
      "A two-page editorial spotlighting Sway's Gen Z-focused wellness model, franchise roots, and blend of innovative technology with spa design.",
    image: "/assets/salontoday.png",
    link: "https://www.bluetoad.com/publication/?i=854210&p=8&view=issueViewer",
  },
  {
    title: "AI, Robot Massages & More at Sway",
    publication: "The Denver Post",
    date: "March 2025",
    description:
      "A feature on Sway's flagship opening in Larimer Square, highlighting AI-powered robotic massage, facials, and next-gen treatments.",
    image: "/assets/post.png",
    link: "https://www.denverpost.com/2025/03/08/wellness-club-sway-larimer-square-ai-robot-massage/",
  },
  {
    title: "Built by Gen Z, for Gen Z",
    publication: "Athletech News",
    date: "2025",
    description:
      "How Sway blends AI, community, and modern wellness design to create a Gen Z-focused club redefining self-care.",
    image: "/assets/athletech2.jpg",
    link: "https://athletechnews.com/built-by-gen-z-for-gen-z-sway-redefines-the-wellness-club/",
  },
  {
    title: "Revolutionary Wellness Club Coming to Larimer Square",
    publication: "Mile High CRE",
    date: "2024",
    description:
      "An inside look at Sway's design, construction, and concept development, spotlighting the membership model and tech-forward experience.",
    image: "/assets/cre.jpg",
    link: "https://milehighcre.com/revolutionary-wellness-club-coming-to-larimer-square/",
  },
  {
    title: "Wellness Club Opening in Denver's Larimer Square",
    publication: "Denver Business Journal",
    date: "November 2024",
    description:
      "A business-focused overview of Sway's expansion into Larimer Square as Spavia's newest concept for urban consumers.",
    image: "/assets/dbj.jpg",
    link: "https://www.bizjournals.com/denver/news/2024/11/20/wellness-club-opening-in-denvers-larimer-square.html",
  },
  {
    title: "I Tried Colorado's First Robot Massage",
    publication: "5280 Magazine",
    date: "2025",
    description:
      "A first-hand review of Colorado's only robot-powered massage, available exclusively at Sway, exploring how Aescape transforms the experience.",
    image: "/assets/5280.jpg",
    link: "https://www.5280.com/i-tried-colorados-first-robot-massage/",
  },
  {
    title: "Robots Rethink Self-Care",
    publication: "Yoga+Life",
    date: "2025",
    description:
      "How Sway's high-tech, youth-driven approach, including robotic massage, reimagines self-care for the modern wellness guest.",
    image: "/assets/yoga.jpg",
    link: "https://yogalifelive.com/this-new-denver-wellness-club-is-using-robots-to-rethink-self-care/",
  },
];

const FEATURED_IN = [
  "USA Today",
  "The Zoe Report",
  "CPR News",
  "The Denver Post",
  "Denverite",
  "5280",
  "Athletech",
  "Salon Today",
  "Denver Business Journal",
  "Yoga+Life",
  "Mile High CRE",
];

// Secondary background tone, matching the homepage rhythm.
const SAND = "#EBE4D1";

/* ---------- COMPONENT ---------- */

export default function PressContent() {
  return (
    <div className="w-full bg-[#F7F4E9] font-vance text-[#113D33]">
      {/* ---------- HERO ---------- */}
      <section className="bg-[#113D33] text-white px-6 pt-32 pb-20 md:pt-44 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="text-xs uppercase tracking-[0.35em] text-[#A9D2C5] mb-4">
            Sway in the Media
          </div>
          <SwayCurve
            width={170}
            strokeWidth={2.2}
            animate
            className="text-white/85 mx-auto block mb-7"
          />
          <h1 className="text-4xl md:text-7xl font-semibold tracking-tight leading-[1.02]">
            In the Press
          </h1>

          <p className="sr-only">
            Sway Wellness Spa has been featured in USA Today 10Best, The Zoe
            Report, The Denver Post, 5280 Magazine, Athletech News, Yoga+Life,
            Salon Today, Denver Business Journal, Mile High CRE, Colorado Public
            Radio, and Denverite. Awards include #4 Best Day Spa in America
            (USA Today 10Best 2025 and 2026, back-to-back) and Best U.S. Day
            Spa (TZR Readers&apos; Choice 2026). Located at 1428 Larimer St. on Larimer Square in
            Denver, CO. Book at swaywellnessspa.com or call (303) 476-6150.
          </p>

          <p className="mt-5 text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Featured in 11 major publications. Three national awards, including
            back-to-back top-five finishes in USA Today&apos;s 10Best.
          </p>

          {/* Award proof badges */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            {AWARDS.map((a) => (
              <span
                key={`${a.title}-${a.year}`}
                className="inline-flex items-center gap-2 text-[11px] md:text-xs uppercase tracking-[0.12em] text-white/90 border border-white/20 rounded-full px-4 py-1.5"
              >
                <span className="text-[#A9D2C5]">&#9733;</span>
                {a.title} &middot; {a.publication} {a.year}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ---------- AWARDS ---------- */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <div className="text-xs uppercase tracking-[0.3em] text-[#4A776D] mb-3">
              Recognition
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              Awards
            </h2>
            <SwayCurve
              width={150}
              strokeWidth={2.4}
              animate
              className="text-[#4A776D]/85 mx-auto block mt-4"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {AWARDS.map((award, i) => (
              <motion.a
                key={`${award.title}-${award.year}`}
                href={award.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group rounded-3xl bg-white overflow-hidden shadow-[0_10px_30px_-15px_rgba(17,61,51,0.18)] hover:shadow-[0_28px_55px_-15px_rgba(17,61,51,0.32)] transition-shadow duration-300"
              >
                <div className="p-8 md:p-10 flex flex-col items-center text-center">
                  <div className="relative w-[200px] h-[110px] mb-6">
                    <Image
                      src={award.image}
                      alt={award.publication}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="text-xs uppercase tracking-[0.18em] text-[#4A776D] font-semibold">
                    {award.publication} &middot; {award.year}
                  </div>

                  <h3 className="mt-2 text-xl md:text-2xl font-semibold">
                    {award.title}
                  </h3>

                  <p className="mt-3 text-sm opacity-70 max-w-md leading-relaxed">
                    {award.description}
                  </p>

                  <span className="mt-5 inline-flex items-center text-sm font-semibold text-[#113D33] group-hover:underline underline-offset-4">
                    Read more<span className="sr-only"> about {award.title}</span>
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </span>
                  <span className="sr-only">(opens in new tab)</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- AS FEATURED IN ---------- */}
      <section className="px-6 py-14 md:py-20" style={{ backgroundColor: SAND }}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#4A776D] mb-8">
            As Featured In
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-12 gap-y-5">
            {FEATURED_IN.map((name) => (
              <span
                key={name}
                className="text-base md:text-xl font-semibold text-[#113D33]/75 whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PRESS COVERAGE ---------- */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <div className="text-xs uppercase tracking-[0.3em] text-[#4A776D] mb-3">
              Coverage
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              Press Coverage
            </h2>
            <SwayCurve
              width={150}
              strokeWidth={2.4}
              animate
              className="text-[#4A776D]/85 mx-auto block mt-4"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {PRESS.map((item, i) => (
              <motion.a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                className="group flex gap-5 rounded-2xl bg-white p-5 shadow-[0_10px_30px_-18px_rgba(17,61,51,0.18)] hover:shadow-[0_22px_45px_-18px_rgba(17,61,51,0.3)] transition-shadow duration-300"
              >
                <div className="relative shrink-0 w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.publication}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-[11px] uppercase tracking-wider text-[#4A776D] font-semibold">
                    {item.publication} &middot; {item.date}
                  </div>
                  <h3 className="mt-1 text-base md:text-lg font-semibold leading-snug group-hover:underline underline-offset-4">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm opacity-65 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <span className="sr-only">(opens in new tab)</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PRESS INQUIRIES ---------- */}
      <section className="bg-[#113D33] text-white px-6 py-20 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            Press Inquiries
          </h2>
          <SwayCurve
            width={150}
            strokeWidth={2.4}
            animate
            className="text-[#A9D2C5] mx-auto block mt-4 mb-5"
          />
          <p className="text-base text-white/80 max-w-lg mx-auto">
            For media requests, interviews, or press materials, reach out to our
            team.
          </p>
          <a
            href="mailto:contact@swaywellnessspa.com"
            className="group relative mt-8 inline-flex items-center justify-center bg-white text-[#113D33] px-8 py-3.5 text-sm font-semibold rounded-full hover:bg-gray-100 transition shadow-sm"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 sway-cta-flourish pointer-events-none">
              <SwayCurve width={40} strokeWidth={1.4} className="text-white" />
            </span>
            contact@swaywellnessspa.com
          </a>
        </div>
      </section>
    </div>
  );
}
