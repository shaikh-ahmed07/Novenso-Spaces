import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ContactForm from "@/components/sections/ContactForm";
import FadeIn from "@/components/motion/FadeIn";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Novenso Spaces about your interior design, project management, execution or bespoke furniture project.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", images: ["/images/site/contact.jpg"] },
};

const expectations = [
  "We review every enquiry personally.",
  "We'll arrange a conversation to understand your space and goals.",
  "Where it's a fit, we'll outline scope, approach and next steps.",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your space."
        emphasis={["your", "space."]}
        intro="Tell us a little about your project and we'll be in touch to take it forward."
        image="/images/site/contact.jpg"
        imageAlt="Refined dining room with long table, upholstered chairs and framed artwork"
      />

      <section className="section-y bg-ivory">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-20">
          <aside className="lg:col-span-4">
            <FadeIn>
              <p className="eyebrow flex items-center gap-4 text-brass-deep">
                <span className="rule-brass" />
                Get in touch
              </p>
              <h2 className="display-md mt-8 text-ink">{site.legalName}</h2>
            </FadeIn>

            <FadeIn delay={0.1} className="mt-10 border-t border-ink/10 pt-8">
              <p className="eyebrow text-ash">Email</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 block break-all font-display text-2xl text-ink transition-colors hover:text-brass-deep md:text-[1.7rem]"
              >
                {site.email}
              </a>
            </FadeIn>

            <FadeIn delay={0.12} className="mt-10 border-t border-ink/10 pt-8">
              <p className="eyebrow text-ash">Phone &amp; WhatsApp</p>
              <a
                href={`tel:${site.phone.tel}`}
                className="mt-3 block font-display text-2xl text-ink transition-colors hover:text-brass-deep md:text-[1.7rem]"
              >
                {site.phone.display}
              </a>
              <div className="mt-5 flex flex-col gap-3 xs:flex-row">
                <a
                  href={whatsappLink("Hello Novenso Spaces, I'd like to discuss a project.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center gap-2.5 bg-[#25D366] px-5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90"
                >
                  <WhatsAppIcon className="h-5 w-5" /> WhatsApp us
                </a>
                <a
                  href={`tel:${site.phone.tel}`}
                  className="flex min-h-12 items-center justify-center gap-2.5 border border-ink/20 px-5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink"
                >
                  <PhoneIcon className="h-4 w-4" /> Call
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} className="mt-10 border-t border-ink/10 pt-8">
              <p className="eyebrow text-ash">What happens next</p>
              <ol className="mt-5 space-y-4">
                {expectations.map((e, i) => (
                  <li key={e} className="flex gap-4 text-[0.95rem] leading-relaxed text-charcoal">
                    <span className="font-display italic text-brass">0{i + 1}</span>
                    {e}
                  </li>
                ))}
              </ol>
            </FadeIn>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            <FadeIn>
              <h2 className="display-md mb-12 text-ink">Project enquiry</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <ContactForm />
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
