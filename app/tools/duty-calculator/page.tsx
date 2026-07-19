"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Calculator, 
  ArrowRight, 
  DollarSign, 
  Percent, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Globe, 
  MapPin, 
  Package, 
  TrendingUp, 
  ArrowLeft,
  RefreshCw,
  Coins
} from "lucide-react";
import CountrySelector from "../../../components/tools/CountrySelector";
import HSCodeSearch from "../../../components/tools/HSCodeSearch";
import DocumentScanner from "../../../components/tools/DocumentScanner";
import { calculateDuty, getTradeAgreements, getCurrencyForCountry } from "../../../lib/tariff-data";
import { getCountryByCode } from "../../../lib/countries";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";

// Standard default exchange rates relative to USD (1 USD = X rates)
const DEFAULT_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.78,
  CNY: 7.25,
  XAF: 605.0,  // Central African CFA Franc
  NGN: 1520.0, // Nigerian Naira
  KES: 131.0,  // Kenyan Shilling
  ZAR: 18.2,   // South African Rand
  GHS: 14.5,   // Ghanaian Cedi
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CNY: "¥",
  XAF: "FCFA",
  NGN: "₦",
  KES: "KSh",
  ZAR: "R",
  GHS: "GH¢",
};

const formatCurrency = (val: number, curr: string) => {
  const fractionDigits = ["XAF", "NGN"].includes(curr) ? 0 : 2;
  return val.toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
};

export default function DutyCalculatorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // URL Pre-population
  const initialHS = searchParams.get("hs") || "";

  // Step state: 1 = Route, 2 = Value & HS, 3 = Results
  const [step, setStep] = useState(1);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [hsCode, setHSCode] = useState(initialHS);
  const [hsDescription, setHSDescription] = useState("");
  const [cifValue, setCifValue] = useState("");
  const [inputCurrency, setInputCurrency] = useState("USD");
  const [displayCurrency, setDisplayCurrency] = useState("USD");
  
  // Exchange Rates
  const [rates, setRates] = useState<Record<string, number>>(DEFAULT_RATES);
  const [ratesLoading, setRatesLoading] = useState(false);
  const [ratesUpdated, setRatesUpdated] = useState<string | null>(null);

  // Fetch exchange rates on mount
  useEffect(() => {
    async function fetchRates() {
      setRatesLoading(true);
      try {
        // Check local cache first (expires in 1 hour)
        const cached = localStorage.getItem("KASSONGO_EXCHANGE_RATES");
        const cachedTime = localStorage.getItem("KASSONGO_RATES_TIMESTAMP");
        const now = Date.now();

        if (cached && cachedTime && now - parseInt(cachedTime) < 3600000) {
          setRates(JSON.parse(cached));
          setRatesUpdated(new Date(parseInt(cachedTime)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          setRatesLoading(false);
          return;
        }

        // Try multiple exchange rate APIs in order of preference
        const apis = [
          "https://api.exchangerate-api.com/v4/latest/USD",
          "https://open.er-api.com/v6/latest/USD",
        ];

        let fetchSuccess = false;
        for (const apiUrl of apis) {
          try {
            const res = await fetch(apiUrl, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
              },
            });
            
            if (!res.ok) continue;
            
            const data = await res.json();
            
            if (data && data.rates) {
              const newRates = { ...DEFAULT_RATES };
              // Safely merge our target currencies if they exist in the response
              Object.keys(DEFAULT_RATES).forEach((curr) => {
                if (data.rates[curr]) {
                  newRates[curr] = data.rates[curr];
                }
              });
              
              setRates(newRates);
              localStorage.setItem("KASSONGO_EXCHANGE_RATES", JSON.stringify(newRates));
              localStorage.setItem("KASSONGO_RATES_TIMESTAMP", now.toString());
              setRatesUpdated(new Date(now).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
              fetchSuccess = true;
              break;
            }
          } catch (apiErr) {
            // Continue to next API
            continue;
          }
        }

        if (!fetchSuccess) {
          // Use fallback rates silently
          console.info("Using fallback exchange rates");
        }
      } catch (err) {
        // Silently use fallback rates - no need to alarm the user
        console.info("Using fallback exchange rates");
      } finally {
        setRatesLoading(false);
      }
    }
    fetchRates();
  }, []);

  // Update display currency when destination country changes
  useEffect(() => {
    if (destination) {
      const countryCurr = getCurrencyForCountry(destination);
      setDisplayCurrency(countryCurr);
    }
  }, [destination]);

  // Swapping Route
  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleNextStep = () => {
    if (step === 1 && origin && destination) {
      setStep(2);
    } else if (step === 2 && hsCode && cifValue) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetCalculator = () => {
    setStep(1);
    setOrigin("");
    setDestination("");
    setHSCode("");
    setHSDescription("");
    setCifValue("");
    setInputCurrency("USD");
  };

  // Perform Calculations
  const rawValue = parseFloat(cifValue) || 0;
  
  // Calculate base values in USD
  const inputRate = rates[inputCurrency] || 1;
  const cifUSD = rawValue / inputRate;

  // Run calculation logic (takes USD values as base)
  const calc = calculateDuty(origin, destination, hsCode, cifUSD);
  const agreements = origin && destination ? getTradeAgreements(origin, destination) : [];
  
  // Format outputs into chosen display currency
  const displayRate = rates[displayCurrency] || 1;
  const cifDisplay = cifUSD * displayRate;
  const dutyDisplay = calc.duty * displayRate;
  const vatDisplay = calc.vat * displayRate;
  const totalFeesDisplay = (calc.duty + calc.vat) * displayRate;
  const landedCostDisplay = (cifUSD + calc.duty + calc.vat) * displayRate;

  const originCountry = getCountryByCode(origin);
  const destCountry = getCountryByCode(destination);

  // Percentages for graphical stacked bar chart
  const dutyPercent = landedCostDisplay > 0 ? (dutyDisplay / landedCostDisplay) * 100 : 0;
  const vatPercent = landedCostDisplay > 0 ? (vatDisplay / landedCostDisplay) * 100 : 0;
  const cifPercent = landedCostDisplay > 0 ? (cifDisplay / landedCostDisplay) * 100 : 0;

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-green-100 selection:text-gray-900">
      <Header />

      <main className="flex-1 pt-16 pb-20">
        {/* Banner header */}
        <section className="relative py-16 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-yellow-50 opacity-60"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-900/5 to-transparent"></div>

          <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tight text-gray-900">
              Import Duty <span className="text-green-800">Calculator</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
              Estimate duties, national taxes (VAT), and total landed costs dynamically for standard cargo shipments.
            </p>
          </div>
        </section>

        {/* Wizard Card Container */}
        <div className="max-w-3xl mx-auto px-6 -mt-6 relative z-10">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8 max-w-md mx-auto">
            <div className="flex flex-col items-center gap-1.5 flex-1 relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step >= 1 ? "bg-green-950 text-white shadow-soft" : "bg-gray-100 text-gray-400"
              }`}>1</div>
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Route</span>
              <div className={`absolute top-4 left-[calc(50%+16px)] right-0 h-0.5 transition-all ${step > 1 ? "bg-green-950" : "bg-gray-100"}`} style={{ width: "calc(100% - 32px)" }}></div>
            </div>
            <div className="flex flex-col items-center gap-1.5 flex-1 relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step >= 2 ? "bg-green-950 text-white shadow-soft" : "bg-gray-100 text-gray-400"
              }`}>2</div>
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Value & HS</span>
              <div className={`absolute top-4 left-[calc(50%+16px)] right-0 h-0.5 transition-all ${step > 2 ? "bg-green-950" : "bg-gray-100"}`} style={{ width: "calc(100% - 32px)" }}></div>
            </div>
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step >= 3 ? "bg-green-950 text-white shadow-soft" : "bg-gray-100 text-gray-400"
              }`}>3</div>
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Landed Cost</span>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-gray-100 shadow-xl p-6 md:p-8 space-y-6">
            
            {/* STEP 1: ROUTE SETUP */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-center gap-2 text-green-900 border-b border-gray-100 pb-3">
                  <MapPin className="w-5 h-5 shrink-0" />
                  <h2 className="font-display font-bold text-lg text-gray-950">Step 1: Set Shipment Route</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CountrySelector
                    label="Origin Country (Where shipping from)"
                    value={origin}
                    onChange={(code) => setOrigin(code)}
                    placeholder="e.g. China, United States"
                  />

                  <CountrySelector
                    label="Destination Country (Where shipping to)"
                    value={destination}
                    onChange={(code) => setDestination(code)}
                    placeholder="e.g. Cameroon, Nigeria"
                    exclude={origin ? [origin] : []}
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    disabled={!origin || !destination}
                    onClick={handleNextStep}
                    className="w-full flex items-center justify-center gap-2 bg-green-950 hover:bg-green-905 text-white font-bold py-4 rounded-xl transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                  >
                    <span>Configure Cargo details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: VALUE & HS CODE */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2 text-green-900">
                    <Package className="w-5 h-5 shrink-0" />
                    <h2 className="font-display font-bold text-lg text-gray-950">Step 2: Product & Value</h2>
                  </div>
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="text-xs font-bold text-green-900 hover:text-green-700 flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Route</span>
                  </button>
                </div>

                {/* Display Current Route Map */}
                <div className="bg-gray-50/50 rounded-xl p-3 flex items-center justify-between text-xs font-semibold text-gray-600 border border-gray-100">
                  <span className="flex items-center gap-1.5">
                    <span className={`fi fi-${originCountry?.flag} rounded-xs`} />
                    <span>{originCountry?.name}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                  <span className="flex items-center gap-1.5">
                    <span className={`fi fi-${destCountry?.flag} rounded-xs`} />
                    <span>{destCountry?.name}</span>
                  </span>
                </div>

                {/* Document Scanner - Auto-fill from uploaded documents */}
                <DocumentScanner
                  label="📄 Quick Fill: Upload Invoice/Packing List (Optional)"
                  onDataExtracted={(data) => {
                    // Auto-fill extracted data into form fields
                    if (data.hsCode) {
                      setHSCode(data.hsCode);
                      if (data.productDescription) {
                        setHSDescription(data.productDescription);
                      }
                    }
                    if (data.cifValue) {
                      setCifValue(data.cifValue.toString());
                    }
                    if (data.currency) {
                      setInputCurrency(data.currency);
                    }
                    // Note: Origin/destination already set in Step 1, but could validate here
                  }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* HS Search Component */}
                  <HSCodeSearch
                    label="Search Product / HS Code"
                    value={hsCode}
                    onChange={(code, desc) => { setHSCode(code); setHSDescription(desc); }}
                  />

                  {/* CIF Value Input */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                      CIF Cargo Value
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 select-none pointer-events-none">
                          {CURRENCY_SYMBOLS[inputCurrency] || "$"}
                        </span>
                        <input
                          type="number"
                          value={cifValue}
                          onChange={(e) => setCifValue(e.target.value)}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          className="w-full pl-16 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-700 transition-all"
                        />
                      </div>
                      <select
                        value={inputCurrency}
                        onChange={(e) => setInputCurrency(e.target.value)}
                        className="px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700 cursor-pointer"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="CNY">CNY (¥)</option>
                        <option value="XAF">XAF (FCFA)</option>
                        <option value="NGN">NGN (₦)</option>
                        <option value="KES">KES (KSh)</option>
                        <option value="ZAR">ZAR (R)</option>
                        <option value="GHS">GHS (GH¢)</option>
                      </select>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1.5 leading-relaxed">
                      CIF = Cost of products + Cargo Insurance + Freight/shipping costs.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-xl transition-all border border-gray-200 text-sm cursor-pointer text-center"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!hsCode || !cifValue}
                    onClick={handleNextStep}
                    className="flex-2 bg-green-950 hover:bg-green-905 text-white font-bold py-4 rounded-xl transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Calculate landed cost</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: RESULTS BREAKDOWN */}
            {step === 3 && calc && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2 text-green-900">
                    <TrendingUp className="w-5 h-5 shrink-0" />
                    <h2 className="font-display font-bold text-lg text-gray-950">Landed Cost Summary</h2>
                  </div>
                  <button
                    type="button"
                    onClick={resetCalculator}
                    className="text-xs font-bold text-green-900 hover:text-green-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Reset Calculator</span>
                  </button>
                </div>

                {/* Display summary route badge */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-gray-600 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Shipment Route</span>
                    <span className="flex items-center gap-2 text-gray-900">
                      <span className={`fi fi-${originCountry?.flag} rounded-xs shadow-xs`} />
                      <span>{originCountry?.name}</span>
                      <ArrowRight className="w-3 h-3 text-gray-405 mx-0.5" />
                      <span className={`fi fi-${destCountry?.flag} rounded-xs shadow-xs`} />
                      <span>{destCountry?.name}</span>
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">HS Code / Product</span>
                    <span className="text-gray-950 font-semibold truncate block">
                      {hsCode} — {hsDescription || "Selected Product"}
                    </span>
                  </div>
                </div>

                {/* Live rates exchange badge */}
                <div className="flex items-center justify-between bg-yellow-50/40 rounded-xl px-4 py-2 border border-yellow-100/50 text-[10px] text-yellow-800">
                  <span className="flex items-center gap-1.5">
                    <Coins className="w-3.5 h-3.5 text-yellow-600 shrink-0" />
                    <span>Using exchange rates based in USD. </span>
                  </span>
                  {ratesLoading ? (
                    <span className="text-gray-400 animate-pulse">Syncing exchange rates...</span>
                  ) : ratesUpdated ? (
                    <span>Live converted (sync: {ratesUpdated})</span>
                  ) : (
                    <span>System baseline conversions</span>
                  )}
                </div>

                {/* Interactive stacked breakdown bar */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Landed Cost Composition</span>
                  <div className="h-6 w-full rounded-full overflow-hidden flex shadow-inner bg-gray-100">
                    {cifPercent > 0 && (
                      <div 
                        className="bg-green-800 h-full flex items-center justify-center transition-all" 
                        style={{ width: `${cifPercent}%` }}
                        title={`CIF Value: ${cifPercent.toFixed(1)}%`}
                      />
                    )}
                    {dutyPercent > 0 && (
                      <div 
                        className="bg-yellow-400 h-full flex items-center justify-center transition-all" 
                        style={{ width: `${dutyPercent}%` }}
                        title={`Duty: ${dutyPercent.toFixed(1)}%`}
                      />
                    )}
                    {vatPercent > 0 && (
                      <div 
                        className="bg-red-400 h-full flex items-center justify-center transition-all" 
                        style={{ width: `${vatPercent}%` }}
                        title={`VAT: ${vatPercent.toFixed(1)}%`}
                      />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] font-bold text-gray-500">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-green-800 rounded-sm"></span>
                      <span>CIF Cargo ({cifPercent.toFixed(0)}%)</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-yellow-400 rounded-sm"></span>
                      <span>Customs Duty ({dutyPercent.toFixed(0)}%)</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-red-400 rounded-sm"></span>
                      <span>VAT / GST ({vatPercent.toFixed(0)}%)</span>
                    </span>
                  </div>
                </div>

                {/* Conversion Display Selector */}
                <div className="flex items-center justify-between border-t border-b border-gray-100 py-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Display Currency:</span>
                  <select
                    value={displayCurrency}
                    onChange={(e) => setDisplayCurrency(e.target.value)}
                    className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-700 cursor-pointer"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CNY">CNY (¥)</option>
                    <option value="XAF">XAF (FCFA)</option>
                    <option value="NGN">NGN (₦)</option>
                    <option value="KES">KES (KSh)</option>
                    <option value="ZAR">ZAR (R)</option>
                    <option value="GHS">GHS (GH¢)</option>
                  </select>
                          {/* Math breakdown grids */}
                <div className="space-y-4">
                  {/* Grid 1: Basic values */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">CIF Cargo Value</span>
                      <p className="text-xl font-display font-black text-gray-900 font-mono">
                        {CURRENCY_SYMBOLS[displayCurrency] || displayCurrency} {formatCurrency(cifDisplay, displayCurrency)}
                      </p>
                      <span className="text-[9px] text-gray-400 block mt-0.5">
                        Converted from {CURRENCY_SYMBOLS[inputCurrency] || inputCurrency} {formatCurrency(rawValue, inputCurrency)}
                      </span>
                    </div>

                    <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Duty & Tax Rates</span>
                      <p className="text-xl font-display font-black text-gray-900">
                        {calc.rate.dutyRate}% + {calc.rate.vatRate}%
                      </p>
                      <span className="text-[9px] text-gray-400 block mt-0.5">Customs duty + VAT</span>
                    </div>
                  </div>

                  {/* Details calculations table */}
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-50 shadow-sm">
                    {calc.fees.map((fee, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 text-sm text-gray-600">
                        <span className="flex items-center gap-2">
                          <Percent className="w-4 h-4 text-gray-400" />
                          <span>{fee.name} ({fee.rateLabel})</span>
                        </span>
                        <span className="font-bold text-gray-900 font-mono">
                          {CURRENCY_SYMBOLS[displayCurrency] || displayCurrency} {formatCurrency(fee.amount * displayRate, displayCurrency)}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between p-4 bg-gray-50/20">
                      <span className="text-sm font-semibold text-gray-700">Total Duties & Taxes</span>
                      <span className="font-bold text-gray-955 text-base font-mono">
                        {CURRENCY_SYMBOLS[displayCurrency] || displayCurrency} {formatCurrency(totalFeesDisplay, displayCurrency)}
                      </span>
                    </div>
                  </div>

                  {/* Total Landed Cost Card */}
                  <div className="bg-gradient-to-r from-green-950 to-green-900 text-white rounded-2xl p-6 shadow-soft-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-green-200 uppercase tracking-wider block mb-0.5">Total Estimated Landed Cost</span>
                      <p className="text-3xl font-display font-black text-white font-mono">
                        {CURRENCY_SYMBOLS[displayCurrency] || displayCurrency} {formatCurrency(landedCostDisplay, displayCurrency)}
                      </p>
                      <p className="text-[10px] text-green-200/60 mt-1">
                        Landed Cost = CIF Cargo Value + Duties + VAT
                      </p>
                    </div>        </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                    >
                      Adjust Values
                    </button>
                  </div>
                </div>

                {/* Trade Agreements Notes */}
                {calc.rate.notes && (
                  <div className="bg-yellow-50/50 border border-yellow-100 rounded-2xl p-4 flex gap-3 text-xs text-yellow-800">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Calculators Estimate Notes:</p>
                      <p className="mt-0.5 leading-relaxed text-yellow-700">{calc.rate.notes}</p>
                    </div>
                  </div>
                )}

                {/* Buttons navigation */}
                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={resetCalculator}
                    className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-xl transition-all border border-gray-200 text-sm cursor-pointer text-center"
                  >
                    New Estimate
                  </button>
                  <Button
                    variant="secondary"
                    size="lg"
                    href="/contact?subject=Customs%20Clearance%20Quote"
                    className="flex-2 flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Get expert cargo quote</span>
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Guarantee Section */}
          <div className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center space-y-2">
            <h4 className="font-display font-bold text-sm text-gray-900">Official Customs Disclaimer</h4>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xl mx-auto">
              Customs authorities calculate final values using the HS Code, origin certificates, packaging values, and physical inspection findings. This calculator computes estimates based on global standard rules. Actual duties may vary at destination hubs.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
