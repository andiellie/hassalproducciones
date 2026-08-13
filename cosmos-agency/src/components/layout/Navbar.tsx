'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand } from "@/lib/design-tokens";

const links = [
  { href: "/servicios", label: "Servicios" },
  { href: "/cotizaciones", label: "Cotizaciones" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 px-[60px]">
      <nav className="mx-auto flex w-[1152px] max-w-full items-center justify-between gap-6 rounded-full border border-white/10 bg-slate-900/55 px-5 py-6 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-white">
          <span
            className="text-base leading-none text-[#d4ff00]"
            style={{ textShadow: "0 0 8px rgba(212,255,0,0.7)" }}
          >
            ✦
          </span>
          {brand.name}
        </Link>

        <ul className="hidden items-center gap-6 text-sm text-slate-300 sm:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
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
          className="flex flex-col gap-1 sm:hidden"
        >
          <span className="h-px w-4 bg-slate-300" />
          <span className="h-px w-4 bg-slate-300" />
          <span className="h-px w-4 bg-slate-300" />
        </button>
      </nav>

      {mobileOpen && (
        <div className="absolute top-16 w-[calc(100%-120px)] max-w-[1152px] rounded-2xl border border-white/10 bg-slate-900/90 p-4 backdrop-blur-md sm:hidden">
          <ul className="flex flex-col gap-3 text-sm text-slate-300">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
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
