import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { researchAreasData } from '../data/siteData';
import SectionContainer from './SectionContainer';
import SectionHeader from './common/SectionHeader';
import {
  Cpu,
  Bot,
  Cog,
  TrendingUp,
  Dna,
  Globe,
  Activity,
  Layers,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

const iconMap = {
  Cpu,
  Bot,
  Cog,
  TrendingUp,
  Dna,
  Globe,
  Activity,
  Layers
};

export default function ResearchAreas() {
  const [selectedArea, setSelectedArea] = useState(null);

  return (
    <section id="areas" className="py-24 relative bg-academic-950 w-full overflow-hidden" aria-label="Research Areas">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <SectionContainer>
        {/* Section Header */}
        <SectionHeader
          badge="Disciplines & Domains"
          title="Specialized"
          titleHighlight="Research Areas"
          description="Specialized consultation across leading academic fields. We assist scholars in framing their papers for top-tier subject-matter and cross-disciplinary journals."
        />

        {/* 8 Category Grid (4 cards across desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {researchAreasData.map((area, index) => {
            const Icon = iconMap[area.icon] || Sparkles;
            const isSelected = selectedArea === area.id;

            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedArea(isSelected ? null : area.id)}
                className={`academic-card relative rounded-2xl p-6 sm:p-7 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-academic-900 border-cyan-400 shadow-glow-cyan'
                    : 'bg-academic-900/60 hover:bg-academic-850 border border-slate-800/80 hover:border-cyan-500/40 shadow-glass-edge'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </div>

                  <h3 className="font-display font-semibold text-base text-white mb-2">
                    {area.name}
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    {area.description}
                  </p>
                </div>

                {/* Subfield Tags */}
                <div className="pt-3 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5">
                    {area.subfields.slice(0, 3).map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {sub}
                      </span>
                    ))}
                    {area.subfields.length > 3 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 text-cyan-400">
                        +{area.subfields.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Direct CTA */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400">
            Have a specialized or cross-disciplinary topic?{' '}
            <a href="#inquiry" className="text-cyan-400 hover:underline font-medium">
              Submit your inquiry for custom domain guidance →
            </a>
          </p>
        </div>

      </SectionContainer>
    </section>
  );
}
