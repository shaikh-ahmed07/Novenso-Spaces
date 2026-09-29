import nodemailer from "nodemailer";
import type { Enquiry } from "@/lib/enquiry";
import { site } from "@/data/site";

/**
 * Sends website enquiries to Gmail using Gmail's own SMTP server.
 *
 * Required environment variables (see .env.example):
 *   GMAIL_USER          the Gmail address that sends the email
 *   GMAIL_APP_PASSWORD  a 16-character Google "App Password" for that account
 * Optional:
 *   ENQUIRY_TO          where enquiries are delivered (defaults to GMAIL_USER)
 */

export type EnquirySource = "form" | "chat";

export function mailerConfigured() {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  transporter ??= nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      // Google shows app passwords with spaces; SMTP needs them without.
      pass: process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, ""),
    },
  });
  return transporter;
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Build the email. Exported separately so it can be previewed without sending. */
export function buildEnquiryEmail(enquiry: Enquiry, source: EnquirySource) {
  const from = process.env.GMAIL_USER ?? site.email;
  const to = process.env.ENQUIRY_TO || from;
  const label = source === "chat" ? "Website chat" : "Contact form";
  const subject = `New enquiry: ${enquiry.projectType} · ${enquiry.name} (${label})`;

  const rows: [string, string][] = [
    ["Name", enquiry.name],
    ["Phone", enquiry.phone],
    ["Email", enquiry.email || "Not provided"],
    ["Company", enquiry.company || "-"],
    ["Project type", enquiry.projectType],
    ["Estimated budget", enquiry.budget],
    ["Source", label],
  ];

  const digits = enquiry.phone.replace(/\D/g, "");
  const waNumber = digits.length === 10 ? `91${digits}` : digits;

  const text = [
    `New enquiry from the Novenso Spaces website (${label})`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    enquiry.message,
  ].join("\n");

  const html = `<!doctype html>
<html><body style="margin:0;background:#f7f3ec;font-family:Helvetica,Arial,sans-serif;color:#1b1a18">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f3ec;padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e6dfd2">
        <tr><td style="background:#0f0e0d;padding:22px 28px">
          <div style="font-family:Georgia,serif;font-size:20px;letter-spacing:6px;color:#f7f3ec">NOVENSO</div>
          <div style="font-size:10px;letter-spacing:5px;color:#ddb25e;margin-top:4px">SPACES · NEW ENQUIRY</div>
        </td></tr>
        <tr><td style="padding:28px 28px 8px">
          <div style="font-family:Georgia,serif;font-size:24px;line-height:1.3">${escape(enquiry.name)}</div>
          <div style="font-size:14px;color:#5b554c;margin-top:4px">${escape(enquiry.projectType)} · ${escape(enquiry.budget)} · via ${label}</div>
        </td></tr>
        <tr><td style="padding:16px 28px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px">
            ${rows
              .map(
                ([k, v]) => `<tr>
              <td style="padding:9px 0;border-bottom:1px solid #eee7da;color:#9c9282;width:150px;vertical-align:top">${k}</td>
              <td style="padding:9px 0;border-bottom:1px solid #eee7da">${escape(v)}</td>
            </tr>`,
              )
              .join("")}
          </table>
        </td></tr>
        <tr><td style="padding:8px 28px 4px">
          <div style="font-size:11px;letter-spacing:3px;color:#86601a;text-transform:uppercase">Message</div>
          <div style="margin-top:10px;font-size:15px;line-height:1.6;white-space:pre-line;background:#f7f3ec;padding:16px">${escape(enquiry.message)}</div>
        </td></tr>
        <tr><td style="padding:22px 28px 28px">
          <a href="tel:${escape(enquiry.phone.replace(/[^\d+]/g, ""))}" style="display:inline-block;background:#0f0e0d;color:#f7f3ec;text-decoration:none;font-size:12px;letter-spacing:2px;padding:12px 18px;margin:0 8px 8px 0">CALL</a>
          <a href="https://wa.me/${waNumber}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;font-size:12px;letter-spacing:2px;padding:12px 18px;margin:0 8px 8px 0">WHATSAPP</a>
          ${
            enquiry.email
              ? `<a href="mailto:${escape(enquiry.email)}" style="display:inline-block;border:1px solid #c18e31;color:#1b1a18;text-decoration:none;font-size:12px;letter-spacing:2px;padding:11px 18px;margin:0 8px 8px 0">REPLY BY EMAIL</a>`
              : ""
          }
        </td></tr>
      </table>
      <div style="font-size:11px;color:#9c9282;margin-top:14px">Sent from the enquiry system on ${escape(site.url.replace(/^https?:\/\//, ""))}</div>
    </td></tr>
  </table>
</body></html>`;

  return {
    from: `"Novenso Spaces Website" <${from}>`,
    to,
    // Hitting "Reply" in Gmail answers the visitor directly.
    replyTo: enquiry.email ? `"${enquiry.name.replace(/"/g, "")}" <${enquiry.email}>` : undefined,
    subject,
    text,
    html,
  };
}

export async function sendEnquiryEmail(enquiry: Enquiry, source: EnquirySource) {
  await getTransporter().sendMail(buildEnquiryEmail(enquiry, source));
}
