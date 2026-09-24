import React from 'react';
import { motion } from 'framer-motion';
import { getWhatsAppUrl } from '../config/siteConfig';
import SectionContainer from './SectionContainer';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-academic-950 w-full" aria-label="Call to Action">
      {/* Cinematic ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] 2xl:w-[1200px] h-[400px] bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <SectionContainer>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-3xl bg-gradient-to-b from-academic-900/90 to-academic-950/90 border border-cyan-500/30 p-8 sm:p-12 lg:p-16 text-center shadow-2xl relative overflow-hidden"
        >
          {/* Subtle grid accent inside banner */}
          <div className="absolute inset-0 scientific-grid-bg opacity-30 pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering Scholarly Discovery
          </div>

          {/* Heading */}
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-6">
            Ready to Publish Your Research?
          </h2>

          {/* Description */}
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Take the next step toward presenting and publishing your research with professional guidance. Let us evaluate your paper for peer-review excellence.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#inquiry"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-glow-cyan transition-all transform active:scale-95"
            >
              <span>Start Your Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={getWhatsAppUrl("Hello, I would like to consult with you regarding publishing my research paper.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Security & Confidentiality Reminder */}
          <p className="mt-8 text-xs text-slate-500 font-mono">
            Strict Academic Confidentiality & Non-Disclosure Observed
          </p>
        </motion.div>
      </SectionContainer>
    </section>
  );
}
