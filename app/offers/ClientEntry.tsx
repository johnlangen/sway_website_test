// app/offers/ClientEntry.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import { createRoot, Root } from "react-dom/client";
import OffersHub from "./OffersHub";

export default function ClientEntry() {
  const rootRef = useRef<Root | null>(null);

  useLayoutEffect(() => {
    const rootElement = document.getElementById("offers-hub-root");
    if (rootElement && !rootRef.current) {
      const rootInstance = createRoot(rootElement);
      rootRef.current = rootInstance;
      rootInstance.render(<OffersHub />);
    }
    return () => {
      // Optional unmount if you ever navigate within the same tree
      // rootRef.current?.unmount();
      // rootRef.current = null;
    };
  }, []);

  return null;
}
