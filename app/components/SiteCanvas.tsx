"use client";

import EditorialMotion from "./EditorialMotion";

import { usePathname } from "next/navigation";

export default function SiteCanvas({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "/";
  const isInternal = /\/(internal|clubdesk|dashboard|ops)(\/|$)/.test(pathname);
  // The club founding pages (RiNo, Central Park) are normal marketing pages
  const isClubFounding = /\/denver-(rino|central-park)\/founding-membership(\/|$)/.test(pathname);
  const isFlow =
    !isClubFounding &&
    /\/(book[^/]*|founding-membership|membership-join-preview|themavenhotel|checkout)(\/|$)/.test(
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
      <EditorialMotion />
    </main>
  );
}
