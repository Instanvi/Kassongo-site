"use client";

// Partner countries with Kasongo
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
];

const rows = [
  [0, 1, 2, 3],     
  [4, 5, 6],         
  [7, 8, 9, 10],     
];

export default function NetworkCountriesGrid() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900">
            Our Global Network
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Kasongo operates across {partnerCountries.length} countries, connecting markets worldwide
          </p>
        </div>

        {/* Centralized Grid - 4-3-4 Pattern */}
        <div className="space-y-3">
          {rows.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className="flex justify-center gap-3"
            >
              {row.map((countryIndex) => {
                const country = partnerCountries[countryIndex];
                
                return (
                  <div
                    key={country.code}
                    className="bg-white border border-gray-200 p-4 flex flex-col items-center justify-center text-center"
                    style={{
                      width: '180px',
                      height: '130px',
                    }}
                  >
                    {/* Flag */}
                    <span
                      className={`fi fi-${country.code} mb-3`}
                      style={{
                        width: '3.5rem',
                        height: '2.625rem',
                        display: 'block',
                        backgroundSize: 'cover',
                      }}
                    />

                    {/* Country Name */}
                    <h3 className="text-sm font-bold text-gray-900">
                      {country.label}
                    </h3>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Network Stats - Simplified */}
        <div className="mt-12 flex justify-center gap-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{partnerCountries.length}+</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">5</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Continents</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">24/7</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Operations</div>
          </div>
        </div>
      </div>
    </section>
  );
}
