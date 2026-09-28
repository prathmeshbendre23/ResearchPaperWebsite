import React, { useState, useEffect } from 'react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';
import { Menu, X, MessageCircle, FileText, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled,      setIsScrolled]      = useState(false);
  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);
  const [activeSection,   setActiveSection]   = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section spy
      const sections  = siteConfig.navLinks.map((link) => link.href.substring(1));
      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/88 backdrop-blur-md border-b border-navy-100/80 shadow-nav-light py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div
        className="w-full max-w-none flex items-center justify-between"
        style={{
          paddingLeft:  'clamp(20px, 3vw, 56px)',
          paddingRight: 'clamp(20px, 3vw, 56px)',
        }}
      >
        {/* Brand Logo */}
        <a
          href="#home"
          className="flex items-center gap-3 group focus:outline-none shrink-0"
          aria-label={siteConfig.brandName}
        >
          <div className="w-10 h-10 rounded-xl bg-royalBlue-500/10 border border-royalBlue-500/25 flex items-center justify-center text-royalBlue-500 group-hover:border-royalBlue-500/50 transition-colors shadow-glow-blue">
            <FileText className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg sm:text-xl text-navy-900 tracking-tight group-hover:text-royalBlue-500 transition-colors">
              {siteConfig.brandName}
            </span>
            <span className="text-[11px] font-mono text-navy-400 tracking-wider uppercase hidden sm:inline-block">
              {siteConfig.brandSubtitle}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5" aria-label="Main Navigation">
          {siteConfig.navLinks.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`group relative px-3.5 py-2 rounded-xl text-[15px] xl:text-[15.5px] font-medium transition-all duration-200 ease-out flex items-center justify-center transform hover:-translate-y-[2px] hover:scale-[1.03] ${
                  isActive
                    ? 'text-royalBlue-500 font-semibold bg-royalBlue-500/8 border border-royalBlue-500/22 shadow-glow-blue'
                    : 'text-navy-700 hover:text-royalBlue-500 hover:bg-royalBlue-500/6 border border-transparent hover:border-royalBlue-500/18'
                }`}
              >
                <span>{item.name}</span>
                {/* Animated underline */}
                <span
                  className={`absolute -bottom-0.5 left-3 right-3 h-[2px] rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-royalBlue-500 to-violet-500 opacity-100'
                      : 'bg-royalBlue-500 opacity-0 group-hover:opacity-50 scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {/* WhatsApp CTA */}
          <a
            href={getWhatsAppUrl("Hi, I would like to inquire about academic publication guidance.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-emerald-600 bg-emerald-500/8 hover:bg-emerald-500/16 border border-emerald-500/22 hover:border-emerald-500/40 hover:-translate-y-0.5 hover:shadow-[0_0_14px_rgba(16,185,129,0.20)] transition-all duration-200"
            title="Chat directly on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-emerald-500" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>

          {/* Primary CTA */}
          <a
            href="#inquiry"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-royalBlue-500 to-violet-500 hover:from-royalBlue-400 hover:to-violet-400 shadow-glow-blue hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(41,72,216,0.40)] transition-all duration-200 transform active:scale-95"
          >
            <span>Start Your Inquiry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-emerald-500 sm:hidden"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-navy-700 hover:text-navy-900 rounded-lg border border-navy-200 hover:border-navy-300 focus:outline-none focus:ring-2 focus:ring-royalBlue-500 bg-white/70 backdrop-blur-sm"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-white/95 border-b border-navy-100 backdrop-blur-xl px-6 py-6 shadow-nav-light transition-all">
          <nav className="flex flex-col gap-4">
            {siteConfig.navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={closeMobile}
                className="text-base font-medium text-navy-700 hover:text-royalBlue-500 py-1 transition-colors border-b border-navy-100"
              >
                {item.name}
              </a>
            ))}

            <div className="pt-3 flex flex-col gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobile}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium text-emerald-600 bg-emerald-500/8 border border-emerald-500/22"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>

              <a
                href="#inquiry"
                onClick={closeMobile}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-royalBlue-500 to-violet-500 shadow-glow-blue"
              >
                Start Your Inquiry
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
