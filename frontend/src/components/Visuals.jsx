import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Macbook } from "@/components/Mockups";

export function Constellation({ count = 6, active, dark }) {
  const nodes = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    return { x: 50 + 40 * Math.cos(angle), y: 50 + 40 * Math.sin(angle) };
  });
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {nodes.map((n, i) => (
          <line
            key={i}
            x1="50" y1="50" x2={n.x} y2={n.y}
            stroke={active === i ? "#a855f7" : "rgba(139,92,246,0.25)"}
            strokeWidth={active === i ? 0.8 : 0.35}
            style={{ transition: "stroke 0.4s ease", filter: active === i ? "drop-shadow(0 0 3px #a855f7)" : "none" }}
          />
        ))}
        <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(139,92,246,0.18)" strokeWidth="0.3" strokeDasharray="1.5 2" />
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className={`absolute -inset-8 rounded-full blur-2xl animate-pulse-glow ${dark ? "bg-purple-600/40" : "bg-purple-400/30"}`} />
        <div className="relative h-16 w-16 rotate-45 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-[0_0_50px_rgba(168,85,247,0.55)]" />
      </div>
      {nodes.map((n, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
          style={{
            left: `${n.x}%`, top: `${n.y}%`,
            transform: `translate(-50%,-50%) scale(${active === i ? 1.3 : active == null ? 1 : 0.85})`,
            opacity: active == null || active === i ? 1 : 0.45,
          }}
        >
          <div
            className={`h-11 w-11 rounded-lg border backdrop-blur-md transition-shadow duration-500 ${
              active === i
                ? "border-purple-400/80 bg-purple-500/25 shadow-[0_0_30px_rgba(168,85,247,0.6)]"
                : "border-purple-500/25 bg-purple-500/10"
            }`}
            style={{ clipPath: i % 2 === 0 ? "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)" : "none", borderRadius: i % 2 === 0 ? 0 : undefined }}
          >
            <div className="h-full w-full bg-gradient-to-br from-purple-400/40 to-indigo-500/30" style={{ clipPath: "inherit", borderRadius: "inherit" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function OrbitVisual({ count = 6, active, dark }) {
  const nodes = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    return { x: 50 + 42 * Math.cos(angle), y: 50 + 42 * Math.sin(angle) };
  });
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden="true">
      <div className="absolute inset-[8%] rounded-full border border-dashed border-purple-500/25 animate-spin-slower" />
      <div className="absolute inset-[26%] rounded-full border border-purple-500/12" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className={`absolute -inset-10 rounded-full blur-3xl animate-pulse-glow ${dark ? "bg-purple-600/45" : "bg-purple-400/30"}`} />
        <img src="/assets/logo-mark.png" alt="" className="relative h-20 w-auto drop-shadow-[0_0_24px_rgba(168,85,247,0.6)]" />
      </div>
      {nodes.map((n, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
          style={{
            left: `${n.x}%`, top: `${n.y}%`,
            transform: `translate(-50%,-50%) scale(${active === i ? 1.35 : 1})`,
            opacity: active == null || active === i ? 1 : 0.4,
          }}
        >
          <div
            className={`h-9 w-9 transition-shadow duration-500 ${
              active === i
                ? "bg-gradient-to-br from-purple-400 to-indigo-500 shadow-[0_0_28px_rgba(168,85,247,0.7)]"
                : dark ? "bg-purple-500/25" : "bg-purple-500/20"
            }`}
            style={{
              clipPath: ["polygon(50% 0,100% 50%,50% 100%,0 50%)", "polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)", "circle(50%)"][i % 3],
            }}
          />
        </div>
      ))}
    </div>
  );
}

const STATION_SHAPES = [
  "circle(46% at 50% 50%)",
  "polygon(0 0, 46% 0, 46% 46%, 54% 46%, 54% 0, 100% 0, 100% 46%, 54% 46%, 54% 54%, 100% 54%, 100% 100%, 54% 100%, 54% 54%, 46% 54%, 46% 100%, 0 100%, 0 54%, 46% 54%, 46% 46%, 0 46%)",
  "polygon(15% 20%, 85% 20%, 85% 38%, 15% 38%, 15% 44%, 85% 44%, 85% 62%, 15% 62%, 15% 68%, 85% 68%, 85% 86%, 15% 86%)",
  "polygon(0 25%, 46% 25%, 46% 0, 100% 0, 100% 46%, 54% 46%, 54% 25%, 100% 25%, 100% 71%, 54% 71%, 54% 100%, 0 100%, 0 54%, 46% 54%, 46% 71%, 0 71%)",
  "polygon(50% 0, 100% 22%, 100% 60%, 50% 100%, 0 60%, 0 22%)",
  "polygon(50% 0, 100% 45%, 68% 45%, 68% 100%, 32% 100%, 32% 45%, 0 45%)",
];

export function ProcessPath({ active, dark }) {
  return (
    <div className="relative hidden h-full min-h-[560px] w-24 lg:block" aria-hidden="true">
      <div className="absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 bg-purple-500/15" />
      <div
        className="absolute left-1/2 top-4 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-purple-500 to-indigo-500 shadow-[0_0_16px_rgba(168,85,247,0.7)] transition-all duration-700"
        style={{ height: `calc(${((active + 1) / 6) * 100}% - 8px)` }}
      />
      {STATION_SHAPES.map((clip, i) => (
        <div
          key={i}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
          style={{ top: `${(i / 5) * 88 + 6}%` }}
        >
          <div
            className={`h-11 w-11 transition-all duration-500 ${
              i <= active
                ? "bg-gradient-to-br from-purple-400 to-indigo-500 shadow-[0_0_26px_rgba(168,85,247,0.65)] scale-110"
                : dark ? "bg-purple-500/20" : "bg-purple-500/15"
            }`}
            style={{ clipPath: clip }}
          />
        </div>
      ))}
    </div>
  );
}

export function AboutGem({ dark }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [flash, setFlash] = useState(false);
  return (
    <div
      className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center"
      aria-hidden="true"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -14, y: ((e.clientX - r.left) / r.width - 0.5) * 14 });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={() => {
        setFlash(true);
        setTimeout(() => setFlash(false), 650);
      }}
    >
      <div className={`absolute h-72 w-72 rounded-full blur-3xl transition-opacity duration-700 ${dark ? "bg-purple-600/35" : "bg-purple-400/25"} ${flash ? "opacity-100" : "opacity-60"}`} />
      <div
        className="relative transition-transform duration-300 ease-out"
        style={{ transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <div className="h-44 w-44 rotate-45 rounded-2xl bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-600 shadow-[0_0_70px_rgba(168,85,247,0.5)]" style={{ clipPath: "polygon(50% 0, 100% 30%, 100% 100%, 50% 78%, 0 100%, 0 30%)" }} />
        <div className="absolute -left-16 top-6 h-8 w-8 rotate-12 rounded-md bg-purple-400/50 blur-[1px] animate-float" />
        <div className="absolute -right-14 -top-8 h-5 w-5 rotate-45 bg-indigo-400/60 animate-float-soft" />
        <div className="absolute -bottom-10 -right-16 h-10 w-10 rounded-full bg-violet-500/40 blur-[2px] animate-float" />
        <div className="absolute -bottom-6 -left-14 h-4 w-4 rotate-45 bg-purple-300/60 animate-float-soft" />
      </div>
    </div>
  );
}

export function ContactVisual({ dark }) {
  return (
    <div className="relative mx-auto w-full max-w-sm" aria-hidden="true">
      <div className={`absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-pulse-glow ${dark ? "bg-purple-600/30" : "bg-purple-400/25"}`} />
      <div className="animate-float">
        <Phone variant="patient" className="relative z-10 mx-auto" />
      </div>
      <div className="glass-panel absolute -left-6 top-[16%] z-20 w-32 rounded-2xl p-3 animate-float-soft">
        <div className="h-1.5 w-3/4 rounded-full bg-purple-400/70" />
        <div className="mt-2 h-1.5 w-1/2 rounded-full bg-foreground/15" />
        <div className="mt-2 h-1.5 w-2/3 rounded-full bg-foreground/15" />
      </div>
      <div className="glass-panel absolute -right-4 bottom-[22%] z-20 w-28 rounded-2xl p-3 animate-float">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500" />
          <div className="h-1.5 w-12 rounded-full bg-foreground/20" />
        </div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-foreground/15" />
      </div>
      <div className="absolute -right-8 top-[8%] h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-[0_0_30px_rgba(168,85,247,0.6)] animate-float-soft" />
      <div className="absolute -left-8 bottom-[10%] h-3 w-3 rotate-45 bg-purple-400/70 animate-float" />
    </div>
  );
}

export function CtaVisual({ dark }) {
  return (
    <div className="relative mx-auto w-full max-w-lg" aria-hidden="true">
      <div className={`absolute bottom-[6%] left-1/2 h-24 w-[80%] -translate-x-1/2 rounded-[100%] blur-2xl animate-pulse-glow ${dark ? "bg-purple-600/45" : "bg-purple-400/35"}`} />
      {[26, 50, 74].map((left, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: [0, 0.9, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.3 + i * 0.25, ease: "easeOut" }}
          className="absolute bottom-[10%] w-px origin-bottom bg-gradient-to-t from-purple-500 to-transparent"
          style={{ left: `${left}%`, height: "55%" }}
        />
      ))}
      <div className="animate-float">
        <Macbook variant="saas" className="relative z-10 mx-auto w-[76%]" />
      </div>
      <Phone variant="mobile" className="absolute -bottom-3 right-[4%] z-20 w-24 animate-float-soft sm:w-28" />
      <div className="absolute -left-2 top-[6%] z-20 h-14 w-14 rotate-45 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 opacity-90 shadow-[0_0_40px_rgba(168,85,247,0.55)] animate-float-soft" />
    </div>
  );
}
