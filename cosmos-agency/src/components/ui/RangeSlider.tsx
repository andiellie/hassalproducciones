"use client";

import { useLanguage } from "@/lib/language";

const BUDGET_BRACKETS_ES = ["0-5,000", "10,000", "20,000", "30,000", "40,000", "+ de 40,000"];
const BUDGET_BRACKETS_EN = ["0-5,000", "10,000", "20,000", "30,000", "40,000", "40,000+"];

interface RangeSliderProps {
  value: number;
  onChange: (index: number) => void;
}

export default function RangeSlider({ value, onChange }: RangeSliderProps) {
  const { lang } = useLanguage();
  const brackets = lang === "es" ? BUDGET_BRACKETS_ES : BUDGET_BRACKETS_EN;
  const t = lang === "es"
    ? { label: "Presupuesto (MXN)", hint: "(Opcional pero recomendable)" }
    : { label: "Budget (MXN)", hint: "(Optional, but recommended.)" };

  // Clamped so the displayed value can never fall out of sync with the brackets
  // array (e.g. a stale index after a language switch), regardless of slider state.
  const safeValue = Math.min(Math.max(value, 0), brackets.length - 1);

  return (
    <div className="w-full">
      <div className="mb-2 text-sm text-white">
        {t.label} <span className="text-xs italic text-white/50">{t.hint}</span>
      </div>
      <input
        type="range"
        min={0}
        max={brackets.length - 1}
        step={1}
        value={safeValue}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#d4ff00]"
      />
      <div className="mt-2 flex flex-wrap justify-between gap-x-1 gap-y-1 text-[10px] text-white/90 sm:text-xs">
        {brackets.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}
