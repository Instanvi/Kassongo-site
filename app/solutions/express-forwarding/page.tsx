"use client";

import React from "react";
import { 
  Truck, 
  Plane, 
  MapPin, 
  ArrowRight,
  Sparkles, 
  Clock,
  CheckCircle2,
  Navigation
} from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";

export default function ExpressForwardingPage() {
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
                <div className="inline-flex items-center gap-2 bg-green-900 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-soft">
                  <Truck className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Express Forwarding Solution</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tight text-gray-900">
                  Speedy delivery.<br />
                  <span className="text-green-800">Clear path.</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  Get your cargo delivered door-to-door with our optimized logistics routes. We provide daily air freight dispatches and weekly ocean container consolidations, complete with custom clearing support.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button variant="primary" size="lg" href="/tools/duty-calculator" className="shadow-soft-lg transition-all">
                    <span>Calculate Shipping Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="lg" href="/contact">
                    Talk to Logistics Team
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-green-950 to-green-900 text-white rounded-3xl p-6 md:p-8 shadow-soft-xl border border-green-800/40 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                  
                  <div className="space-y-6 relative z-10">
                    <h3 className="font-display font-black text-lg text-white">Live Tracking Details</h3>
                    
                    <div className="space-y-3 text-xs">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex justify-between items-center">
                        <div>
                          <p className="text-green-200 uppercase font-bold">Current Location</p>
                          <p className="text-sm font-semibold">Guangzhou Airport (CAN)</p>
                        </div>
                        <Plane className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex justify-between items-center">
                        <div>
                          <p className="text-green-200 uppercase font-bold">Shipment Status</p>
                          <p className="text-sm font-semibold">Customs Docs Approved</p>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex justify-between items-center">
                        <div>
                          <p className="text-green-200 uppercase font-bold">Estimated Delivery</p>
                          <p className="text-sm font-semibold">4 - 6 Business Days</p>
                        </div>
                        <Clock className="w-5 h-5 text-yellow-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features / Benefits */}
        <section className="bg-gray-50 py-20 px-6 border-t border-gray-105">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900">Carrier Networks & Cross-Border Delivery</h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                We handle the heavy lifting of customs forms, clearance checks, and shipping, ensuring smooth deliveries.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <Plane className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Air Cargo Network</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Fast, daily flights matching major trade routes (Guangzhou, Yiwu, Paris, London, Newark to Douala, Lagos, Nairobi).
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Weekly Sea Freight</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Weekly container shipping departures with transparent packing lists and groupage options to reduce forwarding costs.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <Navigation className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">End-to-End Tracking</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Real-time GPS status alerts. Know where your cargo is from the factory floor to the final pickup counter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Route Details */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-2xl md:text-3xl font-display font-black text-center text-gray-900">
              Kassongo Main Shipping Channels
            </h2>
            
            <div className="overflow-x-auto border border-gray-100 rounded-2xl shadow-soft">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 font-bold text-gray-700">
                    <th className="p-4">Origin Hub</th>
                    <th className="p-4">Destination Hub</th>
                    <th className="p-4">Transit Air</th>
                    <th className="p-4">Transit Sea</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-gray-600">
                  {[
                    { origin: "Guangzhou (CN)", dest: "Douala (CM)", air: "3 - 5 Days", sea: "30 - 35 Days" },
                    { origin: "Yiwu (CN)", dest: "Lagos (NG)", air: "4 - 6 Days", sea: "28 - 32 Days" },
                    { origin: "Paris (FR)", dest: "Nairobi (KE)", air: "2 - 4 Days", sea: "24 - 28 Days" },
                    { origin: "Newark (US)", dest: "Douala (CM)", air: "4 - 7 Days", sea: "35 - 40 Days" },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50">
                      <td className="p-4 font-semibold text-gray-900">{row.origin}</td>
                      <td className="p-4 font-semibold text-gray-900">{row.dest}</td>
                      <td className="p-4">{row.air}</td>
                      <td className="p-4">{row.sea}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="bg-green-950 text-white py-16 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 to-green-950"></div>
          <div className="max-w-2xl mx-auto relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-black">Need door-to-door forwarding?</h2>
            <p className="text-green-200/80 text-sm md:text-base leading-relaxed">
              Register your shipping dispatch with us and get a guaranteed quote inside CEMAC or ECOWAS regions.
            </p>
            <div className="pt-2">
              <Button variant="secondary" size="lg" href="/#get-address" className="mx-auto shadow-lg">
                Get Hub Address
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
