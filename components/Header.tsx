"use client";

import { useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, ShoppingCart, Package, Search, Plug, Truck, Warehouse, Users, Box, Building2, Phone, Newspaper, Briefcase, Calculator } from "lucide-react";
import Button from "./Button";
import StripeNavMenu, { DropdownItem, NavSection } from "./DropdownMenu";
import { useTranslation } from "../lib/i18n/LanguageContext";

// ============================================
// Mobile Dropdown (accordion style)
// ============================================
interface MobileDropdownProps {
  title: string;
  items: DropdownItem[];
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (href: string) => void;
}

function MobileDropdown({ title, items, isOpen, onToggle, onNavigate }: MobileDropdownProps) {
  return (
    <div className="border-b border-gray-100">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-smooth cursor-pointer bg-transparent border-none"
      >
        <span>{title}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-4 pb-3 space-y-1 animate-fade-in">
          {items.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => onNavigate(item.href)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all text-left cursor-pointer bg-transparent border-none"
            >
              {item.icon && (
                <span className={`p-1.5 rounded-lg shrink-0 ${item.colorBg || "text-gray-400 bg-gray-100"}`}>
                  {item.icon}
                </span>
              )}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// Header Component
// ============================================
export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { locale, setLocale, t } = useTranslation();

  const handleMobileNavigate = useCallback((href: string) => {
    setIsMenuOpen(false);
    setMobileOpenDropdown(null);
    router.push(href);
  }, [router]);

  const productsItems: DropdownItem[] = [
    {
      label: t("footer.links.checkout") || "Checkout",
      href: "/products/checkout",
      icon: <ShoppingCart className="w-4 h-4" />,
      colorBg: "bg-emerald-100/80 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white",
      hoverBorder: "hover:border-emerald-200/80 hover:bg-emerald-50/50",
    },
    {
      label: t("footer.links.landedCost") || "Landed Cost",
      href: "/products/landed-cost",
      icon: <Package className="w-4 h-4" />,
      colorBg: "bg-blue-100/80 text-blue-700 group-hover:bg-blue-600 group-hover:text-white",
      hoverBorder: "hover:border-blue-200/80 hover:bg-blue-50/50",
    },
    {
      label: t("footer.links.plugins") || "Plugins",
      href: "/products/plugins",
      icon: <Plug className="w-4 h-4" />,
      colorBg: "bg-purple-100/80 text-purple-700 group-hover:bg-purple-600 group-hover:text-white",
      hoverBorder: "hover:border-purple-200/80 hover:bg-purple-50/50",
    },
  ];

  const solutionsItems: DropdownItem[] = [
    {
      label: t("footer.links.sourcing") || "Assisted Sourcing",
      href: "/solutions/assisted-sourcing",
      icon: <Users className="w-4 h-4" />,
      colorBg: "bg-amber-100/80 text-amber-700 group-hover:bg-amber-600 group-hover:text-white",
      hoverBorder: "hover:border-amber-200/80 hover:bg-amber-50/50",
    },
    {
      label: t("footer.links.forwarding") || "Express Forwarding",
      href: "/solutions/express-forwarding",
      icon: <Truck className="w-4 h-4" />,
      colorBg: "bg-cyan-100/80 text-cyan-700 group-hover:bg-cyan-600 group-hover:text-white",
      hoverBorder: "hover:border-cyan-200/80 hover:bg-cyan-50/50",
    },
    {
      label: t("footer.links.warehousing") || "Secure Warehousing",
      href: "/solutions/secure-warehousing",
      icon: <Warehouse className="w-4 h-4" />,
      colorBg: "bg-indigo-100/80 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white",
      hoverBorder: "hover:border-indigo-200/80 hover:bg-indigo-50/50",
    },
    {
      label: t("footer.links.consolidation") || "Consolidation",
      href: "/solutions/consolidation",
      icon: <Box className="w-4 h-4" />,
      colorBg: "bg-teal-100/80 text-teal-700 group-hover:bg-teal-600 group-hover:text-white",
      hoverBorder: "hover:border-teal-200/80 hover:bg-teal-50/50",
    },
  ];

  const toolsItems: DropdownItem[] = [
    {
      label: t("common.hsLookup") || "HS Lookup",
      href: "/tools/hs-lookup",
      icon: <Search className="w-4 h-4" />,
      colorBg: "bg-emerald-100/80 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white",
      hoverBorder: "hover:border-emerald-200/80 hover:bg-emerald-50/50",
    },
    {
      label: t("common.dutyCalculator") || "Duty Calculator",
      href: "/tools/duty-calculator",
      icon: <Calculator className="w-4 h-4" />,
      colorBg: "bg-orange-100/80 text-orange-700 group-hover:bg-orange-600 group-hover:text-white",
      hoverBorder: "hover:border-orange-200/80 hover:bg-orange-50/50",
    },
  ];

  const companyItems: DropdownItem[] = [
    {
      label: t("footer.links.aboutUs") || "About Us",
      href: "/about-us",
      icon: <Building2 className="w-4 h-4" />,
      colorBg: "bg-blue-100/80 text-blue-700 group-hover:bg-blue-600 group-hover:text-white",
      hoverBorder: "hover:border-blue-200/80 hover:bg-blue-50/50",
    },
    {
      label: t("common.contactUs") || "Contact Us",
      href: "/contact",
      icon: <Phone className="w-4 h-4" />,
      colorBg: "bg-emerald-100/80 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white",
      hoverBorder: "hover:border-emerald-200/80 hover:bg-emerald-50/50",
    },
    {
      label: t("footer.links.careers") || "Careers",
      href: "/company/careers",
      icon: <Briefcase className="w-4 h-4" />,
      colorBg: "bg-purple-100/80 text-purple-700 group-hover:bg-purple-600 group-hover:text-white",
      hoverBorder: "hover:border-purple-200/80 hover:bg-purple-50/50",
    },
    {
      label: t("footer.links.newsroom") || "Newsroom",
      href: "/company/newsroom",
      icon: <Newspaper className="w-4 h-4" />,
      colorBg: "bg-rose-100/80 text-rose-700 group-hover:bg-rose-600 group-hover:text-white",
      hoverBorder: "hover:border-rose-200/80 hover:bg-rose-50/50",
    },
  ];

  const navSections: NavSection[] = [
    {
      id: "products",
      label: t("footer.links.products") || "Products",
      items: productsItems,
    },
    {
      id: "solutions",
      label: t("footer.links.solutions") || "Solutions",
      items: solutionsItems,
    },
    {
      id: "tools",
      label: t("common.tools") || "Trade Tools",
      items: toolsItems,
    },
    {
      id: "company",
      label: t("footer.links.company") || "Company",
      items: companyItems,
    },
  ];

  const languages = [
    { code: "en" as const, flag: "us", label: "English (US)" },
    { code: "fr" as const, flag: "fr", label: "Français" },
    { code: "de" as const, flag: "de", label: "Deutsch" },
    { code: "zh" as const, flag: "cn", label: "简体中文" },
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

          {/* Desktop Navigation (Stripe / Zonos Morphing Menu) */}
          <nav className="hidden md:flex items-center">
            <StripeNavMenu sections={navSections} />
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop Language Selector */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 transition-all cursor-pointer"
              >
                <span className={`fi fi-${locale === "en" ? "us" : locale === "zh" ? "cn" : locale === "de" ? "de" : "fr"} rounded-sm`} style={{ width: "1.1rem", height: "0.825rem", display: "inline-block", backgroundSize: "cover" }} />
                <span>{locale.toUpperCase()}</span>
              </button>
              {isLangOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)}></div>
                  <div className="absolute right-0 mt-1.5 w-36 bg-white border border-gray-200 rounded-xl shadow-soft-lg z-50 p-1 animate-fade-in">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLocale(lang.code); setIsLangOpen(false); }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-gray-50 transition-colors ${locale === lang.code ? "text-green-800 bg-green-50/50" : "text-gray-700"}`}
                      >
                        <span className={`fi fi-${lang.flag} rounded-sm`} style={{ width: "1.1rem", height: "0.825rem", display: "inline-block", backgroundSize: "cover" }} />
                        <span>{lang.label}</span>
                      </button>
                    ))}
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
              <MobileDropdown
                title={t("footer.links.products") || "Products"}
                items={productsItems}
                isOpen={mobileOpenDropdown === "products"}
                onToggle={() => setMobileOpenDropdown(mobileOpenDropdown === "products" ? null : "products")}
                onNavigate={handleMobileNavigate}
              />
              <MobileDropdown
                title={t("footer.links.solutions") || "Solutions"}
                items={solutionsItems}
                isOpen={mobileOpenDropdown === "solutions"}
                onToggle={() => setMobileOpenDropdown(mobileOpenDropdown === "solutions" ? null : "solutions")}
                onNavigate={handleMobileNavigate}
              />
              <MobileDropdown
                title={t("common.tools") || "Trade Tools"}
                items={toolsItems}
                isOpen={mobileOpenDropdown === "tools"}
                onToggle={() => setMobileOpenDropdown(mobileOpenDropdown === "tools" ? null : "tools")}
                onNavigate={handleMobileNavigate}
              />
              <MobileDropdown
                title={t("footer.links.company") || "Company"}
                items={companyItems}
                isOpen={mobileOpenDropdown === "company"}
                onToggle={() => setMobileOpenDropdown(mobileOpenDropdown === "company" ? null : "company")}
                onNavigate={handleMobileNavigate}
              />

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

                <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Language</span>
                  <div className="flex gap-1.5 flex-wrap">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLocale(lang.code); setIsMenuOpen(false); }}
                        className={`px-2 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1 transition-all ${locale === lang.code ? "bg-green-900 text-white border-green-900" : "bg-white border-gray-200 text-gray-700"}`}
                      >
                        <span className={`fi fi-${lang.flag} rounded-sm`} style={{ width: "0.85rem", height: "0.64rem", display: "inline-block", backgroundSize: "cover" }} />
                      </button>
                    ))}
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