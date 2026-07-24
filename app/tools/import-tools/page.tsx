"use client";

import { useState, useEffect, useRef } from "react";
import {
    Search,
    Calculator,
    ArrowRight,
    Tag,
    Copy,
    CheckCircle,
    Package,
    X,
    MapPin,
    DollarSign,
    Percent,
    AlertTriangle,
    TrendingUp,
    ArrowLeft,
    RefreshCw,
    ChevronDown,
    ChevronUp,
    ShieldCheck,
    BarChart3,
    Truck,
    Info,
    Car,
} from "lucide-react";

// Local mock data (fallback when API is unavailable)
import { HS_CODES, searchHSCodes, getCategories, type HSCode as MockHSCode } from "../../../lib/hs-codes";
import { calculateDuty, getCurrencyForCountry } from "../../../lib/tariff-data";
import { getCountryByCode } from "../../../lib/countries";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CountrySelector from "../../../components/tools/CountrySelector";
import Button from "../../../components/Button";

// ─── API CONFIGURATION ─────────────────────────────────────────
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://new.ntigi.cm/backend/api/v1";

function getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    // Try multiple possible token keys used in the app
    return localStorage.getItem("token") ||
        localStorage.getItem("auth_token") ||
        localStorage.getItem("ntigi_token") ||
        localStorage.getItem("KASSONGO_AUTH_TOKEN") ||
        null;
}

// ─── API TYPES ─────────────────────────────────────────────────
interface ApiHSCode {
    id: string;
    countryCode: string;
    tradeDirection: "IMPORT" | "EXPORT" | "BOTH";
    hsCode: string;
    description: string;
    unitOfMeasurement: string;
    vatRate: string;
    dutyRate: string;
    specialDutyRate: string;
    exportDutyRate: string;
}

interface ImportBreakdown {
    dutyRate: number;
    dutyAmount: number;
    specialDutyRate: number;
    specialDutyAmount: number;
    vatRate: number;
    vatAmount: number;
    bescAmount: number;
    additionalLevies: Array<{ name: string; amount: number }>;
}

interface ExportBreakdown {
    exportDutyRate: number;
    exportDutyAmount: number;
    vatAmount: number;
    additionalLevies: Array<{ name: string; amount: number }>;
    documentationFee: number;
}

interface DepreciationInfo {
    ageYears: number;
    ratePercent: number;
    originalFob: number;
}

interface ApiCalculationResult {
    tradeDirection: "IMPORT" | "EXPORT";
    countryCode: string;
    hsCode: string;
    description: string;
    fob: number;
    depreciationApplied?: DepreciationInfo;
    freight?: number;
    insurance?: number;
    cif?: number;
    importBreakdown?: ImportBreakdown;
    exportBreakdown?: ExportBreakdown;
    totalDuties: number;
}

// ─── EXCHANGE RATES ────────────────────────────────────────────
const DEFAULT_RATES: Record<string, number> = {
    USD: 1.0, EUR: 0.92, GBP: 0.78, CNY: 7.25,
    XAF: 605.0, NGN: 1520.0, KES: 131.0, ZAR: 18.2, GHS: 14.5,
};
const CURRENCY_SYMBOLS: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", CNY: "¥",
    XAF: "FCFA", NGN: "₦", KES: "KSh", ZAR: "R", GHS: "GH¢",
};
const formatCurrency = (val: number, curr: string) => {
    const fractionDigits = ["XAF", "NGN"].includes(curr) ? 0 : 2;
    return val.toLocaleString(undefined, { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits });
};

// Quick search suggestions
const QUICK_SEARCHES = [
    "Umbrellas", "Bicycles", "Beer", "Laptops", "Coffee", "Rice", "Textiles", "Machinery"
];

export default function ImportToolsPage() {
    const calculatorRef = useRef<HTMLDivElement>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    // API state
    const [useApi, setUseApi] = useState(true); // Toggle between API and mock data
    const [apiError, setApiError] = useState<string | null>(null);

    // HS Codes
    const [apiHSCodes, setApiHSCodes] = useState<ApiHSCode[]>([]);
    const [hsCodesLoading, setHsCodesLoading] = useState(false);

    // Calculator state
    const [tradeDirection, setTradeDirection] = useState<"IMPORT" | "EXPORT">("IMPORT");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [selectedHS, setSelectedHS] = useState<ApiHSCode | null>(null);
    const [hsCodeInput, setHsCodeInput] = useState("");
    const [fobValue, setFobValue] = useState("");
    const [weightKg, setWeightKg] = useState("");
    const [port, setPort] = useState("");
    const [freightCost, setFreightCost] = useState("");
    const [insuranceCost, setInsuranceCost] = useState("");
    const [displayCurrency, setDisplayCurrency] = useState("USD");

    // Vehicle state
    const [isVehicle, setIsVehicle] = useState(false);
    const [vin, setVin] = useState("");
    const [vinLoading, setVinLoading] = useState(false);
    const [carDetails, setCarDetails] = useState({
        brand: "", model: "", year: "", engineCapacityCc: ""
    });

    // Results
    const [calcResult, setCalcResult] = useState<ApiCalculationResult | null>(null);
    const [calcLoading, setCalcLoading] = useState(false);
    const [calcError, setCalcError] = useState<string | null>(null);
    const [showBreakdown, setShowBreakdown] = useState(false);

    // Exchange rates
    const [rates, setRates] = useState<Record<string, number>>(DEFAULT_RATES);
    const [ratesLoading, setRatesLoading] = useState(false);

    // ─── FETCH EXCHANGE RATES ──────────────────────────────────
    useEffect(() => {
        async function fetchRates() {
            setRatesLoading(true);
            try {
                const cached = localStorage.getItem("KASSONGO_EXCHANGE_RATES");
                const cachedTime = localStorage.getItem("KASSONGO_RATES_TIMESTAMP");
                const now = Date.now();
                if (cached && cachedTime && now - parseInt(cachedTime) < 3600000) {
                    setRates(JSON.parse(cached));
                    setRatesLoading(false);
                    return;
                }
                const apis = [
                    "https://api.exchangerate-api.com/v4/latest/USD",
                    "https://open.er-api.com/v6/latest/USD",
                ];
                for (const apiUrl of apis) {
                    try {
                        const res = await fetch(apiUrl, { method: 'GET', headers: { 'Accept': 'application/json' } });
                        if (!res.ok) continue;
                        const data = await res.json();
                        if (data && data.rates) {
                            const newRates = { ...DEFAULT_RATES };
                            Object.keys(DEFAULT_RATES).forEach((curr) => {
                                if (data.rates[curr]) newRates[curr] = data.rates[curr];
                            });
                            setRates(newRates);
                            localStorage.setItem("KASSONGO_EXCHANGE_RATES", JSON.stringify(newRates));
                            localStorage.setItem("KASSONGO_RATES_TIMESTAMP", now.toString());
                            break;
                        }
                    } catch { continue; }
                }
            } catch {
                console.info("Using fallback exchange rates");
            } finally {
                setRatesLoading(false);
            }
        }
        fetchRates();
    }, []);

    // ─── FETCH HS CODES FROM API ───────────────────────────────
    useEffect(() => {
        if (!destination || !useApi) {
            setApiHSCodes([]);
            return;
        }

        async function fetchHSCodes() {
            setHsCodesLoading(true);
            setApiError(null);
            try {
                const token = getAuthToken();
                const res = await fetch(
                    `${API_BASE}/customs/hs-codes?countryCode=${destination}&tradeDirection=${tradeDirection}`,
                    {
                        headers: token ? { Authorization: `Bearer ${token}` } : {}
                    }
                );

                if (!res.ok) {
                    if (res.status === 401) {
                        setApiError("Authentication required. Please log in.");
                    } else if (res.status === 403) {
                        setApiError("You do not have permission to access customs data.");
                    } else {
                        setApiError(`API Error: ${res.status}`);
                    }
                    setUseApi(false); // Fall back to mock data
                    return;
                }

                const data = await res.json();
                if (data.success && data.data) {
                    setApiHSCodes(data.data);
                }
            } catch (err) {
                console.error("HS codes fetch error:", err);
                setApiError("Could not connect to customs API. Using local data.");
                setUseApi(false); // Fall back to mock data
            } finally {
                setHsCodesLoading(false);
            }
        }
        fetchHSCodes();
    }, [destination, tradeDirection, useApi]);

    // ─── SEARCH RESULTS (API or Mock) ─────────────────────────
    const searchResults = (() => {
        if (!useApi || apiHSCodes.length === 0) {
            // Use mock data
            if (searchQuery.length <= 1) return [];
            return searchHSCodes(searchQuery).map(h => ({
                id: h.code,
                countryCode: destination || "CMR",
                tradeDirection: "BOTH" as const,
                hsCode: h.code,
                description: h.description,
                unitOfMeasurement: "pcs",
                vatRate: "19.25",
                dutyRate: "10.00",
                specialDutyRate: "0.00",
                exportDutyRate: "0.00",
            }));
        }
        // Use API data
        if (searchQuery.length <= 1) return [];
        return apiHSCodes.filter(h =>
            h.hsCode.includes(searchQuery) ||
            h.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    })();

    // ─── HANDLE COPY ────────────────────────────────────────────
    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    // ─── SELECT PRODUCT ───────────────────────────────────────
    const handleSelectProduct = (item: ApiHSCode) => {
        setSelectedHS(item);
        setHsCodeInput(item.hsCode);
        setSearchQuery(item.description);
        setShowSearchDropdown(false);
        setCalcResult(null);
        setCalcError(null);
        setTimeout(() => {
            calculatorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
    };

    // ─── VIN DECODE ──────────────────────────────────────────
    const handleVinDecode = async () => {
        if (!vin || vin.length < 17) return;
        setVinLoading(true);
        setCalcError(null);
        try {
            const token = getAuthToken();
            const res = await fetch(`${API_BASE}/customs/decode-vin/${vin}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });

            if (!res.ok) throw new Error("VIN decode failed");

            const data = await res.json();
            if (data.success && data.data) {
                const decoded = data.data;
                setCarDetails({
                    brand: decoded.brand || "",
                    model: decoded.model || "",
                    year: String(decoded.year) || "",
                    engineCapacityCc: String(decoded.engineCapacityCc) || ""
                });
                setIsVehicle(true);
            }
        } catch (err) {
            setCalcError("Could not decode VIN. Please enter vehicle details manually.");
        } finally {
            setVinLoading(false);
        }
    };

    // ─── CALCULATE DUTY ──────────────────────────────────────
    const handleCalculate = async () => {
        if (!hsCodeInput || !destination) return;

        setCalcLoading(true);
        setCalcError(null);
        setCalcResult(null);

        // If API is available, use it
        if (useApi) {
            const payload: any = {
                countryCode: destination,
                tradeDirection,
                hsCode: hsCodeInput,
            };

            if (fobValue) payload.fobOverride = parseFloat(fobValue);
            if (weightKg) payload.weightKg = parseFloat(weightKg);
            if (port) payload.port = port;
            if (freightCost) payload.freightCost = parseFloat(freightCost);
            if (insuranceCost) payload.insuranceCost = parseFloat(insuranceCost);

            if (isVehicle) {
                payload.isCar = true;
                if (vin) payload.vin = vin;
                if (carDetails.brand) {
                    payload.carDetails = {
                        brand: carDetails.brand,
                        model: carDetails.model,
                        year: parseInt(carDetails.year) || 0,
                        engineCapacityCc: parseInt(carDetails.engineCapacityCc) || 0,
                    };
                }
            }

            try {
                const token = getAuthToken();
                const res = await fetch(`${API_BASE}/customs/calculate`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token ? { Authorization: `Bearer ${token}` } : {})
                    },
                    body: JSON.stringify(payload),
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || `Calculation failed: ${res.status}`);
                }

                if (data.success && data.data) {
                    setCalcResult(data.data);
                } else {
                    throw new Error(data.message || "Calculation returned no data");
                }
            } catch (err: any) {
                console.error("API calculation error:", err);
                // Fall back to mock calculation
                fallbackToMockCalculation();
            } finally {
                setCalcLoading(false);
            }
        } else {
            // Use mock calculation
            fallbackToMockCalculation();
            setCalcLoading(false);
        }
    };

    // ─── MOCK CALCULATION FALLBACK ─────────────────────────────
    const fallbackToMockCalculation = () => {
        const rawValue = parseFloat(fobValue) || 0;
        const inputRate = rates[displayCurrency] || 1;
        const cifUSD = rawValue / inputRate;

        // Use existing local calculateDuty function
        const mockCalc = calculateDuty(origin, destination, hsCodeInput, cifUSD);

        // Convert to API result shape
        setCalcResult({
            tradeDirection,
            countryCode: destination,
            hsCode: hsCodeInput,
            description: selectedHS?.description || hsCodeInput,
            fob: rawValue,
            cif: cifUSD,
            freight: parseFloat(freightCost) || 0,
            insurance: parseFloat(insuranceCost) || 0,
            importBreakdown: {
                dutyRate: mockCalc.rate.dutyRate,
                dutyAmount: mockCalc.duty,
                specialDutyRate: 0,
                specialDutyAmount: 0,
                vatRate: mockCalc.rate.vatRate,
                vatAmount: mockCalc.vat,
                bescAmount: 0,
                additionalLevies: mockCalc.fees.map(f => ({ name: f.name, amount: f.amount })),
            },
            totalDuties: mockCalc.duty + mockCalc.vat,
        });
    };

    // ─── RESET FORM ────────────────────────────────────────────
    const resetForm = () => {
        setOrigin("");
        setDestination("");
        setSelectedHS(null);
        setHsCodeInput("");
        setFobValue("");
        setWeightKg("");
        setPort("");
        setFreightCost("");
        setInsuranceCost("");
        setCalcResult(null);
        setCalcError(null);
        setIsVehicle(false);
        setVin("");
        setCarDetails({ brand: "", model: "", year: "", engineCapacityCc: "" });
        setSearchQuery("");
        setApiError(null);
    };

    // ─── DISPLAY HELPERS ─────────────────────────────────────
    const displayRate = rates[displayCurrency] || 1;
    const getDisplayAmount = (amount: number) => amount * displayRate;

    const canCalculate = hsCodeInput && destination &&
        (tradeDirection === "EXPORT" || fobValue || isVehicle);

    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-green-100 selection:text-gray-900">
            <Header />

            <main className="flex-1 pt-16">
                {/* Hero Section */}
                <section className="relative py-20 md:py-28 px-6 overflow-hidden bg-green-900">
                    <div className="absolute inset-0 bg-[url('/shipment.jpg')] opacity-5"></div>

                    <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight tracking-tight text-white">
                            Navigate Import Costs<br /> with Confidence
                        </h1>
                        <p className="text-base md:text-lg text-green-100/80 max-w-2xl mx-auto leading-relaxed">
                            Get instant insights on how duties and taxes affect your shipments.
                            Search by product name or HS code to see real-time landed cost estimates.
                        </p>

                        {/* Hero Search Bar */}
                        <div className="max-w-2xl mx-auto mt-8 relative">
                            <div className="relative group">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setShowSearchDropdown(true);
                                    }}
                                    onFocus={() => setShowSearchDropdown(true)}
                                    placeholder="Search products, HS codes, or keywords..."
                                    className="w-full pl-14 pr-12 py-4 bg-white rounded-xl text-base font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/30 transition-all shadow-2xl"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => { setSearchQuery(""); setShowSearchDropdown(false); }}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                                    >
                                        <X className="w-4 h-4 text-gray-600" />
                                    </button>
                                )}
                            </div>

                            {/* Search Dropdown Results */}
                            {showSearchDropdown && searchResults.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 max-h-80 overflow-y-auto">
                                    {searchResults.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => handleSelectProduct(item)}
                                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors text-left border-b border-gray-50 last:border-0"
                                        >
                                            <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-900 text-xs font-bold font-mono rounded shrink-0">
                                                {item.hsCode}
                                            </span>
                                            <div className="flex-1 text-left min-w-0">
                                                <span className="text-sm font-semibold text-gray-800 block truncate">{item.description}</span>
                                                <span className="text-[10px] text-gray-400">
                                                    Duty: {item.dutyRate}% | VAT: {item.vatRate}% | SD: {item.specialDutyRate}%
                                                </span>
                                            </div>
                                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider shrink-0">
                                                {item.tradeDirection}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {hsCodesLoading && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 p-4 text-center z-50">
                                    <span className="text-sm text-gray-500">Loading HS codes from API...</span>
                                </div>
                            )}

                            {/* Quick Search Tags */}
                            <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
                                <span className="text-xs text-green-200/70 font-medium">Try:</span>
                                {QUICK_SEARCHES.map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => {
                                            setSearchQuery(item);
                                            setShowSearchDropdown(true);
                                        }}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-xs font-semibold text-green-100 transition-all cursor-pointer"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* API Status Banner */}
                {apiError && (
                    <section className="px-6 pt-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0" />
                                <p className="text-xs text-yellow-800">{apiError}</p>
                                <button
                                    onClick={() => { setUseApi(true); setApiError(null); }}
                                    className="text-xs font-bold text-yellow-700 hover:text-yellow-900 underline ml-auto"
                                >
                                    Retry
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {/* Calculator Section */}
                <section ref={calculatorRef} className="py-16 px-6 bg-white">
                    <div className="max-w-6xl mx-auto">
                        {/* Section Header with Import/Export Toggle */}
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl md:text-3xl font-display font-black text-gray-900">
                                Import Cost Simulator
                            </h2>
                            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setTradeDirection("IMPORT")}
                                    className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${tradeDirection === "IMPORT"
                                            ? "bg-green-900 text-white"
                                            : "text-gray-600 hover:text-gray-900"
                                        }`}
                                >
                                    IMPORT
                                </button>
                                <button
                                    onClick={() => setTradeDirection("EXPORT")}
                                    className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${tradeDirection === "EXPORT"
                                            ? "bg-green-900 text-white"
                                            : "text-gray-600 hover:text-gray-900"
                                        }`}
                                >
                                    EXPORT
                                </button>
                            </div>
                        </div>

                        {/* Two Column Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* LEFT COLUMN - Calculator Form */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Calculator</h3>
                                    <button
                                        onClick={resetForm}
                                        className="text-xs font-bold text-green-700 hover:text-green-900 border border-green-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                                    >
                                        Reset Form
                                    </button>
                                </div>

                                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
                                    {/* Destination Country */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                            Destination Country
                                        </label>
                                        <CountrySelector
                                            value={destination}
                                            onChange={(code) => {
                                                setDestination(code);
                                                setApiHSCodes([]);
                                                setSelectedHS(null);
                                                setHsCodeInput("");
                                            }}
                                            placeholder="Select destination..."
                                        />
                                    </div>

                                    {/* Product / HS Code */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                            Product or HS Code
                                        </label>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                value={hsCodeInput}
                                                onChange={(e) => {
                                                    setHsCodeInput(e.target.value);
                                                    setSelectedHS(null);
                                                }}
                                                placeholder={destination ? "e.g. 2203.00.00.60" : "Select destination first"}
                                                disabled={!destination}
                                                className="w-full pl-10 pr-10 py-3 bg-white border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                            />
                                            {hsCodeInput && (
                                                <button
                                                    onClick={() => { setHsCodeInput(""); setSelectedHS(null); }}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                                >
                                                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                                                </button>
                                            )}
                                        </div>
                                        {selectedHS && (
                                            <div className="mt-2 px-3 py-2 bg-green-50 rounded-lg border border-green-100">
                                                <p className="text-xs text-green-800 font-semibold">{selectedHS.description}</p>
                                                <p className="text-[10px] text-green-600 mt-0.5">
                                                    Duty: {selectedHS.dutyRate}% | VAT: {selectedHS.vatRate}% | SD: {selectedHS.specialDutyRate}%
                                                </p>
                                            </div>
                                        )}
                                        <button
                                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                            className="text-[11px] text-green-700 hover:text-green-900 font-semibold mt-1.5 cursor-pointer"
                                        >
                                            Search Catalog
                                        </button>
                                    </div>

                                    {/* Vehicle Toggle */}
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <Car className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm font-semibold text-gray-700">This is a vehicle</span>
                                        </div>
                                        <button
                                            onClick={() => setIsVehicle(!isVehicle)}
                                            className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer"
                                            style={{ backgroundColor: isVehicle ? '#064e3b' : '#d1d5db' }}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isVehicle ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>

                                    {/* Vehicle Fields */}
                                    {isVehicle && (
                                        <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                Vehicle Details
                                            </label>

                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={vin}
                                                    onChange={(e) => setVin(e.target.value.toUpperCase())}
                                                    placeholder="Enter VIN (17 characters)"
                                                    maxLength={17}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600"
                                                />
                                                <button
                                                    onClick={handleVinDecode}
                                                    disabled={vin.length < 17 || vinLoading}
                                                    className="px-3 py-2 bg-green-900 text-white text-xs font-bold rounded-lg hover:bg-green-800 disabled:bg-gray-300 transition-colors cursor-pointer"
                                                >
                                                    {vinLoading ? "..." : "Decode"}
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={carDetails.brand}
                                                    onChange={(e) => setCarDetails({ ...carDetails, brand: e.target.value })}
                                                    placeholder="Brand"
                                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600"
                                                />
                                                <input
                                                    type="text"
                                                    value={carDetails.model}
                                                    onChange={(e) => setCarDetails({ ...carDetails, model: e.target.value })}
                                                    placeholder="Model"
                                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600"
                                                />
                                                <input
                                                    type="number"
                                                    value={carDetails.year}
                                                    onChange={(e) => setCarDetails({ ...carDetails, year: e.target.value })}
                                                    placeholder="Year"
                                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600"
                                                />
                                                <input
                                                    type="number"
                                                    value={carDetails.engineCapacityCc}
                                                    onChange={(e) => setCarDetails({ ...carDetails, engineCapacityCc: e.target.value })}
                                                    placeholder="Engine (cc)"
                                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* FOB Value */}
                                    {(!isVehicle || tradeDirection === "EXPORT") && (
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                                {tradeDirection === "IMPORT" ? "FOB Value (USD)" : "Declared FOB Value (USD)"}
                                            </label>
                                            <input
                                                type="number"
                                                value={fobValue}
                                                onChange={(e) => setFobValue(e.target.value)}
                                                placeholder="10000"
                                                min="0"
                                                step="0.01"
                                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                            />
                                        </div>
                                    )}

                                    {/* Weight */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                            Weight (kg) <span className="text-gray-300 font-normal">- Optional</span>
                                        </label>
                                        <input
                                            type="number"
                                            value={weightKg}
                                            onChange={(e) => setWeightKg(e.target.value)}
                                            placeholder="0"
                                            min="0"
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                        />
                                    </div>

                                    {/* Port */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                            Port <span className="text-gray-300 font-normal">- Optional</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={port}
                                            onChange={(e) => setPort(e.target.value)}
                                            placeholder="e.g. Douala, Lagos"
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                        />
                                    </div>

                                    {/* Freight & Insurance (IMPORT only) */}
                                    {tradeDirection === "IMPORT" && (
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                                    Freight <span className="text-gray-300 font-normal">- Opt.</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    value={freightCost}
                                                    onChange={(e) => setFreightCost(e.target.value)}
                                                    placeholder="0"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                                    Insurance <span className="text-gray-300 font-normal">- Opt.</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    value={insuranceCost}
                                                    onChange={(e) => setInsuranceCost(e.target.value)}
                                                    placeholder="0"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Display Currency */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                            Display Currency
                                        </label>
                                        <select
                                            value={displayCurrency}
                                            onChange={(e) => setDisplayCurrency(e.target.value)}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer"
                                        >
                                            {Object.keys(CURRENCY_SYMBOLS).map((c) => (
                                                <option key={c} value={c}>{c} ({CURRENCY_SYMBOLS[c]})</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Error Display */}
                                    {calcError && (
                                        <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2">
                                            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                            <p className="text-xs text-red-700">{calcError}</p>
                                        </div>
                                    )}

                                    {/* Calculate Button */}
                                    <button
                                        onClick={handleCalculate}
                                        disabled={!canCalculate || calcLoading}
                                        className="w-full flex items-center justify-center gap-2 bg-green-950 hover:bg-green-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-md text-sm cursor-pointer"
                                    >
                                        {calcLoading ? (
                                            <>
                                                <RefreshCw className="w-4 h-4 animate-spin" />
                                                <span>Calculating...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Calculator className="w-4 h-4" />
                                                <span>Calculate {tradeDirection === "IMPORT" ? "Landed Cost" : "Export Duties"}</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* RIGHT COLUMN - Results */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Results</h3>
                                </div>

                                {!calcResult ? (
                                    <div className="bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl p-12 text-center space-y-4">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                                            <Calculator className="w-8 h-8 text-gray-300" />
                                        </div>
                                        <div>
                                            <h3 className="font-display font-bold text-base text-gray-700">Cost Estimation Panel</h3>
                                            <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto leading-relaxed">
                                                Fill in the calculator form to see duty rates, taxes, and total landed cost estimates.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4 animate-in fade-in duration-300">
                                        {/* IMPORT Results */}
                                        {calcResult.tradeDirection === "IMPORT" && calcResult.importBreakdown && (
                                            <>
                                                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 text-center">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                                                        Duty Rate
                                                    </span>
                                                    <p className="text-6xl font-display font-black text-green-800">
                                                        {calcResult.importBreakdown.dutyRate}<span className="text-3xl text-green-600">%</span>
                                                    </p>
                                                    {calcResult.importBreakdown.specialDutyRate > 0 && (
                                                        <p className="text-sm text-green-700 mt-1 font-semibold">
                                                            + {calcResult.importBreakdown.specialDutyRate}% Special Duty
                                                        </p>
                                                    )}
                                                    <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                                                        <span className="text-sm font-semibold text-slate-600">Total Duties</span>
                                                        <span className="text-lg font-bold text-green-800 font-mono">
                                                            {CURRENCY_SYMBOLS[displayCurrency]} {formatCurrency(getDisplayAmount(calcResult.totalDuties), displayCurrency)}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* CIF Breakdown */}
                                                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-4">
                                                        CIF Breakdown
                                                    </span>
                                                    <div className="space-y-2">
                                                        {calcResult.depreciationApplied && (
                                                            <div className="flex items-center justify-between text-sm">
                                                                <span className="text-gray-600">Original FOB</span>
                                                                <span className="font-mono text-gray-900">{formatCurrency(calcResult.depreciationApplied.originalFob, displayCurrency)}</span>
                                                            </div>
                                                        )}
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-600">FOB Value</span>
                                                            <span className="font-mono text-gray-900">{formatCurrency(calcResult.fob, displayCurrency)}</span>
                                                        </div>
                                                        {calcResult.freight !== undefined && (
                                                            <div className="flex items-center justify-between text-sm">
                                                                <span className="text-gray-600">Freight</span>
                                                                <span className="font-mono text-gray-900">{formatCurrency(calcResult.freight, displayCurrency)}</span>
                                                            </div>
                                                        )}
                                                        {calcResult.insurance !== undefined && (
                                                            <div className="flex items-center justify-between text-sm">
                                                                <span className="text-gray-600">Insurance</span>
                                                                <span className="font-mono text-gray-900">{formatCurrency(calcResult.insurance, displayCurrency)}</span>
                                                            </div>
                                                        )}
                                                        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                                                            <span className="text-sm font-bold text-gray-900">CIF Total</span>
                                                            <span className="font-bold text-green-800 font-mono">{formatCurrency(calcResult.cif || 0, displayCurrency)}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Depreciation Info */}
                                                {calcResult.depreciationApplied && (
                                                    <div className="bg-yellow-50 rounded-xl border border-yellow-100 p-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Car className="w-4 h-4 text-yellow-700" />
                                                            <span className="text-xs font-bold text-yellow-800 uppercase tracking-wider">Vehicle Depreciation Applied</span>
                                                        </div>
                                                        <p className="text-xs text-yellow-700">
                                                            Age: {calcResult.depreciationApplied.ageYears} years |
                                                            Rate: {calcResult.depreciationApplied.ratePercent}% |
                                                            Original FOB: {formatCurrency(calcResult.depreciationApplied.originalFob, displayCurrency)}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Cost Breakdown */}
                                                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-4">
                                                        Cost Breakdown
                                                    </span>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-600">Import Duty ({calcResult.importBreakdown.dutyRate}%)</span>
                                                            <span className="font-bold text-gray-900 font-mono">{formatCurrency(calcResult.importBreakdown.dutyAmount, displayCurrency)}</span>
                                                        </div>
                                                        {calcResult.importBreakdown.specialDutyAmount > 0 && (
                                                            <div className="flex items-center justify-between text-sm">
                                                                <span className="text-gray-600">Special Duty ({calcResult.importBreakdown.specialDutyRate}%)</span>
                                                                <span className="font-bold text-gray-900 font-mono">{formatCurrency(calcResult.importBreakdown.specialDutyAmount, displayCurrency)}</span>
                                                            </div>
                                                        )}
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-600">VAT ({calcResult.importBreakdown.vatRate}%)</span>
                                                            <span className="font-bold text-gray-900 font-mono">{formatCurrency(calcResult.importBreakdown.vatAmount, displayCurrency)}</span>
                                                        </div>
                                                        {calcResult.importBreakdown.bescAmount > 0 && (
                                                            <div className="flex items-center justify-between text-sm">
                                                                <span className="text-gray-600">BESC Fee</span>
                                                                <span className="font-bold text-gray-900 font-mono">{formatCurrency(calcResult.importBreakdown.bescAmount, displayCurrency)}</span>
                                                            </div>
                                                        )}
                                                        {calcResult.importBreakdown.additionalLevies.map((levy, idx) => (
                                                            <div key={idx} className="flex items-center justify-between text-sm">
                                                                <span className="text-gray-600">{levy.name}</span>
                                                                <span className="font-bold text-gray-900 font-mono">{formatCurrency(levy.amount, displayCurrency)}</span>
                                                            </div>
                                                        ))}
                                                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                                                            <span className="text-sm font-bold text-gray-900">Landed Cost</span>
                                                            <span className="text-xl font-bold text-green-800 font-mono">
                                                                {CURRENCY_SYMBOLS[displayCurrency]} {formatCurrency(getDisplayAmount(calcResult.totalDuties + (calcResult.cif || 0)), displayCurrency)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* EXPORT Results */}
                                        {calcResult.tradeDirection === "EXPORT" && calcResult.exportBreakdown && (
                                            <>
                                                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 text-center">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                                                        Export Duty Rate
                                                    </span>
                                                    <p className="text-6xl font-display font-black text-green-800">
                                                        {calcResult.exportBreakdown.exportDutyRate}<span className="text-3xl text-green-600">%</span>
                                                    </p>
                                                    <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                                                        <span className="text-sm font-semibold text-slate-600">Total Export Charges</span>
                                                        <span className="text-lg font-bold text-green-800 font-mono">
                                                            {CURRENCY_SYMBOLS[displayCurrency]} {formatCurrency(getDisplayAmount(calcResult.totalDuties), displayCurrency)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-4">
                                                        Export Breakdown
                                                    </span>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-600">Declared FOB</span>
                                                            <span className="font-bold text-gray-900 font-mono">{formatCurrency(calcResult.fob, displayCurrency)}</span>
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-600">Export Duty ({calcResult.exportBreakdown.exportDutyRate}%)</span>
                                                            <span className="font-bold text-gray-900 font-mono">{formatCurrency(calcResult.exportBreakdown.exportDutyAmount, displayCurrency)}</span>
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-600">VAT</span>
                                                            <span className="font-bold text-gray-500 font-mono">Zero-rated (0)</span>
                                                        </div>
                                                        {calcResult.exportBreakdown.documentationFee > 0 && (
                                                            <div className="flex items-center justify-between text-sm">
                                                                <span className="text-gray-600">Documentation Fee</span>
                                                                <span className="font-bold text-gray-900 font-mono">{formatCurrency(calcResult.exportBreakdown.documentationFee, displayCurrency)}</span>
                                                            </div>
                                                        )}
                                                        {calcResult.exportBreakdown.additionalLevies.map((levy, idx) => (
                                                            <div key={idx} className="flex items-center justify-between text-sm">
                                                                <span className="text-gray-600">{levy.name}</span>
                                                                <span className="font-bold text-gray-900 font-mono">{formatCurrency(levy.amount, displayCurrency)}</span>
                                                            </div>
                                                        ))}
                                                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                                                            <span className="text-sm font-bold text-gray-900">Total Export Cost</span>
                                                            <span className="text-xl font-bold text-green-800 font-mono">
                                                                {CURRENCY_SYMBOLS[displayCurrency]} {formatCurrency(getDisplayAmount(calcResult.totalDuties + calcResult.fob), displayCurrency)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* Show Cost Breakdown Toggle */}
                                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                                            <button
                                                onClick={() => setShowBreakdown(!showBreakdown)}
                                                className="w-full flex items-center justify-center gap-2 p-3 text-sm font-bold text-green-700 hover:bg-gray-50 transition-colors cursor-pointer"
                                            >
                                                <span>Show Cost Breakdown</span>
                                                {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            </button>
                                            {showBreakdown && calcResult.importBreakdown && (
                                                <div className="border-t border-gray-100 divide-y divide-gray-50 px-4 pb-4">
                                                    <div className="flex items-center justify-between py-3 text-sm text-gray-600">
                                                        <span className="flex items-center gap-2">
                                                            <Percent className="w-4 h-4 text-gray-400" />
                                                            <span>CIF Base</span>
                                                        </span>
                                                        <span className="font-bold text-gray-900 font-mono">{formatCurrency(calcResult.cif || 0, displayCurrency)}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between py-3 text-sm text-gray-600">
                                                        <span className="flex items-center gap-2">
                                                            <Percent className="w-4 h-4 text-gray-400" />
                                                            <span>Duty ({calcResult.importBreakdown.dutyRate}%)</span>
                                                        </span>
                                                        <span className="font-bold text-gray-900 font-mono">{formatCurrency(calcResult.importBreakdown.dutyAmount, displayCurrency)}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between py-3 text-sm text-gray-600">
                                                        <span className="flex items-center gap-2">
                                                            <Percent className="w-4 h-4 text-gray-400" />
                                                            <span>VAT ({calcResult.importBreakdown.vatRate}%)</span>
                                                        </span>
                                                        <span className="font-bold text-gray-900 font-mono">{formatCurrency(calcResult.importBreakdown.vatAmount, displayCurrency)}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Composition Bar */}
                                        {calcResult.importBreakdown && (
                                            <div className="space-y-2">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                                                    Cost Composition
                                                </span>
                                                <div className="h-4 w-full rounded-full overflow-hidden flex bg-gray-100">
                                                    <div
                                                        className="bg-green-800 h-full transition-all"
                                                        style={{ width: `${calcResult.cif && calcResult.totalDuties ? (calcResult.cif / (calcResult.cif + calcResult.totalDuties)) * 100 : 50}%` }}
                                                    />
                                                    <div
                                                        className="bg-yellow-400 h-full transition-all"
                                                        style={{ width: `${calcResult.importBreakdown.dutyAmount / (calcResult.totalDuties + (calcResult.cif || 0)) * 100}%` }}
                                                    />
                                                    <div
                                                        className="bg-red-400 h-full transition-all"
                                                        style={{ width: `${calcResult.importBreakdown.vatAmount / (calcResult.totalDuties + (calcResult.cif || 0)) * 100}%` }}
                                                    />
                                                </div>
                                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-bold text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <span className="w-2.5 h-2.5 bg-green-800 rounded-sm" /> CIF
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <span className="w-2.5 h-2.5 bg-yellow-400 rounded-sm" /> Duty
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <span className="w-2.5 h-2.5 bg-red-400 rounded-sm" /> VAT
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Disclaimer */}
                <section className="py-8 px-6 bg-gray-50 border-t border-gray-100">
                    <div className="max-w-4xl mx-auto text-center space-y-2">
                        <div className="flex items-center justify-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-gray-400" />
                            <h4 className="font-display font-bold text-sm text-gray-900">Official Customs Disclaimer</h4>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed max-w-2xl mx-auto">
                            Customs authorities calculate final values using the HS Code, origin certificates, packaging values, and physical inspection findings. This calculator computes estimates based on global standard rules. Actual duties may vary at destination hubs across Cameroon, Nigeria, and Central Africa.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}