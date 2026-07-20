"use client";

import { MapPin, ShoppingCart, Truck } from "lucide-react";
import { useTranslation } from "../../../lib/i18n/LanguageContext";

export default function HowItWorksSection() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: MapPin,
      number: "1",
      title: t("home.howItWorks.step1.title"),
      desc: t("home.howItWorks.step1.desc"),
    },
    {
      icon: ShoppingCart,
      number: "2",
      title: t("home.howItWorks.step2.title"),
      desc: t("home.howItWorks.step2.desc"),
    },
    {
      icon: Truck,
      number: "3",
      title: t("home.howItWorks.step3.title"),
      desc: t("home.howItWorks.step3.desc"),
    },
  ];

  return (
    <section id="how-it-works" className="py-10 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-16 text-center text-gray-900">
          {t("home.howItWorks.title")}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Cheetah World Graphic */}
          <div className="relative flex items-center justify-center">
            <div className="w-full max-w-md aspect-square relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/boxes-logo.svg"
                  alt={t("home.howItWorks.networkAlt")}
                  className="w-auto h-200 object-contain opacity-80"
                />
              </div>
            </div>
          </div>

          {/* Right: 3-Step Process */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.number}>
                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-green-900 rounded-2xl flex items-center justify-center shadow-soft group-hover:shadow-soft-lg transition-all">
                    <step.icon className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-green-900 text-white rounded-full text-sm font-bold">
                        {step.number}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="ml-8 border-l-2 border-dashed border-gray-300 h-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
