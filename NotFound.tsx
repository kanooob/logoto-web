import React, { useState } from "react";
import { Menu, X, ChevronDown, MessageSquare, BookOpen, Home, Plus } from "lucide-react";
import { Language, Page } from "../types";
import { navigateTo, setPreferredLanguage } from "../utils/routing";

interface NavbarProps {
  currentPage: Page;
  currentLang: Language;
  currentHash: string;
}

export default function Navbar({ currentPage, currentLang, currentHash }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const inviteUrl = "https://discord.com/oauth2/authorize?client_id=1431383390162124920";
  const supportUrl = "https://discord.com/invite/TPXFVYVnXe";

  const handlePageClick = (page: Page, e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(page, currentLang, page === "docs" ? "#setup" : "");
    setMobileMenuOpen(false);
  };

  const handleLangSwitch = (lang: Language, e: React.MouseEvent) => {
    e.preventDefault();
    setPreferredLanguage(lang);
    setLangDropdownOpen(false);
    navigateTo(currentPage, lang, currentHash);
    setMobileMenuOpen(false);
  };

  const text = {
    en: {
      home: "Home",
      docs: "Documentation",
      support: "Support",
      addBot: "Add the bot",
    },
    fr: {
      home: "Accueil",
      docs: "Documentation",
      support: "Support",
      addBot: "Ajouter le bot",
    },
  }[currentLang];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#36393f]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href={currentLang === "/en"}
          onClick={(e) => handlePageClick("home", e)}
          className="flex items-center gap-3 group focus:outline-none"
          id="nav-logo"
        >
          <img
            src="https://raw.githubusercontent.com/kanooob/logoto-web/refs/heads/main/icon.png"
            alt="LOGOTO Logo"
            className="w-10 h-10 object-contain transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <span className="text-xl font-black tracking-wider text-white group-hover:text-[#a3ab72] transition-colors">
            Logoto
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          <ul className="flex items-center gap-6 list-none">
            <li>
              <a
                href={currentLang === "fr" ? "/fr" : "/en"}
                onClick={(e) => handlePageClick("home", e)}
                className={`flex items-center gap-2 text-[15px] font-semibold transition-all duration-200 hover:text-[#a3ab72] ${
                  currentPage === "home" ? "text-[#a3ab72]" : "text-white/80"
                }`}
                id="nav-link-home"
              >
                <Home className="w-4 h-4" />
                {text.home}
              </a>
            </li>
            <li>
              <a
                href={currentLang === "fr" ? "/fr/docs#setup" : "/en/docs#setup"}
                onClick={(e) => handlePageClick("docs", e)}
                className={`flex items-center gap-2 text-[15px] font-semibold transition-all duration-200 hover:text-[#a3ab72] ${
                  currentPage === "docs" ? "text-[#a3ab72]" : "text-white/80"
                }`}
                id="nav-link-docs"
              >
                <BookOpen className="w-4 h-4" />
                {text.docs}
              </a>
            </li>
            <li>
              <a
                href={supportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[15px] font-semibold text-white/80 transition-all duration-200 hover:text-[#a3ab72]"
                id="nav-link-support"
              >
                <MessageSquare className="w-4 h-4" />
                {text.support}
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                onBlur={() => setTimeout(() => setLangDropdownOpen(false), 200)}
                className="flex items-center gap-1 text-sm font-bold text-white/90 hover:text-[#a3ab72] transition-colors focus:outline-none"
                id="lang-selector-btn"
                aria-label="Toggle language menu"
              >
                {currentLang.toUpperCase()} <ChevronDown className="w-4 h-4" />
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-20 rounded-md bg-[#2f3136] border border-[#8c935d] shadow-lg overflow-hidden py-1 z-50">
                  <button
                    onClick={(e) => handleLangSwitch(currentLang === "en" ? "fr" : "en", e)}
                    className="w-full text-center px-4 py-2 text-sm font-bold text-white hover:bg-[#8c935d] transition-colors block"
                  >
                    {currentLang === "en" ? "FR" : "EN"}
                  </button>
                </div>
              )}
            </div>

            {/* Add Bot Button */}
            <a
              href={inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#8c935d] hover:bg-[#767d4f] text-white font-bold text-sm py-2 px-4 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-md shadow-black/25"
              id="nav-btn-invite"
            >
              <Plus className="w-4 h-4" />
              {text.addBot}
            </a>
          </div>
        </nav>

        {/* Mobile Navigation Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white/80 hover:text-white p-2 focus:outline-none"
          id="mobile-menu-btn"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#2f3136] border-b border-white/5 animate-fadeIn">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <a
              href={currentLang === "fr" ? "/fr" : "/en"}
              onClick={(e) => handlePageClick("home", e)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium hover:bg-white/5 transition-colors ${
                currentPage === "home" ? "text-[#a3ab72] bg-white/5" : "text-white/80"
              }`}
            >
              <Home className="w-5 h-5" />
              {text.home}
            </a>
            <a
              href={currentLang === "fr" ? "/fr/docs#setup" : "/en/docs#setup"}
              onClick={(e) => handlePageClick("docs", e)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium hover:bg-white/5 transition-colors ${
                currentPage === "docs" ? "text-[#a3ab72] bg-white/5" : "text-white/80"
              }`}
            >
              <BookOpen className="w-5 h-5" />
              {text.docs}
            </a>
            <a
              href={supportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-white/80 hover:bg-white/5 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              {text.support}
            </a>

            {/* Language Selection for Mobile */}
            <div className="border-t border-white/10 pt-4 flex items-center justify-between px-3">
              <span className="text-sm text-white/60 font-medium">Language</span>
              <div className="flex gap-2">
                <button
                  onClick={(e) => handleLangSwitch("en", e)}
                  className={`px-3 py-1 text-xs font-bold rounded ${
                    currentLang === "en" ? "bg-[#8c935d] text-white" : "bg-[#36393f] text-white/60 hover:text-white"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={(e) => handleLangSwitch("fr", e)}
                  className={`px-3 py-1 text-xs font-bold rounded ${
                    currentLang === "fr" ? "bg-[#8c935d] text-white" : "bg-[#36393f] text-white/60 hover:text-white"
                  }`}
                >
                  FR
                </button>
              </div>
            </div>

            {/* Add Bot Button */}
            <div className="pt-2">
              <a
                href={inviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#8c935d] hover:bg-[#767d4f] text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md shadow-black/25"
              >
                <Plus className="w-5 h-5" />
                {text.addBot}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
