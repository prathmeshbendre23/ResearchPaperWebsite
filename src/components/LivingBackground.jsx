import React, { useRef, useEffect, useCallback } from 'react';

/**
 * LivingBackground
 *
 * 4-layer animated academic environment:
 *   Layer 1 — CSS pearl/lavender gradient (via .living-bg-gradient)
 *   Layer 2 — Three animated blurred glow blobs (CSS + JS mouse parallax)
 *   Layer 3 — HTML5 Canvas: tiny particles + faint network lines
 *   Layer 4 — SVG orbital rings (CSS rotation + JS mouse parallax)
 *
 * Performance:
 *   - All listeners are passive
 *   - mousemove throttled to ~60fps (16ms)
 *   - Particle count reduced on mobile
 *   - Canvas DPR capped at 1.5
 *   - prefers-reduced-motion: skips animation loop, keeps static gradient
 */

// ─── Canvas particle constants ────────────────────────────────────────────────
const PARTICLE_COUNT_DESKTOP = 48;
const PARTICLE_COUNT_MOBILE = 18;
const CONNECTION_DISTANCE = 160;  // px – particle link threshold
const PARTICLE_SPEED = 0.22; // max drift speed (very slow)
const PARTICLE_COLOR = 'rgba(41, 72, 216, ';  // royal blue base
const LINE_COLOR = 'rgba(109, 140, 255, '; // soft blue base

// Blob parallax multipliers (desktop only, very subtle)
const BLOB_PARALLAX = [0.018, 0.028, 0.012]; // per blob

// ─── Utility: throttle ────────────────────────────────────────────────────────
function throttle(fn, ms) {
  let last = 0;
  return (...args) => {
    const now = performance.now();
    if (now - last >= ms) {
      last = now;
      fn(...args);
    }
  };
}

// ─── Utility: detect mobile ───────────────────────────────────────────────────
function isMobileViewport() {
  return typeof window !== 'undefined' && window.innerWidth < 768;
}

// ─── Utility: detect reduced-motion ──────────────────────────────────────────
function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

// ═════════════════════════════════════════════════════════════════════════════
export default function LivingBackground() {
  const canvasRef = useRef(null);
  const blobRefs = [useRef(null), useRef(null), useRef(null)];
  const orbitalRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({
    particles: [],
    mouse: { x: 0.5, y: 0.5 }, // normalised 0-1
    scroll: 0,
    reduced: false,
    mobile: false,
    width: 0,
    height: 0,
  });

  // ─── Build particle array ──────────────────────────────────────────────────
  const buildParticles = useCallback((count, w, h) => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * PARTICLE_SPEED,
      vy: (Math.random() - 0.5) * PARTICLE_SPEED,
      r: Math.random() * 1.4 + 0.8,
      o: Math.random() * 0.25 + 0.18,
    }));
  }, []);

  // ─── Canvas draw loop ──────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const s = stateRef.current;
    const { width: W, height: H, particles, scroll } = s;

    ctx.clearRect(0, 0, W, H);

    // Very gentle scroll parallax on particle layer (slowest depth)
    const scrollOffsetY = scroll * 0.04;

    // Update + draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Drift
      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges
      if (p.x < -4) p.x = W + 4;
      if (p.x > W + 4) p.x = -4;
      if (p.y < -4) p.y = H + 4;
      if (p.y > H + 4) p.y = -4;

      // Draw particle dot
      const drawY = p.y - scrollOffsetY;
      ctx.beginPath();
      ctx.arc(p.x, drawY, p.r, 0, Math.PI * 2);
      ctx.fillStyle = PARTICLE_COLOR + p.o + ')';
      ctx.fill();
    }

    // Draw connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < CONNECTION_DISTANCE) {
          const alpha = (1 - d / CONNECTION_DISTANCE) * 0.14;
          const ay = a.y - scrollOffsetY;
          const by = b.y - scrollOffsetY;
          ctx.beginPath();
          ctx.moveTo(a.x, ay);
          ctx.lineTo(b.x, by);
          ctx.strokeStyle = LINE_COLOR + alpha + ')';
          ctx.lineWidth = 0.75;
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

      // Blob parallax (translate via CSS custom properties)
      blobRefs.forEach((ref, idx) => {
        if (!ref.current) return;
        const strength = BLOB_PARALLAX[idx];
        const tx = (mx - 0.5) * strength * 100; // ±~px
        const ty = (my - 0.5) * strength * 60;
        ref.current.style.transform = `translate(${tx}px, ${ty}px)`;
      });

      // Orbital parallax
      if (orbitalRef.current) {
        const tx = (mx - 0.5) * 14;
        const ty = (my - 0.5) * 10;
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

      // Subtle blob scroll drift
      const sy = window.scrollY;
      blobRefs.forEach((ref, idx) => {
        if (!ref.current) return;
        const speed = [0.06, 0.10, 0.04][idx];
        const s = stateRef.current;
        const mx = (s.mouse.x - 0.5) * BLOB_PARALLAX[idx] * 100;
        const ty = sy * speed;
        ref.current.style.transform = `translate(${mx}px, ${ty}px)`;
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

  // ─── Debounced resize ─────────────────────────────────────────────────────
  const handleResizeDebounced = useCallback(() => {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(handleResize, 220);
    };
  }, [handleResize]);

  // ─── Mount / unmount ──────────────────────────────────────────────────────
  useEffect(() => {
    stateRef.current.reduced = prefersReducedMotion();
    stateRef.current.mobile = isMobileViewport();

    handleResize();

    if (!stateRef.current.reduced) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      // Reduced motion: draw particles once, statically
      const canvas = canvasRef.current;
      if (canvas) {
        const s = stateRef.current;
        const ctx = canvas.getContext('2d');
        s.particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = PARTICLE_COLOR + (p.o * 0.6) + ')';
          ctx.fill();
        });
      }
    }

    const resizeHandler = (() => {
      let timer;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(handleResize, 220);
      };
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
    <div
      className="living-bg-root"
      aria-hidden="true"
    >
      {/* Layer 1 — CSS pearl/lavender gradient */}
      <div className="living-bg-gradient" />

      {/* Layer 2 — Glow blobs (parallax via ref transforms) */}
      <div ref={blobRefs[0]} className="living-bg-blob living-bg-blob-1" />
      <div ref={blobRefs[1]} className="living-bg-blob living-bg-blob-2" />
      <div ref={blobRefs[2]} className="living-bg-blob living-bg-blob-3" />

      {/* Layer 3 — Particle / network canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Layer 4 — Orbital rings (CSS rotation + JS parallax) */}
      <div ref={orbitalRef} className="living-bg-orbitals" style={{ zIndex: 1 }}>
        <div className="orbital-ring orbital-ring-1" />
        <div className="orbital-ring orbital-ring-2" />
        <div className="orbital-ring orbital-ring-3" />
      </div>
    </div>
  );
}
