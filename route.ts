import { NextRequest, NextResponse } from "next/server";
import { createEnquiry, type EnquiryPayload } from "@/lib/airtable";
import { sendEnquiryNotification } from "@/lib/email";

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
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong saving your enquiry. Please try again." },
      { status: 500 }
    );
  }

  // The enquiry is safely saved at this point — a failed notification email
  // shouldn't turn into an error the visitor sees.
  try {
    await sendEnquiryNotification(body);
  } catch (err) {
    console.error("Enquiry notification email failed:", err);
  }

  return NextResponse.json({ ok: true });
}
