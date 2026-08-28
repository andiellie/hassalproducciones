"use client";

import { useLanguage } from "@/lib/language";
import ExactColor from "@/components/ui/ExactColor";

const BUDGET_BRACKETS_ES = ["0-5,000", "10,000", "20,000", "30,000", "40,000", "+ de 40,000"];
const BUDGET_BRACKETS_EN = ["0-5,000", "10,000", "20,000", "30,000", "40,000", "+40,000"];

interface RangeSliderProps {
  value: number;
  onChange: (index: number) => void;
}

export default function RangeSlider({ value, onChange }: RangeSliderProps) {
  const { lang } = useLanguage();
  const brackets = lang === "es" ? BUDGET_BRACKETS_ES : BUDGET_BRACKETS_EN;
  const t = lang === "es"
    ? { label: "Presupuesto (MXN)", hint: "Opcional pero recomendable." }
    : { label: "Budget (MXN)", hint: "Optional but recommended." };

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between text-sm text-white">
        <span>{t.label}</span>
        <ExactColor className="font-medium text-[#d4ff00]">${brackets[value]}</ExactColor>
      </div>
      <input
        type="range"
        min={0}
        max={brackets.length - 1}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#d4ff00]"
      />
      <div className="mt-2 flex justify-between text-xs text-white/90">
        {brackets.map((label, i) => (
          <span key={label} className={i !== 0 && i !== brackets.length - 1 ? "hidden sm:inline" : undefined}>
            {label}
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs text-white/90">{t.hint}</p>
    </div>
  );
}
