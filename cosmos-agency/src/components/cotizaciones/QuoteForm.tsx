"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MorphIcon } from "morphicons/react";
import { ArrowRight, CircleCheck, X } from "lucide";
import RangeSlider from "@/components/ui/RangeSlider";
import type { QuoteFormData } from "@/types";
import { useLanguage, type Lang } from "@/lib/language";

// Canonical (Spanish) values are what gets stored/sent to the backend,
// regardless of the UI language, so the internal notification email stays consistent.
const companyTypes = ["Marca", "Boda", "Evento Social", "Música/Concierto", "Organizador de Eventos", "Persona Individual", "Otro"];
const serviceTypes = ["Fotografía", "Video", "Fotografía y Video", "Marketing", "Producción de Contenido", "Otro"];
const contactMethodOptions = ["WhatsApp", "Videollamada", "Llamada", "Correo"];

const companyTypeLabelsEn: Record<string, string> = {
  "Marca": "Brand",
  "Boda": "Wedding",
  "Evento Social": "Social Event",
  "Música/Concierto": "Music/Concert",
  "Organizador de Eventos": "Event Planner",
  "Persona Individual": "Individual",
  "Otro": "Other",
};

const serviceTypeLabelsEn: Record<string, string> = {
  "Fotografía": "Photography",
  "Video": "Video",
  "Fotografía y Video": "Photo & Video",
  "Marketing": "Marketing",
  "Producción de Contenido": "Content Production",
  "Otro": "Other",
};

const contactMethodLabelsEn: Record<string, string> = {
  "WhatsApp": "WhatsApp",
  "Videollamada": "Video Call",
  "Llamada": "Phone Call",
  "Correo": "Email",
};

function localize(value: string, lang: Lang, map: Record<string, string>) {
  return lang === "en" ? map[value] ?? value : value;
}

const copy = {
  es: {
    steps: ["Cuéntanos sobre ti", "Tu proyecto", "Presupuesto", "Detalles finales"],
    select: "Selecciona",
    name: "Nombre",
    companyType: "Tipo de empresa",
    contact: "Contacto",
    email: "Correo",
    whatsapp: "WhatsApp",
    serviceType: "Tipo de servicio *",
    estimatedDate: "Fecha estimada *",
    dateRangeHint: "(rango de 5 días)",
    descriptionPlaceholder: "Descripción (opcional)",
    referencesPlaceholder: "¿Tienes referencias? Comparte un link (opcional)",
    dontWantPlaceholder: "¿Hay algo que definitivamente no quieres? (opcional)",
    preferredContact: "Medio de contacto preferido",
    back: "Atrás",
    next: "Siguiente",
    send: "Enviar cotización",
    sending: "Enviando...",
    error: "Hubo un problema al enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.",
    successTitle: "¡Listo! Recibimos tu proyecto.",
    successBody: (email: string) => `Te contactaremos pronto a ${email} para dar el siguiente paso.`,
    yourEmail: "tu correo",
  },
  en: {
    steps: ["Tell us about you", "Your project", "Budget", "Final details"],
    select: "Select",
    name: "Name",
    companyType: "Company type",
    contact: "Contact",
    email: "Email",
    whatsapp: "WhatsApp",
    serviceType: "Service type *",
    estimatedDate: "Estimated date *",
    dateRangeHint: "(5-day range)",
    descriptionPlaceholder: "Description (optional)",
    referencesPlaceholder: "Have references? Share a link (optional)",
    dontWantPlaceholder: "Anything you definitely don't want? (optional)",
    preferredContact: "Preferred contact method",
    back: "Back",
    next: "Next",
    send: "Send Quote Request",
    sending: "Sending...",
    error: "There was a problem sending your request. Try again or message us on WhatsApp.",
    successTitle: "Done! We received your project.",
    successBody: (email: string) => `We'll reach out to ${email} soon to take the next step.`,
    yourEmail: "your email",
  },
};

function TagSelector({
  options,
  value,
  onChange,
  getLabel,
  selectLabel,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  getLabel: (v: string) => string;
  selectLabel: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {value === "" && (
        <span className="flex min-w-[110px] items-center justify-center rounded-full border border-dashed border-white/20 px-4 py-2 text-center text-sm text-white/40">
          {selectLabel}
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
          {getLabel(option)}
          {value === option && <MorphIcon icon={X} size={14} />}
        </button>
      ))}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none backdrop-blur-xl placeholder:text-white/50 focus:border-[#d4ff00]";

export default function QuoteForm() {
  const { lang } = useLanguage();
  const t = copy[lang];
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

  const isLastStep = step === t.steps.length - 1;
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
        <h2 className="font-heading mt-6 text-2xl font-medium">{t.successTitle}</h2>
        <p className="mt-2 max-w-md text-white">
          {t.successBody(data.email || t.yourEmail)}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="font-heading text-xl font-medium">{t.steps[step]}</h2>

        {step === 0 && (
          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-white">{t.name}</label>
              <input
                type="text"
                placeholder={t.name}
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-white">{t.companyType}</p>
              <TagSelector
                options={companyTypes}
                value={data.companyType}
                onChange={(v) => setData({ ...data, companyType: v })}
                getLabel={(v) => localize(v, lang, companyTypeLabelsEn)}
                selectLabel={t.select}
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-white">{t.contact}</p>
              <div className="space-y-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">{t.email}</label>
                  <input
                    type="email"
                    placeholder={t.email}
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">{t.whatsapp}</label>
                  <input
                    type="tel"
                    placeholder={t.whatsapp}
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
              <p className="mb-2 text-sm font-medium text-white">{t.serviceType}</p>
              <TagSelector
                options={serviceTypes}
                value={data.serviceType}
                onChange={(v) => setData({ ...data, serviceType: v })}
                getLabel={(v) => localize(v, lang, serviceTypeLabelsEn)}
                selectLabel={t.select}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                {t.estimatedDate} <span className="text-white/70">{t.dateRangeHint}</span>
              </label>
              <input
                type="date"
                value={data.estimatedDate}
                onChange={(e) => setData({ ...data, estimatedDate: e.target.value })}
                className={inputClass}
              />
            </div>

            <textarea
              placeholder={t.descriptionPlaceholder}
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
              placeholder={t.referencesPlaceholder}
              value={data.references}
              onChange={(e) => setData({ ...data, references: e.target.value })}
              className={inputClass}
            />

            <textarea
              placeholder={t.dontWantPlaceholder}
              value={data.dontWant}
              onChange={(e) => setData({ ...data, dontWant: e.target.value })}
              rows={3}
              className={inputClass}
            />

            <div>
              <p className="mb-2 text-sm font-medium text-white">{t.preferredContact}</p>
              <div className="flex flex-wrap gap-4">
                {contactMethodOptions.map((method) => (
                  <label key={method} className="flex items-center gap-2 text-sm text-white">
                    <input
                      type="checkbox"
                      checked={data.contactMethods.includes(method)}
                      onChange={() => toggleContactMethod(method)}
                      className="h-4 w-4 rounded border-white/15 bg-white/5 accent-[#d4ff00]"
                    />
                    {localize(method, lang, contactMethodLabelsEn)}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      <div className="mt-8 flex items-center gap-2">
        {t.steps.map((label, i) => (
          <div key={label} className="flex-1">
            <div
              className={`h-1 rounded-full transition-colors backdrop-blur-xl ${
                i <= step ? "bg-[#d4ff00]" : "bg-white/5"
              }`}
            />
          </div>
        ))}
      </div>

      <div className={`mt-4 flex ${step === 0 ? "justify-end" : "justify-between"}`}>
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white backdrop-blur-xl"
          >
            {t.back}
          </button>
        )}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!isStepValid || sending}
          onClick={() =>
            isLastStep
              ? handleSubmit()
              : setStep((s) => Math.min(t.steps.length - 1, s + 1))
          }
          className="group flex items-center gap-2 rounded-lg bg-[#d4ff00] px-5 py-2.5 text-sm font-medium text-black disabled:opacity-40"
        >
          {isLastStep ? (sending ? t.sending : t.send) : t.next}
          <MorphIcon
            icon={ArrowRight}
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </motion.button>
      </div>
      {error && (
        <p className="mt-4 text-center text-sm text-red-400">{t.error}</p>
      )}
    </div>
  );
}
