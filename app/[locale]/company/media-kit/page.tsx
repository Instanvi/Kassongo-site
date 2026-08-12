"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { Download, Copy, Check, Palette, FileImage, Type, Layers, Sparkles, ShieldCheck } from "lucide-react";

export default function MediaKitPage() {
    const [activeTab, setActiveTab] = useState<"logos" | "typography" | "colors" | "images">("logos");
    const [copiedColor, setCopiedColor] = useState<string | null>(null);

    // Logo Assets
    const logoFormats = [
        { name: "Primary Logo (SVG)", file: "/kassongo-logo1.svg", format: "SVG", size: "17 KB", darkBg: false },
        { name: "Primary Logo (PNG)", file: "/kassongo-logo-lg.png", format: "PNG", size: "1.5 KB", darkBg: false },
        { name: "Logo Variant White", file: "/kassongo-logo.svg", format: "SVG", size: "17 KB", darkBg: true },
        { name: "Logo Variant Lime Green", file: "/kassongo-logo2.svg", format: "SVG", size: "17 KB", darkBg: false },
        { name: "Logo Variant", file: "/kassongo-logo3.svg", format: "SVG", size: "17 KB", darkBg: false },
        { name: "Icon Logo", file: "/kassongo.svg", format: "SVG", size: "4 KB", darkBg: false },
    ];

    // Color Palette
    const brandColors = [
        { name: "Emerald Green (Primary)", hex: "#10b981", variable: "--color-green", category: "Primary Accent" },
        { name: "Strong Green", hex: "#059669", variable: "--color-green-strong", category: "Brand Green" },
        { name: "Deep Green", hex: "#064e3b", variable: "--color-green-dark", category: "Dark Tone" },
        { name: "Soft Yellow", hex: "#fef3c7", variable: "--color-lt-yellow", category: "Light Highlight" },
        { name: "Accent Yellow", hex: "#fbbf24", variable: "--color-yellow", category: "Warm Accent" },
        { name: "Strong Yellow", hex: "#f59e0b", variable: "--color-yellow-strong", category: "Warning / Gold" },
        { name: "Off White", hex: "#fefce8", variable: "--color-off-white", category: "Surface Base" },
        { name: "Off Black", hex: "#111827", variable: "--color-off-black", category: "Dark Neutral" },
    ];

    // Typography styles 
    const typographyEntries = [
        { family: "Retail Display", usage: "Headings (d1 through d6 classes)", weights: "Regular (400) · Medium (500) · Semibold (600) · Bold (700) · Black (900)" },
        { family: "Retail Text", usage: "Body text & descriptions (.body-1 to .body-5)", weights: "Light (300) · Regular (400) · Medium (500) · Semibold (600) · Bold (700)" },
        { family: "Retail (Base)", usage: "General UI & Fallback font family", weights: "Light (300) to Black (900)" },
        { family: "Space Grotesk / Mono", usage: "Code blocks & technical data display", weights: "Monospace UI Elements" },
    ];

    // Promotional & Editorial Images - Real Assets
    const brandImages = [
        {
            title: "Shipment & Logistics Operations",
            file: "/shipment.jpg",
            description: "Professional cargo and logistics operations imagery showcasing global freight forwarding and international shipping services.",
            badge: "Hero Banner",
            usage: "Homepage hero, logistics pages, promotional materials"
        },
    ];

    const handleDownload = (file: string, name: string) => {
        const link = document.createElement("a");
        link.href = file;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const copyToClipboard = (hex: string) => {
        navigator.clipboard.writeText(hex);
        setCopiedColor(hex);
        setTimeout(() => setCopiedColor(null), 2000);
    };

    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-green-100 selection:text-gray-900">
            <Header />

            <main className="flex-1 pt-16">
                {/* Hero Section */}
                <section className="relative bg-white py-16 md:py-24 px-6 overflow-hidden border-b border-gray-100">
                    <div className="smoke-blob smoke-blob-1"></div>
                    <div className="smoke-blob smoke-blob-2"></div>

                    <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
                        <h1 className="d1 text-gray-900">
                            Kassongo Express <br />
                            <span className="text-green-800">Media & Asset Kit</span>
                        </h1>

                        <p className="body-1 text-gray-600 max-w-2xl mx-auto">
                            Welcome to our official resource center. Download vector logos, review precise typographic guidelines, copy design system color tokens, and access Regalton promotional imagery.
                        </p>
                    </div>
                </section>

                {/* Premium Floating Tab Navigation Bar */}
                <section className="sticky top-16 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200/80 shadow-soft-md transition-all">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex items-center justify-start md:justify-center overflow-x-auto py-3 space-x-2 no-scrollbar">

                            <button
                                onClick={() => setActiveTab("logos")}
                                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${activeTab === "logos"
                                        ? "bg-green-900 text-white shadow-soft-md scale-[1.02]"
                                        : "bg-gray-100/70 text-gray-600 hover:bg-gray-200/80 hover:text-gray-900"
                                    }`}
                            >
                                <FileImage className={`w-4 h-4 ${activeTab === "logos" ? "text-white" : "text-green-900"}`} />
                                <span>Logos & Marks</span>
                            </button>

                            <button
                                onClick={() => setActiveTab("typography")}
                                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${activeTab === "typography"
                                        ? "bg-green-900 text-white shadow-soft-md scale-[1.02]"
                                        : "bg-gray-100/70 text-gray-600 hover:bg-gray-200/80 hover:text-gray-900"
                                    }`}
                            >
                                <Type className={`w-4 h-4 ${activeTab === "typography" ? "text-white" : "text-green-900"}`} />
                                <span>Fonts</span>
                            </button>

                            <button
                                onClick={() => setActiveTab("colors")}
                                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${activeTab === "colors"
                                        ? "bg-green-900 text-white shadow-soft-md scale-[1.02]"
                                        : "bg-gray-100/70 text-gray-600 hover:bg-gray-200/80 hover:text-gray-900"
                                    }`}
                            >
                                <Palette className={`w-4 h-4 ${activeTab === "colors" ? "text-white" : "text-green-900"}`} />
                                <span>Color Tokens</span>
                            </button>

                            <button
                                onClick={() => setActiveTab("images")}
                                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${activeTab === "images"
                                        ? "bg-green-900 text-white shadow-soft-md scale-[1.02]"
                                        : "bg-gray-100/70 text-gray-600 hover:bg-gray-200/80 hover:text-gray-900"
                                    }`}
                            >
                                <Layers className={`w-4 h-4 ${activeTab === "images" ? "text-white" : "text-green-900"}`} />
                                <span>Brand Images</span>
                            </button>

                        </div>
                    </div>
                </section>

                {/* Tab Content Area */}
                <section className="bg-gray-50/60 py-16 px-6 min-h-[550px]">
                    <div className="max-w-7xl mx-auto">

                        {/* TAB 1: LOGOS */}
                        {activeTab === "logos" && (
                            <div className="space-y-8 animate-fade-in">
                                <div className="max-w-2xl space-y-2">
                                    <h2 className="d3 text-gray-900">Official Brand Logos</h2>
                                    <p className="body-2 text-gray-600">
                                        Download scalable vector formats (SVG) or high-resolution previews. Maintain clean contrast and proper negative space around all marks.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {logoFormats.map((logo, index) => (
                                        <div
                                            key={index}
                                            className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-card flex flex-col justify-between transition-smooth"
                                        >
                                            <div className={`rounded-xl p-8 mb-4 flex items-center justify-center min-h-[190px] border border-gray-100/80 ${logo.darkBg ? 'bg-gray-900' : 'bg-gray-50/80'}`}>
                                                <img
                                                    src={logo.file}
                                                    alt={logo.name}
                                                    className="max-w-[180px] max-h-[140px] object-contain drop-shadow-sm"
                                                />
                                            </div>

                                            <div className="space-y-3">
                                                <h3 className="d6 text-gray-900">{logo.name}</h3>
                                                <div className="flex items-center justify-between">
                                                    <span className="badge badge-green">{logo.format}</span>
                                                    <span className="body-5 text-gray-400 font-mono">{logo.size}</span>
                                                </div>

                                                <Button
                                                    variant="outline"
                                                    onClick={() => handleDownload(logo.file, logo.name)}
                                                    className="w-full text-xs py-2.5 flex items-center justify-center gap-2 group border-gray-200 hover:border-green-600"
                                                >
                                                    <Download className="w-3.5 h-3.5 text-green-600 group-hover:translate-y-0.5 transition-transform" />
                                                    <span>Download File</span>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB 2: TYPOGRAPHY */}
                        {activeTab === "typography" && (
                            <div className="space-y-8 animate-fade-in">
                                <div className="max-w-2xl space-y-2">
                                    <h2 className="d3 text-gray-900">Fonts</h2>
                                    <p className="body-2 text-gray-600">
                                        Our interface utilizes modern proprietary fonts including <strong>Retail</strong>, <strong>Retail Display</strong>, and <strong>Retail Text</strong> families for optimized visual hierarchy.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {typographyEntries.map((font, idx) => (
                                        <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-card space-y-3">
                                            <div className="flex justify-between items-start">
                                                <h3 className="d5 text-green-700">{font.family}</h3>
                                                <span className="badge badge-yellow">Registered</span>
                                            </div>
                                            <p className="body-2 text-gray-800"><strong>Application:</strong> {font.usage}</p>
                                            <p className="body-3 text-gray-500 font-mono text-xs bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                                                {font.weights}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-white p-8 rounded-2xl border border-gray-200/60 shadow-soft space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <span className="text-xs font-semibold text-green-700 uppercase">Heading Class</span>
                                            <p className="d1 text-gray-900">The Quick Fox Jumps</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-xs font-semibold text-green-700 uppercase">Subheading Class</span>
                                            <p className="d3 text-gray-800">Logistics & Express Delivery</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-xs font-semibold text-green-700 uppercase">body Text Class</span>
                                            <p className="body-1 text-gray-600">
                                                Designed for readability across high-density mobile displays, point-of-sale terminals, and expansive corporate dashboard interfaces.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 3: COLORS */}
                        {activeTab === "colors" && (
                            <div className="space-y-8 animate-fade-in">
                                <div className="max-w-2xl space-y-2">
                                    <h2 className="d3 text-gray-900">Brand Color Palette</h2>
                                    <p className="body-2 text-gray-600">
                                        Our chromatic palette consists of signature emerald greens, balanced yellow highlights, and dark neutrals. Click any card to copy its hexadecimal code.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {brandColors.map((color, idx) => (
                                        <div key={idx} className="bg-white rounded-2xl p-4 border border-gray-200/60 shadow-card space-y-3 flex flex-col justify-between">
                                            <div className="space-y-3">
                                                <div
                                                    className="h-28 rounded-xl shadow-inner border border-black/10 transition-transform hover:scale-[0.98]"
                                                    style={{ backgroundColor: color.hex }}
                                                />
                                                <div className="space-y-1">
                                                    <span className="text-[11px] font-bold text-green-700 uppercase tracking-wider">{color.category}</span>
                                                    <h4 className="d6 text-gray-900">{color.name}</h4>
                                                    <span className="text-xs text-gray-400 font-mono block">{color.variable}</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => copyToClipboard(color.hex)}
                                                className="w-full flex items-center justify-between bg-gray-50 hover:bg-green-50/60 p-2.5 rounded-xl text-xs font-mono font-medium transition-smooth text-gray-700 border border-gray-100"
                                            >
                                                <span className="font-bold">{color.hex}</span>
                                                {copiedColor === color.hex ? (
                                                    <span className="flex items-center gap-1 text-green-700 font-semibold"><Check className="w-3.5 h-3.5" /> Copied</span>
                                                ) : (
                                                    <span className="flex items-center gap-1 text-gray-400 hover:text-green-700"><Copy className="w-3.5 h-3.5" /> Copy Hex</span>
                                                )}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB 4: BRAND & KASSONGO IMAGES */}
                        {activeTab === "images" && (
                            <div className="space-y-8 animate-fade-in">
                                <div className="max-w-2xl space-y-2">
                                    <h2 className="d3 text-gray-900">Brand & Promotional Imagery</h2>
                                    <p className="body-2 text-gray-600">
                                        High-resolution marketing assets, product screenshots, service icons, and official photography approved for media partners, press releases, and promotional materials. All images optimized for web and print use.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {brandImages.map((img, idx) => (
                                        <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-200/60 shadow-card space-y-4 flex flex-col justify-between hover:shadow-soft-lg transition-all">
                                            <div className="space-y-4">
                                                <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-green-50 rounded-xl h-52 flex items-center justify-center overflow-hidden relative group shadow-inner border border-gray-200/50">
                                                    {img.file.endsWith('.webm') ? (
                                                        <video 
                                                            autoPlay 
                                                            loop 
                                                            muted 
                                                            playsInline 
                                                            className="w-full h-full object-cover"
                                                        >
                                                            <source src={img.file} type="video/webm" />
                                                        </video>
                                                    ) : (
                                                        <img 
                                                            src={img.file} 
                                                            alt={img.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            onError={(e) => {
                                                                const target = e.target as HTMLImageElement;
                                                                target.style.display = 'none';
                                                                const parent = target.parentElement;
                                                                if (parent) {
                                                                    const placeholder = document.createElement('div');
                                                                    placeholder.className = 'flex items-center justify-center w-full h-full';
                                                                    placeholder.innerHTML = '<svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>';
                                                                    parent.appendChild(placeholder);
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                    
                                                    <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-green-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-green-200 shadow-sm">
                                                        {img.badge}
                                                    </span>

                                                    {img.file.endsWith('.svg') && (
                                                        <span className="absolute bottom-3 left-3 bg-blue-500/90 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded font-mono font-semibold">
                                                            VECTOR
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <h3 className="d6 text-gray-900 leading-tight">{img.title}</h3>
                                                    <p className="body-3 text-gray-500 leading-relaxed text-xs">{img.description}</p>
                                                    {img.usage && (
                                                        <div className="pt-2 border-t border-gray-100">
                                                            <p className="text-[11px] text-gray-400">
                                                                <span className="font-semibold text-green-700">Usage:</span> {img.usage}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <Button
                                                variant="outline"
                                                onClick={() => handleDownload(img.file, img.title)}
                                                className="w-full text-xs py-2.5 flex items-center justify-center gap-2 border-gray-200 hover:border-green-600 hover:bg-green-50 group transition-all"
                                            >
                                                <Download className="w-3.5 h-3.5 text-green-600 group-hover:translate-y-0.5 transition-transform" />
                                                <span className="font-semibold">Download Asset</span>
                                            </Button>
                                        </div>
                                    ))}
                                </div>

                                {/* Partner & Integration Logos Section */}
                                <div className="pt-8 mt-8 border-t border-gray-200">
                                    <div className="space-y-4 mb-6">
                                        <h3 className="d4 text-gray-900">Partner & Integration Logos</h3>
                                        <p className="body-2 text-gray-600">
                                            Official logos of e-commerce platforms, shipping carriers, and payment integrations supported by Kassongo Express.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                                        {[
                                            { name: "Amazon", file: "/amazon.svg" },
                                            { name: "eBay", file: "/EBay_logo.svg" },
                                            { name: "AliExpress", file: "/aliexpress-logo-5a8f.png" },
                                            { name: "Alibaba", file: "/brandbird-alibaba-logotype.svg" },
                                            { name: "Shopify", file: "/shopify.svg" },
                                            { name: "WooCommerce", file: "/woo.svg" },
                                            { name: "Wix", file: "/wix.svg" },
                                            { name: "DHL", file: "/DHL-Logo.wine.svg" },
                                            { name: "FedEx", file: "/FedEx_Express.webp" },
                                            { name: "UPS", file: "/United_Parcel_Service-Logo.wine.svg" },
                                            { name: "USPS", file: "/USPS_-_Color_Logo.svg" },
                                            { name: "Shein", file: "/shein-1.svg" },
                                            { name: "Etsy", file: "/Etsy_logo.webp" },
                                            { name: "Taobao", file: "/taobao-new-flat-design.svg" },
                                            { name: "Shopee", file: "/shopee-seeklogo.svg" },
                                            { name: "DHgate", file: "/dhgate-seeklogo.svg" },
                                        ].map((partner, idx) => (
                                            <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200/60 shadow-card flex items-center justify-center h-20 group hover:shadow-soft transition-all">
                                                <img 
                                                    src={partner.file} 
                                                    alt={partner.name}
                                                    className="max-w-full max-h-12 object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                                                    title={partner.name}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}