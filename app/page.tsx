"use client";

import { useState } from "react";
import { Shield, Scale, Package as PackageIcon, Zap, Flame, Globe, CheckCircle, Smartphone, Star, Flag } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";

export default function Home() {
  const [activeThumb, setActiveThumb] = useState(0);
  const [selectedHub, setSelectedHub] = useState<"us" | "uk" | "china">("us");

  const hubDetails = {
    us: {
      name: "US Trade Hub (New York & Houston)",
      price: "$4.50",
      originalPrice: "$8.99",
      features: ["Daily departures to Africa/Europe", "30 Days Free Storage", "Sales tax-free shopping address"],
    },
    uk: {
      name: "UK Trade Hub (London Heathrow)",
      price: "$5.20",
      originalPrice: "$9.99",
      features: ["Bi-weekly air freight dispatches", "VAT reclaim assistance", "Fast customs clearance processing"],
    },
    china: {
      name: "China Trade Hub (Guangzhou & Yiwu)",
      price: "$3.80",
      originalPrice: "$7.50",
      features: ["Direct factory pickup consolidation", "Sourcing team inspection standard", "Ocean & Air shipping choices"],
    }
  };

  const thumbs = [
    { src: "/screenshot-1.jpg", title: "Consolidation Hub" },
    { src: "/screenshot-4.png", title: "Storage Depot" },
    { src: "/screenshot-2.jpg", title: "Global Transit" },
    { src: "/screenshot-3.jpg", title: "Sourcing Map" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-green-100 selection:text-gray-900">
      {/* Site Header */}
      <Header />

      {/* Main Container */}
      <main role="main" className="max-w-screen overflow-x-clip pt-16" id="main">
        
        {/* 1. Hero Section */}
        <section className="bg-gradient-soft py-16 px-6 md:py-24 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            
            {/* Hero Left Info */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
              
              {/* Star Rating Statement */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-sm font-semibold text-gray-600">
                <div className="flex text-green-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-gray-700">
                  <strong className="text-gray-900">4.9</strong> from <strong className="text-gray-900">15,000+</strong> reviews · <strong className="text-gray-900">1,000,000+</strong> members
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight text-gray-900">
                Global Sourcing<br />
                Never Felt <span className="text-green-600 italic">So Simple.</span>
              </h1>

              {/* Call to action */}
              <div className="w-full max-w-md flex flex-col gap-3">
                <Button variant="primary" size="lg" href="#get-address" className="w-full transition-smooth shadow-soft-md hover:shadow-soft-lg">
                  Get Address + 30d Free Storage
                </Button>
                
                <div className="flex items-center justify-center lg:justify-start gap-6 text-xs font-medium text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    30-day guarantee
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Cancel anytime
                  </span>
                </div>
              </div>

              {/* 3 Stats */}
              <div className="flex items-start justify-center lg:justify-start gap-8 md:gap-12 w-full pt-6 border-t border-gray-200">
                
                <div className="flex flex-col items-center gap-2">
                  <div className="relative flex items-center justify-center w-16 h-16 gradient-green rounded-2xl shadow-soft text-white font-bold text-lg">
                    60+
                  </div>
                  <p className="text-xs font-semibold uppercase text-gray-900 text-center mt-1">Sourcing Hubs</p>
                  <p className="text-xs text-gray-500 text-center leading-tight">Major markets</p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="relative flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-2xl shadow-soft text-gray-900 font-bold text-lg">
                    21+
                  </div>
                  <p className="text-xs font-semibold uppercase text-gray-900 text-center mt-1">Carriers</p>
                  <p className="text-xs text-gray-500 text-center leading-tight">Air & ocean routes</p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="relative flex items-center justify-center w-16 h-16 bg-gray-900 rounded-2xl shadow-soft text-white font-bold text-lg">
                    6d
                  </div>
                  <p className="text-xs font-semibold uppercase text-gray-900 text-center mt-1">Avg Clearing</p>
                  <p className="text-xs text-gray-500 text-center leading-tight">Quick customs</p>
                </div>

              </div>

            </div>

            {/* Hero Right Visual Column */}
            <div className="flex-1 w-full max-w-lg relative">
              <div className="w-full bg-white rounded-3xl overflow-hidden shadow-soft-xl hover:shadow-soft-xl transition-smooth-slow border border-gray-100">
                <img
                  src="/screenshot-1.jpg"
                  alt="Kassongo Sourcing Platform"
                  className="w-full h-auto aspect-square object-cover"
                />
              </div>
            </div>

          </div>
        </section>

        {/* 2. Press Logo Marquee */}
        <section className="bg-white py-6 border-y border-gray-100 overflow-hidden">
          <div className="animate-marquee">
            <div className="flex items-center gap-16 px-8">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex items-center gap-16">
                  <span className="font-display font-bold tracking-tight text-gray-400 text-sm whitespace-nowrap">FedEx Express</span>
                  <span className="font-display font-bold tracking-tight text-gray-400 text-sm whitespace-nowrap">DHL Global</span>
                  <span className="font-display font-bold tracking-tight text-gray-400 text-sm whitespace-nowrap">Cargo Air</span>
                  <span className="font-display font-bold tracking-tight text-gray-400 text-sm whitespace-nowrap">Sourcing Pro</span>
                  <span className="font-display font-bold tracking-tight text-gray-400 text-sm whitespace-nowrap">Logistics Today</span>
                  <span className="font-display font-bold tracking-tight text-gray-400 text-sm whitespace-nowrap">Customs Daily</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Find Your Service Cards Section */}
        <section id="services" className="py-24 px-6 md:px-12 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-16 text-center text-gray-900">
              Find Your Service
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-6 flex flex-col shadow-card hover:shadow-card transition-smooth border border-gray-100 relative group">
                <span className="absolute top-4 right-4 badge badge-green text-xs">
                  Best Seller
                </span>
                <div className="mt-2 mb-6 rounded-xl overflow-hidden border border-gray-100">
                  <img src="/screenshot-1.jpg" alt="Consolidated Shipping" className="w-full h-48 object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Consolidated Shipping</h3>
                    <p className="text-sm text-gray-600 mb-1">Starts at <strong className="text-gray-900">$4.50/kg</strong></p>
                    <p className="text-xs text-gray-400 line-through">$8.99/kg</p>
                  </div>
                  <div className="mt-8 space-y-3">
                    <Button variant="secondary" size="sm" href="#get-address" className="w-full shadow-soft hover:shadow-soft-md">
                      Select Hub
                    </Button>
                    <a href="#send" className="block text-center text-sm font-medium text-green-600 hover:text-green-700 transition-smooth">
                      Learn More →
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-6 flex flex-col shadow-card hover:shadow-card transition-smooth border border-gray-100 relative group">
                <span className="absolute top-4 right-4 badge badge-red text-xs">
                  Popular
                </span>
                <div className="mt-2 mb-6 rounded-xl overflow-hidden border border-gray-100">
                  <img src="/screenshot-4.png" alt="Secure Storage" className="w-full h-48 object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Secure Storage</h3>
                    <p className="text-sm text-gray-600 mb-1">Starts at <strong className="text-gray-900">Free</strong></p>
                    <p className="text-xs text-gray-400">First 30 days</p>
                  </div>
                  <div className="mt-8 space-y-3">
                    <Button variant="secondary" size="sm" href="#get-address" className="w-full shadow-soft hover:shadow-soft-md">
                      Select Hub
                    </Button>
                    <a href="#storage" className="block text-center text-sm font-medium text-green-600 hover:text-green-700 transition-smooth">
                      Learn More →
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-6 flex flex-col shadow-card hover:shadow-card transition-smooth border border-gray-100 relative group">
                <span className="absolute top-4 right-4 badge badge-yellow text-xs">
                  Assisted
                </span>
                <div className="mt-2 mb-6 rounded-xl overflow-hidden border border-gray-100">
                  <img src="/screenshot-2.jpg" alt="Assisted Sourcing" className="w-full h-48 object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Assisted Sourcing</h3>
                    <p className="text-sm text-gray-600 mb-1">Starts at <strong className="text-gray-900">5% fee</strong></p>
                    <p className="text-xs text-gray-400 line-through">10% standard</p>
                  </div>
                  <div className="mt-8 space-y-3">
                    <Button variant="secondary" size="sm" href="#get-address" className="w-full shadow-soft hover:shadow-soft-md">
                      Select Hub
                    </Button>
                    <a href="#procurement" className="block text-center text-sm font-medium text-green-600 hover:text-green-700 transition-smooth">
                      Learn More →
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-2xl p-6 flex flex-col shadow-card hover:shadow-card transition-smooth border border-gray-100 relative group">
                <span className="absolute top-4 right-4 badge badge-green text-xs">
                  Fast Speed
                </span>
                <div className="mt-2 mb-6 rounded-xl overflow-hidden border border-gray-100">
                  <img src="/screenshot-3.jpg" alt="Express Forwarding" className="w-full h-48 object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Express Forwarding</h3>
                    <p className="text-sm text-gray-600 mb-1">Starts at <strong className="text-gray-900">$8.50/kg</strong></p>
                    <p className="text-xs text-gray-400 line-through">$14.99/kg</p>
                  </div>
                  <div className="mt-8 space-y-3">
                    <Button variant="secondary" size="sm" href="#get-address" className="w-full shadow-soft hover:shadow-soft-md">
                      Select Hub
                    </Button>
                    <a href="#receive" className="block text-center text-sm font-medium text-green-600 hover:text-green-700 transition-smooth">
                      Learn More →
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Dark Green Banner */}
        <section className="bg-green-900 text-white py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight">
              We made global shipping,<br />
              like, <span className="text-yellow-400">ridiculously easy.</span>
            </h2>
          </div>
        </section>

        {/* 5. Trust Standards Section */}
        <section id="standards" className="bg-green-900 text-white py-16 px-6 md:px-12">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-left">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Consolidated for quality, speed, &amp; security.
              </h2>
              <p className="text-sm md:text-base text-gray-100 leading-relaxed">
                We physically verify all inbound supplier packages at our hub terminals to guarantee accuracy, protect fragile goods, verify invoices, and filter out customs hazards.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full lg:w-auto">
              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center shadow-soft-lg gap-3">
                <Shield className="w-8 h-8 text-yellow-400" />
                <span className="text-xl font-bold text-yellow-400">100%</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 mt-1 leading-tight">Tracked Security</span>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center shadow-soft-lg gap-3">
                <Scale className="w-8 h-8 text-yellow-400" />
                <span className="text-xl font-bold text-yellow-400">Zero</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 mt-1 leading-tight">Hidden Fees</span>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center shadow-soft-lg gap-3">
                <PackageIcon className="w-8 h-8 text-yellow-400" />
                <span className="text-xl font-bold text-yellow-400">30 Days</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 mt-1 leading-tight">Free Storage</span>
              </div>

              <div className="bg-green-950 p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center shadow-soft-lg gap-3">
                <Zap className="w-8 h-8 text-yellow-400" />
                <span className="text-xl font-bold text-yellow-400">24-Hour</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 mt-1 leading-tight">Outbound Dispatch</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Checkout Flyer Section */}
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
                  <img src={thumb.src} alt={thumb.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Flyer Image card representation */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="bg-white rounded-3xl overflow-hidden shadow-soft-xl flex flex-col border border-gray-200">
                <div className="bg-gradient-to-r from-green-600 to-yellow-400 py-3 px-4 text-center border-b border-gray-200 font-bold uppercase text-xs tracking-wider text-white flex items-center justify-center gap-2">
                  <Flame className="w-4 h-4" />
                  <span>Limited Time Offer: Save up to 60% on first cargo dispatch</span>
                  <Flame className="w-4 h-4" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50">
                  <div className="p-6 flex flex-col justify-between border-r-0 md:border-r border-b md:border-b-0 border-gray-200 bg-white">
                    <div className="w-full aspect-square flex items-center justify-center border border-gray-200 rounded-2xl overflow-hidden shadow-soft">
                      <img src={thumbs[activeThumb].src} alt={thumbs[activeThumb].title} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center mt-4">
                      <span className="text-[10px] uppercase font-bold text-gray-500">Visualizer Model {activeThumb + 1}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col justify-between bg-gray-50">
                    <div className="space-y-4 text-xs font-semibold text-gray-700">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span>Full Cargo Insurance Standard</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-green-600" />
                        <span>WhatsApp Status Alerts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-green-600" />
                        <span>Consolidated multi-order handling</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-green-600" />
                        <span>Cheetah Speed customs release</span>
                      </div>
                    </div>
                    <div className="mt-8 bg-white border border-gray-200 rounded-xl p-3 text-center shadow-soft font-bold text-xs text-gray-900">
                      Standard Hub Verification
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hub Selector Form */}
            <div className="lg:col-span-5 bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-soft-xl">
              <div className="flex items-center gap-2 mb-4 text-green-600 text-xs font-bold">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span>4.9/5.0 Rated (15,000+ members)</span>
              </div>
              <h2 className="text-3xl font-display font-bold tracking-tight mb-2 text-gray-900">Kassongo Mailbox</h2>
              <p className="text-xs md:text-sm leading-relaxed text-gray-600 mb-6">
                Create your global shopping mailbox profiles. Instantly receive your addresses in trade hubs and forward cargo with ease.
              </p>

              <div className="mb-6">
                <span className="text-xs font-bold uppercase text-gray-700 block mb-2">Select Sourcing Hub Address:</span>
                <div className="grid grid-cols-3 gap-2">
                  {(["us", "uk", "china"] as const).map((hub) => (
                    <button
                      key={hub}
                      onClick={() => setSelectedHub(hub)}
                      className={`py-3 px-2 rounded-xl border text-center font-bold uppercase text-xs shadow-soft transition-all hover:shadow-soft-md flex items-center justify-center gap-1.5 ${
                        selectedHub === hub ? "bg-green-900 text-white border-green-900" : "bg-white border-gray-200 text-gray-700"
                      }`}
                    >
                      <Flag className="w-3.5 h-3.5" />
                      {hub === "us" && "US"}
                      {hub === "uk" && "UK"}
                      {hub === "china" && "China"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-6 shadow-soft">
                <span className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Estimated Sourcing Tariff</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-display font-bold text-gray-900">{hubDetails[selectedHub].price}/kg</span>
                  <span className="text-sm line-through text-gray-400 font-bold">{hubDetails[selectedHub].originalPrice}/kg</span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 space-y-1">
                  {hubDetails[selectedHub].features.map((feat) => (
                    <div key={feat} className="text-[10px] font-bold text-gray-600 flex gap-1 items-center">
                      <Star className="w-2.5 h-2.5 fill-current text-green-600" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="secondary" size="lg" className="w-full text-center py-4" onClick={() => alert("Registration setup complete!")}>
                Get My Hub Address Now
              </Button>
            </div>

          </div>
        </section>

        {/* 7. Hype Download Section */}
        <section className="py-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
          <div className="bg-green-900 text-white rounded-3xl shadow-soft-xl overflow-hidden relative border border-gray-200">
            
            {/* Split layout: content left, airplane graphic right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              
              {/* Content area */}
              <div className="lg:col-span-7 p-8 md:p-12 space-y-6 relative z-10">
                
                {/* Five star checklist */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5 text-green-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-200">
                    <strong className="text-white">4.9</strong> rating from <strong className="text-white">15,000+</strong> verified accounts
                  </span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight tracking-tight">
                  See what all the hype is about.
                </h2>

                {/* Checklist */}
                <ul className="space-y-3 font-semibold text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>30-day cargo forwarding guarantee</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Operationally verified and speed tested</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Direct terminal customs handling</span>
                  </li>
                </ul>

                {/* Download buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {/* Google Play */}
                  <a
                    href="#google-play"
                    className="bg-white text-gray-900 font-bold uppercase text-xs py-3 px-6 rounded-full border border-gray-200 shadow-soft hover:shadow-soft-md transition-all flex items-center gap-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    Download on Play Store
                  </a>
                  {/* App Store */}
                  <a
                    href="#app-store"
                    className="bg-yellow-400 text-gray-900 font-bold uppercase text-xs py-3 px-6 rounded-full border border-yellow-500 shadow-soft hover:shadow-soft-md transition-all flex items-center gap-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    Download on App Store
                  </a>
                </div>

              </div>

              {/* Graphic area (spans 5 columns) */}
              <div className="lg:col-span-5 h-80 w-full self-end relative border-t lg:border-t-0 lg:border-l border-gray-700 bg-green-950 overflow-hidden flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-gradient-to-tr from-green-600/15 to-yellow-400/15 opacity-60"></div>
                <img src="/screenshot-2.jpg" alt="Cargo Sourcing Transit" className="max-w-[90%] max-h-[90%] object-contain rounded-2xl border border-gray-700 shadow-soft-xl" />
              </div>

            </div>

          </div>
        </section>

        {/* 8. Sourcing Partners Grid */}
        <section id="about" className="py-20 px-6 md:px-12 bg-gray-50 text-center md:text-left">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6 text-gray-900">
                International Sourcing Unlocked
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-gray-700 mb-8">
                In today's global marketplace, managing international procurement across multiple suppliers, continents, and customs zones is a logistical bottleneck. Traditional shipping leaves businesses vulnerable to fragmented tracking, exorbitant transit markups, and excessive clearance friction.
                Kassongo Express rewrites the rules of global trade. We are an asset-light, digitally driven global storage, freight consolidation, and freight forwarding network designed to give you absolute control.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold uppercase tracking-wider text-gray-600 text-xs text-center">
                We offer Assisted sourcing from..
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { name: "amazon", label: "Amazon", color: "text-black" },
                  { name: "alibaba", label: "Alibaba", color: "text-[#ff6a00]" },
                  { name: "ebay", label: "eBay", color: "text-[#0064d2]" },
                  { name: "taobao", label: "Taobao", color: "text-[#ff4400]" },
                  { name: "shein", label: "SHEIN", color: "text-black font-extrabold" },
                  { name: "walmart", label: "Walmart", color: "text-[#0071ce]" }
                ].map((brand) => (
                  <div
                    key={brand.name}
                    className="bg-white rounded-xl p-4 border border-gray-200 shadow-soft hover:shadow-soft-md transition-smooth flex items-center justify-center"
                  >
                    <span className={`font-bold text-sm ${brand.color}`}>{brand.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer component */}
      <Footer />
    </div>
  );
}
