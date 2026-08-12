"use client";

import {
  Plane,
  ArrowRight,
  Clock,
  CheckCircle2,
  Navigation
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import NetworkCountriesGrid from "@/components/network/NetworkCountriesGrid";
import FAQComponent from "@/components/FAQComponent";
import TestimonialSlider from "@/components/TestimonialSlider";
import { useTranslations } from 'next-intl';


export default function ExpressForwardingPage() {
  const t = useTranslations();

  const faqs = [
    {
      question: t("solutions.expressForwarding.faq.q1"),
      answer: t("solutions.expressForwarding.faq.a1"),
    },
    {
      question: t("solutions.expressForwarding.faq.q2"),
      answer: t("solutions.expressForwarding.faq.a2"),
    },
    {
      question: t("solutions.expressForwarding.faq.q3"),
      answer: t("solutions.expressForwarding.faq.a3"),
    },
    {
      question: t("solutions.expressForwarding.faq.q4"),
      answer: t("solutions.expressForwarding.faq.a4"),
    },
    {
      question: t("solutions.expressForwarding.faq.q5"),
      answer: t("solutions.expressForwarding.faq.a5"),
    },
    {
      question: t("solutions.expressForwarding.faq.q6"),
      answer: t("solutions.expressForwarding.faq.a6"),
    },
  ];

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
                  {t("solutions.expressForwarding.hero.title")}<br />
                  <span className="text-green-800">{t("solutions.expressForwarding.hero.titleHighlight")}</span>
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  {t("solutions.expressForwarding.hero.subtitle")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button variant="primary" size="lg" href="/tools/duty-calculator" className="shadow-soft-lg transition-all">
                    <span>{t("solutions.expressForwarding.hero.ctaPrimary")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="lg" href="/contact">
                    {t("solutions.expressForwarding.hero.ctaSecondary")}
                  </Button>
                </div>
              </div>

              {/* Mobile Image: Displays normally on small screens inside the grid */}
              <div className="block lg:hidden w-full">
                <div className="relative w-full h-[300px] overflow-hidden rounded-2xl shadow-soft-xl border border-gray-100">
                  <img
                    src="/solutions/image4.webp"
                    alt="expresses forwardinmg image"
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
                src="/solutions/image4.webp"
                alt="express forwarding image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Features / Benefits */}
        <section className="bg-green-900 py-20 px-6">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl md:text-4xl font-display font-black text-white">{t("solutions.expressForwarding.features.title")}</h2>
              <p className="text-green-100 text-sm md:text-base leading-relaxed">
                {t("solutions.expressForwarding.features.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <Plane className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("solutions.expressForwarding.features.item1Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("solutions.expressForwarding.features.item1Desc")}
                </p>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("solutions.expressForwarding.features.item2Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("solutions.expressForwarding.features.item2Desc")}
                </p>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center shadow-soft-lg gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                  <Navigation className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("solutions.expressForwarding.features.item3Title")}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t("solutions.expressForwarding.features.item3Desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Route Details */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-2xl md:text-3xl font-display font-black text-center text-gray-900">
              {t("solutions.expressForwarding.channels.title")}
            </h2>

            <div className="overflow-x-auto border border-gray-100 rounded-2xl shadow-soft">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 font-bold text-gray-700">
                    <th className="p-4">{t("solutions.expressForwarding.channels.colOrigin")}</th>
                    <th className="p-4">{t("solutions.expressForwarding.channels.colDest")}</th>
                    <th className="p-4">{t("solutions.expressForwarding.channels.colAir")}</th>
                    <th className="p-4">{t("solutions.expressForwarding.channels.colSea")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-gray-600">
                  {[
                    { origin: "Guangzhou (CN)", dest: "Douala (CM)", air: `3 - 5 ${t("solutions.expressForwarding.channels.unitDays")}`, sea: `30 - 35 ${t("solutions.expressForwarding.channels.unitDays")}` },
                    { origin: "Yiwu (CN)", dest: "Lagos (NG)", air: `4 - 6 ${t("solutions.expressForwarding.channels.unitDays")}`, sea: `28 - 32 ${t("solutions.expressForwarding.channels.unitDays")}` },
                    { origin: "Paris (FR)", dest: "Nairobi (KE)", air: `2 - 4 ${t("solutions.expressForwarding.channels.unitDays")}`, sea: `24 - 28 ${t("solutions.expressForwarding.channels.unitDays")}` },
                    { origin: "Newark (US)", dest: "Douala (CM)", air: `4 - 7 ${t("solutions.expressForwarding.channels.unitDays")}`, sea: `35 - 40 ${t("solutions.expressForwarding.channels.unitDays")}` },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50">
                      <td className="p-4 font-semibold text-gray-900">{row.origin}</td>
                      <td className="p-4 font-semibold text-gray-900">{row.dest}</td>
                      <td className="p-4">{row.air}</td>
                      <td className="p-4">{row.sea}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialSlider />
        <NetworkCountriesGrid />

        {/* FAQ Section */}
        <FAQComponent
          title={t("solutions.expressForwarding.faq.title")}
          subtitle={t("solutions.expressForwarding.faq.subtitle")}
          faqs={faqs}
        />

      </main>

      <Footer />
    </div>
  );
}

