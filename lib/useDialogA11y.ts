import { useEffect, useRef } from "react";

/**
 * Accessibility for modal dialogs (WCAG 2.4.3 focus order, 2.1.2 no keyboard
 * trap, 2.4.11 focus appearance). When `open`:
 *   - moves keyboard focus into the dialog on open,
 *   - traps Tab/Shift+Tab within the dialog,
 *   - closes on Escape,
 *   - restores focus to the previously-focused element (the trigger) on close.
 *
 * Usage: const ref = useDialogA11y(open, onClose); then put ref on the dialog
 * container element and give that element tabIndex={-1}.
 */
const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function useDialogA11y<T extends HTMLElement = HTMLDivElement>(
  open: boolean,
  onClose: () => void
) {
  const ref = useRef<T>(null);
  // Keep the latest onClose without re-running the effect (which would steal focus).
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const node = ref.current;
    if (!node) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Move focus into the dialog (first focusable, else the container itself).
    const initial = node.querySelector<HTMLElement>(FOCUSABLE);
    (initial ?? node).focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );
      if (items.length === 0) {
        e.preventDefault();
        node.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      // Restore focus to the trigger if it's still in the document.
      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [open]);

  return ref;
}
