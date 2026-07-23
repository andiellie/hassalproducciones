import Link from "next/link";

const links = [
  { href: "/servicios", label: "Servicios" },
  { href: "/renta-equipo", label: "Renta de Equipo" },
  { href: "/cotizaciones", label: "Cotizaciones" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#030712]/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-bold tracking-wide">
          COSMOSAGENCYMX
        </Link>
        <ul className="hidden items-center gap-8 text-sm text-slate-300 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
