'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-left">
      <motion.span
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.2, ease: "linear" }}
        className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-[#d4ff00] align-bottom"
        style={{ animation: "cosmos-caret 0.8s steps(1) infinite" }}
      >
        <h2 className="font-heading text-3xl font-medium sm:text-4xl">¿Qué es diferente en Cosmos?</h2>
      </motion.span>
      <p className="mt-6 text-lg leading-relaxed text-slate-400">
        Somos una agencia creativa versátil.
      </p>
      <p className="mt-4 text-lg text-slate-400 leading-relaxed">
        Capturamos <span className="text-[#d4ff00]">la energía, personas y momentos</span> que hacen único cada evento, con un equipo audiovisual profesional.
      </p>
    </section>
  );
}
