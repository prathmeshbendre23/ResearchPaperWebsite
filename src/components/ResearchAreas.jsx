import React from 'react';
import { motion } from 'framer-motion';
import { researchAreasData } from '../data/siteData';
import SectionContainer from './SectionContainer';
import SectionHeader from './common/SectionHeader';
import { Bot, Cpu, Cog, TrendingUp, Activity, Globe, ArrowRight } from 'lucide-react';

const iconMap = {
  Bot,
  Cpu,
  Cog,
  TrendingUp,
  Activity,
  Globe,
};

export default function ResearchAreas() {
  return (
    <section
      id="areas"
      className="py-24 relative w-full overflow-hidden section-lavender"
      aria-label="Research Areas"
    >
      {/* Scientific network pattern */}
      <div className="absolute inset-0 scientific-grid-light-bg opacity-70 pointer-events-none" />

      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '600px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(41,72,216,0.055) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <SectionContainer>
        <SectionHeader
          badge="Research Areas"
          title="Research Expertise Across"
          titleHighlight="Engineering &amp; Multidisciplinary Domains"
          description="Engineering and technology remain our principal focus, complemented by research support across management, sciences, education, healthcare, law, social sciences and multidisciplinary fields."
        />

        {/* Group 1: Engineering & Technology — Primary Focus */}
        <div className="mb-14">
          <div className="mb-6 pb-3 border-b border-navy-200/60">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-navy-900">
              {researchAreasData.primaryHeading}
            </h3>
            <p className="text-navy-500 text-xs sm:text-sm mt-1">
              {researchAreasData.primaryDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchAreasData.engineeringClusters.map((cluster, index) => {
              const Icon = iconMap[cluster.icon] || Cpu;

              return (
                <motion.div
                  key={cluster.id}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="academic-card relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between border-royalBlue-500/25 bg-white/90 shadow-card-light"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono font-bold text-royalBlue-700 bg-royalBlue-500/10 border border-royalBlue-500/20">
                        {cluster.code}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-royalBlue-500/8 border border-royalBlue-500/18 flex items-center justify-center text-royalBlue-500">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h4 className="font-display font-semibold text-base sm:text-lg text-navy-900 mb-2.5 leading-snug">
                      {cluster.name}
                    </h4>

                    <p className="text-navy-600 text-xs sm:text-sm leading-relaxed mb-5">
                      {cluster.description}
                    </p>
                  </div>

                  {/* Subfield Tags */}
                  <div className="pt-3 border-t border-navy-100">
                    <div className="flex flex-wrap gap-1.5">
                      {cluster.subfields.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10.5px] font-mono px-2 py-0.5 rounded bg-pearl-200/80 text-navy-600 border border-navy-200/60"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Group 2: Management, Sciences & Multidisciplinary Research */}
        <div>
          <div className="mb-6 pb-3 border-b border-navy-200/60">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-navy-900">
              {researchAreasData.multidisciplinaryHeading}
            </h3>
            <p className="text-navy-500 text-xs sm:text-sm mt-1">
              {researchAreasData.multidisciplinaryDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchAreasData.multidisciplinaryClusters.map((cluster, index) => {
              const Icon = iconMap[cluster.icon] || Globe;

              return (
                <motion.div
                  key={cluster.id}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="academic-card relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between bg-white/80"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono font-bold text-violet-700 bg-violet-500/10 border border-violet-500/20">
                        {cluster.code}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-violet-500/8 border border-violet-500/18 flex items-center justify-center text-violet-500">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h4 className="font-display font-semibold text-base sm:text-lg text-navy-900 mb-2.5 leading-snug">
                      {cluster.name}
                    </h4>

                    <p className="text-navy-600 text-xs sm:text-sm leading-relaxed mb-5">
                      {cluster.description}
                    </p>
                  </div>

                  {/* Subfield Tags */}
                  <div className="pt-3 border-t border-navy-100">
                    <div className="flex flex-wrap gap-1.5">
                      {cluster.subfields.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10.5px] font-mono px-2 py-0.5 rounded bg-pearl-200/80 text-navy-600 border border-navy-200/60"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-navy-600">
            Working on an emerging, interdisciplinary or specialized research problem?{' '}
            <a href="#inquiry" className="inline-flex items-center gap-1 text-royalBlue-600 hover:text-royalBlue-700 font-semibold underline">
              <span>Discuss your research topic with us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </p>
        </div>
      </SectionContainer>
    </section>
  );
}
