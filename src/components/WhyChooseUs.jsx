import React from 'react';
import { motion } from 'framer-motion';
import { whyChooseUsData } from '../data/siteData';
import SectionContainer from './SectionContainer';
import SectionHeader from './common/SectionHeader';
import {
  Microscope,
  Award,
  GitBranch,
  Users,
  Sparkles,
  MessageSquare
} from 'lucide-react';

const iconMap = {
  Microscope,
  Award,
  GitBranch,
  Users,
  Sparkles,
  MessageSquare
};

export default function WhyChooseUs() {
  return (
    <section
      className="py-24 relative overflow-hidden w-full"
      aria-label="Why Choose Us"
      style={{ background: 'rgba(237,233,255,0.22)' }}
    >
      {/* Soft violet orbital glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width:  '850px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(139,109,255,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <SectionContainer>
        <SectionHeader
          badge="Methodological Excellence"
          badgeColor="violet"
          title="Focused Support For Your"
          titleHighlight="Research Journey"
          description="Our consulting philosophy centers on genuine academic rigor, ethical transparency, and disciplined execution—giving your research paper the highest probability of editorial acceptance."
        />

        {/* Feature Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {whyChooseUsData.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Sparkles;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="academic-card p-7 sm:p-8 rounded-2xl group flex flex-col justify-between"
                style={{
                  borderColor: 'rgba(203,213,225,0.70)',
                }}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-violet-500/8 border border-violet-500/18 flex items-center justify-center text-violet-500 mb-5 group-hover:scale-105 group-hover:bg-violet-500/15 transition-all">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="font-display font-semibold text-lg text-navy-900 mb-3 group-hover:text-violet-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-navy-500 text-xs sm:text-sm leading-relaxed">
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
