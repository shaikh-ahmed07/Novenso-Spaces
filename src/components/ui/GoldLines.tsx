/**
 * Three rising gold verticals, taken from the right-hand strokes of the
 * Novenso "N" monogram. Used as a quiet brand motif on dark sections.
 */
export default function GoldLines({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute flex items-end gap-2 md:gap-3 ${className}`}>
      <span className="h-[55%] w-px bg-gradient-to-t from-brass/0 via-brass/50 to-brass" />
      <span className="h-[78%] w-px bg-gradient-to-t from-brass/0 via-brass/50 to-brass" />
      <span className="h-full w-px bg-gradient-to-t from-brass/0 via-brass/50 to-brass" />
    </div>
  );
}
