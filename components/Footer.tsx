"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Input } from "./Input";
import Button from "./Button";
import { useTranslation } from "../lib/i18n/LanguageContext";

// Simple SVG icon components
const InstagramIcon = () => (
  <svg
    className="w-4 h-4"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.92-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon = () => (
  <svg
    className="w-4 h-4"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg
    className="w-4 h-4"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    className="w-4 h-4"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function Footer() {
  const [phone, setPhone] = useState("");
  const [emailMode, setEmailMode] = useState(false);
  const { t } = useTranslation();

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(
      t("footer.subscribeSuccess", { value: phone || "email" })
    );
  };

  return (
    <footer className="w-full bg-green-900 text-white py-16 px-6 md:px-12 lg:px-20 relative overflow-hidden">
      {/* Top Footer Section: Signup Form & Links */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        {/* Left Column: Sign Up and Wordmark */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            {t("footer.title")}
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed max-w-md">
            {t("footer.description")}
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex max-w-sm rounded-xl overflow-hidden shadow-soft"
          >
            <Input
              type={emailMode ? "email" : "tel"}
              placeholder={emailMode ? t("footer.emailPlaceholder") : t("footer.phonePlaceholder")}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="rounded-r-none border-r-0"
            />
            <Button
              variant="secondary"
              type="submit"
              className="rounded-l-none px-6 shrink-0"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <button
            type="button"
            onClick={() => {
              setEmailMode(!emailMode);
              setPhone("");
            }}
            className="text-xs font-semibold text-gray-300 hover:text-white transition-colors underline"
          >
            {emailMode ? t("footer.usePhone") : t("footer.useEmail")}
          </button>

          {/* Wordmark Logo */}
          <div className="pt-8">
            <div className="flex items-center gap-3 mb-4">
            <img
              src="/kassongo-logo.svg"
              alt="Kassongo"
              style={{ height: "32px", width: "auto" }} 
              className="w-8 h-8 transition-smooth"
            />
            </div>
            {/* Socials */}
            <div className="flex gap-3">
              <a
                href="#instagram"
                className="w-9 h-9 rounded-lg bg-green-950 border border-white/10 flex items-center justify-center hover:border-white/30 transition-all"
              >
                <InstagramIcon />
              </a>
              <a
                href="#tiktok"
                className="w-9 h-9 rounded-lg bg-green-950 border border-white/10 flex items-center justify-center hover:border-white/30 transition-all"
              >
                <TikTokIcon />
              </a>
              <a
                href="#youtube"
                className="w-9 h-9 rounded-lg bg-green-950 border border-white/10 flex items-center justify-center hover:border-white/30 transition-all"
              >
                <YoutubeIcon />
              </a>
              <a
                href="#facebook"
                className="w-9 h-9 rounded-lg bg-green-950 border border-white/10 flex items-center justify-center hover:border-white/30 transition-all"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Right Columns: Nav Links */}
        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
          {/* Column 2: Products */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white">
              {t("footer.links.products") || "Products"}
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/products/checkout" className="hover:text-white transition-colors">
                  {t("footer.links.checkout") || "Checkout"}
                </a>
              </li>
              <li>
                <a href="/products/landed-cost" className="hover:text-white transition-colors">
                  {t("footer.links.landedCost") || "Landed Cost"}
                </a>
              </li>
              <li>
                <a href="/tools/hs-lookup" className="hover:text-white transition-colors">
                  {t("common.hsLookup") || "HS Lookup"}
                </a>
              </li>
              <li>
                <a href="/products/plugins" className="hover:text-white transition-colors">
                  {t("footer.links.plugins") || "Plugins"}
                </a>
              </li>
              <li>
                <a href="/products/kassongo-capital" className="hover:text-white transition-colors">
                  {t("footer.links.kassongoCapital") || "Capital"}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white">
              {t("footer.links.solutions") || "Solutions"}
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/solutions/assisted-sourcing" className="hover:text-white transition-colors">
                  {t("footer.links.sourcing") || "Assisted Sourcing"}
                </a>
              </li>
              <li>
                <a href="/solutions/express-forwarding" className="hover:text-white transition-colors">
                  {t("footer.links.forwarding") || "Express Forwarding"}
                </a>
              </li>
              <li>
                <a href="/solutions/secure-warehousing" className="hover:text-white transition-colors">
                  {t("footer.links.warehousing") || "Secure Warehousing"}
                </a>
              </li>
              <li>
                <a href="/solutions/consolidation" className="hover:text-white transition-colors">
                  {t("footer.links.consolidation") || "Consolidation"}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: The Company */}
          <div className="space-y-3 text-sm text-gray-300">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white">
              {t("footer.links.company") || "The Company"}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/about-us" className="hover:text-white transition-colors">
                  {t("footer.links.aboutUs") || "About Us"}
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  {t("common.contactUs") || "Contact Us"}
                </a>
              </li>
              <li>
                <a href="/company/careers" className="hover:text-white transition-colors">
                  {t("footer.links.careers") || "Careers"}
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white transition-colors">
                  {t("footer.links.newsroom") || "Newsroom"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-green-800 relative z-10 flex flex-col md:flex-row justify-between gap-6 text-xs text-gray-400">
        <p>
          {t("footer.allRightsReserved", { year: new Date().getFullYear() })}
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="/privacy-policy" className="hover:text-white transition-colors">
            {t("common.privacyPolicy")}
          </a>
          <a href="/terms-and-conditions" className="hover:text-white transition-colors">
            {t("common.termsConditions")}
          </a>
          <a href="/prohibited-items" className="hover:text-white transition-colors">
            {t("common.prohibitedItems")}
          </a>
          <a href="/faq" className="hover:text-white transition-colors">
            {t("common.faq")}
          </a>
        </div>
      </div>

      {/* Giant branding text */}
      <div className="mx-auto pt-5 relative z-0">
        <div className="w-full text-center flex flex-col items-center leading-[0.85]">
          <span className="font-display font-black text-[10vw] md:text-[6vw] lg:text-[12vw] tracking-tighter uppercase text-green-700">
            {t("header.logo")}
          </span>
          <span className="font-display font-black text-[10vw] md:text-[6vw] lg:text-[12vw] tracking-tighter uppercase text-green-700">
            Mail
          </span>
        </div>
      </div>
    </footer>
  );
}
