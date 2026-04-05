// cache-bust-fix-v1


document.addEventListener('DOMContentLoaded', () => {
  // Header show/hide on scroll
  const headerEl = document.querySelector('.header');
  if (headerEl) {
    let lastScrollY = 0;
    let ticking = false;

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          var currentY = window.scrollY;
          if (currentY > 100) {
            headerEl.classList.add('header-scrolled');
            if (currentY > lastScrollY) {
              headerEl.classList.add('header-hidden');
            } else {
              headerEl.classList.remove('header-hidden');
            }
          } else {
            headerEl.classList.remove('header-scrolled');
            headerEl.classList.remove('header-hidden');
          }
          lastScrollY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    });
  }

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

  // ── Mega-menu: JS-only control ──
  const dropdowns = document.querySelectorAll('.has-dropdown');
  const header = document.querySelector('.header');
  let menuCloseTimeout = null;

  function openMenu(target) {
    if (menuCloseTimeout) { clearTimeout(menuCloseTimeout); menuCloseTimeout = null; }
    dropdowns.forEach(d => {
      if (d !== target) d.classList.remove('is-open');
    });
    target.classList.add('is-open');
    if (header) header.classList.add('menu-active');

    // Position mega-menu below the nav item
    const menu = target.querySelector('.mega-menu');
    if (menu && header) {
      const itemRect = target.getBoundingClientRect();
      const headerBottom = header.getBoundingClientRect().bottom;
      menu.style.top = itemRect.bottom + 8 + 'px';
      menu.style.left = itemRect.left + 'px';
      menu.style.width = '';
    }
  }

  function closeAllMenus() {
    dropdowns.forEach(d => d.classList.remove('is-open'));
    if (header) header.classList.remove('menu-active');
  }

  function startClose() {
    if (menuCloseTimeout) clearTimeout(menuCloseTimeout);
    menuCloseTimeout = setTimeout(() => {
      closeAllMenus();
      menuCloseTimeout = null;
    }, 300);
  }

  function cancelClose() {
    if (menuCloseTimeout) { clearTimeout(menuCloseTimeout); menuCloseTimeout = null; }
  }

  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('mouseenter', () => openMenu(dropdown));
    dropdown.addEventListener('mouseleave', () => startClose());
    const menu = dropdown.querySelector('.mega-menu');
    if (menu) {
      menu.addEventListener('mouseenter', () => cancelClose());
      menu.addEventListener('mouseleave', () => startClose());
    }
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
  const heroPauseBtn = null;
  const heroPauseIcon = null;

  if (heroSlides.length > 0) {
    let currentSlide = 0;
    let isPaused = false;
    let slideInterval;

    // Safe play: catches browser power-saving interruptions
    function safePlay(video) {
      if (!video) return;
      var p = video.play();
      if (p && typeof p.catch === 'function') {
        p.catch(function() { /* browser paused video to save power — ignore */ });
      }
    }

    // Preload next slide's video so transition is seamless
    function preloadNext() {
      var nextIdx = (currentSlide + 1) % heroSlides.length;
      var nextVideo = heroSlides[nextIdx].querySelector('video');
      if (nextVideo && nextVideo.preload === 'none') {
        nextVideo.preload = 'auto';
        nextVideo.load();
      }
    }

    // Set all non-active videos to preload="none" on init
    heroSlides.forEach(function(slide, i) {
      var vid = slide.querySelector('video');
      if (vid && i !== 0) {
        vid.preload = 'none';
        vid.removeAttribute('autoplay');
      }
    });

    // Preload the second video after first starts
    preloadNext();

    function nextSlide() {
      var currentVideo = heroSlides[currentSlide].querySelector('video');
      if (currentVideo) currentVideo.pause();
      heroSlides[currentSlide].classList.remove('active');

      currentSlide = (currentSlide + 1) % heroSlides.length;

      heroSlides[currentSlide].classList.add('active');
      var newVideo = heroSlides[currentSlide].querySelector('video');
      safePlay(newVideo);

      // Preload the next one in advance
      preloadNext();
    }

    function startSlides() {
      slideInterval = setInterval(nextSlide, 6000);
    }

    startSlides();

    if (heroPauseBtn) {
      heroPauseBtn.addEventListener('click', function() {
        isPaused = !isPaused;
        if (isPaused) {
          clearInterval(slideInterval);
          heroPauseIcon.textContent = '▶';
          var vid = heroSlides[currentSlide].querySelector('video');
          if (vid) vid.pause();
        } else {
          var vid = heroSlides[currentSlide].querySelector('video');
          safePlay(vid);
          startSlides();
          heroPauseIcon.textContent = '⏸';
        }
      });
    }
  }

  // Client Stories — slide diagonal carousel on hover
  const csItems = document.querySelectorAll('.client-story-item');
  const carousel = document.querySelector('.client-stories-carousel');
  const cItems = document.querySelectorAll('.carousel-item');
  if (csItems.length && carousel && cItems.length) {
    const step = 600;
    const offsets = [
      { x: -step * 2, y: -step * 2 },
      { x: -step, y: -step },
      { x: 0, y: 0 },
      { x: step, y: step },
      { x: step * 2, y: step * 2 },
    ];

    csItems.forEach((item, i) => {
      item.addEventListener('mouseenter', () => {
        const ox = -offsets[i].x;
        const oy = -offsets[i].y;
        carousel.style.transform = 'translate(' + ox + 'px, ' + oy + 'px)';
        cItems.forEach((ci, j) => {
          if (j === i) { ci.classList.add('is-active'); }
          else { ci.classList.remove('is-active'); }
        });
      });
      item.addEventListener('mouseleave', () => {
        cItems.forEach(ci => ci.classList.remove('is-active'));
      });
    });
  }

  // Reports parallax — image width tied to scroll via rAF
  var rpWrapper = document.querySelector('.reports-image-wrapper');
  if (rpWrapper) {
    var rpMinW = 1000;
    var rpMaxW = 1400;
    var rpTicking = false;

    function updateReportsWidth() {
      var rect = rpWrapper.getBoundingClientRect();
      var wh = window.innerHeight;
      var center = rect.top + rect.height / 2;
      var progress = Math.max(0, Math.min(1, (center - wh / 2) / (wh * 0.8)));
      var w = rpMinW + (rpMaxW - rpMinW) * progress;
      rpWrapper.style.width = w + 'px';
      rpTicking = false;
    }

    window.addEventListener('scroll', function() {
      if (!rpTicking) {
        requestAnimationFrame(updateReportsWidth);
        rpTicking = true;
      }
    });
    updateReportsWidth();
  }

});


