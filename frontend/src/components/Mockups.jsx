import {
  Award, BarChart3, Bell, BookOpen, CalendarCheck, Code2, CreditCard, Cross,
  Database, Gauge, GitBranch, GraduationCap, HeartPulse, Layers, LineChart,
  MapPin, Palette, PenTool, Pill, Plug2, Shapes, ShoppingBag, ShoppingCart,
  Smartphone, Stethoscope, Terminal, Users, Video, Webhook, Zap,
} from "lucide-react";

const VARIANT_THEME = {
  hospital: { accent: "#2dd4bf", icons: [Cross, Stethoscope, Pill] },
  patient: { accent: "#2dd4bf", icons: [HeartPulse, CalendarCheck, Stethoscope] },
  education: { accent: "#818cf8", icons: [BookOpen, GraduationCap, Award] },
  classroom: { accent: "#818cf8", icons: [Video, GraduationCap, CalendarCheck] },
  commerce: { accent: "#c084fc", icons: [ShoppingBag, ShoppingCart, CreditCard] },
  saas: { accent: "#a78bfa", icons: [Layers, Database, Users] },
  dashboard: { accent: "#8b5cf6", icons: [BarChart3, Gauge, LineChart] },
  automation: { accent: "#60a5fa", icons: [Zap, Users, CalendarCheck] },
  integrations: { accent: "#60a5fa", icons: [Plug2, Webhook, Zap] },
  mobile: { accent: "#e879f9", icons: [Smartphone, Bell, MapPin] },
  design: { accent: "#f0abfc", icons: [PenTool, Palette, Shapes] },
  code: { accent: "#a855f6", icons: [Code2, Terminal, GitBranch] },
};

// Real content for every product screen, so each variant reads as its own product
// instead of the same chart-and-donut placeholder in a different colour.
const SCREENS = {
  hospital: {
    app: "MEDBUILDS",
    nav: ["Overview", "Patients", "Appointments", "Beds & Vitals", "Billing"],
    kpis: [["Patients", "1,284", "+6%"], ["Beds occupied", "73.6%"], ["Appts today", "196", "+12%"]],
    hero: { kind: "line", title: "Admissions · last 7 days" },
    list: { title: "OPD queue", rows: [["Priya Sharma", "Dr. Rao · 10:30", "Waiting"], ["Rahul Verma", "Dr. Sen · 10:45", "In room"], ["Ayesha Khan", "Dr. Rao · 11:00", "Done"]] },
  },
  patient: {
    app: "VITALGO",
    greeting: "Hi, Ananya",
    nav: ["Home", "Appointments", "Reports", "Medicines", "Profile"],
    kpis: [["Next visit", "Thu 10:30"], ["New reports", "3"], ["Doses today", "2"]],
    hero: { kind: "line", title: "Heart rate · 7 days" },
    feature: ["Dr. Meera Rao", "Cardiology · Thu, 10:30 AM"],
    list: { title: "Upcoming", rows: [["Dr. Meera Rao", "Cardiology · Thu", "Confirmed"], ["Blood test", "Lab · Fri 8:00", "Booked"], ["Dr. Sen", "Follow-up · Mon", "Pending"]] },
  },
  education: {
    app: "SKOLAR",
    greeting: "Good morning, Arjun",
    nav: ["Dashboard", "Courses", "Attendance", "Assessments", "Certificates"],
    kpis: [["Students", "842"], ["Attendance", "94%", "+2%"], ["Avg. score", "78%"]],
    hero: { kind: "bars", title: "Weekly attendance" },
    feature: ["Physics · Grade 11", "Lesson 7 of 12 · Quiz on Friday"],
    list: { title: "Course progress", progress: true, rows: [["Physics · Grade 11", "32 students", "68"], ["Chemistry · Grade 12", "28 students", "82"], ["Mathematics · Grade 10", "41 students", "54"]] },
  },
  classroom: {
    app: "CLASSORBIT",
    greeting: "Today · 4 live classes",
    nav: ["Schedule", "Live classes", "Batches", "Attendance", "Reports"],
    kpis: [["Live now", "4"], ["Batches", "26"], ["Attendance", "91%", "+3%"]],
    hero: { kind: "bars", title: "Batch performance" },
    feature: ["JEE Physics · Batch A", "Live now · 48 joined"],
    list: { title: "Today's classes", rows: [["JEE Physics", "10:00 · Batch A", "Live"], ["NEET Biology", "12:30 · Batch C", "Next"], ["Maths drill", "16:00 · Batch B", "Scheduled"]] },
  },
  commerce: {
    app: "VENDRA",
    greeting: "New arrivals",
    nav: ["Orders", "Products", "Inventory", "Delivery", "Customers"],
    kpis: [["Sales today", "₹1.8L", "+14%"], ["Orders", "312"], ["Low stock", "7"]],
    hero: { kind: "products", title: "Top products" },
    feature: ["Order #4821", "Out for delivery · arriving 6 PM"],
    list: { title: "Recent orders", rows: [["#4821 · Kurta set", "₹2,499", "Shipped"], ["#4820 · Sneakers", "₹3,199", "Packed"], ["#4819 · Silk saree", "₹5,850", "Delivered"]] },
  },
  saas: {
    app: "SAASFORGE",
    greeting: "Workspace · Acme Clinics",
    nav: ["Tenants", "Plans", "Billing", "Roles", "Analytics"],
    kpis: [["MRR", "₹6.4L", "+9%"], ["Tenants", "148"], ["Churn", "1.2%"]],
    hero: { kind: "line", title: "MRR growth" },
    feature: ["Pro plan · 42 seats", "Renews 12 Nov · ₹24,000"],
    list: { title: "Tenants", rows: [["Acme Clinics", "Pro · 42 seats", "Active"], ["Nova Retail", "Starter · 8 seats", "Trial"], ["Orbit Labs", "Enterprise", "Active"]] },
  },
  dashboard: {
    app: "PULSEBOARD",
    greeting: "Q3 at a glance",
    nav: ["Overview", "Sales", "Operations", "Finance", "Reports"],
    kpis: [["Revenue", "₹42L", "+11%"], ["Margin", "31%"], ["Orders", "8,204"]],
    hero: { kind: "bars", title: "Revenue by month" },
    feature: ["Revenue ₹42L", "+11% vs last quarter"],
    list: { title: "Top regions", rows: [["Chennai", "₹14.2L", "+12%"], ["Bengaluru", "₹11.8L", "+8%"], ["Hyderabad", "₹7.6L", "-3%"]] },
  },
  automation: {
    app: "FLOWDESK",
    greeting: "3 approvals waiting",
    nav: ["Requests", "Approvals", "Workflows", "Forms", "Audit log"],
    kpis: [["Open requests", "23"], ["Avg. approval", "4.2h", "-38%"], ["Automated", "86%"]],
    hero: { kind: "flow", title: "Purchase approval workflow" },
    feature: ["Laptop purchase · ₹84,000", "Waiting on Finance"],
    list: { title: "Approvals", rows: [["Laptop purchase", "IT · ₹84,000", "Pending"], ["Travel · Mumbai", "Sales · ₹18,500", "Approved"], ["Vendor onboarding", "Operations", "Review"]] },
  },
  integrations: {
    app: "Integration hub",
    greeting: "All systems synced",
    nav: ["Connections", "Events", "Webhooks", "Mappings", "Logs"],
    kpis: [["Connected apps", "12"], ["Events today", "48.2k"], ["Success rate", "99.9%"]],
    hero: { kind: "hub", title: "Connected systems" },
    feature: ["Razorpay → Billing", "Payment captured · 2s ago"],
    list: { title: "Sync log", rows: [["Razorpay → Billing", "Payment captured · 2s ago", "Synced"], ["WhatsApp", "Appointment reminder", "Sent"], ["Tally", "Invoice INV-2291", "Synced"]] },
  },
  mobile: {
    app: "App console",
    greeting: "Track order",
    nav: ["Releases", "Users", "Push", "Crashes", "Analytics"],
    kpis: [["Active users", "12.4k", "+18%"], ["Crash-free", "99.6%"], ["Rating", "4.8 ★"]],
    hero: { kind: "line", title: "Daily active users" },
    map: true,
    feature: ["Rider Karthik · 2.4 km away", "Arriving in 12 min"],
    phoneRows: [["Picked up", "Anna Nagar · 5:42 PM", "Done"], ["Groceries · 6 items", "₹1,240 · Paid", "Live"]],
    list: { title: "Releases", rows: [["v2.4.0 · Android", "Play Store", "Live"], ["v2.4.0 · iOS", "App Store", "Review"], ["v2.5.0", "Beta testers", "Beta"]] },
  },
  design: {
    app: "Design system",
    greeting: "Checkout flow",
    nav: ["Pages", "Components", "Styles", "Prototype", "Handoff"],
    kpis: [["Screens", "48"], ["Components", "126"], ["Prototype", "v3"]],
    hero: { kind: "canvas", title: "Checkout · artboards" },
    feature: ["Primary button", "Radius 12 · Purple 600"],
    list: { title: "Design review", rows: [["Checkout flow", "6 comments", "Review"], ["Onboarding", "Handoff ready", "Approved"], ["Dashboard", "In progress", "Draft"]] },
  },
  code: {
    app: "api / orders.service.ts",
    greeting: "Deploy pipeline",
    nav: ["Services", "Pipelines", "Environments", "Logs", "Settings"],
    kpis: [["Build", "Passing"], ["Coverage", "87%"], ["Deploys", "14 / wk"]],
    hero: { kind: "code", title: "orders.service.ts" },
    feature: ["main · a41f9c2", "Deployed to production"],
    list: { title: "Pipeline", rows: [["Lint & tests", "42s", "Passed"], ["Build", "1m 12s", "Passed"], ["Deploy · prod", "Running", "Running"]] },
  },
};

const GOOD = ["Done", "Delivered", "Active", "Approved", "Live", "Confirmed", "Passed", "In room", "Synced", "Sent"];
const WARN = ["Waiting", "Pending", "Packed", "Trial", "Review", "Next", "Booked", "Beta", "Running", "Draft"];

function tone(status, accent) {
  if (/^-/.test(status)) return { color: "#fda4af", background: "rgba(244,63,94,0.16)" };
  if (/^\+/.test(status) || GOOD.includes(status)) return { color: accent, background: `${accent}24` };
  if (WARN.includes(status)) return { color: "#fcd34d", background: "rgba(251,191,36,0.15)" };
  return { color: "#cbd5e1", background: "rgba(148,163,184,0.16)" };
}

const PANEL = "rounded-[0.5em] border border-white/[0.06] bg-white/[0.04]";

function StatusPill({ status, accent }) {
  return (
    <span className="shrink-0 rounded-full px-[0.6em] py-[0.15em] text-[0.5em] font-semibold" style={tone(status, accent)}>
      {status}
    </span>
  );
}

function LineChart_({ accent }) {
  return (
    <svg viewBox="0 0 100 40" className="h-full w-full" preserveAspectRatio="none">
      {[10, 20, 30].map((y) => (
        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(148,163,184,0.12)" strokeWidth="0.5" />
      ))}
      <polygon points="0,32 14,26 28,28 42,17 56,21 70,11 86,14 100,6 100,40 0,40" fill={accent} opacity="0.12" />
      <polyline
        points="0,32 14,26 28,28 42,17 56,21 70,11 86,14 100,6"
        fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

const BAR_HEIGHTS = [46, 64, 52, 78, 60, 92, 72];
const BAR_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

function BarChart({ accent }) {
  return (
    <div className="flex h-full items-end gap-[0.35em]">
      {BAR_HEIGHTS.map((h, i) => (
        <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-[0.2em]">
          <span className="w-full rounded-[0.2em]" style={{ height: `${h}%`, background: i === 5 ? accent : `${accent}55` }} />
          <span className="text-[0.4em] text-slate-500">{BAR_LABELS[i]}</span>
        </div>
      ))}
    </div>
  );
}

const PRODUCTS = [["Kurta set", "₹2,499", "#f0abfc"], ["Sneakers", "₹3,199", "#a5b4fc"], ["Silk saree", "₹5,850", "#fcd34d"]];

function ProductGrid({ accent }) {
  return (
    <div className="grid h-full grid-cols-3 gap-[0.4em]">
      {PRODUCTS.map(([name, price, swatch]) => (
        <div key={name} className="flex flex-col rounded-[0.4em] bg-white/[0.04] p-[0.3em]">
          <div className="flex-1 rounded-[0.3em]" style={{ background: `linear-gradient(135deg, ${swatch}55, ${swatch}15)` }}>
            <ShoppingBag className="m-auto mt-[35%] h-[1em] w-[1em]" style={{ color: swatch }} strokeWidth={1.8} />
          </div>
          <span className="mt-[0.3em] truncate text-[0.45em] text-slate-300">{name}</span>
          <span className="text-[0.5em] font-semibold" style={{ color: accent }}>{price}</span>
        </div>
      ))}
    </div>
  );
}

const FLOW = [["Request", "done"], ["Manager", "done"], ["Finance", "active"], ["Paid", "todo"]];

function Workflow({ accent }) {
  return (
    <div className="flex h-full flex-col justify-center gap-[0.8em]">
      <div className="flex items-center">
        {FLOW.map(([step, state], i) => (
        <div key={step} className="flex flex-1 items-center">
          <div className="flex flex-col items-center gap-[0.3em]">
            <span
              className="flex h-[2em] w-[2em] items-center justify-center rounded-full border text-[0.6em] font-bold"
              style={{
                borderColor: state === "todo" ? "rgba(148,163,184,0.35)" : accent,
                background: state === "done" ? accent : state === "active" ? `${accent}30` : "transparent",
                color: state === "done" ? "#0b0b18" : accent,
              }}
            >
              {state === "done" ? "✓" : i + 1}
            </span>
            <span className={`text-[0.5em] ${state === "todo" ? "text-slate-500" : "text-slate-200"}`}>{step}</span>
          </div>
          {i < FLOW.length - 1 && (
            <span className="mx-[0.2em] mb-[0.9em] h-px flex-1" style={{ background: state === "done" ? accent : "rgba(148,163,184,0.3)" }} />
          )}
        </div>
        ))}
      </div>
      <div className="rounded-[0.4em] bg-white/[0.05] px-[0.6em] py-[0.45em]">
        <p className="text-[0.52em] font-medium text-slate-100">Laptop purchase · ₹84,000</p>
        <p className="text-[0.44em] text-slate-500">Raised by Divya (IT) · waiting on Finance for 2h</p>
      </div>
    </div>
  );
}

const HUB_APPS = [["Razorpay", "18%", "20%"], ["WhatsApp", "82%", "20%"], ["Tally", "18%", "80%"], ["Zoho CRM", "82%", "80%"]];

function Hub({ accent }) {
  return (
    <div className="relative h-full">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {HUB_APPS.map(([name, x, y]) => (
          <line key={name} x1="50" y1="50" x2={parseFloat(x)} y2={parseFloat(y)} stroke={accent} strokeOpacity="0.5" strokeWidth="0.8" strokeDasharray="3 2" />
        ))}
      </svg>
      <span
        className="absolute left-1/2 top-1/2 flex h-[2.2em] w-[2.2em] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[0.5em]"
        style={{ background: `linear-gradient(135deg, ${accent}, #7c3aed)`, boxShadow: `0 0 1em ${accent}66` }}
      >
        <Plug2 className="h-[1em] w-[1em] text-white" strokeWidth={2.2} />
      </span>
      {HUB_APPS.map(([name, x, y]) => (
        <span
          key={name}
          className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#1b1b33] px-[0.6em] py-[0.25em] text-[0.48em] font-medium text-slate-200"
          style={{ left: x, top: y }}
        >
          {name}
        </span>
      ))}
    </div>
  );
}

function Canvas({ accent }) {
  return (
    <div className="flex h-full gap-[0.4em]">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="flex flex-1 flex-col gap-[0.25em] rounded-[0.4em] bg-slate-100/90 p-[0.35em]"
          style={i === 1 ? { outline: `1px solid ${accent}`, outlineOffset: "2px" } : undefined}
        >
          <span className="h-[0.35em] w-[60%] rounded-full bg-slate-400/70" />
          <span className="flex-1 rounded-[0.25em] bg-slate-300/70" />
          <span className="h-[0.3em] w-[80%] rounded-full bg-slate-300" />
          <span className="h-[0.9em] rounded-[0.25em]" style={{ background: i === 2 ? "#7c3aed" : `${accent}aa` }} />
        </div>
      ))}
      <div className="flex w-[18%] flex-col gap-[0.3em]">
        {["#7c3aed", "#a855f7", accent, "#0f172a", "#e2e8f0"].map((c) => (
          <span key={c} className="h-[0.8em] rounded-[0.2em] border border-white/10" style={{ background: c }} />
        ))}
      </div>
    </div>
  );
}

const CODE = [
  [["#c084fc", "export async function "], ["#7dd3fc", "createOrder"], ["#e2e8f0", "(input) {"]],
  [["#c084fc", "  const "], ["#e2e8f0", "order = "], ["#c084fc", "await "], ["#e2e8f0", "db.orders.insert(input);"]],
  [["#c084fc", "  await "], ["#e2e8f0", "inventory."], ["#7dd3fc", "reserve"], ["#e2e8f0", "(order.items);"]],
  [["#c084fc", "  await "], ["#e2e8f0", "queue."], ["#7dd3fc", "publish"], ["#fcd34d", "('order.created'"], ["#e2e8f0", ", order);"]],
  [["#c084fc", "  return "], ["#e2e8f0", "order;"]],
  [["#e2e8f0", "}"]],
];

function CodeBlock({ accent }) {
  return (
    <div className="flex h-full flex-col font-mono">
      <div className="flex-1 space-y-[0.15em] overflow-hidden">
        {CODE.map((line, i) => (
          <div key={i} className="flex gap-[0.6em] whitespace-pre text-[0.45em] leading-[1.5]">
            <span className="w-[1em] text-right text-slate-600">{i + 1}</span>
            <span>{line.map(([c, t], j) => <span key={j} style={{ color: c }}>{t}</span>)}</span>
          </div>
        ))}
      </div>
      <div className="mt-[0.3em] rounded-[0.3em] bg-black/40 px-[0.5em] py-[0.3em] text-[0.45em]" style={{ color: accent }}>
        ✓ 128 tests passed · deployed to production
      </div>
    </div>
  );
}

const HERO = { line: LineChart_, bars: BarChart, products: ProductGrid, flow: Workflow, hub: Hub, canvas: Canvas, code: CodeBlock };

function Hero({ screen, accent, className = "" }) {
  const Body = HERO[screen.hero.kind];
  return (
    <div className={`${PANEL} flex flex-col p-[0.6em] ${className}`}>
      <span className="text-[0.5em] font-medium text-slate-300">{screen.hero.title}</span>
      <div className="mt-[0.5em] min-h-0 flex-1">
        <Body accent={accent} />
      </div>
    </div>
  );
}

function ListPanel({ screen, accent, className = "" }) {
  const { title, rows, progress } = screen.list;
  return (
    <div className={`${PANEL} p-[0.6em] ${className}`}>
      <span className="text-[0.5em] font-medium text-slate-300">{title}</span>
      <ul className="mt-[0.3em]">
        {rows.map(([a, b, status]) => (
          <li key={a} className="flex items-center gap-[0.5em] border-t border-white/[0.05] py-[0.4em] first:border-0">
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-[0.52em] font-medium text-slate-100">{a}</p>
              <p className="truncate text-[0.44em] text-slate-500">{b}</p>
            </div>
            {progress ? (
              <div className="flex w-[35%] items-center gap-[0.3em]">
                <span className="h-[0.3em] flex-1 overflow-hidden rounded-full bg-white/10">
                  <span className="block h-full rounded-full" style={{ width: `${status}%`, background: accent }} />
                </span>
                <span className="text-[0.44em] text-slate-400">{status}%</span>
              </div>
            ) : (
              <StatusPill status={status} accent={accent} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Kpi({ kpi, accent, className = "flex-1" }) {
  const [label, value, delta] = kpi;
  return (
    <div className={`${PANEL} px-[0.6em] py-[0.5em] ${className}`}>
      <p className="truncate text-[0.44em] uppercase tracking-[0.06em] text-slate-500">{label}</p>
      <p className="mt-[0.1em] flex items-baseline gap-[0.3em]">
        <span className="text-[0.95em] font-bold leading-none text-white">{value}</span>
        {delta && <span className="text-[0.44em] font-semibold" style={{ color: delta.startsWith("-") && label !== "Avg. approval" ? "#fda4af" : accent }}>{delta}</span>}
      </p>
    </div>
  );
}

function WideScreen({ variant, alt }) {
  const screen = SCREENS[variant] || SCREENS.dashboard;
  const theme = VARIANT_THEME[variant] || VARIANT_THEME.dashboard;
  const { accent } = theme;
  const Glyph = theme.icons[0];
  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-br from-[#0b0b18] to-[#141430] text-left">
      <div className="flex items-center gap-[0.35em] border-b border-white/[0.06] px-[0.7em] py-[0.45em]">
        <span className="h-[0.4em] w-[0.4em] rounded-full bg-rose-400/70" />
        <span className="h-[0.4em] w-[0.4em] rounded-full bg-amber-300/70" />
        <span className="h-[0.4em] w-[0.4em] rounded-full bg-emerald-400/70" />
        <Glyph className="ml-[0.6em] h-[0.65em] w-[0.65em]" style={{ color: accent }} strokeWidth={2.4} />
        <span className="text-[0.52em] font-semibold tracking-wide text-slate-200">{screen.app}</span>
        <span className="ml-auto h-[1.1em] w-[1.1em] rounded-full" style={{ background: `linear-gradient(135deg, ${accent}, #7c3aed)` }} />
      </div>
      <div className="flex min-h-0 flex-1">
        <ul className="w-[21%] shrink-0 space-y-[0.15em] border-r border-white/[0.06] p-[0.45em]">
          {screen.nav.map((item, i) => (
            <li
              key={item}
              className="truncate rounded-[0.35em] px-[0.5em] py-[0.35em] text-[0.48em]"
              style={i === (alt ? 1 : 0) ? { background: `${accent}22`, color: accent, fontWeight: 600 } : { color: "#94a3b8" }}
            >
              {item}
            </li>
          ))}
        </ul>
        {alt ? (
          <div className="flex min-w-0 flex-1 gap-[0.5em] p-[0.55em]">
            <div className="flex w-[34%] flex-col gap-[0.5em]">
              {screen.kpis.map((k) => <Kpi key={k[0]} kpi={k} accent={accent} className="" />)}
              <div className={`${PANEL} flex min-h-0 flex-1 flex-col p-[0.6em]`}>
                <span className="text-[0.44em] uppercase tracking-[0.06em] text-slate-500">Trend · 30 days</span>
                <div className="mt-[0.4em] min-h-0 flex-1"><LineChart_ accent={accent} /></div>
              </div>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-[0.5em]">
              <ListPanel screen={screen} accent={accent} />
              <Hero screen={screen} accent={accent} className="min-h-0 flex-1" />
            </div>
          </div>
        ) : (
          <div className="flex min-w-0 flex-1 flex-col gap-[0.5em] p-[0.55em]">
            <div className="flex gap-[0.5em]">
              {screen.kpis.map((k) => <Kpi key={k[0]} kpi={k} accent={accent} />)}
            </div>
            <div className="flex min-h-0 flex-1 gap-[0.5em]">
              <Hero screen={screen} accent={accent} className="flex-[1.25]" />
              <ListPanel screen={screen} accent={accent} className="min-w-0 flex-1" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MapCard({ accent }) {
  return (
    <div className="relative h-[7em] overflow-hidden rounded-[0.7em] bg-[#1b2238]">
      <svg viewBox="0 0 100 70" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {[15, 35, 55].map((y) => <line key={y} x1="0" y1={y} x2="100" y2={y + 6} stroke="rgba(148,163,184,0.18)" strokeWidth="3" />)}
        {[25, 60, 85].map((x) => <line key={x} x1={x} y1="0" x2={x - 8} y2="70" stroke="rgba(148,163,184,0.18)" strokeWidth="3" />)}
        <polyline points="18,58 30,40 52,38 64,22 80,16" fill="none" stroke={accent} strokeWidth="2.5" strokeDasharray="4 3" strokeLinecap="round" />
      </svg>
      <MapPin className="absolute right-[16%] top-[12%] h-[1.4em] w-[1.4em]" style={{ color: accent }} strokeWidth={2.4} />
      <span className="absolute bottom-[14%] left-[14%] h-[0.8em] w-[0.8em] rounded-full border-2 border-white" style={{ background: accent }} />
    </div>
  );
}

function PhoneScreen({ variant }) {
  const screen = SCREENS[variant] || SCREENS.patient;
  const theme = VARIANT_THEME[variant] || VARIANT_THEME.patient;
  const { accent } = theme;
  const Glyph = theme.icons[0];
  const [title, subtitle] = screen.feature || [screen.kpis[0][1], screen.kpis[0][0]];
  return (
    <div className="flex h-full w-full flex-col gap-[0.6em] bg-gradient-to-b from-[#0b0b18] to-[#141430] px-[0.8em] pb-[0.8em] pt-[2.4em] text-left">
      <div className="flex items-center justify-between">
        <div className="leading-tight">
          <p className="text-[0.55em] text-slate-500">{screen.app}</p>
          <p className="text-[0.85em] font-semibold text-white">{screen.greeting || screen.nav[0]}</p>
        </div>
        <span className="flex h-[1.8em] w-[1.8em] items-center justify-center rounded-full" style={{ background: `${accent}26` }}>
          <Glyph className="h-[0.9em] w-[0.9em]" style={{ color: accent }} strokeWidth={2.4} />
        </span>
      </div>
      {screen.map && <MapCard accent={accent} />}
      <div className="rounded-[0.7em] p-[0.7em]" style={{ background: `linear-gradient(135deg, ${accent}40, rgba(124,58,237,0.35))` }}>
        <p className="text-[0.75em] font-semibold text-white">{title}</p>
        <p className="mt-[0.2em] text-[0.55em] text-slate-200/80">{subtitle}</p>
      </div>
      {!screen.map && (
        <div className={`${PANEL} h-[5em] shrink-0 p-[0.5em]`}>
          <LineChart_ accent={accent} />
        </div>
      )}
      <ul className="space-y-[0.4em]">
        {(screen.phoneRows || screen.list.rows.slice(0, 3)).map(([a, b, status]) => (
          <li key={a} className={`${PANEL} flex items-center gap-[0.5em] p-[0.5em]`}>
            <span className="h-[1.4em] w-[1.4em] shrink-0 rounded-full" style={{ background: `${accent}40` }} />
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-[0.58em] font-medium text-slate-100">{a}</p>
              <p className="truncate text-[0.5em] text-slate-500">{b}</p>
            </div>
            {!screen.list.progress && <span className="h-[0.5em] w-[0.5em] shrink-0 rounded-full" style={{ background: tone(status, accent).color }} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Every size inside a screen is in em off a font-size tied to the screen width,
// so the UI scales with the device frame like a real screenshot would.
function ScaledScreen({ ratio, children }) {
  return (
    <div className="h-full w-full" style={{ containerType: "inline-size" }}>
      <div className="h-full w-full overflow-hidden" style={{ fontSize: `calc(100cqw / ${ratio})` }}>
        {children}
      </div>
    </div>
  );
}

export function AbstractUI({ variant = "dashboard", compact = false, alt = false }) {
  return compact ? (
    <ScaledScreen ratio={13}><PhoneScreen variant={variant} /></ScaledScreen>
  ) : (
    <ScaledScreen ratio={30}><WideScreen variant={variant} alt={alt} /></ScaledScreen>
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

export function Tablet({ variant = "dashboard", className = "" }) {
  return (
    <div className={`relative rounded-xl border border-slate-500/40 bg-[#0a0a14] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] ${className}`} aria-hidden="true">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
        <AbstractUI variant={variant} alt />
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
          <Phone variant="mobile" className="w-28" />
          <Phone variant="commerce" className="w-24 animate-float" />
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
    <div className={`relative w-full ${className}`} aria-hidden="true">
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
