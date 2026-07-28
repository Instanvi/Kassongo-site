"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Calculator,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Info,
  Globe,
  Download,
  RefreshCw,
} from "lucide-react";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import LandedCostCalculator from "../../../components/tools/LandedCostCalculator";
import HsCodeLookupTab from "../../../components/tools/HsCodeLookupTab";
import PDFReport from "../../../components/tools/PDFReport";
import { COUNTRIES } from "../../../lib/countries";
import { useTranslation } from "../../../lib/i18n/LanguageContext";

// ─── API CONFIGURATION ─────────────────────────────────────────
const API_BASE = "https://new.ntigi.cm/backend/api/v1";
const PUBLIC_API = `${API_BASE}/public/customs`;
const TARIFF_API = `${API_BASE}/tariff`;

// ─── TYPES ─────────────────────────────────────────────────────
interface TariffCountry {
  name: string;
  countryCode: string | null;
  alpha2: string | null;
  numericCode: string;
  dataAvailability: Record<string, unknown>;
}

interface CustomsCountryOption {
  countryCode: string;
  countryName: string | null;
  currency: string;
  estimateUnlockFee: number;
  quotesEnabled: boolean;
  isConfigured: boolean;
}

interface TariffHsCodeMatch {
  code: string;
  description: string | null;
  accuracyRating: number | null;
  accuracyScore: number | null;
  lowestDuty: string | null;
  highestDuty: string | null;
}

interface CustomsEstimateItem {
  title: string;
  hsCode: string;
  origin?: string;
  valueUsd?: number;
  weightKg?: number;
  certificateOfOrigin?: boolean;
  vin?: string;
  isCar?: boolean;
  make?: string;
  model?: string;
  year?: number;
  engineCapacityCc?: number;
  fuelType?: string;
  bodyStyle?: string;
  condition?: string;
  originRegion?: string;
  trim?: string;
}

interface CustomsEstimateLine {
  name: string;
  code: string | null;
  method: "percentage" | "flat";
  basis: "cif" | "fob" | "flat";
  base: number;
  rate: number;
  amount: number;
}

interface CustomsEstimateStage {
  name: string;
  code: string | null;
  lines: CustomsEstimateLine[];
  subtotal: number | null;
  lineCount?: number;
}

interface CustomsEstimate {
  countryCode: string;
  originCountryCode: string;
  destinationCountryCode: string;
  mode: "import" | "export";
  containerType: "fcl" | "lcl";
  certificateOfOrigin: boolean;
  items: CustomsEstimateItem[];
  containerCost: number;
  totalFobUsd: number;
  totalCifXaf?: number;
  totalDuties?: number;
  total: number;
  stages: CustomsEstimateStage[];
  lines: CustomsEstimateLine[];
  missingHsCodes?: string[];
  warning: string | null;
  locked?: boolean;
  previewToken?: string;
  unlockFeeAmount?: number;
  unlockCurrency?: string;
}

// ─── CURRENCY ──────────────────────────────────────────────────
const CURRENCY_SYMBOLS: Record<string, string> = {
  XAF: "FCFA",
  XOF: "FCFA",
  NGN: "₦",
  GHS: "GH¢",
  USD: "$",
  EUR: "€",
  GBP: "£",
  CNY: "¥",
  ZAR: "R",
  KES: "KSh",
  MAD: "DH",
  TND: "DT",
};

function formatCurrency(val: number, curr: string) {
  const fractionDigits = ["XAF", "XOF", "NGN", "KES"].includes(curr) ? 0 : 2;
  return val.toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

// ─── API HELPERS ───────────────────────────────────────────────
async function apiJson<T>(res: Response): Promise<T> {
  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(body.error || body.message || `HTTP ${res.status}`);
  }
  return body.data as T;
}

function CombinedImportToolsContent({ defaultTab = "calculator" }: { defaultTab?: "calculator" | "lookup" }) {
  const { t } = useTranslation();
  const getLineDetails = (line: CustomsEstimateLine) => {
    return t("importTools.rateBasisFormat", {
      rate: line.rate,
      method: line.method === "percentage" ? t("importTools.percentage") : t("importTools.flat"),
      basis: line.basis,
    });
  };
  const searchParams = useSearchParams();
  const resultsRef = useRef<HTMLDivElement>(null);

  // Default active tab: "calculator" or "lookup" based on query param
  const [activeTab, setActiveTab] = useState<"calculator" | "lookup">(defaultTab);

  // Dynamic Country Lists
  const [allCountries, setAllCountries] = useState<TariffCountry[]>([]);
  const [allCountriesLoading, setAllCountriesLoading] = useState(false);
  const [configuredCountries, setConfiguredCountries] = useState<CustomsCountryOption[]>([]);
  const [configuredCountriesLoading, setConfiguredCountriesLoading] = useState(false);

  // Dynamic Exchange Rates
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({ XAF: 1 });
  const [ratesLoading, setRatesLoading] = useState(false);

  // Shared calculation states
  const [estimate, setEstimate] = useState<CustomsEstimate | null>(null);
  const [displayCurrency, setDisplayCurrency] = useState("XAF");
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({});
  const [tariffApiAvailable, setTariffApiAvailable] = useState(true);
  const [tariffApiFallback, setTariffApiFallback] = useState(false);

  // Product selected in HS Lookup tab and sent to calculator
  const [sharedProductToAdd, setSharedProductToAdd] = useState<TariffHsCodeMatch | null>(null);

  // Get initial estimate token from URL search query
  const initialEstimateToken = searchParams.get("estimate");

  // Check query parameters to activate the correct tab on load
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "lookup" || tabParam === "hs-lookup") {
      setActiveTab("lookup");
    } else if (tabParam === "calculator" || tabParam === "duty-calculator") {
      setActiveTab("calculator");
    }
  }, [searchParams]);

  // Load all countries from /tariff/countries
  useEffect(() => {
    async function loadAllCountries() {
      setAllCountriesLoading(true);
      try {
        const res = await fetch(`${TARIFF_API}/countries`);
        const data = await apiJson<{ countries: TariffCountry[] }>(res);
        const sorted = (data.countries || [])
          .filter((c) => c.countryCode || c.alpha2)
          .sort((a, b) => a.name.localeCompare(b.name));
        setAllCountries(sorted);
        setTariffApiAvailable(true);
        setTariffApiFallback(false);
      } catch (err) {
        console.error("Failed to load tariff countries, falling back to static list:", err);
        const fallbackMapped = COUNTRIES.map((c) => ({
          name: c.name,
          countryCode: c.code,
          alpha2: c.code,
          numericCode: "",
          dataAvailability: {},
        }));
        fallbackMapped.sort((a, b) => a.name.localeCompare(b.name));
        setAllCountries(fallbackMapped);
        setTariffApiAvailable(true);
        setTariffApiFallback(true);
      } finally {
        setAllCountriesLoading(false);
      }
    }
    loadAllCountries();
  }, []);

  // Retry loading tariff countries
  const handleRetryCountries = async () => {
    setAllCountriesLoading(true);
    try {
      const res = await fetch(`${TARIFF_API}/countries`);
      const data = await apiJson<{ countries: TariffCountry[] }>(res);
      const sorted = (data.countries || [])
        .filter((c) => c.countryCode || c.alpha2)
        .sort((a, b) => a.name.localeCompare(b.name));
      setAllCountries(sorted);
      setTariffApiFallback(false);
      setTariffApiAvailable(true);
    } catch (err) {
      console.error("Failed to load tariff countries again:", err);
    } finally {
      setAllCountriesLoading(false);
    }
  };

  // Load configured countries from /public/customs/countries
  useEffect(() => {
    async function loadConfiguredCountries() {
      setConfiguredCountriesLoading(true);
      try {
        const res = await fetch(`${PUBLIC_API}/countries`);
        const data = await apiJson<CustomsCountryOption[]>(res);
        setConfiguredCountries(data.filter((c) => c.quotesEnabled && c.isConfigured));
      } catch (err) {
        console.error("Failed to load configured countries:", err);
      } finally {
        setConfiguredCountriesLoading(false);
      }
    }
    loadConfiguredCountries();
  }, []);

  // Fetch exchange rates relative to USD (1 USD = X rates)
  useEffect(() => {
    async function fetchRates() {
      setRatesLoading(true);
      try {
        const cached = localStorage.getItem("KASSONGO_EXCHANGE_RATES");
        const cachedTime = localStorage.getItem("KASSONGO_RATES_TIMESTAMP");
        const now = Date.now();
        if (cached && cachedTime && now - parseInt(cachedTime) < 3600000) {
          setExchangeRates({ XAF: 1, ...JSON.parse(cached) });
          return;
        }
        const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        if (!res.ok) throw new Error("Exchange rates API failed");
        const data = await res.json();
        if (data?.rates) {
          const rates: Record<string, number> = { XAF: 1 };
          Object.keys(CURRENCY_SYMBOLS).forEach((c) => {
            if (data.rates[c]) rates[c] = data.rates[c];
          });
          if (data.rates.XAF) rates.XAF = data.rates.XAF;
          setExchangeRates(rates);
          localStorage.setItem("KASSONGO_EXCHANGE_RATES", JSON.stringify(rates));
          localStorage.setItem("KASSONGO_RATES_TIMESTAMP", now.toString());
        }
      } catch (err) {
        console.error("Exchange rates synchronization failed:", err);
      } finally {
        setRatesLoading(false);
      }
    }
    fetchRates();
  }, []);

  // Action: Print report / Download PDF
  const handleDownloadPDF = () => {
    // Set document title for PDF filename
    const originalTitle = document.title;
    const timestamp = new Date().toISOString().split('T')[0];
    document.title = `Kassongo_Customs_Duty_Certificate_${timestamp}`;
    
    // Trigger print dialog (user can save as PDF)
    window.print();
    
    // Restore original title after a short delay
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  // Convert estimate currencies dynamically
  const xafToDisplay = (amountXaf: number) => {
    const xafPerUsd = exchangeRates.XAF || 600;
    const displayPerUsd = exchangeRates[displayCurrency] || 1;
    return (amountXaf / xafPerUsd) * displayPerUsd;
  };

  const toggleStage = (code: string | null) => {
    if (!code) return;
    setExpandedStages((prev) => ({ ...prev, [code]: !prev[code] }));
  };

  // Scroll to results when calculated
  const handleEstimateCalculated = (est: CustomsEstimate | null) => {
    setEstimate(est);
    if (est) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  };

  const currencySymbol = CURRENCY_SYMBOLS[displayCurrency] || displayCurrency;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-green-100 selection:text-gray-900">
      {/* Dynamic styling override for PDF printing */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            body {
              background: white !important;
              color: black !important;
              margin: 0;
              padding: 0;
            }
            .print\\:hidden, header, footer, nav, button {
              display: none !important;
            }
            main {
              padding-top: 0 !important;
              padding-bottom: 0 !important;
              margin: 0 !important;
            }
            .print\\:block {
              display: block !important;
              page-break-inside: avoid;
            }
            @page {
              size: A4;
              margin: 1.5cm;
            }
            table {
              page-break-inside: avoid;
            }
            h2 {
              page-break-after: avoid;
            }
            /* Ensure colors print correctly */
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
          }
        `
      }} />

      {/* Main Website Header */}
      <div className="print:hidden">
        <Header />
      </div>

      <main className="flex-1 pt-16 print:pt-0">
        {/* Banner Section */}
        <section className="relative py-20 md:py-24 px-6 overflow-hidden bg-green-950 print:hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-400 via-green-950 to-green-980" />
          </div>
          <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-green-900/60 border border-green-800/40 rounded-full text-green-200 text-[10px] font-bold uppercase tracking-wider shadow-sm mx-auto">
              <Globe className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
              <span>{t("importTools.apiBadge")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-white">
              {t("importTools.title").split(" & ")[0]} & <span className="text-yellow-400">{t("importTools.title").split(" & ")[1]}</span>
            </h1>
            <p className="text-sm md:text-base text-green-100/80 max-w-xl mx-auto leading-relaxed">
              {t("importTools.subtitle")}
            </p>
          </div>
        </section>

        {/* Tab Controls and View Container */}
        <section className="py-8 px-4 sm:px-6 max-w-6xl mx-auto print:hidden">

          {/* Premium Pill Tabs Switching Control */}
          <div className="flex justify-center sm:justify-start mb-8">
            <div className="bg-gray-100 p-1.5 rounded-2xl border border-gray-100 inline-flex gap-1 shadow-inner">
              <button
                onClick={() => {
                  setActiveTab("calculator");
                  setEstimate(null);
                }}
                className={`py-3 px-6 text-sm font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "calculator"
                    ? "bg-green-950 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/50"
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>{t("importTools.tabCalculator")}</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab("lookup");
                  setEstimate(null);
                }}
                className={`py-3 px-6 text-sm font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "lookup"
                    ? "bg-green-950 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/50"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>{t("importTools.tabLookup")}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content Column (Form/Search) */}
            <div className={`${estimate ? "lg:col-span-7" : "lg:col-span-12"} transition-all duration-300`}>
              {activeTab === "calculator" ? (
                <LandedCostCalculator
                  publicApiUrl={PUBLIC_API}
                  tariffApiUrl={TARIFF_API}
                  allCountries={allCountries}
                  configuredCountries={configuredCountries}
                  allCountriesLoading={allCountriesLoading}
                  configuredCountriesLoading={configuredCountriesLoading}
                  tariffApiAvailable={tariffApiAvailable}
                  exchangeRates={exchangeRates}
                  ratesLoading={ratesLoading}
                  displayCurrency={displayCurrency}
                  setDisplayCurrency={setDisplayCurrency}
                  currencySymbols={CURRENCY_SYMBOLS}
                  onEstimateCalculated={handleEstimateCalculated}
                  apiJson={apiJson}
                  sharedProductToAdd={sharedProductToAdd}
                  onClearSharedProduct={() => setSharedProductToAdd(null)}
                  initialEstimateToken={initialEstimateToken}
                />
              ) : (
                <HsCodeLookupTab
                  tariffApiUrl={TARIFF_API}
                  tariffApiAvailable={tariffApiAvailable}
                  onAddProductToCalculator={(match) => {
                    setSharedProductToAdd(match);
                    setActiveTab("calculator");
                  }}
                  apiJson={apiJson}
                />
              )}
            </div>

            {/* Right Cost Estimation Results Panel */}
            {estimate && activeTab === "calculator" && (
              <div ref={resultsRef} className="lg:col-span-5 space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider">
                    {t("importTools.landedCostEstimate")}
                  </h3>
                  <button
                    onClick={() => handleEstimateCalculated(null)}
                    className="text-xs font-bold text-gray-450 hover:text-gray-900 cursor-pointer"
                  >
                    {t("importTools.clearResults")}
                  </button>
                </div>

                {/* Grand Total Summary Card */}
                <div className="bg-green-950 rounded-3xl border border-green-900 p-6 text-center text-white shadow-soft-lg">
                  <span className="text-[10px] font-bold text-green-300 uppercase tracking-wider block mb-1">
                    {t("importTools.grandTotalLandedCost", { mode: estimate.mode.toUpperCase() })}
                  </span>
                  <p className="text-3xl md:text-4xl font-black tracking-tight font-mono">
                    {currencySymbol} {formatCurrency(xafToDisplay(estimate.total), displayCurrency)}
                  </p>

                  <div className="mt-4 pt-4 border-t border-green-900 flex items-center justify-between text-xs text-green-200">
                    <span>{t("importTools.msrpFobValue")}</span>
                    <span className="font-mono font-bold">${formatCurrency(estimate.totalFobUsd, "USD")}</span>
                  </div>
                  {estimate.totalCifXaf !== undefined && estimate.mode === "import" && (
                    <div className="flex items-center justify-between text-xs text-green-200 mt-2">
                      <span>{t("importTools.valuationBaseCif")}</span>
                      <span className="font-mono font-bold">
                        {currencySymbol} {formatCurrency(xafToDisplay(estimate.totalCifXaf), displayCurrency)}
                      </span>
                    </div>
                  )}
                </div>

                {/* PDF Download Action Block */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase">
                    <ShieldCheck className="w-4 h-4 text-green-800" />
                    <span>{t("importTools.officialDutyCertificate")}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    {t("importTools.pdfCertificateDesc")}
                  </p>
                  <button
                    type="button"
                    onClick={handleDownloadPDF}
                    className="w-full py-3 bg-green-950 hover:bg-green-900 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t("importTools.downloadCertificatePdf")}</span>
                  </button>
                </div>

                {/* Warnings / Error notifications */}
                {estimate.warning && (
                  <div className="bg-yellow-50 rounded-2xl border border-yellow-200 p-4 flex gap-3 text-xs text-yellow-800">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{estimate.warning}</p>
                  </div>
                )}

                {estimate.missingHsCodes && estimate.missingHsCodes.length > 0 && (
                  <div className="bg-orange-50 rounded-2xl border border-orange-200 p-4 flex gap-3 text-xs text-orange-800">
                    <Info className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">{t("importTools.missingTariffClassifications")}</p>
                      <p className="mt-0.5 leading-relaxed text-orange-700">
                        {t("importTools.missingTariffDesc")}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {estimate.missingHsCodes.map((code) => (
                          <span
                            key={code}
                            className="px-2 py-0.5 bg-orange-100 text-orange-950 font-mono text-[9px] rounded font-bold"
                          >
                            {code}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Stage Breakdown Accordion */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    {t("importTools.breakdownByStage")}
                  </span>
                  {estimate.stages.map((stage) => (
                    <div key={stage.code || stage.name} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs">
                      <button
                        type="button"
                        onClick={() => toggleStage(stage.code)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                            <BarChart3 className="w-4 h-4 text-green-800" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-900">{stage.name}</p>
                            <p className="text-[9px] text-gray-400">{t("importTools.lines", { count: stage.lineCount || stage.lines.length })}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-green-900 font-mono">
                            {currencySymbol} {formatCurrency(xafToDisplay(stage.subtotal || 0), displayCurrency)}
                          </span>
                          {expandedStages[stage.code || ""] ? (
                            <ChevronUp className="w-4 h-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </button>

                      {expandedStages[stage.code || ""] && (
                        <div className="border-t border-gray-100 divide-y divide-gray-50 bg-slate-50/50">
                          {stage.lines.map((line, li) => (
                            <div key={li} className="px-4 py-3 flex items-center justify-between text-xs">
                              <div className="min-w-0 pr-4">
                                <p className="font-bold text-gray-800 truncate">{line.name}</p>
                                <p className="text-[9px] text-gray-450 mt-0.5">
                                  {line.code} · {getLineDetails(line)}
                                </p>
                              </div>
                              <span className="font-bold text-gray-900 font-mono shrink-0">
                                {currencySymbol} {formatCurrency(xafToDisplay(line.amount), displayCurrency)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Flat charges summary */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                      {t("importTools.taxDutyLineItems")}
                    </span>
                  </div>
                  <div className="max-h-56 overflow-y-auto divide-y divide-gray-50">
                    {estimate.lines.map((line, li) => (
                      <div key={li} className="px-4 py-2.5 flex items-center justify-between text-[11px]">
                        <span className="text-gray-600 truncate pr-4">{line.name}</span>
                        <span className="font-bold text-gray-900 font-mono shrink-0">
                          {currencySymbol} {formatCurrency(xafToDisplay(line.amount), displayCurrency)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 bg-green-50 border-t border-green-150 flex items-center justify-between">
                    <span className="text-xs font-black text-green-905">{t("importTools.totalTaxesPayable")}</span>
                    <span className="text-sm font-black text-green-950 font-mono">
                      {currencySymbol} {formatCurrency(xafToDisplay(estimate.total), displayCurrency)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Global Disclaimers Panel */}
        <section className="py-8 px-6 bg-gray-100 border-t border-gray-200 print:hidden">
          <div className="max-w-4xl mx-auto text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gray-400" />
              <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wider">{t("importTools.customsLegalNotice")}</h4>
            </div>
            <p className="text-[10px] text-gray-550 leading-relaxed max-w-2xl mx-auto">
              {t("importTools.legalNoticeDesc")}
            </p>
          </div>
        </section>

        {/* Print-Only Report Container */}
        {estimate && (
          <PDFReport
            estimate={estimate}
            displayCurrency={displayCurrency}
            currencySymbol={currencySymbol}
            xafToDisplay={xafToDisplay}
            formatCurrency={formatCurrency}
          />
        )}
      </main>

      {/* Main Website Footer */}
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}

export default function CombinedImportToolsPage({ defaultTab = "calculator" }: { defaultTab?: "calculator" | "lookup" }) {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-950"></div>
      </div>
    }>
      <CombinedImportToolsContent defaultTab={defaultTab} />
    </Suspense>
  );
}