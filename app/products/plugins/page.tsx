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
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";
import CountrySelector from "../../../components/tools/CountrySelector";
import FAQComponent from "@/components/FAQComponent";
import TestimonialSlider from "@/components/TestimonialSlider";
import toast, { Toaster } from "react-hot-toast";

// 5 Real Partner Case Studies
const caseStudies = [
  {
    partner: "Amazon",
    logo: "/Amazon_logo.svg.webp",
    logoH: "h-6",
    desc: "Amazon Global Logistics partnered with Kassongo to streamline cross-border shipping for FBA sellers. Our integrated duty calculator and customs clearance tools reduced shipment processing time by 40% and cut unexpected customs fees for merchants shipping from China, India, and Vietnam to US, UK, and EU fulfillment centers.",
    metric: "40% faster customs clearance",
    category: "Technology Partner",
  },
  {
    partner: "DHL",
    logo: "/DHL-Logo.wine.svg",
    logoH: "h-8",
    desc: "DHL Express integrated Kassongo's real-time duty estimation API into their cross-border e-commerce platform. This allows DHL customers to see accurate landed costs upfront — including customs duties, VAT, and handling fees — before checkout, reducing cart abandonment and improving delivery predictability across 220+ countries.",
    metric: "220+ countries covered",
    category: "Carrier Partner",
  },
  {
    partner: "Jumia",
    logo: "/Jumia-Logo-2012.webp",
    logoH: "h-8",
    desc: "Jumia, Africa's largest e-commerce platform, partnered with Kassongo to power last-mile logistics and customs compliance across 11 African markets. Our localized duty calculations and multi-currency support helped Jumia expand cross-border trade, connecting international sellers to millions of African consumers with transparent shipping costs.",
    metric: "11 African markets served",
    category: "Fulfillment Partner",
  },
  {
    partner: "Alibaba",
    logo: "/brandbird-alibaba-logotype.svg",
    logoH: "h-5",
    desc: "Alibaba.com integrated Kassongo's HS code classification and duty calculator into their B2B trade platform. This partnership helps Alibaba's 200,000+ suppliers provide instant, accurate import duty quotes to global buyers — eliminating pricing surprises and accelerating purchase decisions for wholesale cross-border transactions.",
    metric: "200K+ suppliers enabled",
    category: "Technology Partner",
  },
  {
    partner: "FedEx",
    logo: "/FedEx_Express.webp",
    logoH: "h-6",
    desc: "FedEx Cross Border partnered with Kassongo to enhance their international e-commerce shipping solutions. Our compliance engine automates HS code determination and duty calculations for FedEx's global retail clients, ensuring accurate customs documentation and reducing shipment holds at border crossings worldwide.",
    metric: "99.2% customs clearance rate",
    category: "Carrier Partner",
  },
];

// E-commerce integration cards with logos
const integrations = [
  { name: "Shopify", desc: "1-Click App installation", status: "Certified App", logo: "/shopify.svg", logoH: "h-5" },
  { name: "WooCommerce", desc: "WordPress extension", status: "Active Plugin", logo: "/woo.svg", logoH: "h-5" },
  { name: "Wix Commerce", desc: "Site app store integration", status: "Active Plugin", logo: "/wix.svg", logoH: "h-5" },
  { name: "Custom API", desc: "REST & GraphQL protocols", status: "Developer Ready", logo: "/api.svg", logoH: "h-5" },
];

export default function PluginsPage() {
  const faqs = [
    {
      question: "How long does it take to become a partner?",
      answer: "Once you submit your application, our partnerships team reviews it within 48 hours. Approval typically takes 3-5 business days. After approval, you'll receive onboarding materials and API credentials.",
    },
    {
      question: "Are there any upfront costs to join?",
      answer: "No. Partnership enrollment is free. We operate on revenue sharing models and integration fees depend on your partnership tier and volume.",
    },
    {
      question: "Can I integrate Kassongo without technical expertise?",
      answer: "Yes! If you use Shopify, WooCommerce, or Wix, we offer 1-click app installations with no coding required. For custom integrations, our API is well-documented with SDKs in multiple languages.",
    },
    {
      question: "What kind of support do partners receive?",
      answer: "All partners get access to our dedicated partner portal, technical documentation, sandbox environment, and priority support from our integration team via email and Slack.",
    },
    {
      question: "Can I white-label Kassongo services?",
      answer: "Yes, certain partnership tiers allow white-labeling of our duty calculator, checkout widgets, and shipping labels. Contact our partnerships team for details.",
    },
    {
      question: "How do revenue sharing models work?",
      answer: "Revenue sharing varies by partner type. Technology partners typically receive referral commissions, while Carrier and Fulfillment partners participate in transaction-based revenue splits. Details are negotiated during onboarding.",
    },
  ];

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Application submitted successfully! We will review and get back to you within 48 hours.", {
      duration: 4000,
      position: "top-center",
    });
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
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-green-100 selection:text-gray-900">
      <Toaster />
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative bg-white py-20 md:py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-yellow-50 opacity-60"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tight text-gray-900">
                  Become a<br />
                  <span className="text-green-800">Kassongo Partner.</span>
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  Join Kassongo in offering retailers best-in-class shipping solutions, pre-calculated customs duties, and localized payment integrations. Build new revenue streams and grow your business within our ecosystem.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button variant="primary" size="lg" href="#apply" className="shadow-soft-lg transition-all">
                    <span>Join as Partner</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="lg" href="#ecosystem">
                    Explore Ecosystem
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gray-50 rounded-3xl p-6 md:p-8 border border-gray-200 shadow-soft-xl space-y-6">
                  <h3 className="font-display font-black text-lg text-gray-950">E-commerce Integrations</h3>

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
          {/* Solid dark gradient background — NO image */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-gray-900 to-green-950"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(36,150,63,0.15),_transparent_50%)]"></div>

          <div className="max-w-3xl mx-auto relative z-10">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/30 rounded-full px-4 py-1.5 mb-4">
                <Building2 className="w-4 h-4 text-green-400" />
                <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Partner Application</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight mb-3">
                Apply to Join Our Partner Network
              </h2>
              <p className="text-sm text-gray-300 max-w-lg mx-auto leading-relaxed">
                Fill out the form below and our partnerships team will review your application within 48 hours.
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1: First Name + Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                      First Name
                    </label>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                      Last Name
                    </label>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                {/* Row 2: Company Email + Company Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                      Company Email
                    </label>
                    <Input
                      type="email"
                      name="companyEmail"
                      value={formData.companyEmail}
                      onChange={handleChange}
                      required
                      placeholder="Company email"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                      Company Name
                    </label>
                    <Input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      placeholder="Company name"
                    />
                  </div>
                </div>

                {/* Row 3: Website - Full Width */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                    Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
                    <Input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://yourcompany.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Row 4: Country - Full Width using CountrySelector */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                    Country
                  </label>
                  <CountrySelector
                    value={formData.country}
                    onChange={handleCountryChange}
                    placeholder="Select your country"
                  />
                </div>

                {/* Row 5: Partner Type */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                    Partner Type
                  </label>
                  <Select
                    name="partnerType"
                    value={formData.partnerType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Are you a shipping aggregator, a single shipper, or a shipping carrier?</option>
                    <option value="aggregator">Shipping Aggregator</option>
                    <option value="shipper">Single Shipper</option>
                    <option value="carrier">Shipping Carrier</option>
                    <option value="3pl">3PL / Fulfillment</option>
                    <option value="technology">Technology Partner</option>
                    <option value="other">Other</option>
                  </Select>
                </div>

                {/* Row 6: USA Shipping Percentage */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                    USA Shipping Volume
                  </label>
                  <Select
                    name="usaShippingPercent"
                    value={formData.usaShippingPercent}
                    onChange={handleChange}
                    required
                  >
                    <option value="">What percentage of your shipping is within the USA?</option>
                    <option value="0-25">0% - 25%</option>
                    <option value="26-50">26% - 50%</option>
                    <option value="51-75">51% - 75%</option>
                    <option value="76-100">76% - 100%</option>
                    <option value="na">Not applicable</option>
                  </Select>
                </div>

                {/* Row 7: How did you hear about us? */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                    Referral Source
                  </label>
                  <Select
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleChange}
                    required
                  >
                    <option value="">How did you hear about us?</option>
                    <option value="search">Search Engine (Google, Bing, etc.)</option>
                    <option value="social">Social Media</option>
                    <option value="referral">Referral from a Partner</option>
                    <option value="event">Industry Event / Conference</option>
                    <option value="email">Email Campaign</option>
                    <option value="other">Other</option>
                  </Select>
                </div>

                {/* Row 8: Message Textarea */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="flex w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-all resize-none"
                    placeholder="Please let us know why you are reaching out to us."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    className="w-full md:w-auto px-12 shadow-soft-lg hover:shadow-soft-xl transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Apply now</span>
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
              <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900">A Preferred E-commerce Partner Ecosystem</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                We bring together technology, carriers, and agencies to power shipping and compliance for leading retail brands.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Category 1: Technology Partners */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-700">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Technology Partners</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Software and platforms integrated with Kassongo to offer a comprehensive, seamless stack for retailers.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <img src="/Amazon_logo.svg.webp" alt="Amazon" className="h-4 w-auto object-contain opacity-60" />
                    <img src="/brandbird-alibaba-logotype.svg" alt="Alibaba" className="h-3.5 w-auto object-contain opacity-60" />
                    <img src="/Etsy_logo.webp" alt="Etsy" className="h-3.5 w-auto object-contain opacity-60" />
                  </div>
                </div>
                <Button variant="outline" size="sm" href="#apply" className="mt-4 self-start">Apply Now</Button>
              </div>

              {/* Category 2: Carrier Partners */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-700">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Carrier Partners</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    An international, national, and local carrier network helping you ship and track e-commerce packages easily.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <img src="/DHL-Logo.wine.svg" alt="DHL" className="h-5 w-auto object-contain opacity-60" />
                    <img src="/FedEx_Express.webp" alt="FedEx" className="h-4 w-auto object-contain opacity-60" />
                    <img src="/United_Parcel_Service-Logo.wine.svg" alt="UPS" className="h-4 w-auto object-contain opacity-60" />
                  </div>
                </div>
                <Button variant="outline" size="sm" href="#apply" className="mt-4 self-start">Apply Now</Button>
              </div>

              {/* Category 3: Fulfillment Partners */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-700">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Fulfillment Partners</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Fulfillment and 3PL warehouses that use Kassongo shipping services to provide a seamless warehousing flow.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <img src="/Jumia-Logo-2012.webp" alt="Jumia" className="h-5 w-auto object-contain opacity-60" />
                    <img src="/Walmart_logo_(2008).svg.webp" alt="Walmart" className="h-4 w-auto object-contain opacity-60" />
                    <img src="/shopee-seeklogo.svg" alt="Shopee" className="h-4 w-auto object-contain opacity-60" />
                  </div>
                </div>
                <Button variant="outline" size="sm" href="#apply" className="mt-4 self-start">Apply Now</Button>
              </div>

              {/* Category 4: Solutions Partners */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-700">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Solutions Partners</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Agencies, designers, and consultants geared toward helping businesses scale cross-border sales and logistics.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <img src="/aliexpress-logo-5a8f.webp" alt="AliExpress" className="h-4 w-auto object-contain opacity-60" />
                    <img src="/dhgate-seeklogo.svg" alt="DHgate" className="h-4 w-auto object-contain opacity-60" />
                    <img src="/Lazada.webp" alt="Lazada" className="h-4 w-auto object-contain opacity-60" />
                  </div>
                </div>
                <Button variant="outline" size="sm" href="#apply" className="mt-4 self-start">Apply Now</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-display font-black text-gray-900">
                Grow your business with our ecosystem
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                As a Kassongo partner, you will work with the leading shipping and compliance software, receive exclusive technical support, and gain access to new revenue streams and co-marketing opportunities. We prioritize driving real results for our joint merchants.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-gray-600">Access to co-marketing & sponsor events</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-gray-600">Revenue sharing options on logistics pipelines</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-gray-600">Priority technical sandbox API credentials</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== REAL PARTNER CASE STUDIES ===== */}
        <section className="bg-gray-50 py-20 px-6 border-t border-gray-200">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-4 py-1.5 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Success Stories</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-black text-gray-900">Partner Case Studies</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                See how leading global brands have grown with Kassongo's partner ecosystem.
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
                    <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">
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
          title="Partner Program FAQs"
          subtitle="Common questions about joining our partner ecosystem"
          faqs={faqs}
        />

      </main>

      <Footer />
    </div>
  );
}