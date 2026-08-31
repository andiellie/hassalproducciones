"use client";

import { motion } from "framer-motion";
import QuoteForm from "@/components/cotizaciones/QuoteForm";
import { useLanguage } from "@/lib/language";

export default function CotizacionesPage() {
  const { lang } = useLanguage();

  return (
    <div className="relative">
      <div className="mx-auto max-w-3xl px-6 pt-16 text-left">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-bold text-white sm:text-5xl"
        >
          {lang === "es" ? "Cotizaciones" : "Get a Quote"}
        </motion.h1>
      </div>
      <QuoteForm />
    </div>
  );
}
