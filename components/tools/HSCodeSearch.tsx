"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Package, ChevronRight, Tag, X } from "lucide-react";
import { HS_CODES, searchHSCodes, getCategories, type HSCode } from "../../lib/hs-codes";

interface HSCodeSearchProps {
  value: string;
  onChange: (code: string, description: string) => void;
  label?: string;
  placeholder?: string;
}

export default function HSCodeSearch({
  value,
  onChange,
  label = "HS Code / Product",
  placeholder = "Search by product name, HS code, or category...",
}: HSCodeSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRefMobile = useRef<HTMLInputElement>(null);
  const inputRefDesktop = useRef<HTMLInputElement>(null);

  const selectedHS = HS_CODES.find((h) => h.code === value);
  const categories = getCategories();

  let results: HSCode[] = [];
  if (searchQuery) {
    results = searchHSCodes(searchQuery);
  } else if (selectedCategory) {
    results = HS_CODES.filter((h) => h.category === selectedCategory).slice(0, 12);
  } else {
    results = HS_CODES.slice(0, 12);
  }

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

  const handleSelect = (code: string, description: string) => {
    onChange(code, description);
    setIsOpen(false);
    setSearchQuery("");
    setSelectedCategory(null);
  };

  const categoryChips = () => (
    <div className="flex gap-1.5 overflow-x-auto pb-2 px-1 scrollbar-none snap-x">
      <button
        type="button"
        onClick={() => { setSelectedCategory(null); setSearchQuery(""); }}
        className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all shrink-0 snap-start cursor-pointer ${
          !selectedCategory && !searchQuery
            ? "bg-green-900 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        All Products
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => {
            setSelectedCategory(cat === selectedCategory ? null : cat);
            setSearchQuery("");
          }}
          className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all shrink-0 snap-start cursor-pointer ${
            selectedCategory === cat
              ? "bg-green-900 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );

  const resultsList = () => (
    <div className="max-h-64 overflow-y-auto divide-y divide-gray-50">
      {results.length === 0 ? (
        <div className="p-6 text-center text-sm text-gray-400">
          No products found. Try a different search term.
        </div>
      ) : (
        results.map((item) => (
          <button
            key={item.code}
            type="button"
            onClick={() => handleSelect(item.code, item.description)}
            className={`w-full flex items-start gap-3 px-4 py-3.5 text-left hover:bg-green-50/50 transition-colors ${
              value === item.code ? "bg-green-50" : ""
            }`}
          >
            <div className="mt-0.5 shrink-0">
              <Tag className="w-4 h-4 text-green-700" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900 leading-snug truncate">
                {item.description}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-mono font-bold text-green-800 bg-green-50 px-1.5 py-0.5 rounded">
                  {item.code}
                </span>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  {item.category}
                </span>
              </div>
            </div>
            {value === item.code && (
              <span className="w-1.5 h-1.5 bg-green-700 rounded-full mt-2" />
            )}
          </button>
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

      {/* Button Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-3 px-4 py-3 bg-white border rounded-xl text-left transition-all ${
          isOpen ? "border-green-700 ring-2 ring-green-50" : "border-gray-200 hover:border-gray-300"
        } shadow-xs cursor-pointer`}
      >
        {selectedHS ? (
          <>
            <Package className="w-5 h-5 text-green-700 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-sm truncate">{selectedHS.description}</div>
              <div className="text-xs text-gray-400 font-mono mt-0.5">{selectedHS.code}</div>
            </div>
          </>
        ) : (
          <>
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <span className="flex-1 text-gray-400 truncate">{placeholder}</span>
          </>
        )}
        <ChevronRight
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-90" : ""}`}
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
            {/* Handle */}
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
            <div className="p-3 space-y-3 shrink-0">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={inputRefMobile}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedCategory(null);
                  }}
                  placeholder="Type to search e.g. laptop, coffee..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:bg-white transition-all"
                />
              </div>
              {categoryChips()}
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {resultsList()}
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP POPOVER DROPDOWN */}
      {isOpen && (
        <div className="absolute z-40 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden hidden md:block animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Search Box */}
          <div className="p-3 border-b border-gray-100 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={inputRefDesktop}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedCategory(null);
                }}
                placeholder="Type to search..."
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:bg-white transition-all"
              />
            </div>
            {categoryChips()}
          </div>

          {/* List */}
          {resultsList()}
        </div>
      )}
    </div>
  );
}
