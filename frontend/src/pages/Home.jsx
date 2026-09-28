import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Seo from "@/components/Seo";
import HeroScene from "@/components/HeroScene";
import Marquee from "@/components/Marquee";
import FinalCTA from "@/components/FinalCTA";
import { DeviceTrio } from "@/components/Mockups";
import { MaskedLines, Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { CAPABILITIES, IMAGES, INDUSTRIES, PROCESS_STAGES, PROJECTS, SERVICES, WHY_ROTSTRUCK } from "@/data";

const medbuilds = PROJECTS.find((p) => p.slug === "medbuilds");

export default function Home() {
  return (
    <>
      <Seo
        title="ROTSTRUCK — Custom Software Development Studio"
        description="Rotstruck builds custom software: hospital & EMR platforms, education systems, e-commerce stores, SaaS products, mobile apps, dashboards and API-connected systems."
      />

      <section className="relative overflow-hidden" data-testid="home-hero">
        <div className="hero-vignette absolute inset-0" aria-hidden="true" />
        <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-32 sm:px-6 sm:pt-40 lg:min-h-[92vh] lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow">Rotstruck · Software Development</p>
            </Reveal>
            <MaskedLines
              lines={[
                "We Build Software",
                <>That Moves <span className="text-gradient">Businesses</span></>,
                "Forward",
              ]}
              className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
              baseDelay={0.15}
            />
            <Reveal delay={0.55}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Rotstruck develops custom platforms, web applications, mobile apps, dashboards, and
                connected systems for healthcare, education, commerce, and growing businesses.
              </p>
            </Reveal>
            <Reveal delay={0.7}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  data-testid="hero-start-project-btn"
                  className="btn-glow group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-7 py-3.5 font-semibold text-white transition-transform duration-300 hover:scale-[1.04]"
                >
                  Start a Project
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link
                  to="/projects"
                  data-testid="hero-explore-work-btn"
                  className="inline-flex items-center gap-2 rounded-full border border-purple-500/35 px-7 py-3.5 font-semibold text-foreground transition-colors duration-300 hover:border-purple-400/70 hover:bg-purple-500/10"
                >
                  Explore Our Work
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.85}>
              <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Credibility highlights">
                {["Custom Software", "Web & Mobile Apps", "Built to Scale"].map((tag) => (
                  <li
                    key={tag}
                    className="glass-panel rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <HeroScene />
          </div>
        </div>
      </section>

      <Marquee items={CAPABILITIES} />
      <p className="sr-only">
        Capabilities: {CAPABILITIES.join(", ")}. One development partner for every stage of your digital product journey.
      </p>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-12" data-testid="home-services-preview">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">What we build</p>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
                One partner, every layer of your product
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                One development partner for every stage of your digital product journey.
              </p>
            </div>
            <Link to="/services" data-testid="services-preview-link" className="group inline-flex items-center gap-2 font-semibold text-purple-500 dark:text-purple-300">
              All services <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <StaggerItem key={s.slug}>
              <Link
                to={`/services#${s.slug}`}
                data-testid={`service-card-${s.slug}`}
                className="glass-panel card-hover group block h-full rounded-2xl p-6"
              >
                <s.icon className="h-7 w-7 text-purple-500 dark:text-purple-400" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.tagline}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-28" data-testid="home-featured-project">
        <div className="hero-vignette absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="glass-panel grid grid-cols-1 items-center gap-12 rounded-3xl p-8 sm:p-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <p className="eyebrow">Featured project</p>
                <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
                  MEDBUILDS <span className="text-gradient">by Rotstruck</span>
                </h2>
                <p className="mt-4 text-muted-foreground md:text-lg">{medbuilds.tagline}</p>
              </Reveal>
              <Reveal delay={0.15}>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {medbuilds.tags.map((t) => (
                    <li key={t} className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-600 dark:text-purple-300">
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    to="/projects/medbuilds"
                    data-testid="view-medbuilds-btn"
                    className="btn-glow group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
                  >
                    View MEDBUILDS
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                  <span className="rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    Case Study
                  </span>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <DeviceTrio variant="hospital" phoneVariant="patient" className="mx-auto max-w-lg" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-12" data-testid="home-industries-preview">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Industries</p>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
                Software for the way you work
              </h2>
            </div>
            <Link to="/industries" data-testid="industries-preview-link" className="group inline-flex items-center gap-2 font-semibold text-purple-500 dark:text-purple-300">
              All industries <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind) => (
            <StaggerItem key={ind.slug}>
              <Link
                to={`/industries#${ind.slug}`}
                data-testid={`industry-card-${ind.slug}`}
                className="glass-panel card-hover group flex h-full flex-col rounded-2xl p-6"
              >
                <ind.icon className="h-7 w-7 text-purple-500 dark:text-purple-400" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-semibold">{ind.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{ind.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-500 dark:text-purple-300">
                  Explore Solution <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="border-y border-purple-500/10 bg-purple-500/[0.03] py-20 sm:py-28" data-testid="home-process-preview">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">How we work</p>
                <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">From idea to impact</h2>
              </div>
              <Link to="/process" data-testid="process-preview-link" className="group inline-flex items-center gap-2 font-semibold text-purple-500 dark:text-purple-300">
                Our process <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS_STAGES.map((stage, i) => (
              <StaggerItem key={stage.key}>
                <div className="glass-panel card-hover h-full rounded-2xl p-6">
                  <span className="font-mono text-sm font-semibold text-purple-500 dark:text-purple-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold">{stage.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{stage.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-12" data-testid="home-capability">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-purple-600/15 blur-2xl" aria-hidden="true" />
              <img
                src={IMAGES.code}
                alt="Engineering workspace showing clean software code"
                className="relative aspect-[4/3] w-full rounded-2xl border border-purple-500/25 object-cover shadow-2xl [clip-path:polygon(0_0,100%_0,100%_88%,88%_100%,0_100%)]"
                loading="lazy"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow">Engineering capability</p>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
                Full-stack, fully connected
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Frontend, backend, databases, APIs and integrations — designed as one system, not
                stitched together after the fact.
              </p>
            </Reveal>
            <Stagger className="mt-8 grid grid-cols-2 gap-4">
              {[
                ["6", "Industry verticals"],
                ["8", "Service lines"],
                ["Multi-tenant", "Architecture ready"],
                ["Post-launch", "Support included"],
              ].map(([big, small]) => (
                <StaggerItem key={small}>
                  <div className="glass-panel rounded-2xl p-5">
                    <p className="font-display text-xl font-bold text-purple-500 dark:text-purple-300">{big}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{small}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-12" data-testid="home-why">
        <Reveal>
          <p className="eyebrow">Why Rotstruck</p>
          <h2 className="mt-3 max-w-xl font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
            Built around outcomes, not billable hours
          </h2>
        </Reveal>
        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_ROTSTRUCK.map((w) => (
            <StaggerItem key={w.title}>
              <div className="glass-panel card-hover flex h-full gap-4 rounded-2xl p-6">
                <CheckCircle2 className="h-6 w-6 shrink-0 text-purple-500 dark:text-purple-400" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-lg font-semibold">{w.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{w.text}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <FinalCTA />
    </>
  );
}
