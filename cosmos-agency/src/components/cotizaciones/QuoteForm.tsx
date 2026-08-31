"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MorphIcon } from "morphicons/react";
import { ArrowLeft, ArrowRight, Check, CircleCheck, X } from "lucide";
import RangeSlider from "@/components/ui/RangeSlider";
import EstimatedDatePicker from "@/components/cotizaciones/EstimatedDatePicker";
import type { QuoteFormData } from "@/types";
import { useLanguage, type Lang } from "@/lib/language";

// Canonical (Spanish) values are what gets stored/sent to the backend,
// regardless of the UI language, so the internal notification email stays consistent.
const companyTypes = ["Marca", "Boda", "Evento Social", "Música/Concierto", "Organizador de Eventos", "Persona Individual", "Otro"];
const serviceTypes = ["Fotografía", "Video", "Marketing", "Producción de Contenido", "Otro"];
const contactMethodOptions = ["WhatsApp", "Videollamada", "Llamada", "Correo"];
const DONT_WANT_MAX_LENGTH = 500;

const companyTypeLabelsEn: Record<string, string> = {
  "Marca": "Brand",
  "Boda": "Wedding",
  "Evento Social": "Social Event",
  "Música/Concierto": "Music/Concert",
  "Organizador de Eventos": "Event Organizer",
  "Persona Individual": "Individual",
  "Otro": "Other",
};

const serviceTypeLabelsEn: Record<string, string> = {
  "Fotografía": "Photography",
  "Video": "Video",
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
    steps: ["Cuéntanos sobre ti", "Tu proyecto", "Detalles finales"],
    intro: "Completa este formulario y prepararemos una propuesta pensada en tus objetivos, tiempos y presupuesto.",
    select: "Selecciona",
    name: "Nombre",
    namePlaceholder: "Por favor, compártenos tu nombre",
    nameError: "Escribe tu nombre para continuar.",
    companyType: "Tipo de empresa",
    companyTypeError: "Selecciona al menos un tipo de empresa para continuar.",
    companyTypeOtherPlaceholder: "¿Qué tipo de empresa?",
    email: "Correo",
    emailRequiredError: "Ingresa tu correo para poder contactarte.",
    emailFormatError: "Revisa que el correo tenga un formato válido (ej. hola@dominio.com).",
    whatsapp: "WhatsApp",
    whatsappRequiredError: "Ingresa tu número de WhatsApp.",
    whatsappLengthError: "Verifica que el número tenga 10 dígitos.",
    preferredContact: "Medio de contacto preferido",
    contactMethodError: "Selecciona un medio de contacto para que podamos enviarte tu cotización.",
    serviceType: "Tipo de servicio",
    serviceTypeHint: "(puedes seleccionar los que necesites)",
    serviceTypeError: "Por favor, elige al menos un servicio para tu proyecto.",
    estimatedDate: "Fecha estimada",
    dateRangeHint: "(rango de 5 días)",
    dateError: "Selecciona una fecha o rango estimado para continuar.",
    referencesPlaceholder: "Inserta un link de referencia / inspiración (opcional)",
    referencesAddMore: (n: number) => `Agrega ${n} más (opcional)`,
    referencesError: "Revisa que el enlace tenga un formato válido (ej. https://...)",
    dontWantPlaceholder: "¿Hay algo que definitivamente no quieres? (opcional)",
    incompleteStepHint: "Completa los campos obligatorios para continuar.",
    back: "Atrás",
    next: "Siguiente",
    send: "Enviar cotización",
    sending: "Enviando...",
    error: "Hubo un problema al enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.",
    successTitle: "¡Listo! Recibimos tu proyecto.",
    successBody: (name: string) => `Te contactaremos pronto${name ? `, ${name},` : ""} para dar el siguiente paso.`,
  },
  en: {
    steps: ["Tell us about yourself", "Your project", "Final details"],
    intro: "Fill out this form and we'll prepare a proposal tailored to your goals, timeline, and budget.",
    select: "Select",
    name: "Name",
    namePlaceholder: "Please share your name with us",
    nameError: "Enter your name to continue.",
    companyType: "Company type",
    companyTypeError: "Select at least one company type to continue.",
    companyTypeOtherPlaceholder: "What type of company?",
    email: "Email",
    emailRequiredError: "Enter your email so we can contact you.",
    emailFormatError: "Check that the email has a valid format (e.g. hello@domain.com).",
    whatsapp: "WhatsApp",
    whatsappRequiredError: "Enter your WhatsApp number.",
    whatsappLengthError: "Make sure the number has 10 digits.",
    preferredContact: "Preferred contact method",
    contactMethodError: "Select a contact method so we can send you your quote.",
    serviceType: "Service type",
    serviceTypeHint: "(select as many as you need)",
    serviceTypeError: "Please choose at least one service for your project.",
    estimatedDate: "Estimated date",
    dateRangeHint: "(5-day range)",
    dateError: "Select an estimated date or range to continue.",
    referencesPlaceholder: "Insert a reference / inspiration link (optional)",
    referencesAddMore: (n: number) => `Add ${n} more (optional)`,
    referencesError: "Check that the link has a valid format (e.g. https://...)",
    dontWantPlaceholder: "Is there anything you definitely don't want? (optional)",
    incompleteStepHint: "Complete the required fields to continue.",
    back: "Back",
    next: "Next",
    send: "Send Quote Request",
    sending: "Sending...",
    error: "There was a problem sending your request. Try again or message us on WhatsApp.",
    successTitle: "Done! We received your project.",
    successBody: (name: string) => `We'll reach out to you${name ? `, ${name},` : ""} soon to take the next step.`,
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

function MultiTagSelector({
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

const inputClass =
  "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none backdrop-blur-xl placeholder:text-white/50 transition-shadow duration-300 focus:border-[#d4ff00] focus:shadow-[0_0_15px_rgba(212,255,0,0.4)]";

function ErrorShake({
  trigger,
  active,
  children,
}: {
  trigger: number;
  active: boolean;
  children: React.ReactNode;
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

export default function QuoteForm() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [stepError, setStepError] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [whatsappTouched, setWhatsappTouched] = useState(false);
  const [referencesTouched, setReferencesTouched] = useState(false);
  const [referenceDraft, setReferenceDraft] = useState("");
  const [shakeCount, setShakeCount] = useState(0);
  const nameRef = useRef<HTMLInputElement>(null);
  const companyTypeRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const whatsappRef = useRef<HTMLInputElement>(null);
  const contactMethodRef = useRef<HTMLDivElement>(null);
  const serviceTypeRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const referencesRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<QuoteFormData>({
    name: "",
    companyTypes: [],
    companyTypeOther: "",
    email: "",
    whatsapp: "",
    contactMethods: [],
    serviceTypes: [],
    estimatedDate: "",
    budgetIndex: 0,
    references: [],
    dontWant: "",
  });

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim());
  const referenceUrlRegex = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}([\w\-./?%&=]*)?$/i;
  const isValidReferences = referenceDraft.trim() === "" || referenceUrlRegex.test(referenceDraft.trim());

  const commitReferenceDraft = () => {
    const value = referenceDraft.trim();
    if (value === "" || data.references.length >= 3 || !referenceUrlRegex.test(value)) return;
    setData((d) => ({ ...d, references: [...d.references, value] }));
    setReferenceDraft("");
  };

  const removeReference = (index: number) => {
    setData((d) => ({ ...d, references: d.references.filter((_, i) => i !== index) }));
  };

  const hasStartedStepOne =
    data.name.trim() !== "" ||
    data.companyTypes.length > 0 ||
    data.email.trim() !== "" ||
    data.whatsapp !== "" ||
    data.contactMethods.length > 0;

  const isLastStep = step === t.steps.length - 1;
  const isStepValid =
    (step !== 0 ||
      (data.name.trim() !== "" &&
        data.companyTypes.length > 0 &&
        isValidEmail &&
        data.whatsapp.length === 10 &&
        data.contactMethods.length > 0)) &&
    (step !== 1 || (data.serviceTypes.length > 0 && data.estimatedDate !== "")) &&
    (step !== 2 || isValidReferences);
  const showNameError = stepError && step === 0 && data.name.trim() === "";
  const showCompanyTypeError = stepError && step === 0 && data.companyTypes.length === 0;
  const showEmailRequiredError = (emailTouched || stepError) && step === 0 && data.email.trim() === "";
  const showEmailFormatError =
    (emailTouched || stepError) && step === 0 && data.email.trim() !== "" && !isValidEmail;
  const showWhatsappRequiredError = (whatsappTouched || stepError) && step === 0 && data.whatsapp === "";
  const showWhatsappLengthError =
    (whatsappTouched || stepError) && step === 0 && data.whatsapp !== "" && data.whatsapp.length !== 10;
  const showContactMethodError = stepError && step === 0 && data.contactMethods.length === 0;
  const showServiceTypeError = stepError && step === 1 && data.serviceTypes.length === 0;
  const showDateError = stepError && step === 1 && data.estimatedDate === "";
  const showReferencesError = (referencesTouched || stepError) && step === 2 && !isValidReferences;

  const firstInvalidField: string | null =
    step === 0
      ? data.name.trim() === ""
        ? "name"
        : data.companyTypes.length === 0
          ? "companyType"
          : !isValidEmail
            ? "email"
            : data.whatsapp.length !== 10
              ? "whatsapp"
              : data.contactMethods.length === 0
                ? "contactMethod"
                : null
      : step === 1
        ? data.serviceTypes.length === 0
          ? "serviceType"
          : data.estimatedDate === ""
            ? "date"
            : null
        : step === 2
          ? !isValidReferences
            ? "references"
            : null
          : null;

  const fieldRefs: Record<string, React.RefObject<HTMLElement | null>> = {
    name: nameRef,
    companyType: companyTypeRef,
    email: emailRef,
    whatsapp: whatsappRef,
    contactMethod: contactMethodRef,
    serviceType: serviceTypeRef,
    date: dateRef,
    references: referencesRef,
  };

  const goToFirstInvalidField = () => {
    setStepError(true);
    setShakeCount((c) => c + 1);
    if (!firstInvalidField) return;
    const el = fieldRefs[firstInvalidField]?.current;
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (el instanceof HTMLInputElement) el.focus();
  };

  const handleSubmit = async () => {
    const pendingRef = referenceDraft.trim();
    const references =
      pendingRef !== "" && data.references.length < 3 && referenceUrlRegex.test(pendingRef)
        ? [...data.references, pendingRef]
        : data.references;

    setSending(true);
    setError(false);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, references, lang }),
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
          {t.successBody(data.name.trim())}
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
        {step === 0 && !hasStartedStepOne && (
          <p className="mb-4 text-white">{t.intro}</p>
        )}
        <h2 className="font-heading text-xl font-medium">{t.steps[step]}</h2>

        {step === 0 && (
          <div className="mt-6 space-y-5">
            <div>
              <input
                ref={nameRef}
                type="text"
                placeholder={t.namePlaceholder}
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className={inputClass}
              />
              {showNameError && (
                <ErrorShake trigger={shakeCount} active={firstInvalidField === "name"}>
                  <p className="mt-2 text-sm text-red-400">{t.nameError}</p>
                </ErrorShake>
              )}
            </div>

            <div ref={companyTypeRef}>
              <p className="mb-2 text-sm font-medium text-white">{t.companyType}</p>
              <MultiTagSelector
                options={companyTypes}
                value={data.companyTypes}
                onChange={(v) => setData({ ...data, companyTypes: v, companyTypeOther: v.includes("Otro") ? data.companyTypeOther : "" })}
                getLabel={(v) => localize(v, lang, companyTypeLabelsEn)}
                max={2}
                hidePlaceholder
              />
              {data.companyTypes.includes("Otro") && (
                <input
                  type="text"
                  placeholder={t.companyTypeOtherPlaceholder}
                  value={data.companyTypeOther}
                  onChange={(e) => setData({ ...data, companyTypeOther: e.target.value })}
                  className={`${inputClass} mt-2`}
                />
              )}
              {showCompanyTypeError && (
                <ErrorShake trigger={shakeCount} active={firstInvalidField === "companyType"}>
                  <p className="mt-2 text-sm text-red-400">{t.companyTypeError}</p>
                </ErrorShake>
              )}
            </div>

            <div>
              <input
                ref={emailRef}
                type="email"
                placeholder={t.email}
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                onBlur={() => setEmailTouched(true)}
                className={inputClass}
              />
              {showEmailRequiredError && (
                <ErrorShake trigger={shakeCount} active={firstInvalidField === "email"}>
                  <p className="mt-2 text-sm text-red-400">{t.emailRequiredError}</p>
                </ErrorShake>
              )}
              {showEmailFormatError && (
                <ErrorShake trigger={shakeCount} active={firstInvalidField === "email"}>
                  <p className="mt-2 text-sm text-red-400">{t.emailFormatError}</p>
                </ErrorShake>
              )}
            </div>

            <div>
              <input
                ref={whatsappRef}
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder={t.whatsapp}
                onBlur={() => setWhatsappTouched(true)}
                value={data.whatsapp}
                onChange={(e) => setData({ ...data, whatsapp: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                className={inputClass}
              />
              {showWhatsappRequiredError && (
                <ErrorShake trigger={shakeCount} active={firstInvalidField === "whatsapp"}>
                  <p className="mt-2 text-sm text-red-400">{t.whatsappRequiredError}</p>
                </ErrorShake>
              )}
              {showWhatsappLengthError && (
                <ErrorShake trigger={shakeCount} active={firstInvalidField === "whatsapp"}>
                  <p className="mt-2 text-sm text-red-400">{t.whatsappLengthError}</p>
                </ErrorShake>
              )}
            </div>

            <div ref={contactMethodRef}>
              <p className="mb-2 text-sm font-medium text-white">{t.preferredContact}</p>
              <div className="flex flex-wrap gap-4">
                {contactMethodOptions.map((method) => {
                  const isSelected = data.contactMethods.includes(method);
                  const isDisabled = !isSelected && data.contactMethods.length >= 2;
                  return (
                    <button
                      key={method}
                      type="button"
                      disabled={isDisabled}
                      onClick={() =>
                        setData({
                          ...data,
                          contactMethods: isSelected
                            ? data.contactMethods.filter((m) => m !== method)
                            : [...data.contactMethods, method],
                        })
                      }
                      className={`flex items-center gap-2 text-sm ${
                        isDisabled ? "text-white/30" : "text-white"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 items-center justify-center border-2 ${
                          isSelected
                            ? "border-[#d4ff00] bg-[#d4ff00]"
                            : isDisabled
                              ? "border-white/15 bg-black"
                              : "border-[#d4ff00]/50 bg-black"
                        }`}
                      >
                        {isSelected && <MorphIcon icon={Check} size={14} className="text-black" strokeWidth={3} />}
                      </span>
                      {localize(method, lang, contactMethodLabelsEn)}
                    </button>
                  );
                })}
              </div>
              {showContactMethodError && (
                <ErrorShake trigger={shakeCount} active={firstInvalidField === "contactMethod"}>
                  <p className="mt-2 text-sm text-red-400">{t.contactMethodError}</p>
                </ErrorShake>
              )}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="mt-6 space-y-5">
            <div ref={serviceTypeRef}>
              <p className="mb-2 text-sm font-medium text-white">
                {t.serviceType} <span className="text-white/70">{t.serviceTypeHint}</span>
              </p>
              <MultiTagSelector
                options={serviceTypes}
                value={data.serviceTypes}
                onChange={(v) => setData({ ...data, serviceTypes: v })}
                getLabel={(v) => localize(v, lang, serviceTypeLabelsEn)}
                selectLabel={t.select}
                error={showServiceTypeError}
              />
              {showServiceTypeError && (
                <ErrorShake trigger={shakeCount} active={firstInvalidField === "serviceType"}>
                  <p className="mt-2 text-sm text-red-400">{t.serviceTypeError}</p>
                </ErrorShake>
              )}
            </div>

            <div ref={dateRef}>
              <label className="mb-2 block text-sm font-medium text-white">
                {t.estimatedDate} <span className="text-white/70">{t.dateRangeHint}</span>
              </label>
              <EstimatedDatePicker
                value={data.estimatedDate}
                onChange={(estimatedDate) => setData({ ...data, estimatedDate })}
                lang={lang}
                error={showDateError}
              />
              {showDateError && (
                <ErrorShake trigger={shakeCount} active={firstInvalidField === "date"}>
                  <p className="mt-2 text-sm text-red-400">{t.dateError}</p>
                </ErrorShake>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-6 space-y-5">
            <div>
              <RangeSlider
                value={data.budgetIndex}
                onChange={(budgetIndex) => setData({ ...data, budgetIndex })}
              />
            </div>

            <div>
              {data.references.length < 3 && (
                <input
                  ref={referencesRef}
                  type="text"
                  placeholder={
                    data.references.length > 0
                      ? t.referencesAddMore(3 - data.references.length)
                      : t.referencesPlaceholder
                  }
                  value={referenceDraft}
                  onChange={(e) => setReferenceDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      commitReferenceDraft();
                      setReferencesTouched(true);
                    }
                  }}
                  onBlur={() => {
                    commitReferenceDraft();
                    setReferencesTouched(true);
                  }}
                  className={`${inputClass} ${showReferencesError ? "border-red-500" : ""}`}
                />
              )}
              {showReferencesError && (
                <ErrorShake trigger={shakeCount} active={firstInvalidField === "references"}>
                  <p className="mt-2 text-sm text-red-400">{t.referencesError}</p>
                </ErrorShake>
              )}
              {data.references.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  <AnimatePresence initial={false}>
                    {data.references.map((ref, i) => (
                      <motion.span
                        key={ref + i}
                        initial={{ opacity: 0, scale: 0.9, y: -6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        title={ref}
                        className="flex max-w-full items-center gap-1.5 rounded-full border border-white/15 bg-white/5 py-1.5 pl-3 pr-2 text-xs text-white backdrop-blur-xl"
                      >
                        <span className="max-w-[220px] truncate">
                          {ref.replace(/^https?:\/\//, "")}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeReference(i)}
                          className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-white/60 hover:text-white"
                        >
                          <MorphIcon icon={X} size={12} />
                        </button>
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            <div className="relative">
              <textarea
                placeholder={t.dontWantPlaceholder}
                value={data.dontWant}
                onChange={(e) => {
                  setData({ ...data, dontWant: e.target.value.slice(0, DONT_WANT_MAX_LENGTH) });
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                maxLength={DONT_WANT_MAX_LENGTH}
                rows={1}
                className={`${inputClass} resize-none overflow-hidden pb-8 ${
                  data.dontWant.length >= DONT_WANT_MAX_LENGTH ? "border-red-500" : ""
                }`}
              />
              <span
                className={`absolute bottom-3 right-4 text-xs ${
                  data.dontWant.length >= DONT_WANT_MAX_LENGTH ? "font-bold text-red-500" : "text-white/50"
                }`}
              >
                {data.dontWant.length}/{DONT_WANT_MAX_LENGTH}
              </span>
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
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setStepError(false);
              setStep((s) => Math.max(0, s - 1));
            }}
            className="group flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white backdrop-blur-xl"
          >
            <MorphIcon
              icon={ArrowLeft}
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            {t.back}
          </motion.button>
        )}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={sending}
          title={!isStepValid ? t.incompleteStepHint : undefined}
          onClick={() => {
            if (!isStepValid) {
              goToFirstInvalidField();
              return;
            }
            setStepError(false);
            isLastStep ? handleSubmit() : setStep((s) => Math.min(t.steps.length - 1, s + 1));
          }}
          className={`group flex items-center gap-2 rounded-lg bg-[#d4ff00] px-5 py-2.5 text-sm font-medium text-black transition-opacity disabled:opacity-40 ${
            !isStepValid && !sending ? "opacity-50" : ""
          }`}
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
