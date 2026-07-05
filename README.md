# WVN website

Next.js (App Router) site for WVN. Shopify is the source of truth for
products and collections. Airtable holds the marketing copy for each
club shop and stores enquiry form submissions.

## Setup

```bash
npm install
cp .env.example .env.local
# fill in .env.local with your real values
npm run dev
```

## Airtable schema

Create a base with two tables:

### `Clients`

| Field                        | Type            | Notes                                   |
| ----------------------------- | --------------- | ---------------------------------------- |
| Name                          | Single line text| e.g. "Edukid"                            |
| Slug                          | Single line text| e.g. "edukid" — used in the page URL     |
| Category                      | Single line text| e.g. "Business · Charity"                |
| Shopify collection handle      | Single line text| the collection handle in Shopify         |
| Hero copy                     | Long text       | shown at the top of the club shop page   |
| Hero image URL                | URL             | optional                                 |

### `Enquiries`

| Field              | Type              |
| ------------------- | ----------------- |
| Organisation name   | Single line text  |
| Organisation type    | Single select     |
| Contact name         | Single line text  |
| Email                | Email             |
| Country              | Single line text  |
| Garment types        | Multiple select   |
| Has logo             | Single select     |
| Style notes          | Long text         |
| Story notes          | Long text         |
| Timeline             | Single select     |
| Budget range          | Single select     |
| Status               | Single select     | New / Contacted / Quoted |

Get your base ID from the Airtable API documentation page for your
base, and generate a personal access token with `data.records:read`
and `data.records:write` scopes for this base only.

## Shopify setup

In Shopify admin: Settings → Apps and sales channels → Develop apps →
Create an app → configure Storefront API scopes:

- `unauthenticated_read_product_listings`
- `unauthenticated_read_product_inventory`
- `unauthenticated_read_selling_plans`

Install the app and copy the Storefront API access token into
`NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN`.

Tag products per client and add them to a collection whose **handle**
matches the "Shopify collection handle" field in Airtable for that
client.

## Deploying

Push this repo to GitHub, then import it into Vercel. Add the four
environment variables from `.env.example` in the Vercel project
settings before the first deploy.

## Structure

```
app/
  page.tsx              home page
  about/page.tsx         about page
  shops/page.tsx          index of all club shops
  shops/[slug]/page.tsx    one club shop, products pulled from Shopify
  enquire/page.tsx         enquiry form
  api/enquiry/route.ts      writes form submissions to Airtable
lib/
  shopify.ts              Storefront API client
  airtable.ts              Airtable read/write helpers
components/
  Nav.tsx, Footer.tsx, ProductCard.tsx, StitchDivider.tsx
```
