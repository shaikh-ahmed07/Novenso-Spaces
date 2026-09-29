export type StrengthIconName =
  | "strategy"
  | "finance"
  | "growth"
  | "clients"
  | "project"
  | "compliance"
  | "design"
  | "technical"
  | "estimation"
  | "setSquare"
  | "supply"
  | "operations";

/** Line icons for the founders' areas of responsibility, drawn to match the brand slide. */
const paths: Record<StrengthIconName, React.ReactNode> = {
  strategy: (
    <>
      <path d="M6.5 20.5h11M8 17.5h8.5" />
      <path d="M9 17.5c.4-2.6 3-3.6 3.4-6.6L9.8 12 8 10.6l3.6-5.2L11.8 3.5l1.6 1.6c3 1 4.5 4.6 3.5 9.2l-.4 3.2" />
      <path d="M12.6 7.6h.01" />
    </>
  ),
  finance: (
    <>
      <ellipse cx="9" cy="6" rx="5" ry="2" />
      <path d="M4 6v4c0 1.1 2.2 2 5 2s5-.9 5-2V6M4 10v4c0 1.1 2.2 2 5 2" />
      <ellipse cx="15" cy="13" rx="5" ry="2" />
      <path d="M10 13v4c0 1.1 2.2 2 5 2s5-.9 5-2v-4" />
    </>
  ),
  growth: (
    <>
      <path d="M4 20h16M6.5 17v-3M10.5 17v-5M14.5 17v-4M18.5 17V9" />
      <path d="M5 11l5-4 3 2 6-5M16 4h3v3" />
    </>
  ),
  clients: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.5-3 2.8-5 5.5-5s5 2 5.5 5" />
      <circle cx="16.5" cy="9" r="2.3" />
      <path d="M15.8 14.2c2.4-.2 4.3 1.6 4.7 4.3" />
    </>
  ),
  project: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="1" />
      <path d="M9 4V3h6v1M8.5 10h7M8.5 13.5h7M8.5 17h4" />
    </>
  ),
  compliance: (
    <>
      <path d="M12 3l7 3v5.5c0 4.3-3 7.8-7 9.5-4-1.7-7-5.2-7-9.5V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  design: (
    <>
      <path d="M9.5 18h5M10.5 21h3" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />
    </>
  ),
  technical: (
    <>
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="6.5" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
    </>
  ),
  estimation: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M8 7h8v3H8z" />
      <path d="M8.5 14h.01M12 14h.01M15.5 14h.01M8.5 17.5h.01M12 17.5h.01M15.5 17.5h.01" />
    </>
  ),
  setSquare: (
    <>
      <path d="M5 20V4l15 16H5Z" />
      <path d="M8.5 16.5v-4.3l4.3 4.3H8.5ZM5 8h2M5 12h2" />
    </>
  ),
  supply: (
    <>
      <path d="M2.5 6h11v10h-11zM13.5 9.5h4l3 3.5v3h-7" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  operations: (
    <>
      <path d="M4 7h10M18 7h2M4 12h3M11 12h9M4 17h6M14 17h6" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="9" cy="12" r="2" />
      <circle cx="12" cy="17" r="2" />
    </>
  ),
};

export default function StrengthIcon({ name, className = "h-5 w-5" }: { name: StrengthIconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
