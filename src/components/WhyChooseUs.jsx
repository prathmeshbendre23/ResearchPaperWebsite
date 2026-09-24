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
    <section className="py-24 relative bg-academic-950 overflow-hidden w-full" aria-label="Why Choose Us">
      {/* Subtle orbital radial glow spanning section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] 2xl:w-[1100px] h-[450px] bg-indigo-500/5 rounded-full blur-[160px] pointer-events-none" />

      <SectionContainer>
        {/* Section Heading */}
        <SectionHeader
          badge="Methodological Excellence"
          badgeColor="indigo"
          title="Focused Support For Your"
          titleHighlight="Research Journey"
          description="Our consulting philosophy centers on genuine academic rigor, ethical transparency, and disciplined execution—giving your research paper the highest probability of editorial acceptance."
        />

        {/* Feature Blocks Grid (6 items spanning full container) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {whyChooseUsData.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Sparkles;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="academic-card p-7 sm:p-8 rounded-2xl bg-academic-900/60 border border-slate-800/80 hover:border-indigo-500/40 hover:bg-academic-850 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-105 group-hover:bg-indigo-500/20 transition-all">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  <h3 className="font-display font-semibold text-lg text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
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
