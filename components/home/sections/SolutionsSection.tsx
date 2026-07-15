"use client";

import { Send, Inbox, Warehouse, CheckCircle } from "lucide-react";
import { useTranslation } from "../../../lib/i18n/LanguageContext";

const solutions = [
  {
    key: "send",
    icon: Send,
    features: ["f1", "f2", "f3"],
  },
  {
    key: "receive",
    icon: Inbox,
    features: ["f1", "f2", "f3"],
  },
  {
    key: "storage",
    icon: Warehouse,
    features: ["f1", "f2", "f3"],
  },
];

export default function SolutionsSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-6 md:px-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-16 text-center text-gray-900">
          {t("home.solutions.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution) => (
            <div
              key={solution.key}
              className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all border border-gray-200"
            >
              <div className="w-16 h-16 bg-green-900 rounded-2xl flex items-center justify-center mb-6 shadow-soft">
                <solution.icon className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t(`home.solutions.${solution.key}.title`)}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {t(`home.solutions.${solution.key}.desc`)}
              </p>
              <ul className="space-y-2 text-xs text-gray-500">
                {solution.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{t(`home.solutions.${solution.key}.${feat}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
