/**
 * Central Content Dataset for Brain & Pen Research Services
 * Grounded in the client reference content as the primary source of truth.
 * No fake publications, testimonials, statistics, awards, or false guarantees.
 */

export const servicesData = [
  {
    id: "scopus-wos-publication",
    number: "01",
    kicker: "01 / JOURNALS",
    title: "Scopus & Web of Science Publication Support",
    description: "Research and manuscript development for journals indexed in major scholarly databases, including SCI/SCIE-oriented submissions.",
    highlights: [
      "Research gap and novelty development",
      "Technical manuscript drafting",
      "Journal selection and scope matching",
      "Submission-readiness review",
    ],
    icon: "FileText",
  },
  {
    id: "ieee-springer-conferences",
    number: "02",
    kicker: "02 / CONFERENCES",
    title: "IEEE & Springer Conference Papers",
    description: "Concise, technically focused conference-paper support with attention to novelty, experiments, page limits and camera-ready requirements.",
    highlights: [
      "IEEE / Springer paper development",
      "Short-paper optimization",
      "Figures and technical presentation",
      "Camera-ready revisions",
    ],
    icon: "BookOpen",
  },
  {
    id: "peer-reviewed-publications",
    number: "03",
    kicker: "03 / JOURNAL SUPPORT",
    title: "Peer-Reviewed Academic Publications",
    description: "Support for peer-reviewed journals and publication routes aligned with discipline-specific and institutional requirements.",
    highlights: [
      "Journal credibility screening",
      "Indexing and scope verification",
      "Formatting and references",
      "Submission documentation",
    ],
    icon: "Compass",
  },
  {
    id: "projects-and-thesis",
    number: "04",
    kicker: "04 / PROJECTS & THESIS",
    title: "UG, PG & PhD Research Support",
    description: "Structured research guidance from topic development and methodology to experiments, analysis and thesis documentation.",
    highlights: [
      "Objectives and research questions",
      "Simulation / experimental design",
      "Analysis and interpretation",
      "Thesis structuring and review",
    ],
    icon: "Layers",
  },
  {
    id: "patents-and-copyrights",
    number: "05",
    kicker: "05 / IP SUPPORT",
    title: "Patent & Copyright Documentation",
    description: "Technical documentation support for inventions and academic intellectual property with emphasis on clarity and novelty articulation.",
    highlights: [
      "Technical invention write-up",
      "Claim structuring support",
      "Prior-art-oriented documentation",
      "Copyright-ready content",
    ],
    icon: "Award",
  },
  {
    id: "research-integrity-ai",
    number: "06",
    kicker: "06 / RESEARCH INTEGRITY",
    title: "Similarity, Originality & Responsible AI Support",
    description: "Originality-focused academic improvement with correct citation, attribution, transparent AI-use practices and improved scholarly language.",
    highlights: [
      "Similarity and source review",
      "Original rewriting with citation preservation",
      "Reference correction",
      "Responsible AI-use disclosure",
    ],
    icon: "ShieldCheck",
  },
  {
    id: "review-and-revision",
    number: "07",
    kicker: "07 / REVISION",
    title: "Review, Formatting & Revision Handling",
    description: "Technical review and surgical revision for manuscripts at pre-submission, peer-review and post-acceptance stages.",
    highlights: [
      "Reviewer-response preparation",
      "Major/minor revision handling",
      "Journal-template formatting",
      "Consistency and compliance checks",
    ],
    icon: "CheckCircle2",
  },
  {
    id: "books-and-chapters",
    number: "08",
    kicker: "08 / BOOKS",
    title: "Authored Books, Edited Books & Chapters",
    description: "Scholarly development and publication support for authored volumes, edited books and indexed academic book chapters.",
    highlights: [
      "Book proposals",
      "Chapter development",
      "Publisher formatting",
      "Editorial coordination support",
    ],
    icon: "Layout",
  },
  {
    id: "fdp-sttp-workshops",
    number: "09",
    kicker: "09 / ACADEMIC OPPORTUNITIES",
    title: "FDP, STTP & Research Opportunities",
    description: "Curated academic information relating to faculty development, short-term training, conferences, chapters and research networking.",
    highlights: [
      "FDP / STTP information",
      "Conference and workshop calls",
      "Book chapter opportunities",
      "Research networking updates",
    ],
    icon: "Sparkles",
  },
];

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

export const researchAreasData = {
  primaryHeading: "Engineering & Technology — Primary Focus",
  primaryDescription: "Three broad research clusters cover major conventional, emerging and interdisciplinary engineering domains.",
  engineeringClusters: [
    {
      id: "ai-cse-it",
      code: "AI / CSE / IT",
      name: "Artificial Intelligence, Computer Science & Digital Technologies",
      description: "Artificial intelligence, machine learning, deep learning, explainable AI, reinforcement learning, data science, computer vision, NLP, cybersecurity, cloud computing, IoT, blockchain, software engineering, digital forensics, databases, networks, edge computing and intelligent systems.",
      subfields: ["Machine Learning & Deep Learning", "Computer Vision & NLP", "Cybersecurity & Cloud", "IoT & Edge Computing"],
      featured: true,
      icon: "Bot",
    },
    {
      id: "ee-ece-etc",
      code: "EE / ECE / E&TC",
      name: "Electrical, Electronics, Communication & Embedded Systems",
      description: "Power systems, power electronics, renewable energy, smart grids, electrical machines, control, protection, VLSI, embedded systems, instrumentation, signal processing, communication engineering, sensors, automation and cyber-physical systems.",
      subfields: ["Power Systems & Smart Grids", "VLSI & Embedded Systems", "Signal Processing & Comms", "Control & Automation"],
      featured: true,
      icon: "Cpu",
    },
    {
      id: "core-engineering",
      code: "CORE ENGINEERING",
      name: "Mechanical, Civil, Chemical & Applied Engineering",
      description: "Mechanical, automobile, aerospace, mechatronics, civil, structural, construction, geotechnical, transportation, environmental, chemical, materials, biomedical and biotechnology engineering, including manufacturing, CAD/CAM, thermal systems, robotics, sustainable infrastructure, nanomaterials, batteries, composites and computational modelling.",
      subfields: ["Robotics & Thermal Systems", "Materials & Nanotechnology", "Structural & Civil Infrastructure", "Chemical & Applied Modeling"],
      featured: true,
      icon: "Cog",
    },
  ],
  multidisciplinaryHeading: "Management, Sciences & Multidisciplinary Research",
  multidisciplinaryDescription: "Broad academic support for non-engineering, interdisciplinary and emerging research domains.",
  multidisciplinaryClusters: [
    {
      id: "mba-finance",
      code: "MBA / FINANCE",
      name: "Management, Business, Finance & Economics",
      description: "MBA research, marketing, human resources, operations, strategy, entrepreneurship, supply chain, organizational behaviour, business analytics, corporate finance, fintech, banking, investment, behavioural finance, economics and quantitative management research.",
      subfields: ["Strategic Management & HR", "Corporate Finance & FinTech", "Supply Chain & Operations", "Business Analytics"],
      featured: false,
      icon: "TrendingUp",
    },
    {
      id: "education-science-health",
      code: "EDUCATION / SCIENCE / HEALTH",
      name: "Education, Sciences, Healthcare & Applied Research",
      description: "Education, pedagogy, educational technology, physics, chemistry, mathematics, life sciences, environmental science, biotechnology, healthcare, public health, medical imaging, biosignals, biomedical informatics, agriculture and sustainability studies.",
      subfields: ["Pedagogy & EdTech", "Biotech & Life Sciences", "Healthcare & Informatics", "Environmental Science"],
      featured: false,
      icon: "Activity",
    },
    {
      id: "law-social-multi",
      code: "LAW / SOCIAL / MULTIDISCIPLINARY",
      name: "Law, Humanities, Social Sciences & Multidisciplinary Studies",
      description: "Legal studies, public policy, sociology, psychology, language, literature, communication, governance, ethics, social research, systematic reviews, bibliometric analysis, interdisciplinary studies and emerging cross-domain research.",
      subfields: ["Legal & Public Policy", "Sociology & Ethics", "Bibliometric & Systematic Reviews", "Interdisciplinary Studies"],
      featured: false,
      icon: "Globe",
    },
  ],
};

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
    tag: "SCOPUS",
    title: "Scopus-Indexed Journal Papers",
    description: "Research and review manuscripts aligned with journal scope, indexing requirements and discipline-specific expectations, including formatting, references, submission documents and revision support.",
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
    tag: "SPRINGER",
    title: "Springer Conference & Proceedings Papers",
    description: "Conference manuscripts and proceedings contributions prepared with clear methods, validated results, structured references and publisher-specific formatting.",
    icon: "BookOpen",
  },
  {
    id: "books",
    tag: "BOOKS",
    title: "Scopus Book Chapters, Edited & Authored Books",
    description: "Book chapters, edited volumes and authored-book projects with structured proposals, chapter planning, technical writing, references and publisher-compliant submission packages.",
    icon: "Layout",
  },
  {
    id: "academic",
    tag: "ACADEMIC",
    title: "Peer-Reviewed & Institutional Publication Routes",
    description: "Support for legitimate peer-reviewed academic outlets, institutional publication requirements and discipline-specific venues, with indexing and journal-credibility verification.",
    icon: "Compass",
  },
];

export const publicationStrategyData = {
  heading: "Target the right venue. Strengthen the right evidence.",
  description: "We evaluate research scope, novelty, methodology, evidence quality, manuscript maturity, indexing goals, journal or conference fit, and editorial requirements before recommending a publication route.",
  points: [
    {
      title: "Journal Verification",
      description: "Indexing status, publisher identity, journal continuity and scope are checked before recommendation.",
    },
    {
      title: "Affordable Support",
      description: "Transparent service scope and practical pricing based on the actual research requirement.",
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
  deskRejection: {
    title: "Facing a Desk Rejection?",
    description: "Strengthen, reposition and resubmit your manuscript with focused editorial and technical support.",
    ctaText: "Discuss Your Manuscript →",
    ctaHref: "#inquiry",
  },
};

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
    description: "Join the Brain & Pen research community for publication information, research opportunities, FDP/STTP updates, academic calls and collaboration discussions.",
    whatsappGroupUrl: "https://chat.whatsapp.com/CnP9rBQHmhjAdrtZQ0aB7D",
    directContactNumber: "+91 7666748752",
    directContactTel: "tel:+917666748752",
  },
};

export const institutionalCollaborationData = {
  eyebrow: "Institutional Collaboration",
  heading: "Academic Partnerships & MoUs",
  description: "We collaborate with colleges, universities, departments, research centres and academic groups to strengthen research culture, publication quality, faculty development and student research outcomes.",
  label: "COLLABORATION AREAS",
  subheading: "Flexible engagement models for institutions and research groups",
  subdescription: "Programs can be structured as a one-time academic activity, a recurring research-support initiative, or a formal institutional MoU depending on departmental objectives.",
  cards: [
    {
      number: "01",
      title: "Research & Publication Development",
      description: "Research-paper workshops, manuscript clinics, journal strategy, reviewer-response support and publication mentoring.",
    },
    {
      number: "02",
      title: "Faculty & Student Research Mentoring",
      description: "UG/PG/PhD project guidance, methodology support, technical reviews and research-quality improvement.",
    },
    {
      number: "03",
      title: "Innovation, Patents & Scholarly Outputs",
      description: "Patent documentation, copyrights, books, book chapters, edited volumes and research-oriented academic initiatives.",
    },
    {
      number: "04",
      title: "FDPs, STTPs & Capacity Building",
      description: "Research methodology programs, scholarly writing, AI-assisted research practice, publication ethics and emerging-technology training.",
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

export const disclaimerText =
  "Publication acceptance, peer-review outcomes, indexing status and editorial decisions are determined by the respective journal, conference, publisher and indexing database. Brain & Pen provides research, manuscript, publication-planning and academic support services and does not control third-party editorial decisions.";
