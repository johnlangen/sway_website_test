"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

function track(event: string, extra: Record<string, unknown> = {}) {
  window.dataLayer?.push({ event, a2hs_placement: "booking_done", ...extra });
}
function platform(): string {
  return isIOS() ? "ios" : "android";
}

/**
 * Add-to-Home-Screen nudge. Two placements:
 *  - variant="card": rich card shown on the booking "done" step (highest-intent
 *    moment). Shown to any non-installed mobile visitor.
 *  - variant="banner": subtle dismissible bottom banner for RETURNING mobile
 *    visitors (2nd+ visit), suppressed once installed or dismissed, and never on
 *    the booking flow (would cover the sticky CTA).
 *
 * iOS Safari has no programmatic install, so we show Share→Add instructions.
 * Android/Chrome gets a real one-tap install via the captured beforeinstallprompt.
 */

const DISMISS_KEY = "sway_a2hs_dismissed";
const VISIT_KEY = "sway_visit_count";
const SESSION_KEY = "sway_session_counted";

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(display-mode: standalone)").matches === true ||
    // iOS Safari standalone flag
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}
function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent) &&
    !(window as unknown as { MSStream?: unknown }).MSStream;
}
function isMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod|android/i.test(navigator.userAgent);
}

interface BIPEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
}

export function AddToHomeScreen({ variant }: { variant: "card" | "banner" }) {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [ios, setIos] = useState(false);
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const shownRef = useRef(false);

  useEffect(() => {
    // ?a2hs=1 forces the prompt to show on any device, bypassing the
    // mobile / installed / visit-count gates — for testing/previewing only.
    const force =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("a2hs") === "1";

    if (!force && (isStandalone() || !isMobile())) return; // already installed, or desktop
    setIos(isIOS());

    const onBIP = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
    };
    window.addEventListener("beforeinstallprompt", onBIP);

    // Real install conversion (Android/desktop fire this; iOS never does)
    const onInstalled = () => track("a2hs_installed", { a2hs_platform: platform() });
    window.addEventListener("appinstalled", onInstalled);

    if (force || variant === "card") {
      setShow(true);
    } else {
      // banner: count this visit once per session, gate on 2+ visits
      try {
        if (localStorage.getItem(DISMISS_KEY)) return;
        if (!sessionStorage.getItem(SESSION_KEY)) {
          sessionStorage.setItem(SESSION_KEY, "1");
          const n = parseInt(localStorage.getItem(VISIT_KEY) || "0", 10) + 1;
          localStorage.setItem(VISIT_KEY, String(n));
        }
        const visits = parseInt(localStorage.getItem(VISIT_KEY) || "0", 10);
        if (visits >= 2) setShow(true);
      } catch {
        /* storage blocked — skip the banner */
      }
    }
    return () => {
      window.removeEventListener("beforeinstallprompt", onBIP);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, [variant]);

  // Fire one impression event when the prompt actually becomes visible
  useEffect(() => {
    if (show && !shownRef.current) {
      shownRef.current = true;
      track("a2hs_prompt_shown", { a2hs_platform: platform() });
    }
  }, [show]);

  // Never show the banner over the booking flow's sticky CTA
  if (variant === "banner" && pathname?.includes("/book")) return null;
  if (!show) return null;

  const androidInstall = async () => {
    if (!deferred) return;
    track("a2hs_clicked", { a2hs_platform: "android" });
    await deferred.prompt();
    const choice = await deferred.userChoice;
    track("a2hs_outcome", { a2hs_platform: "android", a2hs_result: choice.outcome });
    setDeferred(null);
    setShow(false);
  };
  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  const ShareGlyph = () => (
    <svg className="w-4 h-4 inline-block -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0L8 8m4-4l4 4M5 12v6a2 2 0 002 2h10a2 2 0 002-2v-6" />
    </svg>
  );

  const instruction = ios ? (
    <>Tap <ShareGlyph /> then &ldquo;Add to Home Screen.&rdquo;</>
  ) : (
    <>Open your browser menu, then &ldquo;Add to Home screen.&rdquo;</>
  );

  if (variant === "card") {
    return (
      <div className="rounded-2xl border border-[#113D33]/12 bg-[#4A776D]/[0.06] px-5 py-4 text-left">
        <p className="font-semibold text-[#113D33] text-[15px]">Make your next visit one tap</p>
        <p className="text-sm text-[#113D33]/65 mt-0.5">
          Add Sway to your home screen so booking is always a tap away.
        </p>
        {!ios && deferred ? (
          <button onClick={androidInstall} className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#113D33] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[#0e3029] transition-colors">
            Add to home screen
          </button>
        ) : (
          <p className="mt-2 text-sm text-[#4A776D] font-medium">{instruction}</p>
        )}
      </div>
    );
  }

  // banner
  return (
    <div className="fixed inset-x-3 z-[60] mx-auto max-w-md rounded-2xl border border-[#113D33]/12 bg-white shadow-lg px-4 py-3 flex items-center gap-3" style={{ bottom: "calc(env(safe-area-inset-bottom) + 1rem)" }}>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-[#113D33] text-sm leading-tight">Add Sway to your home screen</p>
        <p className="text-xs text-[#113D33]/60 mt-0.5">
          {!ios && deferred ? "One tap to your next booking." : instruction}
        </p>
      </div>
      {!ios && deferred ? (
        <button onClick={androidInstall} className="shrink-0 rounded-full bg-[#113D33] text-white px-4 py-2 text-xs font-semibold hover:bg-[#0e3029] transition-colors">
          Add
        </button>
      ) : null}
      <button onClick={dismiss} aria-label="Dismiss" className="shrink-0 text-[#113D33]/40 hover:text-[#113D33] transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  );
}
