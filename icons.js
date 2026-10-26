// App icons drawn as SVG on a 60×60 grid. Each call returns a fresh string with its own
// gradient ids, so the same icon can appear on the home screen, in a folder and beside the
// phone at once.

let iconUid = 0;

function iconSvg(colors, glyph, { flat = false } = {}) {
  const id = `ig${iconUid++}`;
  const [top, bottom = top] = colors;
  const fill = flat ? top : `url(#${id})`;
  return `<svg viewBox="0 0 60 60" class="icon-svg" aria-hidden="true" focusable="false">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>
    <rect width="60" height="60" fill="${fill}"/>${glyph.replaceAll("$ID", id)}</svg>`;
}

const S = 'stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" fill="none"';

function medalGlyph(text, metal = "gold") {
  const [hi, lo] = metal === "silver" ? ["#f4f6fb", "#b8c0d0"] : ["#ffe189", "#f0a800"];
  const size = text.length > 2 ? 9.5 : text.length > 1 ? 12 : 15;
  return `<path d="M20 7h8l6 15h-8z" fill="#ff5a5f"/><path d="M40 7h-8l-6 15h8z" fill="#3b82f6"/>
    <defs><linearGradient id="$ID-m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${hi}"/><stop offset="1" stop-color="${lo}"/></linearGradient></defs>
    <circle cx="30" cy="36" r="15" fill="url(#$ID-m)" stroke="#fff" stroke-opacity=".85" stroke-width="2"/>
    <text x="30" y="${36 + size * 0.36}" text-anchor="middle" font-family="InterVariable, Inter, sans-serif" font-weight="800" font-size="${size}" fill="${metal === "silver" ? "#4b5568" : "#8a5a00"}">${text}</text>`;
}

const ICONS = {
  scambait: () =>
    iconSvg(["#ff7a59", "#e5304f"], `<circle cx="34" cy="11" r="3.6" ${S}/><path d="M34 15v21a9 9 0 0 1-18 0v-7l5.5 5" ${S}/>`),
  flowits: () =>
    iconSvg(
      ["#3d4452", "#14171d"],
      `<rect x="20.5" y="8" width="19" height="44" rx="9.5" fill="#0a0c0f" stroke="#59606e" stroke-width="1.6"/>
       <circle cx="30" cy="18.5" r="5.2" fill="#ff453a"/><circle cx="30" cy="30" r="5.2" fill="#ffd60a"/><circle cx="30" cy="41.5" r="5.2" fill="#30d158"/>`,
    ),
  telecom: () =>
    iconSvg(
      ["#5b95ff", "#1d4ed8"],
      `<circle cx="30" cy="23" r="3.6" fill="#fff"/>
       <path d="M22.5 16a10 10 0 0 0 0 14M37.5 16a10 10 0 0 1 0 14M16.5 11a17 17 0 0 0 0 24M43.5 11a17 17 0 0 1 0 24M30 28l-6.5 22M30 28l6.5 22M25.4 43h9.2" ${S}/>`,
    ),
  pancake: () =>
    iconSvg(
      ["#ffa8bf", "#ee5d8a"],
      `<rect x="8" y="44" width="44" height="4.5" rx="2.25" fill="#fff"/>
       <rect x="11" y="36" width="38" height="9" rx="4.5" fill="#c9792a"/><rect x="12.5" y="28" width="35" height="9" rx="4.5" fill="#e0953a"/><rect x="14" y="20" width="32" height="9" rx="4.5" fill="#f2b04e"/>
       <path d="M15 22.5c0-1.5 1-2.5 2.5-2.5h25c1.5 0 2.5 1 2.5 2.5 0 1.2-.8 1.8-1.6 2v4.5a1.4 1.4 0 0 1-2.8 0V25H35v6a1.5 1.5 0 0 1-3 0v-6h-9v3a1.4 1.4 0 0 1-2.8 0v-3h-2.6c-1.5 0-2.6-1-2.6-2.5z" fill="#8a4b12" opacity=".92"/>
       <rect x="25.5" y="14.5" width="9" height="6.5" rx="1.6" fill="#fff4bf"/>`,
    ),
  ecell: () =>
    iconSvg(
      ["#ff9b5c", "#e2530d"],
      `<path d="M30 9c7.5 5 10.5 13.5 9.2 22.5L35.5 38h-11l-3.7-6.5C19.5 22.5 22.5 14 30 9z" fill="#fff"/>
       <circle cx="30" cy="23" r="3.8" fill="#e2530d"/><path d="M21.6 32.5 16 41l7.5-1.2M38.4 32.5 44 41l-7.5-1.2" fill="#fff"/>
       <path d="M25.5 40.5c0 4.5 2 7.5 4.5 10 2.5-2.5 4.5-5.5 4.5-10z" fill="#ffd60a"/>`,
    ),
  "win-hermes": () => iconSvg(["#ff9445", "#e0502a"], medalGlyph("5")),
  "win-codex": () => iconSvg(["#33343a", "#0b0b0d"], medalGlyph("6")),
  "win-guvi": () => iconSvg(["#3ad16a", "#1d8a3c"], medalGlyph("2%")),
  "win-hacktivate": () => iconSvg(["#9aa4ff", "#5a5fe0"], medalGlyph("2", "silver")),
  "win-frostbyte": () => iconSvg(["#86dcff", "#2596de"], medalGlyph("★")),
  "stack-tech": () =>
    iconSvg(
      ["#c88cff", "#7c3aed"],
      `<path d="M27 11c1.7 8.7 4.8 11.8 13.5 13.5C31.8 26.2 28.7 29.3 27 38c-1.7-8.7-4.8-11.8-13.5-13.5C22.2 22.8 25.3 19.7 27 11z" fill="#fff"/>
       <path d="M42 34c.9 4.4 2.5 6 6.9 6.9-4.4.9-6 2.5-6.9 6.9-.9-4.4-2.5-6-6.9-6.9 4.4-.9 6-2.5 6.9-6.9z" fill="#fff" opacity=".85"/>`,
    ),
  "stack-data": () =>
    iconSvg(
      ["#34dcc5", "#0e8f84"],
      `<rect x="14" y="32" width="8" height="15" rx="2.5" fill="#fff"/><rect x="26" y="22" width="8" height="25" rx="2.5" fill="#fff"/><rect x="38" y="13" width="8" height="34" rx="2.5" fill="#fff"/>`,
    ),
  "stack-libs": () =>
    iconSvg(["#ffa057", "#e8590c"], `<path d="M30 12l18 9-18 9-18-9z" fill="#fff"/><path d="M12 29.5l18 9 18-9M12 38l18 9 18-9" ${S}/>`),
  "stack-db": () =>
    iconSvg(
      ["#8f97ff", "#4f46e5"],
      `<ellipse cx="30" cy="17" rx="14" ry="5.5" fill="#fff"/><path d="M16 17v26c0 3 6.3 5.5 14 5.5s14-2.5 14-5.5V17M16 26c0 3 6.3 5.5 14 5.5s14-2.5 14-5.5M16 34.5c0 3 6.3 5.5 14 5.5s14-2.5 14-5.5" ${S}/>`,
    ),
  "stack-deploy": () =>
    iconSvg(
      ["#6aacff", "#2160e8"],
      `<path d="M19.5 44h22a9.5 9.5 0 0 0 1-18.9A12.5 12.5 0 0 0 18.8 28 8 8 0 0 0 19.5 44z" fill="#fff"/>
       <path d="M30.5 39V29m-5 5 5-5 5 5" stroke="#2160e8" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    ),
  photos: () => {
    const colors = ["#ff9f0a", "#ffd60a", "#8fd14f", "#30c48d", "#3db8ff", "#5e6cff", "#bf5af2", "#ff4f7b"];
    const petals = colors
      .map((c, i) => `<ellipse cx="30" cy="18.5" rx="6.2" ry="10.5" fill="${c}" opacity=".82" transform="rotate(${i * 45} 30 30)" style="mix-blend-mode:multiply"/>`)
      .join("");
    return iconSvg(["#ffffff", "#f2f2f2"], petals);
  },
  maps: () =>
    iconSvg(
      ["#f3f1e9"],
      `<path d="M0 0h25v21H0z" fill="#bfe3ad"/><path d="M41 60c0-15 6-24 19-31v31z" fill="#8fcaf6"/>
       <path d="M-2 43 62 17" stroke="#fff" stroke-width="7"/><path d="M17-2 31 62" stroke="#ffcf4d" stroke-width="5.5"/>
       <path d="M37 12.5a7.5 7.5 0 0 1 7.5 7.5c0 5.6-7.5 13-7.5 13s-7.5-7.4-7.5-13a7.5 7.5 0 0 1 7.5-7.5z" fill="#ff3b30"/><circle cx="37" cy="20" r="2.8" fill="#fff"/>`,
      { flat: true },
    ),
  terminal: () =>
    iconSvg(
      ["#3a3a3c", "#0b0b0c"],
      `<rect x="7" y="9" width="46" height="42" rx="5" fill="none" stroke="#5a5a5e" stroke-width="1.4"/><path d="M16 23l8 7-8 7" ${S}/><rect x="28" y="35" width="14" height="3.6" rx="1.8" fill="#fff"/>`,
    ),
  resume: () =>
    iconSvg(
      ["#ffffff", "#e9e9ee"],
      `<path d="M18 9h17l9 9v31a3 3 0 0 1-3 3H18a3 3 0 0 1-3-3V12a3 3 0 0 1 3-3z" fill="#fff" stroke="#cfd0d6" stroke-width="1.4"/>
       <path d="M35 9v9h9" fill="#eef0f4" stroke="#cfd0d6" stroke-width="1.4" stroke-linejoin="round"/>
       <path d="M21 24h18M21 29h18M21 34h12" stroke="#c4c6ce" stroke-width="2" stroke-linecap="round"/>
       <rect x="11" y="37" width="24" height="12" rx="3" fill="#e5484d"/><text x="23" y="46" text-anchor="middle" font-family="InterVariable, Inter, sans-serif" font-weight="800" font-size="8" fill="#fff">PDF</text>`,
    ),
  mail: () =>
    iconSvg(
      ["#5ac8ff", "#1475f0"],
      `<rect x="11" y="17" width="38" height="27" rx="4.5" fill="#fff"/><path d="M12.5 19.5 30 33l17.5-13.5" stroke="#1d7cf2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    ),
  linkedin: () =>
    iconSvg(
      ["#0a66c2"],
      `<g transform="translate(12 11) scale(1.5)" fill="#fff"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></g>`,
      { flat: true },
    ),
  notes: () =>
    iconSvg(
      ["#ffffff", "#f4f4f4"],
      `<defs><linearGradient id="$ID-n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe066"/><stop offset="1" stop-color="#ffc400"/></linearGradient></defs>
       <rect width="60" height="16" fill="url(#$ID-n)"/><path d="M0 16h60" stroke="#e0a800" stroke-width="1"/>
       <path d="M10 27h40M10 35.5h40M10 44h40" stroke="#d6d6db" stroke-width="1.6"/>
       <g fill="#c9c9cf"><circle cx="10" cy="21" r="1"/><circle cx="14" cy="21" r="1"/><circle cx="18" cy="21" r="1"/></g>`,
    ),
};

// Markup for any icon: a drawn one by key, or a logo image on a coloured tile.
function iconHtml(spec, extraClass = "") {
  if (spec.logo) {
    return `<span class="icon icon-logo ${extraClass}" style="background:${spec.logoBg || "#fff"}"><img src="${spec.logo}" alt="" loading="lazy"></span>`;
  }
  const draw = ICONS[spec.icon] || ICONS[spec];
  return `<span class="icon ${extraClass}">${draw ? draw() : ""}</span>`;
}
