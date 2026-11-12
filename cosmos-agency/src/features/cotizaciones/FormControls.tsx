"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { MorphIcon } from "morphicons/react";
import { X } from "lucide";

export function MultiTagSelector({
  options,
  value,
  onChange,
  getLabel,
  selectLabel,
  max = Infinity,
  error = false,
  hidePlaceholder = false,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  getLabel: (v: string) => string;
  selectLabel?: string;
  max?: number;
  error?: boolean;
  hidePlaceholder?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap gap-2 rounded-xl p-1 ${error ? "ring-1 ring-red-500" : ""}`}
    >
      {value.length === 0 && !hidePlaceholder && (
        <span className="flex min-w-[110px] items-center justify-center rounded-full border border-dashed border-white/20 px-4 py-2 text-center text-sm text-white/40">
          {selectLabel}
        </span>
      )}
      {options.map((option) => {
        const isSelected = value.includes(option);
        const disabled = !isSelected && value.length >= max;
        return (
          <button
            key={option}
            type="button"
            disabled={disabled}
            onClick={() =>
              onChange(isSelected ? value.filter((v) => v !== option) : [...value, option])
            }
            className={`flex min-w-[110px] items-center justify-center gap-1.5 rounded-full border px-4 py-2 text-center text-sm transition-colors ${
              isSelected
                ? "border-[#d4ff00] bg-[#d4ff00] text-black"
                : disabled
                  ? "border-white/10 bg-white/5 text-white/30"
                  : "border-white/15 bg-white/5 text-white backdrop-blur-xl hover:border-white/30"
            }`}
          >
            {getLabel(option)}
            {isSelected && <MorphIcon icon={X} size={14} />}
          </button>
        );
      })}
    </div>
  );
}

export const inputClass =
  "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none backdrop-blur-xl placeholder:text-white/50 transition-shadow duration-300 focus:border-[#d4ff00] focus:shadow-[0_0_15px_rgba(212,255,0,0.4)]";

export function ErrorShake({
  trigger,
  active,
  children,
}: {
  trigger: number;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <motion.div
      key={active ? trigger : "idle"}
      animate={active && trigger > 0 ? { x: [0, -8, 8, -8, 8, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
