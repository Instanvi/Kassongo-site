"use client";

import { useState } from "react";
import { Flame, Shield, Zap, Globe } from "lucide-react";
import Button from "../../Button";
import { useTranslation } from "../../../lib/i18n/LanguageContext";

type HubKey = "us" | "uk" | "china";

const thumbs = [
  { src: "/screenshot-1.jpg", title: "home.howItWorks.thumbs.cHub" },
  { src: "/screenshot-4.png", title: "home.howItWorks.thumbs.sDepot" },
  { src: "/screenshot-2.jpg", title: "home.howItWorks.thumbs.gTransit" },
  { src: "/screenshot-3.jpg", title: "home.howItWorks.thumbs.sMap" },
];

const hubs: { key: HubKey; flag: string; label: string }[] = [
  { key: "us", flag: "us", label: "US" },
  { key: "uk", flag: "gb", label: "UK" },
  { key: "china", flag: "cn", label: "China" },
];

export default function MailboxSection() {
  const { t } = useTranslation();
  const [activeThumb, setActiveThumb] = useState(0);
  const [selectedHub, setSelectedHub] = useState<HubKey>("us");

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

  const currentHub = hubDetails[selectedHub];

  return (
    <section id="get-address" className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Gallery Thumbnails */}
        <div className="hidden lg:flex lg:col-span-1 flex-col gap-3">
          {thumbs.map((thumb, index) => (
            <button
              key={thumb.title}
              onClick={() => setActiveThumb(index)}
              className={`w-16 h-16 rounded-xl border-2 overflow-hidden shadow-soft hover:shadow-soft-md transition-all ${
                activeThumb === index ? "border-green-600" : "border-gray-200"
              }`}
            >
              <img src={thumb.src} alt={t(thumb.title)} className="w-full h-full object-cover" />
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
                    alt={t(thumbs[activeThumb].title)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center mt-4">
                  <span className="text-[10px] uppercase font-bold text-gray-500">
                    {t("home.mailbox.flyer.model", { value: activeThumb + 1 })}
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
              {hubs.map((hub) => (
                <button
                  key={hub.key}
                  onClick={() => setSelectedHub(hub.key)}
                  className={`py-3 px-3 rounded-xl border text-center font-bold uppercase text-xs shadow-soft transition-all hover:shadow-soft-md flex items-center justify-center gap-2 ${
                    selectedHub === hub.key
                      ? "bg-green-900 text-white border-green-900"
                      : "bg-white border-gray-200 text-gray-700"
                  }`}
                >
                  <span
                    className={`fi fi-${hub.flag}`}
                    style={{
                      width: "1.25rem",
                      height: "0.9375rem",
                      borderRadius: "3px",
                      display: "inline-block",
                      backgroundSize: "cover",
                      flexShrink: 0,
                    }}
                  />
                  <span>{hub.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-6 shadow-soft">
            <span className="text-[10px] font-bold uppercase text-gray-500 block mb-1">
              {t("home.mailbox.estimatedTariff")}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-bold text-gray-900">
                {currentHub.price}
                {t("common.kg")}
              </span>
              <span className="text-sm line-through text-gray-400 font-bold">
                {currentHub.originalPrice}
                {t("common.kg")}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 space-y-1">
              {currentHub.features.map((feat) => (
                <div key={feat} className="text-[10px] font-bold text-gray-600 flex gap-1 items-center">
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
  );
}
