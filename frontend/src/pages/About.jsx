import { CheckCircle2, Compass, Eye } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { AboutGem } from "@/components/Visuals";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { useTheme } from "@/context/ThemeContext";
import { BELIEFS, IMAGES, WHY_ROTSTRUCK } from "@/data";

export default function About() {
  const { theme } = useTheme();
  return (
    <>
      <Seo
        title="About — ROTSTRUCK"
        description="Rotstruck turns complex business problems into clear, scalable digital products. Our mission, vision and how we work."
      />
      <PageHero
        eyebrow="About Rotstruck"
        title={["Built for", "Useful Ideas"]}
        lede="Rotstruck turns complex business problems into clear, scalable digital products."
      />

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-12" data-testid="about-intro">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <AboutGem dark={theme === "dark"} />
          </Reveal>
          <div className="space-y-6">
            <Reveal>
              <div className="glass-panel rounded-2xl p-7">
                <div className="flex items-center gap-3">
                  <Compass className="h-6 w-6 text-purple-500 dark:text-purple-400" aria-hidden="true" />
                  <h2 className="font-display text-2xl font-bold">Mission</h2>
                </div>
                <p className="mt-3 text-muted-foreground">
                  To build useful, reliable software that improves how businesses operate.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass-panel rounded-2xl p-7">
                <div className="flex items-center gap-3">
                  <Eye className="h-6 w-6 text-purple-500 dark:text-purple-400" aria-hidden="true" />
                  <h2 className="font-display text-2xl font-bold">Vision</h2>
                </div>
                <p className="mt-3 text-muted-foreground">
                  To become a trusted technology partner for businesses that want to work smarter
                  through well-designed software.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex items-center gap-4 rounded-2xl border border-purple-500/20 bg-purple-500/[0.05] p-5">
                <img src="/assets/logo-mark.png" alt="Rotstruck logo mark" className="h-12 w-auto" />
                <p className="text-sm text-muted-foreground">
                  A product-focused studio — small enough to care, senior enough to ship.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-purple-500/10 bg-purple-500/[0.03] py-20" data-testid="about-beliefs">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-12">
          <div>
            <Reveal>
              <p className="eyebrow">Principles</p>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">What we believe</h2>
            </Reveal>
            <Stagger className="mt-8 space-y-3">
              {BELIEFS.map((b) => (
                <StaggerItem key={b}>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-purple-500 dark:text-purple-400" aria-hidden="true" />
                    <span className="text-foreground/85">{b}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-purple-600/15 blur-2xl" aria-hidden="true" />
              <img
                src={IMAGES.studio}
                alt="The Rotstruck engineering studio at work"
                className="relative aspect-[4/3] w-full rounded-2xl border border-purple-500/25 object-cover shadow-2xl [clip-path:polygon(0_0,100%_0,100%_100%,12%_100%,0_88%)]"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-12" data-testid="about-why">
        <Reveal>
          <p className="eyebrow">Why Rotstruck</p>
          <h2 className="mt-3 max-w-xl font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
            A partner for the whole product journey
          </h2>
        </Reveal>
        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_ROTSTRUCK.map((w) => (
            <StaggerItem key={w.title}>
              <div className="glass-panel card-hover h-full rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold text-purple-500 dark:text-purple-300">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <FinalCTA />
    </>
  );
}
