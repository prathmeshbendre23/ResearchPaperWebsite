import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';
import SectionContainer from './SectionContainer';
import { Check, BookOpen, ShieldCheck, ArrowRight, MessageCircle, MapPin } from 'lucide-react';

export default function About() {
  const [activeTab, setActiveTab] = useState('structure');

  const dossierTabs = {
    structure: {
      title: "Technical Rigor & Structure",
      badge: "SECTION 01",
      description: "Comprehensive organization of problem formulation, novelty framing, literature positioning, and clear experimental or simulation design.",
      tags: ["Research Gap Analysis", "Novelty Framing", "Technical Reproducibility"]
    },
    ethics: {
      title: "Ethical Scholarly Practice",
      badge: "SECTION 02",
      description: "Adherence to authentic academic research standards, responsible AI-use disclosure, accurate citations, and verified indexed venues.",
      tags: ["Publication Ethics", "Responsible AI Use", "Legitimate Venues"]
    },
    compliance: {
      title: "Submission Precision",
      badge: "SECTION 03",
      description: "Meticulous alignment with journal formatting, reference syntaxes, figure resolutions, declarations, and point-by-point revision responses.",
      tags: ["Venue Compliance", "Citation Accuracy", "Reviewer Rebuttal"]
    }
  };

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden w-full section-pearl"
      aria-label="About Brain & Pen Research Services"
    >
      {/* Section ambient glows */}
      <div
        className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(41,72,216,0.06) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(139,109,255,0.05) 0%, transparent 70%)' }}
      />

      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center">

          {/* Left Column: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 xl:col-span-7 flex flex-col"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono text-royalBlue-600 dark:text-softBlue-400 tracking-wider uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-royalBlue-500 dark:bg-softBlue-400" />
              About Brain &amp; Pen Research Services
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy-900 dark:text-white tracking-tight leading-tight mb-5">
              Research Support with an{' '}
              <span className="bg-gradient-to-r from-royalBlue-500 to-violet-500 dark:from-royalBlue-400 dark:to-violet-400 bg-clip-text text-transparent">
                Academic-First Approach
              </span>
            </h2>

            <p className="text-navy-700 dark:text-slate-200 text-base leading-relaxed mb-4">
              <strong>Brain &amp; Pen Research Services</strong> supports scholars and institutions across manuscript development, journal and conference preparation, technical revisions, projects and thesis work, intellectual-property documentation, books and chapters, and institutional research initiatives.
            </p>

            <p className="text-navy-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
              The emphasis is on <strong>technical rigor, ethical scholarship, reproducibility, clarity and venue-specific compliance</strong>. Each engagement is shaped around the actual research objective rather than a generic writing template.
            </p>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/80 dark:bg-academic-900/80 border border-navy-200/70 dark:border-navy-700/70 shadow-card-light dark:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.4)] backdrop-blur-sm hover:-translate-y-0.5 transition-all duration-200">
                <ShieldCheck className="w-5 h-5 text-royalBlue-500 dark:text-softBlue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-navy-800 dark:text-slate-100">Authenticity</h4>
                  <p className="text-xs text-navy-500 dark:text-slate-400 mt-1">Focus on authentic research methodology and legitimate publication venues.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/80 dark:bg-academic-900/80 border border-navy-200/70 dark:border-navy-700/70 shadow-card-light dark:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.4)] backdrop-blur-sm hover:-translate-y-0.5 transition-all duration-200">
                <BookOpen className="w-5 h-5 text-violet-500 dark:text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-navy-800 dark:text-slate-100">Technical Depth</h4>
                  <p className="text-xs text-navy-500 dark:text-slate-400 mt-1">Strengthening theoretical foundations and experimental validation.</p>
                </div>
              </div>
            </div>

            {/* Location Notice */}
            <div className="flex items-center gap-2 mb-8 text-xs text-navy-600 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Location: <strong>{siteConfig.contact.location}</strong></span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href="#inquiry"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-royalBlue-500 to-violet-500 hover:from-royalBlue-400 hover:to-violet-400 dark:from-royalBlue-600 dark:to-violet-600 dark:hover:from-royalBlue-500 dark:hover:to-violet-500 shadow-glow-blue hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Discuss Your Research</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={getWhatsAppUrl("Hello Brain & Pen, I would like to consult about my research requirement.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/8 dark:bg-emerald-500/15 hover:bg-emerald-500/16 dark:hover:bg-emerald-500/25 border border-emerald-500/22 dark:border-emerald-500/35 hover:-translate-y-0.5 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Manuscript Quality Dossier Widget */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl bg-white/90 dark:bg-academic-900/90 border border-navy-200/80 dark:border-navy-700/80 p-6 sm:p-7 shadow-card-light dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] backdrop-blur-md">
              {/* Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy-100 dark:border-navy-800 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-royalBlue-500 dark:bg-softBlue-400 animate-pulse" />
                  <span className="text-xs font-mono font-semibold text-navy-800 dark:text-slate-200">RESEARCH QUALITY FRAMEWORK</span>
                </div>
                <span className="text-[11px] font-mono text-royalBlue-600 dark:text-softBlue-400 font-bold">BRAIN &amp; PEN RESEARCH SERVICES</span>
              </div>

              {/* Interactive Tabs */}
              <div className="grid grid-cols-3 gap-1.5 mb-5 bg-pearl-200/60 dark:bg-academic-950/60 p-1.5 rounded-xl border border-navy-100 dark:border-navy-800">
                {Object.keys(dossierTabs).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`py-2 px-1 text-xs font-medium rounded-lg transition-all text-center capitalize ${activeTab === key
                        ? 'bg-royalBlue-500/12 dark:bg-royalBlue-400/20 text-royalBlue-600 dark:text-softBlue-300 border border-royalBlue-500/28 dark:border-royalBlue-400/35 shadow-sm font-semibold'
                        : 'text-navy-500 dark:text-slate-400 hover:text-navy-700 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-academic-800/50'
                      }`}
                  >
                    {key}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[160px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-semibold text-base sm:text-lg text-navy-900 dark:text-white">
                      {dossierTabs[activeTab].title}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-royalBlue-500/8 dark:bg-royalBlue-500/18 text-royalBlue-600 dark:text-softBlue-400 border border-royalBlue-500/20 dark:border-royalBlue-400/30 font-bold">
                      {dossierTabs[activeTab].badge}
                    </span>
                  </div>
                  <p className="text-navy-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {dossierTabs[activeTab].description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-navy-100 dark:border-navy-800">
                  {dossierTabs[activeTab].tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-[10.5px] font-mono px-2.5 py-1 rounded-md bg-pearl-200/70 dark:bg-academic-950/70 text-navy-700 dark:text-slate-300 border border-navy-200/60 dark:border-navy-700/60 font-medium"
                    >
                      <Check className="w-3 h-3 text-royalBlue-500 dark:text-softBlue-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="mt-6 pt-4 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between text-[11px] text-navy-500 dark:text-slate-400">
                <span>Research Quality + Publication Readiness</span>
                <span className="text-royalBlue-600 dark:text-softBlue-400 font-mono font-bold">Academic Impact</span>
              </div>
            </div>
          </motion.div>

        </div>
      </SectionContainer>
    </section>
  );
}
