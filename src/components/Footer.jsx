import React from 'react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';
import { servicesData } from '../data/siteData';
import SectionContainer from './SectionContainer';
import { FileText, Mail, Phone, MapPin, MessageCircle, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-academic-950 border-t border-navy-700/60 text-slate-400 text-xs relative z-10 w-full" aria-label="Site Footer">
      <SectionContainer className="py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Brand Info & Mission (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-royalBlue-500/15 border border-royalBlue-500/30 flex items-center justify-center text-softBlue-400">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg text-white tracking-tight">
                {siteConfig.brandName}
              </span>
            </div>
            
            <p className="text-slate-400 leading-relaxed text-xs sm:text-sm">
              Dedicated academic publication advisory supporting researchers, doctoral scholars, and faculty in navigating peer-reviewed submission, formatting, and journal acceptance.
            </p>

            <div className="pt-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Quick WhatsApp Advisory</span>
              </a>
            </div>
          </div>

          {/* Quick Nav Links (Cols 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              {siteConfig.navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-softBlue-400 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Publication Services Directory (Cols 7-9) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2">
              {servicesData.map((svc) => (
                <li key={svc.id}>
                  <a
                    href="#services"
                    className="text-slate-400 hover:text-softBlue-400 transition-colors truncate block"
                  >
                    {svc.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information (Cols 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider">
              Advisory Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-royalBlue-400 shrink-0 mt-0.5" />
                <a href={`mailto:${siteConfig.contact.email}`} className="text-slate-300 hover:text-softBlue-400 transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <a href={`tel:${siteConfig.contact.phoneRaw}`} className="text-slate-300 hover:text-emerald-400 transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  {siteConfig.contact.location}
                </span>
              </li>
              <li className="text-[11px] text-slate-500 font-mono pt-1">
                Hours: {siteConfig.contact.officeHours}
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Disclaimers */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved. Academic publication consulting services.
          </p>

          <div className="flex items-center gap-6 text-slate-500">
            <a href="#inquiry" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#inquiry" className="hover:text-slate-300 transition-colors">
              Terms of Advisory
            </a>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-softBlue-400 hover:text-softBlue-300 transition-colors focus:outline-none"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </SectionContainer>
    </footer>
  );
}
