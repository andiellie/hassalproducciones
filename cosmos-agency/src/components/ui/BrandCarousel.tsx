"use client";

import Image from "next/image";

interface Logo {
  src: string;
  alt: string;
  scale?: number;
}

interface BrandCarouselProps {
  logos: Logo[];
}

export default function BrandCarousel({ logos }: BrandCarouselProps) {
  const track = [...logos, ...logos];

  return (
    <div className="relative mx-auto max-w-6xl overflow-hidden px-6 py-16 [-webkit-mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
      <div className="cosmos-marquee-track flex w-max items-center gap-8 sm:gap-12 md:gap-16">
        {track.map((logo, i) => (
          <div
            key={`${logo.src}-${i}`}
            className="relative h-24 w-24 flex-shrink-0 sm:h-32 sm:w-32 md:h-[160px] md:w-[160px]"
            style={logo.scale ? { transform: `scale(${logo.scale})` } : undefined}
          >
            <Image
              src={`/imagenes/Home/Hero-Logos/${encodeURIComponent(logo.src)}`}
              alt={logo.alt}
              fill
              sizes="(min-width: 768px) 160px, (min-width: 640px) 128px, 96px"
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
