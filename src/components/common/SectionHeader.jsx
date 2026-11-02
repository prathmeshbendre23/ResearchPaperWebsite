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

  // Badge colour variants — light and dark
  const badgeStyles =
    badgeColor === 'violet'
      ? 'bg-violet-500/8 dark:bg-violet-500/15 border-violet-500/22 dark:border-violet-500/30 text-violet-600 dark:text-violet-400'
      : badgeColor === 'indigo'
      ? 'bg-indigo-500/8 dark:bg-indigo-500/15 border-indigo-500/22 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400'
      : 'bg-royalBlue-500/8 dark:bg-royalBlue-500/15 border-royalBlue-500/22 dark:border-royalBlue-500/30 text-royalBlue-500 dark:text-softBlue-400';

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
          className="font-display font-bold text-3xl sm:text-4xl lg:text-[42px] text-navy-900 dark:text-white tracking-tight leading-tight mb-4"
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
          className="text-navy-500 dark:text-slate-300 text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
