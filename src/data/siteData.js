/**
 * Central Content Dataset for Brain & Pen Research Services
 * Grounded in the client reference content as the primary source of truth.
 * No fake publications, testimonials, statistics, awards, or false guarantees.
 */

// ── SERVICE FAMILIES ───────────────────────────────────────────────────────
// Six organized service families for clear positioning as a research consultancy.

export const serviceFamiliesData = [
  {
    id: "research-development",
    number: "01",
    kicker: "01 / RESEARCH DEVELOPMENT",
    title: "Research Development",
    description: "From topic formulation and gap analysis through methodology design, literature synthesis, and experimental or simulation planning — the research foundation is built systematically.",
    highlights: [
      "Research problem identification and gap analysis",
      "Novelty framing and contribution positioning",
      "Research methodology and experimental design",
      "Literature review and synthesis support",
      "Dataset identification and parameter structuring",
    ],
    icon: "Layers",
  },
  {
    id: "data-ai-simulation",
    number: "02",
    kicker: "02 / DATA, AI & SIMULATION",
    title: "Data, AI, Simulation, and Analytics",
    description: "Technical research support for AI/ML models, simulation-based studies, data analysis, statistical validation, and computational methods across engineering and applied science domains.",
    highlights: [
      "AI/ML model design and evaluation support",
      "Simulation protocol and parameter configuration",
      "Statistical analysis and result interpretation",
      "Computational modelling documentation",
      "Technical results, figures and comparative tables",
    ],
    icon: "Cpu",
  },
  {
    id: "manuscript-publication",
    number: "03",
    kicker: "03 / MANUSCRIPT & PUBLICATION",
    title: "Manuscript and Publication Support",
    description: "End-to-end manuscript development aligned with target journals — covering technical writing, journal selection, scope matching, formatting, and submission preparation.",
    highlights: [
      "Technical manuscript drafting and restructuring",
      "Scopus and Web of Science journal selection",
      "IEEE and Springer conference paper support",
      "Journal scope, indexing, and credibility verification",
      "Formatting, references, and submission preparation",
    ],
    icon: "FileText",
  },
  {
    id: "revision-peer-review",
    number: "04",
    kicker: "04 / REVISION & PEER-REVIEW",
    title: "Revision and Reviewer-Response Support",
    description: "Targeted manuscript revision at pre-submission, peer-review, and post-acceptance stages, including structured reviewer-response letters and technical corrections.",
    highlights: [
      "Point-by-point reviewer-response letter preparation",
      "Major and minor revision technical handling",
      "Manuscript strengthening and resubmission support",
      "Journal-template formatting and compliance checks",
      "Desk-rejection repositioning and rerouting",
    ],
    icon: "CheckCircle2",
  },
  {
    id: "thesis-projects-ip",
    number: "05",
    kicker: "05 / THESIS, PROJECTS & IP",
    title: "UG, PG, and PhD Research Guidance",
    description: "Structured research guidance for UG, PG, and PhD scholars from topic development and methodology to experiments, analysis, thesis documentation, patents, and copyright registration support.",
    highlights: [
      "Research objectives and research question framing",
      "Thesis structuring and chapter-level review",
      "Simulation / experimental design support",
      "Patent Drafting and Copyright Registration Support",
      "Prior-art-oriented documentation and claim structuring",
    ],
    icon: "Award",
  },
  {
    id: "institutional-scholarly",
    number: "06",
    kicker: "06 / INSTITUTIONAL & SCHOLARLY",
    title: "Institutional and Scholarly Services",
    description: "Academic partnerships, MoU arrangements, faculty development programs, scholarly book and chapter development, FDP and STTP opportunities, and institutional research capacity initiatives.",
    highlights: [
      "Institutional Collaboration and MoU Support",
      "FDP and STTP Opportunities and coordination",
      "Edited and Authored Book Support",
      "Book and Book-Chapter Publication Support",
      "Originality, Similarity, and Academic Integrity Review",
    ],
    icon: "Compass",
  },
];

// ── RESEARCH LIFECYCLE ─────────────────────────────────────────────────────

export const researchLifecycleData = [
  {
    step: "01",
    title: "Research Design",
    description: "Problem formulation, novelty mapping, methodology, datasets, experiments and analytical planning.",
  },
  {
    step: "02",
    title: "Manuscript Development",
    description: "Technical writing, restructuring, figures, tables, references and journal-specific formatting.",
  },
  {
    step: "03",
    title: "Submission & Revision",
    description: "Venue matching, submission preparation, reviewer-response strategy and revision handling.",
  },
  {
    step: "04",
    title: "Research Continuity",
    description: "Projects, thesis, patents, books, chapters, collaborations, FDPs, STTPs and academic opportunities.",
  },
];

// ── RESEARCH PRINCIPLES ────────────────────────────────────────────────────

export const researchPrinciplesData = [
  {
    id: "technical-depth",
    title: "Technical Depth",
    description: "Methods, experiments, simulations and analysis are developed to withstand serious peer review.",
    icon: "Cpu",
  },
  {
    id: "publication-ethics",
    title: "Publication Ethics",
    description: "No fabricated results, invented references, false indexing claims or guaranteed editorial outcomes.",
    icon: "ShieldCheck",
  },
  {
    id: "research-integrity",
    title: "Research Integrity",
    description: "Originality, transparent attribution, responsible AI use and defensible scholarly communication.",
    icon: "CheckCircle2",
  },
  {
    id: "submission-precision",
    title: "Submission Precision",
    description: "Journal scope, structure, declarations, references, figures and reviewer requirements are checked carefully.",
    icon: "Compass",
  },
];

// ── RESEARCH AREAS ─────────────────────────────────────────────────────────

export const researchAreasData = {
  primaryHeading: "Core Research Expertise",
  primaryDescription: "Engineering and technology represent the principal focus area, spanning AI/ML, electrical systems, computer science, mechanical, civil, and applied engineering.",
  engineeringClusters: [
    {
      id: "ai-cse-it",
      code: "AI / CSE / IT",
      name: "Artificial Intelligence and Machine Learning",
      description: "Artificial intelligence, machine learning, deep learning, explainable AI, reinforcement learning, data science, computer vision, NLP, cybersecurity, cloud computing, IoT, blockchain, software engineering, digital forensics, databases, networks, edge computing and intelligent systems.",
      subfields: ["Machine Learning & Deep Learning", "Computer Vision & NLP", "Cybersecurity & Cloud", "IoT & Edge Computing"],
      featured: true,
      icon: "Bot",
    },
    {
      id: "ee-ece-etc",
      code: "EE / ECE / E&TC",
      name: "Electrical, Electronics, and Communication Engineering",
      description: "Power systems, power electronics, renewable energy, smart grids, electrical machines, control, protection, VLSI, embedded systems, instrumentation, signal processing, communication engineering, sensors, automation and cyber-physical systems.",
      subfields: ["Power Systems & Smart Grids", "VLSI & Embedded Systems", "Signal Processing & Comms", "Control & Automation"],
      featured: true,
      icon: "Cpu",
    },
    {
      id: "core-engineering",
      code: "CORE ENGINEERING",
      name: "Mechanical, Civil, Chemical and Applied Engineering",
      description: "Mechanical, automobile, aerospace, mechatronics, civil, structural, construction, geotechnical, transportation, environmental, chemical, materials, biomedical and biotechnology engineering, including manufacturing, CAD/CAM, thermal systems, robotics, sustainable infrastructure, nanomaterials, batteries, composites and computational modelling.",
      subfields: ["Robotics & Thermal Systems", "Materials & Nanotechnology", "Structural & Civil Infrastructure", "Chemical & Applied Modeling"],
      featured: true,
      icon: "Cog",
    },
  ],
  multidisciplinaryHeading: "Additional Research Domains",
  multidisciplinaryDescription: "Broad academic support for management, sciences, education, healthcare, law, social sciences, and emerging multidisciplinary research fields.",
  multidisciplinaryClusters: [
    {
      id: "mba-finance",
      code: "MBA / FINANCE",
      name: "Management, Business, Finance and Economics",
      description: "MBA research, marketing, human resources, operations, strategy, entrepreneurship, supply chain, organizational behaviour, business analytics, corporate finance, fintech, banking, investment, behavioural finance, economics and quantitative management research.",
      subfields: ["Strategic Management & HR", "Corporate Finance & FinTech", "Supply Chain & Operations", "Business Analytics"],
      featured: false,
      icon: "TrendingUp",
    },
    {
      id: "education-science-health",
      code: "EDUCATION / SCIENCE / HEALTH",
      name: "Education, Sciences, Healthcare and Applied Research",
      description: "Education, pedagogy, educational technology, physics, chemistry, mathematics, life sciences, environmental science, biotechnology, healthcare, public health, medical imaging, biosignals, biomedical informatics, agriculture and sustainability studies.",
      subfields: ["Pedagogy & EdTech", "Biotech & Life Sciences", "Healthcare & Informatics", "Environmental Science"],
      featured: false,
      icon: "Activity",
    },
    {
      id: "law-social-multi",
      code: "LAW / SOCIAL / MULTIDISCIPLINARY",
      name: "Law, Humanities, Social Sciences and Multidisciplinary Studies",
      description: "Legal studies, public policy, sociology, psychology, language, literature, communication, governance, ethics, social research, systematic reviews, bibliometric analysis, interdisciplinary studies and emerging cross-domain research.",
      subfields: ["Legal & Public Policy", "Sociology & Ethics", "Bibliometric & Systematic Reviews", "Interdisciplinary Studies"],
      featured: false,
      icon: "Globe",
    },
  ],
};

// ── PUBLICATION PATHWAYS ───────────────────────────────────────────────────

export const publicationPathwaysData = [
  {
    id: "sci-scie",
    tag: "SCI / SCIE",
    title: "Web of Science Journal Articles",
    description: "Full-length research articles, reviews and advanced technical manuscripts structured for high-rigor international journals, with emphasis on novelty, reproducibility, statistics, evidence and reviewer defensibility.",
    icon: "FileText",
  },
  {
    id: "scopus",
    tag: "Scopus",
    title: "Scopus-Indexed Journal Papers",
    description: "Research and review manuscripts aligned with journal scope, indexing requirements and discipline-specific expectations, including formatting, references, submission documents and revision support. Indexing status should be verified against official Scopus sources at the time of journal recommendation.",
    icon: "CheckCircle2",
  },
  {
    id: "ieee",
    tag: "IEEE",
    title: "IEEE Conference Publications",
    description: "Technically concise papers designed around strict page limits, experimental clarity, figures, equations, comparative results, camera-ready requirements and conference presentation standards.",
    icon: "Cpu",
  },
  {
    id: "springer",
    tag: "Springer",
    title: "Springer Conference and Proceedings Papers",
    description: "Conference manuscripts and proceedings contributions prepared with clear methods, validated results, structured references and publisher-specific formatting.",
    icon: "BookOpen",
  },
  {
    id: "books",
    tag: "BOOKS",
    title: "Book and Book-Chapter Publication Support",
    description: "Book chapters, edited volumes and authored-book projects with structured proposals, chapter planning, technical writing, references and publisher-compliant submission packages.",
    icon: "Layout",
  },
  {
    id: "academic",
    tag: "ACADEMIC",
    title: "Peer-Reviewed and Institutional Publication Routes",
    description: "Support for legitimate peer-reviewed academic outlets, institutional publication requirements and discipline-specific venues, with indexing and journal-credibility verification. Journal recommendations are based on scope, quality, indexing status, and manuscript suitability. Editorial and peer-review decisions remain with the respective journal or conference.",
    icon: "Compass",
  },
];

// ── PUBLICATION STRATEGY ───────────────────────────────────────────────────

export const publicationStrategyData = {
  heading: "Target the right venue. Strengthen the right evidence.",
  description: "We evaluate research scope, novelty, methodology, evidence quality, manuscript maturity, indexing goals, journal or conference fit, and editorial requirements before recommending a publication route.",
  points: [
    {
      title: "Journal Verification",
      description: "Indexing status, publisher identity, journal continuity and scope are checked before recommendation.",
    },
    {
      title: "Transparent Support",
      description: "Clear service scope based on the actual research requirement — no hidden claims or guaranteed outcomes.",
    },
    {
      title: "Revision Support",
      description: "Technical revision, reviewer responses, resubmission strategy and manuscript strengthening.",
    },
    {
      title: "Authentic Guidance",
      description: "Focus on legitimate scholarly venues and defensible publication practices.",
    },
  ],
  trustNote: "Journal recommendations are based on scope, quality, indexing status, and manuscript suitability. Editorial and peer-review decisions remain with the respective journal or conference.",
  deskRejection: {
    title: "Facing a Desk Rejection?",
    description: "Strengthen, reposition and resubmit your manuscript with focused editorial and technical support.",
    ctaText: "Discuss Your Manuscript →",
    ctaHref: "#inquiry",
  },
};

// ── RESEARCHER NETWORK ─────────────────────────────────────────────────────

export const researcherNetworkData = {
  eyebrow: "Researcher Network",
  heading: "Work with Brain & Pen as a research group",
  description: "Research teams, faculty groups, PhD cohorts and interdisciplinary collaborators can work with us through a shared support model for multiple papers, projects, revisions, book chapters and research initiatives.",
  groupCard: {
    label: "GROUP RESEARCH SUPPORT",
    title: "One research partner for multiple scholars and projects",
    description: "A group-engagement model is useful when several researchers need coordinated support across related or independent studies while maintaining consistent technical quality, documentation and publication planning.",
    points: [
      "Multi-paper planning for faculty or research groups",
      "PhD cohort and postgraduate research support",
      "Joint review papers, book chapters and edited volumes",
      "Shared methodology, statistics and technical-review support",
      "Coordinated revision and reviewer-response handling",
      "Long-term support for interdisciplinary research teams",
    ],
  },
  communityCard: {
    label: "JOIN THE COMMUNITY",
    title: "Connect with researchers, opportunities and updates",
    description: "Join the Brain & Pen research community for publication information, research opportunities, FDP and STTP updates, academic calls and collaboration discussions.",
    whatsappGroupUrl: "https://chat.whatsapp.com/CnP9rBQHmhjAdrtZQ0aB7D",
    directContactNumber: "+91 7666748752",
    directContactTel: "tel:+917666748752",
  },
};

// ── INSTITUTIONAL COLLABORATION ────────────────────────────────────────────

export const institutionalCollaborationData = {
  eyebrow: "Institutional Collaboration",
  heading: "Academic Partnerships and MoUs",
  description: "We collaborate with colleges, universities, departments, research centres and academic groups to strengthen research culture, publication quality, faculty development and student research outcomes.",
  label: "COLLABORATION AREAS",
  subheading: "Flexible engagement models for institutions and research groups",
  subdescription: "Programs can be structured as a one-time academic activity, a recurring research-support initiative, or a formal institutional MoU depending on departmental objectives.",
  cards: [
    {
      number: "01",
      title: "Research and Publication Development",
      description: "Research-paper workshops, manuscript clinics, journal strategy, reviewer-response support and publication mentoring.",
    },
    {
      number: "02",
      title: "Faculty and Student Research Mentoring",
      description: "UG/PG/PhD project guidance, methodology support, technical reviews and research-quality improvement.",
    },
    {
      number: "03",
      title: "Innovation, Patents and Scholarly Outputs",
      description: "Patent documentation, copyrights, books, book chapters, edited volumes and research-oriented academic initiatives.",
    },
    {
      number: "04",
      title: "FDP, STTP and Capacity Building",
      description: "Research methodology programs, scholarly writing, responsible AI-use practices, publication ethics and emerging-technology training.",
    },
  ],
  mouCard: {
    label: "INSTITUTIONAL MoU",
    title: "Build a long-term academic collaboration",
    description: "MoUs can be tailored around research mentoring, publication development, workshops, faculty capacity building, innovation documentation and collaborative scholarly activities.",
    points: [
      "Department-level collaboration",
      "Custom academic programs",
      "Recurring research support",
      "Flexible engagement scope",
    ],
    ctaText: "Discuss an Institutional MoU",
    ctaHref: "#inquiry",
  },
};

// ── DISCLAIMER ─────────────────────────────────────────────────────────────

export const disclaimerText =
  "Publication acceptance, peer-review outcomes, indexing status, and editorial decisions are determined by the respective journal, conference, publisher, or indexing database. Brain & Pen Research Services provides research, manuscript, publication-planning, and academic support and does not control third-party editorial decisions.";

// ── FAQ DATA ───────────────────────────────────────────────────────────────

export const faqData = [
  {
    id: "guarantee",
    question: "Do you guarantee journal acceptance?",
    answer: "Journal acceptance is ultimately determined by the journal's editors and peer reviewers. However, we are committed to achieving successful publication through high-quality manuscript development, technical refinement, strategic journal selection, and continuous support throughout the publication process. If a manuscript is rejected, we carefully address the feedback, strengthen the research, and explore suitable alternative journals until a successful publication outcome is achieved. While this process may require time and multiple submissions, we take pride in maintaining a 100% publication success rate for the cases we have handled to date. We strictly prioritize genuine, reputable, and appropriately indexed journals. We do not compromise research integrity by recommending predatory, cloned, fake, or misleadingly advertised fast-acceptance journals, including journals falsely claiming Scopus or Web of Science indexing or those that have been discontinued from indexing. Our priority is not merely getting your paper accepted, but ensuring it is published in a credible journal that adds genuine value to your academic and research career.",
  },
  {
    id: "journal-selection",
    question: "How do you help with journal selection?",
    answer: "We help you identify the most suitable journals for your research by carefully evaluating its scope, originality, technical quality, and publication objectives. Our recommendations consider journal reputation, indexing in Scopus, SCI/SCIE, Web of Science, and other relevant databases, publication timelines, and journal requirements. We also provide guidance on selecting alternative journals when necessary, helping you pursue publication opportunities that best align with your research and academic goals.",
  },
  {
    id: "revision-support",
    question: "Do you provide manuscript revision support?",
    answer: "Absolutely. We offer comprehensive manuscript revision support throughout the publication process, from initial submission to final acceptance. Our services include addressing editorial and reviewer comments, preparing detailed point-by-point response letters, strengthening technical and methodological content, and handling both major and minor revisions. We also assist with manuscript refinement, journal-specific formatting, and resubmission to the same or alternative journals, helping you navigate the peer-review process with confidence.",
  },
  {
    id: "confidentiality",
    question: "Is my research information confidential?",
    answer: "Absolutely. We recognize the importance of protecting your original research, unpublished manuscripts, datasets, patent ideas, and intellectual property. All information shared with us is handled with strict confidentiality and used exclusively for delivering the requested research services. We respect your intellectual ownership and are committed to maintaining the privacy, security, and integrity of your research throughout our engagement.",
  },
  {
    id: "publication-fees",
    question: "Do journal or conference publication fees include your service?",
    answer: "No. Journal or conference publication fees (APCs, registration fees, etc.) are separate and payable directly to the respective publisher or organizer. Our service fees are independent of any publisher fees.",
  },
  {
    id: "thesis-projects",
    question: "Do you support thesis and research projects?",
    answer: "Absolutely. We provide comprehensive research and technical guidance for undergraduate (UG), postgraduate (PG), and PhD scholars across various disciplines. Our support covers research topic selection, problem formulation, literature review, methodology development, simulation and experimental implementation, data analysis, result interpretation, and thesis documentation. From initial research planning to final thesis preparation, we offer personalized, structured assistance focused on technical quality, originality, academic standards, and successful research completion.",
  },
  {
    id: "institutional",
    question: "Do you support institutional research initiatives?",
    answer: "Yes. We collaborate with colleges, universities, and research departments through institutional engagement models including MoUs, research workshops, FDP and STTP programs, faculty mentoring, and publication development initiatives.",
  },
];
