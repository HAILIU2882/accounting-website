/* Progressive enhancement. Financial calculations and submission behavior remain in their pages. */
(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let paused = false;
  try { paused = sessionStorage.getItem('flexpath-motion') === 'paused'; } catch (_) {}
  let observer;
  const zh = root.lang.startsWith('zh');
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'motion-toggle';
  const revealAll = () => {
    observer?.disconnect();
    document.querySelectorAll('.reveal-pending').forEach(el => {
      el.classList.remove('reveal-pending');
      el.classList.add('reveal-visible');
    });
  };
  function syncMotion() {
    const off = paused || reducedMotion.matches;
    root.classList.toggle('motion-paused', off);
    root.classList.toggle('motion-enabled', !off);
    toggle.textContent = off ? (zh ? '▷ 开启动效' : '▷ Enable motion') : (zh ? 'Ⅱ 暂停动效' : 'Ⅱ Pause motion');
    toggle.setAttribute('aria-label', zh ? '暂停动态效果' : 'Pause animated effects');
    toggle.setAttribute('aria-pressed', String(off));
    toggle.hidden = reducedMotion.matches;
    if (off) revealAll();
  }
  toggle.addEventListener('click', () => {
    paused = !paused;
    try { sessionStorage.setItem('flexpath-motion', paused ? 'paused' : 'enabled'); } catch (_) {}
    syncMotion();
  });
  document.body.append(toggle);
  syncMotion();
  reducedMotion.addEventListener('change', syncMotion);

  // Observe only below-the-fold content, keeping the first paint and anchors immediate.
  if (!paused && !reducedMotion.matches && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('reveal-pending');
      entry.target.classList.add('reveal-visible');
      observer.unobserve(entry.target);
    }), { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    document.querySelectorAll('.services-section article, .process-section .grid > div, .cta-section > div, body:not(.home-page) > section:not(:first-of-type) > div').forEach((el, index) => {
      if (el.getBoundingClientRect().top < innerHeight) return;
      el.style.setProperty('--reveal-delay', `${(index % 3) * 70}ms`);
      el.classList.add('reveal-pending');
      observer.observe(el);
    });
    document.addEventListener('focusin', event => {
      const target = event.target.closest('.reveal-pending');
      if (target) { target.classList.remove('reveal-pending'); observer.unobserve(target); }
    });
  }
  let scrollPending = false;
  const syncScroll = () => {
    if (scrollPending) return;
    scrollPending = true;
    requestAnimationFrame(() => { root.classList.toggle('is-scrolled', scrollY > 16); scrollPending = false; });
  };
  addEventListener('scroll', syncScroll, { passive: true });
  syncScroll();
  const art = document.querySelector('.path-art');
  if (art) {
    let pointerFrame;
    art.addEventListener('pointermove', event => {
      if (paused || reducedMotion.matches || !finePointer.matches) return;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        const box = art.getBoundingClientRect();
        art.style.setProperty('--tilt-x', `${-(event.clientY - box.top - box.height / 2) / box.height * 4}deg`);
        art.style.setProperty('--tilt-y', `${(event.clientX - box.left - box.width / 2) / box.width * 4}deg`);
      });
    });
    art.addEventListener('pointerleave', () => {
      cancelAnimationFrame(pointerFrame);
      art.style.setProperty('--tilt-x', '0deg'); art.style.setProperty('--tilt-y', '0deg');
    });
  }
  const page = location.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/$/, '') || '/';
  document.querySelectorAll('.site-nav nav a').forEach(link => {
    const target = new URL(link.href).pathname.replace(/\/$/, '') || '/';
    if (page === target) link.setAttribute('aria-current', 'page');
  });
  const menu = document.querySelector('.header-menu');
  if (menu) {
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
    document.addEventListener('click', event => { if (!menu.contains(event.target)) menu.open = false; });
    menu.addEventListener('keydown', event => {
      if (event.key === 'Escape') { menu.open = false; menu.querySelector('summary').focus(); }
    });
  }
})();
