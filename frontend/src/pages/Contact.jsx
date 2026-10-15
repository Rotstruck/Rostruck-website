import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Clock, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import { ContactVisual } from "@/components/Visuals";
import { Reveal } from "@/components/Reveal";
import { useTheme } from "@/context/ThemeContext";
import { CONTACT, INDUSTRIES, SERVICES } from "@/data";

const inputCls =
  "w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-purple-400/70";
const labelCls = "mb-1.5 block text-sm font-medium text-foreground/90";
const errCls = "mt-1 text-xs text-red-500 dark:text-red-400";

function Field({ label, id, error, required, children }) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label} {required && <span className="text-purple-500" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && <p className={errCls} data-testid={`${id}-error`}>{error}</p>}
    </div>
  );
}

export default function Contact() {
  const { theme } = useTheme();
  const [form, setForm] = useState({
    fullName: "", company: "", email: "", phone: "", industry: "", service: "",
    description: "",
  });
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (form.fullName.trim().length < 2) errs.fullName = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Please enter a valid email address.";
    if (form.description.trim().length < 10) errs.description = "Tell us a little more (at least 10 characters).";
    if (!consent) errs.consent = "Please agree to the Privacy Policy before submitting.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setState("loading");
    try {
      const payload = {
        n: form.fullName,
        c: form.company,
        e: form.email,
        p: form.phone,
        i: form.industry,
        s: form.service,
        d: form.description,
        w: honeypot,
      };

      // Try Vercel Serverless Function /api/contact first, fallback to /contact.php if running on PHP host
      let res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 404) {
        // Fallback to contact.php for PHP hosting environments
        const phpRes = await fetch("/contact.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).catch(() => null);

        if (phpRes && phpRes.status !== 404) {
          res = phpRes;
        }
      }

      // Handle dev-server fallback when running without local API runtime
      if (window.location.hostname === "localhost" && res.status === 404) {
        console.warn("[Contact] Local dev server does not have API running. Simulating success on localhost.");
        setState("success");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (res.status === 429) {
          throw new Error("Too many submissions. Please wait 60 seconds before trying again.");
        }
        throw new Error(typeof data.error === "string" ? data.error : "Something went wrong. Please try again.");
      }

      const data = await res.json().catch(() => ({}));
      if (data.ok === false) {
        throw new Error(data.error || "Could not send your enquiry. Please try again.");
      }

      setState("success");
    } catch (err) {
      setState("error");
      toast.error(err.message || "Could not send your enquiry. Please try again.");
    }
  };

  return (
    <>
      <Seo
        title="Contact Rotstruck | Start Your Software Project — team@rotstruck.in"
        description="Have a software project idea? Contact Rotstruck at team@rotstruck.in. We work with healthcare, education, retail and SaaS businesses to build custom digital products."
        path="/contact"
      />
      <PageHero
        eyebrow="Contact"
        title={["Have a Product Idea?", "Let's Build It."]}
        lede="Tell us what you are planning. Rotstruck will help shape it into a useful digital product."
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-12" data-testid="contact-section">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="glass-panel rounded-3xl p-7 sm:p-10">
              {state === "success" ? (
                <div className="flex flex-col items-center py-14 text-center" data-testid="contact-success">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/15">
                    <CheckCircle2 className="h-8 w-8 text-purple-500 dark:text-purple-300" aria-hidden="true" />
                  </span>
                  <h2 className="mt-6 font-display text-2xl font-bold">Thank you.</h2>
                  <p className="mt-3 max-w-md text-muted-foreground">
                    Your enquiry has been received. The Rotstruck team will get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate data-testid="contact-form">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Full Name" id="contact-name" error={errors.fullName} required>
                      <input id="contact-name" data-testid="contact-name-input" className={inputCls} value={form.fullName} onChange={set("fullName")} autoComplete="name" placeholder="Your name" />
                    </Field>
                    <Field label="Company Name" id="contact-company">
                      <input id="contact-company" data-testid="contact-company-input" className={inputCls} value={form.company} onChange={set("company")} autoComplete="organization" placeholder="Company or organization" />
                    </Field>
                    <Field label="Email Address" id="contact-email" error={errors.email} required>
                      <input id="contact-email" type="email" data-testid="contact-email-input" className={inputCls} value={form.email} onChange={set("email")} autoComplete="email" placeholder="you@company.com" />
                    </Field>
                    <Field label="Phone Number" id="contact-phone">
                      <input id="contact-phone" type="tel" data-testid="contact-phone-input" className={inputCls} value={form.phone} onChange={set("phone")} autoComplete="tel" placeholder="+1 …" />
                    </Field>
                    <Field label="Industry" id="contact-industry">
                      <select id="contact-industry" data-testid="contact-industry-select" className={inputCls} value={form.industry} onChange={set("industry")}>
                        <option value="">Select an industry</option>
                        {INDUSTRIES.map((i) => <option key={i.slug} value={i.name}>{i.name}</option>)}
                        <option value="Other">Other</option>
                      </select>
                    </Field>
                    <Field label="Service Required" id="contact-service">
                      <select id="contact-service" data-testid="contact-service-select" className={inputCls} value={form.service} onChange={set("service")}>
                        <option value="">Select a service</option>
                        {SERVICES.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Project Description" id="contact-description" error={errors.description} required>
                        <textarea id="contact-description" data-testid="contact-description-input" rows={5} className={inputCls} value={form.description} onChange={set("description")} placeholder="What are you building? What problem does it solve? Who uses it?" />
                      </Field>
                    </div>
                    {/* Hidden bot honeypot */}
                    <input
                      type="text"
                      name="website_honey"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="hidden"
                      style={{ display: "none" }}
                    />

                    {/* Consent checkbox */}
                    <div className="sm:col-span-2 pt-2">
                      <label htmlFor="contact-consent" className="flex items-start gap-3 cursor-pointer text-sm text-muted-foreground select-none">
                        <input
                          type="checkbox"
                          id="contact-consent"
                          data-testid="contact-consent-checkbox"
                          checked={consent}
                          onChange={(e) => {
                            setConsent(e.target.checked);
                            if (errors.consent) setErrors((prev) => ({ ...prev, consent: null }));
                          }}
                          className="mt-1 h-4 w-4 rounded border-purple-500/40 text-purple-600 focus:ring-purple-500"
                        />
                        <span>
                          I agree to the{" "}
                          <Link to="/privacy" className="text-purple-400 underline underline-offset-4 hover:text-purple-300">
                            Privacy Policy
                          </Link>{" "}
                          and consent to Rotstruck processing my enquiry details.{" "}
                          <span className="text-purple-500" aria-hidden="true">*</span>
                        </span>
                      </label>
                      {errors.consent && (
                        <p className={errCls} data-testid="contact-consent-error">{errors.consent}</p>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={state === "loading"}
                    data-testid="contact-submit-btn"
                    className="btn-glow mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 font-semibold text-white transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {state === "loading" ? (
                      <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…</>
                    ) : (
                      <>Send <Send className="h-4 w-4" aria-hidden="true" /></>
                    )}
                  </button>
                  {state === "error" && (
                    <p className="mt-4 text-sm text-red-500 dark:text-red-400" data-testid="contact-error" role="alert">
                      We could not send your enquiry. Please check your connection and try again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="space-y-6">
              <ContactVisual dark={theme === "dark"} />
              <div className="glass-panel rounded-2xl p-6">
                <h2 className="font-display text-lg font-bold">Reach us directly</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <a href={`mailto:${CONTACT.email}`} data-testid="contact-email-link" className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground">
                      <Mail className="h-4 w-4 shrink-0 text-purple-500" aria-hidden="true" /> {CONTACT.email}
                    </a>
                  </li>
                  <li>
                    <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`} data-testid="contact-phone-link" className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground">
                      <Phone className="h-4 w-4 shrink-0 text-purple-500" aria-hidden="true" /> {CONTACT.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0 text-purple-500" aria-hidden="true" /> {CONTACT.location}
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="h-4 w-4 shrink-0 text-purple-500" aria-hidden="true" /> {CONTACT.hours}
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
