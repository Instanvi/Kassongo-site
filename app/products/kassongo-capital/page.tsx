"use client";

import React, { useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";
import FAQComponent from "@/components/FAQComponent";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { 
  Sparkles, 
  Shield, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Globe, 
  Clock, 
  DollarSign, 
  Percent, 
  Scale, 
  HelpCircle,
  ShieldCheck,
  Check,
  Zap,
  Layers,
  ArrowUpRight
} from "lucide-react";

export default function KassongoCapitalPage() {
  const { t } = useTranslation();

  // Calculator State
  const [tradeValue, setTradeValue] = useState<number>(50000);
  const [term, setTerm] = useState<number>(90);
  const [shariahMode, setShariahMode] = useState<"murabaha" | "qard">("murabaha");

  // Murabaha Markup Rates: 30d: 1.25%, 60d: 2.5%, 90d: 3.75%, 120d: 5.0%
  const getMarkupRate = (days: number) => {
    switch (days) {
      case 30: return 1.25;
      case 60: return 2.50;
      case 90: return 3.75;
      case 120: return 5.00;
      default: return 3.75;
    }
  };

  const markupPercent = shariahMode === "murabaha" ? getMarkupRate(term) : 0;
  const adminFee = shariahMode === "qard" ? 150 : 0;
  const markupAmount = shariahMode === "murabaha" ? (tradeValue * markupPercent) / 100 : 0;
  const totalPayable = tradeValue + markupAmount + adminFee;
  const weeklyInstallment = totalPayable / (term / 7);

  const principles = [
    {
      icon: <Shield className="w-6 h-6 text-yellow-400" />,
      title: t("products.kassongoCapital.principles.ribaTitle"),
      desc: t("products.kassongoCapital.principles.ribaDesc")
    },
    {
      icon: <Layers className="w-6 h-6 text-yellow-400" />,
      title: t("products.kassongoCapital.principles.assetTitle"),
      desc: t("products.kassongoCapital.principles.assetDesc")
    },
    {
      icon: <Users className="w-6 h-6 text-yellow-400" />,
      title: t("products.kassongoCapital.principles.riskTitle"),
      desc: t("products.kassongoCapital.principles.riskDesc")
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-yellow-400" />,
      title: t("products.kassongoCapital.principles.halalTitle"),
      desc: t("products.kassongoCapital.principles.halalDesc")
    }
  ];

  const products = [
    {
      name: t("products.kassongoCapital.products.inventoryName"),
      type: t("products.kassongoCapital.products.inventoryType"),
      desc: t("products.kassongoCapital.products.inventoryDesc"),
      terms: t("products.kassongoCapital.products.inventoryTerms"),
      features: [
        t("products.kassongoCapital.products.inventoryF1"),
        t("products.kassongoCapital.products.inventoryF2"),
        t("products.kassongoCapital.products.inventoryF3")
      ],
      icon: <Globe className="w-5 h-5 text-teal-600" />,
      borderColor: "border-t-4 border-green-800",
      pillBg: "bg-green-100 text-green-800"
    },
    {
      name: t("products.kassongoCapital.products.logisticsName"),
      type: t("products.kassongoCapital.products.logisticsType"),
      desc: t("products.kassongoCapital.products.logisticsDesc"),
      terms: t("products.kassongoCapital.products.logisticsTerms"),
      features: [
        t("products.kassongoCapital.products.logisticsF1"),
        t("products.kassongoCapital.products.logisticsF2"),
        t("products.kassongoCapital.products.logisticsF3")
      ],
      icon: <Zap className="w-5 h-5 text-amber-600" />,
      borderColor: "border-t-4 border-amber-500",
      pillBg: "bg-amber-100 text-amber-800"
    },
    {
      name: t("products.kassongoCapital.products.leaseName"),
      type: t("products.kassongoCapital.products.leaseType"),
      desc: t("products.kassongoCapital.products.leaseDesc"),
      terms: t("products.kassongoCapital.products.leaseTerms"),
      features: [
        t("products.kassongoCapital.products.leaseF1"),
        t("products.kassongoCapital.products.leaseF2"),
        t("products.kassongoCapital.products.leaseF3")
      ],
      icon: <Scale className="w-5 h-5 text-blue-600" />,
      borderColor: "border-t-4 border-blue-600",
      pillBg: "bg-blue-100 text-blue-800"
    }
  ];

  const steps = [
    {
      number: "1",
      title: t("products.kassongoCapital.howItWorks.step1Title"),
      desc: t("products.kassongoCapital.howItWorks.step1Desc"),
      icon: Globe
    },
    {
      number: "2",
      title: t("products.kassongoCapital.howItWorks.step2Title"),
      desc: t("products.kassongoCapital.howItWorks.step2Desc"),
      icon: Scale
    },
    {
      number: "3",
      title: t("products.kassongoCapital.howItWorks.step3Title"),
      desc: t("products.kassongoCapital.howItWorks.step3Desc"),
      icon: DollarSign
    },
    {
      number: "4",
      title: t("products.kassongoCapital.howItWorks.step4Title"),
      desc: t("products.kassongoCapital.howItWorks.step4Desc"),
      icon: TrendingUp
    }
  ];

  const faqsList = [
    { question: t("products.kassongoCapital.faq.q1"), answer: t("products.kassongoCapital.faq.a1") },
    { question: t("products.kassongoCapital.faq.q2"), answer: t("products.kassongoCapital.faq.a2") },
    { question: t("products.kassongoCapital.faq.q3"), answer: t("products.kassongoCapital.faq.a3") },
    { question: t("products.kassongoCapital.faq.q4"), answer: t("products.kassongoCapital.faq.a4") },
    { question: t("products.kassongoCapital.faq.q5"), answer: t("products.kassongoCapital.faq.a5") },
    { question: t("products.kassongoCapital.faq.q6"), answer: t("products.kassongoCapital.faq.a6") }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-green-100 selection:text-gray-900">
      <Header />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative bg-white py-16 md:py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-yellow-50 opacity-60"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Heading and Value Prop */}
              <div className="space-y-6 lg:col-span-6">
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tight text-gray-900">
                  {t("products.kassongoCapital.hero.title")}<br />
                  <span className="text-green-800">{t("products.kassongoCapital.hero.titleHighlight")}</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  {t("products.kassongoCapital.hero.subtitle")}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button variant="primary" size="lg" href="/products/kassongo-capital/apply" className="shadow-soft-lg transition-all">
                    <span>Apply for Capital</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="lg" href="#principles">
                    {t("products.kassongoCapital.hero.ctaSecondary")}
                  </Button>
                </div>
                
                {/* Visual badges */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <ShieldCheck className="w-4.5 h-4.5 text-green-700" />
                    <span>{t("products.kassongoCapital.hero.badgeShariah")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <Percent className="w-4.5 h-4.5 text-green-700" />
                    <span>{t("products.kassongoCapital.hero.badgeInterest")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <Scale className="w-4.5 h-4.5 text-green-700" />
                    <span>{t("products.kassongoCapital.hero.badgeAaoifi")}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Calculator Card */}
              <div className="lg:col-span-6 w-full max-w-lg mx-auto">
                <div className="bg-gradient-to-br from-green-950 to-green-900 text-white rounded-3xl p-6 md:p-8 shadow-soft-xl border border-green-800/40 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-xs uppercase font-bold text-green-200 tracking-wider">
                        {t("products.kassongoCapital.calculator.title")}
                      </span>
                      <span className="px-2 py-0.5 bg-yellow-400 text-green-950 text-[10px] font-bold uppercase rounded">
                        {t("products.kassongoCapital.calculator.badge")}
                      </span>
                    </div>

                    {/* Mode Toggle */}
                    <div className="grid grid-cols-2 gap-2 bg-green-950/50 p-1.5 rounded-xl border border-white/5">
                      <button
                        onClick={() => { setShariahMode("murabaha"); setTradeValue(50000); }}
                        className={`py-2 px-3 text-xs font-bold rounded-lg transition-all ${shariahMode === "murabaha" ? "bg-white text-green-950 shadow" : "text-green-200 hover:text-white"}`}
                      >
                        {t("products.kassongoCapital.calculator.modeInventory")}
                      </button>
                      <button
                        onClick={() => { setShariahMode("qard"); setTradeValue(15000); }}
                        className={`py-2 px-3 text-xs font-bold rounded-lg transition-all ${shariahMode === "qard" ? "bg-white text-green-950 shadow" : "text-green-200 hover:text-white"}`}
                      >
                        {t("products.kassongoCapital.calculator.modeLogistics")}
                      </button>
                    </div>

                    {/* Slider for Trade Value */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-semibold">
                        <span className="text-green-200">
                          {shariahMode === "murabaha" 
                            ? t("products.kassongoCapital.calculator.labelValueInventory") 
                            : t("products.kassongoCapital.calculator.labelValueLogistics")}
                        </span>
                        <span className="text-white font-bold text-lg">
                          ${tradeValue.toLocaleString()}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={shariahMode === "murabaha" ? 10000 : 2000}
                        max={shariahMode === "murabaha" ? 500000 : 50000}
                        step={shariahMode === "murabaha" ? 5000 : 1000}
                        value={tradeValue}
                        onChange={(e) => setTradeValue(Number(e.target.value))}
                        className="w-full h-1.5 bg-green-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                      />
                      <div className="flex justify-between text-[10px] text-green-300">
                        <span>{shariahMode === "murabaha" ? "$10K" : "$2K"}</span>
                        <span>{shariahMode === "murabaha" ? "$500K" : "$50K"}</span>
                      </div>
                    </div>

                    {/* Term Selector */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-green-200 block">
                        {t("products.kassongoCapital.calculator.labelTerm")}
                      </span>
                      <div className="grid grid-cols-4 gap-2">
                        {[30, 60, 90, 120].map((days) => (
                          <button
                            key={days}
                            onClick={() => setTerm(days)}
                            className={`py-2 rounded-xl text-xs font-bold border transition-all ${term === days ? "bg-yellow-400 border-yellow-400 text-green-950" : "bg-white/5 border-white/10 text-white hover:bg-white/10"}`}
                          >
                            {days} Days
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-2 border-t border-white/10 pt-4 text-sm text-green-100">
                      <div className="flex justify-between">
                        <span>{t("products.kassongoCapital.calculator.labelAmount")}</span>
                        <span className="font-semibold text-white">${tradeValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("products.kassongoCapital.calculator.labelInterest")}</span>
                        <span className="font-semibold text-yellow-400">0.00%</span>
                      </div>
                      {shariahMode === "murabaha" ? (
                        <div className="flex justify-between">
                          <span>{t("products.kassongoCapital.calculator.labelMarkup")} ({markupPercent}%)</span>
                          <span className="font-semibold text-white">+ ${markupAmount.toLocaleString()}</span>
                        </div>
                      ) : (
                        <div className="flex justify-between">
                          <span>{t("products.kassongoCapital.calculator.labelFee")}</span>
                          <span className="font-semibold text-white">+ ${adminFee.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-white font-bold text-base pt-2 border-t border-white/10">
                        <span>{t("products.kassongoCapital.calculator.labelTotal")}</span>
                        <span>${totalPayable.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-green-300">
                        <span>{t("products.kassongoCapital.calculator.labelRepayment")}</span>
                        <span>${weeklyInstallment.toLocaleString(undefined, {maximumFractionDigits:2})} / week</span>
                      </div>
                    </div>

                    <Button variant="secondary" href="/contact" className="w-full text-center py-3 bg-yellow-400 text-green-950 font-bold hover:bg-yellow-300 transition-colors">
                      Apply for Capital
                    </Button>

                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-green-300/80">
                      <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                      <span>{t("products.kassongoCapital.calculator.footerText")}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Shariah Principles Section */}
        <section id="principles" className="bg-green-900 py-20 px-6 border-t border-green-800">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl md:text-4xl font-display font-black text-white">
                {t("products.kassongoCapital.principles.title")}
              </h2>
              <p className="text-green-100 text-md leading-relaxed">
                {t("products.kassongoCapital.principles.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {principles.map((principle, index) => (
                <div
                  key={index}
                  className="bg-green-950 rounded-3xl p-6 border border-white/10 shadow-soft-lg hover:border-white/20 transition-all text-center flex flex-col items-center gap-4"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shadow-soft">
                    {principle.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {principle.title}
                  </h3>
                  <p className="text-md text-gray-300 leading-relaxed">
                    {principle.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Split Layout: Sourcing & Logistics Image and Copy */}
        <section className="bg-white py-20 px-6 border-b border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Image Section */}
              <div className="lg:col-span-6">
                <div className="relative overflow-hidden rounded-3xl shadow-soft-xl border border-gray-150 aspect-[4/3] bg-gray-50">
                  <img
                    src="/shipment.jpg"
                    alt="Kassongo Capital Shariah Trade Financing"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* Copy Section */}
              <div className="lg:col-span-6 space-y-6">
                <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 leading-tight">
                  {t("products.kassongoCapital.split.title")}<br />
                  <span className="text-green-800">{t("products.kassongoCapital.split.titleHighlight")}</span>
                </h2>
                
                <p className="text-gray-600 leading-relaxed text-md">
                  {t("products.kassongoCapital.split.desc")}
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-800 shrink-0 mt-1">
                      <Check className="w-3.5 h-3.5 font-bold" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-md">
                        {t("products.kassongoCapital.split.feat1Title")}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {t("products.kassongoCapital.split.feat1Desc")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-800 shrink-0 mt-1">
                      <Check className="w-3.5 h-3.5 font-bold" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-md">
                        {t("products.kassongoCapital.split.feat2Title")}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {t("products.kassongoCapital.split.feat2Desc")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-800 shrink-0 mt-1">
                      <Check className="w-3.5 h-3.5 font-bold" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-md">
                        {t("products.kassongoCapital.split.feat3Title")}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {t("products.kassongoCapital.split.feat3Desc")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Products Grid Section */}
        <section className="bg-gray-50 py-20 px-6 border-b border-gray-100">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900">
                {t("products.kassongoCapital.products.title")}
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                {t("products.kassongoCapital.products.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-3xl p-8 border border-gray-150/70 shadow-soft hover:shadow-soft-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${product.borderColor}`}
                >
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-green-150/20">
                        {product.icon}
                      </div>
                      <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${product.pillBg}`}>
                        {product.type}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-gray-900 leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed min-h-[96px]">
                        {product.desc}
                      </p>
                    </div>
                    
                    <div className="space-y-3 pt-6 border-t border-gray-100">
                      <span className="text-sm font-bold uppercase tracking-wider text-green-800 block">
                        Key Features
                      </span>
                      <div className="space-y-2">
                        {product.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-sm text-gray-600 leading-normal">
                            <div className="w-4 h-4 bg-green-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 text-green-800" />
                            </div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400 font-medium">Repayment Terms:</span>
                      <span className="font-bold text-gray-700">{product.terms}</span>
                    </div>
                    <Button variant="outline" href="/products/kassongo-capital/apply" className="w-full text-sm py-3 text-center flex items-center justify-center gap-2 border-gray-200 hover:border-green-800 hover:bg-green-800 hover:text-white transition-all duration-300 rounded-xl shadow-soft">
                      <span>Request Pre-Approval</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white py-20 px-6 border-b border-gray-100">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900">
                {t("products.kassongoCapital.howItWorks.title")}
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                {t("products.kassongoCapital.howItWorks.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 flex items-center justify-center">
                <div className="relative group">
                  {/* Decorative glowing gradient blur backgrounds */}
                  <div className="absolute -inset-6 bg-gradient-to-tr from-green-700 via-teal-500 to-yellow-400 rounded-full blur-xl opacity-20 group-hover:opacity-35 transition-all duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-bl from-green-900/10 to-teal-900/10 rounded-full animate-pulse duration-[4000ms]"></div>
                  
                  {/* Circular double ring frame */}
                  <div className="w-80 h-80 md:w-[400px] md:h-[400px] rounded-full p-2.5 bg-gradient-to-tr from-green-800 via-emerald-600 to-yellow-400 shadow-soft-2xl relative z-10 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-white p-1 overflow-hidden flex items-center justify-center">
                      <img
                        src="/mulsimwoman.jpg"
                        alt="Kassongo Capital Trade Agreement"
                        className="w-full h-full object-cover rounded-full transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Absolute Badge Overlays */}
                  <div className="absolute -top-3 -right-3 bg-yellow-400 text-green-950 p-3.5 rounded-full shadow-soft-lg z-20 flex items-center justify-center hover:scale-110 transition duration-300">
                    <ShieldCheck className="w-6 h-6 text-green-900" />
                  </div>
                  

                  {/* Subtle decorative dot grid inside circle context */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-dashed border-green-500/20 rounded-full pointer-events-none z-10"></div>
                </div>
              </div>

              {/* Right: Connecting Timeline steps */}
              <div className="lg:col-span-6 space-y-8">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  return (
                    <div key={step.number}>
                      <div className="flex items-start gap-5 group">
                        <div className="flex-shrink-0 w-14 h-14 bg-green-900 rounded-2xl flex items-center justify-center shadow-soft group-hover:shadow-soft-lg transition-all">
                          <StepIcon className="w-6 h-6 text-yellow-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1.5">
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-green-150 text-green-800 rounded-full text-xs font-bold">
                              {step.number}
                            </span>
                            <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                          </div>
                          <p className="text-md text-gray-500 leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="ml-7 border-l-2 border-dashed border-gray-200 h-8 mt-1.5"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Shariah Cert panel */}
        <section className="bg-gray-50 py-16 px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 border border-gray-200 shadow-soft-lg flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center shrink-0 text-green-800">
              <ShieldCheck className="w-12 h-12" />
            </div>
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-green-850 bg-green-50 px-2.5 py-1 rounded">
                {t("products.kassongoCapital.compliance.badge")}
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                {t("products.kassongoCapital.compliance.title")}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed text-justify">
                {t("products.kassongoCapital.compliance.desc")}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQComponent
          title={t("products.kassongoCapital.faq.title")}
          subtitle={t("products.kassongoCapital.faq.subtitle")}
          faqs={faqsList}
          className="border-t border-gray-100"
        />
      </main>
      
      <Footer />
    </div>
  );
}
