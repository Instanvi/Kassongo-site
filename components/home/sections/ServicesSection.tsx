"use client";

import Button from "../../Button";
import { useTranslation } from "../../../lib/i18n/LanguageContext";

const services = [
  {
    key: "c1",
    image: "/consolidation.svg",
    alt: "Consolidation",
    href: "/solutions/consolidation",
  },
  {
    key: "c2",
    image: "/secure_storage.svg",
    alt: "Secure Storage",
    href: "/solutions/secure-warehousing",
  },
  {
    key: "c3",
    image: "/assisted_sourcing.svg",
    alt: "Assisted Sourcing",
    href: "/solutions/assisted-sourcing",
  },
  {
    key: "c4",
    image: "/express_forwarding.svg",
    alt: "Express Forwarding",
    href: "/solutions/express-forwarding",
  },
];

export default function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-16 text-center text-gray-900">
          {t("home.services.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.key}
              className="rounded-3xl h-[380px] shadow-card hover:shadow-card transition-smooth relative group overflow-hidden flex flex-col"
            >
              <div
                className="bg-gradient-to-b from-[#24963f] to-[#0c4e25] rounded-t-3xl p-6 pb-4 text-white flex flex-col items-center text-center"
                style={{ height: "50%" }}
              >
                <h3 className="text-2xl font-display font-black text-white mb-1.5 tracking-tight">
                  {t(`home.services.${service.key}.title`)}
                </h3>
                <div className="flex-1 flex items-end justify-center w-full">
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="w-full h-24 object-contain drop-shadow-xl transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
              </div>
              <div className="bg-white rounded-b-3xl p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold text-[#24963f] mb-2 uppercase tracking-wider">
                    {t(`home.services.${service.key}.badge`)}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    {t(`home.services.${service.key}.desc`)}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  href={service.href}
                  className="w-full shadow-soft hover:shadow-soft-md mt-3"
                >
                  {t("common.getStartedButton")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}