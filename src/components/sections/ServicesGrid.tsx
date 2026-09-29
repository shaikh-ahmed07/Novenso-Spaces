import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "./ServiceCard";
import ButtonLink from "@/components/ui/ButtonLink";
import FadeIn from "@/components/motion/FadeIn";
import SwipeRail from "@/components/ui/SwipeRail";
import GoldLines from "@/components/ui/GoldLines";
import { services } from "@/data/services";

export default function ServicesGrid() {
  return (
    <section className="section-y relative overflow-hidden bg-charcoal text-ivory">
      <GoldLines className="right-5 top-0 h-40 md:right-[8%] md:h-72" />
      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <SectionHeading
            tone="light"
            eyebrow="Our Services"
            title="Six disciplines. One accountable team."
            emphasis={["One"]}
            intro="Engage us for a single service or the full journey, from first sketch to final handover."
          />
          <FadeIn className="hidden shrink-0 md:block">
            <ButtonLink href="/services" variant="outline" tone="light">
              All services
            </ButtonLink>
          </FadeIn>
        </div>

        <div className="mt-10 md:mt-16">
          <SwipeRail tone="dark" label="Services" gridClassName="md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} order={i} />
            ))}
          </SwipeRail>
        </div>

        <div className="mt-8 md:hidden">
          <ButtonLink href="/services" variant="outline" tone="light" className="w-full">
            All services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
