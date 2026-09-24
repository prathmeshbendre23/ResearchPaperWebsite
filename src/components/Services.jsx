import React from 'react';
import { motion } from 'framer-motion';
import { servicesData } from '../data/siteData';
import SectionContainer from './SectionContainer';
import SectionHeader from './common/SectionHeader';
import {
  FileText,
  BookOpen,
  Layout,
  Compass,
  CheckCircle2,
  Layers,
  ArrowRight,
  Check
} from 'lucide-react';

const iconMap = {
  FileText,
  BookOpen,
  Layout,
  Compass,
  CheckCircle2,
  Layers,
};

export default function Services() {
  return (
    <section id="services" className="py-24 relative bg-academic-900/40 scientific-grid-bg w-full overflow-hidden" aria-label="Services">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      <SectionContainer>
        {/* Section Header with Staggered Entrance */}
        <SectionHeader
          badge="Structured Scholarly Offerings"
          title="Research & Publication"
          titleHighlight="Services"
          description="Targeted academic assistance tailored for researchers, doctoral candidates, and faculty members seeking publication in indexed journals."
        />

        {/* Services Grid (6 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.icon] || FileText;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="academic-card group relative rounded-2xl bg-academic-900/80 hover:bg-academic-850 border border-slate-800 hover:border-cyan-500/40 p-7 sm:p-8 flex flex-col justify-between shadow-glass-edge"
              >
                {/* Top: Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-cyan-400/80 transition-colors">
                      {service.number}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display font-semibold text-xl text-white group-hover:text-cyan-300 transition-colors mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-2 mb-8 pt-4 border-t border-slate-800/80">
                    {service.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Card Action */}
                <a
                  href={`#inquiry`}
                  className="inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-lg text-xs font-medium text-slate-300 group-hover:text-cyan-300 bg-academic-950/60 hover:bg-cyan-500/10 border border-slate-800 group-hover:border-cyan-500/30 transition-all"
                >
                  <span>Inquire for this service</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            );
          })}
        </div>

      </SectionContainer>
    </section>
  );
}
