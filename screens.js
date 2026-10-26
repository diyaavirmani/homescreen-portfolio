// The screens that slide up inside the phone. Each renderer returns the markup for one
// 300×650 screen; script.js puts it in a sheet and runs `afterOpen` if the screen animates.

function nowInDelhi() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: PROFILE.timeZone }));
}

function clockText(date = nowInDelhi()) {
  const h = date.getHours() % 12 || 12;
  return `${h}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function isNightInDelhi() {
  const h = nowInDelhi().getHours();
  return h >= 22 || h < 6;
}

const MOON = `<svg class="sb-moon" viewBox="0 0 12 12" aria-hidden="true"><path d="M8.8 8.6A4.6 4.6 0 0 1 3.4 3.2 4.6 4.6 0 1 0 8.8 8.6z" fill="currentColor"/></svg>`;

function statusBar(theme = "light") {
  return `<div class="sb sb-${theme}">
    <span class="sb-time"><span class="js-clock">${clockText()}</span><span class="js-moon">${isNightInDelhi() ? MOON : ""}</span></span>
    <span class="sb-right">
      <svg viewBox="0 0 18 12" aria-hidden="true"><rect x="0" y="8" width="3" height="4" rx=".8" fill="currentColor"/><rect x="5" y="5.5" width="3" height="6.5" rx=".8" fill="currentColor"/><rect x="10" y="3" width="3" height="9" rx=".8" fill="currentColor"/><rect x="15" y="0" width="3" height="12" rx=".8" fill="currentColor"/></svg>
      <svg viewBox="0 0 16 12" aria-hidden="true"><path d="M8 2.6c2.4 0 4.6.9 6.2 2.5l1.2-1.2A10.4 10.4 0 0 0 8 .9 10.4 10.4 0 0 0 .6 3.9l1.2 1.2A8.7 8.7 0 0 1 8 2.6zm0 3.4c1.5 0 2.8.6 3.8 1.5L13 6.3A7 7 0 0 0 8 4.3a7 7 0 0 0-5 2l1.2 1.2c1-.9 2.3-1.5 3.8-1.5zm0 3.3c.6 0 1.1.2 1.5.6L8 11.4 6.5 9.9c.4-.4.9-.6 1.5-.6z" fill="currentColor"/></svg>
      <span class="sb-battery"><span></span></span>
    </span>
  </div>`;
}

const CHEVRON = `<svg viewBox="0 0 10 18" aria-hidden="true"><path d="M8.5 1.5 1.5 9l7 7.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function escapeHtml(text) {
  return String(text).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

// ---------- Contributions ----------

let contributions = decodeSnapshot(CONTRIBUTIONS_SNAPSHOT);

function decodeSnapshot({ start, total, levels }) {
  const first = new Date(`${start}T00:00:00`);
  const days = [...levels].map((level, i) => {
    const date = new Date(first);
    date.setDate(first.getDate() + i);
    return { date, level: Number(level) };
  });
  return { total, days };
}

// Live data from a public contributions API; the snapshot stays if it fails.
async function refreshContributions() {
  try {
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${PROFILE.githubUsername}?y=last`);
    if (!response.ok) return false;
    const data = await response.json();
    if (!Array.isArray(data.contributions) || !data.contributions.length) return false;
    contributions = {
      total: data.total?.lastYear ?? contributions.total,
      days: data.contributions.map((d) => ({ date: new Date(`${d.date}T00:00:00`), level: d.level })),
    };
    return true;
  } catch {
    return false;
  }
}

// Columns of 7 (Sunday first) for the last `weeks` weeks.
function contributionWeeks(weeks) {
  const days = contributions.days;
  const last = days[days.length - 1];
  const lastWeekStart = days.length - 1 - last.date.getDay();
  const startIndex = lastWeekStart - (weeks - 1) * 7;
  const columns = [];
  for (let w = 0; w < weeks; w++) {
    const column = [];
    for (let d = 0; d < 7; d++) {
      const i = startIndex + w * 7 + d;
      column.push(i >= 0 && i < days.length ? days[i].level : i >= days.length ? -1 : 0);
    }
    columns.push(column);
  }
  return columns;
}

function contributionGrid(weeks, className) {
  return `<div class="${className}">${contributionWeeks(weeks)
    .map((col) => `<div class="cg-col">${col.map((l) => `<i class="cg-l${l}"></i>`).join("")}</div>`)
    .join("")}</div>`;
}

const TAB_ICONS = {
  Home: "M4 11 12 4l8 7v9h-5v-6H9v6H4z",
  Network: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 4.5a3.2 3.2 0 0 1 0 6.2M18 14.3c2 .8 3.4 2.9 3.4 5.7",
  Post: "M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM12 8v8M8 12h8",
  Alerts: "M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0",
  Jobs: "M4 8h16v11H4zM9 8V5.5h6V8M4 13h16",
  Today: "M5 4h14v16H5zM8 8h8M8 12h8M8 16h5",
  Games: "M7.5 8h9a4.5 4.5 0 0 1 0 9l-2-2h-5l-2 2a4.5 4.5 0 0 1 0-9zM8.5 10.5v3M7 12h3M15.5 11.5h.01M17 13.5h.01",
  Apps: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  Arcade: "M12 9v5M7 14h10l2 6H5zM12 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6z",
  Search: "M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5 20 20",
};

function tabBar(className, tabs, active) {
  return `<div class="tabs ${className}">${tabs
    .map(
      (t) =>
        `<span class="${t === active ? "on" : ""}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${TAB_ICONS[t]}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>${t}</span>`,
    )
    .join("")}</div>`;
}

// ---------- Single apps ----------

const SCREENS = {};

SCREENS.github = () => {
  const repos = FOLDERS.projects.items;
  const languages = { "Scam Bait AI": "Python", FLOWITS: "Python", "Telecom Standards Assistant": "Python", Pancake: "TypeScript" };
  return `<div class="scr scr-github">
    ${statusBar("light")}
    <div class="gh-nav"><span class="gh-back">${CHEVRON}</span><span>${PROFILE.githubUsername}</span><span class="gh-dots">•••</span></div>
    <div class="gh-profile">
      <img src="assets/img/portrait.webp" alt="" class="gh-avatar">
      <div><div class="gh-name">${PROFILE.name}</div><div class="gh-user">${PROFILE.githubUsername}</div></div>
    </div>
    <p class="gh-bio">I'm a developer based in New Delhi. I like to work on agentic systems, RAG pipelines, and study core ML/DL architectures.</p>
    <a class="gh-follow" href="${PROFILE.github}" target="_blank" rel="noopener">Follow</a>
    <div class="gh-card">
      <div class="gh-card-title"><b class="js-contrib-total">${contributions.total}</b> contributions in the last year</div>
      ${contributionGrid(24, "cg cg-dark js-contrib-grid")}
    </div>
    <div class="gh-section">Popular</div>
    <div class="gh-repos">${repos
      .map(
        (r) => `<a class="gh-repo" href="${r.href}" target="_blank" rel="noopener">
          <div class="gh-repo-name">${r.href.split("/").pop()}</div>
          <div class="gh-repo-lang"><i class="${languages[r.name] === "TypeScript" ? "ts" : "py"}"></i>${languages[r.name]}</div>
        </a>`,
      )
      .join("")}</div>
  </div>`;
};

SCREENS.music = () => `<div class="scr scr-music">
    <div class="mu-bg" style="background-image:url(${MUSIC.cover})"></div>
    ${statusBar("light")}
    <div class="mu-grabber"></div>
    <img class="mu-cover" src="${MUSIC.cover}" alt="${escapeHtml(MUSIC.album)} cover">
    <div class="mu-meta">
      <div><div class="mu-title">${escapeHtml(MUSIC.title)}</div><div class="mu-artist">${MUSIC.artist}</div></div>
      <span class="mu-more">•••</span>
    </div>
    <div class="mu-progress"><span class="js-mu-bar"></span></div>
    <div class="mu-times"><span class="js-mu-elapsed">0:00</span><span class="js-mu-left">-3:51</span></div>
    <div class="mu-controls">
      <svg viewBox="0 0 40 24" aria-hidden="true"><path d="M19 3v18L6 12zM34 3v18L21 12z" fill="currentColor"/></svg>
      <a href="${MUSIC.link}" target="_blank" rel="noopener" class="mu-play" aria-label="Play ${escapeHtml(MUSIC.title)} on YouTube">
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="5" height="18" rx="1.2" fill="currentColor"/><rect x="14" y="3" width="5" height="18" rx="1.2" fill="currentColor"/></svg>
      </a>
      <svg viewBox="0 0 40 24" aria-hidden="true"><path d="M6 3v18l13-9zM21 3v18l13-9z" fill="currentColor"/></svg>
    </div>
    <div class="mu-volume"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6h3l4-3v10l-4-3H2z" fill="currentColor"/></svg><span><i></i></span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1 6h3l4-3v10l-4-3H1z" fill="currentColor"/><path d="M10.5 5a4 4 0 0 1 0 6M12.5 3a7 7 0 0 1 0 10" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg></div>
    <a class="mu-yt" href="${MUSIC.link}" target="_blank" rel="noopener">Listen on YouTube</a>
  </div>`;

SCREENS.photos = () => `<div class="scr scr-photos">
    ${statusBar("light")}
    <div class="ph-nav"><span class="ph-back">${CHEVRON}</span><div class="ph-title"><b>New Delhi</b><span>Watercolour portrait</span></div><span class="ph-edit">Edit</span></div>
    <div class="ph-stage"><img src="assets/img/portrait.webp" alt="Watercolour portrait of Diya Virmani"></div>
    <div class="ph-strip"><img src="assets/img/portrait.webp" alt=""></div>
    <div class="ph-tools">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7.5 7.5 12 3l4.5 4.5M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-8-4.6-8-10.6A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 8 2.5c0 6-8 10.6-8 10.6z" fill="currentColor"/></svg>
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 11v5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="7.8" r="1.2" fill="currentColor"/></svg>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
  </div>`;

SCREENS.maps = () => `<div class="scr scr-maps">
    <svg class="mp-map" viewBox="0 0 300 650" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="300" height="650" fill="#f2efe8"/>
      <path d="M0 70h96l14 92H0zM176 300l80-24 22 86-88 18z" fill="#cde8bd"/>
      <path d="M232 0c-10 80 30 120 14 210s-46 140-20 250 54 130 36 190h48V0z" fill="#a9d3f5"/>
      <g fill="none" stroke="#fff" stroke-linecap="round">
        <path d="M-10 250 310 180M-10 420 310 360M60-10l40 670M150-10l-24 670M-10 540 310 520M20 120l260 90" stroke-width="7"/>
        <path d="M-10 330 310 300M110 40l60 560M-10 170 200 120" stroke-width="4"/>
      </g>
      <rect x="40" y="150" width="190" height="300" rx="70" fill="none" stroke="#ffd36b" stroke-width="7"/>
      <path d="M-10 610 310 470" fill="none" stroke="#ffd36b" stroke-width="6"/>
      <g font-family="InterVariable, Inter, sans-serif" font-size="9" fill="#8d8a80" font-weight="600">
        <text x="250" y="560" fill="#5a8bbd" transform="rotate(-80 250 560)">YAMUNA</text><text x="92" y="318" font-size="11" letter-spacing="3" fill="#a9a59a">NEW DELHI</text>
      </g>
    </svg>
    ${statusBar("dark")}
    <div class="mp-pin" style="left:96px;top:164px"><span>🎓</span></div>
    <div class="mp-pin-label" style="left:68px;top:202px">VIPS-TC</div>
    <div class="mp-card">
      <div class="mp-grab"></div>
      <div class="mp-title">New Delhi</div>
      <div class="mp-sub">India · <span class="js-delhi-time">${nowInDelhi().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</span> IST</div>
      <div class="mp-row">
        <span class="mp-row-icon">🎓</span>
        <div><b>${PROFILE.education.short}</b><span>B.Tech AI & Data Science · ${PROFILE.education.dates}</span></div>
      </div>
      <div class="mp-search"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m11 11 3.5 3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>Search Maps</div>
    </div>
  </div>`;

SCREENS.music.afterOpen = (root, isCancelled) => {
  const duration = 231;
  const bar = root.querySelector(".js-mu-bar");
  const elapsedEl = root.querySelector(".js-mu-elapsed");
  const leftEl = root.querySelector(".js-mu-left");
  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const started = performance.now() - 42000;
  const tick = () => {
    if (isCancelled()) return;
    const t = ((performance.now() - started) / 1000) % duration;
    bar.style.width = `${(t / duration) * 100}%`;
    elapsedEl.textContent = fmt(t);
    leftEl.textContent = `-${fmt(duration - t)}`;
    setTimeout(tick, 500);
  };
  tick();
};

SCREENS.terminal = () => `<div class="scr scr-terminal">
    ${statusBar("light")}
    <div class="tm-title">diya@delhi: ~</div>
    <pre class="tm-body js-term"></pre>
  </div>`;

const TERMINAL_SCRIPT = [
  { cmd: "whoami" },
  { out: `${PROFILE.name}, developer` },
  { cmd: "cat now.txt" },
  { out: "learning: backend engineering\nhow:      from first principles" },
  { cmd: "cat quote.txt" },
  { out: `"${QUOTE.text}"\n  — ${QUOTE.author}` },
  { cmd: "" },
];

SCREENS.terminal.afterOpen = (root, isCancelled) => {
  const el = root.querySelector(".js-term");
  const prompt = '<span class="tm-prompt">diya@delhi ~ %</span> ';
  let html = "";
  const render = (cursor = true) => (el.innerHTML = html + (cursor ? '<span class="tm-cursor"></span>' : ""));
  (async () => {
    for (const step of TERMINAL_SCRIPT) {
      if (isCancelled()) return;
      if ("cmd" in step) {
        html += prompt;
        render();
        await wait(350);
        for (const ch of step.cmd) {
          if (isCancelled()) return;
          html += escapeHtml(ch);
          render();
          await wait(45 + Math.random() * 40);
        }
        await wait(250);
        if (step.cmd) html += "\n";
      } else {
        html += `<span class="tm-out">${escapeHtml(step.out)}</span>\n`;
        render();
        await wait(200);
      }
    }
    render();
  })();
};

SCREENS.resume = () => `<div class="scr scr-resume">
    ${statusBar("dark")}
    <div class="rs-nav"><span class="rs-done">Done</span><b>diya-resume.pdf</b><span class="rs-share"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7.5 7.5 12 3l4.5 4.5M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>
    <a class="rs-page" href="${PROFILE.resume}" target="_blank" rel="noopener"><img src="assets/img/resume-preview.jpg" alt="First page of Diya Virmani's résumé"></a>
    <div class="rs-actions">
      <a href="${PROFILE.resume}" target="_blank" rel="noopener" class="rs-btn rs-btn-primary">Open PDF</a>
      <a href="${PROFILE.resume}" download="Diya-Virmani-Resume.pdf" class="rs-btn">Download</a>
    </div>
    <div class="rs-pages">Page 1 of 1</div>
  </div>`;

SCREENS.mail = () => {
  const rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  return `<div class="scr scr-mail">
    ${statusBar("dark")}
    <div class="ml-top"><span class="ml-cancel">Cancel</span>
      <a class="ml-send" href="mailto:${PROFILE.email}?subject=${encodeURIComponent("Hi Diya")}" aria-label="Send an email to Diya"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
    </div>
    <h2 class="ml-title">New Message</h2>
    <div class="ml-field"><span>To:</span><a class="ml-chip" href="mailto:${PROFILE.email}">${PROFILE.name}</a></div>
    <div class="ml-field"><span>Cc/Bcc, From:</span><em>you@example.com</em></div>
    <div class="ml-field"><span>Subject:</span><b>Hi Diya</b></div>
    <div class="ml-body">Hi Diya,<br><br>I saw your portfolio and<span class="ml-caret"></span></div>
    <div class="ml-addr">${PROFILE.email}</div>
    <div class="kb">
      ${rows.map((r, i) => `<div class="kb-row kb-row-${i}">${i === 2 ? '<b class="kb-k kb-wide">⇧</b>' : ""}${[...r].map((k) => `<b class="kb-k">${k}</b>`).join("")}${i === 2 ? '<b class="kb-k kb-wide">⌫</b>' : ""}</div>`).join("")}
      <div class="kb-row"><b class="kb-k kb-wide">123</b><b class="kb-k kb-space">space</b><b class="kb-k kb-wide">return</b></div>
    </div>
  </div>`;
};

SCREENS.linkedin = () => `<div class="scr scr-linkedin">
    ${statusBar("dark")}
    <div class="li-top"><img src="assets/img/portrait.webp" alt=""><span class="li-search"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m11 11 3.5 3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>${PROFILE.name}</span></div>
    <div class="li-banner"></div>
    <div class="li-card">
      <img src="assets/img/portrait.webp" alt="" class="li-avatar">
      <div class="li-name">${PROFILE.name}</div>
      <div class="li-headline">${PROFILE.headline}</div>
      <div class="li-meta">${PROFILE.location} · <span>Contact info</span></div>
      <div class="li-school"><span>V</span>${PROFILE.education.short} · B.Tech AI & Data Science</div>
      <div class="li-buttons"><a href="${PROFILE.linkedin}" target="_blank" rel="noopener" class="li-btn li-btn-primary">Connect</a><a href="${PROFILE.linkedin}" target="_blank" rel="noopener" class="li-btn">View profile</a></div>
    </div>
    <div class="li-section">
      <div class="li-section-title">Experience</div>
      ${FOLDERS.work.items
        .slice(0, 3)
        .map((w) => `<div class="li-exp">${iconHtml(w, "li-exp-logo")}<div><b>${escapeHtml(w.role)}</b><span>${escapeHtml(w.name)}</span><em>${w.dates}</em></div></div>`)
        .join("")}
    </div>
    ${tabBar("li-tabs", ["Home", "Network", "Post", "Alerts", "Jobs"], "Home")}
  </div>`;

SCREENS.notes = () => {
  const today = nowInDelhi().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const hobbies = ["The gym", "Books", "Fictional worlds", "Hobbies I'm picking back up"];
  return `<div class="scr scr-notes">
    ${statusBar("dark")}
    <div class="nt-nav"><span class="nt-back">${CHEVRON}Notes</span><span class="nt-icons">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7.5 7.5 12 3l4.5 4.5M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="8" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="16" cy="12" r="1.2" fill="currentColor"/></svg>
    </span></div>
    <div class="nt-date">${today}</div>
    <h2 class="nt-title">The messy middle</h2>
    <p>${APPS.notes.text.join(" ")}</p>
    <h3>Away from the screen</h3>
    <ul class="nt-list">${hobbies.map((h, i) => `<li class="${i < 3 ? "done" : ""}"><i></i>${h}</li>`).join("")}</ul>
  </div>`;
};

// ---------- Folder items ----------

const FOLDER_SCREENS = {};

FOLDER_SCREENS.projects = (p) => `<div class="scr scr-store">
    ${statusBar("dark")}
    <div class="st-nav">${CHEVRON}<span>Projects</span></div>
    <div class="st-head">
      ${iconHtml(p, "st-icon")}
      <div class="st-head-text">
        <div class="st-name">${escapeHtml(p.name)}</div>
        <div class="st-area">${escapeHtml(p.area)}</div>
        <div class="st-get"><a href="${p.href}" target="_blank" rel="noopener" class="st-view">VIEW</a>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7.5 7.5 12 3l4.5 4.5M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>
    </div>
    <div class="st-strip">${p.strip
      .map(([label, value, sub]) => `<div><span>${escapeHtml(label)}</span><b>${escapeHtml(value)}</b><em>${escapeHtml(sub)}</em></div>`)
      .join("")}</div>
    <div class="st-section">Highlights</div>
    <ul class="st-list">${p.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul>
    <div class="st-section">Built with</div>
    <div class="st-chips">${p.stack.map((s) => `<span>${escapeHtml(s)}</span>`).join("")}</div>
    ${tabBar("st-tabs", ["Today", "Games", "Apps", "Arcade", "Search"], "Apps")}
  </div>`;

FOLDER_SCREENS.work = (w) => {
  const link = w.href ? `<a class="wl-link" href="${w.href}" target="_blank" rel="noopener">${w.href.replace("https://", "")}</a>` : "";
  return `<div class="scr scr-wallet">
    ${statusBar("light")}
    <div class="wl-nav"><span>Done</span><span class="wl-dots">•••</span></div>
    <div class="wl-pass" style="background:linear-gradient(160deg, ${w.passColor[0]}, ${w.passColor[1]})">
      <div class="wl-pass-top">${iconHtml(w, "wl-logo")}<b>${escapeHtml(w.name)}</b></div>
      <div class="wl-field wl-role"><span>ROLE</span>${escapeHtml(w.role)}</div>
      <div class="wl-fields"><div class="wl-field"><span>DATES</span>${escapeHtml(w.dates)}</div><div class="wl-field"><span>WHERE</span>${escapeHtml(w.place)}</div></div>
      <div class="wl-cutout"></div>
      <div class="wl-pass-bottom">${link || `<span class="wl-link">${escapeHtml(w.name)}</span>`}</div>
    </div>
    <div class="wl-details">
      <div class="wl-details-title">Details</div>
      ${w.items.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}
    </div>
  </div>`;
};

FOLDER_SCREENS.wins = (w, index) => {
  const all = FOLDERS.wins.items;
  return `<div class="scr scr-wins">
    ${statusBar("light")}
    <div class="wn-top">Achievements</div>
    <div class="wn-confetti">${Array.from({ length: 18 }, (_, i) => `<i style="--i:${i}"></i>`).join("")}</div>
    <div class="wn-medal">${iconHtml(w, "wn-icon")}</div>
    <div class="wn-kicker">ACHIEVEMENT UNLOCKED</div>
    <div class="wn-name">${escapeHtml(w.name)}</div>
    <div class="wn-result">${escapeHtml(w.result)}</div>
    <div class="wn-progress"><div><span>${all.length} of ${all.length} unlocked</span></div><i></i></div>
    <div class="wn-list">${all
      .map((x, i) => `<div class="${i === index ? "on" : ""}">${iconHtml(x, "wn-mini")}<span>${escapeHtml(x.name)}</span><em>${escapeHtml(x.badge)}</em></div>`)
      .join("")}</div>
  </div>`;
};

const SETTINGS_COLORS = ["#ff3b30", "#ff9500", "#ffcc00", "#34c759", "#00c7be", "#30b0c7", "#32ade6", "#007aff", "#5856d6", "#af52de", "#ff2d55", "#a2845e"];

FOLDER_SCREENS.stack = (s) => `<div class="scr scr-settings ${s.skills.length > 10 ? "is-compact" : ""}">
    ${statusBar("dark")}
    <div class="se-nav">${CHEVRON}<span>Stack</span></div>
    <h2 class="se-title">${escapeHtml(s.name)}</h2>
    <div class="se-group">${s.skills
      .map(
        (skill, i) =>
          `<div class="se-row"><span class="se-dot" style="background:${SETTINGS_COLORS[i % SETTINGS_COLORS.length]}">${escapeHtml(skill[0])}</span><span class="se-label">${escapeHtml(skill)}</span>${CHEVRON.replace('d="M8.5 1.5 1.5 9l7 7.5"', 'd="M1.5 1.5 8.5 9l-7 7.5"')}</div>`,
      )
      .join("")}</div>
  </div>`;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
