import { Image as ImageIcon } from "lucide-react";
import ServiceAccordion from "./ServiceAccordion";

const MOCKUP_COUNT = 12;

export default function ContentManagement() {
  return (
    <ServiceAccordion title="Content & Management" fullscreen>
      <div className="flex h-full w-full flex-col items-center gap-8 overflow-y-auto px-6 py-24">
        <p className="max-w-xl text-center text-white">
          Estrategia de contenido, calendarios editoriales y gestión de redes sociales.
        </p>
        <div className="grid w-full max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: MOCKUP_COUNT }).map((_, i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60"
            >
              <ImageIcon className="h-8 w-8 text-white" />
            </div>
          ))}
        </div>
        <p className="text-sm text-white">Próximamente: ejemplos de trabajo.</p>
      </div>
    </ServiceAccordion>
  );
}
