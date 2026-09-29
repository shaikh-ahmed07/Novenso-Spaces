import Image from "next/image";
import Link from "next/link";

type Props = {
  tone?: "light" | "dark";
  className?: string;
  onClick?: () => void;
};

/**
 * Brand lockup: the gold "N" monogram from the supplied logo, paired with a
 * typeset wordmark so it stays crisp and legible on light or dark grounds.
 */
export default function Logo({ tone = "dark", className = "", onClick }: Props) {
  const text = tone === "light" ? "text-ivory" : "text-ink";
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Novenso Spaces — home"
      className={`group flex items-center gap-3 ${className}`}
    >
      <Image
        src="/brand/novenso-monogram.png"
        alt=""
        width={457}
        height={569}
        priority
        className="h-9 w-auto sm:h-10"
      />
      <span className={`flex flex-col items-center leading-none transition-colors duration-500 ${text}`}>
        {/* Negative right margins cancel the trailing letter-spacing so both lines centre optically. */}
        <span className="-mr-[0.32em] font-display text-[1.2rem] tracking-[0.32em] sm:text-[1.35rem]">NOVENSO</span>
        <span className="mt-1 flex w-full items-center gap-2 text-[0.55rem] font-normal">
          <span className="h-px flex-1 bg-brass" />
          <span className="-mr-[0.5em] tracking-[0.5em]">SPACES</span>
          <span className="h-px flex-1 bg-brass" />
        </span>
      </span>
    </Link>
  );
}
