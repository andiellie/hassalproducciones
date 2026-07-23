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

    // Sensibilidad del movimiento con el mouse
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      // Cantidad de estrellas ajustada a la pantalla
      const starCount = Math.floor((canvas.width * canvas.height) / 3000);

      for (let i = 0; i < starCount; i++) {
        const baseAlpha = Math.random() * 0.7 + 0.3;
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5, // Tamaños variados
          alpha: baseAlpha,
          baseAlpha: baseAlpha,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          vx: (Math.random() - 0.5) * 0.2, // Deriva constante x
          vy: (Math.random() - 0.5) * 0.2, // Deriva constante y
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

      stars.forEach((star) => {
        // Parpadeo suave (Twinkle effect)
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 1 || star.alpha < 0.2) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        // Posición dinámicas con velocidad + mouse
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

        // Estrellas de acento (Cosmos)
        const isAccent = star.size > 1.6;
        if (isAccent) {
          ctx.fillStyle = `rgba(212, 255, 0, ${star.alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#d4ff00';
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
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
