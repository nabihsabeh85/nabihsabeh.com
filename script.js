document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // TYPING ANIMATION (homepage only)
  // =============================================
  const typedEl = document.getElementById('typedText');

  if (typedEl) {
    const phrases = [
      'AI & Data Platforms',
      'LLM & RAG Systems',
      'Enterprise AI Agents',
      'Data Center Infrastructure',
      'Product Strategy'
    ];

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
  }

  // =============================================
  // NAVBAR SCROLL BEHAVIOR
  // =============================================
  const navbar = document.getElementById('navbar');

  if (navbar && !navbar.classList.contains('scrolled')) {
    function onScroll() {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // =============================================
  // MOBILE NAV TOGGLE
  // =============================================
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
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
  }

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
  const counters = document.querySelectorAll('.stat-number, .impact-number');

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
  // SMOOTH SCROLL (for anchor links)
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
  // TILT EFFECT ON CARDS
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

  // =============================================
  // ARTICLES BANNER DRAG SCROLL
  // =============================================
  const banner = document.querySelector('.articles-banner');

  if (banner) {
    let isDown = false;
    let startX;
    let scrollLeft;

    banner.addEventListener('mousedown', (e) => {
      isDown = true;
      banner.style.cursor = 'grabbing';
      startX = e.pageX - banner.offsetLeft;
      scrollLeft = banner.scrollLeft;
    });

    banner.addEventListener('mouseleave', () => {
      isDown = false;
      banner.style.cursor = '';
    });

    banner.addEventListener('mouseup', () => {
      isDown = false;
      banner.style.cursor = '';
    });

    banner.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - banner.offsetLeft;
      const walk = (x - startX) * 1.5;
      banner.scrollLeft = scrollLeft - walk;
    });
  }

});
