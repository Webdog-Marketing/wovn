import { NextRequest, NextResponse } from "next/server";
import { createEnquiry, type EnquiryPayload } from "@/lib/airtable";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as EnquiryPayload;

  if (!body.organisationName || !body.email) {
    return NextResponse.json(
      { error: "Organisation name and email are required." },
      { status: 400 }
    );
  }

  try {
    await createEnquiry(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong saving your enquiry. Please try again." },
      { status: 500 }
    );
  }
}
