/**
 * Enquiry form schema + validation, shared by the client form and the API
 * route so both enforce exactly the same rules.
 */

export const projectTypes = [
  "Residential",
  "Commercial",
  "Corporate / Office",
  "Hospitality",
  "Retail",
  "Custom Sofa / Furniture",
  "Other",
] as const;

export const budgetRanges = [
  "Under ₹10 Lakh",
  "₹10 – 25 Lakh",
  "₹25 – 50 Lakh",
  "₹50 Lakh – 1 Crore",
  "Above ₹1 Crore",
  "Not sure yet",
] as const;

export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

export const emptyEnquiry: Enquiry = {
  name: "",
  email: "",
  phone: "",
  company: "",
  projectType: "",
  budget: "",
  message: "",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9\s\-()]{7,20}$/;

export function validateEnquiry(data: Partial<Enquiry>): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const v = (k: keyof Enquiry) => (data[k] ?? "").toString().trim();

  if (v("name").length < 2) errors.name = "Please enter your full name.";
  else if (v("name").length > 100) errors.name = "Name is too long.";

  if (!v("email")) errors.email = "Please enter your email address.";
  else if (!EMAIL.test(v("email"))) errors.email = "Please enter a valid email address.";

  if (!v("phone")) errors.phone = "Please enter a phone number.";
  else if (!PHONE.test(v("phone")) || v("phone").replace(/\D/g, "").length < 7)
    errors.phone = "Please enter a valid phone number.";

  if (v("company").length > 120) errors.company = "Company name is too long.";

  if (!v("projectType")) errors.projectType = "Please select a project type.";
  else if (!(projectTypes as readonly string[]).includes(v("projectType")))
    errors.projectType = "Please select a valid project type.";

  if (!v("budget")) errors.budget = "Please select an estimated budget.";
  else if (!(budgetRanges as readonly string[]).includes(v("budget")))
    errors.budget = "Please select a valid budget range.";

  if (v("message").length < 20)
    errors.message = "Please tell us a little more about your project (at least 20 characters).";
  else if (v("message").length > 3000) errors.message = "Message is too long (max 3000 characters).";

  return errors;
}
