import { useState } from "react";
import { motion } from "framer-motion";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { ProcessPath } from "@/components/Visuals";
import { Reveal } from "@/components/Reveal";
import { useTheme } from "@/context/ThemeContext";
import { PROCESS_STAGES } from "@/data";

export default function Process() {
  const { theme } = useTheme();
  const [active, setActive] = useState(0);

  return (
    <>
      <Seo
        title="Process — ROTSTRUCK"
        description="A clear development process for turning business challenges into useful digital products: Discover, Plan, Design, Build, Test, Launch."
      />
      <PageHero
        eyebrow="Our process"
        title={["From Idea", "to Impact"]}
        lede="A clear development process for turning business challenges into useful digital products."
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-12" data-testid="process-journey">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <ProcessPath active={active} dark={theme === "dark"} />
          <div className="space-y-6">
            {PROCESS_STAGES.map((stage, i) => (
              <motion.div
                key={stage.key}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: "-40% 0px -40% 0px" }}
                className={`glass-panel card-hover relative rounded-2xl p-7 transition-colors duration-500 sm:p-8 ${
                  active === i ? "border-purple-400/60" : ""
                }`}
                data-testid={`process-stage-${stage.key}`}
              >
                <div className="flex items-baseline gap-5">
                  <span
                    className={`font-display text-4xl font-extrabold transition-colors duration-500 ${
                      active === i ? "text-gradient" : "text-foreground/20"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-bold">{stage.name}</h2>
                    <p className="mt-2 text-muted-foreground">{stage.text}</p>
                  </div>
                </div>
                <div
                  className={`absolute left-0 top-1/2 h-12 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b from-purple-500 to-indigo-500 transition-opacity duration-500 ${
                    active === i ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Reveal className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-12">
        <p className="text-center text-sm text-muted-foreground">
          Every engagement follows the same spine — adapted to your timeline, team and constraints.
        </p>
      </Reveal>

      <FinalCTA />
    </>
  );
}
