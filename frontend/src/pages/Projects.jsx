import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { Macbook } from "@/components/Mockups";
import { Reveal } from "@/components/Reveal";
import { PROJECT_FILTERS, PROJECTS } from "@/data";

function ProjectCard({ p }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel card-hover group flex h-full flex-col rounded-2xl p-5"
      data-testid={`project-card-${p.slug}`}
    >
      <div className="relative overflow-hidden rounded-xl transition-transform duration-500 group-hover:-rotate-1 group-hover:scale-[1.02]">
        <Macbook variant={p.variant} className="w-full" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-purple-600/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="mt-5 flex items-center gap-2">
        <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-300">
          {p.category}
        </span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{p.status}</span>
      </div>
      <h2 className="mt-3 font-display text-xl font-bold">{p.name}</h2>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {p.platforms.map((pl) => (
          <li key={pl} className="rounded-md bg-purple-500/10 px-2 py-0.5 text-[11px] text-foreground/70">{pl}</li>
        ))}
      </ul>
      <div className="mt-5 flex items-center gap-3">
        <Link
          to={`/projects/${p.slug}`}
          data-testid={`view-project-${p.slug}`}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
        >
          View Project <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
        {p.liveUrl && (
          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-purple-500 dark:text-purple-300">
            Visit Live Site
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const inFilter = filter === "All" || p.category === filter;
      const inQuery =
        !q ||
        [p.name, p.description, p.category, p.industry, ...p.tags, ...p.platforms]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return inFilter && inQuery;
    });
  }, [filter, query]);

  return (
    <>
      <Seo
        title="Projects — ROTSTRUCK"
        description="Explore digital products designed for real workflows, real users, and measurable business impact — hospital platforms, education systems, commerce and more."
      />
      <PageHero
        eyebrow="Projects"
        title={["Work Built", "to Perform"]}
        lede="Explore digital products designed for real workflows, real users, and measurable business impact."
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-12" data-testid="projects-explorer">
        <Reveal>
          <div className="glass-panel rounded-2xl p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="relative lg:w-72">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects…"
                  aria-label="Search projects"
                  data-testid="project-search-input"
                  className="w-full rounded-full border border-input bg-background/60 py-2.5 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-purple-400/70"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:pb-0" role="group" aria-label="Project filters">
                {PROJECT_FILTERS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    data-testid={`filter-${f.toLowerCase().replace(/[^a-z]/g, "-")}`}
                    onClick={() => setFilter(f)}
                    aria-pressed={filter === f}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      filter === f
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_18px_rgba(168,85,247,0.4)]"
                        : "border border-border text-muted-foreground hover:border-purple-400/50 hover:text-foreground"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <motion.div layout className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </AnimatePresence>
        </motion.div>

        {list.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground" data-testid="projects-empty">
            No projects match that search — try a different keyword or filter.
          </p>
        )}
      </section>

      <FinalCTA />
    </>
  );
}
