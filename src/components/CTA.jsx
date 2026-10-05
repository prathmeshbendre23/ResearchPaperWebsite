import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';
import SectionContainer from './SectionContainer';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section
      className="py-24 relative overflow-hidden w-full"
      aria-label="Call to Action"
      style={{ background: 'rgba(248,249,255,0.70)' }}
    >
      <SectionContainer>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-3xl relative overflow-hidden p-8 sm:p-12 lg:p-16 text-center"
          style={{
            background: 'linear-gradient(135deg, #0F2158 0%, #1C3570 30%, #2948D8 70%, #5C47E8 100%)',
            boxShadow: '0 24px 60px -12px rgba(41,72,216,0.35), 0 0 40px rgba(139,109,255,0.15)',
          }}
        >
          {/* Subtle grid accent */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundSize: '40px 40px',
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
            }}
          />

          {/* Glow circles */}
          <div
            className="absolute -top-16 -left-16 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(139,109,255,0.20) 0%, transparent 70%)' }}
          />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white/90 text-xs font-mono tracking-wider uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            {siteConfig.brandFullName}
          </div>

          {/* Heading */}
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-5">
            Ready to Publish Your Research?
          </h2>

          {/* Description */}
          <p className="text-white/80 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-9 leading-relaxed font-normal">
            Take the next step toward developing and publishing your research with professional guidance. Connect with Brain &amp; Pen to evaluate your paper, thesis, patent, or institutional initiative.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#inquiry"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm text-royalBlue-600 bg-white hover:bg-pearl-200 shadow-[0_4px_20px_rgba(0,0,0,0.20)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.24)] transition-all transform active:scale-95"
            >
              <span>Discuss Your Research</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={getWhatsAppUrl("Hello Brain & Pen, I would like to consult regarding my research publication requirement.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm text-white bg-white/12 hover:bg-white/20 border border-white/25 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Quality Tagline / Location */}
          <p className="mt-8 text-xs text-white/60 font-mono">
            {siteConfig.brandTagline} • {siteConfig.contact.location}
          </p>
        </motion.div>
      </SectionContainer>
    </section>
  );
}
