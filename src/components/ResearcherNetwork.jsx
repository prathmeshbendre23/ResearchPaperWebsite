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
      className="py-24 relative overflow-hidden w-full"
      aria-label="Researcher Network"
      style={{ background: 'rgba(237,233,255,0.20)' }}
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
            className="lg:col-span-7 rounded-2xl bg-white/90 border border-royalBlue-500/20 p-7 sm:p-9 flex flex-col justify-between shadow-card-light"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royalBlue-500/8 border border-royalBlue-500/20 text-royalBlue-600 text-xs font-mono font-bold tracking-wider uppercase mb-4">
                <Users className="w-3.5 h-3.5" />
                <span>{groupCard.label}</span>
              </div>

              <h3 className="font-display font-bold text-2xl text-navy-900 leading-snug mb-3">
                {groupCard.title}
              </h3>

              <p className="text-navy-600 text-sm leading-relaxed mb-6">
                {groupCard.description}
              </p>

              {/* 6 Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-navy-100">
                {groupCard.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-pearl-100/80 border border-navy-200/60">
                    <div className="w-5 h-5 rounded-full bg-royalBlue-500/10 border border-royalBlue-500/25 flex items-center justify-center text-royalBlue-500 shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs text-navy-700 font-medium leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-navy-100 flex items-center justify-between">
              <span className="text-xs text-navy-500">Coordinated research planning for academic cohorts</span>
              <a href="#inquiry" className="inline-flex items-center gap-1.5 text-xs font-semibold text-royalBlue-600 hover:text-royalBlue-700">
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
            className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-white/95 to-pearl-200/70 border border-navy-200/80 p-7 sm:p-9 flex flex-col justify-between shadow-card-light"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/22 text-emerald-700 text-xs font-mono font-bold tracking-wider uppercase mb-4">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>{communityCard.label}</span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-navy-900 leading-snug mb-3">
                {communityCard.title}
              </h3>

              <p className="text-navy-600 text-xs sm:text-sm leading-relaxed mb-6">
                {communityCard.description}
              </p>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <a
                  href={siteConfig.contact.whatsappCommunityGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-sm hover:shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Join WhatsApp Research Group</span>
                </a>

                <a
                  href="#inquiry"
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-navy-700 bg-white/80 hover:bg-white border border-navy-200 hover:border-royalBlue-400/40 transition-all"
                >
                  <span>Group Research Enquiry</span>
                  <ArrowRight className="w-3.5 h-3.5 text-royalBlue-500" />
                </a>
              </div>
            </div>

            {/* Direct Phone / WhatsApp Box */}
            <div className="p-4 rounded-xl bg-white/90 border border-navy-200/70 flex items-center justify-between">
              <div>
                <span className="block text-[11px] font-mono text-navy-400 uppercase tracking-wider">
                  Direct Contact / WhatsApp
                </span>
                <a
                  href={communityCard.directContactTel}
                  className="text-sm font-bold text-royalBlue-600 hover:text-royalBlue-700 font-mono mt-0.5 block"
                >
                  {communityCard.directContactNumber}
                </a>
              </div>
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-600">
                <Phone className="w-4 h-4" />
              </div>
            </div>
          </motion.aside>

        </div>
      </SectionContainer>
    </section>
  );
}
