import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, INDUSTRIES, NAV_LINKS, SERVICES } from "@/data";

export default function Footer() {
  return (
    <footer className="relative mt-8 border-t border-purple-500/15 bg-[#05050E] text-slate-300" data-testid="site-footer">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-12">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 border-b border-white/5 pb-12 md:flex-row md:items-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Let&rsquo;s build something <span className="text-gradient">useful</span>.
          </h2>
          <Link
            to="/contact"
            data-testid="footer-cta-btn"
            className="btn-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
          >
            Start a Project
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src="/assets/logo-mark.png" alt="Rotstruck logo" className="h-9 w-auto" />
              <span className="font-display text-lg font-bold tracking-[0.14em]">
                <span className="text-purple-400">ROT</span>
                <span className="text-white">STRUCK</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Custom software, digital products, and connected systems for modern businesses.
            </p>

          </div>

          <nav aria-label="Footer navigation">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-purple-400">Navigate</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-slate-400 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer services">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-purple-400">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link to="/services" className="text-slate-400 transition-colors hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer industries">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-purple-400">Industries</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {INDUSTRIES.slice(0, 6).map((i) => (
                <li key={i.slug}>
                  <Link to="/industries" className="text-slate-400 transition-colors hover:text-white">
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={`mailto:${CONTACT.email}`} data-testid="footer-email" className="inline-flex items-center gap-2 transition-colors hover:text-purple-300">
              <Mail className="h-4 w-4 text-purple-400" aria-hidden="true" /> {CONTACT.email}
            </a>
            <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`} data-testid="footer-phone" className="inline-flex items-center gap-2 transition-colors hover:text-purple-300">
              <Phone className="h-4 w-4 text-purple-400" aria-hidden="true" /> {CONTACT.phone}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-purple-400" aria-hidden="true" /> {CONTACT.location}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" data-testid="footer-privacy-link" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link to="/terms" data-testid="footer-terms-link" className="transition-colors hover:text-white">Terms of Service</Link>
          </div>
        </div>

        <p className="mt-8 text-xs text-slate-500">
          © 2026 Rotstruck Software Development. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
