/* =========================================================
   Upendra Sharma — Portfolio
   Renders every section from js/data.js and wires up
   theme switching, scrollspy, the mobile menu and reveals.

   No framework, no build step. Edit js/data.js for content.
   ========================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     Helpers
     --------------------------------------------------------- */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /** Escape user content before injecting it as HTML. */
  const esc = (value) =>
    String(value ?? '').replace(/[&<>"']/g, (ch) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));

  /** Resolve "a.b.c" against an object. */
  const path = (obj, key) =>
    key.split('.').reduce((acc, part) => (acc == null ? acc : acc[part]), obj);

  /** Replace an element's children with an HTML string. */
  const fill = (el, html) => { if (el) el.innerHTML = html; };

  /** Two-digit index: 0 -> "01". */
  const pad = (n) => String(n + 1).padStart(2, '0');

  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* ---------------------------------------------------------
     Theme — system preference, overridden by explicit choice
     --------------------------------------------------------- */
  const Theme = {
    KEY: 'portfolio-theme',

    init() {
      const stored = this.read();
      const system = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark' : 'light';

      this.apply(stored || system);

      // Follow the OS only while the visitor has not chosen for themselves.
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          if (!this.read()) this.apply(e.matches ? 'dark' : 'light');
        });

      const toggle = $('#theme-toggle');
      if (toggle) {
        toggle.addEventListener('click', () => {
          const next =
            document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
          this.apply(next);
          this.write(next);
        });
      }
    },

    apply(theme) {
      document.documentElement.dataset.theme = theme;
    },

    // localStorage can throw in private-browsing modes; fail quietly.
    read()  { try { return localStorage.getItem(this.KEY); } catch { return null; } },
    write(v){ try { localStorage.setItem(this.KEY, v); } catch { /* ignore */ } }
  };


  /* ---------------------------------------------------------
     Render — every section is built from DATA
     --------------------------------------------------------- */
  const Render = {

    all(d) {
      this.bindings(d);
      this.nav(d.nav);
      this.hero(d);
      this.about(d.about);
      this.skills(d.skills);
      this.experience(d.experience);
      this.projects(d.projects);
      this.education(d.education);
      this.certifications(d.certifications);
      this.contact(d.contact);
      this.footer();
    },

    /** Simple text bindings declared in the HTML via data-bind. */
    bindings(d) {
      $$('[data-bind]').forEach((el) => {
        const value = path(d, el.dataset.bind);
        if (typeof value === 'string' || typeof value === 'number') {
          el.textContent = value;
        }
      });

      const mark = $('.wordmark-text');
      if (mark && d.profile.initials) mark.textContent = d.profile.initials;

      document.title = `${d.profile.name} — ${d.profile.roles?.[0] ?? 'Portfolio'}`;
    },

    nav(items = []) {
      fill($('#nav-list'), items.map((item) => `
        <li><a href="#${esc(item.id)}" data-nav="${esc(item.id)}">${esc(item.label)}</a></li>
      `).join(''));
    },

    hero(d) {
      const { profile, facts = [], links = [] } = d;

      fill($('#hero-facts-list'), facts.map((f) => `
        <div>
          <dt>${esc(f.label)}</dt>
          <dd>${esc(f.value)}</dd>
        </div>
      `).join(''));

      // With the contact form live, mailto: links would hand the address
      // straight to harvesters — point them at the form instead.
      const hideMail = Boolean(d.contact?.formspreeId);
      const resolve  = (url) =>
        hideMail && url.startsWith('mailto:') ? '#contact' : url;

      fill($('#hero-links'), links.map((l) => {
        const url = resolve(l.url);
        return `<li><a href="${esc(url)}" ${url.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>${esc(l.label)}</a></li>`;
      }).join(''));

      const resume = $('#resume-link');
      if (resume) {
        if (profile.resumeUrl) {
          resume.href = profile.resumeUrl;
          // A hosted file (Drive, Dropbox) opens in a tab; a local file downloads.
          if (profile.resumeUrl.startsWith('http')) {
            resume.removeAttribute('download');
            resume.target = '_blank';
            resume.rel = 'noopener noreferrer';
          }
        } else {
          resume.remove();
        }
      }

      if (!profile.available) $('.hero-eyebrow')?.remove();

      Typewriter.start(profile.roles ?? []);
    },

    about(about = {}) {
      // Paragraphs may contain inline markup, so they are not escaped.
      fill($('#about-prose'),
        (about.paragraphs ?? []).map((p) => `<p>${p}</p>`).join(''));

      // Same rule as the hero: no address in the page while the form is live.
      const hideMail = Boolean(DATA.contact?.formspreeId);

      fill($('#about-details'), (about.details ?? [])
        .filter((item) => !(hideMail && /@|^mailto:/.test(item.url ?? item.value)))
        .map((item) => `
          <div>
            <dt>${esc(item.label)}</dt>
            <dd>${item.url
              ? `<a href="${esc(item.url)}">${esc(item.value)}</a>`
              : esc(item.value)}</dd>
          </div>
        `).join(''));

      const slot = $('#portrait-slot');
      const src  = DATA.profile.portrait;
      fill(slot, src
        ? `<img src="${esc(src)}" alt="Portrait of ${esc(DATA.profile.name)}" loading="lazy">`
        : `<div class="portrait-fallback">Add a portrait at<br>assets/img/portrait.jpg</div>`);
    },

    skills(groups = []) {
      fill($('#skills-grid'), groups.map((g, i) => `
        <div class="skill-group reveal">
          <h3 data-num="${pad(i)}">${esc(g.group)}</h3>
          <ul class="skill-tags">
            ${(g.items ?? []).map((s) => `<li>${esc(s)}</li>`).join('')}
          </ul>
        </div>
      `).join(''));
    },

    experience(items = []) {
      fill($('#exp-list'), items.map((job) => `
        <li class="exp-item reveal">
          <div class="exp-period">${esc(job.period)}</div>
          <div>
            <h3 class="exp-role">${esc(job.role)}</h3>
            <p class="exp-company">
              ${esc(job.company)}${job.location
                ? ` <span class="exp-location">— ${esc(job.location)}</span>` : ''}
            </p>
            <ul class="exp-points">
              ${(job.points ?? []).map((p) => `<li>${esc(p)}</li>`).join('')}
            </ul>
          </div>
          <ul class="exp-stack">
            ${(job.stack ?? []).map((s) => `<li>${esc(s)}</li>`).join('')}
          </ul>
        </li>
      `).join(''));
    },

    projects(items = []) {
      fill($('#proj-grid'), items.map((p, i) => `
        <article class="proj-card reveal">
          <div class="proj-top">
            <span class="proj-index">${pad(i)}</span>
            <span class="proj-year">${esc(p.year)}</span>
          </div>
          <h3 class="proj-name">${esc(p.name)}</h3>
          <p class="proj-desc">${esc(p.description)}</p>
          <ul class="proj-stack">
            ${(p.stack ?? []).map((s) => `<li>${esc(s)}</li>`).join('')}
          </ul>
          ${(p.links ?? []).length ? `
            <div class="proj-links">
              ${p.links.map((l) => `
                <a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.label)} ↗</a>
              `).join('')}
            </div>` : ''}
        </article>
      `).join(''));
    },

    education(items = []) {
      fill($('#edu-list'), items.map((e) => `
        <li class="edu-item reveal">
          <h4 class="edu-degree">${esc(e.degree)}</h4>
          <p class="edu-school">${esc(e.school)}</p>
          <p class="edu-meta">${esc(e.meta)}</p>
        </li>
      `).join(''));
    },

    certifications(items = []) {
      fill($('#cert-list'), items.map((c) => `
        <li class="cert-item reveal">
          ${c.url
            ? `<a class="cert-name" href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">${esc(c.name)} ↗</a>`
            : `<span class="cert-name">${esc(c.name)}</span>`}
          <span class="cert-meta">${esc(c.issuer)}${c.year ? ` · ${esc(c.year)}` : ''}</span>
        </li>
      `).join(''));
    },

    contact(contact = {}) {
      const mail = $('#contact-email');
      const slot = $('#contact-form-slot');

      if (contact.formspreeId) {
        // Form is live: never write the address into the page, so harvesters
        // find nothing to scrape.
        mail?.remove();
        this.contactForm(slot, contact.formspreeId);
      } else {
        slot?.remove();
        if (mail && contact.email) {
          mail.href = `mailto:${contact.email}`;
          mail.textContent = contact.email;
        } else {
          mail?.remove();
        }
      }

      const note = $('#contact-note');
      if (note) {
        if (contact.note) note.textContent = contact.note;
        else note.remove();
      }

      this.contactLinks(contact);
    },

    /** Formspree form, submitted over fetch so the page never navigates away. */
    contactForm(slot, formId) {
      if (!slot) return;

      fill(slot, `
        <form class="contact-form" id="contact-form" novalidate
              action="https://formspree.io/f/${esc(formId)}" method="POST">
          <div class="field">
            <label for="cf-name">Name</label>
            <input id="cf-name" name="name" type="text" required autocomplete="name">
          </div>
          <div class="field">
            <label for="cf-email">Email</label>
            <input id="cf-email" name="email" type="email" required autocomplete="email">
          </div>
          <div class="field">
            <label for="cf-message">Message</label>
            <textarea id="cf-message" name="message" rows="5" required></textarea>
          </div>
          <button class="btn btn-primary" type="submit">Send message</button>
          <p class="form-status" role="status" aria-live="polite"></p>
        </form>
      `);

      const form   = $('#contact-form', slot);
      const button = $('button', form);
      const status = $('.form-status', form);

      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
          status.textContent = 'Please fill in every field with a valid email.';
          status.dataset.state = 'error';
          return;
        }

        button.disabled = true;
        status.dataset.state = 'pending';
        status.textContent = 'Sending…';

        try {
          const res = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' }
          });

          if (res.ok) {
            form.reset();
            status.dataset.state = 'ok';
            status.textContent = 'Thanks — I will get back to you soon.';
          } else {
            const data = await res.json().catch(() => ({}));
            status.dataset.state = 'error';
            status.textContent =
              data.errors?.map((x) => x.message).join(', ') ||
              'Something went wrong. Please try again.';
          }
        } catch {
          status.dataset.state = 'error';
          status.textContent = 'Network error — please try again.';
        } finally {
          button.disabled = false;
        }
      });
    },

    contactLinks(contact = {}) {
      fill($('#contact-links'), (contact.links ?? []).map((l) => `
        <li>
          <a href="${esc(l.url)}" ${l.url.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>
            ${esc(l.label)}
          </a>
        </li>
      `).join(''));
    },

    footer() {
      const year = $('#footer-year');
      if (year) year.textContent = `© ${new Date().getFullYear()}`;
    }
  };


  /* ---------------------------------------------------------
     Typewriter — cycles the hero job titles
     --------------------------------------------------------- */
  const Typewriter = {
    start(roles) {
      const el = $('[data-bind="profile.role"]');
      if (!el || !roles.length) return;

      // With reduced motion, show the first title and stop.
      if (prefersReducedMotion || roles.length === 1) {
        el.textContent = roles[0];
        return;
      }

      let roleIndex = 0;
      let charIndex = 0;
      let deleting  = false;

      const tick = () => {
        const word = roles[roleIndex];
        charIndex += deleting ? -1 : 1;
        el.textContent = word.slice(0, charIndex);

        let delay = deleting ? 45 : 85;

        if (!deleting && charIndex === word.length) {
          delay = 1900;               // pause on the finished word
          deleting = true;
        } else if (deleting && charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          delay = 420;
        }

        setTimeout(tick, delay);
      };

      setTimeout(tick, 550);
    }
  };


  /* ---------------------------------------------------------
     Navigation — mobile menu + scrollspy
     --------------------------------------------------------- */
  const Nav = {
    init() {
      const toggle = $('#menu-toggle');
      const nav    = $('.nav');

      if (toggle && nav) {
        toggle.addEventListener('click', () => {
          const open = nav.classList.toggle('is-open');
          toggle.setAttribute('aria-expanded', String(open));
        });

        // Close after tapping a link.
        nav.addEventListener('click', (e) => {
          if (e.target.closest('a')) {
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
          }
        });

        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && nav.classList.contains('is-open')) {
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
          }
        });
      }

      this.spy();
    },

    /** Highlight the nav link for whichever section is in view. */
    spy() {
      const sections = $$('main section[id]');
      if (!sections.length || !('IntersectionObserver' in window)) return;

      const setActive = (id) => {
        $$('[data-nav]').forEach((a) => {
          a.classList.toggle('is-active', a.dataset.nav === id);
        });
      };

      const observer = new IntersectionObserver((entries) => {
        // Pick the entry closest to the top of the viewport.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visible) setActive(visible.target.id);
      }, {
        rootMargin: '-30% 0px -55% 0px',
        threshold: 0
      });

      sections.forEach((s) => observer.observe(s));
    }
  };


  /* ---------------------------------------------------------
     Reveal — fade sections in as they enter the viewport
     --------------------------------------------------------- */
  const Reveal = {
    init() {
      const items = $$('.reveal');
      if (!items.length) return;

      if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('is-visible'));
        return;
      }

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, i) => {
          if (!entry.isIntersecting) return;
          // Slight stagger so a row of cards does not pop in all at once.
          setTimeout(() => entry.target.classList.add('is-visible'), i * 65);
          obs.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

      items.forEach((el) => observer.observe(el));

      // Safety net: .reveal starts at opacity 0, so anything the observer
      // never fires for would stay invisible. Force everything visible after
      // a few seconds regardless.
      setTimeout(() => {
        $$('.reveal:not(.is-visible)').forEach((el) => el.classList.add('is-visible'));
      }, 3000);
    }
  };


  /* ---------------------------------------------------------
     Boot
     --------------------------------------------------------- */
  Theme.init();

  document.addEventListener('DOMContentLoaded', () => {
    if (typeof DATA === 'undefined') {
      console.error('data.js did not load — check the script tag in index.html.');
      return;
    }

    Render.all(DATA);
    Nav.init();
    Reveal.init();
  });

})();
