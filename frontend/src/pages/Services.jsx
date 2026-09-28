import { useState } from "react";
import { Check } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { Constellation } from "@/components/Visuals";
import { DeviceScene } from "@/components/Mockups";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { useTheme } from "@/context/ThemeContext";
import { SERVICES } from "@/data";

const SERVICE_LAYOUTS = {
  "custom-software": "laptop",
  healthcare: "trio",
  education: "tablet",
  ecommerce: "laptop-phone",
  saas: "tablet-phone",
  mobile: "phones",
  integrations: "laptop",
  uiux: "tablet",
};

export default function Services() {
  const { theme } = useTheme();
  const [active, setActive] = useState(null);

  return (
    <>
      <Seo
        title="Services — ROTSTRUCK"
        description="Custom software, healthcare and hospital systems, education platforms, e-commerce, SaaS, mobile apps, API integrations and UI/UX design."
      />
      <PageHero
        eyebrow="Services"
        title={["Software Built Around", "Your Business"]}
        lede="From custom dashboards to mobile applications, Rotstruck transforms complex workflows into reliable digital products."
      />

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-12" data-testid="services-constellation">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Constellation count={6} active={active} dark={theme === "dark"} />
          </Reveal>
          <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SERVICES.slice(0, 6).map((s, i) => (
              <StaggerItem key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  data-testid={`service-constellation-${s.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className={`glass-panel card-hover flex h-full items-center gap-3 rounded-xl p-4 transition-colors ${
                    active === i ? "border-purple-400/70" : ""
                  }`}
                >
                  <s.icon className="h-6 w-6 shrink-0 text-purple-500 dark:text-purple-400" aria-hidden="true" />
                  <span className="font-display text-sm font-semibold leading-snug">{s.name}</span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-14 sm:px-6 lg:px-12">
        {SERVICES.map((s, i) => (
          <Reveal key={s.slug}>
            <article
              id={s.slug}
              data-testid={`service-section-${s.slug}`}
              className="glass-panel scroll-mt-28 overflow-hidden rounded-3xl"
            >
              <div className={`grid grid-cols-1 items-center gap-8 p-8 sm:p-10 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div>
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15">
                      <s.icon className="h-6 w-6 text-purple-500 dark:text-purple-400" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-purple-500 dark:text-purple-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-bold sm:text-3xl">{s.name}</h2>
                  <p className="mt-2 font-medium text-purple-500 dark:text-purple-300">{s.tagline}</p>
                  <p className="mt-4 text-muted-foreground">{s.description}</p>
                  <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-foreground/85">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-purple-500 dark:text-purple-400" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <DeviceScene variant={s.variant} layout={SERVICE_LAYOUTS[s.slug] || "laptop"} className="relative mx-auto max-w-md" />
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <FinalCTA />
    </>
  );
}
