import React from 'react';
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
    <div className="min-h-screen w-full overflow-x-hidden bg-academic-950 text-slate-200 selection:bg-cyan-500/25 selection:text-cyan-200">
      <Navbar />
      
      <main id="main-content">
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

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
