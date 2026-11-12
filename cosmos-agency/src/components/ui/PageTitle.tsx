"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

/** Título principal (h1) de cada página, con la animación de entrada estándar del sitio. */
export default function PageTitle({ children }: { children: ReactNode }) {
  return (
    <motion.h1 {...fadeInUp()} className="text-4xl font-bold text-white sm:text-5xl">
      {children}
    </motion.h1>
  );
}
