/**
 * Sway's open jobs, read live from its Discovered hiring site (spaviasway.discovered.ai, company
 * 7684 "Sway by Spavia"; the same system the Spavia spas use). Found 10/29/2026 after the careers
 * page's old apply link (oc.spaviajobs.com) turned out to go nowhere. Cached an hour; if Discovered
 * can't be read, the page shows the hiring site link instead of an empty list.
 */
export const HIRING_SITE = "https://spaviasway.discovered.ai/";
const JOBS_API = "https://tht-api-discoveredats-v2-23a221eb374c.herokuapp.com/api/common/company/jobs?companyId=7684";

export type OpenJob = { id: string; title: string; city: string; state: string; url: string };

export async function openJobs(): Promise<OpenJob[] | null> {
  try {
    const res = await fetch(JOBS_API, { headers: { accept: "application/json" }, next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const rows: unknown = await res.json();
    if (!Array.isArray(rows)) return null;
    return rows.flatMap((r) => {
      const j = r as Record<string, unknown>;
      const url = String(j.job_url ?? "");
      if (!/^https:\/\/spaviasway\.discovered\.ai\//.test(url) || !j.jobpost_title) return [];
      return [
        {
          id: String(j.company_jobposting_id ?? url),
          title: String(j.jobpost_title).trim(),
          city: String(j.jobpost_city ?? "Denver").trim(),
          state: String(j.jobpost_state ?? "CO").trim(),
          url,
        },
      ];
    });
  } catch {
    return null;
  }
}
