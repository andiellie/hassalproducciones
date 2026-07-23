export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="text-4xl font-bold">Contacto</h1>
      <p className="mt-4 text-slate-400">
        ¿Tienes un proyecto en mente? Escríbenos directamente.
      </p>
      <div className="mt-8 space-y-2 text-slate-300">
        <p>
          <a href="mailto:ahanostyle@gmail.com" className="hover:text-white">
            ahanostyle@gmail.com
          </a>
        </p>
        <p>
          <a href="tel:+525562453891" className="hover:text-white">
            +52 1 55 6245 3891
          </a>
        </p>
      </div>
      <a
        href="/cotizaciones"
        className="mt-10 inline-block rounded-xl bg-[#d4ff00] px-7 py-3.5 text-sm font-medium text-black"
      >
        Iniciar Proyecto
      </a>
    </div>
  );
}
