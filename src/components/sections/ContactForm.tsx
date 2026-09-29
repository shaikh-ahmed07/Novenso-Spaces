"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  budgetRanges,
  emptyEnquiry,
  projectTypes,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
} from "@/lib/enquiry";
import { site } from "@/data/site";
import { EASE } from "@/lib/motion";

type Status = "idle" | "submitting" | "success" | "error";

const labelCls = "eyebrow mb-3 block text-ash";
const fieldCls =
  "w-full border-0 border-b bg-transparent px-0 pb-3 pt-1 text-base text-ink placeholder:text-taupe/70 transition-colors duration-300 focus:outline-none focus:ring-0";

function Field({
  id,
  label,
  error,
  required,
  children,
  className = "",
}: {
  id: keyof Enquiry;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelCls}>
        {label}
        {required && <span className="ml-1 text-brass">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <m.p
            id={`${id}-error`}
            role="alert"
            className="mt-2 text-sm text-[#a2432f]"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState<Enquiry>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Enquiry, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const update = (key: keyof Enquiry, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    // Re-validate live once a field has been visited, so errors clear as you fix them.
    if (touched[key]) setErrors((e) => ({ ...e, [key]: validateEnquiry(next)[key] }));
  };

  const blur = (key: keyof Enquiry) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((e) => ({ ...e, [key]: validateEnquiry(values)[key] }));
  };

  const border = (key: keyof Enquiry) =>
    errors[key] ? "border-[#a2432f]" : "border-ink/20 focus:border-ink";

  const a11y = (key: keyof Enquiry) => ({
    id: key,
    name: key,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
    onBlur: () => blur(key),
  });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])));
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      document.getElementById(first)?.focus();
      return;
    }

    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error || "Please check the form and try again.");
      }
      setStatus("success");
      setValues(emptyEnquiry);
      setTouched({});
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <m.div
          key="success"
          role="status"
          className="flex min-h-[420px] flex-col justify-center border border-ink/10 bg-bone/60 p-8 md:p-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="rule-brass" />
          <h2 className="display-md mt-8 text-ink">Thank you. Your enquiry has been received.</h2>
          <p className="mt-5 max-w-md leading-relaxed text-ash">
            A member of our team will review your requirements and get back to you shortly. For
            anything urgent, write to{" "}
            <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-10 self-start border-b border-ink pb-1 text-[0.7rem] uppercase tracking-[0.22em] text-ink"
          >
            Send another enquiry
          </button>
        </m.div>
      ) : (
        <m.form
          key="form"
          noValidate
          onSubmit={onSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2"
          aria-describedby="form-note"
        >
          <Field id="name" label="Name" required error={errors.name}>
            <input
              {...a11y("name")}
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              className={`${fieldCls} ${border("name")}`}
              placeholder="Your full name"
            />
          </Field>

          <Field id="email" label="Email" required error={errors.email}>
            <input
              {...a11y("email")}
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              className={`${fieldCls} ${border("email")}`}
              placeholder="you@example.com"
            />
          </Field>

          <Field id="phone" label="Phone" required error={errors.phone}>
            <input
              {...a11y("phone")}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={`${fieldCls} ${border("phone")}`}
              placeholder="+91 98765 43210"
            />
          </Field>

          <Field id="company" label="Company" error={errors.company}>
            <input
              {...a11y("company")}
              type="text"
              autoComplete="organization"
              value={values.company}
              onChange={(e) => update("company", e.target.value)}
              className={`${fieldCls} ${border("company")}`}
              placeholder="Optional"
            />
          </Field>

          <Field id="projectType" label="Project Type" required error={errors.projectType}>
            <div className="relative">
              <select
                {...a11y("projectType")}
                value={values.projectType}
                onChange={(e) => update("projectType", e.target.value)}
                className={`${fieldCls} ${border("projectType")} appearance-none pr-8 ${
                  values.projectType ? "" : "text-taupe"
                }`}
              >
                <option value="" disabled>
                  Select a type
                </option>
                {projectTypes.map((t) => (
                  <option key={t} value={t} className="text-ink">
                    {t}
                  </option>
                ))}
              </select>
              <Chevron />
            </div>
          </Field>

          <Field id="budget" label="Estimated Budget" required error={errors.budget}>
            <div className="relative">
              <select
                {...a11y("budget")}
                value={values.budget}
                onChange={(e) => update("budget", e.target.value)}
                className={`${fieldCls} ${border("budget")} appearance-none pr-8 ${
                  values.budget ? "" : "text-taupe"
                }`}
              >
                <option value="" disabled>
                  Select a range
                </option>
                {budgetRanges.map((b) => (
                  <option key={b} value={b} className="text-ink">
                    {b}
                  </option>
                ))}
              </select>
              <Chevron />
            </div>
          </Field>

          <Field id="message" label="Message" required error={errors.message} className="sm:col-span-2">
            <textarea
              {...a11y("message")}
              rows={5}
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              className={`${fieldCls} ${border("message")} resize-y`}
              placeholder="Tell us about the space, location, timeline and what you'd like to achieve."
            />
          </Field>

          {/* Honeypot (hidden from people, visible to bots) */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p id="form-note" className="text-xs text-ash">
              Fields marked <span className="text-brass">*</span> are required.
            </p>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="group relative inline-flex min-h-14 items-center justify-center gap-3 overflow-hidden bg-ink px-10 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-ivory transition-colors duration-500 hover:text-ink disabled:cursor-wait disabled:opacity-70"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-brass-light transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:scale-y-100"
              />
              <span className="relative">
                {status === "submitting" ? "Sending…" : "Submit Enquiry"}
              </span>
            </button>
          </div>

          {status === "error" && serverError && (
            <p role="alert" className="text-sm text-[#a2432f] sm:col-span-2">
              {serverError}
            </p>
          )}
        </m.form>
      )}
    </AnimatePresence>
  );
}

function Chevron() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 8"
      className="pointer-events-none absolute right-1 top-1/2 h-2 w-3 -translate-y-1/2 text-ash"
      fill="none"
      stroke="currentColor"
    >
      <path d="M1 1l5 5 5-5" />
    </svg>
  );
}
