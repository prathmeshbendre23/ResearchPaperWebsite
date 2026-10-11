/**
 * Central Configuration for Brain & Pen Research Services
 * Source of truth for brand, contact details, navigation, and form definitions.
 */

export const siteConfig = {
  brandName: "Brain & Pen",
  brandFullName: "Brain & Pen Research Services",
  brandSubtitle: "Research, Publication & Academic Support",
  brandTagline: "Rigorous Research • Ethical Publication Support • End-to-End Academic Support",

  // Logo asset path
  logoPath: "/assets/brain-and-pen-logo.png",

  // Contact Information
  contact: {
    // PLACEHOLDER: Replace this placeholder with the official Brain & Pen email address before production launch
    email: "inquiry@placeholder-domain.com",
    isPlaceholderEmail: true,

    phone: "+91 7666748752",
    phoneRaw: "+917666748752",

    // WhatsApp configuration (International format without + or spaces)
    whatsappNumber: "917666748752",
    whatsappCommunityGroup: "https://chat.whatsapp.com/CnP9rBQHmhjAdrtZQ0aB7D",
    whatsappDefaultMessage: "Hello Brain & Pen, I would like to discuss my research and academic support requirement.",

    officeHours: "Monday – Saturday: 9:00 AM – 7:00 PM IST",
    location: "Maharashtra, India",
  },

  // Navigation Links
  navLinks: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Research Areas", href: "#areas" },
    { name: "Publications", href: "#publications" },
    { name: "Collaboration", href: "#collaborate" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#inquiry" },
  ],

  // Form Select Options
  countryCodes: [
    { code: "+91", label: "🇮🇳 +91", country: "India" },
    { code: "+1", label: "🇺🇸 +1", country: "USA / Canada" },
    { code: "+44", label: "🇬🇧 +44", country: "United Kingdom" },
    { code: "+971", label: "🇦🇪 +971", country: "UAE" },
    { code: "+966", label: "🇸🇦 +966", country: "Saudi Arabia" },
    { code: "+974", label: "🇶🇦 +974", country: "Qatar" },
    { code: "+965", label: "🇰🇼 +965", country: "Kuwait" },
    { code: "+968", label: "🇴🇲 +968", country: "Oman" },
    { code: "+973", label: "🇧🇭 +973", country: "Bahrain" },
    { code: "+61", label: "🇦🇺 +61", country: "Australia" },
    { code: "+64", label: "🇳🇿 +64", country: "New Zealand" },
    { code: "+65", label: "🇸🇬 +65", country: "Singapore" },
    { code: "+60", label: "🇲🇾 +60", country: "Malaysia" },
    { code: "+49", label: "🇩🇪 +49", country: "Germany" },
    { code: "+33", label: "🇫🇷 +33", country: "France" },
    { code: "+39", label: "🇮🇹 +39", country: "Italy" },
    { code: "+81", label: "🇯🇵 +81", country: "Japan" },
    { code: "+86", label: "🇨🇳 +86", country: "China" },
    { code: "+82", label: "🇰🇷 +82", country: "South Korea" },
    { code: "+27", label: "🇿🇦 +27", country: "South Africa" },
    { code: "+234", label: "🇳🇬 +234", country: "Nigeria" },
    { code: "+880", label: "🇧🇩 +880", country: "Bangladesh" },
    { code: "+92", label: "🇵🇰 +92", country: "Pakistan" },
    { code: "+94", label: "🇱🇰 +94", country: "Sri Lanka" },
    { code: "+977", label: "🇳🇵 +977", country: "Nepal" },
  ],

  enquiryTypes: [
    "SCI / SCIE Journal Paper",
    "Scopus Journal Paper",
    "IEEE / Springer Conference Paper",
    "Manuscript Review / Revision",
    "UG / PG / PhD Project",
    "Thesis / Dissertation",
    "Patent / Copyright",
    "Book / Book Chapter",
    "Institutional Collaboration / MoU",
    "FDP / STTP / Workshop",
    "Other Research Requirement",
  ],

  researchAreas: [
    "AI / Machine Learning / Computer Science",
    "Electrical / Electronics / Communication",
    "Mechanical / Civil / Chemical / Applied Engineering",
    "Management / Business / Finance / Economics",
    "Education / Sciences / Healthcare",
    "Law / Humanities / Social Sciences",
    "Multidisciplinary / Other",
  ],
};

/**
 * Generate a WhatsApp click-to-chat URL with a custom pre-filled message
 */
export const getWhatsAppUrl = (customMessage) => {
  const number = siteConfig.contact.whatsappNumber;
  const message = encodeURIComponent(customMessage || siteConfig.contact.whatsappDefaultMessage);
  return `https://wa.me/${number}?text=${message}`;
};
