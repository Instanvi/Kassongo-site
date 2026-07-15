"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import { Calculator, BookOpen, Globe, ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";
import { useTranslation } from "../../lib/i18n/LanguageContext";

export default function ToolsPortalPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-green-100 selection:text-gray-900">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative bg-white py-16 md:py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-yellow-50 opacity-60"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-900/5 to-transparent"></div>

          <div className="max-w-7xl mx-auto relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-green-900 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-soft mx-auto">
              <Globe className="w-3 h-3 text-yellow-400" />
              <span>Free Trade Utilities</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tight text-gray-900 max-w-4xl mx-auto">
              Smarter Tools for <br />
              <span className="text-green-800">Global Trade & Shipping</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Simplify your logistics operations. Use our free, high-performance calculators to estimate customs fees or look up standardized trade codes.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-12 px-6 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tool 1: Duty Calculator */}
            <div className="group relative bg-white/70 backdrop-blur-md border border-gray-100 rounded-3xl p-8 md:p-10 shadow-soft-xl hover:shadow-soft-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-green-900"></div>
              <div className="space-y-6">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-900 group-hover:scale-110 transition-transform duration-300">
                  <Calculator className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-950 mb-3">
                    {t("common.dutyCalculator")}
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Calculate custom import duties, VAT, and estimated landed costs for trade lanes between China, US, UK, Europe, and African countries like Cameroon and Nigeria. Includes trade agreement benefits (AfCFTA, AGOA).
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-gray-500 font-medium">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-700" />
                    <span>Real-time conversion to XAF, NGN, KES, ZAR, and USD</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-700" />
                    <span>Support for AfCFTA & intra-African trade estimates</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Button
                  variant="primary"
                  size="lg"
                  href="/tools/duty-calculator"
                  className="w-full group-hover:bg-green-800"
                >
                  <span>Open Calculator</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Tool 2: HS Lookup */}
            <div className="group relative bg-white/70 backdrop-blur-md border border-gray-100 rounded-3xl p-8 md:p-10 shadow-soft-xl hover:shadow-soft-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-yellow-400"></div>
              <div className="space-y-6">
                <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-950 mb-3">
                    {t("common.hsLookup")}
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Look up Harmonized System (HS) codes for standard import/export goods. Search by keyword, browse category chips, copy 6-digit codes instantly, and directly calculate their duty rates.
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-gray-500 font-medium">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-700" />
                    <span>Searchable directory of standard global trade commodities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-700" />
                    <span>One-click clipboard copying and direct calculator routing</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Button
                  variant="secondary"
                  size="lg"
                  href="/tools/hs-lookup"
                  className="w-full"
                >
                  <span>Search HS Codes</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Help */}
        <section className="py-16 px-6 max-w-5xl mx-auto">
          <div className="bg-green-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-soft-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-900 rounded-full blur-3xl opacity-30 -mr-20 -mt-20"></div>
            <div className="space-y-4 max-w-xl text-center md:text-left relative z-10">
              <h3 className="text-2xl md:text-3xl font-display font-bold">
                Need Exact Shipping & Customs Quotes?
              </h3>
              <p className="text-sm text-green-200/80 leading-relaxed">
                Customs procedures can vary by weight, dimension, and current regional policies. Our experts will check your trade requirements and provide custom freight and clearance rates.
              </p>
            </div>
            <div className="relative z-10 shrink-0">
              <Button
                variant="secondary"
                size="xl"
                href="/contact"
                className="flex items-center gap-2"
              >
                <HeartHandshake className="w-5 h-5" />
                <span>Get an Expert Quote</span>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
