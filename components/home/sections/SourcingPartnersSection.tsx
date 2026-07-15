"use client";

import AnimatedPartnerGrid from "../AnimatedPartnerGrid";
import { useTranslation } from "../../../lib/i18n/LanguageContext";

export default function SourcingPartnersSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 px-6 md:px-12 bg-gray-50 text-center md:text-left">
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
          <AnimatedPartnerGrid />
        </div>
      </div>
    </section>
  );
}
