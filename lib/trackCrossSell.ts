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
  | "membership";

export function trackCrossSell(bookingFlow: string, target: CrossSellTarget) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "booking_cross_sell_click",
    booking_flow: bookingFlow,
    cross_sell_target: target,
  });
}
