'use client';

import { useEffect, useRef } from "react";
import Image from "next/image";

interface OrbitImagesProps {
  images: string[];
  shape?: "ellipse" | "circle";
  radius?: number;
  radiusX?: number;
  radiusY?: number;
  rotation?: number;
  duration?: number;
  itemSize?: number;
  responsive?: boolean;
  direction?: "normal" | "reverse";
  fill?: boolean;
  showPath?: boolean;
  paused?: boolean;
}

export default function OrbitImages({
  images,
  shape = "ellipse",
  radius = 160,
  radiusX = 340,
  radiusY = 80,
  rotation = 0,
  duration = 30,
  itemSize = 80,
  responsive = true,
  direction = "normal",
  fill = true,
  showPath = false,
  paused = false,
}: OrbitImagesProps) {
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);

  const rx = shape === "circle" ? radius : radiusX;
  const ry = shape === "circle" ? radius : radiusY;

  useEffect(() => {
    if (paused || images.length === 0) return;

    const sign = direction === "reverse" ? -1 : 1;

    const animate = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = (timestamp - startRef.current) / 1000;
      const progress = (elapsed / duration) * sign;

      trackRefs.current.forEach((el, i) => {
        if (!el) return;
        const offset = i / images.length;
        const angle = (progress + offset) * Math.PI * 2;
        const x = Math.cos(angle) * rx;
        const y = Math.sin(angle) * ry;
        // Profundidad: adelante (más grande/opaco) vs atrás (más chico/tenue)
        const depth = (Math.sin(angle) + 1) / 2;
        const scale = 0.75 + depth * 0.35;
        el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        el.style.zIndex = String(Math.round(depth * 100));
        el.style.opacity = String(0.55 + depth * 0.45);
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [duration, direction, paused, images.length, rx, ry]);

  return (
    <div
      className={`relative flex items-center justify-center ${responsive ? "mx-auto w-full max-w-full" : ""}`}
      style={{ height: ry * 2 + itemSize }}
    >
      <div
        className="relative"
        style={{ width: rx * 2, height: ry * 2, transform: `rotate(${rotation}deg)` }}
      >
        {showPath && (
          <div
            className="absolute inset-0 rounded-full border border-white/10"
            aria-hidden="true"
          />
        )}
        {images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            ref={(el) => {
              trackRefs.current[i] = el;
            }}
            className="absolute top-1/2 left-1/2"
            style={{
              width: itemSize,
              height: itemSize,
              marginTop: -itemSize / 2,
              marginLeft: -itemSize / 2,
            }}
          >
            <div
              className="relative h-full w-full overflow-hidden rounded-full border border-white/10 shadow-lg"
              style={{ transform: `rotate(${-rotation}deg)` }}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes={`${itemSize}px`}
                className={fill ? "object-cover" : "object-contain"}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
