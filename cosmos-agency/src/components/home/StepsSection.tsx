'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/language';

const copy = {
  es: {
    title: 'CONOCE NUESTRO PROCESO DE TRABAJO',
    subtitle: 'Para llegar a una entrega ideal, partimos desde la preproducción de tu evento, proyecto o idea.',
    quote: 'Cotizar',
    steps: [
      { title: 'CUÉNTANOS TU IDEA', description: 'Llena el formulario de nuestra página web para recibir la información básica de tu proyecto, evento o idea.' },
      { title: 'ATERRICEMOS EL PROYECTO', description: 'Videollamada de presentación, sesión de preguntas y respuestas y definir contratación, fechas de producción y logística del proyecto, evento o idea.' },
      { title: 'HAGÁMOSLO OFICIAL', description: 'Pago del anticipo, validación de la pre-producción y entrega de contratos de servicio.' },
      { title: 'PRODUCCIÓN DE TU EVENTO', description: 'Producción del proyecto, evento o idea y definimos fechas de entrega.' },
    ],
  },
  en: {
    title: 'Steps to be part of your event',
    subtitle: 'From planning to delivery, we make it simple.',
    quote: 'Get a quote',
    steps: [
      { title: 'TELL US YOUR IDEA', description: 'Fill out the form on our website so we can learn the basics about your project, event, or idea. ' },
      { title: 'LETS DEFINE THE PROJECT', description: 'We’ll schedule an introductory video call, answer your questions, and define the scope, production dates, and logistics for your project, event, or idea.' },
      { title: 'LETS MAKE IT OFFICIAL', description: 'Payment of the deposit, approval of the pre-production plan, and delivery of the service agreements.' },
      { title: 'PRODUCTION', description: 'We produce your project, event, or idea and confirm the delivery timeline.' },
    ],
  },
};

export default function StepsSection() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-left">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-heading mt-2 text-3xl font-medium sm:mt-4 sm:text-4xl"
        >
          {t.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mt-3 text-lg text-white"
        >
          {t.subtitle}
        </motion.p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-4">
        {t.steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="group relative overflow-hidden rounded-xl border border-white/15 bg-white/5 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-[#d4ff00]/10 via-transparent to-transparent" />
            {i === 0 && (
              <Link
                href="/cotizaciones"
                className="absolute top-4 right-4 z-10 flex items-center gap-1 text-xs font-medium text-[#d4ff00] transition-transform hover:translate-x-0.5 hover:-translate-y-0.5"
              >
                {t.quote}
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
            <h3 className="font-heading mt-2 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm font-normal text-white">{step.description}</p>
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#d4ff00] transition-all duration-300 group-hover:w-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
