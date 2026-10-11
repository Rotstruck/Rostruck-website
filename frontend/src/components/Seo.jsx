import { useEffect } from "react";

const updateMeta = (selector, attribute, value) => {
  let el = document.querySelector(selector);
  if (!el && selector.startsWith("meta[")) {
    el = document.createElement("meta");
    const matchProp = selector.match(/property="([^"]+)"/);
    const matchName = selector.match(/name="([^"]+)"/);
    if (matchProp) el.setAttribute("property", matchProp[1]);
    if (matchName) el.setAttribute("name", matchName[1]);
    document.head.appendChild(el);
  }
  if (el) el.setAttribute(attribute, value);
};

export default function Seo({ title, description, path, image }) {
  useEffect(() => {
    if (title) {
      document.title = title;
      updateMeta('meta[property="og:title"]', "content", title);
      updateMeta('meta[name="twitter:title"]', "content", title);
    }

    if (description) {
      updateMeta('meta[name="description"]', "content", description);
      updateMeta('meta[property="og:description"]', "content", description);
      updateMeta('meta[name="twitter:description"]', "content", description);
    }

    const currentUrl = `https://rotstruck.in${path || (typeof window !== "undefined" ? window.location.pathname : "")}`;
    updateMeta('meta[property="og:url"]', "content", currentUrl);

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", currentUrl);

    if (image) {
      const fullImg = image.startsWith("http") ? image : `https://rotstruck.in${image}`;
      updateMeta('meta[property="og:image"]', "content", fullImg);
      updateMeta('meta[name="twitter:image"]', "content", fullImg);
    }
  }, [title, description, path, image]);

  return null;
}
