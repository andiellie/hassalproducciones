"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import type { Lang } from "@/lib/i18n";

const RANGE_DAYS = 5;

const MONTHS: Record<Lang, string[]> = {
  es: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

const WEEKDAYS: Record<Lang, string[]> = {
  es: ["D", "L", "M", "M", "J", "V", "S"],
  en: ["S", "M", "T", "W", "T", "F", "S"],
};

const DATE_LOCALE: Record<Lang, string> = { es: "es-MX", en: "en-US" };

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function toISO(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function fromISO(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function addDays(d: Date, n: number) {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + n);
  return copy;
}

export default function EstimatedDatePicker({
  value,
  onChange,
  lang,
  error = false,
}: {
  value: string;
  onChange: (value: string) => void;
  lang: Lang;
  error?: boolean;
}) {
  const today = startOfDay(new Date());
  const selected = value ? fromISO(value) : null;
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(() => selected ?? today);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const firstOfMonth = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const leadingBlanks = firstOfMonth.getDay();
  const cells: (Date | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(cursor.getFullYear(), cursor.getMonth(), i + 1)),
  ];

  const isSameMonthAsToday = cursor.getFullYear() === today.getFullYear() && cursor.getMonth() === today.getMonth();

  const rangeEnd = selected ? addDays(selected, RANGE_DAYS - 1) : null;

  const label = selected
    ? `${selected.toLocaleDateString(DATE_LOCALE[lang], { day: "numeric", month: "short" })} – ${rangeEnd!.toLocaleDateString(DATE_LOCALE[lang], { day: "numeric", month: "short", year: "numeric" })}`
    : null;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between gap-2 rounded-2xl border bg-white/5 px-4 py-3 text-left text-sm text-white outline-none backdrop-blur-xl transition-shadow duration-300 ${
          error
            ? "border-red-500"
            : "border-white/15 focus:border-[#d4ff00] focus:shadow-[0_0_15px_rgba(212,255,0,0.4)]"
        }`}
      >
        <span className={label ? "text-white" : "text-white/50"}>
          {label ?? (lang === "es" ? "Selecciona una fecha" : "Select a date")}
        </span>
        <CalendarDays className={`h-4 w-4 shrink-0 ${error ? "text-red-500" : "text-[#d4ff00]"}`} />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-72 max-w-[85vw] rounded-xl border border-white/15 bg-black/95 p-4 shadow-[0_0_25px_rgba(212,255,0,0.15)] backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              disabled={isSameMonthAsToday}
              onClick={() => setCursor((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium text-white">
              {MONTHS[lang][cursor.getMonth()]} {cursor.getFullYear()}
            </span>
            <button
              type="button"
              onClick={() => setCursor((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs text-white/50">
            {WEEKDAYS[lang].map((d, i) => (
              <span key={`${d}-${i}`} className="py-1">
                {d}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((date, i) => {
              if (!date) return <span key={`blank-${i}`} />;
              const disabled = date < today;
              const isSelected = selected && date.getTime() === selected.getTime();
              const inRange = selected && rangeEnd && date > selected && date <= rangeEnd;

              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onChange(toISO(date));
                    setOpen(false);
                  }}
                  className={`flex aspect-square w-full items-center justify-center rounded-full text-xs transition-colors ${
                    isSelected
                      ? "bg-[#d4ff00] font-semibold text-black"
                      : inRange
                        ? "bg-[#d4ff00]/25 text-white"
                        : disabled
                          ? "text-white/20"
                          : "text-white hover:bg-white/10"
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
