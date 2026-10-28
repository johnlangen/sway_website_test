"use client";
/**
 * The native gift card checkout (lib/giftCards; the Spavia site's GiftCheckoutFlow, ported 10/28).
 * Steps: gift (amount + design) → delivery (who, message, when) → email → code → account (choose or
 * create) → payment → review (card fields for a new card, terms, consent) → done. Opening the
 * page with #gift=<token> shows that purchased gift instead.
 *
 * The card number is read from the form only at the moment of purchase, sent once to our server
 * (which hands it straight to Mindbody) and cleared from the form right away. Nothing about the
 * card is kept in this component's state.
 */
import { useEffect, useRef, useState } from "react";
import { useFlowTrack } from "@/lib/ops/client";
import { defaultGiftAmount, giftAmountOptions } from "@/lib/giftCards/amounts";
import { GIFT_ACTIVATION_NOTICE, GIFT_CARD_TERMS, MAX_GIFT } from "@/lib/giftCards/terms";
import { giftDate, giftDeliveryLabel, lastGiftDate, nextDay } from "@/lib/giftCards/schedule";
import type { GiftDetails, GiftProduct } from "@/lib/giftCards/catalog";
import type { GiftResult, GiftReview } from "@/lib/giftCards/checkout";
import GiftDesignPicker from "./GiftDesignPicker";
import IssuedGift from "./IssuedGift";

export type PublicGiftSite = {
  slug: string;
  name: string;
  phone: string;
  contactEmail: string;
  timezone: string;
  mindbodyUrl: string;
};

type Step = "loading" | "gift" | "delivery" | "email" | "code" | "profiles" | "profile" | "payment" | "review" | "done";
type Buyer = { id: string; firstName: string; lastName: string; hasCard: boolean; cardLastFour: string | null };

const button =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-[#113D33] px-7 py-3 font-semibold text-white transition hover:bg-[#0c2a23] disabled:opacity-60";
const link = "min-h-11 text-sm font-semibold underline underline-offset-4";
const field =
  "mt-1.5 w-full rounded-xl border border-[#113D33]/25 bg-white px-4 py-3 text-base text-[#113D33] focus:outline-none focus:ring-2 focus:ring-[#113D33]/40 aria-[invalid=true]:border-[#B4541B]";
const label = "block text-sm font-semibold";

const CARD_FIELDS = [
  ["holder", "Name on card", "cc-name", "sm:col-span-2"],
  ["number", "Card number", "cc-number", "sm:col-span-2"],
  ["month", "Expiration month (MM)", "cc-exp-month", ""],
  ["year", "Expiration year (YYYY)", "cc-exp-year", ""],
  ["cvv", "Security code", "cc-csc", ""],
  ["postalCode", "Billing ZIP code", "billing postal-code", ""],
  ["address", "Billing street address", "billing address-line1", "sm:col-span-2"],
  ["city", "City", "billing address-level2", ""],
  ["state", "State (2 letters)", "billing address-level1", ""],
] as const;

const money = (n: number) => `$${n.toFixed(2)}`;

export default function GiftCheckoutFlow({ site, paused = false }: { site: PublicGiftSite; paused?: boolean }) {
  const [step, setStep] = useState<Step>("loading");
  const [giftToken, setGiftToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [invalid, setInvalid] = useState<Record<string, string>>({});
  const [products, setProducts] = useState<GiftProduct[]>([]);
  const [customEntry, setCustomEntry] = useState(false);
  const [scheduled, setScheduled] = useState(false);
  const [self, setSelf] = useState(false);
  const [email, setEmail] = useState("");
  const [profiles, setProfiles] = useState<Buyer[]>([]);
  const [buyer, setBuyer] = useState<Buyer | null>(null);
  const [quote, setQuote] = useState<GiftReview | null>(null);
  const [result, setResult] = useState<GiftResult | null>(null);
  const [recovered, setRecovered] = useState(false);
  const [checkFeedback, setCheckFeedback] = useState("");
  const today = giftDate(site.timezone);
  const [details, setDetails] = useState<GiftDetails>({
    productId: 0,
    amount: 200,
    designId: 0,
    recipient: "",
    recipientEmail: "",
    sender: "",
    title: "A moment just for you",
    message: "",
    deliveryDate: today,
    payment: "new",
  });
  const heading = useRef<HTMLHeadingElement>(null);
  const product = products.find((p) => p.id === details.productId);
  const value = product ? (product.custom ? details.amount : product.value) : 0;
  useFlowTrack("gift", step, product ? String(product.custom ? "custom" : product.id) : null, error, step === "done" && result?.state === "purchased" ? result.amount : undefined);

  async function api<T>(action: string, data: Record<string, unknown> = {}): Promise<T> {
    let r: Response;
    try {
      r = await fetch(`/api/gift-cards/${action}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, slug: site.slug }),
        cache: "no-store",
      });
    } catch {
      throw Object.assign(new Error("Your connection dropped. Please try again."), { code: "network" });
    }
    let b: { message?: string; error?: string } & Record<string, unknown>;
    try {
      b = await r.json();
    } catch {
      throw Object.assign(new Error("The spa's system took too long to answer. Please try again in a minute."), { code: "network" });
    }
    if (!r.ok) throw Object.assign(new Error(b.message || "That didn't go through. Please try again."), { code: b.error });
    return b as T;
  }

  async function run(work: () => Promise<void>) {
    if (busy) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await work();
    } catch (e) {
      const code = e && typeof e === "object" && "code" in e ? String((e as { code: unknown }).code) : "";
      const message = e instanceof Error ? e.message : "Please try again.";
      if (code === "session") {
        setBuyer(null);
        setQuote(null);
        setStep("email");
      } else if ((code === "details" || code === "date") && step !== "delivery") {
        // A detail refused at payment lives on the delivery screen: go back there and say which
        setQuote(null);
        setStep("delivery");
      } else if ((code === "amount" || code === "design" || code === "product") && step !== "gift") {
        setQuote(null);
        setStep("gift");
      }
      setError(message);
    } finally {
      setBusy(false);
    }
  }

  /** Native checks with our own messages; returns false and marks the first bad field */
  function validate(form: HTMLFormElement) {
    const bad: Record<string, string> = {};
    for (const el of Array.from(form.elements)) {
      if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) || !el.name) continue;
      if (!el.checkValidity()) bad[el.name] = el.dataset.label ? `Please check ${el.dataset.label.toLowerCase()}.` : "Please check this field.";
    }
    setInvalid(bad);
    const first = Object.keys(bad)[0];
    if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
    return !first;
  }
  const fieldProps = (name: string, text: string) => ({
    name,
    id: `gift-${name}`,
    "data-label": text,
    "aria-invalid": invalid[name] ? true : undefined,
    "aria-describedby": invalid[name] ? `gift-${name}-error` : undefined,
  });
  const fieldError = (name: string) =>
    invalid[name] ? (
      <p id={`gift-${name}-error`} className="mt-1 text-sm text-[#8a3b10]">
        {invalid[name]}
      </p>
    ) : null;

  async function loadCatalog() {
    const r = await api<{ products: GiftProduct[] }>("catalog");
    const start = defaultGiftAmount(r.products);
    const p = r.products.find((x) => x.id === start?.productId) || r.products[0];
    if (!p) throw Error("Gift cards can't be bought online here right now. Please use the Mindbody link below.");
    setProducts(r.products);
    setDetails((d) => ({ ...d, productId: p.id, amount: start && !start.entry ? start.amount : p.price, designId: p.designs[0].id }));
    setStep("gift");
  }

  /** A purchase on this order already (a guest coming back): show it rather than selling again */
  async function checkStatus(fromCheckout: boolean) {
    const r = await api<{ result: GiftResult | null }>("status");
    if (fromCheckout && r.result?.state === "purchased") {
      await api("new");
      return false;
    }
    if (r.result) {
      setResult(r.result);
      setRecovered(!fromCheckout);
      setStep("done");
      return true;
    }
    return false;
  }

  async function choose(p: Buyer) {
    const r = await api<{ profile: Buyer }>("choose", { clientId: p.id });
    setBuyer(r.profile);
    setDetails((d) => ({ ...d, payment: r.profile.hasCard ? "stored" : "new", sender: d.sender || r.profile.firstName }));
    setStep("payment");
  }

  async function account() {
    if (await checkStatus(true)) return;
    const r = await api<{ email: string; profiles: Buyer[] }>("account");
    setEmail(r.email);
    setProfiles(r.profiles);
    if (r.profiles.length === 1) await choose(r.profiles[0]);
    else setStep(r.profiles.length ? "profiles" : "profile");
  }

  async function review() {
    const r = await api<{ quote: GiftReview }>("quote", {
      details: { ...details, recipientEmail: self ? email : details.recipientEmail, deliveryDate: scheduled ? details.deliveryDate : today },
    });
    setQuote(r.quote);
    setStep("review");
  }

  async function startOver() {
    await api("new");
    setResult(null);
    setQuote(null);
    setRecovered(false);
    setStep("gift");
  }

  // First load: a gift link, else the catalog (and any purchase already on this order)
  useEffect(() => {
    let active = true;
    const token = new URLSearchParams(window.location.hash.slice(1)).get("gift") || "";
    if (/^[a-f0-9]{64}$/.test(token)) {
      setGiftToken(token);
      setStep("done");
      return;
    }
    (async () => {
      if (paused) {
        // No new purchases: only a purchase already on this order (verified guests) can be shown
        try {
          if (active && (await checkStatus(false))) return;
        } catch {
          /* Not verified: nothing to show */
        }
        if (active) setStep("loading");
        return;
      }
      try {
        await loadCatalog();
        try {
          if (active) await checkStatus(false);
        } catch {
          /* Not verified yet: nothing to show */
        }
      } catch (e) {
        if (active) {
          setError(e instanceof Error ? e.message : "Please reload the page.");
          setStep("gift");
        }
      }
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [site.slug]);

  // Focus each step's heading (screen readers and keyboards land on the new step)
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView({ block: "start" });
  }, [step]);

  // A purchase Mindbody didn't answer: check by itself every 30 seconds (the server settles it)
  const waiting = step === "done" && (result?.state === "unconfirmed" || result?.state === "pending");
  const [waitedLong, setWaitedLong] = useState(false);
  useEffect(() => {
    if (!waiting) return;
    let tries = 0;
    const timer = window.setInterval(async () => {
      if (++tries === 20) setWaitedLong(true);
      if (tries > 40) return window.clearInterval(timer);
      try {
        const r = await api<{ result: GiftResult | null }>("status");
        setResult((prev) => r.result ?? (prev ? { state: "released", reference: prev.reference } : prev));
      } catch {
        /* next tick */
      }
    }, 30000);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waiting]);

  // GA4: a completed purchase (count-once is the server's job; this is for Google's reports)
  const pushed = useRef("");
  useEffect(() => {
    if (result?.state !== "purchased" || result.replay || recovered || pushed.current === result.reference) return;
    pushed.current = result.reference;
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: "gift_card_purchase_complete", value: result.amount, currency: "USD", gift_location: site.slug });
  }, [result, recovered, site.slug]);

  const titles: Record<Step, string> = {
    loading: paused ? `Gift cards at ${site.name}` : "Preparing your gift",
    gift: "Give the gift of wellness",
    delivery: "Make it personal",
    email: "Your email for the receipt",
    code: "Check your email",
    profiles: "Choose your account",
    profile: "A few details",
    payment: "How would you like to pay?",
    review: "Review your gift",
    done: giftToken ? "Your Sway gift card" : result?.state === "purchased" ? (recovered ? "Your earlier gift purchase" : "Your gift card is ready") : "Checking your purchase",
  };
  const progress = ["gift", "loading"].includes(step) ? 0 : step === "delivery" ? 1 : 2;

  const preview = product ? (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-15px_rgba(17,61,51,0.25)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.designs.find((d) => d.id === details.designId)?.image}
        alt="Your chosen design"
        width={600}
        height={600}
        className="block aspect-square w-full object-cover"
      />
      <div className="p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#4A776D]">{site.name}</p>
        <p className="mt-2 text-xl font-semibold tracking-tight">{details.title || "A moment just for you"}</p>
        <p className="my-3 text-4xl font-semibold tracking-tight">{Number.isFinite(value) && value > 0 ? money(value) : "Choose an amount"}</p>
        <p className="text-sm">
          To {details.recipient || "someone special"}
          <br />
          From {details.sender || "you"}
        </p>
        {details.message && <p className="mt-3 whitespace-pre-wrap break-words text-sm italic">“{details.message}”</p>}
        <p className="mt-4 border-t border-[#113D33]/10 pt-4 text-xs leading-relaxed text-[#113D33]/75">
          {giftDeliveryLabel(details.deliveryDate, scheduled)}. Print or download it anytime from its private link.
        </p>
      </div>
    </div>
  ) : null;

  return (
    <div className="min-h-screen bg-[#F7F4E9] px-4 pb-32 pt-28 font-vance text-[#113D33] md:pt-32">
      <style>{`@media print{body *{visibility:hidden}#sway-issued-gift,#sway-issued-gift *{visibility:visible}#sway-issued-gift{position:absolute;left:0;top:0;width:100%}}`}</style>
      <div className="mx-auto max-w-5xl">
        <a href={`/locations/${site.slug}/gift-cards/`} className="text-sm font-semibold underline underline-offset-4 print:hidden">
          ← Gift cards at {site.name}
        </a>

        {step !== "done" && (
          <ol aria-label="Checkout progress" className="mt-6 flex gap-6 text-sm print:hidden">
            {["Your gift", "Personalize", "Checkout"].map((name, i) => (
              <li
                key={name}
                aria-current={progress === i ? "step" : undefined}
                className={`border-b-2 pb-2 ${progress === i ? "border-[#113D33] font-semibold" : "border-transparent text-[#113D33]/75"}`}
              >
                <span aria-hidden="true">{progress > i ? "✓ " : `${i + 1}. `}</span>
                {name}
              </li>
            ))}
          </ol>
        )}

        <h1 ref={heading} tabIndex={-1} className="mt-6 text-3xl font-semibold tracking-tight outline-none md:text-5xl" style={{ scrollMarginTop: 120 }}>
          {titles[step]}
        </h1>

        {!["done", "loading"].includes(step) && product && (
          <details className="mt-5 rounded-2xl bg-white p-4 shadow-sm lg:hidden">
            <summary className="cursor-pointer text-sm font-semibold">
              Preview your gift · {Number.isFinite(value) && value > 0 ? money(value) : "choose an amount"}
            </summary>
            <div className="mt-4">{preview}</div>
          </details>
        )}

        <div className={`mt-6 ${!["done", "loading"].includes(step) ? "grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]" : "max-w-2xl"}`}>
          <div className="min-w-0">
            {notice && (
              <p role="status" className="mb-5 rounded-xl bg-[#D7E5DD] p-4 text-sm">
                {notice}
              </p>
            )}
            {error && (
              <div role="alert" className="mb-5 rounded-xl border border-[#B4541B]/40 bg-white p-4 text-sm text-[#8a3b10]">
                {error}
              </div>
            )}
            {step === "loading" &&
              (paused ? (
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <p className="leading-relaxed">Online gift cards are paused for a moment. You can still buy one through our Mindbody store, or call {site.name} at {site.phone}.</p>
                  <a href={site.mindbodyUrl} className={`${button} mt-5`}>
                    Buy a gift card on Mindbody
                  </a>
                </div>
              ) : (
                <p role="status">One moment…</p>
              ))}
            {giftToken && <IssuedGift slug={site.slug} token={giftToken} />}

            {step === "gift" && product && (
              <form
                noValidate
                className="space-y-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (validate(e.currentTarget)) setStep("delivery");
                }}
              >
                <fieldset>
                  <legend className="text-lg font-semibold">Choose an amount</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {giftAmountOptions(products).map((o) => {
                      const active = o.entry ? customEntry : !customEntry && o.productId === details.productId && o.amount === details.amount;
                      const p = products.find((x) => x.id === o.productId)!;
                      return (
                        <button
                          key={o.key}
                          type="button"
                          aria-pressed={active}
                          onClick={() => {
                            setCustomEntry(o.entry);
                            setDetails((d) => ({ ...d, productId: p.id, amount: o.entry ? (p.custom ? d.amount : p.price) : o.amount }));
                          }}
                          className={`min-h-12 rounded-full border px-5 py-2.5 font-semibold transition ${
                            active ? "border-[#113D33] bg-[#113D33] text-white" : "border-[#113D33]/20 bg-white hover:border-[#113D33]/50"
                          }`}
                        >
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                  {customEntry && product.custom && (
                    <div className="mt-4 max-w-xs">
                      <label htmlFor="gift-amount" className={label}>
                        Gift amount in dollars
                      </label>
                      <input
                        {...fieldProps("amount", "Gift amount")}
                        type="number"
                        inputMode="decimal"
                        min={1}
                        max={MAX_GIFT}
                        step="0.01"
                        required
                        value={Number.isFinite(details.amount) ? details.amount : ""}
                        onChange={(e) => setDetails((d) => ({ ...d, amount: e.target.value === "" ? NaN : Number(e.target.value) }))}
                        className={field}
                      />
                      <p className="mt-1.5 text-sm text-[#113D33]/75">Any amount from $1 to ${MAX_GIFT.toLocaleString("en-US")}.</p>
                      {fieldError("amount")}
                    </div>
                  )}
                  <p className="mt-3 text-sm text-[#113D33]/75">Good for massages, facials, Aescape and recovery, at any Sway.</p>
                </fieldset>
                <GiftDesignPicker designs={product.designs} selected={details.designId} onChange={(designId) => setDetails((d) => ({ ...d, designId }))} />
                <button className={`${button} w-full sm:w-auto`}>Personalize your gift →</button>
              </form>
            )}

            {step === "delivery" && (
              <form
                noValidate
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!validate(e.currentTarget)) return;
                  void run(async () => {
                    if (buyer) return setStep("payment");
                    try {
                      await account();
                    } catch {
                      setStep("email");
                    }
                  });
                }}
              >
                <label className="flex items-center gap-3 rounded-xl bg-white p-4">
                  <input type="checkbox" className="h-5 w-5 accent-[#113D33]" checked={self} onChange={(e) => setSelf(e.target.checked)} />
                  Send it to my own email so I can give it in person
                </label>
                {!self && (
                  <div>
                    <label htmlFor="gift-recipientEmail" className={label}>
                      Recipient’s email
                    </label>
                    <input
                      {...fieldProps("recipientEmail", "Recipient email")}
                      type="email"
                      required
                      maxLength={100}
                      autoComplete="off"
                      value={details.recipientEmail}
                      onChange={(e) => setDetails((d) => ({ ...d, recipientEmail: e.target.value }))}
                      className={field}
                    />
                    {fieldError("recipientEmail")}
                  </div>
                )}
                {(
                  [
                    ["recipient", "Recipient’s name", 50],
                    ["sender", "From (your name)", 50],
                    ["title", "Gift title", 50],
                  ] as const
                ).map(([key, text, max]) => (
                  <div key={key}>
                    <label htmlFor={`gift-${key}`} className={label}>
                      {text}
                    </label>
                    <input
                      {...fieldProps(key, text)}
                      required
                      maxLength={max}
                      value={details[key]}
                      onChange={(e) => setDetails((d) => ({ ...d, [key]: e.target.value }))}
                      className={field}
                    />
                    {fieldError(key)}
                  </div>
                ))}
                <div>
                  <label htmlFor="gift-message" className={label}>
                    Your message (optional)
                  </label>
                  <textarea
                    {...fieldProps("message", "Your message")}
                    rows={3}
                    maxLength={300}
                    value={details.message}
                    onChange={(e) => setDetails((d) => ({ ...d, message: e.target.value }))}
                    className={field}
                  />
                  <p className="mt-1 text-xs text-[#113D33]/75">{300 - details.message.length} characters left</p>
                </div>
                <fieldset className="border-t border-[#113D33]/10 pt-5">
                  <legend className="text-lg font-semibold">When should it arrive?</legend>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {[false, true].map((later) => (
                      <label
                        key={String(later)}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${scheduled === later ? "border-[#113D33] bg-[#D7E5DD]/60" : "border-[#113D33]/20 bg-white"}`}
                      >
                        <input
                          type="radio"
                          name="schedule"
                          className="h-5 w-5 accent-[#113D33]"
                          checked={scheduled === later}
                          onChange={() => {
                            setScheduled(later);
                            setDetails((d) => ({ ...d, deliveryDate: later ? (d.deliveryDate > today ? d.deliveryDate : nextDay(today)) : today }));
                          }}
                        />
                        {later ? "Pick a date" : "Send it now"}
                      </label>
                    ))}
                  </div>
                  {scheduled && (
                    <div className="mt-4 max-w-xs">
                      <label htmlFor="gift-deliveryDate" className={label}>
                        Delivery date
                      </label>
                      <input
                        {...fieldProps("deliveryDate", "Delivery date")}
                        type="date"
                        required
                        min={nextDay(today)}
                        max={lastGiftDate(site.timezone)}
                        value={details.deliveryDate}
                        onChange={(e) => setDetails((d) => ({ ...d, deliveryDate: e.target.value }))}
                        className={field}
                      />
                      <p className="mt-1.5 text-sm text-[#113D33]/75">Sent at 9 a.m. Mountain time, up to 29 days ahead. Your receipt comes today.</p>
                      {fieldError("deliveryDate")}
                    </div>
                  )}
                </fieldset>
                <p className="text-sm text-[#113D33]/75">{GIFT_ACTIVATION_NOTICE}</p>
                <button disabled={busy} className={`${button} w-full sm:w-auto`}>
                  Continue to checkout →
                </button>
              </form>
            )}

            {step === "email" && (
              <form
                noValidate
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (validate(e.currentTarget))
                    void run(async () => {
                      await api("begin", { email });
                      setStep("code");
                    });
                }}
              >
                <p className="leading-relaxed text-[#113D33]/80">
                  No password needed. We’ll send a 6-digit code to confirm it’s you, then use your {site.name} account (or set one up) for the purchase.
                </p>
                <div>
                  <label htmlFor="gift-email" className={label}>
                    Your email
                  </label>
                  <input
                    {...fieldProps("email", "Your email")}
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={field}
                  />
                  {fieldError("email")}
                </div>
                <button disabled={busy} className={button}>
                  Send my code
                </button>
              </form>
            )}

            {step === "code" && (
              <form
                noValidate
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!validate(e.currentTarget)) return;
                  const code = String(new FormData(e.currentTarget).get("code") || "");
                  void run(async () => {
                    await api("verify", { code });
                    await account();
                  });
                }}
              >
                <p>
                  Enter the 6-digit code we sent to <strong>{email}</strong>. It can take a minute to arrive.
                </p>
                <div className="max-w-xs">
                  <label htmlFor="gift-code" className={label}>
                    Verification code
                  </label>
                  <input
                    {...fieldProps("code", "Verification code")}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                    className={`${field} text-center text-2xl tracking-[0.4em]`}
                  />
                  {fieldError("code")}
                </div>
                <div className="flex flex-wrap items-center gap-5">
                  <button disabled={busy} className={button}>
                    Verify & continue
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    className={link}
                    onClick={() =>
                      void run(async () => {
                        await api("begin", { email });
                        setNotice("A new code is on its way.");
                      })
                    }
                  >
                    Send a new code
                  </button>
                  <button type="button" disabled={busy} className={link} onClick={() => setStep("email")}>
                    Use a different email
                  </button>
                </div>
              </form>
            )}

            {step === "profiles" && (
              <div className="space-y-3">
                <p className="text-[#113D33]/80">You have more than one account at {site.name}. Which one should this purchase go on?</p>
                {profiles.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    disabled={busy}
                    onClick={() => void run(() => choose(p))}
                    className="block w-full rounded-2xl border border-[#113D33]/20 bg-white p-5 text-left transition hover:border-[#113D33]/60 disabled:opacity-60"
                  >
                    <span className="font-semibold">
                      {p.firstName} {p.lastName}
                    </span>
                    <span className="mt-1 block text-sm text-[#113D33]/75">{p.hasCard ? `Saved card ending in ${p.cardLastFour}` : "No saved card"}</span>
                  </button>
                ))}
              </div>
            )}

            {step === "profile" && (
              <form
                noValidate
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!validate(e.currentTarget)) return;
                  const f = new FormData(e.currentTarget);
                  void run(async () => {
                    let r: { profile: Buyer };
                    try {
                      r = await api<{ profile: Buyer }>("profile", {
                        profile: { firstName: f.get("firstName"), lastName: f.get("lastName"), mobilePhone: f.get("mobilePhone") },
                      });
                    } catch (err) {
                      // The account was created after all (Mindbody can answer an error after writing it): pick it
                      if (err && typeof err === "object" && "code" in err && (err as { code: unknown }).code === "account_exists") {
                        await account();
                        setNotice("We found your account. You’re all set to continue.");
                        return;
                      }
                      throw err;
                    }
                    setBuyer(r.profile);
                    setDetails((d) => ({ ...d, payment: "new", sender: d.sender || r.profile.firstName }));
                    setStep("payment");
                  });
                }}
              >
                <p className="leading-relaxed text-[#113D33]/80">
                  We’ll set up your {site.name} guest account with {email} to record the purchase. No password needed.
                </p>
                <div className="grid gap-5 sm:grid-cols-2">
                  {(
                    [
                      ["firstName", "First name", "given-name", "text"],
                      ["lastName", "Last name", "family-name", "text"],
                      ["mobilePhone", "Mobile number", "tel", "tel"],
                    ] as const
                  ).map(([key, text, complete, type]) => (
                    <div key={key} className={key === "mobilePhone" ? "sm:col-span-2" : ""}>
                      <label htmlFor={`gift-${key}`} className={label}>
                        {text}
                      </label>
                      <input
                        {...fieldProps(key, text)}
                        type={type}
                        autoComplete={complete}
                        required
                        maxLength={key === "mobilePhone" ? 20 : 40}
                        minLength={key === "mobilePhone" ? 10 : 1}
                        className={field}
                      />
                      {fieldError(key)}
                    </div>
                  ))}
                </div>
                <button disabled={busy} className={button}>
                  Continue to payment →
                </button>
              </form>
            )}

            {step === "payment" && buyer && (
              <div className="space-y-5">
                <p className="text-sm text-[#113D33]/75">
                  Receipt to {email} · {buyer.firstName} {buyer.lastName}
                </p>
                <fieldset className="space-y-3">
                  <legend className="sr-only">Payment method</legend>
                  {buyer.hasCard && (
                    <label
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-5 ${details.payment === "stored" ? "border-[#113D33] bg-[#D7E5DD]/60" : "border-[#113D33]/20 bg-white"}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        className="h-5 w-5 accent-[#113D33]"
                        checked={details.payment === "stored"}
                        onChange={() => setDetails((d) => ({ ...d, payment: "stored" }))}
                      />
                      Saved card ending in {buyer.cardLastFour}
                    </label>
                  )}
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-5 ${details.payment === "new" ? "border-[#113D33] bg-[#D7E5DD]/60" : "border-[#113D33]/20 bg-white"}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      className="h-5 w-5 accent-[#113D33]"
                      checked={details.payment === "new"}
                      onChange={() => setDetails((d) => ({ ...d, payment: "new" }))}
                    />
                    A new credit or debit card
                  </label>
                </fieldset>
                <p className="text-sm text-[#113D33]/75">Nothing is charged until you confirm on the next screen.</p>
                <div className="flex flex-wrap items-center gap-5">
                  <button type="button" disabled={busy} className={button} onClick={() => void run(review)}>
                    Review my gift →
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    className={link}
                    onClick={() => {
                      setBuyer(null);
                      setStep("email");
                    }}
                  >
                    Use a different email
                  </button>
                </div>
              </div>
            )}

            {step === "review" && quote && (
              <form
                noValidate
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  if (!validate(form)) return;
                  const data = new FormData(form);
                  const card =
                    quote.payment === "new" ? Object.fromEntries(CARD_FIELDS.map(([key]) => [key, String(data.get(`card-${key}`) || "")])) : undefined;
                  // The card number and code leave the form as soon as they're read
                  for (const key of ["number", "cvv"]) {
                    const el = form.elements.namedItem(`card-${key}`);
                    if (el instanceof HTMLInputElement) el.value = "";
                  }
                  void run(async () => {
                    let r: { result: GiftResult };
                    try {
                      r = await api<{ result: GiftResult }>("commit", { quoteId: quote.id, accepted: true, card });
                    } catch (err) {
                      // No answer, or our server failed: the charge may still be going through. If a
                      // purchase was recorded, show its checking screen instead of inviting a second one
                      const code = err && typeof err === "object" && "code" in err ? String((err as { code: unknown }).code) : "";
                      if (code && code !== "network" && code !== "unavailable") throw err;
                      const s = await api<{ result: GiftResult | null }>("status").catch(() => undefined);
                      if (s === undefined) r = { result: { state: "pending", reference: "your gift purchase" } };
                      else if (!s.result) throw err;
                      else r = { result: s.result };
                    }
                    setRecovered(false);
                    setResult(r.result);
                    setStep("done");
                  });
                }}
              >
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <p className="text-lg font-semibold">{quote.title}</p>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt>Gift card value</dt>
                      <dd>{money(quote.value)}</dd>
                    </div>
                    <div className="flex justify-between gap-4 text-base font-semibold">
                      <dt>Charged today</dt>
                      <dd>{money(quote.amount)}</dd>
                    </div>
                    <div>
                      <dt className="text-[#113D33]/75">Payment</dt>
                      <dd>{quote.payment === "new" ? "New card (enter it below)" : `Saved card ending in ${quote.cardLastFour}`}</dd>
                    </div>
                    <div>
                      <dt className="text-[#113D33]/75">To</dt>
                      <dd className="break-words">
                        {quote.recipient} · {quote.recipientEmail}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#113D33]/75">From</dt>
                      <dd>{quote.sender}</dd>
                    </div>
                    <div>
                      <dt className="text-[#113D33]/75">Delivery</dt>
                      <dd>{giftDeliveryLabel(quote.deliveryDate, quote.deliveryDate !== today)}</dd>
                    </div>
                    <div>
                      <dt className="text-[#113D33]/75">Issued by</dt>
                      <dd>{site.name}</dd>
                    </div>
                  </dl>
                  {quote.message && <p className="mt-4 whitespace-pre-line text-sm italic">“{quote.message}”</p>}
                </div>

                {quote.payment === "new" && (
                  <fieldset disabled={busy} className="grid gap-4 rounded-2xl bg-white p-6 shadow-sm sm:grid-cols-2">
                    <legend className="px-1 text-lg font-semibold">Card details</legend>
                    <p className="text-sm text-[#113D33]/75 sm:col-span-2">
                      Charged once by {site.name} and not saved. American Express uses the 4-digit code on the front.
                    </p>
                    {CARD_FIELDS.map(([key, text, complete, span]) => (
                      <div key={key} className={span}>
                        <label htmlFor={`gift-card-${key}`} className={label}>
                          {text}
                        </label>
                        <input
                          {...fieldProps(`card-${key}`, text)}
                          type={key === "cvv" ? "password" : "text"}
                          autoComplete={complete}
                          required
                          inputMode={["number", "month", "year", "cvv", "postalCode"].includes(key) ? "numeric" : undefined}
                          maxLength={key === "cvv" || key === "year" ? 4 : key === "month" || key === "state" ? 2 : key === "number" ? 23 : key === "postalCode" ? 10 : 100}
                          pattern={
                            key === "cvv" ? "[0-9]{3,4}" : key === "month" ? "0?[1-9]|1[0-2]" : key === "year" ? "[0-9]{4}" : key === "state" ? "[A-Za-z]{2}" : key === "postalCode" ? "[0-9]{5}(-[0-9]{4})?" : undefined
                          }
                          className={field}
                        />
                        {fieldError(`card-${key}`)}
                      </div>
                    ))}
                  </fieldset>
                )}

                <details className="rounded-2xl bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer font-semibold">Gift card terms</summary>
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed">
                    {GIFT_ACTIVATION_NOTICE}
                    {"\n\n"}
                    {GIFT_CARD_TERMS}
                    {quote.product.terms ? `\n\n${quote.product.terms}` : ""}
                  </p>
                </details>

                <div>
                  <label className="flex items-start gap-3 text-sm leading-relaxed">
                    <input {...fieldProps("accepted", "the terms checkbox")} type="checkbox" required className="mt-0.5 h-5 w-5 shrink-0 accent-[#113D33]" />
                    I agree to the gift card terms and authorize a {money(quote.amount)} charge to my card, and the gift email to {quote.recipientEmail}.
                  </label>
                  {fieldError("accepted")}
                </div>

                <div className="flex flex-wrap items-center gap-5">
                  <button disabled={busy} className={`${button} w-full sm:w-auto`}>
                    {busy ? "Purchasing…" : `${quote.deliveryDate !== today ? "Schedule my gift" : "Send my gift"} · ${money(quote.amount)}`}
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    className={link}
                    onClick={() => {
                      setQuote(null);
                      setStep("gift");
                    }}
                  >
                    Edit gift
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    className={link}
                    onClick={() => {
                      setQuote(null);
                      setStep("payment");
                    }}
                  >
                    Change payment
                  </button>
                </div>
              </form>
            )}

            {step === "done" && result && (
              <section className="rounded-2xl bg-white p-6 shadow-sm">
                {recovered && result.state === "purchased" && (
                  <div className="mb-6 rounded-xl bg-[#D7E5DD]/60 p-5" role="status">
                    <p className="font-semibold">This is a gift you already bought.</p>
                    <p className="mt-1 text-sm leading-relaxed">Opening it didn’t charge you again. Want to send another one?</p>
                    <button type="button" disabled={busy} className={`${button} mt-4`} onClick={() => void run(startOver)}>
                      Send another gift
                    </button>
                  </div>
                )}
                <div role="status" aria-live="polite" aria-atomic="true">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {result.state === "purchased"
                      ? `${money(result.value ?? result.amount ?? 0)} gift card purchased`
                      : result.state === "released"
                        ? "Nothing was charged"
                        : "We’re checking your purchase"}
                  </h2>
                  <p className="mt-3 leading-relaxed">
                    {result.state === "purchased"
                      ? "Thank you! Your gift is ready. You can download or print it below anytime."
                      : result.state === "released"
                        ? "The spa’s system didn’t answer in time, so this purchase didn’t go through and your card wasn’t charged. You can buy your gift again now."
                        : "The spa’s system didn’t answer in time, so we’re checking whether your purchase went through. Please don’t buy again yet. This page checks by itself, usually within a few minutes."}
                  </p>
                </div>
                {result.state === "released" && (
                  <button type="button" disabled={busy} className={`${button} mt-5`} onClick={() => void run(startOver)}>
                    Buy your gift again
                  </button>
                )}
                {result.delivery && <p className="mt-4">{result.delivery}</p>}
                {result.buyerReceipt && <p className="mt-2 text-sm">{result.buyerReceipt}</p>}
                {result.saleId && <p className="mt-2 text-sm">Order number: {result.saleId}</p>}
                {waiting && waitedLong && (
                  <p className="mt-4 text-sm" role="status">
                    Still checking after 10 minutes. Please don’t buy again: call {site.name} at {site.phone} with reference {result.reference} and we’ll sort it out.
                  </p>
                )}
                {(result.state === "unconfirmed" || result.state === "pending" || result.deliveryCheckNeeded) && (
                  <button
                    type="button"
                    disabled={busy}
                    className={`${button} mt-5`}
                    onClick={() =>
                      void run(async () => {
                        const before = `${result.state}:${result.deliveryCheckNeeded ? 1 : 0}`;
                        const r = await api<{ result: GiftResult | null }>("status");
                        const next = r.result ?? (result.state !== "purchased" ? { state: "released" as const, reference: result.reference } : result);
                        setResult(next);
                        setCheckFeedback(`${next.state}:${next.deliveryCheckNeeded ? 1 : 0}` === before ? "Checked just now. Nothing has changed yet." : "Updated.");
                      })
                    }
                  >
                    {result.state === "purchased" ? "Check email delivery" : "Check purchase status"}
                  </button>
                )}
                {checkFeedback && (
                  <p className="mt-2 text-sm" role="status">
                    {checkFeedback}
                  </p>
                )}
                <p className="mt-5 break-all text-xs text-[#113D33]/75">Reference: {result.reference}</p>
                {result.giftToken && <IssuedGift slug={site.slug} token={result.giftToken} />}
                {result.state === "purchased" && !recovered && (
                  <button type="button" disabled={busy} className={`${link} mt-6 block`} onClick={() => void run(startOver)}>
                    Send another gift
                  </button>
                )}
              </section>
            )}
          </div>

          {!["done", "loading"].includes(step) && product && (
            <aside className="hidden self-start lg:sticky lg:top-28 lg:block" aria-label="Your gift preview">
              {preview}
            </aside>
          )}
        </div>

        {!["gift", "done", "loading"].includes(step) && (
          <button
            type="button"
            disabled={busy}
            className={`${link} mt-6 print:hidden`}
            onClick={() => {
              setError("");
              setQuote(null);
              setStep("gift");
            }}
          >
            ← Edit your gift
          </button>
        )}
        <p role="status" aria-live="polite" className="sr-only">
          {busy ? "One moment…" : ""}
        </p>
        <p className="mt-10 text-sm text-[#113D33]/80 print:hidden">
          <a className="underline underline-offset-4" href={site.mindbodyUrl} target="_blank" rel="noopener noreferrer">
            Prefer to buy through Mindbody?<span className="sr-only"> (opens in new tab)</span>
          </a>
          <br />
          Questions? Call {site.name} at{" "}
          <a className="underline underline-offset-4" href={`tel:${site.phone.replace(/\D/g, "")}`}>
            {site.phone}
          </a>{" "}
          or email{" "}
          <a className="underline underline-offset-4" href={`mailto:${site.contactEmail}`}>
            {site.contactEmail}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
