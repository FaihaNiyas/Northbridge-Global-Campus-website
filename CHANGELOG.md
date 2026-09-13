# Changelog

## v3.0 — Approved content + Claude visual system (14 September 2026, branch `feature/chatgpt-content-claude-style-v3`)

Built on `feature/lead-review-v2` (`cf47414`), which remains the sole authority
for every visitor-facing word. The visual system from `feature/claude-style-v2`
(`8f9c484`) was re-applied by hand to this branch's markup — that commit was
made against `main` and its HTML carries the old wording, so none of its HTML
was copied.

Every heading, paragraph, CTA, navigation label, form label and option,
validation and status message, consent line, footer line, alt text, title,
meta description, Open Graph text, link destination and form field name is
identical to `feature/lead-review-v2`, verified by automated extraction of the
static and rendered text of all five pages. The file `careers.html` keeps its
name; its visible label stays **Teach With Us**. `MEETING-DECISIONS.md` is
unchanged.

| File | Change |
|---|---|
| `assets/styles.css` | Claude v4 system (tokens, spacing and type scales, split grid, buttons, cards, forms, footer, reduced motion) adapted to this branch: nav breakpoint kept at 60em for four links plus the Register Interest CTA; mobile overlay panel holds the dedicated close button, links and CTA; new components styled in the same system — value points, numbered "How we learn", programme status line and journey row, green philosophy band, enquiry routes, crest figure; conditional form fields. |
| `*.html` | Layout wrappers only (`section-head`, `split`, `hero-page-inner`, `nav-panel`); menu button gains a close icon; `<main tabindex="-1">`; `theme-color` corrected from `#012144` to the official navy `#002147`; philosophy and "Where we stand today" bands moved to green. |
| `careers.html`, `contact.html` | Hints and errors linked to their controls with `aria-describedby`; existing `*` wrapped for styling. |
| `index.html` | Hero image `sizes` corrected for its cropped panel; `decoding="sync"` on the LCP image. |
| `assets/site.js` | Menu lock moved to `<html>` so the sticky header survives it; closes on veil tap and when focus leaves the header; breakpoint via `matchMedia`. Reveal selectors updated. No strings changed. |

## v2.0 — Visual modernisation (7 September 2026)

A visual redesign. No page was removed, no copy was rewritten, and no
functionality changed behaviour. The contact configuration, both forms, all SEO
and Open Graph metadata, `robots.txt` and `sitemap.xml` are untouched in
substance.

---

## Files changed

| File | Change |
|---|---|
| `assets/styles.css` | Rewritten. New palette tokens, button system, two-state header, two-column hero, card treatments, form fields, footer. |
| `index.html` | Header markup replaced with the official logo lockup; hero rebuilt as two columns with the brand ambassador; contact tile icons given a badge element. |
| `about.html` | Regenerated from the shared shell — inherits the new header. |
| `careers.html` | Regenerated from the shared shell. |
| `contact.html` | Regenerated from the shared shell; contact tile icons updated. |
| `404.html` | Regenerated from the shared shell. |
| `assets/site.js` | **Added** `initHeader()` only. The `NB` contact config, `initNav()`, `initForms()` and all validation and submission logic are byte-for-byte unchanged. |
| `README.md` | Rewritten. |
| `CLAUDE-CODE-PROMPTS.md` | New. |
| `CHANGELOG.md` | New (this file). |
| `FINAL-QA-REPORT.md` | New. |

### Files added

```
assets/northbridge-logo.png                          Official logo for the header
assets/northbridge-crest.png                         Crest only, compact header
assets/northbridge-brand-ambassador.jpg              Hero image
assets/northbridge-brand-ambassador-{640,1000,1600}.jpg
assets/northbridge-brand-ambassador-{640,1000,1600}.webp
assets/originals/northbridge-logo-original.png       As supplied, untouched
assets/originals/northbridge-brand-ambassador-original.png
```

### Files removed

```
assets/crest.png    Superseded by northbridge-crest.png, which is cut from the
                    newly supplied logo. Verified unreferenced before deleting.
```

---

## Logo improvements

- The small crest in the header was replaced with the **supplied official logo**.
- Displayed at **230px wide at 1440px**, within the 220–260px target. Steps down
  responsively: 230px at ≥1200, 190px at ≥1024, 150px at ≥768, 132px below.
- The logo's composition, colours, proportions and artwork are unchanged. It was
  resampled to 520px for delivery (from 1254px, 1.1 MB down to 28 KB) and its
  background was normalised from `(253,253,253)` to pure `#FFFFFF`.
- **Why the background needed normalising:** the supplied file's background is
  one step off pure white. Against the white header this rendered as a visible
  grey rectangle around the logo. This was caught by looking at the rendered
  page, not by reading the file.
- The logo always sits on white. It is never placed on a navy ground.

### Two-state header

The logo is a near-square lockup — trimmed of its white margin it measures
1032 × 1061, an aspect ratio of 0.973. At 230px wide it is therefore also about
230px tall, making a 260px header.

A 260px bar held on screen permanently would push content down and bury the
navigation, which conflicts with the requirement that the larger logo must not
unbalance the nav. Resolved as follows:

- **At rest** the header shows the full official logo.
- **Past 90px of scroll** `site.js` adds `.is-compact`: the crest plus a typeset
  wordmark, in a bar of about 68px.
- **Back at the top** the full logo returns. A 40px release threshold prevents
  flicker on small scroll movements.
- The crest alone is used in the compact state because at 44px the logo's own
  wordmark would be an illegible smudge. Full lockup where it can be read; crest
  where it cannot.

---

## Hero and ambassador improvements

- The homepage hero is now **two columns on desktop**: copy left, ambassador
  right. It stacks on mobile with the headline and primary button still first.
- Crop values were chosen by rendering candidate crops and comparing them, not
  estimated:
  - **Desktop (≥1024px):** `aspect-ratio: 4/5`, `object-position: 88% center` —
    face centred, blazer crest visible.
  - **Tablet (≥640px):** `3/2` at `86%`.
  - **Mobile:** `16/10` at `85%` — brings the wall crest and wordmark into frame
    and keeps the image from becoming excessively tall.
- The person's face, clothing, identity, proportions and the institutional
  branding are unaltered. Only resolution and encoding changed.
- Served through `<picture>` with WebP and JPEG at 640, 1000 and 1600px, with
  `sizes` set so a phone never downloads the desktop file. The largest WebP is
  **67 KB against a 1.9 MB source**.
- Marked `fetchpriority="high"` and **not** lazy-loaded, since it is the
  above-the-fold LCP element.
- Explicit `width` and `height` attributes are set to prevent layout shift.
- A soft gold hairline is drawn outside the image via `::after`, so the frame
  never crops the picture.

---

## Button redesign

One system, applied to every call to action, form submit and clickable card
action across all five pages.

- 12px radius (`--radius`), used consistently site-wide.
- 48px minimum height; every tap target verified at ≥44px.
- Fine gold border on filled buttons.
- Soft two-layer shadow, deepening on hover.
- `translateY(-2px)` hover lift, returning to 0 on `:active`.
- 3px gold focus ring at 3px offset, via `:focus-visible`.

| Variant | Appearance |
|---|---|
| `.btn-primary` | Navy field, white text, gold edge |
| `.btn-accent` | Green field, white text, gold edge |
| `.btn-secondary` | Transparent, navy text, gold border |

On navy grounds the pair **inverts automatically** — primary becomes gold with
navy text — so the leading action still leads without needing a modifier class.

---

## Responsive improvements

- Content shell widened from 1080px to 1180px; reading measure from 34rem to
  36rem.
- Section rhythm now steps 3.25rem → 5rem → 6rem across breakpoints.
- Cards replaced flat bordered blocks, with distinct treatments for `.steps`
  (gold top rule) and `.prose-grid` (hover lift) so they do not read as identical
  boxes.
- Contact tiles gained a circular icon badge and hover lift.
- Form fields enlarged to 50px with a 3px focus glow.

---

## Accessibility improvements

- **Every visible text and background pair now meets WCAG AA**, verified by
  walking each text node, compositing its real background through any
  transparency, and computing the ratio.
- **Two golds, deliberately.** `#C8A24A` measures **2.41:1** on white and fails
  AA badly, but measures **6.67:1** on navy, which is where the brief uses it.
  It is therefore restricted to borders, fills and text on dark grounds, and
  `--gold-text` (`#8F6A16`, 4.95:1) was added for gold text on light grounds.
- Focus rings are visible on every interactive element, with a lighter gold used
  on dark backgrounds so the ring stays visible there too.
- `prefers-reduced-motion: reduce` collapses all transitions and disables smooth
  scrolling. Verified: transition duration measured at 1e-06s under emulation.
- Semantic HTML, ARIA attributes, `aria-live` form status regions and
  `aria-current="page"` navigation state all preserved.
- Meaningful `alt` text on the ambassador image; the compact-header crest is
  `alt=""` as it is decorative beside the adjacent wordmark text.

---

## Functionality fixes

Found by testing the rendered pages, not by reading code:

1. **Logo background rendered as a grey rectangle.** The supplied file's
   background is `(253,253,253)` against a pure white header. Normalised to
   `#FFFFFF`.
2. **A stale asset reference was nearly missed.** A naive `grep "crest.png"`
   matched `northbridge-crest.png` as a substring and wrongly reported the old
   file as still in use. Re-checked with an exact-path match before deleting.
3. **A test reported two false failures** — the header appearing not to expand on
   scrolling back to top. The cause was the test's own `scrollTo` animating under
   `scroll-behavior: smooth` and not finishing inside the wait. The site was
   correct; the test was fixed.

### Verified unchanged

- The `NB` contact configuration block in `assets/site.js`.
- Both form validation and submission paths, including the WhatsApp handoff and
  the email fallback.
- All `<meta>`, Open Graph and Twitter card tags, canonical links, `robots.txt`
  and `sitemap.xml`.
- All page copy.

---

## Known issue carried forward

**The motto is spelled two ways.** The crest artwork reads `EXCELERE`; the
correct Latin is `EXCELLERE`, with a double L. The typeset motto in the footer
uses the correct spelling, so with the logo now in the header, **both spellings
appear on every page**. This needs an artwork correction, and is cheap to fix now
and expensive once it is on certificates and signage.
