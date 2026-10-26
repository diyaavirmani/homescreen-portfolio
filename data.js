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

// Single apps: the two widgets and the dock. `text` is shown beside the phone when the app
// is open; each string is a paragraph.
const APPS = {
  github: {
    name: "GitHub",
    text: [
      "Most of what I build lives here, and all four projects in the Projects folder are public.",
      "Lately that's mostly open source: pull requests to Kestra, Nanocoder and Agent Orchestrator. The Open Source app in the Work folder lists them.",
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

// Pull requests Diya opened in other people's repositories, newest first:
// [title, repo, PR number, state, opened on]. The Open Source page refreshes this from the
// GitHub search API when it can; this snapshot (26 Oct 2026) is the fallback.
const OPEN_SOURCE = {
  query: `is:pr author:${PROFILE.githubUsername} -user:${PROFILE.githubUsername}`,
  prs: [
    ["fix(tools): refuse to edit a file that isn't valid UTF-8 (#1854)", "Nano-Collective/nanocoder", "1866", "open", "2026-10-20"],
    ["fix(mcp): don't let an MCP tool replace or remove a built-in (#1853)", "Nano-Collective/nanocoder", "1863", "open", "2026-10-20"],
    ["fix(issue-triage): retry a rate-limited run instead of failing the step", "Nano-Collective/.github", "9", "open", "2026-10-20"],
    ["fix(worker): fail a WorkingDirectory whose postExecuteTasks fails", "kestra-io/kestra", "21431", "open", "2026-10-19"],
    ["fix(s3): pass sessionToken to the DELETE and MOVE actions", "kestra-io/plugin-aws", "843", "open", "2026-10-19"],
    ["fix(bash): stop execute_bash commands before reporting them stopped or exiting (#1833)", "Nano-Collective/nanocoder", "1851", "merged", "2026-10-19"],
    ["fix(mongodb): fail Bulk on a line that isn't valid UTF-8", "kestra-io/plugin-mongodb", "182", "open", "2026-10-19"],
    ["fix(s3): retry objects whose trigger action fails instead of skipping them", "kestra-io/plugin-aws", "841", "open", "2026-10-19"],
    ["fix(plain): report a provider failure instead of losing the run (#1835)", "Nano-Collective/nanocoder", "1850", "merged", "2026-10-19"],
    ["fix(flows): concurrent flow saves losing edits and undoing a delete", "kestra-io/kestra", "21361", "merged", "2026-10-19"],
    ["fix(tools): compare a symlink's target in the read_file repeat-read check (#1834)", "Nano-Collective/nanocoder", "1845", "merged", "2026-10-19"],
    ["fix(sqs): store consumed messages before deleting them", "kestra-io/plugin-aws", "838", "open", "2026-10-19"],
    ["fix(browser): enable Touch ID passkeys for provisioned macOS builds", "OrchestratorInc/agent-orchestrator", "6887", "open", "2026-10-17"],
    ["fix(mongodb): insert documents whose last field is a nested _id", "kestra-io/plugin-mongodb", "168", "merged", "2026-10-16"],
    ["fix(mongodb): require a filter for Delete with DELETE_MANY", "kestra-io/plugin-mongodb", "167", "merged", "2026-10-16"],
    ["fix(plain): suggest only approval fixes that would change the result (#1740)", "Nano-Collective/nanocoder", "1799", "open", "2026-10-16"],
    ["fix(mongodb): keep the record's own id in Load with idKey _id", "kestra-io/plugin-mongodb", "164", "merged", "2026-10-16"],
    ["fix(mongodb): deliver tied watermark documents whose _id has another BSON type", "kestra-io/plugin-mongodb", "163", "merged", "2026-10-16"],
    ["fix(session): keep saved sessions' artifacts in the startup sweep when autosave is off", "Nano-Collective/nanocoder", "1786", "merged", "2026-10-15"],
    ["fix(mongodb): report what Load and Bulk applied when a write fails", "kestra-io/plugin-mongodb", "159", "merged", "2026-10-14"],
    ["test(core): stop LockServiceTest assuming it holds the only lock", "kestra-io/kestra", "20861", "merged", "2026-10-13"],
    ["test(mongodb): run flow tests against the Testcontainers database", "kestra-io/plugin-mongodb", "157", "merged", "2026-10-13"],
    ["feat(mongodb): add watermarkField to Trigger to deliver each document once", "kestra-io/plugin-mongodb", "156", "merged", "2026-10-13"],
    ["fix(mongodb): count Bulk upserts and stop reading after a failed write", "kestra-io/plugin-mongodb", "153", "merged", "2026-10-12"],
    ["fix(session): lock the session index across processes and reconcile it at startup", "Nano-Collective/nanocoder", "1732", "merged", "2026-10-12"],
    ["fix(mongodb): map every BSON type when reading documents", "kestra-io/plugin-mongodb", "152", "merged", "2026-10-12"],
    ["fix(worker): release a WorkingDirectory's last subtask result after its outputs are written", "kestra-io/kestra", "20766", "open", "2026-10-12"],
    ["fix(mongodb): stop in-flight operations when a task is killed", "kestra-io/plugin-mongodb", "151", "merged", "2026-10-12"],
    ["fix(acp): run each session's tools in the cwd from session/new", "Nano-Collective/nanocoder", "1731", "merged", "2026-10-12"],
    ["fix(desktop): back off when the daemon refuses the browser runtime link", "OrchestratorInc/agent-orchestrator", "6565", "merged", "2026-10-11"],
    ["fix(chat): keep orchestrator history and queued prompts on the project conversation", "OrchestratorInc/agent-orchestrator", "6562", "merged", "2026-10-11"],
    ["fix(tools): prompt before file_op deletes or overwrites in auto-accept", "Nano-Collective/nanocoder", "1703", "merged", "2026-10-11"],
    ["fix(mongodb): report non-ObjectId _id in InsertOne output", "kestra-io/plugin-mongodb", "145", "merged", "2026-10-09"],
    ["fix(executions): keep Flow-triggered executions out of the kill cascade", "kestra-io/kestra", "20562", "merged", "2026-10-08"],
    ["fix(chat): lazily restore idle controllers after daemon restart", "OrchestratorInc/agent-orchestrator", "6409", "open", "2026-10-08"],
    ["fix(systeminstall): let Cursor's first post-install version probe finish (#5887)", "OrchestratorInc/agent-orchestrator", "6289", "merged", "2026-10-05"],
    ["fix(mongodb): unwrap standard insertOne document in Bulk", "kestra-io/plugin-mongodb", "143", "merged", "2026-10-05"],
    ["fix(mongodb): preserve Extended JSON BSON types in Load", "kestra-io/plugin-mongodb", "142", "merged", "2026-10-05"],
    ["fix(chat): guard IME Enter and persist send-key preference", "OrchestratorInc/agent-orchestrator", "6242", "open", "2026-10-04"],
    ["feat: start interactive sessions in PR worktrees", "Nano-Collective/nanocoder", "1550", "merged", "2026-09-30"],
    ["test(#5038): add opt-in sidebar cache diagnostics", "OrchestratorInc/agent-orchestrator", "6053", "merged", "2026-09-29"],
    ["fix(tmux): re-stage bundled tmux when content changes without app ver…", "OrchestratorInc/agent-orchestrator", "5891", "open", "2026-09-25"],
    ["fix/#5757(chat): recover Claude ACP turns missing terminal events", "OrchestratorInc/agent-orchestrator", "5889", "open", "2026-09-25"],
    ["fix/5758", "OrchestratorInc/agent-orchestrator", "5799", "merged", "2026-09-23"],
    ["fix/5320", "OrchestratorInc/agent-orchestrator", "5798", "closed", "2026-09-23"]
  ],
};

// Folders: each item gets an icon, a line of text beside the phone and its own screen.
const FOLDERS = {
  projects: {
    name: "Projects",
    items: [
      {
        name: "Scam Bait AI",
        label: "Scam Bait",
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
        label: "FLOWITS",
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
        label: "Telecom",
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
        label: "Pancake",
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
        name: "Prewery",
        label: "Prewery",
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
        label: "Sansoftech",
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
        name: "Open Source",
        label: "Open Source",
        icon: "opensource",
        kind: "opensource",
        role: "Open Source Contributor",
        dates: "2026 – Present",
        description: "is where I contribute to other people's projects. Every pull request is listed, newest first, straight from GitHub.",
      },
    ],
  },
  wins: {
    name: "Wins",
    items: [
      { name: "Hermes Buildathon",
        label: "Hermes", icon: "win-hermes", badge: "TOP 5", result: "Top 5 Finalist", description: "Top 5 Finalist." },
      {
        name: "OpenAI Codex Community Hackathon",
        label: "Codex",
        icon: "win-codex",
        badge: "TOP 6",
        result: "Top 6 Finalist among all participating teams",
        description: "Top 6 Finalist among all participating teams.",
      },
      {
        name: "GUVI India AI Impact Buildathon",
        label: "GUVI",
        icon: "win-guvi",
        badge: "TOP 2%",
        result: "Top 2% Finalist of national submissions",
        description: "Top 2% Finalist of national submissions.",
      },
      { name: "Hacktivate",
        label: "Hacktivate", icon: "win-hacktivate", badge: "2ND", result: "2nd Place overall", description: "2nd Place overall." },
      {
        name: "FrostByte Hack",
        label: "FrostByte",
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
        label: "Technology",
        icon: "stack-tech",
        skills: ["Machine Learning", "Deep Learning", "Computer Vision", "NLP", "Generative AI", "Large Language Models", "RAG", "Agentic AI", "Prompt Engineering", "Knowledge Engineering"],
      },
      {
        name: "Data Science",
        label: "Data Science",
        icon: "stack-data",
        skills: ["Exploratory Data Analysis", "Data Analytics", "Data Quality", "Data Cleaning", "Data Preprocessing", "Feature Engineering", "Model Training", "Model Evaluation", "Model Validation", "Benchmarking", "Data Pipelines", "Data Visualization"],
      },
      {
        name: "Libraries & Frameworks",
        label: "Libraries",
        icon: "stack-libs",
        skills: ["PyTorch", "TensorFlow", "scikit-learn", "OpenCV", "YOLO", "Hugging Face", "LangChain", "LangGraph", "FastAPI", "Streamlit", "SQLAlchemy"],
      },
      { name: "Data & Automation",
        label: "Data Tools", icon: "stack-db", skills: ["SQL", "SQLite", "Pinecone", "n8n"] },
      { name: "Development & Deployment",
        label: "Deploy", icon: "stack-deploy", skills: ["Python", "REST APIs", "Docker", "AWS", "Render"] },
    ],
  },
};
