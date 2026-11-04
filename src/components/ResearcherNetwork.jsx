import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { researcherNetworkData } from '../data/siteData';
import SectionContainer from './SectionContainer';
import SectionHeader from './common/SectionHeader';
import { MessageCircle, Phone, Check, Users, ArrowRight } from 'lucide-react';

export default function ResearcherNetwork() {
  const { groupCard, communityCard } = researcherNetworkData;

  return (
    <section
      id="researcher-network"
      className="py-24 relative overflow-hidden w-full section-lavender"
      aria-label="Researcher Network"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 right-1/4 pointer-events-none"
        style={{
          width: '650px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(41,72,216,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <SectionContainer>
        <SectionHeader
          badge={researcherNetworkData.eyebrow}
          badgeColor="blue"
          title="Work with Brain &amp; Pen as a"
          titleHighlight="Research Group"
          description={researcherNetworkData.description}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Main Group Support Card (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-2xl bg-white/90 dark:bg-academic-900/90 border border-royalBlue-500/20 dark:border-royalBlue-400/30 p-7 sm:p-9 flex flex-col justify-between shadow-card-light dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royalBlue-500/8 dark:bg-royalBlue-500/18 border border-royalBlue-500/20 dark:border-royalBlue-400/30 text-royalBlue-600 dark:text-softBlue-400 text-xs font-mono font-bold tracking-wider uppercase mb-4">
                <Users className="w-3.5 h-3.5" />
                <span>{groupCard.label}</span>
              </div>

              <h3 className="font-display font-bold text-2xl text-navy-900 dark:text-white leading-snug mb-3">
                {groupCard.title}
              </h3>

              <p className="text-navy-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                {groupCard.description}
              </p>

              {/* 6 Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-navy-100 dark:border-navy-800">
                {groupCard.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-pearl-100/80 dark:bg-academic-950/80 border border-navy-200/60 dark:border-navy-800/80">
                    <div className="w-5 h-5 rounded-full bg-royalBlue-500/10 dark:bg-royalBlue-400/20 border border-royalBlue-500/25 dark:border-royalBlue-400/30 flex items-center justify-center text-royalBlue-500 dark:text-softBlue-400 shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs text-navy-700 dark:text-slate-200 font-medium leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between">
              <span className="text-xs text-navy-500 dark:text-slate-400">Coordinated research planning for academic cohorts</span>
              <a href="#inquiry" className="inline-flex items-center gap-1.5 text-xs font-semibold text-royalBlue-600 dark:text-softBlue-400 hover:text-royalBlue-700 dark:hover:text-softBlue-300 transition-colors">
                <span>Enquire as a group</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Join the Community Card (5 cols) */}
          <motion.aside
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-white/95 to-pearl-200/70 dark:from-academic-900/95 dark:to-academic-950/90 border border-navy-200/80 dark:border-navy-700/80 p-7 sm:p-9 flex flex-col justify-between shadow-card-light dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/22 dark:border-emerald-500/35 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase mb-4">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{communityCard.label}</span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-navy-900 dark:text-white leading-snug mb-3">
                {communityCard.title}
              </h3>

              <p className="text-navy-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                {communityCard.description}
              </p>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <a
                  href={siteConfig.contact.whatsappCommunityGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-sm hover:shadow-md hover:-translate-y-px transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Join WhatsApp Research Group</span>
                </a>

                <a
                  href="#inquiry"
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-navy-700 dark:text-slate-200 bg-white/80 dark:bg-academic-800/80 hover:bg-white dark:hover:bg-academic-700 border border-navy-200 dark:border-navy-700 hover:border-royalBlue-400/40 dark:hover:border-royalBlue-400/50 hover:-translate-y-px transition-all"
                >
                  <span>Group Research Enquiry</span>
                  <ArrowRight className="w-3.5 h-3.5 text-royalBlue-500 dark:text-softBlue-400" />
                </a>
              </div>
            </div>

            {/* Direct Phone / WhatsApp Box */}
            <div className="p-4 rounded-xl bg-white/90 dark:bg-academic-950/90 border border-navy-200/70 dark:border-navy-800/80 flex items-center justify-between">
              <div>
                <span className="block text-[11px] font-mono text-navy-400 dark:text-slate-500 uppercase tracking-wider">
                  Direct Contact / WhatsApp
                </span>
                <a
                  href={communityCard.directContactTel}
                  className="text-sm font-bold text-royalBlue-600 dark:text-softBlue-400 hover:text-royalBlue-700 dark:hover:text-softBlue-300 font-mono mt-0.5 block"
                >
                  {communityCard.directContactNumber}
                </a>
              </div>
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/25 dark:border-emerald-500/35 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Phone className="w-4 h-4" />
              </div>
            </div>
          </motion.aside>

        </div>
      </SectionContainer>
    </section>
  );
}
