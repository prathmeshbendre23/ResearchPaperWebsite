import React, { useState, useEffect } from 'react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, MessageCircle, ArrowRight, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
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

  // Prevent background page scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Close mobile drawer when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMobile();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close mobile drawer on resize to desktop (>= 1200px)
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/98 dark:bg-academic-950/98 backdrop-blur-xl border-b border-slate-200/90 dark:border-navy-800/90 shadow-[0_4px_20px_-4px_rgba(11,27,74,0.08)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6)] h-[68px]'
          : 'bg-white/95 dark:bg-academic-950/95 backdrop-blur-lg border-b border-slate-200/70 dark:border-navy-800/70 shadow-[0_1px_3px_0_rgba(11,27,74,0.04)] dark:shadow-[0_1px_4px_0_rgba(0,0,0,0.4)] h-[76px]'
          }`}
      >
        <div
          className="w-full h-full flex items-center justify-between"
          style={{
            paddingLeft: 'clamp(12px, 2.5vw, 44px)',
            paddingRight: 'clamp(12px, 2.5vw, 44px)',
          }}
        >
          {/* LEFT: Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-500 rounded-lg shrink-0"
            aria-label={siteConfig.brandFullName}
          >
            <div className="flex items-center justify-center group-hover:scale-[1.04] transition-all shrink-0">
              <img
                src={siteConfig.logoPath}
                alt={siteConfig.brandFullName}
                className="object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)] w-9 h-9 sm:w-[42px] sm:h-[42px]"
                width="42"
                height="42"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-[13px] min-[380px]:text-[14.5px] sm:text-[17.5px] text-slate-900 dark:text-white tracking-tight group-hover:text-royalBlue-600 dark:group-hover:text-softBlue-400 transition-colors whitespace-nowrap">
                {siteConfig.brandName}
              </span>
              <span className="text-[9.5px] font-mono font-medium text-slate-500 dark:text-slate-300 tracking-wider uppercase hidden sm:inline-block mt-0.5">
                {siteConfig.brandSubtitle}
              </span>
            </div>
          </a>

          {/* CENTER: Main Desktop Navigation */}
          <nav
            className="hidden xl:flex items-center gap-1 2xl:gap-1.5 mx-3 2xl:mx-8"
            aria-label="Main Navigation"
          >
            {centerNavLinks.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 py-2 rounded-lg text-[12.5px] 2xl:text-[13.5px] whitespace-nowrap transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-500 ${isActive
                    ? 'text-royalBlue-700 dark:text-white font-bold bg-royalBlue-500/10 dark:bg-royalBlue-500/25 shadow-xs'
                    : 'text-slate-700 dark:text-slate-200 font-semibold hover:text-royalBlue-600 dark:hover:text-white hover:bg-slate-100/90 dark:hover:bg-white/[0.08]'
                    }`}
                >
                  {item.name}
                  {/* Underline indicator for active */}
                  {isActive && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] rounded-full bg-royalBlue-600 dark:bg-softBlue-400 shadow-[0_1px_3px_rgba(41,72,216,0.3)]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* RIGHT: Action CTAs + Theme Toggle (Desktop) */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Theme Toggle Button (Desktop) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-royalBlue-600 dark:hover:text-amber-300 bg-white dark:bg-academic-900 border border-slate-200 dark:border-navy-700 hover:border-royalBlue-400/50 dark:hover:border-amber-400/50 shadow-xs hover:shadow-sm hover:-translate-y-px transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-500 active:scale-95 flex items-center justify-center group"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300 group-hover:-rotate-12" aria-hidden="true" />
              )}
            </button>

            {/* WhatsApp */}
            <a
              href={getWhatsAppUrl("Hello Brain & Pen, I would like to inquire about research and publication support.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12.5px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-500/15 hover:bg-emerald-500/20 dark:hover:bg-emerald-500/25 border border-emerald-600/30 dark:border-emerald-400/30 shadow-xs hover:shadow-sm hover:-translate-y-px transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              title="Chat on WhatsApp"
              aria-label="Chat with us on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[2.2]" aria-hidden="true" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            {/* Primary CTA: Request a Research Consultation */}
            <a
              href="#inquiry"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12.5px] font-semibold text-white bg-gradient-to-r from-royalBlue-600 via-royalBlue-500 to-violet-600 hover:from-royalBlue-500 hover:to-violet-500 dark:from-royalBlue-600 dark:to-violet-600 dark:hover:from-royalBlue-500 dark:hover:to-violet-500 border border-royalBlue-400/30 dark:border-royalBlue-400/40 shadow-[0_2px_10px_-2px_rgba(41,72,216,0.40)] hover:shadow-[0_4px_16px_-2px_rgba(41,72,216,0.50)] hover:-translate-y-px transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-400"
            >
              <span>Discuss Your Research</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" aria-hidden="true" />
            </a>
          </div>

          {/* Mobile Actions: Theme Toggle + WhatsApp + Hamburger */}
          <div className="flex items-center gap-[7px] xl:hidden shrink-0">
            {/* Mobile Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-[42px] h-[42px] flex items-center justify-center p-0 text-slate-800 dark:text-slate-100 hover:text-navy-950 dark:hover:text-white rounded-xl border border-slate-200 dark:border-navy-700 hover:border-slate-300 dark:hover:border-navy-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-500 bg-white dark:bg-academic-900 shadow-xs transition-all shrink-0"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-[21px] h-[21px] text-amber-400" aria-hidden="true" />
              ) : (
                <Moon className="w-[21px] h-[21px] text-slate-700" aria-hidden="true" />
              )}
            </button>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[42px] h-[42px] flex items-center justify-center p-0 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 sm:hidden rounded-lg bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-600/30 dark:border-emerald-800/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-xs shrink-0"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-[21px] h-[21px] stroke-[2.2]" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-[42px] h-[42px] flex items-center justify-center p-0 text-slate-800 dark:text-slate-100 hover:text-navy-950 dark:hover:text-white rounded-xl border border-slate-200 dark:border-navy-700 hover:border-slate-300 dark:hover:border-navy-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-500 bg-white dark:bg-academic-900 shadow-xs transition-all shrink-0"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? <X className="w-[21px] h-[21px]" aria-hidden="true" /> : <Menu className="w-[21px] h-[21px]" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay / Backdrop */}
      <div
        className={`xl:hidden fixed inset-0 z-[60] bg-slate-950/60 dark:bg-black/75 transition-opacity duration-300 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* Mobile Slide-Out Navigation Drawer */}
      <aside
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className={`xl:hidden fixed inset-y-0 right-0 z-[70] h-full w-[min(calc(100vw-44px),380px)] bg-[#FFFFFF] dark:bg-[#0B1220] text-slate-900 dark:text-white border-l border-slate-200 dark:border-[#1E293B] shadow-[0_0_50px_rgba(0,0,0,0.3)] dark:shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: theme === 'dark' ? '#0B1220' : '#FFFFFF',
        }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-slate-200 dark:border-[#1E293B] shrink-0 bg-[#FFFFFF] dark:bg-[#0B1220]">
          <a
            href="#home"
            onClick={closeMobile}
            className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-500 rounded-lg group"
            aria-label={siteConfig.brandFullName}
          >
            <img
              src={siteConfig.logoPath}
              alt={siteConfig.brandFullName}
              className="w-9 h-9 object-contain shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
              width="36"
              height="36"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight group-hover:text-royalBlue-600 dark:group-hover:text-softBlue-400 transition-colors">
                Brain &amp; Pen
              </span>
              <span className="text-[10px] font-mono font-medium text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                Research Services
              </span>
            </div>
          </a>

          {/* Close Button */}
          <button
            type="button"
            onClick={closeMobile}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-[#132347] dark:hover:bg-[#1E293B] border border-slate-200 dark:border-[#1E293B] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-500"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-5 py-4 flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            {/* Theme Switcher Card */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#060D1D] border border-slate-200 dark:border-[#1E293B] shrink-0">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                {theme === 'dark' ? (
                  <Moon className="w-4 h-4 text-softBlue-400" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
                <span>{theme === 'dark' ? 'Dark Mode Active' : 'Light Mode Active'}</span>
              </span>
              <button
                type="button"
                onClick={toggleTheme}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#EEF2FF] hover:bg-[#E0E7FF] dark:bg-[#132347] dark:hover:bg-[#1E293B] text-royalBlue-700 dark:text-softBlue-300 border border-royalBlue-300/70 dark:border-[#2D457E] transition-all flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-500"
                aria-label="Toggle color theme"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Switch to Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-slate-700" />
                    <span>Switch to Dark</span>
                  </>
                )}
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation Links">
              {siteConfig.navLinks.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={closeMobile}
                    className={`text-sm py-2.5 px-3.5 rounded-xl transition-all flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-500 ${
                      isActive
                        ? 'text-royalBlue-700 dark:text-white bg-[#EEF2FF] dark:bg-[#132347] font-bold border border-royalBlue-300/80 dark:border-royalBlue-500/40 shadow-xs'
                        : 'text-slate-800 dark:text-slate-200 font-semibold hover:text-royalBlue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#132347]/60'
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <span
                        className="w-2 h-2 rounded-full bg-royalBlue-600 dark:bg-softBlue-400 shadow-xs"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Bottom Actions: WhatsApp CTA + Primary Consultation CTA */}
          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-[#1E293B] flex flex-col gap-2.5 pb-2 shrink-0">
            {/* WhatsApp CTA */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobile}
              className="flex items-center justify-center gap-2 w-full py-3 px-3 rounded-xl text-xs sm:text-sm font-bold text-emerald-900 hover:text-emerald-950 dark:text-emerald-100 dark:hover:text-white bg-[#ECFDF5] hover:bg-[#D1FAE5] dark:bg-[#064E3B] dark:hover:bg-[#047857] border border-emerald-500 dark:border-emerald-400/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-300 stroke-[2.2] shrink-0" aria-hidden="true" />
              <span className="truncate">Chat on WhatsApp (+91 7666748752)</span>
            </a>

            {/* Primary Consultation CTA */}
            <a
              href="#inquiry"
              onClick={closeMobile}
              className="flex items-center justify-center gap-2 w-full py-3 px-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-royalBlue-600 via-royalBlue-500 to-violet-600 dark:from-royalBlue-600 dark:to-violet-600 shadow-md hover:shadow-lg border border-royalBlue-400/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-400 hover:from-royalBlue-500 hover:to-violet-500 transition-all"
            >
              <span>Request a Research Consultation</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2] shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
