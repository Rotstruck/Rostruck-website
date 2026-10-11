import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

function LegalLayout({ eyebrow, title, updated, sections }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={[title]} lede={`Last updated: ${updated}`} />
      <section className="mx-auto max-w-3xl space-y-6 px-4 pb-24 sm:px-6" data-testid="legal-content">
        {sections.map(([h, body]) => (
          <Reveal key={h}>
            <div className="glass-panel rounded-2xl p-7">
              <h2 className="font-display text-xl font-bold">{h}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          </Reveal>
        ))}
      </section>
    </>
  );
}

export function Privacy() {
  return (
    <>
      <Seo title="Privacy Policy — ROTSTRUCK" description="How Rotstruck collects, uses and protects your information." />
      <LegalLayout
        eyebrow="Legal"
        title="Privacy Policy"
        updated="January 2026"
        sections={[
          ["Information we collect", "When you contact Rotstruck through this website, we collect the details you provide in the enquiry form: your name, company, email address, phone number, project description, budget and timeline preferences. We also collect standard technical information such as browser type and pages visited, used only to improve the website."],
          ["How we use your information", "We use the information you provide solely to respond to your enquiry, prepare proposals, and communicate about potential or active projects. We do not sell, rent, or trade your personal information to third parties."],
          ["Data storage and retention", "Enquiry data is transmitted securely to our hosting mailbox and retained for up to 12 months solely for project correspondence, evaluation, and quoting. We do not retain old enquiries indefinitely or collect unsolicited file attachments. We apply industry-standard authentication and security practices to protect data against unauthorized access."],
          ["Cookies and analytics", "This website uses privacy-conscious analytics to understand aggregate usage patterns. Your theme preference is stored locally in your browser and never leaves your device."],
          ["Your rights", "You may request access to, correction of, or deletion of your personal information at any time by contacting us at team@rotstruck.in. We will respond to verified requests within a reasonable timeframe."],
          ["Changes to this policy", "We may update this policy as our services evolve. Material changes will be reflected on this page with an updated revision date."],
        ]}
      />
    </>
  );
}

export function Terms() {
  return (
    <>
      <Seo title="Terms of Service — ROTSTRUCK" description="The terms governing use of the Rotstruck website and engagement of Rotstruck services." />
      <LegalLayout
        eyebrow="Legal"
        title="Terms of Service"
        updated="January 2026"
        sections={[
          ["Use of this website", "This website presents the services and work of Rotstruck Software Development. You may browse and share its content for evaluation purposes. You may not copy the site's design, code, or branding for commercial use without written permission."],
          ["Project showcases", "Project case studies shown on this website, including MEDBUILDS, SKOLAR, VENDRA and others, illustrate the type of systems Rotstruck designs and builds. Device imagery and interface visuals are abstract representations, not screenshots of client-confidential systems."],
          ["Enquiries and proposals", "Submitting the contact form does not create a client relationship or obligation on either side. Project scope, pricing, timelines and deliverables are defined only in a mutually signed agreement."],
          ["Intellectual property", "The Rotstruck name, logo, and website content are the property of Rotstruck Software Development. Intellectual property terms for client work are defined per project agreement."],
          ["Limitation of liability", "The website is provided as-is. While we work to keep information accurate and the site available, Rotstruck is not liable for decisions made based on website content or for temporary unavailability."],
          ["Contact", "Questions about these terms can be sent to team@rotstruck.in."],
        ]}
      />
    </>
  );
}
