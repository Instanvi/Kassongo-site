"use client";

import { Zap, Shield, Truck, CheckCircle, Package as PackageIcon, Send } from "lucide-react";
import Button from "../../Button";
import { useTranslation } from "../../../lib/i18n/LanguageContext";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-white py-12 px-6 md:py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-yellow-50 opacity-60"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-900/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-green-900 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-soft">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span>{t("home.hero.badge")}</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black leading-[0.95] tracking-tight text-gray-900">
                {t("home.hero.title1")}
                <br />
                <span className="text-green-800">{t("home.hero.title2")}</span>
                <br />
                <span className="text-yellow-400">{t("home.hero.title3")}</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                {t("home.hero.subtitle")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" href="#get-address" className="shadow-soft-lg hover:shadow-soft-xl transition-all">
                <PackageIcon className="w-5 h-5" />
                {t("home.hero.btnAddress")}
              </Button>
              <Button variant="secondary" size="lg" href="/contact" className="shadow-soft hover:shadow-soft-md transition-all">
                <Send className="w-5 h-5" />
                {t("home.hero.btnContact")}
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-gray-700">{t("home.hero.indicators.insured")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-gray-700">{t("home.hero.indicators.tracking")}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-gray-700">{t("home.hero.indicators.storage")}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div>
                <div className="text-3xl md:text-4xl font-display font-black text-green-800 mb-1">60+</div>
                <div className="text-xs font-bold uppercase text-gray-500 tracking-wide">{t("home.hero.stats.hubs")}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-black text-green-800 mb-1">21+</div>
                <div className="text-xs font-bold uppercase text-gray-500 tracking-wide">{t("home.hero.stats.carriers")}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-black text-green-800 mb-1">1M+</div>
                <div className="text-xs font-bold uppercase text-gray-500 tracking-wide">{t("home.hero.stats.members")}</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="relative overflow-hidden">
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
                  maskImage: "radial-gradient(ellipse 80% 80% at center, black 40%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(ellipse 80% 80% at center, black 40%, transparent 100%)",
                }}
                aria-label="Kassongo Freight Platform Animation"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
