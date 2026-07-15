import { getCountryByCode } from "./countries";
import { getHSCodeByCode } from "./hs-codes";

export interface TariffRate {
  origin: string;
  destination: string;
  hsCode: string;
  dutyRate: number;
  vatRate: number;
  currency: string;
  notes?: string;
}

// Common trade route tariffs (exact database matching)
export const TARIFF_RATES: TariffRate[] = [
  // Electronics: Laptops (8471.30)
  { origin: "CN", destination: "US", hsCode: "8471.30", dutyRate: 0, vatRate: 0, currency: "USD", notes: "Section 301 may apply" },
  { origin: "CN", destination: "GB", hsCode: "8471.30", dutyRate: 0, vatRate: 20, currency: "GBP", notes: "VAT on CIF value" },
  { origin: "CN", destination: "DE", hsCode: "8471.30", dutyRate: 0, vatRate: 19, currency: "EUR", notes: "EU TARIC" },
  { origin: "US", destination: "GB", hsCode: "8471.30", dutyRate: 0, vatRate: 20, currency: "GBP", notes: "US-UK FTA pending" },
  { origin: "KR", destination: "US", hsCode: "8471.30", dutyRate: 0, vatRate: 0, currency: "USD", notes: "KORUS FTA" },
  { origin: "VN", destination: "US", hsCode: "8471.30", dutyRate: 0, vatRate: 0, currency: "USD", notes: "GSP eligible" },

  // Phones (8517.12 / 8517.13)
  { origin: "CN", destination: "US", hsCode: "8517.12", dutyRate: 0, vatRate: 0, currency: "USD", notes: "Section 301: 7.5% additional" },
  { origin: "CN", destination: "US", hsCode: "8517.13", dutyRate: 0, vatRate: 0, currency: "USD", notes: "Section 301: 7.5% additional" },
  { origin: "CN", destination: "GB", hsCode: "8517.12", dutyRate: 0, vatRate: 20, currency: "GBP" },
  { origin: "CN", destination: "DE", hsCode: "8517.12", dutyRate: 0, vatRate: 19, currency: "EUR" },

  // Clothing: T-shirts (6109.10)
  { origin: "CN", destination: "US", hsCode: "6109.10", dutyRate: 16.5, vatRate: 0, currency: "USD" },
  { origin: "CN", destination: "GB", hsCode: "6109.10", dutyRate: 12, vatRate: 20, currency: "GBP" },
  { origin: "CN", destination: "DE", hsCode: "6109.10", dutyRate: 12, vatRate: 19, currency: "EUR" },
  { origin: "BD", destination: "US", hsCode: "6109.10", dutyRate: 0, vatRate: 0, currency: "USD", notes: "GSP eligible" },
  { origin: "KE", destination: "US", hsCode: "6109.10", dutyRate: 0, vatRate: 0, currency: "USD", notes: "AGOA eligible" },
  { origin: "KE", destination: "GB", hsCode: "6109.10", dutyRate: 0, vatRate: 20, currency: "GBP", notes: "EPA East Africa" },

  // Footwear (6403.99)
  { origin: "CN", destination: "US", hsCode: "6403.99", dutyRate: 6, vatRate: 0, currency: "USD" },
  { origin: "CN", destination: "GB", hsCode: "6403.99", dutyRate: 8, vatRate: 20, currency: "GBP" },

  // Coffee (0901.21)
  { origin: "ET", destination: "US", hsCode: "0901.21", dutyRate: 0, vatRate: 0, currency: "USD", notes: "AGOA eligible" },
  { origin: "KE", destination: "US", hsCode: "0901.21", dutyRate: 0, vatRate: 0, currency: "USD", notes: "AGOA eligible" },
  { origin: "BR", destination: "US", hsCode: "0901.21", dutyRate: 0, vatRate: 0, currency: "USD", notes: "GSP eligible" },

  // Vehicles (8703.23 / 8703.24)
  { origin: "JP", destination: "US", hsCode: "8703.23", dutyRate: 2.5, vatRate: 0, currency: "USD" },
  { origin: "DE", destination: "US", hsCode: "8703.23", dutyRate: 2.5, vatRate: 0, currency: "USD" },
  { origin: "MX", destination: "US", hsCode: "8703.23", dutyRate: 0, vatRate: 0, currency: "USD", notes: "USMCA" },
];

// Mapping of standard VAT/GST rates by country
export const VAT_RATES: Record<string, number> = {
  US: 0,       // No national VAT (sales tax is state-level)
  CA: 5,       // GST
  CN: 13,      // China VAT
  GB: 20,      // UK VAT
  DE: 19,      // Germany VAT
  FR: 20,      // France VAT
  IT: 22,      // Italy VAT
  ES: 21,      // Spain VAT
  NL: 21,      // Netherlands VAT
  BE: 21,      // Belgium VAT
  CH: 8.1,     // Switzerland VAT
  AU: 10,      // Australia GST
  NZ: 15,      // New Zealand GST
  ZA: 15,      // South Africa VAT
  NG: 7.5,     // Nigeria VAT
  KE: 16,      // Kenya VAT
  GH: 15,      // Ghana VAT
  CM: 19.25,   // Cameroon VAT
  CD: 16,      // DR Congo VAT
  UG: 18,      // Uganda VAT
  TZ: 18,      // Tanzania VAT
  RW: 18,      // Rwanda VAT
  ET: 15,      // Ethiopia VAT
  EG: 14,      // Egypt VAT
  MA: 20,      // Morocco VAT
  CI: 18,      // Ivory Coast VAT
  SN: 18,      // Senegal VAT
  AE: 5,       // UAE VAT
  SA: 15,      // Saudi Arabia VAT
  IN: 18,      // India GST average
  SG: 9,       // Singapore GST
  MY: 6,       // Malaysia SST
  BR: 17,      // Brazil average ICMS
};

// Map estimated duty rates by product category
export const CATEGORY_DUTIES: Record<string, number> = {
  Electronics: 2,       // Low duty to promote tech adoption
  Clothing: 20,        // High duty to protect local textiles
  Footwear: 18,
  Toys: 10,
  Sports: 10,
  Packaging: 8,
  Bags: 15,
  Furniture: 15,
  Cosmetics: 30,       // Luxury item, high duty rate
  Pharma: 0,           // Essential medicine, duty-free
  Food: 12,
  Vehicles: 25,        // High duty on motor vehicles
  Home: 15,
  Industrial: 5,
  Medical: 0,          // Medical supplies, duty-free
  Watches: 10,
  Musical: 10,
  Weapons: 35,         // Highly restricted, highest duties
  Household: 12,
  Stationery: 8,
  Personal: 10,
  Art: 5,
};

export function calculateDuty(
  origin: string,
  destination: string,
  hsCode: string,
  cifValue: number
): { duty: number; vat: number; total: number; rate: TariffRate } {
  // 1. Try to find exact match in static database
  let dbRate = TARIFF_RATES.find(
    (r) => r.origin === origin && r.destination === destination && r.hsCode === hsCode
  );

  let dutyRate = 10; // Default fallback
  let notes = "";

  if (dbRate) {
    dutyRate = dbRate.dutyRate;
    notes = dbRate.notes || "";
  } else {
    // 2. Perform dynamic estimate
    const hsItem = getHSCodeByCode(hsCode);
    const category = hsItem ? hsItem.category : "Other";
    dutyRate = CATEGORY_DUTIES[category] !== undefined ? CATEGORY_DUTIES[category] : 10;

    const originCountry = getCountryByCode(origin);
    const destCountry = getCountryByCode(destination);

    // 3. Trade agreements adjustment
    if (originCountry && destCountry) {
      if (originCountry.region === "Africa" && destCountry.region === "Africa") {
        // AfCFTA preference
        dutyRate = Math.max(0, Math.round(dutyRate * 0.25)); // 75% reduction
        notes = "AfCFTA preferential tariff applied (intra-African trade)";
      } else if (originCountry.region === "Europe" && destCountry.region === "Europe") {
        // EU Single Market
        dutyRate = 0;
        notes = "EU Single Market free trade rate";
      } else if (
        ["US", "CA", "MX"].includes(origin) &&
        ["US", "CA", "MX"].includes(destination)
      ) {
        // USMCA
        dutyRate = 0;
        notes = "USMCA trade agreement rate";
      } else if (origin === "KE" && ["GB", "DE", "FR", "NL", "BE"].includes(destination)) {
        dutyRate = 0;
        notes = "EPA preferential rate for East Africa to EU/UK";
      } else if (originCountry.region === "Africa" && destination === "US") {
        dutyRate = 0;
        notes = "AGOA duty-free eligibility applies for qualifying African goods";
      }
    }
  }

  // 4. Determine VAT Rate
  const vatRate = VAT_RATES[destination] !== undefined ? VAT_RATES[destination] : 15;

  const duty = (cifValue * dutyRate) / 100;
  const vatBase = cifValue + duty; // VAT is calculated on CIF + Customs Duty
  const vat = (vatBase * vatRate) / 100;

  const destCurrency = getCurrencyForCountry(destination);

  const rate: TariffRate = {
    origin,
    destination,
    hsCode,
    dutyRate,
    vatRate,
    currency: destCurrency,
    notes: notes || (dbRate ? dbRate.notes : "Estimated standard rates"),
  };

  return {
    duty: Math.round(duty * 100) / 100,
    vat: Math.round(vat * 100) / 100,
    total: Math.round((duty + vat) * 100) / 100,
    rate,
  };
}

export function getCurrencyForCountry(countryCode: string): string {
  // Mapping for our target currencies
  const mapping: Record<string, string> = {
    // CEMAC (XAF)
    CM: "XAF", GA: "XAF", GQ: "XAF", TD: "XAF", CF: "XAF", CG: "XAF",
    // West Africa (XOF / mapped to XAF for currency conversion purposes as they are pegged 1:1)
    BJ: "XAF", BF: "XAF", CI: "XAF", GW: "XAF", ML: "XAF", NE: "XAF", SN: "XAF", TG: "XAF",
    // Major currencies
    US: "USD",
    CN: "CNY",
    GB: "GBP",
    DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", NL: "EUR", BE: "EUR", AT: "EUR", FI: "EUR", PT: "EUR", IE: "EUR",
    CH: "EUR",
    // African currencies
    NG: "NGN",
    KE: "KES",
    ZA: "ZAR",
    GH: "NGN", // Fallback to NGN or USD
    EG: "USD",
  };

  return mapping[countryCode] || "USD";
}

export function getTradeAgreements(origin: string, destination: string): string[] {
  const agreements: string[] = [];
  const o = getCountryByCode(origin);
  const d = getCountryByCode(destination);

  if (o && d) {
    if (o.region === "Africa" && d.region === "Africa") {
      agreements.push("AfCFTA (African Continental Free Trade Area)");
    }
    if (o.region === "Europe" && d.region === "Europe") {
      agreements.push("EU Customs Union");
    }
    if (["US", "CA", "MX"].includes(origin) && ["US", "CA", "MX"].includes(destination)) {
      agreements.push("USMCA (United States-Mexico-Canada Agreement)");
    }
    if (origin === "KE" && ["GB", "DE", "FR", "NL"].includes(destination)) {
      agreements.push("EPA (Economic Partnership Agreement)");
    }
    if (o.region === "Africa" && destination === "US") {
      agreements.push("AGOA (African Growth and Opportunity Act)");
    }
  }
  return agreements;
}
