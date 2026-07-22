"use client";

import React from "react";
import { 
  HeartHandshake, 
  Search, 
  ShieldCheck, 
  ArrowRight,
  Sparkles, 
  UserCheck,
  CheckCircle,
  Coins
} from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";
import PartnerMarquee from "@/components/home/sections/PartnerMarquee";
import FAQComponent from "@/components/FAQComponent";
import TestimonialSlider from "@/components/TestimonialSlider";
import NetworkCountriesGrid from "@/components/network/NetworkCountriesGrid";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function AssistedSourcingPage() {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("solutions.assistedSourcing.faq.q1"),
      answer: t("solutions.assistedSourcing.faq.a1"),
    },
    {
      question: t("solutions.assistedSourcing.faq.q2"),
      answer: t("solutions.assistedSourcing.faq.a2"),
    },
    {
      question: t("solutions.assistedSourcing.faq.q3"),
      answer: t("solutions.assistedSourcing.faq.a3"),
    },
    {
      question: t("solutions.assistedSourcing.faq.q4"),
      answer: t("solutions.assistedSourcing.faq.a4"),
    },
    {
      question: t("solutions.assistedSourcing.faq.q5"),
      answer: t("solutions.assistedSourcing.faq.a5"),
    },
    {
      question: t("solutions.assistedSourcing.faq.q6"),
      answer: t("solutions.assistedSourcing.faq.a6"),
    },
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
                  {t("solutions.assistedSourcing.hero.title")}<br />
                  <span className="text-green-800">{t("solutions.assistedSourcing.hero.titleHighlight")}</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  {t("solutions.assistedSourcing.hero.subtitle")}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button variant="primary" size="lg" href="/contact" className="shadow-soft-lg transition-all">
                    <span>{t("solutions.assistedSourcing.hero.ctaPrimary")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="lg" href="#how-it-works">
                    {t("solutions.assistedSourcing.hero.ctaSecondary")}
                  </Button>
                </div>
              </div>
              
              <div className="relative flex items-center justify-center">
                <div className="relative w-full overflow-hidden rounded-2xl shadow-soft-xl border border-gray-100">
                  <img
                    src="/solutions/image1.webp"
                    alt={t("solutions.secureWarehousing.hero.imageAlt")}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <PartnerMarquee />

{/* Core Values / Features */}
        <section className="bg-green-900 py-20">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl md:text-4xl font-display font-black text-white">{t("solutions.assistedSourcing.features.title")}</h2>
              <p className="text-green-100 text-sm md:text-base leading-relaxed">
                {t("solutions.assistedSourcing.features.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("solutions.assistedSourcing.features.item1Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("solutions.assistedSourcing.features.item1Desc")}
                </p>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <Coins className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("solutions.assistedSourcing.features.item2Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("solutions.assistedSourcing.features.item2Desc")}
                </p>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("solutions.assistedSourcing.features.item3Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("solutions.assistedSourcing.features.item3Desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Flow */}
        <section id="how-it-works" className="bg-white py-20 px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-2xl md:text-3xl font-display font-black text-center text-gray-900">
              {t("solutions.assistedSourcing.process.title")}
            </h2>
            
            <div className="space-y-6">
              {[
                { step: "01", title: t("solutions.assistedSourcing.process.step1Title"), desc: t("solutions.assistedSourcing.process.step1Desc") },
                { step: "02", title: t("solutions.assistedSourcing.process.step2Title"), desc: t("solutions.assistedSourcing.process.step2Desc") },
                { step: "03", title: t("solutions.assistedSourcing.process.step3Title"), desc: t("solutions.assistedSourcing.process.step3Desc") },
                { step: "04", title: t("solutions.assistedSourcing.process.step4Title"), desc: t("solutions.assistedSourcing.process.step4Desc") }
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

        {/* Testimonials Section */}
        <TestimonialSlider />
        <NetworkCountriesGrid />
        

        {/* FAQ Section */}
        <FAQComponent
          title={t("solutions.assistedSourcing.faq.title")}
          subtitle={t("solutions.assistedSourcing.faq.subtitle")}
          faqs={faqs}
        />
      </main>

      <Footer />
    </div>
  );
}

