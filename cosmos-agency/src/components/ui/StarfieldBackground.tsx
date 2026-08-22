'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  vx: number;
  vy: number;
  color: string;
  glowColor: string | null;
}

const STAR_COLORS: { color: string; glow: string | null; weight: number }[] = [
  { color: '255, 255, 255', glow: null, weight: 6 },
  { color: '255, 244, 214', glow: 'rgba(255, 224, 160, 0.6)', weight: 2 },
  { color: '255, 214, 170', glow: 'rgba(255, 180, 120, 0.6)', weight: 1 },
  { color: '198, 222, 255', glow: 'rgba(150, 190, 255, 0.6)', weight: 2 },
  { color: '224, 238, 255', glow: 'rgba(224, 238, 255, 0.7)', weight: 1 },
];

function pickStarColor() {
  const total = STAR_COLORS.reduce((sum, c) => sum + c.weight, 0);
  let roll = Math.random() * total;
  for (const entry of STAR_COLORS) {
    if (roll < entry.weight) return entry;
    roll -= entry.weight;
  }
  return STAR_COLORS[0];
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initField();
    };

    const initField = () => {
      stars = [];
      // Cantidad de estrellas ajustada a la pantalla (denso, tipo campo profundo)
      const starCount = Math.floor((canvas.width * canvas.height) / 900);

      for (let i = 0; i < starCount; i++) {
        const baseAlpha = Math.random() * 0.7 + 0.25;
        const rand = Math.random();
        // La mayoría son puntos diminutos, pocas son más grandes/brillantes
        const size = rand > 0.985 ? Math.random() * 1.4 + 1.6 : Math.random() * 1.1 + 0.3;
        const { color, glow } = pickStarColor();
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          alpha: baseAlpha,
          baseAlpha,
          twinkleSpeed: Math.random() * 0.012 + 0.003,
          vx: (Math.random() - 0.5) * 0.06,
          vy: (Math.random() - 0.5) * 0.06,
          color,
          glowColor: size > 1.6 ? glow : null,
        });
      }
    };

    const draw = () => {
      // Limpiar canvas con transparencia
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        // Parpadeo suave (Twinkle effect)
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 1 || star.alpha < 0.2) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        const drawX = star.x;
        const drawY = star.y;

        // Movimiento continuo en bucle (Wrap around borders)
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Núcleo suave con caída radial (más realista que un círculo plano)
        const coreRadius = star.size * 1.8;
        const glow = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, coreRadius);
        glow.addColorStop(0, `rgba(${star.color}, ${star.alpha})`);
        glow.addColorStop(0.4, `rgba(${star.color}, ${star.alpha * 0.5})`);
        glow.addColorStop(1, `rgba(${star.color}, 0)`);

        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(drawX, drawY, coreRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Núcleo puntiagudo (rombo/destello de 4 picos) en vez de un punto redondo
        const spikeOuter = star.size * 1.6;
        const spikeInner = star.size * 0.4;
        ctx.beginPath();
        ctx.moveTo(drawX, drawY - spikeOuter);
        ctx.lineTo(drawX + spikeInner, drawY - spikeInner);
        ctx.lineTo(drawX + spikeOuter, drawY);
        ctx.lineTo(drawX + spikeInner, drawY + spikeInner);
        ctx.lineTo(drawX, drawY + spikeOuter);
        ctx.lineTo(drawX - spikeInner, drawY + spikeInner);
        ctx.lineTo(drawX - spikeOuter, drawY);
        ctx.lineTo(drawX - spikeInner, drawY - spikeInner);
        ctx.closePath();
        ctx.fillStyle = `rgba(${star.color}, ${star.alpha})`;
        ctx.fill();

        // Picos de difracción sutiles solo en las estrellas más brillantes
        if (star.glowColor) {
          const spikeLen = star.size * 3.2;
          ctx.strokeStyle = `rgba(${star.color}, ${star.alpha * 0.35})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(drawX - spikeLen, drawY);
          ctx.lineTo(drawX + spikeLen, drawY);
          ctx.moveTo(drawX, drawY - spikeLen);
          ctx.lineTo(drawX, drawY + spikeLen);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    // Listeners
    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-[#000000]"
    />
  );
}
