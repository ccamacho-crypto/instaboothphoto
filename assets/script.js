(() => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-collapsible');
  if (toggle && menu) {
    const setOpen = open => {
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close contact menu' : 'Open contact menu');
      toggle.querySelector('.menu-icon').textContent = open ? '×' : '☰';
    };
    toggle.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('click', event => {
      if (!menu.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.classList.contains('open')) { setOpen(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 1101px)').addEventListener('change', () => setOpen(false));
  }
  document.querySelectorAll('[data-package]').forEach(link => link.addEventListener('click', () => {
    const select = document.querySelector('#package');
    if (select) select.value = link.dataset.package;
  }));
  const carousel = document.querySelector('.gallery-carousel');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = [...carousel.querySelectorAll('.carousel-slide')];
    const dots = carousel.querySelector('.carousel-dots');
    const viewport = carousel.querySelector('.carousel-viewport');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let index = 0;
    let timer;
    const visibleCount = () => window.innerWidth <= 680 ? 1 : window.innerWidth <= 900 ? 3 : 4;
    const maxIndex = () => Math.max(0, slides.length - visibleCount());
    const update = () => {
      index = Math.max(0, Math.min(index, maxIndex()));
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${index * slideWidth}px)`;
      [...dots.children].forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
    };
    const buildDots = () => {
      dots.innerHTML = '';
      for (let i = 0; i <= maxIndex(); i++) {
        const dot = document.createElement('button');
        dot.type = 'button'; dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Show gallery slide ${i + 1}`);
        dot.addEventListener('click', () => { index = i; update(); restart(); });
        dots.appendChild(dot);
      }
      update();
    };
    const advance = direction => { index = direction > 0 ? (index >= maxIndex() ? 0 : index + 1) : (index <= 0 ? maxIndex() : index - 1); update(); };
    const stop = () => clearInterval(timer);
    const start = () => { if (!reducedMotion && !document.hidden) timer = setInterval(() => advance(1), 4500); };
    const restart = () => { stop(); start(); };
    carousel.querySelector('.carousel-prev').addEventListener('click', () => { advance(-1); restart(); });
    carousel.querySelector('.carousel-next').addEventListener('click', () => { advance(1); restart(); });
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', event => { if (!carousel.contains(event.relatedTarget)) start(); });
    document.addEventListener('visibilitychange', () => document.hidden ? stop() : restart());
    let startX = null;
    viewport.addEventListener('touchstart', event => { startX = event.touches[0].clientX; }, { passive: true });
    viewport.addEventListener('touchend', event => { if (startX === null) return; const delta = event.changedTouches[0].clientX - startX; if (Math.abs(delta) > 40) { advance(delta < 0 ? 1 : -1); restart(); } startX = null; }, { passive: true });
    window.addEventListener('resize', buildDots);
    buildDots(); start();
  }
  const form = document.querySelector('#booking-form');
  const status = document.querySelector('#form-status');
  if (form && status) {
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const action = 'https://formspree.io/f/mwlvjabd';
      const button = form.querySelector('button[type="submit"]');
      const original = button.textContent;
      button.disabled = true; button.textContent = 'Sending…'; status.className = 'form-status'; status.textContent = '';
      try {
        const response = await fetch(action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('Could not submit the form. Please try again or email us directly.');
        form.reset(); status.textContent = 'Thank you! Your inquiry has been sent. We’ll be in touch soon.';
      } catch (error) {
        status.className = 'form-status error'; status.textContent = error.message || 'Something went wrong. Please email info@instaboothphoto.com.';
      } finally { button.disabled = false; button.textContent = original; }
    });
  }
})();
