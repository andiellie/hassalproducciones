'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useSearchParams } from "next/navigation";
import PhotoWall from "@/components/ui/PhotoWall";

const wallPhotos = [
  { id: 1, label: "Boda L&R", image: "/imagenes/Fotografias/EVENTOS/BODA%20L%26R-142.jpg" },
  { id: 2, label: "Concierto Live", image: "/imagenes/Fotografias/MUSICA/DSC02065.jpg" },
  { id: 3, label: "Espacio Arquitectónico", image: "/imagenes/Fotografias/ARQUITECTURA%20Y%20ESPACIOS/DSC05874.jpg" },
  { id: 4, label: "Branding", image: "/imagenes/Fotografias/MARCAS/Copia%20de%20DSC01152.jpg" },
  { id: 5, label: "Retrato", image: "/imagenes/Fotografias/RETRATOS/DSC00019.jpg" },
  { id: 6, label: "Urbano", image: "/imagenes/Fotografias/URBANO/IMG_0167.jpg" },
  { id: 7, label: "Boda L&R II", image: "/imagenes/Fotografias/EVENTOS/BODA%20L%26R-26.jpg" },
  { id: 8, label: "Sesión DJ", image: "/imagenes/Fotografias/MUSICA/DSC02067.jpg" },
  { id: 9, label: "Interior Minimal", image: "/imagenes/Fotografias/ARQUITECTURA%20Y%20ESPACIOS/IMG_0531.jpg" },
  { id: 10, label: "Producto", image: "/imagenes/Fotografias/MARCAS/Copia%20de%20DSC01185.jpg" },
  { id: 11, label: "Retrato Editorial", image: "/imagenes/Fotografias/RETRATOS/IMG_3479.jpg" },
  { id: 12, label: "Ciudad", image: "/imagenes/Fotografias/URBANO/IMG_1003.jpg" },
];

type Tab = "foto" | "video";

const TABS: { value: Tab; label: string }[] = [
  { value: "foto", label: "Fotografía" },
  { value: "video", label: "Video" },
];

export default function PhotoVideoTabs() {
  const searchParams = useSearchParams();
  const initialTab: Tab = searchParams.get("tab") === "video" ? "video" : "foto";
  const [tab, setTab] = useState<Tab>(initialTab);

  return (
    <div>
      <div className="mx-auto max-w-3xl px-6 pt-8 pb-8">
        <div className="relative inline-flex rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-xl">
          {TABS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              className={`relative z-10 rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                tab === value ? "text-black" : "text-white hover:text-[#d4ff00]"
              }`}
            >
              {tab === value && (
                <motion.span
                  layoutId="servicios-tab-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-[#d4ff00]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {label}
            </button>
          ))}
        </div>
      </div>

      {tab === "foto" ? (
        <div>
          <PhotoWall items={wallPhotos} />
          <p className="mx-auto max-w-3xl px-6 pt-6 pb-16 text-white">
            Cobertura fotográfica para bodas, conciertos, marcas y más.
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl px-6 pb-16">
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
        </div>
      )}
    </div>
  );
}
