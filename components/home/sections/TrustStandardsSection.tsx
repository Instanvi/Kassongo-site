"use client";

import { Shield, Scale, Package as PackageIcon, Zap } from "lucide-react";
import { useTranslation } from "../../../lib/i18n/LanguageContext";

const standards = [
  { icon: Shield, value: "100%", label: "home.standards.s1", desc: null },
  { icon: Scale, value: "home.standards.s2", label: "home.standards.s2_desc", desc: "value" },
  { icon: PackageIcon, value: "home.standards.s3", label: "home.standards.s3_desc", desc: "value" },
  { icon: Zap, value: "home.standards.s4", label: "home.standards.s4_desc", desc: "value" },
];

export default function TrustStandardsSection() {
  const { t } = useTranslation();

  return (
    <section id="standards" className="bg-green-900 text-white py-16 px-6 md:px-12">
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
          {standards.map((std) => (
            <div
              key={std.label}
              className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center shadow-soft-lg gap-3"
            >
              <std.icon className="w-8 h-8 text-yellow-400" />
              <span className="text-xl font-bold text-yellow-400">
                {std.desc ? t(std.value) : std.value}
              </span>
              <span className="text-[10px] uppercase font-bold text-gray-400 mt-1 leading-tight">
                {t(std.label)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
