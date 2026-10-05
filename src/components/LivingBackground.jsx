import React, { useRef, useEffect, useCallback } from 'react';

/**
 * LivingBackground — Premium 3D Atmospheric Background
 *
 * Visual layers (back → front):
 *   1. CSS gradient — pearl/lavender atmosphere
 *   2. Large soft volumetric glow blobs (no visible circle edges)
 *   3. HTML5 Canvas — tiny soft particles (supporting only, low opacity)
 *   4. SVG orbital curves — thin, transparent, supporting depth
 *
 * Parallax:
 *   - Mouse parallax: background=0.2x, blobs=0.35x, orbitals=0.55x
 *   - Scroll parallax: very gentle vertical drift
 *
 * Performance:
 *   - All listeners are passive
 *   - mousemove throttled to ~60fps (16ms)
 *   - Particle count reduced on mobile
 *   - Canvas DPR capped at 1.5
 *   - prefers-reduced-motion: skips animation loop
 */

// ─── Canvas particle constants — tiny, soft, supporting only ─────────────────
const PARTICLE_COUNT_DESKTOP = 28;   // fewer, smaller particles
const PARTICLE_COUNT_MOBILE = 10;
const CONNECTION_DISTANCE = 90;   // much shorter — avoids dense network look
const PARTICLE_SPEED = 0.14; // very slow drift
const PARTICLE_RADIUS_MAX = 1.0;  // tiny dots
const PARTICLE_OPACITY_MAX = 0.18; // very low opacity — supporting only

// ─── Blob parallax multipliers (mouse, desktop only) ──────────────────────────
// blob-1 (blue, top-left): 0.4x
// blob-2 (lavender, right): 0.28x
// blob-3 (ice, center):    0.18x
// blob-4 (violet, bottom): 0.35x
const BLOB_PARALLAX = [0.040, 0.028, 0.018, 0.035];

// ─── Orbital parallax multiplier ─────────────────────────────────────────────
const ORBITAL_PARALLAX_X = 18;
const ORBITAL_PARALLAX_Y = 12;

// ─── Utilities ────────────────────────────────────────────────────────────────
function throttle(fn, ms) {
  let last = 0;
  return (...args) => {
    const now = performance.now();
    if (now - last >= ms) { last = now; fn(...args); }
  };
}

function isMobileViewport() {
  return typeof window !== 'undefined' && window.innerWidth < 768;
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

// ═════════════════════════════════════════════════════════════════════════════
export default function LivingBackground() {
  const canvasRef = useRef(null);
  const blobRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const orbitalRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({
    particles: [],
    mouse: { x: 0.5, y: 0.5 },
    scroll: 0,
    reduced: false,
    mobile: false,
    width: 0,
    height: 0,
  });

  // ─── Build particle array ──────────────────────────────────────────────────
  const buildParticles = useCallback((count, w, h) =>
    Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * PARTICLE_SPEED,
      vy: (Math.random() - 0.5) * PARTICLE_SPEED,
      r: Math.random() * PARTICLE_RADIUS_MAX + 0.4,
      o: Math.random() * PARTICLE_OPACITY_MAX * 0.6 + 0.04,
    }))
    , []);

  // ─── Canvas draw loop ──────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const s = stateRef.current;
    const { width: W, height: H, particles, scroll } = s;

    ctx.clearRect(0, 0, W, H);

    const scrollOffsetY = scroll * 0.03; // very gentle scroll parallax

    // Update + draw particles — tiny, very low opacity
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -4) p.x = W + 4;
      if (p.x > W + 4) p.x = -4;
      if (p.y < -4) p.y = H + 4;
      if (p.y > H + 4) p.y = -4;

      const drawY = p.y - scrollOffsetY;
      ctx.beginPath();
      ctx.arc(p.x, drawY, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(109, 140, 255, ${p.o})`;
      ctx.fill();
    }

    // Very sparse, extremely faint connection lines (supporting depth only)
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < CONNECTION_DISTANCE) {
          const alpha = (1 - d / CONNECTION_DISTANCE) * 0.06; // max 6% opacity
          ctx.beginPath();
          ctx.moveTo(a.x, a.y - scrollOffsetY);
          ctx.lineTo(b.x, b.y - scrollOffsetY);
          ctx.strokeStyle = `rgba(139, 109, 255, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  // ─── Mouse move handler ────────────────────────────────────────────────────
  const handleMouseMove = useCallback(
    throttle((e) => {
      const s = stateRef.current;
      const mx = e.clientX / window.innerWidth;
      const my = e.clientY / window.innerHeight;
      s.mouse = { x: mx, y: my };

      if (s.mobile || s.reduced) return;

      // Blob parallax — each blob moves at different speed for depth illusion
      blobRefs.forEach((ref, idx) => {
        if (!ref.current) return;
        const strength = BLOB_PARALLAX[idx];
        const tx = (mx - 0.5) * strength * window.innerWidth * 0.12;
        const ty = (my - 0.5) * strength * window.innerHeight * 0.08;
        ref.current.style.transform = `translate(${tx}px, ${ty}px)`;
      });

      // Orbital parallax — moderate movement
      if (orbitalRef.current) {
        const tx = (mx - 0.5) * ORBITAL_PARALLAX_X;
        const ty = (my - 0.5) * ORBITAL_PARALLAX_Y;
        orbitalRef.current.style.transform = `translate(${tx}px, ${ty}px)`;
      }
    }, 16),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // ─── Scroll handler ────────────────────────────────────────────────────────
  const handleScroll = useCallback(
    throttle(() => {
      stateRef.current.scroll = window.scrollY;
      if (stateRef.current.mobile || stateRef.current.reduced) return;

      const sy = window.scrollY;
      blobRefs.forEach((ref, idx) => {
        if (!ref.current) return;
        const speed = [0.05, 0.08, 0.03, 0.06][idx];
        const s = stateRef.current;
        const mx = (s.mouse.x - 0.5) * BLOB_PARALLAX[idx] * window.innerWidth * 0.12;
        ref.current.style.transform = `translate(${mx}px, ${sy * speed}px)`;
      });
    }, 20),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // ─── Resize handler ───────────────────────────────────────────────────────
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const mobile = isMobileViewport();
    const W = window.innerWidth;
    const H = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const count = mobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.getContext('2d').scale(dpr, dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';

    const s = stateRef.current;
    s.width = W;
    s.height = H;
    s.mobile = mobile;
    s.particles = buildParticles(count, W, H);
  }, [buildParticles]);

  // ─── Mount / unmount ──────────────────────────────────────────────────────
  useEffect(() => {
    stateRef.current.reduced = prefersReducedMotion();
    stateRef.current.mobile = isMobileViewport();
    handleResize();

    if (!stateRef.current.reduced) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      // Reduced motion: draw static particles once
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        stateRef.current.particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(109, 140, 255, ${p.o * 0.5})`;
          ctx.fill();
        });
      }
    }

    const resizeHandler = (() => {
      let timer;
      return () => { clearTimeout(timer); timer = setTimeout(handleResize, 220); };
    })();

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', resizeHandler, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeHandler);
    };
  }, [draw, handleMouseMove, handleResize, handleScroll]);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="living-bg-root" aria-hidden="true">

      {/* Layer 1 — Pearl/lavender atmospheric gradient base */}
      <div className="living-bg-gradient" />

      {/*
        Layer 2 — Volumetric glow blobs
        These are extremely large, extremely blurred so they create an
        ambient lighting feel rather than visible gradient circles.

        Blob 1: Large soft blue — top-left (key light)
        Blob 2: Lavender/violet — right side (fill light)
        Blob 3: Ice blue — center-bottom (ambient fill)
        Blob 4: Pale violet — bottom-left (rim)
      */}
      <div ref={blobRefs[0]} className="living-bg-blob living-bg-blob-1" />
      <div ref={blobRefs[1]} className="living-bg-blob living-bg-blob-2" />
      <div ref={blobRefs[2]} className="living-bg-blob living-bg-blob-3" />
      <div ref={blobRefs[3]} className="living-bg-blob living-bg-blob-4" />

      {/* Layer 3 — Particle / sparse network canvas (supporting only) */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          opacity: 0.7,
        }}
      />

      {/* Layer 4 — Orbital curves (thin, low opacity, behind 3D objects) */}
      <div ref={orbitalRef} className="living-bg-orbitals" style={{ zIndex: 1 }}>
        <div className="orbital-ring orbital-ring-1" />
        <div className="orbital-ring orbital-ring-2" />
        <div className="orbital-ring orbital-ring-3" />
      </div>
    </div>
  );
}
