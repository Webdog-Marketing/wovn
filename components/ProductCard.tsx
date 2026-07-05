import Image from "next/image";
import type { ShopifyProduct } from "@/lib/shopify";

export default function ProductCard({ product }: { product: ShopifyProduct }) {
  const price = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: product.priceRange.minVariantPrice.currencyCode,
  }).format(Number(product.priceRange.minVariantPrice.amount));

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
      </div>
    </div>
  );
}
