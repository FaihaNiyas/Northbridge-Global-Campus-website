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
function initNav() {
  const btn = $('.nav-toggle');
  const nav = $('#site-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
    $('.nav-toggle-label', btn).textContent = open ? 'Close' : 'Menu';
  });

  // Escape closes the panel and returns focus to the button
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      $('.nav-toggle-label', btn).textContent = 'Menu';
      btn.focus();
    }
  });
}

/* ----------------------------------------------------------- form checks */
const RULES = {
  name:    v => v.trim().length >= 2      || 'Please enter your full name.',
  phone:   v => /^[\d\s+()-]{7,}$/.test(v.trim()) || 'Please enter a phone number we can reach you on.',
  email:   v => v.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please check the email address.',
  select:  v => v !== ''                  || 'Please choose an option.',
  message: v => v.trim().length >= 10     || 'Please tell us a little more — at least a sentence.',
  consent: v => v === true                || 'Please tick the box so we know we may reply to you.'
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
  $('.err', field).textContent = result;
  return false;
}

function buildMessage(form) {
  const lines = [`Enquiry from the Northbridge website — ${form.dataset.formName}`, ''];
  $$('.field', form).forEach(field => {
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

      const fields = $$('.field', form);
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
           <p>Your details are ready to send. Tap below and WhatsApp will open with everything already written out. We usually reply within one working day.</p>
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
           <p>Someone from Northbridge will reply within one working day. If it is urgent, message us on WhatsApp and we will pick it up sooner.</p>
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
/* The full logo lockup is near-square, so at rest the header is tall. Once the
   visitor scrolls, swap to the crest + wordmark so navigation stays reachable
   without a tall bar permanently covering the page. Purely a class toggle —
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

document.addEventListener('DOMContentLoaded', () => {
  fillContactDetails();
  initNav();
  initHeader();
  initForms();
});
