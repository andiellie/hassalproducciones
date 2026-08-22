"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export interface PhotoWallItem {
  id: string | number;
  label: string;
  image: string;
}

interface PhotoWallProps {
  items: PhotoWallItem[];
  className?: string;
}

function splitRows(items: PhotoWallItem[], rowCount: number) {
  const rows: PhotoWallItem[][] = Array.from({ length: rowCount }, () => []);
  items.forEach((item, i) => rows[i % rowCount].push(item));
  return rows;
}

function WallRow({
  items,
  direction,
  duration,
  large = false,
}: {
  items: PhotoWallItem[];
  direction: "left" | "right";
  duration: number;
  large?: boolean;
}) {
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex w-max gap-4"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {track.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className={`group relative shrink-0 overflow-hidden rounded-xl ${
              large ? "h-56 w-80 sm:h-72 sm:w-[26rem]" : "h-40 w-56 sm:h-48 sm:w-72"
            }`}
          >
            <Image
              src={item.image}
              alt={item.label}
              fill
              sizes={large ? "416px" : "288px"}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              draggable={false}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function PhotoWall({ items, className = "" }: PhotoWallProps) {
  const rows = splitRows(items, 3);
  const directions: Array<"left" | "right"> = ["left", "right", "left"];

  return (
    <div className={`flex flex-col gap-4 px-6 ${className}`}>
      {rows.map((row, i) => (
        <WallRow key={i} items={row} direction={directions[i]} duration={30} large={i === 2} />
      ))}
    </div>
  );
}
