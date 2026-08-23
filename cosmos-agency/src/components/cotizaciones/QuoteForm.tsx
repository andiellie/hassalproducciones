"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MorphIcon } from "morphicons/react";
import { ArrowRight, CircleCheck, X } from "lucide";
import RangeSlider from "@/components/ui/RangeSlider";
import type { QuoteFormData } from "@/types";

const steps = ["Cuéntanos sobre ti", "Tu proyecto", "Presupuesto", "Detalles finales"];

const companyTypes = ["Marca", "Boda", "Evento Social", "Música/Concierto", "Organizador de Eventos", "Persona Individual", "Otro"];
const serviceTypes = ["Fotografía", "Video", "Fotografía y Video", "Marketing", "Producción de Contenido", "Otro"];
const contactMethodOptions = ["WhatsApp", "Videollamada", "Llamada", "Correo"];

function TagSelector({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {value === "" && (
        <span className="flex min-w-[110px] items-center justify-center rounded-full border border-dashed border-white/20 px-4 py-2 text-center text-sm text-white/40">
          Select
        </span>
      )}
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(value === option ? "" : option)}
          className={`flex min-w-[110px] items-center justify-center gap-1.5 rounded-full border px-4 py-2 text-center text-sm transition-colors ${
            value === option
              ? "border-[#d4ff00] bg-[#d4ff00] text-black"
              : "border-white/15 bg-white/5 text-white backdrop-blur-xl hover:border-white/30"
          }`}
        >
          {option}
          {value === option && <MorphIcon icon={X} size={14} />}
        </button>
      ))}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none backdrop-blur-xl placeholder:text-white/50 focus:border-[#d4ff00]";

export default function QuoteForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<QuoteFormData>({
    name: "",
    companyType: "",
    email: "",
    whatsapp: "",
    serviceType: "",
    estimatedDate: "",
    description: "",
    budgetIndex: 0,
    references: "",
    dontWant: "",
    contactMethods: [],
  });

  const isLastStep = step === steps.length - 1;
  const isStepValid = step !== 1 || (data.serviceType !== "" && data.estimatedDate !== "");

  const toggleContactMethod = (method: string) => {
    setData((d) => ({
      ...d,
      contactMethods: d.contactMethods.includes(method)
        ? d.contactMethods.filter((m) => m !== method)
        : [...d.contactMethods, method],
    }));
  };

  const handleSubmit = async () => {
    setSending(true);
    setError(false);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d4ff00]/30 bg-[#d4ff00]/10 shadow-[0_0_25px_rgba(212,255,0,0.15)]">
          <MorphIcon icon={CircleCheck} size={32} className="text-[#d4ff00]" />
        </div>
        <h2 className="font-heading mt-6 text-2xl font-medium">¡Listo! Recibimos tu proyecto.</h2>
        <p className="mt-2 max-w-md text-white">
          Te contactaremos pronto a {data.email || "tu correo"} para dar el siguiente paso.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="mb-8 text-white">
        Completa este formulario y prepararemos una propuesta pensada en tus objetivos, tiempos y presupuesto.
      </p>

      <div className="mb-8 flex items-center gap-2">
        {steps.map((label, i) => (
          <div key={label} className="flex-1">
            <div
              className={`h-1 rounded-full transition-colors backdrop-blur-xl ${
                i <= step ? "bg-[#d4ff00]" : "bg-white/5"
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
          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-white">Nombre</label>
              <input
                type="text"
                placeholder="Nombre"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-white">Tipo de empresa</p>
              <TagSelector
                options={companyTypes}
                value={data.companyType}
                onChange={(v) => setData({ ...data, companyType: v })}
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-white">Contacto</p>
              <div className="space-y-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">Correo</label>
                  <input
                    type="email"
                    placeholder="Correo"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="WhatsApp"
                    value={data.whatsapp}
                    onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="mt-6 space-y-5">
            <div>
              <p className="mb-2 text-sm font-medium text-white">Tipo de servicio *</p>
              <TagSelector
                options={serviceTypes}
                value={data.serviceType}
                onChange={(v) => setData({ ...data, serviceType: v })}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Fecha estimada * <span className="text-white/70">(rango de 5 días)</span>
              </label>
              <input
                type="date"
                value={data.estimatedDate}
                onChange={(e) => setData({ ...data, estimatedDate: e.target.value })}
                className={inputClass}
              />
            </div>

            <textarea
              placeholder="Descripción (opcional)"
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              rows={4}
              className={inputClass}
            />
          </div>
        )}

        {step === 2 && (
          <div className="mt-6">
            <RangeSlider
              value={data.budgetIndex}
              onChange={(budgetIndex) => setData({ ...data, budgetIndex })}
            />
          </div>
        )}

        {step === 3 && (
          <div className="mt-6 space-y-5">
            <input
              type="text"
              placeholder="¿Tienes referencias? Comparte un link (opcional)"
              value={data.references}
              onChange={(e) => setData({ ...data, references: e.target.value })}
              className={inputClass}
            />

            <textarea
              placeholder="¿Hay algo que definitivamente no quieres? (opcional)"
              value={data.dontWant}
              onChange={(e) => setData({ ...data, dontWant: e.target.value })}
              rows={3}
              className={inputClass}
            />

            <div>
              <p className="mb-2 text-sm font-medium text-white">Medio de contacto preferido</p>
              <div className="flex flex-wrap gap-4">
                {contactMethodOptions.map((method) => (
                  <label key={method} className="flex items-center gap-2 text-sm text-white">
                    <input
                      type="checkbox"
                      checked={data.contactMethods.includes(method)}
                      onChange={() => toggleContactMethod(method)}
                      className="h-4 w-4 rounded border-white/15 bg-white/5 accent-[#d4ff00]"
                    />
                    {method}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white backdrop-blur-xl disabled:opacity-40"
        >
          Atrás
        </button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!isStepValid || sending}
          onClick={() =>
            isLastStep
              ? handleSubmit()
              : setStep((s) => Math.min(steps.length - 1, s + 1))
          }
          className="group flex items-center gap-2 rounded-lg bg-[#d4ff00] px-5 py-2.5 text-sm font-medium text-black disabled:opacity-40"
        >
          {isLastStep ? (sending ? "Enviando..." : "Enviar") : "Siguiente"}
          <MorphIcon
            icon={ArrowRight}
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </motion.button>
      </div>
      {error && (
        <p className="mt-4 text-center text-sm text-red-400">
          Hubo un problema al enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.
        </p>
      )}
    </div>
  );
}
