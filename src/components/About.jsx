import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';
import SectionContainer from './SectionContainer';
import { Check, BookOpen, Layers, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';

export default function About() {
  const [activeTab, setActiveTab] = useState('structure');

  const dossierTabs = {
    structure: {
      title:       "Manuscript Structure",
      badge:       "SECTION 01",
      description: "Careful architectural organization of title, abstract, introduction, problem formulation, and literature positioning to make an immediate academic impression.",
      tags:        ["Clarity & Flow", "Novelty Framing", "Problem Formulation"]
    },
    methodology: {
      title:       "Methodological Rigor",
      badge:       "SECTION 02",
      description: "Assessing empirical rigor, experimental protocols, dataset descriptions, mathematical formulations, and reproducibility validation.",
      tags:        ["Sound Methodology", "Data Reproducibility", "Statistical Validation"]
    },
    compliance: {
      title:       "Editorial Compliance",
      badge:       "SECTION 03",
      description: "Aligning formatting, reference syntaxes, figure resolutions, ethics disclosures, and author declarations with stringent journal standards.",
      tags:        ["Citation Accuracy", "Journal Guidelines", "Publication Ethics"]
    }
  };

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden w-full"
      aria-label="About Consultant"
      style={{ background: 'rgba(248,249,255,0.70)' }}
    >
      {/* Section ambient glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(41,72,216,0.06) 0%, transparent 70%)' }}
      />
      <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(139,109,255,0.05) 0%, transparent 70%)' }}
      />

      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center">

          {/* Left Column: Consultant Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 xl:col-span-7 flex flex-col"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono text-royalBlue-500 tracking-wider uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-royalBlue-500" />
              Academic Advisory &amp; Consulting
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy-900 tracking-tight leading-tight mb-6">
              Turning Research Into <br />
              <span className="bg-gradient-to-r from-royalBlue-500 to-violet-500 bg-clip-text text-transparent">
                Recognition.
              </span>
            </h2>

            <p className="text-navy-600 text-base leading-relaxed mb-5">
              Publishing in premier, peer-reviewed journals is more than just writing—it requires precision in scientific framing, rigorous methodology representation, and adherence to intricate editorial expectations.
            </p>

            <p className="text-navy-500 text-sm leading-relaxed mb-8">
              Led by {siteConfig.consultant.name} ({siteConfig.consultant.qualification}), our advisory provides independent, constructive, and structured guidance. We mentor researchers through every checkpoint: from early draft evaluation and journal scope matching to reviewer response refinement.
            </p>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/70 border border-navy-200/60 shadow-card-light backdrop-blur-sm">
                <ShieldCheck className="w-5 h-5 text-royalBlue-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-navy-800">Ethical Integrity</h4>
                  <p className="text-xs text-navy-500 mt-1">Strict adherence to Committee on Publication Ethics (COPE) standards.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/70 border border-navy-200/60 shadow-card-light backdrop-blur-sm">
                <BookOpen className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-navy-800">Academic Rigor</h4>
                  <p className="text-xs text-navy-500 mt-1">Strengthening theoretical depth and experimental reproducibility.</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#inquiry"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-royalBlue-500 to-violet-500 hover:from-royalBlue-400 hover:to-violet-400 shadow-glow-blue transition-all"
              >
                <span>Discuss Your Paper</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={getWhatsAppUrl("Hello, I would like to consult about my research paper.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium text-emerald-600 bg-emerald-500/8 hover:bg-emerald-500/16 border border-emerald-500/22 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Manuscript Dossier Widget */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl bg-white/80 border border-navy-200/70 p-6 shadow-card-light backdrop-blur-md">
              {/* Top Bar */}
              <div className="flex items-center justify-between border-b border-navy-100 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-royalBlue-500 animate-pulse" />
                  <span className="text-xs font-mono font-semibold text-navy-700">MANUSCRIPT DOSSIER</span>
                </div>
                <span className="text-[11px] font-mono text-navy-400">ANALYSIS FRAMEWORK</span>
              </div>

              {/* Interactive Tabs */}
              <div className="grid grid-cols-3 gap-2 mb-6 bg-pearl-200/60 p-1.5 rounded-xl border border-navy-100">
                {Object.keys(dossierTabs).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`py-2 px-2 text-xs font-medium rounded-lg transition-all text-center capitalize ${
                      activeTab === key
                        ? 'bg-royalBlue-500/12 text-royalBlue-500 border border-royalBlue-500/28 shadow-sm'
                        : 'text-navy-500 hover:text-navy-700 hover:bg-white/50'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[170px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-semibold text-lg text-navy-900">
                      {dossierTabs[activeTab].title}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-royalBlue-500/8 text-royalBlue-500 border border-royalBlue-500/20">
                      {dossierTabs[activeTab].badge}
                    </span>
                  </div>
                  <p className="text-navy-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {dossierTabs[activeTab].description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-navy-100">
                  {dossierTabs[activeTab].tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-md bg-pearl-200/70 text-navy-600 border border-navy-200/60"
                    >
                      <Check className="w-3 h-3 text-royalBlue-500" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="mt-6 pt-4 border-t border-navy-100 flex items-center justify-between text-[11px] text-navy-400">
                <span>Standardized Review Protocol</span>
                <span className="text-royalBlue-500 font-mono">100% Peer-Focus</span>
              </div>
            </div>
          </motion.div>

        </div>
      </SectionContainer>
    </section>
  );
}
