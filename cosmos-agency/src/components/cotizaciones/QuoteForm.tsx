"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import RangeSlider from "@/components/ui/RangeSlider";
import type { QuoteFormData } from "@/types";

const steps = ["Datos de contacto", "Servicio", "Presupuesto", "Detalles"];

export default function QuoteForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: 10000,
    message: "",
  });

  const isLastStep = step === steps.length - 1;

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <div className="mb-8 flex items-center gap-2">
        {steps.map((label, i) => (
          <div key={label} className="flex-1">
            <div
              className={`h-1 rounded-full transition-colors ${
                i <= step ? "bg-[#d4ff00]" : "bg-slate-800"
              }`}
            />
          </div>
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold">{steps[step]}</h2>

        {step === 0 && (
          <div className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Nombre"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm outline-none focus:border-[#d4ff00]"
            />
            <input
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm outline-none focus:border-[#d4ff00]"
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              className="w-full rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm outline-none focus:border-[#d4ff00]"
            />
          </div>
        )}

        {step === 1 && (
          <div className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="¿Qué servicio necesitas?"
              value={data.service}
              onChange={(e) => setData({ ...data, service: e.target.value })}
              className="w-full rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm outline-none focus:border-[#d4ff00]"
            />
          </div>
        )}

        {step === 2 && (
          <div className="mt-6">
            <RangeSlider
              value={data.budget}
              onChange={(budget) => setData({ ...data, budget })}
            />
          </div>
        )}

        {step === 3 && (
          <div className="mt-6">
            <textarea
              placeholder="Cuéntanos más sobre tu proyecto"
              value={data.message}
              onChange={(e) => setData({ ...data, message: e.target.value })}
              rows={5}
              className="w-full rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm outline-none focus:border-[#d4ff00]"
            />
          </div>
        )}
      </motion.div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="rounded-lg border border-slate-800 px-5 py-2.5 text-sm text-slate-300 disabled:opacity-40"
        >
          Atrás
        </button>
        <button
          type="button"
          onClick={() =>
            isLastStep
              ? console.log("submit quote", data)
              : setStep((s) => Math.min(steps.length - 1, s + 1))
          }
          className="rounded-lg bg-[#d4ff00] px-5 py-2.5 text-sm font-medium text-black"
        >
          {isLastStep ? "Enviar" : "Siguiente"}
        </button>
      </div>
    </div>
  );
}
