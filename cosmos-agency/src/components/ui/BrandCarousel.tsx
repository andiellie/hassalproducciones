"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Logo {
  src: string;
  alt: string;
}

interface BrandCarouselProps {
  logos: Logo[];
}

export default function BrandCarousel({ logos }: BrandCarouselProps) {
  const track = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
      <motion.div
        className="flex w-max items-center gap-8 sm:gap-12 md:gap-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {track.map((logo, i) => (
          <div
            key={`${logo.src}-${i}`}
            className="relative h-20 w-20 flex-shrink-0 sm:h-32 sm:w-32 md:h-[160px] md:w-[160px]"
          >
            <Image
              src={`/imagenes/Home/Hero-Logos/${encodeURIComponent(logo.src)}`}
              alt={logo.alt}
              fill
              sizes="(min-width: 768px) 160px, (min-width: 640px) 128px, 80px"
              className="object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
