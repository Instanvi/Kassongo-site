"use client";

import { useTranslations } from 'next-intl';

import { motion } from "framer-motion";

const partnerCountries = [
  { code: "cn", label: "China" },
  { code: "ca", label: "Canada" },
  { code: "cm", label: "Cameroon" },
  { code: "us", label: "USA" },
  { code: "ng", label: "Nigeria" },
  { code: "fr", label: "France" },
  { code: "de", label: "Germany" },
  { code: "ae", label: "UAE" },
  { code: "gb", label: "U.K" },
  { code: "za", label: "S.A" },
  { code: "be", label: "Belgium" },
  { code: "tr", label: "Turkey" },
  { code: "jp", label: "Japan" },
  { code: "ke", label: "Kenya" },
  { code: "in", label: "India" },
  { code: "br", label: "Brazil" },
  { code: "th", label: "Thailand" },
  { code: "kr", label: "South Korea" },
  { code: "bj", label: "Benin" },
];

const ROW_CONFIG = [
  { direction: "right", seed: 123 },
  { direction: "left", seed: 456 },
  { direction: "right", seed: 789 },
];

const GLOBAL_DURATION = 40;

function shuffleArrayWithSeed<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  let currentSeed = seed;
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    const j = Math.floor((currentSeed / 233280) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface MarqueeRowProps {
  countries: Array<{ code: string; label: string }>;
  seed: number;
  direction: string;
  duration: number;
}

function MarqueeRow({ countries, seed, direction, duration }: MarqueeRowProps) {
  // Completely shuffles order per row so vertical alignments never match up
  const shuffledRows = shuffleArrayWithSeed(countries, seed);
  
  // Double the set for a perfect pixel-for-pixel loop match
  const items = [...shuffledRows, ...shuffledRows];
  const isLeft = direction === "left";

  return (
    <div className="relative overflow-hidden py-2 w-full flex items-center">
      {/* Edge gradient blurs */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />

      <motion.div
        className="flex gap-6 w-max shrink-0"
        animate={{
          x: isLeft ? [0, "-50%"] : ["-50%", 0],
        }}
        transition={{
          ease: "linear",
          duration: duration,
          repeat: Infinity,
        }}
      >
        {items.map((country, i) => (
          <div
            key={`${country.code}-${seed}-${i}`}
            className="flex items-center gap-3 bg-gray-50 px-4 py-2 border border-gray-100 shrink-0 rounded-md"
          >
            <span
              className={`fi fi-${country.code} rounded-full shadow-sm`}
              style={{
                width: "2rem",
                height: "2rem",
                display: "inline-block",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
              {country.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function NetworkCountriesGrid() {
  const t = useTranslations();

  return (
    <section className="py-16 bg-white border-t border-gray-100 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900">
            {t("network.title")}
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            {t("network.subtitle", { count: partnerCountries.length })}
          </p>
        </div>

        <div className="space-y-4 w-full">
          {ROW_CONFIG.map((config, rowIndex) => (
            <MarqueeRow
              key={rowIndex}
              countries={partnerCountries}
              seed={config.seed}
              direction={config.direction}
              duration={GLOBAL_DURATION}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center gap-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {partnerCountries.length}+
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">
              {t("network.stats.countries")}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">5</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">
              {t("network.stats.continents")}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">24/7</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">
              {t("network.stats.operations")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}