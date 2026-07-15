"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Globe, X } from "lucide-react";
import { COUNTRIES, getCountryByCode } from "../../lib/countries";

interface CountrySelectorProps {
  value: string;
  onChange: (code: string) => void;
  label?: string;
  placeholder?: string;
  exclude?: string[];
}

export default function CountrySelector({
  value,
  onChange,
  label = "Select Country",
  placeholder = "Search countries...",
  exclude = [],
}: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRefMobile = useRef<HTMLInputElement>(null);
  const inputRefDesktop = useRef<HTMLInputElement>(null);

  const selectedCountry = getCountryByCode(value);

  const filteredCountries = COUNTRIES.filter((c) => {
    if (exclude.includes(c.code)) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q)
    );
  });

  // Group by region
  const grouped = filteredCountries.reduce((acc, country) => {
    if (!acc[country.region]) acc[country.region] = [];
    acc[country.region].push(country);
    return acc;
  }, {} as Record<string, Array<(typeof COUNTRIES)[number]>>);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRefMobile.current) inputRefMobile.current.focus();
        if (inputRefDesktop.current) inputRefDesktop.current.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSelect = (code: string) => {
    onChange(code);
    setIsOpen(false);
    setSearchQuery("");
  };

  const countriesList = (isMobile: boolean) => (
    <div className="max-h-72 md:max-h-64 overflow-y-auto divide-y divide-gray-50">
      {Object.entries(grouped).length === 0 ? (
        <div className="p-6 text-center text-sm text-gray-400">
          No countries found
        </div>
      ) : (
        Object.entries(grouped).map(([region, countries]) => (
          <div key={region} className="py-1.5 first:pt-0">
            <div className="px-4 py-1.5 bg-gray-50/50 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              {region}
            </div>
            {countries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleSelect(country.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-green-50/50 transition-colors ${
                  value === country.code ? "bg-green-50 text-green-900 font-semibold" : "text-gray-700"
                }`}
              >
                <span
                  className={`fi fi-${country.flag} rounded-sm shadow-xs`}
                  style={{
                    width: "1.25rem",
                    height: "0.9375rem",
                    display: "inline-block",
                    backgroundSize: "cover",
                    flexShrink: 0,
                  }}
                />
                <span className="flex-1 text-sm">{country.name}</span>
                <span className="text-xs text-gray-400 font-mono">{country.code}</span>
                {value === country.code && (
                  <span className="w-1.5 h-1.5 bg-green-700 rounded-full" />
                )}
              </button>
            ))}
          </div>
        ))
      )}
    </div>
  );

  return (
    <div ref={containerRef} className="relative w-full">
      {label && (
        <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
          {label}
        </label>
      )}

      {/* Selector Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-3 px-4 py-3.5 bg-white border rounded-xl text-left transition-all ${
          isOpen ? "border-green-700 ring-2 ring-green-50" : "border-gray-200 hover:border-gray-300"
        } shadow-xs cursor-pointer`}
      >
        {selectedCountry ? (
          <>
            <span
              className={`fi fi-${selectedCountry.flag} rounded-sm shadow-xs`}
              style={{
                width: "1.5rem",
                height: "1.125rem",
                display: "inline-block",
                backgroundSize: "cover",
                flexShrink: 0,
              }}
            />
            <span className="flex-1 font-semibold text-gray-900 truncate">{selectedCountry.name}</span>
          </>
        ) : (
          <>
            <Globe className="w-5 h-5 text-gray-400 shrink-0" />
            <span className="flex-1 text-gray-400 truncate">{placeholder}</span>
          </>
        )}
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* MOBILE BOTTOM SHEET MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 block md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => { setIsOpen(false); setSearchQuery(""); }}
          />

          {/* Bottom Sheet Drawer */}
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[85vh] flex flex-col transform translate-y-0 transition-transform duration-300 overflow-hidden pb-6">
            {/* Header / Drag Handle */}
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto my-3 cursor-pointer" onClick={() => setIsOpen(false)} />
            
            <div className="flex items-center justify-between px-4 pb-3 border-b border-gray-100">
              <span className="font-display font-bold text-gray-900">{label}</span>
              <button
                type="button"
                onClick={() => { setIsOpen(false); setSearchQuery(""); }}
                className="p-1 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input inside Bottom Sheet */}
            <div className="p-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={inputRefMobile}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={placeholder}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {countriesList(true)}
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP POPOVER DROPDOWN */}
      {isOpen && (
        <div className="absolute z-40 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden hidden md:block animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Search Box */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={inputRefDesktop}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* List */}
          {countriesList(false)}
        </div>
      )}
    </div>
  );
}
