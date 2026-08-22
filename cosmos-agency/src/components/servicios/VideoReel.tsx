'use client';

import Link from "next/link";
import { Play, ArrowLeft, ArrowRight } from "lucide-react";
import ServiceAccordion from "./ServiceAccordion";

export default function VideoReel() {
  return (
    <ServiceAccordion title="Video" showToggleIcon={false} defaultOpen>
      <p className="text-white">
        Producción audiovisual de alto impacto: spots, reels y contenido de marca.
      </p>

      <button
        type="button"
        aria-label="Reproducir video"
        className="group mt-6 flex aspect-video w-full items-center justify-center rounded-xl border-2 border-[#d4ff00] bg-slate-900/60 shadow-[0_0_25px_rgba(212,255,0,0.2)]"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d4ff00] shadow-[0_0_25px_rgba(212,255,0,0.5)] transition-transform group-hover:scale-110">
          <Play className="h-6 w-6 translate-x-0.5 text-black" fill="currentColor" />
        </div>
      </button>

      <div className="mt-6 flex items-center justify-between">
        <Link
          href="/servicios"
          aria-label="Volver a Servicios"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4ff00]/40 text-[#d4ff00] transition-colors hover:bg-[#d4ff00]/10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <Link
          href="/servicios/fotografia"
          aria-label="Ir a Fotografía"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4ff00]/40 text-[#d4ff00] transition-colors hover:bg-[#d4ff00]/10"
        >
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </ServiceAccordion>
  );
}
