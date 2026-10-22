"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { listenForClicks, trackView } from "@/lib/ops/client";

/**
 * First-party page views + clicks for every page (lib/ops/client.ts, lib/ops/README.md).
 * Mounted once in the root layout. Renders nothing.
 */
export default function OpsTracker() {
  const pathname = usePathname();
  useEffect(() => {
    listenForClicks();
  }, []);
  useEffect(() => {
    trackView();
  }, [pathname]);
  return null;
}
