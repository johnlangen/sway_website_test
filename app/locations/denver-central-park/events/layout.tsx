import { clubEventsJsonLd, clubEventsMetadata } from "@/lib/clubEvents";

export const metadata = clubEventsMetadata("denver-central-park");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: clubEventsJsonLd("denver-central-park") }} />
      {children}
    </>
  );
}
