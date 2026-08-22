import { Mail } from "lucide-react";
import GalaxyBackdrop from "@/components/ui/GalaxyBackdrop";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.34.664 4.523 1.81 6.375L4 29l7.82-1.762A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.75a9.7 9.7 0 0 1-4.95-1.36l-.355-.21-4.64 1.045 1.02-4.55-.232-.373A9.7 9.7 0 0 1 5.25 15c0-5.93 4.822-10.75 10.754-10.75S26.75 9.07 26.75 15 21.936 24.75 16.004 24.75Zm5.633-8.03c-.308-.154-1.82-.898-2.102-1-.282-.103-.487-.154-.692.154-.205.309-.795 1-.975 1.206-.18.206-.36.231-.667.077-.308-.154-1.3-.479-2.475-1.526-.914-.815-1.532-1.822-1.71-2.13-.18-.309-.02-.475.135-.628.138-.137.308-.36.462-.54.154-.18.205-.309.308-.514.103-.206.051-.386-.026-.54-.077-.154-.692-1.667-.949-2.283-.25-.6-.505-.52-.692-.53-.18-.008-.386-.01-.591-.01a1.14 1.14 0 0 0-.821.386c-.283.309-1.078 1.053-1.078 2.567 0 1.514 1.104 2.977 1.257 3.183.154.206 2.174 3.32 5.267 4.656.736.318 1.31.508 1.758.65.738.235 1.41.202 1.94.123.592-.088 1.82-.744 2.076-1.463.257-.72.257-1.336.18-1.463-.077-.128-.283-.206-.591-.36Z" />
    </svg>
  );
}

export default function ContactoPage() {
  return (
    <div className="relative mx-auto max-w-3xl px-6 py-16 text-center">
      <GalaxyBackdrop />
      <h1 className="text-4xl font-bold text-white sm:text-5xl">Contacto</h1>
      <p className="mt-12 text-white">
        ¿Tienes un proyecto en mente? Escríbenos directamente.
      </p>
      <div className="mt-8 space-y-2 text-white">
        <p>
          <a
            href="mailto:ahanostyle@gmail.com"
            className="inline-flex items-center justify-center gap-2 text-white transition-colors hover:text-[#d4ff00]"
          >
            <Mail className="h-4 w-4" />
            ahanostyle@gmail.com
          </a>
        </p>
        <p>
          <a
            href="https://wa.link/utfco7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-white transition-colors hover:text-[#d4ff00]"
          >
            <WhatsAppIcon />
            +52 1 55 6245 3891
          </a>
        </p>
      </div>
      <a
        href="/cotizaciones"
        className="mt-10 inline-block rounded-xl bg-[#d4ff00] px-7 py-3.5 text-sm font-medium text-black transition-transform hover:scale-105"
      >
        Cotizar mi Evento
      </a>
    </div>
  );
}
