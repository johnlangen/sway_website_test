/**
 * Post-booking cross-sell click ("Add another service" / "Complete your
 * visit" buttons on the booking confirmation screens).
 *
 * booking_flow = the flow the guest just booked in; cross_sell_target = the
 * button they tapped. Whether the click turned into a second booking is read
 * from that flow's own *_booking_complete event in the same GA4 session (or
 * Mindbody: same booker stamped twice within the hour).
 */
export type CrossSellTarget =
  | "brady"
  | "aescape"
  | "remedy_room"
  | "remedy_lounge"
  | "massage_facial"
  | "another_session"
  | "membership"
  // featured "complete your visit" cards on the /book confirmation
  | "aescape_warmup"
  | "remedy_room_after"
  | "facial_same_day"
  | "massage_same_day"
  // /book time step: Aescape times offered on a full or thin massage/facial day
  | "aescape_fallback";

export function trackCrossSell(bookingFlow: string, target: CrossSellTarget) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "booking_cross_sell_click",
    booking_flow: bookingFlow,
    cross_sell_target: target,
  });
}
