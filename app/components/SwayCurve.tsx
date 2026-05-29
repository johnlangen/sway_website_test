"use client";

/**
 * SwayCurve — the brand's signature line.
 *
 * One organic wave — used as eyebrow accents, section dividers, button
 * flourishes, and the closing signoff. Recurs throughout the site so that
 * "the curve" becomes Sway's ownable shape (the way Apple has rounded
 * squares, Aesop has wash-toned amber, etc).
 *
 * Inherits color from currentColor so it adapts to whatever section it
 * sits in. Optional draw-in animation via the `animate` prop pairs with
 * the `.sway-curve-draw` keyframes in globals.css.
 *
 * IMPORTANT — animation triggering:
 * The draw-in animation is *not* applied at render time. Each curve uses
 * an IntersectionObserver scoped to the snap-container to wait until it
 * actually scrolls into view, then attaches the .sway-curve-draw class.
 * This guarantees the 1s delay + 2.6s draw plays when the user can see
 * it — not 30 seconds earlier, off-screen, while they were on the hero.
 */

import { useEffect, useRef, useState } from "react";

type SwayCurveProps = {
  width?: number;
  strokeWidth?: number;
  className?: string;
  animate?: boolean;
};

export function SwayCurve({
  width = 120,
  strokeWidth = 1.5,
  className = "",
  animate = false,
}: SwayCurveProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  useEffect(() => {
    if (!animate) return;
    const el = svgRef.current;
    if (!el) return;

    // Observe within the snap-container (which is the actual scrolling
    // viewport, not the document). Fall back to the document if for some
    // reason it isn't present (e.g. this component reused elsewhere).
    const root = document.querySelector(".snap-container") as Element | null;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setHasEnteredView(true);
            observer.disconnect(); // play once per visit, never replay
            return;
          }
        }
      },
      {
        root,
        threshold: [0, 0.15, 0.3, 0.5],
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  // Only attach the draw class once the curve has actually entered view.
  // For curves with animate={false}, the class never attaches — the path
  // renders fully drawn from the start.
  const shouldDraw = animate && hasEnteredView;

  return (
    <svg
      ref={svgRef}
      width={width}
      height={Math.round(width * 0.12)}
      viewBox="0 0 200 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      className={`sway-curve-breath ${className}`}
      aria-hidden="true"
    >
      <path
        d="M 4 12 Q 50 2 100 12 T 196 12"
        pathLength={100}
        // The path is hidden by default when `animate` is set (so it
        // doesn't flash fully-drawn before the observer fires). When the
        // observer fires, the class attaches and the animation runs.
        className={shouldDraw ? "sway-curve-draw" : ""}
        style={
          animate && !hasEnteredView
            ? { strokeDasharray: 100, strokeDashoffset: 100 }
            : undefined
        }
      />
    </svg>
  );
}
