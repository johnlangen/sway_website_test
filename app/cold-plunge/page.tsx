"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function ColdPage() {
  useEffect(() => {
    document.documentElement.style.backgroundColor = "#F7F4E9";
    document.body.style.backgroundColor = "#F7F4E9";
  }, []);

  // Restore Your Body Benefits
  const bodyBenefits = [
    {
      title: "WAKE UP!",
      description:
        "Elevates energy by stimulating the release of adrenaline and endorphins, which boost alertness and mood. The sudden exposure to cold also increases blood flow and oxygen supply, invigorating your body and enhancing overall energy levels. Skip the coffee and boost your energy.",
    },
    {
      title: "DETOX",
      description:
        "Stimulates the lymphatic system, which helps remove waste and toxins from the body. The cold exposure also promotes improved circulation, enhancing the delivery of oxygen and nutrients to cells while aiding in the efficient elimination of metabolic waste.",
    },
    {
      title: "RAPID RECOVERY",
      description:
        "The idea of using cold exposure as a recovery tool is nothing new. Reduces inflammation and swelling in muscles. The cold temp constricts blood vessels and decreases metabolic activity, leading to less tissue breakdown and pain. This is followed by a rush of nutrient-rich blood when you warm up, promoting rapid recovery.",
    },
    {
      title: "STRENGTHEN IMMUNITY",
      description:
        "Stimulates the production of white blood cells, which are crucial for fighting off infections or illness. Regular cold exposure can enhance the lymphatic system, promoting the removal of waste and toxins from the body, supporting a strengthened immunity.",
    }
    
  ];

  // Refresh Your Mind Benefits
  const mindBenefits = [
    {
      title: "REDUCE STRESS",
      description:
        "Much like the infrared sauna, cold exposure reduces the levels of stress hormones like cortisol, providing a calming and therapeutic experience.",
    },
    {
      title: "TRANQUIL SLEEP",
      description:
        "With the reduction of cortisol levels and increased endorphin production, cold exposure creates a sense of relaxation that can make it easier to fall asleep and stay asleep.",
    },
    {
      title: "ENHANCE MOOD",
      description:
        "According to Psychology Today, cold exposure increases the production of a neurotransmitter called norepinephrine (focus, attention, vigilance, mood). As a result, cold therapy can produce a feeling of calm, happiness, and well-being.",
    },
    {
      title: "MENTAL CLARITY",
      description:
        "Stimulates the production of neurotransmitters like dopamine, which improve focus and cognitive function. The invigorating effect of the cold water also enhances mental alertness, helping you feel more awake, clear-minded, and attentive.",
    }
    
  ];

  return (
    <div className="w-full max-w-screen bg-[#F7F4E9] font-vance">
      {/* ✅ Sauna Hero Section - Text on Left, Image on Right (Mobile: Image Below) */}
      <section className="flex flex-col md:flex-row-reverse items-center justify-center px-6 md:px-16 pt-28 md:pt-36 pb-20 md:py-36 max-w-[1300px] mx-auto">
        
        {/* ✅ Image on Right for Desktop, Below for Mobile */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0"
        >
          <Image
            src="/assets/cold_plunge.png"
            alt="Infrared Sauna"
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full h-auto object-cover max-h-[300px] md:max-h-[450px] md:w-auto"
          />
        </motion.div>

        {/* ✅ Text Content on Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <p className="text-sm text-[#113D33] uppercase tracking-widest">
            RECOMMENDED 5 MIN
          </p>
          <h1 className="text-4xl md:text-6xl font-vance-bold text-[#113D33] mt-2">
            Cold Plunge
          </h1>
          <p className="text-lg md:text-2xl font-vance-bold text-[#113D33] mt-2">
            Drop-In $49 | Member $25
          </p>
          <p className="text-md md:text-lg text-gray-700 mt-4 leading-relaxed font-vance-text">
          Life changing benefits. Cold water therapy has been shown to be effective with better sleep, elevated energy, pain and stress relief, a better mood, performance and recovery, and immune support.
          </p>

          {/* ✅ Recommended Benefits */}
          <h3 className="text-lg md:text-2xl font-vance-bold text-[#113D33] mt-6">
            Recommended for
          </h3>
          <ul className="text-md md:text-lg text-gray-700 mt-3 space-y-2 font-vance-text">
            <li>+ Reducing Stress and Anxiety</li>
            <li>+ Improving Skin Health</li>
            <li>+ Anyone That Suffers From Arthritis</li>
            <li>+ Those Needing Detoxification</li>
            <li>+ Muscle Pain and Joint Stiffness</li>
          </ul>

          {/* ✅ Booking Button */}
          <Link
            href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=-9"
            target="_blank"
            className="mt-6 inline-block bg-[#113D33] text-white px-6 py-3 text-md font-bold rounded-md hover:bg-[#0a2b23] transition-all shadow-lg"
          >
            Schedule Your Wellness
          </Link>
        </motion.div>
      </section>

      {/* ✅ Restore Your Body Section */}
      <section className="bg-[#D1E0D5] px-6 py-16 md:py-24 flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-vance-bold text-[#113D33] text-center mb-12">
          RESTORE YOUR BODY
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1300px]">
          {bodyBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#B6CFBF] rounded-lg shadow-lg p-6 flex flex-col min-h-[250px] w-full"
            >
              <h3 className="text-lg font-vance-bold text-[#113D33] mt-3">
                {benefit.title}
              </h3>
              <p className="text-gray-700 mt-2 text-sm font-vance-text">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ Refresh Your Mind Section */}
      <section className="bg-[#113D33] px-6 py-16 md:py-24 flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-vance-bold text-white text-center mb-12">
          REFRESH YOUR MIND
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1300px]">
          {mindBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0A2B23] text-white rounded-lg shadow-lg p-6 flex flex-col min-h-[250px] w-full"
            >
              <h3 className="text-lg font-vance-bold">{benefit.title}</h3>
              <p className="mt-2 text-sm font-vance-text">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
