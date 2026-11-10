import { clubEventsJsonLd, clubEventsMetadata } from "@/lib/clubEvents";

export const metadata = clubEventsMetadata("denver-larimer");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: clubEventsJsonLd("denver-larimer") }} />
      {children}
    </>
  );
}
