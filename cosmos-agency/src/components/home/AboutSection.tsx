'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur-xl sm:p-12">
        <h2 className="font-heading mt-2 text-3xl font-medium sm:mt-4 sm:text-4xl">¿Qué es diferente en Cosmos?</h2>
        <p className="mt-6 text-lg leading-relaxed text-white">
          Somos una agencia creativa versátil.
        </p>
        <p className="mt-4 text-lg text-white leading-relaxed">
          Capturamos <span className="text-[#d4ff00]">la energía, personas y momentos</span> que hacen único cada evento, con un equipo audiovisual profesional.
        </p>
      </div>
    </section>
  );
}
