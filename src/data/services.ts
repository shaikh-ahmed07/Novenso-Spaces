export type Service = {
  slug: string;
  index: string;
  title: string;
  short: string;
  description: string;
  deliverables: string[];
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    slug: "interior-design",
    index: "01",
    title: "Interior Design",
    short:
      "Concept development, space planning, material selection, furniture layouts, lighting concepts and detailed interior design.",
    description:
      "Every project begins with a clear idea of how the space should work and feel. We translate your brief into a design language, then resolve it down to the last joint, finish and fitting so that what is drawn can be built without compromise.",
    deliverables: [
      "Concept development & mood direction",
      "Space planning & furniture layouts",
      "Material, finish & colour selection",
      "Lighting concepts",
      "3D visualisation",
      "Detailed working drawings",
    ],
    image: "/images/services/interior-design.jpg",
    imageAlt: "Interior material samples: timber, fabric, wallpaper and colour swatches",
  },
  {
    slug: "interior-pmc",
    index: "02",
    title: "Interior PMC",
    short:
      "Professional project management covering planning, coordination, scheduling, budgeting, vendor management and quality control.",
    description:
      "As your project management consultant we sit on your side of the table. We set the schedule and budget, manage vendors and consultants, and hold every party to the agreed standard of quality, reporting clearly at each stage.",
    deliverables: [
      "Project planning & scheduling",
      "Budgeting & cost control",
      "Vendor & consultant management",
      "Site coordination & reviews",
      "Quality control & snagging",
      "Progress reporting",
    ],
    image: "/images/services/interior-pmc.jpg",
    imageAlt: "Project lead reviewing progress inside an interior under construction",
  },
  {
    slug: "interior-execution",
    index: "03",
    title: "Interior Execution",
    short:
      "Complete on-site execution across civil, electrical, plumbing, carpentry, false ceiling, flooring, painting, lighting and finishing works.",
    description:
      "Our site teams coordinate every trade in the right sequence, from civil changes and services to carpentry, ceilings, flooring and final finishes, so the built space matches the design intent.",
    deliverables: [
      "Civil & structural modifications",
      "Electrical & plumbing works",
      "Carpentry & joinery",
      "False ceilings & flooring",
      "Painting & specialist finishes",
      "Lighting & final fit-out",
    ],
    image: "/images/services/interior-execution.jpg",
    imageAlt: "Tradesman on a ladder fitting ceiling works in a warmly lit interior",
  },
  {
    slug: "contracting",
    index: "04",
    title: "Contracting",
    short:
      "End-to-end contracting with professional coordination between design, procurement and execution.",
    description:
      "One contract and one accountable team for design, procurement and delivery. We price transparently, buy against specification and manage the supply chain so the programme holds.",
    deliverables: [
      "Turnkey contracting",
      "Procurement & logistics",
      "Specification compliance",
      "Subcontractor management",
      "Programme management",
      "Handover documentation",
    ],
    image: "/images/services/contracting.jpg",
    imageAlt: "Technician working through a ceiling access panel in a finished room",
  },
  {
    slug: "elite-interior-services",
    index: "05",
    title: "Elite Interior Services",
    short:
      "Specialised premium services for clients seeking highly customised interior solutions.",
    description:
      "For clients who want something that cannot be bought off a shelf. A dedicated senior team works closely with you on bespoke detailing, rare materials and made-to-measure pieces, with a higher level of involvement at every stage.",
    deliverables: [
      "Dedicated senior design lead",
      "Bespoke detailing",
      "Premium & rare material sourcing",
      "Artwork & styling curation",
      "Private client coordination",
      "White-glove handover",
    ],
    image: "/images/services/elite-interior.jpg",
    imageAlt: "Luxury living room with crystal chandelier and dark stone wall",
  },
  {
    slug: "custom-sofa-manufacturing",
    index: "06",
    title: "Custom Sofa Manufacturing",
    short:
      "Bespoke sofa design and manufacturing tailored to the dimensions, style and requirements of each project.",
    description:
      "Sofas designed around your room rather than a catalogue. We build frames, foam and upholstery to your dimensions, seating preference and fabric, with prototypes and fabric trials before production.",
    deliverables: [
      "Made-to-measure sizing",
      "Frame & seating comfort options",
      "Fabric & leather selection",
      "Sample & prototype review",
      "In-house upholstery",
      "Delivery & installation",
    ],
    image: "/images/services/custom-sofa.jpg",
    imageAlt: "Upholsterers crafting a leather armchair in the workshop",
  },
];
