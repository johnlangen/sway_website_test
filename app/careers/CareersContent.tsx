import { SwayCurve } from "../components/SwayCurve";
import { HIRING_SITE, type OpenJob } from "@/lib/careers";

/**
 * Careers (rebuilt 10/29/2026, John: "it is a horrible page. the link goes nowhere"). Open roles
 * come live from Sway's Discovered hiring site (lib/careers.ts); the rest is the job content that
 * was here, minus treatments Sway doesn't offer (hot stone, body wraps, cupping).
 */
const PERKS = [
  {
    title: "Pay that rewards your skill",
    body: "Competitive pay per treatment, more for longer and advanced work like deep tissue, salt stone and sports massage, plus gratuity, bonuses and commissions.",
  },
  {
    title: "A real spa to work in",
    body: "Guests come for the full experience in Larimer Square: massages, facials, the Remedy Room recovery circuit and Aescape. Happy guests tip well and come back.",
  },
  {
    title: "Training and growth",
    body: "Paid in-house training, continuing education and room to grow with a spa that's expanding.",
  },
  {
    title: "A team that has your back",
    body: "A family culture built on respect, compassion and work/life balance, with flexible schedules.",
  },
];

const BENEFITS = [
  "W2 employee with liability insurance",
  "Higher pay for longer and more strenuous treatments",
  "Gratuity, bonuses, commissions and membership earnings",
  "Paid in-house training and continuing education",
  "Discounts on products and treatments, for you and your friends and family",
  "Flexible schedules with 10-minute turnovers between guests",
];

const REQUIREMENTS = [
  "An active Colorado massage therapy license",
  "Reliable, punctual and goal-driven",
  "A passion for guest service and wellness",
  "A team player with a can-do attitude",
];

function ApplyLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3 font-semibold transition ${
        light ? "bg-[#D7E5DD] text-[#113D33] hover:bg-white" : "bg-[#113D33] text-white hover:bg-[#0c2a23]"
      }`}
    >
      {children}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}

export default function CareersContent({ jobs }: { jobs: OpenJob[] | null }) {
  return (
    <div className="min-h-screen bg-[#F7F4E9] font-vance text-[#113D33]">
      {/* Hero */}
      <section className="sway-page-hero bg-[#113D33] px-6 pb-16 pt-32 text-center text-white md:pb-20 md:pt-40">
        <p className="text-sm uppercase tracking-[0.2em] text-[#D7E5DD]">Careers · Sway Larimer, Denver</p>
        <SwayCurve width={150} strokeWidth={2.2} animate className="mx-auto my-5 block text-white/85" />
        <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">Work at Sway</h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/80 md:text-lg">
          Join the team behind USA Today 10Best&apos;s #4 Best Day Spa in America, right in Larimer Square.
        </p>
        <div className="mt-8">
          <a
            href="#open-roles"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D7E5DD] px-7 py-3 font-semibold text-[#113D33] transition hover:bg-white"
          >
            See open roles
          </a>
        </div>
      </section>

      {/* Open roles */}
      <section id="open-roles" className="mx-auto max-w-4xl scroll-mt-28 px-6 py-16">
        <h2 className="text-center text-2xl font-semibold tracking-tight md:text-3xl">Open roles</h2>
        <SwayCurve width={120} strokeWidth={2.2} className="mx-auto mb-8 mt-4 block text-[#4A776D]" />
        {jobs && jobs.length > 0 ? (
          <ul className="space-y-3">
            {jobs.map((j) => (
              <li key={j.id} className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-[0_10px_30px_-15px_rgba(17,61,51,0.18)] sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{j.title}</h3>
                  <p className="mt-1 text-sm text-[#113D33]/75">
                    Sway Larimer · {j.city}, {j.state}
                  </p>
                </div>
                <ApplyLink href={j.url}>View &amp; apply</ApplyLink>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl bg-white p-6 text-center shadow-[0_10px_30px_-15px_rgba(17,61,51,0.18)]">
            <p className="leading-relaxed">See every current opening on our hiring site.</p>
            <div className="mt-5">
              <ApplyLink href={HIRING_SITE}>View open roles</ApplyLink>
            </div>
          </div>
        )}
        <p className="mt-6 text-center text-sm text-[#113D33]/75">
          Don&apos;t see your role? Email{" "}
          <a className="underline underline-offset-4" href="mailto:contact@swaywellnessspa.com?subject=Careers%20at%20Sway">
            contact@swaywellnessspa.com
          </a>{" "}
          and tell us about yourself.
        </p>
      </section>

      {/* Why Sway */}
      <section className="bg-[#EBE4D1] px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-semibold tracking-tight md:text-3xl">Why you&apos;ll love it here</h2>
          <SwayCurve width={120} strokeWidth={2.2} className="mx-auto mb-10 mt-4 block text-[#4A776D]" />
          <div className="grid gap-4 sm:grid-cols-2">
            {PERKS.map((p) => (
              <div key={p.title} className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_-15px_rgba(17,61,51,0.18)]">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-[#113D33]/80">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Massage therapists */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">For massage therapists</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-[#113D33]/80">
          Full-time and part-time, all experience levels. You&apos;ll offer our full massage menu, from the light-to-medium Signature Massage to deep
          tissue, salt stone, sports and maternity massage.
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold">Benefits</h3>
            <ul className="mt-3 space-y-2">
              {BENEFITS.map((b) => (
                <li key={b} className="flex gap-3 leading-relaxed">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4A776D]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">What we&apos;re looking for</h3>
            <ul className="mt-3 space-y-2">
              {REQUIREMENTS.map((r) => (
                <li key={r} className="flex gap-3 leading-relaxed">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4A776D]" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#113D33] px-6 py-16 text-center text-white">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Ready to join us?</h2>
        <p className="mx-auto mt-3 max-w-md text-white/80">Apply online in a few minutes. We&apos;ll be in touch.</p>
        <div className="mt-7">
          <ApplyLink href={jobs?.length === 1 ? jobs[0].url : HIRING_SITE} light>
            Apply now
          </ApplyLink>
        </div>
      </section>
    </div>
  );
}
