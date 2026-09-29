/**
 * Portfolio data.
 *
 * To add a project: add an object to `projects` below and put its images in
 * /public/images/projects/<slug>/. A case-study page is generated
 * automatically at /projects/<slug> and the project appears in the portfolio
 * grid, sitemap and category filters.
 *
 * NOTE: The projects below are illustrative placeholders using stock
 * photography. Replace them with real Novenso Spaces projects before launch.
 */

export const projectCategories = [
  "Residential",
  "Commercial",
  "Corporate",
  "Hospitality",
  "Custom Interiors",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectImage = { src: string; alt: string };

export type Project = {
  slug: string;
  name: string;
  location: string;
  category: ProjectCategory;
  year: string;
  area?: string;
  summary: string;
  cover: ProjectImage;
  overview: string;
  concept: string;
  scope: string[];
  materials: string[];
  execution: string;
  challenges: string;
  solutions: string;
  outcome: string;
  gallery: ProjectImage[];
  featured?: boolean;
};

const img = (slug: string, file: string, alt: string): ProjectImage => ({
  src: `/images/projects/${slug}/${file}.jpg`,
  alt,
});

export const projects: Project[] = [
  {
    slug: "lakeview-villa",
    name: "The Lakeview Villa",
    location: "Hyderabad",
    category: "Residential",
    year: "2025",
    area: "8,400 sq ft",
    summary:
      "A private residence opened up to the water, with quiet materials and furniture made for the house.",
    cover: img("lakeview-villa", "hero", "Bright villa bedroom with floor-to-ceiling glazing overlooking a lake"),
    overview:
      "A family home on the water's edge, redesigned so that every principal room faces the view. The brief called for a calm, low-maintenance interior that could host large family gatherings without feeling formal.",
    concept:
      "A restrained palette of pale oak, honed stone and textured plaster lets the landscape lead. Furniture is low and soft-edged so the sightlines to the lake remain unbroken.",
    scope: [
      "Full interior design",
      "Space re-planning",
      "Turnkey execution",
      "Custom furniture & sofas",
      "Lighting design",
      "Styling & handover",
    ],
    materials: [
      "Brushed white oak flooring",
      "Honed travertine",
      "Lime plaster walls",
      "Bouclé & linen upholstery",
      "Brushed brass fittings",
    ],
    execution:
      "Delivered in two phases while the family stayed in the guest wing. Wet trades were sequenced first, with joinery pre-fabricated off-site to reduce time on site.",
    challenges:
      "Existing columns interrupted the main living space, and strong afternoon glare made the lake-facing rooms uncomfortable.",
    solutions:
      "Columns were wrapped into built-in shelving and seating niches. Layered sheers and motorised blinds control glare while keeping the view.",
    outcome:
      "A home that feels open and settled, with bespoke seating sized to the rooms and a finish level the family can live with every day.",
    gallery: [
      img("lakeview-villa", "1", "Soft neutral living room with sculptural sofas and arched doorway"),
      img("lakeview-villa", "2", "Bedroom with timber wall panelling and grey upholstered lounge chair"),
      img("lakeview-villa", "3", "Dining room with linear pendant light and upholstered chairs"),
      img("lakeview-villa", "4", "Marble bathroom with twin brass-framed mirrors"),
    ],
    featured: true,
  },
  {
    slug: "meridian-workplace",
    name: "Meridian Workplace",
    location: "Bengaluru",
    category: "Corporate",
    year: "2025",
    area: "22,000 sq ft",
    summary:
      "A headquarters fit-out balancing focused work, collaboration and client-facing spaces.",
    cover: img("meridian-workplace", "hero", "Corporate meeting room with timber table and tan leather chairs"),
    overview:
      "A full-floor headquarters for a growing professional services firm. The workplace needed to support hybrid working, client meetings and a strong brand presence on arrival.",
    concept:
      "Warm timber, soft acoustic finishes and daylight-led planning create a workplace that feels considered rather than corporate. Meeting rooms line the core so the perimeter stays open.",
    scope: [
      "Workplace strategy & planning",
      "Interior design",
      "Interior PMC",
      "MEP coordination",
      "Execution & fit-out",
      "Loose furniture procurement",
    ],
    materials: [
      "Oak veneer wall panelling",
      "Acoustic fabric panels",
      "Terrazzo reception floor",
      "Glass partition systems",
      "Powder-coated metal details",
    ],
    execution:
      "Executed on an occupied building with strict working hours. Noisy works were scheduled out of hours and a detailed logistics plan managed deliveries through a shared goods lift.",
    challenges:
      "A tight twelve-week programme and a low slab-to-slab height limited ceiling services.",
    solutions:
      "Exposed, carefully organised services in open areas and slim-profile ceilings in meeting rooms kept height where it mattered. Early procurement of long-lead items protected the programme.",
    outcome:
      "Handed over on programme, giving the team a workplace that supports both focused and collaborative work.",
    gallery: [
      img("meridian-workplace", "1", "Bright lounge area with curved white seating and tall windows"),
      img("meridian-workplace", "2", "Boardroom with pendant lights and blush upholstered chairs"),
      img("meridian-workplace", "3", "Large conference room with white chairs and city views"),
      img("meridian-workplace", "4", "Open-plan breakout area with soft seating"),
    ],
    featured: true,
  },
  {
    slug: "aurum-boutique-hotel",
    name: "Aurum Boutique Hotel",
    location: "Goa",
    category: "Hospitality",
    year: "2024",
    area: "36 keys",
    summary:
      "Lobby, lounge and guest rooms for an intimate hotel built around warmth and craft.",
    cover: img("aurum-boutique-hotel", "hero", "Hotel reception with golden fluted wall and timber desk"),
    overview:
      "Interior design and turnkey delivery for a boutique hotel's arrival lobby, lounge bar and guest rooms. The owners wanted a hotel that felt personal, with a strong sense of place.",
    concept:
      "A golden, fluted backdrop anchors the lobby. Guest rooms continue the warm palette with custom headboards, lounge seating and handcrafted lighting.",
    scope: [
      "Hospitality interior design",
      "FF&E specification",
      "Custom headboards & seating",
      "Execution & fit-out",
      "Mock-up room",
      "Pre-opening styling",
    ],
    materials: [
      "Fluted metallic wall finish",
      "Natural stone flooring",
      "Walnut joinery",
      "Performance velvet upholstery",
      "Handblown glass lighting",
    ],
    execution:
      "A full mock-up room was built and approved before rolling out to all keys, allowing detail and cost refinements early.",
    challenges:
      "Hotel-grade durability was required without losing the handcrafted character the owners wanted.",
    solutions:
      "Performance fabrics, sealed stone and robust joinery details were specified, with craft reserved for touchpoints guests notice most.",
    outcome:
      "The hotel opened on schedule with interiors that give it a distinct, personal character.",
    gallery: [
      img("aurum-boutique-hotel", "1", "Hotel bed with crisp white linens and warm lamp light"),
      img("aurum-boutique-hotel", "2", "Hotel lobby with timber-slatted reception and stone floor"),
      img("aurum-boutique-hotel", "3", "Guest suite with armchairs and a writing desk"),
      img("aurum-boutique-hotel", "4", "Dark lounge corner with teal armchairs and a floor lamp"),
    ],
    featured: true,
  },
  {
    slug: "atelier-lounge-collection",
    name: "Atelier Lounge Collection",
    location: "Novenso Workshop",
    category: "Custom Interiors",
    year: "2025",
    summary:
      "A series of made-to-measure sofas and lounge chairs designed and built in-house.",
    cover: img("atelier-lounge-collection", "hero", "Moody lounge with teal armchairs and a sculptural floor lamp"),
    overview:
      "A collection of bespoke seating developed for private residences and hospitality clients, from compact lounge chairs to deep modular sofas.",
    concept:
      "Generous proportions, tailored seams and exposed timber details. Each piece is adapted in size, depth and firmness to the room and the client.",
    scope: [
      "Furniture design",
      "Prototyping",
      "Frame manufacturing",
      "Upholstery",
      "Finishing",
      "Delivery & installation",
    ],
    materials: [
      "Kiln-dried hardwood frames",
      "High-resilience foam & feather wraps",
      "Velvet, linen & bouclé",
      "Full-grain leather",
      "Solid walnut & oak details",
    ],
    execution:
      "Every piece is prototyped at full scale for client sign-off, then built in our workshop with quality checks at frame, foam and upholstery stages.",
    challenges:
      "Clients wanted exact sizes and comfort levels that standard ranges do not offer.",
    solutions:
      "A modular frame system lets us change dimensions and seat depth without redesigning from scratch, while keeping lead times predictable.",
    outcome:
      "Pieces that fit their rooms precisely and are built to be re-upholstered rather than replaced.",
    gallery: [
      img("atelier-lounge-collection", "1", "Tan leather sofa with deep, tailored seat cushions"),
      img("atelier-lounge-collection", "2", "Round lounge chair with timber base and grey upholstery"),
      img("atelier-lounge-collection", "3", "Timber frame detail with radiating slats"),
      img("atelier-lounge-collection", "4", "Craftsman's hands carving a timber panel"),
    ],
    featured: true,
  },
  {
    slug: "skyline-residence",
    name: "Skyline Residence",
    location: "Mumbai",
    category: "Residential",
    year: "2024",
    area: "3,200 sq ft",
    summary:
      "A high-rise apartment with gallery-like living spaces and quietly luxurious bedrooms.",
    cover: img("skyline-residence", "hero", "Modern living room with grey sofa and large abstract artwork"),
    overview:
      "A complete interior for a high-rise apartment, designed for a couple who collect contemporary art and entertain often.",
    concept:
      "Soft greys and deep charcoals set up the art. Lighting is layered so the apartment works as well at night as during the day.",
    scope: [
      "Interior design",
      "Execution",
      "Kitchen & wardrobe joinery",
      "Art lighting",
      "Custom sofas",
    ],
    materials: [
      "Microcement feature walls",
      "Smoked oak joinery",
      "Calacatta-look porcelain",
      "Wool & silk rugs",
    ],
    execution:
      "Executed within a residential tower with restricted working hours and lift access, requiring careful material logistics.",
    challenges:
      "Low ceilings and exposed beams limited lighting options.",
    solutions:
      "Recessed profiles and track systems were integrated into slim bulkheads that also conceal air-conditioning.",
    outcome:
      "An apartment that feels calm and generous, with art that looks as intended from every angle.",
    gallery: [
      img("skyline-residence", "1", "Dark bedroom with grey upholstered bed and round mirror"),
      img("skyline-residence", "2", "Dining area with marble backsplash and globe chandelier"),
      img("skyline-residence", "3", "Dining room with backlit shelving and city view"),
      img("skyline-residence", "4", "Bathroom with fluted vanity and marble walls"),
    ],
  },
  {
    slug: "ember-oak-dining",
    name: "Ember & Oak",
    location: "Hyderabad",
    category: "Hospitality",
    year: "2024",
    area: "4,500 sq ft",
    summary:
      "A warm, timber-rich restaurant designed around an open kitchen.",
    cover: img("ember-oak-dining", "hero", "Restaurant dining room with timber ceiling and pendant lights"),
    overview:
      "Interior design and execution for a chef-led restaurant where the kitchen is part of the experience.",
    concept:
      "Exposed timber, warm pendants and brick create an intimate room that glows at night, with the open kitchen as its focal point.",
    scope: [
      "Restaurant interior design",
      "Kitchen coordination",
      "Execution",
      "Custom banquettes",
      "Lighting design",
    ],
    materials: [
      "Reclaimed timber ceiling",
      "Exposed brick",
      "Leather banquettes",
      "Blackened steel",
    ],
    execution:
      "Delivered in ten weeks with fire, kitchen and exhaust services closely coordinated with the design.",
    challenges:
      "Acoustic comfort in a room with many hard surfaces.",
    solutions:
      "Acoustic panels are hidden within the timber ceiling, and upholstered banquettes absorb sound around the room.",
    outcome:
      "A lively room that is still comfortable for conversation.",
    gallery: [
      img("ember-oak-dining", "1", "Restaurant with honeycomb ceiling and timber tables"),
      img("ember-oak-dining", "2", "Open kitchen bar with timber counter"),
      img("ember-oak-dining", "3", "Dining room with wine display and decorative pendants"),
      img("ember-oak-dining", "4", "Low-lit restaurant tables set for evening service"),
    ],
  },
  {
    slug: "maison-concept-store",
    name: "Maison Concept Store",
    location: "Delhi",
    category: "Commercial",
    year: "2023",
    area: "2,800 sq ft",
    summary:
      "A flagship retail store with crafted timber display joinery.",
    cover: img("maison-concept-store", "hero", "Retail interior with timber cabinets and green artwork"),
    overview:
      "A flagship store for a lifestyle brand, designed to feel more like a well-kept home than a shop.",
    concept:
      "Warm timber casework and domestic-scale furniture slow visitors down and let products be handled and explored.",
    scope: [
      "Retail interior design",
      "Custom display joinery",
      "Execution",
      "Visual merchandising support",
    ],
    materials: [
      "Solid ash & oak joinery",
      "Lime-washed walls",
      "Polished concrete floor",
      "Linen & brass details",
    ],
    execution:
      "All display joinery was pre-fabricated and installed over five nights to meet the mall's fit-out window.",
    challenges:
      "Flexible display for changing seasonal collections.",
    solutions:
      "A modular shelving system with concealed fixings lets the store be reconfigured by staff without tools.",
    outcome:
      "A store that invites visitors to linger, and a fit-out system the brand can adapt as it grows.",
    gallery: [
      img("maison-concept-store", "1", "Retail space with timber display tables and fitting room"),
      img("maison-concept-store", "2", "Bright retail interior with white display units"),
      img("maison-concept-store", "3", "Retail hall with timber-clad ceiling, skylight and steel columns"),
      img("maison-concept-store", "4", "Minimal gallery-like retail interior with golden panels"),
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const featuredProjects = projects.filter((p) => p.featured);

export const getAdjacentProjects = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    previous: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
};
