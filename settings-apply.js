(function () {
  var DEFAULTS = { theme: 'light', graphics: 'full', fontSize: 'medium', lang: 'ar' };

  function load() {
    try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem('siteSettings') || '{}')); }
    catch (e) { return Object.assign({}, DEFAULTS); }
  }

  function applyAll(s) {
    var root = document.documentElement;
    var body = document.body;

    // THEME
    root.setAttribute('data-theme', s.theme);
    if (s.theme === 'dark') {
      root.style.setProperty('--body-bg', 'linear-gradient(180deg,#0a1628 0%,#0d1f3c 40%,#112240 70%,#0a1628 100%)');
      root.style.setProperty('--nav-bg',        'rgba(10,22,40,0.95)');
      root.style.setProperty('--card-bg',        'rgba(17,34,64,0.95)');
      root.style.setProperty('--card-border',    'rgba(74,144,226,0.2)');
      root.style.setProperty('--text-primary',   '#e8eef5');
      root.style.setProperty('--text-secondary', '#9bb4d0');
      root.style.setProperty('--sidenav-bg',     'linear-gradient(180deg,rgba(10,22,40,0.99) 0%,rgba(17,34,64,0.99) 100%)');
      root.style.setProperty('--sidenav-text',   '#e8eef5');
    } else {
      root.style.setProperty('--body-bg', 'linear-gradient(180deg,#ffffff 0%,#f8f9fa 8%,#e8eef5 20%,#d4dfe9 35%,#b8c9dc 50%,#9bb4d0 65%,#7a9ac2 80%,#5a7fa8 90%,#3d5a7f 95%,#1a2942 100%)');
      root.style.setProperty('--nav-bg',        'rgba(255,255,255,0.82)');
      root.style.setProperty('--card-bg',        'rgba(255,255,255,0.95)');
      root.style.setProperty('--card-border',    'rgba(74,144,226,0.3)');
      root.style.setProperty('--text-primary',   '#0a1628');
      root.style.setProperty('--text-secondary', '#6b7c93');
      root.style.setProperty('--sidenav-bg',     'linear-gradient(180deg,rgba(255,255,255,0.98) 0%,rgba(232,238,245,0.98) 100%)');
      root.style.setProperty('--sidenav-text',   '#0a1628');
    }
    if (body) {
      body.style.background = 'var(--body-bg)';
      body.style.backgroundAttachment = 'fixed';
    }

    // FONT SIZE
    var sizes = { small: '13px', medium: '15px', large: '17px', xlarge: '20px' };
    root.style.fontSize = sizes[s.fontSize] || '15px';

    // GRAPHICS
    root.setAttribute('data-graphics', s.graphics);
    var styleTag = document.getElementById('__graphics_override__');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = '__graphics_override__';
      document.head.appendChild(styleTag);
    }
    if (s.graphics === 'minimal') {
      styleTag.textContent = '*,*::before,*::after{animation-duration:0.001s!important;transition-duration:0.001s!important;}';
    } else if (s.graphics === 'reduced') {
      styleTag.textContent = '.bg-shape,.particle,.shape-1,.shape-2,.shape-3,.shape-4{animation:none!important;opacity:0!important;}';
    } else {
      styleTag.textContent = '';
    }

    // LANGUAGE + DIRECTION
    root.lang = s.lang;
    root.dir  = (s.lang === 'ar') ? 'rtl' : 'ltr';
  }

  applyAll(load());
  document.addEventListener('DOMContentLoaded', function () { applyAll(load()); });
  window.addEventListener('storage', function (e) { if (e.key === 'siteSettings') applyAll(load()); });

  window.SiteSettings = {
    load: load,
    save: function (partial) {
      var merged = Object.assign(load(), partial);
      localStorage.setItem('siteSettings', JSON.stringify(merged));
      applyAll(merged);
      return merged;
    },
    applyAll: applyAll
  };
})();
