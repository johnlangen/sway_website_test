"use client";

import ArrowMark from "@/app/components/ArrowMark";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { resolveLocationHref } from "../components/LocationAwareHref";
import EditorialHero from "../components/EditorialHero";
type Treatment = {
  name: string;
  tagline: string;
  description: string;
  image: string;
  mobileImage: string | null;
  learnHref: string;
  badge?: string;
};

const treatments: Treatment[] = [
  {
    name: "Massages",
    tagline: "3 tiers · 13 treatments",
    description:
      "Signature, Deep Tissue, Sports, Salt Stone, Lymphatic Drainage, Maternity and more. 50 to 90 minutes across Essential, Premier, and Ultimate tiers.",
    image: "/assets/homepage-massage.jpg",
    mobileImage: null,
    learnHref: "/massages",
  },
  {
    name: "Facials",
    tagline: "3 tiers · 11 treatments",
    description:
      "Anti-aging, acne, hydration, sensitive skin, and brightening facials with dermapore technology, LED, microcurrent, and oxygen infusion. 50 to 60 minutes.",
    image: "/assets/facialExperiences.jpg",
    mobileImage: "/assets/facialExperiencesMobile.jpg",
    learnHref: "/facials",
  },
  {
    name: "Remedy Room",
    tagline: "4-modality recovery circuit",
    description:
      "Sauna, cold plunge, compression therapy, and LED light therapy. 40 minutes.",
    image: "/assets/homepage-remedy.jpg",
    mobileImage: "/assets/remedyRoomMobile.jpg",
    learnHref: "/remedy-tech",
  },
  {
    name: "Aescape",
    tagline: "AI-powered robot massage",
    description:
      "Real-time 3D body mapping with personalized pressure zones. 15, 30, 45, or 60 minutes.",
    image: "/assets/aescapeblog6.jpg",
    mobileImage: "/assets/aescapeMobile.jpg",
    learnHref: "/aescape",
    badge: "Select Locations",
  },
];

const boosts = [
  "Dermaflash",
  "LED Light Therapy",
  "Microcurrent",
  "PEMF Mat",
  "Oxygen Infusion",
  "Cupping",
  "CBD",
];

export default function TreatmentsPage() {
  const [bookHref, setBookHref] = useState("/book");
  useEffect(() => {
    setBookHref(
      resolveLocationHref({ localPath: "/book", fallbackHref: "/book" }),
    );
  }, []);
  return (
    <div className="treatment-directory">
      <EditorialHero
        eyebrow="The Sway treatment collection"
        title="Your body. Your mood. Your moment."
        description="Expert hands, thoughtful skincare, and a new world of recovery. Find your own way to feel good."
        image="/assets/facialExperiences.jpg"
        imageAlt="A restorative facial experience at Sway"
        href="#treatment-menu"
        action="Find your treatment"
      />
      <nav className="treatment-jump" aria-label="Explore treatment categories">
        {treatments.map((t, i) => (
          <a href={`#treatment-${i}`} key={t.name}>
            <span>0{i + 1}</span>
            {t.name} <ArrowMark direction="down" />
          </a>
        ))}
      </nav>
      <div id="treatment-menu">
        {treatments.map((t, i) => (
          <section
            className="treatment-editorial-row"
            id={`treatment-${i}`}
            key={t.name}
          >
            <div className="treatment-editorial-image">
              <Image
                src={t.image}
                alt={`${t.name} at Sway`}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="treatment-editorial-copy">
              <p className="sway-eyebrow">
                0{i + 1} / {t.tagline}
              </p>
              <h2>{t.name}</h2>
              <p>{t.description}</p>
              <div>
                <Link href={t.learnHref} className="sway-button">
                  Explore {t.name}
                  <span aria-hidden="true"><ArrowMark /></span>
                </Link>
                <Link href={bookHref} className="sway-text-link">
                  Book a visit
                </Link>
              </div>
              <p className="treatment-location-note">
                Treatments vary by location. Explore your local Sway for
                availability.
              </p>
            </div>
          </section>
        ))}
      </div>
      <section className="sway-section treatment-boosts">
        <div>
          <p className="sway-eyebrow">A little extra, just for you</p>
          <h2>Make it your own.</h2>
          <p>
            Personalize your massage or facial with a thoughtful finishing
            touch. Members save 50% on boosts.
          </p>
        </div>
        <ul>
          {boosts.map((boost, i) => (
            <li key={boost}>
              <span>0{i + 1}</span>
              {boost}
            </li>
          ))}
        </ul>
      </section>
      <section className="sway-signoff">
        <p className="sway-eyebrow">Good things start with a pause</p>
        <h2>Your reset is waiting.</h2>
        <Link href={bookHref} className="sway-button sway-button-light">
          Book your experience <span aria-hidden="true"><ArrowMark /></span>
        </Link>
      </section>
    </div>
  );
}
