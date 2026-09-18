/* Panel cuts, theme toggle, lite YouTube, scroll reveal. No dependencies. */
(function () {
  'use strict';

  /* ---- comic panel cuts -------------------------------------------
     <div class="panel" data-cut="0 0.8, 100 0, 99.2 100, 0.6 99.1">
     Points are percentages. The same polygon clips the panel and is
     drawn as an SVG stroke on top so the ink border stays crisp.     */
  var CUTS = {
    a: '0 0.9, 100 0, 99.3 100, 0.5 99.2',
    b: '0.6 0, 100 1.1, 100 99.4, 0 100',
    c: '0 0, 99.4 0.7, 100 100, 0.8 99.3',
    d: '0.9 0.6, 100 0, 99.2 99.1, 0 100',
    e: '0 0.4, 99.6 0, 100 99.5, 0.4 100',
    f: '0.4 0, 100 0.6, 99.5 100, 0 99.4'
  };
  var i = 0;
  document.querySelectorAll('.panel').forEach(function (el) {
    var cut = el.getAttribute('data-cut');
    if (!cut) { cut = CUTS['abcdef'[i++ % 6]]; }
    else if (CUTS[cut]) { cut = CUTS[cut]; }
    var pts = cut.split(',').map(function (p) { return p.trim().split(/\s+/).map(Number); });
    el.style.clipPath = 'polygon(' + pts.map(function (p) { return p[0] + '% ' + p[1] + '%'; }).join(', ') + ')';
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'panel-border');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');
    var poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttribute('points', pts.map(function (p) { return p[0] + ',' + p[1]; }).join(' '));
    svg.appendChild(poly);
    el.appendChild(svg);
    el.classList.add('has-cut');
  });

  /* ---- theme toggle ---------------------------------------------- */
  var root = document.documentElement;
  function systemDark() { return window.matchMedia('(prefers-color-scheme: dark)').matches; }
  function currentDark() {
    var t = root.getAttribute('data-theme');
    return t ? t === 'dark' : systemDark();
  }
  document.querySelectorAll('.theme-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = currentDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  });

  /* ---- lite YouTube ---------------------------------------------- */
  document.querySelectorAll('.yt').forEach(function (box) {
    box.addEventListener('click', function () {
      var id = box.getAttribute('data-id');
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1';
      f.title = box.getAttribute('data-title') || 'Video';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      f.allowFullscreen = true;
      box.innerHTML = '';
      box.appendChild(f);
      box.style.cursor = 'default';
    }, { once: true });
  });

  /* ---- scroll reveal --------------------------------------------- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }
})();
