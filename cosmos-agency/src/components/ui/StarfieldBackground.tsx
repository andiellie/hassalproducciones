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

interface Galaxy {
  x: number;
  y: number;
  radius: number;
  colorStart: string;
  colorEnd: string;
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
    let galaxies: Galaxy[] = [];

    // Sensibilidad del movimiento con el mouse
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

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

      // Manchas difusas de galaxias/nebulosas lejanas, muy tenues
      galaxies = [];
      const galaxyCount = Math.max(4, Math.floor((canvas.width * canvas.height) / 500000));
      const galaxyPalette: [string, string][] = [
        ['rgba(120, 140, 200, 0.10)', 'rgba(120, 140, 200, 0)'],
        ['rgba(200, 150, 120, 0.08)', 'rgba(200, 150, 120, 0)'],
        ['rgba(150, 120, 190, 0.09)', 'rgba(150, 120, 190, 0)'],
        ['rgba(212, 255, 0, 0.05)', 'rgba(212, 255, 0, 0)'],
      ];
      for (let i = 0; i < galaxyCount; i++) {
        const [colorStart, colorEnd] = galaxyPalette[i % galaxyPalette.length];
        galaxies.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 180 + 120,
          colorStart,
          colorEnd,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Movimiento suave respecto al centro de la pantalla
      mouse.targetX = (e.clientX - canvas.width / 2) * 0.02;
      mouse.targetY = (e.clientY - canvas.height / 2) * 0.02;
    };

    const draw = () => {
      // Suavizado del movimiento de cámara del mouse (Easing)
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Limpiar canvas con transparencia
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Nebulosas/galaxias de fondo (parallax mínimo, quedan "lejos")
      galaxies.forEach((galaxy) => {
        const gx = galaxy.x + mouse.x * 0.15;
        const gy = galaxy.y + mouse.y * 0.15;
        const gradient = ctx.createRadialGradient(gx, gy, 0, gx, gy, galaxy.radius);
        gradient.addColorStop(0, galaxy.colorStart);
        gradient.addColorStop(1, galaxy.colorEnd);
        ctx.fillStyle = gradient;
        ctx.fillRect(gx - galaxy.radius, gy - galaxy.radius, galaxy.radius * 2, galaxy.radius * 2);
      });

      stars.forEach((star) => {
        // Parpadeo suave (Twinkle effect)
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 1 || star.alpha < 0.2) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        // Posición dinámicas con velocidad + mouse (paralaje por tamaño = profundidad)
        const drawX = star.x + mouse.x * (star.size * 0.5);
        const drawY = star.y + mouse.y * (star.size * 0.5);

        // Movimiento continuo en bucle (Wrap around borders)
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Renderizado de cada estrella con brillo
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${star.alpha})`;

        if (star.glowColor) {
          ctx.shadowBlur = 6 + star.size * 2;
          ctx.shadowColor = star.glowColor;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    // Listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-[#030712]"
    />
  );
}
