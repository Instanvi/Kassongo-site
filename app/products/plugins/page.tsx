"use client";

import React from "react";
import { 
  Puzzle, 
  Layers, 
  Cable, 
  ArrowRight,
  Sparkles, 
  CheckCircle2,
  Code2,
  Cpu,
  UserCheck,
  TrendingUp,
  Mail,
  Award
} from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";

export default function PluginsPage() {
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
                <div className="inline-flex items-center gap-2 bg-green-905 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-soft">
                  <Puzzle className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Become a Partner</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tight text-gray-900">
                  Become a<br />
                  <span className="text-green-800">Kassongo Partner.</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  Join Kassongo in offering retailers best-in-class shipping solutions, pre-calculated customs duties, and localized payment integrations. Build new revenue streams and grow your business within our ecosystem.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button variant="primary" size="lg" href="/contact" className="shadow-soft-lg transition-all">
                    <span>Integrate with Kassongo</span>
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
                    {[
                      { name: "Shopify", desc: "1-Click App installation", status: "Certified App" },
                      { name: "WooCommerce", desc: "WordPress extension", status: "Active Plugin" },
                      { name: "Wix Commerce", desc: "Site app store integration", status: "Active Plugin" },
                      { name: "Custom API", desc: "REST & GraphQL protocols", status: "Developer Ready" },
                    ].map((plugin) => (
                      <div key={plugin.name} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-soft flex flex-col justify-between h-28">
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

        {/* Ecosystem Categories */}
        <section id="ecosystem" className="bg-gray-50 py-20 px-6 border-t border-gray-200">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-green-805 bg-green-50 px-3 py-1 rounded-full">Ecosystem</span>
              <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900">A Preferred E-commerce Partner Ecosystem</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                We bring together technology, carriers, and agencies to power shipping and compliance for leading retail brands.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Category 1 */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Technology Partners</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Software and platforms integrated with Kassongo to offer a comprehensive, seamless stack for retailers.
                  </p>
                </div>
                <Button variant="outline" size="sm" href="/contact" className="mt-4 self-start">Learn More</Button>
              </div>

              {/* Category 2 */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Carrier Partners</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    An international, national, and local carrier network helping you ship and track e-commerce packages easily.
                  </p>
                </div>
                <Button variant="outline" size="sm" href="/contact" className="mt-4 self-start">Learn More</Button>
              </div>

              {/* Category 3 */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Fulfillment Partners</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Fulfillment and 3PL warehouses that use Kassongo shipping services to provide a seamless warehousing flow.
                  </p>
                </div>
                <Button variant="outline" size="sm" href="/contact" className="mt-4 self-start">Learn More</Button>
              </div>

              {/* Category 4 */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-905">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Solutions Partners</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Agencies, designers, and consultants geared toward helping businesses scale cross-border sales and logistics.
                  </p>
                </div>
                <Button variant="outline" size="sm" href="/contact" className="mt-4 self-start">Learn More</Button>
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

        {/* Case Studies */}
        <section className="bg-gray-55 py-20 px-6 border-t border-gray-200">
          <div className="max-w-7xl mx-auto space-y-12">
            <h2 className="text-2xl md:text-3xl font-display font-black text-center text-gray-900">Partner Case Studies</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  partner: "Weebly", 
                  desc: "Weebly and Kassongo are tightly integrated to create a seamless checkout and automated shipping experience directly inside Weebly's online store builder." 
                },
                { 
                  partner: "Mercari", 
                  desc: "Mercari sought a reliable partner to simplify the cross-border delivery and duty application process as they expanded their community marketplace internationally." 
                },
                { 
                  partner: "Sellbrite", 
                  desc: "Sellbrite multichannel inventory management partnered with us to generate a new, lucrative shipping revenue stream that they did not have before." 
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-soft flex flex-col justify-between h-56">
                  <div className="space-y-3">
                    <span className="text-sm font-bold text-green-905">{item.partner}</span>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                  <a href="/blog" className="text-xs font-bold text-green-700 hover:text-green-900 flex items-center gap-1 self-start mt-4">
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Referral Box */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-4xl mx-auto bg-green-50/50 rounded-3xl p-8 border border-green-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-soft">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-900">Have a Client for Kassongo?</h3>
              <p className="text-xs text-gray-500 max-w-md">
                Submit a client referral, and one of our dedicated partner managers will reach out to support their shipping and custom clearance setup.
              </p>
            </div>
            <Button variant="primary" href="mailto:partnerships@kassongo.com" className="flex items-center gap-2 text-xs py-3">
              <Mail className="w-4 h-4" />
              <span>Submit Lead</span>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
