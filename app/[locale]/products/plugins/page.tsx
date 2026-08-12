"use client";

import { useState } from "react";
import {
  Layers,
  ArrowRight,
  CheckCircle2,
  Code2,
  Cpu,
  UserCheck,
  Send,
  Building2,
  Globe,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import CountrySelector from "@/components/tools/CountrySelector";
import FAQComponent from "@/components/FAQComponent";
import TestimonialSlider from "@/components/TestimonialSlider";
import { toast } from "sonner";
import { useTranslations } from 'next-intl';

export default function PluginsPage() {
  const t = useTranslations();

  // 5 Real Partner Case Studies mapped using translation keys
  const caseStudies = [
    {
      partner: "Amazon",
      logo: "/Amazon_logo.svg.webp",
      logoH: "h-6",
      desc: t("products.plugins.caseStudies.desc1"),
      metric: t("products.plugins.caseStudies.metric1"),
      category: t("products.plugins.caseStudies.catTech"),
    },
    {
      partner: "DHL",
      logo: "/DHL-Logo.wine.svg",
      logoH: "h-8",
      desc: t("products.plugins.caseStudies.desc2"),
      metric: t("products.plugins.caseStudies.metric2"),
      category: t("products.plugins.caseStudies.catCarrier"),
    },
    {
      partner: "Jumia",
      logo: "/Jumia-Logo-2012.webp",
      logoH: "h-8",
      desc: t("products.plugins.caseStudies.desc3"),
      metric: t("products.plugins.caseStudies.metric3"),
      category: t("products.plugins.caseStudies.catFulfillment"),
    },
    {
      partner: "Alibaba",
      logo: "/brandbird-alibaba-logotype.svg",
      logoH: "h-5",
      desc: t("products.plugins.caseStudies.desc4"),
      metric: t("products.plugins.caseStudies.metric4"),
      category: t("products.plugins.caseStudies.catTech"),
    },
    {
      partner: "FedEx",
      logo: "/FedEx_Express.webp",
      logoH: "h-6",
      desc: t("products.plugins.caseStudies.desc5"),
      metric: t("products.plugins.caseStudies.metric5"),
      category: t("products.plugins.caseStudies.catCarrier"),
    },
  ];

  // E-commerce integration cards with logos
  const integrations = [
    { name: "Shopify", desc: t("products.plugins.integrations.shopifyDesc"), status: t("products.plugins.integrations.shopifyStatus"), logo: "/shopify.svg", logoH: "h-5" },
    { name: "WooCommerce", desc: t("products.plugins.integrations.wooDesc"), status: t("products.plugins.integrations.wooStatus"), logo: "/woo.svg", logoH: "h-5" },
    { name: "Wix Commerce", desc: t("products.plugins.integrations.wixDesc"), status: t("products.plugins.integrations.wixStatus"), logo: "/wix.svg", logoH: "h-5" },
    { name: "Custom API", desc: t("products.plugins.integrations.apiDesc"), status: t("products.plugins.integrations.apiStatus"), logo: "/api.svg", logoH: "h-5" },
  ];

  const faqs = [
    {
      question: t("products.plugins.faq.q1"),
      answer: t("products.plugins.faq.a1"),
    },
    {
      question: t("products.plugins.faq.q2"),
      answer: t("products.plugins.faq.a2"),
    },
    {
      question: t("products.plugins.faq.q3"),
      answer: t("products.plugins.faq.a3"),
    },
    {
      question: t("products.plugins.faq.q4"),
      answer: t("products.plugins.faq.a4"),
    },
    {
      question: t("products.plugins.faq.q5"),
      answer: t("products.plugins.faq.a5"),
    },
    {
      question: t("products.plugins.faq.q6"),
      answer: t("products.plugins.faq.a6"),
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyEmail: "",
    companyName: "",
    website: "",
    country: "",
    partnerType: "",
    usaShippingPercent: "",
    referralSource: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (code: string) => {
    setFormData({ ...formData, country: code });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "partner-application",
          data: formData,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Application submitted successfully to support@kassongo.com!");
        setFormData({
          firstName: "",
          lastName: "",
          companyEmail: "",
          companyName: "",
          website: "",
          country: "",
          partnerType: "",
          usaShippingPercent: "",
          referralSource: "",
          message: "",
        });
      } else {
        toast.error(result.error || "Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-green-100 selection:text-gray-900">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative bg-white py-20 md:py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-yellow-50 opacity-60"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tight text-gray-900">
                  {t("products.plugins.hero.title")}<br />
                  <span className="text-green-800">{t("products.plugins.hero.titleHighlight")}</span>
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  {t("products.plugins.hero.subtitle")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button variant="primary" size="lg" href="#apply" className="shadow-soft-lg transition-all">
                    <span>{t("products.plugins.hero.ctaPrimary")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="lg" href="#ecosystem">
                    {t("products.plugins.hero.ctaSecondary")}
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gray-50 rounded-3xl p-6 md:p-8 border border-gray-200 shadow-soft-xl space-y-6">
                  <h3 className="font-display font-black text-lg text-gray-950">{t("products.plugins.hero.cardTitle")}</h3>

                  <div className="grid grid-cols-2 gap-4">
                    {integrations.map((plugin) => (
                      <div key={plugin.name} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-soft flex flex-col justify-between h-32">
                        <div className="flex items-center justify-between">
                          <img
                            src={plugin.logo}
                            alt={plugin.name}
                            className={`${plugin.logoH} w-auto object-contain`}
                            onError={(e) => {
                              // Fallback if logo doesn't load
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-950">{plugin.name}</p>
                          <p className="text-[10px] text-gray-400 mt-1 leading-snug">{plugin.desc}</p>
                        </div>
                        <span className="text-[9px] uppercase font-bold text-green-700 bg-green-50 self-start px-2 py-0.5 rounded">
                          {plugin.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== JOIN PARTNERS APPLICATION FORM ===== */}
        <section id="apply" className="relative py-20 md:py-28 px-6 overflow-hidden">
          {/* Solid dark gradient background NO image */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-gray-900 to-green-950"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(36,150,63,0.15),_transparent_50%)]"></div>

          <div className="max-w-3xl mx-auto relative z-10">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/30 rounded-full px-4 py-1.5 mb-4">
                <Building2 className="w-4 h-4 text-green-400" />
                <span className="text-xs font-bold text-green-400 uppercase tracking-wider">{t("products.plugins.apply.badge")}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight mb-3">
                {t("products.plugins.apply.title")}
              </h2>
              <p className="text-sm text-gray-300 max-w-lg mx-auto leading-relaxed">
                {t("products.plugins.apply.subtitle")}
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1: First Name + Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                      {t("products.plugins.apply.firstName")}
                    </label>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder={t("products.plugins.apply.firstName")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                      {t("products.plugins.apply.lastName")}
                    </label>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder={t("products.plugins.apply.lastName")}
                    />
                  </div>
                </div>

                {/* Row 2: Company Email + Company Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                      {t("products.plugins.apply.companyEmail")}
                    </label>
                    <Input
                      type="email"
                      name="companyEmail"
                      value={formData.companyEmail}
                      onChange={handleChange}
                      required
                      placeholder={t("products.plugins.apply.companyEmail")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                      {t("products.plugins.apply.companyName")}
                    </label>
                    <Input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      placeholder={t("products.plugins.apply.companyName")}
                    />
                  </div>
                </div>

                {/* Row 3: Website - Full Width */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                    {t("products.plugins.apply.website")}
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
                    <Input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder={t("products.plugins.apply.websitePlaceholder")}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Row 4: Country - Full Width using CountrySelector */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                    {t("products.plugins.apply.country")}
                  </label>
                  <CountrySelector
                    value={formData.country}
                    onChange={handleCountryChange}
                    placeholder={t("products.plugins.apply.selectCountry")}
                  />
                </div>

                {/* Row 5: Partner Type */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                    {t("products.plugins.apply.partnerType")}
                  </label>
                  <Select
                    name="partnerType"
                    value={formData.partnerType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t("products.plugins.apply.partnerTypePlaceholder")}</option>
                    <option value="aggregator">{t("products.plugins.apply.optAggregator")}</option>
                    <option value="shipper">{t("products.plugins.apply.optShipper")}</option>
                    <option value="carrier">{t("products.plugins.apply.optCarrier")}</option>
                    <option value="3pl">{t("products.plugins.apply.opt3pl")}</option>
                    <option value="technology">{t("products.plugins.apply.optTech")}</option>
                    <option value="other">{t("products.plugins.apply.optOther")}</option>
                  </Select>
                </div>

                {/* Row 6: USA Shipping Percentage */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                    {t("products.plugins.apply.usaShipping")}
                  </label>
                  <Select
                    name="usaShippingPercent"
                    value={formData.usaShippingPercent}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t("products.plugins.apply.usaShippingPlaceholder")}</option>
                    <option value="0-25">{t("products.plugins.apply.optUsa0_25")}</option>
                    <option value="26-50">{t("products.plugins.apply.optUsa26_50")}</option>
                    <option value="51-75">{t("products.plugins.apply.optUsa51_75")}</option>
                    <option value="76-100">{t("products.plugins.apply.optUsa76_100")}</option>
                    <option value="na">{t("products.plugins.apply.optUsaNa")}</option>
                  </Select>
                </div>

                {/* Row 7: How did you hear about us? */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                    {t("products.plugins.apply.referral")}
                  </label>
                  <Select
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t("products.plugins.apply.referralPlaceholder")}</option>
                    <option value="search">{t("products.plugins.apply.optRefSearch")}</option>
                    <option value="social">{t("products.plugins.apply.optRefSocial")}</option>
                    <option value="referral">{t("products.plugins.apply.optRefReferral")}</option>
                    <option value="event">{t("products.plugins.apply.optRefEvent")}</option>
                    <option value="email">{t("products.plugins.apply.optRefEmail")}</option>
                    <option value="other">{t("products.plugins.apply.optRefOther")}</option>
                  </Select>
                </div>

                {/* Row 8: Message Textarea */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                    {t("products.plugins.apply.message")}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="flex w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-all resize-none"
                    placeholder={t("products.plugins.apply.messagePlaceholder")}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-12 shadow-soft-lg hover:shadow-soft-xl transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t("products.plugins.apply.applyButton")}</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Ecosystem Categories */}
        <section id="ecosystem" className="bg-gray-50 py-20 px-6 border-t border-gray-200">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900">{t("products.plugins.ecosystem.title")}</h2>
              <p className="text-gray-500 text-md">
                {t("products.plugins.ecosystem.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Category 1: Technology Partners */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-700">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{t("products.plugins.ecosystem.cat1Title")}</h3>
                  <p className="text-md text-gray-500 leading-relaxed">
                    {t("products.plugins.ecosystem.cat1Desc")}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <img src="/Amazon_logo.svg.webp" alt="Amazon" className="h-4 w-auto object-contain opacity-60" />
                    <img src="/brandbird-alibaba-logotype.svg" alt="Alibaba" className="h-3.5 w-auto object-contain opacity-60" />
                    <img src="/Etsy_logo.webp" alt="Etsy" className="h-3.5 w-auto object-contain opacity-60" />
                  </div>
                </div>
                <Button variant="outline" size="sm" href="#apply" className="mt-4 self-start">{t("products.plugins.ecosystem.applyNow")}</Button>
              </div>

              {/* Category 2: Carrier Partners */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-700">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{t("products.plugins.ecosystem.cat2Title")}</h3>
                  <p className="text-md text-gray-500 leading-relaxed">
                    {t("products.plugins.ecosystem.cat2Desc")}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <img src="/DHL-Logo.wine.svg" alt="DHL" className="h-5 w-auto object-contain opacity-60" />
                    <img src="/FedEx_Express.webp" alt="FedEx" className="h-4 w-auto object-contain opacity-60" />
                    <img src="/United_Parcel_Service-Logo.wine.svg" alt="UPS" className="h-4 w-auto object-contain opacity-60" />
                  </div>
                </div>
                <Button variant="outline" size="sm" href="#apply" className="mt-4 self-start">{t("products.plugins.ecosystem.applyNow")}</Button>
              </div>

              {/* Category 3: Fulfillment Partners */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-700">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{t("products.plugins.ecosystem.cat3Title")}</h3>
                  <p className="text-md text-gray-500 leading-relaxed">
                    {t("products.plugins.ecosystem.cat3Desc")}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <img src="/Jumia-Logo-2012.webp" alt="Jumia" className="h-5 w-auto object-contain opacity-60" />
                    <img src="/Walmart_logo_(2008).svg.webp" alt="Walmart" className="h-4 w-auto object-contain opacity-60" />
                    <img src="/shopee-seeklogo.svg" alt="Shopee" className="h-4 w-auto object-contain opacity-60" />
                  </div>
                </div>
                <Button variant="outline" size="sm" href="#apply" className="mt-4 self-start">{t("products.plugins.ecosystem.applyNow")}</Button>
              </div>

              {/* Category 4: Solutions Partners */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-700">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{t("products.plugins.ecosystem.cat4Title")}</h3>
                  <p className="text-md text-gray-500 leading-relaxed">
                    {t("products.plugins.ecosystem.cat4Desc")}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <img src="/aliexpress-logo-5a8f.webp" alt="AliExpress" className="h-4 w-auto object-contain opacity-60" />
                    <img src="/dhgate-seeklogo.svg" alt="DHgate" className="h-4 w-auto object-contain opacity-60" />
                    <img src="/Lazada.webp" alt="Lazada" className="h-4 w-auto object-contain opacity-60" />
                  </div>
                </div>
                <Button variant="outline" size="sm" href="#apply" className="mt-4 self-start">{t("products.plugins.ecosystem.applyNow")}</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="bg-green-900 py-20 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-display font-black text-white">
                {t("products.plugins.value.title")}
              </h2>
              <p className="text-md text-white leading-relaxed">
                {t("products.plugins.value.subtitle")}
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span className="text-md font-semibold text-white">{t("products.plugins.value.point1")}</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span className="text-md font-semibold text-white">{t("products.plugins.value.point2")}</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span className="text-md font-semibold text-white">{t("products.plugins.value.point3")}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20 px-6 border-t border-gray-200">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-2xl md:text-3xl font-display font-black text-gray-900">{t("products.plugins.caseStudies.title")}</h2>
              <p className="text-gray-500 text-md leading-relaxed">
                {t("products.plugins.caseStudies.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.map((study, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-gray-100 shadow-soft flex flex-col overflow-hidden hover:shadow-card transition-all duration-300 group"
                >
                  {/* Card Header with Logo */}
                  <div className="bg-gray-50/50 border-b border-gray-100 p-5 flex items-center justify-between">
                    <img
                      src={study.logo}
                      alt={study.partner}
                      className={`${study.logoH} w-auto object-contain`}
                    />
                    <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {study.category}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                      {study.desc}
                    </p>

                    {/* Metric Badge */}
                    <div className="bg-green-950 text-white rounded-xl px-4 py-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                      <span className="text-xs font-bold">{study.metric}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialSlider />

        {/* FAQ Section */}
        <FAQComponent
          title={t("products.plugins.faq.title")}
          subtitle={t("products.plugins.faq.subtitle")}
          faqs={faqs}
        />

      </main>

      <Footer />
    </div>
  );
}