'use client';

import { useState } from "react";
import { Play, X } from "lucide-react";
import ServiceAccordion from "./ServiceAccordion";

export default function VideoReel() {
  const [expanded, setExpanded] = useState(false);

  return (
    <ServiceAccordion title="Video">
      <p className="text-slate-400">
        Producción audiovisual de alto impacto: spots, reels y contenido de marca.
      </p>

      <button
        type="button"
        onClick={() => setExpanded(true)}
        aria-label="Reproducir video"
        className="group mt-6 flex aspect-video w-full items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d4ff00]/30 bg-[#d4ff00]/10 shadow-[0_0_25px_rgba(212,255,0,0.15)] transition-transform group-hover:scale-110">
          <Play className="h-6 w-6 translate-x-0.5 text-[#d4ff00]" fill="currentColor" />
        </div>
      </button>

      <p className="mt-4 text-sm text-slate-500">Próximamente: ejemplos de trabajo.</p>

      {expanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712] p-6">
          <button
            type="button"
            onClick={() => setExpanded(false)}
            aria-label="Cerrar"
            className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-[#d4ff00] backdrop-blur-md"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex aspect-video w-full max-w-4xl items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#d4ff00]/30 bg-[#d4ff00]/10 shadow-[0_0_35px_rgba(212,255,0,0.2)]">
              <Play className="h-8 w-8 translate-x-1 text-[#d4ff00]" fill="currentColor" />
            </div>
          </div>
        </div>
      )}
    </ServiceAccordion>
  );
}
