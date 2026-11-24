"use client";
import { useEffect, useState, type ReactNode } from "react";

/**
 * The gift checkout's bottom bar: the step's main button is always on screen, so nobody has to
 * scroll past the designs to continue (the Spavia site's StickyFlowActions, in Sway's style; John
 * 11/24/2026). Rendered INSIDE each step's form, so the button still submits and validates it.
 * On a phone it rides above the keyboard.
 */
export default function GiftStickyActions({ children, hint }: { children: ReactNode; hint?: ReactNode }) {
  const [keyboardInset, setKeyboardInset] = useState(0);
  useEffect(() => {
    const viewport = window.visualViewport;
    const update = () => setKeyboardInset(viewport ? Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop) : 0);
    update();
    window.addEventListener("resize", update);
    viewport?.addEventListener("resize", update);
    viewport?.addEventListener("scroll", update);
    return () => {
      window.removeEventListener("resize", update);
      viewport?.removeEventListener("resize", update);
      viewport?.removeEventListener("scroll", update);
    };
  }, []);
  return (
    <div
      style={{ bottom: keyboardInset }}
      className="fixed inset-x-0 z-40 border-t border-[#113D33]/10 bg-[#F7F4E9]/95 px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_rgba(17,61,51,0.08)] backdrop-blur print:hidden"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-end gap-x-6 gap-y-2 [&>button]:w-full sm:[&>button]:w-auto">
        {hint && <p className="mr-auto w-full min-w-0 break-words text-sm text-[#113D33]/80 sm:w-auto">{hint}</p>}
        {children}
      </div>
    </div>
  );
}
