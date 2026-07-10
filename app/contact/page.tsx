"use client";

import { useState } from "react";
import { Mail, MessageSquare, Clock } from "lucide-react";
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

  const handleSubmit = (e: React.FormEvent) => {
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
        <section className="bg-gradient-soft py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight text-gray-900 mb-4">
              Let's Talk
            </h1>
            <p className="text-xl text-gray-600">
              Have questions about shipping, sourcing, or storage? We're here to help.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Info */}
            <div className="space-y-8">
              
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">Email</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">24/7 email support</p>
                <a href="mailto:hi@kassongomail.com" className="text-green-600 font-semibold hover:underline">
                  hi@kassongomail.com
                </a>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">Response</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Typically within <strong className="text-gray-900">24 hours</strong> on business days
                </p>
              </div>

            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                      Name *
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                      Phone
                    </label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
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
                      <option value="">Choose topic...</option>
                      <option value="general">General Question</option>
                      <option value="shipping">Shipping Info</option>
                      <option value="pricing">Pricing</option>
                      <option value="sourcing">Sourcing Help</option>
                      <option value="storage">Storage</option>
                      <option value="tracking">Tracking</option>
                      <option value="other">Other</option>
                    </Select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="flex w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-all resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <Button variant="secondary" size="lg" type="submit" className="w-full md:w-auto justify-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Send Message
                </Button>

                <p className="text-xs text-gray-500">
                  By submitting, you agree to our <a href="#" className="underline">Privacy Policy</a>.
                </p>

              </form>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
