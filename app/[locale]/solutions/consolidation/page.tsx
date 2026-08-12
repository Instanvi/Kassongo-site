"use client";

import React from "react";
import {
  Package,
  Grid,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingDown,
  Layers,
  Scale
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import NetworkCountriesGrid from "@/components/network/NetworkCountriesGrid";
import TestimonialSlider from "@/components/TestimonialSlider";
import { useTranslations } from 'next-intl';


export default function ConsolidationPage() {
  const t = useTranslations();

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-green-100 selection:text-gray-900">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative bg-white py-16 md:py-24 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-yellow-50 opacity-60"></div>

          {/* Main Container */}
          <div className="max-w-7xl mx-auto relative z-10 px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

              {/* Text Content: Takes 6 columns on desktop, full width on mobile */}
              <div className="space-y-6 lg:col-span-6 z-20">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tight text-gray-900">
                  {t("solutions.consolidation.hero.title")}<br />
                  <span className="text-green-800">{t("solutions.consolidation.hero.titleHighlight")}</span>
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  {t("solutions.consolidation.hero.subtitle")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button variant="primary" size="lg" href="/#get-address" className="shadow-soft-lg transition-all">
                    <span>{t("solutions.consolidation.hero.ctaPrimary")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="lg" href="/tools/duty-calculator">
                    {t("solutions.consolidation.hero.ctaSecondary")}
                  </Button>
                </div>
              </div>

              {/* Mobile Image: Displays normally on small screens inside the grid */}
              <div className="block lg:hidden w-full">
                <div className="relative w-full h-[300px] overflow-hidden rounded-2xl shadow-soft-xl border border-gray-100">
                  <img
                    src="/solutions/image1.webp"
                    alt="consolidation image"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Desktop Image: Absolute positioned right-side bleed with diagonal clip-path (Hidden on mobile) */}
          <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="relative w-full h-full [clip-path:polygon(15%_0%,100%_0%,100%_100%,0%_100%)]">
              <img
                src="/solutions/image1.webp"
                alt="consolidation image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Features / Benefits */}
        <section className="bg-green-900 py-20 px-6">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl md:text-4xl font-display font-black text-white">{t("solutions.consolidation.features.title")}</h2>
              <p className="text-green-100 text-sm md:text-base leading-relaxed">
                {t("solutions.consolidation.features.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("solutions.consolidation.features.item1Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("solutions.consolidation.features.item1Desc")}
                </p>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("solutions.consolidation.features.item2Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("solutions.consolidation.features.item2Desc")}
                </p>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("solutions.consolidation.features.item3Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("solutions.consolidation.features.item3Desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits list */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-2xl md:text-3xl font-display font-black text-center text-gray-900">
              {t("solutions.consolidation.benefits.title")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
                <span>{t("solutions.consolidation.benefits.item1")}</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
                <span>{t("solutions.consolidation.benefits.item2")}</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
                <span>{t("solutions.consolidation.benefits.item3")}</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
                <span>{t("solutions.consolidation.benefits.item4")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Network Countries Grid */}
        <TestimonialSlider />
        <NetworkCountriesGrid />
      </main>

      <Footer />
    </div>
  );
}

