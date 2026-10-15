"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: content is never hidden awaiting JavaScript. */
export default function EditorialMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.querySelector(".sway-marketing, .sway-article");
    if (!root || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    const start = () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      if (preference.matches) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            observer?.unobserve(entry.target);
            const animation = entry.target.animate(
              [
                { opacity: 0.35, transform: "translateY(18px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 650, easing: "cubic-bezier(.22,1,.36,1)" },
            );
            animations.add(animation);
            animation.onfinish = () => animations.delete(animation);
          });
        },
        { threshold: 0.08 },
      );
      root
        .querySelectorAll(
          "h2, .experience-image, .home-location-image, .sway-membership-option-image, .sway-membership-option-copy, .sway-offer-image, .sway-club-offer-image, .sway-journal-story-image, .sway-campaign-photo, .editorial-hero-image",
        )
        .forEach((element) => {
          if (element.closest('[style*="opacity"]')) return;
          if (
            element.tagName === "H2" &&
            element.closest(".sway-membership-option-copy")
          )
            return;
          observer?.observe(element);
        });
    };
    start();
    preference.addEventListener("change", start);
    return () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", start);
    };
  }, [pathname]);
  return null;
}
