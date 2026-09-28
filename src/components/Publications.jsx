import React from 'react';
import { motion } from 'framer-motion';
import { publicationsData } from '../data/siteData';
import SectionContainer from './SectionContainer';
import SectionHeader from './common/SectionHeader';
import { FileText, ExternalLink, Calendar, BookOpen } from 'lucide-react';

export default function Publications() {
  return (
    <section
      id="publications"
      className="py-24 relative w-full overflow-hidden"
      aria-label="Publications"
      style={{ background: 'rgba(219,234,254,0.22)' }}
    >
      {/* Scientific grid */}
      <div className="absolute inset-0 scientific-grid-light-bg opacity-60 pointer-events-none" />

      {/* Glow */}
      <div
        className="absolute top-1/2 right-1/4 pointer-events-none"
        style={{
          width:  '580px',
          height: '290px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(139,109,255,0.06) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <SectionContainer>
        <SectionHeader
          badge="Academic Track Record"
          title="Selected"
          titleHighlight="Publications"
          description="Representative scholarly publications demonstrating rigorous methodology, peer-reviewed acceptance, and impactful research dissemination."
        />

        {/* Publications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
          {publicationsData.map((pub, index) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="academic-card p-7 sm:p-8 rounded-2xl flex flex-col justify-between group"
            >
              <div>
                {/* Meta tags */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-royalBlue-500/8 text-royalBlue-500 border border-royalBlue-500/20">
                    <BookOpen className="w-3 h-3" />
                    {pub.area}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-navy-400">
                    <Calendar className="w-3.5 h-3.5 text-navy-300" />
                    <span>{pub.year}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-semibold text-lg sm:text-xl text-navy-900 group-hover:text-royalBlue-500 transition-colors leading-snug mb-3">
                  {pub.title}
                </h3>

                {/* Authors & Journal */}
                <div className="space-y-1 text-xs sm:text-sm text-navy-500 mb-6">
                  <p className="text-navy-700 font-medium">Authors: {pub.authors}</p>
                  <p className="italic text-navy-500">Published in: {pub.journal}</p>
                </div>
              </div>

              {/* Card Action */}
              <div className="pt-4 border-t border-navy-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-navy-300 uppercase">
                  {pub.type}
                </span>
                <a
                  href="#inquiry"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-royalBlue-500 hover:text-royalBlue-400 transition-colors group-hover:translate-x-1 transform duration-200"
                >
                  <span>{pub.linkText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-8 text-center text-xs text-navy-400">
          <p>Publications listed above serve as representative academic demonstrations.</p>
        </div>
      </SectionContainer>
    </section>
  );
}
