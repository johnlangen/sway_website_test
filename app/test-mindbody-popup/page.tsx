"use client";

export default function TestMindbodyPopup() {
  const siteId = process.env.NEXT_PUBLIC_MINDBODY_SITE_ID;

  function openBillingPopup() {
    if (!siteId) {
      alert("NEXT_PUBLIC_MINDBODY_SITE_ID is missing");
      return;
    }

    const url =
      `https://clients.mindbodyonline.com/consumermyinfo/` +
      `?studioid=${siteId}` +
      `&tabID=2` +
      `&fl=true`;

    console.log("[TEST] Opening Mindbody Billing Info:", url);

    const popup = window.open(
      url,
      "mindbody_billing",
      "width=420,height=720,resizable=yes,scrollbars=yes"
    );

    if (!popup) {
      console.error("[TEST] Popup was blocked by the browser");
      alert("Popup blocked — allow popups and try again.");
      return;
    }

    popup.focus();
  }

  return (
    <div style={{ padding: 40, fontFamily: "monospace" }}>
      <h1>Mindbody Billing Popup Test</h1>

      <p>
        This opens the <strong>Billing Info</strong> tab on
        clients.mindbodyonline.com in a popup.
      </p>

      <button onClick={openBillingPopup} style={btn}>
        Open Billing Info Popup
      </button>

      <p style={{ marginTop: 24, fontSize: 14, opacity: 0.8 }}>
        After adding a card, close the popup and return here.
      </p>
    </div>
  );
}

const btn: React.CSSProperties = {
  padding: "12px 16px",
  fontSize: "16px",
  cursor: "pointer",
};
