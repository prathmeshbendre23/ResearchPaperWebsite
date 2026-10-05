import React from 'react';
import { motion } from 'framer-motion';
import { publicationPathwaysData, publicationStrategyData } from '../data/siteData';
import SectionContainer from './SectionContainer';
import SectionHeader from './common/SectionHeader';
import { ArrowRight, CheckCircle2, ShieldCheck, Tag, RefreshCw } from 'lucide-react';

export default function Publications() {
  return (
    <section
      id="publications"
      className="py-24 relative w-full overflow-hidden"
      aria-label="Publication Pathways and Scholarly Outputs"
      style={{ background: 'rgba(255,255,255,0.85)' }}
    >
      {/* Scientific grid */}
      <div className="absolute inset-0 scientific-grid-light-bg opacity-60 pointer-events-none" />

      {/* Glow */}
      <div
        className="absolute top-1/2 right-1/4 pointer-events-none"
        style={{
          width: '580px',
          height: '290px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(139,109,255,0.06) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <SectionContainer>
        <SectionHeader
          badge="Publications"
          title="Publication Pathways and"
          titleHighlight="Scholarly Outputs"
          description="We support journal articles, conference papers, reviews, book chapters and other scholarly outputs across different publication routes. Each study is aligned with the most suitable format, target venue, indexing requirement and level of technical contribution."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Publication Strategy Card */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 rounded-2xl bg-white/90 border border-navy-200/80 p-7 sm:p-8 shadow-card-light lg:sticky lg:top-24"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royalBlue-500/8 border border-royalBlue-500/20 text-royalBlue-600 text-xs font-mono tracking-wider uppercase mb-4">
              <span>Publication Strategy</span>
            </div>

            <h3 className="font-display font-bold text-xl sm:text-2xl text-navy-900 leading-snug mb-3">
              {publicationStrategyData.heading}
            </h3>

            <p className="text-navy-600 text-xs sm:text-sm leading-relaxed mb-6">
              {publicationStrategyData.description}
            </p>

            {/* 4 Strategy Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-pearl-100/90 border border-navy-200/60">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-royalBlue-500 shrink-0" />
                  <strong className="text-xs font-semibold text-navy-800">Journal Verification</strong>
                </div>
                <p className="text-[11px] text-navy-500 leading-relaxed">
                  Indexing status, publisher identity, journal continuity and scope are checked before recommendation.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-pearl-100/90 border border-navy-200/60">
                <div className="flex items-center gap-2 mb-1">
                  <Tag className="w-4 h-4 text-emerald-500 shrink-0" />
                  <strong className="text-xs font-semibold text-navy-800">Affordable Support</strong>
                </div>
                <p className="text-[11px] text-navy-500 leading-relaxed">
                  Transparent service scope and practical pricing based on the actual research requirement.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-pearl-100/90 border border-navy-200/60">
                <div className="flex items-center gap-2 mb-1">
                  <RefreshCw className="w-4 h-4 text-violet-500 shrink-0" />
                  <strong className="text-xs font-semibold text-navy-800">Revision Support</strong>
                </div>
                <p className="text-[11px] text-navy-500 leading-relaxed">
                  Technical revision, reviewer responses, resubmission strategy and manuscript strengthening.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-pearl-100/90 border border-navy-200/60">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-softBlue-500 shrink-0" />
                  <strong className="text-xs font-semibold text-navy-800">Authentic Guidance</strong>
                </div>
                <p className="text-[11px] text-navy-500 leading-relaxed">
                  Focus on legitimate scholarly venues and defensible publication practices.
                </p>
              </div>
            </div>

            {/* Desk Rejection Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-royalBlue-500/10 to-violet-500/10 border border-royalBlue-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <strong className="block text-navy-900 text-xs sm:text-sm font-semibold">
                  {publicationStrategyData.deskRejection.title}
                </strong>
                <span className="block text-navy-600 text-xs mt-0.5">
                  {publicationStrategyData.deskRejection.description}
                </span>
              </div>
              <a
                href={publicationStrategyData.deskRejection.ctaHref}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-royalBlue-600 hover:text-royalBlue-700 shrink-0"
              >
                <span>{publicationStrategyData.deskRejection.ctaText}</span>
              </a>
            </div>
          </motion.aside>

          {/* Right Column: Publication Pathways List */}
          <div className="lg:col-span-7 space-y-4">
            {publicationPathwaysData.map((pathway, index) => (
              <motion.div
                key={pathway.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="academic-card p-6 sm:p-7 rounded-2xl flex flex-col sm:flex-row items-start gap-5 group"
              >
                {/* Tag Badge */}
                <div className="w-24 sm:w-28 shrink-0 py-2.5 px-3 rounded-xl bg-royalBlue-500/8 border border-royalBlue-500/22 text-center text-xs font-mono font-bold text-royalBlue-600 shadow-sm">
                  {pathway.tag}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-semibold text-base sm:text-lg text-navy-900 group-hover:text-royalBlue-600 transition-colors mb-2">
                    {pathway.title}
                  </h4>
                  <p className="text-navy-600 text-xs sm:text-sm leading-relaxed mb-3">
                    {pathway.description}
                  </p>
                  <a
                    href="#inquiry"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-royalBlue-600 hover:text-royalBlue-700"
                  >
                    <span>Discuss this pathway</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </SectionContainer>
    </section>
  );
}
