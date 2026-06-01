'use client';

import { useEffect, useRef } from 'react';

const CONFIG = {
  AMOUNT: 4,
  COLOR: '100, 174, 232',
  MIN_SIZE: 1.3,
  MAX_SIZE: 4,
  MIN_SPEED: 0.3,
  MAX_SPEED: 1,
  MIN_ALPHA: 0.25,
  MAX_ALPHA: 0.85,
  DRIFT: 0.4,
  DIRECTION: 'up' as Direction,
};

type Direction =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'up-right'
  | 'up-left'
  | 'down-right'
  | 'down-left';

const DIRECTION_VECTORS: Record<Direction, { vx: number; vy: number }> = {
  up: { vx: 0, vy: -1 },
  down: { vx: 0, vy: 1 },
  left: { vx: -1, vy: 0 },
  right: { vx: 1, vy: 0 },
  'up-right': { vx: 0.7, vy: -0.7 },
  'up-left': { vx: -0.7, vy: -0.7 },
  'down-right': { vx: 0.7, vy: 0.7 },
  'down-left': { vx: -0.7, vy: 0.7 },
};

type Particle = {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  alpha: number;
};

export default function EmberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationId: number;
    let width = 0;
    let height = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const rand = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const makeParticle = (): Particle => {
      const { vx, vy } = DIRECTION_VECTORS[CONFIG.DIRECTION];

      let x: number;
      if (vx > 0) x = -rand(0, 60);
      else if (vx < 0) x = width + rand(0, 60);
      else x = Math.random() * width;

      let y: number;
      if (vy < 0) y = height + rand(0, 60);
      else if (vy > 0) y = -rand(0, 60);
      else y = Math.random() * height;

      return {
        x,
        y,
        size: rand(CONFIG.MIN_SIZE, CONFIG.MAX_SIZE),
        speed: rand(CONFIG.MIN_SPEED, CONFIG.MAX_SPEED),
        drift: rand(-CONFIG.DRIFT, CONFIG.DRIFT),
        alpha: rand(CONFIG.MIN_ALPHA, CONFIG.MAX_ALPHA),
      };
    };

    const initParticles = () => {
      particles = new Array(CONFIG.AMOUNT).fill(0).map(makeParticle);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = `rgb(${CONFIG.COLOR})`;

      const { vx, vy } = DIRECTION_VECTORS[CONFIG.DIRECTION];

      const perpX = -vy;
      const perpY = vx;

      for (const p of particles) {
        p.x += vx * p.speed + perpX * p.drift * 0.3;
        p.y += vy * p.speed + perpY * p.drift * 0.3;

        if (Math.random() > 0.96) {
          p.drift += rand(-0.2, 0.2);
          p.drift = Math.max(-CONFIG.DRIFT, Math.min(CONFIG.DRIFT, p.drift));
        }

        const margin = 20;
        const outOfBounds =
          p.x < -margin ||
          p.x > width + margin ||
          p.y < -margin ||
          p.y > height + margin;

        if (outOfBounds) {
          const fresh = makeParticle();
          p.x = fresh.x;
          p.y = fresh.y;
          p.size = fresh.size;
          p.alpha = fresh.alpha;
          p.drift = fresh.drift;
        }

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = document.visibilityState === 'visible';
      if (isVisible) animationId = requestAnimationFrame(loop);
    };

    const loop = () => {
      if (!isVisible) return;
      draw();
      animationId = requestAnimationFrame(loop);
    };

    resizeCanvas();
    initParticles();
    loop();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
        initParticles();
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}
