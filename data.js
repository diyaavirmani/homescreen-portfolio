// Everything the site says about Diya lives in this file. Facts come from her résumé
// (assets/diya-resume.pdf) and her previous portfolio; edit here and the phone, the folders
// and the text column all update.

const PROFILE = {
  name: "Diya Virmani",
  firstName: "Diya",
  location: "New Delhi, India",
  timeZone: "Asia/Kolkata",
  email: "diyavirmani41@gmail.com",
  github: "https://github.com/diyaavirmani",
  githubUsername: "diyaavirmani",
  linkedin: "https://www.linkedin.com/in/diya-virmani-3bb62b1a0/",
  resume: "assets/diya-resume.pdf",
  headline: "Developer · Agentic systems, RAG & ML",
  education: {
    school: "Vivekananda Institute of Professional Studies (VIPS-TC)",
    short: "VIPS-TC",
    degree: "B.Tech in Artificial Intelligence & Data Science",
    dates: "2023 – 2027",
  },
};

// The typewriter intro on the right of the phone. Links are allowed; `tap-around-link`
// shakes the phone instead of navigating.
const INTRO = {
  name: PROFILE.name,
  paragraphs: [
    [
      "I'm a developer based in New Delhi, studying AI & Data Science at VIPS-TC.",
      " I like to work on agentic systems, RAG pipelines, and study core ML/DL architectures.",
    ],
    ["I built my portfolio as a Home Screen, so every app and folder opens up a piece of what I do."],
    [
      `Feel free to <a href="#" class="tap-around-link">tap around</a> or <a href="mailto:${PROFILE.email}">get in touch</a> and thanks for stopping by.`,
    ],
  ],
};

const SOCIALS = [
  { label: "GitHub", href: PROFILE.github, icon: "assets/icons/github.svg" },
  { label: "LinkedIn", href: PROFILE.linkedin, icon: "assets/icons/linkedin.svg" },
  { label: "Email", href: `mailto:${PROFILE.email}`, icon: "assets/icons/mail.svg" },
  { label: "Résumé", href: PROFILE.resume, icon: "assets/icons/resume.svg" },
];

const MUSIC = {
  title: "Style (Taylor's Version)",
  artist: "Taylor Swift",
  album: "1989 (Taylor's Version)",
  cover: "assets/img/album.jpg",
  link: "https://www.youtube.com/watch?v=2JgvVfOfoWI",
};

// GitHub contributions for the year up to 26 Oct 2026, one digit (level 0–4) per day from
// `start` (a Sunday). Used when the live contributions API can't be reached.
const CONTRIBUTIONS_SNAPSHOT = {
  start: "2025-10-26",
  total: 880,
  levels:
    "000000000000000000000000000000000000000000000000000000000000000000001101100000011001111100111111111000000000000000000004000111111112200111100012000000110001110122111141000000000010000122222222211111211102111111110110001000111000010000011010201000000000000000000001100100000001011110010001001000400100300001011000000000001001002012101001010102234101112222132223112100",
};

// Single apps: the two widgets, the app row and the dock. `text` is shown beside the phone
// when the app is open; blank lines separate paragraphs.
const APPS = {
  github: {
    name: "GitHub",
    text: [
      "Most of what I build lives here, and all four projects in the Projects folder are public.",
      `Lately that includes 6+ merged PRs into <a href="https://github.com/Untrivial-ai/agent-orchestrator" target="_blank" rel="noopener">Agent Orchestrator</a>, a production AI orchestration desktop app for macOS Intel with real users.`,
      `Come say hi at <a href="${PROFILE.github}" target="_blank" rel="noopener">github.com/${PROFILE.githubUsername}</a>.`,
    ],
  },
  music: {
    name: MUSIC.title,
    text: [
      `${MUSIC.artist}, from ${MUSIC.album}.`,
      "It's the song I picked for my corner of the internet, so it gets the widget.",
      `<a href="${MUSIC.link}" target="_blank" rel="noopener">Give it a listen</a>.`,
    ],
  },
  photos: {
    name: "Photos",
    label: "Photos",
    text: [
      "That's me.",
      "When I'm not pushing commits, I'm at the gym, lost in a book, or somewhere in a fictional world I refuse to leave.",
      "Reconnecting with the hobbies I gave up. Turns out you don't have to choose.",
    ],
  },
  maps: {
    name: "Maps",
    label: "Maps",
    text: [
      `Based in New Delhi, where I'm doing my ${PROFILE.education.degree} at VIPS-TC, graduating in 2027.`,
      "The clock on this phone runs on my time, IST (UTC+5:30).",
    ],
  },
  terminal: {
    name: "Terminal",
    label: "Terminal",
    text: [
      "Right now I'm learning backend engineering, from first principles.",
      "The quote is Ada Lovelace's, the world's first computer programmer. It's how studying feels to me too.",
    ],
  },
  resume: {
    name: "Résumé",
    label: "Résumé",
    text: [
      "Education, experience, projects and hackathons, all on one page.",
      `<a href="${PROFILE.resume}" target="_blank" rel="noopener">Open the PDF</a> or download it for later.`,
    ],
  },
  mail: {
    name: "Mail",
    label: "Mail",
    text: [
      "Email is the best way to reach me, whether it's about a role, a project or a hackathon team.",
      `<a href="mailto:${PROFILE.email}">${PROFILE.email}</a>`,
    ],
  },
  linkedin: {
    name: "LinkedIn",
    label: "LinkedIn",
    text: [
      "The professional version of all this: experience, education and the occasional update.",
      `<a href="${PROFILE.linkedin}" target="_blank" rel="noopener">Connect with me on LinkedIn</a>.`,
    ],
  },
  notes: {
    name: "Notes",
    label: "Notes",
    text: [
      "To me, an idea and a product are just two ends of the same rope, and everything in between is the part people rarely see.",
      "The failed attempts, the rewrites, the late fixes, the 'this should work' moments that somehow don't, and the small breakthroughs that finally make it real.",
      "That messy middle is what I enjoy most about engineering.",
    ],
  },
};

// Folders: each item gets an icon, a line of text beside the phone and its own screen.
const FOLDERS = {
  projects: {
    name: "Projects",
    items: [
      {
        name: "Scam Bait AI",
        icon: "scambait",
        href: "https://github.com/diyaavirmani/SCAM-BAIT",
        area: "AI Security · Agentic AI",
        description:
          "is an AI honeypot that keeps scammers talking on Telegram and phone calls, while FastAPI and LangGraph classify the scam and pull out threat indicators.",
        strip: [
          ["Channels", "2", "Telegram, calls"],
          ["Category", "Security", "Agentic AI"],
          ["Language", "Python", "FastAPI"],
        ],
        highlights: [
          "TF-IDF/SVM scam classification inside a FastAPI + LangGraph agent.",
          "Extracts UPI IDs, phone numbers, phishing links, wallets and other indicators.",
          "Twilio → Deepgram → LLM → ElevenLabs voice pipeline with graceful fallbacks.",
          "Session locking and semaphore-based concurrency; API, bot and dashboard on Render.",
        ],
        stack: ["Python", "FastAPI", "LangGraph", "Twilio", "Deepgram", "ElevenLabs", "Render"],
      },
      {
        name: "FLOWITS",
        icon: "flowits",
        href: "https://github.com/diyaavirmani/Flowits",
        area: "ML · Traffic Intelligence",
        description:
          "is a traffic-control system trained on 8,057 Bengaluru incidents. It predicts severity, maps spatial risk zones and plans safer diversions with NetworkX.",
        strip: [
          ["Incidents", "8,057", "Bengaluru"],
          ["ROC-AUC", "0.974", "severity"],
          ["Weighted F1", "0.859", "GBM"],
        ],
        highlights: [
          "Gradient Boosting severity model: 0.859 weighted F1, 0.974 ROC-AUC.",
          "K-Means spatial risk zones and duration forecasting.",
          "NetworkX/Dijkstra diversion planning with live Google News RSS.",
          "Outcome feedback loop in a FastAPI + React deployment.",
        ],
        stack: ["Python", "scikit-learn", "NetworkX", "FastAPI", "React"],
      },
      {
        name: "Telecom Standards Assistant",
        icon: "telecom",
        href: "https://github.com/diyaavirmani/Telecom-Standards-Assistant-",
        area: "RAG · Telecom Standards",
        description:
          "is an evidence-gated RAG assistant for 3GPP standards. Pinecone and reranking return verified citations, and it refuses when the spec doesn't back an answer.",
        strip: [
          ["Citations", "100%", "valid"],
          ["Hit@1", "94.9%", "retrieval"],
          ["Chunks", "~1,561", "TS 38.300/401"],
        ],
        highlights: [
          "Indexes 3GPP TS 38.300 and TS 38.401 with OpenAI embeddings + Pinecone.",
          "CrossEncoder reranking before an answer is allowed through.",
          "60-query eval harness: 100% citation validity and 100% correct refusal.",
          "94.9% Retrieval Hit@1 and a 0% unsupported-answer escape rate.",
        ],
        stack: ["Python", "Pinecone", "OpenAI embeddings", "CrossEncoder", "FastAPI"],
      },
      {
        name: "Pancake",
        icon: "pancake",
        href: "https://github.com/diyaavirmani/probable-pancake",
        area: "Agents · Developer Tools",
        description:
          "is an agentic coding assistant with Ask, Plan and Agent modes in a terminal UI and on Telegram. File edits stay sandboxed until you approve them.",
        strip: [
          ["Modes", "3", "Ask, Plan, Agent"],
          ["Runs in", "TUI", "and Telegram"],
          ["Language", "TS", "Bun"],
        ],
        highlights: [
          "Codebase Q&A, web search, staged file edits and multi-step execution.",
          "Isolated overlay sandbox blocks live-file changes until user approval.",
          "OpenRouter integration for model access.",
          "Graceful Telegram delivery fallbacks.",
        ],
        stack: ["TypeScript", "Bun", "OpenRouter", "Telegram"],
      },
    ],
  },
  work: {
    name: "Work",
    items: [
      {
        name: "Agent Orchestrator",
        logo: "assets/logos/agent-orchestrator.png",
        logoBg: "#0d1117",
        role: "Open Source Contributor",
        dates: "2026 – Present",
        place: "Open source",
        href: "https://github.com/Untrivial-ai/agent-orchestrator",
        passColor: ["#1b2a44", "#0d1117"],
        description: "merged 6+ of my PRs into its production AI orchestration desktop app for macOS Intel, which has real users.",
        items: ["6+ PRs merged into a production AI orchestration desktop app for macOS Intel, with real users."],
      },
      {
        name: "Prewery",
        logo: "assets/logos/prewery.png",
        logoBg: "#ffffff",
        role: "Software Development Intern",
        dates: "Jul – Aug 2026",
        place: "Janakpuri, New Delhi",
        href: "https://github.com/greyXytOP/newish-backend",
        passColor: ["#7c4dff", "#4b23c8"],
        description:
          "is where I built backend APIs in Express.js and MongoDB for a creator-monetization platform: Meta webhooks, Instagram DM automation and campaign budget guardrails.",
        items: [
          "Architected REST APIs in Express.js & MongoDB with real-time Meta Webhook ingestion, tag verification and automated DM dispatch via the Instagram Graph API.",
          "Implemented campaign budget guardrails, Multer upload pipelines and aggregated endpoints that cut mobile data-fetch overhead.",
        ],
      },
      {
        name: "Sansoftech",
        logo: "assets/logos/sansoftech.png",
        logoBg: "#ffffff",
        role: "Generative AI & Prompt Engineering Intern",
        dates: "Jun – Jul 2025",
        place: "6-week summer internship",
        passColor: ["#3a6df0", "#1d3fb8"],
        description: "is where I built a Python RAG assistant over company documents that cut retrieval time by roughly 30%.",
        items: [
          "Built a document Q&A assistant in Python using RAG that answers natural-language questions over company documents, cutting retrieval time by roughly 30%.",
          "Iterated on prompt templates to ground answers in retrieved context and cut hallucinations.",
        ],
      },
      {
        name: "E-Cell VIPS",
        icon: "ecell",
        role: "Head of Operations",
        dates: "2023 – 2026",
        place: "Entrepreneurship Cell, VIPS",
        passColor: ["#f0703a", "#c2410c"],
        description:
          "is where I ran operations as Head of Operations: event logistics, sponsorships, partnerships and execution teams of 50+ people.",
        items: [
          "Spearheaded operations, event logistics and institutional partnerships across flagship tech and entrepreneurship summits.",
          "Led corporate sponsorship outreach and coordinated cross-functional teams of 50+ members.",
        ],
      },
    ],
  },
  wins: {
    name: "Wins",
    items: [
      { name: "Hermes Buildathon", icon: "win-hermes", badge: "TOP 5", result: "Top 5 Finalist", description: "Top 5 Finalist." },
      {
        name: "OpenAI Codex Community Hackathon",
        icon: "win-codex",
        badge: "TOP 6",
        result: "Top 6 Finalist among all participating teams",
        description: "Top 6 Finalist among all participating teams.",
      },
      {
        name: "GUVI India AI Impact Buildathon",
        icon: "win-guvi",
        badge: "TOP 2%",
        result: "Top 2% Finalist of national submissions",
        description: "Top 2% Finalist of national submissions.",
      },
      { name: "Hacktivate", icon: "win-hacktivate", badge: "2ND", result: "2nd Place overall", description: "2nd Place overall." },
      {
        name: "FrostByte Hack",
        icon: "win-frostbyte",
        badge: "WIN",
        result: "Theme Winner ($100 prize)",
        description: "Theme Winner, with a $100 prize.",
      },
    ],
  },
  stack: {
    name: "Stack",
    items: [
      {
        name: "Technology",
        icon: "stack-tech",
        skills: ["Machine Learning", "Deep Learning", "Computer Vision", "NLP", "Generative AI", "Large Language Models", "RAG", "Agentic AI", "Prompt Engineering", "Knowledge Engineering"],
      },
      {
        name: "Data Science",
        icon: "stack-data",
        skills: ["Exploratory Data Analysis", "Data Analytics", "Data Quality", "Data Cleaning", "Data Preprocessing", "Feature Engineering", "Model Training", "Model Evaluation", "Model Validation", "Benchmarking", "Data Pipelines", "Data Visualization"],
      },
      {
        name: "Libraries & Frameworks",
        icon: "stack-libs",
        skills: ["PyTorch", "TensorFlow", "scikit-learn", "OpenCV", "YOLO", "Hugging Face", "LangChain", "LangGraph", "FastAPI", "Streamlit", "SQLAlchemy"],
      },
      { name: "Data & Automation", icon: "stack-db", skills: ["SQL", "SQLite", "Pinecone", "n8n"] },
      { name: "Development & Deployment", icon: "stack-deploy", skills: ["Python", "REST APIs", "Docker", "AWS", "Render"] },
    ],
  },
};

const QUOTE = {
  text: "The more I study, the more insatiable do I feel my genius for it to be.",
  author: "Ada Lovelace",
};
