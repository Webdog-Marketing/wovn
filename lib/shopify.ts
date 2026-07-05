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
