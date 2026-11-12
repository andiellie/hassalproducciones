import { NextResponse } from "next/server";
import { Resend } from "resend";
import type { QuoteFormData } from "@/features/cotizaciones/types";

const LOGO_URL = "https://www.cosmosagencymx.com/LOGO/cosmos-agency-navbar-wordmark.svg";
const ACCENT = "#d4ff00";

const confirmationCopy = {
  es: {
    subject: "¡Recibimos tu solicitud! 🚀 - Cosmos Agency",
    greeting: (name: string) => `Hola${name ? ` ${name}` : ""},`,
    intro: (project: string) =>
      `¡Gracias por pensar en nosotros! Te confirmamos que hemos recibido exitosamente los detalles para${project ? `: ${project}` : " tu proyecto"}.`,
    body: "Nuestro equipo ya está revisando tu información. Te contactaremos a la brevedad a través de tu medio preferido para presentarte una propuesta y dar el siguiente paso.",
    closing: "Hablemos pronto,",
    signature: "El equipo de Cosmos Agency",
    footer: "Producción audiovisual profesional para tu evento, marca o proyecto.",
  },
  en: {
    subject: "We've received your request! 🚀 - Cosmos Agency",
    greeting: (name: string) => `Hi${name ? ` ${name}` : ""},`,
    intro: (project: string) =>
      `Thanks for thinking of us! We're confirming that we've successfully received the details for${project ? `: ${project}` : " your project"}.`,
    body: "Our team is already reviewing your information. We'll reach out shortly through your preferred contact method to walk you through a proposal and the next step.",
    closing: "Talk soon,",
    signature: "The Cosmos Agency team",
    footer: "Professional audiovisual production for your event, brand, or project.",
  },
};

function emailShell(
  content: string,
  {
    logoHeight = 32,
    maxWidth = 520,
    cardPadding = "36px 32px",
  }: { logoHeight?: number; maxWidth?: number; cardPadding?: string } = {}
) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="margin:0; padding:32px 16px; background:#000000; font-family: Arial, Helvetica, sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:${maxWidth}px; margin:0 auto;">
        <tr>
          <td style="background:#0a0a0a; border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:${cardPadding};">
            <p style="margin:0 0 28px; text-align:center;">
              <img src="${LOGO_URL}" alt="Cosmos Agency" style="height:${logoHeight}px;" />
            </p>
            ${content}
          </td>
        </tr>
        <tr>
          <td style="padding-top:24px; text-align:center;">
            <p style="margin:0; font-size:12px; color:rgba(255,255,255,0.35);">
              © ${new Date().getFullYear()} Cosmos Agency · cosmosagencymx.com
            </p>
          </td>
        </tr>
      </table>
      </body>
    </html>
  `;
}

function fieldRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:14px 0; border-bottom:1px solid rgba(255,255,255,0.08);">
        <p style="margin:0 0 5px; font-size:12px; letter-spacing:0.05em; text-transform:uppercase; color:${ACCENT};">${label}</p>
        <p style="margin:0; font-size:16px; color:#ffffff; line-height:1.6;">${value}</p>
      </td>
    </tr>
  `;
}

function sectionHeading(text: string) {
  return `
    <p style="margin:32px 0 4px; font-size:13px; font-weight:bold; letter-spacing:0.05em; text-transform:uppercase; color:${ACCENT};">${text}</p>
  `;
}

function formatDateRange(isoDate: string, locale: "es" | "en") {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  const start = new Date(y, m - 1, d);
  const end = new Date(y, m - 1, d + 4);
  const fmt = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return `${fmt.format(start)} — ${fmt.format(end)}`;
}

export async function POST(request: Request) {
  const { lang, ...data }: QuoteFormData & { lang?: "es" | "en" } = await request.json();
  const t = confirmationCopy[lang === "en" ? "en" : "es"];

  const resend = new Resend(process.env.RESEND_API_KEY);

  const companyTypeLabel =
    data.companyTypes.map((c) => (c === "Otro" ? data.companyTypeOther || "Otro" : c)).join(", ") || "—";
  const budgetBrackets = ["0-5,000", "10,000", "20,000", "30,000", "40,000", "+ de 40,000"];
  const budgetLabel = budgetBrackets[data.budgetIndex] ? `$${budgetBrackets[data.budgetIndex]} MXN` : "No especificado";
  const mailtoLink = `<a href="mailto:${data.email}" style="color:#ffffff; text-decoration:none;">${data.email}</a>`;
  const whatsappLink = data.whatsapp
    ? `<a href="https://wa.me/52${data.whatsapp}" style="color:#ffffff; text-decoration:none;">${data.whatsapp}</a>`
    : "—";
  const referencesList = data.references.length
    ? data.references
        .map((url) => `<a href="${url}" style="color:${ACCENT}; text-decoration:none; display:block; margin-bottom:4px;">${url}</a>`)
        .join("")
    : "—";

  const internalHtml = emailShell(
    `
    <p style="margin:0 0 10px; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:${ACCENT};">¡Tenemos una nueva solicitud de cotización! 🚀</p>
    <h1 style="margin:0 0 8px; font-size:28px; font-weight:600; color:#ffffff; line-height:1.3;">${data.name}</h1>
    <p style="margin:0; font-size:14px; color:rgba(255,255,255,0.6);">Aquí están los detalles para iniciar el contacto.</p>

    ${sectionHeading("👤 Datos del prospecto")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${fieldRow("Nombre", data.name)}
      ${fieldRow("Tipo de empresa", companyTypeLabel)}
      ${fieldRow("Correo", mailtoLink)}
      ${fieldRow("WhatsApp", whatsappLink)}
      ${fieldRow("Medio preferido de contacto", `⭐️ ${data.contactMethods.join(", ") || "—"}`)}
    </table>

    ${sectionHeading("🎬 Detalles del proyecto")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${fieldRow("Servicio(s)", data.serviceTypes.join(", ") || "—")}
      ${fieldRow("Fecha estimada", formatDateRange(data.estimatedDate, "es"))}
      ${fieldRow("Presupuesto", budgetLabel)}
    </table>

    ${sectionHeading("📌 Contexto y referencias")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${fieldRow("¿Qué NO quieren?", data.dontWant ? `"${data.dontWant}"` : "Sin comentarios adicionales")}
      ${fieldRow("Enlaces de referencia", referencesList)}
    </table>
  `,
    { logoHeight: 84, maxWidth: 600, cardPadding: "48px 44px" }
  );

  const projectName = data.serviceTypes.join(", ");

  const confirmationHtml = emailShell(
    `
    <h1 style="margin:0 0 18px; font-size:26px; font-weight:600; color:#ffffff; line-height:1.3;">${t.greeting(data.name)}</h1>
    <p style="margin:0 0 20px; font-size:17px; line-height:1.7; color:rgba(255,255,255,0.85);">${t.intro(projectName)}</p>
    <p style="margin:0 0 32px; font-size:17px; line-height:1.7; color:rgba(255,255,255,0.85);">${t.body}</p>
    <p style="margin:0 0 4px; font-size:15px; color:rgba(255,255,255,0.85);">${t.closing}</p>
    <p style="margin:0 0 24px; font-size:15px; color:${ACCENT}; font-weight:bold;">${t.signature}</p>
    <p style="margin:0; font-size:14px; color:rgba(255,255,255,0.5);">${t.footer}</p>
  `,
    { logoHeight: 84, maxWidth: 600, cardPadding: "48px 44px" }
  );

  try {
    const internalSend = await resend.emails.send({
      from: "Cosmos Agency <cotizaciones@cosmosagencymx.com>",
      to: "ahanostyle@gmail.com",
      replyTo: data.email || undefined,
      subject: `🟢 Nueva Cotización: ${data.name} - ${data.serviceTypes.join(" y ") || "Sin servicio"}`,
      html: internalHtml,
    });
    if (internalSend.error) throw new Error(internalSend.error.message);

    if (data.email) {
      const confirmationSend = await resend.emails.send({
        from: "Cosmos Agency <cotizaciones@cosmosagencymx.com>",
        to: data.email,
        subject: t.subject,
        html: confirmationHtml,
      });
      if (confirmationSend.error) throw new Error(confirmationSend.error.message);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
