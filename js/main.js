// ============================================================
// SIMBUS TECHNOLOGIES — Shared JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ─── NAV SCROLL ─────────────────────────────────────────
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ─── MOBILE MENU ─────────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu-close');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
    if (mobileClose) mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // ─── ACTIVE NAV LINK ─────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ─── FADE-UP OBSERVER ────────────────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ─── COUNTER ANIMATION ────────────────────────────────────
  const counterEls = document.querySelectorAll('.impact-num, .stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.animated) {
        e.target.dataset.animated = true;
        const target = e.target.dataset.target;
        if (!target) return;
        animateCounter(e.target, target);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => {
    if (el.dataset.target) counterObserver.observe(el);
  });

  function animateCounter(el, targetStr) {
    const suffix = targetStr.replace(/[\d.]/g, '');
    const num = parseFloat(targetStr);
    const duration = 1800;
    const start = performance.now();

    const frame = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = (num * eased);
      const display = Number.isInteger(num) ? Math.round(current) : current.toFixed(1);
      el.textContent = display + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  // ─── TAB PANELS ──────────────────────────────────────────
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.group || 'default';
      const target = btn.dataset.tab;

      document.querySelectorAll(`.tab-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
      document.querySelectorAll(`.tab-panel[data-group="${group}"]`).forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panel = document.querySelector(`.tab-panel[data-tab="${target}"][data-group="${group}"]`);
      if (panel) panel.classList.add('active');
    });
  });

  // ─── SERVICE PANELS ──────────────────────────────────────
  document.querySelectorAll('.service-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.service-nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.service-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.querySelector('.service-panel[data-service="' + btn.dataset.service + '"]');
      if (panel) panel.classList.add('active');
    });
  });

  // ─── FORM SUBMIT ─────────────────────────────────────────
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'var(--lime)';
      btn.style.color = 'var(--navy)';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.style.color = '';
        form.reset();
      }, 3000);
    });
  }

  // ─── WHITEPAPER FORM ─────────────────────────────────────
  const wpForm = document.getElementById('whitepaperForm');
  if (wpForm) {
    wpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.getElementById('wpSuccess');
      if (msg) { msg.style.display = 'block'; wpForm.reset(); }
    });
  }

  // ─── NEWSLETTER ──────────────────────────────────────────
  const nlForm = document.getElementById('newsletterForm');
  if (nlForm) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = nlForm.querySelector('button');
      btn.textContent = '✓ Subscribed!';
      btn.style.background = 'var(--lime)';
      btn.style.color = 'var(--navy)';
      nlForm.reset();
    });
  }

});
