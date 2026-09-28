import { Link } from "react-router-dom";

export default function Logo({ compact = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" data-testid="brand-logo" aria-label="Rotstruck — home">
      <img
        src="/assets/logo-mark.png"
        alt="Rotstruck logo"
        className="h-9 w-auto drop-shadow-[0_0_14px_rgba(168,85,247,0.5)]"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-[0.14em]">
          <span className="text-purple-500 dark:text-purple-400">ROTS</span>
          <span className="text-foreground">TRUCK</span>
        </span>
        {!compact && (
          <span className="mt-1 font-mono text-[8px] tracking-[0.34em] text-muted-foreground">
            SOFTWARE DEVELOPMENT
          </span>
        )}
      </span>
    </Link>
  );
}
