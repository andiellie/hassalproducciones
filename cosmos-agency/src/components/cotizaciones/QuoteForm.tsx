"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import RangeSlider from "@/components/ui/RangeSlider";
import type { QuoteFormData } from "@/types";

const steps = ["Cuéntanos sobre tu evento", "Servicio", "Presupuesto", "Detalles"];

export default function QuoteForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: 10000,
    message: "",
  });

  const isLastStep = step === steps.length - 1;

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d4ff00]/30 bg-[#d4ff00]/10 shadow-[0_0_25px_rgba(212,255,0,0.15)]">
          <CheckCircle2 className="h-8 w-8 text-[#d4ff00]" />
        </div>
        <h2 className="font-heading mt-6 text-2xl font-medium">¡Listo! Recibimos tu proyecto.</h2>
        <p className="mt-2 max-w-md text-slate-400">
          Te contactaremos pronto a {data.email || "tu correo"} para dar el siguiente paso.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
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
        <h2 className="font-heading text-xl font-medium">{steps[step]}</h2>

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
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            isLastStep
              ? setSubmitted(true)
              : setStep((s) => Math.min(steps.length - 1, s + 1))
          }
          className="group flex items-center gap-2 rounded-lg bg-[#d4ff00] px-5 py-2.5 text-sm font-medium text-black"
        >
          {isLastStep ? "Cotizar" : "Siguiente"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>
    </div>
  );
}
