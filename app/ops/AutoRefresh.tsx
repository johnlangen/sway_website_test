"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Re-fetches the dashboard every `seconds` (used on the Today view only). */
export default function AutoRefresh({ seconds }: { seconds: number }) {
  const router = useRouter();
  useEffect(() => {
    const t = setInterval(() => router.refresh(), seconds * 1000);
    return () => clearInterval(t);
  }, [router, seconds]);
  return null;
}
