import React from 'react';
import { motion } from 'framer-motion';
import { publicationsData } from '../data/siteData';
import SectionContainer from './SectionContainer';
import SectionHeader from './common/SectionHeader';
import { FileText, ExternalLink, Calendar, BookOpen } from 'lucide-react';

export default function Publications() {
  return (
    <section id="publications" className="py-24 relative bg-academic-900/50 scientific-grid-bg w-full overflow-hidden" aria-label="Publications">
      {/* Background subtle radial glow */}
      <div className="absolute top-1/2 right-1/4 w-[700px] h-[350px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

      <SectionContainer>
        {/* Section Header */}
        <SectionHeader
          badge="Academic Track Record"
          title="Selected"
          titleHighlight="Publications"
          description="Representative scholarly publications demonstrating rigorous methodology, peer-reviewed acceptance, and impactful research dissemination."
        />

        {/* Publications Grid (2 cards across desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
          {publicationsData.map((pub, index) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="academic-card p-7 sm:p-8 rounded-2xl bg-academic-900/85 border border-slate-800 hover:border-cyan-500/40 hover:bg-academic-850 shadow-glass-edge flex flex-col justify-between group"
            >
              <div>
                {/* Meta tags top */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    <BookOpen className="w-3 h-3" />
                    {pub.area}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{pub.year}</span>
                  </div>
                </div>

                {/* Paper Title */}
                <h3 className="font-display font-semibold text-lg sm:text-xl text-white group-hover:text-cyan-300 transition-colors leading-snug mb-3">
                  {pub.title}
                </h3>

                {/* Authors & Journal */}
                <div className="space-y-1 text-xs sm:text-sm text-slate-400 mb-6">
                  <p className="text-slate-300 font-medium">Authors: {pub.authors}</p>
                  <p className="italic text-slate-400">Published in: {pub.journal}</p>
                </div>
              </div>

              {/* Card Action Link */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 uppercase">
                  {pub.type}
                </span>

                <a
                  href="#inquiry"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group-hover:translate-x-1 transform duration-200"
                >
                  <span>{pub.linkText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>Publications listed above serve as representative academic demonstrations.</p>
        </div>

      </SectionContainer>
    </section>
  );
}
