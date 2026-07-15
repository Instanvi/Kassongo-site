"use client";

const countries = [
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

export default function CountryFlagsSection() {
  return (
    <section className="bg-gradient-to-r from-green-900 to-green-800 py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {countries.map((c) => (
            <div key={c.code} className="flex flex-col items-center gap-2.5">
              <span
                className={`fi fi-${c.code} shadow-soft-md`}
                style={{
                  width: "3rem",
                  height: "2.25rem",
                  borderRadius: "6px",
                  display: "block",
                  backgroundSize: "cover",
                }}
              />
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/90">
                {c.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
