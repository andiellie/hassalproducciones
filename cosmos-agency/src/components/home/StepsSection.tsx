'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const steps = [
  { title: "Cuéntanos sobre tu evento", description: "Compártenos la fecha, tipo de evento y lo que necesitas cubrir." },
  { title: "Definimos la cobertura", description: "Te recomendamos el equipo y la cobertura adecuada para tu evento." },
  { title: "Cubrimos el evento", description: "Nuestro equipo se encarga de capturar cada momento importante." },
  { title: "Recibe tu material", description: "Editamos y entregamos tus fotografías y videos listos para disfrutar y compartir." },
];

export default function StepsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-left">
        <motion.span
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.2, ease: "linear" }}
          className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-[#d4ff00] align-bottom"
          style={{ animation: "cosmos-caret 0.8s steps(1) infinite" }}
        >
          <h2 className="font-heading text-3xl font-medium sm:text-4xl">Pasos para ser parte de tu evento</h2>
        </motion.span>
        <p className="mt-3 text-lg text-slate-300">De la planificación a la entrega, hacemos que todo sea simple.</p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 p-6"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-[#d4ff00]/10 via-transparent to-transparent" />
            {i === 0 && (
              <Link
                href="/cotizaciones"
                className="absolute top-4 right-4 z-10 flex items-center gap-1 text-xs font-medium text-[#d4ff00] transition-transform hover:translate-x-0.5 hover:-translate-y-0.5"
              >
                Cotizar
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            )}
            <motion.span
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.15 }}
              className="inline-block text-sm font-medium text-[#d4ff00] transition-transform duration-300 group-hover:-translate-y-1"
            >
              0{i + 1}
            </motion.span>
            <h3 className="font-heading mt-2 text-lg font-medium">{step.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{step.description}</p>
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#d4ff00] transition-all duration-300 group-hover:w-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
