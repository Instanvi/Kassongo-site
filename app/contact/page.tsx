"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import Button from "../../components/Button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thank you for reaching out! We'll get back to you within 24 hours.", {
      duration: 4000,
      position: "top-center",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Toaster />
      <Header />

      <main className="flex-1 pt-16">
        
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-green-50 via-white to-yellow-50 py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-green-900/5 to-transparent"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight text-gray-900 mb-6">
              Get In Touch
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Have questions about shipping, sourcing, or storage? Our team is ready to help you get started.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
              {/* Contact Info Cards */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Email Card */}
                <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-200 hover:shadow-card-hover transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-900 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Email Us</h3>
                      <p className="text-sm text-gray-600 mb-3">Send us a message anytime</p>
                      <a 
                        href="mailto:support@kassongo.com" 
                        className="text-green-600 font-semibold hover:text-green-700 transition-colors inline-flex items-center gap-1 text-sm"
                      >
                        support@kassongo.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-200 hover:shadow-card-hover transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-900 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Call Us</h3>
                      <p className="text-sm text-gray-600 mb-3">Mon-Fri, 9am-6pm EST</p>
                      <a 
                        href="tel:+12345678900" 
                        className="text-green-600 font-semibold hover:text-green-700 transition-colors inline-flex items-center gap-1 text-sm"
                      >
                        +1 (234) 567-8900
                      </a>
                    </div>
                  </div>
                </div>

                {/* Response Time Card */}
                <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-200 hover:shadow-card-hover transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-900 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Response Time</h3>
                      <p className="text-sm text-gray-600">
                        We typically respond within <span className="font-semibold text-gray-900">24 hours</span> during business days
                      </p>
                    </div>
                  </div>
                </div>

                {/* Office Location Card */}
                <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-200 hover:shadow-card-hover transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-900 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Headquarters</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        123 Freight Avenue<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-card border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                  <p className="text-sm text-gray-600 mb-8">Fill out the form below and we'll get back to you soon.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                          Full Name *
                        </label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                          Subject *
                        </label>
                        <Select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a topic...</option>
                          <option value="general">General Inquiry</option>
                          <option value="shipping">Shipping Questions</option>
                          <option value="pricing">Pricing & Plans</option>
                          <option value="sourcing">Sourcing Assistance</option>
                          <option value="storage">Storage Services</option>
                          <option value="tracking">Track Shipment</option>
                          <option value="technical">Technical Support</option>
                          <option value="other">Other</option>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={7}
                        className="flex w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-all resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                      <p className="text-xs text-gray-500">
                        By submitting, you agree to our <a href="#" className="underline hover:text-gray-700">Privacy Policy</a>
                      </p>
                      
                      <Button 
                        variant="secondary" 
                        size="lg" 
                        type="submit" 
                        className="w-full sm:w-auto justify-center shadow-soft-lg hover:shadow-soft-xl transition-all"
                      >
                        <Send className="w-5 h-5" />
                        Send Message
                      </Button>
                    </div>

                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
