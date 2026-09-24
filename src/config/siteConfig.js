/**
 * Central Configuration for Research Publication Website
 * Easily edit contact information, WhatsApp numbers, brand name, and links here.
 */

export const siteConfig = {
  brandName: "Research Publication",
  brandSubtitle: "Academic Publication & Research Support",
  
  // Consultant / Advisor Details (Easily editable)
  consultant: {
    name: "Dr. A. Sharma",
    title: "Senior Research Consultant & Publication Advisor",
    qualification: "Ph.D. in Computer Science & Engineering",
    bioSnippet: "Over 12 years of academic mentorship guiding scholars, postgraduates, and researchers through high-impact peer-reviewed publishing in leading journals.",
  },

  // Contact Information (Configurable placeholders)
  contact: {
    email: "inquiry@researchpublication.org",
    phone: "+91 81492  93595",
    phoneRaw: "+918149293595",
    
    // WhatsApp configuration (Single variable, international format without + or spaces)
    whatsappNumber: "918149293595",
    whatsappDefaultMessage: "Hello, I am interested in your academic research paper publication guidance and services. I would like to discuss my paper.",
    
    officeHours: "Monday – Saturday: 9:00 AM – 7:00 PM IST",
    location: "New Delhi / Remote Global Academic Consulting",
  },

  // Navigation Links
  navLinks: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Research Areas", href: "#areas" },
    { name: "Publications", href: "#publications" },
    { name: "Inquiry", href: "#inquiry" },
  ],

  // Social / Academic profiles
  socialLinks: {
    googleScholar: "https://scholar.google.com",
    researchGate: "https://www.researchgate.net",
    linkedin: "https://linkedin.com",
    orcid: "https://orcid.org",
  }
};

/**
 * Generate a WhatsApp click-to-chat URL with a custom pre-filled message
 */
export const getWhatsAppUrl = (customMessage) => {
  const number = siteConfig.contact.whatsappNumber;
  const message = encodeURIComponent(customMessage || siteConfig.contact.whatsappDefaultMessage);
  return `https://wa.me/${number}?text=${message}`;
};
