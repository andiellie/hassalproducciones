'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SaturnIcon from "@/components/ui/SaturnIcon";

const links = [
  { href: "/servicios", label: "Servicios" },
  { href: "/cotizaciones", label: "Cotizaciones" },
  { href: "/contacto", label: "Contacto" },
];

function splitHref(href: string) {
  const [path, hash = ""] = href.split("#");
  return { path, hash };
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash.replace("#", ""));
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 lg:px-[60px]">
      <nav className="relative mx-auto flex w-full max-w-[1152px] items-center justify-between gap-6 rounded-full border border-white/10 bg-slate-900/55 px-4 py-4 backdrop-blur-md sm:px-5 sm:py-6">
        <Link href="/" className="flex items-center">
          <SaturnIcon size={28} />
        </Link>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 text-sm text-slate-300 lg:flex">
          {links.map((link) => {
            const { path, hash: linkHash } = splitHref(link.href);
            const isActive = pathname === path && hash === linkHash;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setHash(linkHash)}
                  className={`transition-colors hover:text-white ${
                    isActive ? "text-[#d4ff00]" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="flex flex-col gap-1 lg:hidden"
        >
          <span className="h-px w-4 bg-slate-300" />
          <span className="h-px w-4 bg-slate-300" />
          <span className="h-px w-4 bg-slate-300" />
        </button>
      </nav>

      {mobileOpen && (
        <div className="absolute top-16 left-4 right-4 max-w-[1152px] rounded-2xl border border-white/10 bg-slate-900/90 p-4 backdrop-blur-md sm:left-6 sm:right-6 lg:hidden">
          <ul className="flex flex-col gap-3 text-sm text-slate-300">
            {links.map((link) => {
              const { path, hash: linkHash } = splitHref(link.href);
              const isActive = pathname === path && hash === linkHash;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => {
                      setHash(linkHash);
                      setMobileOpen(false);
                    }}
                    className={`block transition-colors hover:text-white ${
                      isActive ? "text-[#d4ff00]" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
