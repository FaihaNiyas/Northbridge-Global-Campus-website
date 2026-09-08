# Final QA report

**Site:** Northbridge Global Campus website, v2.0
**Date:** 7 September 2026
**Method:** Headless Chromium (v131) driving the real files. Every result below
is a measurement taken from the rendered pages, not an inspection of the source.

**Overall: PASS.** 22 of 22 functional checks passed, with zero failures. Three
items need your decision; they are listed at the end and none of them is a defect
in the build.

---

## 1. Pages

All five pages load and render at every width tested.

| Page | File | `<h1>` | Title | Description | Weight at 390px |
|---|---|---|---|---|---|
| Home | `index.html` | 1 | 55 ch | 136 ch | 99 KB (7 requests) |
| About | `about.html` | 1 | 33 ch | 139 ch | 76 KB (5 requests) |
| Careers | `careers.html` | 1 | 35 ch | 129 ch | 78 KB (5 requests) |
| Contact | `contact.html` | 1 | 35 ch | 128 ch | 77 KB (5 requests) |
| Not found | `404.html` | 1 | 42 ch | 89 ch | 73 KB (5 requests) |

Exactly one `<h1>` per page. Every title and description is unique and within
search-result display limits. `lang="en"` set on all five.

**PASS**

---

## 2. Navigation

| Check | Result |
|---|---|
| Mobile menu opens on tap | PASS |
| Mobile menu closes on Escape, focus returns to the button | PASS |
| Menu hidden by default at 390px | PASS |
| `aria-current="page"` on the correct link, on every page | PASS (1 per page; 0 on 404, correct) |
| Header shows the full logo at rest | PASS |
| Header condenses past 90px of scroll | PASS |
| Compact lockup replaces the full logo | PASS |
| Header restores at the top of the page | PASS |
| All internal navigation links resolve | PASS |

**PASS**

---

## 3. Forms

Both forms tested by driving them, not by reading the handler.

| Check | Contact form | Careers form |
|---|---|---|
| Empty submit shows inline field errors | PASS | PASS |
| Data already typed is preserved on failure | PASS | PASS |
| `aria-invalid="true"` set on failing fields | PASS | PASS |
| Error summary announced in `aria-live` region | PASS | PASS |
| Valid submit shows the success panel | PASS | PASS |
| WhatsApp handoff link is prefilled with entered data | PASS | PASS |
| Email fallback offered alongside | PASS | PASS |
| Duplicate submission blocked while sending | PASS | PASS |

Verified specifically: a submission entered as "Kasun Perera" appears, correctly
URL-encoded, inside the generated `wa.me` link.

**PASS**

---

## 4. Contact links

| Check | Result |
|---|---|
| Floating WhatsApp button href starts `https://wa.me/` | PASS |
| `[data-tel]` links start `tel:` | PASS |
| `[data-email]` links start `mailto:` | PASS |
| Links populate on every page from the single `NB` config block | PASS |
| Contact configuration in `assets/site.js` unchanged | PASS |

Contact values are still the shipped placeholders (`94000000000`,
`hello@example.lk`, `+94 00 000 0000`). See item 1 under "Requires your
decision".

**PASS**

---

## 5. Images

| Check | Result |
|---|---|
| Every image completed loading, `naturalWidth > 0` | PASS (all pages, all widths) |
| Every `<img>` has an `alt` attribute | PASS (0 missing across all pages) |
| Hero image selects correctly from `srcset` | PASS |
| Explicit `width`/`height` set to prevent layout shift | PASS |
| Hero image not lazy-loaded (it is the LCP element) | PASS — `fetchpriority="high"` |
| No broken or missing asset paths | PASS |

Largest hero asset actually downloaded: **67 KB** (WebP), from a 1.9 MB source.

**PASS**

---

## 6. Responsive layout

Horizontal overflow measured as `scrollWidth > clientWidth` on every page.

| Width | Overflow | Header logo | Header height |
|---|---|---|---|
| 1600px | none | 230px | 260px |
| **1440px** | none | **230px** | 260px |
| 1280px | none | 230px | 260px |
| **1024px** | none | **190px** | 220px |
| 900px | none | 150px | 180px |
| **768px** | none | **150px** | 180px |
| 640px | none | 132px | 162px |
| 480px | none | 132px | 162px |
| **390px** | none | **132px** | 162px |
| **360px** | none | **132px** | 162px |
| 320px | none | 132px | 162px |

The five required widths are in bold; the rest were added for headroom.

Logo width at desktop is **230px**, inside the 220–260px target.

| Check | Result |
|---|---|
| No horizontal scrolling at any width, on any page | PASS |
| Buttons do not overflow their containers | PASS |
| Hero stacks correctly on mobile, headline and primary CTA first | PASS |
| Ambassador image crops without cutting the face | PASS |
| Long email addresses wrap rather than overflow | PASS |
| Form fields usable at 320px | PASS |

Ambassador crop values, chosen by rendering and comparing candidates:
desktop `4/5` at `88%`, tablet `3/2` at `86%`, mobile `16/10` at `85%`.

**PASS**

---

## 7. SEO preservation

| Check | Result |
|---|---|
| `<title>` present and unique on all five pages | PASS |
| `<meta name="description">` present and unique | PASS |
| Canonical link points at each page's own filename | PASS |
| `og:type`, `og:site_name`, `og:locale` present | PASS |
| `og:title` and `og:description` unique per page | PASS |
| `og:image` (1200×630) with width, height and alt | PASS |
| Twitter card tags present | PASS |
| `robots.txt` present and points at the sitemap | PASS |
| `sitemap.xml` lists the four public pages | PASS |
| `404.html` is `noindex` and absent from the sitemap | PASS |
| Favicons and apple-touch-icon retained | PASS |

**Improved during this pass:** the homepage title was 67 characters and its
description 179 — both would have been truncated in search results. Shortened to
55 and 136. No metadata was removed.

**PASS**

---

## 8. Accessibility

| Check | Result |
|---|---|
| Colour contrast, every visible text node, all pages, desktop and mobile | **PASS — zero below WCAG AA** |
| Keyboard focus visible on all interactive elements | PASS (3px solid outline) |
| Tap targets at least 44px high at 390px | PASS (0 below) |
| `prefers-reduced-motion` suppresses transitions | PASS (measured 1e-06s) |
| Skip link present and reachable | PASS |
| Semantic HTML preserved | PASS |
| Form labels correctly associated | PASS |
| `aria-live` status regions on both forms | PASS |
| Heading order descends without skipping | PASS |

The contrast test walks every element containing text, composites its real
background through any transparency to a solid colour, and computes the ratio
against the 4.5:1 and 3:1 thresholds by computed font size and weight. It found
**no failures on any page at either width**.

Note on the palette: `#C8A24A` measures 2.41:1 on white and would fail as body
text. It is restricted to borders, fills and text on dark grounds, where it
measures 6.67:1. `--gold-text` (`#8F6A16`, 4.95:1) is used for gold text on light
backgrounds. This is why the site has two golds.

**PASS**

---

## 9. Console errors

| Check | Result |
|---|---|
| `pageerror` events | 0 |
| `console.error` output | 0 |
| Failed network requests | 0 |

Checked on all five pages at all eleven widths.

**PASS**

---

## 10. Broken links

**61 internal links and asset paths checked. All resolve.**

Covered `href`, `src`, `srcset` (both `<img>` and `<source>`), stylesheet and
script references, and every favicon and icon path, across all five pages.
External schemes (`https:`, `mailto:`, `tel:`) were resolved for format only,
since they cannot be fetched from a local file.

No orphaned assets remain: `assets/crest.png` was superseded and removed after
confirming with an exact-path match that nothing referenced it.

**PASS**

---

## Requires your decision

These are not defects. They are judgement calls that belong to you.

### 1. Contact details and domain are still placeholders

`assets/site.js` still contains `94000000000`, `+94 00 000 0000` and
`hello@example.lk`. `REPLACE-WITH-YOUR-DOMAIN.lk` appears 29 times in the HTML
plus `robots.txt` and `sitemap.xml`.

Left deliberately as obvious placeholders rather than plausible-looking invented
values, so they cannot be mistaken for real details and go live by accident.

**The domain one matters more than it looks.** Facebook and WhatsApp need
absolute URLs to build a link preview. Publish with the placeholder still in and
shared links will show no preview card at all.

### 2. The motto is spelled two ways on every page

The crest artwork reads **EXCELERE**. The correct Latin is **EXCELLERE**, with a
double L. The typeset motto in the footer uses the correct spelling. Now that the
logo is in the header, both spellings appear on the same page.

Correcting the artwork is inexpensive now and expensive once it is on
certificates, signage and printed stationery.

### 3. The ambassador image and what it implies

The hero image shows a staffed reception in what reads as a physical campus. The
About page states plainly that enrolments are not open and that no accreditation
is yet held. A visitor who takes in both may notice the gap.

The image is also AI-generated. Presenting it as a brand ambassador is a
credibility risk if that is ever noticed, in a way that a clearly illustrative
image would not be. Worth revisiting once you have photographs of real students.

This is your call — the implementation follows your brief exactly either way.
