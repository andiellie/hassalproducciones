"use client";

export const BUDGET_BRACKETS = ["0-5,000", "10,000", "20,000", "30,000", "40,000", "+ de 40,000"];

interface RangeSliderProps {
  value: number;
  onChange: (index: number) => void;
}

export default function RangeSlider({ value, onChange }: RangeSliderProps) {
  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between text-sm text-white">
        <span>Presupuesto (MXN)</span>
        <span className="font-medium text-[#d4ff00]">${BUDGET_BRACKETS[value]}</span>
      </div>
      <input
        type="range"
        min={0}
        max={BUDGET_BRACKETS.length - 1}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#d4ff00]"
      />
      <div className="mt-2 flex justify-between text-xs text-white/90">
        {BUDGET_BRACKETS.map((label, i) => (
          <span key={label} className={i !== 0 && i !== BUDGET_BRACKETS.length - 1 ? "hidden sm:inline" : undefined}>
            {label}
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs text-white/90">Opcional pero recomendable.</p>
    </div>
  );
}
