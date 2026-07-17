"use client";

import React from "react";
import { 
  Warehouse, 
  ShieldCheck, 
  MapPin, 
  ArrowRight,
  Sparkles, 
  Boxes,
  CheckCircle2,
  PackageCheck
} from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";

export default function SecureWarehousingPage() {
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
                  <Warehouse className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Secure Warehousing Solution</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tight text-gray-900">
                  Global storage.<br />
                  <span className="text-green-800">Secure vaults.</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  Store inventory, repack goods, and handle logistics from our state-of-the-art bonded warehouses. We provide secure climate-controlled storage in Guangzhou, Paris, Lagos, and Douala, with real-time stock sync.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button variant="primary" size="lg" href="/contact" className="shadow-soft-lg transition-all">
                    <span>Reserve Warehousing</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="lg" href="#hubs">
                    Explore Storage Hubs
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-green-950 to-green-900 text-white rounded-3xl p-6 md:p-8 shadow-soft-xl border border-green-800/40 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                  
                  <div className="space-y-6 relative z-10">
                    <h3 className="font-display font-black text-lg text-white">Warehouse Inventory</h3>
                    
                    <div className="space-y-3 text-xs">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex justify-between items-center">
                        <div>
                          <p className="text-green-200 uppercase font-bold">Active Warehouse Hub</p>
                          <p className="text-sm font-semibold">Guangzhou Consolidation Hub (CN)</p>
                        </div>
                        <span className="px-2 py-0.5 bg-yellow-400 text-green-950 font-bold rounded">Active</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <p className="text-green-205 text-[10px] uppercase font-bold">Shelved Items</p>
                          <p className="text-sm font-bold">142 Cartons</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <p className="text-green-205 text-[10px] uppercase font-bold">Repacked Status</p>
                          <p className="text-sm font-bold text-yellow-400">Ready</p>
                        </div>
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
              <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900">Bonded and Climate-Controlled Facilities</h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                Our facilities comply with strict ISO security rules, ensuring safety for high-value merchandise.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">24/7 Security Vaults</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Equipped with CCTV, biometric scan control, and private guards, keeping your high-value inventory safe.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <Boxes className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Consolidated Storage</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Rent pallet slots or dedicated shelves. Scale storage space up or down dynamically depending on your shipping seasonal cycles.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <PackageCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Repacking & Kitting</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We pack goods securely, replace heavy wooden crates with lightweight cardboard, and print compliance labels.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hub Locations */}
        <section id="hubs" className="bg-white py-20 px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-2xl md:text-3xl font-display font-black text-center text-gray-900">
              Kassongo Warehousing Network
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { city: "Guangzhou, China", type: "Export Consolidation Hub", space: "12,000 sq ft", security: "Bonded & CCTV" },
                { city: "Paris, France", type: "European Logistics Hub", space: "8,500 sq ft", security: "Climate-Controlled" },
                { city: "Douala, Cameroon", type: "CEMAC Distribution Hub", space: "15,000 sq ft", security: "Biometric Access Control" },
                { city: "Lagos, Nigeria", type: "ECOWAS Fulfillment Hub", space: "20,000 sq ft", security: "24/7 Guards & Bonded" }
              ].map((hub, idx) => (
                <div key={idx} className="border border-gray-100 rounded-2xl p-6 shadow-soft space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900 text-lg">{hub.city}</span>
                    <MapPin className="w-5 h-5 text-green-800" />
                  </div>
                  <div className="space-y-1.5 text-xs text-gray-500 font-semibold">
                    <p>Type: <span className="text-gray-900">{hub.type}</span></p>
                    <p>Capacity: <span className="text-gray-900">{hub.space}</span></p>
                    <p>Security: <span className="text-gray-900">{hub.security}</span></p>
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
            <h2 className="text-3xl md:text-4xl font-display font-black">Secure your warehousing slot today</h2>
            <p className="text-green-200/80 text-sm md:text-base leading-relaxed">
              Consolidate inventory inside major trading countries and ship only when your local demand spikes.
            </p>
            <div className="pt-2">
              <Button variant="secondary" size="lg" href="/contact" className="mx-auto shadow-lg">
                Request Warehouse Quote
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
