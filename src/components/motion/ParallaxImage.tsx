"use client";

import Image from "next/image";
import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Percentage of travel; keep small for subtlety. */
  strength?: number;
};

/** Image that drifts gently against the scroll direction. */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority,
  strength = 10,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-bone ${className}`}>
      <m.div
        className="absolute inset-x-0 will-change-transform"
        style={{ y, top: `-${strength}%`, bottom: `-${strength}%` }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="img-grade object-cover" />
      </m.div>
    </div>
  );
}
