"use client";

import { usePathname } from "next/navigation";

export default function SiteCanvas({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "/";
  const isInternal = /\/(internal|clubdesk|dashboard)(\/|$)/.test(pathname);
  const isFlow =
    /\/(book[^/]*|founding-membership|membership-join-preview|themavenhotel)(\/|$)/.test(
      pathname,
    );
  const isArticle = pathname.startsWith("/blog/") && pathname !== "/blog/";
  const kind = isInternal
    ? "internal"
    : isFlow
      ? "flow"
      : isArticle
        ? "article"
        : "marketing";
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`relative z-10 sway-canvas sway-${kind}`}
      data-page={pathname}
    >
      {children}
    </main>
  );
}
