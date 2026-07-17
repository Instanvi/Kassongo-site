"use client";

import React from "react";
import { 
  Newspaper, 
  ArrowRight,
  Sparkles, 
  Calendar,
  User,
  ExternalLink
} from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";

export default function NewsroomPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-green-100 selection:text-gray-900">
      <Header />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative bg-white py-20 md:py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-yellow-50 opacity-60"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-green-900 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-soft">
                <Newspaper className="w-3.5 h-3.5 text-yellow-400" />
                <span>Kassongo News & Press</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tight text-gray-900">
                Latest updates from<br />
                <span className="text-green-800">our logistics desk.</span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
                Read press releases, regional route announcements, and updates on how we are leveraging digital tools to empower cross-border African commerce.
              </p>
            </div>
          </div>
        </section>

        {/* Press Releases Grid */}
        <section className="bg-gray-50 py-20 px-6 border-t border-gray-105">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900">Press Releases</h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                Official statements and company news.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Kassongo expands LCL cargo consolidation into Yiwu and Guangzhou",
                  date: "July 12, 2026",
                  author: "Media Relations",
                  desc: "Kassongo increases weekly container dispatches from major Chinese manufacturing hubs to Central Africa by 40% to meet growing peak season merchant demand."
                },
                {
                  title: "Digital customs clearance engine launched for CEMAC region",
                  date: "June 28, 2026",
                  author: "Compliance Team",
                  desc: "Merchants can now estimate exact customs duties and local VAT in XAF (FCFA) in real-time, eliminating surprises and delivery delays at ports."
                },
                {
                  title: "Kassongo partners with local warehouses to enable fast last-mile delivery",
                  date: "May 15, 2026",
                  author: "Partnership Board",
                  desc: "A strategic partnership with domestic fulfillment centers in Douala and Lagos unlocks faster parcel sorting and delivery for import-heavy retail sectors."
                }
              ].map((article, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft flex flex-col justify-between h-80">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-xs text-gray-400 font-semibold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {article.author}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 leading-snug hover:text-green-800 transition-colors cursor-pointer">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                      {article.desc}
                    </p>
                  </div>
                  
                  <a href="/blog" className="flex items-center gap-1 text-xs font-bold text-green-700 hover:text-green-900 transition-colors mt-4 self-start">
                    <span>Read Full Press Release</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Kit Section */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-4xl mx-auto border border-gray-100 rounded-3xl p-6 md:p-8 shadow-soft flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-display font-black text-gray-900">Download Media Kit</h3>
              <p className="text-sm text-gray-500 max-w-md">
                Get high-resolution Kassongo Express logos, wordmarks, brand guidelines, and photos of our global logistics hubs.
              </p>
            </div>
            
            <Button variant="outline" href="/contact" className="flex items-center gap-1 text-sm font-bold shrink-0">
              <span>Request Media Kit</span>
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="bg-green-955 text-white py-16 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 to-green-950"></div>
          <div className="max-w-2xl mx-auto relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-black">For media inquiries</h2>
            <p className="text-green-200/80 text-sm md:text-base leading-relaxed">
              If you are a journalist or industry analyst looking to cover trade developments in West & Central Africa, contact our press desk.
            </p>
            <div className="pt-2">
              <Button variant="secondary" size="lg" href="/contact" className="mx-auto shadow-lg">
                Contact Press Desk
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
