/**
 * Conversation script for the Novenso concierge chat.
 *
 * Everything the chat says lives here, so tone and questions can be edited
 * without touching UI code. It's a guided flow with light keyword
 * understanding for free-typed questions; no external AI service is used.
 */
import { budgetRanges, projectTypes } from "@/lib/enquiry";
import { services } from "@/data/services";
import { featuredProjects } from "@/data/projects";
import { site } from "@/data/site";

export type Link = { label: string; href: string; external?: boolean };

export type Step =
  | "menu"
  | "space"
  | "scope"
  | "location"
  | "timeline"
  | "budget"
  | "name"
  | "phone"
  | "email"
  | "confirm"
  | "done";

export type Lead = {
  projectType?: string;
  scope?: string;
  location?: string;
  timeline?: string;
  budget?: string;
  name?: string;
  phone?: string;
  email?: string;
};

export type InputMode = { type: "text" | "tel" | "email"; placeholder: string } | null;

export type Turn = {
  say: string[];
  links?: Link[];
  replies?: string[];
  input?: InputMode;
  next: Step;
  lead?: Lead;
  /** Side effects the UI should perform after this turn. */
  action?: "whatsapp" | "submit";
};

export const MENU = {
  project: "Plan a new project",
  sofa: "Custom sofa or furniture",
  services: "What do you offer?",
  work: "Show me your work",
  talk: "Talk to someone now",
};

const SCOPES = [
  "Design only",
  "Design + execution (turnkey)",
  "Execution of an existing design",
  "Project management (PMC)",
  "Not sure yet",
];

const TIMELINES = ["As soon as possible", "Within 1–3 months", "In 3–6 months", "Just exploring"];

const EDIT = "Change something";
const SEND_WA = "Send on WhatsApp";
const CALLBACK = "Request a call back";
const START_OVER = "Start over";
const SKIP = "Skip";

const firstName = (name?: string) => (name ?? "").trim().split(/\s+/)[0] || "";

export function greeting(): Turn {
  const h = new Date().getHours();
  const part = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  return {
    say: [`${part}, and welcome to Novenso Spaces.`, "What can we help you with today?"],
    replies: Object.values(MENU),
    input: { type: "text", placeholder: "Type a question…" },
    next: "menu",
  };
}

const menuAgain = (lead: Lead, say: string[], links?: Link[]): Turn => ({
  say,
  links,
  replies: [MENU.project, MENU.sofa, MENU.talk],
  input: { type: "text", placeholder: "Ask anything…" },
  next: "menu",
  lead,
});

function askSpace(lead: Lead, intro?: string): Turn {
  return {
    say: [...(intro ? [intro] : []), "What kind of space are we talking about?"],
    replies: projectTypes.filter((t) => t !== "Custom Sofa / Furniture"),
    input: { type: "text", placeholder: "Or describe it…" },
    next: "space",
    lead,
  };
}

function summary(lead: Lead) {
  return [
    lead.projectType && `Space: ${lead.projectType}`,
    lead.scope && `Scope: ${lead.scope}`,
    lead.location && `Location: ${lead.location}`,
    lead.timeline && `Timeline: ${lead.timeline}`,
    lead.budget && `Budget: ${lead.budget}`,
    lead.name && `Name: ${lead.name}`,
    lead.phone && `Phone: ${lead.phone}`,
    lead.email && `Email: ${lead.email}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function whatsappMessage(lead: Lead) {
  return `Hello Novenso Spaces, I'd like to discuss a project.\n\n${summary(lead)}`;
}

export function enquiryMessage(lead: Lead) {
  return `Enquiry via website chat.\n\n${summary(lead)}`;
}

/** Answers for free-typed questions. Returns null when nothing matches. */
function answerQuestion(text: string, lead: Lead): Turn | null {
  const t = text.toLowerCase();
  // Match at the start of a word, so "hi" doesn't fire on "which".
  const has = (...w: string[]) => w.some((x) => new RegExp(`(^|[^a-z0-9])${x}`).test(t));

  if (has("hello", "hi\\b", "hey", "namaste", "good morning", "good evening"))
    return menuAgain(lead, ["Hello! Lovely to hear from you.", "Are you planning a space, or just looking around for now?"]);

  if (has("price", "cost", "rate", "charge", "fee", "budget", "expensive", "quote", "how much"))
    return menuAgain(lead, [
      "Honest answer: it depends on the size of the space, the scope and the finishes you choose.",
      "After a short conversation and a site visit, we share a clear, itemised estimate, so there are no surprises later.",
      "Shall I note down a few details so we can give you a realistic range?",
    ]);

  if (has("how long", "time", "duration", "weeks", "months", "deadline"))
    return menuAgain(lead, [
      "Timelines depend on scope. A single room moves much faster than a full home or office.",
      "Once we understand your project, we share a detailed schedule before any work begins, and we manage it from there.",
    ]);

  if (has("sofa", "couch", "upholster", "furniture", "recliner", "bespoke"))
    return {
      say: [
        "Yes, we design and make custom sofas and furniture in-house.",
        "Everything is built to your room's exact dimensions, your preferred comfort level and your choice of fabric or leather.",
        "Would you like us to get in touch about a piece?",
      ],
      links: [{ label: "See Elite Services", href: "/elite-services" }],
      replies: ["Yes, let's discuss", MENU.work, START_OVER],
      input: { type: "text", placeholder: "Tell us what you have in mind…" },
      next: "menu",
      lead: { ...lead, projectType: "Custom Sofa / Furniture" },
    };

  if (has("pmc", "project management", "manage", "consult"))
    return menuAgain(
      lead,
      [
        "As your PMC, we plan the schedule and budget, manage vendors and contractors, and check quality at every stage.",
        "It's ideal if you already have a designer or contractor and want someone on your side to keep everything on track.",
      ],
      [{ label: "Interior PMC", href: "/services#interior-pmc" }],
    );

  if (has("execut", "contract", "turnkey", "civil", "carpentr", "false ceiling", "painting", "electrical", "plumbing"))
    return menuAgain(
      lead,
      [
        "We handle complete on-site execution: civil, electrical, plumbing, carpentry, ceilings, flooring, painting, lighting and finishing.",
        "You get one accountable team from start to handover.",
      ],
      [
        { label: "Interior Execution", href: "/services#interior-execution" },
        { label: "Contracting", href: "/services#contracting" },
      ],
    );

  if (has("design", "3d", "layout", "render", "concept"))
    return menuAgain(
      lead,
      [
        "Our design work covers concept, space planning, materials, lighting, 3D visualisation and detailed working drawings.",
        "And because we also execute, what you approve on paper is what gets built.",
      ],
      [{ label: "Interior Design", href: "/services#interior-design" }],
    );

  if (has("where", "location", "city", "office", "address", "visit"))
    return menuAgain(lead, [
      `Our studio is at ${site.address.street}, ${site.address.city}, ${site.address.region}. We work on projects across India and internationally, including the UAE.`,
      "Tell us your city and the project location, and we'll confirm how we can support you there.",
      `You can also reach us directly on WhatsApp at ${site.phone.display}.`,
    ]);

  if (has("whatsapp", "call", "phone", "number", "contact", "talk", "speak", "human", "person"))
    return {
      say: ["Of course. You can reach the team directly:"],
      links: [
        { label: `WhatsApp ${site.phone.display}`, href: `https://wa.me/${site.whatsapp}`, external: true },
        { label: `Call ${site.phone.display}`, href: `tel:${site.phone.tel}`, external: true },
        { label: site.email, href: `mailto:${site.email}`, external: true },
      ],
      replies: [MENU.project, START_OVER],
      input: { type: "text", placeholder: "Type a message…" },
      next: "menu",
      lead,
    };

  if (has("project", "portfolio", "work", "photos", "example"))
    return showWork(lead);

  if (has("thank", "thanks", "great", "perfect", "ok", "okay"))
    return menuAgain(lead, ["You're welcome! Is there anything else I can help with?"]);

  return null;
}

function showWork(lead: Lead): Turn {
  return {
    say: ["Here are a few recent projects. Tap one to open the case study."],
    links: [
      ...featuredProjects.slice(0, 4).map((p) => ({ label: `${p.name} · ${p.category}`, href: `/projects/${p.slug}` })),
      { label: "All projects", href: "/projects" },
    ],
    replies: [MENU.project, START_OVER],
    input: { type: "text", placeholder: "Type a message…" },
    next: "menu",
    lead,
  };
}

/** Advance the conversation given the visitor's reply at `step`. */
export function respond(step: Step, input: string, lead: Lead): Turn {
  const text = input.trim();

  if (text === START_OVER) return { ...greeting(), lead: {} };

  switch (step) {
    case "menu": {
      if (text === MENU.project) return askSpace(lead, "Wonderful, let's get a picture of your project. It'll only take a minute.");
      if (text === MENU.sofa || text === "Yes, let's discuss")
        return {
          say: ["Lovely. A few quick questions so the right person gets back to you.", "What's the scope?"],
          replies: ["A single custom sofa", "Sofas + other furniture", "Re-upholstery", "Not sure yet"],
          input: { type: "text", placeholder: "Or describe the piece…" },
          next: "scope",
          lead: { ...lead, projectType: "Custom Sofa / Furniture" },
        };
      if (text === MENU.services)
        return {
          say: ["We cover the full journey, and you can engage us for any single part of it:"],
          links: services.map((s) => ({ label: s.title, href: `/services#${s.slug}` })),
          replies: [MENU.project, MENU.work],
          input: { type: "text", placeholder: "Ask about a service…" },
          next: "menu",
          lead,
        };
      if (text === MENU.work) return showWork(lead);
      if (text === MENU.talk) return answerQuestion("talk", lead)!;
      return (
        answerQuestion(text, lead) ??
        menuAgain(lead, [
          "Good question. That's one our team should answer properly.",
          "Would you like to share a few project details, or message us directly on WhatsApp?",
        ])
      );
    }

    case "space":
      return {
        say: [
          (projectTypes as readonly string[]).includes(text) ? `${text}, lovely.` : "Thanks, noted.",
          "What would you like us to take on?",
        ],
        replies: SCOPES,
        input: { type: "text", placeholder: "Or describe the scope…" },
        next: "scope",
        lead: { ...lead, projectType: projectTypes.find((t) => t === text) ?? "Other", scope: undefined, location: undefined },
      };

    case "scope":
      return {
        say: ["Got it.", "Where is the project located?"],
        input: { type: "text", placeholder: "City or area, e.g. Hyderabad, Jubilee Hills" },
        next: "location",
        lead: { ...lead, scope: text },
      };

    case "location":
      return {
        say: ["And when are you hoping to begin?"],
        replies: TIMELINES,
        input: null,
        next: "timeline",
        lead: { ...lead, location: text },
      };

    case "timeline":
      return {
        say: ["Do you have a budget in mind? A rough range is perfectly fine."],
        replies: [...budgetRanges],
        input: null,
        next: "budget",
        lead: { ...lead, timeline: text },
      };

    case "budget":
      return {
        say: ["Thank you, that's really helpful.", "May I have your name?"],
        input: { type: "text", placeholder: "Your name" },
        next: "name",
        lead: { ...lead, budget: (budgetRanges as readonly string[]).includes(text) ? text : "Not sure yet" },
      };

    case "name": {
      if (text.length < 2)
        return { say: ["Could you share your name, please?"], input: { type: "text", placeholder: "Your name" }, next: "name", lead };
      return {
        say: [`Nice to meet you, ${firstName(text)}.`, "What's the best number to reach you on?"],
        input: { type: "tel", placeholder: "+91 98765 43210" },
        next: "phone",
        lead: { ...lead, name: text },
      };
    }

    case "phone": {
      const digits = text.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 13)
        return {
          say: ["That number doesn't look quite right. Could you check it for me?"],
          input: { type: "tel", placeholder: "+91 98765 43210" },
          next: "phone",
          lead,
        };
      return {
        say: ["And your email? It's optional, but handy for sharing drawings and estimates."],
        replies: [SKIP],
        input: { type: "email", placeholder: "you@example.com" },
        next: "email",
        lead: { ...lead, phone: text },
      };
    }

    case "email": {
      const email = text === SKIP ? undefined : text;
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
        return {
          say: ["Hmm, that email doesn't look right. Try again, or skip it."],
          replies: [SKIP],
          input: { type: "email", placeholder: "you@example.com" },
          next: "email",
          lead,
        };
      const next = { ...lead, email };
      return {
        say: ["Here's what I have:", summary(next), "How would you like to continue?"],
        replies: [SEND_WA, CALLBACK, EDIT],
        input: null,
        next: "confirm",
        lead: next,
      };
    }

    case "confirm":
      if (text === SEND_WA)
        return {
          say: ["Opening WhatsApp with your details filled in. Just press send."],
          replies: [CALLBACK, START_OVER],
          input: null,
          next: "confirm",
          lead,
          action: "whatsapp",
        };
      if (text === CALLBACK) return { say: [], next: "done", lead, action: "submit" };
      if (text === EDIT) return askSpace({}, "No problem, let's go through it again.");
      return {
        say: ["Would you like to send this on WhatsApp, or have us call you back?"],
        replies: [SEND_WA, CALLBACK, EDIT],
        input: null,
        next: "confirm",
        lead,
      };

    case "done":
      return answerQuestion(text, lead) ?? menuAgain(lead, ["Noted. Our team will pick this up when they call you."]);
  }
}

export function submittedTurn(lead: Lead, ok: boolean): Turn {
  return ok
    ? {
        say: [
          `Thank you, ${firstName(lead.name)}. Your details are with our team.`,
          `We'll call you on ${lead.phone} shortly. If it's urgent, WhatsApp us any time.`,
        ],
        links: [{ label: `WhatsApp ${site.phone.display}`, href: `https://wa.me/${site.whatsapp}`, external: true }],
        replies: [START_OVER],
        input: { type: "text", placeholder: "Anything else?" },
        next: "done",
        lead,
      }
    : {
        say: ["Sorry, that didn't go through on our side.", "Could you send it on WhatsApp instead? Your details will be filled in."],
        replies: [SEND_WA],
        input: null,
        next: "confirm",
        lead,
      };
}
