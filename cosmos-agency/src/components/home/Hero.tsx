'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-screen text-white flex flex-col items-center justify-center px-6 overflow-hidden font-sans">

      {/* 1. Fondo de Cuadrícula Tecnológica (Grid Pattern) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* 2. Glow Neón de Fondo (Aura Magenta/Cosmos) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-[#d4ff00]/20 to-purple-600/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">

        {/* Badge Interactivo Top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4ff00]/30 bg-[#d4ff00]/10 text-[#d4ff00] text-xs font-medium backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(212,255,0,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>COSMOS AGENCY</span>
        </motion.div>

        {/* Título Principal con Degradado e Iluminación */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-[#d4ff00]">
            COSMOSAGENCYMX
          </span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg text-slate-400 max-w-2xl leading-relaxed font-normal"
        >
          Desarrollamos marcas, contenido audiovisual de alto impacto y experiencias digitales optimizadas al milímetro.
        </motion.p>

        {/* Botones Estilo SaaS / Nodeflow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Botón Principal con Hover de Brillo */}
          <motion.a
            href="#cotizaciones"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#d4ff00] text-black font-medium text-sm shadow-[0_0_25px_rgba(212,255,0,0.3)] hover:shadow-[0_0_35px_rgba(212,255,0,0.5)] transition-all duration-300 w-full sm:w-auto"
          >
            Iniciar Proyecto
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>

          {/* Botón Secundario Vidrio / Minimalista */}
          <motion.a
            href="#servicios"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl text-slate-300 font-medium text-sm hover:bg-slate-800/80 hover:text-white hover:border-slate-700 transition-all duration-200 w-full sm:w-auto"
          >
            Explorar Servicios
          </motion.a>
        </motion.div>

      </div>
    </div>
  );
}
