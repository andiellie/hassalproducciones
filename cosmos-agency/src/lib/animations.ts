/**
 * Presets de animación compartidos (framer-motion).
 * Uso: <motion.div {...fadeInUp()} /> o <motion.p {...fadeInUp(0.1)} />
 */
export function fadeInUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.6 },
    transition: delay ? { duration: 0.6, delay, ease: "easeOut" as const } : { duration: 0.6, ease: "easeOut" as const },
  };
}
