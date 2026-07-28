"use client";

import React, { useState, useEffect } from "react";
import { Search, Loader2, Tag, ChevronRight, Copy, CheckCircle, Calculator, HelpCircle, RefreshCw } from "lucide-react";
import { useTranslation } from "../../lib/i18n/LanguageContext";

interface TariffHsCodeMatch {
  code: string;
  description: string | null;
  accuracyRating: number | null;
  accuracyScore: number | null;
  lowestDuty: string | null;
  highestDuty: string | null;
}

interface HsCodeLookupTabProps {
  tariffApiUrl: string;
  destinationCountryCode?: string;
  originCountryCode?: string;
  tariffApiAvailable: boolean;
  onAddProductToCalculator: (product: TariffHsCodeMatch) => void;
  apiJson: <T>(res: Response) => Promise<T>;
}

// Custom debounce hook for inside the tab
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function HsCodeLookupTab({
  tariffApiUrl,
  destinationCountryCode,
  originCountryCode,
  tariffApiAvailable,
  onAddProductToCalculator,
  apiJson,
}: HsCodeLookupTabProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const [results, setResults] = useState<TariffHsCodeMatch[]>([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedHS, setSelectedHS] = useState<TariffHsCodeMatch | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [retryTrigger, setRetryTrigger] = useState(0);

  // Debounced Search Execution
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.trim().length < 2) {
      setResults([]);
      setError(null);
      return;
    }

    async function executeLookup() {
      setSearching(true);
      setError(null);
      try {
        const normalizedQuery = debouncedQuery.trim();
        const looksLikeHs = /^[0-9.]{4,}$/.test(normalizedQuery);

        const dest = destinationCountryCode || "CMR";
        const orig = originCountryCode || "CHN";

        const qParams = new URLSearchParams();
        qParams.set("dest_country", dest);
        qParams.set("origin_country", orig);
        const queryString = qParams.toString();

        let response: Response;
        if (looksLikeHs) {
          response = await fetch(
            `${tariffApiUrl}/by-hscode/${encodeURIComponent(normalizedQuery)}?${queryString}`
          );
        } else {
          const dq = new URLSearchParams({
            description: normalizedQuery,
            dest_country: dest,
            origin_country: orig,
          });
          response = await fetch(`${tariffApiUrl}/by-description?${dq}`);
        }

        if (response.status === 503) {
          throw new Error(t("importTools.errTariffServiceOverloaded"));
        }

        const resData = await apiJson<{ hsCodes: TariffHsCodeMatch[] }>(response);
        setResults(resData.hsCodes || (resData as any).HSCodes || (resData as any).mtechHSCodes || []);
      } catch (err: any) {
        console.error(err);
        setError(err.message || t("importTools.errSearchFailed"));
        setResults([]);
      } finally {
        setSearching(false);
      }
    }

    executeLookup();
  }, [debouncedQuery, destinationCountryCode, originCountryCode, tariffApiUrl, tariffApiAvailable, retryTrigger]);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getMatchLabel = (rating: number | null) => {
    if (rating === 1 || rating === null) return { text: t("importTools.matchBest"), style: "bg-green-100 text-green-900 border-green-200" };
    if (rating === 2) return { text: t("importTools.matchGood"), style: "bg-blue-100 text-blue-900 border-blue-200" };
    if (rating === 3) return { text: t("importTools.matchFair"), style: "bg-yellow-100 text-yellow-900 border-yellow-250" };
    return { text: t("importTools.matchPossible"), style: "bg-gray-150 text-gray-700 border-gray-250" };
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Search Input Bar */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">{t("importTools.directoryTitle")}</h2>
          <p className="text-xs text-gray-500">
            {t("importTools.directorySubtitle")}
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedHS(null);
            }}
            placeholder={t("importTools.searchDirectoryPlaceholder")}
            className="w-full pl-12 pr-10 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-base font-semibold focus:outline-none focus:ring-2 focus:ring-green-700 focus:bg-white transition-all shadow-inner"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setResults([]);
                setSelectedHS(null);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              <span className="text-xs font-semibold text-gray-600 block leading-none px-1">{t("importTools.clear")}</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid Results Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Results List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              {searching ? t("importTools.searchingDatabase") : t("importTools.productMatches", { count: results.length })}
            </span>
          </div>

          {searching && (
            <div className="p-12 text-center bg-gray-50/50 border border-gray-100 rounded-3xl flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-green-900 animate-spin" />
              <p className="text-sm font-semibold text-gray-500">{t("importTools.retrievingHsCodes")}</p>
            </div>
          )}

          {error && (
            <div className="p-6 text-center bg-red-50 border border-red-100 rounded-3xl text-red-700 space-y-3">
              <div>
                <p className="text-sm font-bold">{t("importTools.searchError")}</p>
                <p className="text-xs mt-1">{error}</p>
              </div>
              <button
                type="button"
                onClick={() => setRetryTrigger((prev) => prev + 1)}
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t("importTools.retrySearch")}</span>
              </button>
            </div>
          )}

          {!searching && !error && results.length === 0 && query.trim().length >= 2 && (
            <div className="text-center py-16 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-base font-bold text-gray-400">{t("importTools.noCommoditiesFound")}</p>
              <p className="text-xs text-gray-400 mt-1">{t("importTools.tryDifferentDescription")}</p>
            </div>
          )}

          {!searching && !error && results.length === 0 && query.trim().length < 2 && (
            <div className="bg-gray-50/20 border border-gray-100 rounded-3xl p-8 text-center space-y-2">
              <Tag className="w-8 h-8 text-gray-300 mx-auto" />
              <h3 className="font-semibold text-gray-600 text-sm">{t("importTools.awaitingQuery")}</h3>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                {t("importTools.awaitingQueryDesc")}
              </p>
            </div>
          )}

          {!searching && !error && results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((item) => {
                const label = getMatchLabel(item.accuracyRating);
                return (
                  <div
                    key={item.code}
                    onClick={() => setSelectedHS(item)}
                    className={`bg-white rounded-2xl p-5 border text-left transition-all hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between h-44 cursor-pointer ${
                      selectedHS?.code === item.code
                        ? "border-green-700 ring-2 ring-green-50 shadow-sm"
                        : "border-gray-150 shadow-soft"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <span className="inline-flex items-center px-2 py-0.5 bg-green-50 text-green-900 text-xs font-bold font-mono rounded">
                          {item.code}
                        </span>
                        <span className={`text-[9px] uppercase font-bold px-2 py-0.5 border rounded-full ${label.style}`}>
                          {label.text}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-gray-900 leading-snug line-clamp-3">
                        {item.description || t("importTools.unclassifiedCommodity")}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-2 shrink-0">
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                        {t("importTools.tariffInfoInside")}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(item.code);
                        }}
                        className="flex items-center gap-1 text-xs font-bold text-green-900 hover:text-green-800 transition-colors"
                      >
                        {copiedCode === item.code ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>{t("importTools.copied")}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>{t("importTools.copy")}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Detail Panel */}
        <div className="lg:col-span-5">
          {selectedHS ? (
            <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-gray-200 shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300 sticky top-24">
              <div className="bg-gradient-to-r from-green-950 to-green-900 p-6 text-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-green-200 uppercase tracking-wide">
                    {t("importTools.wcoCodeStructure")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-yellow-400 shrink-0" />
                  <span className="text-2xl font-black tracking-tight font-mono">
                    {selectedHS.code}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">{t("importTools.description")}</span>
                  <h3 className="text-sm font-bold text-gray-800 leading-snug">
                    {selectedHS.description}
                  </h3>
                </div>

                {selectedHS.lowestDuty && selectedHS.highestDuty && (
                  <div className="p-3.5 bg-green-50 rounded-xl border border-green-150 flex items-center justify-between text-xs text-green-900">
                    <span className="font-semibold">{t("importTools.indicativeTariffRange")}</span>
                    <span className="font-black font-mono">
                      {selectedHS.lowestDuty} – {selectedHS.highestDuty}
                    </span>
                  </div>
                )}

                {/* Classification Breakdown Hierarchy */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">{t("importTools.hierarchyLevels")}</span>
                  
                  <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center font-mono font-bold text-green-900 text-xs shrink-0">
                      Ch
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">{t("importTools.chapterLabel")}</span>
                      <span className="text-xs font-bold text-gray-800">
                        {t("importTools.chapterValue", { code: selectedHS.code.replace(".", "").slice(0, 2) })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center font-mono font-bold text-green-900 text-xs shrink-0">
                      Hd
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">{t("importTools.headingLabel")}</span>
                      <span className="text-xs font-bold text-gray-800">
                        {t("importTools.headingValue", { code: selectedHS.code.replace(".", "").slice(0, 4) })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center font-mono font-bold text-green-900 text-xs shrink-0">
                      Sub
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">{t("importTools.subheadingLabel")}</span>
                      <span className="text-xs font-bold text-gray-800 font-mono">
                        {t("importTools.subheadingValue", { code: selectedHS.code })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex flex-col gap-3">
                  <button
                    onClick={() => onAddProductToCalculator(selectedHS)}
                    className="w-full bg-green-950 hover:bg-green-900 text-white font-bold py-3.5 rounded-full text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>{t("importTools.calculateLandedCustomsCost")}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(selectedHS.code)}
                    className="w-full bg-white hover:bg-gray-50 text-gray-800 font-bold py-3 rounded-full border border-gray-250 text-xs transition-all cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                  >
                    {copiedCode === selectedHS.code ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-green-700" />
                        <span>{t("importTools.copiedCode")}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t("importTools.copyCodeToClipboard")}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50/40 border border-dashed border-gray-250 rounded-3xl p-8 text-center space-y-3 sticky top-24">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Tag className="w-5 h-5 text-gray-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-700">{t("importTools.classificationDetails")}</h3>
                <p className="text-[11px] text-gray-400 mt-1 max-w-xs mx-auto leading-relaxed">
                  {t("importTools.selectProductCardDesc")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
