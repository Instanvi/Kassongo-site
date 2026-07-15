"use client";

import { useTranslation } from "../../../lib/i18n/LanguageContext";

export default function BannerSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-green-900 text-white py-20 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight">
          {t("home.banner.title1")}
          <br />
          {t("home.banner.title2")}
          <span className="text-yellow-400">{t("home.banner.highlight")}</span>
        </h2>
      </div>
    </section>
  );
}
