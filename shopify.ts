const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

async function shopifyFetch<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  if (!domain || !token) {
    throw new Error(
      "Missing NEXT_PUBLIC_SHOPIFY_DOMAIN or NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN env vars"
    );
  }

  const res = await fetch(`https://${domain}/api/2024-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    // Revalidate every 5 minutes so new products show up without a full redeploy
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Shopify Storefront API error: ${res.status}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(", "));
  }
  return json.data;
}

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  variants: {
    nodes: { id: string; availableForSale: boolean }[];
  };
};

export type ShopifyCollection = {
  title: string;
  description: string;
  products: { nodes: ShopifyProduct[] };
} | null;

const COLLECTION_QUERY = `
  query CollectionByHandle($handle: String!) {
    collection(handle: $handle) {
      title
      description
      products(first: 24) {
        nodes {
          id
          handle
          title
          description
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            nodes {
              id
              availableForSale
            }
          }
        }
      }
    }
  }
`;

export async function getCollectionByHandle(handle: string) {
  const data = await shopifyFetch<{ collection: ShopifyCollection }>(COLLECTION_QUERY, {
    handle,
  });
  return data.collection;
}

// The Storefront API returns variant IDs as global IDs, e.g. "gid://shopify/ProductVariant/1234567890".
// The cart permalink format Shopify checkout understands just needs the numeric part.
function numericVariantId(gid: string): string {
  return gid.split("/").pop() ?? gid;
}

// Builds a direct link straight to Shopify checkout for a single variant, quantity 1.
// checkoutDomain should be the Shopify-connected domain that still serves checkout,
// e.g. "shop.wovn.club" — set via NEXT_PUBLIC_SHOPIFY_CHECKOUT_DOMAIN.
export function getCheckoutUrl(variantId: string, quantity = 1): string {
  const checkoutDomain =
    process.env.NEXT_PUBLIC_SHOPIFY_CHECKOUT_DOMAIN || domain;
  return `https://${checkoutDomain}/cart/${numericVariantId(variantId)}:${quantity}`;
}

// Builds a link to the full Shopify product page — lets the customer pick a size,
// see all photos/variants, and browse the rest of the collection before buying.
// Uses the same Shopify-connected domain as checkout, since that's what actually
// serves Shopify's storefront theme.
export function getProductUrl(handle: string): string {
  const storefrontDomain =
    process.env.NEXT_PUBLIC_SHOPIFY_CHECKOUT_DOMAIN || domain;
  return `https://${storefrontDomain}/products/${handle}`;
}
