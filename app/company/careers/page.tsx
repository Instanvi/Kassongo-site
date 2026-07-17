"use client";

import React from "react";
import { 
  Users, 
  MapPin, 
  ArrowRight,
  Sparkles, 
  CheckCircle2,
  Heart,
  Globe2,
  Compass
} from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";

export default function CareersPage() {
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
                  <Users className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Kassongo Careers</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tight text-gray-900">
                  Build the future of<br />
                  <span className="text-green-800">global shipping.</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  Join our mission to connect African traders to global suppliers. We are building state-of-the-art trade tools, cargo forwarding systems, and automated customs compliance infrastructure.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button variant="primary" size="lg" href="#openings" className="shadow-soft-lg transition-all">
                    <span>View Open Positions</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="lg" href="/about-us">
                    Our Story
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-green-950 to-green-900 text-white rounded-3xl p-6 md:p-8 shadow-soft-xl border border-green-800/40 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                  
                  <div className="space-y-6 relative z-10">
                    <h3 className="font-display font-black text-lg text-white">Life at Kassongo</h3>
                    
                    <div className="space-y-3 text-xs text-green-100 font-semibold">
                      <div className="flex items-center gap-3">
                        <Globe2 className="w-5 h-5 text-yellow-400 shrink-0" />
                        <span>Remote-first global team (Africa, Europe, Asia)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-yellow-400 shrink-0" />
                        <span>Comprehensive healthcare & pension plans</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Compass className="w-5 h-5 text-yellow-400 shrink-0" />
                        <span>Annual learning and workspace stipends</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits section */}
        <section className="bg-gray-50 py-20 px-6 border-t border-gray-105">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900">Why Work With Us?</h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                We support our team with premium perks so they can focus on shipping global logistics innovation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Remote-First", desc: "Collaborate from wherever you feel most productive, supported by monthly co-working budgets." },
                { title: "Paid Sabbaticals", desc: "Get 4 weeks of paid annual leave plus additional family care and personal wellness breaks." },
                { title: "Equity Options", desc: "We are an employee-owned trade enabler; every team member receives stock option packages." }
              ].map((benefit, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">{benefit.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Openings */}
        <section id="openings" className="bg-white py-20 px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-2xl md:text-3xl font-display font-black text-gray-900">Current Job Openings</h2>
              <p className="text-gray-500 text-sm">Join our growing logistics and software squads.</p>
            </div>
            
            <div className="space-y-4">
              {[
                { title: "Senior Backend Engineer (Logistics & API)", dept: "Engineering", loc: "Remote (Africa / Europe timezone)" },
                { title: "Trade Compliance Specialist", dept: "Operations", loc: "Douala, Cameroon / Hybrid" },
                { title: "Customs Operations Manager", dept: "Operations", loc: "Lagos, Nigeria / Hybrid" },
                { title: "Customer Support Executive (Bilingual FR/EN)", dept: "Customer Success", loc: "Douala, Cameroon / Onsite" }
              ].map((job, idx) => (
                <div key={idx} className="border border-gray-100 rounded-2xl p-5 shadow-soft flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-all">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{job.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 font-semibold">
                      <span>{job.dept}</span>
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        {job.loc}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" href="/contact" className="text-xs py-2">
                    Apply Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="bg-green-950 text-white py-16 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 to-green-950"></div>
          <div className="max-w-2xl mx-auto relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-black">Don't see a matching role?</h2>
            <p className="text-green-200/80 text-sm md:text-base leading-relaxed">
              We are always looking for smart, passionate trade specialists and logisticians. Send us an open application.
            </p>
            <div className="pt-2">
              <Button variant="secondary" size="lg" href="/contact" className="mx-auto shadow-lg">
                Submit Open Application
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
