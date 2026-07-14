"use client";

import { useState } from "react";
import {
  Shield,
  Scale,
  Package as PackageIcon,
  Zap,
  Flame,
  CheckCircle,
  Globe,
  MapPin,
  ShoppingCart,
  Truck,
  Send,
  Inbox,
  Warehouse,
  Bus,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useTranslation } from "../lib/i18n/LanguageContext";

export default function Home() {
  const [activeThumb, setActiveThumb] = useState(0);
  const [selectedHub, setSelectedHub] = useState<"us" | "uk" | "china">("us");
  const { t } = useTranslation();

  const hubDetails = {
    us: {
      name: t("home.mailbox.us.name"),
      price: "$4.50",
      originalPrice: "$8.99",
      features: [
        t("home.mailbox.us.feat1"),
        t("home.mailbox.us.feat2"),
        t("home.mailbox.us.feat3"),
      ],
    },
    uk: {
      name: t("home.mailbox.uk.name"),
      price: "$5.20",
      originalPrice: "$9.99",
      features: [
        t("home.mailbox.uk.feat1"),
        t("home.mailbox.uk.feat2"),
        t("home.mailbox.uk.feat3"),
      ],
    },
    china: {
      name: t("home.mailbox.china.name"),
      price: "$3.80",
      originalPrice: "$7.50",
      features: [
        t("home.mailbox.china.feat1"),
        t("home.mailbox.china.feat2"),
        t("home.mailbox.china.feat3"),
      ],
    },
  };

  const thumbs = [
    { src: "/screenshot-1.jpg", title: t("home.howItWorks.thumbs.cHub") },
    { src: "/screenshot-4.png", title: t("home.howItWorks.thumbs.sDepot") },
    { src: "/screenshot-2.jpg", title: t("home.howItWorks.thumbs.gTransit") },
    { src: "/screenshot-3.jpg", title: t("home.howItWorks.thumbs.sMap") },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-green-100 selection:text-gray-900">
      {/* Site Header */}
      <Header />

      {/* Main Container */}
      <main
        role="main"
        className="max-w-screen overflow-x-clip pt-16"
        id="main"
      >
        {/* 1. Hero Section - Rebranded */}
        <section className="relative bg-white py-12 px-6 md:py-16 lg:py-20 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-yellow-50 opacity-60"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-900/5 to-transparent"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column - Content */}
              <div className="space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-green-900 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-soft">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span>{t("home.hero.badge")}</span>
                </div>

                {/* Main Headline */}
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black leading-[0.95] tracking-tight text-gray-900">
                    {t("home.hero.title1")}
                    <br />
                    <span className="text-green-800">
                      {t("home.hero.title2")}
                    </span>
                    <br />
                    <span className="text-yellow-400">
                      {t("home.hero.title3")}
                    </span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                    {t("home.hero.subtitle")}
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    href="#get-address"
                    className="shadow-soft-lg hover:shadow-soft-xl transition-all"
                  >
                    <PackageIcon className="w-5 h-5" />
                    {t("home.hero.btnAddress")}
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    href="/contact"
                    className="shadow-soft hover:shadow-soft-md transition-all"
                  >
                    <Send className="w-5 h-5" />
                    {t("home.hero.btnContact")}
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-700">
                      {t("home.hero.indicators.insured")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-700">
                      {t("home.hero.indicators.tracking")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-700">
                      {t("home.hero.indicators.storage")}
                    </span>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                  <div>
                    <div className="text-3xl md:text-4xl font-display font-black text-green-800 mb-1">
                      60+
                    </div>
                    <div className="text-xs font-bold uppercase text-gray-500 tracking-wide">
                      {t("home.hero.stats.hubs")}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-display font-black text-green-800 mb-1">
                      21+
                    </div>
                    <div className="text-xs font-bold uppercase text-gray-500 tracking-wide">
                      {t("home.hero.stats.carriers")}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-display font-black text-green-800 mb-1">
                      1M+
                    </div>
                    <div className="text-xs font-bold uppercase text-gray-500 tracking-wide">
                      {t("home.hero.stats.members")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Visual */}
              <div className="relative">
                {/* Main Video Card with Blend Effect */}
                <div className="relative overflow-hidden">
                  {/* Gradient overlay for edge blur */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-50/10 via-transparent to-white/10 pointer-events-none z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-green-50/10 pointer-events-none z-10"></div>

                  <video
                    src="/globepackage.webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-auto object-cover opacity-85 blur-[1px] scale-105"
                    style={{
                      maskImage:
                        "radial-gradient(ellipse 80% 80% at center, black 40%, transparent 100%)",
                      WebkitMaskImage:
                        "radial-gradient(ellipse 80% 80% at center, black 40%, transparent 100%)",
                    }}
                    aria-label="Kassongo Freight Platform Animation"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. How It Works - Visual Process Section */}
        <section id="how-it-works" className="py-20 px-6 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-16 text-center text-gray-900">
              {t("home.howItWorks.title")}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Cheetah World Graphic */}
              <div className="relative flex items-center justify-center">
                <div className="w-full max-w-md aspect-square relative">
                  {/* Cheetah World Image */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <img
                      src="/CheetahWorld.webp"
                      alt={t("home.howItWorks.networkAlt")}
                      className="w-auto h-700 object-contain opacity-80"
                    />
                  </div>
                </div>
              </div>

              {/* Right: 3-Step Process */}
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-green-900 rounded-2xl flex items-center justify-center shadow-soft group-hover:shadow-soft-lg transition-all">
                    <MapPin className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-green-900 text-white rounded-full text-sm font-bold">
                        1
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">
                        {t("home.howItWorks.step1.title")}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t("home.howItWorks.step1.desc")}
                    </p>
                  </div>
                </div>

                {/* Connecting dotted line */}
                <div className="ml-8 border-l-2 border-dashed border-gray-300 h-8"></div>

                {/* Step 2 */}
                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-green-900 rounded-2xl flex items-center justify-center shadow-soft group-hover:shadow-soft-lg transition-all">
                    <ShoppingCart className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-green-900 text-white rounded-full text-sm font-bold">
                        2
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">
                        {t("home.howItWorks.step2.title")}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t("home.howItWorks.step2.desc")}
                    </p>
                  </div>
                </div>

                {/* Connecting dotted line */}
                <div className="ml-8 border-l-2 border-dashed border-gray-300 h-8"></div>

                {/* Step 3 */}
                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-green-900 rounded-2xl flex items-center justify-center shadow-soft group-hover:shadow-soft-lg transition-all">
                    <Truck className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-green-900 text-white rounded-full text-sm font-bold">
                        3
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">
                        {t("home.howItWorks.step3.title")}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t("home.howItWorks.step3.desc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Send/Receive/Storage Services Section */}
        <section className="py-20 px-6 md:px-12 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-16 text-center text-gray-900">
              {t("home.solutions.title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Send Card */}
              <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all border border-gray-200">
                <div className="w-16 h-16 bg-green-900 rounded-2xl flex items-center justify-center mb-6 shadow-soft">
                  <Send className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {t("home.solutions.send.title")}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {t("home.solutions.send.desc")}
                </p>
                <ul className="space-y-2 text-xs text-gray-500">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{t("home.solutions.send.f1")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{t("home.solutions.send.f2")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{t("home.solutions.send.f3")}</span>
                  </li>
                </ul>
              </div>

              {/* Receive Card */}
              <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all border border-gray-200">
                <div className="w-16 h-16 bg-green-900 rounded-2xl flex items-center justify-center mb-6 shadow-soft">
                  <Inbox className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {t("home.solutions.receive.title")}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {t("home.solutions.receive.desc")}
                </p>
                <ul className="space-y-2 text-xs text-gray-500">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{t("home.solutions.receive.f1")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{t("home.solutions.receive.f2")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{t("home.solutions.receive.f3")}</span>
                  </li>
                </ul>
              </div>

              {/* Storage Card */}
              <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all border border-gray-200">
                <div className="w-16 h-16 bg-green-900 rounded-2xl flex items-center justify-center mb-6 shadow-soft">
                  <Warehouse className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {t("home.solutions.storage.title")}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {t("home.solutions.storage.desc")}
                </p>
                <ul className="space-y-2 text-xs text-gray-500">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{t("home.solutions.storage.f1")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{t("home.solutions.storage.f2")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{t("home.solutions.storage.f3")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Bus Station Convenience Section */}
        <section className="py-16 px-6 md:px-12 bg-gradient-to-br from-green-50 to-yellow-50">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-soft-xl p-8 md:p-12 border border-gray-200">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-900 to-green-700 rounded-3xl flex items-center justify-center shadow-soft-lg">
                    <Bus className="w-12 h-12 text-yellow-400" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
                    {t("home.bus.title")}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {t("home.bus.desc")}
                  </p>
                </div>

                {/* Badge */}
                <div className="flex-shrink-0">
                  <div className="bg-green-900 text-white px-6 py-4 rounded-2xl shadow-soft text-center">
                    <div className="text-3xl font-black mb-1">60+</div>
                    <div className="text-xs font-bold uppercase tracking-wide">
                      {t("home.bus.locations")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Partner Logo Marquee */}
        <section className="bg-white py-6 border-y border-gray-100 overflow-hidden">
          <p className="text-center text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-5">
            {t("home.partners.headline")}
          </p>
          <div className="animate-marquee">
            <div className="flex items-center gap-16 px-8">
              {[...Array(3)].map((_, si) => (
                <div key={si} className="flex items-center gap-16">
                  {/* Amazon */}
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <img
                      src="/Amazon_logo.svg.webp"
                      alt="Amazon"
                      style={{ height: "30px", width: "auto" }}
                      className="object-contain"
                    />
                  </div>
                  {/* Alibaba */}
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <img
                      src="/brandbird-alibaba-logotype.svg"
                      alt="Alibaba"
                      style={{ height: "28px", width: "auto" }}
                      className="object-contain"
                    />
                  </div>
                  {/* eBay */}
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <img
                      src="/EBay_logo.svg"
                      alt="eBay"
                      style={{ height: "30px", width: "auto" }}
                      className="object-contain"
                    />
                  </div>
                  {/* AliExpress */}
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <img
                      src="/aliexpress-logo-5a8f.webp"
                      alt="AliExpress"
                      style={{ height: "100px", width: "auto" }}
                      className="object-contain"
                    />
                  </div>
                  {/* SHEIN */}
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <img
                      src="/shein-1.svg"
                      alt="SHEIN"
                      style={{ height: "24px", width: "auto" }}
                      className="object-contain"
                    />
                  </div>
                  {/* Walmart */}
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <img
                      src="/Walmart_logo_(2008).svg.webp"
                      alt="Walmart"
                      style={{ height: "30px", width: "auto" }}
                      className="object-contain"
                    />
                  </div>
                  {/* 1688 */}
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <img
                      src="/1688.webp"
                      alt="1688"
                      style={{ height: "32px", width: "auto" }}
                      className="object-contain"
                    />
                  </div>
                  {/* Taobao */}
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <img
                      src="/taobao-new-flat-design.svg"
                      alt="Taobao"
                      style={{ height: "32px", width: "auto" }}
                      className="object-contain"
                    />
                  </div>
                  {/* Jumia */}
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <img
                      src="/Jumia-Logo-2012.webp"
                      alt="Jumia"
                      style={{ height: "50px", width: "auto" }}
                      className="object-contain"
                    />
                  </div>
                  {/* Swappa */}
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <img
                      src="/Logo_swappa_footer.svg.webp"
                      alt="Swappa"
                      style={{ height: "50px", width: "auto" }}
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Find Your Service Cards Section */}
        <section id="services" className="py-24 px-6 md:px-12 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-16 text-center text-gray-900">
              {t("home.services.title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Card 1 */}
              <div className="rounded-3xl h-[500px] shadow-card hover:shadow-card transition-smooth relative group overflow-hidden flex flex-col">
                <div className="bg-gradient-to-b from-[#24963f] to-[#0c4e25] rounded-t-3xl p-6 pb-4 text-white flex flex-col items-center text-center" style={{ height: '50%' }}>
                  <h3 className="text-2xl font-display font-black text-white mb-1.5 tracking-tight">
                    {t("home.services.c1.title")}
                  </h3>
                  <div className="flex-1 flex items-end justify-center w-full">
                    <img
                      src="/consolidation.svg"
                      alt="Consolidation"
                      className="w-full h-32 object-contain drop-shadow-xl transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                </div>
                <div className="bg-white rounded-b-3xl p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#24963f] mb-3 uppercase tracking-wider">
                      {t("home.services.c1.badge")}
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      {t("home.services.c1.desc")}
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" href="#get-address" className="w-full shadow-soft hover:shadow-soft-md mt-4">
                    {t("common.getStartedButton")}
                  </Button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="rounded-3xl h-[500px] shadow-card hover:shadow-card transition-smooth relative group overflow-hidden flex flex-col">
                <div className="bg-gradient-to-b from-[#24963f] to-[#0c4e25] rounded-t-3xl p-6 pb-4 text-white flex flex-col items-center text-center" style={{ height: '50%' }}>
                  <h3 className="text-2xl font-display font-black text-white mb-1.5 tracking-tight">
                    {t("home.services.c2.title")}
                  </h3>
                  <div className="flex-1 flex items-end justify-center w-full">
                    <img
                      src="/secure_storage.svg"
                      alt="Secure Storage"
                      className="w-full h-32 object-contain drop-shadow-xl transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                </div>
                <div className="bg-white rounded-b-3xl p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#24963f] mb-3 uppercase tracking-wider">
                      {t("home.services.c2.badge")}
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      {t("home.services.c2.desc")}
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" href="#get-address" className="w-full shadow-soft hover:shadow-soft-md mt-4">
                    {t("common.getStartedButton")}
                  </Button>
                </div>
              </div>

              {/* Card 3 */}
              <div className="rounded-3xl h-[500px] shadow-card hover:shadow-card transition-smooth relative group overflow-hidden flex flex-col">
                <div className="bg-gradient-to-b from-[#24963f] to-[#0c4e25] rounded-t-3xl p-6 pb-4 text-white flex flex-col items-center text-center" style={{ height: '50%' }}>
                  <h3 className="text-2xl font-display font-black text-white mb-1.5 tracking-tight">
                    {t("home.services.c3.title")}
                  </h3>
                  <div className="flex-1 flex items-end justify-center w-full">
                    <img
                      src="/assisted_sourcing.svg"
                      alt="Assisted Sourcing"
                      className="w-full h-32 object-contain drop-shadow-xl transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                </div>
                <div className="bg-white rounded-b-3xl p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#24963f] mb-3 uppercase tracking-wider">
                      {t("home.services.c3.badge")}
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      {t("home.services.c3.desc")}
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" href="#get-address" className="w-full shadow-soft hover:shadow-soft-md mt-4">
                    {t("common.getStartedButton")}
                  </Button>
                </div>
              </div>

              {/* Card 4 */}
              <div className="rounded-3xl h-[500px] shadow-card hover:shadow-card transition-smooth relative group overflow-hidden flex flex-col">
                <div className="bg-gradient-to-b from-[#24963f] to-[#0c4e25] rounded-t-3xl p-6 pb-4 text-white flex flex-col items-center text-center" style={{ height: '50%' }}>
                  <h3 className="text-2xl font-display font-black text-white mb-1.5 tracking-tight">
                    {t("home.services.c4.title")}
                  </h3>
                  <div className="flex-1 flex items-end justify-center w-full">
                    <img
                      src="/express_forwarding.svg"
                      alt="Express Forwarding"
                      className="w-full h-32 object-contain drop-shadow-xl transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                </div>
                <div className="bg-white rounded-b-3xl p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#24963f] mb-3 uppercase tracking-wider">
                      {t("home.services.c4.badge")}
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      {t("home.services.c4.desc")}
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" href="#get-address" className="w-full shadow-soft hover:shadow-soft-md mt-4">
                    {t("common.getStartedButton")}
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 7. Dark Green Banner */}
        <section className="bg-green-900 text-white py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight">
              {t("home.banner.title1")}
              <br />
              {t("home.banner.title2")}
              <span className="text-yellow-400">
                {t("home.banner.highlight")}
              </span>
            </h2>
          </div>
        </section>

        {/* 8. Trust Standards Section */}
        <section
          id="standards"
          className="bg-green-900 text-white py-16 px-6 md:px-12"
        >
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-left">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                {t("home.standards.title")}
              </h2>
              <p className="text-sm md:text-base text-gray-100 leading-relaxed">
                {t("home.standards.desc")}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full lg:w-auto">
              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center shadow-soft-lg gap-3">
                <Shield className="w-8 h-8 text-yellow-400" />
                <span className="text-xl font-bold text-yellow-400">100%</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 mt-1 leading-tight">
                  {t("home.standards.s1")}
                </span>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center shadow-soft-lg gap-3">
                <Scale className="w-8 h-8 text-yellow-400" />
                <span className="text-xl font-bold text-yellow-400">
                  {t("home.standards.s2")}
                </span>
                <span className="text-[10px] uppercase font-bold text-gray-400 mt-1 leading-tight">
                  {t("home.standards.s2_desc")}
                </span>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center shadow-soft-lg gap-3">
                <PackageIcon className="w-8 h-8 text-yellow-400" />
                <span className="text-xl font-bold text-yellow-400">
                  {t("home.standards.s3")}
                </span>
                <span className="text-[10px] uppercase font-bold text-gray-400 mt-1 leading-tight">
                  {t("home.standards.s3_desc")}
                </span>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center shadow-soft-lg gap-3">
                <Zap className="w-8 h-8 text-yellow-400" />
                <span className="text-xl font-bold text-yellow-400">
                  {t("home.standards.s4")}
                </span>
                <span className="text-[10px] uppercase font-bold text-gray-400 mt-1 leading-tight">
                  {t("home.standards.s4_desc")}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Mailbox & Form Section */}
        <section
          id="get-address"
          className="py-20 px-6 md:px-12 max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Gallery Thumbnails */}
            <div className="hidden lg:flex lg:col-span-1 flex-col gap-3">
              {thumbs.map((thumb, index) => (
                <button
                  key={thumb.title}
                  onClick={() => setActiveThumb(index)}
                  className={`w-16 h-16 rounded-xl border-2 overflow-hidden shadow-soft hover:shadow-soft-md transition-all ${
                    activeThumb === index
                      ? "border-green-600"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={thumb.src}
                    alt={thumb.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Flyer Image card representation */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="bg-white rounded-3xl overflow-hidden shadow-soft-xl flex flex-col border border-gray-200">
                <div className="bg-gradient-to-r from-green-600 to-yellow-400 py-3 px-4 text-center border-b border-gray-200 font-bold uppercase text-xs tracking-wider text-white flex items-center justify-center gap-2">
                  <Flame className="w-4 h-4" />
                  <span>{t("common.limitedTimeOffer")}</span>
                  <Flame className="w-4 h-4" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50">
                  <div className="p-6 flex flex-col justify-between border-r-0 md:border-r border-b md:border-b-0 border-gray-200 bg-white">
                    <div className="w-full aspect-square flex items-center justify-center border border-gray-200 rounded-2xl overflow-hidden shadow-soft">
                      <img
                        src={thumbs[activeThumb].src}
                        alt={thumbs[activeThumb].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center mt-4">
                      <span className="text-[10px] uppercase font-bold text-gray-500">
                        {t("home.mailbox.flyer.model", {
                          value: activeThumb + 1,
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col justify-between bg-gray-50">
                    <div className="space-y-4 text-xs font-semibold text-gray-700">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span>{t("home.mailbox.flyer.f1")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-green-600" />
                        <span>{t("home.mailbox.flyer.f2")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-green-600" />
                        <span>{t("home.mailbox.flyer.f3")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-green-600" />
                        <span>{t("home.mailbox.flyer.f4")}</span>
                      </div>
                    </div>
                    <div className="mt-8 bg-white border border-gray-200 rounded-xl p-3 text-center shadow-soft font-bold text-xs text-gray-900">
                      {t("home.mailbox.flyer.standardVerify")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hub Selector Form */}
            <div className="lg:col-span-5 bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-soft-xl">
              <div className="flex items-center gap-2 mb-4 text-green-600 text-xs font-bold">
                <span>★★★★★</span> <span>{t("home.mailbox.rating")}</span>
              </div>
              <h2 className="text-3xl font-display font-bold tracking-tight mb-2 text-gray-900">
                {t("home.mailbox.title")}
              </h2>
              <p className="text-xs md:text-sm leading-relaxed text-gray-600 mb-6">
                {t("home.mailbox.desc")}
              </p>

              <div className="mb-6">
                <span className="text-xs font-bold uppercase text-gray-700 block mb-2">
                  {t("home.mailbox.selectHub")}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(["us", "uk", "china"] as const).map((hub) => {
                    const flagCode =
                      hub === "china" ? "cn" : hub === "uk" ? "gb" : "us";
                    const label =
                      hub === "china" ? "China" : hub === "uk" ? "UK" : "US";
                    return (
                      <button
                        key={hub}
                        onClick={() => setSelectedHub(hub)}
                        className={`py-3 px-3 rounded-xl border text-center font-bold uppercase text-xs shadow-soft transition-all hover:shadow-soft-md flex items-center justify-center gap-2 ${
                          selectedHub === hub
                            ? "bg-green-900 text-white border-green-900"
                            : "bg-white border-gray-200 text-gray-700"
                        }`}
                      >
                        <span
                          className={`fi fi-${flagCode}`}
                          style={{
                            width: "1.25rem",
                            height: "0.9375rem",
                            borderRadius: "3px",
                            display: "inline-block",
                            backgroundSize: "cover",
                            flexShrink: 0,
                          }}
                        />
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-6 shadow-soft">
                <span className="text-[10px] font-bold uppercase text-gray-500 block mb-1">
                  {t("home.mailbox.estimatedTariff")}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-display font-bold text-gray-900">
                    {hubDetails[selectedHub].price}
                    {t("common.kg")}
                  </span>
                  <span className="text-sm line-through text-gray-400 font-bold">
                    {hubDetails[selectedHub].originalPrice}
                    {t("common.kg")}
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 space-y-1">
                  {hubDetails[selectedHub].features.map((feat) => (
                    <div
                      key={feat}
                      className="text-[10px] font-bold text-gray-600 flex gap-1 items-center"
                    >
                      <span>★</span> <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="secondary"
                size="lg"
                className="w-full text-center py-4"
                onClick={() => alert(t("home.mailbox.registrationAlert"))}
              >
                {t("home.mailbox.btnGetAddress")}
              </Button>
            </div>
          </div>
        </section>

        {/* 10. Hype Download Section */}
        <section className="py-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
          <div className="bg-green-900 text-white rounded-3xl shadow-soft-xl overflow-hidden relative border border-gray-200">
            {/* Split layout: content left, airplane graphic right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Content area */}
              <div className="lg:col-span-7 p-8 md:p-12 space-y-6 relative z-10">
                {/* Five star checklist */}
                <div className="flex items-center gap-2">
                  <span className="text-green-400 tracking-tight">★★★★★</span>
                  <span className="text-xs font-bold text-gray-200">
                    <strong className="text-white">4.9</strong>{" "}
                    {t("home.downloads.ratingText")}
                  </span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight tracking-tight">
                  {t("home.downloads.title")}
                </h2>

                {/* Checklist */}
                <ul className="space-y-3 font-semibold text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>{t("home.downloads.f1")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>{t("home.downloads.f2")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>{t("home.downloads.f3")}</span>
                  </li>
                </ul>

                {/* Download buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {/* App Store */}
                  <a
                    href="#app-store"
                    className="bg-black text-white rounded-xl px-5 py-2.5 flex items-center gap-3 border border-white/20 hover:bg-gray-900 transition-all shadow-soft hover:shadow-soft-md min-w-[155px]"
                  >
                    <img
                      src="/Apple_logo_black.svg"
                      alt="Apple"
                      className="w-6 h-7 object-contain shrink-0 invert"
                    />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[10px] font-normal text-gray-300 tracking-wide">
                        {t("home.downloads.btnAppStore")}
                      </span>
                      <span className="text-base font-semibold tracking-tight">
                        App Store
                      </span>
                    </div>
                  </a>

                  {/* Google Play */}
                  <a
                    href="#google-play"
                    className="bg-black text-white rounded-xl px-5 py-2.5 flex items-center gap-3 border border-white/20 hover:bg-gray-900 transition-all shadow-soft hover:shadow-soft-md min-w-[155px]"
                  >
                    <img
                      src="/Google_Play_2022_icon.svg.webp"
                      alt="Google Play"
                      className="w-7 h-7 object-contain shrink-0"
                    />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[10px] font-normal text-gray-300 tracking-wide">
                        {t("home.downloads.btnGooglePlay")}
                      </span>
                      <span className="text-base font-semibold tracking-tight">
                        Google Play
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Graphic area */}
              <div className="lg:col-span-5 self-end relative overflow-hidden flex items-center">
                <div className="relative z-10 flex items-center justify-center">
                  <img
                    src="/mobileMockup.png"
                    alt="Kassongo Mobile App"
                    className="h-130 w-full object-contain drop-shadow-3xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. Sourcing Partners Grid */}
        <section
          id="about"
          className="py-20 px-6 md:px-12 bg-gray-50 text-center md:text-left"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6 text-gray-900">
                {t("home.unlocked.title")}
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-gray-700 mb-8">
                {t("home.unlocked.desc")}
              </p>
            </div>

            <div className="space-y-5">
              <h3 className="font-bold uppercase tracking-wider text-gray-600 text-xs text-center">
                {t("home.partners.headline")}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    src: "/Amazon_logo.svg.webp",
                    alt: "Amazon",
                    h: "34px",
                    w: "auto",
                  },
                  {
                    src: "/brandbird-alibaba-logotype.svg",
                    alt: "Alibaba",
                    h: "32px",
                    w: "auto",
                  },
                  { src: "/EBay_logo.svg", alt: "eBay", h: "34px", w: "auto" },
                  {
                    src: "/Logo_swappa_footer.svg.webp",
                    alt: "Swappa",
                    h: "50px",
                    w: "auto",
                  },
                  { src: "/1688.webp", alt: "1688", h: "34px", w: "auto" },
                  {
                    src: "/taobao-new-flat-design.svg",
                    alt: "Taobao",
                    h: "32px",
                    w: "auto",
                  },
                  {
                    src: "/aliexpress-logo-5a8f.webp",
                    alt: "AliExpress",
                    h: "100px",
                    w: "auto",
                  },
                  {
                    src: "/Walmart_logo_(2008).svg.webp",
                    alt: "Walmart",
                    h: "34px",
                    w: "auto",
                  },
                  { src: "/shein-1.svg", alt: "SHEIN", h: "26px", w: "auto" },
                  {
                    src: "/Jumia-Logo-2012.webp",
                    alt: "Jumia",
                    h: "50px",
                    w: "auto",
                  },
                ].map((brand) => (
                  <div
                    key={brand.alt}
                    className="bg-white rounded-xl p-4 border border-gray-200 shadow-soft hover:shadow-soft-md transition-smooth flex items-center justify-center h-20"
                  >
                    <img
                      src={brand.src}
                      alt={brand.alt}
                      style={{ height: brand.h, width: "auto" }}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 12. Country Flags Row */}
        <section className="bg-gradient-to-r from-green-900 to-green-800 py-12 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {[
                { code: "cn", label: "China" },
                { code: "ca", label: "Canada" },
                { code: "cm", label: "Cameroon" },
                { code: "us", label: "USA" },
                { code: "ng", label: "Nigeria" },
                { code: "fr", label: "France" },
                { code: "de", label: "Germany" },
                { code: "ae", label: "UAE" },
                { code: "gb", label: "U.K" },
                { code: "za", label: "S.A" },
                { code: "be", label: "Belgium" },
              ].map((c) => (
                <div
                  key={c.code}
                  className="flex flex-col items-center gap-2.5"
                >
                  <span
                    className={`fi fi-${c.code} shadow-soft-md`}
                    style={{
                      width: "3rem",
                      height: "2.25rem",
                      borderRadius: "6px",
                      display: "block",
                      backgroundSize: "cover",
                    }}
                  />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/90">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer component */}
      <Footer />
    </div>
  );
}
