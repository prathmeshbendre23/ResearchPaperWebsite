# Premium Research Publication & Academic Advisory Website

A modern, production-ready **academic research paper publication / research support website** built with **React.js + JavaScript**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **Three.js (React Three Fiber)**.

Crafted with a sophisticated dark research-tech aesthetic for professors and research publication consultants assisting scholars with high-impact peer-reviewed publishing.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 📋 Features Included

* **Hero Section**: Cinematic headline, dual action CTAs, WhatsApp quick link, and a live, interactive 3D research environment.
* **3D Research Environment**: Single reusable, lightweight 3D canvas featuring floating peer-reviewed manuscripts with procedural textures, interconnected scientific node networks, and subtle orbital coordinates. Includes automatic mobile optimization and CSS fallbacks.
* **About Consultant**: "Turning Research Into Recognition", independent academic consulting narrative, and an interactive 3-tab manuscript dossier analysis widget.
* **6 Publication Services**: 
  1. Research Paper Publication
  2. Manuscript Support
  3. Research Paper Formatting
  4. Journal Selection Guidance
  5. Review & Revision Assistance
  6. Publication Support
* **Why Choose Us**: 6 methodological guidance pillars (academic rigor, ethical integrity, structured process, clear communication). No fake metrics.
* **5-Step Publication Process**: Interactive milestone tracker (Submit ➔ Review ➔ Guidance ➔ Processing ➔ Publication) with deliverables and visual stage indicators.
* **Research Areas**: 8 interactive academic categories (Computer Science, AI & ML, Engineering, Management, Life Sciences, Social Sciences, Health Sciences, Multidisciplinary) with subdiscipline tags.
* **Selected Publications**: Representative publication cards with author, journal, year, and action links.
* **Cinematic CTA Banner**: Dual action buttons for direct inquiry and WhatsApp chat.
* **Modular Inquiry Form**:
  * Fields: Full Name, Email, Phone, Research Area, Service Required, Paper Title, Requirements/Abstract.
  * Instant client-side validation and accessible error feedback.
  * Loading, success (with tracking reference ID), and error states.
* **WhatsApp Integration**:
  * Single configuration variable in `src/config/siteConfig.js`.
  * Pre-configured WhatsApp links in Navbar, Hero, CTA, Inquiry form, Footer, and Floating Button.
* **Responsive & Accessible**:
  * Mobile drawer menu with animated transitions.
  * Semantic HTML, accessible ARIA attributes, and `:focus-visible` states.
  * Respects `prefers-reduced-motion`.

---

## ⚙️ Content & Configuration Customization

All client details and website content are cleanly separated from the UI components:

### 1. Contact & WhatsApp Configuration: `src/config/siteConfig.js`
```javascript
export const siteConfig = {
  brandName: "Research Publication",
  consultant: {
    name: "Dr. A. Sharma",
    title: "Senior Research Consultant & Publication Advisor",
    qualification: "Ph.D. in Computer Science & Engineering",
  },
  contact: {
    email: "inquiry@researchpublication.org",
    phone: "+91 98765 43210",
    // International format without '+' or spaces:
    whatsappNumber: "919876543210",
    location: "New Delhi / Remote Global Academic Consulting",
  }
};
```

### 2. Services, Steps, Areas, & Publications: `src/data/siteData.js`
* `servicesData`: Add, edit, or reorder services.
* `processStepsData`: Modify timeline stages and deliverables.
* `researchAreasData`: Adjust academic disciplines and subfields.
* `publicationsData`: Update representative published papers.

---

## 🔒 Inquiry Form & Email Integration (Security Best Practice)

**IMPORTANT**: Email service API keys (such as Resend, SendGrid, or AWS SES) must **NEVER** be stored in client-side React code.

The inquiry form is decoupled via `src/services/inquiryService.js`:

1. **Current State**: Provides instant, reliable client-side validation and simulated dispatch with unique tracking references (`RP-XXXXXX`).
2. **Connecting a Production Email Route**:
   Set an environment variable in `.env`:
   ```env
   VITE_INQUIRY_API_ENDPOINT=https://your-api-domain.com/api/inquiry
   ```
   Or on Vercel/Netlify create an `/api/inquiry` serverless function where the private `RESEND_API_KEY` is securely stored on the server.

---

## 📁 Project Architecture

```
ResearchPaperWebsite/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── config/
    │   └── siteConfig.js          # Central brand, phone, WhatsApp config
    ├── data/
    │   └── siteData.js            # Services, steps, domains, papers
    ├── services/
    │   └── inquiryService.js      # Form validation & email dispatch abstraction
    └── components/
        ├── Navbar.jsx             # Sticky glass navigation & mobile menu
        ├── Hero.jsx               # Headline, CTAs, 3D canvas integration
        ├── About.jsx              # Consultant profile & interactive dossier
        ├── Services.jsx           # 6 publication service cards
        ├── WhyChooseUs.jsx        # 6 methodological excellence blocks
        ├── PublicationProcess.jsx # 5-step milestone timeline
        ├── ResearchAreas.jsx      # 8 interactive discipline cards
        ├── Publications.jsx       # Selected publication cards
        ├── CTA.jsx                # Cinematic conversion banner
        ├── InquiryForm.jsx        # Validated form with status states
        ├── Footer.jsx             # Academic links, contact, disclaimers
        ├── WhatsAppFloatingButton.jsx # Floating quick-chat button
        └── 3d/
            └── ResearchScene.jsx  # Reusable 3D document + node environment
```
