"use client";

import Head from "next/head";
import { motion } from "framer-motion";
import { Check, ChevronRight, ExternalLink } from "lucide-react";

const BRONZE = "#b38a5f";
const FRANCHISE_URL = "https://www.spaviafranchise.com/";

export default function SpaviaFranchiseLanding() {
  const btn =
    "inline-flex items-center justify-center rounded-full px-5 py-3 font-medium transition";
  const btnPrimary = `${btn} text-white`;
  const btnGhost =
    "inline-flex items-center gap-2 text-sm text-black/70 hover:text-black";

  return (
    <div className="min-h-screen bg-white text-black">
      <Head>
        <title>Own a Spavia | Franchise Opportunity</title>
        <meta
          name="description"
          content="Learn about owning a Spavia franchise. Explore the brand, business model, and why entrepreneurs choose Spavia in the global wellness economy."
        />
        <link rel="canonical" href="https://spaviafranchise.com/own" />
      </Head>

      {/* ---------- NAV ---------- */}
      <header className="fixed left-0 top-0 z-50 w-full border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold tracking-tight">spavia</span>
            <span className="rounded-full bg-black px-2 py-0.5 text-xs font-semibold text-white">
              FRANCHISE
            </span>
          </div>

          <a
            href={FRANCHISE_URL}
            className={btnPrimary}
            style={{ backgroundColor: BRONZE }}
          >
            Visit Franchise Site
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </header>

      {/* ---------- HERO ---------- */}
      <section className="relative mt-16 h-[72vh] w-full overflow-hidden md:h-[84vh]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/assets/offer_hero2.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="mx-auto max-w-4xl text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-3xl font-semibold leading-tight md:text-5xl"
            >
              Own a Part of the Global Wellness Economy
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mx-auto mt-4 max-w-2xl text-sm md:text-lg"
            >
              Spavia is a premium, membership-driven spa brand helping
              entrepreneurs bring affordable luxury wellness to their
              communities.
            </motion.p>

            <div className="mt-7 flex items-center justify-center gap-3">
              <a
                href={FRANCHISE_URL}
                className={btnPrimary}
                style={{ backgroundColor: BRONZE }}
              >
                Explore Franchise Ownership
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>

              <a href="#numbers" className={btnGhost}>
                See the numbers <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-5 text-xs opacity-75">
              *Performance figures per FDD. See Item 19 for details.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- WHY SPAVIA ---------- */}
      <section id="why" className="border-t border-black/5 bg-neutral-50 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-2xl font-semibold md:text-3xl mb-10">
            Why Entrepreneurs Choose Spavia
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Recurring Membership Model",
                text:
                  "A loyal member base creates predictable revenue and long-term stability.",
              },
              {
                title: "Multiple Revenue Streams",
                text:
                  "Massage, facials, body treatments, retail, and gift cards diversify income.",
              },
              {
                title: "Premium Yet Approachable",
                text:
                  "Resort-inspired design with pricing that supports broad community adoption.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-black/10 bg-white p-6"
              >
                <div
                  className="mb-3 h-1.5 w-12 rounded-full"
                  style={{ backgroundColor: BRONZE }}
                />
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-black/70">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- NUMBERS ---------- */}
      <section id="numbers" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-semibold md:text-3xl">
          The Business at a Glance
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Stat label="Average Gross Sales*" value="$1,080,829" />
          <Stat label="Locations Exceeding $1M+" value="1 in 2" />
          <Stat label="Highest Reported Gross Revenue*" value="$1.94M" />
          <Stat label="Initial Investment Range*" value="$496K – $796K" />
        </div>

        <p className="mt-4 text-xs text-black/60">
          *Figures from Franchise Disclosure Document (Item 19). Individual
          results vary. This page is for informational purposes only.
        </p>

        <div className="mt-8">
          <a
            href={FRANCHISE_URL}
            className={btnPrimary}
            style={{ backgroundColor: BRONZE }}
          >
            View Full Franchise Details
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>

      {/* ---------- STEPS ---------- */}
      <section id="steps" className="border-t border-black/5 bg-neutral-50 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-2xl font-semibold md:text-3xl mb-10">
            Path to Ownership
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              "Explore the Opportunity",
              "Connect with Franchise Development",
              "Review the FDD",
              "Open Your Spavia",
            ].map((s, i) => (
              <div
                key={s}
                className="rounded-2xl border border-black/10 bg-white p-6 text-center"
              >
                <div
                  className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: BRONZE }}
                >
                  {i + 1}
                </div>
                <div className="text-sm font-medium">{s}</div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a
              href={FRANCHISE_URL}
              className={btnPrimary}
              style={{ backgroundColor: BRONZE }}
            >
              Start Exploring Ownership
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="border-t border-black/5 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 md:flex-row">
          <div className="text-sm text-black/60">
            © {new Date().getFullYear()} Spavia Franchise. All rights reserved.
          </div>
          <a
            href={FRANCHISE_URL}
            className="text-sm hover:opacity-80"
          >
            Visit SpaviaFranchise.com
          </a>
        </div>
      </footer>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/10 p-6">
      <div className="text-sm text-black/60">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}
