import type { StrengthIconName } from "@/components/ui/StrengthIcon";

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
    description: "Understanding the brief, lifestyle, business needs and project objectives.",
    image: "/images/process/discover.jpg",
    imageAlt: "Hand sketching initial ideas over printed drawings",
  },
  {
    index: "02",
    title: "Design",
    description: "Concept, spatial planning, materials, detailing and design development.",
    image: "/images/process/design.jpg",
    imageAlt: "Floor plan drawn on a drafting board",
  },
  {
    index: "03",
    title: "Estimate",
    description: "Scope definition, specifications, costing and commercial alignment.",
    image: "/images/process/plan.jpg",
    imageAlt: "Technical drawing on a drafting table",
  },
  {
    index: "04",
    title: "Source",
    description: "Furniture, lighting, MEP, civil and specialist vendor coordination.",
    image: "/images/elite/sourcing.jpg",
    imageAlt: "Stacked samples of hardwood timber",
  },
  {
    index: "05",
    title: "Build",
    description: "Execution, site coordination, quality control and project management.",
    image: "/images/process/execute.jpg",
    imageAlt: "Site team installing services from a scissor lift",
  },
  {
    index: "06",
    title: "Deliver",
    description: "Final detailing, finishing, coordination and handover.",
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

export type Founder = {
  given: string;
  family: string;
  role: string;
  years: string;
  yearsLabel: string;
  bio: string;
  strengths: { label: string; icon: StrengthIconName }[];
};

export const founders: Founder[] = [
  {
    given: "Muhammad",
    family: "Muneeb Abdullah",
    role: "Founder & Director",
    years: "~10",
    yearsLabel: "Years in architecture, construction & real estate",
    bio: "Nearly a decade of experience across architecture, construction and real estate development. With a Master's degree from the UK and experience working alongside leading architectural practices in the UK, Muneeb brings an international perspective to strategy, development and project delivery.",
    strengths: [
      { label: "Strategy", icon: "strategy" },
      { label: "Finance & Accounts", icon: "finance" },
      { label: "Commercial Business Development", icon: "growth" },
      { label: "Client Management", icon: "clients" },
      { label: "Project Management", icon: "project" },
      { label: "Compliance & Regulatory", icon: "compliance" },
    ],
  },
  {
    given: "Syed Fawad",
    family: "Mustafa Quadri",
    role: "Founder & Director",
    years: "~15",
    yearsLabel: "Years in interior design & execution",
    bio: "Nearly 15 years of experience in interior design and execution. An Engineering graduate, Fawad brings extensive technical and hands-on expertise, leading design, estimation and project delivery from concept through completion.",
    strengths: [
      { label: "Design Leadership", icon: "design" },
      { label: "Technical Business Development", icon: "technical" },
      { label: "Estimation & Costing", icon: "estimation" },
      { label: "Project Management", icon: "setSquare" },
      { label: "Supply Chain", icon: "supply" },
      { label: "Operations", icon: "operations" },
    ],
  },
];

/** Headline proof points drawn from the founders' backgrounds. */
export const leadershipHighlights = [
  { value: "~25", unit: "yrs", label: "Combined founder experience in design, construction and delivery" },
  { value: "UK", unit: "", label: "Master's-trained, with experience in leading UK architectural practices" },
  { value: "1", unit: "team", label: "Strategy, design and execution brought together under one direction" },
];

export const brandOfferings = ["Interiors", "Architecture", "Design & Build", "Turnkey Solutions"];

export type Sector = { title: string; line: string; image: string; imageAlt: string };

export const sectors: Sector[] = [
  {
    title: "Residential",
    line: "Spaces that feel truly yours.",
    image: "/images/sectors/residential.jpg",
    imageAlt: "Warm living room with cream sectional sofa and timber-slatted wall",
  },
  {
    title: "Workspace",
    line: "Environments for people and performance.",
    image: "/images/sectors/workspace.jpg",
    imageAlt: "Office with timber desks, ergonomic chairs and glass partitions",
  },
  {
    title: "Hospitality",
    line: "Spaces that create lasting experiences.",
    image: "/images/sectors/hospitality.jpg",
    imageAlt: "Restaurant with green velvet chairs and warm pendant lights",
  },
  {
    title: "Commercial",
    line: "Interiors that engage, function and inspire.",
    image: "/images/sectors/commercial.jpg",
    imageAlt: "Retail interior with curved lit ceiling and marble counter",
  },
];

/** "Our philosophy" from the company profile. */
export const philosophy = [
  { k: "Thoughtful Design", v: "Purpose-led spaces" },
  { k: "Exceptional Execution", v: "Precision in every detail" },
  { k: "Human Experience", v: "Designed around people" },
  { k: "Lasting Value", v: "Built to endure" },
];

export const designDetailDelivery = [
  {
    title: "Design",
    line: "Purposeful ideas.",
    text: "Spaces shaped around people, function, character and experience.",
  },
  {
    title: "Detail",
    line: "Considered down to the last element.",
    text: "Materials, proportions, lighting, finishes and craftsmanship brought together with intention.",
  },
  {
    title: "Delivery",
    line: "From vision to reality.",
    text: "Coordinated planning, procurement and execution that carries the design through to completion.",
  },
];

export const deliveryNetwork = [
  { title: "Furniture", text: "Bespoke & custom furniture." },
  { title: "Office Furniture", text: "Workstations, seating, storage and collaborative spaces." },
  { title: "Lighting", text: "Decorative & architectural lighting." },
  { title: "MEP", text: "Electrical, HVAC, plumbing and integrated building services." },
  { title: "Civil & Specialist Works", text: "Civil, fabrication and specialist trades." },
];
