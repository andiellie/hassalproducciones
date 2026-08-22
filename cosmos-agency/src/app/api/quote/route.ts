import { NextResponse } from "next/server";
import { Resend } from "resend";
import type { QuoteFormData } from "@/types";

export async function POST(request: Request) {
  const data: QuoteFormData = await request.json();

  const resend = new Resend(process.env.RESEND_API_KEY);

  const html = `
    <h2>Nueva solicitud de cotización</h2>
    <p><strong>Nombre:</strong> ${data.name}</p>
    <p><strong>Tipo de empresa:</strong> ${data.companyType || "—"}</p>
    <p><strong>Correo:</strong> ${data.email}</p>
    <p><strong>WhatsApp:</strong> ${data.whatsapp || "—"}</p>
    <p><strong>Tipo de servicio:</strong> ${data.serviceType}</p>
    <p><strong>Fecha estimada:</strong> ${data.estimatedDate} (rango de 5 días)</p>
    <p><strong>Descripción:</strong> ${data.description || "—"}</p>
    <p><strong>Presupuesto:</strong> $${["0-5,000", "10,000", "20,000", "30,000", "40,000", "+ de 40,000"][data.budgetIndex]} MXN</p>
    <p><strong>Referencias:</strong> ${data.references || "—"}</p>
    <p><strong>No quiere:</strong> ${data.dontWant || "—"}</p>
    <p><strong>Medio de contacto preferido:</strong> ${data.contactMethods.join(", ") || "—"}</p>
  `;

  try {
    await resend.emails.send({
      from: "Cosmos Agency <onboarding@resend.dev>",
      to: "ahanostyle@gmail.com",
      cc: "andiellie@gmail.com",
      replyTo: data.email || undefined,
      subject: `Nueva cotización: ${data.name}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
