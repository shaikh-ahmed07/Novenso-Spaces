# Novenso Spaces — Website

Corporate website for **Novenso Spaces Private Limited**, built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 and Framer Motion.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Home: hero, about, services, featured work, process, elite services, why us, CTA |
| `/about` | Company, principles, process, differentiators |
| `/services` | All six services with anchors (`/services#interior-design`, etc.) |
| `/projects` | Portfolio with category filter |
| `/projects/[slug]` | Case study page, generated from project data |
| `/elite-services` | Bespoke / custom sofa offering |
| `/contact` | Contact details + validated enquiry form |
| `/api/enquiry` | POST endpoint for the form |
| `/sitemap.xml`, `/robots.txt` | Generated automatically |

## Updating content

All copy and data live in `src/data/`. You rarely need to touch components.

- **Company info** (name, email, phone, WhatsApp number, domain): `src/data/site.ts`
- **Chat conversation** (all questions, replies and answers to common questions): `src/components/chat/script.ts`
- **Services**: `src/data/services.ts`
- **Process steps, differentiators, capabilities, elite services**: `src/data/content.ts`
- **Projects**: `src/data/projects.ts`

### Adding a project

1. Create `public/images/projects/<your-slug>/` and add `hero.jpg` plus gallery images (`1.jpg`, `2.jpg`, …).
2. Add an entry to the `projects` array in `src/data/projects.ts`.
3. Set `featured: true` to show it on the homepage (the first four featured projects are shown).

The case-study page, portfolio card, filter count and sitemap entry are all created automatically.

### Replacing images

Every image is a local file under `public/images/`. Replace a file with one of the same name to swap it; there's no need to change any code. Landscape images around 2400px wide work best for heroes, and 1800px for everything else.

## Before launch

- [ ] **Replace placeholder projects.** The seven projects in `src/data/projects.ts` are illustrative, with stock photography, names and locations. Replace them with real Novenso Spaces work.
- [ ] **Replace stock photography.** Current images are from Unsplash (credits in `public/images/CREDITS.json`).
- [ ] **Turn on enquiry emails.** The contact form and the chat's call-back requests are emailed to Gmail via `src/lib/mailer.ts`. Create a Google App Password (https://myaccount.google.com/apppasswords, needs 2-Step Verification) and set `GMAIL_USER`, `GMAIL_APP_PASSWORD` and optionally `ENQUIRY_TO` in `.env.local`, and in your hosting provider's environment variables for the live site. See `.env.example`. Without them, development logs enquiries to the terminal and production shows visitors an error with your email and WhatsApp.
- [ ] Confirm the production domain in `src/data/site.ts` (`url`). It is used for canonical URLs, Open Graph and the sitemap.

## Structure

```
src/
  app/                 routes, layout, metadata, sitemap, robots, API
  components/
    layout/            Navbar, Footer, Logo
    motion/            AnimatedText, ImageReveal, FadeIn, ParallaxImage, MotionProvider
    sections/          Hero, PageHero, AboutIntro, ServiceCard, ServicesGrid, ProcessSection,
                       ProjectCard, ProjectGrid, FeaturedProjects, ProjectGallery,
                       EliteSection, EliteShowcase, WhySection, CTASection, ContactForm
    ui/                ButtonLink, SectionHeading
  data/                all editable content
  lib/                 motion presets, enquiry validation (shared by client + API)
public/
  brand/               logo + transparent monogram
  images/              all site photography
```

## Notes

- Animations respect the visitor's "reduce motion" setting.
- Framer Motion is loaded with `LazyMotion` to keep the JS bundle small.
- Brand colours and type are defined as Tailwind theme tokens in `src/app/globals.css`.
