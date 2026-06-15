"use client";

import { ReactNode } from "react";

/**
 * Fixed bottom action bar for the booking flows. Pops up (fade-in-up) once the
 * guest has made a selection, so the primary CTA is always reachable without
 * scrolling past long option grids. Purely presentational: flows pass their
 * existing button(s) as children and keep all logic in their own handlers.
 */
export function StickyFlowCTA({
  show,
  dark = false,
  hint,
  children,
}: {
  show: boolean;
  dark?: boolean;
  hint?: ReactNode;
  children: ReactNode;
}) {
  if (!show) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 animate-fade-in-up">
      <div
        className={`border-t backdrop-blur-md shadow-[0_-8px_24px_rgba(0,0,0,0.08)] ${
          dark
            ? "border-white/10 bg-[#0b1f1a]/90"
            : "border-[#113D33]/10 bg-[#F7F4E9]/90"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="max-w-md mx-auto px-4 py-3">
          {hint && (
            <div
              className={`mb-2 text-center text-xs ${
                dark ? "text-white/60" : "text-[#113D33]/75"
              }`}
            >
              {hint}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
