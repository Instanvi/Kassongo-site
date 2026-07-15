"use client";

import { CheckCircle } from "lucide-react";
import { useTranslation } from "../../../lib/i18n/LanguageContext";

export default function DownloadSection() {
  const { t } = useTranslation();

  const features = ["f1", "f2", "f3"];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
      <div className="bg-green-900 text-white rounded-3xl shadow-soft-xl overflow-hidden relative border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Content area */}
          <div className="lg:col-span-7 p-8 md:p-12 space-y-6 relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-green-400 tracking-tight">★★★★★</span>
              <span className="text-xs font-bold text-gray-200">
                <strong className="text-white">4.9</strong>{" "}
                {t("home.downloads.ratingText")}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight tracking-tight">
              {t("home.downloads.title")}
            </h2>

            <ul className="space-y-3 font-semibold text-sm">
              {features.map((feat) => (
                <li key={feat} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>{t(`home.downloads.${feat}`)}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 pt-4">
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
                  <span className="text-base font-semibold tracking-tight">App Store</span>
                </div>
              </a>

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
                  <span className="text-base font-semibold tracking-tight">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          {/* Graphic area */}
          <div className="lg:col-span-5 self-end relative overflow-hidden flex items-center">
            <div className="relative z-10 flex items-center justify-center">
              <img
                src="/kassongo-mobile-app 1.svg"
                alt="Kassongo Mobile App"
                className="h-130 w-full object-contain drop-shadow-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
