import React from 'react';
import { motion } from 'framer-motion';
import SectionContainer from './SectionContainer';
import { ShieldCheck, BookOpen, Users, FileCheck } from 'lucide-react';

const principles = [
  {
    icon: ShieldCheck,
    label: "Responsible Scholarship",
    text: "Appropriate authorship, accurate attribution, and transparent research practices.",
  },
  {
    icon: FileCheck,
    label: "Reproducible Analysis",
    text: "Methodology, experiments, and results documented for verification and replication.",
  },
  {
    icon: BookOpen,
    label: "Accurate Citation",
    text: "Correct referencing, source acknowledgment, and originality in scholarly outputs.",
  },
  {
    icon: Users,
    label: "Institutional Compliance",
    text: "Research outputs remain subject to author accountability, institutional policies, and publisher requirements.",
  },
];

export default function ResponsibleResearch() {
  return (
    <section
      className="py-16 relative w-full overflow-hidden"
      aria-label="Responsible Research Support"
      style={{ background: 'rgba(240,244,255,0.75)' }}
    >
      {/* Subtle ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
        style={{
          width: '700px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(41,72,216,0.05) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <SectionContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royalBlue-500/[0.08] border border-royalBlue-500/20 text-royalBlue-600 text-[11px] font-mono tracking-wide mb-5">
            <ShieldCheck className="w-3 h-3" aria-hidden="true" />
            <span>Academic Integrity</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Heading and body text */}
            <div className="lg:col-span-5">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy-900 tracking-tight leading-tight mb-4">
                Responsible Research Support
              </h2>
              <p className="text-navy-600 text-sm sm:text-base leading-relaxed mb-4">
                Brain &amp; Pen Research Services supports responsible scholarship, transparent research practices, appropriate authorship, accurate citation, reproducible analysis, and compliance with journal and institutional requirements.
              </p>
              <p className="text-navy-500 text-sm leading-relaxed">
                Research outputs remain subject to author review, accountability, institutional policies, and publisher requirements.
              </p>
            </div>

            {/* Right: Principle cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {principles.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-4 rounded-xl bg-white/85 border border-navy-200/70 shadow-[0_2px_12px_-4px_rgba(11,27,74,0.08)] backdrop-blur-sm"
                  >
                    <div
                      className="w-9 h-9 rounded-lg bg-royalBlue-500/8 border border-royalBlue-500/18 flex items-center justify-center text-royalBlue-500 shrink-0"
                      aria-hidden="true"
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-[13px] font-semibold text-navy-800 mb-1">
                        {item.label}
                      </h3>
                      <p className="text-[12px] text-navy-500 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </SectionContainer>
    </section>
  );
}
