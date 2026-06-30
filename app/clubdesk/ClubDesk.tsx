"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Front-desk migration dashboard (no-index, staff-only).
 * Pure lookup + check-off. The team finds a gift card / credit / card-to-collect
 * here, handles it in Mindbody themselves, then ticks the box so others know.
 */

type Done = Record<string, { done: boolean; by?: string; at?: string; note?: string }>;
type Tab = "giftcards" | "credits" | "cards" | "daypasses" | "attention" | "arrangements";

const TABS: { key: Tab; label: string }[] = [
  { key: "giftcards", label: "Gift Cards" },
  { key: "credits", label: "Credits" },
  { key: "daypasses", label: "Day Passes" },
  { key: "cards", label: "Cards to Collect" },
  { key: "attention", label: "Needs Attention" },
  { key: "arrangements", label: "Special Setups" },
];

// Plain-English explainer shown at the top of each tab.
const TAB_HELP: Record<Tab, { what: string; todo: string }> = {
  giftcards: {
    what: "Gift cards people bought in the old system (Mariana Tek) that have NOT been used yet.",
    todo: "When a guest wants to use one, find it by their name or the card number, see the dollar amount, then add that amount as a gift card on their account in Mindbody. Tick the box once it's added.",
  },
  credits: {
    what: "Drop-in customers who pre-paid for recovery or modality sessions in the old system (session packs, not memberships). These didn't carry over automatically.",
    todo: "When they come in to use a session, find them here, see how many they have left, then apply the session for them in Mindbody (no charge). Tick the box once it's applied.",
  },
  daypasses: {
    what: "Customers with unused All Access day passes from the old system. Each pass = one full day of access (sauna, cold plunge, etc.) + guests. PAID = they bought it. COMP = it was given free.",
    todo: "When they come in to use a day, find them here, confirm how many passes they have left, then apply a day's visit in Mindbody. Use the Paid/Comp filter — we honor Paid; Comp is optional. Tick the box once redeemed.",
  },
  cards: {
    what: "Members who are set up but have NO credit card on file — their membership payment will fail on the date shown if we don't get a card.",
    todo: "When they come in (or call them), collect a card and add it to their account in Mindbody. Start with the earliest dates. Tick the box once the card is on file.",
  },
  attention: {
    what: "Members who need follow-up. FROZEN = they paused their membership (not being charged right now). PAYMENT FAILURE = their card was declined and they may owe a balance.",
    todo: "Payment failure: ask for a new card and settle the amount owed in Mindbody. Frozen: no action unless they want to un-pause. Tick the box once handled.",
  },
  arrangements: {
    what: "Members whose billing was set up differently on purpose during the move to Sway. A special rate they keep, a year they already paid for, or a start date that is delayed on purpose. This is a reference so you know the story. There is nothing to redeem.",
    todo: "If one of these people asks why their rate or their charge looks different, check here first. It is intentional. Do NOT change their price to $99. Tick the box once you have confirmed their setup is correct in Mindbody.",
  },
};

export function ClubDesk() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [data, setData] = useState<{ giftcards: any[]; credits: any[]; cards: any[]; daypasses: any[]; attention: any[]; arrangements: any[]; done: Done }>({
    giftcards: [], credits: [], cards: [], daypasses: [], attention: [], arrangements: [], done: {},
  });
  const [tab, setTab] = useState<Tab>("giftcards");
  const [q, setQ] = useState("");
  const [hideDone, setHideDone] = useState(false);
  const [passFilter, setPassFilter] = useState<"all" | "paid" | "comp">("all");

  // pull secret from URL once
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("secret");
    if (s) { setSecret(s); load(s); }
  }, []);

  async function load(s: string) {
    setLoading(true); setErr(null);
    try {
      const r = await fetch(`/api/clubdesk?secret=${encodeURIComponent(s)}`);
      if (r.status === 401) { setErr("Wrong secret."); setAuthed(false); return; }
      if (!r.ok) { setErr(`Error ${r.status}`); return; }
      const d = await r.json();
      setData({ giftcards: d.giftcards || [], credits: d.credits || [], cards: d.cards || [], daypasses: d.daypasses || [], attention: d.attention || [], arrangements: d.arrangements || [], done: d.done || {} });
      setAuthed(true);
    } catch (e: any) { setErr(e.message || "Failed to load"); }
    finally { setLoading(false); }
  }

  async function toggle(field: string, done: boolean) {
    // optimistic
    setData((prev) => {
      const next = { ...prev.done };
      if (done) next[field] = { done: true, at: new Date().toISOString() };
      else delete next[field];
      return { ...prev, done: next };
    });
    await fetch(`/api/clubdesk?secret=${encodeURIComponent(secret)}&action=toggle`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ field, done }),
    }).catch(() => {});
  }

  const rows = useMemo(() => {
    const list = (data[tab] as any[]) || [];
    const needle = q.trim().toLowerCase();
    return list.filter((r) => {
      const hay = Object.values(r).join(" ").toLowerCase();
      if (needle && !hay.includes(needle)) return false;
      if (hideDone && data.done[`${tab}:${r.id}`]?.done) return false;
      if (tab === "daypasses" && passFilter !== "all" && r.type !== passFilter) return false;
      return true;
    });
  }, [data, tab, q, hideDone, passFilter]);

  const counts = useMemo(() => {
    const c: Record<Tab, { total: number; left: number }> = {
      giftcards: { total: 0, left: 0 }, credits: { total: 0, left: 0 }, cards: { total: 0, left: 0 }, daypasses: { total: 0, left: 0 }, attention: { total: 0, left: 0 }, arrangements: { total: 0, left: 0 },
    };
    for (const t of TABS) {
      const list = (data[t.key] as any[]) || [];
      c[t.key].total = list.length;
      c[t.key].left = list.filter((r) => !data.done[`${t.key}:${r.id}`]?.done).length;
    }
    return c;
  }, [data]);

  if (!authed) {
    return (
      <main className="min-h-screen bg-[#F7F4E9] text-[#113D33] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold mb-1">Club Desk</h1>
          <p className="text-sm opacity-70 mb-4">Staff access</p>
          <input
            type="password" value={secret} onChange={(e) => setSecret(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && load(secret)}
            placeholder="Secret" autoFocus
            className="w-full rounded-xl border border-[#113D33]/20 bg-white px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
          />
          <button onClick={() => load(secret)} disabled={loading || !secret}
            className="w-full py-3 rounded-xl bg-[#113D33] text-white font-semibold disabled:opacity-50">
            {loading ? "Checking…" : "Enter"}
          </button>
          {err && <p className="text-red-700 text-sm mt-3">{err}</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F4E9] text-[#113D33] px-4 sm:px-6 pt-24 sm:pt-28 pb-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl font-semibold">Club Desk</h1>
          <button onClick={() => load(secret)} className="text-sm underline underline-offset-4 opacity-70 hover:opacity-100">Refresh</button>
        </div>
        <p className="text-sm opacity-70 mb-4">Look it up, handle it in Mindbody, then check it off.</p>

        <div className="rounded-2xl border border-red-300 bg-red-50 text-red-800 px-4 py-3 mb-5 text-sm leading-relaxed">
          <span className="font-bold uppercase tracking-wide">Do not check off until it&apos;s resolved in Mindbody.</span>{" "}
          The checkbox only marks it handled for the team — it does <span className="font-semibold">not</span> apply anything
          in Mindbody. Look the person up here, add their gift card / credit / card in Mindbody first, then tick the box.
        </div>

        {/* tabs */}
        <div className="flex gap-1.5 mb-4 flex-wrap">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => { setTab(t.key); setQ(""); }}
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition ${tab === t.key ? "bg-[#113D33] text-white" : "bg-white border border-[#113D33]/15 hover:border-[#113D33]/40"}`}>
              {t.label} <span className={tab === t.key ? "text-white/60" : "opacity-50"}>· {counts[t.key].left}</span>
            </button>
          ))}
        </div>

        {/* what this tab is + what to do */}
        <div className="rounded-2xl bg-white border border-[#113D33]/12 px-4 py-3 mb-3 text-sm">
          <p className="text-[#113D33]">{TAB_HELP[tab].what}</p>
          <p className="mt-1.5 text-[#113D33]/75"><span className="font-semibold">What to do:</span> {TAB_HELP[tab].todo}</p>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, code…"
            className="flex-1 rounded-xl border border-[#113D33]/20 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#113D33]/30" />
          <label className="flex items-center gap-1.5 text-sm opacity-80 shrink-0">
            <input type="checkbox" checked={hideDone} onChange={(e) => setHideDone(e.target.checked)} /> Hide done
          </label>
        </div>

        {tab === "daypasses" && (
          <div className="flex items-center gap-1.5 mb-3">
            {([
              { key: "all", label: "All" },
              { key: "paid", label: "Paid" },
              { key: "comp", label: "Comp" },
            ] as const).map((f) => (
              <button key={f.key} onClick={() => setPassFilter(f.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${passFilter === f.key ? "bg-[#113D33] text-white" : "bg-white border border-[#113D33]/15 hover:border-[#113D33]/40"}`}>
                {f.label}
              </button>
            ))}
          </div>
        )}

        <div className="text-xs opacity-60 mb-2">{rows.length} shown · {counts[tab].left} of {counts[tab].total} left</div>

        <div className="space-y-2">
          {rows.map((r) => {
            const field = `${tab}:${r.id}`;
            const isDone = !!data.done[field]?.done;
            return (
              <div key={field} className={`rounded-2xl border p-3.5 flex items-start gap-3 transition ${isDone ? "bg-[#113D33]/5 border-[#113D33]/10 opacity-60" : "bg-white border-[#113D33]/12"}`}>
                <input type="checkbox" checked={isDone} onChange={(e) => toggle(field, e.target.checked)} className="mt-1 w-5 h-5 shrink-0 accent-[#113D33]" />
                <div className="flex-1 min-w-0">
                  <Row tab={tab} r={r} />
                </div>
              </div>
            );
          })}
          {rows.length === 0 && <p className="text-sm opacity-60 py-8 text-center">Nothing here.</p>}
        </div>
      </div>
    </main>
  );
}

function Row({ tab, r }: { tab: Tab; r: any }) {
  if (tab === "giftcards") {
    return (
      <>
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-semibold truncate">{r.recipient || r.name || "(no name)"}</span>
          <span className="font-bold shrink-0">${r.balance ?? r.value}</span>
        </div>
        <div className="text-xs opacity-70 mt-0.5">
          Code <span className="font-mono">{r.id}</span>{r.email ? ` · ${r.email}` : ""}{r.location ? ` · ${r.location}` : ""}
        </div>
      </>
    );
  }
  if (tab === "credits") {
    return (
      <>
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-semibold truncate">{r.name || "(no name)"}</span>
          <span className="font-bold shrink-0">{r.remaining} left</span>
        </div>
        <div className="text-xs opacity-70 mt-0.5">{r.package}{r.email ? ` · ${r.email}` : ""}{r.expires ? ` · exp ${r.expires}` : ""}{r.location ? ` · ${r.location}` : ""}</div>
      </>
    );
  }
  if (tab === "daypasses") {
    const isComp = String(r.type) === "comp";
    return (
      <>
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-semibold truncate">{r.name || "(no name)"}</span>
          <span className="font-bold shrink-0">{r.passes} {Number(r.passes) === 1 ? "pass" : "passes"}</span>
        </div>
        <div className="text-xs opacity-70 mt-0.5 flex items-center gap-1.5">
          <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${isComp ? "bg-[#B4541B]/15 text-[#B4541B]" : "bg-[#113D33]/10 text-[#113D33]"}`}>
            {isComp ? "COMP" : "PAID"}
          </span>
          <span>{r.email}{r.location ? ` · ${r.location}` : ""}</span>
        </div>
      </>
    );
  }
  if (tab === "attention") {
    const isFailure = String(r.status || "").toLowerCase().includes("fail");
    return (
      <>
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-semibold truncate">{r.name || "(no name)"}</span>
          <span className={`text-xs font-semibold shrink-0 ${isFailure ? "text-[#B4541B]" : "text-[#113D33]/60"}`}>
            {isFailure ? "Payment failure" : "Frozen"}{r.amountOwed && Number(r.amountOwed) > 0 ? ` · $${r.amountOwed} owed` : ""}
          </span>
        </div>
        <div className="text-xs opacity-70 mt-0.5">
          {r.email}{r.location ? ` · ${r.location}` : ""}{r.since ? ` · since ${r.since}` : ""}
        </div>
        {r.membership && <div className="text-xs opacity-50 mt-0.5">{r.membership}</div>}
      </>
    );
  }
  if (tab === "arrangements") {
    const kind = String(r.kind || "");
    return (
      <>
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-semibold truncate">{r.name || "(no name)"}</span>
          <span className="text-xs font-semibold shrink-0 text-[#113D33]/70">{r.detail}</span>
        </div>
        <div className="text-xs opacity-70 mt-0.5 flex items-center gap-1.5">
          {kind && <span className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold bg-[#113D33]/10 text-[#113D33]">{kind.toUpperCase()}</span>}
          <span className="truncate">{r.email}{r.location ? ` · ${r.location}` : ""}</span>
        </div>
        {r.note && <div className="text-xs opacity-70 mt-1 leading-relaxed">{r.note}</div>}
      </>
    );
  }
  // cards to collect
  return (
    <>
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-semibold truncate">{r.name || "(no name)"}</span>
        {r.startDate && <span className="text-xs font-semibold shrink-0 text-[#B4541B]">charges {r.startDate}</span>}
      </div>
      <div className="text-xs opacity-70 mt-0.5">{r.phone ? `${r.phone} · ` : ""}{r.email}{r.location ? ` · ${r.location}` : ""}{r.reason ? ` · ${r.reason}` : ""}</div>
    </>
  );
}
