"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [hover, setHover] = useState({ instagram: false, tiktok: false });

  return (
    <footer className="bg-[#113D33] text-white px-8 md:px-16 py-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        {/* Logo */}
        <div className="flex flex-col">
          <Image src="/assets/swaylogo.png" width={75} height={25} alt="Sway Logo" />
        </div>

        {/* Links */}
        <div className="flex flex-col">
          <FooterLink href="/membership" text="Memberships" />
          <FooterLink href="/treatments" text="Treatments" />
          <FooterLink href="/locations" text="Locations" />
          <FooterLink href="/press" text="Press" />
          <FooterLink href="/blog" text="Blog" />
          <FooterLink href="/faq" text="FAQ" />
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

        {/* Address & Contact */}
        <div>
          <p>1428 Larimer St.<br />Denver, CO 80202</p>
          <p className="mt-2">Phone: +1 303-476-6150</p>
          <p className="mt-4 font-semibold">Sway Hours of Wellness</p>
          <p className="text-sm">
            Mon-Fri: 10:00 AM - 8:00 PM<br />
            Sat: 9:00 AM - 6:00 PM<br />
            Sun: 11:00 AM - 6:00 PM
          </p>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="mt-10 flex justify-between text-sm text-gray-400">
        <FooterLink href="/terms-and-conditions" text="Terms and Conditions" />
        <span>© 2024 Sway Wellness Club</span>
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
  </a>
);
