const steps = [
  { title: "Descubrimiento", description: "Entendemos tu marca, objetivos y audiencia." },
  { title: "Propuesta", description: "Definimos alcance, entregables y presupuesto." },
  { title: "Producción", description: "Ejecutamos con nuestro equipo y herramientas propias." },
  { title: "Entrega", description: "Iteramos y lanzamos con métricas claras de éxito." },
];

export default function StepsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="font-heading text-center text-3xl font-medium sm:text-4xl">Cómo trabajamos</h2>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 transition-transform duration-300 hover:scale-105"
          >
            <span className="text-sm font-medium text-[#d4ff00]">0{i + 1}</span>
            <h3 className="font-heading mt-2 text-lg font-medium">{step.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
