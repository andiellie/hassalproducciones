import Link from "next/link";

const exploreLinks = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/cotizaciones", label: "Cotizaciones" },
  { href: "/contacto", label: "Contacto" },
  { href: "/terminos-y-condiciones", label: "Términos y Condiciones" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/15 bg-[#000000] px-6 py-16 text-sm text-white">
      <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-3">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/LOGO/cosmos-agency-navbar-wordmark.svg"
            alt="Cosmos Agency MX"
            className="h-16 w-auto sm:h-24"
          />
        </div>

        <div>
          <h4 className="font-heading text-sm font-medium uppercase tracking-wide text-white">Explora</h4>
          <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-white">
            {exploreLinks.map((link, i) => (
              <li key={link.href} className="flex items-center gap-2">
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
                {i < exploreLinks.length - 1 && <span className="text-white">·</span>}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-medium uppercase tracking-wide text-white">Contacto</h4>
          <p className="mt-3 text-white">Hablemos de tu próximo evento.</p>
          <Link
            href="/cotizaciones"
            className="mt-2 inline-flex items-center gap-1 text-[#d4ff00] transition-colors hover:text-[#e5ff66]"
          >
            Solicita una cotización →
          </Link>
        </div>
      </div>

      <div className="-mx-6 mt-12 border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} COSMOSAGENCYMX. Todos los derechos reservados.
          </p>
          <p>
            Website hecho por{" "}
            <a
              href="https://andiesgn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-2 hover:text-white"
            >
              Andiesgn
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
