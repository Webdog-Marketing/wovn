import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// Visit /api/revalidate?secret=YOUR_SECRET right after editing the Clients
// table in Airtable to force an instant refresh, instead of waiting for the
// scheduled cache window. Keeps the default polling interval long (cheap on
// Airtable's API quota) while still giving you fast updates when you need them.
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid or missing secret" }, { status: 401 });
  }

  revalidateTag("clients");
  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}
