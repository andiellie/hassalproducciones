"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BrandButton from "@/components/ui/BrandButton";

export interface CarouselItem {
  id: string | number;
  title: string;
  description: string;
  image: string;
}

interface CarouselProps {
  items: CarouselItem[];
  autoplayInterval?: number;
  className?: string;
}

const BREAKPOINTS: { query: string; perView: number }[] = [
  { query: "(min-width: 1280px)", perView: 4 },
  { query: "(min-width: 1024px)", perView: 3 },
  { query: "(min-width: 640px)", perView: 2 },
];

function useItemsPerView() {
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const resolve = () => {
      const match = BREAKPOINTS.find((bp) => window.matchMedia(bp.query).matches);
      setPerView(match ? match.perView : 1);
    };
    resolve();
    window.addEventListener("resize", resolve);
    return () => window.removeEventListener("resize", resolve);
  }, []);

  return perView;
}

export default function Carousel({ items, autoplayInterval = 4500, className = "" }: CarouselProps) {
  const perView = useItemsPerView();
  const pageCount = Math.max(1, Math.ceil(items.length / perView));
  const [page, setPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // El número de páginas cambia con el breakpoint; evita quedar en una página inexistente.
  useEffect(() => {
    setPage((p) => Math.min(p, pageCount - 1));
  }, [pageCount]);

  const goTo = useCallback(
    (index: number) => {
      setPage(((index % pageCount) + pageCount) % pageCount);
    },
    [pageCount]
  );

  const next = useCallback(() => goTo(page + 1), [goTo, page]);
  const prev = useCallback(() => goTo(page - 1), [goTo, page]);

  // Autoplay infinito, pausado en hover/touch.
  useEffect(() => {
    if (isPaused || pageCount <= 1) return;
    const id = setInterval(next, autoplayInterval);
    return () => clearInterval(id);
  }, [isPaused, pageCount, autoplayInterval, next]);

  const itemWidthPercent = 100 / perView;

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = 60;
    if (info.offset.x < -threshold || info.velocity.x < -400) {
      next();
    } else if (info.offset.x > threshold || info.velocity.x > 400) {
      prev();
    }
  };

  const pages = useMemo(() => {
    const result: CarouselItem[][] = [];
    for (let i = 0; i < items.length; i += perView) {
      result.push(items.slice(i, i + perView));
    }
    return result;
  }, [items, perView]);

  return (
    <div
      className={`group/carousel relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          animate={{ x: `-${page * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
        >
          {pages.map((group, pageIndex) => (
            <div key={pageIndex} className="flex w-full shrink-0 gap-6 px-1">
              {group.map((item) => (
                <div
                  key={item.id}
                  className="relative shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40"
                  style={{ width: `calc(${itemWidthPercent}% - ${((perView - 1) * 24) / perView}px)` }}
                >
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                      draggable={false}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-heading text-lg font-medium text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-white">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {pageCount > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-white opacity-100 backdrop-blur-md transition-opacity duration-300 sm:opacity-0 sm:group-hover/carousel:opacity-100 hover:bg-slate-800/90"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Siguiente"
            className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-white opacity-100 backdrop-blur-md transition-opacity duration-300 sm:opacity-0 sm:group-hover/carousel:opacity-100 hover:bg-slate-800/90"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: pageCount }).map((_, i) =>
              i === page ? (
                <BrandButton
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  ariaLabel={`Ir a la página ${i + 1}`}
                  className="h-1.5 w-6 rounded-full bg-[#d4ff00] transition-all duration-300"
                />
              ) : (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Ir a la página ${i + 1}`}
                  className="h-1.5 w-1.5 rounded-full bg-slate-700 transition-all duration-300 hover:bg-slate-500"
                />
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
