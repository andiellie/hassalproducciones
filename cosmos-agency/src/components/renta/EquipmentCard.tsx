"use client";

import { motion } from "framer-motion";
import { formatCurrencyMXN } from "@/lib/utils";
import type { Equipment } from "@/types";

export default function EquipmentCard({ item }: { item: Equipment }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative w-64 shrink-0 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40"
    >
      <div className="aspect-video bg-slate-800" />
      <div className="p-4">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-slate-400">{item.category}</p>
        <p className="mt-2 text-sm font-medium text-[#d4ff00]">
          {formatCurrencyMXN(item.dailyRate)} / día
        </p>
      </div>

      <div className="absolute inset-0 flex flex-col justify-end bg-slate-950/90 p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <h4 className="text-sm font-semibold">Ficha técnica</h4>
        <ul className="mt-2 space-y-1 text-xs text-slate-400">
          {item.specs.map((spec) => (
            <li key={spec}>{spec}</li>
          ))}
        </ul>
        <h4 className="mt-3 text-sm font-semibold">Requisitos</h4>
        <ul className="mt-2 space-y-1 text-xs text-slate-400">
          {item.requirements.map((req) => (
            <li key={req}>{req}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
