import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    href: "/servicios/fotografia",
    title: "Fotografía",
    description: "Cobertura fotográfica para bodas, conciertos, marcas y más.",
  },
  {
    href: "/servicios/video",
    title: "Video",
    description: "Producción audiovisual de alto impacto para tu evento.",
  },
];

export default function ServiciosPage() {
  return (
    <div>
      <div className="mx-auto max-w-3xl px-6 pt-16">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">Servicios</h1>
      </div>
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 px-6 py-16 sm:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 p-6 transition-colors hover:border-slate-700"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-medium">{service.title}</h2>
              <ArrowUpRight className="h-5 w-5 text-[#d4ff00] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <p className="mt-2 text-sm text-slate-400">{service.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
