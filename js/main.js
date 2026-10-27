/**
 * ============================================================================
 * PRASHANTH | FRONTEND DEVELOPER PORTFOLIO - MAIN INTERACTION SCRIPT
 * Vanilla JavaScript (ES6+), Clean Architecture, No Build Tools Required
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. THEME MANAGEMENT (Dark / Light with System & LocalStorage Support)
  // --------------------------------------------------------------------------
  const THEME_STORAGE_KEY = 'prashanth_portfolio_theme';
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  const storage = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.warn('localStorage is unavailable:', e);
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.warn('localStorage is unavailable:', e);
      }
    }
  };

  function getPreferredTheme() {
    const savedTheme = storage.get(THEME_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      const isDark = theme === 'dark';
      themeToggleBtn.setAttribute(
        'aria-label',
        isDark ? 'Switch to light theme' : 'Switch to dark theme'
      );
      themeToggleBtn.title = isDark ? 'Switch to light theme' : 'Switch to dark theme';
    }
  }

  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      storage.set(THEME_STORAGE_KEY, newTheme);
    });
  }

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const savedTheme = storage.get(THEME_STORAGE_KEY);
      if (!savedTheme) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. ACCESSIBLE MOBILE NAVIGATION (Hamburger Menu)
  // --------------------------------------------------------------------------
  const navToggleBtn = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navBackdrop = document.getElementById('nav-backdrop');
  const navLinks = document.querySelectorAll('.nav__link');

  function openMobileNav() {
    if (!navMenu || !navToggleBtn) return;
    navMenu.classList.add('is-open');
    if (navBackdrop) navBackdrop.classList.add('is-active');
    navToggleBtn.setAttribute('aria-expanded', 'true');
    navToggleBtn.setAttribute('aria-label', 'Close navigation menu');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (!navMenu || !navToggleBtn) return;
    navMenu.classList.remove('is-open');
    if (navBackdrop) navBackdrop.classList.remove('is-active');
    navToggleBtn.setAttribute('aria-expanded', 'false');
    navToggleBtn.setAttribute('aria-label', 'Toggle navigation menu');
    document.body.style.overflow = '';
  }

  if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener('click', () => {
      const isExpanded = navToggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMobileNav);
    }

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 900) {
          closeMobileNav();
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeMobileNav();
        navToggleBtn.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 900 && navMenu.classList.contains('is-open')) {
        closeMobileNav();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. SCROLL-SPY (Active Navigation Link Highlighting on Scroll)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const headerHeight = 80;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - headerHeight - 40;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // --------------------------------------------------------------------------
  // 4. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('is-revealed'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // --------------------------------------------------------------------------
  // 5. HERO TYPING EFFECT (Lightweight Vanilla JS Text Rotation)
  // --------------------------------------------------------------------------
  const roleTypedElement = document.getElementById('role-typed');
  if (roleTypedElement && !prefersReducedMotion) {
    try {
      const rolesData = JSON.parse(roleTypedElement.getAttribute('data-roles') || '[]');
      if (rolesData.length > 0) {
        let roleIndex = 0;
        let charIndex = rolesData[0].length;
        let isDeleting = false;
        const typingSpeed = 75;
        const deletingSpeed = 40;
        const holdTime = 2200;

        function typeLoop() {
          const currentRole = rolesData[roleIndex];

          if (isDeleting) {
            charIndex--;
            roleTypedElement.textContent = currentRole.substring(0, charIndex);
          } else {
            charIndex++;
            roleTypedElement.textContent = currentRole.substring(0, charIndex);
          }

          let delay = isDeleting ? deletingSpeed : typingSpeed;

          if (!isDeleting && charIndex === currentRole.length) {
            delay = holdTime;
            isDeleting = true;
          } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % rolesData.length;
            delay = 300;
          }

          setTimeout(typeLoop, delay);
        }

        setTimeout(typeLoop, holdTime);
      }
    } catch (e) {
      console.warn('Could not parse typed roles:', e);
    }
  }

  // --------------------------------------------------------------------------
  // 6. INTERACTIVE PROJECT CATEGORY FILTER TABS
  // --------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const selectedFilter = btn.getAttribute('data-filter');

        // Update active filter button state
        filterButtons.forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        // Filter cards with smooth fade/toggle
        projectCards.forEach((card) => {
          const categories = card.getAttribute('data-category') || '';
          if (selectedFilter === 'all' || categories.includes(selectedFilter)) {
            card.classList.remove('is-hidden');
            card.style.animation = 'fadeIn 0.35s ease';
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. RECRUITER TL;DR QUICK-VIEW MODAL
  // --------------------------------------------------------------------------
  const recruiterModalBackdrop = document.getElementById('recruiter-modal-backdrop');
  const recruiterModalClose = document.getElementById('recruiter-modal-close');
  const btnRecruiterModalHeader = document.getElementById('btn-recruiter-modal');
  const btnRecruiterModalHero = document.getElementById('hero-quick-overview-btn');
  let lastFocusedElement = null;

  function openRecruiterModal() {
    if (!recruiterModalBackdrop) return;
    lastFocusedElement = document.activeElement;
    recruiterModalBackdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    if (recruiterModalClose) recruiterModalClose.focus();
  }

  function closeRecruiterModal() {
    if (!recruiterModalBackdrop) return;
    recruiterModalBackdrop.classList.remove('is-active');
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  if (btnRecruiterModalHeader) {
    btnRecruiterModalHeader.addEventListener('click', openRecruiterModal);
  }
  if (btnRecruiterModalHero) {
    btnRecruiterModalHero.addEventListener('click', openRecruiterModal);
  }
  if (recruiterModalClose) {
    recruiterModalClose.addEventListener('click', closeRecruiterModal);
  }
  if (recruiterModalBackdrop) {
    recruiterModalBackdrop.addEventListener('click', (e) => {
      if (e.target === recruiterModalBackdrop) {
        closeRecruiterModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && recruiterModalBackdrop && recruiterModalBackdrop.classList.contains('is-active')) {
      closeRecruiterModal();
    }
  });

  // --------------------------------------------------------------------------
  // 8. ANIMATED NUMBER COUNTER FOR KEY IMPACT METRICS
  // --------------------------------------------------------------------------
  const counterElements = document.querySelectorAll('.counter-val');
  if (counterElements.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
    let countersStarted = false;

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          counterElements.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            if (isNaN(target)) return;

            let current = 0;
            const duration = 1400; // ms
            const stepTime = 30;
            const increment = target / (duration / stepTime);

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
              } else {
                counter.textContent = Math.floor(current);
              }
            }, stepTime);
          });
        }
      });
    }, { threshold: 0.3 });

    const metricsBar = document.querySelector('.metrics-counter-bar');
    if (metricsBar) counterObserver.observe(metricsBar);
  }

  // --------------------------------------------------------------------------
  // 9. COPY EMAIL TO CLIPBOARD WITH ACCESSIBLE FEEDBACK
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    const feedback = copyEmailBtn.querySelector('.copy-feedback');
    const emailToCopy = 'kunallprassanth@gmail.com';

    copyEmailBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(emailToCopy);
        } else {
          const tempInput = document.createElement('input');
          tempInput.value = emailToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        if (feedback) {
          feedback.textContent = 'Copied!';
          feedback.classList.add('is-visible');
          setTimeout(() => {
            feedback.classList.remove('is-visible');
          }, 2000);
        }
      } catch (err) {
        console.warn('Failed to copy email:', err);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 10. BACK-TO-TOP BUTTON VISIBILITY & FOOTER YEAR
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener(
      'scroll',
      () => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollY > 500) {
          backToTopBtn.style.opacity = '1';
          backToTopBtn.style.visibility = 'visible';
        } else {
          backToTopBtn.style.opacity = '0.7';
        }
      },
      { passive: true }
    );
  }

  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

})();
