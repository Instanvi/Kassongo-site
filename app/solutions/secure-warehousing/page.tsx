"use client";

import React from "react";
import { 
  Warehouse, 
  ShieldCheck, 
  MapPin, 
  ArrowRight,
  Sparkles, 
  Boxes,
  CheckCircle2,
  PackageCheck
} from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";
import TestimonialSlider from "@/components/TestimonialSlider";
import NetworkCountriesGrid from "@/components/network/NetworkCountriesGrid";
import FAQComponent from "@/components/FAQComponent";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function SecureWarehousingPage() {
  const { t } = useTranslation();

  const warehouseFAQs = [
    { question: t("solutions.secureWarehousing.faq.q1"), answer: t("solutions.secureWarehousing.faq.a1") },
    { question: t("solutions.secureWarehousing.faq.q2"), answer: t("solutions.secureWarehousing.faq.a2") },
    { question: t("solutions.secureWarehousing.faq.q3"), answer: t("solutions.secureWarehousing.faq.a3") },
    { question: t("solutions.secureWarehousing.faq.q4"), answer: t("solutions.secureWarehousing.faq.a4") },
    { question: t("solutions.secureWarehousing.faq.q5"), answer: t("solutions.secureWarehousing.faq.a5") },
    { question: t("solutions.secureWarehousing.faq.q6"), answer: t("solutions.secureWarehousing.faq.a6") },
    { question: t("solutions.secureWarehousing.faq.q7"), answer: t("solutions.secureWarehousing.faq.a7") },
    { question: t("solutions.secureWarehousing.faq.q8"), answer: t("solutions.secureWarehousing.faq.a8") },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-green-100 selection:text-gray-900">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
<section className="relative bg-white py-16 md:py-24 lg:py-28 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-yellow-50 opacity-60"></div>
  
  <div className="max-w-7xl mx-auto relative z-10 px-6">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      <div className="space-y-6 lg:col-span-6 z-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tight text-gray-900">
          {t("solutions.secureWarehousing.hero.title")}<br />
          <span className="text-green-800">{t("solutions.secureWarehousing.hero.titleHighlight")}</span>
        </h1>
        
        <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
          {t("solutions.secureWarehousing.hero.subtitle")}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Button variant="primary" size="lg" href="/contact" className="shadow-soft-lg transition-all">
            <span>{t("solutions.secureWarehousing.hero.ctaPrimary")}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="secondary" size="lg" href="#hubs">
            {t("solutions.secureWarehousing.hero.ctaSecondary")}
          </Button>
        </div>
      </div>
      
      <div className="block lg:hidden w-full">
        <div className="relative w-full h-[300px] overflow-hidden rounded-2xl shadow-soft-xl border border-gray-100 opacity-90">
          <img
            src="/solutions/image2.svg"
            alt={t("solutions.secureWarehousing.hero.imageAlt")}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>

  <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
    <div className="relative w-full h-full opacity-90 [clip-path:polygon(15%_0%,100%_0%,100%_100%,0%_100%)]">
      <img
        src="/solutions/image2.svg"
        alt={t("solutions.secureWarehousing.hero.imageAlt")}
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</section>

        {/* Features / Benefits */}
        <section className="bg-green-900 py-20 px-6">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl md:text-4xl font-display font-black text-white">{t("solutions.secureWarehousing.features.title")}</h2>
              <p className="text-green-100 text-sm md:text-base leading-relaxed">
                {t("solutions.secureWarehousing.features.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("solutions.secureWarehousing.features.item1Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("solutions.secureWarehousing.features.item1Desc")}
                </p>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <Boxes className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("solutions.secureWarehousing.features.item2Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("solutions.secureWarehousing.features.item2Desc")}
                </p>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <PackageCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("solutions.secureWarehousing.features.item3Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("solutions.secureWarehousing.features.item3Desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hub Locations */}
        <section id="hubs" className="bg-white py-20 px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-2xl md:text-3xl font-display font-black text-center text-gray-900">
              {t("solutions.secureWarehousing.hubs.title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { city: "Guangzhou, China", type: t("solutions.secureWarehousing.hubs.hub1Type"), space: "12,000 sq ft", security: t("solutions.secureWarehousing.hubs.hub1Security") },
                { city: "Paris, France", type: t("solutions.secureWarehousing.hubs.hub2Type"), space: "8,500 sq ft", security: t("solutions.secureWarehousing.hubs.hub2Security") },
                { city: "Douala, Cameroon", type: t("solutions.secureWarehousing.hubs.hub3Type"), space: "15,000 sq ft", security: t("solutions.secureWarehousing.hubs.hub3Security") },
                { city: "Lagos, Nigeria", type: t("solutions.secureWarehousing.hubs.hub4Type"), space: "20,000 sq ft", security: t("solutions.secureWarehousing.hubs.hub4Security") }
              ].map((hub, idx) => (
                <div key={idx} className="border border-gray-100 rounded-2xl p-6 shadow-soft space-y-3 hover:shadow-soft-lg transition-shadow">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900 text-lg">{hub.city}</span>
                    <MapPin className="w-5 h-5 text-green-700" />
                  </div>
                  <div className="space-y-1.5 text-xs text-gray-500 font-semibold">
                    <p>{t("solutions.secureWarehousing.hubs.labelType")}: <span className="text-gray-900">{hub.type}</span></p>
                    <p>{t("solutions.secureWarehousing.hubs.labelCapacity")}: <span className="text-gray-900">{hub.space}</span></p>
                    <p>{t("solutions.secureWarehousing.hubs.labelSecurity")}: <span className="text-gray-900">{hub.security}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <TestimonialSlider />
        <NetworkCountriesGrid />

        <FAQComponent
          title={t("solutions.secureWarehousing.faq.title")}
          subtitle={t("solutions.secureWarehousing.faq.subtitle")}
          faqs={warehouseFAQs}
          className="border-t border-gray-100"
        />
      </main>

      <Footer />
    </div>
  );
}