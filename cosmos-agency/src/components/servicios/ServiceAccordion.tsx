'use client';

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MorphIcon } from "morphicons/react";
import { Plus, X } from "lucide";

interface ServiceAccordionProps {
  title: string;
  children: ReactNode;
  fullscreen?: boolean;
  showToggleIcon?: boolean;
  defaultOpen?: boolean;
}

export default function ServiceAccordion({ title, children, fullscreen = false, showToggleIcon = true, defaultOpen = false }: ServiceAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left"
      >
        <h2 className="font-heading text-2xl font-medium sm:text-3xl">{title}</h2>
        {showToggleIcon && (
          <MorphIcon
            icon={open && !fullscreen ? X : Plus}
            size={28}
            className="shrink-0 text-[#d4ff00]"
          />
        )}
      </button>

      {fullscreen ? (
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed inset-0 z-50 bg-[#000000]"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar y volver a Servicios"
                className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-[#d4ff00] backdrop-blur-md"
              >
                <MorphIcon icon={X} size={20} />
              </button>
              <div className="h-full w-full">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-6">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
