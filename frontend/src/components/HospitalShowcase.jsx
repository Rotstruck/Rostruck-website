import { BedDouble, HeartPulse, Heart } from "lucide-react";

// Coded MEDBUILDS admin composition. Every size is in em off a root font-size
// tied to the container width (cqw), so the whole scene scales as one picture.

const SIDEBAR = ["Overview", "Patients", "Doctors", "Appointments", "Nursing", "Beds & Vitals", "Billing", "Reports"];

const KPIS = [
  { label: "Total patients", value: "1,284", delta: "+6%" },
  { label: "Appts today", value: "196", delta: "+12%" },
  { label: "Beds occupied", value: "73.6%" },
  { label: "Revenue today", value: "₹4.2L", delta: "+8%" },
];

const APPT_BARS = [38, 62, 48, 80, 66, 100, 84];

const RECENT = [
  { name: "Priya Sharma", mrn: "MRN 20481", status: "Observe" },
  { name: "Rahul Verma", mrn: "MRN 20477", status: "Observe" },
  { name: "Ayesha Khan", mrn: "MRN 20470", status: "Stable" },
];

const WARD = [
  { bed: "Bed 01", who: "Aarav Malhotra · Dr. Rao", status: "Stable" },
  { bed: "Bed 07", who: "Rahul Verma · Dr. Rao", status: "Observe" },
  { bed: "Bed 12", who: "Vikram Nair · Dr. Sen", status: "Critical" },
];

const TIMELINE = [
  { step: "Registered", done: true },
  { step: "Consultation done", done: true },
  { step: "Lab tests ordered", done: true },
  { step: "Vitals recorded", done: true },
  { step: "Discharge pending", done: false },
];

const PILL = {
  Stable: "border-sky-300/70 bg-sky-100 text-sky-700 dark:border-sky-400/30 dark:bg-sky-400/15 dark:text-sky-300",
  Observe: "border-amber-300/70 bg-amber-100 text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/15 dark:text-amber-300",
  Critical: "border-rose-300/70 bg-rose-100 text-rose-600 dark:border-rose-400/30 dark:bg-rose-400/15 dark:text-rose-300",
};

const CARD =
  "rounded-[1em] border border-sky-200/80 bg-white/90 shadow-[0_1em_2.5em_rgba(14,165,233,0.14)] backdrop-blur-md dark:border-sky-400/20 dark:bg-slate-900/85 dark:shadow-[0_1em_2.5em_rgba(0,0,0,0.45)]";
const TILE = "rounded-[0.6em] border border-sky-100 bg-white dark:border-white/10 dark:bg-white/[0.04]";
const LABEL = "text-[0.5em] font-medium uppercase tracking-[0.06em] text-slate-500 dark:text-slate-400";
const BIG = "font-display font-bold leading-none tracking-tight text-slate-900 dark:text-white";
const ACCENT_TEXT = "text-sky-600 dark:text-sky-300";

function Pill({ status, className = "" }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-[0.6em] py-[0.15em] text-[0.48em] font-medium ${PILL[status]} ${className}`}>
      {status}
    </span>
  );
}

function Donut({ pct }) {
  const c = 2 * Math.PI * 14;
  return (
    <div className="relative h-[3.2em] w-[3.2em]">
      <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
        <circle cx="18" cy="18" r="14" fill="none" className="stroke-sky-100 dark:stroke-white/10" strokeWidth="4.5" />
        <circle
          cx="18" cy="18" r="14" fill="none" stroke="url(#hs-donut)" strokeWidth="4.5" strokeLinecap="round"
          strokeDasharray={`${(pct / 100) * c} ${c}`}
        />
        <defs>
          <linearGradient id="hs-donut" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[0.44em] font-semibold text-slate-800 dark:text-white">
        {pct}%
      </span>
    </div>
  );
}

function AdminWindow() {
  return (
    <div className={`${CARD} absolute left-[12.3%] top-[11%] w-[77.6%] overflow-hidden`}>
      <div className="flex items-center justify-between border-b border-sky-100 px-[0.9em] py-[0.55em] dark:border-white/10">
        <span className="text-[0.52em] text-slate-500 dark:text-slate-400">rotstruck.in/admin · Hospital overview</span>
        <span className="flex items-center gap-[0.3em] text-[0.48em] font-semibold text-sky-600 dark:text-sky-300">
          <span className="relative flex h-[0.8em] w-[0.8em]">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />
            <span className="relative inline-flex h-full w-full rounded-full bg-sky-400" />
          </span>
          LIVE
        </span>
      </div>
      <div className="flex">
        <ul className="w-[23%] shrink-0 border-r border-sky-100 py-[0.6em] dark:border-white/10">
          {SIDEBAR.map((item, i) => (
            <li
              key={item}
              className={`mx-[0.9em] py-[0.62em] text-[0.48em] ${i === 0 ? "font-semibold text-sky-600 dark:text-sky-300" : "text-slate-500 dark:text-slate-400"}`}
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="flex-1 p-[0.8em]">
          <div className="flex items-baseline justify-between">
            <span className="text-[0.62em] font-semibold text-slate-800 dark:text-white">Good morning, Dr. Mehta</span>
            <span className="text-[0.46em] text-slate-500 dark:text-slate-400">Today · OPD + IPD</span>
          </div>
          <div className="mt-[0.6em] grid grid-cols-4 gap-[0.45em]">
            {KPIS.map((k) => (
              <div key={k.label} className={`${TILE} px-[0.45em] py-[0.4em]`}>
                <p className="text-[0.38em] uppercase tracking-[0.04em] text-slate-500 dark:text-slate-400">{k.label}</p>
                <p className="mt-[0.1em] flex items-baseline gap-[0.25em]">
                  <span className={`${BIG} text-[0.8em]`}>{k.value}</span>
                  {k.delta && <span className={`text-[0.38em] font-semibold ${ACCENT_TEXT}`}>{k.delta}</span>}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-[0.5em] grid grid-cols-3 gap-[0.45em]">
            <div className={`${TILE} p-[0.45em]`}>
              <p className="text-[0.42em] font-medium text-slate-700 dark:text-slate-300">Appointments trend</p>
              <div className="mt-[0.4em] flex h-[2.6em] items-end gap-[0.22em]">
                {APPT_BARS.map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-[0.25em] bg-gradient-to-t from-sky-400 to-sky-200 dark:from-sky-500 dark:to-sky-300/60"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            <div className={`${TILE} p-[0.45em]`}>
              <p className="text-[0.42em] font-medium text-slate-700 dark:text-slate-300">Bed occupancy</p>
              <div className="mt-[0.2em] flex justify-center">
                <Donut pct={73.6} />
              </div>
            </div>
            <div className={`${TILE} p-[0.45em]`}>
              <p className="text-[0.42em] font-medium text-slate-700 dark:text-slate-300">Revenue trend</p>
              <svg viewBox="0 0 100 40" className="mt-[0.4em] h-[2.6em] w-full" preserveAspectRatio="none">
                <polyline
                  points="0,34 18,26 32,30 50,18 64,22 82,10 100,4"
                  fill="none" stroke="#38bdf8" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className={`${TILE} mt-[0.5em] px-[0.5em] py-[0.4em]`}>
            <p className="text-[0.42em] font-medium text-slate-700 dark:text-slate-300">Recent patients</p>
            <ul className="mt-[0.2em]">
              {RECENT.map((p) => (
                <li key={p.name} className="grid grid-cols-[1.4fr_1fr_auto] items-center py-[0.28em]">
                  <span className="text-[0.5em] text-slate-800 dark:text-slate-100">{p.name}</span>
                  <span className="text-[0.4em] text-slate-400">{p.mrn}</span>
                  <Pill status={p.status} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeartRateCard() {
  return (
    <div className={`${CARD} absolute left-[3%] top-[7.3%] z-20 w-[26.5%] p-[0.8em] animate-float-soft`}>
      <div className="flex items-start justify-between">
        <span className={LABEL}>Heart rate</span>
        <Heart className="h-[0.8em] w-[0.8em] text-sky-500" strokeWidth={2} />
      </div>
      <p className="mt-[0.35em] flex items-baseline gap-[0.2em]">
        <span className={`${BIG} text-[1.55em]`}>78</span>
        <span className="text-[0.56em] font-semibold text-slate-500 dark:text-slate-400">bpm</span>
      </p>
      <svg viewBox="0 0 60 20" className="ml-[1.4em] mt-[0.3em] h-[1.1em] w-[2.2em]">
        <polyline points="0,12 30,12 38,4 46,18 50,12" fill="none" stroke="#38bdf8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className={`mt-[0.35em] text-[0.5em] ${ACCENT_TEXT}`}>Stable recovery trend</p>
    </div>
  );
}

function IcuCard() {
  return (
    <div className={`${CARD} absolute left-[63.4%] top-[36.5%] z-20 w-[26.5%] p-[0.8em] animate-float-soft`} style={{ animationDelay: "1.4s" }}>
      <div className="flex items-center gap-[0.5em]">
        <span className="flex h-[1.7em] w-[1.7em] items-center justify-center rounded-[0.45em] bg-gradient-to-br from-sky-300 to-sky-500 shadow-[0_0.4em_1em_rgba(14,165,233,0.35)]">
          <HeartPulse className="h-[0.95em] w-[0.95em] text-white" strokeWidth={2.2} />
        </span>
        <span className="text-[0.64em] font-semibold text-slate-800 dark:text-white">ICU Monitoring</span>
      </div>
      <p className="mt-[0.55em] text-[0.48em] text-slate-500 dark:text-slate-400">Critical cases surfaced instantly</p>
    </div>
  );
}

function WardCard() {
  return (
    <div className={`${CARD} absolute left-[1.7%] top-[55.5%] z-10 w-[38.7%] overflow-hidden`}>
      <div className="flex items-center justify-between bg-sky-50 px-[0.9em] py-[0.6em] dark:bg-sky-400/10">
        <span className="text-[0.56em] font-semibold text-slate-800 dark:text-white">Ward · General B</span>
        <span className={`text-[0.42em] font-medium ${ACCENT_TEXT}`}>Beds &amp; Vitals</span>
      </div>
      <ul className="space-y-[0.45em] p-[0.7em]">
        {WARD.map((w) => (
          <li key={w.bed} className={`${TILE} flex items-center justify-between px-[0.55em] py-[0.45em]`}>
            <div>
              <p className="text-[0.5em] font-semibold text-slate-800 dark:text-white">{w.bed}</p>
              <p className="text-[0.4em] text-slate-500 dark:text-slate-400">{w.who}</p>
            </div>
            <Pill status={w.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function BedsCard() {
  return (
    <div className={`${CARD} absolute left-[35.4%] top-[57.9%] z-20 w-[26.5%] p-[0.8em]`}>
      <div className="flex items-start justify-between">
        <span className={LABEL}>Beds occupied</span>
        <BedDouble className="h-[0.85em] w-[0.85em] text-sky-500" strokeWidth={2} />
      </div>
      <p className={`${BIG} mt-[0.3em] text-[1.5em]`}>73.6%</p>
      <div className="mt-[0.55em] h-[0.3em] overflow-hidden rounded-full bg-sky-100 dark:bg-white/10">
        <div className="h-full w-[73.6%] rounded-full bg-gradient-to-r from-sky-300 to-sky-500" />
      </div>
      <p className={`mt-[0.5em] text-[0.48em] ${ACCENT_TEXT}`}>Live occupancy across wards</p>
    </div>
  );
}

function Spo2Card() {
  return (
    <div className={`${CARD} absolute left-[35.4%] top-[81%] z-20 w-[24%] p-[0.8em] animate-float-soft`} style={{ animationDelay: "2.6s" }}>
      <div className="flex items-start justify-between">
        <span className={LABEL}>
          SpO<sub>2</sub>
        </span>
        <span className="h-[0.6em] w-[0.6em] rounded-full bg-sky-400 shadow-[0_0_0.6em_#38bdf8]" />
      </div>
      <p className={`${BIG} mt-[0.3em] text-[1.5em]`}>97%</p>
      <p className={`mt-[0.45em] text-[0.48em] ${ACCENT_TEXT}`}>Updated 10 seconds ago</p>
    </div>
  );
}

function PatientCard() {
  return (
    <div className={`${CARD} absolute left-[60.4%] top-[65.2%] z-20 w-[28.9%] overflow-hidden border-[0.25em] border-white dark:border-slate-800`}>
      <div className="bg-gradient-to-b from-sky-200 to-sky-100 px-[0.8em] pb-[0.8em] pt-[0.5em] dark:from-sky-500/30 dark:to-sky-500/10">
        <div className="mx-auto h-[0.18em] w-[2em] rounded-full bg-white/90 dark:bg-white/40" />
        <p className="mt-[0.6em] text-[0.62em] font-semibold text-slate-900 dark:text-white">Rahul Verma</p>
        <p className="text-[0.42em] text-slate-500 dark:text-slate-300">MRN 20477</p>
        <span className="mt-[0.5em] inline-block rounded-full bg-white px-[0.6em] py-[0.2em] text-[0.42em] font-medium text-sky-700 dark:bg-white/15 dark:text-sky-200">
          Admitted · Bed 12
        </span>
      </div>
      <div className="px-[0.8em] py-[0.6em]">
        <p className={LABEL}>Patient timeline</p>
        <ul className="mt-[0.3em] space-y-[0.32em]">
          {TIMELINE.map((t) => (
            <li key={t.step} className="flex items-center gap-[0.45em]">
              <span
                className={`h-[0.5em] w-[0.5em] shrink-0 rounded-full ${t.done ? "bg-sky-400" : "border border-slate-300 dark:border-slate-600"}`}
              />
              <span className={`text-[0.5em] ${t.done ? "text-slate-700 dark:text-slate-200" : "text-slate-400"}`}>{t.step}</span>
              {!t.done && <span className="ml-auto text-[0.38em] font-medium text-amber-600 dark:text-amber-400">In progress</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function HospitalShowcase({ className = "" }) {
  return (
    <div className={`relative ${className}`} style={{ containerType: "inline-size" }} aria-hidden="true">
      <div className="relative aspect-[1312/1370] select-none" style={{ fontSize: "calc(100cqw / 38)" }}>
        <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/30 blur-3xl dark:bg-sky-500/15" />
        <AdminWindow />
        <HeartRateCard />
        <IcuCard />
        <WardCard />
        <BedsCard />
        <Spo2Card />
        <PatientCard />
      </div>
    </div>
  );
}
