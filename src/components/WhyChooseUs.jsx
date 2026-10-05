import React from 'react';
import { motion } from 'framer-motion';
import { researchPrinciplesData } from '../data/siteData';
import SectionContainer from './SectionContainer';
import SectionHeader from './common/SectionHeader';
import { Cpu, ShieldCheck, CheckCircle2, Compass } from 'lucide-react';

const iconMap = {
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Compass,
};

export default function WhyChooseUs() {
  return (
    <section
      className="py-24 relative overflow-hidden w-full"
      aria-label="Professional Research Practice"
      style={{ background: 'rgba(237,233,255,0.22)' }}
    >
      {/* Soft violet orbital glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '850px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(139,109,255,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <SectionContainer>
        <SectionHeader
          badge="Professional Research Practice"
          badgeColor="violet"
          title="Built Around Rigor,"
          titleHighlight="Not Shortcuts"
          description="Strong research support improves the research question, novelty, methodology, analysis, reproducibility, presentation and compliance—not merely the wording of a manuscript."
        />

        {/* Feature Blocks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {researchPrinciplesData.map((item, index) => {
            const IconComponent = iconMap[item.icon] || ShieldCheck;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="academic-card p-6 sm:p-7 rounded-2xl group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-violet-500/8 border border-violet-500/18 flex items-center justify-center text-violet-600 mb-5 group-hover:scale-105 group-hover:bg-violet-500/15 transition-all">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="font-display font-semibold text-lg text-navy-900 mb-2.5 group-hover:text-violet-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-navy-600 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}
