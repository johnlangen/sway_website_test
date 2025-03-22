"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function SaunaPage() {
  useEffect(() => {
    document.documentElement.style.backgroundColor = "#F7F4E9";
    document.body.style.backgroundColor = "#F7F4E9";
  }, []);

  // Restore Your Body Benefits
  const bodyBenefits = [
    {
      title: "BURN BABY BURN",
      description:
        "Burn calories by raising your core body temperature, which increases your heart rate and metabolic rate. This heightened state mimics the effects of moderate exercise, leading to calorie expenditure and potential weight loss.",
    },
    {
      title: "DETOX",
      description:
        "Boosts blood circulation and stimulates sweat glands, helping release toxins. Regular sessions will detoxify your body of harmful metals like lead, mercury, and other toxic compounds.",
    },
    {
      title: "RAPID RECOVERY",
      description:
        "Speeds up recovery by increasing blood flow, which delivers more oxygen and nutrients to muscles and tissues, promoting faster healing. The deep heat also helps reduce inflammation and soothe sore muscles.",
    },
    {
      title: "STRENGTHEN IMMUNITY",
      description:
        "Raises your core body temperature, which stimulates the production of white blood cells and improves circulation. This process enhances your body's natural defense mechanisms, making it more effective at fighting off infections and illnesses.",
    },
  ];

  // Refresh Your Mind Benefits
  const mindBenefits = [
    {
      title: "REDUCE STRESS",
      description:
        "Promotes relaxation. The increased blood circulation and release of endorphins enhance mood and reduce the levels of stress hormones like cortisol, providing a calming and therapeutic experience.",
    },
    {
      title: "DEEPER SLEEP",
      description:
        "Relaxes the nervous system by increasing blood flow and releasing tension, which reduces overall stress levels. This calming effect on the nervous system lowers the body's fight-or-flight response, making it easier to fall asleep and achieve a deeper, more restorative sleep.",
    },
    {
      title: "ENHANCE MOOD",
      description:
        "Endorphin release promotes a sense of well-being and happiness. The heat also stimulates serotonin production, a neurotransmitter that enhances mood. Hence, one of the many reasons why Sway will become your happy place!",
    },
    {
      title: "MENTAL CLARITY",
      description:
        "Increases blood flow to the brain, which enhances oxygen and nutrient delivery to brain cells. This improved circulation, combined with the relaxation effects, reduces mental fatigue and sharpens cognitive function.",
    },
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
            src="/assets/infrared_sauna.png"
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
            RECOMMENDED 20 MIN
          </p>
          <h1 className="text-4xl md:text-6xl font-vance-bold text-[#113D33] mt-2">
            Sauna
          </h1>
          <p className="text-lg md:text-2xl font-vance-bold text-[#113D33] mt-2">
            Drop-In $49 | Member $25
          </p>
          <p className="text-md md:text-lg text-gray-700 mt-4 leading-relaxed font-vance-text">
            Science-backed treatment. Boost recovery. Burn calories. Build immunity.
            Improve sleep. Reduce stress. Increase energy. Improve focus. Promote balance.
          </p>

          {/* ✅ Recommended Benefits */}
          <h3 className="text-lg md:text-2xl font-vance-bold text-[#113D33] mt-6">
            Recommended for
          </h3>
          <ul className="text-md md:text-lg text-gray-700 mt-3 space-y-2 font-vance-text">
            <li>+ Relaxation and Stress Relief</li>
            <li>+ Enhancing Circulation</li>
            <li>+ Supporting Immune Function</li>
            <li>+ Detoxifying the Body</li>
            <li>+ Easing Muscle and Joint Discomfort</li>
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
