import { clubEventsJsonLd, clubEventsMetadata } from "@/lib/clubEvents";

export const metadata = clubEventsMetadata("denver-rino");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: clubEventsJsonLd("denver-rino") }} />
      {children}
    </>
  );
}
