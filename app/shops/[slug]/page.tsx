import { notFound } from "next/navigation";
import StitchDivider from "@/components/StitchDivider";
import ProductCard from "@/components/ProductCard";
import { getAllClients, getClientBySlug } from "@/lib/airtable";
import { getCollectionByHandle } from "@/lib/shopify";

export async function generateStaticParams() {
  const clients = await getAllClients();
  return clients.map((c) => ({ slug: c.slug }));
}

export default async function ClubShopPage({
  params,
}: {
  params: { slug: string };
}) {
  const client = await getClientBySlug(params.slug);
  if (!client) notFound();

  const collection = await getCollectionByHandle(client.shopifyCollectionHandle);

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <p className="font-tag text-xs uppercase tracking-tag text-thread">
          {client.category}
        </p>
        <h1 className="mt-4 font-display text-4xl uppercase tracking-wide text-ink sm:text-5xl">
          {client.name}
        </h1>
        {client.heroCopy && (
          <p className="mt-6 max-w-xl text-lg text-muted">{client.heroCopy}</p>
        )}
      </section>

      <StitchDivider />

      <section className="mx-auto max-w-6xl px-6 py-14">
        {!collection || collection.products.nodes.length === 0 ? (
          <p className="text-muted">
            Products for this shop are coming soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {collection.products.nodes.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
