import React from 'react';
import { motion } from 'framer-motion';
import { getWhatsAppUrl } from '../config/siteConfig';
import ResearchScene from './3d/ResearchScene';
import SectionContainer from './SectionContainer';
import { ArrowRight, MessageCircle, ChevronDown, Sparkles, BookOpen } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden scientific-grid-bg w-full"
      aria-label="Hero Introduction"
    >
      {/* Ambient background glow spotlights spanning full width */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] 2xl:w-[900px] h-[700px] 2xl:h-[900px] bg-indigo-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 lg:-right-8 -translate-y-1/2 w-[650px] lg:w-[850px] 2xl:w-[1100px] h-[650px] lg:h-[850px] 2xl:h-[1100px] bg-gradient-to-br from-cyan-500/15 via-indigo-600/12 to-purple-700/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Fluid Hero Container spanning full screen with responsive padding */}
      <SectionContainer className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 2xl:gap-16 items-center min-h-[85vh] lg:min-h-[calc(100vh-8rem)]">
        
        {/* Left Column: Hero Text and Actions (45-50% width on desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-5 2xl:col-span-5 flex flex-col justify-center text-center lg:text-left z-10"
        >
          {/* Academic Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono tracking-wide w-fit mx-auto lg:mx-0 mb-6 shadow-glow-cyan">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ACADEMIC CONSULTING &amp; PUBLICATION ADVISORY</span>
          </div>

          {/* Cinematic Headline */}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] xl:text-[62px] tracking-tight text-white leading-[1.12] mb-6">
            Publish Your Research. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Share Your Knowledge.
            </span>
          </h1>

          {/* Supporting Paragraph */}
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 mb-8 font-normal leading-relaxed">
            Professional guidance and publication support for researchers, academics and scholars.
            Navigating manuscript readiness, peer-review standards, journal selection, and final publication.
          </p>

          {/* Action CTA Buttons with Refined 3D-Style Hover */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a
              href="#inquiry"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-glow-cyan hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(6,182,212,0.45)] transition-all duration-200 transform active:scale-95"
            >
              <span>Start Your Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#services"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-slate-200 bg-academic-900/80 hover:bg-academic-800 border border-slate-700/80 hover:border-cyan-500/50 hover:-translate-y-0.5 hover:shadow-[0_0_16px_rgba(6,182,212,0.18)] transition-all duration-200"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Explore Services</span>
            </a>

            <a
              href={getWhatsAppUrl("Hi, I want to discuss my research paper publication.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 hover:border-emerald-500/50 hover:-translate-y-0.5 hover:shadow-[0_0_16px_rgba(16,185,129,0.25)] transition-all duration-200"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Quick Credibility Markers */}
          <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
              <span>Peer-Review Readiness</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_rgba(129,140,248,0.8)]" />
              <span>Journal Scope Alignment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              <span>Confidential &amp; Structured</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Prominent 3D Research Canvas (50-55% width on desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-7 2xl:col-span-7 h-[460px] sm:h-[560px] lg:h-[660px] xl:h-[750px] 2xl:h-[820px] relative flex items-center justify-center"
        >
          {/* Subtle glowing halo behind 3D composition */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/15 via-indigo-500/18 to-purple-600/12 rounded-full filter blur-3xl pointer-events-none" />

          {/* 3D Research Scene with enhanced visual scale */}
          <ResearchScene className="z-10" />
        </motion.div>
      </SectionContainer>

      {/* Subtle Scroll to Explore Indicator */}
      <a
        href="#about"
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer group"
        aria-label="Scroll to explore"
      >
        <span className="font-mono text-[10.5px] tracking-widest uppercase opacity-75 group-hover:opacity-100 transition-opacity">
          Scroll to Explore
        </span>
        <ChevronDown className="w-4 h-4 text-cyan-400/80 animate-bounce" />
      </a>
    </section>
  );
}
