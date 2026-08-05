# Portfolio — Upendra Sharma

A single-page portfolio and digital résumé. Plain HTML, CSS and JavaScript —
no build step, no dependencies, nothing to install.

## Structure

```
portfolio-v2/
├── index.html          Page shell — semantic markup, empty mount points
├── css/
│   └── style.css       Design system + layout (numbered sections at the top)
├── js/
│   ├── data.js         ← ALL CONTENT LIVES HERE. This is the file you edit.
│   └── main.js         Render engine, theme toggle, scrollspy, reveals
├── assets/
│   ├── img/            portrait.jpg goes here
│   └── docs/           resume.pdf goes here
└── .nojekyll           Tells GitHub Pages to serve files as-is
```

The important idea: **you never touch HTML to update content.** Every section is
rendered from the `DATA` object in `js/data.js`. Add a job, remove a project,
reorder your skills — the page reflows on its own.

## Editing content

Open `js/data.js`. It is already populated from your résumé. Two things are
still marked `// CHECK`:

1. **LinkedIn URL** — `links` and `contact.links` point at a bare
   `linkedin.com/in/`. Add your handle.
2. **Premier League Predictor year** — guessed as 2025.

Also worth a decision: `about.details` publishes your phone number. Delete that
line if you would rather not have it scraped.

Two syntax rules cause almost all breakage: keep the commas between `{ }`
blocks, and escape apostrophes inside single-quoted strings (`'Deloitte\'s'`).
If the page renders blank, open the browser console — a syntax error in
`data.js` reports there with a line number.

Adding a job, for example:

```js
experience: [
  {
    period:   '2024 — Present',
    role:     'Senior Software Engineer',
    company:  'Acme Corp',
    location: 'Bengaluru, India',
    points: [
      'Owned the billing service handling 40k requests/day.',
      'Cut p99 latency from 800ms to 120ms by reworking the query layer.'
    ],
    stack: ['Node.js', 'PostgreSQL', 'Redis', 'AWS']
  },
  // ...older roles below
]
```

### Turning on the contact form

The site ships with your email shown in plain text. To hide it from scrapers,
swap in a Formspree form:

1. Sign up free at [formspree.io](https://formspree.io) and create a form.
2. Your endpoint looks like `https://formspree.io/f/xyzabcde` — copy the part
   after `/f/`.
3. Paste it into `contact.formspreeId` in `js/data.js`.

That single value flips everything: the form appears, and your address is
removed from the contact section, the About details, and the hero links. It is
never written into the page at all, so there is nothing to harvest. Clear the
value and the plain email address comes back.

Free tier is 50 submissions/month. Submissions arrive in your inbox and in the
Formspree dashboard.

### Fonts

Inter and JetBrains Mono are self-hosted in `assets/fonts` (~140 KB, six
weights). No request goes to Google, so no visitor IP is shared with a third
party. Both are SIL Open Font License; the licences sit beside the files and
should stay there.

A few notes:

- **Résumé** — deliberately not published. The hero's second button is driven
  by two fields and picks its own state:

  | Config | Button |
  |---|---|
  | `resumeUrl` set | "Download résumé" → the file |
  | `resumeUrl` empty, `resumeCta` set | "Email for résumé" → pre-addressed email |
  | `resumeCta: null` too | no button at all |

  To publish a résumé again, drop a PDF in `assets/docs/` and set
  `profile.resumeUrl` (a Google Drive link works too — `http` links open in a
  new tab, local paths download). Edit the button wording and the email
  subject line in `profile.resumeCta`.
- **Phone number** — removed from the site. It was in `about.details`; add a
  `{ label: 'Phone', value: '…' }` entry back if you ever want it.
- **Portrait** — `assets/img/portrait.webp`. The studio white background was
  cut out and the file compressed from 1 MB to 60 KB, so it sits cleanly on
  both the light and dark backgrounds. Your untouched original is kept beside
  it as `portrait-original.jpg.bak` (gitignored).
- **`about.paragraphs`** accepts inline HTML (`<strong>`, `<em>`, `<a>`). Every
  other field is escaped, so quotes and ampersands are safe to type literally.
- **Section order and nav labels** come from the `nav` array. Each `id` must
  match a `<section id="...">` in `index.html`.

## Running it locally

Because `data.js` is loaded as a script (not fetched), you can open
`index.html` directly in a browser. If you prefer a server:

```bash
cd portfolio-v2
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying to GitHub Pages

The repo is already initialised and committed locally on `main`. Two steps left.

**1. Create the remote repo.** On GitHub, create a new repository named
exactly `upendra657.github.io` — public, and with no README, .gitignore or
licence (the repo already has commits, so an initialised remote would conflict).

**2. Push.**

```bash
cd ~/Desktop/Projects/portfolio-v2
git remote add origin https://github.com/upendra657/upendra657.github.io.git
git push -u origin main
```

For a `username.github.io` repo, Pages turns itself on automatically — no
Settings change needed. The site is live at `https://upendra657.github.io/`
within a minute or two.

### Publishing later updates

```bash
cd ~/Desktop/Projects/portfolio-v2
git add -A
git commit -m "Update experience"
git push
```

Changes appear within a minute. If you don't see them, hard-refresh
(`Cmd/Ctrl+Shift+R`) — GitHub Pages caches aggressively.

### Note on your old site

`github.com/upendra657/portfolio-website` stays exactly as it is, still served
from its `gh-pages` branch at `upendra657.github.io/portfolio-website/`. Once
the new site is live, you can archive or delete that repo — nothing here
depends on it.

### Custom domain

Add a file named `CNAME` containing only your domain (e.g. `upendrasharma.dev`),
then point a CNAME DNS record at `upendra657.github.io`.

## Design notes

Swiss / International Typographic style — a strict 12-column-derived grid,
Inter for text with JetBrains Mono for labels and numerals, a single accent
red used sparingly on section numbers and rules, and a lot of deliberate
whitespace.

Design tokens are CSS custom properties at the top of `style.css`. To change
the accent colour, edit `--accent` in both the `:root` and `[data-theme="dark"]`
blocks.

## Accessibility & performance

- Semantic landmarks, skip link, visible focus rings, labelled controls
- Full keyboard navigation; `Escape` closes the mobile menu
- Honours `prefers-reduced-motion` (disables the typewriter and reveals)
- Honours `prefers-color-scheme` until the visitor picks a theme themselves
- Print stylesheet — `Cmd/Ctrl+P` produces a clean résumé
- ~60KB total, two fonts, zero JavaScript dependencies
