"use client";

import { useState } from "react";
import { 
  Search, 
  BookOpen, 
  Tag, 
  Copy, 
  CheckCircle, 
  ArrowRight, 
  Package, 
  Filter, 
  Info,
  Calculator,
  X
} from "lucide-react";
import { HS_CODES, searchHSCodes, getCategories, type HSCode } from "../../../lib/hs-codes";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";

export default function HSLookupPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedHS, setSelectedHS] = useState<HSCode | null>(null);

  const categories = getCategories();

  let results: HSCode[] = [];
  if (query) {
    results = searchHSCodes(query);
  } else if (selectedCategory) {
    results = HS_CODES.filter((h) => h.category === selectedCategory);
  } else {
    results = HS_CODES.slice(0, 12);
  }

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-green-100 selection:text-gray-900">
      <Header />

      <main className="flex-1 pt-16 pb-20">
        {/* Hero Section */}
        <section className="relative bg-white py-16 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-yellow-50 opacity-60"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-900/5 to-transparent"></div>

          <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tight text-gray-900">
              HS Code <span className="text-green-800">Lookup</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
              Find standard 6-digit Harmonized System codes for customs declarations, tariffs, and global shipping paperwork.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-6xl mx-auto px-6 -mt-6 relative z-10 space-y-8">
          
          {/* Search Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-gray-100 shadow-xl p-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedCategory(null);
                  setSelectedHS(null);
                }}
                placeholder="Search by keywords e.g. laptop, coffee, t-shirt, car..."
                className="w-full pl-12 pr-10 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-base font-semibold focus:outline-none focus:ring-2 focus:ring-green-700 focus:bg-white transition-all shadow-inner"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              )}
            </div>

            {/* Category horizontal filters */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <Filter className="w-3.5 h-3.5" />
                <span>Categories</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x -mx-2 px-2">
                <button
                  onClick={() => { setSelectedCategory(null); setQuery(""); setSelectedHS(null); }}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all shrink-0 snap-start cursor-pointer ${
                    !selectedCategory && !query
                      ? "bg-green-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat === selectedCategory ? null : cat);
                      setQuery("");
                      setSelectedHS(null);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all shrink-0 snap-start cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-green-900 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid Layout: Left Column = Results, Right Column = Selected Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Results Grid - takes remaining space */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Products ({results.length})
                </span>
                {!query && !selectedCategory && (
                  <span className="text-[10px] font-semibold text-gray-400">Showing popular codes</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.map((item) => (
                  <div
                    key={item.code}
                    onClick={() => setSelectedHS(item)}
                    className={`bg-white rounded-2xl p-5 border text-left transition-all hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between h-40 cursor-pointer ${
                      selectedHS?.code === item.code
                        ? "border-green-700 ring-2 ring-green-50 shadow-sm"
                        : "border-gray-100 shadow-soft"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <span className="inline-flex items-center px-2 py-0.5 bg-green-50 text-green-900 text-xs font-bold font-mono rounded">
                          <Tag className="w-3 h-3 mr-1" />
                          {item.code}
                        </span>
                        <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-2 shrink-0">
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                        Tap for details
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(item.code);
                        }}
                        className="flex items-center gap-1.5 text-xs font-bold text-green-700 hover:text-green-900 transition-colors"
                      >
                        {copiedCode === item.code ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {results.length === 0 && (
                <div className="text-center py-16 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-base font-bold text-gray-400">No products found</p>
                  <p className="text-xs text-gray-400 mt-1">Try searching a different term or product category</p>
                </div>
              )}
            </div>

            {/* Right Column: Code Digits Detail Panel */}
            <div className="lg:col-span-5">
              {selectedHS ? (
                <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-gray-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300 sticky top-24">
                  {/* Top color header */}
                  <div className="bg-gradient-to-r from-green-900 to-green-900 p-6 text-white space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-green-200 uppercase tracking-wide">
                        Selected Commodity
                      </span>
                      <span className="text-xs font-mono font-bold bg-white/10 px-2 py-0.5 rounded">
                        {selectedHS.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="w-5 h-5 text-yellow-400" />
                      <span className="text-3xl font-display font-black tracking-tight font-mono">
                        {selectedHS.code}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Description</span>
                      <h3 className="text-lg font-bold text-gray-900 leading-snug">
                        {selectedHS.description}
                      </h3>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed">
                      Harmonized System (HS) codes are globally unified up to 6 digits by the World Customs Organization (WCO).
                    </p>

                    {/* Breakdown cards */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Classification Hierarchy</span>
                      
                      <div className="flex items-center gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                        <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center font-mono font-bold text-green-900 text-xs shrink-0">
                          Ch
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Chapter (First 2 digits)</span>
                          <span className="text-xs font-bold text-gray-800">
                            Chapter {selectedHS.code.split(".")[0].slice(0, 2)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                        <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center font-mono font-bold text-green-900 text-xs shrink-0">
                          Hd
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Heading (First 4 digits)</span>
                          <span className="text-xs font-bold text-gray-800">
                            Heading {selectedHS.code.split(".")[0]}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                        <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center font-mono font-bold text-green-900 text-xs shrink-0">
                          Sub
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Subheading (Full 6 digits)</span>
                          <span className="text-xs font-bold text-gray-800">
                            Subheading {selectedHS.code}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions buttons */}
                    <div className="pt-4 flex flex-col gap-3">
                      <Button
                        variant="secondary"
                        size="lg"
                        href={`/tools/duty-calculator?hs=${selectedHS.code}`}
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <Calculator className="w-4 h-4" />
                        <span>Calculate import taxes</span>
                      </Button>

                      <button
                        type="button"
                        onClick={() => handleCopy(selectedHS.code)}
                        className="w-full bg-white hover:bg-gray-50 text-gray-800 font-bold py-3.5 rounded-full border border-gray-200 text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                      >
                        {copiedCode === selectedHS.code ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-700" />
                            <span>Copied to Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy 6-digit Code</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50/40 border border-dashed border-gray-250 rounded-3xl p-8 text-center space-y-4 sticky top-24">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Info className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-gray-850">Code Details Panel</h3>
                    <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto leading-relaxed">
                      Select any commodity card on the left to see its structural classification digits, chapters, and run duty calculators.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>


          {/* Bottom Call to Action Portal */}
          <div className="bg-green-900 text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-soft-xl">
            <div className="absolute top-0 left-0 w-64 h-64 bg-green-900 rounded-full blur-3xl opacity-20 -ml-20 -mt-20"></div>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 relative z-10">
              Need to Estimate Landed Costs?
            </h2>
            <p className="text-sm text-green-200/80 mb-6 max-w-lg mx-auto leading-relaxed relative z-10">
              Once you have identified your product's HS code, you can use our free calculator to estimate import tariffs and VAT.
            </p>
            <a
              href="/tools/duty-calculator"
              className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold px-8 py-3.5 rounded-full transition-all shadow-md text-sm relative z-10"
            >
              <span>Go to Duty Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
