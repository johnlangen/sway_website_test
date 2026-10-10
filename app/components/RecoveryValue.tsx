"use client";
import { useState } from "react";

/** A marketing comparison only; no effect on plans, billing, or checkout. */
export default function RecoveryValue() {
  const [visits, setVisits] = useState(4);
  const dropIn = visits * 49;
  const difference = dropIn - 129;
  return (
    <section
      className="sway-value-comparison"
      aria-labelledby="recovery-value-heading"
    >
      <div>
        <p className="sway-eyebrow">A routine that adds up</p>
        <h2 id="recovery-value-heading">
          How often would
          <br />
          you like to reset?
        </h2>
        <p>
          Compare regular $49 drop-ins with a $129 monthly Remedy Lounge
          membership.
        </p>
        <fieldset>
          <legend>Visits per month</legend>
          <div>
            {[1, 2, 3, 4, 8, 12].map((n) => (
              <button
                key={n}
                type="button"
                aria-pressed={visits === n}
                onClick={() => setVisits(n)}
              >
                {n}
                <span className="sr-only">
                  {" "}
                  {n === 1 ? "visit" : "visits"} per month
                </span>
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="sway-value-result" aria-live="polite" aria-atomic="true">
        <div>
          <span>
            {visits} regular drop-in{visits === 1 ? "" : "s"}
          </span>
          <strong>${dropIn}</strong>
        </div>
        <div>
          <span>Monthly membership</span>
          <strong>$129</strong>
        </div>
        <p>
          {difference > 0 ? (
            <>
              That’s <b>${difference} less</b> with membership for {visits}{" "}
              visits.
            </>
          ) : (
            <>
              For {visits === 1 ? "one visit" : "two visits"}, regular drop-ins
              cost <b>${Math.abs(difference)} less</b>.
            </>
          )}
        </p>
        <small>
          Membership includes one 75-minute session per day. Monthly
          auto-renewal. Comparison uses regular drop-in pricing and excludes
          first-visit offers. Cancellation and freeze terms below.
        </small>
      </div>
    </section>
  );
}
