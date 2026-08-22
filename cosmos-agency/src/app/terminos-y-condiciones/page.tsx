export const metadata = {
  title: "Términos y Condiciones | Cosmos Agency",
  description: "Términos, condiciones y tratamiento de datos personales de Cosmos Agency.",
};

const sections = [
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
      "Para cualquier duda sobre este documento o el tratamiento de tus datos, contáctanos en ahanostyle@gmail.com o al +52 1 55 6245 3891.",
    ],
  },
];

export default function TerminosPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold text-white sm:text-5xl">Términos y Condiciones</h1>
      <p className="mt-4 text-sm text-white/70">Última actualización: agosto 2026</p>

      <p className="mt-8 text-white">
        En Cosmos Agency respetamos tu privacidad. Tus datos personales{" "}
        <span className="text-[#d4ff00]">no serán vendidos ni utilizados de forma indebida</span>.
        A continuación explicamos cómo los recopilamos, usamos y protegemos.
      </p>

      <div className="mt-10 space-y-8">
        {sections.map((section) => (
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
