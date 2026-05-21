"use client";

import { Instagram } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  /** Override the headline. Default: "Stay in the know." */
  title?: string;
  /** Override the body copy. Default: location-aware build-update line. */
  subtitle?: string;
  /** Visual variant. Default: "dark" (filled green). */
  variant?: "dark" | "light";
};

const INSTAGRAM_URL = "https://www.instagram.com/swaywellnessclub/";

export default function InstagramCallout({
  title = "Stay in the know.",
  subtitle = "Follow @swaywellnessclub on Instagram for opening news, sneak peeks, and member-only drops.",
  variant = "dark",
}: Props) {
  const isDark = variant === "dark";

  return (
    <section className="px-6 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={
            isDark
              ? "bg-[#113D33] text-white rounded-3xl p-8 md:p-12 text-center shadow-xl"
              : "bg-white border border-[#113D33]/15 rounded-3xl p-8 md:p-12 text-center shadow"
          }
        >
          <div
            className={
              isDark
                ? "inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-5"
                : "inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#113D33]/8 text-[#113D33] mb-5"
            }
          >
            <Instagram className="w-6 h-6" />
          </div>
          <h2
            className={
              isDark
                ? "text-2xl md:text-3xl font-bold mb-3"
                : "text-2xl md:text-3xl font-bold text-[#113D33] mb-3"
            }
          >
            {title}
          </h2>
          <p
            className={
              isDark
                ? "text-base md:text-lg text-white/80 max-w-xl mx-auto mb-6"
                : "text-base md:text-lg text-[#113D33]/70 max-w-xl mx-auto mb-6"
            }
          >
            {subtitle}
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={
              isDark
                ? "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#113D33] font-bold hover:bg-[#F7F4E9] transition shadow-lg"
                : "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#113D33] text-white font-bold hover:opacity-90 transition shadow"
            }
          >
            <Instagram className="w-4 h-4" />
            Follow @swaywellnessclub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
