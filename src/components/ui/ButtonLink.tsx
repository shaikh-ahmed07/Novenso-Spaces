import Link from "next/link";

type Variant = "solid" | "outline" | "ghost";
type Tone = "dark" | "light";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  tone?: Tone;
  className?: string;
  onClick?: () => void;
};

const base =
  "group relative inline-flex min-h-12 items-center whitespace-nowrap justify-center gap-3 overflow-hidden px-7 text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-500";

const styles: Record<Variant, Record<Tone, string>> = {
  solid: {
    dark: "bg-ink text-ivory hover:text-ink",
    light: "bg-ivory text-ink hover:text-ink",
  },
  outline: {
    dark: "border border-ink/30 text-ink hover:text-ivory hover:border-ink",
    light: "border border-ivory/40 text-ivory hover:text-ink hover:border-ivory",
  },
  ghost: {
    dark: "px-0 text-ink",
    light: "px-0 text-ivory",
  },
};

const fill: Record<Variant, Record<Tone, string>> = {
  solid: { dark: "bg-brass", light: "bg-brass" },
  outline: { dark: "bg-ink", light: "bg-ivory" },
  ghost: { dark: "", light: "" },
};

function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 12"
      className="relative h-3 w-6 transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M0 6h22M17 1l5 5-5 5" />
    </svg>
  );
}

/** Link styled as a button. Uses next/link for internal routes, <a> otherwise. */
export default function ButtonLink({
  href,
  children,
  variant = "solid",
  tone = "dark",
  className = "",
  onClick,
}: Props) {
  const cls = `${base} ${styles[variant][tone]} ${className}`;
  const inner = (
    <>
      {variant !== "ghost" && (
        <span
          aria-hidden
          className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:scale-y-100 ${fill[variant][tone]}`}
        />
      )}
      <span className={`relative ${variant === "ghost" ? "border-b border-current pb-1" : ""}`}>
        {children}
      </span>
      <Arrow />
    </>
  );

  const external = /^(https?:|mailto:|tel:)/.test(href);
  if (external) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} onClick={onClick}>
      {inner}
    </Link>
  );
}
