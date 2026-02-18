"use client";

import { motion } from "framer-motion";
import VideoBackground from "./components/VideoBackground";
import Image from "next/image";
import React, { useState } from "react";
export default function HomeContent() {
  const [loadedA, setLoadedA] = useState(false);
  const [loadedB, setLoadedB] = useState(false);
  const [loadedC, setLoadedC] = useState(false);
  const [loadedD, setLoadedD] = useState(false);
  const [loadedE, setLoadedE] = useState(false);

  return (
    <div className="snap-container w-full overflow-hidden max-w-screen">

      {/* ======================================================
          Hero Video
          (Add a hidden H1 + a tiny semantic anchor without changing design)
          ====================================================== */}
      <section className="snap-section min-h-screen flex items-center justify-center">
        <h1 className="sr-only">
          Sway Wellness Spa – Modern Wellness Experiences
        </h1>
        <p className="sr-only">
          Sway is a modern wellness spa and club offering massage therapy,
          facials, and recovery experiences including sauna, cold plunge, and
          AI-powered Aescape massage.
        </p>
        <VideoBackground />
      </section>

      {/* ======================================================
          Intro (your original)
          ====================================================== */}
      <section className="snap-section min-h-screen flex items-center justify-center bg-[#f4f4f1] text-[#113D33] px-6">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-2xl lg:text-3xl text-center max-w-3xl leading-relaxed font-vance"
        >
          Ever feel like you need an escape from the hustle and bustle of the
          city? We created a wellness club where you can pause, breathe, and
          rediscover yourself.
        </motion.p>
      </section>

      {/* ======================================================
          NEW: “What is Sway?” (short, elegant, not Denver-locked)
          This adds clarity for SEO without changing your aesthetic.
          ====================================================== */}
      <section className="snap-section min-h-screen flex items-center justify-center bg-[#f4f4f1] text-[#113D33] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl text-center font-vance"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6">
            A modern wellness spa and club
          </h2>
          <p className="text-base md:text-lg lg:text-xl leading-relaxed opacity-90">
            Sway blends expert-led care with modern recovery. From personalized
            massage therapy and facials to sauna and cold plunge rituals and the
            AI-powered Aescape massage experience, everything is designed to
            help you feel better — consistently.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/offers"
              className="bg-[#113D33] text-white px-6 py-3 text-sm md:text-base font-bold rounded-md hover:bg-[#0a2b23]"
            >
              New Guest Offer
            </a>
            <a
              href="/membership"
              className="border border-[#113D33] text-[#113D33] px-6 py-3 text-sm md:text-base font-bold rounded-md hover:bg-[#113D33] hover:text-white transition"
            >
              Explore Membership
            </a>
          </div>

          {/* Future-ready: if /locations exists later, this becomes valuable.
              If it doesn’t exist yet, it’s still fine to keep hidden.
              You can remove "hidden" when you launch /locations. */}
          <div className="mt-5 hidden">
            <a
              href="/locations"
              className="text-sm md:text-base text-[#113D33] underline underline-offset-4 hover:opacity-80"
            >
              Find a location
            </a>
          </div>
        </motion.div>
      </section>

      {/* ======================================================
          Staggered Images (your original)
          ====================================================== */}
      <section className="snap-section min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#f4f4f1] px-6 lg:px-8 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50, y: -50 }}
          whileInView={loadedA ? { opacity: 1, x: 0, y: 0 } : {}}
          onViewportEnter={() => setLoadedA(true)}
          transition={{ duration: 1 }}
          className="flex justify-center lg:justify-end"
        >
          <Image
            src="/assets/homepage_photo_a.jpg"
            alt="Sway Lounge"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-cover w-full max-w-[600px]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-[#113D33] text-center lg:text-left font-vance max-w-xl"
        >
          <p className="text-lg md:text-2xl lg:text-3xl leading-relaxed">
            Forget the world’s noise. It’s time to listen to what your soul
            craves.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, y: 50 }}
          whileInView={loadedB ? { opacity: 1, x: 0, y: 0 } : {}}
          onViewportEnter={() => setLoadedB(true)}
          transition={{ duration: 1 }}
          className="flex justify-center lg:justify-start"
        >
          <Image
            src="/assets/homepage_photo2.jpg"
            alt="Sway Sauna"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-cover w-full max-w-[600px]"
          />
        </motion.div>
      </section>

      {/* ======================================================
          Magic Wellness (your original)
          ====================================================== */}
      <section className="snap-section min-h-screen flex flex-col items-center justify-center bg-[#f4f4f1] text-[#113D33] px-6">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-2xl lg:text-3xl text-center max-w-3xl font-vance"
        >
          Wellness is that magic that happens when you genuinely feel good.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={loadedC ? { opacity: 1, y: 0 } : {}}
          onViewportEnter={() => setLoadedC(true)}
          transition={{ duration: 1 }}
          className="flex justify-center mt-6"
        >
          <Image
            src="/assets/homepage_photo4.jpg"
            alt="Wellness Magic"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-cover w-full max-w-[600px]"
          />
        </motion.div>
      </section>

      {/* ======================================================
          Glow Recipe (your original)
          ====================================================== */}
      <section className="snap-section min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#f4f4f1] px-6 lg:px-8 gap-12">
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-xl text-center lg:text-left max-w-md font-vance"
        >
          We all deserve a space where we can unwind, reflect, and just be.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={loadedD ? { opacity: 1, scale: 1 } : {}}
          onViewportEnter={() => setLoadedD(true)}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <Image
            src="/assets/homepage_photo15.jpg"
            alt="Glow Recipe"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-contain w-full max-w-[600px]"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-xl text-center lg:text-right max-w-md font-vance"
        >
          Imagine a world where self-care means ease, and beauty is celebrated
          in its raw form.
        </motion.p>
      </section>

      {/* ======================================================
          Storefront (your original)
          ====================================================== */}
      <section className="snap-section min-h-screen flex flex-col items-center justify-center bg-[#f4f4f1] text-[#113D33] px-6">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-2xl lg:text-3xl text-center max-w-3xl font-vance"
        >
          In our wellness club, self-care is not a luxury; it’s a necessity.
          Let Sway be your happy place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={loadedE ? { opacity: 1, y: 0 } : {}}
          onViewportEnter={() => setLoadedE(true)}
          transition={{ duration: 1 }}
          className="flex justify-center mt-8"
        >
          <Image
            src="/assets/homepage_photo_outside.jpg"
            alt="Sway Wellness Club Outside"
            width={900}
            height={500}
            className="rounded-lg shadow-lg object-contain w-full max-w-[900px]"
          />
        </motion.div>
      </section>

      {/* ======================================================
          Flip Cards (your original)
          ====================================================== */}
      <section className="snap-section min-h-screen flex flex-col items-center justify-center bg-[#f4f4f1] px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {[
            {
              id: 1,
              image: "/assets/homepage_photo_b.jpg",
              text: "It’s not only a massage, it’s relaxing into your deepest state.",
            },
            {
              id: 2,
              image: "/assets/homepage_photo7.jpg",
              text: "It’s not just high-tech facials, it’s feeling your inner glow.",
            },
            {
              id: 3,
              image: "/assets/homepage_photo82.jpg",
              text: "It’s not just a cold plunge or sauna, it’s mental clarity.",
            },
          ].map((card) => (
            <div
              key={card.id}
              className="flip-card w-[160px] h-[200px] md:w-[320px] md:h-[480px] mx-auto"
            >
              <div className="flip-card-inner">
                <div className="flip-card-front relative">
                  <Image
                    src={card.image}
                    alt="Card"
                    width={320}
                    height={480}
                    className="rounded-xl object-cover w-full h-full"
                  />
                  <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#113D33] text-white px-4 py-2 text-sm font-bold rounded-md hover:bg-[#0a2b23]">
                    Learn More
                  </button>
                </div>
                <div className="flip-card-back flex items-center justify-center p-4">
                  <p className="text-sm md:text-lg text-white">{card.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================
          Experiences & Pricing (your original)
          ====================================================== */}
      <section className="snap-section min-h-screen flex flex-col items-center justify-center bg-[#f4f4f1] text-[#113D33] px-4 lg:px-16">
        <div className="w-full max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 font-vance text-center">
            EXPERIENCES & PRICING
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-left text-xs md:text-base">
              <thead>
                <tr className="bg-[#113D33] text-white text-sm md:text-lg">
                  <th className="p-2 md:p-4 font-bold">Service</th>
                  <th className="p-2 md:p-4 font-bold">Description</th>
                  <th className="p-2 md:p-4 font-bold">Member Price</th>
                  <th className="p-2 md:p-4 font-bold">Drop-In Price</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    service: "50 Min Facial",
                    description:
                      "Forever Young - Glow Getter - Pore Perfection - Sensitive Silk",
                    member: "$99",
                    dropIn: "$139",
                    extras: [
                      { description: "Add a Boost", member: "$30", dropIn: "$60" },
                      { description: "Add a Super Boost", member: "$50", dropIn: "$100" },
                    ],
                  },
                  {
                    service: "50 Min Massage",
                    description:
                      "Deep Tissue - Swedish - Hot Stone - CBD Cause Medic",
                    member: "$99",
                    dropIn: "$139",
                    extras: [
                      { description: "Add a Boost", member: "$30", dropIn: "$60" },
                      { description: "Add a Super Boost", member: "$50", dropIn: "$100" },
                    ],
                  },
                  {
                    service: "Remedy Room",
                    description:
                      "40 minutes - Cold Plunge, Sauna, Light Therapy, Lymphatic Boots",
                    member: "$25",
                    dropIn: "$49",
                    extras: [],
                  },
                ].map((item, i) => (
                  <React.Fragment key={i}>
                    <tr className="border border-gray-300">
                      <td className="p-2 md:p-4 font-bold">{item.service}</td>
                      <td className="p-2 md:p-4">{item.description}</td>
                      <td className="p-2 md:p-4 font-bold">{item.member}</td>
                      <td className="p-2 md:p-4 font-bold">{item.dropIn}</td>
                    </tr>
                    {item.extras.map((extra, j) => (
                      <tr key={j} className="border border-gray-300 text-gray-700">
                        <td />
                        <td className="p-2 md:p-4">{extra.description}</td>
                        <td className="p-2 md:p-4 font-bold">{extra.member}</td>
                        <td className="p-2 md:p-4 font-bold">{extra.dropIn}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-center">
            <a
              href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=-9"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#113D33] text-white px-6 py-3 text-md md:text-lg font-bold rounded-md hover:bg-[#0a2b23]"
            >
              Schedule Now
            </a>
          </div>
        </div>
      </section>

      {/* ======================================================
          Treatments Grid (your original; tiny microcopy tweaks are inside data)
          ====================================================== */}
      <section className="snap-section min-h-screen flex flex-col items-center justify-center bg-[#f4f4f1] px-4 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl"
        >
          {[
            {
              image: "/assets/treatment1.jpg",
              text: "Facials",
              link: "/facials",
              description: "Advanced, glow-focused facials and skin treatments.",
            },
            {
              image: "/assets/treatment3.jpg",
              text: "Massage Therapy",
              link: "/massages",
              description: "Personalized massage therapy for recovery and relief.",
            },
            {
              image: "/assets/aescape-treatment.jpg",
              text: "Aescape",
              link: "/aescape",
              description: "AI-powered massage for modern recovery.",
            },
            {
              image: "/assets/treatment2.jpg",
              text: "Remedy Room",
              link: "/remedy-tech",
              description: "Sauna, cold plunge, red light, and lymphatic boots.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center"
            >
              <a href={item.link}>
                <motion.img
                  src={item.image}
                  alt={item.text}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="w-[120px] h-[120px] md:w-[200px] md:h-[200px] object-cover rounded-lg shadow-md"
                />
              </a>
              <a
                href={item.link}
                className="mt-2 text-sm md:text-lg font-semibold text-black hover:underline"
              >
                {item.text}
              </a>
              <p className="text-xs md:text-sm text-gray-700 max-w-[180px]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-6 text-center text-sm md:text-base max-w-2xl text-gray-800">
          New here? Enjoy{" "}
          <a href="/offers" className="text-[#113D33] font-semibold hover:underline">
            $40 off your first massage or facial
          </a>{" "}
          with code <strong>FTVO40</strong>. Or explore our{" "}
          <a
            href="/membership"
            className="text-[#113D33] font-semibold hover:underline"
          >
            membership plans
          </a>{" "}
          to save more.
        </p>
      </section>

      {/* ======================================================
          Photo Grid with OG Background (your original)
          ====================================================== */}
      <section className="snap-section relative min-h-screen flex items-center justify-center px-4 lg:px-16">
        <img
          src="/assets/OG/og-sway-way2.jpg"
          alt="Sway Way background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        <div className="relative z-20 grid grid-cols-2 md:grid-cols-4 gap-10 w-full max-w-6xl place-items-center">
          {[
            { image: "/assets/homepage_photo11.jpg", text: "SWAY ON SPOTIFY", link: "" },
            { image: "/assets/homepage_photo12.png", text: "IN THE PRESS", link: "/press" },
            {
              image: "/assets/homepage_photo13.jpg",
              text: "@SWAYWELLNESSCLUB",
              link: "https://www.instagram.com/swaywellnessclub/",
            },
            { image: "/assets/homepage_photo14.png", text: "ON THE APP", link: "" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <a
                href={item.link || "#"}
                target={item.link ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden group transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={item.image}
                  alt={item.text}
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition"></div>
              </a>
              <p className="mt-4 text-sm md:text-base font-vance text-white">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================
          NEW: Mini FAQ (adds SEO density without being “in your face”)
          ====================================================== */}
      <section className="snap-section min-h-screen flex items-center justify-center bg-[#f4f4f1] text-[#113D33] px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="w-full max-w-4xl font-vance"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">
            Questions, answered
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "What is the Remedy Room?",
                a: "The Remedy Room is our modern recovery experience — typically featuring sauna, cold plunge, and select recovery tech designed to help you reset.",
              },
              {
                q: "What is Aescape?",
                a: "Aescape is an AI-powered massage experience designed for modern recovery. It’s a separate offering from therapist-led massage therapy.",
              },
              {
                q: "Do you offer memberships?",
                a: "Yes. Sway is built around consistent care — memberships offer preferred pricing, perks, and an easier way to make wellness a ritual.",
              },
              {
                q: "What should I book for a first visit?",
                a: "Most guests start with a 50-minute facial or massage. If you want recovery-focused benefits, the Remedy Room is a great add-on.",
              },
              {
                q: "How do I book?",
                a: "You can schedule online anytime. If you have questions, you can also call the spa and our team will help you choose the right experience.",
              },
            ].map((item, idx) => (
              <details
                key={idx}
                className="border border-[#113D33]/20 rounded-lg bg-white/50 px-5 py-4"
              >
                <summary className="cursor-pointer font-semibold text-base md:text-lg">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=-9"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#113D33] text-white px-6 py-3 text-md md:text-lg font-bold rounded-md hover:bg-[#0a2b23]"
            >
              Book Now
            </a>
          </div>
        </motion.div>
      </section>

      {/* ======================================================
          Membership CTA (your original)
          ====================================================== */}
      <section className="snap-section min-h-screen flex flex-col items-center justify-center w-full bg-[#113D33] text-white text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl md:text-4xl font-bold font-vance max-w-2xl"
        >
          Join the Wellness Club & Start Saving Today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-4 text-sm md:text-lg max-w-3xl leading-relaxed opacity-90"
        >
          Experience the ritual benefits of monthly treatments, half-off boosts,
          and exclusive perks designed just for you.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=40&prodid=100"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 bg-white text-[#113D33] font-bold px-6 py-3 text-lg rounded-md shadow-md hover:bg-gray-200"
        >
          Become a Member
        </motion.a>
      </section>
    </div>
  );
}
