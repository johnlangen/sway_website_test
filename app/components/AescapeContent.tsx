"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const pressArticles = [
  {
    title: "I Got a Robot Massage and It Was Actually Kind of Great",
    source: "Vogue",
    url: "https://www.vogue.com/article/robot-massage",
  },
  {
    title: "OK, this luxury AI robot is kind of revolutionary.",
    source: "Mashable",
    url: "https://mashable.com/article/aescape-ai-robot-massage",
  },
  {
    title: "I fear robots, but love a good back rub.",
    source: "Popular Science",
    url: "https://www.popsci.com/technology/robot-massage-aescape/",
  },
  {
    title:
      "How Apple and Uber alums designed this high-tech massage machine to feel human-like",
    source: "Fast Company",
    url: "https://www.fastcompany.com/91056222/how-apple-and-uber-alums-designed-this-new-high-tech-massage-machine-to-feel-undeniably-human-like",
  },
];

const faqs = [
  {
    question: "How does the Aescape massage work?",
    answer: (
      <>
        <p>
          Aescape is a fully interactive massage robot that adapts to your body
          and preferences for a truly personalized experience.
        </p>
        <p className="mt-4">
          Before starting, you’ll adjust the bolster, headrest, and armrest for
          comfort. Then, using the touchscreen (Aerview), you can customize
          pressure, target muscle zones, and tweak the music and lighting. Every
          setting is remembered for your next visit.
        </p>
      </>
    ),
  },
  {
    question: "Are there different massage programs to choose from?",
    answer: (
      <>
        <p>
          Yes. Aescape at Sway offers programs focused on the upper body and
          glutes. Each session runs 15–60 minutes, delivering the benefits of a
          full hour of human massage thanks to synchronized dual robotic arms.
        </p>
        <p className="mt-4">
          Longer sessions (up to 120 minutes) will roll out in the future.
        </p>
      </>
    ),
  },
  {
    question: "Can I control the massage settings?",
    answer: (
      <>
        <p>
          Absolutely. You can control pressure, music, ambience, and visuals
          directly from the Aerview console. Preferences are saved for your next
          visit.
        </p>
      </>
    ),
  },
  {
    question: "Is the Aescape massage experience safe?",
    answer: (
      <>
        <p>
          Yes. Our Aescape tables at Sway are equipped with real-time pressure
          sensors, emergency stop functionality, and advanced safety logic.
        </p>
        <p className="mt-4">
          Please review the{" "}
          <a
            href="https://www.aescape.com/contraindications"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            full list of contraindications
          </a>{" "}
          before booking.
        </p>
      </>
    ),
  },
  {
    question:
      "What steps do I need to take to ensure a safe and optimal massage experience?",
    answer: (
      <>
        <p>
          You must wear Aerwear—special compression apparel designed for the
          Aescape system. Sizes 2XS to 4XL are provided at check-in.
        </p>
        <p className="mt-4">
          Please also tie up long hair so it’s off the neck—we’ll provide a
          headband if needed.
        </p>
      </>
    ),
  },
];

export default function AescapeContent() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1000);
    setIsMounted(true);
  }, []);

  return (
    <div className="bg-[#F4F4F2] text-black">
      {/* Hero Section */}
      <div className="relative w-full h-[550px] md:h-[750px] overflow-hidden">
        <video
          className="absolute w-full h-full object-cover"
          src="/assets/aescape.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute top-[120px] md:top-[160px] left-0 w-full px-4 md:px-12 z-10">
          <h1 className="text-white font-vance text-3xl md:text-5xl font-light">
            Aescape Robot Massage in Denver
          </h1>
          <p className="text-white mt-2 font-vance text-lg italic">
            Massage Reimagined at Sway Wellness Spa
          </p>
          <Link
            href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=-9"
            target="_blank"
            className="inline-block mt-6 px-6 py-2 bg-black text-white text-lg rounded-full font-vance"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-20 space-y-32">
        {/* Section 1 */}
        <div className="flex flex-col md:flex-row md:items-start gap-10">
          {isMounted && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex-1"
              >
                <h2 className="text-2xl md:text-4xl font-vance font-bold">
                  The First Aescape Massage Robot in Denver
                </h2>
              </motion.div>

              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex-1 space-y-6"
              >
                <p className="text-lg font-vance font-light">
                  Welcome to a new era of wellness, where technology meets
                  tradition. Aescape combines the timeless art of massage with
                  robotics and AI to deliver an exceptional experience every
                  time.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://www.aescape.com/technology"
                    target="_blank"
                    className="px-6 py-2 bg-black text-white rounded-full font-vance"
                  >
                    Learn More
                  </a>
                  <a
                    href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=-9"
                    target="_blank"
                    className="px-6 py-2 bg-black text-white rounded-full font-vance"
                  >
                    Book Now
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </div>

        {/* Section 2 */}
        <div className="flex flex-col md:flex-row md:items-start gap-10">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex-1 space-y-6 order-2 md:order-1"
          >
            <p className="text-lg font-vance font-light">
              With an interactive touchscreen, the robot lets you personalize
              every aspect of your massage. Powered by machine learning, it
              remembers your settings and adapts for a seamless, customized
              experience every visit.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex-1 order-1 md:order-2"
          >
            <h2 className="text-2xl md:text-4xl font-vance font-bold">
              Discover the World’s Most Advanced Massage
            </h2>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto space-y-6 font-vance">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">
            Aescape FAQ
          </h2>
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-gray-300 pb-4">
              <button
                className="w-full text-left text-lg md:text-xl font-semibold flex justify-between items-center"
                onClick={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
              >
                {faq.question}
                <span className="text-2xl">
                  {openIndex === i ? "–" : "+"}
                </span>
              </button>
              {openIndex === i && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 text-[16px] text-gray-800 space-y-3"
                >
                  {faq.answer}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Press Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 font-vance">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
          What the Press is Saying
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {pressArticles.map((article, i) => (
            <a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-xl shadow hover:shadow-md transition p-6 border border-gray-200"
            >
              <h3 className="text-lg md:text-xl font-semibold text-[#113D33] mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600">
                Source: {article.source}
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
