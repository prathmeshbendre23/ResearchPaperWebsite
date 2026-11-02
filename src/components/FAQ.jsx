import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqData } from '../data/siteData';
import SectionContainer from './SectionContainer';
import SectionHeader from './common/SectionHeader';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <section
      id="faq"
      className="py-20 relative w-full overflow-hidden section-pearl"
      aria-label="Frequently Asked Questions"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 scientific-grid-light-bg opacity-40 pointer-events-none" aria-hidden="true" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
        style={{
          width: '600px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(41,72,216,0.05) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <SectionContainer>
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked"
          titleHighlight="Questions"
          description="Straightforward answers about how Brain & Pen Research Services works, what we support, and what we do not promise."
        />

        <div className="max-w-3xl mx-auto">
          <dl className="space-y-3">
            {faqData.map((item, index) => {
              const isOpen = openId === item.id;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-white dark:bg-academic-900 border-royalBlue-500/25 dark:border-royalBlue-400/35 shadow-[0_4px_20px_-4px_rgba(41,72,216,0.12)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)]'
                      : 'bg-white/80 dark:bg-academic-900/70 border-navy-200/70 dark:border-navy-800/80 hover:border-royalBlue-400/30 dark:hover:border-royalBlue-400/40'
                  }`}
                >
                  <dt>
                    <button
                      type="button"
                      onClick={() => toggle(item.id)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-500 focus-visible:ring-inset"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.id}`}
                      id={`faq-question-${item.id}`}
                    >
                      <div className="flex items-start gap-3">
                        <HelpCircle
                          className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${
                            isOpen ? 'text-royalBlue-500 dark:text-softBlue-400' : 'text-navy-400 dark:text-slate-500'
                          }`}
                          aria-hidden="true"
                        />
                        <span
                          className={`text-sm font-semibold leading-snug transition-colors ${
                            isOpen ? 'text-royalBlue-700 dark:text-softBlue-300' : 'text-navy-800 dark:text-slate-100'
                          }`}
                        >
                          {item.question}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 text-navy-400 dark:text-slate-500 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-royalBlue-500 dark:text-softBlue-400' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </dt>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.dd
                        id={`faq-answer-${item.id}`}
                        role="region"
                        aria-labelledby={`faq-question-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm text-navy-600 dark:text-slate-300 leading-relaxed border-t border-navy-100 dark:border-navy-800 pt-4 ml-7">
                          {item.answer}
                        </p>
                      </motion.dd>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </dl>

          {/* Bottom note */}
          <div className="mt-8 p-4 rounded-xl bg-royalBlue-500/[0.05] dark:bg-royalBlue-500/15 border border-royalBlue-500/15 dark:border-royalBlue-400/25 text-center">
            <p className="text-[12px] text-navy-600 dark:text-slate-300 leading-relaxed">
              Have a question not listed here?{' '}
              <a
                href="#inquiry"
                className="text-royalBlue-600 dark:text-softBlue-400 font-semibold hover:text-royalBlue-700 dark:hover:text-softBlue-300 underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-500 rounded"
              >
                Request a research consultation
              </a>
              {' '}and we will be happy to help.
            </p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
