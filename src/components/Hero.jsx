import React, { useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getWhatsAppUrl } from '../config/siteConfig';
import ResearchScene from './3d/ResearchScene';
import SectionContainer from './SectionContainer';
import { ArrowRight, MessageCircle, ChevronDown, Sparkles, BookOpen } from 'lucide-react';

/**
 * Hero section
 *
 * - Transparent background — lets LivingBackground show through
 * - Mouse parallax fed to ResearchScene for subtle 3D depth response
 * - All content / copy / links unchanged
 */
export default function Hero() {
  const sceneWrapRef  = useRef(null);
  const mouseRef      = useRef({ x: 0, y: 0 });
  const rafRef        = useRef(null);

  // Smoothly apply parallax transform to the 3D scene wrapper
  const applyParallax = useCallback(() => {
    if (!sceneWrapRef.current) return;
    const { x, y } = mouseRef.current;
    // Very subtle tilt: max ±3.5° X, ±2.5° Y
    const rx = (y - 0.5) * -5;   // tilt around X axis
    const ry = (x - 0.5) *  7;   // tilt around Y axis
    sceneWrapRef.current.style.transform =
      `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  }, []);

  useEffect(() => {
    // Check reduced motion — skip parallax if enabled
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lastMove = 0;
    const onMouseMove = (e) => {
      const now = performance.now();
      if (now - lastMove < 16) return; // ~60 fps throttle
      lastMove = now;
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
      // Schedule a single rAF per mouse event
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(applyParallax);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [applyParallax]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden w-full"
      aria-label="Hero Introduction"
    >
      {/*
        Hero section has a transparent background so LivingBackground
        shows fully. We add extra glow blobs here specific to the hero
        to make this the strongest visual section.
      */}

      {/* Hero-specific glow: large soft royal blue centre-left */}
      <div
        className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width:  'clamp(400px, 55vw, 800px)',
          height: 'clamp(300px, 42vw, 600px)',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(41,72,216,0.13) 0%, rgba(41,72,216,0.03) 60%, transparent 100%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Hero-specific glow: violet right side behind 3D scene */}
      <div
        className="absolute top-1/2 right-0 lg:-right-8 -translate-y-1/2 pointer-events-none"
        style={{
          width:  'clamp(350px, 48vw, 780px)',
          height: 'clamp(300px, 44vw, 720px)',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(139,109,255,0.11) 0%, rgba(109,140,255,0.05) 50%, transparent 100%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Scientific grid overlay (very faint) */}
      <div
        className="absolute inset-0 pointer-events-none scientific-grid-light-bg opacity-60"
      />

      {/* Content grid */}
      <SectionContainer className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 2xl:gap-16 items-center min-h-[85vh] lg:min-h-[calc(100vh-8rem)]">

        {/* Left Column: Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-5 2xl:col-span-5 flex flex-col justify-center text-center lg:text-left z-10"
        >
          {/* Academic Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royalBlue-500/8 border border-royalBlue-500/20 text-royalBlue-500 text-xs font-mono tracking-wide w-fit mx-auto lg:mx-0 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-royalBlue-400" />
            <span>ACADEMIC CONSULTING &amp; PUBLICATION ADVISORY</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] xl:text-[62px] tracking-tight text-navy-900 leading-[1.12] mb-6">
            Publish Your Research. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-royalBlue-500 via-softBlue-500 to-violet-500 bg-clip-text text-transparent">
              Share Your Knowledge.
            </span>
          </h1>

          {/* Supporting Paragraph */}
          <p className="text-base sm:text-lg text-navy-600 max-w-xl mx-auto lg:mx-0 mb-8 font-normal leading-relaxed">
            Professional guidance and publication support for researchers, academics and scholars.
            Navigating manuscript readiness, peer-review standards, journal selection, and final publication.
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a
              href="#inquiry"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-royalBlue-500 to-violet-500 hover:from-royalBlue-400 hover:to-violet-400 shadow-glow-blue hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_4px_24px_rgba(41,72,216,0.40)] transition-all duration-200 transform active:scale-95"
            >
              <span>Start Your Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#services"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-navy-700 bg-white/70 hover:bg-white border border-navy-200 hover:border-royalBlue-400/50 hover:-translate-y-0.5 hover:shadow-card-light transition-all duration-200 backdrop-blur-sm"
            >
              <BookOpen className="w-4 h-4 text-royalBlue-500" />
              <span>Explore Services</span>
            </a>

            <a
              href={getWhatsAppUrl("Hi, I want to discuss my research paper publication.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm text-emerald-600 bg-emerald-500/8 hover:bg-emerald-500/16 border border-emerald-500/22 hover:border-emerald-500/50 hover:-translate-y-0.5 hover:shadow-[0_0_16px_rgba(16,185,129,0.20)] transition-all duration-200"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Credibility Markers */}
          <div className="mt-10 pt-6 border-t border-navy-200/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-navy-500">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-royalBlue-500 shadow-[0_0_6px_rgba(41,72,216,0.6)]" />
              <span>Peer-Review Readiness</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_6px_rgba(139,109,255,0.6)]" />
              <span>Journal Scope Alignment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
              <span>Confidential &amp; Structured</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Research Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-7 2xl:col-span-7 h-[460px] sm:h-[560px] lg:h-[660px] xl:h-[750px] 2xl:h-[820px] relative flex items-center justify-center"
        >
          {/* Soft halo behind 3D scene */}
          <div className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(41,72,216,0.10) 0%, rgba(139,109,255,0.08) 40%, transparent 75%)',
              filter: 'blur(20px)',
            }}
          />

          {/*
            Mouse-parallax wrapper for the 3D canvas.
            The transform is applied by the mousemove handler above.
            transition is handled in CSS (.parallax-scene).
          */}
          <div
            ref={sceneWrapRef}
            className="parallax-scene w-full h-full z-10"
          >
            <ResearchScene className="w-full h-full" />
          </div>
        </motion.div>
      </SectionContainer>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-xs text-navy-400 hover:text-royalBlue-500 transition-colors cursor-pointer group"
        aria-label="Scroll to explore"
      >
        <span className="font-mono text-[10.5px] tracking-widest uppercase opacity-75 group-hover:opacity-100 transition-opacity">
          Scroll to Explore
        </span>
        <ChevronDown className="w-4 h-4 text-royalBlue-400/80 animate-bounce" />
      </a>
    </section>
  );
}
