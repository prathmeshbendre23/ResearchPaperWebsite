import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { researchLifecycleData } from '../data/siteData';
import SectionContainer from './SectionContainer';
import SectionHeader from './common/SectionHeader';
import { Check, ArrowRight, Layers, FileText, Send, RefreshCw } from 'lucide-react';

const stageIcons = [Layers, FileText, Send, RefreshCw];

const stageDetails = [
  {
    step: "01",
    title: "Research Design",
    subtitle: "Formulation, novelty & methodology",
    description: "Problem formulation, novelty mapping, methodology, datasets, experiments and analytical planning.",
    checkpoints: [
      "Research problem identification and gap analysis",
      "Novelty and contribution framing",
      "Experimental / simulation protocol design",
      "Dataset identification and parameter structuring",
    ],
  },
  {
    step: "02",
    title: "Manuscript Development",
    subtitle: "Technical writing & figures",
    description: "Technical writing, restructuring, figures, tables, references and journal-specific formatting.",
    checkpoints: [
      "Technical drafting and logical restructuring",
      "High-resolution figures and schema presentation",
      "Mathematical and algorithmic clarity",
      "Journal-template compliance and bibliography styling",
    ],
  },
  {
    step: "03",
    title: "Submission & Revision",
    subtitle: "Venue matching & peer-review",
    description: "Venue matching, submission preparation, reviewer-response strategy and revision handling.",
    checkpoints: [
      "Scope alignment with verified indexed venues",
      "Cover letter and author declaration preparation",
      "Point-by-point reviewer-response letter drafting",
      "Minor and major revision technical updates",
    ],
  },
  {
    step: "04",
    title: "Research Continuity",
    subtitle: "Projects, patents & collaboration",
    description: "Projects, thesis, patents, books, chapters, collaborations, FDPs, STTPs and academic opportunities.",
    checkpoints: [
      "UG/PG/PhD project and thesis completion",
      "Patent and copyright technical documentation",
      "Authored and edited book chapter development",
      "Institutional MoUs and faculty training programs",
    ],
  },
];

export default function PublicationProcess() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="process"
      className="py-24 relative overflow-hidden w-full"
      aria-label="Research Support Lifecycle"
      style={{ background: 'rgba(248,249,255,0.75)' }}
    >
      {/* Light grid overlay */}
      <div className="absolute inset-0 scientific-grid-light-bg opacity-60 pointer-events-none" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/3 right-10 pointer-events-none"
        style={{
          width: '600px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(41,72,216,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <SectionContainer>
        <SectionHeader
          badge="Structured Methodology"
          title="The Complete"
          titleHighlight="Research Support Lifecycle"
          description="A structured 4-phase academic roadmap guiding scholars from initial problem formulation to final publication and long-term research continuity."
        />

        {/* Step Navigator Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {stageDetails.map((item, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-royalBlue-500/10 text-royalBlue-600 border border-royalBlue-500/30 shadow-glow-blue'
                    : 'bg-white/70 text-navy-500 hover:text-navy-800 border border-navy-200 hover:border-royalBlue-400/30 backdrop-blur-sm'
                }`}
              >
                <span className={`font-mono text-xs ${isActive ? 'text-royalBlue-600 font-bold' : 'text-navy-400'}`}>
                  {item.step}
                </span>
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Stage Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Stage Info */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 rounded-2xl bg-white/85 border border-royalBlue-500/15 p-8 flex flex-col justify-between shadow-card-light backdrop-blur-md"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-royalBlue-500/8 text-royalBlue-600 border border-royalBlue-500/22">
                  PHASE {stageDetails[activeStep].step} OF 04
                </span>
                <span className="text-xs font-mono text-navy-400">
                  {stageDetails[activeStep].subtitle}
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-navy-900 mb-4">
                {stageDetails[activeStep].title}
              </h3>

              <p className="text-navy-600 text-sm sm:text-base leading-relaxed mb-6">
                {stageDetails[activeStep].description}
              </p>

              {/* Deliverables */}
              <div className="pt-4 border-t border-navy-100">
                <h4 className="text-xs font-mono text-navy-400 uppercase tracking-wider mb-3">
                  Key Checkpoints &amp; Activities:
                </h4>
                <div className="space-y-3">
                  {stageDetails[activeStep].checkpoints.map((cp, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-3 text-xs sm:text-sm text-navy-700">
                      <div className="w-5 h-5 rounded-full bg-royalBlue-500/8 border border-royalBlue-500/25 flex items-center justify-center text-royalBlue-500 shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{cp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Nav */}
            <div className="mt-8 pt-6 border-t border-navy-100 flex items-center justify-between">
              <div className="flex gap-2">
                {stageDetails.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveStep(dotIdx)}
                    className={`h-2.5 rounded-full transition-all ${
                      dotIdx === activeStep ? 'bg-royalBlue-500 w-8' : 'bg-navy-200 hover:bg-navy-300 w-2.5'
                    }`}
                    aria-label={`Go to step ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <a
                href="#inquiry"
                className="inline-flex items-center gap-2 text-xs font-semibold text-royalBlue-600 hover:text-royalBlue-700"
              >
                <span>Discuss this phase</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right: Stage Visualization */}
          <div className="lg:col-span-5 rounded-2xl bg-white/70 border border-navy-200/70 p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm shadow-card-light">
            <div
              className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(41,72,216,0.05) 0%, transparent 70%)', filter: 'blur(30px)' }}
            />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-navy-100 text-xs font-mono text-navy-400">
                <span>LIFECYCLE OVERVIEW</span>
                <span className="text-royalBlue-500 font-bold">RESEARCH LIFECYCLE</span>
              </div>

              <div className="space-y-4 my-6">
                {stageDetails.map((stage, sIdx) => {
                  const Icon = stageIcons[sIdx] || FileText;
                  const isCurrent = sIdx === activeStep;
                  const isPast = sIdx < activeStep;

                  return (
                    <div
                      key={stage.step}
                      onClick={() => setActiveStep(sIdx)}
                      className={`flex items-center gap-4 p-3 rounded-xl border transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-royalBlue-500/8 border-royalBlue-500/28 text-royalBlue-700'
                          : isPast
                          ? 'bg-pearl-200/50 border-navy-200/60 text-navy-500'
                          : 'bg-white/50 border-navy-200/40 text-navy-400 hover:border-navy-300'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono text-xs shrink-0 transition-colors ${
                          isCurrent
                            ? 'bg-royalBlue-500 text-white font-bold'
                            : isPast
                            ? 'bg-emerald-500/12 text-emerald-600 border border-emerald-500/25'
                            : 'bg-pearl-200 text-navy-400'
                        }`}
                      >
                        {isPast ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-xs font-semibold truncate ${isCurrent ? 'text-navy-900' : 'text-navy-600'}`}>
                            {stage.title}
                          </p>
                          <span className="text-[10px] font-mono text-navy-400">
                            {isPast ? 'DONE' : isCurrent ? 'ACTIVE' : `PHASE ${stage.step}`}
                          </span>
                        </div>
                        <p className="text-[11px] text-navy-400 truncate mt-0.5">{stage.subtitle}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-pearl-200/60 border border-navy-200/60 flex items-center justify-between text-xs">
              <span className="text-navy-500">Methodological Standard:</span>
              <span className="text-royalBlue-500 font-mono font-semibold">Peer-Review Compliant</span>
            </div>
          </div>

        </div>
      </SectionContainer>
    </section>
  );
}
