import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { OrbitVisual } from "@/components/Visuals";
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { useTheme } from "@/context/ThemeContext";
import { INDUSTRIES } from "@/data";

export default function Industries() {
  const { theme } = useTheme();
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState("healthcare");

  return (
    <>
      <Seo
        title="Industries We Serve | Rotstruck — Healthcare, Education, Retail & SaaS"
        description="Rotstruck builds purpose-built software for healthcare, hospitals, education, retail e-commerce, SaaS startups and professional services businesses across India and worldwide."
        path="/industries"
      />
      <PageHero
        eyebrow="Industries"
        title={["Software for the", "Way You Work"]}
        lede="Purpose-built digital systems for healthcare, education, commerce, startups, and modern businesses."
      />

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-12" data-testid="industries-orbit">
        <Reveal>
          <OrbitVisual count={6} active={active} dark={theme === "dark"} />
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-12">
        <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => {
            const isOpen = open === ind.slug;
            return (
              <StaggerItem key={ind.slug}>
                <div
                  id={ind.slug}
                  data-testid={`industry-panel-${ind.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className={`glass-panel card-hover scroll-mt-28 rounded-2xl p-6 ${isOpen ? "border-purple-400/60" : ""}`}
                >
                  <ind.icon className="h-8 w-8 text-purple-500 dark:text-purple-400" aria-hidden="true" />
                  <h2 className="mt-4 font-display text-xl font-semibold">{ind.name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{ind.description}</p>
                  <button
                    type="button"
                    data-testid={`industry-toggle-${ind.slug}`}
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : ind.slug)}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-500 dark:text-purple-300"
                  >
                    Explore Solution
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-4 flex flex-wrap gap-2 border-t border-purple-500/15 pt-4">
                          {ind.points.map((p) => (
                            <li key={p} className="rounded-full border border-purple-500/25 bg-purple-500/10 px-3 py-1 text-xs font-medium text-foreground/80">
                              {p}
                            </li>
                          ))}
                        </ul>
                        <Link
                          to="/contact"
                          data-testid={`industry-cta-${ind.slug}`}
                          className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-purple-500 dark:text-purple-300"
                        >
                          Build for {ind.name}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <FinalCTA />
    </>
  );
}
