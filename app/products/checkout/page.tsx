"use client";

import React from "react";
import { 
  Globe, 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  RefreshCw,
  Zap,
  Flame,
  Truck,
  HeartHandshake
} from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";
import PartnerMarquee from "@/components/home/sections/PartnerMarquee";

export default function CheckoutPage() {
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
                  Sell more, stress less with a <span className="text-green-800">global checkout.</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  Give international shoppers an experience built for them—complete with currency conversion, local payment methods (such as Mobile Money, Orange, and regional cards), and upfront duty and tax calculations. Stay in control of your brand and margins while we handle tax compliance.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button variant="primary" size="lg" href="/tools/duty-calculator" className="shadow-soft-lg transition-all">
                    <span>Try duty calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="lg" href="/contact">
                    Book a demo
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-green-950 to-green-900 text-white rounded-3xl p-6 md:p-8 shadow-soft-xl border border-green-800/40 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                  
                  {/* Mock Checkout Window */}
                  <div className="space-y-6 relative z-10">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-xs uppercase font-bold text-green-200 tracking-wider">Kassongo Pay Gateway</span>
                      <span className="px-2 py-0.5 bg-yellow-400 text-green-950 text-[10px] font-bold uppercase rounded">Live</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-white/5 rounded-xl p-3.5 border border-white/5">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-yellow-400" />
                          <div>
                            <p className="text-xs text-green-200 uppercase font-bold">Delivery Zone</p>
                            <p className="text-sm font-semibold">Cameroon (CEMAC)</p>
                          </div>
                        </div>
                        <span className="text-[10px] bg-green-850 px-2 py-1 rounded font-bold">Import Duties Auto-Applied</span>
                      </div>
                      
                      <div className="flex justify-between items-center bg-white/5 rounded-xl p-3.5 border border-white/5">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-yellow-400" />
                          <div>
                            <p className="text-xs text-green-200 uppercase font-bold">Local Payment</p>
                            <p className="text-sm font-semibold">Mobile Money (MoMo / Orange)</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-yellow-400">XAF Available</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 border-t border-white/10 pt-4 text-sm text-green-100">
                      <div className="flex justify-between">
                        <span>Cart Total</span>
                        <span>$120</span>
                      </div>
                      <div className="flex justify-between text-yellow-400 font-semibold">
                        <span>Duties & Taxes (Cameroon CEMAC)</span>
                        <span>+ $23.10</span>
                      </div>
                      <div className="flex justify-between text-white font-bold text-lg pt-1">
                        <span>Total Payable</span>
                        <span>FCFA 86,575</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

                <PartnerMarquee />

        {/* Why Choose Checkout Features */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-5xl font-display font-black text-gray-900 tracking-tight">Why merchants choose Checkout</h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                Checkout was built to solve international ecommerce challenges, where trust is hard to earn. From the first moment a shopper lands on your site to the moment their order arrives, every part of our system works together to create a localized, low-friction experience while keeping you in control.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="border border-gray-100 rounded-3xl p-6 shadow-soft space-y-4 bg-gray-50/30">
                <div className="w-10 h-10 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Engage Shoppers with Hello</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Greets customers in their own language and automatically adapts your site to their currency—giving them instant confidence that you ship to their location before they even start browsing.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="border border-gray-100 rounded-3xl p-6 shadow-soft space-y-4 bg-gray-50/30">
                <div className="w-10 h-10 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Stay in Control of Shipping</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Use your preferred carriers and negotiated rates. Our advanced shipment rating provides dimensional weight, cartonization, and custom shipping logic without taking over your operations.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="border border-gray-100 rounded-3xl p-6 shadow-soft space-y-4 bg-gray-50/30">
                <div className="w-10 h-10 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Prevent Restricted Items</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Shipping restricted items leads to customs seizures and delays. We scan catalog data and remove restricted products at checkout, keeping you compliant without unnecessary blanket bans.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="border border-gray-100 rounded-3xl p-6 shadow-soft space-y-4 bg-gray-50/30">
                <div className="w-10 h-10 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Avoid Surprise Fees at Delivery</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Provide duty and tax calculation at checkout and guarantee that no additional costs will be due at delivery. If customs charges more than quoted, we cover the difference.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="border border-gray-100 rounded-3xl p-6 shadow-soft space-y-4 bg-gray-50/30">
                <div className="w-10 h-10 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Stay Compliant without Risk</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  We handle tax registration and remittance, assuming liability for low-value tax schemes like UK VAT, EU IOSS, and others. Grow internationally without global tax overhead.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="border border-gray-100 rounded-3xl p-6 shadow-soft space-y-4 bg-gray-50/30">
                <div className="w-10 h-10 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Protect Against Fraud</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Built-in fraud protection designed specifically for international transactions. We screen orders based on country-specific risk. If a fraudulent order slips through, we cover the loss.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Simple tech stack section */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-2xl md:text-3xl font-display font-black text-gray-900">Simplify your tech stack</h2>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Kassongo eliminates multi-app complexity by consolidating a localized checkout experience, international payment processing, fraud screening, tax compliance, shipping label creation, and commercial invoice management into one streamlined product.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold text-gray-700">
              <div className="p-4 border border-gray-100 rounded-2xl shadow-soft">International Payments</div>
              <div className="p-4 border border-gray-100 rounded-2xl shadow-soft">Fraud Protection</div>
              <div className="p-4 border border-gray-100 rounded-2xl shadow-soft">Landed Cost Engine</div>
              <div className="p-4 border border-gray-100 rounded-2xl shadow-soft">Tax Remittance</div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
