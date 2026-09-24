/**
 * Central Content Dataset for Research Publication Website
 * Keep content cleanly decoupled from presentation.
 */

export const servicesData = [
  {
    id: "paper-publication",
    number: "01",
    title: "Research Paper Publication",
    description: "End-to-end guidance to prepare, submit, and shepherd your scholarly manuscript through peer-reviewed academic publication.",
    highlights: [
      "Peer-review readiness assessment",
      "Indexing & database targeting",
      "Submission tracking & workflow",
      "Author compliance coordination"
    ],
    icon: "FileText"
  },
  {
    id: "manuscript-support",
    number: "02",
    title: "Manuscript Support",
    description: "In-depth review of your draft to refine academic structure, argument flow, scientific rigor, clarity, and scholarly tone.",
    highlights: [
      "Technical coherence & novelty analysis",
      "Introduction & literature positioning",
      "Results presentation & discussion depth",
      "Academic grammar & stylistic clarity"
    ],
    icon: "BookOpen"
  },
  {
    id: "paper-formatting",
    number: "03",
    title: "Research Paper Formatting",
    description: "Meticulous layout formatting and reference styling according to exact target journal guidelines and citation standards.",
    highlights: [
      "IEEE, Springer, Elsevier, APA, Chicago styles",
      "Figure, table & equation typography",
      "Reference bibliography synchronization",
      "LaTeX and Word source file preparation"
    ],
    icon: "Layout"
  },
  {
    id: "journal-selection",
    number: "04",
    title: "Journal Selection Guidance",
    description: "Objective evaluation to match your research domain, methodology, and scope with suitable, high-reputation indexed journals.",
    highlights: [
      "Aims & scope alignment review",
      "Indexing verification (Scopus, WoS, SCI/ESCI)",
      "Target review timelines & publication cycles",
      "Avoiding predatory and unverified venues"
    ],
    icon: "Compass"
  },
  {
    id: "review-revision",
    number: "05",
    title: "Review & Revision Assistance",
    description: "Strategic guidance in interpreting reviewer comments, structuring point-by-point response letters, and revising manuscripts.",
    highlights: [
      "Reviewer comments deconstruction",
      "Point-by-point rebuttal letter drafting",
      "Methodological clarification strategies",
      "Track-changes revision compliance"
    ],
    icon: "CheckCircle2"
  },
  {
    id: "publication-support",
    number: "06",
    title: "Publication Support",
    description: "Ongoing advisory through post-acceptance proofing, galley correction checks, copyright management, and open-access protocols.",
    highlights: [
      "Galley proof review & final corrections",
      "Copyright & CC licensing advisory",
      "Author metadata & ORCID alignment",
      "Academic repository distribution support"
    ],
    icon: "Layers"
  }
];

export const whyChooseUsData = [
  {
    id: "research-focused",
    title: "Research-Focused Guidance",
    description: "Every manuscript is evaluated based on its unique scientific merit, domain integrity, and methodological strengths.",
    icon: "Microscope"
  },
  {
    id: "professional-support",
    title: "Professional Publication Support",
    description: "Benefit from seasoned academic expertise with deep familiarity in international editorial and peer-review expectations.",
    icon: "Award"
  },
  {
    id: "structured-process",
    title: "Structured Process",
    description: "A transparent, milestone-driven workflow ensuring clear deliverables and proactive status visibility at each phase.",
    icon: "GitBranch"
  },
  {
    id: "personalized-assistance",
    title: "Personalized Assistance",
    description: "Direct consultative feedback customized to your specific academic discipline, career goals, and institutional criteria.",
    icon: "Users"
  },
  {
    id: "academic-presentation",
    title: "Academic Presentation",
    description: "Elevate your manuscript to international publication standards with sharp formatting, precision terminology, and flawless references.",
    icon: "Sparkles"
  },
  {
    id: "clear-communication",
    title: "Clear Communication",
    description: "Prompt responses, transparent feedback, and continuous clarity via WhatsApp, email, or scheduled consultative discussions.",
    icon: "MessageSquare"
  }
];

export const processStepsData = [
  {
    step: "01",
    title: "Submit Your Research",
    subtitle: "Manuscript intake & initial details",
    description: "Share your draft manuscript, preliminary findings, or research abstract along with your target domains and timeline preferences.",
    keyActions: [
      "Receive manuscript and author notes",
      "Verify subject area and document completeness",
      "Review initial researcher requirements"
    ]
  },
  {
    step: "02",
    title: "Initial Review",
    subtitle: "Technical & structural assessment",
    description: "A comprehensive appraisal of your manuscript’s technical soundness, literature review, novel contribution, and layout readiness.",
    keyActions: [
      "Evaluate novelty and methodology rigor",
      "Identify structural and citation gaps",
      "Provide constructive editorial recommendations"
    ]
  },
  {
    step: "03",
    title: "Publication Guidance",
    subtitle: "Target journal selection & strategy",
    description: "Collaboratively identify reputable indexed journals whose aims, scope, and editorial standards closely match your work.",
    keyActions: [
      "Shortlist reputable indexed journals",
      "Compare review turnaround times & guidelines",
      "Formulate customized submission strategy"
    ]
  },
  {
    step: "04",
    title: "Processing",
    subtitle: "Formatting, proofing & revision",
    description: "Rigorous formatting to author guidelines, precision referencing, response letter crafting, and polishing before final submission.",
    keyActions: [
      "Style layout, figures, and tables precisely",
      "Polish academic phrasing and citation styles",
      "Prepare submission packages and response letters"
    ]
  },
  {
    step: "05",
    title: "Publication",
    subtitle: "Journal acceptance & dissemination",
    description: "Final proof checks, galley validation, and successful publication in your chosen academic journal or conference proceedings.",
    keyActions: [
      "Review publisher proofs and galley checks",
      "Validate author affiliations and metadata",
      "Celebrate your published contribution"
    ]
  }
];

export const researchAreasData = [
  {
    id: "cs",
    name: "Computer Science",
    icon: "Cpu",
    subfields: ["Cloud Computing", "Cybersecurity", "Distributed Systems", "Software Engineering"],
    description: "Theoretical, applied, and algorithmic computing research methodologies."
  },
  {
    id: "ai",
    name: "Artificial Intelligence",
    icon: "Bot",
    subfields: ["Machine Learning", "Deep Learning", "NLP & LLMs", "Computer Vision"],
    description: "Frontier intelligent systems, foundational models, and neural architectures."
  },
  {
    id: "engineering",
    name: "Engineering & Technology",
    icon: "Cog",
    subfields: ["Electronics & Comm", "Mechanical", "Renewable Energy", "Civil Systems"],
    description: "Innovative design, simulation, materials, and applied engineering analysis."
  },
  {
    id: "management",
    name: "Management & Commerce",
    icon: "TrendingUp",
    subfields: ["Strategic Management", "Supply Chain", "FinTech", "Organizational Behavior"],
    description: "Empirical business models, quantitative economics, and corporate governance."
  },
  {
    id: "life-sciences",
    name: "Life Sciences & Biotech",
    icon: "Dna",
    subfields: ["Bioinformatics", "Genomics", "Microbiology", "Pharmaceutical Sciences"],
    description: "Biological systems, clinical omics, and therapeutic research workflows."
  },
  {
    id: "social-sciences",
    name: "Social Sciences",
    icon: "Globe",
    subfields: ["Sociology", "Education Technology", "Public Policy", "Economics"],
    description: "Quantitative and qualitative studies addressing societal transformations."
  },
  {
    id: "medical",
    name: "Medical & Health Sciences",
    icon: "Activity",
    subfields: ["Public Health", "Clinical Informatics", "Biomedical Systems", "Epidemiology"],
    description: "Evidence-based health literature, clinical studies, and medical informatics."
  },
  {
    id: "multidisciplinary",
    name: "Multidisciplinary Research",
    icon: "Layers",
    subfields: ["Data Science in Healthcare", "Smart Cities", "AI in Education", "Bioengineering"],
    description: "Cross-disciplinary investigations bridging multiple academic fields."
  }
];

export const publicationsData = [
  {
    id: "pub-1",
    title: "Adaptive Deep Learning Architectures for Robust Anomaly Detection in High-Throughput Distributed Networks",
    authors: "A. Sharma, R. Patel, et al.",
    area: "Artificial Intelligence",
    journal: "Journal of Network & Computer Applications (Representative)",
    year: "2024",
    linkText: "View Publication",
    type: "Journal Article"
  },
  {
    id: "pub-2",
    title: "Optimizing Energy Harvesting in Edge IoT Nodes: A Predictive Stochastic Control Formulation",
    authors: "M. Verma, A. Sharma, et al.",
    area: "Engineering & Technology",
    journal: "IEEE Transactions on Industrial Informatics (Representative)",
    year: "2023",
    linkText: "View Publication",
    type: "IEEE Paper"
  },
  {
    id: "pub-3",
    title: "Empirical Analysis of Resilient Supply Chain Configurations Under Extreme Macroeconomic Volatility",
    authors: "K. R. Rao, S. Nair, et al.",
    area: "Management & Commerce",
    journal: "International Journal of Production Economics (Representative)",
    year: "2023",
    linkText: "View Publication",
    type: "Research Paper"
  },
  {
    id: "pub-4",
    title: "Transformer-Driven Sequence Modeling for Non-Coding Genomic Variant Classification",
    authors: "A. Sharma, D. Sengupta, et al.",
    area: "Life Sciences & Biotech",
    journal: "Bioinformatics & Computational Biology (Representative)",
    year: "2024",
    linkText: "View Publication",
    type: "Journal Article"
  }
];
