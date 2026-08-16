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

interface Puff {
  offsetAngle: number;
  offsetRadius: number;
  size: number;
  wobblePhase: number;
  wobbleSpeed: number;
  wobbleAmount: number;
}

interface Galaxy {
  x: number;
  y: number;
  radius: number;
  centerX: number;
  centerY: number;
  angle: number;
  angularSpeed: number;
  breathPhase: number;
  breathSpeed: number;
  maxOrbitRadius: number;
  colorStart: string;
  colorEnd: string;
  puffs: Puff[];
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
        ['rgba(80, 200, 220, 0.08)', 'rgba(80, 200, 220, 0)'],
        ['rgba(230, 90, 160, 0.08)', 'rgba(230, 90, 160, 0)'],
        ['rgba(255, 130, 70, 0.07)', 'rgba(255, 130, 70, 0)'],
        ['rgba(90, 100, 230, 0.09)', 'rgba(90, 100, 230, 0)'],
        ['rgba(60, 220, 160, 0.06)', 'rgba(60, 220, 160, 0)'],
      ];
      for (let i = 0; i < galaxyCount; i++) {
        const [colorStart, colorEnd] = galaxyPalette[i % galaxyPalette.length];
        const centerX = Math.random() * canvas.width;
        const centerY = Math.random() * canvas.height;
        const maxOrbitRadius = Math.random() * 220 + 140;
        const angle = Math.random() * Math.PI * 2;
        const breathPhase = Math.random() * Math.PI * 2;
        const orbitRadius = maxOrbitRadius * (0.5 + 0.5 * Math.sin(breathPhase));
        const galaxyRadius = Math.random() * 180 + 120;
        const puffCount = Math.floor(Math.random() * 3) + 4;
        const puffs: Puff[] = [];
        for (let p = 0; p < puffCount; p++) {
          puffs.push({
            offsetAngle: Math.random() * Math.PI * 2,
            offsetRadius: Math.random() * galaxyRadius * 0.55,
            size: galaxyRadius * (Math.random() * 0.4 + 0.5),
            wobblePhase: Math.random() * Math.PI * 2,
            wobbleSpeed: Math.random() * 0.008 + 0.003,
            wobbleAmount: galaxyRadius * (Math.random() * 0.15 + 0.08),
          });
        }
        galaxies.push({
          x: centerX + Math.cos(angle) * orbitRadius,
          y: centerY + Math.sin(angle) * orbitRadius,
          radius: galaxyRadius,
          centerX,
          centerY,
          angle,
          angularSpeed: (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 0.01 + 0.006),
          breathPhase,
          breathSpeed: Math.random() * 0.006 + 0.004,
          maxOrbitRadius,
          colorStart,
          colorEnd,
          puffs,
        });
      }
    };

    const draw = () => {
      // Limpiar canvas con transparencia
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Nebulosas: se mueven solas y se mezclan aditivamente donde se intersectan
      ctx.globalCompositeOperation = 'lighter';
      galaxies.forEach((galaxy) => {
        // Órbita en espiral: gira alrededor de su centro mientras el radio crece,
        // remolino: gira y respira in/out continuamente (sin saltos) como un caracol
        galaxy.angle += galaxy.angularSpeed;
        galaxy.breathPhase += galaxy.breathSpeed;
        const orbitRadius = galaxy.maxOrbitRadius * (0.5 + 0.5 * Math.sin(galaxy.breathPhase));
        galaxy.x = galaxy.centerX + Math.cos(galaxy.angle) * orbitRadius;
        galaxy.y = galaxy.centerY + Math.sin(galaxy.angle) * orbitRadius;

        // Cada nebulosa se dibuja como varias "bocanadas" de gas que se mecen
        // de forma independiente, en vez de un círculo perfecto y uniforme.
        galaxy.puffs.forEach((puff) => {
          puff.wobblePhase += puff.wobbleSpeed;
          const wobbleX = Math.cos(puff.wobblePhase) * puff.wobbleAmount;
          const wobbleY = Math.sin(puff.wobblePhase * 0.8) * puff.wobbleAmount;
          const px = galaxy.x + Math.cos(puff.offsetAngle) * puff.offsetRadius + wobbleX;
          const py = galaxy.y + Math.sin(puff.offsetAngle) * puff.offsetRadius + wobbleY;

          const gradient = ctx.createRadialGradient(px, py, 0, px, py, puff.size);
          gradient.addColorStop(0, galaxy.colorStart);
          gradient.addColorStop(1, galaxy.colorEnd);
          ctx.fillStyle = gradient;
          ctx.fillRect(px - puff.size, py - puff.size, puff.size * 2, puff.size * 2);
        });
      });
      ctx.globalCompositeOperation = 'source-over';

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
      className="fixed inset-0 pointer-events-none z-0 bg-[#030712]"
    />
  );
}
