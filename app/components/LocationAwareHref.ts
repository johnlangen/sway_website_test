export type SelectedLocation = {
    slug?: string;
    name?: string;
    status?: string;
  };

  export function getSelectedLocation(): SelectedLocation | null {
    try {
      const raw = localStorage.getItem("sway_selected_location");
      if (!raw) return null;
      const loc = JSON.parse(raw);
      if (loc?.slug) return loc;
      return null;
    } catch {
      return null;
    }
  }

  const LOCATION_PATHS: Record<string, string[]> = {
    "denver-larimer": ["/book", "/massage", "/facials", "/sauna", "/cold-plunge", "/offers", "/gift-cards", "/membership"],
    "denver-rino": ["/book", "/offers", "/gift-cards", "/membership"],
    "denver-central-park": ["/book", "/offers", "/gift-cards", "/membership"],
  };

  export function resolveLocationHref(opts: {
    localPath: string;   // e.g. "/sauna"
    fallbackHref: string; // e.g. "/sauna"
  }): string {
    const loc = getSelectedLocation();
    // Only resolve to location subpages that actually exist for that
    // location; the clubs have no treatment pages, so anything off this
    // list falls back to the generic page instead of a 404.
    if (loc?.slug && loc.status === "open" && LOCATION_PATHS[loc.slug]?.includes(opts.localPath)) {
      return `/locations/${loc.slug}${opts.localPath}`;
    }
    return opts.fallbackHref;
  }
  