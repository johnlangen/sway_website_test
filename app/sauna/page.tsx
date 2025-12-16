"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function SaunaPage() {
  useEffect(() => {
    document.documentElement.style.backgroundColor = "#F7F4E9";
    document.body.style.backgroundColor = "#F7F4E9";
  }, []);

  const bodyBenefits = [
    { title: "Burn Calories", description: "Raise your core body temperature, mimicking moderate exercise and increasing calorie expenditure." },
    { title: "Detox", description: "Stimulate sweat glands and circulation to release toxins like heavy metals and impurities." },
    { title: "Rapid Recovery", description: "Boost blood flow, deliver nutrients faster, reduce inflammation, and aid sore muscles." },
    { title: "Strengthen Immunity", description: "Stimulates white blood cell production to support your body’s defense system." },
  ];

  const mindBenefits = [
    { title: "Reduce Stress", description: "Enhance relaxation and release endorphins while lowering cortisol." },
    { title: "Deeper Sleep", description: "Calms the nervous system to promote deeper, restorative rest." },
    { title: "Enhance Mood", description: "Boosts serotonin and endorphins for happiness and balance." },
    { title: "Mental Clarity", description: "Increases brain oxygenation, reducing fatigue and sharpening focus." },
  ];

  return (
    <div className="w-full max-w-screen bg-[#F7F4E9] font-vance">
      {/* ✅ Hero */}
      <section className="flex flex-col md:flex-row-reverse items-center justify-center px-6 md:px-16 pt-28 md:pt-36 pb-20 md:py-36 max-w-[1300px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0"
        >
          <Image
            src="/assets/infrared_sauna.png"
            alt="Infrared sauna session at Sway Wellness Spa"
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full h-auto object-cover max-h-[300px] md:max-h-[450px] md:w-auto"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <p className="text-sm text-[#113D33] uppercase tracking-widest">Recommended 20 Min</p>
          <h1 className="text-4xl md:text-6xl font-vance-bold text-[#113D33] mt-2">Infrared Sauna</h1>
          <p className="text-lg md:text-2xl font-vance-bold text-[#113D33] mt-2">
            Drop-In $49 | Member $25
          </p>
          <p className="text-md md:text-lg text-gray-700 mt-4 leading-relaxed font-vance-text">
            A proven wellness treatment to boost recovery, burn calories, strengthen immunity,
            improve sleep, and reduce stress.
          </p>

          <h2 className="text-lg md:text-2xl font-vance-bold text-[#113D33] mt-6">Recommended for:</h2>
          <ul className="text-md md:text-lg text-gray-700 mt-3 space-y-2 font-vance-text">
            <li>+ Relaxation and Stress Relief</li>
            <li>+ Enhancing Circulation</li>
            <li>+ Supporting Immune Function</li>
            <li>+ Detoxifying the Body</li>
            <li>+ Easing Muscle and Joint Discomfort</li>
          </ul>

          <Link
            href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=-9"
            target="_blank"
            className="mt-6 inline-block bg-[#113D33] text-white px-6 py-3 text-md font-bold rounded-md hover:bg-[#0a2b23] transition-all shadow-lg"
          >
            Schedule Your Wellness
          </Link>
        </motion.div>
      </section>

      {/* ✅ Body Section */}
      <section className="bg-[#D1E0D5] px-6 py-16 md:py-24 flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-vance-bold text-[#113D33] text-center mb-12">
          Restore Your Body
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1300px]">
          {bodyBenefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#B6CFBF] rounded-lg shadow-lg p-6 flex flex-col"
            >
              <h3 className="text-lg font-vance-bold text-[#113D33]">{b.title}</h3>
              <p className="text-gray-700 mt-2 text-sm font-vance-text">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ Mind Section */}
      <section className="bg-[#113D33] px-6 py-16 md:py-24 flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-vance-bold text-white text-center mb-12">
          Refresh Your Mind
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1300px]">
          {mindBenefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0A2B23] text-white rounded-lg shadow-lg p-6 flex flex-col"
            >
              <h3 className="text-lg font-vance-bold">{b.title}</h3>
              <p className="mt-2 text-sm font-vance-text">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
