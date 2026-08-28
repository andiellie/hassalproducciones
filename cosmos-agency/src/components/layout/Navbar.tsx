'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MorphIcon } from "morphicons/react";
import { Menu, X } from "lucide";

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
    <header className="sticky top-4 z-50 px-6">
      <motion.nav
        layout
        animate={{ borderRadius: mobileOpen ? 32 : 999 }}
        transition={{ type: "spring", stiffness: 120, damping: 22, mass: 1 }}
        className="relative mx-auto flex w-full max-w-6xl flex-col overflow-hidden border border-white/15 bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl"
      >
        <div className="flex h-[72px] items-center justify-between gap-6 px-4 sm:h-[76px] sm:px-5 lg:h-16">
          <Link href="/" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/LOGO/cosmos-agency-navbar-wordmark.svg"
              alt="Cosmos Agency MX"
              className="h-[56px] w-auto sm:h-[58px] lg:h-[50px]"
            />
          </Link>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 text-sm text-white lg:flex">
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
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="-mr-2 flex h-10 w-10 items-center justify-center lg:hidden"
          >
            <MorphIcon icon={mobileOpen ? X : Menu} size={20} className="text-white" />
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                height: { type: "spring", stiffness: 120, damping: 22, mass: 1 },
                opacity: { duration: 0.3, ease: "easeInOut" },
              }}
              className="overflow-hidden lg:hidden"
            >
              <ul className="flex flex-col gap-3 px-5 pb-6 text-sm text-white">
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
