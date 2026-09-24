import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { processStepsData } from '../data/siteData';
import SectionContainer from './SectionContainer';
import SectionHeader from './common/SectionHeader';
import { Check, ArrowRight, FileCheck, Search, Compass, Cpu, Award } from 'lucide-react';

const stepIcons = [FileCheck, Search, Compass, Cpu, Award];

export default function PublicationProcess() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-24 relative bg-academic-950/80 scientific-grid-bg overflow-hidden w-full" aria-label="Publication Process">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-10 w-[700px] h-[400px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      <SectionContainer>
        {/* Section Header with Staggered Entrance */}
        <SectionHeader
          badge="Structured Milestone Journey"
          title="From Research to"
          titleHighlight="Publication"
          description="A clear, 5-stage advisory pipeline designed to elevate your draft from preliminary findings to official indexed publication."
        />

        {/* Interactive Step Navigator Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {processStepsData.map((item, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan'
                    : 'bg-academic-900/70 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span className={`font-mono text-xs ${isActive ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}>
                  {item.step}
                </span>
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detail & Visual Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Stage Detail Information */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 rounded-2xl bg-academic-900/80 border border-cyan-500/20 p-8 flex flex-col justify-between shadow-2xl backdrop-blur-md"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
                  STAGE {processStepsData[activeStep].step} OF 05
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {processStepsData[activeStep].subtitle}
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
                {processStepsData[activeStep].title}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {processStepsData[activeStep].description}
              </p>

              {/* Key Deliverables Checkpoints */}
              <div className="pt-4 border-t border-slate-800/80">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                  Stage Checkpoints & Deliverables:
                </h4>
                <div className="space-y-3">
                  {processStepsData[activeStep].keyActions.map((action, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Nav / Trigger */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
              <div className="flex gap-2">
                {processStepsData.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveStep(dotIdx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      dotIdx === activeStep ? 'bg-cyan-400 w-8' : 'bg-slate-700 hover:bg-slate-500'
                    }`}
                    aria-label={`Go to step ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <a
                href="#inquiry"
                className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
              >
                <span>Initiate this step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Visual Stage Dossier Progression */}
          <div className="lg:col-span-5 rounded-2xl bg-academic-900/60 border border-slate-800 p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs font-mono text-slate-400">
                <span>STAGE VISUALIZATION</span>
                <span className="text-cyan-400 font-bold">FLOW PROGRESSION</span>
              </div>

              {/* Progress Steps Overview List */}
              <div className="space-y-4 my-6">
                {processStepsData.map((step, sIdx) => {
                  const Icon = stepIcons[sIdx];
                  const isCurrent = sIdx === activeStep;
                  const isPast = sIdx < activeStep;

                  return (
                    <div
                      key={step.step}
                      onClick={() => setActiveStep(sIdx)}
                      className={`flex items-center gap-4 p-3 rounded-xl border transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-200'
                          : isPast
                          ? 'bg-academic-950/40 border-slate-800 text-slate-400'
                          : 'bg-academic-950/20 border-slate-800/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono text-xs shrink-0 transition-colors ${
                          isCurrent
                            ? 'bg-cyan-500 text-academic-950 font-bold'
                            : isPast
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isPast ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-xs font-medium truncate ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                            {step.title}
                          </p>
                          <span className="text-[10px] font-mono text-slate-400">
                            {isPast ? 'COMPLETED' : isCurrent ? 'CURRENT' : `STEP ${step.step}`}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Summary Pill */}
            <div className="p-3.5 rounded-xl bg-academic-950/80 border border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Target Timeline:</span>
              <span className="text-cyan-300 font-mono">Structured & Predictable</span>
            </div>
          </div>

        </div>
      </SectionContainer>
    </section>
  );
}
