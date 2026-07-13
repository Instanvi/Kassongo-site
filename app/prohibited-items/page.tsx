"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useTranslation } from "../../lib/i18n/LanguageContext";

export default function ProhibitedItemsPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 pt-16">
        
        {/* Hero Section */}
        <section className="relative bg-white py-16 px-6 border-b border-gray-200">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 mb-4">
              {t("prohibited.hero.title")}
            </h1>
            <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {t("prohibited.hero.subtitle")}
            </p>
          </div>
        </section>

        {/* Critical Warning */}
        <section className="py-10 px-6 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-3">{t("prohibited.strictlyProhibited.title")}</h2>
            <p className="text-gray-100 leading-relaxed">
              {t("prohibited.strictlyProhibited.desc")}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto space-y-10">
            
            {/* Absolutely Prohibited */}
            <div className="bg-gray-50 border-l-4 border-gray-400 rounded-r-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-5">{t("prohibited.absolutelyProhibited.title")}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">{t("prohibited.absolutelyProhibited.c1.title")}</h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    {[...Array(6)].map((_, i) => (
                      <li key={i}>{t(`prohibited.absolutelyProhibited.c1.items.${i}`)}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">{t("prohibited.absolutelyProhibited.c2.title")}</h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    {[...Array(6)].map((_, i) => (
                      <li key={i}>{t(`prohibited.absolutelyProhibited.c2.items.${i}`)}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">{t("prohibited.absolutelyProhibited.c3.title")}</h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    {[...Array(6)].map((_, i) => (
                      <li key={i}>{t(`prohibited.absolutelyProhibited.c3.items.${i}`)}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">{t("prohibited.absolutelyProhibited.c4.title")}</h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    {[...Array(6)].map((_, i) => (
                      <li key={i}>{t(`prohibited.absolutelyProhibited.c4.items.${i}`)}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Heavily Restricted */}
            <div className="bg-gray-50 border-l-4 border-gray-400 rounded-r-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{t("prohibited.restricted.title")}</h2>
              <p className="text-gray-700 mb-5 text-sm">
                {t("prohibited.restricted.subtitle")}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">{t("prohibited.restricted.c1.title")}</h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    {[...Array(7)].map((_, i) => (
                      <li key={i}>{t(`prohibited.restricted.c1.items.${i}`)}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">{t("prohibited.restricted.c2.title")}</h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <li key={i}>{t(`prohibited.restricted.c2.items.${i}`)}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">{t("prohibited.restricted.c3.title")}</h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    {[...Array(4)].map((_, i) => (
                      <li key={i}>{t(`prohibited.restricted.c3.items.${i}`)}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">{t("prohibited.restricted.c4.title")}</h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <li key={i}>{t(`prohibited.restricted.c4.items.${i}`)}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Country-Specific Restrictions */}
            <div className="bg-gray-50 border-l-4 border-gray-400 rounded-r-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-5">{t("prohibited.countrySpecific.title")}</h2>

              <div className="space-y-5">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{t("prohibited.countrySpecific.c1.title")}</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    {t("prohibited.countrySpecific.c1.subtitle")}
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm ml-4 font-normal list-disc">
                    {[...Array(5)].map((_, i) => (
                      <li key={i}>{t(`prohibited.countrySpecific.c1.items.${i}`)}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{t("prohibited.countrySpecific.c2.title")}</h3>
                  <ul className="space-y-1 text-gray-700 text-sm ml-4 font-normal list-disc">
                    {[...Array(7)].map((_, i) => (
                      <li key={i}>{t(`prohibited.countrySpecific.c2.items.${i}`)}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{t("prohibited.countrySpecific.c3.title")}</h3>
                  <p className="text-gray-700 text-sm">
                    {t("prohibited.countrySpecific.c3.desc")}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Restrictions */}
            <div className="bg-gray-50 border-l-4 border-gray-400 rounded-r-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-5">{t("prohibited.additional.title")}</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t("prohibited.additional.liveAnimals")}</h3>
                  <p className="text-gray-700 text-sm">{t("prohibited.additional.liveAnimalsDesc")}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t("prohibited.additional.perishable")}</h3>
                  <p className="text-gray-700 text-sm">{t("prohibited.additional.perishableDesc")}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t("prohibited.additional.pornography")}</h3>
                  <p className="text-gray-700 text-sm">{t("prohibited.additional.pornographyDesc")}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t("prohibited.additional.hazmat")}</h3>
                  <p className="text-gray-700 text-sm">{t("prohibited.additional.hazmatDesc")}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t("prohibited.additional.surveillance")}</h3>
                  <p className="text-gray-700 text-sm">{t("prohibited.additional.surveillanceDesc")}</p>
                </div>
              </div>
            </div>

            {/* Consequences */}
            <div className="bg-gray-900 text-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">{t("prohibited.consequences.title")}</h2>
              <ul className="space-y-2 text-sm list-disc pl-5">
                {[...Array(6)].map((_, i) => (
                  <li key={i}>{t(`prohibited.consequences.items.${i}`)}</li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{t("prohibited.unsure.title")}</h2>
              <p className="text-gray-700 mb-4 text-sm">
                {t("prohibited.unsure.desc")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-green-900 text-white font-semibold rounded-lg hover:bg-green-800 transition-all text-sm"
                >
                  {t("faq.list.contactSupport")}
                </a>
                <a
                  href="mailto:support@kassongo.com"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-gray-900 font-semibold rounded-lg border border-gray-300 hover:border-gray-400 transition-all text-sm"
                >
                  support@kassongo.com
                </a>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
