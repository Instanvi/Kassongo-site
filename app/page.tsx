"use client";

import { useState } from "react";
import { Shield, Scale, Package as PackageIcon, Zap, Flame, CheckCircle, Globe, MapPin, ShoppingCart, Truck, Send, Inbox, Warehouse, Bus } from "lucide-react";
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
        
        {/* 1. Hero Section - Rebranded */}
        <section className="relative bg-white py-12 px-6 md:py-16 lg:py-20 overflow-hidden">
          
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-yellow-50 opacity-60"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-900/5 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Left Column - Content */}
              <div className="space-y-8">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-green-900 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-soft">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span>Trusted Freight Forwarding</span>
                </div>

                {/* Main Headline */}
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black leading-[0.95] tracking-tight text-gray-900">
                    Ship Smarter.<br />
                    <span className="text-green-600">Ship Faster.</span><br />
                    <span className="text-yellow-400">Ship Global.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                    Your worldwide freight forwarding partner. Consolidate, store, and ship from the US, UK, and China to anywhere in the world.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    href="#get-address"
                    className="shadow-soft-lg hover:shadow-soft-xl transition-all"
                  >
                    <PackageIcon className="w-5 h-5" />
                    Get Free Address
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    href="/contact"
                    className="shadow-soft hover:shadow-soft-md transition-all"
                  >
                    <Send className="w-5 h-5" />
                    Contact Us
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-700">Fully Insured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-700">Real-time Tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-700">30 Days Free Storage</span>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                  <div>
                    <div className="text-3xl md:text-4xl font-display font-black text-green-600 mb-1">60+</div>
                    <div className="text-xs font-bold uppercase text-gray-500 tracking-wide">Global Hubs</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-display font-black text-green-600 mb-1">21+</div>
                    <div className="text-xs font-bold uppercase text-gray-500 tracking-wide">Carriers</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-display font-black text-green-600 mb-1">1M+</div>
                    <div className="text-xs font-bold uppercase text-gray-500 tracking-wide">Members</div>
                  </div>
                </div>

              </div>

              {/* Right Column - Visual */}
              <div className="relative">
                
                {/* Main Image Card */}
                <div className="relative bg-white rounded-2xl shadow-soft-xl border border-gray-200 overflow-hidden">
                  <img
                    src="/screenshot-1.jpg"
                    alt="Kassongo Freight Platform"
                    className="w-full h-auto"
                  />
                  
                  {/* Floating Badge on Image */}
                  <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-xl shadow-soft-lg">
                    <div className="text-xs font-bold uppercase tracking-wide">Starting at</div>
                    <div className="text-2xl font-black">$3.80<span className="text-sm font-semibold">/kg</span></div>
                  </div>
                </div>

                {/* Floating Stats Cards 
                <div className="absolute -bottom-6 -left-6 bg-green-900 text-white p-6 rounded-2xl shadow-soft-xl border border-green-800 hidden lg:block">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-black">6 Days</div>
                      <div className="text-xs font-semibold text-green-300">Avg. Customs</div>
                    </div>
                  </div>
                </div>
                

                <div className="absolute -top-6 -right-6 bg-white p-5 rounded-2xl shadow-soft-xl border border-gray-200 hidden lg:block">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-green-600">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="text-xl font-black text-gray-900">4.9/5</div>
                  <div className="text-xs font-semibold text-gray-500">15K+ Reviews</div>
                </div>
*/}
              </div>

            </div>
          </div>
        </section>

        {/* 2. How It Works - Visual Process Section */}
        <section id="how-it-works" className="py-20 px-6 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-16 text-center text-gray-900">
              How It Works
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left: Cheetah World Graphic */}
              <div className="relative flex items-center justify-center">
                <div className="w-full max-w-md aspect-square relative">
                  {/* Cheetah World Image - blends naturally with background */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <img 
                      src="/CheetahWorld.png" 
                      alt="Kassongo Global Network" 
                      className="w-auto h-700 object-contain opacity-80"
                    />
                  </div>
                </div>
              </div>

              {/* Right: 3-Step Process */}
              <div className="space-y-8">
                
                {/* Step 1 */}
                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-green-900 rounded-2xl flex items-center justify-center shadow-soft group-hover:shadow-soft-lg transition-all">
                    <MapPin className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-green-900 text-white rounded-full text-sm font-bold">1</span>
                      <h3 className="text-xl font-bold text-gray-900">Get Your Address</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Sign up to receive your unique Kassongo Mail shipping addresses in major global trade hubs
                    </p>
                  </div>
                </div>

                {/* Connecting dotted line */}
                <div className="ml-8 border-l-2 border-dashed border-gray-300 h-8"></div>

                {/* Step 2 */}
                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-green-900 rounded-2xl flex items-center justify-center shadow-soft group-hover:shadow-soft-lg transition-all">
                    <ShoppingCart className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-green-900 text-white rounded-full text-sm font-bold">2</span>
                      <h3 className="text-xl font-bold text-gray-900">Shop & Source</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Buy from any supplier or factory and input your unique Kassongo address at checkout
                    </p>
                  </div>
                </div>

                {/* Connecting dotted line */}
                <div className="ml-8 border-l-2 border-dashed border-gray-300 h-8"></div>

                {/* Step 3 */}
                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-green-900 rounded-2xl flex items-center justify-center shadow-soft group-hover:shadow-soft-lg transition-all">
                    <Truck className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-green-900 text-white rounded-full text-sm font-bold">3</span>
                      <h3 className="text-xl font-bold text-gray-900">Consolidate & Save</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      We hold your items in our secure storage, combine them into one optimized shipment to slash your costs, and forward them safely to you. Customs Handled.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 3. Send/Receive/Storage Services Section */}
        <section className="py-20 px-6 md:px-12 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-16 text-center text-gray-900">
              Global Storage & Forwarding Solutions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Send Card */}
              <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all border border-gray-200">
                <div className="w-16 h-16 bg-green-900 rounded-2xl flex items-center justify-center mb-6 shadow-soft">
                  <Send className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Send</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Get a global address instantly. Buy from Alibaba, Amazon, or 1688 and let us handle everything. We securely store, combine, and forward your boxes to save you money.
                </p>
                <ul className="space-y-2 text-xs text-gray-500">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Instant address generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Buy from any supplier</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>30 days free storage</span>
                  </li>
                </ul>
              </div>

              {/* Receive Card */}
              <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all border border-gray-200">
                <div className="w-16 h-16 bg-green-900 rounded-2xl flex items-center justify-center mb-6 shadow-soft">
                  <Inbox className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Receive</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Send packages worldwide, effortlessly. Drop off your package and we'll ship it anywhere with full tracking and insurance included.
                </p>
                <ul className="space-y-2 text-xs text-gray-500">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Worldwide delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Real-time tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Full insurance coverage</span>
                  </li>
                </ul>
              </div>

              {/* Storage Card */}
              <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all border border-gray-200">
                <div className="w-16 h-16 bg-green-900 rounded-2xl flex items-center justify-center mb-6 shadow-soft">
                  <Warehouse className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Storage</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Secure storage, smarter shipping. We hold your inventory safely until you're ready to ship. Customs Handled.
                </p>
                <ul className="space-y-2 text-xs text-gray-500">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Climate-controlled facilities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>24/7 security monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Flexible storage duration</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Bus Station Convenience Section */}
        <section className="py-16 px-6 md:px-12 bg-gradient-to-br from-green-50 to-yellow-50">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-soft-xl p-8 md:p-12 border border-gray-200">
              <div className="flex flex-col md:flex-row items-center gap-8">
                
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-900 to-green-700 rounded-3xl flex items-center justify-center shadow-soft-lg">
                    <Bus className="w-12 h-12 text-yellow-400" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
                    Convenient Service Access via Local Bus Stations
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    No need to travel to a distant main cargo hub. Easily drop off your outbound parcels or pick up your international arrivals right at your nearest trusted local bus station terminal.
                  </p>
                </div>

                {/* Badge */}
                <div className="flex-shrink-0">
                  <div className="bg-green-900 text-white px-6 py-4 rounded-2xl shadow-soft text-center">
                    <div className="text-3xl font-black mb-1">60+</div>
                    <div className="text-xs font-bold uppercase tracking-wide">Locations</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 5. Partner Logo Marquee */}
        <section className="bg-white py-6 border-y border-gray-100 overflow-hidden">
          <p className="text-center text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-5">We offer assisted sourcing from</p>
          <div className="animate-marquee">
            <div className="flex items-center gap-16 px-8">
              {[...Array(3)].map((_, si) => (
                <div key={si} className="flex items-center gap-16">
                  {/* Amazon — use .webp */}
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <img src="/Amazon_logo.svg.webp" alt="Amazon" style={{ height: "30px", width: "auto" }} className="object-contain" />
                  </div>
                  {/* Alibaba */}
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <img src="/brandbird-alibaba-logotype.svg" alt="Alibaba" style={{ height: "28px", width: "auto" }} className="object-contain" />
                  </div>
                  {/* eBay */}
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <img src="/EBay_logo.svg" alt="eBay" style={{ height: "30px", width: "auto" }} className="object-contain" />
                  </div>
                  {/* AliExpress — PNG, bigger */}
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <img src="/aliexpress-logo-5a8f.png" alt="AliExpress" style={{ height: "100px", width: "auto" }} className="object-contain" />
                  </div>
                  {/* SHEIN */}
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <img src="/shein-1.svg" alt="SHEIN" style={{ height: "24px", width: "auto" }} className="object-contain" />
                  </div>
                  {/* Walmart */}
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <img src="/Walmart_logo_(2008).svg.webp" alt="Walmart" style={{ height: "30px", width: "auto" }} className="object-contain" />
                  </div>
                  {/* 1688 */}
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <img src="/1688.png" alt="1688" style={{ height: "32px", width: "auto" }} className="object-contain" />
                  </div>
                  {/* Taobao */}
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <img src="/taobao-new-flat-design.svg" alt="Taobao" style={{ height: "32px", width: "auto" }} className="object-contain" />
                  </div>
                  {/* Jumia — PNG, bigger */}
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <img src="/Jumia-Logo-2012.png" alt="Jumia" style={{ height: "50px", width: "auto" }} className="object-contain" />
                  </div>
                  {/* Swappa — webp, bigger */}
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <img src="/Logo_swappa_footer.svg.webp" alt="Swappa" style={{ height: "50px", width: "auto" }} className="object-contain" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Find Your Service Cards Section */}
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

        {/* 7. Dark Green Banner */}
        <section className="bg-green-900 text-white py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight">
              We made global shipping,<br />
              like, <span className="text-yellow-400">ridiculously easy.</span>
            </h2>
          </div>
        </section>

        {/* 8. Trust Standards Section */}
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

        {/* 9. Checkout Flyer Section */}
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
                <span>★★★★★</span> <span>4.9/5.0 Rated (15,000+ members)</span>
              </div>
              <h2 className="text-3xl font-display font-bold tracking-tight mb-2 text-gray-900">Kassongo Mailbox</h2>
              <p className="text-xs md:text-sm leading-relaxed text-gray-600 mb-6">
                Create your global shopping mailbox profiles. Instantly receive your addresses in trade hubs and forward cargo with ease.
              </p>

              <div className="mb-6">
                <span className="text-xs font-bold uppercase text-gray-700 block mb-2">Select Sourcing Hub Address:</span>
                <div className="grid grid-cols-3 gap-2">
                  {(["us", "uk", "china"] as const).map((hub) => {
                    const flagCode = hub === "china" ? "cn" : hub === "uk" ? "gb" : "us";
                    const label = hub === "china" ? "China" : hub === "uk" ? "UK" : "US";
                    return (
                      <button
                        key={hub}
                        onClick={() => setSelectedHub(hub)}
                        className={`py-3 px-3 rounded-xl border text-center font-bold uppercase text-xs shadow-soft transition-all hover:shadow-soft-md flex items-center justify-center gap-2 ${
                          selectedHub === hub ? "bg-green-900 text-white border-green-900" : "bg-white border-gray-200 text-gray-700"
                        }`}
                      >
                        <span 
                          className={`fi fi-${flagCode}`} 
                          style={{ width: "1.25rem", height: "0.9375rem", borderRadius: "3px", display: "inline-block", backgroundSize: "cover", flexShrink: 0 }} 
                        />
                        <span>{label}</span>
                      </button>
                    );
                  })}
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
                      <span>★</span> <span>{feat}</span>
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

        {/* 10. Hype Download Section */}
        <section className="py-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
          <div className="bg-green-900 text-white rounded-3xl shadow-soft-xl overflow-hidden relative border border-gray-200">
            
            {/* Split layout: content left, airplane graphic right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              
              {/* Content area */}
              <div className="lg:col-span-7 p-8 md:p-12 space-y-6 relative z-10">
                
                {/* Five star checklist */}
                <div className="flex items-center gap-2">
                  <span className="text-green-400 tracking-tight">★★★★★</span>
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
                  {/* App Store */}
                  <a
                    href="#app-store"
                    className="bg-black text-white rounded-xl px-5 py-2.5 flex items-center gap-3 border border-white/20 hover:bg-gray-900 transition-all shadow-soft hover:shadow-soft-md min-w-[155px]"
                  >
                    <img src="/Apple_logo_black.svg" alt="Apple" className="w-6 h-7 object-contain shrink-0 invert" />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[10px] font-normal text-gray-300 tracking-wide">Download on the</span>
                      <span className="text-base font-semibold tracking-tight">App Store</span>
                    </div>
                  </a>

                  {/* Google Play */}
                  <a
                    href="#google-play"
                    className="bg-black text-white rounded-xl px-5 py-2.5 flex items-center gap-3 border border-white/20 hover:bg-gray-900 transition-all shadow-soft hover:shadow-soft-md min-w-[155px]"
                  >
                    <img src="/Google_Play_2022_icon.svg.webp" alt="Google Play" className="w-7 h-7 object-contain shrink-0" />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[10px] font-normal text-gray-300 tracking-wide">GET IT ON</span>
                      <span className="text-base font-semibold tracking-tight">Google Play</span>
                    </div>
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

        {/* 11. Sourcing Partners Grid */}
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

            <div className="space-y-5">
              <h3 className="font-bold uppercase tracking-wider text-gray-600 text-xs text-center">
                We offer Assisted sourcing from..
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { src: "/Amazon_logo.svg.webp", alt: "Amazon", h: "34px", w: "auto" },
                  { src: "/brandbird-alibaba-logotype.svg", alt: "Alibaba", h: "32px", w: "auto" },
                  { src: "/EBay_logo.svg", alt: "eBay", h: "34px", w: "auto" },
                  { src: "/Logo_swappa_footer.svg.webp", alt: "Swappa", h: "50px", w: "auto" },
                  { src: "/1688.png", alt: "1688", h: "34px", w: "auto" },
                  { src: "/taobao-new-flat-design.svg", alt: "Taobao", h: "32px", w: "auto" },
                  { src: "/aliexpress-logo-5a8f.png", alt: "AliExpress", h: "100px", w: "auto" },
                  { src: "/Walmart_logo_(2008).svg.webp", alt: "Walmart", h: "34px", w: "auto" },
                  { src: "/shein-1.svg", alt: "SHEIN", h: "26px", w: "auto" },
                  { src: "/Jumia-Logo-2012.png", alt: "Jumia", h: "50px", w: "auto" },
                ].map((brand) => (
                  <div
                    key={brand.alt}
                    className="bg-white rounded-xl p-4 border border-gray-200 shadow-soft hover:shadow-soft-md transition-smooth flex items-center justify-center h-20"
                  >
                    <img src={brand.src} alt={brand.alt} style={{ height: brand.h, width: "auto" }} className="object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 12. Country Flags Row */}
        <section className="bg-gradient-to-r from-green-900 to-green-800 py-12 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {[
                { code: "cn", label: "China" },
                { code: "ca", label: "Canada" },
                { code: "us", label: "USA" },
                { code: "ng", label: "Nigeria" },
                { code: "fr", label: "France" },
                { code: "de", label: "Germany" },
                { code: "ae", label: "UAE" },
                { code: "gb", label: "U.K" },
                { code: "za", label: "S.A" },
                { code: "be", label: "Belgium" },
              ].map((c) => (
                <div key={c.code} className="flex flex-col items-center gap-2.5">
                  <span 
                    className={`fi fi-${c.code} shadow-soft-md`} 
                    style={{ width: "3rem", height: "2.25rem", borderRadius: "6px", display: "block", backgroundSize: "cover" }} 
                  />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/90">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer component */}
      <Footer />
    </div>
  );
}
