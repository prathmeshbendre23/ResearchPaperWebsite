import React from 'react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';
import { serviceFamiliesData, disclaimerText } from '../data/siteData';
import SectionContainer from './SectionContainer';
import { Mail, Phone, MapPin, MessageCircle, ArrowUp, ExternalLink } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerNavLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Research Areas", href: "#areas" },
    { name: "Publications", href: "#publications" },
    { name: "Institutional MoUs", href: "#collaborate" },
    { name: "Contact", href: "#inquiry" },
    { name: "FAQ", href: "#faq" },
  ];

  const trustLinks = [
    { name: "Privacy Policy", href: "/privacy-policy.html" },
    { name: "Terms", href: "/terms.html" },
    { name: "Academic Integrity", href: "/academic-integrity.html" },
    { name: "Confidentiality", href: "/confidentiality.html" },
    { name: "Refund & Cancellation", href: "/refund-cancellation.html" },
  ];

  return (
    <footer className="bg-academic-950 border-t border-navy-700/60 text-slate-400 text-xs relative z-10 w-full" aria-label="Site Footer">
      <SectionContainer className="py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">

          {/* Brand Info & Mission (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-400 rounded w-fit"
              aria-label={siteConfig.brandFullName}
            >
              <img
                src={siteConfig.logoPath}
                alt="Brain & Pen Research Services"
                className="object-contain"
                style={{ width: '36px', height: '36px' }}
                width="36"
                height="36"
              />
              <span className="font-display font-bold text-lg text-white tracking-tight group-hover:text-softBlue-300 transition-colors">
                {siteConfig.brandName}
              </span>
            </a>

            <p className="text-[11px] sm:text-xs font-mono text-royalBlue-400 tracking-wider">
              {siteConfig.brandTagline}
            </p>

            <p className="text-slate-400 leading-relaxed text-xs sm:text-sm">
              A research and scholarly publication consultancy supporting researchers, faculty, and institutions across research design, manuscript development, journal selection, revision, thesis, patents, and academic collaboration.
            </p>

            <div className="pt-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Nav Links (Cols 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2">
              {footerNavLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-softBlue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-400 rounded"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Directory (Cols 7-9) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-2">
              {serviceFamiliesData.map((svc) => (
                <li key={svc.id}>
                  <a
                    href="#services"
                    className="text-slate-400 hover:text-softBlue-400 transition-colors truncate block focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-400 rounded"
                  >
                    {svc.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information (Cols 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-royalBlue-400 shrink-0 mt-0.5" aria-hidden="true" />
                <a href={`mailto:${siteConfig.contact.email}`} className="text-slate-300 hover:text-softBlue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-400 rounded">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <a href={`tel:${siteConfig.contact.phoneRaw}`} className="text-slate-300 hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-slate-400">
                  {siteConfig.contact.location}
                </span>
              </li>
              <li className="text-[11px] text-slate-500 font-mono pt-1">
                Hours: {siteConfig.contact.officeHours}
              </li>
            </ul>

            {/* Trust / Policy Links */}
            <div className="pt-4 border-t border-slate-700/60 space-y-2">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Policies</p>
              <ul className="space-y-1.5">
                {trustLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-500 hover:text-slate-300 transition-colors text-[11px] flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-400 rounded"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Publication Disclaimer */}
        <div className="py-6 border-t border-slate-800/80 border-b border-slate-800/50 mb-6">
          <p className="text-slate-500 text-[11px] leading-relaxed text-center max-w-4xl mx-auto">
            {disclaimerText}
          </p>
        </div>

        {/* Bottom Bar: Copyright & Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} {siteConfig.brandFullName}. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-slate-500">
            <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-400 rounded">
              Privacy
            </a>
            <span aria-hidden="true">•</span>
            <a href="/terms.html" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-400 rounded">
              Terms
            </a>
            <span aria-hidden="true">•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-softBlue-400 hover:text-softBlue-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-royalBlue-400 rounded"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

      </SectionContainer>
    </footer>
  );
}
