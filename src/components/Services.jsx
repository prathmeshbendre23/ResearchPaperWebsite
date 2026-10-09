import React from 'react';
import { motion } from 'framer-motion';
import { serviceFamiliesData } from '../data/siteData';
import SectionContainer from './SectionContainer';
import SectionHeader from './common/SectionHeader';
import {
  FileText,
  Cpu,
  Layers,
  BookOpen,
  CheckCircle2,
  Compass,
  ArrowRight,
  Check,
} from 'lucide-react';

const iconMap = {
  FileText,
  Cpu,
  Layers,
  BookOpen,
  Award: BookOpen,
  CheckCircle2,
  Compass,
};

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 relative w-full overflow-hidden section-pearl-alt"
      aria-label="Research and Publication Services"
    >
      {/* Subtle scientific grid overlay */}
      <div className="absolute inset-0 scientific-grid-light-bg opacity-70 pointer-events-none" aria-hidden="true" />

      {/* Blue radial glow centre */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
        style={{
          width: '700px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(41,72,216,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <SectionContainer>
        <SectionHeader
          badge="What We Do"
          title="Research, Manuscript, and"
          titleHighlight="Publication Services"
          description="Six integrated service areas organized around the complete research lifecycle — from initial design and methodology through to publication, revision, thesis, patents, and institutional collaboration."
        />

        {/* Services Grid — 6 family cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {serviceFamiliesData.map((service, index) => {
            const IconComponent = iconMap[service.icon] || FileText;

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 25, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="academic-card group relative rounded-2xl p-7 flex flex-col justify-between"
              >
                {/* Content */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-11 h-11 rounded-xl bg-royalBlue-500/8 border border-royalBlue-500/20 flex items-center justify-center text-royalBlue-500 group-hover:scale-105 group-hover:bg-royalBlue-500/15 transition-all"
                      aria-hidden="true"
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-royalBlue-600 tracking-wider">
                      {service.kicker}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display font-semibold text-lg text-navy-900 group-hover:text-royalBlue-600 transition-colors mb-2.5 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-navy-600 text-xs sm:text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6 pt-4 border-t border-navy-100" aria-label={`${service.title} highlights`}>
                    {service.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs text-navy-600">
                        <Check className="w-3.5 h-3.5 text-royalBlue-500 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA */}
                <a
                  href="#inquiry"
                  className="inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-lg text-xs font-medium text-navy-700 group-hover:text-royalBlue-600 bg-pearl-200/60 hover:bg-royalBlue-500/8 border border-navy-200 group-hover:border-royalBlue-500/28 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-500"
                  aria-label={`Request a consultation about ${service.title}`}
                >
                  <span>Discuss Your Research</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
              </motion.article>
            );
          })}
        </div>

        {/* Publisher / Indexing Brand Safety Notice */}
        <div className="mt-12 p-4 rounded-xl bg-navy-50/60 border border-navy-200/60 text-center">
          <p className="text-[11.5px] text-navy-500 leading-relaxed max-w-3xl mx-auto">
            Publication formats and journals supported include Scopus, Web of Science (SCI/SCIE), IEEE, Springer, Elsevier, Wiley, Taylor &amp; Francis, and MDPI — among others.{' '}
            <span className="text-navy-400">
              Brain &amp; Pen Research Services is an independent research consultancy and is not affiliated with or endorsed by individual journal publishers or indexing databases unless expressly stated.
            </span>
          </p>
        </div>
      </SectionContainer>
    </section>
  );
}
