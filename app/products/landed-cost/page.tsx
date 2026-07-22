"use client";

import React from "react";
import { 
  Calculator, 
  ShieldAlert, 
  ArrowRight,
  Scale, 
  Percent,
  FileText,
  BadgeDollarSign
} from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";
import FAQComponent from "@/components/FAQComponent";
import TestimonialSlider from "@/components/TestimonialSlider";
import NetworkCountriesGrid from "../../../components/network/NetworkCountriesGrid";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function LandedCostPage() {
  const { t } = useTranslation();

  const faqs = [
    { question: t("products.landedCost.faq.q1"), answer: t("products.landedCost.faq.a1") },
    { question: t("products.landedCost.faq.q2"), answer: t("products.landedCost.faq.a2") },
    { question: t("products.landedCost.faq.q3"), answer: t("products.landedCost.faq.a3") },
    { question: t("products.landedCost.faq.q4"), answer: t("products.landedCost.faq.a4") },
    { question: t("products.landedCost.faq.q5"), answer: t("products.landedCost.faq.a5") },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-green-100 selection:text-gray-900">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative bg-white py-20 md:py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-yellow-50 opacity-60"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tight text-gray-900">
                  {t("products.landedCost.hero.title")}<br />
                  <span className="text-green-800">{t("products.landedCost.hero.titleHighlight")}</span>
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  {t("products.landedCost.hero.subtitle")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button variant="primary" size="lg" href="/tools/duty-calculator" className="shadow-soft-lg transition-all">
                    <span>{t("products.landedCost.hero.ctaPrimary")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="lg" href="/contact">
                    {t("products.landedCost.hero.ctaSecondary")}
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-soft-xl space-y-6 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-50 rounded-full blur-2xl opacity-40"></div>

                  <h3 className="font-display font-black text-lg text-gray-950">{t("products.landedCost.breakdown.title")}</h3>

                  <div className="space-y-4 text-xs font-semibold text-gray-600">
                    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                      <span>{t("products.landedCost.breakdown.commodityCode")}</span>
                      <span className="font-mono text-gray-900">8471.30</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                      <span>{t("products.landedCost.breakdown.customsValue")}</span>
                      <span className="text-gray-900 font-bold">$1,250.00</span>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between text-yellow-700">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                          <span>{t("products.landedCost.breakdown.duty")}</span>
                        </span>
                        <span>$25.00</span>
                      </div>
                      <div className="flex items-center justify-between text-red-700">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-red-500 rounded-full" />
                          <span>{t("products.landedCost.breakdown.importVat")}</span>
                        </span>
                        <span>$245.44</span>
                      </div>
                      <div className="flex items-center justify-between text-green-800">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-green-500 rounded-full" />
                          <span>{t("products.landedCost.breakdown.regionalLevies")}</span>
                        </span>
                        <span>$24.38</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-4 bg-gray-50/50 p-3 rounded-xl">
                      <span className="text-sm font-bold text-gray-900">{t("products.landedCost.breakdown.totalDutiesTaxes")}</span>
                      <span className="text-base font-black text-green-700 font-mono">$294.82</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="bg-green-900 py-20 px-6">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl md:text-4xl font-display font-black text-white">{t("products.landedCost.benefits.title")}</h2>
              <p className="text-green-100 text-sm md:text-base leading-relaxed">
                {t("products.landedCost.benefits.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("products.landedCost.benefits.item1Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("products.landedCost.benefits.item1Desc")}
                </p>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <Percent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("products.landedCost.benefits.item2Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("products.landedCost.benefits.item2Desc")}
                </p>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("products.landedCost.benefits.item3Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("products.landedCost.benefits.item3Desc")}
                </p>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("products.landedCost.benefits.item4Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("products.landedCost.benefits.item4Desc")}
                </p>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("products.landedCost.benefits.item5Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("products.landedCost.benefits.item5Desc")}
                </p>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <BadgeDollarSign className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("products.landedCost.benefits.item6Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("products.landedCost.benefits.item6Desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-2xl md:text-3xl font-display font-black text-gray-900">
                {t("products.landedCost.process.title")}
              </h2>
            </div>

            <div className="space-y-8">
              {[
                { step: "01", title: t("products.landedCost.process.step1Title"), desc: t("products.landedCost.process.step1Desc") },
                { step: "02", title: t("products.landedCost.process.step2Title"), desc: t("products.landedCost.process.step2Desc") },
                { step: "03", title: t("products.landedCost.process.step3Title"), desc: t("products.landedCost.process.step3Desc") }
              ].map((item) => (
                <div key={item.step} className="flex gap-6 border-b border-gray-50 pb-6 last:border-0">
                  <span className="text-3xl font-display font-black text-green-800 tracking-tight shrink-0">{item.step}</span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <TestimonialSlider />
        <NetworkCountriesGrid />
        <FAQComponent
          title={t("products.landedCost.faq.title")}
          subtitle={t("products.landedCost.faq.subtitle")}
          faqs={faqs}
        />
      </main>

      <Footer />
    </div>
  );
}