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

export interface FeeItem {
  name: string;
  rateLabel: string;
  amount: number; // In USD (base currency)
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
  cifValue: number // In USD
): { 
  duty: number; 
  vat: number; 
  total: number; 
  fees: FeeItem[];
  rate: TariffRate;
} {
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

  // 4. Zone-specific tax calculations
  const fees: FeeItem[] = [];
  const duty = (cifValue * dutyRate) / 100;
  fees.push({ name: "Customs Duty", rateLabel: `${dutyRate}%`, amount: duty });

  let vatRate = VAT_RATES[destination] !== undefined ? VAT_RATES[destination] : 15;
  let vat = 0;

  if (destination === "CM") {
    // CEMAC Region (Cameroon)
    const sgs = cifValue * 0.0095; // SGS Fee (0.95%)
    const tci = cifValue * 0.01;   // Communal Integration Tax (1%)
    const ohada = cifValue * 0.0005; // OHADA Levy (0.05%)
    
    fees.push({ name: "SGS Inspection Fee", rateLabel: "0.95%", amount: sgs });
    fees.push({ name: "Communal Integration Tax (TCI)", rateLabel: "1%", amount: tci });
    fees.push({ name: "OHADA Development Levy", rateLabel: "0.05%", amount: ohada });

    const vatBase = cifValue + duty + sgs + tci;
    vat = vatBase * 0.1925; // 19.25% VAT
    fees.push({ name: "Import VAT", rateLabel: "19.25%", amount: vat });
  } else if (destination === "NG") {
    // ECOWAS Region (Nigeria)
    const ciss = cifValue * 0.01;   // CISS Fee (1%)
    const etls = cifValue * 0.005;  // ETLS Levy (0.5%)
    const port = duty * 0.07;       // Port Development Levy (7% of Customs Duty)

    fees.push({ name: "CISS Inspection Fee", rateLabel: "1%", amount: ciss });
    fees.push({ name: "ECOWAS Levy (ETLS)", rateLabel: "0.5%", amount: etls });
    fees.push({ name: "Port Development Levy", rateLabel: "7% of Duty", amount: port });

    const vatBase = cifValue + duty + ciss + etls + port;
    vat = vatBase * 0.075; // 7.5% VAT
    fees.push({ name: "Import VAT", rateLabel: "7.5%", amount: vat });
  } else if (destination === "GH") {
    // ECOWAS Region (Ghana - matching Auto Duty Checker)
    const sil = cifValue * 0.02;      // Special Import Levy (2%)
    const exim = cifValue * 0.0075;   // Exim Bank Levy (0.75%)
    const au = cifValue * 0.002;      // Africa Union Import Levy (0.2%)
    
    const getfund = (cifValue + duty) * 0.025; // GETFund (2.5%)
    const nhil = (cifValue + duty) * 0.025;    // NHIL (2.5%)
    const covid = (cifValue + duty) * 0.01;    // COVID-19 Levy (1%)

    fees.push({ name: "Special Import Levy", rateLabel: "2%", amount: sil });
    fees.push({ name: "Ghana Exim Bank Levy", rateLabel: "0.75%", amount: exim });
    fees.push({ name: "Africa Union Import Levy", rateLabel: "0.2%", amount: au });
    fees.push({ name: "GETFund Levy", rateLabel: "2.5%", amount: getfund });
    fees.push({ name: "National Health Insurance (NHIL)", rateLabel: "2.5%", amount: nhil });
    fees.push({ name: "COVID-19 Health Recovery Levy", rateLabel: "1%", amount: covid });

    const vatBase = cifValue + duty + getfund + nhil + covid;
    vat = vatBase * 0.15; // 15% VAT
    fees.push({ name: "Import VAT", rateLabel: "15%", amount: vat });
  } else if (destination === "KE") {
    // EAC Region (Kenya)
    const idf = cifValue * 0.035; // IDF Fee (3.5%)
    const rdl = cifValue * 0.02;  // RDL Levy (2%)

    fees.push({ name: "Import Declaration Fee (IDF)", rateLabel: "3.5%", amount: idf });
    fees.push({ name: "Railway Development Levy (RDL)", rateLabel: "2%", amount: rdl });

    const vatBase = cifValue + duty + idf + rdl;
    vat = vatBase * 0.16; // 16% VAT
    fees.push({ name: "Import VAT", rateLabel: "16%", amount: vat });
  } else {
    // Standard default case (US, UK, Europe, etc.)
    const vatBase = cifValue + duty;
    vat = (vatBase * vatRate) / 100;
    if (vatRate > 0) {
      fees.push({ name: "Import VAT / GST", rateLabel: `${vatRate}%`, amount: vat });
    }
  }

  // Calculate sum totals
  const totalFees = fees.reduce((sum, f) => sum + f.amount, 0);

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
    total: Math.round(totalFees * 100) / 100,
    fees,
    rate,
  };
}

export function getCurrencyForCountry(countryCode: string): string {
  const mapping: Record<string, string> = {
    CM: "XAF", GA: "XAF", GQ: "XAF", TD: "XAF", CF: "XAF", CG: "XAF",
    BJ: "XAF", BF: "XAF", CI: "XAF", GW: "XAF", ML: "XAF", NE: "XAF", SN: "XAF", TG: "XAF",
    US: "USD",
    CN: "CNY",
    GB: "GBP",
    GH: "GHS", // Mapped to GHS (Ghanaian Cedi)
    DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", NL: "EUR", BE: "EUR", AT: "EUR", FI: "EUR", PT: "EUR", IE: "EUR",
    CH: "EUR",
    NG: "NGN",
    KE: "KES",
    ZA: "ZAR",
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
