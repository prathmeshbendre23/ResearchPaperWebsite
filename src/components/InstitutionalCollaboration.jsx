import React from 'react';
import { motion } from 'framer-motion';
import { institutionalCollaborationData } from '../data/siteData';
import SectionContainer from './SectionContainer';
import SectionHeader from './common/SectionHeader';
import { Handshake, ArrowRight, Check } from 'lucide-react';

export default function InstitutionalCollaboration() {
  const { cards, mouCard } = institutionalCollaborationData;

  return (
    <section
      id="collaborate"
      className="py-24 relative overflow-hidden w-full section-pearl-alt"
      aria-label="Institutional Collaboration"
    >
      {/* Light background glow */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '750px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(41,72,216,0.06) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      <SectionContainer>
        <SectionHeader
          badge={institutionalCollaborationData.eyebrow}
          title="Academic Partnerships &amp;"
          titleHighlight="MoUs"
          description={institutionalCollaborationData.description}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Collaboration Areas (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-2xl bg-white/90 dark:bg-academic-900/90 border border-navy-200/80 dark:border-navy-700/80 p-7 sm:p-9 flex flex-col justify-between shadow-card-light dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royalBlue-500/8 dark:bg-royalBlue-500/18 border border-royalBlue-500/20 dark:border-royalBlue-400/30 text-royalBlue-600 dark:text-softBlue-400 text-xs font-mono font-bold tracking-wider uppercase mb-4">
                <Handshake className="w-3.5 h-3.5" />
                <span>{institutionalCollaborationData.label}</span>
              </div>

              <h3 className="font-display font-bold text-2xl text-navy-900 dark:text-white leading-snug mb-3">
                {institutionalCollaborationData.subheading}
              </h3>

              <p className="text-navy-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                {institutionalCollaborationData.subdescription}
              </p>

              {/* 4 Mini Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-navy-100 dark:border-navy-800">
                {cards.map((card) => (
                  <div key={card.number} className="p-4 rounded-xl bg-pearl-100/80 dark:bg-academic-950/80 border border-navy-200/60 dark:border-navy-800/80 flex flex-col justify-between hover:-translate-y-0.5 transition-all duration-200">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-7 h-7 rounded-lg bg-royalBlue-500/10 dark:bg-royalBlue-400/20 border border-royalBlue-500/22 dark:border-royalBlue-400/30 text-royalBlue-600 dark:text-softBlue-400 font-mono text-xs font-bold flex items-center justify-center">
                          {card.number}
                        </span>
                      </div>
                      <h4 className="font-display font-semibold text-sm text-navy-900 dark:text-white mb-1.5 leading-snug">
                        {card.title}
                      </h4>
                      <p className="text-navy-500 dark:text-slate-400 text-xs leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between">
              <span className="text-xs text-navy-500 dark:text-slate-400">Flexible department-level or college-level structuring</span>
              <a href="#inquiry" className="inline-flex items-center gap-1.5 text-xs font-semibold text-royalBlue-600 dark:text-softBlue-400 hover:text-royalBlue-700 dark:hover:text-softBlue-300 transition-colors">
                <span>Request collaboration details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Institutional MoU CTA Card (5 cols) */}
          <motion.aside
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-white/95 to-lavender-50/60 dark:from-academic-900/95 dark:to-academic-950/90 border border-royalBlue-500/20 dark:border-royalBlue-400/30 p-7 sm:p-9 flex flex-col justify-between shadow-card-light dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 dark:bg-violet-500/20 border border-violet-500/25 dark:border-violet-500/35 text-violet-700 dark:text-violet-400 text-xs font-mono font-bold tracking-wider uppercase mb-4">
                <span>{mouCard.label}</span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-navy-900 dark:text-white leading-snug mb-3">
                {mouCard.title}
              </h3>

              <p className="text-navy-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                {mouCard.description}
              </p>

              {/* MoU Points */}
              <div className="space-y-2.5 mb-8 pt-4 border-t border-navy-100 dark:border-navy-800">
                {mouCard.points.map((pt, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-navy-700 dark:text-slate-200 font-medium">
                    <div className="w-4 h-4 rounded-full bg-violet-500/15 dark:bg-violet-500/25 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={mouCard.ctaHref}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-royalBlue-500 to-violet-500 hover:from-royalBlue-400 hover:to-violet-400 dark:from-royalBlue-600 dark:to-violet-600 dark:hover:from-royalBlue-500 dark:hover:to-violet-500 shadow-glow-blue hover:-translate-y-0.5 transition-all"
            >
              <span>{mouCard.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.aside>

        </div>
      </SectionContainer>
    </section>
  );
}
