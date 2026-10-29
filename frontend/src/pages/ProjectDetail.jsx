import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Layers, Monitor, Palette, Target, Trophy } from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import HospitalShowcase from "@/components/HospitalShowcase";
import { DeviceTrio, Macbook, Phone, Tablet } from "@/components/Mockups";
import { MaskedLines, Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { IMAGES, PROJECTS } from "@/data";

function Section({ icon: Icon, title, children, testid }) {
  return (
    <Reveal>
      <section className="glass-panel rounded-3xl p-8 sm:p-10" data-testid={testid}>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15">
            <Icon className="h-5 w-5 text-purple-500 dark:text-purple-400" aria-hidden="true" />
          </span>
          <h2 className="font-display text-2xl font-bold">{title}</h2>
        </div>
        <div className="mt-5 text-muted-foreground">{children}</div>
      </section>
    </Reveal>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return <Navigate to="/projects" replace />;

  return (
    <>
      <Seo
        title={`${project.name} | Rotstruck Case Study`}
        description={project.tagline}
        path={`/projects/${project.slug}`}
      />

      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40" data-testid="project-hero">
        <div className="hero-vignette absolute inset-0" aria-hidden="true" />
        <div className="grid-bg absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-12">
          <div>
            <Reveal>
              <Link to="/projects" data-testid="back-to-projects" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All projects
              </Link>
              <p className="eyebrow mt-6">{project.category} · {project.industry}</p>
            </Reveal>
            <MaskedLines
              lines={[project.name]}
              className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            />
            {project.byline && (
              <Reveal delay={0.2}>
                <p className="mt-1 font-display text-lg text-purple-500 dark:text-purple-300">{project.byline}</p>
              </Reveal>
            )}
            <Reveal delay={0.3}>
              <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">{project.tagline}</p>
            </Reveal>
            <Reveal delay={0.4}>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <li key={t} className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-600 dark:text-purple-300">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.5}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="visit-live-project-btn"
                    className="btn-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-semibold text-white"
                  >
                    Visit Live Project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground" data-testid="project-status-badge">
                    {project.status}
                  </span>
                )}
                <Link to="/contact" data-testid="project-similar-cta" className="group inline-flex items-center gap-2 font-semibold text-purple-500 dark:text-purple-300">
                  Build Something Similar
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.25}>
            {project.slug === "medbuilds" ? (
              <HospitalShowcase className="mx-auto w-full max-w-xl" />
            ) : (
              <DeviceTrio variant={project.variant} className="mx-auto max-w-lg" />
            )}
          </Reveal>
        </div>
      </section>

      {project.slug === "medbuilds" && (
        <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-12">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-8 rounded-3xl bg-purple-600/15 blur-3xl" aria-hidden="true" />
              <img
                src={IMAGES.medbuilds}
                alt="Doctor reviewing a digital medical scan on a tablet — the environment MEDBUILDS is designed for"
                className="relative aspect-[21/9] w-full rounded-3xl border border-purple-500/25 object-cover shadow-2xl [clip-path:polygon(0_0,100%_0,100%_86%,94%_100%,0_100%)]"
                loading="lazy"
              />
            </div>
          </Reveal>
        </section>
      )}

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-12">
        <Section icon={Layers} title="Overview" testid="project-overview">{project.overview}</Section>
        <Section icon={Target} title="The Challenge" testid="project-challenge">{project.challenge}</Section>
        <Section icon={Check} title="Our Solution" testid="project-solution">{project.solution}</Section>
        <Section icon={Palette} title="Design Approach" testid="project-design">{project.design}</Section>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-12">
        <Reveal>
          <div className="glass-panel rounded-3xl p-8 sm:p-10" data-testid="project-features">
            <h2 className="font-display text-2xl font-bold">Main Features</h2>
            <Stagger className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {project.features.map((f) => (
                <StaggerItem key={f}>
                  <div className="flex items-start gap-3 rounded-xl border border-purple-500/15 bg-purple-500/[0.05] p-4">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-purple-500 dark:text-purple-400" aria-hidden="true" />
                    <span className="text-sm text-foreground/85">{f}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-purple-500/15 pt-6">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Platforms</span>
              {project.platforms.map((p) => (
                <span key={p} className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium">
                  <Monitor className="h-3 w-3 text-purple-500" aria-hidden="true" /> {p}
                </span>
              ))}
              <span className="ml-auto font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Stack</span>
              {project.stack.map((s) => (
                <span key={s} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground/75">{s}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-12">
        <Reveal>
          <div className="glass-panel rounded-3xl p-8 sm:p-10" data-testid="project-gallery">
            <h2 className="font-display text-2xl font-bold">Product Views</h2>
            <p className="mt-2 text-sm text-muted-foreground">Representative screens for each surface of the product — desktop, tablet and mobile.</p>
            <div className="mt-8 grid grid-cols-1 items-end gap-6 sm:grid-cols-3">
              <Macbook variant={project.variant} className="w-full" />
              <Tablet variant={project.variant} className="w-full" />
              <Phone variant={project.variant === "hospital" ? "patient" : project.variant} className="mx-auto w-32" />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 pb-10 sm:px-6 lg:px-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-600/15 to-indigo-600/10 p-8 sm:p-10" data-testid="project-outcome">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-600/25 blur-3xl" aria-hidden="true" />
            <div className="relative flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/20">
                <Trophy className="h-5 w-5 text-purple-500 dark:text-purple-300" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-2xl font-bold">Outcome</h2>
                <p className="mt-3 max-w-3xl text-muted-foreground">{project.outcome}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <FinalCTA />
    </>
  );
}
