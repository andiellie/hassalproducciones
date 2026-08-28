"use client";

import { useLanguage } from "@/lib/language";

const copy = {
  es: {
    title: "Términos y Condiciones",
    lastUpdated: "Última actualización: agosto 2026",
    introPre: "En Cosmos Agency respetamos tu privacidad. Tus datos personales ",
    introHighlight: "no serán vendidos ni utilizados de forma indebida",
    introPost: ". A continuación explicamos cómo los recopilamos, usamos y protegemos.",
    sections: [
      {
        title: "1. Aceptación de los términos",
        body: [
          "Al acceder y utilizar el sitio web de Cosmos Agency (cosmosagencymx), así como al solicitar una cotización o contratar nuestros servicios de marketing, fotografía y producción audiovisual, aceptas los presentes Términos y Condiciones.",
        ],
      },
      {
        title: "2. Datos que recopilamos",
        body: [
          "A través de nuestros formularios de contacto y cotización podemos solicitar: nombre, correo electrónico, número de teléfono, tipo de evento o servicio, presupuesto estimado y mensaje o detalles adicionales.",
          "También podemos recibir datos cuando nos contactas directamente por correo electrónico o WhatsApp.",
        ],
      },
      {
        title: "3. Uso de tus datos",
        body: [
          "Tus datos se utilizan únicamente para: responder tu solicitud de cotización o información, coordinar la prestación del servicio contratado, y darte seguimiento sobre tu evento o proyecto.",
          "No utilizamos tus datos para fines distintos a los aquí descritos sin tu consentimiento.",
        ],
      },
      {
        title: "4. No venta ni mal uso de datos",
        body: [
          "Cosmos Agency no vende, renta, ni comparte tus datos personales con terceros para fines comerciales o publicitarios.",
          "Tus datos no serán utilizados de forma indebida, ni compartidos fuera del equipo de Cosmos Agency, salvo obligación legal expresa que nos requiera hacerlo.",
        ],
      },
      {
        title: "5. Conservación y seguridad",
        body: [
          "Conservamos tus datos solo durante el tiempo necesario para atender tu solicitud o cumplir con la relación de servicio contratada, y tomamos medidas razonables para protegerlos de accesos no autorizados.",
        ],
      },
      {
        title: "6. Tus derechos",
        body: [
          "Puedes solicitar en cualquier momento el acceso, corrección o eliminación de tus datos personales que tengamos registrados, escribiéndonos a ahanostyle@gmail.com.",
        ],
      },
      {
        title: "7. Material audiovisual",
        body: [
          "Al contratar nuestros servicios de fotografía y video, el material capturado podrá ser utilizado por Cosmos Agency con fines de portafolio o promoción, salvo que se acuerde lo contrario por escrito con el cliente.",
        ],
      },
      {
        title: "8. Cambios a este documento",
        body: [
          "Podemos actualizar estos Términos y Condiciones ocasionalmente. Los cambios se reflejarán en esta misma página con la fecha de última actualización.",
        ],
      },
      {
        title: "9. Contacto",
        body: [
          "Para cualquier duda sobre este documento o el tratamiento de tus datos, contáctanos en ahanostyle@gmail.com o al +52 1 56 4050 8888.",
        ],
      },
    ],
  },
  en: {
    title: "Terms & Conditions",
    lastUpdated: "Last updated: August 2026",
    introPre: "At Cosmos Agency we respect your privacy. Your personal data ",
    introHighlight: "will not be sold or misused",
    introPost: ". Below we explain how we collect, use, and protect it.",
    sections: [
      {
        title: "1. Acceptance of terms",
        body: [
          "By accessing and using the Cosmos Agency website (cosmosagencymx), as well as requesting a quote or hiring our marketing, photography, and audiovisual production services, you accept these Terms & Conditions.",
        ],
      },
      {
        title: "2. Data we collect",
        body: [
          "Through our contact and quote forms we may request: name, email address, phone number, type of event or service, estimated budget, and message or additional details.",
          "We may also receive data when you contact us directly by email or WhatsApp.",
        ],
      },
      {
        title: "3. Use of your data",
        body: [
          "Your data is used solely to: respond to your quote or information request, coordinate delivery of the contracted service, and follow up on your event or project.",
          "We do not use your data for purposes other than those described here without your consent.",
        ],
      },
      {
        title: "4. No sale or misuse of data",
        body: [
          "Cosmos Agency does not sell, rent, or share your personal data with third parties for commercial or advertising purposes.",
          "Your data will not be misused or shared outside the Cosmos Agency team, except where required by an explicit legal obligation.",
        ],
      },
      {
        title: "5. Retention and security",
        body: [
          "We keep your data only for as long as necessary to handle your request or fulfill the contracted service relationship, and we take reasonable measures to protect it from unauthorized access.",
        ],
      },
      {
        title: "6. Your rights",
        body: [
          "You may request access to, correction of, or deletion of your personal data on file at any time by writing to ahanostyle@gmail.com.",
        ],
      },
      {
        title: "7. Audiovisual material",
        body: [
          "When you hire our photography and video services, the captured material may be used by Cosmos Agency for portfolio or promotional purposes, unless otherwise agreed in writing with the client.",
        ],
      },
      {
        title: "8. Changes to this document",
        body: [
          "We may update these Terms & Conditions occasionally. Changes will be reflected on this same page with the last-updated date.",
        ],
      },
      {
        title: "9. Contact",
        body: [
          "For any questions about this document or how your data is handled, contact us at ahanostyle@gmail.com or at +52 1 56 4050 8888.",
        ],
      },
    ],
  },
};

export default function TerminosContent() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold text-white sm:text-5xl">{t.title}</h1>
      <p className="mt-4 text-sm text-white/70">{t.lastUpdated}</p>

      <p className="mt-8 text-white">
        {t.introPre}
        <span className="text-[#d4ff00]">{t.introHighlight}</span>
        {t.introPost}
      </p>

      <div className="mt-10 space-y-8">
        {t.sections.map((section) => (
          <div key={section.title}>
            <h2 className="font-heading text-xl font-medium text-white">{section.title}</h2>
            <div className="mt-2 space-y-2 text-white/80">
              {section.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
