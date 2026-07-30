"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Calculator,
  RefreshCw,
  Plus,
  Trash2,
  AlertTriangle,
  Car,
  Package,
  Boxes,
  Container,
  Ship,
  Plane,
  Search,
  Loader2,
} from "lucide-react";
import VehicleSelector from "./VehicleSelector";
import { useTranslation } from "../../lib/i18n/LanguageContext";

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

interface LandedCostCalculatorProps {
  publicApiUrl: string;
  tariffApiUrl: string;
  allCountries: TariffCountry[];
  configuredCountries: CustomsCountryOption[];
  allCountriesLoading: boolean;
  configuredCountriesLoading: boolean;
  tariffApiAvailable: boolean;
  exchangeRates: Record<string, number>;
  ratesLoading: boolean;
  displayCurrency: string;
  setDisplayCurrency: (c: string) => void;
  currencySymbols: Record<string, string>;
  onEstimateCalculated: (estimate: CustomsEstimate | null) => void;
  apiJson: <T>(res: Response) => Promise<T>;
  sharedProductToAdd: TariffHsCodeMatch | null;
  onClearSharedProduct: () => void;
  initialEstimateToken: string | null;
}

export default function LandedCostCalculator({
  publicApiUrl,
  tariffApiUrl,
  allCountries,
  configuredCountries,
  allCountriesLoading,
  configuredCountriesLoading,
  tariffApiAvailable,
  exchangeRates,
  ratesLoading,
  displayCurrency,
  setDisplayCurrency,
  currencySymbols,
  onEstimateCalculated,
  apiJson,
  sharedProductToAdd,
  onClearSharedProduct,
  initialEstimateToken,
}: LandedCostCalculatorProps) {
  const { t } = useTranslation();
  const formRef = useRef<HTMLDivElement>(null);

  // Core configuration states
  const [mode, setMode] = useState<"import" | "export">("import");
  const [originCountryCode, setOriginCountryCode] = useState("");
  const [destinationCountryCode, setDestinationCountryCode] = useState("");
  const [port, setPort] = useState("");
  const [containerType, setContainerType] = useState<"fcl" | "lcl">("fcl");
  const [certificateOfOrigin, setCertificateOfOrigin] = useState(false);

  // Items
  const [items, setItems] = useState<CustomsEstimateItem[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  // API loading/error states
  const [ports, setPorts] = useState<string[]>([]);
  const [portsLoading, setPortsLoading] = useState(false);
  const [calcLoading, setCalcLoading] = useState(false);
  const [calcError, setCalcError] = useState<string | null>(null);

  // HS Autocomplete search within specific items
  const [itemQuery, setItemQuery] = useState("");
  const [itemResults, setItemResults] = useState<TariffHsCodeMatch[]>([]);
  const [itemSearching, setItemSearching] = useState(false);
  const [itemError, setItemError] = useState<string | null>(null);
  const [showItemDropdown, setShowItemDropdown] = useState(false);

  // Handle shared product added from HS lookup tab
  useEffect(() => {
    if (sharedProductToAdd) {
      const newItem: CustomsEstimateItem = {
        title: sharedProductToAdd.description || sharedProductToAdd.code,
        hsCode: sharedProductToAdd.code,
        valueUsd: undefined,
        weightKg: undefined,
      };
      setItems((prev) => [...prev, newItem]);
      setActiveItemIndex(items.length);
      onClearSharedProduct();
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [sharedProductToAdd, items.length, onClearSharedProduct]);

  // Load preview if token is present in URL
  useEffect(() => {
    if (initialEstimateToken) {
      loadPreview(initialEstimateToken);
    }
  }, [initialEstimateToken]);

  // Fetch ports when configured destination changes (only on import)
  useEffect(() => {
    const configuredCountryCode = mode === "import" ? destinationCountryCode : originCountryCode;
    if (!configuredCountryCode || mode !== "import") {
      setPorts([]);
      setPort("");
      return;
    }

    async function fetchPorts() {
      setPortsLoading(true);
      try {
        const response = await fetch(`${publicApiUrl}/ports?countryCode=${configuredCountryCode}`);
        const data = await apiJson<string[]>(response);
        setPorts(data);
      } catch (err) {
        console.error("Failed to load ports:", err);
        setPorts([]);
      } finally {
        setPortsLoading(false);
      }
    }
    fetchPorts();
  }, [destinationCountryCode, originCountryCode, mode, publicApiUrl]);

  // Sync display currency with destination country currency
  useEffect(() => {
    const configuredCountryCode = mode === "import" ? destinationCountryCode : originCountryCode;
    const country = configuredCountries.find((c) => c.countryCode === configuredCountryCode);
    if (country?.currency && exchangeRates[country.currency] !== undefined) {
      setDisplayCurrency(country.currency);
    } else {
      setDisplayCurrency("XAF");
    }
  }, [destinationCountryCode, originCountryCode, mode, configuredCountries, exchangeRates, setDisplayCurrency]);

  // Debounced search for HS code inside items
  useEffect(() => {
    const trimmed = itemQuery.trim();
    if (!trimmed || trimmed.length < 2) {
      setItemResults([]);
      setItemError(null);
      return;
    }
    const timer = setTimeout(async () => {
      setItemSearching(true);
      setItemError(null);
      try {
        const looksLikeHs = /^[0-9.]{4,}$/.test(trimmed);
        const dest = destinationCountryCode || "CMR";
        const orig = originCountryCode || "CHN";

        const q = new URLSearchParams();
        q.set("dest_country", dest);
        q.set("origin_country", orig);
        const qs = q.toString();

        let res: Response;
        if (looksLikeHs) {
          res = await fetch(`${tariffApiUrl}/by-hscode/${encodeURIComponent(trimmed)}?${qs}`);
        } else {
          const dq = new URLSearchParams({
            description: trimmed,
            dest_country: dest,
            origin_country: orig,
          });
          res = await fetch(`${tariffApiUrl}/by-description?${dq}`);
        }

        const data = await apiJson<{ hsCodes: TariffHsCodeMatch[] }>(res);
        setItemResults(data.hsCodes || (data as any).HSCodes || (data as any).mtechHSCodes || []);
      } catch (err: any) {
        setItemError(err.message || "Failed to search tariff code");
        setItemResults([]);
      } finally {
        setItemSearching(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [itemQuery, destinationCountryCode, originCountryCode, tariffApiUrl, tariffApiAvailable]);

  // Load preview by token
  const loadPreview = async (token: string) => {
    setCalcLoading(true);
    setCalcError(null);
    try {
      const response = await fetch(`${publicApiUrl}/previews/${encodeURIComponent(token)}`);
      const data = await apiJson<CustomsEstimate>(response);
      setMode(data.mode);
      setOriginCountryCode(data.originCountryCode);
      setDestinationCountryCode(data.destinationCountryCode);
      setContainerType(data.containerType);
      setCertificateOfOrigin(data.certificateOfOrigin);
      setItems(data.items);
      onEstimateCalculated(data);
    } catch (err: any) {
      setCalcError(err.message || "Saved estimate preview not found or expired.");
    } finally {
      setCalcLoading(false);
    }
  };

  // Decode VIN callback
  const handleDecodeVin = async (vinStr: string) => {
    const response = await fetch(`${publicApiUrl}/decode-vin/${encodeURIComponent(vinStr.trim())}`);
    return await apiJson<{
      brand: string;
      model: string;
      year: number;
      engineCapacityCc: number;
      category: string;
    }>(response);
  };

  // Action: Add Item
  const handleAddItem = () => {
    const newItem: CustomsEstimateItem = {
      title: "",
      hsCode: "",
      valueUsd: undefined,
      weightKg: undefined,
    };
    setItems((prev) => [...prev, newItem]);
    setActiveItemIndex(items.length);
    setItemQuery("");
    setShowItemDropdown(true);
  };

  // Action: Remove Item
  const handleRemoveItem = (idx: number) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
    if (activeItemIndex === idx) {
      setActiveItemIndex(null);
      setItemQuery("");
    } else if (activeItemIndex !== null && activeItemIndex > idx) {
      setActiveItemIndex(activeItemIndex - 1);
    }
  };

  // Action: Update Item fields
  const handleUpdateItem = (idx: number, patch: Partial<CustomsEstimateItem>) => {
    setItems((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, ...patch } : item))
    );
  };

  // Action: Select HS code auto-complete match
  const handleSelectHS = (idx: number, match: TariffHsCodeMatch) => {
    handleUpdateItem(idx, {
      title: match.description || match.code,
      hsCode: match.code,
    });
    setItemQuery("");
    setShowItemDropdown(false);
    setItemResults([]);
  };

  // Reset Calculator Form
  const handleReset = () => {
    setItems([]);
    setActiveItemIndex(null);
    setOriginCountryCode("");
    setDestinationCountryCode("");
    setPort("");
    setContainerType("fcl");
    setCertificateOfOrigin(false);
    setCalcError(null);
    onEstimateCalculated(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("estimate");
      window.history.replaceState({}, "", url.toString());
    }
  };

  // Execute Calculation API
  const handleCalculate = async () => {
    if (items.length === 0) {
      setCalcError(t("importTools.errAddAtLeastOne"));
      return;
    }
    if (!originCountryCode || !destinationCountryCode) {
      setCalcError(t("importTools.errSelectOriginDest"));
      return;
    }

    // Validation
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (!it.title || !it.hsCode) {
        setCalcError(t("importTools.errMissingDescHs", { index: i + 1 }));
        return;
      }
      // If VIN is present and it is import, value is optional. Otherwise, value is required!
      if ((!it.vin || mode === "export") && (!it.valueUsd || it.valueUsd <= 0)) {
        setCalcError(t("importTools.errMissingValue", { index: i + 1 }));
        return;
      }
    }

    setCalcLoading(true);
    setCalcError(null);
    onEstimateCalculated(null);

    const payload = {
      mode,
      originCountryCode,
      destinationCountryCode,
      containerType,
      certificateOfOrigin,
      items: items.map((it) => ({
        title: it.title,
        hsCode: it.hsCode,
        origin: it.origin || originCountryCode,
        valueUsd: (it.vin && mode === "import") ? undefined : it.valueUsd,
        weightKg: it.weightKg || undefined,
        vin: it.vin || undefined,
        isCar: it.isCar || false,
      })),
    };

    if (mode === "import" && port) {
      Object.assign(payload, { port });
    }

    try {
      const res = await fetch(`${publicApiUrl}/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const estData = await apiJson<CustomsEstimate>(res);
      onEstimateCalculated(estData);

      // Save to URL search params
      if (estData.previewToken && typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("estimate", estData.previewToken);
        window.history.replaceState({}, "", url.toString());
      }
    } catch (err: any) {
      setCalcError(err.message || t("importTools.errCalculationFailed"));
    } finally {
      setCalcLoading(false);
    }
  };

  const isFormValid = items.length > 0 && originCountryCode && destinationCountryCode;

  return (
    <div ref={formRef} className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 print:hidden">
      {/* Mode Selector and Reset Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{t("importTools.calcTitle")}</h2>
          <p className="text-xs text-gray-500">
            {t("importTools.calcSubtitle")}
          </p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="bg-gray-100 rounded-2xl p-1 flex border border-gray-200 shadow-inner-sm">
            <button
              onClick={() => {
                setMode("import");
                handleReset();
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                mode === "import"
                  ? "bg-green-950 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Ship className="w-4 h-4" />
              <span>{t("importTools.import")}</span>
            </button>
            <button
              onClick={() => {
                setMode("export");
                handleReset();
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                mode === "export"
                  ? "bg-green-950 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Plane className="w-4 h-4" />
              <span>{t("importTools.export")}</span>
            </button>
          </div>

          <button
            onClick={handleReset}
            className="text-xs font-bold text-green-900 hover:text-green-850 border border-green-200 px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 bg-white hover:bg-green-50/20"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{t("importTools.reset")}</span>
          </button>
        </div>
      </div>

      {/* Main Form Fields Container */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 space-y-6 shadow-sm">
        {/* Route Selects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Origin Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider">
              {t("importTools.originDispatchCountry")}
            </label>
            {mode === "export" ? (
              <select
                value={originCountryCode}
                onChange={(e) => setOriginCountryCode(e.target.value)}
                disabled={configuredCountriesLoading}
                className="w-full px-4 py-3 bg-white border border-slate-200/60 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer disabled:bg-gray-100"
              >
                <option value="">
                  {configuredCountriesLoading ? t("importTools.loadingConfigured") : t("importTools.selectOriginConfigured")}
                </option>
                {configuredCountries.map((c) => (
                  <option key={c.countryCode} value={c.countryCode}>
                    {c.countryName || c.countryCode} ({c.currency})
                  </option>
                ))}
              </select>
            ) : (
              <select
                value={originCountryCode}
                onChange={(e) => setOriginCountryCode(e.target.value)}
                disabled={allCountriesLoading}
                className="w-full px-4 py-3 bg-white border border-slate-200/60 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer disabled:bg-gray-100"
              >
                <option value="">
                  {allCountriesLoading ? t("importTools.loadingCountries") : t("importTools.selectOriginCountry")}
                </option>
                {allCountries.map((c) => (
                  <option key={c.countryCode || c.alpha2 || ""} value={c.countryCode || c.alpha2 || ""}>
                    {c.name} ({c.countryCode || c.alpha2})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Destination Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider">
              {t("importTools.destinationImportCountry")}
            </label>
            {mode === "import" ? (
              <select
                value={destinationCountryCode}
                onChange={(e) => setDestinationCountryCode(e.target.value)}
                disabled={configuredCountriesLoading}
                className="w-full px-4 py-3 bg-white border border-slate-200/60 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer disabled:bg-gray-100"
              >
                <option value="">
                  {configuredCountriesLoading ? t("importTools.loadingConfigured") : t("importTools.selectDestinationConfigured")}
                </option>
                {configuredCountries.map((c) => (
                  <option key={c.countryCode} value={c.countryCode}>
                    {c.countryName || c.countryCode} ({c.currency})
                  </option>
                ))}
              </select>
            ) : (
              <select
                value={destinationCountryCode}
                onChange={(e) => setDestinationCountryCode(e.target.value)}
                disabled={allCountriesLoading}
                className="w-full px-4 py-3 bg-white border border-slate-200/60 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer disabled:bg-gray-100"
              >
                <option value="">
                  {allCountriesLoading ? t("importTools.loadingCountries") : t("importTools.selectDestinationCountry")}
                </option>
                {allCountries.map((c) => (
                  <option key={c.countryCode || c.alpha2 || ""} value={c.countryCode || c.alpha2 || ""}>
                    {c.name} ({c.countryCode || c.alpha2})
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Port & Container Setup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mode === "import" && (
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider">
                {t("importTools.portOfArrival")} <span className="text-gray-300 font-normal">({t("kassongoCapital.apply.documents.optional")})</span>
              </label>
              <select
                value={port}
                onChange={(e) => setPort(e.target.value)}
                disabled={portsLoading || !destinationCountryCode}
                className="w-full px-4 py-3 bg-white border border-slate-200/60 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer disabled:bg-gray-100"
              >
                <option value="">
                  {portsLoading ? t("importTools.loadingPorts") : t("importTools.applyGlobalPortLevies")}
                </option>
                {ports.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider">
              {t("importTools.containerCargoType")}
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setContainerType("fcl")}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  containerType === "fcl"
                    ? "bg-green-950 text-white border-green-950 shadow-xs"
                    : "bg-white text-gray-700 border-slate-200/60 hover:border-green-600"
                }`}
              >
                <Container className="w-4 h-4" />
                <span>{t("importTools.fullContainerFcl")}</span>
              </button>
              <button
                type="button"
                onClick={() => setContainerType("lcl")}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  containerType === "lcl"
                    ? "bg-green-950 text-white border-green-950 shadow-xs"
                    : "bg-white text-gray-700 border-slate-200/60 hover:border-green-600"
                }`}
              >
                <Boxes className="w-4 h-4" />
                <span>{t("importTools.looseCargoLcl")}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Certificate of Origin Checkbox */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <input
            type="checkbox"
            id="cooCalculator"
            checked={certificateOfOrigin}
            onChange={(e) => setCertificateOfOrigin(e.target.checked)}
            className="w-4.5 h-4.5 text-green-900 rounded border-gray-300 focus:ring-green-600 cursor-pointer"
          />
          <label htmlFor="cooCalculator" className="text-xs font-bold text-gray-700 cursor-pointer select-none">
            {t("importTools.cooAvailable")}
            <span className="block text-[10px] text-gray-400 font-normal mt-0.5">
              {t("importTools.cooDesc")}
            </span>
          </label>
        </div>

        {/* Items Declarations Header */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <span className="text-xs font-black text-gray-500 uppercase tracking-wider">
              {t("importTools.customsDeclarations", { count: items.length })}
            </span>
            <button
              type="button"
              onClick={handleAddItem}
              className="text-xs font-bold text-green-900 hover:text-green-800 bg-green-50 hover:bg-green-100/60 border border-green-200 px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t("importTools.addItem")}</span>
            </button>
          </div>

          {items.length === 0 && (
            <div className="text-center py-10 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
              <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-400">{t("importTools.noItemsConfigured")}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                {t("importTools.noItemsDesc")}
              </p>
            </div>
          )}

          {items.map((item, idx) => (
            <div
              key={idx}
              className={`border rounded-2xl p-4 space-y-4 bg-white transition-all ${
                activeItemIndex === idx
                  ? "border-green-800 ring-4 ring-green-900/5 bg-green-50"
                  : "border-slate-200/50 hover:border-slate-300/50 shadow-soft"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-gray-400 uppercase">
                  {t("importTools.itemDeclarationHeader", { index: idx + 1 })}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(idx)}
                  className="text-gray-400 hover:text-red-600 transition-colors p-1 hover:bg-red-50 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Item HS Search Input autocomplete */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input
                  type="text"
                  value={activeItemIndex === idx ? itemQuery : item.title || item.hsCode || ""}
                  onChange={(e) => {
                    if (activeItemIndex !== idx) setActiveItemIndex(idx);
                    setItemQuery(e.target.value);
                    setShowItemDropdown(true);
                    if (!e.target.value) {
                      handleUpdateItem(idx, { title: "", hsCode: "" });
                    }
                  }}
                  onFocus={() => {
                    setActiveItemIndex(idx);
                    setShowItemDropdown(true);
                  }}
                  placeholder={
                    tariffApiAvailable
                      ? t("importTools.searchPlaceholder")
                      : t("importTools.typeHsCodeManual")
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600"
                />

                {activeItemIndex === idx && showItemDropdown && (itemResults.length > 0 || itemSearching || itemError) && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-150 overflow-hidden z-40 max-h-60 overflow-y-auto">
                    {itemSearching && (
                      <div className="px-4 py-3 flex items-center gap-2 text-xs text-gray-500">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{t("importTools.searchingTariffTable")}</span>
                      </div>
                    )}
                    {itemError && <div className="px-4 py-3 text-xs text-red-600 font-semibold">{itemError}</div>}
                    {!itemSearching && !itemError && itemResults.length === 0 && itemQuery.length >= 2 && (
                      <div className="px-4 py-3 text-xs text-gray-500">{t("importTools.noMatchingHsCode")}</div>
                    )}
                    {itemResults.map((match) => (
                      <button
                        key={match.code}
                        type="button"
                        onClick={() => handleSelectHS(idx, match)}
                        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-green-50 transition-colors text-left border-b border-gray-50 last:border-0"
                      >
                        <span className="px-2 py-0.5 bg-green-150 text-green-950 font-bold font-mono text-[10px] rounded shrink-0">
                          {match.code}
                        </span>
                        <span className="text-xs font-semibold text-gray-800 truncate flex-1">
                          {match.description || match.code}
                        </span>
                        {match.lowestDuty && (
                          <span className="text-[9px] text-gray-400 font-mono shrink-0">
                            ({match.lowestDuty}–{match.highestDuty})
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected code badge */}
              {item.hsCode && (
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-xl border border-green-100">
                  <span className="text-xs font-mono font-black text-green-950 bg-green-150 px-2 py-0.5 rounded">
                    {item.hsCode}
                  </span>
                  <span className="text-xs text-green-900 truncate font-semibold">{item.title}</span>
                </div>
              )}

              {/* Vehicle Checkbox Toggle */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-bold text-gray-700">{t("importTools.isVehicleToggle")}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleUpdateItem(idx, { isCar: !item.isCar })}
                  className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer"
                  style={{ backgroundColor: item.isCar ? "#064e3b" : "#d1d5db" }}
                >
                  <span
                    className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white transition-transform ${
                      item.isCar ? "translate-x-5.5" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Vehicle specifications component integration */}
              {item.isCar && (
                <VehicleSelector
                  vin={item.vin}
                  isCar={item.isCar}
                  onChange={(patch) => handleUpdateItem(idx, patch)}
                  onDecode={handleDecodeVin}
                />
              )}

              {/* General inputs: declared value (USD) and weight */}
              <div className="grid grid-cols-2 gap-4">
                {(!item.isCar || !item.vin || mode === "export") && (
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      {t("importTools.declaredFobValueUsd")}
                    </label>
                    <input
                      type="number"
                      value={item.valueUsd || ""}
                      onChange={(e) =>
                        handleUpdateItem(idx, { valueUsd: parseFloat(e.target.value) || undefined })
                      }
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-slate-200/60 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    {t("importTools.weightKgOptional").split(" (")[0]} <span className="text-gray-300 font-normal">({t("kassongoCapital.apply.documents.optional")})</span>
                  </label>
                  <input
                    type="number"
                    value={item.weightKg || ""}
                    onChange={(e) =>
                      handleUpdateItem(idx, { weightKg: parseFloat(e.target.value) || undefined })
                    }
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2 border border-slate-200/60 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Currency Display Configuration */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
            {t("importTools.conversionDisplayCurrency")}
          </label>
          <div className="flex gap-2 flex-wrap">
            {Object.keys(currencySymbols)
              .filter((c) => exchangeRates[c] !== undefined)
              .map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setDisplayCurrency(c)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    displayCurrency === c
                      ? "bg-green-950 text-white border-green-950 shadow-xs"
                      : "bg-white text-gray-700 border-gray-300 hover:border-green-650"
                  }`}
                >
                  {c} ({currencySymbols[c]})
                </button>
              ))}
          </div>
          {ratesLoading && <span className="text-[10px] text-gray-400 mt-1 block">{t("importTools.updatingRates")}</span>}
        </div>

        {/* Calculator Submission Panel */}
        {calcError && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2 text-red-800">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <p className="text-xs font-bold">{calcError}</p>
          </div>
        )}

        <button
          type="button"
          onClick={handleCalculate}
          disabled={!isFormValid || calcLoading}
          className="w-full py-4 bg-green-950 hover:bg-green-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-md text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          {calcLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>{t("importTools.computingLandedCosts")}</span>
            </>
          ) : (
            <>
              <Calculator className="w-4 h-4" />
              <span>{t("importTools.calculateLandedDutyFees")}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
