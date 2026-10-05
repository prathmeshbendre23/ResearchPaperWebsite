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

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMobile = () => setMobileMenuOpen(false);

  // Center nav links exclude the inquiry CTA (shown separately on right)
  const centerNavLinks = siteConfig.navLinks.filter(
    (item) => item.href !== '#inquiry'
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/96 backdrop-blur-xl border-b border-navy-100/90 shadow-[0_2px_16px_-2px_rgba(11,27,74,0.08)] h-[68px]'
          : 'bg-white/70 backdrop-blur-md border-b border-navy-100/30 h-[76px]'
      }`}
    >
      <div
        className="w-full h-full flex items-center justify-between"
        style={{
          paddingLeft: 'clamp(16px, 2.5vw, 44px)',
          paddingRight: 'clamp(16px, 2.5vw, 44px)',
        }}
      >
        {/* LEFT: Brand Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5 group focus:outline-none shrink-0"
          aria-label={siteConfig.brandFullName}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-royalBlue-500/10 to-violet-500/8 border border-royalBlue-500/22 flex items-center justify-center group-hover:border-royalBlue-500/45 group-hover:scale-[1.04] transition-all shadow-[0_2px_8px_rgba(41,72,216,0.10)]">
            <FileText className="w-4.5 h-4.5 text-royalBlue-600" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-[16.5px] sm:text-[17.5px] text-navy-950 tracking-tight group-hover:text-royalBlue-600 transition-colors">
              {siteConfig.brandName}
            </span>
            <span className="text-[9.5px] font-mono text-navy-400 tracking-wider uppercase hidden sm:inline-block mt-0.5">
              {siteConfig.brandSubtitle}
            </span>
          </div>
        </a>

        {/* CENTER: Main Desktop Navigation */}
        <nav
          className="hidden xl:flex items-center gap-0.5 2xl:gap-1 mx-6 2xl:mx-10"
          aria-label="Main Navigation"
        >
          {centerNavLinks.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 rounded-lg text-[13px] 2xl:text-[13.5px] font-medium whitespace-nowrap transition-all duration-200 ease-out ${
                  isActive
                    ? 'text-royalBlue-600 font-semibold bg-royalBlue-500/[0.07]'
                    : 'text-navy-700 hover:text-royalBlue-600 hover:bg-royalBlue-500/[0.04]'
                }`}
              >
                {item.name}
                {/* Underline indicator for active */}
                {isActive && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-royalBlue-500/70" />
                )}
              </a>
            );
          })}
        </nav>

        {/* RIGHT: Action CTAs */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          {/* WhatsApp */}
          <a
            href={getWhatsAppUrl("Hello Brain & Pen, I would like to inquire about academic publication and research support.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12.5px] font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 hover:border-emerald-300 transition-all duration-200"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>

          {/* Primary CTA: Discuss Your Research */}
          <a
            href="#inquiry"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12.5px] font-semibold text-white bg-gradient-to-r from-royalBlue-500 to-violet-600 hover:from-royalBlue-400 hover:to-violet-500 shadow-[0_2px_12px_-2px_rgba(41,72,216,0.38)] hover:shadow-[0_4px_16px_-2px_rgba(41,72,216,0.48)] hover:-translate-y-px transition-all duration-200 active:scale-95"
          >
            <span>Discuss Your Research</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 xl:hidden">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-emerald-600 hover:text-emerald-700 sm:hidden rounded-lg bg-emerald-50 border border-emerald-200/80"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4.5 h-4.5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-navy-800 hover:text-navy-950 rounded-xl border border-navy-200 hover:border-navy-300 focus:outline-none focus:ring-2 focus:ring-royalBlue-500 bg-white/80 backdrop-blur-sm transition-all"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[68px] bg-white/97 border-b border-navy-100 backdrop-blur-2xl px-5 py-5 shadow-xl max-h-[calc(100vh-70px)] overflow-y-auto z-50">
          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            {siteConfig.navLinks.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={closeMobile}
                  className={`text-sm font-medium py-2.5 px-3.5 rounded-xl transition-colors flex items-center justify-between ${
                    isActive
                      ? 'text-royalBlue-600 bg-royalBlue-500/[0.07] font-semibold'
                      : 'text-navy-700 hover:text-royalBlue-600 hover:bg-navy-50'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-royalBlue-500" />}
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-navy-100 flex flex-col gap-2.5">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobile}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                Chat on WhatsApp (+91 7666748752)
              </a>

              <a
                href="#inquiry"
                onClick={closeMobile}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-royalBlue-500 to-violet-600 shadow-[0_2px_12px_-2px_rgba(41,72,216,0.35)]"
              >
                Discuss Your Research
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
