document.addEventListener('DOMContentLoaded', function () {
  // Sticky header
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
    var toTop = document.querySelector('.to-top');
    if (toTop) {
      if (window.scrollY > 700) toTop.classList.add('show');
      else toTop.classList.remove('show');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var burger = document.querySelector('.hamburger');
  var panel = document.querySelector('.mobile-panel');
  if (burger && panel) {
    burger.addEventListener('click', function () {
      var open = burger.classList.toggle('open');
      panel.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        burger.classList.remove('open');
        panel.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // Active nav link
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-panel a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el, i) {
      el.style.setProperty('--i', i % 6);
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Back to top
  var toTop = document.querySelector('.to-top');
  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Contact form (demo only — no backend)
  var form = document.querySelector('.enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = document.querySelector('.form-success');
      form.reset();
      if (success) {
        success.classList.add('show');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
});
