document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // TYPING ANIMATION
  // =============================================
  const phrases = [
    'AI & Data Platforms',
    'LLM & RAG Systems',
    'Enterprise AI Agents',
    'Data Center Infrastructure',
    'Product Strategy'
  ];

  const typedEl = document.getElementById('typedText');
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pauseEnd = 0;

  function typeLoop() {
    const now = Date.now();
    if (now < pauseEnd) {
      requestAnimationFrame(typeLoop);
      return;
    }

    const current = phrases[phraseIdx];

    if (!deleting) {
      typedEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        pauseEnd = now + 2200;
      }
    } else {
      typedEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }

    const speed = deleting ? 40 : 70;
    setTimeout(() => requestAnimationFrame(typeLoop), speed);
  }

  requestAnimationFrame(typeLoop);

  // =============================================
  // NAVBAR SCROLL BEHAVIOR
  // =============================================
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('.section, #hero');
  const navLinksItems = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    let currentSection = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinksItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // =============================================
  // MOBILE NAV TOGGLE
  // =============================================
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // =============================================
  // SCROLL REVEAL
  // =============================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // =============================================
  // COUNTER ANIMATION
  // =============================================
  const counters = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // =============================================
  // SMOOTH SCROLL (fallback for older browsers)
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // =============================================
  // TILT EFFECT ON FEATURED CARDS
  // =============================================
  if (window.matchMedia('(min-width: 768px)').matches) {
    document.querySelectorAll('.featured-card, .building-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

});
