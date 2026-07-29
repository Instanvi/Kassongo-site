"use client";

import React from "react";
import { 
  Globe, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight,
  RefreshCw,
  Zap,
  Package,
  DollarSign
} from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";
import PartnerMarquee from "@/components/home/sections/PartnerMarquee";
import FAQComponent from "@/components/FAQComponent";
import TestimonialSlider from "@/components/TestimonialSlider";
import NetworkCountriesGrid from "../../../components/network/NetworkCountriesGrid";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function CheckoutPage() {
  const { t } = useTranslation();

  const faqs = [
    { question: t("products.checkout.faq.q1"), answer: t("products.checkout.faq.a1") },
    { question: t("products.checkout.faq.q2"), answer: t("products.checkout.faq.a2") },
    { question: t("products.checkout.faq.q3"), answer: t("products.checkout.faq.a3") },
    { question: t("products.checkout.faq.q4"), answer: t("products.checkout.faq.a4") },
    { question: t("products.checkout.faq.q5"), answer: t("products.checkout.faq.a5") },
    { question: t("products.checkout.faq.q6"), answer: t("products.checkout.faq.a6") },
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
                  {t("products.checkout.hero.title")}{" "}
                  <span className="text-green-800">{t("products.checkout.hero.titleHighlight")}</span>
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  {t("products.checkout.hero.subtitle")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button variant="primary" size="lg" href="/tools/duty-calculator" className="shadow-soft-lg transition-all">
                    <span>{t("products.checkout.hero.ctaPrimary")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="lg" href="/contact">
                    {t("products.checkout.hero.ctaSecondary")}
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-green-950 to-green-900 text-white rounded-3xl p-6 md:p-8 shadow-soft-xl border border-green-800/40 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>

                  <div className="space-y-6 relative z-10">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-xs uppercase font-bold text-green-200 tracking-wider">{t("products.checkout.card.title")}</span>
                      <span className="px-2 py-0.5 bg-yellow-400 text-green-950 text-[10px] font-bold uppercase rounded">{t("products.checkout.card.badgeLive")}</span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-white/5 rounded-xl p-3.5 border border-white/5">
                        <div className="flex items-center gap-3">
                          <Package className="w-5 h-5 text-yellow-400" />
                          <div>
                            <p className="text-xs text-green-200 uppercase font-bold">{t("products.checkout.card.shipmentRoute")}</p>
                            <p className="text-sm font-semibold">Guangzhou CN → Douala CM</p>
                          </div>
                        </div>
                        <span className="text-[10px] bg-green-850 px-2 py-1 rounded font-bold">{t("products.checkout.card.statusBadge")}</span>
                      </div>

                      <div className="flex justify-between items-center bg-white/5 rounded-xl p-3.5 border border-white/5">
                        <div className="flex items-center gap-3">
                          <ShieldCheck className="w-5 h-5 text-yellow-400" />
                          <div>
                            <p className="text-xs text-green-200 uppercase font-bold">{t("products.checkout.card.paymentMethod")}</p>
                            <p className="text-sm font-semibold">{t("products.checkout.card.paymentMethodValue")}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-yellow-400">{t("products.checkout.card.xafAvailable")}</span>
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-white/10 pt-4 text-sm text-green-100">
                      <div className="flex justify-between">
                        <span>{t("products.checkout.card.shippingCost")}</span>
                        <span>$85</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("products.checkout.card.importDuties")}</span>
                        <span>+ $18</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("products.checkout.card.handlingPackaging")}</span>
                        <span>+ $7</span>
                      </div>
                      <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/10">
                        <span>{t("products.checkout.card.totalPayable")}</span>
                        <span>FCFA 66,550</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="bg-green-900 py-20 px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight">{t("products.checkout.features.title")}</h2>
              <p className="text-green-100 text-sm md:text-base leading-relaxed">
                {t("products.checkout.features.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("products.checkout.features.item1Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("products.checkout.features.item1Desc")}
                </p>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("products.checkout.features.item2Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("products.checkout.features.item2Desc")}
                </p>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("products.checkout.features.item3Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("products.checkout.features.item3Desc")}
                </p>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("products.checkout.features.item4Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("products.checkout.features.item4Desc")}
                </p>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("products.checkout.features.item5Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("products.checkout.features.item5Desc")}
                </p>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("products.checkout.features.item6Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("products.checkout.features.item6Desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-2xl md:text-3xl font-display font-black text-gray-900">{t("products.checkout.techStack.title")}</h2>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {t("products.checkout.techStack.subtitle")}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold text-gray-700">
              <div className="p-4 border border-gray-100 rounded-2xl shadow-soft">{t("products.checkout.techStack.method1")}</div>
              <div className="p-4 border border-gray-100 rounded-2xl shadow-soft">{t("products.checkout.techStack.method2")}</div>
              <div className="p-4 border border-gray-100 rounded-2xl shadow-soft">{t("products.checkout.techStack.method3")}</div>
              <div className="p-4 border border-gray-100 rounded-2xl shadow-soft">{t("products.checkout.techStack.method4")}</div>
            </div>
          </div>
        </section>

        <TestimonialSlider />
        <NetworkCountriesGrid />

        <FAQComponent
          title={t("products.checkout.faq.title")}
          subtitle={t("products.checkout.faq.subtitle")}
          faqs={faqs}
        />
      </main>

      <Footer />
    </div>
  );
}