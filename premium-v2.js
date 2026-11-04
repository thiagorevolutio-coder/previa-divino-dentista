(() => {
  document.documentElement.classList.add('motion-ready');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const forms = [...document.querySelectorAll('[data-form]')];

  document.querySelectorAll('.brand').forEach((brand, index) => {
    setTimeout(() => brand.classList.add('logo-formed'), reduceMotion ? 0 : 120 + index * 90);
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    forms.forEach(element => element.classList.add('formed'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('formed');
      observer.unobserve(entry.target);
    });
  }, { threshold: .14, rootMargin: '0px 0px -8% 0px' });

  requestAnimationFrame(() => requestAnimationFrame(() => {
    setTimeout(() => forms.forEach(element => observer.observe(element)), 90);
  }));
})();
