import { NextResponse } from "next/server";
import { site } from "@/data/site";
import { validateChatLead, validateEnquiry, type Enquiry } from "@/lib/enquiry";
import { mailerConfigured, sendEnquiryEmail, type EnquirySource } from "@/lib/mailer";

/**
 * POST /api/enquiry
 *
 * Validates an enquiry from the contact form or the website chat, then emails
 * it to Gmail (see src/lib/mailer.ts for the required environment variables).
 */
export async function POST(request: Request) {
  let body: Partial<Enquiry> & { website?: string; source?: "form" | "chat" };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (body.website) return NextResponse.json({ ok: true });

  const errors = body.source === "chat" ? validateChatLead(body) : validateEnquiry(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const enquiry: Enquiry = {
    name: String(body.name).trim(),
    email: String(body.email ?? "").trim(),
    phone: String(body.phone).trim(),
    company: String(body.company ?? "").trim(),
    projectType: String(body.projectType || "Other"),
    budget: String(body.budget || "Not sure yet"),
    message: String(body.message).trim(),
  };

  try {
    await deliverEnquiry(enquiry, body.source ?? "form");
  } catch (err) {
    console.error("[enquiry] delivery failed", err);
    return NextResponse.json(
      { ok: false, error: `We couldn't send your enquiry right now. Please email ${site.email} or WhatsApp ${site.phone.display}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

async function deliverEnquiry(enquiry: Enquiry, source: EnquirySource) {
  if (!mailerConfigured()) {
    // Never silently drop real enquiries in production.
    if (process.env.NODE_ENV === "production") throw new Error("Email is not configured (GMAIL_USER / GMAIL_APP_PASSWORD).");
    console.warn(`[enquiry:${source}] email not configured; logging instead`, enquiry);
    return;
  }
  await sendEnquiryEmail(enquiry, source);
}
