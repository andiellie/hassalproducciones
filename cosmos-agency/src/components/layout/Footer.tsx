import Link from "next/link";

const exploreLinks = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/cotizaciones", label: "Cotizaciones" },
  { href: "/contacto", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 bg-[#030712] px-6 py-16 text-sm text-slate-500">
      <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-3">
        <div>
          <h3 className="font-heading text-lg font-[650] uppercase tracking-tight text-white">COSMOS</h3>
          <p className="mt-3 text-slate-400">Fotografía y video para eventos.</p>
          <p className="mt-2">Capturamos la escencia de tus eventos.</p>
        </div>

        <div>
          <h4 className="font-heading text-sm font-medium uppercase tracking-wide text-white">Explora</h4>
          <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-slate-400">
            {exploreLinks.map((link, i) => (
              <li key={link.href} className="flex items-center gap-2">
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
                {i < exploreLinks.length - 1 && <span className="text-slate-700">·</span>}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-medium uppercase tracking-wide text-white">Contacto</h4>
          <p className="mt-3 text-slate-400">Hablemos de tu próximo evento.</p>
          <Link
            href="/cotizaciones"
            className="mt-2 inline-flex items-center gap-1 text-[#d4ff00] transition-colors hover:text-[#e5ff66]"
          >
            Solicita una cotización →
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-slate-800/60 pt-6 text-center">
        <p>© {new Date().getFullYear()} Cosmos. Todos los derechos reservados.</p>
        <p className="mt-2">
          Website hecho por{" "}
          <a
            href="https://andiesgn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 underline underline-offset-2 hover:text-slate-300"
          >
            Andiesgn
          </a>
        </p>
      </div>
    </footer>
  );
}
