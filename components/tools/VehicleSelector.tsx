"use client";

import { useState } from "react";
import { Car, RefreshCw } from "lucide-react";

interface VehicleSelectorProps {
  vin?: string;
  isCar?: boolean;
  onChange: (patch: {
    vin?: string;
    title?: string;
    make?: string;
    model?: string;
    year?: number;
    engineCapacityCc?: number;
    valueUsd?: number;
    fuelType?: string;
    bodyStyle?: string;
    condition?: string;
    originRegion?: string;
    trim?: string;
  }) => void;
  onDecode: (vin: string) => Promise<{
    brand: string;
    model: string;
    year: number;
    engineCapacityCc: number;
    category: string;
  }>;
}

const POPULAR_MAKES = [
  "Toyota",
  "Honda",
  "Mercedes-Benz",
  "BMW",
  "Nissan",
  "Hyundai",
  "Kia",
  "Ford",
  "Lexus",
  "Land Rover",
  "Peugeot",
  "Chevrolet",
  "Audi",
  "Volkswagen",
  "Mazda",
  "Mitsubishi",
  "Suzuki",
];

const FUEL_TYPES = ["Petrol", "Diesel", "Hybrid", "Electric"];

const BODY_STYLES = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Coupe",
  "Convertible",
  "Pickup",
  "Van",
  "Wagon",
  "Other",
];

const VEHICLE_CONDITIONS = ["New", "Used", "Salvage"];

const REGIONS = ["Europe", "Asia", "North America", "Africa", "South America", "Oceania"];

export default function VehicleSelector({
  vin = "",
  onChange,
  onDecode,
}: VehicleSelectorProps) {
  const [decoding, setDecoding] = useState(false);
  const [decodeError, setDecodeError] = useState<string | null>(null);

  // Form states (internal/local mirror to control editable inputs)
  const [make, setLocalMake] = useState("");
  const [model, setLocalModel] = useState("");
  const [year, setLocalYear] = useState<number>(new Date().getFullYear());
  const [engineCapacity, setLocalEngineCapacity] = useState<number>(1800);
  const [fuelType, setLocalFuelType] = useState("Petrol");
  const [bodyStyle, setLocalBodyStyle] = useState("Sedan");
  const [condition, setLocalCondition] = useState("Used");
  const [originRegion, setLocalOriginRegion] = useState("Asia");
  const [trim, setLocalTrim] = useState("");

  const [showOtherMake, setShowOtherMake] = useState(false);

  const handleVinChange = (val: string) => {
    const cleaned = val.toUpperCase().trim().slice(0, 17);
    onChange({ vin: cleaned });
  };

  const triggerDecode = async () => {
    if (!vin || vin.length < 11) return;
    setDecoding(true);
    setDecodeError(null);
    try {
      const data = await onDecode(vin);
      // Update form values
      setLocalMake(data.brand);
      setLocalModel(data.model);
      setLocalYear(data.year);
      setLocalEngineCapacity(data.engineCapacityCc);
      
      const categoryMapped = BODY_STYLES.includes(data.category) ? data.category : "Sedan";
      setLocalBodyStyle(categoryMapped);
      setShowOtherMake(!POPULAR_MAKES.includes(data.brand));

      // Propagate changes to item title
      const titleStr = `${data.brand} ${data.model} ${data.year} (${data.engineCapacityCc}cc)`;
      onChange({
        title: titleStr,
        vin: vin,
        make: data.brand,
        model: data.model,
        year: data.year,
        engineCapacityCc: data.engineCapacityCc,
        bodyStyle: categoryMapped,
      });
    } catch (err: any) {
      console.error(err);
      setDecodeError(err.message || "Could not decode VIN. Please enter manually.");
    } finally {
      setDecoding(false);
    }
  };

  const handleManualChange = (patch: {
    make?: string;
    model?: string;
    year?: number;
    engineCapacityCc?: number;
    fuelType?: string;
    bodyStyle?: string;
    condition?: string;
    originRegion?: string;
    trim?: string;
  }) => {
    const nextMake = patch.make !== undefined ? patch.make : make;
    const nextModel = patch.model !== undefined ? patch.model : model;
    const nextYear = patch.year !== undefined ? patch.year : year;
    const nextCapacity = patch.engineCapacityCc !== undefined ? patch.engineCapacityCc : engineCapacity;
    const nextFuel = patch.fuelType !== undefined ? patch.fuelType : fuelType;
    const nextBody = patch.bodyStyle !== undefined ? patch.bodyStyle : bodyStyle;
    const nextCond = patch.condition !== undefined ? patch.condition : condition;
    const nextReg = patch.originRegion !== undefined ? patch.originRegion : originRegion;
    const nextTrim = patch.trim !== undefined ? patch.trim : trim;

    if (patch.make !== undefined) setLocalMake(patch.make);
    if (patch.model !== undefined) setLocalModel(patch.model);
    if (patch.year !== undefined) setLocalYear(patch.year);
    if (patch.engineCapacityCc !== undefined) setLocalEngineCapacity(patch.engineCapacityCc);
    if (patch.fuelType !== undefined) setLocalFuelType(patch.fuelType);
    if (patch.bodyStyle !== undefined) setLocalBodyStyle(patch.bodyStyle);
    if (patch.condition !== undefined) setLocalCondition(patch.condition);
    if (patch.originRegion !== undefined) setLocalOriginRegion(patch.originRegion);
    if (patch.trim !== undefined) setLocalTrim(patch.trim);

    const titleStr = `${nextMake || "Vehicle"} ${nextModel || ""} ${nextYear || ""} ${nextTrim || ""} (${nextCapacity || 0}cc, ${nextFuel}, ${nextBody}, ${nextCond})`.trim();
    
    onChange({
      title: titleStr,
      make: nextMake,
      model: nextModel,
      year: nextYear,
      engineCapacityCc: nextCapacity,
      fuelType: nextFuel,
      bodyStyle: nextBody,
      condition: nextCond,
      originRegion: nextReg,
      trim: nextTrim,
    });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 40 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-100 animate-in fade-in duration-200">
      <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
        <Car className="w-4 h-4 text-green-800" />
        <span>Vehicle Specifications</span>
      </div>

      {/* VIN Decoding */}
      <div className="space-y-1">
        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
          VIN (Vehicle Identification Number)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={vin}
            onChange={(e) => handleVinChange(e.target.value)}
            placeholder="Enter 11-17 character VIN"
            maxLength={17}
            className="flex-1 px-3 py-2 border border-slate-200/60 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
          />
          <button
            type="button"
            onClick={triggerDecode}
            disabled={decoding || !vin || vin.length < 11}
            className="px-4 py-2 bg-green-900 hover:bg-green-800 text-white text-xs font-bold rounded-lg disabled:bg-gray-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            {decoding ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Decoding...</span>
              </>
            ) : (
              <span>Decode VIN</span>
            )}
          </button>
        </div>
        {decodeError && <p className="text-[10px] text-red-500 mt-1">{decodeError}</p>}
      </div>

      <div className="border-t border-slate-200/60 my-2 pt-2" />

      {/* Manual Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Make/Brand Selector */}
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            Make / Brand
          </label>
          {showOtherMake ? (
            <div className="flex gap-1.5">
              <input
                type="text"
                value={make}
                onChange={(e) => handleManualChange({ make: e.target.value })}
                placeholder="Enter Make"
                className="flex-1 px-3 py-2 border border-slate-200/60 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
              />
              <button
                type="button"
                onClick={() => {
                  setShowOtherMake(false);
                  handleManualChange({ make: POPULAR_MAKES[0] });
                }}
                className="px-2.5 py-1.5 bg-gray-200 text-gray-700 hover:bg-gray-300 text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
              >
                List
              </button>
            </div>
          ) : (
            <select
              value={make}
              onChange={(e) => {
                if (e.target.value === "Other") {
                  setShowOtherMake(true);
                  handleManualChange({ make: "" });
                } else {
                  handleManualChange({ make: e.target.value });
                }
              }}
              className="w-full px-3 py-2 bg-white border border-slate-200/60 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer"
            >
              <option value="">Select Make...</option>
              {POPULAR_MAKES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
              <option value="Other">Other Make / Brand...</option>
            </select>
          )}
        </div>

        {/* Model */}
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            Model
          </label>
          <input
            type="text"
            value={model}
            onChange={(e) => handleManualChange({ model: e.target.value })}
            placeholder="e.g. Corolla, GLE 350"
            className="w-full px-3 py-2 border border-slate-200/60 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
          />
        </div>

        {/* Special Feature / Trim */}
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            Special Feature / Trim
          </label>
          <input
            type="text"
            value={trim}
            onChange={(e) => handleManualChange({ trim: e.target.value })}
            placeholder="e.g. AMG, Sport, Convertible"
            className="w-full px-3 py-2 border border-slate-200/60 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
          />
        </div>

        {/* Year */}
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            Year of Manufacture
          </label>
          <select
            value={year || ""}
            onChange={(e) => handleManualChange({ year: parseInt(e.target.value) || undefined })}
            className="w-full px-3 py-2 bg-white border border-slate-200/60 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer"
          >
            <option value="">Select Year...</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Engine capacity */}
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            Engine Capacity (cc)
          </label>
          <input
            type="number"
            value={engineCapacity || ""}
            onChange={(e) => handleManualChange({ engineCapacityCc: parseInt(e.target.value) || undefined })}
            placeholder="e.g. 1800, 3500"
            min="1"
            className="w-full px-3 py-2 border border-slate-200/60 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
          />
        </div>

        {/* Fuel Type */}
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            Fuel Type
          </label>
          <select
            value={fuelType}
            onChange={(e) => handleManualChange({ fuelType: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-slate-200/60 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer"
          >
            {FUEL_TYPES.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* Body Style */}
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            Body Style
          </label>
          <select
            value={bodyStyle}
            onChange={(e) => handleManualChange({ bodyStyle: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-slate-200/60 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer"
          >
            {BODY_STYLES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Region of Origin */}
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            Region of Origin
          </label>
          <select
            value={originRegion}
            onChange={(e) => handleManualChange({ originRegion: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-slate-200/60 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer"
          >
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Vehicle Condition */}
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            Vehicle Condition
          </label>
          <select
            value={condition}
            onChange={(e) => handleManualChange({ condition: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-slate-200/60 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer"
          >
            {VEHICLE_CONDITIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
