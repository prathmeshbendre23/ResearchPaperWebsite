import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';
import SectionContainer from './SectionContainer';
import { Check, BookOpen, Layers, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';

export default function About() {
  const [activeTab, setActiveTab] = useState('structure');

  const dossierTabs = {
    structure: {
      title: "Manuscript Structure",
      badge: "SECTION 01",
      description: "Careful architectural organization of title, abstract, introduction, problem formulation, and literature positioning to make an immediate academic impression.",
      tags: ["Clarity & Flow", "Novelty Framing", "Problem Formulation"]
    },
    methodology: {
      title: "Methodological Rigor",
      badge: "SECTION 02",
      description: "Assessing empirical rigor, experimental protocols, dataset descriptions, mathematical formulations, and reproducibility validation.",
      tags: ["Sound Methodology", "Data Reproducibility", "Statistical Validation"]
    },
    compliance: {
      title: "Editorial Compliance",
      badge: "SECTION 03",
      description: "Aligning formatting, reference syntaxes, figure resolutions, ethics disclosures, and author declarations with stringent journal standards.",
      tags: ["Citation Accuracy", "Journal Guidelines", "Publication Ethics"]
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-academic-950 w-full" aria-label="About Consultant">
      {/* Full-width ambient glow */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Fluid container */}
      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center">
          
          {/* Left Column: Consultant Narrative (55-60% width on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 xl:col-span-7 flex flex-col"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Academic Advisory & Consulting
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-6">
              Turning Research Into <br />
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Recognition.
              </span>
            </h2>

            <p className="text-slate-300 text-base leading-relaxed mb-5">
              Publishing in premier, peer-reviewed journals is more than just writing—it requires precision in scientific framing, rigorous methodology representation, and adherence to intricate editorial expectations.
            </p>

            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Led by {siteConfig.consultant.name} ({siteConfig.consultant.qualification}), our advisory provides independent, constructive, and structured guidance. We mentor researchers through every checkpoint: from early draft evaluation and journal scope matching to reviewer response refinement.
            </p>

            {/* Core Values / Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-academic-900/50 border border-slate-800/80">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Ethical Integrity</h4>
                  <p className="text-xs text-slate-400 mt-1">Strict adherence to Committee on Publication Ethics (COPE) standards.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-academic-900/50 border border-slate-800/80">
                <BookOpen className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Academic Rigor</h4>
                  <p className="text-xs text-slate-400 mt-1">Strengthening theoretical depth and experimental reproducibility.</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#inquiry"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-glow-cyan transition-all"
              >
                <span>Discuss Your Paper</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={getWhatsAppUrl("Hello, I would like to consult about my research paper.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive Research Dossier Widget */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl bg-academic-900/70 border border-cyan-500/20 p-6 shadow-2xl backdrop-blur-md">
              {/* Top Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span className="text-xs font-mono font-semibold text-slate-300">MANUSCRIPT DOSSIER</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">ANALYSIS FRAMEWORK</span>
              </div>

              {/* Interactive Tabs */}
              <div className="grid grid-cols-3 gap-2 mb-6 bg-academic-950/80 p-1.5 rounded-xl border border-slate-800">
                {Object.keys(dossierTabs).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`py-2 px-2 text-xs font-medium rounded-lg transition-all text-center capitalize ${
                      activeTab === key
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>

              {/* Tab Content Display */}
              <div className="min-h-[170px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-semibold text-lg text-white">
                      {dossierTabs[activeTab].title}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-cyan-500/20">
                      {dossierTabs[activeTab].badge}
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {dossierTabs[activeTab].description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800/80">
                  {dossierTabs[activeTab].tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
                    >
                      <Check className="w-3 h-3 text-cyan-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Micro-status indicator at bottom */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Standardized Review Protocol</span>
                <span className="text-cyan-400 font-mono">100% Peer-Focus</span>
              </div>
            </div>
          </motion.div>

        </div>
      </SectionContainer>
    </section>
  );
}
