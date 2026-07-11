import type { EnquiryPayload } from "@/lib/airtable";

const apiKey = process.env.RESEND_API_KEY;
const notificationEmail = process.env.ENQUIRY_NOTIFICATION_EMAIL;

export async function sendEnquiryNotification(payload: EnquiryPayload) {
  if (!apiKey || !notificationEmail) {
    // Not configured yet — skip silently rather than breaking the enquiry submission.
    console.warn(
      "Skipping enquiry email: missing RESEND_API_KEY or ENQUIRY_NOTIFICATION_EMAIL"
    );
    return;
  }

  const html = `
    <h2>New enquiry: ${escapeHtml(payload.organisationName)}</h2>
    <p><strong>Type:</strong> ${escapeHtml(payload.organisationType)}</p>
    <p><strong>Contact:</strong> ${escapeHtml(payload.contactName)} — ${escapeHtml(payload.email)} ${payload.phone ? `— ${escapeHtml(payload.phone)}` : ""}</p>
    <p><strong>Country:</strong> ${escapeHtml(payload.country)}</p>
    <p><strong>Garment types:</strong> ${payload.garmentTypes.map(escapeHtml).join(", ")}</p>
    <p><strong>Has logo:</strong> ${escapeHtml(payload.hasLogo)}</p>
    <p><strong>Style notes:</strong> ${escapeHtml(payload.styleNotes)}</p>
    <p><strong>Story:</strong> ${escapeHtml(payload.storyNotes)}</p>
    <p><strong>Timeline:</strong> ${escapeHtml(payload.timeline)}</p>
    <p><strong>Budget:</strong> ${escapeHtml(payload.budgetRange)}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Once your domain is verified in Resend, swap this for something like
      // "WOVN enquiries <enquiries@wovn.club>"
      from: "WOVN enquiries <onboarding@resend.dev>",
      to: [notificationEmail],
      subject: `New enquiry: ${payload.organisationName}`,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    // Log but don't throw — a failed notification email shouldn't fail the
    // whole request when the enquiry is already safely saved in Airtable.
    console.error(`Resend error: ${res.status} ${text}`);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
