import Image from "next/image";
import { getCheckoutUrl, type ShopifyProduct } from "@/lib/shopify";

export default function ProductCard({ product }: { product: ShopifyProduct }) {
  const price = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: product.priceRange.minVariantPrice.currencyCode,
  }).format(Number(product.priceRange.minVariantPrice.amount));

  const variant = product.variants.nodes[0];
  const checkoutUrl = variant ? getCheckoutUrl(variant.id) : null;

  return (
    <div className="group border border-border bg-surface">
      <div className="h-1 bg-thread" />
      <div className="relative aspect-square overflow-hidden bg-ground">
        {product.featuredImage && (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg uppercase tracking-wide text-ink">
          {product.title}
        </h3>
        <p className="mt-1 font-tag text-xs uppercase tracking-tag text-muted">
          {price}
        </p>

        {variant?.availableForSale && checkoutUrl ? (
          <a
            href={checkoutUrl}
            className="mt-4 block border border-thread px-4 py-2 text-center font-tag text-xs uppercase tracking-tag text-thread hover:bg-thread hover:text-ground"
          >
            Buy now
          </a>
        ) : (
          <p className="mt-4 font-tag text-xs uppercase tracking-tag text-muted">
            Sold out
          </p>
        )}
      </div>
    </div>
  );
}
