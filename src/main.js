

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Overlay Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenuCloseBtn = document.getElementById('mobileMenuClose');
  const mobileMenuOverlay = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenuOverlay && mobileMenuCloseBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuOverlay.classList.add('is-active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    mobileMenuCloseBtn.addEventListener('click', () => {
      mobileMenuOverlay.classList.remove('is-active');
      document.body.style.overflow = ''; // Restore scrolling
    });
  }

  // Gliding underline for navigation
  const navContainer = document.querySelector('.nav ul');
  const headerContainer = document.querySelector('.header');
  const navGlider = document.querySelector('.nav-glider');
  const navItems = document.querySelectorAll('.nav > ul > li:not(.nav-glider)');

  if (navContainer && navGlider && headerContainer) {
    let hideTimeout = null;

    navItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        if (hideTimeout) { clearTimeout(hideTimeout); hideTimeout = null; }
        const liRect = item.getBoundingClientRect();
        const headerRect = headerContainer.getBoundingClientRect();
        navGlider.style.width = `${liRect.width}px`;
        navGlider.style.transform = `translateX(${liRect.left - headerRect.left}px)`;
        navGlider.style.opacity = '1';
      });
    });

    // Cancel hide when re-entering nav area (covers gaps between li's)
    navContainer.addEventListener('mouseenter', () => {
      if (hideTimeout) { clearTimeout(hideTimeout); hideTimeout = null; }
    });

    headerContainer.addEventListener('mouseleave', () => {
      hideTimeout = setTimeout(() => { navGlider.style.opacity = '0'; }, 150);
    });
  }

  // Mega-menu JS control with timeout (replaces CSS :hover)
  const dropdowns = document.querySelectorAll('.has-dropdown');
  let menuCloseTimeout = null;

  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('mouseenter', () => {
      if (menuCloseTimeout) { clearTimeout(menuCloseTimeout); menuCloseTimeout = null; }
      // Close all other dropdowns
      dropdowns.forEach(d => { if (d !== dropdown) d.classList.remove('is-open'); });
      dropdown.classList.add('is-open');
    });

    dropdown.addEventListener('mouseleave', () => {
      menuCloseTimeout = setTimeout(() => {
        dropdown.classList.remove('is-open');
      }, 150);
    });
  });

  // Feature items interactivity
  const featureItems = document.querySelectorAll('.feature-item');

  featureItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active from all
      featureItems.forEach(f => f.classList.remove('active'));
      // Add active to clicked
      item.classList.add('active');
    });
  });

  // Vertical Carousel functionality
  const track = document.getElementById('use-cases-track');
  if (track) {
    const originalItemsList = Array.from(track.children);
    const originalLength = originalItemsList.length;
    const itemHeight = 80;

    // Clone all items multiple times so we have infinite scroll buffer before and after
    originalItemsList.forEach(item => track.appendChild(item.cloneNode(true)));
    originalItemsList.forEach(item => track.appendChild(item.cloneNode(true)));
    originalItemsList.forEach(item => track.appendChild(item.cloneNode(true)));

    // Refresh the node list with the clones
    const allItems = Array.from(track.children);

    // Start pointing at the first item of the SECOND cloned batch to ensure we have elements above it.
    // That means index = originalLength. We don't start at 0 so it's surrounded by content instantly.
    let currentIndex = originalLength;

    const updateCarousel = (animate = true) => {
      // 1) Update active classes
      allItems.forEach((it, idx) => {
        // Light up the current one, AND any corresponding clones so math doesn't skew heights
        if (idx % originalLength === currentIndex % originalLength) {
          it.classList.add('is-active');
        } else {
          it.classList.remove('is-active');
        }
      });

      // 2) Scroll track vertically
      if (!animate) {
        track.style.transition = 'none';
      } else {
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      }

      // Viewport container is exactly 280px tall. Visual center is at 140px.
      // Top of track to top of current item = currentIndex * 80
      // Center of current item = (currentIndex * 80) + 40
      // We want this center point to sit at 140px from the top of the container
      const translateY = 140 - ((currentIndex * itemHeight) + (itemHeight / 2));

      track.style.transform = `translateY(${translateY}px)`;
    };

    // Execute instantly for layout on frame 0
    updateCarousel(false);

    // Run carousel
    let isResetting = false;
    setInterval(() => {
      if (isResetting) return;

      currentIndex++;
      updateCarousel(true);

      // If we've scrolled fully to the end of the second batch
      if (currentIndex >= originalLength * 2) {
        isResetting = true;
        setTimeout(() => {
          currentIndex = originalLength;
          updateCarousel(false);
          isResetting = false;
        }, 550);
      }
    }, 2000);
  }

  // Scroll Reveal — IntersectionObserver
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  // Dynamic Word Cycler in CTA Banner
  const ctaDynamicWordEl = document.getElementById('cta-dynamic-word');
  if (ctaDynamicWordEl) {
    const ctaWords = ['brand', 'evento'];
    let ctaWordIndex = 0;

    setInterval(() => {
      ctaDynamicWordEl.style.opacity = '0';

      setTimeout(() => {
        ctaWordIndex = (ctaWordIndex + 1) % ctaWords.length;
        ctaDynamicWordEl.textContent = ctaWords[ctaWordIndex];
        ctaDynamicWordEl.style.opacity = '1';
      }, 400);
    }, 3000);
  }

  // Hero Video Carousel — crossfade background videos
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroPauseBtn = document.querySelector('.hero-pause');
  const heroPauseIcon = document.querySelector('.hero-pause-icon');

  if (heroSlides.length > 0) {
    let currentSlide = 0;
    let isPaused = false;
    let slideInterval;

    function nextSlide() {
      const currentVideo = heroSlides[currentSlide].querySelector('video');
      if (currentVideo) currentVideo.pause();
      heroSlides[currentSlide].classList.remove('active');

      currentSlide = (currentSlide + 1) % heroSlides.length;

      heroSlides[currentSlide].classList.add('active');
      const newVideo = heroSlides[currentSlide].querySelector('video');
      if (newVideo) newVideo.play();
    }

    function startSlides() {
      slideInterval = setInterval(nextSlide, 6000);
    }

    startSlides();

    if (heroPauseBtn) {
      heroPauseBtn.addEventListener('click', () => {
        isPaused = !isPaused;
        if (isPaused) {
          clearInterval(slideInterval);
          heroPauseIcon.textContent = '▶';
          const vid = heroSlides[currentSlide].querySelector('video');
          if (vid) vid.pause();
        } else {
          const vid = heroSlides[currentSlide].querySelector('video');
          if (vid) vid.play();
          startSlides();
          heroPauseIcon.textContent = '⏸';
        }
      });
    }
  }

});

// Hero name carousel — completely separate, runs after full load
window.addEventListener('load', function() {
  var heroTrack = document.querySelector('.hero-name-track');
  if (!heroTrack) return;

  var heroSpans = heroTrack.querySelectorAll('span');
  if (heroSpans.length === 0) return;

  // Hardcoded: each span is 4.2rem tall
  var rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  var ITEM_H = 4.2 * rootFontSize;
  var TOTAL_REAL = 8;
  var heroIdx = 2; // índice del primer cliente real (hay 2 clones antes)

  // Posicionar con el activo centrado: translateY(-((heroIdx - 2) * ITEM_H))
  heroTrack.style.transition = 'none';
  heroTrack.style.transform = 'translateY(-' + ((heroIdx - 2) * ITEM_H) + 'px)';

  var heroResetting = false;
  setInterval(function() {
    if (heroResetting) return;

    heroIdx++;

    // Animar centrado
    heroTrack.style.transition = 'transform 0.6s cubic-bezier(0.4,0,0.2,1)';
    heroTrack.style.transform = 'translateY(-' + ((heroIdx - 2) * ITEM_H) + 'px)';

    // Actualizar clase active
    for (var j = 0; j < heroSpans.length; j++) {
      heroSpans[j].classList.remove('active');
    }
    if (heroSpans[heroIdx]) heroSpans[heroIdx].classList.add('active');

    // Reset cuando llega al primer clon del final (índice 10)
    if (heroIdx >= TOTAL_REAL + 2) {
      heroResetting = true;
      setTimeout(function() {
        heroIdx = 2;
        heroTrack.style.transition = 'none';
        heroTrack.style.transform = 'translateY(0px)';
        for (var j = 0; j < heroSpans.length; j++) {
          heroSpans[j].classList.remove('active');
        }
        heroSpans[2].classList.add('active');
        heroResetting = false;
      }, 650);
    }
  }, 3000);
});

