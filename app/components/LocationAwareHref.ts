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

  export function resolveLocationHref(opts: {
    localPath: string;   // e.g. "/sauna"
    fallbackHref: string; // e.g. "/sauna"
  }): string {
    const loc = getSelectedLocation();
    // Only resolve to location-specific paths for open locations;
    // coming-soon locations don't have booking/treatment subpages yet.
    if (loc?.slug && loc.status === "open") return `/locations/${loc.slug}${opts.localPath}`;
    return opts.fallbackHref;
  }
  