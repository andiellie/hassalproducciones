"use client";

import { motion } from "framer-motion";
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
    introPre: "At Cosmos Agency, we respect your privacy. Your personal data ",
    introHighlight: "will not be sold or used improperly",
    introPost: ". Below, we explain how we collect, use, and protect it.",
    sections: [
      {
        title: "1. Acceptance",
        body: [
          "By accessing and using the Cosmos Agency website (cosmosagencymx), as well as by requesting a quote or hiring our marketing, photography, and audiovisual production services, you agree to these Terms and Conditions.",
        ],
      },
      {
        title: "2. Data Collection",
        body: [
          "Through our contact and quote request forms, we may ask for information such as your name, email address, phone number, type of event or service, estimated budget, and any message or additional details.",
          "We may also receive information when you contact us directly by email or WhatsApp.",
        ],
      },
      {
        title: "3. Use of Data",
        body: [
          "We use your data solely to respond to your request for a quote or information, coordinate the delivery of contracted services, and follow up regarding your event or project.",
          "We do not use your data for purposes other than those described here without your consent.",
        ],
      },
      {
        title: "4. No Sale of Personal Data",
        body: [
          "Cosmos Agency does not sell, rent, or share your personal data with third parties for commercial or advertising purposes.",
          "Your data will not be used improperly or shared outside the Cosmos Agency team, unless we are expressly required to do so by law.",
        ],
      },
      {
        title: "5. Data Retention",
        body: [
          "We retain your data only for as long as necessary to respond to your request or fulfill the contracted service relationship, and we take reasonable measures to protect it from unauthorized access.",
        ],
      },
      {
        title: "6. User Rights",
        body: [
          "You may request access to, correction of, or deletion of the personal data we have on file at any time by contacting us at ahanostyle@gmail.com.",
        ],
      },
      {
        title: "7. Audiovisual Material",
        body: [
          "When you hire our photography and video services, the material captured may be used by Cosmos Agency for portfolio or promotional purposes, unless otherwise agreed in writing with the client.",
        ],
      },
      {
        title: "8. Updates to This Document",
        body: [
          "We may update these Terms and Conditions from time to time. Any changes will be reflected on this page along with the date of the latest update.",
        ],
      },
      {
        title: "9. Contact",
        body: [
          "If you have any questions about this document or how we handle your data, contact us at ahanostyle@gmail.com or +52 1 56 4050 8888.",
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
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl font-bold text-white sm:text-5xl"
      >
        {t.title}
      </motion.h1>
      <p className="mt-4 text-sm text-white/70">{t.lastUpdated}</p>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="mt-8 text-white"
      >
        {t.introPre}
        <span className="text-[#d4ff00]">{t.introHighlight}</span>
        {t.introPost}
      </motion.p>

      <div className="mt-10 space-y-8">
        {t.sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3), ease: "easeOut" }}
          >
            <h2 className="font-heading text-xl font-medium text-white">{section.title}</h2>
            <div className="mt-2 space-y-2 text-white/80">
              {section.body.map((paragraph, j) => (
                <p key={j}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
