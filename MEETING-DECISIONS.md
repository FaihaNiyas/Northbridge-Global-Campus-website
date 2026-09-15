# Meeting decisions required — Northbridge Global Campus website

Branch: `feature/lead-review-v2`

Everything in this file was **deliberately not built**. Each item needs a
business decision, a verified fact, or an account that does not exist yet.
Nothing here has been guessed at or filled in with placeholder-looking content
that could be mistaken for real information.

For each item: the decision required, the options, a recommendation, why it
matters, and the files that change once it is approved.

---

## A. Programmes and curriculum

### A1 — Final programme names
- **Decision required:** the public name of each launch programme.
- **Options:** (a) keep the current descriptive subject areas; (b) publish final
  named programmes; (c) publish named programmes with a "provisional" label.
- **Recommended:** (a) until names are signed off. Renaming a published
  programme costs more trust than launching slightly later.
- **Why it matters:** names drive page titles, URLs, metadata and every CTA.
- **Files after approval:** `index.html` (`#programmes`), `sitemap.xml`, and any
  new programme pages.

### A2 — Number of launch programmes
- **Decision required:** how many programmes open first.
- **Options:** 2, 3, 4, or "not stated yet".
- **Recommended:** do not state a number until the teaching roster is confirmed.
- **Why it matters:** a stated number becomes a promise; the grid layout also
  depends on it.
- **Files after approval:** `index.html`.

### A3 — Programme detail pages
- **Decision required:** whether each programme gets its own page.
- **Options:** (a) one section on the homepage (current); (b) a page each;
  (c) a single "Programmes" index page.
- **Recommended:** (c) once A1 is settled — one page to maintain, and it gives
  the `Programmes` nav item a real destination instead of an anchor.
- **Why it matters:** the header `Programmes` link currently points at the
  homepage section, which is the honest option while no page exists.
- **Files after approval:** new `programmes.html`, header nav on all 5 pages,
  `sitemap.xml`, footer.

### A4 — Fees, dates, duration, schedule, intake
- **Decision required:** all commercial and calendar detail.
- **Options:** publish when confirmed / keep "announced soon".
- **Recommended:** keep the current neutral status line until every value is
  final. Partial information generates more enquiries than it answers.
- **Why it matters:** these are the most-asked questions and the most damaging
  to change after publication.
- **Files after approval:** `index.html`, any programme page, `contact.html`.

### A5 — Teaching language
- **Decision required:** English only, or English plus Sinhala/Tamil.
- **Recommended:** state it explicitly once decided — it is a common
  pre-enquiry question for a Sri Lankan audience.
- **Files after approval:** `index.html`, programme pages, `about.html`.

---

## B. Organisation, contact and claims

### B1 — Final domain name
- **Current state:** every canonical URL, Open Graph URL and the sitemap use
  `REPLACE-WITH-YOUR-DOMAIN.lk`.
- **Decision required:** the live domain.
- **Why it matters:** social previews and canonical tags do not work until this
  is real. It is a single find-and-replace across all HTML plus
  `robots.txt` and `sitemap.xml`.
- **Files after approval:** all 5 HTML files, `robots.txt`, `sitemap.xml`.

### B2 — Final phone number
- **Current state:** `+94 00 000 0000` in `assets/site.js` (`NB.phoneDisplay`,
  `NB.phoneDial`).
- **Files after approval:** `assets/site.js` only — every page reads from there.

### B3 — Final email address
- **Current state:** `hello@example.lk` in `assets/site.js` (`NB.email`).
- **Files after approval:** `assets/site.js` only.

### B4 — Final WhatsApp number
- **Current state:** `94000000000` in `assets/site.js` (`NB.whatsapp`).
- **Why it matters:** every form currently hands off to WhatsApp, so this is the
  single most important value on the site. Until it is real, **no enquiry can
  reach anyone.**
- **Files after approval:** `assets/site.js` only.

### B5 — Company registration number
- **Decision required:** whether to publish the registration number.
- **Recommended:** publish it. For a new education provider it is one of the
  cheapest trust signals available.
- **Files after approval:** footer on all 5 pages.

### B6 — Response-time promise
- **Current state:** the previous build promised a reply "within one working
  day" in eight places including page metadata. **All of it has been removed**
  in this pass, because nobody has confirmed the commitment can be met.
- **Decision required:** what response time, if any, to promise.
- **Options:** (a) no promise; (b) "within one working day"; (c) "within two
  working days"; (d) state office hours only.
- **Recommended:** (c) or (d). Promise less than you can do.
- **Files after approval:** `contact.html`, `careers.html`, `index.html`,
  `assets/site.js` (form status messages).

### B7 — Social media accounts
- **Decision required:** which accounts exist and should be linked.
- **Recommended:** link only accounts that are live and monitored.
- **Files after approval:** footer on all 5 pages (a reserved position is
  marked in the footer markup).

---

## C. Accreditation, proof and marketing claims

### C1 — Accreditation and awarding bodies
- **Current state:** the About page states plainly that Northbridge does not
  currently hold accreditation. That remains accurate and unchanged.
- **Decision required:** whether any application is in progress and may be
  named.
- **Recommended:** name a body only once something is granted, alongside the
  granting body.

### C2 — Certificates
- **Decision required:** what a learner receives on completion, and what it may
  be called.
- **Why it matters:** "certificate" carries regulatory weight; wording must be
  agreed before it appears.

### C3 — Testimonials, statistics, partner logos, rankings
- **Current state:** none on the site. None were invented in this pass.
- **Decision required:** whether real, attributable examples exist.
- **Recommended:** publish only with the named person or organisation's written
  permission.

### C4 — Lecturer names and biographies
- **Decision required:** whether any practitioner has agreed to be named
  publicly.
- **Why it matters:** named practitioners are strong proof, but consent must be
  explicit.

---

## D. Forms, data and analytics

### D1 — Production form provider
- **Current state:** `NB.formEndpoint` is `null`. Submitting a form therefore
  **sends nothing** — it validates, then opens WhatsApp with the details
  pre-written. The on-screen wording says exactly that and does not claim the
  message was received.
- **Decision required:** which endpoint to use (Formspree, Web3Forms, Getform,
  or a self-hosted handler).
- **Recommended:** any of the hosted options — the code already posts to an
  endpoint when one is set; only the one value changes.
- **Files after approval:** `assets/site.js` (`NB.formEndpoint`).

### D2 — CRM / LMS
- **Decision required:** where enquiries and, later, learners are managed.
- **Why it matters:** determines whether the form should post to a CRM webhook
  instead of a form provider.

### D3 — Marketing consent workflow
- **Current state:** the consent checkbox covers replying to the enquiry only.
  It does **not** grant marketing permission, and no marketing opt-in exists.
- **Decision required:** whether to add a separate, unticked marketing opt-in.
- **Recommended:** a separate optional checkbox, never pre-ticked.

### D4 — GA4 / Search Console
- **Decision required:** the property and measurement IDs.
- **Why it matters:** no analytics of any kind are installed, so there is
  currently no measurement of anything.

### D5 — Legal policy content
- **Decision required:** the text of Privacy, Terms and Refund/Cancellation
  policies.
- **Why it matters:** a refund policy is effectively required before taking a
  single payment. The footer has a reserved position but renders **no links**,
  because a policy link that 404s is worse than no link.
- **Files after approval:** new `privacy.html`, `terms.html`, `refunds.html`,
  footer on all 5 pages, `sitemap.xml`.

---

## E. Structure

### E1 — Separate Corporate page
- **Decision required:** whether corporate training gets its own page.
- **Current state:** corporate enquiries are handled as a route on the Contact
  page and an opportunity card on Teach With Us.
- **Recommended:** defer until there is corporate content worth a page.

### E2 — "Teach With Us" file name
- **Current state:** the visible name is **Teach With Us**; the file and URL
  remain `careers.html`, so no existing link breaks.
- **Decision required:** whether to rename the file to `teach-with-us.html`.
- **Recommended:** rename only with a redirect in place; the current split costs
  nothing.

---

## Summary of missing business information

| # | Missing value | Where it lives today | Blocks |
|---|---|---|---|
| B1 | Domain | `REPLACE-WITH-YOUR-DOMAIN.lk` | canonical, OG, sitemap, robots |
| B2 | Phone | `+94 00 000 0000` | phone links sitewide |
| B3 | Email | `hello@example.lk` | email links sitewide |
| B4 | WhatsApp | `94000000000` | **all form submissions** |
| B5 | Registration number | not present | footer trust signal |
| D1 | Form endpoint | `null` | forms genuinely sending |
| D4 | Analytics IDs | not present | all measurement |
| D5 | Policy text | not present | footer legal links |

B1–B4 and D1 all live in one place: the `NB` config block at the top of
`assets/site.js`, plus a single find-and-replace for the domain. No page markup
needs to change to make the site live.

---

## F. Website Copy Pack v1 — items pending confirmation

Added on branch `feature/copy-pack-v1` (15 September 2026). Sections A–E above
are unchanged.

**Copy source.** The implementation instructions for this branch ended with
"The detailed implementation brief and page copy follow:", but no brief or page
copy followed — that separate brief was **never received** and has not been
compared. The copy used instead is the Copy Pack found in the local Downloads
folder:

- `Northbridge_Website_Copy_Pack_v1.docx` — 38,101 bytes, SHA-256 `ffcd9fa6…6fec78`
- `Northbridge_Website_Copy_Pack_v1.pdf` — 350,845 bytes, SHA-256 `2614e925…a029e7`

(Version 1, 15 September 2026, "Prepared for the Founder".) The text of both
files was extracted programmatically and compared; the PDF was read as
extracted text, not inspected visually. Their RECOMMENDED copy is identical —
the only differences are extraction artefacts (dropped "fi"/"fl" ligatures,
page headers and numbers). Where the implementation instructions conflicted
with the Copy Pack (the three outcome-claim replacements, WhatsApp button and
explanation, CV note, no receipt claims, no absolute privacy promises, no
placeholder URL metadata), the instructions were followed.

The Copy Pack is **requested implementation copy, not independent
verification**: nothing in it, and nothing already in this repository, has been
checked against company records, contracts or operating practice. This branch
has **not** been deployed.

Each item: the decision needed · the evidence available · what the branch does
now · what must change after confirmation.

### F1 — Public approval of the five programme names and descriptions
- **Decision needed:** approval to publish Business FinanceSense, SpeakSmart
  English, WorkSmart with AI, Excel to Dashboard and Digital Sales Engine, with
  their descriptor lines, descriptions and "You finish with" outputs.
- **Evidence:** Copy Pack §1.2 and §2.4 describe them as the launch portfolio.
  No sign-off record was supplied. Supersedes the recommendation in A1.
- **Now:** implemented on `index.html#programmes` as draft content for this
  feature branch (each card has an anchor), and as the options of the Contact
  form's "Area you are interested in" field.
- **After confirmation:** nothing if approved as written; otherwise edit the
  five cards and the Contact form options. A2 (number of launch programmes) is
  answered by this decision.

### F2 — Deliverability of each programme output
- **Decision needed:** confirm each output can actually be produced within a
  programme (performance snapshot; delivered presentation and rewritten emails;
  two workflows "rebuilt and timed before and after"; working dashboard from
  real data; live funnel plus dashboard).
- **Evidence:** Copy Pack only. No curriculum or lecturer confirmation.
- **Now:** implemented as supplied; also repeated in the hero trust strip
  ("Every programme ends in a real output"), Home method step 4 and the FAQ.
- **After confirmation:** amend any output that cannot be guaranteed.

### F3 — Delivery mode and schedule
- **Decision needed:** confirm programmes are online, short, "designed around a
  working week — evenings and weekends", and whether sessions run on Saturdays.
- **Evidence:** Copy Pack only (hero eyebrow "· ONLINE", hero H1 "Learn it on
  Saturday. Use it on Monday.", FAQ, About commitment "Built for real people").
- **Now:** implemented as supplied. The H1 implies weekend sessions.
- **After confirmation:** if delivery or schedule differs, revise the hero
  eyebrow, H1, subhead, trust strip, programmes body, "Where this is going", FAQ
  and About commitments. Links to A5 (teaching language).

### F4 — Practitioner-led teaching claims
- **Decision needed:** whether these can stand before any lecturer is engaged:
  "Your lecturers are practising professionals … because they made those calls
  last week"; "People who made the decision you are studying, recently, with
  something at stake"; "the person teaching you did this work recently";
  "Lecturer details are published for each programme before enrolment opens";
  "building each programme carefully with experienced practitioners".
- **Evidence:** Copy Pack only; C4 (named lecturers) is still open.
- **Now:** implemented as supplied on Home, About and the FAQ.
- **After confirmation:** soften to future tense ("will be taught by …") if no
  practitioners are contracted at launch.

### F5 — Certificate of completion
- **Decision needed:** as C2 — whether learners receive a certificate of
  completion and whether it may be called that.
- **Evidence:** Copy Pack FAQ ("A Northbridge certificate of completion records
  what you did") and Part 7, block 10. C2 remains unresolved.
- **Now:** implemented in the Home FAQ answer "Then what am I actually getting?".
- **After confirmation:** remove or rename the sentence if C2 decides otherwise.

### F6 — Programme ladder and future programme areas
- **Decision needed:** whether Commercial FinanceSense, Executive FinanceSense
  and "further programmes in leadership, people and performance, creative work
  with AI and entrepreneurship" may be announced.
- **Evidence:** Copy Pack §2.4 ("it is already the plan"). No roadmap document.
- **Now:** implemented under the programme cards and on the first card.
- **After confirmation:** remove named future programmes that are not planned.

### F7 — Outcome claims (employment, income, sales, productivity)
- **Decision needed:** whether evidence exists for outcome statements.
- **Evidence:** none — Copy Pack §1.3 itself notes there is no completed cohort.
- **Now — replaced (neutral alternatives specified in the implementation
  instructions; these are the only outcome claims that were reworded, and no
  outcome claim was omitted):**
  | Copy Pack wording | Implemented wording |
  |---|---|
  | Do a day’s work in an hour — and know exactly when not to trust it. | Use AI to work more efficiently — and know when to check its output. |
  | Every programme is designed to add a service you can charge for. | Build practical skills you can apply to client work. |
  | Graduates who can do things get hired ahead of graduates who know things. | Practical outputs give you concrete examples to discuss with potential employers. |
- **Now — implemented as supplied, flagged:** "That is how work starts coming to
  you"; "Sales funnels that actually convert"; "Skills like these change the size
  of the projects you can credibly quote for, and they change how quickly you can
  deliver them"; "emails that get answered the same day"; "Turn attention into
  enquiries, and enquiries into paying customers".
- **After confirmation:** keep the replacements until learner results exist;
  revise the flagged lines if they cannot be defended.

### F8 — Early access: CTA labels without an early-access list
- **Decision needed:** whether an early-access list exists, how people join it,
  and how often it is contacted.
- **Evidence:** none. Both forms only prepare a WhatsApp message (see F12) and
  the only consent collected is to reply to an enquiry (D3).
- **Now:** the Copy Pack's CTA labels are used ("Get Early Access", "Get early
  access"); they lead to the Contact form with "I want to learn" preselected.
  **Omitted** because they promise a list or ongoing messages that do not exist:
  "each early-access list closes when the cohort fills"; "we will send you what
  is relevant — nothing else"; "Get early access and you will hear first";
  "Register for early access and you will hear before anyone else".
- **After confirmation:** once a list and a separate marketing opt-in (D3) exist,
  restore those sentences and add the opt-in to the forms.

### F9 — Data-handling and mailing promises
- **Decision needed:** a verified data-handling and communications practice, and
  a reviewed privacy policy (D5).
- **Evidence:** none.
- **Now — omitted:** "One short form. No spam, no daily emails, and we will not
  pass your details to anyone." (Home, Start here) and "Your details stay with
  Northbridge — we will not pass them to anyone, and we will not add you to a
  mailing list unless you ask us to." (Contact form introduction).
- **After confirmation:** publish only statements the policy supports, linked to
  the policy page.

### F10 — Who reads enquiries
- **Decision needed:** who reads form and WhatsApp enquiries.
- **Evidence:** none.
- **Now — omitted:** "A person reads every message." (Home route "I have a
  question"), "A person reads every message," (Contact route "Something else"),
  "A practitioner reads every submission personally," (Teach With Us form).
- **After confirmation:** restore if it is a staffed commitment.

### F11 — Response times
- **Decision needed:** as B6.
- **Evidence:** none; B6 records that earlier response-time promises were
  removed because nobody confirmed them.
- **Now — omitted:** "We aim to reply within one working day. WhatsApp is usually
  fastest." (Contact) and the reply windows inside the Copy Pack's post-submission
  messages.
- **After confirmation:** add the agreed wording to Contact and Teach With Us.

### F12 — What the forms actually do
- **Decision needed:** as D1 — whether a form endpoint will be configured.
- **Evidence:** `assets/site.js` — `NB.formEndpoint` is `null`.
- **Now:** both forms validate, then open WhatsApp with the details written out.
  Nothing is sent or stored by the page, and opening WhatsApp does not send the
  message. Submit buttons read "Continue to WhatsApp"; the text above them reads
  "This form prepares a WhatsApp message. Review it and tap Send in WhatsApp to
  send your enquiry." **Omitted:** the Copy Pack's post-submission confirmations
  ("Thank you — that has reached us …", "Thank you — your message has reached us
  …") because nothing has been received when they would appear. The Teach With
  Us CV note now says the CV can be attached in the WhatsApp conversation.
- **After confirmation:** if an endpoint is configured, change both button labels
  and the handoff sentence, and review the endpoint success/failure messages in
  `site.js` before enabling it.

### F13 — Contact form introduction did not match the form
- **Decision needed:** none unless the form is shortened.
- **Evidence:** the Contact form has four required inputs plus a required
  consent box.
- **Now:** "Two required fields and a message." was not used; the existing
  accurate sentence "Fields marked * are required." precedes the Copy Pack's
  "Everything else just helps us give you a better answer."
- **After confirmation:** use the Copy Pack sentence only if the form is reduced
  to two required fields and a message.

### F14 — Teach With Us operating claims
- **Decision needed:** confirm "Paid per engagement"; "We handle the platform,
  the learners and the admin"; "a visible platform under your own name"; "with
  Northbridge bringing the relationship and the structure"; "We come back to you
  when there is a programme that fits".
- **Evidence:** Copy Pack §4.2 ("it is already how you operate"); D2 (platform)
  is still open.
- **Now:** implemented as supplied.
- **After confirmation:** remove any arrangement that is not in place.

### F15 — Enquiry-type options and route names differ
- **Decision needed:** whether to rename the Contact form's enquiry types to
  match the new routes ("I represent an organisation", "Something else").
- **Evidence:** Copy Pack §2.9 and §5.1 name the routes; the form options are
  existing routing values.
- **Now:** form options and field names unchanged, so existing enquiry routing
  is preserved; route links preselect the nearest option.
- **After confirmation:** update option text in `contact.html` and the route map
  in `initEnquiryPreselect()` in `assets/site.js` together.

### F16 — Company registration number
- **Decision needed:** as B5.
- **Evidence:** Copy Pack marks it "[INSERT]".
- **Now — omitted** from the footer and the About "plain facts" list, rather than
  publishing the placeholder.
- **After confirmation:** add "· Company No. …" to the footer bottom line on all
  five pages and to the first About fact.

### F17 — Crest motto artwork reads "EXCELERE"
- **Decision needed:** approve corrected artwork ("EXCELLERE").
- **Evidence:** Copy Pack §3.3 and Part 9 — fix before the crest appears on the
  website.
- **Now:** the crest figure beside About "Our name" is displayed exactly as in
  the approved baseline. v4.0 had removed it; the v4.1 review restored it,
  because the instruction was to preserve the approved design and defer the
  artwork correction. Preserved: the file `assets/northbridge-crest.png`
  (byte-identical, 240×187), its `width`/`height` attributes and baseline alt
  text, the 7fr/4fr placement beside the copy from 64em (stacked below the copy
  on narrower screens), 220px width on desktop and `min(200px, 60%)` below
  64em, and the display-only 2.5% bottom clip. The artwork still reads
  EXCELERE and has not been edited. The header logo lockup, which also contains
  the ribbon, is unchanged.
- **Note on the alt text:** the baseline alt text reads "…above a ribbon reading
  Discere Conectere Excellere" — the intended spelling, not the spelling on the
  artwork as it stands.
- **Before publication:** the Copy Pack says the artwork must be corrected
  *before* the crest appears on the website. This branch is not deployed; if it
  is to be published before corrected artwork exists, decide whether the crest
  may appear as is.
- **After confirmation:** supply corrected artwork for both the crest and the
  logo lockup and replace the two files; no markup or CSS change is needed.

### F18 — Production domain and URL metadata
- **Decision needed:** as B1 — the production domain.
- **Evidence:** the Copy Pack reviewed a Netlify address
  (`chipper-conkies-9e216e.netlify.app`). That is a review deployment and is not
  stated to be production; do not use it for canonical or social URLs unless it
  is explicitly confirmed as the production domain.
- **What was removed, and why:** every URL removed on this branch pointed at
  the placeholder `https://REPLACE-WITH-YOUR-DOMAIN.lk`; no valid URL was
  removed. On all five pages (including `404.html`) the baseline carried a
  canonical link, `og:url`, `og:image` with width/height/alt, `twitter:card`
  `summary_large_image` and `twitter:image`. `robots.txt` carried
  `Sitemap: https://REPLACE-WITH-YOUR-DOMAIN.lk/sitemap.xml`. `sitemap.xml`
  listed exactly four URLs, all on the placeholder domain: `index.html`
  (priority 1.0), `about.html` (0.8), `careers.html` (0.7), `contact.html` (0.9).
- **Now:** titles, descriptions, `og:type`, `og:site_name`, `og:locale`,
  `og:title`, `og:description`, `twitter:title` and `twitter:description` are
  present and match the new copy; `twitter:card` is `summary` (no image); a
  comment in each `<head>` marks where the URL tags belong.
- **After confirmation — exact restoration** (replace `https://DOMAIN` with the
  confirmed origin, no trailing slash):
  1. In `index.html`, `about.html`, `careers.html` and `contact.html`, replace the
     `<head>` comment with the following, using the page's own file name
     (`index.html` for Home, matching the baseline):
     ```html
     <link rel="canonical" href="https://DOMAIN/about.html" />
     <meta property="og:url" content="https://DOMAIN/about.html" />
     <meta property="og:image" content="https://DOMAIN/assets/og-image.png" />
     <meta property="og:image:width" content="1200" />
     <meta property="og:image:height" content="630" />
     <meta property="og:image:alt" content="The Northbridge Global Campus crest and wordmark on a navy background." />
     ```
     and change `twitter:card` to `summary_large_image`, adding
     `<meta name="twitter:image" content="https://DOMAIN/assets/og-image.png" />`.
  2. In `404.html` (which is `noindex`), add only the `og:image` group and
     `twitter:image`; a canonical on the 404 page is not needed.
  3. Recreate `sitemap.xml`:
     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url><loc>https://DOMAIN/index.html</loc><priority>1.0</priority></url>
       <url><loc>https://DOMAIN/about.html</loc><priority>0.8</priority></url>
       <url><loc>https://DOMAIN/careers.html</loc><priority>0.7</priority></url>
       <url><loc>https://DOMAIN/contact.html</loc><priority>0.9</priority></url>
     </urlset>
     ```
  4. Add `Sitemap: https://DOMAIN/sitemap.xml` as the last line of `robots.txt`.
  5. `assets/og-image.png` shows the crest; check its ribbon against F17 before
     relying on it as the share image.
  6. After publishing, re-scrape one URL in the Facebook Sharing Debugger (see
     `README.md`).

### F19 — Contact destinations are placeholders
- **Decision needed:** as B2–B4.
- **Evidence:** `assets/site.js` — WhatsApp `94000000000`, phone
  `+94 00 000 0000`, email `hello@example.lk`.
- **Now — enquiries are not operational.** The three values are unchanged and
  labelled as placeholders in the config block; they are the only contact
  destinations anywhere in the site files. As rendered with JavaScript on
  (checked in a browser on all five pages, v4.1 review):
  - `https://wa.me/94000000000` — footer "WhatsApp us" and the floating WhatsApp
    button on every page; Contact hero "Message us on WhatsApp" and the WhatsApp
    contact tile; the prefilled text of both forms and the "Continue to
    WhatsApp" fallback link in the form status note.
  - `tel:+94000000000` (shown as "+94 00 000 0000") — footer on every page and
    the Contact phone tile.
  - `mailto:hello@example.lk` — footer on every page, the Contact email tile and
    the "Send by email instead" fallback in the form status note.
  - The header has no contact link.

  A visitor who completes either form reaches a WhatsApp chat with a number that
  reaches no one, or an email to a reserved example domain. **Not
  production-ready.**
- **Without JavaScript:** every WhatsApp, phone and email link is `href="#"`, and
  the phone and email labels read "Loading…" (the footer on every page and the
  Contact tiles). This is baseline behaviour, not introduced on this branch,
  and matches the Copy Pack's Part 9 observation of the live site. The forms
  themselves also need JavaScript to prepare the WhatsApp message.
- **After confirmation:** set `whatsapp`, `phoneDisplay`, `phoneDial` and `email`
  in `assets/site.js`, then send one test message through each form to the real
  number before publishing. Decide separately whether the HTML should carry
  the confirmed details directly, so they still work without JavaScript.

### F20 — Deferred Copy Pack sections (not built on this branch)
- **"Programmes" navigation label** (Part 9.4): still an in-page anchor; see A3.
- **Organisations and corporate section** (Part 6): deferred; see E1.
- **Programme page template** (Part 7): no programme pages built; the FAQ line
  "it will say so plainly on its own page" anticipates them.
- **Policy pages** (Part 9.7): none built and none linked; see D5. No legal or
  compliance wording was added.
- **Payments, backend, CRM** : not in scope; see D1–D2.
- **Homepage enrolment-status line above the fold** (Part 9.5): the hero now
  leads with "Get Early Access", and the FAQ states enrolments are not open; no
  extra status line was invented.
