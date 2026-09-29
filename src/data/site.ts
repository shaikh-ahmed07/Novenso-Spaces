/**
 * Central company information. Update values here and they propagate
 * across the navbar, footer, contact page, metadata and structured data.
 */
export const site = {
  name: "Novenso Spaces",
  legalName: "Novenso Spaces Private Limited",
  tagline: "Creating Spaces. Defining Experiences.",
  url: "https://novensospace.com",
  email: "Novensosocial@gmail.com",
  description:
    "Novenso Spaces delivers premium interior design, project management, execution, contracting and bespoke interior solutions for residential, commercial and hospitality spaces.",
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
