"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQComponentProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  className?: string;
}

export default function FAQComponent({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about our services",
  faqs,
  className = "",
}: FAQComponentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`bg-white py-16 px-6 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-start justify-between gap-4 p-5 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-gray-900 flex-1">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {openIndex === index && (
                <div className="px-5 pb-5 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed mt-4">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
