import React from 'react';
import { getWhatsAppUrl } from '../config/siteConfig';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloatingButton() {
  return (
    <aside aria-label="Direct WhatsApp Contact">
      <a
        href={getWhatsAppUrl("Hello, I would like to consult with you directly regarding my academic research paper publication.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-1 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-academic-950"
        title="Chat with Research Consultant on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 border-2 border-emerald-600 animate-pulse" />
        </div>
        <span className="text-xs font-semibold tracking-wide hidden sm:inline-block">
          WhatsApp Advisory
        </span>
      </a>
    </aside>
  );
}
