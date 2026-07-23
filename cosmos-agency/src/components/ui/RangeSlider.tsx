"use client";

interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  formatLabel?: (value: number) => string;
}

export default function RangeSlider({
  min = 0,
  max = 40000,
  step = 1000,
  value,
  onChange,
  formatLabel = (v) => `$${v.toLocaleString("es-MX")}${v >= max ? "+" : ""}`,
}: RangeSliderProps) {
  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between text-sm text-slate-400">
        <span>Presupuesto</span>
        <span className="font-medium text-[#d4ff00]">{formatLabel(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-[#d4ff00]"
      />
    </div>
  );
}
