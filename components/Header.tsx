"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Button from "./Button";
import { useTranslation } from "../lib/i18n/LanguageContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale, t } = useTranslation();
  
  // Check if we're on the homepage
  const isHomepage = pathname === "/";
  
  // Navigation items with conditional URLs and translations
  const navItems = [
    { label: t("common.howItWorks"), href: isHomepage ? "#how-it-works" : "/#how-it-works" },
    { label: t("common.services"), href: isHomepage ? "#services" : "/#services" },
    { label: t("common.tools"), href: "/tools" },
    { label: t("common.about"), href:"/about-us" },
    { label: t("common.standards"), href: isHomepage ? "#standards" : "/#standards" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <img
              src="/kassongo-logo3.svg"
              alt="Kassongo"
              style={{ height: "32px", width: "auto" }} 
              className="w-8 h-8 transition-smooth"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-smooth"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 transition-all cursor-pointer"
              >
                <span className={`fi fi-${locale === "en" ? "us" : locale === "zh" ? "cn" : locale === "de" ? "de" : locale === "uk" ? "gb" : "fr"} rounded-sm`} style={{ width: "1.1rem", height: "0.825rem", display: "inline-block", backgroundSize: "cover" }} />
                <span>{locale === "uk" ? "UK" : locale.toUpperCase()}</span>
              </button>
              {isLangOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)}></div>
                  <div className="absolute right-0 mt-1.5 w-36 bg-white border border-gray-200 rounded-xl shadow-soft-lg z-50 p-1 animate-fade-in">
                    <button
                      onClick={() => {
                        setLocale("en");
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-gray-50 transition-colors ${locale === "en" ? "text-green-800 bg-green-50/50" : "text-gray-700"}`}
                    >
                      <span className="fi fi-us rounded-sm" style={{ width: "1.1rem", height: "0.825rem", display: "inline-block", backgroundSize: "cover" }} />
                      <span>English (US)</span>
                    </button>
                    <button
                      onClick={() => {
                        setLocale("uk");
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-gray-50 transition-colors ${locale === "uk" ? "text-green-800 bg-green-50/50" : "text-gray-700"}`}
                    >
                      <span className="fi fi-gb rounded-sm" style={{ width: "1.1rem", height: "0.825rem", display: "inline-block", backgroundSize: "cover" }} />
                      <span>English (UK)</span>
                    </button>
                    <button
                      onClick={() => {
                        setLocale("fr");
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-gray-50 transition-colors ${locale === "fr" ? "text-green-800 bg-green-50/50" : "text-gray-700"}`}
                    >
                      <span className="fi fi-fr rounded-sm" style={{ width: "1.1rem", height: "0.825rem", display: "inline-block", backgroundSize: "cover" }} />
                      <span>Français</span>
                    </button>
                    <button
                      onClick={() => {
                        setLocale("de");
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-gray-50 transition-colors ${locale === "de" ? "text-green-800 bg-green-50/50" : "text-gray-700"}`}
                    >
                      <span className="fi fi-de rounded-sm" style={{ width: "1.1rem", height: "0.825rem", display: "inline-block", backgroundSize: "cover" }} />
                      <span>Deutsch</span>
                    </button>
                    <button
                      onClick={() => {
                        setLocale("zh");
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-gray-50 transition-colors ${locale === "zh" ? "text-green-800 bg-green-50/50" : "text-gray-700"}`}
                    >
                      <span className="fi fi-cn rounded-sm" style={{ width: "1.1rem", height: "0.825rem", display: "inline-block", backgroundSize: "cover" }} />
                      <span>简体中文</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            <Button
              variant="secondary"
              size="default"
              href="/contact"
              className="hidden md:inline-flex"
            >
              {t("common.contactUs")}
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex w-9 h-9 items-center justify-center text-gray-600 hover:text-gray-900"
              aria-label={t("header.toggleMenu")}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-smooth"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-4 px-4 flex flex-col gap-3">
                <Button
                  variant="secondary"
                  size="lg"
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full justify-center"
                >
                  {t("common.contactUs")}
                </Button>

                {/* Mobile Language Selector Toggle */}
                <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Language</span>
                  <div className="flex gap-1.5 flex-wrap">
                    <button
                      onClick={() => {
                        setLocale("en");
                        setIsMenuOpen(false);
                      }}
                      className={`px-2 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1 transition-all ${locale === "en" ? "bg-green-900 text-white border-green-900" : "bg-white border-gray-200 text-gray-700"}`}
                    >
                      <span className="fi fi-us rounded-sm" style={{ width: "0.85rem", height: "0.64rem", display: "inline-block", backgroundSize: "cover" }} />
                      <span>US</span>
                    </button>
                    <button
                      onClick={() => {
                        setLocale("uk");
                        setIsMenuOpen(false);
                      }}
                      className={`px-2 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1 transition-all ${locale === "uk" ? "bg-green-900 text-white border-green-900" : "bg-white border-gray-200 text-gray-700"}`}
                    >
                      <span className="fi fi-gb rounded-sm" style={{ width: "0.85rem", height: "0.64rem", display: "inline-block", backgroundSize: "cover" }} />
                      <span>UK</span>
                    </button>
                    <button
                      onClick={() => {
                        setLocale("fr");
                        setIsMenuOpen(false);
                      }}
                      className={`px-2 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1 transition-all ${locale === "fr" ? "bg-green-900 text-white border-green-900" : "bg-white border-gray-200 text-gray-700"}`}
                    >
                      <span className="fi fi-fr rounded-sm" style={{ width: "0.85rem", height: "0.64rem", display: "inline-block", backgroundSize: "cover" }} />
                      <span>FR</span>
                    </button>
                    <button
                      onClick={() => {
                        setLocale("de");
                        setIsMenuOpen(false);
                      }}
                      className={`px-2 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1 transition-all ${locale === "de" ? "bg-green-900 text-white border-green-900" : "bg-white border-gray-200 text-gray-700"}`}
                    >
                      <span className="fi fi-de rounded-sm" style={{ width: "0.85rem", height: "0.64rem", display: "inline-block", backgroundSize: "cover" }} />
                      <span>DE</span>
                    </button>
                    <button
                      onClick={() => {
                        setLocale("zh");
                        setIsMenuOpen(false);
                      }}
                      className={`px-2 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1 transition-all ${locale === "zh" ? "bg-green-900 text-white border-green-900" : "bg-white border-gray-200 text-gray-700"}`}
                    >
                      <span className="fi fi-cn rounded-sm" style={{ width: "0.85rem", height: "0.64rem", display: "inline-block", backgroundSize: "cover" }} />
                      <span>ZH</span>
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

