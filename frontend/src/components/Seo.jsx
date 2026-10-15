import { useEffect } from "react";

const SITE = "https://rotstruck.in";

const setMeta = (selector, attribute, value) => {
  if (!value) return;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    const propMatch = selector.match(/property="([^"]+)"/);
    const nameMatch = selector.match(/name="([^"]+)"/);
    if (propMatch) el.setAttribute("property", propMatch[1]);
    if (nameMatch) el.setAttribute("name", nameMatch[1]);
    document.head.appendChild(el);
  }
  el.setAttribute(attribute, value);
};

const setCanonical = (href) => {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

/**
 * Seo — per-route metadata updater.
 *
 * Props:
 *   title       — full page title shown in browser tab & search results
 *   description — 120-160 char description for search snippet and social cards
 *   path        — canonical path, e.g. "/services" (defaults to current pathname)
 *   image       — optional OG image URL (absolute or relative)
 */
export default function Seo({ title, description, path, image }) {
  useEffect(() => {
    const canonicalPath = path || window.location.pathname;
    const canonicalUrl = `${SITE}${canonicalPath === "/" ? "" : canonicalPath}${canonicalPath.endsWith("/") || canonicalPath === "/" ? "" : ""}`;
    const cleanUrl = canonicalPath === "/" ? `${SITE}/` : `${SITE}${canonicalPath}`;
    const ogImage = image
      ? image.startsWith("http") ? image : `${SITE}${image}`
      : `${SITE}/assets/logo-full.jpg`;

    // Title
    if (title) {
      document.title = title;
      setMeta('meta[property="og:title"]', "content", title);
      setMeta('meta[name="twitter:title"]', "content", title);
    }

    // Description
    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
      setMeta('meta[name="twitter:description"]', "content", description);
    }

    // Canonical + OG URL
    setCanonical(cleanUrl);
    setMeta('meta[property="og:url"]', "content", cleanUrl);

    // OG Image
    setMeta('meta[property="og:image"]', "content", ogImage);
    setMeta('meta[name="twitter:image"]', "content", ogImage);
  }, [title, description, path, image]);

  return null;
}
