"use client";

import React from "react";
import { 
  Package, 
  Grid, 
  ArrowRight,
  Sparkles, 
  CheckCircle2,
  TrendingDown,
  Layers,
  Scale
} from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";

export default function ConsolidationPage() {
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
                  <Grid className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Consolidation (合箱) Solution</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tight text-gray-900">
                  Combine packages.<br />
                  <span className="text-green-800">Cut costs by 60%.</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  Stop paying separate minimum freight charges for every single package. Our consolidation service lets you purchase goods from multiple suppliers and combine them into a single customs-cleared container shipment.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button variant="primary" size="lg" href="/#get-address" className="shadow-soft-lg transition-all">
                    <span>Get Address & Start</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="lg" href="/tools/duty-calculator">
                    Estimate landed cost
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-green-950 to-green-900 text-white rounded-3xl p-6 md:p-8 shadow-soft-xl border border-green-800/40 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                  
                  <div className="space-y-6 relative z-10">
                    <h3 className="font-display font-black text-lg text-white">Consolidation Example</h3>
                    
                    <div className="space-y-3 text-xs">
                      <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex justify-between items-center">
                        <span>Supplier A (Shoes - Yiwu)</span>
                        <span className="font-bold">15 kg</span>
                      </div>
                      <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex justify-between items-center">
                        <span>Supplier B (Bags - Yiwu)</span>
                        <span className="font-bold">25 kg</span>
                      </div>
                      <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex justify-between items-center">
                        <span>Supplier C (Tech - Shenzhen)</span>
                        <span className="font-bold">10 kg</span>
                      </div>
                      
                      <div className="border-t border-white/10 pt-3 flex justify-between items-center text-yellow-400 font-bold">
                        <span>Combined Shipment (1 Box)</span>
                        <span>50 kg total</span>
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
              <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900">How Consolidated Shipping Works</h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                Save on international logistics by shipping larger, unified weights instead of scattered parcels.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Volume Discounts</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Shipping rates decrease as weight categories increase. Combining goods helps you reach higher weight tiers and pay less per kg.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Repacking & Box Merging</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Our warehouse operators unpack redundant external cardboard boxes, merging items into a single container to optimize dimensional weight.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Single customs entry</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Instead of paying clearance and documentation fees for 5 separate shipments, you pay just one flat fee for the consolidated box.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits list */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-2xl md:text-3xl font-display font-black text-center text-gray-900">
              Perfect for e-commerce and retail merchants
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
                <span>Up to 30 days of free package storage in our global hubs</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
                <span>Discarding heavy shipping crates to minimize chargeable weight</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
                <span>Secure photos of packages uploaded directly to your dashboard</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
                <span>Flexible transport: choose between fast air cargo or ocean LCL</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="bg-green-950 text-white py-16 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 to-green-950"></div>
          <div className="max-w-2xl mx-auto relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-black">Consolidate your next shipment</h2>
            <p className="text-green-200/80 text-sm md:text-base leading-relaxed">
              Order from suppliers today, deliver to your Kassongo forwarding addresses, and let us combine them.
            </p>
            <div className="pt-2">
              <Button variant="secondary" size="lg" href="/#get-address" className="mx-auto shadow-lg">
                Start Consolidating Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
