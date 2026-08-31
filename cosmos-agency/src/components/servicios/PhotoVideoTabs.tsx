'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PhotoWall from "@/components/ui/PhotoWall";
import { useLanguage } from "@/lib/language";

function toItems(folder: string, files: string[]) {
  return files.map((file, i) => ({
    id: `${folder}-${i}`,
    label: file,
    image: `/imagenes/Servicios/fotografia-servicios/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`,
  }));
}

const filaGrandeArriba = toItems("FILA GRANDE ARRIBA", [
  "BODA L&R-3.jpg",
  "DSC02117.jpg",
  "DSC02175.jpg",
  "DSC02292.jpg",
  "DSC05772.jpg",
  "DSC05787.jpg",
  "DSC05789.jpg",
  "DSC06055.jpg",
  "DSC06301.jpg",
  "IMG_0591.jpg",
  "IMG_0747.jpg",
  "_MG_1087.jpg",
]);

const filaMedio = toItems("FILA EN MEDIO MEDIANA", [
  "Copia de _MG_1010 2.jpg",
  "Copia de _MG_1037.jpg",
  "DSC02065.jpg",
  "DSC02067.jpg",
  "DSC02083.jpg",
  "IMG_1467.jpg",
  "IMG_1587.jpg",
  "IMG_1612.jpg",
  "IMG_2373.jpg",
  "IMG_2893.jpg",
  "IMG_3406.jpg",
  "IMG_3479.jpg",
  "IMG_3595.jpg",
  "IMG_3630.jpg",
  "IMG_3666.jpg",
  "IMG_3698.jpg",
  "IMG_3714.jpg",
]);

const filaAbajo = toItems("FILA ABAJO MEDIANA", [
  "Copia de DSC01185.jpg",
  "Copia de DSC01220.jpg",
  "Copia de DSC01274.jpg",
  "DSC05874.jpg",
  "IMG_0167.jpg",
  "IMG_0601.jpg",
  "IMG_1206.jpg",
  "IMG_1339.jpg",
  "IMG_3035.jpg",
  "IMG_3372.jpg",
  "IMG_4217.JPG",
  "IMG_6876.jpg",
  "_MG_0385.jpg",
  "_MG_4843.jpg",
  "_MG_4917.jpg",
  "_MG_4950.jpg",
]);

const wallRows: [typeof filaGrandeArriba, typeof filaMedio, typeof filaAbajo] = [
  filaGrandeArriba,
  filaMedio,
  filaAbajo,
];

type Tab = "foto" | "video";

const copy = {
  es: {
    tabs: { foto: "Fotografía", video: "Video" },
    photoCaption: "Las imágenes de esta galería forman parte de nuestro portafolio y se muestran únicamente con fines demostrativos. Queda prohibida su reproducción, modificación o uso por terceros sin autorización previa.",
    playAria: "Reproducir video",
    quotes: "IR A COTIZACIONES",
  },
  en: {
    tabs: { foto: "Photography", video: "Video" },
    photoCaption: "Note: The images in this gallery are part of our portfolio and are displayed for demonstration purposes only. Their reproduction, modification, or use by third parties without prior authorization is prohibited.",
    playAria: "Play video",
    quotes: "GET A QUOTE",
  },
};

export default function PhotoVideoTabs() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const searchParams = useSearchParams();
  const initialTab: Tab = searchParams.get("tab") === "video" ? "video" : "foto";
  const [tab, setTab] = useState<Tab>(initialTab);
  const tabs: { value: Tab; label: string }[] = [
    { value: "foto", label: t.tabs.foto },
    { value: "video", label: t.tabs.video },
  ];

  return (
    <div>
      <div className="mx-auto max-w-3xl px-6 pt-8 pb-8">
        <div className="relative inline-flex rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-xl">
          {tabs.map(({ value, label }) => (
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
          <PhotoWall rows={wallRows} />
          <p className="mx-auto max-w-3xl px-6 pt-6 text-center text-sm text-white italic">{t.photoCaption}</p>
          <div className="flex justify-center px-6 pt-6 pb-16">
            <Link
              href="/cotizaciones"
              className="group inline-flex items-center gap-2 rounded-full border border-[#d4ff00]/60 bg-transparent px-8 py-4 text-sm font-semibold tracking-wide text-[#d4ff00] uppercase shadow-[0_0_20px_rgba(212,255,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:border-[#d4ff00] hover:shadow-[0_0_35px_rgba(212,255,0,0.45)]"
            >
              {t.quotes}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl px-6 pb-16">
          <button
            type="button"
            aria-label={t.playAria}
            className="group flex aspect-video w-full items-center justify-center rounded-xl border-2 border-[#d4ff00] bg-slate-900/60 shadow-[0_0_25px_rgba(212,255,0,0.2)]"
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
