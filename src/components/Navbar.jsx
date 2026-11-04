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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/96 dark:bg-academic-950/95 backdrop-blur-xl border-b border-navy-100/90 dark:border-navy-800/80 shadow-[0_2px_16px_-2px_rgba(11,27,74,0.08)] dark:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)] h-[68px]'
        : 'bg-white/70 dark:bg-academic-950/70 backdrop-blur-md border-b border-navy-100/30 dark:border-navy-800/40 h-[76px]'
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
              className="object-contain drop-shadow-sm w-9 h-9 sm:w-[42px] sm:h-[42px]"
              width="42"
              height="42"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-[13px] min-[380px]:text-[14.5px] sm:text-[17.5px] text-navy-950 dark:text-white tracking-tight group-hover:text-royalBlue-600 dark:group-hover:text-softBlue-400 transition-colors whitespace-nowrap">
              {siteConfig.brandName}
            </span>
            <span className="text-[9.5px] font-mono text-navy-400 dark:text-slate-400 tracking-wider uppercase hidden sm:inline-block mt-0.5">
              {siteConfig.brandSubtitle}
            </span>
          </div>
        </a>

        {/* CENTER: Main Desktop Navigation */}
        <nav
          className="hidden xl:flex items-center gap-0.5 2xl:gap-1 mx-3 2xl:mx-8"
          aria-label="Main Navigation"
        >
          {centerNavLinks.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-2.5 2xl:px-3 py-2 rounded-lg text-[12px] 2xl:text-[13px] font-medium whitespace-nowrap transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-500 ${isActive
                  ? 'text-royalBlue-600 dark:text-softBlue-400 font-semibold bg-royalBlue-500/[0.08] dark:bg-royalBlue-500/18'
                  : 'text-navy-700 dark:text-slate-300 hover:text-royalBlue-600 dark:hover:text-white hover:bg-royalBlue-500/[0.05] dark:hover:bg-white/[0.06]'
                  }`}
              >
                {item.name}
                {/* Underline indicator for active */}
                {isActive && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-royalBlue-500/70 dark:bg-softBlue-400" />
                )}
              </a>
            );
          })}
        </nav>

        {/* RIGHT: Action CTAs + Theme Toggle */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          {/* Theme Toggle Button (Desktop) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl text-navy-700 dark:text-slate-200 hover:text-royalBlue-600 dark:hover:text-amber-300 bg-white/80 dark:bg-academic-900/80 border border-navy-200/80 dark:border-navy-700/80 hover:border-royalBlue-400/40 dark:hover:border-amber-400/40 shadow-sm hover:shadow hover:-translate-y-px transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-500 active:scale-95 flex items-center justify-center group"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4 text-navy-700 transition-transform duration-300 group-hover:-rotate-12" aria-hidden="true" />
            )}
          </button>

          {/* WhatsApp */}
          <a
            href={getWhatsAppUrl("Hello Brain & Pen, I would like to inquire about research and publication support.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12.5px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200/80 dark:border-emerald-800/70 hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-px transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            title="Chat on WhatsApp"
            aria-label="Chat with us on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>

          {/* Primary CTA: Request a Research Consultation */}
          <a
            href="#inquiry"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12.5px] font-semibold text-white bg-gradient-to-r from-royalBlue-500 to-violet-600 hover:from-royalBlue-400 hover:to-violet-500 dark:from-royalBlue-600 dark:to-violet-600 dark:hover:from-royalBlue-500 dark:hover:to-violet-500 shadow-[0_2px_12px_-2px_rgba(41,72,216,0.38)] hover:shadow-[0_4px_16px_-2px_rgba(41,72,216,0.48)] hover:-translate-y-px transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-400"
          >
            <span>Discuss Your Research</span>
            <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>

        {/* Mobile Actions: Theme Toggle + WhatsApp + Hamburger */}
        <div className="flex items-center gap-1 sm:gap-2 xl:hidden shrink-0">
          {/* Mobile Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 text-navy-800 dark:text-slate-200 hover:text-navy-950 dark:hover:text-white rounded-xl border border-navy-200 dark:border-navy-700 hover:border-navy-300 dark:hover:border-navy-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-500 bg-white/80 dark:bg-academic-900/80 backdrop-blur-sm transition-all"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4.5 h-4.5 text-amber-400" aria-hidden="true" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-navy-700" aria-hidden="true" />
            )}
          </button>

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 sm:hidden rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4.5 h-4.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-navy-800 dark:text-slate-200 hover:text-navy-950 dark:hover:text-white rounded-xl border border-navy-200 dark:border-navy-700 hover:border-navy-300 dark:hover:border-navy-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-500 bg-white/80 dark:bg-academic-900/80 backdrop-blur-sm transition-all"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          className="xl:hidden fixed inset-x-0 top-[68px] bg-white/97 dark:bg-academic-950/98 border-b border-navy-100 dark:border-navy-800 backdrop-blur-2xl px-5 py-5 shadow-xl max-h-[calc(100vh-70px)] overflow-y-auto z-50"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            {/* Mobile Theme Toggle Row */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-pearl-100/90 dark:bg-academic-900/90 border border-navy-200/70 dark:border-navy-700/70 mb-2">
              <span className="text-xs font-semibold text-navy-800 dark:text-slate-200 flex items-center gap-2">
                {theme === 'dark' ? <Moon className="w-4 h-4 text-softBlue-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                <span>{theme === 'dark' ? 'Dark Mode Active' : 'Light Mode Active'}</span>
              </span>
              <button
                type="button"
                onClick={toggleTheme}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-royalBlue-500/10 dark:bg-royalBlue-400/20 text-royalBlue-600 dark:text-softBlue-300 border border-royalBlue-500/25 dark:border-royalBlue-400/30 hover:bg-royalBlue-500/20 transition-all flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-400"
                aria-label="Toggle color theme"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Switch to Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-navy-700" />
                    <span>Switch to Dark</span>
                  </>
                )}
              </button>
            </div>

            {siteConfig.navLinks.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={closeMobile}
                  className={`text-sm font-medium py-2.5 px-3.5 rounded-xl transition-colors flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-500 ${isActive
                    ? 'text-royalBlue-600 dark:text-softBlue-400 bg-royalBlue-500/[0.08] dark:bg-royalBlue-500/18 font-semibold'
                    : 'text-navy-700 dark:text-slate-300 hover:text-royalBlue-600 dark:hover:text-white hover:bg-navy-50 dark:hover:bg-academic-900/70'
                    }`}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-royalBlue-500 dark:bg-softBlue-400" aria-hidden="true" />}
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-navy-100 dark:border-navy-800 flex flex-col gap-2.5">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobile}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                Chat on WhatsApp (+91 7666748752)
              </a>

              <a
                href="#inquiry"
                onClick={closeMobile}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-royalBlue-500 to-violet-600 dark:from-royalBlue-600 dark:to-violet-600 shadow-[0_2px_12px_-2px_rgba(41,72,216,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-400 hover:from-royalBlue-400 hover:to-violet-500 transition-all"
              >
                Request a Research Consultation
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
