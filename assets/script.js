(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      toggle.textContent = open ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.textContent = '☰';
    }));
  }
  document.querySelectorAll('[data-package]').forEach(link => link.addEventListener('click', () => {
    const select = document.querySelector('#package');
    if (select) select.value = link.dataset.package;
  }));
  const form = document.querySelector('#booking-form');
  const status = document.querySelector('#form-status');
  if (form && status) {
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const action = form.getAttribute('action') || '';
      if (action.includes('YOUR_FORMSPREE_ID')) {
        status.className = 'form-status error';
        status.textContent = 'The booking form is not connected yet. Please contact info@instaboothphoto.com or call 786.205.3985.';
        return;
      }
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
