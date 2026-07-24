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
} from "lucide-react";
import { HS_CODES, searchHSCodes, getCategories, type HSCode } from "../../../lib/hs-codes";
import { calculateDuty, getCurrencyForCountry } from "../../../lib/tariff-data";
import { getCountryByCode } from "../../../lib/countries";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CountrySelector from "../../../components/tools/CountrySelector";
import Button from "../../../components/Button";

// Exchange rates
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

// Quick search suggestions (no emojis)
const QUICK_SEARCHES = [
    "Umbrellas", "Bicycles", "Beer", "Laptops", "Coffee", "Rice", "Textiles", "Machinery"
];

export default function ImportToolsPage() {
    const calculatorRef = useRef<HTMLDivElement>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [selectedHS, setSelectedHS] = useState<HSCode | null>(null);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    // Calculator state
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [hsCode, setHSCode] = useState("");
    const [hsDescription, setHSDescription] = useState("");
    const [cifValue, setCifValue] = useState("");
    const [inputCurrency, setInputCurrency] = useState("USD");
    const [displayCurrency, setDisplayCurrency] = useState("USD");
    const [rates, setRates] = useState<Record<string, number>>(DEFAULT_RATES);
    const [ratesLoading, setRatesLoading] = useState(false);
    const [ratesUpdated, setRatesUpdated] = useState<string | null>(null);
    const [showBreakdown, setShowBreakdown] = useState(false);
    const [hasCalculated, setHasCalculated] = useState(false);

    // Search results
    const searchResults = searchQuery.length > 1 ? searchHSCodes(searchQuery) : [];

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const handleSelectProduct = (item: HSCode) => {
        setSelectedHS(item);
        setHSCode(item.code);
        setHSDescription(item.description);
        setSearchQuery(item.description);
        setShowSearchDropdown(false);
        // Auto-scroll to calculator
        setTimeout(() => {
            calculatorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
    };

    // Fetch exchange rates
    useEffect(() => {
        async function fetchRates() {
            setRatesLoading(true);
            try {
                const cached = localStorage.getItem("KASSONGO_EXCHANGE_RATES");
                const cachedTime = localStorage.getItem("KASSONGO_RATES_TIMESTAMP");
                const now = Date.now();
                if (cached && cachedTime && now - parseInt(cachedTime) < 3600000) {
                    setRates(JSON.parse(cached));
                    setRatesUpdated(new Date(parseInt(cachedTime)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
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
                            setRatesUpdated(new Date(now).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
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

    useEffect(() => {
        if (destination) {
            const countryCurr = getCurrencyForCountry(destination);
            setDisplayCurrency(countryCurr);
        }
    }, [destination]);

    const handleCalculate = () => {
        if (hsCode && cifValue && origin && destination) {
            setHasCalculated(true);
        }
    };

    const resetForm = () => {
        setOrigin("");
        setDestination("");
        setHSCode("");
        setHSDescription("");
        setCifValue("");
        setInputCurrency("USD");
        setHasCalculated(false);
        setSelectedHS(null);
        setSearchQuery("");
    };

    // Calculations
    const rawValue = parseFloat(cifValue) || 0;
    const inputRate = rates[inputCurrency] || 1;
    const cifUSD = rawValue / inputRate;
    const calc = calculateDuty(origin, destination, hsCode, cifUSD);
    const displayRate = rates[displayCurrency] || 1;
    const cifDisplay = cifUSD * displayRate;
    const dutyDisplay = calc.duty * displayRate;
    const vatDisplay = calc.vat * displayRate;
    const totalFeesDisplay = (calc.duty + calc.vat) * displayRate;
    const landedCostDisplay = (cifUSD + calc.duty + calc.vat) * displayRate;

    const originCountry = getCountryByCode(origin);
    const destCountry = getCountryByCode(destination);

    const dutyPercent = landedCostDisplay > 0 ? (dutyDisplay / landedCostDisplay) * 100 : 0;
    const vatPercent = landedCostDisplay > 0 ? (vatDisplay / landedCostDisplay) * 100 : 0;
    const cifPercent = landedCostDisplay > 0 ? (cifDisplay / landedCostDisplay) * 100 : 0;

    const canCalculate = origin && destination && hsCode && cifValue;

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
                                            key={item.code}
                                            onClick={() => handleSelectProduct(item)}
                                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors text-left border-b border-gray-50 last:border-0"
                                        >
                                            <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-900 text-xs font-bold font-mono rounded shrink-0">
                                                {item.code}
                                            </span>
                                            <span className="text-sm font-semibold text-gray-800 truncate">{item.description}</span>
                                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider shrink-0 ml-auto">
                                                {item.category}
                                            </span>
                                        </button>
                                    ))}
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

                {/* Calculator Section - Side by Side Layout */}
                <section ref={calculatorRef} className="py-16 px-6 bg-white">
                    <div className="max-w-6xl mx-auto">
                        {/* Section Header */}
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl md:text-3xl font-display font-black text-gray-900">
                                Import Cost Simulator
                            </h2>
                        </div>

                        {/* Two Column Layout: Calculator | Results */}
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
                                    {/* Product / HS Code */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                            Product or HS Code
                                        </label>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                value={hsCode}
                                                onChange={(e) => setHSCode(e.target.value)}
                                                placeholder="e.g. 2203.00.00.60"
                                                className="w-full pl-10 pr-10 py-3 bg-white border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                            />
                                            {hsCode && (
                                                <button
                                                    onClick={() => setHSCode("")}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                                >
                                                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                                                </button>
                                            )}
                                        </div>
                                        {hsDescription && (
                                            <div className="mt-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">
                                                <p className="text-xs text-gray-600">{hsDescription}</p>
                                            </div>
                                        )}
                                        <button
                                            onClick={() => {
                                                window.scrollTo({ top: 0, behavior: "smooth" });
                                            }}
                                            className="text-[11px] text-green-700 hover:text-green-900 font-semibold mt-1.5 cursor-pointer"
                                        >
                                            Open Catalog
                                        </button>
                                    </div>

                                    {/* Shipment Value */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                            Shipment Value (USD)
                                        </label>
                                        <input
                                            type="number"
                                            value={cifValue}
                                            onChange={(e) => setCifValue(e.target.value)}
                                            placeholder="10000"
                                            min="0"
                                            step="0.01"
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                        />
                                    </div>

                                    {/* Country of Origin */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                            Country of Origin
                                        </label>
                                        <CountrySelector
                                            value={origin}
                                            onChange={(code) => setOrigin(code)}
                                            placeholder="Select origin country..."
                                        />
                                    </div>

                                    {/* Destination Country */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                            Destination Country
                                        </label>
                                        <CountrySelector
                                            value={destination}
                                            onChange={(code) => setDestination(code)}
                                            placeholder="Select destination..."
                                            exclude={origin ? [origin] : []}
                                        />
                                    </div>

                                    {/* Currency */}
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

                                    {/* Calculate Button */}
                                    <button
                                        onClick={handleCalculate}
                                        disabled={!canCalculate}
                                        className="w-full flex items-center justify-center gap-2 bg-green-950 hover:bg-green-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-md text-sm cursor-pointer"
                                    >
                                        <Calculator className="w-4 h-4" />
                                        <span>Calculate Landed Cost</span>
                                    </button>
                                </div>
                            </div>

                            {/* RIGHT COLUMN - Results */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Results</h3>
                                </div>

                                {!hasCalculated ? (
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
                                        {/* Duty Rate Big Card */}
                                        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 text-center">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                                                Duty Rate
                                            </span>
                                            <p className="text-6xl font-display font-black text-green-800">
                                                {calc.rate.dutyRate}<span className="text-3xl text-green-600">%</span>
                                            </p>
                                            <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                                                <span className="text-sm font-semibold text-slate-600">Total Duties</span>
                                                <span className="text-lg font-bold text-green-800 font-mono">
                                                    {CURRENCY_SYMBOLS[displayCurrency]} {formatCurrency(totalFeesDisplay, displayCurrency)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Cost Breakdown */}
                                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-4">
                                                Cost Breakdown
                                            </span>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600">Base Cost</span>
                                                    <span className="font-bold text-gray-900 font-mono">
                                                        {CURRENCY_SYMBOLS[displayCurrency]} {formatCurrency(cifDisplay, displayCurrency)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600">Total Duties</span>
                                                    <span className="font-bold text-gray-900 font-mono">
                                                        {CURRENCY_SYMBOLS[displayCurrency]} {formatCurrency(dutyDisplay, displayCurrency)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600">VAT / GST</span>
                                                    <span className="font-bold text-gray-900 font-mono">
                                                        {CURRENCY_SYMBOLS[displayCurrency]} {formatCurrency(vatDisplay, displayCurrency)}
                                                    </span>
                                                </div>
                                                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                                                    <span className="text-sm font-bold text-gray-900">Landed Cost</span>
                                                    <span className="text-xl font-bold text-green-800 font-mono">
                                                        {CURRENCY_SYMBOLS[displayCurrency]} {formatCurrency(landedCostDisplay, displayCurrency)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Show Cost Breakdown Toggle */}
                                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                                            <button
                                                onClick={() => setShowBreakdown(!showBreakdown)}
                                                className="w-full flex items-center justify-center gap-2 p-3 text-sm font-bold text-green-700 hover:bg-gray-50 transition-colors cursor-pointer"
                                            >
                                                <span>Show Cost Breakdown</span>
                                                {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            </button>
                                            {showBreakdown && (
                                                <div className="border-t border-gray-100 divide-y divide-gray-50 px-4 pb-4">
                                                    {calc.fees.map((fee, idx) => (
                                                        <div key={idx} className="flex items-center justify-between py-3 text-sm text-gray-600">
                                                            <span className="flex items-center gap-2">
                                                                <Percent className="w-4 h-4 text-gray-400" />
                                                                <span>{fee.name} ({fee.rateLabel})</span>
                                                            </span>
                                                            <span className="font-bold text-gray-900 font-mono">
                                                                {CURRENCY_SYMBOLS[displayCurrency]} {formatCurrency(fee.amount * displayRate, displayCurrency)}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Composition Bar */}
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                                                Cost Composition
                                            </span>
                                            <div className="h-4 w-full rounded-full overflow-hidden flex bg-gray-100">
                                                {cifPercent > 0 && (
                                                    <div className="bg-green-800 h-full transition-all" style={{ width: `${cifPercent}%` }} />
                                                )}
                                                {dutyPercent > 0 && (
                                                    <div className="bg-yellow-400 h-full transition-all" style={{ width: `${dutyPercent}%` }} />
                                                )}
                                                {vatPercent > 0 && (
                                                    <div className="bg-red-400 h-full transition-all" style={{ width: `${vatPercent}%` }} />
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-bold text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <span className="w-2.5 h-2.5 bg-green-800 rounded-sm" /> Base ({cifPercent.toFixed(0)}%)
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <span className="w-2.5 h-2.5 bg-yellow-400 rounded-sm" /> Duty ({dutyPercent.toFixed(0)}%)
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <span className="w-2.5 h-2.5 bg-red-400 rounded-sm" /> VAT ({vatPercent.toFixed(0)}%)
                                                </span>
                                            </div>
                                        </div>
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