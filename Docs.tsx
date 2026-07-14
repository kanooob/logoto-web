import { Language, Page } from "../types";

export function getPreferredLanguage(): Language {
  const stored = localStorage.getItem("logoto_lang") as Language | null;
  if (stored === "en" || stored === "fr") {
    return stored;
  }
  
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("fr")) {
    return "fr";
  }
  return "en";
}

export function setPreferredLanguage(lang: Language) {
  localStorage.setItem("logoto_lang", lang);
}

export interface RouteState {
  page: Page;
  lang: Language;
  hash: string;
}

export function parseCurrentRoute(): RouteState {
  const pathname = window.location.pathname;
  const hash = window.location.hash;

  // Normalization checks
  if (pathname === "/" || pathname === "/en" || pathname === "/en/") {
    return { page: "home", lang: "en", hash };
  }
  if (pathname === "/fr" || pathname === "/fr/") {
    return { page: "home", lang: "fr", hash };
  }

  if (pathname === "/en/docs" || pathname === "/en/help" || pathname === "/en/docs/" || pathname === "/en/help/") {
    return { page: "docs", lang: "en", hash };
  }
  if (pathname === "/fr/docs" || pathname === "/fr/help" || pathname === "/fr/docs/" || pathname === "/fr/help/") {
    return { page: "docs", lang: "fr", hash };
  }

  if (pathname === "/en/legal" || pathname === "/en/legal/") {
    return { page: "legal", lang: "en", hash };
  }
  if (pathname === "/fr/legal" || pathname === "/fr/legal/") {
    return { page: "legal", lang: "fr", hash };
  }

  // Handle direct bare routes by returning they need a redirect
  if (pathname === "/docs" || pathname === "/docs/" || pathname === "/help" || pathname === "/help/") {
    const lang = getPreferredLanguage();
    return { page: "docs", lang, hash };
  }
  if (pathname === "/legal" || pathname === "/legal/") {
    const lang = getPreferredLanguage();
    return { page: "legal", lang, hash };
  }

  return { page: "not-found", lang: getPreferredLanguage(), hash };
}

export function navigateTo(page: Page, lang: Language, hash: string = "") {
  let path = "/";
  if (page === "home") {
    path = lang === "fr" ? "/fr" : "/en";
  } else if (page === "docs") {
    path = lang === "fr" ? "/fr/docs" : "/en/docs";
  } else if (page === "legal") {
    path = lang === "fr" ? "/fr/legal" : "/en/legal";
  }

  const fullPath = `${path}${hash}`;
  window.history.pushState(null, "", fullPath);
  
  // Trigger custom event to notify React component of route change
  window.dispatchEvent(new Event("popstate"));
}
