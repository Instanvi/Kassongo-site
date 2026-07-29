"use client";

import React, { useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";
import FAQComponent from "@/components/FAQComponent";
import TestimonialSlider from "@/components/TestimonialSlider";
import {
  Shield,
  ArrowRight,
  ShieldCheck,
  Check,
  Package,
  Ship,
  Plane,
  Clock,
  DollarSign,
  Globe,
  CheckCircle2 
} from "lucide-react";

export default function CargoInsurancePage() {
  // Insurance Calculator State
  const [cargoValue, setCargoValue] = useState<number>(10000);
  const [shipmentType, setShipmentType] = useState<"air" | "sea" | "land">("sea");
  const [coverage, setCoverage] = useState<"standard" | "comprehensive">("standard");

  // Calculate premium rates
  const getPremiumRate = () => {
    const baseRates = {
      air: { standard: 0.35, comprehensive: 0.65 },
      sea: { standard: 0.45, comprehensive: 0.85 },
      land: { standard: 0.25, comprehensive: 0.50 }
    };
    return baseRates[shipmentType][coverage];
  };

  const premiumRate = getPremiumRate();
  const premiumAmount = (cargoValue * premiumRate) / 100;
  const totalProtection = cargoValue;

  const coverageFeatures = [
    {
      icon: <Shield className="w-6 h-6 text-yellow-400" />,
      title: "Complete Protection",
      desc: "Coverage against loss, damage, theft, and natural disasters during transit"
    },
    {
      icon: <Globe className="w-6 h-6 text-yellow-400" />,
      title: "Global Coverage",
      desc: "Protection for shipments across all major trade routes and destinations"
    },
    {
      icon: <Clock className="w-6 h-6 text-yellow-400" />,
      title: "Fast Claims",
      desc: "Streamlined claims process with settlement within 7-10 business days"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-yellow-400" />,
      title: "Flexible Premiums",
      desc: "Competitive rates based on cargo type, route, and shipping method"
    }
  ];

  const insuranceTypes = [
    {
      name: "Standard Coverage",
      type: "Basic Protection",
      desc: "Essential insurance covering loss or damage caused by accidents, collisions, and common transit risks. Ideal for non-fragile goods.",
      features: [
        "Accidents & Collisions",
        "Fire & Explosion",
        "Natural Disasters",
      ],
      icon: <Package className="w-5 h-5 text-green-700" />
    },
    {
      name: "Comprehensive Coverage",
      type: "All-Risk Protection",
      desc: "Complete insurance including theft, pilferage, water damage, and all perils except war and strikes. Best for high-value cargo.",
      features: [
        "All Standard Risks",
        "Theft & Pilferage",
        "Water & Weather Damage",
      ],
      icon: <ShieldCheck className="w-5 h-5 text-green-700" />
    },
    {
      name: "Premium Coverage",
      type: "Maximum Protection",
      desc: "Ultimate protection including war, strikes, riots, and all conceivable risks. For extremely valuable or sensitive shipments.",
      features: [
        "All Comprehensive Risks",
        "War & Strikes",
        "Riots & Civil Commotion",
      ],
      icon: <Shield className="w-5 h-5 text-green-700" />
    }
  ];

  const claimSteps = [
    {
      step: "01",
      title: "Report Incident",
      desc: "Notify us immediately of any loss or damage. Submit initial claim within 24 hours of discovery."
    },
    {
      step: "02",
      title: "Documentation",
      desc: "Provide shipping documents, photos of damage, and detailed inventory of affected goods."
    },
    {
      step: "03",
      title: "Assessment",
      desc: "Our claims team reviews your case and may arrange for independent surveyor inspection."
    },
    {
      step: "04",
      title: "Settlement",
      desc: "Approved claims are settled within 7-10 business days via bank transfer."
    }
  ];

  const faqsList = [
    {
      question: "What types of cargo can be insured?",
      answer: "We insure most commercial cargo including electronics, textiles, machinery, furniture, and consumer goods. Certain hazardous materials and perishables may require special approval."
    },
    {
      question: "How quickly are claims processed?",
      answer: "Standard claims are processed within 7-10 business days after all documentation is received. Complex claims may take longer depending on investigation requirements."
    },
    {
      question: "What is not covered by cargo insurance?",
      answer: "Standard policies exclude losses due to improper packaging, inherent vice (natural deterioration), delays, war/strikes (unless Premium coverage), and willful misconduct by the shipper."
    },
    {
      question: "Can I insure multiple shipments at once?",
      answer: "Yes! We offer open cargo policies for businesses with regular shipments. This provides automatic coverage for all shipments within agreed terms."
    },
    {
      question: "How is the premium calculated?",
      answer: "Premiums are based on cargo value, shipping method (air/sea/land), route risk level, cargo type, and coverage level. High-risk routes or fragile goods have higher rates."
    },
    {
      question: "Do I need insurance if the carrier has liability coverage?",
      answer: "Yes. Carrier liability is typically limited to a fraction of the cargo value (often $50-$100 per package). Cargo insurance provides full value protection."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-green-100 selection:text-gray-900">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative bg-white py-20 md:py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-yellow-50 opacity-60"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left Column: Heading and Value Prop */}
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tight text-gray-900">
                  Protect Your Cargo<br />
                  <span className="text-green-800">Every Mile of the Way</span>
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  Comprehensive cargo insurance coverage protecting your shipments against loss, damage, and theft from origin to destination across all transport modes.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button variant="primary" size="lg" href="/contact" className="shadow-soft-lg transition-all">
                    <span>Get a Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="lg" href="#coverage">
                    View Coverage
                  </Button>
                </div>
              </div>

              {/* Right Column: Interactive Calculator Card */}
              <div className="relative">
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-soft-xl space-y-6 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-50 rounded-full blur-2xl opacity-40"></div>

                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <span className="text-xs uppercase font-bold text-green-800 tracking-wider">
                        Insurance Calculator
                      </span>
                      <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold uppercase rounded">
                        Instant Quote
                      </span>
                    </div>

                    {/* Transport Mode Toggle */}
                    <div className="grid grid-cols-3 gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                      <button
                        onClick={() => setShipmentType("sea")}
                        className={`py-2 px-3 text-xs font-bold rounded-lg transition-all flex flex-col items-center gap-1 ${shipmentType === "sea" ? "bg-green-900 text-white shadow" : "text-gray-600 hover:text-gray-900"}`}
                      >
                        <Ship className="w-4 h-4" />
                        <span>Sea</span>
                      </button>
                      <button
                        onClick={() => setShipmentType("air")}
                        className={`py-2 px-3 text-xs font-bold rounded-lg transition-all flex flex-col items-center gap-1 ${shipmentType === "air" ? "bg-green-900 text-white shadow" : "text-gray-600 hover:text-gray-900"}`}
                      >
                        <Plane className="w-4 h-4" />
                        <span>Air</span>
                      </button>
                      <button
                        onClick={() => setShipmentType("land")}
                        className={`py-2 px-3 text-xs font-bold rounded-lg transition-all flex flex-col items-center gap-1 ${shipmentType === "land" ? "bg-green-900 text-white shadow" : "text-gray-600 hover:text-gray-900"}`}
                      >
                        <Package className="w-4 h-4" />
                        <span>Land</span>
                      </button>
                    </div>

                    {/* Slider for Cargo Value */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-semibold">
                        <span className="text-gray-500">Cargo Value</span>
                        <span className="text-gray-900 font-bold text-lg">
                          ${cargoValue.toLocaleString()}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={1000}
                        max={100000}
                        step={1000}
                        value={cargoValue}
                        onChange={(e) => setCargoValue(Number(e.target.value))}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-700"
                      />
                      <div className="flex justify-between text-[10px] text-gray-400">
                        <span>$1K</span>
                        <span>$100K</span>
                      </div>
                    </div>

                    {/* Coverage Level Selector */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-gray-500 block">
                        Coverage Level
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setCoverage("standard")}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all ${coverage === "standard" ? "bg-green-900 border-green-900 text-white" : "bg-white border-gray-200 text-gray-700 hover:border-green-800"}`}
                        >
                          Standard
                        </button>
                        <button
                          onClick={() => setCoverage("comprehensive")}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all ${coverage === "comprehensive" ? "bg-green-900 border-green-900 text-white" : "bg-white border-gray-200 text-gray-700 hover:border-green-800"}`}
                        >
                          Comprehensive
                        </button>
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-2 border-t border-gray-100 pt-4 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Cargo Value</span>
                        <span className="font-semibold text-gray-900">${cargoValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Premium Rate</span>
                        <span className="font-semibold text-green-700">{premiumRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transport Mode</span>
                        <span className="font-semibold text-gray-900 capitalize">{shipmentType}</span>
                      </div>
                      <div className="flex justify-between text-gray-900 font-bold text-base pt-2 border-t border-gray-100">
                        <span>Premium Cost</span>
                        <span>${premiumAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-gray-400">
                        <span>Total Protection</span>
                        <span>${totalProtection.toLocaleString()}</span>
                      </div>
                    </div>

                    <Button variant="primary" href="/contact" className="w-full text-center py-3 font-bold">
                      Get Insurance Quote
                    </Button>

                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-700" />
                      <span>Underwritten by licensed insurance carriers</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Coverage Features Section */}
        <section id="coverage" className="bg-green-900 py-20 px-6">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl md:text-4xl font-display font-black text-white">
                Comprehensive Protection
              </h2>
              <p className="text-green-100 text-sm md:text-base leading-relaxed">
                From origin to destination, we protect your cargo against all major risks during international and domestic transit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coverageFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-green-950 p-6 rounded-2xl border border-white/10 shadow-soft-lg hover:border-white/20 transition-all text-center flex flex-col items-center gap-4"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Split Layout: Image and Copy */}
        <section className="bg-white py-20 px-6 border-b border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

              {/* Image Section */}
              <div className="lg:col-span-6">
                <div className="relative overflow-hidden rounded-3xl shadow-soft-xl border border-gray-100 aspect-[4/3] bg-gray-50">
                  <img
                    src="/blog/insurance.webp"
                    alt="Cargo Insurance Coverage"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* Copy Section */}
              <div className="lg:col-span-6 space-y-6">
                <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 leading-tight">
                  Why Choose Our<br />
                  <span className="text-green-800">Cargo Insurance?</span>
                </h2>

                <p className="text-gray-600 leading-relaxed text-sm">
                  International shipping comes with inherent risks. From weather damage to theft, accidents to mishandling, your cargo faces numerous threats. Our insurance ensures you're financially protected no matter what happens.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-800 shrink-0 mt-1">
                      <Check  className="w-3.5 h-3.5 font-bold" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">
                        Door-to-Door Coverage
                      </h4>
                      <p className="text-xs text-gray-500">
                        Protection starts when cargo leaves your warehouse and ends when it reaches the destination.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-800 shrink-0 mt-1">
                      <Check className="w-3.5 h-3.5 font-bold" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">
                        Competitive Premiums
                      </h4>
                      <p className="text-xs text-gray-500">
                        We work with multiple underwriters to secure the best rates for your specific shipment needs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-800 shrink-0 mt-1">
                      <Check className="w-3.5 h-3.5 font-bold" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">
                        Expert Claims Support
                      </h4>
                      <p className="text-xs text-gray-500">
                        Dedicated claims specialists guide you through the entire process from documentation to settlement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Insurance Types Grid Section */}
        <section className="bg-gray-50 py-24 px-6">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-4xl md:text-5xl font-display font-black text-gray-900">
                Three levels of protection
              </h2>
              <p className="text-gray-500 text-lg">
                Choose the coverage that matches your risk. All plans include 24/7 claims support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {insuranceTypes.map((plan, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 border border-gray-200 shadow-soft hover:shadow-soft-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                    {plan.icon}
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 mb-3">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-8">
                    {plan.desc}
                  </p>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                        <CheckCircle2  className="w-4 h-4 text-green-700 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <Button
                      variant="outline"
                      href="/contact"
                      className="w-full text-xs py-3 text-center flex items-center justify-center gap-2 border-gray-200 hover:border-green-800 hover:bg-green-800 hover:text-white transition-all duration-300 rounded-xl"
                    >
                      <span>Get Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Claims Process Section */}
        <section className="bg-white py-20 px-6 border-b border-gray-100">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900">
                Simple Claims Process
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                File and settle claims quickly with our streamlined process. Most claims are resolved within 7-10 business days.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left: Image */}
              <div className="lg:col-span-6">
                <div className="relative overflow-hidden rounded-3xl shadow-soft-xl border border-gray-100 aspect-[4/3] bg-gray-50">
                  <img
                    src="/blog/insurance1.webp"
                    alt="Cargo Insurance Claims"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-8">
                {claimSteps.map((step) => (
                  <div key={step.step} className="flex gap-6 border-b border-gray-50 pb-8 last:border-0">
                    <span className="text-3xl font-display font-black text-green-800 tracking-tight shrink-0">
                      {step.step}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialSlider />

        {/* FAQ Section */}
        <FAQComponent
          title="Frequently Asked Questions"
          subtitle="Common questions about our cargo insurance coverage and claims process"
          faqs={faqsList}
          className="border-t border-gray-100"
        />
      </main>

      <Footer />
    </div>
  );
}