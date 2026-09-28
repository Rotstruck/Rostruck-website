import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CtaVisual } from "@/components/Visuals";
import { useTheme } from "@/context/ThemeContext";

export default function FinalCTA() {
  const { theme } = useTheme();
  return (
    <section className="relative overflow-hidden py-24 sm:py-32" data-testid="final-cta">
      <div className="hero-vignette absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-12">
        <div>
          <Reveal>
            <p className="eyebrow">Ready when you are</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Let&rsquo;s Build Something <span className="text-gradient">Useful</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-md text-base text-muted-foreground md:text-lg">
              From a first idea to a live product, Rotstruck is ready to build with you.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link
              to="/contact"
              data-testid="final-cta-btn"
              className="btn-glow group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 font-semibold text-white transition-transform duration-300 hover:scale-[1.04]"
            >
              Start a Project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="order-first lg:order-last">
          <CtaVisual dark={theme === "dark"} />
        </Reveal>
      </div>
    </section>
  );
}
