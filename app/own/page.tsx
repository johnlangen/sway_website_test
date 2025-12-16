// app/own/page.tsx
"use client";

import { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";

const BRONZE = "#b38a5f";

export default function SpaviaFranchiseLanding() {
  // ---- Simple multi-step form state (no backend) ----
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    liquid: "",
  });

  function next() {
    if (step < 3) setStep((s) => (s + 1) as typeof step);
  }
  function back() {
    if (step > 1) setStep((s) => (s - 1) as typeof step);
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Dummy wait to simulate submit
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    alert("Thanks! Our Franchise Development team will reach out.");
  }

  const inputBase =
    "w-full rounded-xl border border-neutral-300 bg-white/90 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10";
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
          content="Own a part of the global wellness economy with Spavia. Join 60+ franchisees bringing affordable luxury wellness to their communities."
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
          <nav className="hidden gap-6 md:flex">
            <a className="text-sm hover:opacity-80" href="#why">Why Spavia</a>
            <a className="text-sm hover:opacity-80" href="#numbers">Numbers</a>
            <a className="text-sm hover:opacity-80" href="#steps">Steps</a>
          </nav>
          <a
            href="#lead"
            className={btnPrimary}
            style={{ backgroundColor: BRONZE }}
          >
            Request Franchise Info
          </a>
        </div>
      </header>

      {/* ---------- HERO ---------- */}
      <section className="relative mt-16 h-[72vh] w-full overflow-hidden md:h-[84vh]">
        {/* Use your existing sample video path here */}
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
              Join 60+ Spavia franchisees bringing affordable luxury wellness to
              their communities — with many locations exceeding $1M in annual
              sales.*
            </motion.p>

            <div className="mt-7 flex items-center justify-center gap-3">
              <a
                href="#lead"
                className={btnPrimary}
                style={{ backgroundColor: BRONZE }}
              >
                Request Franchise Info
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>
              <a href="#numbers" className={btnGhost}>
                See the numbers <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            {/* Trust logos */}
            <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-6 opacity-90">
              <div className="h-6 w-24 rounded bg-white/20" />
              <div className="h-6 w-24 rounded bg-white/20" />
              <div className="h-6 w-24 rounded bg-white/20" />
              <div className="h-6 w-24 rounded bg-white/20" />
            </div>
            <p className="mt-3 text-xs opacity-75">
              *Performance figures per FDD. See Item 19 for details.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- LEAD CAPTURE (micro-commitment first) ---------- */}
      <section id="lead" className="mx-auto max-w-5xl px-5 py-12 md:py-16">
        <div className="grid items-start gap-10 md:grid-cols-2">
          {/* Left: value prop */}
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Request Your Free Franchise Info Kit
            </h2>
            <ul className="space-y-3 text-sm leading-relaxed text-black/80">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4" style={{ color: BRONZE }} />
                Membership-based model for predictable, recurring revenue.
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4" style={{ color: BRONZE }} />
                Multiple revenue streams: massage, facials, retail & gift cards.
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4" style={{ color: BRONZE }} />
                National support team with 120+ combined years in spa & skin care.
              </li>
            </ul>
            <div className="rounded-2xl border border-black/10 bg-neutral-50 p-4 text-xs text-black/60">
              We respect your privacy and never share your information with third
              parties.
            </div>
          </div>

          {/* Right: multi-step form */}
          <form
            onSubmit={submit}
            className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm"
          >
            <div className="mb-4 flex items-center gap-2 text-xs">
              <span
                className={`h-6 w-6 rounded-full text-center leading-6 text-white`}
                style={{ backgroundColor: step >= 1 ? BRONZE : "#e5e5e5" }}
              >
                1
              </span>
              <div className="h-[2px] w-8 bg-black/10" />
              <span
                className={`h-6 w-6 rounded-full text-center leading-6 text-white`}
                style={{ backgroundColor: step >= 2 ? BRONZE : "#e5e5e5" }}
              >
                2
              </span>
              <div className="h-[2px] w-8 bg-black/10" />
              <span
                className={`h-6 w-6 rounded-full text-center leading-6 text-white`}
                style={{ backgroundColor: step >= 3 ? BRONZE : "#e5e5e5" }}
              >
                3
              </span>
              <span className="ml-2 text-black/60">Step {step} of 3</span>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <input
                      className={inputBase}
                      placeholder="First Name*"
                      value={form.first}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, first: e.target.value }))
                      }
                      required
                    />
                    <input
                      className={inputBase}
                      placeholder="Last Name*"
                      value={form.last}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, last: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <input
                    className={inputBase}
                    type="email"
                    placeholder="Email*"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    required
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-black/60">
                      You’ll receive the Info Kit via email.
                    </span>
                    <button
                      type="button"
                      onClick={next}
                      className={btnPrimary}
                      style={{ backgroundColor: BRONZE }}
                    >
                      Get Info Kit
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <input
                      className={inputBase}
                      placeholder="Phone*"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      required
                    />
                    <input
                      className={inputBase}
                      placeholder="City*"
                      value={form.city}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, city: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <input
                    className={inputBase}
                    placeholder="State*"
                    value={form.state}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, state: e.target.value }))
                    }
                    required
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <button type="button" onClick={back} className={btnGhost}>
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      className={btnPrimary}
                      style={{ backgroundColor: BRONZE }}
                    >
                      Continue <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <select
                    className={inputBase}
                    value={form.liquid}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, liquid: e.target.value }))
                    }
                    required
                  >
                    <option value="">Liquid Assets (Select one)*</option>
                    <option>$0 – $200K</option>
                    <option>$200K – $500K</option>
                    <option>$500K – $1MM</option>
                    <option>$1MM+</option>
                  </select>

                  <div className="mt-3 flex items-center justify-between">
                    <button type="button" onClick={back} className={btnGhost}>
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className={btnPrimary}
                      style={{ backgroundColor: BRONZE }}
                    >
                      {loading ? "Submitting..." : "Request Franchise Info"}
                    </button>
                  </div>

                  <p className="mt-3 text-[11px] leading-relaxed text-black/60">
                    By submitting, you agree that Spavia may contact you via
                    phone, email, and/or text regarding your inquiry. Your data
                    is used solely to determine franchise suitability.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </section>

      {/* ---------- WHY SPAVIA ---------- */}
      <section id="why" className="border-t border-black/5 bg-neutral-50 py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 md:grid-cols-3">
          {[
            {
              title: "Recurring Membership Model",
              text:
                "Predictable cash flow via memberships designed for loyal, repeat guests.",
            },
            {
              title: "Multiple Revenue Streams",
              text:
                "Massage, facials, body treatments, retail & gift cards to maximize earning potential.",
            },
            {
              title: "Premium Yet Affordable",
              text:
                "Resort-inspired design and service with pricing that grows a large member base.",
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
      </section>

      {/* ---------- NUMBERS ---------- */}
      <section id="numbers" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-semibold md:text-3xl">
          The Proof Is in the Numbers
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Stat label="Highest Gross Revenue" value="$1,940,000" />
          <Stat label="Franchise Locations Exceeded $1M" value="53%" />
          <Stat label="Average Gross Sales (all locations)" value="$1,080,829" />
          <Stat label="Leadership Experience" value="120+ Years" />
        </div>
        <p className="mt-3 text-xs text-black/60">
          Figures per Franchise Disclosure Document (Item 19). Individual results
          vary. This is not an offer to sell a franchise.
        </p>
      </section>

      {/* ---------- STEPS ---------- */}
      <section id="steps" className="border-t border-black/5 bg-neutral-50 py-14">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-2xl font-semibold md:text-3xl">Steps to Ownership</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              "Request Info",
              "Meet Franchise Dev",
              "Review FDD",
              "Grand Opening",
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
          <div className="mt-8">
            <a
              href="#lead"
              className={btnPrimary}
              style={{ backgroundColor: BRONZE }}
            >
              Request Franchise Info
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
          <div className="flex gap-6 text-sm">
            <a className="hover:opacity-80" href="#why">
              Why Spavia
            </a>
            <a className="hover:opacity-80" href="#numbers">
              Numbers
            </a>
            <a className="hover:opacity-80" href="#steps">
              Steps
            </a>
          </div>
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
