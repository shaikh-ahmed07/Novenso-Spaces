import ParallaxImage from "@/components/motion/ParallaxImage";
import AnimatedText from "@/components/motion/AnimatedText";
import FadeIn from "@/components/motion/FadeIn";
import ButtonLink from "@/components/ui/ButtonLink";
import GoldLines from "@/components/ui/GoldLines";
import { site } from "@/data/site";

type Props = {
  title?: string;
  text?: string;
  cta?: string;
  href?: string;
  image?: string;
  emphasis?: string[];
};

export default function CTASection({
  title = "Let's Create a Space Worth Experiencing.",
  text = "Have a project in mind? Let's discuss your requirements and explore what's possible.",
  cta = "Start a Conversation",
  href = "/contact",
  image = "/images/site/cta.jpg",
  emphasis = ["Worth"],
}: Props) {
  return (
    <section className="relative overflow-hidden bg-ink text-ivory">
      <div aria-hidden className="absolute inset-0">
        <ParallaxImage src={image} alt="" className="h-full w-full" strength={12} />
      </div>
      <div aria-hidden className="absolute inset-0 bg-ink/70" />
      <GoldLines className="left-1/2 top-0 h-20 -translate-x-1/2 md:h-28" />
      <div className="container-x relative flex min-h-[70svh] flex-col items-center justify-center py-24 text-center md:min-h-[85vh]">
        <FadeIn className="mb-8 flex items-center gap-4" y={12}>
          <span className="rule-brass" />
          <span className="eyebrow text-brass-light">Start a Project</span>
          <span className="rule-brass" />
        </FadeIn>
        <AnimatedText
          text={title}
          emphasis={emphasis}
          className="display-xl mx-auto max-w-[14ch] text-balance"
        />
        <FadeIn as="p" delay={0.25} className="lead mx-auto mt-8 max-w-xl text-pretty text-ivory/75">
          {text}
        </FadeIn>
        <FadeIn delay={0.35} className="mt-12 flex flex-col items-center gap-6">
          <ButtonLink href={href} tone="light" className="w-full xs:w-auto">
            {cta}
          </ButtonLink>
          <a
            href={`mailto:${site.email}`}
            className="text-sm tracking-wide text-ivory/60 underline-offset-8 transition-colors hover:text-ivory hover:underline"
          >
            or write to {site.email}
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
