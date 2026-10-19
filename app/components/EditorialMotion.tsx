"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll reveal for marketing pages, tuned to match the gift cards pages'
 * framer-motion (fade up from 0, ~0.5s ease-out, 80ms stagger).
 *
 * Progressive enhancement: content is never hidden awaiting JavaScript.
 * Only elements still BELOW the fold when this runs get hidden (by JS, right
 * before they're observed). Anything already on screen is left alone, which
 * is what used to look jumpy: it was visible, snapped to 35% opacity, then
 * popped back. Heroes have their own CSS entrance (sway-hero-rise).
 */
const SELECTOR =
  "h2, .experience-image, .home-location-image, .sway-membership-option-image, .sway-membership-option-copy, .sway-offer-image, .sway-club-offer-image, .sway-journal-story-image, .sway-campaign-photo, .editorial-hero-image";
const DURATION = 550;
const STAGGER = 80;
const RISE = "16px";

export default function EditorialMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.querySelector(".sway-marketing, .sway-article");
    if (!root || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    // Hidden elements -> the opacity / translate to reveal them back to.
    const hidden = new Map<HTMLElement, { opacity: string; translate: string }>();
    let observer: IntersectionObserver | undefined;

    const unhide = (element: HTMLElement) => {
      element.style.removeProperty("opacity");
      element.style.removeProperty("translate");
      hidden.delete(element);
    };
    // Also runs before printing so unscrolled sections still print.
    const revealAll = () => hidden.forEach((_, element) => unhide(element));

    const start = () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      revealAll();
      if (preference.matches) return;
      observer = new IntersectionObserver(
        (entries) => {
          let order = 0;
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const element = entry.target as HTMLElement;
            observer?.unobserve(element);
            const resting = hidden.get(element);
            if (!resting) return;
            // Drop the hiding styles first; the animation's backwards fill
            // holds it at 0 through the stagger delay, then lands on the
            // element's own styles with nothing left to clean up.
            unhide(element);
            const animation = element.animate(
              [
                { opacity: 0, translate: `0 ${RISE}` },
                { opacity: resting.opacity, translate: resting.translate },
              ],
              {
                duration: DURATION,
                delay: order++ * STAGGER,
                easing: "cubic-bezier(0, 0, 0.58, 1)",
                fill: "backwards",
              },
            );
            animations.add(animation);
            animation.onfinish = () => animations.delete(animation);
          });
        },
        { threshold: 0.08 },
      );
      const fold = window.innerHeight;
      root.querySelectorAll<HTMLElement>(SELECTOR).forEach((element) => {
        // framer-motion already animates these (and anything we just hid).
        if (element.closest('[style*="opacity"]')) return;
        if (element.closest(".sway-campaign-intro, .sway-hero-enter")) return;
        if (
          element.tagName === "H2" &&
          element.closest(".sway-membership-option-copy")
        )
          return;
        // Already on screen: leave it be (no flash).
        if (element.getBoundingClientRect().top < fold) return;
        const computed = getComputedStyle(element);
        hidden.set(element, {
          opacity: computed.opacity,
          translate: computed.translate === "none" ? "0 0" : computed.translate,
        });
        element.style.opacity = "0";
        element.style.translate = `0 ${RISE}`;
        observer?.observe(element);
      });
    };
    start();
    preference.addEventListener("change", start);
    window.addEventListener("beforeprint", revealAll);
    return () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      revealAll();
      preference.removeEventListener("change", start);
      window.removeEventListener("beforeprint", revealAll);
    };
  }, [pathname]);
  return null;
}
