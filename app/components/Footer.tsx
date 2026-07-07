"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

// Per-location footer contact info. The site is multi-location now, so the
// footer must not show Larimer's address/phone/hours on every page. Larimer
// info shows only on Larimer pages; the clubs show their own address + contact
// email (no phone yet, hours TBD); brand-level pages (homepage, general
// services) show a neutral "find a location" block.
const FOOTER_LOCATIONS = {
  larimer: {
    name: "Sway Larimer",
    address: ["1428 Larimer St.", "Denver, CO 80202"],
    phone: "+1 303-476-6150",
    hours: ["Mon-Fri: 10:00 AM - 8:00 PM", "Sat: 9:00 AM - 6:00 PM", "Sun: 11:00 AM - 6:00 PM"],
  },
  rino: {
    name: "Sway RiNo",
    address: ["3636 Blake St.", "Denver, CO 80205"],
    email: "contact@swayrino.com",
  },
  "central-park": {
    name: "Sway Central Park",
    address: ["2271 Clinton St.", "Aurora, CO 80010"],
    email: "contact@swaycentralpark.com",
  },
} as const;

function resolveFooterLocation(pathname: string | null): keyof typeof FOOTER_LOCATIONS | null {
  if (!pathname) return null;
  if (pathname.startsWith("/locations/denver-rino")) return "rino";
  if (pathname.startsWith("/locations/denver-central-park")) return "central-park";
  if (pathname.startsWith("/locations/denver-larimer")) return "larimer";
  return null; // brand-level pages -> neutral block
}

export default function Footer() {
  const [hover, setHover] = useState({ instagram: false, tiktok: false });
  const pathname = usePathname();
  const locKey = resolveFooterLocation(pathname);
  const loc = locKey ? FOOTER_LOCATIONS[locKey] : null;

  return (
    <footer className="bg-[#113D33] text-white px-8 md:px-16 py-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        {/* Logo */}
        <div className="flex flex-col">
          <Image src="/assets/swaylogo.png" width={75} height={25} alt="Sway Logo" />
          <span className="text-xs text-white/60 mt-1">Part of the Spavia family</span>
        </div>

        {/* Links */}
        <div className="flex flex-col">
          <FooterLink href="/membership" text="Memberships" />
          <FooterLink href="/treatments" text="Treatments" />
          <FooterLink href="/group-events" text="Group Events" />
          <FooterLink href="/date-night" text="Date Night" />
          <FooterLink href="/couples-spa" text="Couples Spa" />
          <FooterLink href="/locations" text="Locations" />
          <FooterLink href="/press" text="Press" />
          <FooterLink href="/blog" text="Blog" />
          <FooterLink href="/faq/larimer" text="FAQ" />
          <FooterLink href="/own" text="Own a Sway" />
        </div>

        {/* Social Links */}
        <div className="flex flex-col">
          <FooterSocial
            href="https://www.instagram.com/swaywellnessclub/"
            text="Instagram"
            hoverState={hover.instagram}
            setHoverState={(state) => setHover({ ...hover, instagram: state })}
          />
          <FooterSocial
            href="https://www.tiktok.com/@swaywellnessclub"
            text="TikTok"
            hoverState={hover.tiktok}
            setHoverState={(state) => setHover({ ...hover, tiktok: state })}
          />
        </div>

        {/* Address & Contact — location-aware (see FOOTER_LOCATIONS) */}
        <div>
          {loc ? (
            <>
              <p className="font-semibold">{loc.name}</p>
              <p className="mt-1">{loc.address[0]}<br />{loc.address[1]}</p>
              {"phone" in loc && loc.phone && <p className="mt-2">Phone: {loc.phone}</p>}
              {"email" in loc && loc.email && (
                <p className="mt-2">
                  <a href={`mailto:${loc.email}`} className="hover:underline">{loc.email}</a>
                </p>
              )}
              {"hours" in loc && loc.hours && (
                <>
                  <p className="mt-4 font-semibold">Sway Hours of Wellness</p>
                  <p className="text-sm">
                    {loc.hours.map((h, i) => (
                      <span key={i}>{h}{i < loc.hours.length - 1 && <br />}</span>
                    ))}
                  </p>
                </>
              )}
            </>
          ) : (
            <>
              <p className="font-semibold">Visit Sway</p>
              <p className="mt-1 text-sm text-white/80">Denver Larimer · RiNo · Central Park · and more.</p>
              <Link href="/locations" className="mt-2 inline-block underline">See all locations</Link>
            </>
          )}
        </div>
      </div>

      {/* Award */}
      <div className="mt-10 text-center text-xs text-white/60">
        Voted #4 Best Day Spa in America · USA Today 10Best
      </div>

      {/* Bottom Links */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 justify-between text-sm text-gray-400">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <FooterLink href="/terms-and-conditions" text="Terms and Conditions" />
          <FooterLink href="/accessibility" text="Accessibility" />
        </div>
        <span>© 2026 Sway Wellness Club</span>
      </div>
    </footer>
  );
}

// Footer Link Component
const FooterLink = ({ href, text }: { href: string; text: string }) => (
  <Link href={href} className="hover:underline">
    {text}
  </Link>
);

// Social Media Link Component
const FooterSocial = ({
  href,
  text,
  hoverState,
  setHoverState,
}: {
  href: string;
  text: string;
  hoverState: boolean;
  setHoverState: (state: boolean) => void;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onMouseEnter={() => setHoverState(true)}
    onMouseLeave={() => setHoverState(false)}
    className={`hover:underline ${hoverState ? "text-green-400" : "text-white"}`}
  >
    {text}
    <span className="sr-only">(opens in new tab)</span>
  </a>
);
