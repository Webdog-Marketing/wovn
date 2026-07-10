const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

const BASE_URL = "https://api.airtable.com/v0";

function assertConfigured() {
  if (!apiKey || !baseId) {
    throw new Error("Missing AIRTABLE_API_KEY or AIRTABLE_BASE_ID env vars");
  }
}

export type ClientRecord = {
  slug: string;
  name: string;
  category: string;
  shopifyCollectionHandle: string;
  heroCopy: string;
  heroImageUrl?: string;
};

// Reads run server-side only (this file is never imported into a client component)
export async function getAllClients(): Promise<ClientRecord[]> {
  assertConfigured();

  const res = await fetch(
    `${BASE_URL}/${baseId}/Clients?view=Grid%20view`,
    {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    throw new Error(`Airtable error fetching Clients: ${res.status}`);
  }

  const json = await res.json();

  return json.records.map((r: { fields: Record<string, string> }) => ({
    slug: r.fields["Slug"],
    name: r.fields["Name"],
    category: r.fields["Category"],
    shopifyCollectionHandle: r.fields["Shopify collection handle"],
    heroCopy: r.fields["Hero copy"],
    heroImageUrl: r.fields["Hero image URL"],
  }));
}

export async function getClientBySlug(slug: string): Promise<ClientRecord | null> {
  const clients = await getAllClients();
  return clients.find((c) => c.slug === slug) ?? null;
}

export type EnquiryPayload = {
  organisationName: string;
  organisationType: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  garmentTypes: string[];
  hasLogo: string;
  styleNotes: string;
  storyNotes: string;
  timeline: string;
  budgetRange: string;
};

export async function createEnquiry(payload: EnquiryPayload) {
  assertConfigured();

  const res = await fetch(`${BASE_URL}/${baseId}/Enquiries`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        "Organisation name": payload.organisationName,
        "Organisation type": payload.organisationType,
        "Contact name": payload.contactName,
        Email: payload.email,
        Phone: payload.phone,
        Country: payload.country,
        "Garment types": payload.garmentTypes,
        "Has logo": payload.hasLogo,
        "Style notes": payload.styleNotes,
        "Story notes": payload.storyNotes,
        Timeline: payload.timeline,
        "Budget range": payload.budgetRange,
        Status: "New",
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Airtable error creating enquiry: ${res.status} ${text}`);
  }

  return res.json();
}
