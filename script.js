(() => {
  const stage = document.getElementById("stage");
  const phone = document.getElementById("phone");
  const phoneFrame = document.getElementById("phone-frame");
  const phoneScreen = document.getElementById("phone-screen");
  const sheets = [document.getElementById("sheet-a"), document.getElementById("sheet-b")];
  const contentArea = document.getElementById("content-area");
  const contentInner = document.getElementById("content-inner");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isStacked = () => window.matchMedia("(max-width: 920px)").matches;
  const canHover = () => window.matchMedia("(hover: hover)").matches;

  const SPRING = reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 40, mass: 1 };
  const SHEET_OFFSET = 660;
  const INTRO_KEY = "dv-intro-seen";

  // folder: id of the folder open on the Home Screen, or null.
  // sheet: the screen slid up over it: null | { type: "app", id } | { type: "item", folder, index }
  const state = { folder: null, sheet: null, active: 0, animating: false, run: 0 };

  const BACK_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  // ---------- Home Screen ----------

  function folderIcon(folder) {
    return `<span class="icon folder-icon">${folder.items
      .slice(0, 9)
      .map((item) => iconHtml(item))
      .join("")}</span>`;
  }

  function githubWidget() {
    return `<span class="widget-box gh-widget">${contributionGrid(8, "cg js-home-grid")}</span>`;
  }

  function musicWidget() {
    return `<span class="widget-box mu-widget">
      <img src="${MUSIC.cover}" alt="">
      <span class="mu-note"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4.5 2.2 10 1v6.6a1.7 1.7 0 1 1-1.2-1.6V3.1L5.7 3.8v4.9A1.7 1.7 0 1 1 4.5 7z" fill="currentColor"/></svg></span>
      <span class="mu-w-title">${escapeHtml(MUSIC.title)}</span>
      <span class="mu-w-artist">${MUSIC.artist}</span>
      <span class="mu-w-play"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1.2v9.6L10.5 6z" fill="currentColor"/></svg></span>
    </span>`;
  }

  function appButton(id, extra = "") {
    const app = APPS[id];
    return `<button class="hit ${extra}" data-app="${id}" aria-label="Open ${app.name}">${iconHtml(id)}${extra.includes("dock") ? "" : `<span class="label">${app.label}</span>`}</button>`;
  }

  function renderHome() {
    phoneScreen.innerHTML = `<div class="home" id="home">
      ${statusBar("light")}
      <div class="home-grid">
        <button class="hit widget" data-app="github" aria-label="Open GitHub">${githubWidget()}<span class="label">GitHub</span></button>
        <button class="hit widget" data-app="music" aria-label="Open ${escapeHtml(MUSIC.title)}">${musicWidget()}<span class="label">Music</span></button>
        ${Object.entries(FOLDERS)
          .map(([id, folder]) => `<button class="hit" data-folder="${id}" aria-label="Open the ${folder.name} folder">${folderIcon(folder)}<span class="label">${folder.name}</span></button>`)
          .join("")}
      </div>
      <div class="home-search"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="m11 11 3.5 3.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>Search</div>
      <div class="dock">${["photos", "maps", "notes"].map((id) => appButton(id, "dock-app")).join("")}</div>
    </div>`;
  }

  // An open folder, iOS style: the Home Screen blurs and the folder's apps sit on a glass panel.
  function folderOverlayHTML(id) {
    const folder = FOLDERS[id];
    return `<div class="folder-overlay" id="folder-overlay" data-folder="${id}">
      <div class="fo-title">${folder.name}</div>
      <div class="fo-panel">${folder.items
        .map((item, i) => `<button class="hit fo-app" data-index="${i}" aria-label="Open ${escapeHtml(item.name)}">${iconHtml(item)}<span class="label">${escapeHtml(item.label)}</span></button>`)
        .join("")}</div>
    </div>`;
  }

  function renderSocials() {
    const html = SOCIALS.map(
      (s) =>
        `<a href="${s.href}" class="social-icon" aria-label="${s.label}" title="${s.label}" ${s.href.startsWith("mailto:") ? "" : 'target="_blank" rel="noopener"'}><img src="${s.icon}" alt=""></a>`,
    ).join("");
    document.querySelectorAll(".js-socials").forEach((el) => (el.innerHTML = html));
  }

  // ---------- Right column ----------

  function homeContentHTML() {
    return `<div class="content-header"><h1>${INTRO.name}</h1></div>
      <div class="content-body">
        <div class="content-text">${INTRO.paragraphs.map((p) => `<p>${p.join("")}</p>`).join("")}</div>
        <div class="social-icons">${document.querySelector(".js-socials").innerHTML}</div>
      </div>`;
  }

  function appContentHTML(id) {
    const app = APPS[id];
    return `<div class="content-header"><h1>${escapeHtml(app.name)}</h1></div>
      <div class="content-body">
        <div class="app-content">${app.text.map((p) => `<p class="app-description">${p}</p>`).join("")}</div>
        <button class="back-button js-back" aria-label="Back to home">${BACK_ICON}</button>
      </div>`;
  }

  function folderItemText(folderId, item) {
    const name = `<span class="app-name">${escapeHtml(item.name)}</span>`;
    switch (folderId) {
      case "projects":
        return `${name} ${item.description} <a href="${item.href}" target="_blank" rel="noopener">Code ↗</a>`;
      case "work":
        return `${name} ${item.description}<span class="meta">${escapeHtml(item.role)} · ${item.dates}</span>`;
      case "wins":
        return `${name}: ${escapeHtml(item.description)}`;
      case "stack":
        return `${name}: ${item.skills.map(escapeHtml).join(", ")}.`;
      default:
        return name;
    }
  }

  function folderContentHTML(folderId) {
    const folder = FOLDERS[folderId];
    return `<div class="folder-container" data-folder="${folderId}">
      <div class="content-header"><h1>${folder.name}</h1><button class="back-button js-back" aria-label="Back">${BACK_ICON}</button></div>
      <div class="folder-scroll-area">${folder.items
        .map(
          (item, i) => `<div class="folder-app-item" role="button" tabindex="0" aria-pressed="false" data-index="${i}">
            ${iconHtml(item)}<p class="folder-app-description">${folderItemText(folderId, item)}</p>
          </div>`,
        )
        .join("")}</div>
      <div class="folder-top-mask"></div>
      <div class="folder-bottom-mask"></div>
    </div>`;
  }

  // Same choreography as the original: the old column blurs away while the new one fades in.
  function swapContent(html, { home = false } = {}) {
    contentArea.querySelectorAll(".content-clone").forEach((el) => el.remove());
    const wasFolder = !!contentInner.querySelector(".folder-container");
    const isFolder = html.includes("folder-container");

    if (!reducedMotion && !isStacked()) {
      const clone = contentInner.cloneNode(true);
      clone.removeAttribute("id");
      clone.classList.add("content-clone");
      Object.assign(clone.style, {
        position: "absolute",
        inset: "16px 0 6px",
        pointerEvents: "none",
      });
      contentArea.appendChild(clone);
      Motion.animate(clone, { opacity: [1, 0] }, { duration: wasFolder && isFolder ? 0.3 : 0.4, ease: "easeOut" }).finished.then(() => clone.remove());
    }

    contentInner.innerHTML = html;
    contentArea.classList.toggle("is-home", home);
    attachFolderList();

    if (reducedMotion || isStacked()) return;
    if (wasFolder && isFolder) {
      Motion.animate(contentInner, { opacity: [0, 1] }, { duration: 0.3, ease: "easeOut" });
    } else {
      Motion.animate(contentInner, { opacity: [0, 1], filter: ["blur(12px)", "blur(0px)"] }, { duration: 0.4, ease: "easeIn" }).finished.then(() => {
        contentInner.style.filter = "";
      });
    }
  }

  function revealContentOnPhones() {
    if (!isStacked()) return;
    requestAnimationFrame(() => {
      const top = contentArea.getBoundingClientRect().top;
      if (top > window.innerHeight - 160) {
        window.scrollBy({ top: top - window.innerHeight + 240, behavior: reducedMotion ? "auto" : "smooth" });
      }
    });
  }

  // ---------- Folder list ----------

  function attachFolderList() {
    const area = contentInner.querySelector(".folder-scroll-area");
    if (!area) return;
    const topMask = contentInner.querySelector(".folder-top-mask");
    const bottomMask = contentInner.querySelector(".folder-bottom-mask");

    const updateMasks = () => {
      const max = area.scrollHeight - area.clientHeight;
      const progress = max > 0 ? (max - area.scrollTop < 2 ? 1 : Math.min(area.scrollTop / max, 1)) : 1;
      topMask.style.height = `${48 + 152 * Math.min(progress / 0.1, 1)}px`;
      bottomMask.style.height = `${200 * (1 - Math.min(Math.max((progress - 0.9) / 0.1, 0), 1))}px`;
    };
    updateMasks();
    area.addEventListener("scroll", updateMasks, { passive: true });

    let hovered = null;
    area.addEventListener("mousemove", (e) => {
      const item = e.target.closest(".folder-app-item");
      if (item === hovered) return;
      hovered?.classList.remove("hover");
      hovered = item;
      item?.classList.add("hover");
    });
    area.addEventListener("mouseleave", () => {
      hovered?.classList.remove("hover");
      hovered = null;
    });

    area.querySelectorAll(".folder-app-item").forEach((item) => {
      const press = { type: "spring", stiffness: 300, damping: 24 };
      const down = () => !reducedMotion && Motion.animate(item, { scale: 0.98 }, press);
      const up = () => !reducedMotion && Motion.animate(item, { scale: 1 }, press);
      item.addEventListener("pointerdown", down);
      ["pointerup", "pointerleave", "pointercancel"].forEach((t) => item.addEventListener(t, up));
      item.addEventListener("click", () => openItem(Number(item.dataset.index)));
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openItem(Number(item.dataset.index));
        }
      });
    });
  }

  // ---------- Sheets ----------

  function mountScreen(sheet, html, afterOpen, ...args) {
    const run = ++state.run;
    sheet.innerHTML = html;
    sheet.setAttribute("aria-hidden", "false");
    if (afterOpen) afterOpen(sheet, () => run !== state.run || !sheet.classList.contains("is-open"), ...args);
  }

  function clearSheet(sheet) {
    sheet.classList.remove("is-open", "is-front");
    sheet.setAttribute("aria-hidden", "true");
    sheet.innerHTML = "";
    sheet.style.transform = "";
    sheet.style.opacity = "";
  }

  function presentSheet(html, afterOpen, ...args) {
    state.animating = true;
    const sheet = sheets[state.active];
    clearSheet(sheets[1 - state.active]);
    sheet.classList.add("is-open", "is-front");
    mountScreen(sheet, html, afterOpen, ...args);
    clearHover();
    Motion.animate(phoneScreen, { scale: [1, 0.92] }, SPRING);
    Motion.animate(sheet, { y: [SHEET_OFFSET, 0] }, SPRING).finished.then(() => {
      state.animating = false;
    });
  }

  function openApp(id) {
    if (state.animating || state.sheet || state.folder || !SCREENS[id]) return;
    state.sheet = { type: "app", id };
    presentSheet(SCREENS[id](), SCREENS[id].afterOpen);
    swapContent(appContentHTML(id));
    revealContentOnPhones();
  }

  function openFolder(id, button) {
    if (state.animating || state.sheet || state.folder || !FOLDERS[id]) return;
    state.folder = id;
    clearHover();
    phoneScreen.insertAdjacentHTML("beforeend", folderOverlayHTML(id));
    const overlay = document.getElementById("folder-overlay");
    const panel = overlay.querySelector(".fo-panel");

    // Grow the panel out of the folder icon that was tapped.
    const from = button.querySelector(".icon").getBoundingClientRect();
    const box = panel.getBoundingClientRect();
    const ratio = box.width / panel.offsetWidth || 1;
    panel.style.transformOrigin = `${(from.left + from.width / 2 - box.left) / ratio}px ${(from.top + from.height / 2 - box.top) / ratio}px`;

    if (!reducedMotion) {
      state.animating = true;
      Motion.animate(overlay, { opacity: [0, 1] }, { duration: 0.22, ease: "easeOut" });
      Motion.animate(panel, { scale: [0.2, 1] }, { type: "spring", stiffness: 380, damping: 32 }).finished.then(() => {
        state.animating = false;
      });
    }
    swapContent(folderContentHTML(id));
  }

  function closeFolder() {
    const overlay = document.getElementById("folder-overlay");
    if (!state.folder || state.sheet || state.animating || !overlay) return;
    state.folder = null;
    const done = () => {
      overlay.remove();
      pickupHover();
    };
    if (reducedMotion) {
      done();
    } else {
      state.animating = true;
      Motion.animate(overlay.querySelector(".fo-panel"), { scale: [1, 0.2] }, { duration: 0.22, ease: "easeIn" });
      Motion.animate(overlay, { opacity: [1, 0] }, { duration: 0.22, ease: "easeIn" }).finished.then(() => {
        done();
        state.animating = false;
      });
    }
    swapContent(homeContentHTML(), { home: true });
  }

  function markSelected(index) {
    contentInner.querySelectorAll(".folder-app-item").forEach((el, i) => {
      el.classList.toggle("selected", i === index);
      el.setAttribute("aria-pressed", String(i === index));
    });
  }

  // Open one app from the open folder: slide its page up, or crossfade if a page is showing.
  function openItem(index) {
    const folderId = state.folder;
    const item = folderId && FOLDERS[folderId].items[index];
    if (state.animating || !item) return;
    const render = FOLDER_SCREENS[folderId];
    markSelected(index);

    if (!state.sheet) {
      state.sheet = { type: "item", folder: folderId, index };
      presentSheet(render(item, index), render.afterOpen, item);
      revealPhoneOnPhones();
      return;
    }
    if (state.sheet.index === index) return;

    state.animating = true;
    state.sheet.index = index;
    const current = sheets[state.active];
    const next = sheets[1 - state.active];
    next.style.transform = "translateY(0px)";
    next.style.opacity = "0";
    next.classList.add("is-open", "is-front");
    current.classList.remove("is-front");
    mountScreen(next, render(item, index), render.afterOpen, item);
    state.active = 1 - state.active;
    revealPhoneOnPhones();

    Motion.animate(next, { opacity: [0, 1] }, { duration: reducedMotion ? 0 : 0.25, ease: "easeInOut" }).finished.then(() => {
      clearSheet(current);
      state.animating = false;
    });
  }

  function closeSheet() {
    if (!state.sheet || state.animating) return;
    state.animating = true;
    state.sheet = null;
    const sheet = sheets[state.active];
    clearSheet(sheets[1 - state.active]);
    Motion.animate(phoneScreen, { scale: [0.92, 1] }, SPRING);
    Motion.animate(sheet, { y: [0, SHEET_OFFSET] }, SPRING).finished.then(() => {
      clearSheet(sheet);
      phoneScreen.style.transform = "";
      state.animating = false;
      pickupHover();
    });
    if (state.folder) markSelected(-1);
    else swapContent(homeContentHTML(), { home: true });
  }

  // One level back: a page closes to its folder, a folder closes to the Home Screen.
  function goBack() {
    if (state.sheet) closeSheet();
    else if (state.folder) closeFolder();
  }

  // On phones the folder list sits under the phone; bring the phone back into view when a
  // list item opens a page.
  function revealPhoneOnPhones() {
    if (!isStacked()) return;
    const top = phone.getBoundingClientRect().top;
    if (top < -120) window.scrollBy({ top: top - 16, behavior: reducedMotion ? "auto" : "smooth" });
  }

  // ---------- Hover dimming (the non-hovered icons fade back) ----------

  let lastPointer = { x: -1, y: -1 };
  document.addEventListener("mousemove", (e) => (lastPointer = { x: e.clientX, y: e.clientY }), { passive: true });

  function applyHover(target) {
    const group = target.closest(".fo-panel, .home");
    clearHover(group);
    group.classList.add("is-hovering");
    group.querySelectorAll(".hit").forEach((el) => el.classList.toggle("is-hover", el === target));
  }

  function clearHover(except) {
    phoneScreen.querySelectorAll(".is-hovering").forEach((el) => el !== except && el.classList.remove("is-hovering"));
    phoneScreen.querySelectorAll(".is-hover").forEach((el) => el.classList.remove("is-hover"));
  }

  function pickupHover() {
    const el = document.elementFromPoint(lastPointer.x, lastPointer.y)?.closest(".hit");
    if (el && canHover() && phoneScreen.contains(el)) applyHover(el);
  }

  function shakePhone() {
    if (reducedMotion) return;
    Motion.animate(phone, { scale: [1, 1.01, 1.01, 1.01, 1.01, 1], rotate: [0, -0.5, 0.5, -0.5, 0.5, 0] }, { duration: 0.5, ease: "easeInOut" });
  }

  function attachEvents() {
    phoneScreen.addEventListener("click", (e) => {
      const hit = e.target.closest(".hit");
      if (hit?.classList.contains("fo-app")) return openItem(Number(hit.dataset.index));
      if (hit?.dataset.app) return openApp(hit.dataset.app);
      if (hit?.dataset.folder) return openFolder(hit.dataset.folder, hit);
      // Tapping the blurred area around an open folder closes it, as on iOS.
      if (e.target.closest(".folder-overlay")) closeFolder();
    });

    phoneScreen.addEventListener("mouseover", (e) => {
      if (!canHover() || state.sheet) return;
      const hit = e.target.closest(".hit");
      if (hit) applyHover(hit);
      else clearHover();
    });
    phoneScreen.addEventListener("mouseleave", clearHover);

    // Tapping an open screen goes back, unless the tap was on one of its links or buttons.
    sheets.forEach((sheet) =>
      sheet.addEventListener("click", (e) => {
        if (e.target.closest("a, button")) return;
        closeSheet();
      }),
    );

    phone.addEventListener("mouseenter", () => !reducedMotion && canHover() && Motion.animate(phone, { scale: 1.01 }, { duration: 0.15, ease: "easeOut" }));
    phone.addEventListener("mouseleave", () => !reducedMotion && canHover() && Motion.animate(phone, { scale: 1 }, { duration: 0.15, ease: "easeOut" }));

    document.addEventListener("click", (e) => {
      if (e.target.closest(".js-back")) goBack();
      if (e.target.closest(".tap-around-link")) {
        e.preventDefault();
        shakePhone();
      }
    });
    document.addEventListener(
      "mouseenter",
      (e) => {
        if (e.target.classList?.contains("tap-around-link")) shakePhone();
      },
      true,
    );

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") goBack();
    });

    window.addEventListener("resize", fitToViewport);
  }

  // Scale the whole layout down on short desktop windows instead of cropping the phone.
  function fitToViewport() {
    if (isStacked()) {
      document.documentElement.style.removeProperty("--fit");
      return;
    }
    const fit = Math.min(1, (window.innerHeight - 40) / 700, (window.innerWidth - 40) / 800);
    document.documentElement.style.setProperty("--fit", fit.toFixed(3));
  }

  // ---------- Clock ----------

  function tickClock() {
    const text = clockText();
    const night = isNightInDelhi();
    document.querySelectorAll(".js-clock").forEach((el) => (el.textContent = text));
    document.querySelectorAll(".js-moon").forEach((el) => (el.innerHTML = night ? MOON : ""));
    document.querySelectorAll(".js-delhi-time").forEach((el) => (el.textContent = nowInDelhi().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })));
  }

  // ---------- Intro ----------

  // Wrap every character in a hidden span so the paragraph is laid out once at full size and
  // typing never makes words jump between lines.
  function splitForTyping(el, html) {
    el.innerHTML = html;
    const chars = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const frag = document.createDocumentFragment();
      for (const ch of node.textContent) {
        const span = document.createElement("span");
        span.className = "tw-c";
        span.textContent = ch;
        frag.appendChild(span);
        chars.push(span);
      }
      node.replaceWith(frag);
    });
    return chars;
  }

  function introSegments() {
    const segments = [];
    const nameEl = document.getElementById("intro-name");
    segments.push({ chars: splitForTyping(nameEl, INTRO.name), pause: 400 });
    INTRO.paragraphs.forEach((parts, i) => {
      const el = document.getElementById(`intro-p${i + 1}`);
      const all = splitForTyping(el, parts.join(""));
      let offset = 0;
      parts.forEach((part, j) => {
        const length = new DOMParser().parseFromString(part, "text/html").body.textContent.length;
        segments.push({ chars: all.slice(offset, offset + length), pause: j === parts.length - 1 ? (i === INTRO.paragraphs.length - 1 ? 0 : 400) : 500 });
        offset += length;
      });
    });
    return segments;
  }

  function fillIntro() {
    document.getElementById("intro-name").textContent = INTRO.name;
    INTRO.paragraphs.forEach((parts, i) => (document.getElementById(`intro-p${i + 1}`).innerHTML = parts.join("")));
  }

  function rememberIntro() {
    try {
      localStorage.setItem(INTRO_KEY, "1");
    } catch {}
  }

  function hasSeenIntro() {
    try {
      return localStorage.getItem(INTRO_KEY) === "1";
    } catch {
      return false;
    }
  }

  async function runIntro() {
    const shift = -(phone.offsetWidth + 64) / 2;
    stage.classList.add("is-typing");
    contentArea.style.transform = `translateX(${shift}px)`;
    phone.style.transform = `translateY(${window.innerHeight / (parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--fit")) || 1)}px)`;

    let skipped = false;
    const skip = () => (skipped = true);
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });

    await document.fonts.ready;
    await wait(150);
    const segments = introSegments();
    for (const { chars, pause } of segments) {
      for (const span of chars) {
        if (skipped) break;
        span.classList.add("on");
        await wait(20);
      }
      if (!skipped && pause) await wait(pause);
    }
    segments.forEach(({ chars }) => chars.forEach((span) => span.classList.add("on")));
    document.querySelector(".intro-social-icons").classList.add("revealed");
    if (!skipped) await wait(800);

    rememberIntro();
    fillIntro();

    const spring = { type: "spring", stiffness: 40, damping: 10, mass: 1 };
    const startY = parseFloat(phone.style.transform.match(/-?[\d.]+/)[0]);
    contentArea.style.transform = "";
    phone.style.transform = "";
    Motion.animate(contentArea, { x: [shift, 0] }, spring).finished.then(() => (contentArea.style.transform = ""));
    await Motion.animate(phone, { y: [startY, 0], rotate: [-3, 0] }, spring).finished;
    phone.style.transform = "";
    stage.classList.remove("is-typing");
  }

  // ---------- Start ----------

  function start() {
    renderSocials();
    renderHome();
    attachEvents();
    fitToViewport();
    tickClock();
    setInterval(tickClock, 10000);

    refreshContributions().then((ok) => {
      if (!ok) return;
      const grid = document.querySelector(".js-home-grid");
      if (grid) grid.outerHTML = contributionGrid(8, "cg js-home-grid");
    });

    const forceIntro = new URLSearchParams(location.search).get("intro") === "1";
    if (!isStacked() && !reducedMotion && (forceIntro || !hasSeenIntro())) {
      runIntro();
    } else {
      fillIntro();
    }
  }

  start();
})();
