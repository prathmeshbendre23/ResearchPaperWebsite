import React from 'react';
import LivingBackground from './components/LivingBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import PublicationProcess from './components/PublicationProcess';
import ResearchAreas from './components/ResearchAreas';
import Publications from './components/Publications';
import CTA from './components/CTA';
import InquiryForm from './components/InquiryForm';
import Footer from './components/Footer';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';

export default function App() {
  return (
    /*
     * Root wrapper:
     *   - Light pearl background base (body handles the fallback)
     *   - overflow-x-hidden prevents horizontal scroll from parallax transforms
     *   - text-navy-800 default text on light background
     */
    <div className="relative min-h-screen w-full overflow-x-hidden bg-pearl-100 text-navy-800 selection:bg-royalBlue-400/25 selection:text-royalBlue-600">

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
        <PublicationProcess />
        <ResearchAreas />
        <Publications />
        <CTA />
        <InquiryForm />
      </main>

      {/* Footer — relative z-10 */}
      <div className="relative z-10">
        <Footer />
      </div>

      <WhatsAppFloatingButton />
    </div>
  );
}
