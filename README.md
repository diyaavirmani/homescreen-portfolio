# Diya Virmani: Home Screen portfolio

My portfolio as an iPhone Home Screen. Every widget, app and folder opens a screen inside the phone, and the column beside it tells the story. The layout and motion are modelled on [raffi.zip](https://www.raffi.zip/): a typewriter intro on the first visit, a phone that springs up from below, sheets that slide over a scaled-down Home Screen, and folders whose items crossfade.

Plain HTML, CSS and JavaScript with no build step. [Motion](https://motion.dev) (MIT) is vendored in `vendor/` for the springs.

## Run locally

```bash
python3 -m http.server 5173 --bind 127.0.0.1
```

Then open http://127.0.0.1:5173/. Opening `index.html` directly also works. Add `?intro=1` to replay the intro (it only plays once per browser).

## What's on the phone

| On the Home Screen | Opens |
| --- | --- |
| GitHub widget | Profile, live contribution graph, and public repos |
| Music widget | Now Playing: Style (Taylor's Version) |
| Photos, Maps, Terminal, Résumé | Portrait and hobbies, New Delhi and VIPS-TC, what I'm learning, the PDF |
| Projects, Work, Wins, Stack folders | App Store pages, Wallet passes, achievements, Settings-style skill lists |
| Dock: Mail, LinkedIn, Notes | Contact, LinkedIn, and how I think about engineering |

## Editing

- **Content:** everything the site says is in `data.js`: intro, apps, folder items, links.
- **Icons:** `icons.js` draws every app icon as SVG; company logos are in `assets/logos/`.
- **Phone screens:** `screens.js` has one renderer per app and per folder type.
- **Behaviour:** `script.js`. **Styles:** `style.css` (the colours are the variables at the top).

The contribution graph loads live from a public contributions API and falls back to the snapshot in `data.js` if that fails.

## Deploying

The site is static, so GitHub Pages, Vercel or Netlify can serve the repository root as-is.

## Credits

Design and interaction pattern after [Raffi Chilingaryan's site](https://www.raffi.zip/). The 1989 (Taylor's Version) cover belongs to its rights holders; the GitHub and LinkedIn marks come from [Simple Icons](https://simpleicons.org) (CC0) and belong to their companies.
