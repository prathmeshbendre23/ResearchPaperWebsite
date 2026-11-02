import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import LivingBackground from './components/LivingBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import ResearchAreas from './components/ResearchAreas';
import ResearcherNetwork from './components/ResearcherNetwork';
import Publications from './components/Publications';
import InstitutionalCollaboration from './components/InstitutionalCollaboration';
import CTA from './components/CTA';
import FAQ from './components/FAQ';
import InquiryForm from './components/InquiryForm';
import Footer from './components/Footer';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';

export default function App() {
  return (
    <ThemeProvider>
      {/*
       * Root wrapper:
       *   - Light pearl background base / Dark academic-950 base
       *   - overflow-x-hidden prevents horizontal scroll from parallax transforms
       *   - text-navy-800 default text on light background / text-slate-100 on dark
       */}
      <div className="relative min-h-screen w-full overflow-x-hidden bg-pearl-100 dark:bg-academic-950 text-navy-800 dark:text-slate-100 selection:bg-royalBlue-400/25 selection:text-royalBlue-600 dark:selection:bg-royalBlue-500/35 dark:selection:text-royalBlue-300 transition-colors duration-200">

        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-royalBlue-600 text-white text-sm font-semibold rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Skip to main content
        </a>

        {/* Fixed full-viewport living background — z-0, pointer-events-none */}
        <LivingBackground />

        {/* Navbar — z-50, above everything */}
        <Navbar />

        {/* Page content — relative z-10 so it renders above background */}
        <main id="main-content" className="relative z-10">
          <Hero />
          <About />
          <Services />
          <WhyChooseUs />
          <ResearchAreas />
          <ResearcherNetwork />
          <Publications />
          <InstitutionalCollaboration />
          <CTA />
          <FAQ />
          <InquiryForm />
        </main>

        {/* Footer — relative z-10 */}
        <div className="relative z-10">
          <Footer />
        </div>

        <WhatsAppFloatingButton />
      </div>
    </ThemeProvider>
  );
}
