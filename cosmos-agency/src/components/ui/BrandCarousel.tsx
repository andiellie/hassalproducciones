"use client";

import { motion } from "framer-motion";

interface BrandCarouselProps {
  brands: string[];
}

export default function BrandCarousel({ brands }: BrandCarouselProps) {
  const track = [...brands, ...brands];

  return (
    <div className="relative overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
      <motion.div
        className="flex w-max gap-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {track.map((brand, i) => (
          <span
            key={`${brand}-${i}`}
            className="whitespace-nowrap text-lg font-medium text-slate-500"
          >
            {brand}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
