import AnimatedText from "@/components/motion/AnimatedText";
import FadeIn from "@/components/motion/FadeIn";

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  as?: "h1" | "h2";
  emphasis?: string[];
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "left",
  as = "h2",
  emphasis,
  className = "",
}: Props) {
  const muted = tone === "light" ? "text-ivory/70" : "text-ash";
  const center = align === "center" ? "mx-auto text-center items-center" : "";
  return (
    <div className={`flex max-w-3xl flex-col ${center} ${className}`}>
      <FadeIn className="mb-4 flex items-center gap-4 md:mb-6" y={10}>
        <span className="rule-brass" />
        <span className={`eyebrow ${tone === "light" ? "text-brass-light" : "text-brass-deep"}`}>
          {eyebrow}
        </span>
      </FadeIn>
      <AnimatedText
        as={as}
        text={title}
        emphasis={emphasis}
        className={`display-lg text-balance ${tone === "light" ? "text-ivory" : "text-ink"}`}
      />
      {intro && (
        <FadeIn delay={0.1} className={`lead mt-4 max-w-2xl text-pretty md:mt-6 ${muted}`} as="p">
          {intro}
        </FadeIn>
      )}
    </div>
  );
}
