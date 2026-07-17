"use client";

import React from "react";
import { 
  HeartHandshake, 
  Search, 
  ShieldCheck, 
  ArrowRight,
  Sparkles, 
  UserCheck,
  CheckCircle,
  Coins
} from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";

export default function AssistedSourcingPage() {
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
                  <Search className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Assisted Sourcing Solution</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tight text-gray-900">
                  Global sourcing.<br />
                  <span className="text-green-800">Verified suppliers.</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  Stop worrying about scams, quality issues, or language barriers. Kassongo's assisted sourcing team handles supplier verification, payment escrow, factory inspections, and customs-compliant transport from China, Europe, and Turkey to Africa.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button variant="primary" size="lg" href="/contact" className="shadow-soft-lg transition-all">
                    <span>Source a Product</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="lg" href="#how-it-works">
                    Learn How it Works
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-green-950 to-green-900 text-white rounded-3xl p-6 md:p-8 shadow-soft-xl border border-green-800/40 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                  
                  <div className="space-y-6 relative z-10">
                    <h3 className="font-display font-black text-lg text-white">Sourcing Request</h3>
                    
                    <div className="space-y-3 text-xs">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-1">
                        <p className="text-green-200 uppercase font-bold">1. Supplier Status</p>
                        <p className="text-sm font-semibold">Verified Factory (Guangzhou, CN)</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-1">
                        <p className="text-green-200 uppercase font-bold">2. Inspection Quality Check</p>
                        <p className="text-sm font-semibold text-yellow-400">Passed - Certificate Issued</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-1">
                        <p className="text-green-200 uppercase font-bold">3. Escrow Payment Protection</p>
                        <p className="text-sm font-semibold">Funds secured in Kassongo Escrow</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values / Features */}
        <section className="bg-gray-50 py-20 px-6 border-t border-gray-105">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900">Secure Procurement from Start to Finish</h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                We act as your physical representatives in global markets, protecting your investments at every step.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Supplier Audits</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We check licenses, inspect facilities, and evaluate previous client feedback so you only trade with legitimate manufacturers.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <Coins className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Escrow Security</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Your funds are held safely by Kassongo and are only released to the supplier once our inspectors approve the cargo quality at packing.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Quality Inspections</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Our local inspectors run physical test reports, count boxes, and verify container loading to ensure product quality is exactly what you ordered.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Flow */}
        <section id="how-it-works" className="bg-white py-20 px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-2xl md:text-3xl font-display font-black text-center text-gray-900">
              The Assisted Sourcing Process
            </h2>
            
            <div className="space-y-6">
              {[
                { step: "01", title: "Submit Procurement Details", desc: "Share specifications, photos, and estimated target price of the items you need to source." },
                { step: "02", title: "Review Quotes & Supplier Profiles", desc: "We source quotes from verified factories and present detailed product sheets with transport quotes." },
                { step: "03", title: "Deploy Escrow and Inspection", desc: "Secure the order with deposit escrow. We inspect components during manufacturing and loading." },
                { step: "04", title: "Port Delivery & Final Shipping", desc: "Goods are delivered to Kassongo's regional consolidation center, custom-cleared, and dispatched to your country." }
              ].map((item) => (
                <div key={item.step} className="flex gap-6 border-b border-gray-50 pb-6 last:border-0">
                  <span className="text-3xl font-display font-black text-green-800 tracking-tight shrink-0">{item.step}</span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="bg-green-950 text-white py-16 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 to-green-950"></div>
          <div className="max-w-2xl mx-auto relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-black">Get your custom sourcing agent</h2>
            <p className="text-green-200/80 text-sm md:text-base leading-relaxed">
              Connect with our sourcing agents in China or Turkey to negotiate directly and import cargo safely.
            </p>
            <div className="pt-2">
              <Button variant="secondary" size="lg" href="/contact" className="mx-auto shadow-lg">
                Assign Me an Agent
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
