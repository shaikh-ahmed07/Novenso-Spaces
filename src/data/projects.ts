/**
 * Portfolio data, taken from the Novenso Spaces Company Profile 2026.
 *
 * To add a project: add an object to `projects` below and put its images in
 * /public/images/projects/<slug>/. A case-study page is generated
 * automatically at /projects/<slug> and the project appears in the portfolio
 * grid, sitemap and category filters. The long-form fields (concept,
 * materials, execution, challenges, solutions, outcome) are optional; each
 * section of the case-study page only appears when its field is filled in.
 */

export const projectCategories = [
  "Residential",
  "Workspace",
  "Hospitality",
  "Commercial",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

/** `width`/`height` are the file's pixel size, used to lay out small galleries without cropping. */
export type ProjectImage = { src: string; alt: string; width?: number; height?: number };

export type Project = {
  slug: string;
  name: string;
  location: string;
  category: ProjectCategory;
  /** What Novenso delivered, e.g. "Turnkey", "Design", "Execution". */
  service: string;
  status?: "Upcoming";
  year?: string;
  area?: string;
  summary: string;
  cover: ProjectImage;
  overview: string;
  scope: string[];
  concept?: string;
  materials?: string[];
  execution?: string;
  challenges?: string;
  solutions?: string;
  outcome?: string;
  gallery: ProjectImage[];
  featured?: boolean;
};

const img = (slug: string, file: string, alt: string, [width, height]: [number, number]): ProjectImage => ({
  src: `/images/projects/${slug}/${file}.jpg`,
  alt,
  width,
  height,
});

export const projects: Project[] = [
  {
    slug: "tata-aerospace-defence",
    name: "Tata Aerospace & Defence",
    location: "Adibatla, Hyderabad",
    category: "Workspace",
    service: "Interior Execution",
    summary: "Workplace interiors executed with coordination, craft and site discipline.",
    cover: img("tata-aerospace-defence", "hero", "Open-plan workplace with lounge seating and glass partitions", [774, 981]),
    overview:
      "Interior execution of workplace interiors for Tata Aerospace & Defence at Adibatla, Hyderabad, covering open workplace areas and glass-fronted executive spaces.",
    scope: ["Interior execution", "Site coordination", "Detailing", "Workplace interiors", "Executive spaces"],
    execution: "Built around coordination, craft and site discipline.",
    gallery: [
      img("tata-aerospace-defence", "1", "Glass-walled executive cabin with timber shelving and lounge sofa", [642, 458]),
      img("tata-aerospace-defence", "2", "Executive cabins behind full-height glass partitions", [642, 501]),
    ],
    featured: true,
  },
  {
    slug: "residence-3bhk-hyderabad",
    name: "3 BHK Residence",
    location: "Hyderabad",
    category: "Residential",
    service: "Turnkey",
    summary: "A turnkey family home shaped through considered design, bespoke detailing and purposeful execution.",
    cover: img("residence-3bhk-hyderabad", "hero", "Children's room with sage wardrobes, study desk and backlit wall feature", [694, 419]),
    overview:
      "A turnkey 3 BHK residence in Hyderabad, taken from design through execution. Purposeful planning, bespoke detailing and refined execution, down to a playful children's room with custom wardrobes, study and upholstered bed.",
    scope: ["Interior design", "Turnkey execution", "Custom wardrobes & joinery", "Upholstered bed", "Lighting"],
    gallery: [
      img("residence-3bhk-hyderabad", "1", "Upholstered pink bed below an elephant-motif wall with backlit panels", [211, 419]),
      img("residence-3bhk-hyderabad", "2", "Full-height wardrobe beside a study desk with sage fluted panelling", [212, 419]),
    ],
    featured: true,
  },
  {
    slug: "24x7-ai-office",
    name: "24x7.ai",
    location: "Reception & Cafeteria",
    category: "Commercial",
    service: "Design",
    summary: "Reception and cafeteria designed around brand identity, spatial flow and functional detail.",
    cover: img("24x7-ai-office", "hero", "Reception with curved white desk, timber wave wall and circular ceiling light", [569, 353]),
    overview:
      "Commercial interiors for the reception and cafeteria at 24x7.ai: customer-facing environments designed to shape first impressions, movement, comfort and experience.",
    scope: ["Reception design", "Cafeteria design", "Commercial interiors"],
    gallery: [
      img("24x7-ai-office", "1", "Cafeteria counter with timber slat ceiling and patterned floor", [569, 353]),
    ],
    featured: true,
  },
  {
    slug: "boost-beauty-lounge",
    name: "Boost Beauty Lounge",
    location: "UAE",
    category: "Hospitality",
    service: "Commercial / Hospitality",
    summary: "A customer-facing beauty lounge designed for first impressions, comfort and flow.",
    cover: img("boost-beauty-lounge", "hero", "Beauty lounge reception with branded arch and white counter", [684, 383]),
    overview:
      "A beauty lounge in the UAE, designed as a customer-facing environment where brand identity, spatial flow and functional detail shape the experience from the reception to the styling floor.",
    scope: ["Hospitality interiors", "Reception & brand wall", "Styling stations", "Lighting"],
    gallery: [
      img("boost-beauty-lounge", "1", "Styling floor with mirrored stations and cream salon chairs", [217, 383]),
    ],
    featured: true,
  },
  {
    slug: "corporate-office-kondapur",
    name: "Corporate Office",
    location: "Kondapur, Hyderabad",
    category: "Workspace",
    service: "Interior Design",
    summary: "Meeting room and cabins for a corporate office, with spatial planning and detailing.",
    cover: img("corporate-office-kondapur", "hero", "Meeting room with timber slat ceiling, dome pendants and tan chairs", [903, 975]),
    overview:
      "Interior design for a corporate office in Kondapur, Hyderabad, covering spatial planning, interiors and detailing for the meeting room and private cabins.",
    scope: ["Spatial planning", "Interior design", "Detailing", "Meeting room", "Cabins"],
    gallery: [
      img("corporate-office-kondapur", "1", "Cabin with grey and orange shelving and green lounge chairs", [550, 500]),
      img("corporate-office-kondapur", "2", "Cabin with timber bookshelves, glass desk and blue carpet", [550, 501]),
    ],
  },
  {
    slug: "residence-nizamabad",
    name: "Residential Interior",
    location: "Nizamabad",
    category: "Residential",
    service: "Design",
    summary: "A family home with a sculpted contemporary facade and soft, warm interiors.",
    cover: img("residence-nizamabad", "hero", "Contemporary house facade at dusk with stone cladding and curved timber frame", [372, 322]),
    overview:
      "Design for a residence in Nizamabad, from the facade to the kitchen and bedrooms, shaped through considered design and bespoke detailing.",
    scope: ["Elevation design", "Interior design", "Modular kitchen", "Bedroom design"],
    gallery: [
      img("residence-nizamabad", "1", "Modular kitchen in blush and white with glass-fronted tall unit", [372, 322]),
      img("residence-nizamabad", "2", "Bedroom with pink upholstered bed and angled wall panelling", [372, 322]),
    ],
  },
  {
    slug: "residence-dubai-client",
    name: "Residential Interior",
    location: "For a Dubai-based client",
    category: "Residential",
    service: "Design",
    summary: "A residence shaped by individual character, layered materials and refined detailing.",
    cover: img("residence-dubai-client", "hero", "Bedroom with tufted headboard, timber wall and warm wall lights", [694, 383]),
    overview:
      "A residential interior designed for a Dubai-based client, with individual character, layered materials and refined detailing throughout.",
    scope: ["Interior design", "Bedroom joinery", "Partition & storage design", "Lighting"],
    gallery: [
      img("residence-dubai-client", "1", "Timber partition with floral cut-outs leading to the kitchen", [446, 383]),
    ],
  },
  {
    slug: "farmhouse-vikarabad",
    name: "Farmhouse",
    location: "Vikarabad",
    category: "Residential",
    service: "Design",
    status: "Upcoming",
    summary: "A private retreat in a classical language of mouldings, chandeliers and soft colour.",
    cover: img("farmhouse-vikarabad", "hero", "Classical dining room with crystal chandelier and upholstered chairs", [372, 353]),
    overview:
      "An upcoming farmhouse at Vikarabad: a private retreat with ornate ceilings, crystal chandeliers and layered classical detailing.",
    scope: ["Interior design", "Ceiling & moulding design", "Lighting", "Furniture & styling"],
    gallery: [
      img("farmhouse-vikarabad", "1", "Living room with ornate ceiling medallion and chandelier", [372, 353]),
      img("farmhouse-vikarabad", "2", "Bedroom suite with carved wall panels and a canopy bed", [372, 353]),
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getAdjacentProjects = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    previous: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
};
