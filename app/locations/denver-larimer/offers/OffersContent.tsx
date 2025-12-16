"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaSpa, FaRobot, FaLeaf } from "react-icons/fa";

function getOfferEndDateISO(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const lastDay = new Date(year, month, 0).getDate();
  return `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(
    2,
    "0"
  )}`;
}

const reviews = [
  { name: "Whitney Gustafson", text: "I tried the Remedy Room and the Glow Getter facial — my skin felt incredibly smooth and firm. Ended up getting a membership!" },
  { name: "Rachel", text: "Steven created such a calm and nurturing space. Trisha’s facial left me glowing inside and out. I felt truly restored." },
  { name: "Laura Rolfe", text: "Took my son's girlfriend to Sway for her first facial — she LOVED it. Highly recommend the Remedy Room too!" },
  { name: "Erin Schmidt", text: "Best massage I’ve ever had. The Remedy Room made the experience next-level. Left feeling mentally and physically rejuvenated." },
  { name: "Rachel S", text: "10/10 would recommend. Holly gives an incredible massage and really listens to your body. Hope to visit again soon!" },
  { name: "Destynie", text: "Got a facial and massage on my birthday and felt so special. Holly was amazing! I left feeling relaxed and revitalized 😊" },
  { name: "Bridget A", text: "So fabulous! Holly was a magician. Gorgeous, clean space with excellent products. I wish I were a local!" },
];

const faqs = [
  {
    question: "Can I combine spa offers with a membership discount?",
    answer: "No, offers are standalone and cannot be combined with additional membership discounts. However, becoming a member unlocks separate ongoing perks.",
  },
  {
    question: "Do I need to be a first-time guest to use these offers?",
    answer: "Yes, the First Visit offer is for new guests only. The Remedy Room special is open to all guests, subject to availability.",
  },
  {
    question: "How do I book an offer?",
    answer: "You can book online via our Book Now page, call us directly, or walk in. We recommend booking in advance due to high demand.",
  },
];

export default function OffersContent() {
  const [index, setIndex] = useState(0);
  const validThrough = getOfferEndDateISO();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToOffers = () => {
    const section = document.getElementById("offers");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#F8F5F3] min-h-screen flex flex-col items-center text-black">
      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-[60vh] md:h-[80vh] mt-0 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/offers_hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/60" /> {/* darker overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-5xl font-vance font-bold mb-4"
          >
            Exclusive Spa Offers in Denver
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-base md:text-xl max-w-2xl"
          >
            Discover Denver’s modern wellness escape — save on your first visit or explore our Remedy Room experience.
          </motion.p>
          {/* CTA scroll button */}
          <button
            onClick={handleScrollToOffers}
            className="mt-6 inline-block bg-[#F7F4E9] text-[#113D33] font-vance font-semibold px-6 py-3 rounded-full hover:bg-[#e0ddd4] transition"
            >
            View Offers
            </button>
        </div>
      </div>

      {/* --- OFFERS SECTION --- */}
      <section
        id="offers"
        className="px-6 py-16 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {/* Offer 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-md p-8 text-center"
        >
          <h2 className="text-lg md:text-xl font-vance font-bold mb-2">
            First Visit Offer
          </h2>
          <h3 className="text-3xl md:text-4xl font-vance font-bold text-[#113D33] mb-4">
            $40 OFF
          </h3>
          <p className="text-sm md:text-base font-vance text-gray-800 mb-4">
            Enjoy a 50-minute Facial or Massage for only{" "}
            <strong>$99</strong> (regularly $139).
          </p>
          <p className="text-sm md:text-base font-vance text-gray-700 mb-4">
            Valid only for first-time guests. Redeemed at checkout.
          </p>
          <p className="text-xs font-vance text-gray-500 mb-6">
            Offer ends {validThrough}
          </p>
          <a
            href="/book"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#4A776D] hover:bg-[#3a5f56] text-white text-sm md:text-base px-6 py-3 rounded-full font-vance font-semibold transition"
          >
            Book Your First Visit
          </a>
        </motion.div>

        {/* Offer 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-md p-8 text-center"
        >
          <h2 className="text-lg md:text-xl font-vance font-bold mb-2">
            Remedy Room Special
          </h2>
          <h3 className="text-3xl md:text-4xl font-vance font-bold text-[#113D33] mb-4">
            Only $49
          </h3>
          <p className="text-sm md:text-base font-vance text-gray-800 mb-4">
            40 minutes of recovery: cold plunge, sauna, red light therapy, and
            Normatec boots — all for just $49.
          </p>
          <p className="text-sm md:text-base font-vance text-gray-700 mb-4">
            Perfect for athletes, weekend warriors, or anyone needing a reset.
          </p>
          <p className="text-xs font-vance text-gray-500 mb-6">
            Limited-time special. Book while available.
          </p>
          <a
            href="/book"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#4A776D] hover:bg-[#3a5f56] text-white text-sm md:text-base px-6 py-3 rounded-full font-vance font-semibold transition"
          >
            Book Remedy Room
          </a>
        </motion.div>
      </section>

      {/* --- REVIEWS --- */}
      <section className="w-full bg-[#f0ebe6] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-vance font-bold mb-8 text-[#113D33]">
            What Guests Are Saying
          </h2>
          <div className="bg-white rounded-2xl shadow-md px-6 py-8">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className="text-yellow-500 text-sm md:text-base"
                  />
                ))}
                <p className="text-xs md:text-sm text-gray-700 font-vance">
                  {reviews[index].name}
                </p>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="text-sm md:text-lg text-[#113D33] font-vance max-w-2xl mx-auto"
                >
                  “{reviews[index].text}”
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE SWAY --- */}
      <section className="w-full bg-[#113D33] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-vance font-bold mb-10">
            Why Choose Sway?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <FaSpa className="text-4xl mb-4 text-[#C2A878]" />
              <p className="font-vance text-sm md:text-base">
                Luxury spa environment designed with nature-inspired elements
                for true relaxation.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FaRobot className="text-4xl mb-4 text-[#C2A878]" />
              <p className="font-vance text-sm md:text-base">
                Exclusive access to Aescape — Denver’s only AI-powered massage
                experience.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FaLeaf className="text-4xl mb-4 text-[#C2A878]" />
              <p className="font-vance text-sm md:text-base">
                Recovery-driven treatments including cold plunge, sauna, and
                advanced facials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQs inline --- */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-vance font-bold mb-8 text-center">
          FAQs About Our Offers
        </h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="border rounded-lg bg-white p-4 shadow-sm">
              <h3 className="font-semibold mb-2">{f.question}</h3>
              <p className="text-sm text-gray-700">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
