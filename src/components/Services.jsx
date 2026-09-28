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
    <section
      id="services"
      className="py-24 relative w-full overflow-hidden"
      aria-label="Services"
      style={{ background: 'rgba(255,255,255,0.80)' }}
    >
      {/* Subtle scientific grid overlay */}
      <div className="absolute inset-0 scientific-grid-light-bg opacity-80 pointer-events-none" />

      {/* Blue radial glow centre */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width:  '700px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(41,72,216,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <SectionContainer>
        <SectionHeader
          badge="Structured Scholarly Offerings"
          title="Research & Publication"
          titleHighlight="Services"
          description="Targeted academic assistance tailored for researchers, doctoral candidates, and faculty members seeking publication in indexed journals."
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.icon] || FileText;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="academic-card group relative rounded-2xl p-7 sm:p-8 flex flex-col justify-between"
              >
                {/* Icon & Number */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-royalBlue-500/8 border border-royalBlue-500/20 flex items-center justify-center text-royalBlue-500 group-hover:scale-110 group-hover:bg-royalBlue-500/15 transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-navy-300 group-hover:text-royalBlue-400/80 transition-colors">
                      {service.number}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display font-semibold text-xl text-navy-900 group-hover:text-royalBlue-500 transition-colors mb-3">
                    {service.title}
                  </h3>
                  <p className="text-navy-500 text-xs sm:text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-8 pt-4 border-t border-navy-100">
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
                  className="inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-lg text-xs font-medium text-navy-600 group-hover:text-royalBlue-500 bg-pearl-200/60 hover:bg-royalBlue-500/6 border border-navy-200 group-hover:border-royalBlue-500/28 transition-all"
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
