# Northbridge Global Campus — website

## Project overview

The public website for **Northbridge Global Campus (Pvt) Ltd**, a registered Sri
Lankan company building short, practical courses in business finance, workplace
English, digital skills and AI at work.

Built as plain HTML, CSS and JavaScript. No framework, no build step, no
webfonts, no third-party libraries, and no external requests of any kind. It
will run from any static host, and it will open on a weak mobile connection.

A first-time visitor downloads roughly **148 KB**.

The site is deliberately honest about the stage the company is at. It states
plainly that enrolments are not open and that no accreditation is yet held.
There are no invented courses, vacancies, statistics, partnerships or
testimonials anywhere in it.

---

## Website pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | What Northbridge is, what is being built, how to get in touch. Two-column hero with the brand ambassador. |
| About | `about.html` | Why the company exists, how it works, and a plain statement of where it stands today. |
| Careers | `careers.html` | How people are engaged, plus an expression-of-interest form. No named vacancies. |
| Contact | `contact.html` | WhatsApp, phone and email, plus a short enquiry form. |
| Not found | `404.html` | Shown on a dead link. Marked `noindex`. |

Courses, Admissions, News and a student portal are **deliberately absent** from
the navigation. Add each on the day it has real content, not before.

---

## Folder structure

```
northbridge-global-campus-final/
├── index.html                    Home
├── about.html                    About
├── careers.html                  Careers  (expression-of-interest form)
├── contact.html                  Contact  (enquiry form)
├── 404.html                      Not found (noindex)
├── robots.txt                    Points crawlers at the sitemap
├── sitemap.xml                   The four public pages
├── README.md                     This file
├── CLAUDE-CODE-PROMPTS.md        Reusable prompts for future work
├── CHANGELOG.md                  What changed in this release
├── FINAL-QA-REPORT.md            Verification results
└── assets/
    ├── styles.css                All styling. Every colour is a token at the top.
    ├── site.js                   Contact config + nav + header + form handling
    ├── northbridge-logo.png      Official logo, used in the header
    ├── northbridge-crest.png     Crest only, for the compact scrolled header
    ├── northbridge-brand-ambassador.jpg          Hero image (1600px)
    ├── northbridge-brand-ambassador-1600.{jpg,webp}
    ├── northbridge-brand-ambassador-1000.{jpg,webp}
    ├── northbridge-brand-ambassador-640.{jpg,webp}
    ├── og-image.png              Social share card, 1200×630
    ├── apple-touch-icon.png      iOS home-screen icon
    ├── favicon-32.png            Browser tab icon
    ├── favicon-16.png            Browser tab icon, small
    └── originals/
        ├── northbridge-logo-original.png              As supplied, untouched
        └── northbridge-brand-ambassador-original.png  As supplied, untouched
```

**On the two image sets.** `assets/originals/` holds the supplied files exactly
as they were given, byte for byte, for archive. The files the website actually
loads are resampled and re-encoded copies of those same images — the
composition, colours, faces and branding are unchanged, only the resolution and
file format differ. This matters: the supplied ambassador PNG is 1.9 MB, which
would have been the single heaviest thing on the site and would have hurt
loading badly on a Sri Lankan mobile connection. The WebP the browser actually
downloads is 67 KB.

---

## How to run the website locally

**Simplest.** Double-click `index.html`. It opens in your browser and everything
works, because there is nothing to compile.

**Better, if you have Python installed.** From inside the folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Use this method when you want to check the
site the way a real server will deliver it.

---

## How to edit contact details

Open `assets/site.js`. The config block is the first thing in the file:

```js
const NB = {
  whatsapp:     '94000000000',        // full international format, digits only
  phoneDisplay: '+94 00 000 0000',    // how the number appears on the page
  phoneDial:    '+94000000000',       // what tel: dials
  email:        'hello@example.lk',
  formEndpoint: null
};
```

This is the **only** place contact details live. Change them once and they
update in the header, the footer, every contact tile, the floating WhatsApp
button and both forms. Do not edit any HTML file to change a phone number.

**WhatsApp number format.** Drop the leading zero and put the country code in
front: `077 123 4567` becomes `94771234567`.

### How the forms behave

**As shipped (`formEndpoint: null`).** Both forms validate in the browser, then
turn the visitor's answers into a prefilled WhatsApp message they send with one
tap. An email fallback sits beside it. This costs nothing and works the day you
publish. Since most visitors arrive from Facebook or Instagram on a phone, this
route will very likely convert better than an inbox anyway.

**Later.** Create a free endpoint (Formspree, Web3Forms, Getform) and paste the
URL into `formEndpoint`. The forms will post to it, and WhatsApp becomes the
fallback shown only if the send fails. Nothing else changes.

---

## How to publish the website

**Before you publish, do these two things.**

1. Fill in the config block in `assets/site.js` as above.
2. Find and replace `REPLACE-WITH-YOUR-DOMAIN.lk` with your real domain across
   all files — 29 occurrences in the HTML plus `robots.txt` and `sitemap.xml`.
   VS Code or Notepad++ will do it across the folder in one action.

Step 2 matters more than it looks. Facebook and WhatsApp need **absolute** URLs
to build a link preview. Leave the placeholder in and shared links show no card
at all.

**Then upload the whole folder.** All of these are free at this size and give
you HTTPS automatically:

- **Cloudflare Pages** or **Netlify** — drag the folder onto the dashboard, then
  point your domain at it.
- **GitHub Pages** — push the folder to a repository and enable Pages.

Keep `assets/` next to the HTML files; every path is relative.

**After going live**, paste your URL into the Facebook Sharing Debugger
(`developers.facebook.com/tools/debug/`) and press "Scrape Again". Facebook
caches link previews hard, so if you later change the share image or wording you
must re-scrape or people keep seeing the old card.

---

## Brand colours

| Token | Hex | Use |
|---|---|---|
| `--navy` | `#002147` | Primary. Headings, primary buttons, hero. |
| `--navy-deep` | `#001834` | Pressed button states, footer. |
| `--green` | `#004B3C` | Secondary. Accent buttons, icons, WhatsApp button. |
| `--green-deep` | `#003A2E` | Green hover states. |
| `--gold` | `#C8A24A` | Borders, rules, fills, and text **on dark grounds only**. |
| `--gold-soft` | `#E0C88A` | Gold text on navy or very dark backgrounds. |
| `--gold-text` | `#8F6A16` | Gold **text on white or off-white**. |
| `--ink` | `#10233A` | Body copy. |
| `--paper` | `#FAF8F4` | Warm off-white section background. |
| `--white` | `#FFFFFF` | Page background, cards, header. |

**The one rule most likely to be broken by accident:** `#C8A24A` measures
**2.41:1** against white, which fails WCAG AA badly. It is fine on navy (6.67:1),
which is where the design uses it. Any gold text on a light background must use
`--gold-text` (`#8F6A16`, 4.95:1). That is why there are two golds.

All colours are declared once as tokens at the top of `assets/styles.css`. Do
not type a hex code anywhere else in the CSS or in any HTML file.

---

## Main changes completed

- **Header logo** replaced with the supplied official logo, at 230px wide on
  desktop, stepping to 190 / 150 / 132 down the breakpoints.
- **Two-state header.** The logo is a near-square lockup, so at 230px wide it is
  also about 230px tall. Rather than hold a 260px bar on screen permanently and
  bury the navigation, the header shows the full logo at rest and condenses to
  the crest plus wordmark once you scroll past 90px. Scrolling back to the top
  restores it.
- **Two-column hero** on the homepage with the brand ambassador on the right,
  stacking cleanly on mobile with the headline and primary button still first.
- **Button system** rebuilt: one 12px radius, 48px minimum height, fine gold
  edge, soft shadow, 2px hover lift, 3px gold focus ring, and hover/focus/active
  states throughout. On navy the primary and secondary invert automatically so
  the leading action still leads.
- **Cards, sections, spacing, typography, forms, navigation and footer**
  refreshed on a single set of tokens.
- Full details are in `CHANGELOG.md`.

---

## Responsive testing information

Tested at the five required widths — **1440, 1024, 768, 390 and 360** — and also
at 1600, 1280, 900, 640, 480 and 320 for headroom.

Verified at every width, on all five pages:

- No horizontal scrolling anywhere.
- No missing images.
- No JavaScript console errors.
- All 61 internal links and asset paths resolve.
- Every tap target is at least 44px high.
- Every visible text and background pair meets WCAG AA, checked by walking each
  text node, compositing its real background through any transparency, and
  computing the contrast ratio.
- Keyboard focus is visible everywhere (3px gold outline).
- `prefers-reduced-motion` suppresses all transitions.

Full results are in `FINAL-QA-REPORT.md`.
