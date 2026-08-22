'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-screen text-white flex flex-col items-center justify-center px-6 overflow-hidden font-sans">

      {/* Glow Neón de Fondo (Aura Magenta/Cosmos) */}
      <div className="absolute top-1/4 left-1/2 h-[180px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#d4ff00]/20 to-purple-600/30 blur-[80px] pointer-events-none sm:h-[300px] sm:w-[500px] sm:blur-[120px]" />

      <div className="relative z-10 flex w-full max-w-4xl min-w-0 flex-col items-center text-center">

        <div className="flex w-full max-w-full flex-col items-start mx-auto" style={{ width: "fit-content" }}>
          {/* Título Principal con Degradado e Iluminación */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="leading-[1.15] pb-3"
            style={{ fontSize: "clamp(2.25rem, 6vw + 1rem, 90px)", ["--hero-size" as string]: "clamp(2.25rem, 6vw + 1rem, 90px)" }}
          >
            <span className="whitespace-nowrap">
              <span className="text-white">COSMOS</span>
              <span className="text-[#d4ff00]">AGENCY</span>
              <span className="text-white">MX</span>
            </span>
          </motion.h1>

          {/* Subtítulo estilo logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="mt-2 flex w-full min-w-0 flex-col items-start justify-between gap-1 text-white sm:flex-row"
          >
            <span className="text-xs font-bold tracking-wide sm:text-sm">
              MARKETING &amp; PRODUCCIÓN AUDIOVISUAL
            </span>
            <span className="text-xs font-normal text-white sm:text-sm">
              ...creating &amp; connecting with brands
            </span>
          </motion.div>
        </div>

        {/* Botón Estilo SaaS / Nodeflow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex w-full items-center justify-center sm:w-auto"
        >
          <motion.a
            href="/servicios"
            animate={{ scale: [1, 1.015, 1] }}
            transition={{ scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center justify-center gap-2 px-10 py-5 rounded-xl bg-[#d4ff00] text-black font-medium text-sm shadow-[0_0_25px_rgba(212,255,0,0.3)] hover:shadow-[0_0_35px_rgba(212,255,0,0.5)] transition-all duration-300 w-full sm:w-auto"
          >
            Ver nuestro trabajo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

      </div>
    </div>
  );
}
