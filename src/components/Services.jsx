import React from 'react';
import { motion } from 'framer-motion';
import { servicesData } from '../data/siteData';
import SectionContainer from './SectionContainer';
import SectionHeader from './common/SectionHeader';
import {
  FileText,
  BookOpen,
  Compass,
  Layers,
  Award,
  ShieldCheck,
  CheckCircle2,
  Layout,
  Sparkles,
  ArrowRight,
  Check
} from 'lucide-react';

const iconMap = {
  FileText,
  BookOpen,
  Compass,
  Layers,
  Award,
  ShieldCheck,
  CheckCircle2,
  Layout,
  Sparkles,
};

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 relative w-full overflow-hidden section-pearl-alt"
      aria-label="Research and Publication Services"
    >
      {/* Subtle scientific grid overlay */}
      <div className="absolute inset-0 scientific-grid-light-bg opacity-70 pointer-events-none" />

      {/* Blue radial glow centre */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
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
          title="End-to-End Research and"
          titleHighlight="Publication Services"
          description="Support is organized around research quality, ethical scholarly practice, technical depth, reproducibility, venue compliance and clear scientific communication."
        />

        {/* Services Grid (9 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.icon] || FileText;

            return (
              <motion.div
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
                    <div className="w-11 h-11 rounded-xl bg-royalBlue-500/8 border border-royalBlue-500/20 flex items-center justify-center text-royalBlue-500 group-hover:scale-105 group-hover:bg-royalBlue-500/15 transition-all">
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
                  <ul className="space-y-2 mb-6 pt-4 border-t border-navy-100">
                    {service.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs text-navy-600">
                        <Check className="w-3.5 h-3.5 text-royalBlue-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA */}
                <a
                  href="#inquiry"
                  className="inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-lg text-xs font-medium text-navy-700 group-hover:text-royalBlue-600 bg-pearl-200/60 hover:bg-royalBlue-500/8 border border-navy-200 group-hover:border-royalBlue-500/28 transition-all"
                >
                  <span>Discuss this requirement</span>
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
