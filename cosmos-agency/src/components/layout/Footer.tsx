"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language";

const exploreLinks = [
  { href: "/", label: { es: "Inicio", en: "Home" } },
  { href: "/servicios", label: { es: "Servicios", en: "Services" } },
  { href: "/cotizaciones", label: { es: "Cotizaciones", en: "Get a Quote" } },
  { href: "/contacto", label: { es: "Contacto", en: "Contact" } },
  { href: "/terminos-y-condiciones", label: { es: "Términos y Condiciones", en: "Terms and Conditions" } },
];

const copy = {
  es: {
    explore: "Explora",
    contact: "Contacto",
    contactLine: "Hablemos de tu próximo evento.",
    quoteCta: "Solicita una cotización →",
    rights: "Todos los derechos reservados.",
    madeBy: "Website hecho por",
  },
  en: {
    explore: "Explore",
    contact: "Contact",
    contactLine: "Let's talk about your next event.",
    quoteCta: "Request a Quote →",
    rights: "All rights reserved.",
    madeBy: "Website by",
  },
};

export default function Footer() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <footer className="border-t border-white/15 bg-[#000000] px-6 py-16 text-sm text-white">
      <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-3">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/LOGO/cosmos-agency-navbar-wordmark.svg"
            alt="Cosmos Agency MX"
            className="h-[128px] w-auto sm:h-[77px]"
          />
          <p className="mt-2 text-xs text-white/60 sm:text-[11px]">...creating &amp; connecting with brands</p>
        </div>

        <div>
          <h4 className="font-heading text-sm font-medium uppercase tracking-wide text-white">{t.explore}</h4>
          <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-white">
            {exploreLinks.map((link, i) => (
              <li key={link.href} className="flex items-center gap-2">
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label[lang]}
                </Link>
                {i < exploreLinks.length - 1 && <span className="text-white">·</span>}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-medium uppercase tracking-wide text-white">{t.contact}</h4>
          <p className="mt-3 text-white">{t.contactLine}</p>
          <Link
            href="/cotizaciones"
            className="mt-2 inline-flex items-center gap-1 text-[#d4ff00] transition-colors hover:text-[#e5ff66]"
          >
            {t.quoteCta}
          </Link>
        </div>
      </div>

      <div className="-mx-6 mt-12 border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} COSMOSAGENCYMX. {t.rights}
          </p>
          <p>
            {t.madeBy}{" "}
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
