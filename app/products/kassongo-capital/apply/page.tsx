"use client";

import React, { useState, useCallback } from "react";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Button from "../../../../components/Button";
import { Select } from "../../../../components/Select";
import CountrySelector from "../../../../components/tools/CountrySelector";
import {
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  DollarSign,
  Calendar,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Shield,
  Sparkles,
  X,
  Clock,
} from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  businessName: string;
  businessType: string;
  yearEstablished: string;
  taxId: string;
  website: string;
  financingType: "inventory" | "logistics" | "lease";
  requestedAmount: string;
  term: string;
  purpose: string;
  monthlyRevenue: string;
  hasCollateral: string;
  comments: string;
  businessLicense: File | null;
  financialStatements: File | null;
  tradingHistory: File | null;
}

const STEPS = [
  { num: 1, label: "Personal Info", icon: User },
  { num: 2, label: "Business Details", icon: Building2 },
  { num: 3, label: "Financing", icon: DollarSign },
  { num: 4, label: "Documents", icon: FileText },
] as const;

const FINANCING_TYPES = [
  { value: "inventory" as const, label: "Inventory Financing", desc: "Murabaha for inventory" },
  { value: "logistics" as const, label: "Logistics Financing", desc: "Qard Hassan for logistics" },
  { value: "lease" as const, label: "Equipment Lease", desc: "Ijarah for equipment" },
];

const REVENUE_RANGES = [
  { value: "0-10k", label: "$0 - $10,000" },
  { value: "10k-50k", label: "$10,000 - $50,000" },
  { value: "50k-100k", label: "$50,000 - $100,000" },
  { value: "100k-500k", label: "$100,000 - $500,000" },
  { value: "500k+", label: "$500,000+" },
];

const TERM_OPTIONS = [
  { value: "30", label: "30 Days" },
  { value: "60", label: "60 Days" },
  { value: "90", label: "90 Days" },
  { value: "120", label: "120 Days" },
];

const BUSINESS_TYPES = [
  { value: "sole_proprietor", label: "Sole Proprietor" },
  { value: "llc", label: "LLC" },
  { value: "corporation", label: "Corporation" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
];

const DOCUMENTS = [
  { field: "businessLicense" as keyof FormData, label: "Business License or Registration", required: true },
  { field: "financialStatements" as keyof FormData, label: "Financial Statements (Last 6-12 months)", required: false },
  { field: "tradingHistory" as keyof FormData, label: "Trading History or Invoices", required: false },
] as const;

export default function ApplyCapitalPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    businessName: "",
    businessType: "",
    yearEstablished: "",
    taxId: "",
    website: "",
    financingType: "inventory",
    requestedAmount: "",
    term: "90",
    purpose: "",
    monthlyRevenue: "",
    hasCollateral: "",
    comments: "",
    businessLicense: null,
    financialStatements: null,
    tradingHistory: null,
  });

  const updateField = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateField(name as keyof FormData, value as any);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
    const file = e.target.files?.[0] || null;
    updateField(field, file as any);
  };

  const clearFile = (field: keyof FormData) => {
    updateField(field, null as any);
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.country) newErrors.country = "Country is required";
    }

    if (currentStep === 2) {
      if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
      if (!formData.businessType) newErrors.businessType = "Business type is required";
      if (!formData.yearEstablished) newErrors.yearEstablished = "Year established is required";
    }

    if (currentStep === 3) {
      if (!formData.requestedAmount) newErrors.requestedAmount = "Amount is required";
      if (!formData.purpose.trim()) newErrors.purpose = "Purpose is required";
      if (!formData.monthlyRevenue) newErrors.monthlyRevenue = "Monthly revenue is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4) as 1 | 2 | 3 | 4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1) as 1 | 2 | 3 | 4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercent = ((step - 1) / 3) * 100;

  if (isSuccess) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-green-100 selection:text-gray-900">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
          <div className="max-w-2xl w-full bg-white rounded-3xl shadow-lg p-8 md:p-12 text-center space-y-6 border border-gray-100 animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto ring-8 ring-green-50/50">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                Application Submitted!
              </h1>
              <p className="text-gray-600 leading-relaxed max-w-lg mx-auto text-base mt-3">
                Thank you for applying to Kassongo Capital. Our team will review your application and contact you within 2-3 business days.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-6 space-y-4 border border-green-100 text-left">
              <p className="text-xs font-black text-green-900 uppercase tracking-wider">What Happens Next</p>
              <ul className="text-sm text-gray-700 space-y-3">
                {[
                  "Our team reviews your application and documents",
                  "We conduct a preliminary credit assessment",
                  "You'll receive a decision or request for additional information",
                  "Upon approval, funds are disbursed according to the agreed terms",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-green-600" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button variant="primary" href="/" size="lg">Back to Home</Button>
              <Button variant="outline" href="/products/kassongo-capital" size="lg">Learn More</Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-green-100 selection:text-gray-900">
      <Header />

      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="space-y-6">
            <Button
              variant="ghost"
              href="/products/kassongo-capital"
              size="sm"
              className="inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Kassongo Capital
            </Button>
            
            <div className="relative overflow-hidden bg-gradient-to-r from-green-950 to-green-900 rounded-3xl p-8 md:p-12 text-white">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-400 via-green-950 to-green-980" />
              </div>
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-yellow-400/20 border border-yellow-400/30 rounded-full text-yellow-300 text-xs font-bold uppercase tracking-wider shadow-sm mb-4">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Shariah-Compliant Financing</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
                  Apply for Trade Capital
                </h1>
                <p className="text-green-100/90 text-base md:text-lg max-w-2xl leading-relaxed">
                  Complete your application in 4 simple steps. Get ethical financing solutions tailored to grow your international trade business.
                </p>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100">
            <div className="relative">
              {/* Progress Bar */}
              <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full hidden md:block">
                <div
                  className="h-full bg-green-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              
              {/* Steps */}
              <div className="relative flex flex-wrap items-center justify-between gap-4 md:gap-0">
                {STEPS.map((s) => {
                  const Icon = s.icon;
                  const isActive = step === s.num;
                  const isCompleted = step > s.num;

                  return (
                    <div key={s.num} className="flex flex-col items-center gap-2 flex-1 min-w-[80px]">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                          isCompleted
                            ? "bg-green-600 text-white shadow-md"
                            : isActive
                              ? "bg-green-950 text-yellow-400 scale-110 shadow-lg ring-4 ring-green-950/10"
                              : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                      </div>
                      <div className="text-center">
                        <p className={`text-xs font-bold ${isActive ? "text-green-950" : "text-gray-500"}`}>
                          Step {s.num}
                        </p>
                        <p className={`text-xs ${isActive ? "text-green-900 font-bold" : "text-gray-500"}`}>
                          {s.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form Card */}
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm p-6 md:p-8 border border-gray-100 space-y-8">
            
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900">Personal Information</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Tell us about yourself</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="First Name"
                    name="firstName"
                    placeholder="John"
                    icon={User}
                    required
                    value={formData.firstName}
                    error={errors.firstName}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Last Name"
                    name="lastName"
                    placeholder="Doe"
                    required
                    value={formData.lastName}
                    error={errors.lastName}
                    onChange={handleInputChange}
                  />
                </div>

                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  icon={Mail}
                  required
                  value={formData.email}
                  error={errors.email}
                  onChange={handleInputChange}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    icon={Phone}
                    required
                    value={formData.phone}
                    error={errors.phone}
                    onChange={handleInputChange}
                  />
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <CountrySelector
                      value={formData.country}
                      onChange={(code) => updateField("country", code)}
                      placeholder="Select your country"
                    />
                    {errors.country && (
                      <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.country}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Business Information */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900">Business Information</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Tell us about your company</p>
                  </div>
                </div>

                <InputField
                  label="Business Name"
                  name="businessName"
                  placeholder="Your Company LLC"
                  icon={Building2}
                  required
                  value={formData.businessName}
                  error={errors.businessName}
                  onChange={handleInputChange}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="businessType" className="block text-sm font-bold text-gray-700">
                      Business Type <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
                      <Select
                        id="businessType"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className="pl-11"
                      >
                        <option value="">Select Type</option>
                        {BUSINESS_TYPES.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                    {errors.businessType && (
                      <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.businessType}
                      </p>
                    )}
                  </div>

                  <InputField
                    label="Year Established"
                    name="yearEstablished"
                    type="number"
                    placeholder="2020"
                    icon={Calendar}
                    required
                    value={formData.yearEstablished}
                    error={errors.yearEstablished}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Tax ID / EIN"
                    name="taxId"
                    placeholder="12-3456789"
                    icon={FileText}
                    value={formData.taxId}
                    error={errors.taxId}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Website"
                    name="website"
                    type="url"
                    placeholder="https://yourcompany.com"
                    icon={Globe}
                    value={formData.website}
                    error={errors.website}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Financing Details */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900">Financing Details</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Specify your financing needs</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700">
                    Type of Financing <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {FINANCING_TYPES.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => updateField("financingType", type.value)}
                        className={`relative p-5 rounded-xl border-2 transition-all text-left group ${formData.financingType === type.value
                            ? "border-green-600 bg-green-50 shadow-md"
                            : "border-gray-200 hover:border-green-300 hover:shadow-sm"
                          }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 transition-colors ${formData.financingType === type.value
                                ? "border-green-600 bg-green-600"
                                : "border-gray-300 group-hover:border-green-400"
                              }`}
                          >
                            {formData.financingType === type.value && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-gray-900">{type.label}</div>
                            <div className="text-xs text-gray-500 mt-1 leading-relaxed">{type.desc}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Requested Amount"
                    name="requestedAmount"
                    type="number"
                    placeholder="50000"
                    icon={DollarSign}
                    required
                    value={formData.requestedAmount}
                    error={errors.requestedAmount}
                    onChange={handleInputChange}
                  />
                  
                  <div className="space-y-2">
                    <label htmlFor="term" className="block text-sm font-bold text-gray-700">
                      Repayment Term <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
                      <Select
                        id="term"
                        name="term"
                        value={formData.term}
                        onChange={handleInputChange}
                        className="pl-11"
                      >
                        {TERM_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>

                <TextAreaField
                  label="Purpose of Financing"
                  name="purpose"
                  placeholder="Describe how you plan to use the funds..."
                  rows={4}
                  required
                  value={formData.purpose}
                  error={errors.purpose}
                  onChange={handleInputChange}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="monthlyRevenue" className="block text-sm font-bold text-gray-700">
                      Monthly Revenue <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
                      <Select
                        id="monthlyRevenue"
                        name="monthlyRevenue"
                        value={formData.monthlyRevenue}
                        onChange={handleInputChange}
                        className="pl-11"
                      >
                        <option value="">Select Range</option>
                        {REVENUE_RANGES.map((range) => (
                          <option key={range.value} value={range.value}>
                            {range.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                    {errors.monthlyRevenue && (
                      <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.monthlyRevenue}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="hasCollateral" className="block text-sm font-bold text-gray-700">
                      Do you have collateral?
                    </label>
                    <div className="relative">
                      <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
                      <Select
                        id="hasCollateral"
                        name="hasCollateral"
                        value={formData.hasCollateral}
                        onChange={handleInputChange}
                        className="pl-11"
                      >
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Select>
                    </div>
                  </div>
                </div>

                <TextAreaField
                  label="Additional Comments"
                  name="comments"
                  placeholder="Any additional information you'd like to share..."
                  rows={3}
                  value={formData.comments}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {/* Step 4: Documents */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900">Required Documents</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Upload supporting documentation</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-bold mb-2">Document Requirements</p>
                    <ul className="text-xs space-y-1.5 text-blue-800">
                      <li>• All documents must be in PDF, JPEG, or PNG format</li>
                      <li>• Maximum file size: 5MB per document</li>
                      <li>• Documents must be clear and legible</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  {DOCUMENTS.map((doc) => {
                    const file = formData[doc.field] as File | null;
                    return (
                      <div key={doc.field} className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700">
                          {doc.label} {doc.required && <span className="text-red-500">*</span>}
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, doc.field)}
                            className="hidden"
                            id={doc.field}
                          />
                          <label
                            htmlFor={doc.field}
                            className={`flex items-center gap-4 w-full px-6 py-5 border-2 border-dashed rounded-2xl cursor-pointer transition-all group ${file
                                ? "border-green-400 bg-green-50"
                                : "border-gray-300 hover:border-green-400 hover:bg-green-50/50"
                              }`}
                          >
                            <div className={`p-2.5 rounded-xl ${file ? "bg-green-100" : "bg-gray-100 group-hover:bg-green-100"} transition-colors`}>
                              {file ? (
                                <FileText className="w-5 h-5 text-green-600" />
                              ) : (
                                <Upload className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              {file ? (
                                <div>
                                  <p className="font-bold text-green-800 text-sm truncate">{file.name}</p>
                                  <p className="text-xs text-green-600 mt-0.5">{(file.size / 1024).toFixed(1)} KB</p>
                                </div>
                              ) : (
                                <div>
                                  <p className="font-bold text-gray-700 group-hover:text-green-700 text-sm">
                                    Click to upload or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500 mt-0.5">PDF, JPEG, PNG (Max 5MB)</p>
                                </div>
                              )}
                            </div>
                            {file && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  clearFile(doc.field);
                                }}
                                className="p-1.5 hover:bg-green-200 rounded-full transition-colors"
                              >
                                <X className="w-4 h-4 text-green-700" />
                              </button>
                            )}
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-100">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep} className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <Button type="button" variant="primary" onClick={nextStep} className="ml-auto">
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="ml-auto flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>

          {/* Trust Badges */}
          <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100">
            <div className="flex flex-wrap items-center justify-center gap-6 text-center">
              {[
                { icon: Shield, label: "Shariah Compliant" },
                { icon: CheckCircle2, label: "Secure Application" },
                { icon: Clock, label: "Fast Approval" },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-sm text-gray-600">
                  <badge.icon className="w-4 h-4 text-green-700" />
                  <span className="font-bold">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* Reusable Components */

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  required = false,
  value,
  error,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  icon?: React.ElementType;
  required?: boolean;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-bold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`w-full ${Icon ? "pl-11" : "pl-4"} pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-all placeholder:text-gray-400 ${error
              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
              : "border-gray-200 focus:border-green-600"
            }`}
        />
      </div>
      {error && (
        <p id={`${name}-error`} className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function TextAreaField({
  label,
  name,
  placeholder,
  rows = 3,
  required = false,
  value,
  error,
  onChange,
}: {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-bold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-all placeholder:text-gray-400 resize-none ${error
            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
            : "border-gray-200 focus:border-green-600"
          }`}
      />
      {error && (
        <p id={`${name}-error`} className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}