import { NextResponse } from "next/server";
import { validateChatLead, validateEnquiry, type Enquiry } from "@/lib/enquiry";

/**
 * POST /api/enquiry
 *
 * Validates the enquiry server-side, then hands it to `deliverEnquiry`.
 * To go live, implement `deliverEnquiry` with your email/CRM provider
 * (e.g. Resend, SendGrid, Postmark, a Google Sheet or HubSpot) and add the
 * provider's API key to your environment variables.
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
      { ok: false, error: "We couldn't send your enquiry right now. Please email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

async function deliverEnquiry(enquiry: Enquiry, source: "form" | "chat") {
  // TODO: connect an email service. Example with Resend:
  //
  // await fetch("https://api.resend.com/emails", {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     from: "Novenso Website <website@novensospace.com>",
  //     to: ["Novensosocial@gmail.com"],
  //     reply_to: enquiry.email || undefined,
  //     subject: `New ${source} enquiry: ${enquiry.projectType} — ${enquiry.name}`,
  //     text: Object.entries(enquiry).map(([k, v]) => `${k}: ${v}`).join("\n"),
  //   }),
  // });
  console.info(`[enquiry:${source}] received`, { ...enquiry, message: `${enquiry.message.slice(0, 80)}…` });
}
