# WOVN website

Next.js (App Router) site for WOVN. Shopify is the source of truth for
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

## Enquiry notification emails

Set `RESEND_API_KEY` and `ENQUIRY_NOTIFICATION_EMAIL` to get an email
each time someone submits the enquiry form. Sign up at resend.com
using the address you want notifications sent to — without any domain
verification, Resend lets you send test emails straight to that same
address, which is all this needs to start with. If you'd rather send
from a branded address like `enquiries@wovn.club`, verify your domain
in Resend's dashboard and update the `from` address in `lib/email.ts`.

If these env vars aren't set, the form still works and still saves to
Airtable — it just skips sending an email, rather than failing.

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

### Checkout

Each product card links to its full Shopify product page (not straight
to checkout) — customers pick their size, see all photos, and browse
the rest of the collection there, then check out normally through
Shopify's own theme. Set `NEXT_PUBLIC_SHOPIFY_CHECKOUT_DOMAIN` to
whichever domain still serves the Shopify storefront and checkout for
you (e.g. `shop.wovn.club`, if your main domain now points to Vercel).
If unset, it falls back to `NEXT_PUBLIC_SHOPIFY_DOMAIN`.

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
