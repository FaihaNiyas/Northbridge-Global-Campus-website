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
