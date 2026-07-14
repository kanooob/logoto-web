import React from "react";
import { Language } from "../types";
import { navigateTo } from "../utils/routing";

interface FooterProps {
  currentLang: Language;
}

export default function Footer({ currentLang }: FooterProps) {
  const githubUrl = "https://github.com/kanooob/Logoto";

  const handleLegalClick = (hash: "#tos" | "#privacy", e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo("legal", currentLang, hash);
  };

  const handleGithubClick = (e: React.MouseEvent) => {
    // Just a normal external click, but let's log or keep clean
  };

  const text = {
    en: {
      hosted: "This website is hosted on Render. Logoto is a personal project.",
      copyright: "© 2026 Logoto. All rights reserved.",
      tos: "Terms of Service (ToS)",
      privacy: "Privacy Policy",
      source: "Source Code",
    },
    fr: {
      hosted: "Ce site est hébergé sur Render. Logoto est un projet personnel.",
      copyright: "© 2026 Logoto. Tous droits réservés.",
      tos: "Conditions d'Utilisation",
      privacy: "Confidentialité",
      source: "Code Source",
    },
  }[currentLang];

  return (
    <footer className="bg-[#2f3136] border-t border-white/5 py-8 mt-auto" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left space-y-1">
            <p className="text-sm text-white/60 font-medium">
              {text.hosted}
            </p>
            <p className="text-xs text-white/40">
              {text.copyright}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-white/70">
            <a
              href={currentLang === "fr" ? "/fr/legal#tos" : "/en/legal#tos"}
              onClick={(e) => handleLegalClick("#tos", e)}
              className="transition-colors hover:text-[#a3ab72]"
              id="footer-link-tos"
            >
              {text.tos}
            </a>
            <a
              href={currentLang === "fr" ? "/fr/legal#privacy" : "/en/legal#privacy"}
              onClick={(e) => handleLegalClick("#privacy", e)}
              className="transition-colors hover:text-[#a3ab72]"
              id="footer-link-privacy"
            >
              {text.privacy}
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleGithubClick}
              className="transition-colors hover:text-[#a3ab72]"
              id="footer-link-source"
            >
              {text.source}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
