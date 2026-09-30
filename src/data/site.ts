/**
 * Central company information. Update values here and they propagate
 * across the navbar, footer, contact page, metadata and structured data.
 */
export const site = {
  name: "Novenso Spaces",
  legalName: "Novenso Spaces Private Limited",
  tagline: "Creating Spaces. Defining Experiences.",
  url: "https://novensospace.com",
  email: "novensospaces@gmail.com",
  address: {
    street: "Aaraa House, Om Nager Colony",
    city: "Hyderabad",
    region: "Telangana",
    country: "India",
  },
  phone: { display: "+91 85001 03000", tel: "+918500103000" },
  /** International format without "+" or spaces, as WhatsApp expects. */
  whatsapp: "918500103000",
  description:
    "Novenso Spaces is a design, architecture, build and turnkey interiors company creating residential, workspace, hospitality and commercial spaces that are purposeful, beautiful and built for the way people live, work and experience today.",
  shortDescription:
    "An integrated interior solutions company taking spaces from first concept through design, project management and execution to final handover.",
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Elite Services", href: "/elite-services" },
  { label: "Contact", href: "/contact" },
];

export const primaryCta: NavItem = { label: "Start a Project", href: "/contact" };
