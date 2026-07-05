import Link from "next/link";
import StitchDivider from "@/components/StitchDivider";
import { getAllClients, type ClientRecord } from "@/lib/airtable";

async function getClientsSafely(): Promise<ClientRecord[]> {
  try {
    return await getAllClients();
  } catch {
    // Airtable isn't wired up yet in this environment — fail soft so the page still renders.
    return [];
  }
}

export default async function HomePage() {
  const clients = await getClientsSafely();

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16">
        <p className="font-tag text-xs uppercase tracking-tag text-thread">
          Webdog Sports Marketing
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl uppercase leading-[1.05] tracking-wide text-ink sm:text-6xl">
          Woven for those who play bigger than they are
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          WVN builds bespoke sportswear for federations, clubs and teams who
          refuse to be defined by their size. No off-the-shelf templates. No
          compromise on craft.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/shops"
            className="border border-thread px-6 py-3 font-tag text-xs uppercase tracking-tag text-thread hover:bg-thread hover:text-ground"
          >
            Browse club shops
          </Link>
          <Link
            href="/enquire"
            className="px-6 py-3 font-tag text-xs uppercase tracking-tag text-muted hover:text-ink"
          >
            Start a project
          </Link>
        </div>
      </section>

      <StitchDivider />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="max-w-2xl text-lg leading-relaxed text-ink">
          Every kit tells a story. We work thread by thread, brief by brief,
          weaving identity into every stitch — just a kit that carries the
          ambition of the people wearing it.
        </p>
      </section>

      <StitchDivider />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl uppercase tracking-wide text-ink">
          Club shops
        </h2>
        {clients.length === 0 ? (
          <p className="mt-4 text-muted">
            Club shops will appear here once they&apos;re added in Airtable.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {clients.map((client) => (
              <Link
                key={client.slug}
                href={`/shops/${client.slug}`}
                className="group border border-border bg-surface p-6"
              >
                <p className="font-tag text-xs uppercase tracking-tag text-thread">
                  {client.category}
                </p>
                <h3 className="mt-2 font-display text-xl uppercase tracking-wide text-ink group-hover:text-thread">
                  {client.name}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
