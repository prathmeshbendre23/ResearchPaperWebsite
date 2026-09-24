import React from 'react';
import { motion } from 'framer-motion';

/**
 * SectionHeader
 * Consistent section header with staggered entrance sequence (eyebrow, heading, description)
 * and controlled max-width for comfortable reading within fluid full-width sections.
 */
export default function SectionHeader({
  badge,
  title,
  titleHighlight,
  description,
  align = 'center', // 'center' | 'left'
  className = '',
  badgeColor = 'cyan', // 'cyan' | 'indigo'
}) {
  const isCenter = align === 'center';

  const badgeStyles =
    badgeColor === 'indigo'
      ? 'bg-indigo-500/10 border-indigo-500/25 text-indigo-300'
      : 'bg-cyan-500/10 border-cyan-500/25 text-cyan-300';

  return (
    <div
      className={`mb-14 sm:mb-16 ${
        isCenter ? 'text-center mx-auto' : 'text-left'
      } max-w-3xl xl:max-w-4xl ${className}`}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono tracking-wider uppercase mb-4 shadow-sm ${badgeStyles}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_6px_currentColor]" />
          <span>{badge}</span>
        </motion.div>
      )}

      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-3xl sm:text-4xl lg:text-[42px] text-white tracking-tight leading-tight mb-4"
        >
          {title}{' '}
          {titleHighlight && (
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              {titleHighlight}
            </span>
          )}
        </motion.h2>
      )}

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-slate-300 text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
