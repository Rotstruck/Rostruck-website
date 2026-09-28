export default function Marquee({ items }) {
  const doubled = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden border-y border-purple-500/15 bg-purple-500/[0.03] py-5"
      data-testid="capability-marquee"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-12">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="whitespace-nowrap font-display text-lg font-semibold tracking-wide text-foreground/70">
              {item}
            </span>
            <img src="/assets/logo-mark.png" alt="" className="h-4 w-auto opacity-50" />
          </span>
        ))}
      </div>
    </div>
  );
}
