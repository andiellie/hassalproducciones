import type { Lang } from "@/lib/i18n";

// Canonical (Spanish) values are what gets stored/sent to the backend,
// regardless of the UI language, so the internal notification email stays consistent.
export const companyTypes = ["Marca", "Boda", "Evento Social", "Música/Concierto", "Organizador de Eventos", "Persona Individual", "Otro"];
export const serviceTypes = ["Fotografía", "Video", "Marketing", "Producción de Contenido", "Otro"];
export const contactMethodOptions = ["WhatsApp", "Videollamada", "Llamada", "Correo"];
export const DONT_WANT_MAX_LENGTH = 500;

export const companyTypeLabelsEn: Record<string, string> = {
  "Marca": "Brand",
  "Boda": "Wedding",
  "Evento Social": "Social Event",
  "Música/Concierto": "Music/Concert",
  "Organizador de Eventos": "Event Organizer",
  "Persona Individual": "Individual",
  "Otro": "Other",
};

export const serviceTypeLabelsEn: Record<string, string> = {
  "Fotografía": "Photography",
  "Video": "Video",
  "Marketing": "Marketing",
  "Producción de Contenido": "Content Production",
  "Otro": "Other",
};

export const contactMethodLabelsEn: Record<string, string> = {
  "WhatsApp": "WhatsApp",
  "Videollamada": "Video Call",
  "Llamada": "Phone Call",
  "Correo": "Email",
};

export function localize(value: string, lang: Lang, map: Record<string, string>) {
  return lang === "en" ? map[value] ?? value : value;
}

export const quoteFormCopy = {
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
