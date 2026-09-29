export type ProcessStep = {
  index: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    description:
      "We understand your requirements, lifestyle, business needs and vision, and study the site in detail before any design work begins.",
    image: "/images/process/discover.jpg",
    imageAlt: "Hand sketching initial ideas over printed drawings",
  },
  {
    index: "02",
    title: "Design",
    description:
      "We develop concepts, layouts, materials, finishes and detailed design solutions, refining them with you until every decision is resolved.",
    image: "/images/process/design.jpg",
    imageAlt: "Floor plan drawn on a drafting board",
  },
  {
    index: "03",
    title: "Plan",
    description:
      "We build the project schedule, budget, procurement plan and execution strategy, so cost and time are agreed before work starts on site.",
    image: "/images/process/plan.jpg",
    imageAlt: "Technical drawing on a drafting table",
  },
  {
    index: "04",
    title: "Execute",
    description:
      "We coordinate site execution, contractors, vendors and materials, with quality checks at each stage rather than only at the end.",
    image: "/images/process/execute.jpg",
    imageAlt: "Site team installing services from a scissor lift",
  },
  {
    index: "05",
    title: "Deliver",
    description:
      "We complete the project with attention to detail, close out every snag and hand over a finished space that is ready to use.",
    image: "/images/process/deliver.jpg",
    imageAlt: "Completed bedroom interior with warm lighting",
  },
];

export type Differentiator = { title: string; description: string };

export const differentiators: Differentiator[] = [
  {
    title: "Design and execution under one roof",
    description:
      "The people who draw your space are the people who build it. Nothing is lost between the drawing and the site.",
  },
  {
    title: "Project management expertise",
    description:
      "Schedules, budgets and vendors are managed with the same care as the design, with clear reporting throughout.",
  },
  {
    title: "Attention to detail",
    description:
      "Joints, junctions, alignments and finishes are specified and checked, because details are what people notice.",
  },
  {
    title: "Custom solutions",
    description:
      "From joinery to sofas, we make pieces for the space instead of forcing the space around standard products.",
  },
  {
    title: "Quality-focused execution",
    description:
      "Staged inspections and snag lists at every milestone, not a single walkthrough at the end.",
  },
  {
    title: "Transparent coordination",
    description:
      "You always know what is happening, what it costs and what is next. No surprises at handover.",
  },
  {
    title: "End-to-end responsibility",
    description:
      "One accountable team from the first conversation to the last fitting.",
  },
];

export const capabilities = [
  "Design thinking",
  "Project planning",
  "Technical expertise",
  "Execution",
  "Quality control",
  "Vendor coordination",
  "Custom manufacturing",
  "Project management",
];

export type EliteService = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const eliteServices: EliteService[] = [
  {
    title: "Custom Sofa Manufacturing",
    description:
      "Sofas built to your exact dimensions, depth and comfort, in the fabric or leather of your choice.",
    image: "/images/elite/sofa.jpg",
    imageAlt: "Detail of a deep green velvet sofa in soft light",
  },
  {
    title: "Bespoke Furniture",
    description:
      "Tables, storage, beds and statement pieces designed for the space and made by skilled craftsmen.",
    image: "/images/elite/furniture.jpg",
    imageAlt: "Craftsman finishing a hardwood furniture component",
  },
  {
    title: "Custom Upholstery",
    description:
      "Re-upholstery and new upholstery for seating, headboards and wall panels, with a curated fabric library.",
    image: "/images/elite/upholstery.jpg",
    imageAlt: "Close-up of a hand-tufted upholstered sofa",
  },
  {
    title: "Decorative Elements",
    description:
      "Wall treatments, sculptural pieces, lighting features and art curation that give a space its character.",
    image: "/images/elite/decorative.jpg",
    imageAlt: "Sculptural bentwood lounge chair against a pale backdrop",
  },
  {
    title: "Premium Material Sourcing",
    description:
      "Natural stone, veneers, metals and textiles sourced and inspected against the design specification.",
    image: "/images/elite/sourcing.jpg",
    imageAlt: "Stacked samples of exotic hardwood timber",
  },
  {
    title: "Bespoke Interior Components",
    description:
      "Custom panelling, screens, doors, handles and joinery details made to measure for a single project.",
    image: "/images/elite/components.jpg",
    imageAlt: "Close-up of ornate brass door handles",
  },
];
