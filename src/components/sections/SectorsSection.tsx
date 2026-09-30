import Image from "next/image";
import FadeIn from "@/components/motion/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { sectors } from "@/data/content";

/** The four sectors Novenso designs for, from the company profile. */
export default function SectorsSection() {
  return (
    <section className="section-y bg-bone">
      <div className="container-x">
        <SectionHeading
          eyebrow="What we shape"
          title="Spaces, shaped around life."
          emphasis={["life."]}
          intro="From homes to workspaces, hospitality to commercial environments, we create interiors that are purposeful, beautiful and built for the way people live, work and experience today."
        />

        <div className="mt-10 grid grid-cols-2 gap-3 md:mt-16 md:gap-4 lg:grid-cols-4">
          {sectors.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.08} className="relative aspect-[3/5] overflow-hidden bg-ink">
              <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="img-grade object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/85 to-transparent px-4 pb-6 pt-20 text-center md:px-6 md:pb-8">
                <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ivory md:text-xs">{s.title}</h3>
                <span aria-hidden className="mx-auto mt-3 block h-px w-8 bg-brass" />
                <p className="mt-3 font-display text-base italic leading-snug text-ivory/85 md:text-lg">{s.line}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
