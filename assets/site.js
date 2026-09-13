/* ============================================================================
   NORTHBRIDGE GLOBAL CAMPUS — site.js
   Plain JavaScript. No libraries. Roughly 5 KB.

   >>> EDIT THE CONFIG BLOCK BELOW AND NOTHING ELSE <<<
   ========================================================================= */

const NB = {
  /* Your WhatsApp number in full international format, digits only.
     Sri Lanka example: 94771234567  (94 + number without the leading 0) */
  whatsapp: '94000000000',

  /* Shown on the page and used for tel: links. Keep the +94 spacing readable. */
  phoneDisplay: '+94 00 000 0000',
  phoneDial:    '+94000000000',

  email: 'hello@example.lk',

  /* WHERE FORMS GO.
     Leave as null and every form still works: it validates, then hands the
     visitor a one-tap WhatsApp message with their details already written out.
     That costs nothing and works from day one.

     When you are ready for forms to land in an inbox instead, create a free
     endpoint (Formspree, Web3Forms, Getform or similar) and paste the URL here.
     Nothing else needs to change. */
  formEndpoint: null
};

/* ---------------------------------------------------------------- helpers */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

function fillContactDetails() {
  $$('[data-wa]').forEach(el => {
    const msg = el.dataset.wa || 'Hello Northbridge, I would like to know more.';
    el.href = `https://wa.me/${NB.whatsapp}?text=${encodeURIComponent(msg)}`;
  });
  $$('[data-tel]').forEach(el => { el.href = `tel:${NB.phoneDial}`; });
  $$('[data-tel-text]').forEach(el => { el.textContent = NB.phoneDisplay; });
  $$('[data-email]').forEach(el => { el.href = `mailto:${NB.email}`; });
  $$('[data-email-text]').forEach(el => { el.textContent = NB.email; });
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
}

/* ------------------------------------------------------------ navigation */
/* One panel, several ways out: the Menu/Close button, the dedicated close button
   inside the panel, any navigation link, a tap on the veil around the panel,
   tabbing out of the header, or the Escape key. While it is open the page is
   locked so it cannot scroll away under the panel. */
function initNav() {
  const btn = $('.nav-toggle');
  const nav = $('#site-nav');
  if (!btn || !nav) return;

  const label = $('.nav-toggle-label', btn);
  const closeBtn = $('.nav-close', nav);
  const head = $('.site-head');
  const desktop = window.matchMedia('(min-width: 60em)');
  const isOpen = () => nav.classList.contains('is-open');

  function setOpen(open, { returnFocus = false } = {}) {
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    if (label) label.textContent = open ? 'Close' : 'Menu';
    // lock on <html>, not <body>: body clips horizontal overflow, and making it
    // a scroll container would unstick the header
    document.documentElement.classList.toggle('nav-open', open);
    if (!open && returnFocus) btn.focus();
  }

  btn.addEventListener('click', () => setOpen(!isOpen()));

  if (closeBtn) {
    closeBtn.addEventListener('click', () => setOpen(false, { returnFocus: true }));
  }

  nav.addEventListener('click', e => {
    if (!isOpen()) return;
    // following a link should not leave the panel open behind the new page
    if (e.target.closest('a')) setOpen(false);
    // a tap on the veil around the panel (not the panel itself) closes it too
    else if (e.target === nav) setOpen(false, { returnFocus: true });
  });

  // Escape closes the panel and returns focus to the button
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen()) setOpen(false, { returnFocus: true });
  });

  // tabbing out of the header closes the panel rather than leaving it open
  // over content that now has focus
  if (head) {
    head.addEventListener('focusout', e => {
      if (isOpen() && e.relatedTarget && !head.contains(e.relatedTarget)) setOpen(false);
    });
  }

  // widening past the mobile breakpoint must not leave the page locked
  const onBreakpoint = () => { if (desktop.matches && isOpen()) setOpen(false); };
  if (desktop.addEventListener) desktop.addEventListener('change', onBreakpoint);
  else if (desktop.addListener) desktop.addListener(onBreakpoint);
}

/* ------------------------------------------------- conditional form fields */
/* A field carrying data-when="Option A|Option B" is shown only while the form's
   enquiry-type select holds one of those values. Hidden fields are skipped by
   validation and left out of the message. With JavaScript off nothing is
   hidden, so the field simply stays visible and optional. */
function initConditionalFields() {
  $$('form[data-form-name]').forEach(form => {
    const conditionals = $$('[data-when]', form);
    if (!conditionals.length) return;
    const trigger = $('select[name="Enquiry type"]', form);
    if (!trigger) return;

    function sync() {
      conditionals.forEach(f => {
        const wanted = f.dataset.when.split('|');
        f.hidden = !wanted.includes(trigger.value);
      });
    }
    trigger.addEventListener('change', sync);
    sync();
  });
}

/* ----------------------------------------------------------- form checks */
const RULES = {
  name:    v => v.trim().length >= 2      || 'Please enter your full name.',
  phone:   v => /^[\d\s+()-]{7,}$/.test(v.trim()) || 'Please enter a phone number we can reach you on.',
  email:   v => v.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please check the email address.',
  select:  v => v !== ''                  || 'Please choose an option.',
  message: v => v.trim().length >= 10     || 'Please tell us a little more — at least a sentence.',
  consent: v => v === true                || 'Please tick the box so we know we may reply to you.',
  url:     v => v.trim() === '' || /^https?:\/\/[^\s.]+\.[^\s]{2,}$/.test(v.trim())
                                          || 'Please give a full link, starting with https://'
};

function validateField(field) {
  const input = $('input, select, textarea', field);
  if (!input) return true;
  const rule = RULES[field.dataset.rule];
  if (!rule) return true;

  const value = input.type === 'checkbox' ? input.checked : input.value;
  const result = rule(value);

  if (result === true) {
    field.classList.remove('has-error');
    input.removeAttribute('aria-invalid');
    return true;
  }
  field.classList.add('has-error');
  input.setAttribute('aria-invalid', 'true');
  const err = $('.err', field);
  err.textContent = result;
  // point the input at its own error text so assistive tech announces it
  if (err.id) {
    const described = (input.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
    if (!described.includes(err.id)) {
      described.push(err.id);
      input.setAttribute('aria-describedby', described.join(' '));
    }
  }
  return false;
}

function buildMessage(form) {
  const lines = [`Enquiry from the Northbridge website — ${form.dataset.formName}`, ''];
  $$('.field', form).forEach(field => {
    if (field.hidden) return;               // a conditional field that is not in play
    const input = $('input, select, textarea', field);
    if (!input || input.type === 'checkbox') return;
    const label = $('label', field);
    const value = input.value.trim();
    if (value) lines.push(`${label.textContent.replace(/\s*\(optional\)\s*/i, '').replace(/\*/g, '').trim()}: ${value}`);
  });
  return lines.join('\n');
}

function initForms() {
  $$('form[data-form-name]').forEach(form => {
    const status = $('.form-status', form);
    const submit = $('button[type="submit"]', form);
    let sending = false;

    // Validate a field once the visitor has left it, not while they type
    $$('.field', form).forEach(field => {
      const input = $('input, select, textarea', field);
      if (!input) return;
      input.addEventListener('blur', () => { if (field.classList.contains('has-error') || input.value) validateField(field); });
      input.addEventListener('input', () => { if (field.classList.contains('has-error')) validateField(field); });
    });

    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (sending) return;                         // no duplicate submissions

      const fields = $$('.field', form).filter(f => f.hidden !== true);
      const bad = fields.filter(f => !validateField(f));

      if (bad.length) {
        status.innerHTML =
          `<div class="note bad" role="alert"><h3>Please check ${bad.length} field${bad.length > 1 ? 's' : ''}</h3>
           <p>We have marked ${bad.length > 1 ? 'them' : 'it'} below. Nothing you typed has been lost.</p></div>`;
        const input = $('input, select, textarea', bad[0]);
        input.focus();
        input.scrollIntoView({ block: 'center', behavior: 'smooth' });
        return;
      }

      sending = true;
      submit.setAttribute('aria-busy', 'true');
      submit.dataset.label = submit.textContent;
      submit.textContent = 'Sending…';
      status.innerHTML = '';

      const message = buildMessage(form);

      // No endpoint configured: hand over to WhatsApp, prefilled.
      if (!NB.formEndpoint) {
        const link = `https://wa.me/${NB.whatsapp}?text=${encodeURIComponent(message)}`;
        status.innerHTML =
          `<div class="note ok" role="status"><h3>Almost done — one tap left</h3>
           <p>Nothing has been sent yet. Tap below and WhatsApp will open with your details already written out &mdash; sending that message is what reaches us.</p>
           <div class="btn-row">
             <a class="btn btn-primary" href="${link}" target="_blank" rel="noopener">Send on WhatsApp</a>
             <a class="btn btn-secondary" href="mailto:${NB.email}?subject=${encodeURIComponent(form.dataset.formName)}&body=${encodeURIComponent(message)}">Send by email instead</a>
           </div></div>`;
        status.scrollIntoView({ block: 'center', behavior: 'smooth' });
        sending = false;
        submit.removeAttribute('aria-busy');
        submit.textContent = submit.dataset.label;
        return;
      }

      // Endpoint configured: post it.
      try {
        const res = await fetch(NB.formEndpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form)
        });
        if (!res.ok) throw new Error(res.status);

        form.reset();
        fields.forEach(f => f.classList.remove('has-error'));
        status.innerHTML =
          `<div class="note ok" role="status"><h3>Thank you — we have your message</h3>
           <p>Your message has reached Northbridge and someone will read it. If it is urgent, message us on WhatsApp as well.</p>
           <div class="btn-row"><a class="btn btn-secondary" data-wa href="#">Message on WhatsApp</a></div></div>`;
        fillContactDetails();
      } catch (err) {
        const link = `https://wa.me/${NB.whatsapp}?text=${encodeURIComponent(message)}`;
        status.innerHTML =
          `<div class="note bad" role="alert"><h3>That did not go through</h3>
           <p>Something went wrong at our end, not yours. Your details are still in the form. Please try again, or send them straight to us:</p>
           <div class="btn-row">
             <a class="btn btn-primary" href="${link}" target="_blank" rel="noopener">Send on WhatsApp</a>
             <a class="btn btn-secondary" data-tel href="#">Call us</a>
           </div></div>`;
        fillContactDetails();
      } finally {
        sending = false;
        submit.removeAttribute('aria-busy');
        submit.textContent = submit.dataset.label;
        status.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    });
  });
}

/* ------------------------------------------------------- compact header */
/* Once the visitor scrolls, the header gains a soft shadow and a firmer gold
   hairline. Its height and background never change. Purely a class toggle —
   CSS does the rest, and the transition is disabled under reduced-motion. */
function initHeader() {
  const head = $('.site-head');
  if (!head) return;

  const COMPACT_AT = 90;   // px scrolled before the header condenses
  const RELEASE_AT = 40;   // hysteresis, so it cannot flicker on small moves
  let ticking = false;

  function update() {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    if (!head.classList.contains('is-compact') && y > COMPACT_AT) {
      head.classList.add('is-compact');
    } else if (head.classList.contains('is-compact') && y < RELEASE_AT) {
      head.classList.remove('is-compact');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }, { passive: true });

  update();   // correct state on load, e.g. when arriving at an #anchor
}

/* -------------------------------------------------- floating WhatsApp reveal */
/* The button is fixed to the bottom-right corner. On anything shorter than a
   tall desktop that corner falls inside the hero, so it covers the ambassador
   figure and competes with the hero's own call to action. Hold it back until
   the hero has been scrolled past. Pages with no hero show it straight away. */
function initFloat() {
  const wa = $('.wa-float');
  if (!wa) return;

  const hero = $('.hero');
  if (!hero) { wa.classList.add('is-visible'); return; }

  let ticking = false;

  function update() {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    const revealAt = Math.max(hero.offsetTop + hero.offsetHeight - 150, 120);
    wa.classList.toggle('is-visible', y > revealAt);
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', () => { update(); }, { passive: true });

  update();
}

/* -------------------------------------------------------------- reveal */
/* A short fade-up as blocks scroll into view. Two rules keep it honest:

   1. Nothing is hidden unless this script is actually running. The .js flag is
      set in <head>, and the targets below are marked here — this file is loaded
      at the end of <body>, so the marking happens before the first paint and
      there is no flash of laid-out-then-hidden content.
   2. Anything already in the viewport on load is shown immediately, so the
      fold is never animated and content is never delayed.

   Under prefers-reduced-motion nothing is marked at all. */
function initReveal() {
  const root = document.documentElement;
  if (!root.classList.contains('js')) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const targets = $$([
    '.value-grid li',
    '.how-list li',
    '.enquiry-grid li',
    '.prose-grid > div',
    '.contact-methods .method',
    '.fact-list li',
    '.form-wrap',
    '.split-figure',
    'main section > .shell > .section-head',
    'main section > .shell > .split > .split-intro',
    'main section > .shell > .split > .split-copy'
  ].join(','));
  if (!targets.length) return;

  const vh = window.innerHeight || root.clientHeight;

  targets.forEach(el => {
    // already on screen: leave it alone, it must not fade in
    if (el.getBoundingClientRect().top < vh * 0.92) return;
    el.classList.add('reveal');
    // stagger siblings a little, capped at three steps
    const sibs = el.parentElement ? Array.from(el.parentElement.children) : [];
    const i = sibs.indexOf(el);
    if (i > 0 && i < 4) el.setAttribute('data-d', String(i));
  });

  const marked = targets.filter(el => el.classList.contains('reveal'));
  if (!marked.length) return;

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      obs.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

  marked.forEach(el => io.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  fillContactDetails();
  initNav();
  initConditionalFields();
  initHeader();
  initForms();
  initFloat();
});

/* Runs immediately rather than on DOMContentLoaded: this script sits at the
   end of <body>, so the DOM is complete and marking happens before paint. */
initReveal();
