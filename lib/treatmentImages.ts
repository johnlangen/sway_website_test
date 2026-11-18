/**
 * Mood/texture photo per massage type (oil bottle, dark stones, pink salt, cork roller, mint water,
 * maternity). Used for the treatment cards and the selected-treatment banner in the Larimer /book
 * flow and the club flow (ClubServiceFlow). Facials have no per-treatment shots yet.
 */
export function treatmentImage(name: string): string | null {
  const n = name.toLowerCase();
  if (n.includes("signature")) return "/assets/treatments/signature.jpg";
  if (n.includes("maternity")) return "/assets/treatments/maternity.jpg";
  if (n.includes("deep tissue")) return "/assets/treatments/deep-tissue.jpg";
  if (n.includes("salt stone")) return "/assets/treatments/salt-stone.jpg";
  if (n.includes("sports")) return "/assets/treatments/sports.jpg";
  if (n.includes("lymphatic")) return "/assets/treatments/lymphatic.jpg";
  return null;
}

/** Banner photo for the treatment a guest picked (John 11/18: per-treatment instead of one massage shot). */
export function treatmentBanner(category: "massage" | "facial", name: string | undefined | null): string {
  if (category === "facial") return "/assets/facialExperiences.jpg";
  return (name && treatmentImage(name)) || "/assets/massage2.jpg";
}
