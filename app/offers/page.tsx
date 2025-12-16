// app/offers/page.tsx
import ClientEntry from "./ClientEntry";

// metadata is handled in app/offers/layout.tsx
export default function Page() {
  return (
    <main className="min-h-screen bg-[#F7F4E9] text-[#113D33] font-vance">
      {/* Placeholder div for client hydration */}
      <div id="offers-hub-root" />
      {/* Mounts client code */}
      <ClientEntry />
    </main>
  );
}
