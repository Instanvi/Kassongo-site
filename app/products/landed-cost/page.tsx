"use client";

import React from "react";
import { 
  Calculator, 
  ShieldAlert, 
  ArrowRight,
  TrendingUp, 
  Scale, 
  CheckCircle2,
  Percent,
  CheckCircle,
  FileText,
  BadgeDollarSign
} from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";

export default function LandedCostPage() {
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
                  Calculate landed costs<br />
                  <span className="text-green-800">with guaranteed accuracy.</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  Surprise duty invoices ruin profits and customer trust. Kassongo calculates and guarantees every international charge—duties, taxes, and brokerage fees—so you can ship globally without financial risk. When customs charges more than we quoted, we pay the difference.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button variant="primary" size="lg" href="/tools/duty-calculator" className="shadow-soft-lg transition-all">
                    <span>Use Duty Calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="lg" href="/contact">
                    Book a demo
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-soft-xl space-y-6 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-50 rounded-full blur-2xl opacity-40"></div>
                  
                  <h3 className="font-display font-black text-lg text-gray-950">Landed Cost Breakdown</h3>
                  
                  <div className="space-y-4 text-xs font-semibold text-gray-600">
                    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                      <span>Commodity Code (Laptop)</span>
                      <span className="font-mono text-gray-900">8471.30</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                      <span>Customs Value (CIF)</span>
                      <span className="text-gray-900 font-bold">$1,250.00</span>
                    </div>
                    
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between text-yellow-750">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                          <span>Customs Duty (2%)</span>
                        </span>
                        <span>$25.00</span>
                      </div>
                      <div className="flex items-center justify-between text-red-700">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-red-500 rounded-full" />
                          <span>Import VAT (Cameroon 19.25%)</span>
                        </span>
                        <span>$245.44</span>
                      </div>
                      <div className="flex items-center justify-between text-green-800">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-green-500 rounded-full" />
                          <span>CEMAC Regional Levies (1.95%)</span>
                        </span>
                        <span>$24.38</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4 bg-gray-50/50 p-3 rounded-xl">
                      <span className="text-sm font-bold text-gray-900">Total Duties & Taxes</span>
                      <span className="text-base font-black text-green-905 font-mono">$294.82</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="bg-gray-55 py-20 px-6 border-y border-gray-200">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900">Why businesses choose Landed Cost</h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                International shipping should not drain your profits. Every unexpected duty invoice, complaints about surprise fees, and time spent on tax compliance costs money.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Never absorb extra costs</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  If customs charges more than we calculated, we pay the difference. Your profit margins are completely protected.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <Percent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Eliminate surprise fees</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Display the complete landed cost at checkout. Eliminating surprise fees at delivery results in happier customers and fewer returns.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">We file taxes, you don't</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  We handle complex compliance schemes like EU IOSS, UK VAT, Australia GST, and Norway VOEC—no need to register or file manually.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Ship to 200+ countries</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Calculate precise customs duty, local tax, and clearance fees for over 200 countries and territories worldwide.
                </p>
              </div>

              {/* Card 5 */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Free HS classification</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Get accurate HS code classification included at no extra cost when you use our guaranteed landed cost.
                </p>
              </div>

              {/* Card 6 */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <BadgeDollarSign className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Reduce carrier fees</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Save up to 50% on carrier advancement and disbursement fees through our negotiated carrier rates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-2xl md:text-3xl font-display font-black text-gray-900">
                From quote to delivery, we have you covered
              </h2>
            </div>
            
            <div className="space-y-8">
              {[
                { 
                  step: "01", 
                  title: "Calculate at checkout automatically", 
                  desc: "When a customer enters a shipping destination, Landed Cost instantly calculates duties, taxes, and carrier fees in real time. The shopper sees the complete cost before they pay—no surprises, no hidden charges."
                },
                { 
                  step: "02", 
                  title: "Guarantee the calculation", 
                  desc: "We cover any discrepancy between what we calculated and what customs invoices. Your finance team doesn't have to audit carrier bills or absorb unexpected fees."
                },
                { 
                  step: "03", 
                  title: "Frictionless customs clearance", 
                  desc: "Shipments clear customs faster since all duties and taxes are prepaid. No packages are held at the border waiting for client invoice payments."
                }
              ].map((item) => (
                <div key={item.step} className="flex gap-6 border-b border-gray-50 pb-6 last:border-0">
                  <span className="text-3xl font-display font-black text-green-800 tracking-tight shrink-0">{item.step}</span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
