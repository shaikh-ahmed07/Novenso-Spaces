import FadeIn from "@/components/motion/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { deliveryNetwork, designDetailDelivery } from "@/data/content";

/** "Design. Detail. Delivery." and the supplier network behind it. */
export default function DeliveryNetwork() {
  return (
    <section className="section-y bg-charcoal text-ivory">
      <div className="container-x">
        <SectionHeading
          tone="light"
          eyebrow="How we deliver"
          title="Design. Detail. Delivery."
          emphasis={["Delivery."]}
          intro="Where creative thinking meets technical precision and disciplined execution."
        />

        <div className="mt-10 grid gap-px bg-ivory/10 md:mt-16 md:grid-cols-3">
          {designDetailDelivery.map((d, i) => (
            <FadeIn key={d.title} delay={i * 0.1} className="bg-charcoal py-7 md:p-10 lg:p-12">
              <span className="font-display text-4xl italic text-brass md:text-5xl">0{i + 1}</span>
              <h3 className="mt-3 font-display text-2xl md:mt-6 md:text-3xl">{d.title}</h3>
              <p className="mt-1 text-ivory/90">{d.line}</p>
              <p className="mt-3 text-pretty leading-relaxed text-ivory/65">{d.text}</p>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-16 flex flex-col gap-2 border-t border-ivory/10 pt-10 md:mt-24 md:flex-row md:items-end md:justify-between md:pt-14">
          <h3 className="eyebrow text-brass-light">Our delivery network</h3>
          <p className="text-sm text-ivory/55">A connected ecosystem for end-to-end interior solutions.</p>
        </FadeIn>
        <ul className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {deliveryNetwork.map((n, i) => (
            <FadeIn as="li" key={n.title} delay={i * 0.06} className="border-t border-brass/40 pt-5">
              <p className="font-display text-xl">{n.title}</p>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ivory/65">{n.text}</p>
            </FadeIn>
          ))}
        </ul>
        <FadeIn as="p" className="mt-12 max-w-3xl text-pretty leading-relaxed text-ivory/70">
          Supported by established supplier relationships, specialist vendors and strategic MOUs, enabling
          coordinated sourcing and execution across every stage of a project.
        </FadeIn>
      </div>
    </section>
  );
}
