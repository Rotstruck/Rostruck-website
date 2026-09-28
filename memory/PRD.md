# ROTSTRUCK — Company Website PRD

## Original Problem Statement
Build a complete, premium, responsive company website for ROTSTRUCK — Software Development: a futuristic technology studio site with purple futuristic brand identity, interactive 3D product showcase (floating MacBook/phone, purple angular geometry, glass UI), dark + light theme system, device mockups with abstract (text-free) screens only, and pages: Home, Services, Industries, Projects (+ detail pages incl. MEDBUILDS), Process, About, Contact (form + enquiry handling), Privacy, Terms. Award-level motion (framer-motion reveals, lenis smooth scroll, masked hero headline, editorial marquee). Accessibility, responsiveness, and graceful 3D fallbacks required.

## Architecture
- Frontend: React 19 (CRA/craco), Tailwind + custom CSS theme tokens, framer-motion, lenis, three + @react-three/fiber + @react-three/drei, sonner toasts.
- Backend: FastAPI, MongoDB (motor), JWT cookie auth (bcrypt), multipart enquiry intake (optional file ≤2MB stored as base64).
- Routes: / /services /industries /projects /projects/:slug /process /about /contact /privacy /terms /admin
- API: /api/health, /api/auth/login|logout|me, /api/enquiries (POST public, GET/PATCH admin), /api/enquiries/:id/file
- Brand assets: /public/assets/logo-mark.png (transparent, from user upload), favicon.png, logo-full.jpg

## User Personas
- Prospective client (hospital/school/business owner) evaluating Rotstruck's capabilities → browses services/projects, submits enquiry.
- Returning visitor switching themes / browsing on mobile.
- Rotstruck admin reviewing incoming project enquiries at /admin.

## Core Requirements (static)
- Premium purple/dark-navy futuristic brand, dark + light themes with persistence + system-preference default.
- Interactive 3D hero (cursor parallax, scroll drift, click pulse) with mobile/reduced-motion/no-WebGL fallback.
- No readable text inside any device mockup; all content as real HTML.
- All pages + project detail template; MEDBUILDS featured.
- Contact form with validation, loading/error/success states, file upload, persistence.
- Accessibility: semantic HTML, one H1/page, focus styles, aria labels, prefers-reduced-motion.
- SEO floor: static head meta/OG/Twitter/JSON-LD, noscript fallback, robots.txt, llms.txt (canonical/sitemap pending production domain).

## Implemented (2026-09-28)
- Full site: all 10 routes built and verified with screenshots in both themes + mobile/tablet/desktop.
- R3F hero: purple octahedron gem in wireframe icosahedron, 3D MacBook/phone with abstract UI, glass cards, particles, glow rings, cursor parallax, click pulse, scroll drift, viewport pause, fallbacks.
- CSS 3D visuals: services constellation (hover-synced), industries orbit (hover-synced), process journey path (scroll-synced), about gem (tilt + click ripple), contact phone scene, CTA launch visual.
- Projects: 8 products (MEDBUILDS, SKOLAR, VENDRA, SAASFORGE, PULSEBOARD, FLOWDESK, VITALGO, CLASSORBIT) with filters + search + detail template.
- Contact form → MongoDB; admin /admin with JWT login, enquiry list, read toggle, attachment download.
- SEO: index.html meta/OG/JSON-LD (no fabricated contacts/URLs), robots.txt, llms.txt, per-route titles via Seo component.

## Backlog
- P0: Real contact details + social URLs (placeholders in copy only, kept out of metadata); real live project URLs ("Visit Live Project" buttons activate when liveUrl set in src/data.js).
- P1: Resend email notification on new enquiry; canonical/og:url/sitemap.xml once production domain confirmed; enable crawler prerender toggle at deploy.
- P2: Blog/insights section; testimonials; per-service detail pages; enquiry status pipeline (new/contacted/quoted) in admin.

## Next Tasks
1. Collect real email/phone/socials from owner and update src/data.js CONTACT + JSON-LD.
2. Wire Resend email alerts for enquiries.
3. Deploy, enable SEO crawler toggle, verify live with Googlebot/OAI-SearchBot UAs.
