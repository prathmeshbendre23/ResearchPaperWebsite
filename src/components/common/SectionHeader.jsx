import React from 'react';
import { motion } from 'framer-motion';

/**
 * SectionHeader
 * Consistent section header — upgraded for premium light theme.
 * Badge, heading, highlighted heading word, and description.
 */
export default function SectionHeader({
  badge,
  title,
  titleHighlight,
  description,
  align       = 'center',   // 'center' | 'left'
  className   = '',
  badgeColor  = 'blue',     // 'blue' | 'violet' | 'indigo'
}) {
  const isCenter = align === 'center';

  // Badge colour variants — all light-theme
  const badgeStyles =
    badgeColor === 'violet'
      ? 'bg-violet-500/8 border-violet-500/22 text-violet-600'
      : badgeColor === 'indigo'
      ? 'bg-indigo-500/8 border-indigo-500/22 text-indigo-600'
      : 'bg-royalBlue-500/8 border-royalBlue-500/22 text-royalBlue-500';

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
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono tracking-wider uppercase mb-4 ${badgeStyles}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          <span>{badge}</span>
        </motion.div>
      )}

      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-3xl sm:text-4xl lg:text-[42px] text-navy-900 tracking-tight leading-tight mb-4"
        >
          {title}{' '}
          {titleHighlight && (
            <span className="bg-gradient-to-r from-royalBlue-500 via-softBlue-500 to-violet-500 bg-clip-text text-transparent">
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
          className="text-navy-500 text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
