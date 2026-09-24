import React, { useState, useEffect } from 'react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';
import { Menu, X, MessageCircle, FileText, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section spy
      const sections = siteConfig.navLinks.map((link) => link.href.substring(1));
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
          ? 'bg-academic-950/90 backdrop-blur-md border-b border-cyan-500/10 shadow-lg shadow-black/30 py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div
        className="w-full max-w-none flex items-center justify-between"
        style={{
          paddingLeft: 'clamp(20px, 3vw, 56px)',
          paddingRight: 'clamp(20px, 3vw, 56px)',
        }}
      >
        {/* Brand Logo */}
        <a
          href="#home"
          className="flex items-center gap-3 group focus:outline-none shrink-0"
          aria-label={siteConfig.brandName}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/60 transition-colors shadow-glow-cyan">
            <FileText className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg sm:text-xl text-slate-100 tracking-tight group-hover:text-cyan-300 transition-colors">
              {siteConfig.brandName}
            </span>
            <span className="text-[11px] font-mono text-slate-400 tracking-wider uppercase hidden sm:inline-block">
              {siteConfig.brandSubtitle}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links with 3D Hover & Active Indication */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5" aria-label="Main Navigation">
          {siteConfig.navLinks.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`group relative px-3.5 py-2 rounded-xl text-[15px] xl:text-[15.5px] font-medium transition-all duration-250 ease-out flex items-center justify-center transform hover:-translate-y-[2px] hover:scale-[1.03] ${
                  isActive
                    ? 'text-cyan-300 font-semibold bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.15)] border border-cyan-500/25'
                    : 'text-slate-200 hover:text-white hover:bg-cyan-500/10 hover:border-cyan-500/20 border border-transparent hover:shadow-[0_0_12px_rgba(6,182,212,0.12)]'
                }`}
              >
                <span>{item.name}</span>
                {/* Glowing underline indicator */}
                <span
                  className={`absolute -bottom-0.5 left-3 right-3 h-[2px] rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-400 to-indigo-400 shadow-[0_0_8px_rgba(6,182,212,0.9)] opacity-100'
                      : 'bg-cyan-400 opacity-0 group-hover:opacity-60 scale-x-0 group-hover:scale-x-100'
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
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/40 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all duration-200"
            title="Chat directly on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>

          {/* Primary CTA */}
          <a
            href="#inquiry"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-glow-cyan hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-200 transform active:scale-95"
          >
            <span>Start Your Inquiry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-emerald-400 sm:hidden"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg border border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-academic-950/95 border-b border-cyan-500/15 backdrop-blur-xl px-6 py-6 shadow-2xl transition-all">
          <nav className="flex flex-col gap-4">
            {siteConfig.navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={closeMobile}
                className="text-base font-medium text-slate-200 hover:text-cyan-400 py-1 transition-colors border-b border-slate-800/40"
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
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/25"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>

              <a
                href="#inquiry"
                onClick={closeMobile}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-glow-cyan"
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
