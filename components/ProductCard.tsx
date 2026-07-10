import Image from "next/image";
import { getProductUrl, type ShopifyProduct } from "@/lib/shopify";

export default function ProductCard({ product }: { product: ShopifyProduct }) {
  const price = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: product.priceRange.minVariantPrice.currencyCode,
  }).format(Number(product.priceRange.minVariantPrice.amount));

  const variant = product.variants.nodes[0];
  const inStock = variant?.availableForSale ?? false;
  const productUrl = getProductUrl(product.handle);

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
        <div className="mt-1 flex items-center gap-2">
          <p className="font-tag text-xs uppercase tracking-tag text-muted">
            {price}
          </p>
          {!inStock && (
            <span className="font-tag text-xs uppercase tracking-tag text-muted">
              · Sold out
            </span>
          )}
        </div>

        
          href={productUrl}
          className="mt-4 block border border-thread px-4 py-2 text-center font-tag text-xs uppercase tracking-tag text-thread hover:bg-thread hover:text-ink"
        >
          View product
        </a>
      </div>
    </div>
  );
}
