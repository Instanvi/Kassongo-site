"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import Button from "../../components/Button";
import { useTranslation } from "../../lib/i18n/LanguageContext";

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success(
      t("contact.form.successMsg"),
      {
        duration: 4000,
        position: "top-center",
      },
    );
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Toaster />
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative bg-white py-8 px-6 border-b border-gray-200">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 mb-4">
              {t("contact.hero.title")}
            </h1>
            <p className="text-base text-gray-600">
              {t("contact.hero.subtitle")}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-10 md:py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Contact Info Cards */}
              <div className="lg:col-span-2 space-y-6">
                {/* Email Card */}
                <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-200 hover:shadow-card-hover transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-900 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {t("common.emailUs")}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {t("contact.cards.emailDesc")}
                      </p>
                      <a
                        href="mailto:support@kassongo.com"
                        className="text-green-600 font-semibold hover:text-green-700 transition-colors inline-flex items-center gap-1 text-sm"
                      >
                        support@kassongo.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-200 hover:shadow-card-hover transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-900 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {t("common.callUs")}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {t("contact.cards.phoneHours")}
                      </p>
                      <a
                        href="tel:+12345678900"
                        className="text-green-600 font-semibold hover:text-green-700 transition-colors inline-flex items-center gap-1 text-sm"
                      >
                        +1 (234) 567-8900
                      </a>
                    </div>
                  </div>
                </div>

                {/* Response Time Card */}
                <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-200 hover:shadow-card-hover transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-900 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {t("contact.cards.responseTitle")}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {t("contact.cards.responseDesc")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Office Location Card */}
                <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-200 hover:shadow-card-hover transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-900 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {t("common.headquarters")}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        123 Freight Avenue
                        <br />
                        New York, NY 10001
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-card border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {t("contact.form.title")}
                  </h2>
                  <p className="text-sm text-gray-600 mb-8">
                    {t("contact.form.subtitle")}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-semibold text-gray-900 mb-2"
                        >
                          {t("contact.form.labelName")}
                        </label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold text-gray-900 mb-2"
                        >
                          {t("contact.form.labelEmail")}
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-semibold text-gray-900 mb-2"
                        >
                          {t("contact.form.labelPhone")}
                        </label>
                        <Input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-semibold text-gray-900 mb-2"
                        >
                          {t("contact.form.labelSubject")}
                        </label>
                        <Select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="">{t("contact.form.subjectPlaceholder")}</option>
                          <option value="general">{t("contact.form.optGeneral")}</option>
                          <option value="shipping">{t("contact.form.optShipping")}</option>
                          <option value="pricing">{t("contact.form.optPricing")}</option>
                          <option value="sourcing">{t("contact.form.optSourcing")}</option>
                          <option value="storage">{t("contact.form.optStorage")}</option>
                          <option value="tracking">{t("contact.form.optTracking")}</option>
                          <option value="technical">{t("contact.form.optTechnical")}</option>
                          <option value="other">{t("contact.form.optOther")}</option>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-gray-900 mb-2"
                      >
                        {t("contact.form.labelMessage")}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={7}
                        className="flex w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-all resize-none"
                        placeholder={t("contact.form.msgPlaceholder")}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                      <p className="text-xs text-gray-500">
                        {t("contact.form.agreeText")}{" "}
                        <a href="/privacy-policy" className="underline hover:text-gray-700">
                          {t("common.privacyPolicy")}
                        </a>
                      </p>

                      <Button
                        variant="secondary"
                        size="lg"
                        type="submit"
                        className="w-full sm:w-auto justify-center shadow-soft-lg hover:shadow-soft-xl transition-all"
                      >
                        <Send className="w-5 h-5" />
                        {t("contact.form.btnSend")}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
