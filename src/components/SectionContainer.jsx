import React from 'react';

/**
 * SectionContainer
 * Fluid full-width container enforcing consistent responsive horizontal padding
 * across all major website sections without restrictive max-width constraints.
 */
export default function SectionContainer({ children, className = '', ...props }) {
  return (
    <div
      className={`w-full max-w-none mx-auto relative z-10 ${className}`}
      style={{
        paddingLeft: 'clamp(20px, 3vw, 56px)',
        paddingRight: 'clamp(20px, 3vw, 56px)',
      }}
      {...props}
    >
      {children}
    </div>
  );
}
