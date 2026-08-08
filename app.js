// Tint 2 Go — page behaviour.
//
// Split out of index.html: this is ~20KB that first paint does not need, and
// carrying it inline made the document 32% bigger than it had to be before the
// browser could render anything. Loaded with `defer`, so it runs after parsing
// and every element these blocks reach for already exists.
//
// Order below is the order the blocks appeared in the document, and it matters:
// TINT_FAQ is defined first because the FAQ section, the JSON-LD and the chat
// panel all read from it.

// ---------------------------------------------------------------------------
// KNOWLEDGE BASE — single source of truth.
// Feeds the FAQ section, the FAQPage JSON-LD, and the instant-answer chat
// panel. Edit an answer here and it updates in all three.
// `k` = extra search keywords the question/answer text doesn't already contain.
// ---------------------------------------------------------------------------
  window.TINT_FAQ = [
    {
      q: "Do you really come to me?",
      a: "Yes — that's our whole thing. We bring a fully equipped mobile setup to your home, office, or wherever your vehicle is parked. All we need is a little space around the car and access to a power outlet.",
      k: "mobile travel location come to you house work driveway on site onsite"
    },
    {
      q: "How long does a full tint take?",
      a: "A full vehicle typically takes 2–3 hours depending on the make and how many windows. Single windows or a windshield strip are much quicker — usually under an hour.",
      k: "time duration wait how long appointment length hours"
    },
    {
      q: "How much does window tinting cost?",
      a: "Pricing depends on your vehicle, how many windows you want done, and the film you choose. Check the <a href=\"#pricing\">pricing section</a> for our packages, or text Jay at <a href=\"tel:+18609950923\">(860) 995-0923</a> with your year, make, and model for a free quote.",
      k: "price cost quote estimate how much money cheap expensive rate"
    },
    {
      q: "What types of tint do you offer?",
      a: "We install dyed, carbon, ceramic, and premium ceramic film. Dyed is the budget-friendly look, carbon is the sweet spot for style and durability, and ceramic is the top performer for heat rejection.",
      k: "film options dyed carbon ceramic premium types kinds brands"
    },
    {
      q: "What's the difference between carbon and ceramic?",
      a: "Both block 99% of UV and never fade or turn purple. Ceramic goes further — significantly more infrared heat rejection for a cooler cabin, with zero interference to phone, GPS, or radio signals. It's our most popular choice.",
      k: "compare difference better heat rejection uv signal gps"
    },
    {
      q: "How long before I can roll my windows down?",
      a: "We recommend leaving windows up for 3–5 days while the film cures. You may notice slight haziness or small water pockets at first — this is normal and clears as it dries.",
      k: "cure curing roll down windows aftercare wait dry"
    },
    {
      q: "Will there be bubbles after installation?",
      a: "Small water bubbles are normal while the film cures and usually disappear on their own within a few days to a few weeks. If anything is still there after that, call us — that's what the warranty is for.",
      k: "bubbles haze hazy water pockets cloudy streaks normal"
    },
    {
      q: "Is window tint legal in my state?",
      a: "Tint darkness laws vary by state and by window. We install to your state's legal limits unless you tell us otherwise, and we'll walk you through what's allowed before we start.",
      k: "legal law vlt limit darkness ticket police illegal percent"
    },
    {
      q: "Is the work guaranteed?",
      a: "Absolutely. Every install is backed by a lifetime warranty against bubbling, peeling, fading, discoloration, and manufacturer defects. If anything ever goes wrong with the film, we make it right.",
      k: "warranty guarantee lifetime defect peeling fading covered"
    },
    {
      q: "Can you remove old tint?",
      a: "Yes. We do professional tint removal — including the old adhesive — before laying down new film. Let us know when you book so we can set aside the extra time.",
      k: "remove removal strip old tint peel purple bubbling replace"
    },
    {
      q: "Do you tint windshields?",
      a: "Yes — full windshield film and visor strips are both available where state law permits. We'll let you know what's legal for your vehicle before we install.",
      k: "windshield front glass visor strip brow eyebrow sun strip"
    },
    {
      q: "Do I need access to power?",
      a: "In most cases, yes — a standard outlet is enough. If power isn't available where you're parked, tell us ahead of time and we'll work something out.",
      k: "power outlet electricity plug garage prep prepare requirements"
    },
    {
      q: "What payment methods do you accept?",
      a: "Cash, all major credit and debit cards, and the popular mobile payment apps. You pay when the job is done — nothing up front.",
      k: "payment pay cash card credit debit apple pay cashapp venmo zelle deposit"
    },
    {
      q: "How do I book an appointment?",
      a: "Fill out the <a href=\"#contact\">booking form</a> with your vehicle's year, make, model, and the tint you're after — we'll text you back to confirm. Prefer to talk? Call or text Jay at <a href=\"tel:+18609950923\">(860) 995-0923</a>.",
      k: "book booking schedule appointment reserve contact call text availability"
    }
  ];

  // Render the FAQ section from the knowledge base.
  (function () {
    var wrap = document.getElementById('faqWrap');
    if (!wrap) return;
    window.TINT_FAQ.forEach(function (item, i) {
      var d = document.createElement('details');
      // Stagger the scroll-reveal in pairs, matching the rest of the page.
      d.className = 'faq-item reveal d' + (Math.min(Math.floor(i / 2), 3) + 1);
      var s = document.createElement('summary');
      s.textContent = item.q;
      s.insertAdjacentHTML('beforeend', '<span class="plus"></span>');
      var a = document.createElement('div');
      a.className = 'answer';
      a.innerHTML = item.a;
      d.appendChild(s);
      d.appendChild(a);
      wrap.appendChild(d);
    });
  })();

  // Third consumer of the same knowledge base, after the FAQ section and the
  // chat panel: search engines. Built from TINT_FAQ rather than pasted into
  // <head> so an edited answer still updates everywhere from one place.
  (function () {
    if (!window.TINT_FAQ || !window.TINT_FAQ.length) return;
    var strip = document.createElement('div');
    var toText = function (html) { strip.innerHTML = html; return strip.textContent.trim(); };
    var ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://www.tint2go.tech/#faq',
      mainEntity: window.TINT_FAQ.map(function (item) {
        return {
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: toText(item.a) }
        };
      })
    });
    document.head.appendChild(ld);
  })();

// ---------------------------------------------------------------------------
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Show success banner after a booking submit (FormSubmit redirects back with ?submitted=1)
  if (new URLSearchParams(location.search).has('submitted')) {
    const b = document.getElementById('thanks');
    if (b) { b.classList.add('show', 'in'); }
  }

  // Nav border on scroll + progress bar
  const nav = document.getElementById('nav');
  const progress = document.getElementById('progress');
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (window.scrollY / h) * 100 + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll — elements rise and converge to center
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('in');
      else e.target.classList.remove('in'); // re-animate when scrolling back
    });
  }, { threshold: 0.18 });
  document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));

  // Section-level in (for bg zoom)
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.target.classList.toggle('in', e.isIntersecting));
  }, { threshold: 0.25 });
  document.querySelectorAll('section').forEach((s) => sectionObs.observe(s));

  // Below-the-fold section backgrounds load on approach, not at page load.
  // Fetching all of them up front cost ~800KB that competed with the hero
  // image for bandwidth and pushed LCP out. The hero is deliberately not in
  // here — it is preloaded in <head> and set in CSS.
  (function () {
    const bgWidth = window.innerWidth <= 768 ? 1000 : (window.innerWidth < 1440 ? 1600 : 2000);
    const load = (el) => {
      el.style.backgroundImage = `url('${el.dataset.bg}&w=${bgWidth}')`;
      el.removeAttribute('data-bg');
    };
    const targets = document.querySelectorAll('.bg-img[data-bg]');
    if (!('IntersectionObserver' in window)) { targets.forEach(load); return; }
    const bgObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        load(e.target);
        bgObs.unobserve(e.target);
      });
    }, { rootMargin: '200% 0px' }); // start well before the section scrolls in

    // Observing right away still cost one image (~86KB) during initial load —
    // that 200% lookahead already reaches the first section from the hero.
    // Waiting for idle after load keeps the lookahead without racing the hero.
    const start = () => targets.forEach((el) => bgObs.observe(el));
    const whenIdle = () => {
      if (window.requestIdleCallback) { window.requestIdleCallback(start, { timeout: 2000 }); }
      else { setTimeout(start, 200); }
    };
    if (document.readyState === 'complete') { whenIdle(); }
    else { window.addEventListener('load', whenIdle, { once: true }); }
  })();

  // Custom calendar dropdown
  (function () {
    const trigger = document.getElementById('dpTrigger');
    if (!trigger) return;
    const panel = document.getElementById('dpPanel');
    const label = document.getElementById('dpLabel');
    const hidden = document.getElementById('dpValue');
    const grid = document.getElementById('dpGrid');
    const title = document.getElementById('dpTitle');
    const prevBtn = document.getElementById('dpPrev');
    const nextBtn = document.getElementById('dpNext');
    const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    const today = new Date(); today.setHours(0, 0, 0, 0);
    let view = new Date(today.getFullYear(), today.getMonth(), 1);
    let selected = null;

    const iso = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const pretty = (d) => d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

    function render() {
      title.textContent = MONTHS[view.getMonth()] + ' ' + view.getFullYear();
      prevBtn.disabled = (view.getFullYear() === today.getFullYear() && view.getMonth() === today.getMonth());
      grid.innerHTML = '';
      const firstDay = new Date(view.getFullYear(), view.getMonth(), 1).getDay();
      const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
      for (let i = 0; i < firstDay; i++) {
        const blank = document.createElement('span');
        blank.className = 'dp-day empty';
        grid.appendChild(blank);
      }
      for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(view.getFullYear(), view.getMonth(), d);
        const cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'dp-day';
        cell.textContent = d;
        if (date < today) cell.disabled = true;
        if (date.getTime() === today.getTime()) {
          cell.classList.add('today');
          cell.title = 'Today';
          cell.setAttribute('aria-current', 'date');
        }
        if (selected && date.getTime() === selected.getTime()) cell.classList.add('selected');
        cell.addEventListener('click', (e) => {
          e.stopPropagation();
          selected = date;
          hidden.value = iso(date);
          label.textContent = pretty(date);
          label.classList.remove('placeholder');
          close();
        });
        grid.appendChild(cell);
      }
    }
    function open() { render(); panel.classList.add('open'); trigger.classList.add('open'); trigger.setAttribute('aria-expanded', 'true'); }
    function close() { panel.classList.remove('open'); trigger.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); }

    trigger.addEventListener('click', (e) => { e.stopPropagation(); panel.classList.contains('open') ? close() : open(); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); view = new Date(view.getFullYear(), view.getMonth() - 1, 1); render(); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); view = new Date(view.getFullYear(), view.getMonth() + 1, 1); render(); });
    panel.addEventListener('click', (e) => e.stopPropagation());
    document.addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  })();

  // Parallax on background images
  const bgs = [...document.querySelectorAll('.bg-img')];
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    bgs.forEach((bg) => {
      const rect = bg.parentElement.getBoundingClientRect();
      const offset = (rect.top) * 0.15;
      bg.style.transform = `scale(1.1) translateY(${offset}px)`;
    });
  }, { passive: true });

// --- Tawk.to live chat ------------------------------------------------------
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
// Hide Tawk's default launcher — we use our own branded floating button
Tawk_API.onLoad = function(){ Tawk_API.hideWidget(); if (window.__tawkWanted) { Tawk_API.maximize(); } };
Tawk_API.onChatMinimized = function(){ Tawk_API.hideWidget(); };

// Tawk is ~340KB of third-party JS and was the single biggest mobile cost:
// ~370ms of main-thread blocking during load, including the two longest tasks
// on the page, which held back the hero's paint. Nothing above the fold needs
// it, so it waits for the first sign of a real visitor — any pointer, key or
// scroll — or for the chat button, whichever lands first.
var loadTawk = (function () {
  var started = false;
  return function () {
    if (started) { return; }
    started = true;
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/6a5e91b2642ea11d490f13a0/1ju0mi8td';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
  };
})();
['pointerdown','keydown','touchstart','scroll'].forEach(function (evt) {
  window.addEventListener(evt, loadTawk, { once: true, passive: true });
});
// The floating button opens our own instant-answer panel first; live chat is one
// click deeper. The FAB is shown on its own timer so the knowledge base still
// works if Tawk is blocked or slow to load.
(function () {
  var fab    = document.getElementById('chatFab');
  var panel  = document.getElementById('kbPanel');
  var list   = document.getElementById('kbList');
  var search = document.getElementById('kbSearch');
  var kb     = window.TINT_FAQ || [];

  setTimeout(function(){ fab.classList.add('ready'); }, 1200);

  // Pre-build one <details> per entry, then just show/hide on search.
  var rows = kb.map(function (item) {
    var d = document.createElement('details');
    var s = document.createElement('summary');
    s.textContent = item.q;
    var a = document.createElement('div');
    a.className = 'kb-answer';
    a.innerHTML = item.a;
    d.appendChild(s); d.appendChild(a);
    list.appendChild(d);
    return { el: d, hay: (item.q + ' ' + item.a + ' ' + (item.k || '')).toLowerCase() };
  });

  var empty = document.createElement('p');
  empty.className = 'kb-empty';
  empty.innerHTML = 'No match for that one. Hit <strong>Chat with a person</strong> below and Jay will answer it himself.';
  empty.style.display = 'none';
  list.appendChild(empty);

  function filter() {
    var terms = search.value.toLowerCase().split(/\s+/).filter(Boolean);
    var hits = 0;
    rows.forEach(function (r) {
      var show = terms.every(function (t) { return r.hay.indexOf(t) !== -1; });
      r.el.style.display = show ? '' : 'none';
      if (!show) r.el.open = false;
      if (show) hits++;
    });
    empty.style.display = hits ? 'none' : '';
  }
  search.addEventListener('input', filter);

  function openPanel() {
    panel.classList.add('open');
    fab.setAttribute('aria-expanded', 'true');
    if (window.matchMedia('(min-width: 561px)').matches) { search.focus(); }
  }
  function closePanel() {
    panel.classList.remove('open');
    fab.setAttribute('aria-expanded', 'false');
  }

  fab.addEventListener('click', openPanel);
  document.getElementById('kbClose').addEventListener('click', closePanel);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('open')) { closePanel(); }
  });

  // Hand off to a real human.
  document.getElementById('kbLive').addEventListener('click', function () {
    closePanel();
    if (typeof Tawk_API.maximize === 'function') {
      Tawk_API.maximize();
      return;
    }
    // Still on its way in — kick the deferred load and open it on arrival.
    window.__tawkWanted = true;
    loadTawk();
    setTimeout(function () {
      // Tawk blocked or too slow — don't leave them stranded.
      if (typeof Tawk_API.maximize !== 'function') {
        window.location.href = 'sms:+18609950923';
      }
    }, 6000);
  });
})();
