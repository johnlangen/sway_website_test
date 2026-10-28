"use client";
import { useEffect, useState } from "react";
import type { IssuedGift as Gift } from "@/lib/giftCards/delivery";

const code = (c: string) => c.replace(/\s+/g, "").replace(/(.{4})(?=.)/g, "$1 ");

/** A purchased gift opened by its private link: the card, Download PDF and Print */
export default function IssuedGift({ slug, token }: { slug: string; token: string }) {
  const [gift, setGift] = useState<Gift | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const request = (action: string) =>
    fetch(`/api/gift-cards/${action}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, token }),
      cache: "no-store",
    });

  useEffect(() => {
    let active = true;
    request("gift")
      .then(async (r) => {
        const b = await r.json();
        if (!r.ok) throw Error(b.message || "This gift link isn't available.");
        if (active) setGift(b.gift);
      })
      .catch((e) => active && setError(e.message));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, token]);

  async function download() {
    setBusy(true);
    setError("");
    try {
      const r = await request("pdf");
      if (!r.ok) throw Error("The PDF isn't available right now. You can still print the gift below.");
      const url = URL.createObjectURL(await r.blob());
      const a = document.createElement("a");
      a.href = url;
      a.download = "Sway-gift-card.pdf";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-6" aria-label="Your gift card">
      {error && (
        <p role="alert" className="mb-4 rounded-xl border border-[#B4541B]/40 bg-white p-4 text-sm text-[#8a3b10]">
          {error}
        </p>
      )}
      {!gift ? (
        !error && <p role="status">Opening your gift…</p>
      ) : (
        <>
          <article id="sway-issued-gift" className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-15px_rgba(17,61,51,0.25)] print:shadow-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gift.image} alt="Gift card design" width={600} height={600} className="mx-auto block aspect-square w-full max-w-sm object-cover sm:mt-8 sm:rounded-xl" />
            <div className="p-6 text-center sm:p-10">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{gift.title}</h2>
              <p className="my-5 text-5xl font-semibold tracking-tight text-[#4A776D]">${gift.value.toFixed(2)}</p>
              <p>
                To {gift.recipient}
                <br />
                From {gift.sender}
              </p>
              {gift.message && <p className="mx-auto my-5 max-w-md whitespace-pre-wrap break-words italic leading-relaxed">“{gift.message}”</p>}
              <div className="mx-auto mt-8 max-w-sm rounded-xl bg-[#F7F4E9] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[#113D33]/75">Gift card number</p>
                <p className="mt-2 break-all font-mono text-2xl tracking-widest">{code(gift.barcode)}</p>
              </div>
              <p className="mt-5 text-sm text-[#113D33]/75">
                Give this number when you book or check in. Purchased at {gift.spa}, {gift.address}. Questions? {gift.phone}.
              </p>
              <p className="mt-6 whitespace-pre-line text-left text-[11px] leading-relaxed text-[#113D33]/75">{gift.terms}</p>
            </div>
          </article>
          <div className="mt-5 flex flex-wrap gap-3 print:hidden">
            <button
              type="button"
              disabled={busy}
              onClick={() => void download()}
              className="min-h-12 rounded-full bg-[#113D33] px-6 py-3 font-semibold text-white transition hover:bg-[#0c2a23] disabled:opacity-60"
            >
              {busy ? "Preparing PDF…" : "Download gift PDF"}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="min-h-12 rounded-full border border-[#113D33] px-6 py-3 font-semibold text-[#113D33] transition hover:bg-[#113D33]/5"
            >
              Print gift card
            </button>
          </div>
        </>
      )}
    </section>
  );
}
