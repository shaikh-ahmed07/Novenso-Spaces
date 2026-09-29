"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { EASE, viewportOnce } from "@/lib/motion";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Direction the curtain opens towards. */
  from?: "bottom" | "left" | "right";
  delay?: number;
};

const clipFrom = {
  bottom: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/**
 * Image that unveils with a clip-path curtain while settling from a slight
 * zoom. The parent must define the size/aspect ratio via `className`.
 */
export default function ImageReveal({
  src,
  alt,
  className = "",
  imageClassName = "",
  sizes = "100vw",
  priority,
  from = "bottom",
  delay = 0,
}: Props) {
  return (
    <m.div
      className={`relative overflow-hidden bg-bone ${className}`}
      initial={{ clipPath: clipFrom[from] }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={viewportOnce}
      transition={{ duration: 0.95, ease: EASE, delay }}
    >
      <m.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.4, ease: EASE, delay }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`img-grade object-cover ${imageClassName}`}
        />
      </m.div>
    </m.div>
  );
}
