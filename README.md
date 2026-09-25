# Damaris Nduku — Portfolio

A single-page portfolio for **Damaris Nduku, Software Engineer**.
It presents three fintech and utility projects built for East African markets
(salary advances, prepaid metering, M-Pesa payments), plus an About section and contact links.

The site is deliberately small: one page, seven small components, one data file, one stylesheet,
and no runtime dependencies beyond Next.js and React.

---

## 1. Tech stack

| Layer      | Choice                                   |
|------------|------------------------------------------|
| Framework  | Next.js 14.2 (App Router)                |
| UI         | React 18 Server Components; `ThemeToggle` is the only client component |
| Language   | TypeScript 5 (`@/*` path alias → project root) |
| Styling    | One global stylesheet, `app/globals.css`, using CSS custom properties |
| Fonts      | **Lora** (headings) + **Inter** (body), self-hosted via `next/font/google` |
| Hosting    | Vercel (stock Next.js, no config needed) |

There is no CSS framework, state management or CMS. Three [React Bits](https://reactbits.dev) components are copied into `components/reactbits/` (React Bits is copy-in source, not an npm package):

- **SpotlightCard** for the project cards.
- **BlurText** for the hero headline. It needs `motion`.
- **Particles** for the fixed background. It needs `ogl`, a small WebGL library. I edited its code so the particles glow with soft edges, it skips the background if the browser has no WebGL, and it shows a still frame to visitors who have reduced motion turned on.

---

## 2. Project structure

```
portfolio/
├── app/
│   ├── layout.tsx      # <html> shell, next/font setup, pre-paint theme script, metadata
│   ├── page.tsx        # Composes the page: Nav → Hero → Projects → About → Contact → footer
│   └── globals.css     # The whole design system: tokens + every component style
├── components/
│   ├── Nav.tsx         # Sticky top bar: name + anchor links + theme toggle
│   ├── ThemeToggle.tsx # "use client" light/dark button, persists to localStorage
│   ├── ui/StatusDot.tsx# Colored dot + label (tone: positive | pending)
│   ├── Hero.tsx        # Role headline, blurb, "See the work" + "Resume" buttons
│   ├── Projects.tsx    # Section + grid; one ProjectCard per project
│   ├── ProjectCard.tsx # "use client" clickable card + details <dialog>
│   ├── About.tsx       # Background paragraph + deduplicated list of every tool used
│   ├── Contact.tsx     # "Let's talk" pitch + Email me button + channel list (Email / LinkedIn / GitHub)
│   └── Background.tsx  # Fixed glow blobs + Particles canvas behind the page
├── lib/
│   └── data.ts         # All content: `profile` object + `projects` array
├── next.config.mjs     # reactStrictMode only
└── tsconfig.json
```

### How it fits together

```
lib/data.ts ──► profile  ──► layout.tsx (title/description), Nav, Hero, About, Contact, footer
            └─► projects ──► Projects.tsx (one <article> per project), About (tool list)
```

Components have no props. Each one imports what it needs from `lib/data.ts`, so
**changing any text on the site means editing `lib/data.ts` only.** The exception is the second
About paragraph, which is hard-coded in `components/About.tsx`.

---

## 3. Content model (`lib/data.ts`)

### `profile`

| Field       | Used in                         | Current value |
|-------------|---------------------------------|---------------|
| `name`      | Nav, footer, `<title>`          | Damaris Nduku |
| `role`      | Hero `<h1>`, `<title>`          | Software Engineer |
| `blurb`     | Hero, meta description          | Who you are: builds mobile/web products people rely on; cares about reliability on slow networks, retries, and money |
| `email`     | Contact (`mailto:`)             | mdamarisnduku@gmail.com |
| `github`    | Contact                         | https://github.com/ndush |
| `linkedin`  | Contact                         | https://www.linkedin.com/in/damaris-nduku/ |
| `resumeUrl` | Hero "Resume" button            | ⚠️ placeholder (`#`) |

### `Project` type

```ts
type Project = {
  slug: string;        // React key
  name: string;        // <h3>
  oneLiner: string;    // Muted summary under the name
  problem: string;     // "Why it exists"
  role: string;        // "My role"
  result: string;      // "Result"
  stack: string[];     // Rendered as chips
  status: "Shipped" | "Prototype"; // Rendered as a StatusDot under the name
  link?: { label: string; href: string }; // Optional "Repo ↗" link, top right
};
```

Every project is written in the same shape: **problem → role → result**. This is deliberate.
Recruiters scan for what the thing was, what *you* did and whether it shipped, and a fixed
structure answers all three in the same place on every card.

### Current projects

| Project | What it is | Stack | Status stated |
|---|---|---|---|
| **Advance** | Salary-advance app. Employees borrow against the next payslip, the money is disbursed via M-Pesa and repaid by automatic payroll deduction | Flutter, Dart, BLoC, REST, M-Pesa, Android, iOS | Shipped to Android + iOS |
| **Algora Smart** | Prepaid electricity/water metering app. One role-aware app serves tenants, property managers and admins | Flutter, Dart, BLoC, M-Pesa, Bluetooth LE, Android, iOS | Working prototype on a mock backend |
| **Algora Smart Admin Console** | Web dashboard for operators managing a large meter fleet | React, Vite, REST, OpenAPI, M-Pesa, Playwright | Operator dashboard with an E2E test suite |

All three `link.href` values are currently `#`.

---

## 4. Page anatomy

```
┌──────────────────────────────────────────────┐
│ Damaris Nduku            Work  About  Contact│  ← Nav (sticky, frosted, bottom border)
├──────────────────────────────────────────────┤
│                                              │
│  Software Engineer                           │  ← Hero h1 (Lora, fluid 2.5–4rem)
│  I build mobile and web apps for fintech…    │  ← muted blurb, max 760px
│  [ See the work ]  [ Resume ]                │  ← primary (green) + ghost buttons
│                                              │
├──────────────────────────────────────────────┤
│  Selected work                               │  ← section label (accent green, small)
│  Projects                                    │  ← section title (Lora 1.6rem)
│                                              │
│  Advance                            Repo ↗   │
│  A mobile app where employees borrow…        │
│    Why it exists  …                          │  ← <dl> with three dt/dd pairs
│    My role        …                          │
│    Result         …                          │
│  [Flutter] [Dart] [BLoC] [M-Pesa] …          │  ← stack chips (soft-green)
│  ──────────────────────────────────────────  │  ← divider between projects
│  Algora Smart …                              │
├──────────────────────────────────────────────┤
│  About / Background                          │
├──────────────────────────────────────────────┤
│  Get in touch / Contact                      │
│  email · GitHub · LinkedIn                   │
├──────────────────────────────────────────────┤
│              © 2026 Damaris Nduku            │  ← footer
└──────────────────────────────────────────────┘
```

Navigation uses anchors only (`#work`, `#about`, `#contact`) with smooth scrolling.
Smooth scrolling is turned off when the user has `prefers-reduced-motion` set.

---

## 5. Design system

### Direction

**Editorial, with more contrast and one bold element.** The site keeps its cream-and-forest-green
editorial look: Lora for headings, Inter for body text, a warm paper background and no
gradients, shadows or images. Two things changed in the redesign. Contrast is higher, and one
element now carries meaning through color: the **project status dot**. A green dot means the
project shipped and an ochre dot means it is a prototype. That fits a portfolio about production
reliability. The dot appears only in Projects.

Things the design deliberately avoids: all-caps tracked eyebrow labels, single words highlighted
in headlines, `01/02/03` numbering and rounded SaaS cards with drop shadows.

### Color tokens (`globals.css`)

| Token                   | Light     | Dark                     | Role |
|-------------------------|-----------|--------------------------|------|
| `--paper`               | `#f2ede1` | `#121410`                | Page background |
| `--surface`             | `#ffffff` | `#1a1d17`                | Ghost-button hover |
| `--ink`                 | `#14120d` | `#f0ece0`                | Headings, primary text |
| `--muted`               | `#6b6355` | `#9c9686`                | Body copy, nav links |
| `--border`              | `#ddd4c0` | `#2e3129`                | Decorative dividers only |
| `--border-strong`       | `#8a7d5e` | `#6f735f`                | Button and toggle outlines (≥3:1) |
| `--accent`              | `#1f5c3f` | `#4bad78`                | Primary button, links, labels, focus ring |
| `--accent-soft`         | `#e4ece2` | `rgba(75,173,120,.14)`   | Chip background |
| `--accent-bright`       | `#278a53` | `#5fd192`                | "Shipped" dot |
| `--status-pending`      | `#8a5f22` | `#d1a25c`                | "Prototype" dot and label |
| `--status-pending-soft` | `#f1e6d2` | `rgba(209,162,92,.14)`   | Reserved pending tint |

Light-mode contrast on paper: ink 16:1, muted 5.1:1, accent 6.8:1, prototype status 4.8:1 and
the shipped dot 3.7:1 (it is not text).

### Theming

- **No saved choice:** the page follows the system setting through `@media (prefers-color-scheme: dark)`.
- **Explicit choice:** `ThemeToggle` sets `data-theme="light|dark"` on `<html>` and saves it to
  `localStorage`. An inline script in `layout.tsx` re-applies the saved choice before first paint,
  so there is no flash of the wrong theme.
- **No hydration mismatch:** the toggle renders both of its labels, and CSS hides one of them. The
  server-rendered markup is therefore the same whichever theme is active.

### Typography

| Use              | Font  | Size                              | Weight |
|------------------|-------|-----------------------------------|--------|
| Base / body      | Inter | 17px, line-height 1.6             | 400    |
| Hero h1          | Lora  | `clamp(2.5rem, 5.5vw, 4rem)`, −0.015em | 650 |
| Section title h2 | Lora  | `clamp(1.6rem, 2.6vw, 2.05rem)`   | 600    |
| Project name h3  | Lora  | 1.4rem                            | 600    |
| Hero blurb       | Inter | 1.15rem, muted                    | 400    |
| Buttons          | Inter | 0.95rem                           | 600    |
| Section label    | Inter | 0.9rem, accent, sentence case     | 500    |
| Status label     | Inter | 0.85rem                           | 600    |
| `dt` labels / chips | Inter | 0.82rem                        | 600 / 400 |

Headings use line-height 1.15. Both fonts are variable fonts served by `next/font`.

### Layout and spacing

- **Container:** `.wrap` and `.nav-inner` are capped at `--max-wide` (960px) with 24px side padding.
- **Reading measure:** `--max` is 680px. It caps paragraphs, the one-liners and project details. The hero h1 is capped at 720px.
- **Vertical rhythm:** every section divider has 64px above and below it (the hero has 104px on top). `.wrap` sets only `padding-inline`, so it doesn't override the sections' vertical padding.
- **Radii:** `--radius-sm` is 4px (buttons, toggle) and `--radius-xs` is 3px (chips). They are sharper than before, to look more engineered.
- **Breakpoints:** there are none. Flex-wrap and the `clamp()` headings handle narrow screens.

### Components

| Class | Look |
|---|---|
| `.nav-name` (logo) | Lowercase serif **dn** monogram on an ink tile, next to the wordmark "Damaris Nduku". The tile turns accent green on hover. The same mark is used for the favicon (`app/icon.svg`) |
| `.nav` | Sticky bar with the paper color at 90% opacity (`color-mix`), a 6px blur and a bottom border |
| `.theme-toggle` | Small outlined button that reads "Dark" or "Light" |
| `.btn-primary` | Solid accent background with white text; opacity 0.88 on hover |
| `.btn-ghost` | Strong outline; on hover, a surface background and ink border |
| `.status-dot` | 8px dot + label; `--positive` is green, `--pending` is ochre |
| `.project` | SpotlightCard in an auto-fill grid (min 280px). The whole card is one button showing name → status → one-liner → chips → "View details →". Clicking it opens a native `<dialog>` with the problem, role, result, stack and repo link, split into blocks with 24px padding so each divider has equal space above and below. Esc, the × button or a backdrop click closes it |
| `.chip` | Soft-accent tag with a 3px radius |
| `.bg-layer` | Fixed layer at `z-index: -1`: two soft radial glows (green, ochre) plus drifting particles. Opacity is 0.45 in light mode and 0.9 in dark mode |
| `.contact` | Two columns (pitch and "Email me" button on the left, channel list on the right) that stack on narrow screens. Each row has the same 20px/24px padding, so the dividers are evenly spaced. GitHub and LinkedIn open in a new tab |
| `.about-stack-label` | Small ink label above the combined tool chips |

### Accessibility

- Semantic landmarks: `<nav>`, `<header>`, `<section id>`, `<article>`, `<footer>`, `<html lang="en">`.
- The project details use `<dl>/<dt>/<dd>`, so screen readers announce label/value pairs.
- A visible 2px `:focus-visible` accent outline on buttons, plus a color change on nav links.
- Respects `prefers-reduced-motion` (turns off smooth scrolling and color transitions).
- The status dot is `aria-hidden`, so the status is carried by the text label, not by color alone.
- `scroll-padding-top` keeps anchored headings from sliding under the sticky nav.

---

## 6. Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## 7. Deploying

Live at **https://damaris-nduku.netlify.app** (Netlify project `damaris-nduku`, linked in `.netlify/state.json`).

The site is a static export (`output: "export"` in `next.config.mjs`), so `npm run build` writes plain files to `out/`. To redeploy:

```bash
npm run build
npx netlify-cli deploy --prod --no-build --dir out   # netlify-cli needs Node 22+
```

`netlify.toml` (build `npm run build`, publish `out`) is there too, so connecting a Git repo in the Netlify UI builds the site the same way.

**Netlify quirk:** Netlify injects `\n<!-- This site is hosted on Netlify… -->` into `<head>`. That whitespace breaks React 18 hydration, so the inline script in `app/layout.tsx` removes stray comment and whitespace nodes from `<head>` before React hydrates. Keep that script if you change hosts or upgrade.

---

## 8. Before publishing

- [ ] `profile.resumeUrl`: point it at a PDF (e.g. drop `resume.pdf` in `public/` and use `/resume.pdf`)
- [ ] Each project's `link.href`: add the real repo or demo URLs, or remove `link` to hide the "Repo ↗" link
- [ ] Re-read each `role` / `result` so it matches reality (solo vs. team, prototype vs. production)

## 9. Known gaps (intentionally not built yet)

- **No Open Graph image.** Add `app/opengraph-image.png` and Next.js picks it up automatically. The favicon is `app/icon.svg`.
- **No project screenshots.** Add an optional `image` field to `Project` if you want visuals.
- **Nav on narrow screens.** On screens narrower than about 430px, the links and toggle wrap
  onto a second line under the name instead of scrolling sideways. Add a menu button if the nav
  gets more links.
# portfolio
