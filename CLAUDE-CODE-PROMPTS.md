# Claude Code prompts for the Northbridge Global Campus website

Ten prompts you can copy and paste. Each one is written to be pasted on its own —
they restate the constraints, because an assistant with no memory of this project
will otherwise undo things that matter.

**Before you start, read this once.** The five rules below appear in most of the
prompts, and they exist because breaking any of them causes a real problem:

1. Colours come only from the tokens at the top of `assets/styles.css`. Never
   type a hex code anywhere else.
2. `#C8A24A` fails contrast as text on white (2.41:1). Gold text on a light
   background must use `--gold-text` (`#8F6A16`).
3. Contact details live only in the `NB` config block in `assets/site.js`.
4. Nothing goes on the site that cannot be evidenced — no invented courses,
   accreditations, partnerships, rankings, statistics or testimonials.
5. No page in the navigation may be empty.

---

## 1. Analyzing the full website

```
Analyse this website completely before changing anything. It is a static site in
plain HTML, CSS and JavaScript, with no framework and no build step.

Do all of the following and report back before editing:

1. List every file and say what each one is for.
2. Read assets/styles.css and summarise the design system: the colour tokens,
   the type scale, the spacing rhythm, the radius and shadow scales, and the
   breakpoints in use.
3. Read assets/site.js and explain the contact configuration, the navigation
   toggle, the two-state header, and how both forms validate and submit.
4. Explain how about.html, careers.html, contact.html and 404.html relate to
   index.html — specifically, which parts of the markup are shared.
5. List every place a contact detail, domain name or placeholder appears.
6. Flag anything inconsistent, broken, duplicated or accessibility-risky.

Do not change any file yet. Give me the analysis first.
```

---

## 2. Editing website content safely

```
I want to change some wording on this static HTML site.

[Describe exactly what you want changed, and on which page.]

Rules while you do it:
- Change only the words I have asked about. Do not rewrite surrounding copy,
  restructure sections, or "improve" anything I did not mention.
- Do not touch any CSS class, id, data- attribute or ARIA attribute.
- Do not change any <meta> tag, Open Graph tag, canonical link, robots.txt or
  sitemap.xml.
- Do not add any claim that cannot be evidenced — no courses, accreditations,
  partnerships, rankings, statistics or testimonials that are not already there.
- Keep the reading level plain and the sentences short. Match the existing voice:
  direct, warm, no marketing clichés.

The header and footer are duplicated across all five HTML files. If the change
touches either, apply it identically to index.html, about.html, careers.html,
contact.html and 404.html, then show me a diff proving all five now match.
```

---

## 3. Adding a new page

```
Add a new page called [PAGE NAME] at [filename].html to this static site.

Build it by copying about.html and replacing only the contents of <main>. That
guarantees the header, footer, floating WhatsApp button and all metadata stay
identical to the rest of the site.

Then:
1. Update the <title> and <meta name="description"> for the new page.
2. Update the canonical link and og:url to point at the new filename.
3. Give it its own og:title and og:description — do not leave the homepage text.
4. Add it to the <ul> in the header nav of ALL five existing pages plus the new
   one, and to the "Pages" list in the footer of all of them.
5. Add it to sitemap.xml with a sensible priority.
6. Set aria-current="page" on its own nav link, and only on that page.

Use only existing CSS classes — .shell, .measure, .eyebrow, .section-lede,
.prose-grid, .steps, .fact-list, .btn. Do not add new CSS unless I ask, and if
you must, add it to assets/styles.css using the existing tokens, never inline.

Only add this page to the navigation if it has real, finished content. An empty
or "coming soon" page must not appear in the nav.

Finally, confirm no horizontal scrolling at 360px and 1440px.
```

---

## 4. Adding a new course page

```
Add a course page for [COURSE NAME] to this static site.

Critical: only include information I explicitly give you below. Do not invent a
syllabus, duration, price, start date, intake, entry requirement, accreditation,
awarding body, tutor name, class size, outcome statistic or testimonial. If a
detail is missing, leave it out or write "to be confirmed" — do not fill the gap
with something plausible. This site's credibility depends on that.

Here is everything that is confirmed:
[Paste the confirmed details. Anything not listed here does not go on the page.]

Build it as courses/[slug].html or [slug].html, copying about.html and replacing
only <main>, so the header, footer and metadata stay identical.

Include: what the course is, who it is for, what a learner will be able to do
afterwards, and a clear call to action pointing at contact.html.

Follow the same nav, footer, sitemap, canonical, og: and aria-current steps as
when adding any new page.

Do not add the page to the header navigation until I confirm enrolment is
actually open. Until then, leave it out of the nav — a live nav link to a course
nobody can enrol in is worse than no link.
```

---

## 5. Updating contact details

```
Update the contact details on this website to:

  WhatsApp number:  [e.g. 077 123 4567]
  Phone (display):  [e.g. +94 77 123 4567]
  Email:            [e.g. hello@example.lk]

Change these ONLY in the NB config block at the top of assets/site.js. Do not
hard-code a phone number, email address or WhatsApp link into any HTML file —
the whole site reads from that one block.

For the WhatsApp number, convert it to full international format with no leading
zero, no spaces and no plus sign: 077 123 4567 becomes 94771234567. Set
phoneDial to the +94 form with no spaces, and phoneDisplay to the readable form.

Then verify by opening each page and checking that:
- the floating WhatsApp button href starts with https://wa.me/94...
- every [data-tel] link starts with tel:
- every [data-email] link starts with mailto:
- the phone and email text render on the contact page and in the footer
- submitting the contact form produces a prefilled WhatsApp link containing the
  details that were typed in

Report what you verified.
```

---

## 6. Fixing responsive issues

```
There is a responsive problem on this site: [describe what you see, and at what
screen width].

Diagnose it before fixing it. Do not guess. Specifically:

1. Load the affected page at that width in a headless browser.
2. Compare document.documentElement.scrollWidth against clientWidth to confirm
   whether the page actually overflows.
3. If it does, walk every element and report which ones have a right edge beyond
   the viewport. Name the actual offending element — the cause is usually a flex
   or grid child that cannot shrink below its content (needs min-width:0) or a
   long unbreakable string (needs overflow-wrap:anywhere).
4. Only then apply the smallest fix that addresses the real cause.

After fixing, re-test every page — index, about, careers, contact, 404 — at 320,
360, 390, 480, 640, 768, 1024, 1280 and 1440px, and confirm scrollWidth never
exceeds clientWidth at any of them.

Use the existing tokens and breakpoints in assets/styles.css. Do not introduce a
new breakpoint unless there is no alternative, and say so if you do.
```

---

## 7. Improving SEO

```
Improve the SEO of this static site without changing how it looks or what it
claims.

Do:
- Check every page has exactly one <h1>, and that heading levels descend without
  skipping.
- Check every page has a unique <title> under about 60 characters and a unique
  <meta name="description"> of roughly 150 to 160 characters.
- Check canonical and og:url point at that page's own filename, not the homepage.
- Check every page has its own og:title and og:description.
- Check every <img> has meaningful alt text, and that decorative images have
  alt="".
- Check sitemap.xml lists every public page and no private ones, and that 404.html
  is noindex and absent from the sitemap.
- Suggest JSON-LD structured data of type EducationalOrganization, using ONLY
  facts already on the site — name, description, URL, logo, and contact details.

Do not:
- Invent or exaggerate any claim to win a keyword.
- Add courses, accreditations, ratings, review counts or aggregate statistics to
  structured data. Fabricated structured data can get a site penalised.
- Keyword-stuff the copy or change the site's voice.

Show me each proposed change with a before and after before applying it.
```

---

## 8. Running a complete QA check

```
Run a full QA pass on this static site and give me a written report. Test it —
do not read the code and assume.

Use a headless browser and check all five pages (index, about, careers, contact,
404):

1. Responsive: at 320, 360, 390, 480, 640, 768, 1024, 1280, 1440 and 1600px,
   confirm scrollWidth never exceeds clientWidth. Name any offending element.
2. Console: capture pageerror and console.error. There must be none.
3. Images: confirm every image has completed loading and naturalWidth > 0.
4. Links: confirm every internal href and asset path resolves to a real file.
5. Contact links: confirm the WhatsApp href starts with https://wa.me/, tel:
   links start with tel:, mailto: links start with mailto:.
6. Forms: on both forms, submit empty and confirm inline errors appear and typed
   data is preserved; then fill correctly, submit, and confirm the success panel
   with the prefilled WhatsApp handoff appears.
7. Navigation: confirm the mobile menu opens, closes on Escape, and that
   aria-current="page" is on the correct link on every page.
8. Header: confirm it condenses on scroll and restores at the top.
9. Tap targets: confirm every button, nav link and card action is at least 44px
   high at 390px.
10. Contrast: for every visible text node, composite its real background through
    any transparency and compute the contrast ratio. Flag anything under 4.5:1
    for normal text or 3:1 for large text.
11. Reduced motion: emulate prefers-reduced-motion: reduce and confirm
    transition durations collapse to near zero.

Report PASS or FAIL per check with the actual measured numbers. For any FAIL,
diagnose the real cause before proposing a fix.
```

---

## 9. Preparing the website for deployment

```
Prepare this static site for deployment and tell me exactly what is left to do.

Check and report on:
1. Whether the NB config block in assets/site.js still contains placeholder
   contact details (94000000000, hello@example.lk, +94 00 000 0000). List every
   placeholder still present.
2. Whether REPLACE-WITH-YOUR-DOMAIN.lk still appears anywhere. Count the
   occurrences per file. This must be zero before publishing, because Facebook
   and WhatsApp need absolute URLs to build a link preview.
3. That robots.txt and sitemap.xml both point at the real domain.
4. That 404.html is noindex and is not listed in sitemap.xml.
5. That no page references a file that does not exist.
6. Total page weight per page, and the largest single asset on each.
7. That there are no leftover temporary files, editor backups, .DS_Store files,
   nested ZIPs or unused assets in the folder.

Then give me a numbered pre-flight checklist of everything I personally still
have to do before it goes live, in the order I should do it.

Do not deploy anything or change the domain yourself — just report.
```

---

## 10. Making future design improvements without breaking functionality

```
I want to make a design change to this site: [describe it].

Work within the existing system rather than replacing it:

- Use the colour tokens at the top of assets/styles.css. Never type a hex code
  anywhere else. If the change genuinely needs a new colour, add it as a token
  and tell me why.
- Remember that #C8A24A fails contrast as text on white (2.41:1). Gold text on a
  light background must use --gold-text (#8F6A16).
- Use the existing --radius, shadow and spacing scales. Do not introduce a second
  radius or a new shadow style.
- Reuse existing classes (.btn, .steps, .prose-grid, .method, .field, .note)
  rather than creating parallel ones that do the same job.
- Never use inline styles.
- Keep semantic HTML. Do not replace a <button> or <a> with a <div>.
- Keep every ARIA attribute, aria-live region and focus state working.
- Respect prefers-reduced-motion for anything that animates.
- Do not touch the NB config block, the form submission logic, any meta or Open
  Graph tag, robots.txt or sitemap.xml.

Before you finish, re-test all five pages at 360px and 1440px for horizontal
overflow, confirm no console errors, confirm both forms still validate and
produce the WhatsApp handoff, and confirm contrast still passes WCAG AA
everywhere. Report the results.

If my request would break any of the above, say so and propose an alternative
rather than doing it anyway.
```
