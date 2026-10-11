import { MaskedLines, Reveal } from "@/components/Reveal";

export default function PageHero({ eyebrow, title, lede, children }) {
  return (
    <section className="relative overflow-hidden pb-14 pt-32 sm:pt-40">
      <div className="hero-vignette absolute inset-0" aria-hidden="true" />
      <div className="grid-bg absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <MaskedLines
          lines={Array.isArray(title) ? title : [title]}
          className="mt-4 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
        />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{lede}</p>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
