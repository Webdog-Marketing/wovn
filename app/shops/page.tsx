import Link from "next/link";
import { getAllClients } from "@/lib/airtable";

export const metadata = { title: "Club shops — WOVN" };

export default async function ShopsIndexPage() {
  const clients = await getAllClients();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-4xl uppercase tracking-wide text-ink">
        Club shops
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Every organisation we work with gets its own shop. Pick one below.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {clients.map((client) => (
          <Link
            key={client.slug}
            href={`/shops/${client.slug}`}
            className="group border border-border bg-surface p-6"
          >
            <div className="h-1 w-10 bg-thread" />
            <p className="mt-4 font-tag text-xs uppercase tracking-tag text-muted">
              {client.category}
            </p>
            <h2 className="mt-2 font-display text-xl uppercase tracking-wide text-ink group-hover:text-thread">
              {client.name}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  );
}
