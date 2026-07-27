"use client";

import React from "react";

interface CustomsEstimateLine {
  name: string;
  code: string | null;
  method: "percentage" | "flat";
  basis: "cif" | "fob" | "flat";
  base: number;
  rate: number;
  amount: number;
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
  lines: CustomsEstimateLine[];
  previewToken?: string;
}

interface PDFReportProps {
  estimate: CustomsEstimate;
  displayCurrency: string;
  currencySymbol: string;
  xafToDisplay: (amountXaf: number) => number;
  formatCurrency: (val: number, curr: string) => string;
}

export default function PDFReport({
  estimate,
  displayCurrency,
  currencySymbol,
  xafToDisplay,
  formatCurrency,
}: PDFReportProps) {
  const isImport = estimate.mode === "import";
  const vehicleItem = estimate.items.find((it) => it.isCar);

  // Exchange rate base display
  const exchangeRateStr = `1 USD = ${formatCurrency(xafToDisplay(600), displayCurrency)} ${displayCurrency}`;

  // Vehicle Age & Depreciation Logic (10% per year, capped at 80%)
  const currentYear = new Date().getFullYear();
  const vehicleYear = vehicleItem?.year || currentYear;
  const age = Math.max(0, currentYear - vehicleYear);
  const depreciationRate = Math.min(age * 10, 80);
  const originalFobUsd = estimate.totalFobUsd;
  const depreciatedFobUsd = originalFobUsd * (1 - depreciationRate / 100);

  const originalFobDisplay = xafToDisplay(originalFobUsd * 600);
  const depreciatedFobDisplay = xafToDisplay(depreciatedFobUsd * 600);
  
  // Freight & Insurance
  // In the API, containerCost is in XAF. If user specified freight/insurance, we pull them or fallback
  const freightXaf = estimate.containerCost; // simplified freight representer
  const freightDisplay = xafToDisplay(freightXaf);
  
  const insuranceXaf = freightXaf * 0.1; // fallback representative insurance
  const insuranceDisplay = xafToDisplay(insuranceXaf);

  // Customs CIF
  const cifXaf = estimate.totalCifXaf || (depreciatedFobUsd * 600 + freightXaf + insuranceXaf);
  const cifDisplay = xafToDisplay(cifXaf);

  const dutyPayableDisplay = xafToDisplay(estimate.total);

  const timestamp = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const qrDataUrl = typeof window !== "undefined" && estimate.previewToken
    ? `${window.location.origin}/tools/import-tools?estimate=${estimate.previewToken}`
    : "";
  const qrCodeImage = qrDataUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrDataUrl)}`
    : "";

  return (
    <div className="hidden print:block w-full max-w-4xl mx-auto p-10 bg-white text-black font-sans print:p-0">
      
      {/* 1. Header Banner with Logo */}
      <div className="flex flex-col items-center justify-center text-center space-y-4 pb-6 border-b-4 border-green-950">
        {/* Kassongo Logo */}
        <div className="flex items-center justify-center">
          <img 
            src="/kassongo-logo1.svg" 
            alt="Kassongo Logistics" 
            className="h-10 w-auto"
            style={{ maxHeight: '64px' }}
          />
        </div>
        
        <div className="space-y-1">
          <h1 className="text-2xl font-black tracking-tight text-green-950 uppercase">
            {isImport ? "Customs Import Duty Certificate" : "Customs Export Duty Certificate"}
          </h1>
          <p className="text-xs text-gray-600 font-semibold">
            Official Landed Cost Estimate Report
          </p>
          <p className="text-[10px] text-gray-500 font-medium">
            Generated: {timestamp}
          </p>
        </div>
      </div>

      {/* 2. Summary of Results Block */}
      <div className="mt-8 space-y-2">
        <h2 className="text-sm font-bold bg-green-950 text-white px-4 py-2.5 uppercase tracking-wider">
          Summary of Results
        </h2>
        <table className="w-full border-collapse border-2 border-green-950 text-center text-sm font-semibold">
          <thead>
            <tr className="bg-green-100 text-green-950 text-xs uppercase font-black">
              <th className="border border-green-300 py-3">MSRP / FOB Value (USD)</th>
              {isImport && <th className="border border-green-300 py-3">Customs Value (CIF) ({displayCurrency})</th>}
              <th className="border border-green-300 py-3">Total Duty Payable ({displayCurrency})</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-base font-black text-gray-900">
              <td className="border border-gray-300 py-4 bg-gray-50">${formatCurrency(estimate.totalFobUsd, "USD")}</td>
              {isImport && (
                <td className="border border-gray-300 py-4 bg-gray-50">
                  {currencySymbol} {formatCurrency(cifDisplay, displayCurrency)}
                </td>
              )}
              <td className="border border-gray-300 py-4 bg-green-50 text-green-950 text-lg">
                {currencySymbol} {formatCurrency(dutyPayableDisplay, displayCurrency)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 3. Vehicle Information Table */}
      {vehicleItem && (
        <div className="mt-8 space-y-2">
          <h2 className="text-sm font-bold bg-green-950 text-white px-4 py-2.5 uppercase tracking-wider">
            Vehicle Information
          </h2>
          <table className="w-full border-collapse border-2 border-green-950 text-xs">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 font-bold bg-gray-50 w-1/4">Year:</td>
                <td className="border border-gray-300 p-3 w-1/4">{vehicleItem.year || "N/A"}</td>
                <td className="border border-gray-300 p-3 font-bold bg-gray-50 w-1/4">Make:</td>
                <td className="border border-gray-300 p-3 w-1/4 uppercase">{vehicleItem.make || "N/A"}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-bold bg-gray-50">Model:</td>
                <td className="border border-gray-300 p-3 uppercase">{vehicleItem.model || "N/A"}</td>
                <td className="border border-gray-300 p-3 font-bold bg-gray-50">Special Feature / Trim:</td>
                <td className="border border-gray-300 p-3 uppercase">{vehicleItem.trim || "N/A"}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-bold bg-gray-50">Engine Capacity:</td>
                <td className="border border-gray-300 p-3">{vehicleItem.engineCapacityCc ? `${vehicleItem.engineCapacityCc} cc` : "N/A"}</td>
                <td className="border border-gray-300 p-3 font-bold bg-gray-50">Fuel Type:</td>
                <td className="border border-gray-300 p-3">{vehicleItem.fuelType || "N/A"}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-bold bg-gray-50">Body Style:</td>
                <td className="border border-gray-300 p-3">{vehicleItem.bodyStyle || "N/A"}</td>
                <td className="border border-gray-300 p-3 font-bold bg-gray-50">Region of Origin:</td>
                <td className="border border-gray-300 p-3">{vehicleItem.originRegion || "N/A"}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-bold bg-gray-50">Vehicle Condition:</td>
                <td className="border border-gray-300 p-3" colSpan={3}>{vehicleItem.condition || "N/A"}</td>
              </tr>
              {vehicleItem.vin && (
                <tr>
                  <td className="border border-gray-300 p-3 font-bold bg-gray-50">VIN:</td>
                  <td className="border border-gray-300 p-3 font-mono uppercase" colSpan={3}>
                    {vehicleItem.vin}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. Vehicle Valuation Table */}
      {vehicleItem && isImport && (
        <div className="mt-8 space-y-2">
          <h2 className="text-sm font-bold bg-green-950 text-white px-4 py-2.5 uppercase tracking-wider">
            Vehicle Valuation Details
          </h2>
          <table className="w-full border-collapse border-2 border-green-950 text-xs">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 font-bold bg-gray-50 w-1/3">MSRP / Original FOB (USD):</td>
                <td className="border border-gray-300 p-3 font-mono">${formatCurrency(originalFobUsd, "USD")}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-bold bg-gray-50">Depreciation Applied:</td>
                <td className="border border-gray-300 p-3">
                  {depreciationRate}% ({age} year(s) old)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-bold bg-gray-50">Depreciated Cost (FOB USD):</td>
                <td className="border border-gray-300 p-3 font-mono">${formatCurrency(depreciatedFobUsd, "USD")}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-bold bg-gray-50">Estimated Freight ({displayCurrency}):</td>
                <td className="border border-gray-300 p-3 font-mono">{currencySymbol} {formatCurrency(freightDisplay, displayCurrency)}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-bold bg-gray-50">Estimated Insurance ({displayCurrency}):</td>
                <td className="border border-gray-300 p-3 font-mono">{currencySymbol} {formatCurrency(insuranceDisplay, displayCurrency)}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-bold bg-gray-50">Exchange Rate:</td>
                <td className="border border-gray-300 p-3 font-mono">{exchangeRateStr}</td>
              </tr>
              <tr className="bg-green-50/30">
                <td className="border border-gray-300 p-3 font-bold text-green-950">Customs Value CIF ({displayCurrency}):</td>
                <td className="border border-gray-300 p-3 font-black text-green-950 font-mono">
                  {currencySymbol} {formatCurrency(cifDisplay, displayCurrency)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* 5. General Cargo Items Table */}
      {!vehicleItem && (
        <div className="mt-8 space-y-2">
          <h2 className="text-sm font-bold bg-green-950 text-white px-4 py-2.5 uppercase tracking-wider">
            Shipment Cargo Items
          </h2>
          <table className="w-full border-collapse border-2 border-green-950 text-xs">
            <thead>
              <tr className="bg-green-100 text-green-950 font-black uppercase">
                <th className="border border-green-300 p-3 text-left">Cargo Description</th>
                <th className="border border-green-300 p-3">HS Code</th>
                <th className="border border-green-300 p-3 text-right">Declared Value (USD)</th>
                <th className="border border-green-300 p-3 text-right">Weight (kg)</th>
              </tr>
            </thead>
            <tbody>
              {estimate.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="border border-gray-300 p-3 font-semibold">{item.title}</td>
                  <td className="border border-gray-300 p-3 text-center font-mono font-bold text-green-955 bg-green-50/10">{item.hsCode}</td>
                  <td className="border border-gray-300 p-3 text-right font-mono">${item.valueUsd !== undefined ? formatCurrency(item.valueUsd, "USD") : "N/A"}</td>
                  <td className="border border-gray-300 p-3 text-right font-mono">{item.weightKg !== undefined ? `${item.weightKg} kg` : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 6. Taxes Payable Itemized List */}
      <div className="mt-8 space-y-2">
        <h2 className="text-sm font-bold bg-green-950 text-white px-4 py-2.5 uppercase tracking-wider">
          Taxes & Duties Payable Breakdown
        </h2>
        <table className="w-full border-collapse border-2 border-green-950 text-xs">
          <thead>
            <tr className="bg-green-100 text-green-950 font-black uppercase">
              <th className="border border-green-300 p-3 text-left">Tax / Levy Component</th>
              <th className="border border-green-300 p-3">Rate / Basis</th>
              <th className="border border-green-300 p-3 text-right">Amount ({displayCurrency})</th>
            </tr>
          </thead>
          <tbody>
            {estimate.lines.map((line, li) => (
              <tr key={li}>
                <td className="border border-gray-300 p-3 font-semibold text-gray-850">{line.name}</td>
                <td className="border border-gray-300 p-3 text-center font-mono">
                  {line.rate}% {line.method === "percentage" ? "percentage" : "flat"} of {line.basis}
                </td>
                <td className="border border-gray-300 p-3 text-right font-bold font-mono">
                  {currencySymbol} {formatCurrency(xafToDisplay(line.amount), displayCurrency)}
                </td>
              </tr>
            ))}
            {/* Grand Total */}
            <tr className="bg-green-950 text-white font-black text-base">
              <td className="border border-green-900 p-4" colSpan={2}>
                TOTAL TAXES & DUTIES PAYABLE
              </td>
              <td className="border border-green-900 p-4 text-right font-mono text-lg">
                {currencySymbol} {formatCurrency(dutyPayableDisplay, displayCurrency)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 7. Disclaimers & Scan Panel */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6 pt-6 border-t-4 border-green-950 items-start">
        {qrCodeImage && (
          <div className="md:col-span-1 flex flex-col items-center text-center space-y-2 bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
            <img
              src={qrCodeImage}
              alt="QR Code link"
              className="w-32 h-32 border-2 border-green-950 p-2 bg-white"
            />
            <span className="text-[9px] font-black text-gray-600 uppercase tracking-wider">
              Scan QR to View Online
            </span>
          </div>
        )}
        <div className={`text-[10px] text-gray-600 leading-relaxed space-y-2 ${qrCodeImage ? "md:col-span-3" : "md:col-span-4"}`}>
          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-3 rounded">
            <p className="font-bold text-yellow-900 mb-1">Important Disclaimer:</p>
            <p className="text-yellow-800">
              This is an estimated customs duty calculation. The computed tax amount may vary due to changes in currency exchange rates, customs valuation methods, and tariff updates at the time of cargo entry assessment. Duty estimates are for informational purposes only and should not be considered as final or binding amounts.
            </p>
          </div>
          <div className="bg-green-50 border-l-4 border-green-600 p-3 rounded mt-3">
            <p className="font-bold text-green-950 mb-1">Certificate Validity:</p>
            <p className="text-green-900">
              This certificate is generated based on current tariff data and exchange rates. For official customs clearance, please consult with licensed customs brokers or contact Kassongo Logistics for professional assistance.
            </p>
          </div>
          <div className="text-center mt-6 pt-4 border-t border-gray-300">
            <p className="font-black text-green-950 text-sm">Powered by Kassongo Logistics Systems</p>
            <p className="text-gray-500 text-[9px] mt-1">Real-time Trade Intelligence & Customs Automation Platform</p>
          </div>
        </div>
      </div>
    </div>
  );
}
