import React, { useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';
import { researchLifecycleData } from '../data/siteData';
import ResearchScene from './3d/ResearchScene';
import SectionContainer from './SectionContainer';
import { ArrowRight, MessageCircle, ChevronDown, BookOpen } from 'lucide-react';

export default function Hero() {
  const sceneWrapRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  // Smooth parallax tilt on 3D wrapper — very subtle
  const applyParallax = useCallback(() => {
    if (!sceneWrapRef.current) return;
    const { x, y } = mouseRef.current;
    const rx = (y - 0.5) * -4;   // max ±2° tilt
    const ry = (x - 0.5) * 5;
    sceneWrapRef.current.style.transform =
      `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lastMove = 0;
    const onMouseMove = (e) => {
      const now = performance.now();
      if (now - lastMove < 16) return;
      lastMove = now;
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
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
      className="relative min-h-screen flex flex-col justify-center pt-20 sm:pt-24 pb-10 overflow-hidden w-full"
      aria-label="Brain & Pen Research Services — Introduction"
    >
      {/* Hero-specific diffused glow — LEFT side, very soft blue light behind text */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: '10%',
          left: '-12%',
          width: 'clamp(400px, 55vw, 800px)',
          height: 'clamp(300px, 45vw, 650px)',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at 45% 42%, rgba(41,72,216,0.09) 0%, rgba(68,108,255,0.04) 50%, transparent 100%)',
          filter: 'blur(90px)',
        }}
      />

      {/* CENTER atmospheric glow */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: '20%',
          left: '25%',
          width: 'clamp(500px, 60vw, 900px)',
          height: 'clamp(380px, 50vw, 750px)',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at 50% 48%, rgba(167,139,250,0.07) 0%, rgba(139,109,255,0.03) 55%, transparent 100%)',
          filter: 'blur(110px)',
        }}
      />

      {/* RIGHT glow — primary atmospheric halo behind 3D scene */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: '15%',
          right: '-8%',
          width: 'clamp(380px, 52vw, 800px)',
          height: 'clamp(320px, 48vw, 740px)',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at 52% 45%, rgba(139,109,255,0.11) 0%, rgba(109,140,255,0.06) 40%, rgba(167,139,250,0.02) 70%, transparent 100%)',
          filter: 'blur(95px)',
        }}
      />

      {/* Subtle grid overlay — only in hero */}
      <div className="absolute inset-0 pointer-events-none scientific-grid-light-bg opacity-50" aria-hidden="true" />

      {/* ── MAIN HERO CONTENT ── */}
      <SectionContainer className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-10 items-center min-h-[78vh] lg:min-h-[calc(100vh-12rem)]">

        {/* LEFT: Text Column */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-center lg:text-left z-10 order-2 lg:order-1"
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royalBlue-500/[0.08] border border-royalBlue-500/20 text-royalBlue-600 text-[11px] font-mono tracking-wide w-fit mx-auto lg:mx-0 mb-5">
            <img
              src={siteConfig.logoPath}
              alt=""
              className="w-3.5 h-3.5 object-contain"
              aria-hidden="true"
            />
            <span>Brain &amp; Pen Research Services</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-[32px] sm:text-[40px] lg:text-[44px] xl:text-[52px] tracking-tight text-navy-900 leading-[1.13] mb-4">
            Research, Publication,{' '}
            <span className="bg-gradient-to-r from-royalBlue-500 via-softBlue-500 to-violet-500 bg-clip-text text-transparent">
              and Academic Support
            </span>
          </h1>

          {/* Supporting headline */}
          <p className="text-[14px] sm:text-[15px] font-semibold text-navy-700 mb-4 leading-snug">
            Rigorous Research. Ethical Publication Support. End-to-End Academic Expertise.
          </p>

          {/* Quality badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-lg text-[11px] font-semibold text-royalBlue-700 bg-royalBlue-500/[0.08] border border-royalBlue-500/18">
              Rigorous Research
            </span>
            <span className="text-navy-300 font-bold text-sm" aria-hidden="true">·</span>
            <span className="inline-flex items-center px-3 py-1 rounded-lg text-[11px] font-semibold text-violet-700 bg-violet-500/[0.08] border border-violet-500/18">
              Ethical Publication Support
            </span>
            <span className="text-navy-300 font-bold text-sm" aria-hidden="true">·</span>
            <span className="inline-flex items-center px-3 py-1 rounded-lg text-[11px] font-semibold text-emerald-700 bg-emerald-500/[0.08] border border-emerald-500/18">
              End-to-End Academic Support
            </span>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-[15px] text-navy-600 max-w-[560px] mx-auto lg:mx-0 mb-7 leading-relaxed">
            We support researchers, faculty members, scholars, and institutions across
            research design, methodology, manuscript development, journal selection,
            peer-review revisions, academic projects, patents, and scholarly publishing.
          </p>

          {/* CTA Buttons — clear visual hierarchy */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            {/* PRIMARY: Request a Research Consultation */}
            <a
              href="#inquiry"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-[13px] text-white bg-gradient-to-r from-royalBlue-500 to-violet-500 hover:from-royalBlue-400 hover:to-violet-400 shadow-[0_4px_20px_-2px_rgba(41,72,216,0.38)] hover:shadow-[0_6px_28px_-2px_rgba(41,72,216,0.50)] hover:-translate-y-0.5 transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-400"
            >
              <span>Request a Research Consultation</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>

            {/* SECONDARY: Explore Our Services */}
            <a
              href="#services"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-[13px] text-navy-700 bg-white/85 hover:bg-white border border-navy-200 hover:border-royalBlue-400/40 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_-2px_rgba(11,27,74,0.12)] transition-all duration-200 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-400"
            >
              <BookOpen className="w-4 h-4 text-royalBlue-500" aria-hidden="true" />
              <span>Explore Our Services</span>
            </a>

            {/* TERTIARY: WhatsApp */}
            <a
              href={getWhatsAppUrl("Hello Brain & Pen, I would like to consult regarding research and publication support.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-medium text-[13px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 hover:border-emerald-300 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              title="Chat with us on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
          </div>
        </motion.div>

        {/* RIGHT: 3D Research Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-6 h-[380px] sm:h-[480px] lg:h-[580px] xl:h-[640px] relative flex items-center justify-center order-1 lg:order-2"
          aria-hidden="true"
        >
          {/* Atmospheric halo behind 3D scene */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 52% 46%, rgba(167,139,250,0.13) 0%, rgba(109,140,255,0.08) 35%, rgba(41,72,216,0.04) 60%, transparent 80%)',
              filter: 'blur(32px)',
            }}
          />
          {/* Secondary ambient glow */}
          <div
            className="absolute inset-[-15%] pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(109,140,255,0.07) 0%, transparent 70%)',
              filter: 'blur(48px)',
            }}
          />

          {/* Mouse-parallax wrapper */}
          <div ref={sceneWrapRef} className="parallax-scene w-full h-full z-10">
            <ResearchScene className="w-full h-full" />
          </div>

          {/* Floating overlay card — Research Support Lifecycle (desktop only) */}
          <div
            className="hidden xl:block absolute bottom-4 -left-4 z-20 w-[300px] rounded-2xl bg-white/92 border border-navy-200/70 p-4 shadow-card-light backdrop-blur-md"
            style={{ boxShadow: '0 8px 32px -8px rgba(11,27,74,0.12)' }}
          >
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-navy-100">
              <span className="text-[10px] font-mono font-bold text-royalBlue-600 tracking-wider uppercase">
                Research Support Lifecycle
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              {researchLifecycleData.map((item) => (
                <div key={item.step} className="flex items-start gap-2.5 text-left">
                  <span className="w-5 h-5 rounded-md bg-royalBlue-500/10 border border-royalBlue-500/18 text-royalBlue-600 font-mono text-[9.5px] font-bold flex items-center justify-center shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="text-[11px] font-semibold text-navy-800 leading-none">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-navy-400 leading-tight mt-0.5 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </SectionContainer>

      {/* Trust Strip */}
      <div className="mt-8 border-y border-navy-200/50 bg-white/72 backdrop-blur-sm relative z-10 w-full py-4">
        <SectionContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-navy-200/40">
            {[
              {
                title: 'Researchers & Faculty',
                desc: 'Manuscripts, revisions and publication strategy',
              },
              {
                title: 'PhD / PG / UG Scholars',
                desc: 'Projects, thesis, methodology and technical documentation',
              },
              {
                title: 'Departments & Institutions',
                desc: 'MoUs, workshops and research capacity-building',
              },
              {
                title: 'Multidisciplinary Research',
                desc: 'Engineering, computing, healthcare, education and applied research',
              },
            ].map((item, i) => (
              <div key={i} className={`${i > 0 ? 'pt-3 sm:pt-0 sm:pl-5' : ''}`}>
                <strong className="block text-navy-900 text-[12px] sm:text-[13px] font-semibold">
                  {item.title}
                </strong>
                <span className="block text-navy-500 text-[11px] mt-0.5 leading-snug">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </SectionContainer>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="mt-5 mx-auto z-20 flex flex-col items-center gap-1 text-[11px] text-navy-400 hover:text-royalBlue-500 transition-colors cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-500 rounded"
        aria-label="Scroll down to learn about Brain & Pen"
      >
        <span className="font-mono text-[9.5px] tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity">
          Learn More
        </span>
        <ChevronDown className="w-4 h-4 text-royalBlue-400/70 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
