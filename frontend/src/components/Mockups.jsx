import {
  Award, BarChart3, Bell, BookOpen, CalendarCheck, Code2, CreditCard, Cross,
  Database, Gauge, GitBranch, GraduationCap, HeartPulse, Layers, LineChart,
  MapPin, Palette, PenTool, Pill, Plug2, Shapes, ShoppingBag, ShoppingCart,
  Smartphone, Stethoscope, Terminal, Users, Webhook, Zap,
} from "lucide-react";

const ACCENTS = {
  hospital: "#2dd4bf",
  patient: "#2dd4bf",
  education: "#818cf8",
  commerce: "#c084fc",
  saas: "#a78bfa",
  dashboard: "#8b5cf6",
  automation: "#60a5fa",
  mobile: "#e879f9",
  design: "#f0abfc",
  code: "#a855f6",
};

const VARIANT_THEME = {
  hospital: { accent: "#2dd4bf", icons: [Cross, Stethoscope, Pill] },
  patient: { accent: "#2dd4bf", icons: [HeartPulse, CalendarCheck, Stethoscope] },
  education: { accent: "#818cf8", icons: [BookOpen, GraduationCap, Award] },
  commerce: { accent: "#c084fc", icons: [ShoppingBag, ShoppingCart, CreditCard] },
  saas: { accent: "#a78bfa", icons: [Layers, Database, Users] },
  dashboard: { accent: "#8b5cf6", icons: [BarChart3, Gauge, LineChart] },
  automation: { accent: "#60a5fa", icons: [Plug2, Webhook, Zap] },
  mobile: { accent: "#e879f9", icons: [Smartphone, Bell, MapPin] },
  design: { accent: "#f0abfc", icons: [PenTool, Palette, Shapes] },
  code: { accent: "#a855f6", icons: [Code2, Terminal, GitBranch] },
};

const WIDTHS = [68, 42, 84, 56, 30, 74, 48, 62, 38, 90, 52, 78];

function Bar({ w, accent, bright = false }) {
  return (
    <div
      className="h-1.5 rounded-full"
      style={{
        width: `${w}%`,
        background: bright
          ? `linear-gradient(90deg, ${accent}, rgba(168,85,247,0.7))`
          : "rgba(148,163,184,0.28)",
        boxShadow: bright ? `0 0 10px ${accent}55` : "none",
      }}
    />
  );
}

function Donut({ accent, pct = 68 }) {
  const c = 2 * Math.PI * 13;
  return (
    <svg viewBox="0 0 36 36" className="h-full w-full">
      <circle cx="18" cy="18" r="13" fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth="4" />
      <circle
        cx="18" cy="18" r="13" fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round"
        strokeDasharray={`${(pct / 100) * c} ${c}`} transform="rotate(-90 18 18)"
        style={{ filter: `drop-shadow(0 0 4px ${accent})` }}
      />
    </svg>
  );
}

function Chart({ accent }) {
  return (
    <svg viewBox="0 0 100 40" className="h-full w-full" preserveAspectRatio="none">
      {[8, 16, 24, 32].map((y) => (
        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(148,163,184,0.12)" strokeWidth="0.5" />
      ))}
      <polyline
        points="0,32 14,24 28,28 42,14 56,20 70,8 86,14 100,5"
        fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 4px ${accent})` }}
      />
      <polygon points="0,32 14,24 28,28 42,14 56,20 70,8 86,14 100,5 100,40 0,40" fill={accent} opacity="0.12" />
    </svg>
  );
}

export function AbstractUI({ variant = "dashboard", compact = false }) {
  const accent = ACCENTS[variant] || "#a855f7";
  const Glyph = (VARIANT_THEME[variant] || VARIANT_THEME.dashboard).icons[0];
  if (compact) {
    return (
      <div className="flex h-full w-full flex-col gap-2 bg-gradient-to-br from-[#0b0b18] to-[#141430] p-3">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-500/50" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-500/50" />
          <Glyph className="ml-auto h-3 w-3" style={{ color: accent }} strokeWidth={2.4} />
        </div>
        <div className="rounded-lg border border-white/5 bg-white/[0.04] p-2">
          <Bar w={WIDTHS[1]} accent={accent} bright />
          <div className="mt-1.5"><Bar w={WIDTHS[4]} accent={accent} /></div>
        </div>
        <div className="h-16 rounded-lg border border-white/5 bg-white/[0.04] p-1.5">
          <Chart accent={accent} />
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] p-1.5">
            <span className="h-4 w-4 shrink-0 rounded-full" style={{ background: `${accent}66` }} />
            <div className="flex w-full flex-col gap-1">
              <Bar w={WIDTHS[i + 6]} accent={accent} />
              <Bar w={WIDTHS[i + 9] / 1.6} accent={accent} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex h-full w-full flex-col gap-2 bg-gradient-to-br from-[#0b0b18] to-[#141430] p-[3%]">
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
        <span className="h-2 w-2 rounded-full bg-slate-500/50" />
        <span className="h-2 w-2 rounded-full bg-slate-500/50" />
        <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-md" style={{ background: `${accent}26` }}>
          <Glyph className="h-3 w-3" style={{ color: accent }} strokeWidth={2.4} />
        </div>
      </div>
      <div className="flex flex-1 gap-[2.5%]">
        <div className="flex w-[16%] flex-col gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-[14%] rounded-md"
              style={{ background: i === 0 ? `${accent}33` : "rgba(148,163,184,0.1)" }}
            />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-[3%]">
          <div className="flex gap-[3%]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex-1 rounded-md border border-white/5 bg-white/[0.04] p-[4%]">
                <Bar w={WIDTHS[i * 2]} accent={accent} bright={i === 0} />
                <div className="mt-1.5"><Bar w={WIDTHS[i * 2 + 1]} accent={accent} /></div>
              </div>
            ))}
          </div>
          <div className="flex flex-1 gap-[3%]">
            <div className="flex-[1.7] rounded-md border border-white/5 bg-white/[0.04] p-[3%]">
              <Chart accent={accent} />
            </div>
            <div className="flex flex-1 items-center justify-center rounded-md border border-white/5 bg-white/[0.04] p-[6%]">
              <Donut accent={accent} pct={64 + (variant.length * 7) % 30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Macbook({ variant = "dashboard", className = "" }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div className="relative rounded-t-xl border border-slate-500/40 bg-[#0a0a14] p-1.5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        <span className="absolute left-1/2 top-1 h-1 w-1 -translate-x-1/2 rounded-full bg-slate-600" />
        <div className="relative aspect-[16/10] overflow-hidden rounded-md">
          <AbstractUI variant={variant} />
        </div>
      </div>
      <div className="relative left-[-5%] h-2.5 w-[110%] rounded-b-xl bg-gradient-to-b from-slate-500/50 to-slate-700/70" />
    </div>
  );
}

export function Tablet({ variant = "vitals", className = "" }) {
  return (
    <div className={`relative rounded-xl border border-slate-500/40 bg-[#0a0a14] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] ${className}`} aria-hidden="true">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
        <AbstractUI variant={variant} />
      </div>
    </div>
  );
}

export function Phone({ variant = "patient", className = "" }) {
  return (
    <div className={`relative w-36 rounded-[1.7rem] border border-slate-500/50 bg-[#0a0a14] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] sm:w-40 ${className}`} aria-hidden="true">
      <span className="absolute left-1/2 top-2 z-10 h-3.5 w-14 -translate-x-1/2 rounded-full bg-black/90" />
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.3rem]">
        <AbstractUI variant={variant} compact />
      </div>
    </div>
  );
}

export function IconBadge({ Icon, accent, className = "", delay = 0 }) {
  return (
    <div
      className={`glass-panel absolute z-30 flex h-11 w-11 items-center justify-center rounded-2xl animate-float-soft ${className}`}
      style={{ animationDelay: `${delay}s`, boxShadow: `0 0 26px ${accent}66` }}
      aria-hidden="true"
    >
      <Icon className="h-5 w-5" style={{ color: accent }} strokeWidth={2.2} />
    </div>
  );
}

const BADGE_SPOTS = ["-left-3 top-[4%]", "-right-3 top-[32%]", "left-[10%] -bottom-3"];

function SceneDevices({ layout, variant, phoneVariant }) {
  const pv = phoneVariant || (variant === "hospital" ? "patient" : variant);
  switch (layout) {
    case "tablet":
      return <Tablet variant={variant} className="relative z-10 mx-auto w-[76%]" />;
    case "tablet-phone":
      return (
        <>
          <Tablet variant={variant} className="relative z-10 ml-3 w-[74%]" />
          <Phone variant={pv} className="absolute -bottom-3 right-[2%] z-20 w-24 animate-float-soft" />
        </>
      );
    case "laptop-phone":
      return (
        <>
          <Macbook variant={variant} className="relative z-10 mx-auto w-[82%]" />
          <Phone variant={pv} className="absolute -bottom-4 right-[1%] z-20 w-24 animate-float-soft sm:w-28" />
        </>
      );
    case "phones":
      return (
        <div className="relative z-10 flex items-end justify-center gap-3">
          <Phone variant="patient" className="w-24 animate-float-soft" />
          <Phone variant="commerce" className="w-28" />
          <Phone variant="education" className="w-24 animate-float" />
        </div>
      );
    case "trio":
      return (
        <>
          <Tablet variant={variant} className="absolute -left-2 top-0 w-[46%] rotate-[-4deg] opacity-90" />
          <Macbook variant={variant} className="relative z-10 ml-auto w-[82%]" />
          <Phone variant={pv} className="absolute -bottom-4 right-[2%] z-20 w-24 animate-float-soft sm:w-28" />
        </>
      );
    default:
      return <Macbook variant={variant} className="relative z-10 mx-auto w-[88%]" />;
  }
}

export function DeviceScene({ variant = "dashboard", layout = "laptop", phoneVariant, className = "" }) {
  const theme = VARIANT_THEME[variant] || VARIANT_THEME.dashboard;
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div
        className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: `${theme.accent}30` }}
      />
      <SceneDevices layout={layout} variant={variant} phoneVariant={phoneVariant} />
      {theme.icons.map((Icon, i) => (
        <IconBadge key={i} Icon={Icon} accent={theme.accent} className={BADGE_SPOTS[i]} delay={i * 1.1} />
      ))}
    </div>
  );
}

export function DeviceTrio({ variant = "hospital", phoneVariant = "patient", className = "" }) {
  return <DeviceScene variant={variant} layout="trio" phoneVariant={phoneVariant} className={className} />;
}
