"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import PhotoVideoTabs from "@/components/servicios/PhotoVideoTabs";
import { useLanguage } from "@/lib/language";

export default function ServiciosPage() {
  const { lang } = useLanguage();

  return (
    <div className="relative">
      <div className="relative mx-auto max-w-3xl px-6 pt-16">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-bold text-white sm:text-5xl"
        >
          {lang === "es" ? "Servicios" : "Services"}
        </motion.h1>
      </div>
      <div className="relative">
        <Suspense fallback={null}>
          <PhotoVideoTabs />
        </Suspense>
      </div>
    </div>
  );
}
