"use client";

import { Bus } from "lucide-react";
import { useTranslation } from "../../../lib/i18n/LanguageContext";

export default function BusStationSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 px-6 md:px-12 bg-gradient-to-br from-green-50 to-yellow-50">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-soft-xl p-8 md:p-12 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-br from-green-900 to-green-700 rounded-3xl flex items-center justify-center shadow-soft-lg">
                <Bus className="w-12 h-12 text-yellow-400" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
                {t("home.bus.title")}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {t("home.bus.desc")}
              </p>
            </div>

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
  );
}
