import Link from "next/link";
import SaturnIcon from "@/components/ui/SaturnIcon";

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
          <div className="flex items-center gap-2">
            <SaturnIcon size={20} />
            <h3 className="font-sans text-lg">
              <span className="text-white">COSMOS</span>
              <span className="text-[#d4ff00]">AGENCY</span>
              <span className="text-white">MX</span>
            </h3>
          </div>
          <p className="mt-3 text-xs text-white/80">...creating &amp; connecting with brands</p>
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

      <div className="mx-auto mt-12 max-w-6xl border-t border-white/15 pt-6 text-center">
        <p>© {new Date().getFullYear()} Cosmos. Todos los derechos reservados.</p>
        <p className="mt-2">
          <Link
            href="/terminos-y-condiciones"
            className="text-white underline underline-offset-2 hover:text-white"
          >
            Términos y Condiciones
          </Link>
        </p>
        <p className="mt-2">
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
    </footer>
  );
}
